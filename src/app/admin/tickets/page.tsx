import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminTicketsPage() {
  const supabase = await createClient();
  
  // A simple fetch of all tickets. Realistically you'd want pagination.
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("*, user_id")
    .order("created_at", { ascending: false });

  if (error) return <div>Erro ao buscar tickets: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Painel SYSADMIN - Tickets</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Todos os Chamados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets?.map((ticket) => (
              <Link href={`/admin/tickets/${ticket.id}`} key={ticket.id} className="block">
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition">
                  <div>
                    <h3 className="font-semibold">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground">ID Usuário: {ticket.user_id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{ticket.status}</Badge>
                    <Badge variant={ticket.priority === 'URGENT' ? 'destructive' : 'secondary'}>{ticket.priority}</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
