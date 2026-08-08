import { PLANOS_CONFIG, type StripePlan } from "@/lib/stripe";

const EFI_CLIENT_ID = process.env.EFI_CLIENT_ID || "";
const EFI_CLIENT_SECRET = process.env.EFI_CLIENT_SECRET || "";
const EFI_PIX_KEY = process.env.EFI_PIX_KEY || "";
const IS_SANDBOX = process.env.EFI_SANDBOX === "true";

const BASE_URL = IS_SANDBOX
  ? "https://pix-h.efibank.com.br"
  : "https://pix.efibank.com.br";

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface EfiCobResponse {
  txid: string;
  calendario: {
    expiracao: number;
    criacao: string;
  };
  revision: number;
  loc: {
    id: number;
    location: string;
    tipoCob: string;
  };
  status: string;
  pixCopiaECola: string;
}

interface EfiQrCodeResponse {
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}

/**
 * Obtém o Token de Acesso OAuth 2.0 do Efí Bank
 */
export async function getEfiAccessToken(): Promise<string> {
  if (!EFI_CLIENT_ID || !EFI_CLIENT_SECRET) {
    throw new Error("Credenciais do Efí Bank (EFI_CLIENT_ID e EFI_CLIENT_SECRET) não configuradas nas variáveis de ambiente.");
  }

  const credentials = Buffer.from(`${EFI_CLIENT_ID}:${EFI_CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Efí OAuth Error]", errorText);
    throw new Error("Falha na autenticação com o Efí Bank.");
  }

  const data: OAuthTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Cria uma cobrança PIX imediata (/v2/cob)
 */
export async function createEfiCob(
  planKey: StripePlan,
  userEmail: string,
  userNome?: string,
  txidCustom?: string
) {
  const plan = PLANOS_CONFIG[planKey];

  if (!plan) {
    throw new Error("Plano inválido para cobrança PIX.");
  }

  // Se as credenciais do Efí Bank ainda não foram configuradas no .env.local
  if (!EFI_CLIENT_ID || !EFI_CLIENT_SECRET) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Efí Bank] EFI_CLIENT_ID ou EFI_CLIENT_SECRET ausentes. Gerando PIX demonstrativo para testes.");
      const mockTxid = `mock_efi_${Date.now()}`;
      const valorFormatado = (plan.preco / 100).toFixed(2);
      const mockCopiaECola = `00020126580014BR.GOV.BCB.PIX013600000000-0000-0000-0000-0000000000005204000053039865405${valorFormatado}5802BR5925Concurso Na Veia Ltda6009SAO PAULO62070503***63041D2C`;
      
      // QR code genérico para visualização nos testes
      const mockQrCodeBase64 = "iVBORw0KGgoAAAANSU64UgAAAABJRU5ErkJggg==";

      return {
        txid: mockTxid,
        pixCopiaECola: mockCopiaECola,
        imagemQrcode: mockQrCodeBase64,
        valor: plan.preco / 100,
        expiracao: 3600,
      };
    }

    throw new Error(
      "As credenciais do Efí Bank (EFI_CLIENT_ID e EFI_CLIENT_SECRET) não foram configuradas no arquivo .env.local. Por favor, configure as variáveis de ambiente ou selecione o pagamento por Cartão de Crédito."
    );
  }

  const token = await getEfiAccessToken();
  const valorFormatado = (plan.preco / 100).toFixed(2);
  const txid = txidCustom || `cnv${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const bodyData: any = {
    calendario: {
      expiracao: 3600, // 1 hora
    },
    valor: {
      original: valorFormatado,
    },
    chave: EFI_PIX_KEY || "chavedeteste@concursonaveia.com.br",
    solicitacaoPagador: `Concurso Na Veia - ${plan.nome}`,
  };

  if (userNome) {
    bodyData.devedor = {
      nome: userNome,
    };
  }

  const response = await fetch(`${BASE_URL}/v2/cob/${txid}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Efí Cob Error]", errorText);
    throw new Error("Erro ao gerar cobrança PIX no Efí Bank.");
  }

  const cobData: EfiCobResponse = await response.json();

  // Buscar Imagem do QR Code
  let qrcodeBase64 = "";
  if (cobData.loc?.id) {
    try {
      const qrResponse = await fetch(`${BASE_URL}/v2/loc/${cobData.loc.id}/qrcode`, {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store",
      });
      if (qrResponse.ok) {
        const qrData: EfiQrCodeResponse = await qrResponse.json();
        qrcodeBase64 = qrData.imagemQrcode || qrData.qrcode;
      }
    } catch (qrErr) {
      console.warn("[Efí QR Code Fetch Warning]", qrErr);
    }
  }

  return {
    txid: cobData.txid,
    pixCopiaECola: cobData.pixCopiaECola,
    imagemQrcode: qrcodeBase64,
    valor: plan.preco / 100,
    expiracao: cobData.calendario.expiracao,
  };
}

/**
 * Consulta o status de uma cobrança PIX pelo txid
 */
export async function getEfiCobStatus(txid: string) {
  const token = await getEfiAccessToken();

  const response = await fetch(`${BASE_URL}/v2/cob/${txid}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { paid: false, status: "UNKNOWN" };
  }

  const data = await response.json();
  const isPaid = data.status === "CONCLUIDA" || (Array.isArray(data.pix) && data.pix.length > 0);

  return {
    paid: isPaid,
    status: data.status,
    pixDetails: data.pix,
  };
}
