"use server";

import { action as actionClient } from "@/lib/actions/safe-action";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const createTicketSchema = z.object({
  subject: z.string().min(3, "O assunto deve ter no mínimo 3 caracteres").max(100),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  message: z.string().min(10, "A mensagem deve ter no mínimo 10 caracteres"),
  attachment_urls: z.array(z.string()).optional(),
});

export const createTicketAction = actionClient
  .schema(createTicketSchema)
  .action(async ({ parsedInput: { subject, priority, message, attachment_urls } }) => {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Não autenticado");
    }

    // 1. Create Ticket
    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        user_id: user.id,
        subject,
        priority,
      })
      .select()
      .single();

    if (ticketError) {
      console.error('❌ [createTicketAction ERROR]:', ticketError);
      throw new Error("Erro ao criar ticket: " + ticketError.message);
    }

    // 2. Create Initial Message
    const { error: messageError } = await supabase
      .from("ticket_messages")
      .insert({
        ticket_id: ticket.id,
        sender_id: user.id,
        content: message,
        attachment_urls: attachment_urls || [],
      });

    if (messageError) {
      console.error('❌ [createTicketAction Message ERROR]:', messageError);
      throw new Error("Erro ao adicionar mensagem inicial: " + messageError.message);
    }

    // Criar notificação para o usuário
    try {
      await supabase.from("notifications").insert({
        user_id: user.id,
        type: "ticket",
        title: "Chamado Aberto com Sucesso",
        message: `Seu chamado "${subject}" foi registrado com sucesso.`,
        priority: "info",
        action_url: `/suporte/${ticket.id}`,
      });
    } catch (e) {
      console.warn("Falha ao gerar notificação de abertura de ticket:", e);
    }

    revalidatePath("/suporte");
    
    return { success: true, ticketId: ticket.id };
  });

const replyTicketSchema = z.object({
  ticketId: z.string().uuid(),
  message: z.string().min(1, "A mensagem não pode estar vazia"),
  attachment_urls: z.array(z.string()).optional(),
});

export const replyTicketAction = actionClient
  .schema(replyTicketSchema)
  .action(async ({ parsedInput: { ticketId, message, attachment_urls } }) => {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Não autenticado");
    }

    const { error: messageError } = await supabase
      .from("ticket_messages")
      .insert({
        ticket_id: ticketId,
        sender_id: user.id,
        content: message,
        attachment_urls: attachment_urls || [],
      });

    if (messageError) {
      throw new Error("Erro ao adicionar resposta: " + messageError.message);
    }

    // Notificar o dono do ticket se a resposta for do suporte
    try {
      const { data: ticket } = await supabase
        .from("tickets")
        .select("user_id, subject, assunto")
        .eq("id", ticketId)
        .single();
      
      if (ticket && ticket.user_id !== user.id) {
        await supabase.from("notifications").insert({
          user_id: ticket.user_id,
          type: "ticket",
          title: "Nova Resposta no seu Chamado",
          message: `A equipe de suporte respondeu ao seu chamado: "${ticket.subject || ticket.assunto || 'Suporte'}".`,
          priority: "info",
          action_url: `/suporte/${ticketId}`,
        });
      }
    } catch (e) {
      console.warn("Falha ao notificar sobre resposta do ticket:", e);
    }

    revalidatePath(`/suporte/${ticketId}`);
    revalidatePath(`/admin/tickets/${ticketId}`);
    
    return { success: true };
  });

const updateTicketStatusSchema = z.object({
  ticketId: z.string().uuid(),
  status: z.enum(["OPEN", "PENDING", "CLOSED"]),
});

export const updateTicketStatusAction = actionClient
  .schema(updateTicketStatusSchema)
  .action(async ({ parsedInput: { ticketId, status } }) => {
    const supabase = await createClient();
    
    // Auth & Authorization handled via RLS or Middleware, but doing basic check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Não autenticado");
    }

    const { error } = await supabase
      .from("tickets")
      .update({ status })
      .eq("id", ticketId);

    if (error) {
      throw new Error("Erro ao atualizar status: " + error.message);
    }

    // Notificar o dono do ticket sobre a alteração de status
    try {
      const { data: ticket } = await supabase
        .from("tickets")
        .select("user_id, subject, assunto")
        .eq("id", ticketId)
        .single();

      if (ticket) {
        const statusLabel = status === 'CLOSED' ? 'Encerrado' : status === 'PENDING' ? 'Em Andamento' : 'Aberto';
        await supabase.from("notifications").insert({
          user_id: ticket.user_id,
          type: "ticket",
          title: `Status do Chamado: ${statusLabel}`,
          message: `O status do seu chamado "${ticket.subject || ticket.assunto || 'Suporte'}" foi alterado para ${statusLabel}.`,
          priority: status === 'CLOSED' ? 'info' : 'warning',
          action_url: `/suporte/${ticketId}`,
        });
      }
    } catch (e) {
      console.warn("Falha ao notificar sobre alteração de status:", e);
    }

    revalidatePath(`/suporte/${ticketId}`);
    revalidatePath(`/admin/tickets/${ticketId}`);
    revalidatePath(`/admin/tickets`);
    
    return { success: true };
  });
