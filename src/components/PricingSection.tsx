"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollAnimatedHeader from "./home/ScrollAnimatedHeader";
import AnimatedElement from "./ui/AnimatedElement";
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
        { text: "NaVeiaLingo (Inglês Gamificado)", included: false },
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
        { text: "NaVeiaLingo (Inglês Gamificado)", included: true, highlight: true },
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
        { text: "NaVeiaLingo (Inglês Gamificado)", included: false },
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
        { text: "NaVeiaLingo (Inglês Gamificado)", included: true, highlight: true },
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
      className="py-24 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <ScrollAnimatedHeader
          badgeText="Planos & Preços"
          badgeColorClass="border-primary/20 bg-primary/10 text-primary"
          titleText={
            <>
              Escolha seu <span className="text-primary">plano</span>
            </>
          }
          subtitleText="Selecione seu nível e veja os preços ajustados para o seu concurso."
          className="mb-12"
        />

        {/* Level Toggle */}
        <AnimatedElement delay={0.1} className="flex justify-center mb-14">
          <div className="relative bg-muted border border-border rounded-full p-1 inline-grid grid-cols-2 gap-1">
            <button
              onClick={() => setNivel("medio")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 ${
                nivel === "medio"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LuSettings size={16} /> Nível Médio/Técnico
            </button>
            <button
              onClick={() => setNivel("superior")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 ${
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
                  ? "left-1 w-[calc(50%-6px)]"
                  : "left-[calc(50%+2px)] w-[calc(50%-6px)]"
              }`}
            />
          </div>
        </AnimatedElement>

        {/* Cards Grid: Iniciante | Aprovado | Elite | Elite Total | Vitalis Total */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 xl:gap-6 w-[98vw] max-w-[1920px] relative left-1/2 -translate-x-1/2 mx-auto mb-16 items-stretch justify-center px-2">
          {/* FREE */}
          <AnimatedElement delay={0.2} className="bg-background border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md min-h-[460px] transition-all">
            <div className="mb-auto">
              <h3 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Iniciante</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-3xl font-black text-foreground tracking-tight">R$ 0</span>
                <span className="text-muted-foreground text-xs mb-1">único</span>
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
              className="w-full py-3 rounded-xl border-2 border-border text-foreground text-sm font-bold hover:bg-foreground hover:text-background transition-all text-center active:scale-95"
            >
              Começar Grátis
            </Link>
          </AnimatedElement>

          {/* APROVADO */}
          <AnimatedElement delay={0.3} className="bg-gradient-to-b from-green-500/10 to-background border-2 border-green-500/20 rounded-2xl p-6 flex flex-col shadow-md hover:shadow-xl hover:border-green-500/40 min-h-[500px] transition-all relative overflow-hidden group">
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="mb-auto relative z-10">
              <h3 className="text-sm font-black text-green-600 mb-2 uppercase tracking-wider">{planos.aprovado.nome}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-black text-foreground tracking-tight">R$ {planos.aprovado.preco}</span>
                <span className="text-muted-foreground text-sm mb-1">{planos.aprovado.centavos} único</span>
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
              className="w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-bold hover:bg-green-500 hover:text-white transition-all text-center text-sm shadow-sm active:scale-95 relative z-10"
            >
              Escolher Aprovado
            </Link>
          </AnimatedElement>

          {/* ELITE */}
          <AnimatedElement delay={0.4} className="bg-primary border-4 border-primary rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-primary/40 z-30 min-h-[540px] text-primary-foreground transition-all">
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
                <span className="text-4xl xl:text-5xl font-black tracking-tight">R$ {planos.elite.preco}</span>
                <span className="opacity-80 text-sm mb-1">{planos.elite.centavos} único</span>
              </div>
              <p className="opacity-90 text-sm mb-8 font-medium leading-relaxed">
                {planos.elite.descricao}
              </p>
              <ul className="space-y-3.5 mb-10">
                {planos.elite.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm font-medium ${f.included ? "opacity-100" : "opacity-40"}`}>
                    <span className={`p-1 rounded-full ${f.included ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary-foreground/10 text-primary-foreground"}`}>
                      {f.included ? (f.highlight ? <LuZap size={14} /> : <LuCheck size={14} />) : <LuX size={14} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/register?plan=${planos.elite.id}`}
              className="w-full py-3 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-100 hover:text-slate-900 transition-all text-center text-md shadow-xl active:scale-95 relative z-10"
            >
              Escolher Elite
            </Link>
          </AnimatedElement>

          {/* ELITE TOTAL */}
          <AnimatedElement delay={0.45} className="bg-slate-900 border-4 border-indigo-500/30 rounded-3xl p-8 flex flex-col relative shadow-xl shadow-indigo-500/10 z-30 min-h-[560px] text-white transition-all group">
            {/* Premium Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-primary/5 rounded-3xl pointer-events-none opacity-50 blur-xl group-hover:opacity-80 transition-opacity" />
            
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              <span className="bg-indigo-500 text-white text-[11px] font-black px-6 py-2 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-2 border border-indigo-400/50">
                <LuZap size={14} className="text-yellow-400" /> ACESSO TOTAL
              </span>
            </div>

            <div className="mb-auto pt-4 relative z-10">
              <h3 className="text-xl font-black mb-1 uppercase tracking-wider text-indigo-400">Elite Total</h3>
              <div className="flex items-end gap-1 mb-4 whitespace-nowrap">
                <span className="text-4xl xl:text-5xl font-black tracking-tight">R$ 149</span>
                <span className="opacity-80 text-sm mb-1">,99 único</span>
              </div>
              <p className="opacity-90 text-[13px] xl:text-sm mb-8 font-medium leading-relaxed text-slate-300">
                <strong className="text-white">TUDO DESTE CONCURSO:</strong> Acesso total a todas as profissões e níveis do edital atual, garantido até a data da prova.
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  { text: "Tudo do Plano Elite", included: true, highlight: true },
                  { text: "Médio + Superior", included: true, highlight: true },
                  { text: "Todos os Cargos do Edital", included: true, highlight: true },
                  { text: "Mentoria Individual", included: true, highlight: true },
                  { text: "Prioridade em Novas Aulas", included: true },
                  { text: "Acesso até a Prova", included: true },
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
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-500 hover:text-white transition-all text-center text-md shadow-xl active:scale-95 relative z-10"
            >
              Garantir Elite Total
            </Link>
          </AnimatedElement>

          {/* VITALIS TOTAL */}
          <AnimatedElement delay={0.5} className="bg-slate-950 border-4 border-amber-500/50 rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-amber-500/20 z-40 min-h-[580px] text-white transition-all group">
            {/* Premium Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-primary/10 rounded-3xl pointer-events-none opacity-50 blur-2xl group-hover:opacity-80 transition-opacity" />
            
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
              <span className="bg-gradient-to-r from-amber-600 to-amber-400 text-white text-[11px] font-black px-6 py-2 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-2 border border-amber-300/50 animate-pulse">
                <LuCrown size={14} className="text-white" /> VITALÍCIO VIP
              </span>
            </div>

            <div className="mb-auto pt-4 relative z-10">
              <h3 className="text-xl font-black mb-1 uppercase tracking-wider text-amber-400">Vitalis Total</h3>
              <div className="flex items-end gap-1 mb-4 whitespace-nowrap">
                <span className="text-4xl xl:text-5xl font-black tracking-tight">R$ 650</span>
                <span className="opacity-80 text-sm mb-1">,00 único</span>
              </div>
              <p className="opacity-90 text-[13px] xl:text-sm mb-8 font-medium leading-relaxed text-slate-300">
                <strong className="text-amber-300">TODOS OS CONCURSOS:</strong> Acesso vitalício a todos os cursos presentes e futuros da plataforma (Petrobras, BB, Caixa, etc).
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  { text: "Tudo do Plano Elite Total", included: true, highlight: true },
                  { text: "Acesso a TODOS os Concursos", included: true, highlight: true },
                  { text: "Acesso Vitalício (Para Sempre)", included: true, highlight: true },
                  { text: "Mentoria Individual VIP", included: true, highlight: true },
                  { text: "Prioridade em Novas Aulas", included: true },
                  { text: "Suporte Premium Direto", included: true },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <span className={`p-1 rounded-full ${f.highlight ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-slate-400"}`}>
                      {f.highlight ? <LuCrown size={14} /> : <LuCheck size={14} />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/register?plan=vitalis-total"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-black hover:from-amber-500 hover:to-amber-400 hover:text-white transition-all text-center text-md shadow-xl shadow-amber-500/25 active:scale-95 relative z-10"
            >
              Garantir Acesso Vitalício
            </Link>
          </AnimatedElement>
        </div>

        {/* Divider */}
        <AnimatedElement delay={0.6} className="flex items-center gap-4 max-w-5xl mx-auto mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-xs font-mono uppercase tracking-widest">ou acesse tudo</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </AnimatedElement>

      </div>
    </section>
  );
}
