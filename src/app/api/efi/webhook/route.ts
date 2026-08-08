import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Efí Webhook] Notificação recebida:", JSON.stringify(body));

    // Validação da lista de pix recebidos (padrão Efí Bank)
    const pixList = body.pix || body.pixNotification;

    if (Array.isArray(pixList)) {
      const supabase = await createClient();

      for (const item of pixList) {
        const txid = item.txid;
        const valor = item.valor;
        console.log(`[Efí Webhook] ✅ PIX confirmado - TxID: ${txid}, Valor: ${valor}`);

        // Opcional: Atualizar assinaturas/perfis vinculados ao txid se gravados na tabela
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("[Efí Webhook Error]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
