'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket } from '@/lib/types';
import { getTicketsAction, createTicketAction } from '@/lib/actions/tickets';
import { getCurrentUserAction } from '@/lib/actions/auth';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  LuTicket, 
  LuPlus, 
  LuClock, 
  LuCircleCheck, 
  LuMessageSquare, 
  LuCircleAlert,
  LuX,
  LuCrown
} from 'react-icons/lu';

const ticketSchema = z.object({
  assunto: z.string().min(3, 'O assunto deve ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  mensagem: z.string().min(10, 'A mensagem deve ser mais detalhada (min 10 caracteres)'),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      assunto: '',
      categoria: '',
      mensagem: ''
    }
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const userResult = await getCurrentUserAction();
      if (userResult.status === 'success' && userResult.data?.plan) {
        setUserPlan(userResult.data.plan);
      }
      
      const response = await getTicketsAction();
      if (response.status === 'success') {
        setTickets(response.data || []);
      } else {
        console.error("Erro ao carregar tickets:", response.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TicketFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await createTicketAction(data);
      if (response.status === 'success' && response.data) {
        setTickets([response.data, ...tickets]);
        setIsModalOpen(false);
        reset();
      } else {
        setError(response.error || 'Erro ao criar ticket.');
      }
    } catch (err) {
      setError('Erro inesperado ao criar o chamado.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ABERTO':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30';
      case 'EM_ANDAMENTO':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30';
      case 'RESOLVIDO':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ABERTO': return <LuCircleAlert className="w-4 h-4" />;
      case 'EM_ANDAMENTO': return <LuClock className="w-4 h-4" />;
      case 'RESOLVIDO': return <LuCircleCheck className="w-4 h-4" />;
      default: return <LuMessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {userPlan === 'elite-total' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white shadow-lg shadow-yellow-500/20">
              <LuCrown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-yellow-600 dark:text-yellow-500 flex items-center gap-2">
                Suporte VIP Prioritário
              </h2>
              <p className="text-sm text-yellow-700/80 dark:text-yellow-500/80">
                Como membro Elite Total, seus tickets pulam a fila e são atendidos primeiro!
              </p>
            </div>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <LuTicket className="text-primary" /> 
              Meus Tickets
            </h1>
            <p className="text-zinc-500 dark:text-gray-400">
              Acompanhe suas solicitações de suporte ou abra um novo chamado.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition shadow-sm ${
              userPlan === 'elite-total' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-yellow-500/20' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            <LuPlus /> Novo Ticket {userPlan === 'elite-total' && 'VIP'}
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800/30 rounded-2xl border border-zinc-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <div className="text-6xl mb-4 flex justify-center text-zinc-300 dark:text-slate-600">
              <LuMessageSquare size={64} />
            </div>
            <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-2">
              Nenhum ticket aberto
            </h3>
            <p className="text-zinc-500 dark:text-gray-500 mb-6">
              Você ainda não abriu nenhuma solicitação de suporte.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700/50 rounded-xl p-6 transition-all hover:border-zinc-300 dark:hover:border-slate-600 shadow-sm dark:shadow-none flex flex-col md:flex-row gap-4 justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusStyle(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium">
                      {ticket.categoria}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-gray-500">
                      • {format(parseISO(ticket.created_at), "dd MMM yyyy, HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
                    {ticket.assunto}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-gray-300 line-clamp-2">
                    {ticket.mensagem}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Novo Ticket */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition"
              >
                <LuX size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
                Abrir Novo Chamado
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Categoria
                  </label>
                  <select
                    {...register('categoria')}
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option value="">Selecione uma categoria...</option>
                    <option value="Dúvida Técnica">Dúvida Técnica</option>
                    <option value="Dúvida de Conteúdo">Dúvida de Conteúdo</option>
                    <option value="Faturamento">Faturamento / Pagamento</option>
                    <option value="Sugestão">Sugestão de Melhoria</option>
                    <option value="Outros">Outros</option>
                  </select>
                  {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    {...register('assunto')}
                    placeholder="Resumo do problema"
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                  {errors.assunto && <p className="text-red-500 text-xs mt-1">{errors.assunto.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    {...register('mensagem')}
                    rows={4}
                    placeholder="Descreva detalhadamente sua dúvida ou problema..."
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  ></textarea>
                  {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-zinc-600 dark:text-gray-400 font-medium hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition flex items-center justify-center min-w-[120px]"
                  >
                    {submitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground" />
                    ) : (
                      'Enviar Ticket'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
