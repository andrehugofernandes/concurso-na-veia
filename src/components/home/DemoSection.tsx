import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuFileQuestion,
  LuTrophy,
  LuLifeBuoy,
  LuZap,
  LuFlame,
  LuTarget,
  LuHistory,
  LuCheck,
  LuX,
  LuMoon,
  LuBell,
  LuPercent,
  LuCalculator,
  LuTriangleAlert,
  LuList
} from 'react-icons/lu';
import PetrobrasLogo from '../PetrobrasLogo';

const tabs = [
  { id: 'dashboard', label: 'Visão Geral (Dashboard)', icon: <LuLayoutDashboard className="w-4 h-4" /> },
  { id: 'aulas', label: 'Conteúdo Teórico (Aulas)', icon: <LuBookOpen className="w-4 h-4" /> },
  { id: 'simulador', label: 'Simulador de Questões', icon: <LuFileQuestion className="w-4 h-4" /> },
  { id: 'ranking', label: 'Ranking & Liderança', icon: <LuTrophy className="w-4 h-4" /> },
];

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Navigation State for Lesson content within 'aulas' tab
  const [activeLessonSubject, setActiveLessonSubject] = useState<'portugues' | 'matematica' | 'especificas' | null>(null);

  // States for Simulator Tab Interaction
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // States for Portuguese Lesson Interactive Exercise
  const [portuguesAnswer, setPortuguesAnswer] = useState<number | null>(null);
  const [portuguesIsAnswered, setPortuguesIsAnswered] = useState(false);

  // States for Mathematics Lesson Interactive Exercise
  const [matematicaAnswer, setMatematicaAnswer] = useState<number | null>(null);
  const [matematicaIsAnswered, setMatematicaIsAnswered] = useState(false);

  // States for Specific Knowledge Lesson Interactive Exercise
  const [especificasAnswer, setEspecificasAnswer] = useState<number | null>(null);
  const [especificasIsAnswered, setEspecificasIsAnswered] = useState(false);

  const handleResetSimulator = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleResetPortugues = () => {
    setPortuguesAnswer(null);
    setPortuguesIsAnswered(false);
  };

  const handleResetMatematica = () => {
    setMatematicaAnswer(null);
    setMatematicaIsAnswered(false);
  };

  const handleResetEspecificas = () => {
    setEspecificasAnswer(null);
    setEspecificasIsAnswered(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset secondary states
    setActiveLessonSubject(null);
    handleResetSimulator();
    handleResetPortugues();
    handleResetMatematica();
    handleResetEspecificas();
  };

  return (
    <section id="demo" className="py-24 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
          >
            <span
              className="text-sm font-black tracking-widest uppercase bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--primary-gradient)' }}
            >
              Veja em Ação
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground"
          >
            Veja a plataforma{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--primary-gradient)' }}
            >
              A VAGA EH MINHA
            </span>{' '}
            em ação
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Explore a interface real e interativa da nossa plataforma pelo olhar de um estudante de nível médio.
          </p>
        </div>

        {/* Outer Flex Layout: Top Navigation + Dashboard Mockup */}
        <div className="flex flex-col gap-8 items-center">
          {/* Top Navigation tab pills */}
          <div className="w-full flex flex-row justify-start lg:justify-center gap-3 overflow-x-auto pb-4 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-none md:flex-initial flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-sm font-bold border transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'border-primary/30 text-white shadow-lg shadow-primary/20 bg-primary'
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary/30 bg-white dark:bg-zinc-800'
                }`}
                style={activeTab === tab.id ? { backgroundImage: 'var(--primary-gradient)' } : {}}
              >
                <div className="shrink-0">{tab.icon}</div>
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Mockup Browser Frame */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-slate-100">
              {/* Browser chrome */}
              <div className="bg-slate-100 dark:bg-zinc-800 px-4 py-3 flex items-center gap-2 border-b border-slate-200 dark:border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 ml-4 bg-slate-200 dark:bg-zinc-700 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-slate-300 font-mono max-w-xs">
                  avagaehminha-concursos.ai
                </div>
              </div>

              {/* Mockup Main Shell (Sidebar + Main Area) */}
              <div className="flex min-h-[640px] bg-slate-50 dark:bg-zinc-950 font-sans">
                {/* Sidebar Mockup */}
                <aside className="w-56 flex-shrink-0 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900 p-4 hidden md:flex flex-col justify-between">
                  <div>
                    {/* Logo Container */}
                    <div className="mb-8 scale-[0.65] origin-left">
                      <PetrobrasLogo />
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
                          Estudo
                        </p>
                        <nav className="space-y-1">
                          <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            style={activeTab === 'dashboard' ? { backgroundImage: 'var(--primary-gradient)' } : {}}
                            onClick={() => handleTabChange('dashboard')}
                          >
                            <LuLayoutDashboard size={16} />
                            Dashboard
                          </span>
                          <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'aulas' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            style={activeTab === 'aulas' ? { backgroundImage: 'var(--primary-gradient)' } : {}}
                            onClick={() => handleTabChange('aulas')}
                          >
                            <LuBookOpen size={16} />
                            Aulas
                          </span>
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">
                            <LuList size={16} />
                            Plano de Estudos
                          </span>
                          <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'simulador' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            style={activeTab === 'simulador' ? { backgroundImage: 'var(--primary-gradient)' } : {}}
                            onClick={() => handleTabChange('simulador')}
                          >
                            <LuFileQuestion size={16} />
                            Simulados Rápidos
                          </span>
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">
                            <LuTarget size={16} />
                            Simulados Específicos
                          </span>
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">
                            <LuFlame size={16} />
                            Maratona 100
                          </span>
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">
                            <LuHistory size={16} />
                            Histórico
                          </span>
                          <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'ranking' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            style={activeTab === 'ranking' ? { backgroundImage: 'var(--primary-gradient)' } : {}}
                            onClick={() => handleTabChange('ranking')}
                          >
                            <LuTrophy size={16} />
                            Rankings
                          </span>
                        </nav>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
                          Suporte
                        </p>
                        <nav className="space-y-1">
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-amber-500 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer">
                            <LuZap size={16} />
                            Seja Pro 👑
                          </span>
                          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer">
                            <LuLifeBuoy size={16} />
                            Abertura de Ticket
                          </span>
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* Footer User Info */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-black text-white">
                      SF
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">Sophia Fernandes</p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">andrehugotube@gmail.com</p>
                    </div>
                  </div>
                </aside>

                {/* Main Workspace Area Mockup */}
                <main className="flex-1 flex flex-col min-w-0">
                  {/* Header Mockup */}
                  <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span>Dashboard</span>
                      <span>/</span>
                      <span className="text-slate-900 dark:text-white capitalize">
                        {activeTab === 'simulador' ? 'Simulados Rápidos' : activeTab}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white relative">
                        <LuBell size={16} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                      </button>
                      <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
                        <LuMoon size={16} />
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white border-2 border-emerald-500/20 shadow-inner">
                          SF
                        </span>
                      </div>
                    </div>
                  </header>

                  {/* Content Area Mockup */}
                  <div className="flex-1 p-6 overflow-y-auto max-h-[570px] scrollbar-thin">
                    <AnimatePresence mode="wait">
                      {activeTab === 'dashboard' && (
                        <motion.div
                          key="dashboard"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-6 text-left"
                        >
                          {/* Welcome & Stats Row */}
                          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <div>
                              <h2 className="text-xl font-bold flex items-center gap-2">
                                Olá, Sophia! 👋
                              </h2>
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                {/* Streak Badge */}
                                <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg text-xs">
                                  <span className="text-base">🔥</span>
                                  <div className="leading-none">
                                    <span className="text-[8px] text-orange-500 font-bold uppercase block">Ofensiva</span>
                                    <span className="font-extrabold text-orange-600 dark:text-orange-400">0 dias</span>
                                  </div>
                                </div>

                                {/* XP Badge */}
                                <div className="flex-1 min-w-[120px] max-w-xs">
                                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    <span>Nível Estagiário</span>
                                    <span className="text-primary font-extrabold" style={{ color: 'var(--primary-hex, #22c55e)' }}>0 XP</span>
                                  </div>
                                  <div className="h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-blue-500 w-1" style={{ width: '5%' }} />
                                  </div>
                                  <p className="text-[8px] text-slate-400 mt-1 text-right">Próximo nível em 1000 XP</p>
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit lg:self-start">
                              7 dias restantes de teste grátis
                            </span>
                          </div>

                          {/* Overview/Ranking Mock Subtabs */}
                          <div className="flex gap-4 border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="text-xs font-bold text-primary border-b-2 border-primary pb-2" style={{ color: 'var(--primary-hex, #22c55e)', borderColor: 'var(--primary-hex, #22c55e)' }}>
                              Visão Geral
                            </span>
                            <span className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer pb-2" onClick={() => handleTabChange('ranking')}>
                              Ranking
                            </span>
                          </div>

                          {/* Status Cards Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 text-lg">⚡</div>
                              <div>
                                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">Sequência</p>
                                <p className="text-sm font-extrabold">0 dias</p>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3">
                              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 text-lg">🎯</div>
                              <div>
                                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">Precisão</p>
                                <p className="text-sm font-extrabold">0%</p>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3">
                              <div className="p-2 bg-green-500/10 rounded-lg text-green-500 text-lg">📝</div>
                              <div>
                                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">Questões</p>
                                <p className="text-sm font-extrabold">0</p>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3">
                              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 text-lg">🏆</div>
                              <div>
                                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">Nível</p>
                                <p className="text-sm font-extrabold">Estagiário</p>
                              </div>
                            </div>
                          </div>

                          {/* Charts / Activity Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Circular Progress Mock */}
                            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-white/5 p-4 flex flex-col items-center justify-center">
                              <h3 className="text-xs font-bold mb-3 self-start flex items-center gap-2">
                                <span>📊</span> Meu Progresso Geral
                              </h3>
                              <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* SVG Circle */}
                                <svg className="w-full h-full -rotate-90">
                                  <circle cx="64" cy="64" r="48" stroke="currentColor" className="text-slate-100 dark:text-zinc-800" strokeWidth="8" fill="transparent" />
                                  <circle cx="64" cy="64" r="48" stroke="currentColor" className="text-emerald-500" strokeWidth="8" fill="transparent" strokeDasharray="301.5" strokeDashoffset="301.5" strokeLinecap="round" />
                                </svg>
                                <div className="absolute text-center leading-none">
                                  <span className="text-xl font-extrabold">0%</span>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Concluído</p>
                                </div>
                              </div>
                              <div className="flex gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-4">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Concluído (0)</span>
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-700" /> Restante (10)</span>
                              </div>
                            </div>

                            {/* Continue de onde parou Card */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl border border-indigo-500/20 p-5 flex flex-col justify-between">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div>
                                  <h3 className="text-sm font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                                    <span>▶️</span> Continue de onde parou
                                  </h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Você estava estudando <strong className="text-indigo-600 dark:text-indigo-400">Interpretação de Texto</strong>.
                                  </p>
                                </div>
                                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all" onClick={() => { setActiveTab('aulas'); setActiveLessonSubject('portugues'); }}>
                                  Retomar Aula
                                </button>
                              </div>
                              <div className="bg-white/50 dark:bg-zinc-900/50 rounded-lg p-3 border border-indigo-500/10">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                                  <span>Não iniciado</span>
                                  <span>0% Concluído</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-500 w-0" style={{ width: '0%' }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Conteúdo Teórico Section */}
                          <div className="bg-blue-500/5 rounded-2xl border border-blue-500/10 p-5">
                            <h3 className="text-xs font-black uppercase text-blue-500 mb-4 flex items-center gap-2">
                              <span>📚</span> Conteúdo Teórico e Aulas
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => handleTabChange('aulas')}>
                                <span className="text-2xl mb-2 block">📖</span>
                                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Conteúdo Teórico</h4>
                                <p className="text-[10px] text-slate-400 mt-1">Aulas completas organizadas por edital, com acompanhamento de progresso.</p>
                              </div>
                              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all cursor-not-allowed">
                                <span className="text-2xl mb-2 block">🎯</span>
                                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Plano de Estudos</h4>
                                <p className="text-[10px] text-slate-400 mt-1">Cronograma personalizado baseado no seu tempo disponível.</p>
                              </div>
                            </div>
                          </div>

                          {/* Simulados Rápidos Section */}
                          <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/10 p-5">
                            <h3 className="text-xs font-black uppercase text-emerald-500 mb-4 flex items-center gap-2">
                              <span>⚡</span> Simulados Rápidos
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 border-t-4 border-t-blue-500 hover:shadow-md transition-all cursor-pointer" onClick={() => handleTabChange('simulador')}>
                                <span className="text-xl mb-1 block">📝</span>
                                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">LÍNGUA PORTUGUESA</h4>
                                <p className="text-[9px] text-slate-400 mt-1.5">Gramática, interpretação de texto e redação oficial.</p>
                              </div>
                              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 border-t-4 border-t-purple-500 hover:shadow-md transition-all cursor-pointer" onClick={() => handleTabChange('simulador')}>
                                <span className="text-xl mb-1 block">🔢</span>
                                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">MATEMÁTICA</h4>
                                <p className="text-[9px] text-slate-400 mt-1.5">Raciocínio lógico, álgebra e geometria aplicada.</p>
                              </div>
                              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 border-t-4 border-t-green-500 hover:shadow-md transition-all cursor-pointer" onClick={() => handleTabChange('simulador')}>
                                <span className="text-xl mb-1 block">🏭</span>
                                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white text-primary" style={{ color: 'var(--primary-hex, #22c55e)' }}>ESPECÍFICOS</h4>
                                <p className="text-[9px] text-slate-400 mt-1.5">Cargo: Técnico de Enfermagem do Trabalho.</p>
                              </div>
                            </div>
                          </div>

                          {/* Treino Intensivo de Aceleração */}
                          <div className="bg-purple-500/5 rounded-2xl border border-purple-500/10 p-5">
                            <h3 className="text-xs font-black uppercase text-purple-500 mb-4 flex items-center gap-2">
                              <span>🔥</span> Treino Intensivo de Aceleração
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 rounded-xl text-white relative overflow-hidden shadow-lg">
                                <div className="relative z-10">
                                  <span className="text-2xl mb-1 block">🎯</span>
                                  <h4 className="text-xs font-black uppercase">Treino Intensivo</h4>
                                  <p className="text-[10px] text-purple-100 mt-1.5">20 questões de uma matéria ou tópico específico. FOCO TOTAL - 30 MIN.</p>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-5 rounded-xl text-slate-900 relative overflow-hidden shadow-lg">
                                <div className="relative z-10">
                                  <span className="text-2xl mb-1 block">🔥</span>
                                  <h4 className="text-xs font-black uppercase text-slate-950">Maratona Oficial</h4>
                                  <p className="text-[10px] text-amber-950 mt-1.5">Simulação real da prova para consolidar sua classificação!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'aulas' && (
                        <motion.div
                          key="aulas"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-6 text-left"
                        >
                          {/* Case 1: Show Subject Selection List */}
                          {activeLessonSubject === null ? (
                            <>
                              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold">Conteúdo Teórico e Aulas</h2>
                                <p className="text-xs text-slate-400 mt-1">Selecione uma disciplina abaixo para visualizar as aulas completas disponíveis.</p>
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                {/* Português Subject */}
                                <div onClick={() => setActiveLessonSubject('portugues')} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-500/30 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-4">
                                    <span className="text-3xl transition-transform group-hover:scale-110">📖</span>
                                    <div>
                                      <h3 className="text-sm font-extrabold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">Língua Portuguesa</h3>
                                      <p className="text-[10px] text-slate-400 mt-1">Aula disponível: <strong>Sintaxe (Fundamentos e Sujeito)</strong></p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <span className="text-[10px] text-slate-400 font-bold block">15 tópicos cadastrados</span>
                                      <span className="text-xs font-extrabold text-blue-500">0% completo</span>
                                    </div>
                                    <button className="px-4 py-2 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold rounded-lg group-hover:bg-blue-500/10 transition-all">Acessar Aula</button>
                                  </div>
                                </div>

                                {/* Matemática Subject */}
                                <div onClick={() => setActiveLessonSubject('matematica')} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-purple-500/30 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-4">
                                    <span className="text-3xl transition-transform group-hover:scale-110">🔢</span>
                                    <div>
                                      <h3 className="text-sm font-extrabold text-slate-800 dark:text-white group-hover:text-purple-500 transition-colors">Matemática</h3>
                                      <p className="text-[10px] text-slate-400 mt-1">Aula disponível: <strong>Fundamentos de Porcentagem</strong></p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <span className="text-[10px] text-slate-400 font-bold block">10 tópicos cadastrados</span>
                                      <span className="text-xs font-extrabold text-purple-500">0% completo</span>
                                    </div>
                                    <button className="px-4 py-2 border border-purple-500/20 text-purple-500 dark:text-purple-400 text-xs font-bold rounded-lg group-hover:bg-purple-500/10 transition-all">Acessar Aula</button>
                                  </div>
                                </div>

                                {/* Específicas Subject */}
                                <div onClick={() => setActiveLessonSubject('especificas')} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-emerald-500/30 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-4">
                                    <span className="text-3xl transition-transform group-hover:scale-110">🏭</span>
                                    <div>
                                      <h3 className="text-sm font-extrabold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors">Conhecimentos Específicos</h3>
                                      <p className="text-[10px] text-slate-400 mt-1">Aula disponível: <strong>NR 35 (Trabalho em Altura)</strong></p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <span className="text-[10px] text-slate-400 font-bold block">25 tópicos cadastrados</span>
                                      <span className="text-xs font-extrabold text-emerald-500" style={{ color: 'var(--primary-hex, #22c55e)' }}>0% completo</span>
                                    </div>
                                    <button className="px-4 py-2 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-xs font-bold rounded-lg group-hover:bg-emerald-500/10 transition-all">Acessar Aula</button>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            // Case 2: Render selected Lesson page mockup
                            <div className="space-y-6">
                              {/* Back Button */}
                              <button onClick={() => setActiveLessonSubject(null)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white bg-slate-200/50 dark:bg-zinc-800 px-3.5 py-2 rounded-lg border border-slate-300/20 shadow-sm transition-all hover:bg-slate-200 dark:hover:bg-zinc-700">
                                &larr; Voltar para as disciplinas
                              </button>

                              {/* Render Portuguese Sintaxe Lesson */}
                              {activeLessonSubject === 'portugues' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                  {/* Subject Banner */}
                                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-2xl text-white shadow-md">
                                    <span className="text-[10px] font-black uppercase bg-white/20 px-2.5 py-1 rounded">Língua Portuguesa</span>
                                    <h2 className="text-xl font-bold mt-2">Sintaxe - Fundamentos e Sujeito</h2>
                                    <p className="text-xs text-blue-100 mt-1">Dominando o Esqueleto da Oração: aprenda a identificar quem manda no verbo.</p>
                                  </div>

                                  {/* Lesson Content Body */}
                                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-6 leading-relaxed">
                                    <h3 className="text-sm font-black border-l-4 border-l-blue-500 pl-3">A Anatomia da Oração</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">
                                      A <strong>Sintaxe</strong> é a parte da gramática que estuda a relação e a função das palavras dentro de uma oração. No concurso da <strong>CESGRANRIO</strong>, entender o sujeito significa compreender que ele não é necessariamente "quem faz a ação", mas sim **o termo com o qual o verbo obrigatoriamente concorda**.
                                    </p>

                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-2">
                                      <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5"><LuTriangleAlert /> Atenção (Pegadinha de Prova)</p>
                                      <p className="text-slate-600 dark:text-slate-300">
                                        Quando um <strong>Verbo Transitivo Direto (VTD)</strong> estiver acompanhado da partícula <strong>"se"</strong>, a oração estará na voz passiva sintética, transformando o paciente da ação no <strong>Sujeito Paciente</strong>.
                                      </p>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
                                      <p className="font-bold text-slate-800 dark:text-white mb-2">Exemplo Prático:</p>
                                      <p className="italic text-slate-600 dark:text-slate-300">"Alugam-se plataformas offshore."</p>
                                      <p className="text-slate-500 dark:text-slate-400 mt-2">
                                        <strong>Análise:</strong> O verbo *alugar* é transitivo direto. O *se* atua como partícula apassivadora. O termo *plataformas offshore* é o sujeito paciente. Portanto, o verbo deve ficar obrigatoriamente no plural (*alugam*).
                                      </p>
                                    </div>

                                    {/* Mini Interactive Exercise */}
                                    <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4">
                                      <h4 className="text-xs font-black uppercase text-blue-500">Fixação Rápida (Quiz)</h4>
                                      <p className="text-xs font-bold text-slate-800 dark:text-white">Na oração "Ocorreram graves falhas na bacia do Pré-sal", qual o sujeito?</p>
                                      
                                      <div className="space-y-2">
                                        {[
                                          { index: 0, text: 'Inexistente' },
                                          { index: 1, text: 'Graves falhas (Correto - O verbo ocorrer é pessoal)' },
                                          { index: 2, text: 'A bacia do Pré-sal' },
                                          { index: 3, text: 'Indeterminado' }
                                        ].map((opt) => {
                                          const isSelected = portuguesAnswer === opt.index;
                                          const isCorrect = opt.index === 1;

                                          let btnClass = "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-800/40";
                                          if (isSelected && !portuguesIsAnswered) btnClass = "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400";
                                          if (portuguesIsAnswered) {
                                            if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                                            else if (isSelected) btnClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                                          }

                                          return (
                                            <div
                                              key={opt.index}
                                              onClick={() => !portuguesIsAnswered && setPortuguesAnswer(opt.index)}
                                              className={`p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${btnClass}`}
                                            >
                                              {opt.text}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <div className="flex gap-3">
                                        <button
                                          disabled={portuguesAnswer === null || portuguesIsAnswered}
                                          onClick={() => setPortuguesIsAnswered(true)}
                                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                                            portuguesAnswer === null || portuguesIsAnswered
                                              ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                                              : 'bg-blue-600 text-white hover:bg-blue-700'
                                          }`}
                                        >
                                          Confirmar
                                        </button>
                                        {portuguesIsAnswered && (
                                          <button onClick={handleResetPortugues} className="px-4 py-2 border border-slate-350 dark:border-zinc-700 text-xs font-bold rounded-lg">
                                            Reiniciar
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Render Mathematics Porcentagem Lesson */}
                              {activeLessonSubject === 'matematica' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                  {/* Subject Banner */}
                                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-2xl text-white shadow-md">
                                    <span className="text-[10px] font-black uppercase bg-white/20 px-2.5 py-1 rounded">Matemática</span>
                                    <h2 className="text-xl font-bold mt-2">Fundamentos de Porcentagem</h2>
                                    <p className="text-xs text-purple-100 mt-1">O alicerce dos números: conversões e cálculo mental rápido.</p>
                                  </div>

                                  {/* Lesson Content Body */}
                                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-6 leading-relaxed">
                                    <h3 className="text-sm font-black border-l-4 border-l-purple-500 pl-3">A Linguagem Universal do Edital</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">
                                      A <strong>Porcentagem</strong> é uma razão centesimal, ou seja, uma fração cujo denominador é igual a **100**. Operar com porcentagem de forma rápida é essencial para resolver questões da CESGRANRIO em menos de 1 minuto.
                                    </p>

                                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-center space-y-1">
                                      <p className="font-mono text-xl font-black text-purple-600 dark:text-purple-400">
                                        p% = p ÷ 100
                                      </p>
                                      <p className="text-[10px] text-slate-400">Representação básica de fração centesimal</p>
                                    </div>

                                    {/* Equivalences Grid */}
                                    <div className="space-y-2">
                                      <p className="text-xs font-bold text-slate-800 dark:text-white">Tabela de Equivalências Rápidas:</p>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                                        <div className="bg-slate-100 dark:bg-zinc-800/40 p-2.5 rounded-lg">1/2 = 50% = 0.5</div>
                                        <div className="bg-slate-100 dark:bg-zinc-800/40 p-2.5 rounded-lg">1/4 = 25% = 0.25</div>
                                        <div className="bg-slate-100 dark:bg-zinc-800/40 p-2.5 rounded-lg">1/5 = 20% = 0.2</div>
                                        <div className="bg-slate-100 dark:bg-zinc-800/40 p-2.5 rounded-lg">1/10 = 10% = 0.1</div>
                                      </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
                                      <p className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5"><LuCalculator /> Método de Decomposição (Cálculo Mental):</p>
                                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                                        Para encontrar <strong>15% de 240</strong>, quebre a taxa:
                                        <br />
                                        1. Encontre 10% de 240 = <strong>24</strong> (basta mover a vírgula).
                                        <br />
                                        2. Encontre 5% de 240 (metade de 10%) = <strong>12</strong>.
                                        <br />
                                        3. Some os resultados: 24 + 12 = <strong>36</strong>.
                                      </p>
                                    </div>

                                    {/* Mini Interactive Exercise */}
                                    <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4">
                                      <h4 className="text-xs font-black uppercase text-purple-500">Fixação Rápida (Quiz)</h4>
                                      <p className="text-xs font-bold text-slate-800 dark:text-white">Qual o valor de 35% de 200?</p>
                                      
                                      <div className="space-y-2">
                                        {[
                                          { index: 0, text: '60' },
                                          { index: 1, text: '70 (Correto - 30% é 60 e 5% é 10)' },
                                          { index: 2, text: '80' },
                                          { index: 3, text: '50' }
                                        ].map((opt) => {
                                          const isSelected = matematicaAnswer === opt.index;
                                          const isCorrect = opt.index === 1;

                                          let btnClass = "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-800/40";
                                          if (isSelected && !matematicaIsAnswered) btnClass = "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400";
                                          if (matematicaIsAnswered) {
                                            if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                                            else if (isSelected) btnClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                                          }

                                          return (
                                            <div
                                              key={opt.index}
                                              onClick={() => !matematicaIsAnswered && setMatematicaAnswer(opt.index)}
                                              className={`p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${btnClass}`}
                                            >
                                              {opt.text}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <div className="flex gap-3">
                                        <button
                                          disabled={matematicaAnswer === null || matematicaIsAnswered}
                                          onClick={() => setMatematicaIsAnswered(true)}
                                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                                            matematicaAnswer === null || matematicaIsAnswered
                                              ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                                              : 'bg-purple-600 text-white hover:bg-purple-700'
                                          }`}
                                        >
                                          Confirmar
                                        </button>
                                        {matematicaIsAnswered && (
                                          <button onClick={handleResetMatematica} className="px-4 py-2 border border-slate-350 dark:border-zinc-700 text-xs font-bold rounded-lg">
                                            Reiniciar
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Render Específicas NR-35 Lesson */}
                              {activeLessonSubject === 'especificas' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                  {/* Subject Banner */}
                                  <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 rounded-2xl text-white shadow-md">
                                    <span className="text-[10px] font-black uppercase bg-white/20 px-2.5 py-1 rounded">Segurança e Saúde no Trabalho</span>
                                    <h2 className="text-xl font-bold mt-2">NR 35 - Trabalho em Altura</h2>
                                    <p className="text-xs text-emerald-100 mt-1">Domine a diretriz normativa essencial para operações e prevenção de quedas.</p>
                                  </div>

                                  {/* Lesson Content Body */}
                                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-6 leading-relaxed">
                                    <h3 className="text-sm font-black border-l-4 border-l-emerald-500 pl-3">Gestão, Planejamento e Organização</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">
                                      O trabalho em altura é a causa número um de acidentes fatais no setor de Óleo e Gás. Por isso, a <strong>NR-35</strong> estabelece parâmetros técnicos rígidos. A norma define trabalho em altura toda atividade executada acima de **2,00 metros** do nível inferior, onde haja risco de queda.
                                    </p>

                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-2">
                                      <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5"><LuTriangleAlert /> Ponto Chave do Edital (Treinamento):</p>
                                      <p className="text-slate-600 dark:text-slate-300 font-medium">
                                        O treinamento inicial para trabalho em altura deve ter carga horária de **8 horas**. A reciclagem periódica deve ocorrer obrigatoriamente a cada **dois anos** (bienal), ou após retorno de afastamento prolongado.
                                      </p>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
                                      <p className="font-bold text-slate-800 dark:text-white mb-2">Zona de Queda Livre (ZQL):</p>
                                      <p className="text-slate-600 dark:text-slate-300">
                                        É a distância vertical livre medida a partir do ponto de ancoragem para que o trabalhador não atinja o chão em caso de queda. O cálculo engloba:
                                        <br />
                                        <code>ZQL = Comp. Talabarte + Comp. Absorvedor Aberto + Altura do Trabalhador + 1m (Segurança)</code>.
                                      </p>
                                    </div>

                                    {/* Mini Interactive Exercise */}
                                    <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4">
                                      <h4 className="text-xs font-black uppercase text-emerald-500">Fixação Rápida (Quiz)</h4>
                                      <p className="text-xs font-bold text-slate-800 dark:text-white">A NR-35 considera trabalho em altura a atividade executada a partir de qual medida do nível inferior?</p>
                                      
                                      <div className="space-y-2">
                                        {[
                                          { index: 0, text: '1,50 metros' },
                                          { index: 1, text: '2,00 metros (Correto - Limite fixado pela norma)' },
                                          { index: 2, text: '2,50 metros' },
                                          { index: 3, text: '3,00 metros' }
                                        ].map((opt) => {
                                          const isSelected = especificasAnswer === opt.index;
                                          const isCorrect = opt.index === 1;

                                          let btnClass = "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-800/40";
                                          if (isSelected && !especificasIsAnswered) btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450";
                                          if (especificasIsAnswered) {
                                            if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                                            else if (isSelected) btnClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                                          }

                                          return (
                                            <div
                                              key={opt.index}
                                              onClick={() => !especificasIsAnswered && setEspecificasAnswer(opt.index)}
                                              className={`p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${btnClass}`}
                                            >
                                              {opt.text}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <div className="flex gap-3">
                                        <button
                                          disabled={especificasAnswer === null || especificasIsAnswered}
                                          onClick={() => setEspecificasIsAnswered(true)}
                                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                                            especificasAnswer === null || especificasIsAnswered
                                              ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                          }`}
                                          style={{ backgroundColor: 'var(--primary-hex, #22c55e)' }}
                                        >
                                          Confirmar
                                        </button>
                                        {especificasIsAnswered && (
                                          <button onClick={handleResetEspecificas} className="px-4 py-2 border border-slate-350 dark:border-zinc-700 text-xs font-bold rounded-lg">
                                            Reiniciar
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === 'simulador' && (
                        <motion.div
                          key="simulador"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-6 text-left"
                        >
                          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                              <h2 className="text-lg font-bold">Simulado Interativo</h2>
                              <p className="text-xs text-slate-400 mt-1">Escolha a resposta correta para a questão abaixo para testar seus conhecimentos.</p>
                            </div>
                            {isAnswered && (
                              <button onClick={handleResetSimulator} className="px-3 py-1.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold rounded-lg transition-all">
                                Tentar Novamente
                              </button>
                            )}
                          </div>

                          {/* Interactive Quiz Box */}
                          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-white/5 p-6 shadow-sm space-y-6">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase bg-blue-500/10 border border-blue-500/20 text-blue-500 px-2 py-0.5 rounded">
                                Língua Portuguesa
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">Nível Médio</span>
                            </div>

                            <div className="space-y-3">
                              <p className="text-xs text-slate-400 font-black">QUESTÃO 1:</p>
                              <p className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed">
                                Em relação às regras de concordância verbal da Língua Portuguesa, assinale a opção inteiramente correta:
                              </p>
                            </div>

                            {/* Options list */}
                            <div className="space-y-3">
                              {[
                                { label: 'A', text: 'Haviam muitos candidatos inscritos no concurso da Petrobras.' },
                                { label: 'B', text: 'Fazem cinco anos que a Petrobras não realiza este certame.' },
                                { label: 'C', text: 'Deve haver outras vagas disponíveis para técnico de enfermagem.' },
                                { label: 'D', text: 'Choveram vagas para o nível médio neste edital.' }
                              ].map((opt, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrectOption = index === 2; // C is correct
                                
                                let optionClass = "border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-800/30 text-slate-800 dark:text-slate-200";
                                let labelClass = "bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-300";

                                if (isSelected && !isAnswered) {
                                  optionClass = "border-primary/40 bg-primary/5 text-primary dark:text-white shadow-md shadow-primary/5";
                                  labelClass = "bg-primary text-white";
                                } else if (isAnswered) {
                                  if (isCorrectOption) {
                                    optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                                    labelClass = "bg-emerald-500 text-white";
                                  } else if (isSelected) {
                                    optionClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                                    labelClass = "bg-red-500 text-white";
                                  }
                                }

                                return (
                                  <div
                                    key={index}
                                    onClick={() => !isAnswered && setSelectedOption(index)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${optionClass}`}
                                  >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${labelClass}`}>
                                      {opt.label}
                                    </div>
                                    <p className="flex-1 mt-0.5 leading-relaxed">{opt.text}</p>
                                    {isAnswered && (
                                      <div className="shrink-0 self-center">
                                        {isCorrectOption ? (
                                          <LuCheck className="text-emerald-500" size={18} />
                                        ) : isSelected ? (
                                          <LuX className="text-red-500" size={18} />
                                        ) : null}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                              <button
                                disabled={selectedOption === null || isAnswered}
                                onClick={() => setIsAnswered(true)}
                                className={`w-full py-3 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                                  selectedOption === null || isAnswered
                                    ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/95 text-white hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]'
                                }`}
                                style={selectedOption !== null && !isAnswered ? { backgroundImage: 'var(--primary-gradient)' } : {}}
                              >
                                {isAnswered ? 'Respondido' : 'Confirmar Resposta'}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'ranking' && (
                        <motion.div
                          key="ranking"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-6 text-left"
                        >
                          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <h2 className="text-lg font-bold">Classificação Geral</h2>
                            <p className="text-xs text-slate-400 mt-1">Veja sua classificação em comparação com outros estudantes.</p>
                          </div>

                          {/* Leaderboard Table Mock */}
                          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-zinc-800/40 flex items-center justify-between text-xs font-bold text-slate-400">
                              <span>RANKING GERAL</span>
                              <span className="text-primary" style={{ color: 'var(--primary-hex, #22c55e)' }}>Fase do Trial</span>
                            </div>
                            
                            <div className="divide-y divide-slate-100 dark:divide-white/5">
                              {/* Row 1 */}
                              <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-all">
                                <div className="flex items-center gap-4">
                                  <span className="text-base font-black w-6 text-center text-yellow-500">🥇</span>
                                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-white shrink-0">AH</div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold">André Hugo</span>
                                      <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                        PRO Elite
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight mt-0.5">Nível Superior</p>
                                  </div>
                                </div>
                                <span className="text-xs font-extrabold text-amber-500">12.450 XP</span>
                              </div>

                              {/* Row 2 (YOU) */}
                              <div className="p-4 flex items-center justify-between bg-primary/5 border-l-4 border-l-primary hover:bg-primary/10 transition-all" style={{ borderLeftColor: 'var(--primary-hex, #22c55e)' }}>
                                <div className="flex items-center gap-4">
                                  <span className="text-base font-black w-6 text-center text-slate-400">🥈</span>
                                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-black text-white shrink-0">SF</div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold text-primary" style={{ color: 'var(--primary-hex, #22c55e)' }}>Sophia Beatriz Fernandes</span>
                                      <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider" style={{ color: 'var(--primary-hex, #22c55e)', borderColor: 'var(--primary-hex/20, #22c55e33)' }}>
                                        Você
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight mt-0.5">Téc. Enfermagem do Trabalho (Média)</p>
                                  </div>
                                </div>
                                <span className="text-xs font-extrabold text-primary" style={{ color: 'var(--primary-hex, #22c55e)' }}>0 XP</span>
                              </div>

                              {/* Row 3 */}
                              <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-all">
                                <div className="flex items-center gap-4">
                                  <span className="text-base font-black w-6 text-center text-amber-700">🥉</span>
                                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-white shrink-0">LS</div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold">Lucas Silva</span>
                                      <span className="bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                        PRO
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight mt-0.5">Nível Médio</p>
                                  </div>
                                </div>
                                <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300">9.820 XP</span>
                              </div>

                              {/* Row 4 */}
                              <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-all">
                                <div className="flex items-center gap-4">
                                  <span className="text-xs font-extrabold w-6 text-center text-slate-400">4</span>
                                  <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-xs font-black text-white shrink-0">MS</div>
                                  <div>
                                    <span className="text-xs font-extrabold block">Mariana Santos</span>
                                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight mt-0.5">Nível Superior</p>
                                  </div>
                                </div>
                                <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300">8.400 XP</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
