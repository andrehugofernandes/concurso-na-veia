import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente Admin do Supabase com a Service Role Key para poder atualizar dados do perfil via Webhook
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[InfinitePay Webhook] Notificação recebida:", JSON.stringify(body));

    // A InfinitePay envia eventos como 'transaction.paid' ou 'transaction.approved'
    const event = body.event || body.type;
    const status = body.data?.status || body.status;
    const metadata = body.data?.metadata || body.metadata || {};
    const userEmail = metadata.user_email || body.data?.customer?.email;
    const planKey = metadata.plan_key;

    const isPaid = event === "transaction.paid" || status === "approved" || status === "paid" || status === "settled";

    if (isPaid && userEmail && planKey) {
      console.log(`[InfinitePay Webhook] ✅ PIX Aprovado para o email ${userEmail} (Plano: ${planKey})`);

      // Atualiza o perfil do usuário no Supabase
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: planKey,
          updated_at: new Date().toISOString(),
        })
        .eq("email", userEmail);

      if (updateError) {
        console.error("[InfinitePay Webhook Error] Falha ao atualizar perfil no Supabase:", updateError);
      } else {
        console.log(`[InfinitePay Webhook] Perfil de ${userEmail} atualizado para o plano ${planKey} com sucesso.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[InfinitePay Webhook Error]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
