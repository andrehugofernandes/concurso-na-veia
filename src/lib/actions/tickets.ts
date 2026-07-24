'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { ActionResponse, createSuccessResponse, createErrorResponse } from '@/lib/actions/safe-action';
import { Ticket, CreateTicketInput } from '@/lib/types';

const ticketSchema = z.object({
  assunto: z.string().min(3, 'O assunto deve ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  mensagem: z.string().min(10, 'A mensagem deve ser mais detalhada (min 10 caracteres)'),
  attachment_urls: z.array(z.string()).optional(),
});

export async function getTicketsAction(): Promise<ActionResponse<Ticket[]>> {
  try {
    const supabase = await createClient();
    
    // Obter usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return createErrorResponse('Usuário não autenticado');
    }

    // Buscar tickets do usuário
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return createErrorResponse(`Erro ao buscar tickets: ${error.message}`);
    }

    return createSuccessResponse(data as Ticket[]);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro inesperado ao buscar tickets');
  }
}

export async function createTicketAction(input: CreateTicketInput): Promise<ActionResponse<Ticket>> {
  try {
    const validated = ticketSchema.parse(input);
    const supabase = await createClient();

    // Obter usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return createErrorResponse('Usuário não autenticado');
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          user_id: user.id,
          subject: validated.assunto,
          assunto: validated.assunto,
          categoria: validated.categoria,
          mensagem: validated.mensagem,
          attachment_urls: validated.attachment_urls || [],
          status: 'ABERTO'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ [createTicketAction ERROR]:', error);
      return createErrorResponse(`Erro ao criar ticket: ${error.message}`);
    }

    // Criar notificação de confirmação para o usuário
    try {
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'ticket',
        title: 'Chamado Aberto com Sucesso',
        message: `Seu chamado "${validated.assunto}" foi recebido com sucesso. Nossa equipe responderá em breve.`,
        priority: 'info',
        action_url: '/tickets'
      });
    } catch (notifErr) {
      console.warn('Erro ao gerar notificação de ticket:', notifErr);
    }

    return createSuccessResponse(data as Ticket);
  } catch (error: any) {
    console.error('❌ [createTicketAction UNHANDLED ERROR]:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.issues[0].message);
    }
    return createErrorResponse(error.message || 'Erro ao criar ticket');
  }
}

export async function deleteTicketAction(ticketId: string): Promise<ActionResponse<boolean>> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return createErrorResponse('Usuário não autenticado');
    }

    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', ticketId)
      .eq('user_id', user.id);

    if (error) {
      console.error('❌ [deleteTicketAction ERROR]:', error);
      return createErrorResponse(`Erro ao deletar ticket: ${error.message}`);
    }

    return createSuccessResponse(true);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao deletar ticket');
  }
}

export async function updateTicketAction(ticketId: string, input: Partial<CreateTicketInput>): Promise<ActionResponse<Ticket>> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return createErrorResponse('Usuário não autenticado');
    }

    const updatePayload: Record<string, any> = {};
    if (input.assunto) {
      updatePayload.assunto = input.assunto;
      updatePayload.subject = input.assunto;
    }
    if (input.categoria) updatePayload.categoria = input.categoria;
    if (input.mensagem) updatePayload.mensagem = input.mensagem;
    if (input.attachment_urls) updatePayload.attachment_urls = input.attachment_urls;

    const { data, error } = await supabase
      .from('tickets')
      .update(updatePayload)
      .eq('id', ticketId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('❌ [updateTicketAction ERROR]:', error);
      return createErrorResponse(`Erro ao atualizar ticket: ${error.message}`);
    }

    return createSuccessResponse(data as Ticket);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao atualizar ticket');
  }
}
