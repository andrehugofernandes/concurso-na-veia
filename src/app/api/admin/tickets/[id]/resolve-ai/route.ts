import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIProvider } from "@/lib/ai/provider";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const ticketId = resolvedParams.id;

    const supabase = await createClient();

    // 1. Verificar autenticação de administrador
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { data: adminProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!adminProfile || (adminProfile.role.toLowerCase() !== "sysadmin" && adminProfile.role.toLowerCase() !== "admin")) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // 2. Buscar informações do ticket e perfil do aluno
    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 });
    }

    const { data: userProfile } = await supabase
      .from("profiles")
      .select("nome, email, username")
      .eq("id", ticket.user_id)
      .single();

    const userName = userProfile?.nome || userProfile?.email || "Aluno";

    // 3. Buscar histórico de mensagens e anexos do ticket
    const { data: messages } = await supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    const messagesText = (messages || [])
      .map((m) => {
        const sender = m.sender_id === ticket.user_id ? `Aluno (${userName})` : m.is_ai_generated ? "IA Davi" : "Suporte";
        const attachments = m.attachment_urls && m.attachment_urls.length > 0 
          ? `\n[Anexos/Prints enviados: ${m.attachment_urls.join(", ")}]` 
          : "";
        return `${sender}: ${m.content}${attachments}`;
      })
      .join("\n\n");

    // 4. Buscar aulas relevantes do sistema (caso o ticket seja sobre aulas)
    const { data: sampleLessons } = await supabase
      .from("lessons")
      .select("id, title, materia_slug, profissoes_slugs, content")
      .limit(5);

    const lessonsSummary = (sampleLessons || [])
      .map((l) => `AULA: ${l.title} (${l.materia_slug})\nEstrutura Módulos: ${JSON.stringify(l.content).slice(0, 500)}...`)
      .join("\n---\n");

    // 5. Instanciar o Provider de IA (Gemini / Cascade Fallback)
    const aiProvider = getAIProvider();

    const systemPrompt = `Você é DAVI, o Tutor e Especialista Técnico com Inteligência Artificial do Concurso Na Veia.
Seu papel é analisar chamados de suporte dos alunos com empatia, rigor didático e precisão absoluta.
Você deve responder diretamente ao ticket do aluno resolvendo sua dúvida, problema em aula ou corrigindo eventual inconsistência em módulo/questão/simulado.

INSTRUÇÕES DE RESPOSTA:
1. Trate o aluno pelo nome (${userName}) de forma respeitosa e motivadora.
2. Analise atentamente a mensagem e os prints/anexos (caso existam).
3. Se for uma dúvida de conteúdo das aulas (matéria, concurso, edital, legislação), forneça uma explicação didática clara e direta.
4. Se for sobre um erro específico numa questão ou material, informe que a revisão foi realizada e dê a resolução correta.
5. Assine sempre ao final como: "🤖 Davi — Tutor IA Especialista | Concurso Na Veia".`;

    const userPrompt = `TICKET DO ALUNO:
Assunto: ${ticket.subject}
Prioridade: ${ticket.priority}

HISTÓRICO DA CONVERSA:
${messagesText}

AULAS DE REFERÊNCIA NO BANCO (JSON):
${lessonsSummary}

Por favor, elabore a melhor resposta definitiva e solução para o aluno ${userName}:`;

    let aiResponse = "";
    if (aiProvider.generateResponse) {
      aiResponse = await aiProvider.generateResponse(userPrompt, systemPrompt);
    } else {
      aiResponse = `Olá ${userName}, sou o Davi, tutor IA do Concurso Na Veia. Recebemos seu chamado referente a "${ticket.subject}". Nossa equipe e sistema de inteligência já registraram sua solicitação para análise detalhada do conteúdo e dos anexos.`;
    }

    // 6. Gravar a resposta da IA na tabela ticket_messages
    const { data: newMsg, error: msgErr } = await supabase
      .from("ticket_messages")
      .insert({
        ticket_id: ticketId,
        sender_id: user.id, // gravado sob o ID do admin/sistema com tag de IA
        content: aiResponse,
        is_ai_generated: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (msgErr) throw msgErr;

    // 7. Atualizar status do ticket para RESPONDIDO / SOLUCIONADO
    await supabase
      .from("tickets")
      .update({ 
        status: "RESPONDIDO",
        updated_at: new Date().toISOString()
      })
      .eq("id", ticketId);

    return NextResponse.json({
      success: true,
      message: newMsg,
      replyContent: aiResponse
    });

  } catch (err: any) {
    console.error("[ResolveAITicketRoute] Erro ao resolver com IA Davi:", err);
    return NextResponse.json({ error: err.message || "Erro ao processar ticket com IA" }, { status: 500 });
  }
}
