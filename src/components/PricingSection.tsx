"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LuTarget, 
  LuBrain, 
  LuCircleCheck, 
  LuTrendingUp, 
  LuGraduationCap, 
  LuSettings,
  LuCheck,
  LuX,
  LuZap,
  LuCrown
} from "react-icons/lu";

type Nivel = "medio" | "superior";

const PLANOS = {
  medio: {
    aprovado: {
      id: "aprovado-medio",
      nome: "Aprovado",
      preco: "49",
      centavos: ",99",
      descricao: "Tudo para sua aprovação no técnico",
      features: [
        { text: "Questões ilimitadas", included: true },
        { text: "Explicações com IA", included: true },
        { text: "Simulados completos", included: true },
        { text: "Histórico + Gráficos", included: true },
        { text: "Professor IA 24h", included: false },
        { text: "Mentoria semanal", included: false },
      ],
    },
    elite: {
      id: "elite-medio",
      nome: "Elite",
      preco: "79",
      centavos: ",99",
      descricao: "Experiência completa com mentoria e IA",
      badge: "MAIS POPULAR",
      features: [
        { text: "Tudo do Aprovado", included: true, highlight: true },
        { text: "Professor IA 24h", included: true, highlight: true },
        { text: "Mentoria semanal", included: true, highlight: true },
        { text: "Cronograma pessoal", included: true, highlight: true },
        { text: "Acesso antecipado", included: true },
        { text: "Suporte prioritário", included: true },
      ],
    },
  },
  superior: {
    aprovado: {
      id: "aprovado-superior",
      nome: "Aprovado",
      preco: "69",
      centavos: ",99",
      descricao: "Tudo para sua aprovação no superior",
      features: [
        { text: "Questões ilimitadas", included: true },
        { text: "Explicações com IA", included: true },
        { text: "Simulados completos", included: true },
        { text: "Histórico + Gráficos", included: true },
        { text: "Professor IA 24h", included: false },
        { text: "Mentoria semanal", included: false },
      ],
    },
    elite: {
      id: "elite-superior",
      nome: "Elite",
      preco: "119",
      centavos: ",99",
      descricao: "Experiência completa com mentoria e IA",
      badge: "RECOMENDADO",
      features: [
        { text: "Tudo do Aprovado", included: true, highlight: true },
        { text: "Professor IA 24h", included: true, highlight: true },
        { text: "Mentoria semanal", included: true, highlight: true },
        { text: "Cronograma pessoal", included: true, highlight: true },
        { text: "Acesso antecipado", included: true },
        { text: "Suporte prioritário", included: true },
      ],
    },
  },
};

export default function PricingSection() {
  const [nivel, setNivel] = useState<Nivel>("medio");
  const planos = PLANOS[nivel];

  return (
    <section
      id="pricing"
      className="py-24 bg-slate-50/50 dark:bg-background border-t border-border relative overflow-hidden"
    >
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Planos & Preços
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Escolha seu plano
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Selecione seu nível e veja os preços ajustados para o seu concurso.
          </p>
        </div>

        {/* Level Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative bg-muted border border-border rounded-full p-1 flex gap-1">
            <button
              onClick={() => setNivel("medio")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                nivel === "medio"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LuSettings size={16} /> Nível Médio/Técnico
            </button>
            <button
              onClick={() => setNivel("superior")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                nivel === "superior"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LuGraduationCap size={16} /> Nível Superior
            </button>
            {/* Sliding indicator */}
            <div
              className={`absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-out ${
                nivel === "medio"
                  ? "left-1 w-[calc(50%-2px)]"
                  : "left-[calc(50%+2px)] w-[calc(50%-2px)]"
              }`}
            />
          </div>
        </div>

        {/* Cards Grid: Iniciante | Aprovado | Elite | Elite Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2 max-w-[1400px] mx-auto mb-16 px-4 items-center">
          {/* FREE */}
          <div className="bg-background border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-all h-full min-h-[480px]">
            <div className="mb-auto">
              <h3 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Iniciante</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-3xl font-black text-foreground tracking-tight">R$ 0</span>
                <span className="text-muted-foreground text-xs mb-1">/mês</span>
              </div>
              <p className="text-muted-foreground/70 text-xs mb-6 leading-relaxed">
                Conheça a plataforma sem compromisso por tempo limitado.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  { text: "5 questões diárias", included: true },
                  { text: "Explicações básicas", included: true },
                  { text: "Histórico de 3 dias", included: true },
                  { text: "Professor IA", included: false },
                  { text: "Simulados", included: false },
                  { text: "Cronograma", included: false },
                ].map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-xs ${f.included ? "text-foreground/80" : "text-muted-foreground/40"}`}>
                    <span className={`p-0.5 rounded-full ${f.included ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground/20"}`}>
                      {f.included ? <LuCheck size={10} /> : <LuX size={10} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full py-2.5 rounded-xl border border-border text-foreground text-xs font-bold hover:bg-muted transition-all text-center active:scale-95"
            >
              Começar Grátis
            </Link>
          </div>

          {/* APROVADO */}
          <div className="bg-muted/30 border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-all h-full min-h-[480px]">
            <div className="mb-auto">
              <h3 className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{planos.aprovado.nome}</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-3xl font-black text-foreground tracking-tight">R$ {planos.aprovado.preco}</span>
                <span className="text-muted-foreground text-xs mb-1">{planos.aprovado.centavos}/mês</span>
              </div>
              <p className="text-muted-foreground/70 text-xs mb-6 leading-relaxed">
                {planos.aprovado.descricao}
              </p>
              <ul className="space-y-2.5 mb-8">
                {planos.aprovado.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-xs ${f.included ? "text-foreground" : "text-muted-foreground/40"}`}>
                    <span className={`p-0.5 rounded-full ${f.included ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground/20"}`}>
                      {f.included ? <LuCheck size={10} /> : <LuX size={10} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/register?plan=${planos.aprovado.id}`}
              className="w-full py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary/20 transition-all text-center text-xs active:scale-95"
            >
              Escolher Aprovado
            </Link>
          </div>

          {/* ELITE */}
          <div className="bg-primary border-4 border-primary rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-primary/40 lg:scale-110 z-30 min-h-[580px] text-primary-foreground transform transition-all hover:scale-[1.12]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/10 rounded-3xl pointer-events-none opacity-50 blur-xl" />
            
            {/* Badge */}
            {planos.elite.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                <span className="bg-foreground text-background text-[11px] font-black px-5 py-2 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-1.5 border border-background/20">
                  <LuCrown size={14} className="text-yellow-500" /> {planos.elite.badge}
                </span>
              </div>
            )}
            <div className="mb-auto pt-4 relative z-10">
              <h3 className="text-xl font-black mb-1 uppercase tracking-wider">{planos.elite.nome}</h3>
              <div className="flex items-end gap-1 mb-4 whitespace-nowrap">
                <span className="text-5xl font-black tracking-tight">R$ {planos.elite.preco}</span>
                <span className="opacity-80 text-sm mb-1">{planos.elite.centavos}/mês</span>
              </div>
              <p className="opacity-90 text-sm mb-8 font-medium leading-relaxed">
                {planos.elite.descricao}
              </p>
              <ul className="space-y-3.5 mb-10">
                {planos.elite.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm font-medium ${f.included ? "opacity-100" : "opacity-40"}`}>
                    <span className={`p-1 rounded-full ${f.included ? "bg-white/20 text-white" : "bg-white/5"}`}>
                      {f.included ? (f.highlight ? <LuZap size={14} /> : <LuCheck size={14} />) : <LuX size={14} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/register?plan=${planos.elite.id}`}
              className="w-full py-4 rounded-2xl bg-white text-primary font-black hover:bg-opacity-90 transition-all text-center text-md shadow-xl active:scale-95 relative z-10"
            >
              Escolher Elite
            </Link>
          </div>

          {/* ELITE TOTAL */}
          <div className="bg-slate-950 border-4 border-indigo-500/50 rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-indigo-500/20 lg:scale-[1.15] z-40 min-h-[600px] text-white transform transition-all hover:scale-[1.18] group">
            {/* Premium Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-primary/10 rounded-3xl pointer-events-none opacity-50 blur-2xl group-hover:opacity-80 transition-opacity" />
            
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              <span className="bg-indigo-500 text-white text-[11px] font-black px-6 py-2 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-2 border border-white/20 animate-pulse">
                <LuZap size={14} className="text-yellow-400" /> ACESSO TOTAL
              </span>
            </div>

            <div className="mb-auto pt-4 relative z-10">
              <h3 className="text-xl font-black mb-1 uppercase tracking-wider text-indigo-400">Elite Total</h3>
              <div className="flex items-end gap-1 mb-4 whitespace-nowrap">
                <span className="text-5xl font-black tracking-tight">R$ 149</span>
                <span className="opacity-80 text-sm mb-1">,99/mês</span>
              </div>
              <p className="opacity-90 text-sm mb-8 font-medium leading-relaxed text-slate-300">
                Acesso total e ilimitado a todos os cargos, níveis e recursos da plataforma.
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  { text: "Tudo do Plano Elite", included: true, highlight: true },
                  { text: "Médio + Superior", included: true, highlight: true },
                  { text: "Todos os Cargos do Edital", included: true, highlight: true },
                  { text: "Mentoria Individual", included: true, highlight: true },
                  { text: "Prioridade em Novas Aulas", included: true },
                  { text: "Acesso Vitalício (Beta)", included: true },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <span className={`p-1 rounded-full ${f.highlight ? "bg-indigo-500/20 text-indigo-400" : "bg-white/10 text-slate-400"}`}>
                      {f.highlight ? <LuZap size={14} /> : <LuCheck size={14} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/register?plan=elite-total"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black hover:from-indigo-500 hover:to-indigo-400 transition-all text-center text-md shadow-xl shadow-indigo-500/20 active:scale-95 relative z-10"
            >
              Garantir Acesso Total
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-5xl mx-auto mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-xs font-mono uppercase tracking-widest">ou acesse tudo</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

      </div>
    </section>
  );
}
