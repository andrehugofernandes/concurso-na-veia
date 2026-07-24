import { createClient } from "@/lib/supabase/server";
import { TicketForm } from "@/components/tickets/TicketForm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Meus Tickets de Suporte",
};

export default async function SuportePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Você precisa estar logado para acessar o suporte.</div>;
  }

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suporte</h1>
          <p className="text-muted-foreground">Gerencie seus chamados e tire dúvidas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulário Novo Ticket */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Abrir Chamado</CardTitle>
            <CardDescription>Envie sua dúvida e responderemos em breve.</CardDescription>
          </CardHeader>
          <CardContent>
            <TicketForm />
          </CardContent>
        </Card>

        {/* Lista de Tickets */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Meus Tickets</CardTitle>
            <CardDescription>Acompanhe o status dos seus chamados anteriores.</CardDescription>
          </CardHeader>
          <CardContent>
            {(!tickets || tickets.length === 0) ? (
              <p className="text-muted-foreground py-8 text-center">
                Você ainda não possui tickets abertos.
              </p>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Link href={`/suporte/${ticket.id}`} key={ticket.id} className="block">
                    <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Criado em: {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant={ticket.priority === 'URGENT' ? 'destructive' : 'secondary'}>
                          {ticket.priority}
                        </Badge>
                        <Badge variant={ticket.status === 'CLOSED' ? 'outline' : 'default'}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
