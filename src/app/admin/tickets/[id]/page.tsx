import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, ArrowLeft, Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReplyForm } from "@/components/tickets/ReplyForm";
import { AdminTicketAiResolver } from "@/components/admin/AdminTicketAiResolver";

export default async function AdminTicketDetailPage({ 
  params 
}: { 
  params: { id: string } | Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const ticketId = resolvedParams.id;

  const supabase = await createClient();

  const { data: ticket, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", ticketId)
    .single();

  if (error || !ticket) {
    return notFound();
  }

  // Buscar perfil do usuário dono do ticket
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("id, nome, email, username")
    .eq("id", ticket.user_id)
    .single();

  const { data: initialMessages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", ticket.id)
    .order("created_at", { ascending: true });

  const userName = userProfile?.nome || userProfile?.email || "Aluno";
  const userEmail = userProfile?.email || "";
  const userUsername = userProfile?.username ? `@${userProfile.username}` : "";

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      {/* Back Button & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href="/admin/tickets">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar aos Chamados
          </Button>
        </Link>
      </div>

      <Card className="border border-border shadow-md bg-card overflow-hidden rounded-3xl">
        {/* Ticket Header */}
        <CardHeader className="border-b border-border/60 bg-muted/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
                  Ticket #{ticket.id.slice(0, 8)}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    ticket.status === 'ABERTO' 
                      ? 'border-emerald-500/40 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20'
                      : 'border-slate-400 text-slate-500'
                  }
                >
                  {ticket.status}
                </Badge>
                <Badge variant={ticket.priority === 'URGENT' ? 'destructive' : 'secondary'}>
                  {ticket.priority}
                </Badge>
              </div>

              <CardTitle className="text-2xl font-black text-foreground tracking-tight">
                {ticket.subject}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  {userName}
                </span>

                {userUsername && (
                  <span className="text-muted-foreground/80">
                    {userUsername}
                  </span>
                )}

                {userEmail && (
                  <span className="flex items-center gap-1 text-muted-foreground/70">
                    <Mail className="h-3.5 w-3.5" />
                    {userEmail}
                  </span>
                )}
              </div>
            </div>

            {/* Painel de Ações de IA Davi */}
            <div className="w-full md:w-auto shrink-0">
              <AdminTicketAiResolver ticketId={ticket.id} userName={userName} />
            </div>
          </div>
        </CardHeader>

        {/* Conversation Timeline */}
        <CardContent className="p-0">
          <div className="flex flex-col space-y-5 p-6 md:p-8 bg-slate-50 dark:bg-slate-900/40 min-h-[420px]">
            {(!initialMessages || initialMessages.length === 0) ? (
              <div className="text-center py-16 text-muted-foreground text-sm">
                Nenhuma mensagem registrada até o momento.
              </div>
            ) : (
              initialMessages.map((msg) => {
                const isUser = msg.sender_id === ticket.user_id;
                const isAi = msg.is_ai_generated;
                
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${
                      !isUser && !isAi ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1 text-xs text-muted-foreground">
                      {isAi ? (
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Bot className="h-3.5 w-3.5" /> 🤖 Davi (Tutor IA)
                        </span>
                      ) : isUser ? (
                        <span className="font-bold text-foreground flex items-center gap-1">
                          <User className="h-3.5 w-3.5" /> {userName}
                        </span>
                      ) : (
                        <span className="font-bold text-primary flex items-center gap-1">
                          👑 Suporte SYSADMIN
                        </span>
                      )}
                      <span>•</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div 
                      className={`p-4 md:p-5 rounded-2xl shadow-xs leading-relaxed text-sm ${
                        isAi
                          ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-600/10 border border-emerald-500/30 text-foreground font-medium'
                          : !isUser
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'bg-card border border-border text-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      
                      {/* Anexos e prints */}
                      {msg.attachment_urls && msg.attachment_urls.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border/40">
                          <span className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
                            📸 Anexos / Capturas de Tela:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {msg.attachment_urls.map((url: string, i: number) => (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={url} 
                                  alt={`Anexo ${i + 1}`} 
                                  className="h-28 w-auto object-cover rounded-xl border border-border bg-black/10 group-hover:scale-105 transition-transform duration-200" 
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Form de Resposta Manual do Admin */}
          <div className="p-6 border-t border-border bg-card">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Enviar Resposta Manual
            </h4>
            <ReplyForm ticketId={ticket.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
