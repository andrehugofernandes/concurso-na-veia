import { PLANOS_CONFIG, type StripePlan } from "@/lib/stripe";

const INFINITE_PAY_API_KEY = process.env.INFINITE_PAY_API_KEY || "";
const INFINITE_PAY_HANDLE = process.env.INFINITE_PAY_HANDLE || "";
const BASE_URL = "https://api.infinitepay.io/v2";

export interface InfinitePayCobResponse {
  txid: string;
  pixCopiaECola: string;
  imagemQrcode: string;
  valor: number;
  expiracao: number;
}

/**
 * Cria uma cobrança PIX via InfinitePay
 */
export async function createInfinitePayCob(
  planKey: StripePlan,
  userEmail: string,
  userNome?: string,
  txidCustom?: string
): Promise<InfinitePayCobResponse> {
  const plan = PLANOS_CONFIG[planKey];

  if (!plan) {
    throw new Error("Plano inválido para cobrança PIX.");
  }

  // Fallback para desenvolvimento caso as chaves não estejam configuradas no .env.local
  if (!INFINITE_PAY_API_KEY) {
    if (process.env.NODE_ENV === "development" || !process.env.INFINITE_PAY_API_KEY) {
      console.warn("[InfinitePay] INFINITE_PAY_API_KEY não configurada. Gerando PIX demonstrativo para testes.");
      const mockTxid = `mock_inf_${Date.now()}`;
      const valorFormatado = (plan.preco / 100).toFixed(2);
      const mockCopiaECola = `00020126580014BR.GOV.BCB.PIX013600000000-0000-0000-0000-0000000000005204000053039865405${valorFormatado}5802BR5925Concurso Na Veia Ltda6009SAO PAULO62070503***63041D2C`;

      // QR Code mockado em SVG/Base64 para visualização em dev
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
      "A chave da API InfinitePay (INFINITE_PAY_API_KEY) não foi configurada nas variáveis de ambiente. Por favor, configure o arquivo .env.local."
    );
  }

  const txid = txidCustom || `inf_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const amountInCents = plan.preco; // Já em centavos no PLANOS_CONFIG

  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${INFINITE_PAY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: txid,
      amount: amountInCents,
      payment_method: "pix",
      customer: {
        email: userEmail,
        name: userNome || "Estudante Concurso Na Veia",
      },
      handle: INFINITE_PAY_HANDLE,
      metadata: {
        plan_key: planKey,
        user_email: userEmail,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[InfinitePay Transaction Error]", errorText);
    throw new Error("Erro ao gerar cobrança PIX no InfinitePay.");
  }

  const data = await response.json();

  return {
    txid: data.id || data.order_id || txid,
    pixCopiaECola: data.pix?.qr_code || data.pix_copia_e_cola || data.brcode || "",
    imagemQrcode: data.pix?.qr_code_image || data.qrcode_url || data.imagem_qrcode || "",
    valor: plan.preco / 100,
    expiracao: data.expires_in || 3600,
  };
}

/**
 * Consulta o status de uma transação no InfinitePay pelo ID/txid
 */
export async function getInfinitePayStatus(txid: string) {
  if (!INFINITE_PAY_API_KEY || txid.startsWith("mock_")) {
    return { paid: false, status: "pending" };
  }

  try {
    const response = await fetch(`${BASE_URL}/transactions/${txid}`, {
      headers: {
        "Authorization": `Bearer ${INFINITE_PAY_API_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { paid: false, status: "unknown" };
    }

    const data = await response.json();
    const status = data.status || data.transaction_status;
    const paid = status === "approved" || status === "paid" || status === "settled";

    return { paid, status };
  } catch (error: any) {
    console.error("[InfinitePay Status Error]", error);
    return { paid: false, error: error.message };
  }
}
