'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { ActionResponse, createSuccessResponse, createErrorResponse } from '@/lib/actions/safe-action';
import { Ticket, CreateTicketInput } from '@/lib/types';

const ticketSchema = z.object({
  assunto: z.string().min(3, 'O assunto deve ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  mensagem: z.string().min(10, 'A mensagem deve ser mais detalhada (min 10 caracteres)'),
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
          assunto: validated.assunto,
          categoria: validated.categoria,
          mensagem: validated.mensagem,
          status: 'ABERTO'
        }
      ])
      .select()
      .single();

    if (error) {
      return createErrorResponse(`Erro ao criar ticket: ${error.message}`);
    }

    return createSuccessResponse(data as Ticket);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.issues[0].message);
    }
    return createErrorResponse(error.message || 'Erro ao criar ticket');
  }
}
