import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReplyForm } from "@/components/tickets/ReplyForm";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div>Não logado</div>;

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!ticket || ticket.user_id !== user.id) {
    return notFound();
  }

  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", ticket.id)
    .order("created_at", { ascending: true });

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <Link href="/suporte">
        <Button variant="outline" size="sm">← Voltar aos Chamados</Button>
      </Link>

      <Card>
        <CardHeader className="border-b bg-muted/20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Criado em {new Date(ticket.created_at).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{ticket.priority}</Badge>
              <Badge>{ticket.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col space-y-4 p-6 bg-slate-50 dark:bg-slate-900/50 min-h-[400px]">
            {messages?.map((msg) => {
              const isMe = msg.sender_id === user.id;
              const isAi = msg.is_ai_generated;
              return (
                <div key={msg.id} className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-4 rounded-xl ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    
                    {msg.attachment_urls && msg.attachment_urls.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.attachment_urls.map((url: string, i: number) => (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={url} 
                              alt="Anexo" 
                              className="h-24 w-auto object-cover rounded-md border bg-black/10 hover:opacity-90 transition-opacity" 
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-1">
                    {isAi ? 'Assistente Virtual' : isMe ? 'Você' : 'Suporte Técnico'} • {new Date(msg.created_at).toLocaleTimeString('pt-BR')}
                  </span>
                </div>
              );
            })}
          </div>

          {ticket.status !== 'CLOSED' && (
            <div className="p-4 border-t bg-background">
               <ReplyForm ticketId={ticket.id} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
