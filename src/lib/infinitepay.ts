import { PLANOS_CONFIG, type StripePlan } from "@/lib/stripe";

const INFINITE_PAY_API_KEY = process.env.INFINITE_PAY_API_KEY || "";
const INFINITE_PAY_HANDLE = process.env.INFINITE_PAY_HANDLE || "$andre-hugo";
const INFINITE_PAY_PIX_KEY = process.env.INFINITE_PAY_PIX_KEY || process.env.EFI_PIX_KEY || "andrehugofernandes@gmail.com";
const BASE_URL = "https://api.infinitepay.io/v2";

export interface InfinitePayCobResponse {
  txid: string;
  pixCopiaECola: string;
  imagemQrcode: string;
  valor: number;
  expiracao: number;
}

/**
 * Cálculo oficial do CRC16-CCITT (0xFFFF) exigido pelo Banco Central do Brasil para códigos Pix
 */
function calculateCRC16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Remove acentos e caracteres especiais para conformidade estrita com o padrão EMV Co / Banco Central
 */
function cleanString(str: string, maxLength: number): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .substring(0, maxLength);
}

/**
 * Gera um Payload Pix Copia e Cola 100% VÁLIDO (Padrão Banco Central do Brasil)
 */
export function generateValidPixPayload(
  chavePix: string,
  nomeRecebedor: string,
  cidade: string,
  valor: number,
  txid: string
): string {
  const chave = chavePix.trim();
  const nome = cleanString(nomeRecebedor || "CONCURSO NA VEIA", 25);
  const city = cleanString(cidade || "SAO PAULO", 15);
  const valorFormatted = valor.toFixed(2);
  const reference = cleanString(txid || "***", 25) || "***";

  // Tag 26: Merchant Account Information
  const merchantAccountInfo = `0014BR.GOV.BCB.PIX01${chave.length.toString().padStart(2, "0")}${chave}`;
  const merchantAccountTag = `26${merchantAccountInfo.length.toString().padStart(2, "0")}${merchantAccountInfo}`;

  // Tag 52: Merchant Category Code (0000)
  const mcc = "52040000";

  // Tag 53: Transaction Currency (986 = BRL)
  const currency = "5303986";

  // Tag 54: Transaction Amount
  const amountTag = `54${valorFormatted.length.toString().padStart(2, "0")}${valorFormatted}`;

  // Tag 58: Country Code (BR)
  const country = "5802BR";

  // Tag 59: Merchant Name
  const nameTag = `59${nome.length.toString().padStart(2, "0")}${nome}`;

  // Tag 60: Merchant City
  const cityTag = `60${city.length.toString().padStart(2, "0")}${city}`;

  // Tag 62: Additional Data Field Template (Reference / TxID)
  const refTagInner = `05${reference.length.toString().padStart(2, "0")}${reference}`;
  const additionalDataTag = `62${refTagInner.length.toString().padStart(2, "0")}${refTagInner}`;

  // Montagem do Payload sem o CRC16
  const rawPayload = `000201${merchantAccountTag}${mcc}${currency}${amountTag}${country}${nameTag}${cityTag}${additionalDataTag}6304`;

  // Cálculo e anexação do CRC16 final de 4 dígitos
  const crc = calculateCRC16(rawPayload);
  return `${rawPayload}${crc}`;
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
  console.log("[InfinitePay] Solicitando cobrança Pix...", { planKey, userEmail, userNome, txidCustom });
  
  const plan = PLANOS_CONFIG[planKey];
  if (!plan) {
    throw new Error(`Plano '${planKey}' inválido para cobrança PIX.`);
  }

  const txid = txidCustom || `inf${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;
  const valorEmReais = plan.preco / 100;

  // Gerar código Pix 100% válido no padrão do Banco Central com a Chave Pix do titular
  const validPixCode = generateValidPixPayload(
    INFINITE_PAY_PIX_KEY,
    "ANDRE HUGO G F S LIMA",
    "RECIFE",
    valorEmReais,
    txid
  );

  // Se não houver chave API real ou se for ambiente de testes, retorna o Pix com validação oficial
  if (!INFINITE_PAY_API_KEY || INFINITE_PAY_API_KEY.startsWith("inf_key_")) {
    console.log("[InfinitePay] Gerado Pix com padrão oficial Banco Central para a chave:", INFINITE_PAY_PIX_KEY);
    return {
      txid,
      pixCopiaECola: validPixCode,
      imagemQrcode: "",
      valor: valorEmReais,
      expiracao: 3600,
    };
  }

  try {
    const amountInCents = plan.preco;
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
      console.warn("[InfinitePay API Error] Resposta de erro da API:", errorText);
      return {
        txid,
        pixCopiaECola: validPixCode,
        imagemQrcode: "",
        valor: valorEmReais,
        expiracao: 3600,
      };
    }

    const data = await response.json();
    const copiaECola = data.pix?.qr_code || data.pix_copia_e_cola || data.brcode || validPixCode;

    return {
      txid: data.id || data.order_id || txid,
      pixCopiaECola: copiaECola,
      imagemQrcode: data.pix?.qr_code_image || data.qrcode_url || "",
      valor: valorEmReais,
      expiracao: data.expires_in || 3600,
    };
  } catch (error: any) {
    console.error("[InfinitePay Network Error]", error);
    return {
      txid,
      pixCopiaECola: validPixCode,
      imagemQrcode: "",
      valor: valorEmReais,
      expiracao: 3600,
    };
  }
}

/**
 * Consulta o status de uma transação no InfinitePay pelo ID/txid
 */
export async function getInfinitePayStatus(txid: string) {
  if (!INFINITE_PAY_API_KEY || INFINITE_PAY_API_KEY.startsWith("inf_key_") || txid.startsWith("inf")) {
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
