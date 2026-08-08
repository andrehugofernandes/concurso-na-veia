"use client";

import Link from "next/link";
import { LuArrowLeft, LuFileText } from "react-icons/lu";
import StickyHeader from "@/components/home/StickyHeader";
import HomeFooter from "@/components/home/HomeFooter";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-primary selection:text-white">
      <StickyHeader alwaysVisible={true} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-20 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.25)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,rgba(15,23,42,0.88)_50%,rgba(15,23,42,0.25)_100%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 mt-2">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <LuFileText className="w-8 h-8" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/60 shadow-xs"
              >
                <LuArrowLeft className="w-3.5 h-3.5" />
                Voltar
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-5 text-balance max-w-2xl mx-auto">
              Termos de <span className="text-primary">Uso</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto text-center">
              Ao utilizar nossa plataforma, você concorda com as condições e regras estabelecidas neste documento.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o Concurso na Veia, você aceita e concorda em estar vinculado pelos termos e disposições deste acordo.
          </p>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Uso da Plataforma</h2>
          <p>
            Você concorda em usar nossa plataforma apenas para fins educacionais lícitos e de forma que não infrinja os direitos de, ou restrinja ou iniba o uso e o aproveitamento da plataforma por qualquer terceiro.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente no Concurso na Veia, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio e vídeo, é propriedade exclusiva do Concurso na Veia ou de seus fornecedores de conteúdo.
          </p>
        </div>
      </main>

      <HomeFooter />
      <ScrollToTop />
    </div>
  );
}
