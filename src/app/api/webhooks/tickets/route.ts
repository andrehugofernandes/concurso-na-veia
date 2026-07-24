import { NextResponse } from "next/server";

// Webhook payload from Supabase Database Trigger
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Verify secret (you can pass this via headers in the Supabase trigger)
    // const authHeader = req.headers.get('Authorization');
    // if (authHeader !== `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    console.log("[WEBHOOK TICKETS] Novo evento recebido:", payload);

    const { type, record } = payload;
    
    // record represents the new ticket_message row
    if (type === 'INSERT' && record && !record.is_ai_generated) {
      // TODO: Futura integração com IA aqui.
      // Ex:
      // 1. Verificar se o ticket associado está OPEN
      // 2. Chamar OpenAI/Anthropic para gerar resposta
      // 3. Inserir resposta na tabela ticket_messages com is_ai_generated = true
      console.log(`[WEBHOOK TICKETS] Mensagem inserida no ticket ${record.ticket_id}. Pronta para processamento de IA.`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[WEBHOOK TICKETS] Erro ao processar webhook:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
