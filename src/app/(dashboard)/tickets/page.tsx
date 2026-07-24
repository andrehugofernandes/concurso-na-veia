'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket } from '@/lib/types';
import { getTicketsAction, createTicketAction, deleteTicketAction, updateTicketAction } from '@/lib/actions/tickets';
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
  LuCrown,
  LuPaperclip,
  LuImage,
  LuPencil,
  LuTrash2
} from 'react-icons/lu';
import { uploadTicketAttachmentAction } from '@/actions/uploads';

const ticketSchema = z.object({
  assunto: z.string().min(3, 'O assunto deve ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  mensagem: z.string().min(10, 'A mensagem deve ser mais detalhada (min 10 caracteres)'),
  attachment_urls: z.array(z.string()).optional(),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_TOTAL_SIZE = 2 * 1024 * 1024; // 2MB total limit
  const totalSizeBytes = files.reduce((acc, f) => acc + f.size, 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const percentageUsed = Math.min(100, (totalSizeBytes / MAX_TOTAL_SIZE) * 100);
  const isLimitExceeded = totalSizeBytes > MAX_TOTAL_SIZE;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} não é uma imagem válida.`);
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError(`${file.name} excede o limite de 2MB por arquivo.`);
        return false;
      }
      return true;
    });

    const newTotal = totalSizeBytes + validFiles.reduce((acc, f) => acc + f.size, 0);
    if (newTotal > MAX_TOTAL_SIZE) {
      setError("O tamanho total dos arquivos excede o limite máximo de 2MB.");
    } else {
      setError(null);
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      const pastedFiles = Array.from(items)
        .filter(item => item.type.indexOf('image') !== -1)
        .map(item => item.getAsFile())
        .filter((file): file is File => file !== null);
      
      if (pastedFiles.length > 0) {
        handleFiles(pastedFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TicketFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const uploadedUrls: string[] = [];
      
      // Fazer upload das imagens, se existirem
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          
          const uploadResult = await uploadTicketAttachmentAction(formData);
          if (uploadResult?.data?.url) {
            uploadedUrls.push(uploadResult.data.url);
          } else {
            setError(`Erro ao fazer upload da imagem ${file.name}`);
            setSubmitting(false);
            return;
          }
        }
      }

      data.attachment_urls = uploadedUrls;
      
      const response = await createTicketAction(data);
      if (response.status === 'success' && response.data) {
        setTickets([response.data, ...tickets]);
        setIsModalOpen(false);
        setFiles([]);
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

  const handleDeleteTicket = async (ticketId: string) => {
    setDeletingLoading(true);
    try {
      const res = await deleteTicketAction(ticketId);
      if (res.status === 'success') {
        setTickets(prev => prev.filter(t => t.id !== ticketId));
        setDeletingTicketId(null);
      } else {
        alert(res.error || 'Erro ao excluir o chamado.');
      }
    } catch (e) {
      alert('Erro inesperado ao excluir o chamado.');
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleEditOpen = (ticket: Ticket) => {
    setEditingTicket(ticket);
    reset({
      assunto: ticket.assunto,
      categoria: ticket.categoria,
      mensagem: ticket.mensagem,
    });
  };

  const handleEditSubmit = async (data: TicketFormValues) => {
    if (!editingTicket) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await updateTicketAction(editingTicket.id, data);
      if (res.status === 'success' && res.data) {
        setTickets(prev => prev.map(t => t.id === editingTicket.id ? { ...t, ...res.data } : t));
        setEditingTicket(null);
        reset();
      } else {
        setError(res.error || 'Erro ao atualizar ticket.');
      }
    } catch (e) {
      setError('Erro ao atualizar ticket.');
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
            className="flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition shadow-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
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
                className="bg-white dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700/50 rounded-xl p-4 md:py-3.5 md:px-5 transition-all hover:border-zinc-300 dark:hover:border-slate-600 shadow-sm dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${getStatusStyle(ticket.status)}`}>
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
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white truncate min-w-fit">
                      {ticket.assunto}
                    </h3>
                    <span className="hidden md:inline text-zinc-400">•</span>
                    <p className="text-xs text-zinc-500 dark:text-gray-400 truncate max-w-xl">
                      {ticket.mensagem}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-slate-700/50 justify-between md:justify-end">
                  {ticket.attachment_urls && ticket.attachment_urls.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      {ticket.attachment_urls.map((url, idx) => (
                        <div 
                          key={idx}
                          className="relative group w-9 h-9 rounded-lg overflow-hidden border border-zinc-200 dark:border-slate-700 bg-zinc-100 dark:bg-slate-800 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(url);
                          }}
                          title={`Visualizar anexo ${idx + 1}`}
                        >
                          <img src={url} alt={`Anexo ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sessão de Botões de Ação (Editar e Apagar) */}
                  <div className="flex items-center gap-1 pl-2 border-l border-zinc-200 dark:border-slate-700">
                    <button
                      onClick={() => handleEditOpen(ticket)}
                      title="Editar Chamado"
                      className="p-2 text-zinc-500 hover:text-primary hover:bg-zinc-100 dark:hover:bg-slate-700/60 rounded-lg transition"
                    >
                      <LuPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingTicketId(ticket.id)}
                      title="Apagar Chamado"
                      className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                  <div 
                    onDrop={handleDrop} 
                    onDragOver={handleDragOver}
                    className="space-y-2 border-2 border-dashed border-transparent focus-within:border-primary/20 hover:border-primary/20 rounded-md p-1 transition-colors"
                  >
                    <textarea
                      {...register('mensagem')}
                      rows={4}
                      onPaste={handlePaste}
                      placeholder="Descreva detalhadamente sua dúvida ou problema... (Você pode colar CTRL+V ou arrastar imagens aqui)"
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    ></textarea>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-slate-600 rounded-md hover:bg-zinc-100 dark:hover:bg-slate-800 transition"
                        >
                          <LuPaperclip className="h-4 w-4" />
                          Anexar Prints (Max 2MB)
                        </button>
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">ou cole a imagem com CTRL+V</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          className="hidden"
                        />
                      </div>
                      
                      {files.length > 0 && (
                        <div className="space-y-3 mt-3">
                          {/* Barra de Progresso de Tamanho dos Dados */}
                          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-slate-800/80 border border-zinc-200 dark:border-slate-700/60 space-y-1.5">
                            <div className="flex justify-between items-center text-xs font-semibold">
                              <span className="text-zinc-600 dark:text-gray-300">
                                Total dos Anexos:
                              </span>
                              <span className={isLimitExceeded ? 'text-red-500 font-bold' : 'text-zinc-600 dark:text-gray-400'}>
                                {totalSizeMB} MB / 2.00 MB
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-zinc-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  isLimitExceeded 
                                    ? 'bg-red-500' 
                                    : percentageUsed > 80 
                                      ? 'bg-amber-500' 
                                      : 'bg-primary'
                                }`}
                                style={{ width: `${percentageUsed}%` }}
                              />
                            </div>
                            {isLimitExceeded && (
                              <p className="text-[11px] text-red-500 font-medium">
                                ⚠️ Tamanho total excede 2MB. Remova algumas imagens antes de enviar.
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {files.map((file, idx) => {
                              const objectUrl = URL.createObjectURL(file);
                              return (
                                <div 
                                  key={idx} 
                                  className="relative group border border-zinc-200 dark:border-slate-700 rounded-md p-1 bg-zinc-100/50 dark:bg-slate-800 w-16 h-16 flex items-center justify-center overflow-hidden cursor-pointer"
                                  onClick={() => setPreviewImage(objectUrl)}
                                >
                                  <img 
                                    src={objectUrl} 
                                    alt={file.name} 
                                    className="w-full h-full object-cover rounded"
                                  />
                                  <span className="absolute bottom-0 w-full text-[8px] truncate px-1 text-center bg-black/60 text-white">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFile(idx);
                                    }}
                                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                  >
                                    <LuX className="h-3 w-3" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setFiles([]); }}
                    className="px-5 py-2.5 text-zinc-600 dark:text-gray-400 font-medium hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || isLimitExceeded}
                    className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
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
        {/* Modal Editar Ticket */}
        {editingTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={() => { setEditingTicket(null); reset(); }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition"
              >
                <LuX size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <LuPencil className="text-primary" /> Editar Chamado
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Categoria
                  </label>
                  <select
                    {...register('categoria')}
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option value="Dúvida Técnica">Dúvida Técnica</option>
                    <option value="Dúvida de Conteúdo">Dúvida de Conteúdo</option>
                    <option value="Faturamento">Faturamento / Pagamento</option>
                    <option value="Sugestão">Sugestão de Melhoria</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    {...register('assunto')}
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    {...register('mensagem')}
                    rows={4}
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => { setEditingTicket(null); reset(); }}
                    className="px-5 py-2.5 text-zinc-600 dark:text-gray-400 font-medium hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition"
                  >
                    {submitting ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Exclusão */}
        {deletingTicketId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl text-center animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuTrash2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Excluir Chamado
              </h3>
              <p className="text-sm text-zinc-500 dark:text-gray-400 mb-6">
                Tem certeza que deseja excluir este chamado? Esta ação não poderá ser desfeita.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeletingTicketId(null)}
                  className="px-4 py-2 text-zinc-600 dark:text-gray-400 font-medium hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteTicket(deletingTicketId)}
                  disabled={deletingLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                >
                  {deletingLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Preview de Imagem */}
        {previewImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 p-2">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black/90 transition"
              >
                <LuX size={20} />
              </button>
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
