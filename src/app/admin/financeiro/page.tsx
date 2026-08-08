"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Zap, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  ArrowUpRight, 
  Sparkles, 
  Award, 
  PieChart as PieChartIcon, 
  BarChart3, 
  RefreshCw,
  CheckCircle2,
  FileSpreadsheet,
  Building2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";

interface PaymentRecord {
  id: string;
  user_id: string;
  gateway: 'stripe' | 'infinitepay_pix' | string;
  method: 'credit_card' | 'pix' | string;
  amount_cents: number;
  status: 'paid' | 'pending' | 'refunded' | string;
  plan: string;
  concurso_slug: string | null;
  gateway_transaction_id: string | null;
  paid_at: string;
  created_at: string;
  profile?: {
    nome?: string;
    email?: string;
    username?: string;
  };
}

const GATEWAY_CONFIG: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  'infinitepay_pix': { 
    label: 'InfinitePay (Pix)', 
    bg: 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/40', 
    text: 'text-emerald-600 dark:text-emerald-400 font-bold', 
    icon: Zap 
  },
  'stripe': { 
    label: 'Stripe (Cartão)', 
    bg: 'bg-indigo-500/10 border-indigo-500/30 dark:bg-indigo-950/40', 
    text: 'text-indigo-600 dark:text-indigo-400 font-bold', 
    icon: CreditCard 
  },
};

const PLAN_COLORS: Record<string, string> = {
  'elite-total': '#f59e0b', // Amber / Gold
  'aprovado-superior': '#0284c7', // Sky Blue
  'aprovado-medio': '#10b981', // Emerald
  'free': '#94a3b8',
};

const DAY_NAMES = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function FinanceiroAdminPage() {
  const supabase = createClient();

  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<number>(30); // 7, 30, 90 dias

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      // Buscar pagamentos
      const { data: payData, error: payErr } = await supabase
        .from("payments")
        .select("*")
        .order("paid_at", { ascending: false });

      if (payErr) throw payErr;

      // Buscar dados de perfis para cruzar os alunos
      const userIds = Array.from(new Set((payData || []).map((p) => p.user_id).filter(Boolean)));
      
      let profileMap: Record<string, any> = {};
      if (userIds.length > 0) {
        const { data: profData } = await supabase
          .from("profiles")
          .select("id, nome, email, username")
          .in("id", userIds);

        if (profData) {
          profileMap = profData.reduce((acc, prof) => {
            acc[prof.id] = prof;
            return acc;
          }, {} as Record<string, any>);
        }
      }

      const enriched = (payData || []).map((p) => ({
        ...p,
        profile: profileMap[p.user_id] || {}
      }));

      setPayments(enriched);
    } catch (err) {
      console.error("[FinanceiroAdmin] Erro ao buscar vendas:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Cálculos Financeiros e Métricas Inteligentes ────────────────────────────

  const metrics = useMemo(() => {
    const paidOnly = payments.filter((p) => p.status === 'paid');

    const totalRevenueCents = paidOnly.reduce((acc, p) => acc + p.amount_cents, 0);
    const stripeRevenueCents = paidOnly
      .filter((p) => p.gateway === 'stripe')
      .reduce((acc, p) => acc + p.amount_cents, 0);
    const pixRevenueCents = paidOnly
      .filter((p) => p.gateway === 'infinitepay_pix')
      .reduce((acc, p) => acc + p.amount_cents, 0);

    const ticketMedioCents = paidOnly.length > 0 ? totalRevenueCents / paidOnly.length : 0;

    // ── Agrupamento por Dia da Semana (Para descobrir o Dia Campeão) ──────────
    const salesByDayOfWeek: Record<number, { count: number; totalCents: number }> = {
      0: { count: 0, totalCents: 0 },
      1: { count: 0, totalCents: 0 },
      2: { count: 0, totalCents: 0 },
      3: { count: 0, totalCents: 0 },
      4: { count: 0, totalCents: 0 },
      5: { count: 0, totalCents: 0 },
      6: { count: 0, totalCents: 0 },
    };

    paidOnly.forEach((p) => {
      const date = new Date(p.paid_at || p.created_at);
      const dayIndex = date.getDay(); // 0 = Dom, 1 = Seg, 2 = Ter...
      salesByDayOfWeek[dayIndex].count += 1;
      salesByDayOfWeek[dayIndex].totalCents += p.amount_cents;
    });

    // Encontrar o dia campeão de vendas
    let topDayIndex = 0;
    let maxDayRevenue = 0;
    Object.entries(salesByDayOfWeek).forEach(([dayStr, data]) => {
      if (data.totalCents > maxDayRevenue) {
        maxDayRevenue = data.totalCents;
        topDayIndex = parseInt(dayStr);
      }
    });

    // ── Dados para Gráfico de Evolução Temporal (Últimos N dias) ──────────────
    const dailyMap: Record<string, { date: string; stripe: number; pix: number; total: number }> = {};

    // Preenche os últimos N dias no mapa
    for (let i = timeRange - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      dailyMap[key] = { date: label, stripe: 0, pix: 0, total: 0 };
    }

    paidOnly.forEach((p) => {
      const dateKey = new Date(p.paid_at || p.created_at).toISOString().split('T')[0];
      if (dailyMap[dateKey]) {
        const val = p.amount_cents / 100;
        if (p.gateway === 'stripe') {
          dailyMap[dateKey].stripe += val;
        } else {
          dailyMap[dateKey].pix += val;
        }
        dailyMap[dateKey].total += val;
      }
    });

    const chartTimeline = Object.values(dailyMap);

    // ── Distribuição por Plano ──────────────────────────────────────────────
    const planMap: Record<string, number> = {};
    paidOnly.forEach((p) => {
      const planName = p.plan || 'outro';
      planMap[planName] = (planMap[planName] || 0) + (p.amount_cents / 100);
    });

    const chartPlans = Object.entries(planMap).map(([name, value]) => ({
      name: name === 'elite-total' ? '💎 Elite Total' : name === 'aprovado-superior' ? 'Aprovado Superior' : name === 'aprovado-medio' ? 'Aprovado Médio' : name,
      value,
      color: PLAN_COLORS[name] || '#64748b'
    }));

    // ── Faturamento por Concurso ─────────────────────────────────────────────
    const concursoMap: Record<string, number> = {};
    paidOnly.forEach((p) => {
      const cSlug = (p.concurso_slug || 'geral').toUpperCase();
      concursoMap[cSlug] = (concursoMap[cSlug] || 0) + (p.amount_cents / 100);
    });

    const chartConcursos = Object.entries(concursoMap).map(([slug, value]) => ({
      concurso: slug,
      faturamento: value
    })).sort((a, b) => b.faturamento - a.faturamento);

    return {
      totalRevenue: totalRevenueCents / 100,
      stripeRevenue: stripeRevenueCents / 100,
      pixRevenue: pixRevenueCents / 100,
      ticketMedio: ticketMedioCents / 100,
      totalCount: paidOnly.length,
      stripeCount: paidOnly.filter((p) => p.gateway === 'stripe').length,
      pixCount: paidOnly.filter((p) => p.gateway === 'infinitepay_pix').length,
      topDayName: DAY_NAMES[topDayIndex],
      topDayCount: salesByDayOfWeek[topDayIndex].count,
      topDayRevenue: salesByDayOfWeek[topDayIndex].totalCents / 100,
      salesByDayOfWeek,
      chartTimeline,
      chartPlans,
      chartConcursos
    };
  }, [payments, timeRange]);

  // ── Filtro da Tabela de Vendas ──────────────────────────────────────────────

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        !search ||
        p.profile?.nome?.toLowerCase().includes(search.toLowerCase()) ||
        p.profile?.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.gateway_transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
        p.plan.toLowerCase().includes(search.toLowerCase());

      const matchesGateway =
        gatewayFilter === "all" || p.gateway === gatewayFilter;

      return matchesSearch && matchesGateway;
    });
  }, [payments, search, gatewayFilter]);

  // Exportar Relatório CSV
  const handleExportCSV = () => {
    if (payments.length === 0) return;

    const headers = ["ID Transacao", "Aluno", "Email", "Gateway", "Metodo", "Valor (R$)", "Plano", "Concurso", "Data Pago"];
    const rows = payments.map((p) => [
      p.gateway_transaction_id || p.id,
      p.profile?.nome || "Aluno",
      p.profile?.email || "",
      p.gateway === "infinitepay_pix" ? "InfinitePay Pix" : "Stripe Cartao",
      p.method,
      (p.amount_cents / 100).toFixed(2),
      p.plan,
      p.concurso_slug || "geral",
      new Date(p.paid_at || p.created_at).toLocaleString("pt-BR")
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_vendas_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
              <TrendingUp className="h-5 w-5" />
            </div>
            Inteligência Financeira & Vendas
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Mapeamento unificado Stripe (Cartão) vs InfinitePay (Pix) com análise de dias de pico
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex bg-muted/60 p-1 rounded-xl border border-border">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setTimeRange(days)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === days
                    ? "bg-card text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {days} Dias
              </button>
            ))}
          </div>

          <button
            onClick={fetchPayments}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition shadow-sm"
            title="Atualizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:brightness-110 transition shadow-sm"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Glassmorphism & Gradients) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Faturamento Total */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-emerald-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Faturamento Total</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black tracking-tight text-foreground">
              R$ {metrics.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>{metrics.totalCount} vendas liquidadas</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pix via InfinitePay */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-card via-card to-emerald-500/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> InfinitePay (Pix)
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black tracking-tight text-foreground">
              R$ {metrics.pixRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">
              {metrics.pixCount} transações ({metrics.totalCount > 0 ? Math.round((metrics.pixCount / metrics.totalCount) * 100) : 0}% do volume)
            </div>
          </div>
        </div>

        {/* Card 3: Cartão via Stripe */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-card via-card to-indigo-500/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5" /> Stripe (Cartão)
            </span>
            <div className="h-9 w-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black tracking-tight text-foreground">
              R$ {metrics.stripeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">
              {metrics.stripeCount} transações ({metrics.totalCount > 0 ? Math.round((metrics.stripeCount / metrics.totalCount) * 100) : 0}% do volume)
            </div>
          </div>
        </div>

        {/* Card 4: Ticket Médio */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-amber-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ticket Médio</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black tracking-tight text-foreground">
              R$ {metrics.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Alta conversão nos planos Elite
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD DE DESTAQUE CRIATIVO: DIA CAMPEÃO DE VENDAS ───────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-primary/10 p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Inteligência de Conversão
            </div>
            <h3 className="text-2xl font-black tracking-tight text-foreground">
              🏆 O dia campeão de vendas é a <span className="text-amber-600 dark:text-amber-400 underline decoration-amber-500/50 underline-offset-4">{metrics.topDayName}</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mapeamento de inteligência: <strong>{metrics.topDayName}</strong> concentra o maior volume financeiro (R$ {metrics.topDayRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) com <strong>{metrics.topDayCount} vendas registradas</strong>. 
            </p>
          </div>

          <div className="bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center shrink-0 text-center min-w-[200px]">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recomendação</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">Disparar Remarketing</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Toda {metrics.topDayName} às 14h</span>
          </div>
        </div>

        {/* Heatmap dos Dias da Semana */}
        <div className="grid grid-cols-7 gap-2 mt-6 pt-6 border-t border-amber-500/20">
          {DAY_NAMES.map((dayName, idx) => {
            const data = metrics.salesByDayOfWeek[idx] || { count: 0, totalCents: 0 };
            const isTop = dayName === metrics.topDayName;
            return (
              <div
                key={dayName}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isTop
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md scale-105"
                    : "bg-card/50 border-border text-foreground hover:bg-card"
                }`}
              >
                <div className={`text-[11px] uppercase font-bold tracking-wider ${isTop ? 'text-slate-950' : 'text-muted-foreground'}`}>
                  {dayName.slice(0, 3)}
                </div>
                <div className="text-lg font-black mt-1">
                  {data.count}
                </div>
                <div className={`text-[10px] ${isTop ? 'text-slate-900 font-bold' : 'text-muted-foreground'}`}>
                  R$ {(data.totalCents / 100).toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SEÇÃO DE GRÁFICOS (Recharts) ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico 1: Evolução Diária (Stripe vs InfinitePay Pix) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Evolução do Faturamento Diário
              </h3>
              <p className="text-xs text-muted-foreground">
                Comparativo de receita acumulada nos últimos {timeRange} dias por gateway
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> InfinitePay (Pix)
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Stripe (Cartão)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.chartTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPix" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorStripe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Faturamento']}
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="pix" name="InfinitePay (Pix)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPix)" />
                <Area type="monotone" dataKey="stripe" name="Stripe (Cartão)" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStripe)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Distribuição por Plano */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-amber-500" />
              Vendas por Plano
            </h3>
            <p className="text-xs text-muted-foreground">
              Participação de receita dos planos de estudo
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.chartPlans}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {metrics.chartPlans.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Receita']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            {metrics.chartPlans.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="text-foreground">R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABELA DE TRANSAÇÕES RECENTES COM FILTRO E BUSCA ────────────────────── */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-xl tracking-tight">Histórico Detalhado de Vendas</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Transações consolidadas via Stripe e InfinitePay (Pix)
            </p>
          </div>

          {/* Filtros da Tabela */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por aluno, email ou ID..."
                className="w-full sm:w-64 h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Gateway Filter */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-xl border border-border">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'infinitepay_pix', label: 'Pix' },
                { key: 'stripe', label: 'Stripe' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setGatewayFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    gatewayFilter === tab.key
                      ? "bg-card text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela de Vendas */}
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Aluno</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Gateway / Método</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Plano</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Concurso</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider">Data / Hora</th>
                <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Nenhuma venda encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pay) => {
                  const gwConfig = GATEWAY_CONFIG[pay.gateway] || GATEWAY_CONFIG['stripe'];
                  const GwIcon = gwConfig.icon;

                  return (
                    <tr key={pay.id} className="hover:bg-muted/20 transition-colors">
                      {/* Aluno Identity */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {pay.profile?.nome?.charAt(0)?.toUpperCase() || pay.profile?.email?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{pay.profile?.nome || 'Aluno'}</p>
                            <p className="text-[11px] text-muted-foreground">{pay.profile?.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Gateway Badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] ${gwConfig.bg} ${gwConfig.text}`}>
                          <GwIcon className="h-3 w-3" />
                          {gwConfig.label}
                        </span>
                      </td>

                      {/* Plano */}
                      <td className="p-4 font-medium text-foreground">
                        {pay.plan === 'elite-total' ? '💎 Elite Total' : pay.plan === 'aprovado-superior' ? 'Aprovado Superior' : pay.plan === 'aprovado-medio' ? 'Aprovado Médio' : pay.plan}
                      </td>

                      {/* Concurso */}
                      <td className="p-4">
                        <span className="uppercase font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded text-[10px]">
                          {pay.concurso_slug || 'GERAL'}
                        </span>
                      </td>

                      {/* Valor */}
                      <td className="p-4 font-black text-foreground text-sm">
                        R$ {(pay.amount_cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>

                      {/* Data */}
                      <td className="p-4 text-muted-foreground">
                        {new Date(pay.paid_at || pay.created_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      {/* Status */}
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" /> Aprovado
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
