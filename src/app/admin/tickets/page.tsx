import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, LifeBuoy, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminTicketsPage() {
  const supabase = await createClient();
  
  // Buscar todos os tickets
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <div className="p-8 text-red-500">Erro ao buscar tickets: {error.message}</div>;

  // Extrair IDs de usuários únicos e buscar seus perfis
  const userIds = Array.from(new Set(tickets?.map((t) => t.user_id).filter(Boolean)));
  
  let profileMap: Record<string, { nome?: string; email?: string; username?: string }> = {};

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, nome, email, username")
      .in("id", userIds);

    if (profiles) {
      profileMap = profiles.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {} as Record<string, { nome?: string; email?: string; username?: string }>);
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <LifeBuoy className="h-5 w-5" />
            </div>
            Painel SYSADMIN - Tickets
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gerenciamento de chamados de suporte dos alunos e usuários
          </p>
        </div>
      </div>
      
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            <span>Todos os Chamados ({tickets?.length || 0})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!tickets || tickets.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum ticket aberto no momento.
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const userProfile = profileMap[ticket.user_id];
                const userName = userProfile?.nome || userProfile?.email || "Usuário não identificado";
                const userEmail = userProfile?.email || "";
                const userUsername = userProfile?.username ? `@${userProfile.username}` : "";

                return (
                  <Link href={`/admin/tickets/${ticket.id}`} key={ticket.id} className="block group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-muted/30 transition-all gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base truncate">
                          {ticket.subject}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground/80 flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-primary" />
                            {userName}
                          </span>
                          
                          {userUsername && (
                            <span className="text-muted-foreground/70">
                              {userUsername}
                            </span>
                          )}

                          {userEmail && (
                            <span className="flex items-center gap-1 text-muted-foreground/70">
                              <Mail className="h-3 w-3" />
                              {userEmail}
                            </span>
                          )}

                          <span className="flex items-center gap-1 text-muted-foreground/60">
                            <Clock className="h-3 w-3" />
                            {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
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
                        <Badge 
                          variant={ticket.priority === 'URGENT' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
