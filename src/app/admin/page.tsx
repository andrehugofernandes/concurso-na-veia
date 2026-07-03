import React from 'react';
import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Buscar contagem de usuários
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard SaaS</h1>
        <p className="text-muted-foreground mt-1">Visão geral do desempenho do SaaS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total de Usuários */}
        <div className="bg-card text-card-foreground border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total de Alunos</h3>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">{totalUsers || 0}</span>
          </div>
          <div className="mt-2 text-xs text-emerald-500 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>Atualizado agora</span>
          </div>
        </div>

        {/* Card 2: Assinaturas Ativas */}
        <div className="bg-card text-card-foreground border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Assinaturas Ativas</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">--</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Aguardando integração Stripe
          </div>
        </div>

        {/* Card 3: MRR */}
        <div className="bg-card text-card-foreground border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">MRR (Receita Mensal)</h3>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">R$ 0,00</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Aguardando integração Stripe
          </div>
        </div>

        {/* Card 4: Taxa de Conversão */}
        <div className="bg-card text-card-foreground border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Taxa de Conversão</h3>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">-- %</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Visitantes para Pagantes
          </div>
        </div>
      </div>
    </div>
  );
}
