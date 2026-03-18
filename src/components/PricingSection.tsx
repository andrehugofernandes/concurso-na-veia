"use client";

import { useState } from "react";
import Link from "next/link";

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
      className="py-24 bg-black border-t border-white/5 relative overflow-hidden"
    >
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Planos & Preços
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Escolha seu plano
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Selecione seu nível e veja os preços ajustados para o seu concurso.
          </p>
        </div>

        {/* Level Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setNivel("medio")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                nivel === "medio"
                  ? "text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🔧 Nível Médio/Técnico
            </button>
            <button
              onClick={() => setNivel("superior")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                nivel === "superior"
                  ? "text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🎓 Nível Superior
            </button>
            {/* Sliding indicator */}
            <div
              className={`absolute top-1 bottom-1 bg-yellow-400 rounded-full transition-all duration-300 ease-out ${
                nivel === "medio"
                  ? "left-1 w-[calc(50%-2px)]"
                  : "left-[calc(50%+2px)] w-[calc(50%-2px)]"
              }`}
            />
          </div>
        </div>

        {/* Cards Grid: Free | Aprovado | Elite */}
        <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto mb-16">
          {/* FREE */}
          <div className="bg-zinc-950 border border-zinc-800/80 md:rounded-l-2xl p-7 flex flex-col rounded-t-2xl md:rounded-tr-none">
            <div className="mb-auto">
              <h3 className="text-lg font-bold text-gray-400 mb-1">Iniciante</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-4xl font-black text-white tracking-tight">R$ 0</span>
                <span className="text-gray-600 text-sm mb-1">/mês</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Conheça a plataforma sem compromisso.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { text: "5 questões diárias", included: true },
                  { text: "Explicações básicas", included: true },
                  { text: "Histórico de 3 dias", included: true },
                  { text: "Professor IA", included: false },
                  { text: "Simulados", included: false },
                  { text: "Cronograma", included: false },
                ].map((f, i) => (
                  <li key={i} className={`flex items-center gap-2.5 text-sm ${f.included ? "text-gray-300" : "text-gray-600"}`}>
                    <span className={`text-xs ${f.included ? "text-green-500" : "text-gray-700"}`}>
                      {f.included ? "●" : "○"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full py-3 rounded-lg border border-zinc-700 text-gray-300 font-semibold hover:bg-zinc-900 hover:border-zinc-600 transition text-center text-sm"
            >
              Começar Grátis
            </Link>
          </div>

          {/* APROVADO */}
          <div className="bg-zinc-900/80 border-y border-zinc-800/80 md:border md:border-x-0 p-7 flex flex-col relative">
            <div className="mb-auto">
              <h3 className="text-lg font-bold text-yellow-400 mb-1">{planos.aprovado.nome}</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-4xl font-black text-white tracking-tight">R$ {planos.aprovado.preco}</span>
                <span className="text-gray-500 text-sm mb-1">{planos.aprovado.centavos}/mês</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {planos.aprovado.descricao}
              </p>
              <ul className="space-y-3 mb-8">
                {planos.aprovado.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2.5 text-sm ${f.included ? "text-gray-200" : "text-gray-600"}`}>
                    <span className={`text-xs ${f.included ? "text-yellow-400" : "text-gray-700"}`}>
                      {f.included ? "●" : "○"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/register?plan=${planos.aprovado.id}`}
              className="w-full py-3 rounded-lg bg-yellow-400/10 border border-yellow-500/30 text-yellow-400 font-semibold hover:bg-yellow-400/20 transition text-center text-sm"
            >
              Escolher Aprovado
            </Link>
          </div>

          {/* ELITE */}
          <div className="bg-zinc-900 border border-yellow-500/40 md:rounded-r-2xl p-7 flex flex-col relative md:-ml-px rounded-b-2xl md:rounded-bl-none ring-1 ring-yellow-500/20 shadow-lg shadow-yellow-500/5">
            {/* Badge */}
            {planos.elite.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-yellow-400 text-black text-[11px] font-black px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg shadow-yellow-400/30">
                  {planos.elite.badge}
                </span>
              </div>
            )}
            <div className="mb-auto pt-2">
              <h3 className="text-lg font-bold text-yellow-300 mb-1">{planos.elite.nome}</h3>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-4xl font-black text-white tracking-tight">R$ {planos.elite.preco}</span>
                <span className="text-gray-500 text-sm mb-1">{planos.elite.centavos}/mês</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {planos.elite.descricao}
              </p>
              <ul className="space-y-3 mb-8">
                {planos.elite.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2.5 text-sm ${f.included ? (f.highlight ? "text-white font-medium" : "text-gray-200") : "text-gray-600"}`}>
                    <span className={`text-xs ${f.included ? (f.highlight ? "text-yellow-400" : "text-green-500") : "text-gray-700"}`}>
                      {f.included ? (f.highlight ? "★" : "●") : "○"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/register?plan=${planos.elite.id}`}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all text-center text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Escolher Elite
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-5xl mx-auto mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">ou acesse tudo</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

        {/* ELITE TOTAL - Dramatic Hero Card */}
        <div className="max-w-5xl mx-auto relative">
          {/* Glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl pointer-events-none" />

          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-2xl border border-yellow-500/30 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />

            <div className="p-8 md:p-10">
              {/* Top row: badge + name */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">A Melhor Escolha</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                    Elite Total
                  </h3>
                  <p className="text-gray-400 text-base max-w-lg">
                    Acesso completo a <strong className="text-white">todos os cargos</strong>, Médio e Superior.
                    Sem limites. Sem restrições.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-end gap-1 justify-end">
                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">R$ 149</span>
                    <span className="text-gray-500 text-lg mb-2">,99</span>
                  </div>
                  <span className="text-gray-500 text-sm">/mês</span>
                </div>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: "🎯", title: "Todos os cargos", desc: "Médio + Superior" },
                  { icon: "🤖", title: "Professor IA 24h", desc: "Tira-dúvidas ilimitado" },
                  { icon: "📋", title: "Mentoria Semanal", desc: "Acompanhamento real" },
                  { icon: "📊", title: "Cronograma IA", desc: "Adaptativo e pessoal" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <div className="font-semibold text-white text-sm">{item.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/register?plan=elite-total"
                className="block w-full md:w-auto md:inline-flex md:px-16 py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-black text-base hover:shadow-xl hover:shadow-orange-500/30 transition-all text-center hover:scale-[1.02] active:scale-[0.98]"
              >
                Garantir Acesso Total
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
