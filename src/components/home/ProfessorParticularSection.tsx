import React from 'react';
import { LuHand, LuBrain } from 'react-icons/lu';
import ScrollAnimatedHeader from './ScrollAnimatedHeader';

export default function ProfessorParticularSection() {
  return (
    <section id="ia" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <ScrollAnimatedHeader
              align="left"
              badgeText="Exclusivo Plano Elite"
              badgeColorClass="border-primary/20 bg-primary/10 text-primary"
              titleText={
                <>
                  Seu Professor Particular <br />
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--primary-gradient)' }}
                  >
                    Disponível 24h
                  </span>
                </>
              }
              subtitleText="Participe de Webinars Interativos onde um Avatar de IA ministra aulas completas sobre qualquer ponto do edital."
              className="mb-8"
            />

            <ul className="space-y-6 mb-10 w-full max-w-md text-left">
              <li className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md border border-primary/10 text-primary bg-primary/5 flex-shrink-0"
                >
                  <LuHand size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    Levante a Mão
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Interrompa a aula a qualquer momento para tirar dúvidas
                    via voz ou texto.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md border border-primary/10 text-primary bg-primary/5 flex-shrink-0"
                >
                  <LuBrain size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    Explicações Dinâmicas
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    A IA adapta a explicação ao seu nível de conhecimento em
                    tempo real.
                  </p>
                </div>
              </li>
            </ul>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-primary font-bold hover:opacity-80 transition group text-sm"
            >
              Ver planos disponíveis
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* Right Column - Video Interface Mockup */}
          <div className="lg:w-1/2 w-full relative">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 aspect-video group border border-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 z-10" />

              {/* Interface Overlay (Bottom Status Bar) */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-lg border border-white/20"
                    style={{ backgroundImage: 'var(--primary-gradient)' }}
                  >
                    IA
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">
                      Prof. Atlas
                    </div>
                    <div className="text-white/80 text-xs flex items-center gap-1.5 font-medium mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Falando sobre Termodinâmica
                    </div>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer z-20 text-white"
                style={{ backgroundImage: 'var(--primary-gradient)' }}
              >
                <svg
                  className="w-8 h-8 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Gradient Video Simulation Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-slate-950 opacity-90 transition-opacity group-hover:opacity-85" />
            </div>

            {/* Floating Live Badge (Live Users counter) */}
            <div className="absolute -bottom-6 -right-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 p-4 rounded-xl shadow-2xl z-30 hidden sm:block">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Ao Vivo
                </span>
              </div>
              <div className="text-slate-900 dark:text-white font-black text-sm">
                1.248 alunos estudando agora
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
