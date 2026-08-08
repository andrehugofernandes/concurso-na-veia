import React from "react";
import { Users, BookOpen, Layers, LifeBuoy, PlusCircle, ArrowRight, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Total de Alunos
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // 2. Total de Aulas Geradas
  const { count: totalAulas } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true });

  // 3. Total de Concursos Cadastrados
  const { count: totalConcursos } = await supabase
    .from("concursos")
    .select("*", { count: "exact", head: true });

  // 4. Total de Tickets de Suporte (B2C)
  const { count: totalTickets } = await supabase
    .from("tickets")
    .select("*", { count: "exact", head: true });

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel SYSADMIN</h1>
        <p className="text-muted-foreground mt-1">
          Gestão centralizada de Cursos por Edital, Tenants, Usuários e Atendimento B2C.
        </p>
      </div>

      {/* Cards Principais de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total de Alunos */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">Total de Alunos</h3>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">{totalUsers || 0}</span>
          </div>
          <div className="mt-2 text-xs text-emerald-500 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>Alunos B2C e Tenants cadastrados</span>
          </div>
        </div>

        {/* Card 2: Cursos Gerados */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">Aulas Geradas</h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">{totalAulas || 0}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Aulas criadas via Edital IA
          </div>
        </div>

        {/* Card 3: Portais & Tenants */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">Concursos Cadastrados</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">{totalConcursos || 0}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Concursos públicos com editais processados
          </div>
        </div>

        {/* Card 4: Tickets de Suporte */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">Tickets de Suporte</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <LifeBuoy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">{totalTickets || 0}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Atendimento a dúvidas dos Alunos B2C
          </div>
        </div>
      </div>

      {/* Ações Rápidas do Sistema */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Ações de Gestão Core</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/cursos/novo"
            className="group bg-card border border-border hover:border-primary/50 rounded-2xl p-6 transition-all shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                Criar Novo Curso a partir de Edital
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Wizard inteligente de extração de ementa com parágrafos C.E.D.E.A, acordeões, podcasts e simulados no padrão da banca.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/cursos"
            className="group bg-card border border-border hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-indigo-500 transition-colors">
                Gestão de Concursos & Exclusão SYSADMIN
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Visualização de status da vitrine, ativador de editais e exclusão segura de concursos.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/usuarios"
            className="group bg-card border border-border hover:border-emerald-500/50 rounded-2xl p-6 transition-all shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                Gerenciamento de Alunos & Roles
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Controle de permissões (SYSADMIN, ADMIN, ALUNO) e gestão de acessos de alunos.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/tickets"
            className="group bg-card border border-border hover:border-purple-500/50 rounded-2xl p-6 transition-all shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-purple-500 transition-colors">
                Painel de Tickets & Suporte B2C
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Atendimento direto aos alunos, resolução de chamados de suporte e interação com IA/humano.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
