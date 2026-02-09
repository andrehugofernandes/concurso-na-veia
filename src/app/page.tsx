'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';

import PetrobrasLogo from '@/components/PetrobrasLogo';
import HeroCarousel from '@/components/HeroCarousel';
import { fadeIn, staggerContainer, zoomIn } from '@/utils/motion';

const SectionWrapper = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          router.push('/dashboard');
        }
      } catch (e) {
        // Not authenticated, stay here
      }
    };
    checkAuth();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-4 md:py-6'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PetrobrasLogo className="w-40 h-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Recursos', 'Planos'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item === 'Recursos' ? 'features' : 'pricing'}`}
                whileHover={{ scale: 1.1, color: '#fff' }}
                className="text-sm font-medium text-gray-300 transition"
              >
                {item}
              </motion.a>
            ))}
            <Link href="/login" className="text-sm font-medium text-white hover:text-yellow-400 transition">Entrar</Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
              >
                Criar Conta
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Fullscreen Carousel Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer(0.2, 0)}
            initial="hidden"
            animate="show"
            className="text-left max-w-3xl"
          >
            <motion.div variants={fadeIn('down', 0.2)} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-black/60 backdrop-blur-md">
              <span className="text-yellow-400 text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                Edital 2026 Confirmado
              </span>
            </motion.div>

            <motion.h1 variants={fadeIn('up', 0.4)} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl">
              <span className="block text-white">Sua vaga na</span>
              <span className="bg-gradient-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent">Petrobras.</span>
              <span className="block text-gray-200 text-4xl md:text-5xl mt-2 font-light">Garantida pela IA.</span>
            </motion.h1>

            <motion.p variants={fadeIn('up', 0.6)} className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed drop-shadow-md font-medium">
              A única plataforma com simulados infinitos e personalizados no padrão CESGRANRIO. Estude o que realmente cai.
            </motion.p>

            <motion.div variants={fadeIn('up', 0.8)} className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-bold rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-105"
              >
                Começar Grátis
              </Link>
              <a
                href="#demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/20 transition flex items-center gap-2 group"
              >
                Ver como funciona
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Copywriting Section - Pain Points */}
      <SectionWrapper className="py-24 bg-zinc-900 border-t border-white/5">
        <motion.h2 variants={fadeIn('up', 0)} className="text-3xl md:text-5xl font-bold text-white mb-12 text-center max-w-4xl mx-auto">
          Por que 92% dos candidatos reprovam?
        </motion.h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {[
            { icon: '😫', title: 'Questões repetidas', desc: 'Os cursinhos tradicionais reciclam as mesmas questões de 2010.', color: 'red' },
            { icon: '📉', title: 'Estudar o que não cai', desc: 'Você perde meses estudando conteúdos que nunca apareceram na prova.', color: 'orange' },
            { icon: '💸', title: 'Materiais caros', desc: 'PDFs de 500 páginas que custam uma fortuna e não vão direto ao ponto.', color: 'yellow' }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', index * 0.2)}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="flex gap-6 items-start p-6 rounded-2xl transition-colors"
            >
              <div className={`text-5xl bg-${item.color}-500/10 p-4 rounded-2xl`}>{item.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Solution Section (Features) */}
      <section id="features" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionWrapper>
            <div className="text-center mb-16">
              <motion.h2 variants={zoomIn(0.2, 1)} className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-6">
                A Revolução do Estudo
              </motion.h2>
              <motion.p variants={fadeIn('up', 0.4)} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Nossa IA analisou todas as provas da CESGRANRIO dos últimos 10 anos para criar o simulador perfeito.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { icon: '♾️', title: 'Questões Infinitas', desc: 'Nunca mais fique sem material. A IA gera novas questões únicas.', color: 'yellow' },
                { icon: '🎯', title: 'Foco no Edital', desc: 'Conteúdo 100% alinhado com o cargo de Técnico. Sem enrolação.', color: 'purple' },
                { icon: '🚀', title: 'Gamificação Real', desc: 'Evolua seu nível, ganhe XP e mantenha a constância com nosso sistema.', color: 'blue' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', index * 0.3)}
                  whileHover={{ y: -10 }}
                  className="bg-zinc-900 rounded-3xl p-8 border border-white/5 hover:border-yellow-500/30 transition-all cursor-default"
                >
                  <div className={`w-12 h-12 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center text-2xl mb-6`}>{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm">
            <span className="text-green-400 text-sm font-semibold tracking-wide uppercase">Por dentro da plataforma</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
            A Interface do <span className="text-green-400">Seu Sucesso</span>
          </h2>

          <div className="relative max-w-5xl mx-auto rounded-xl border border-white/10 shadow-2xl shadow-green-500/10 overflow-hidden bg-slate-900/50 backdrop-blur-sm transform transition-all hover:scale-[1.01] duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/images/hero-study.png"
              alt="Plataforma Petrobras Quest - Dashboard"
              className="w-full aspect-[16/9] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Dashboard Inteligente</h3>
              <p className="text-gray-300">Acompanhe seu desempenho em tempo real com métricas detalhadas por matéria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Professor Webinar Section - Elite Feature */}
      <section className="py-24 bg-gradient-to-b from-purple-900/20 to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Exclusivo Plano Elite
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Seu Professor Particular <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Disponível 24h</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Participe de <strong>Webinars Interativos</strong> onde um Avatar de IA ministra aulas completas sobre qualquer ponto do edital.
              </p>

              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">🙋‍♂️</div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Levante a Mão</h4>
                    <p className="text-gray-400">Interrompa a aula a qualquer momento para tirar dúvidas via voz ou texto.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">🧠</div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Explicações Dinâmicas</h4>
                    <p className="text-gray-400">A IA adapta a explicação ao seu nível de conhecimento em tempo real.</p>
                  </div>
                </li>
              </ul>

              <a href="#pricing" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition group">
                Ver planos disponíveis
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="lg:w-1/2 relative">
              {/* Placeholder for AI Avatar Interface */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20 bg-gray-900 aspect-video group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                {/* Interface Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center font-bold">IA</div>
                    <div>
                      <div className="text-white font-bold text-sm">Prof. Atlas</div>
                      <div className="text-purple-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Falando sobre Termodinâmica
                      </div>
                    </div>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                    <span className="text-xl">✋</span> Levantar a mão
                  </button>
                </div>

                {/* Play Button visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer z-20">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>

                {/* Fallback Image/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-xl z-30 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ao Vivo</span>
                </div>
                <div className="text-white font-bold">1.248 alunos estudando agora</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              Investimento no Seu Futuro
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Escolha o plano ideal para sua aprovação. Cancele a qualquer momento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Iniciante</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">R$ 0</span>
                  <span className="text-gray-500 mb-1">/mês</span>
                </div>
                <p className="text-gray-400 text-sm">Para conhecer a plataforma e testar a metodologia.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-500">✓</span> 5 questões diárias</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-500">✓</span> Explicações básicas</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-green-500">✓</span> Histórico de 3 dias</li>
                <li className="flex items-center gap-3 text-gray-500"><span className="text-gray-600">✕</span> Professor IA</li>
                <li className="flex items-center gap-3 text-gray-500"><span className="text-gray-600">✕</span> Cronograma personalizado</li>
              </ul>
              <Link href="/register" className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition text-center">
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/30 hover:border-yellow-500 transition-all relative transform md:-translate-y-4 shadow-2xl shadow-yellow-500/10 flex flex-col">
              <div className="absolute top-0 center left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Mais Popular
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">Aprovado</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">R$ 49</span>
                  <span className="text-gray-500 mb-1">,90/mês</span>
                </div>
                <p className="text-gray-400 text-sm">Tudo o que você precisa para garantir sua vaga.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-white"><span className="text-yellow-500">✓</span> Questões ILIMITADAS</li>
                <li className="flex items-center gap-3 text-white"><span className="text-yellow-500">✓</span> Explicações detalhadas com IA</li>
                <li className="flex items-center gap-3 text-white"><span className="text-yellow-500">✓</span> Histórico completo + Gráficos</li>
                <li className="flex items-center gap-3 text-white"><span className="text-yellow-500">✓</span> Cronograma Inteligente</li>
                <li className="flex items-center gap-3 text-gray-500"><span className="text-gray-600">✕</span> Professor IA 24h</li>
              </ul>
              <Link href="/register?plan=pro" className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all text-center transform hover:scale-105">
                Quero ser Aprovado
              </Link>
            </div>

            {/* Elite Plan */}
            <div className="bg-gradient-to-b from-purple-900/40 to-black rounded-3xl p-8 border border-purple-500/50 hover:border-purple-400 transition-all relative overflow-hidden flex flex-col">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

              <div className="mb-8 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-purple-400">Elite</h3>
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">BETA</span>
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">R$ 99</span>
                  <span className="text-gray-500 mb-1">,90/mês</span>
                </div>
                <p className="text-gray-400 text-sm">A experiência definitiva de aprendizado com IA.</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex items-center gap-3 text-white"><span className="text-purple-400">✓</span> <strong>Tudo do plano Aprovado</strong></li>
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✦</span>
                  <div>
                    <strong className="text-purple-300">Professor IA (Webinar)</strong>
                    <p className="text-xs text-gray-400 leading-tight mt-1">Aulas ao vivo com avatar 3D que responde suas perguntas por voz em tempo real.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white"><span className="text-purple-400">✦</span> Mentoria Semanal</li>
                <li className="flex items-center gap-3 text-white"><span className="text-purple-400">✦</span> Acesso Antecipado a Features</li>
              </ul>

              <Link href="/register?plan=elite" className="relative z-10 w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all text-center shadow-lg shadow-purple-500/25">
                Garantir Acesso Elite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-center text-gray-500 text-sm">
        <p>&copy; 2026 Petrobras Quest AI. Feito com ❤️ e Inteligência Artificial.</p>
      </footer>
    </div>
  );
}
