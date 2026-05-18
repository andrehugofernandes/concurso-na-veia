"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

import PetrobrasLogo from "@/components/PetrobrasLogo";
import HeroCarousel from "@/components/HeroCarousel";
import { AuthThemeToggle } from "@/components/auth/AuthThemeToggle";
import { fadeIn, staggerContainer, zoomIn } from "@/utils/motion";
import { getCurrentUserAction } from "@/lib/actions/auth";
import PricingSection from "@/components/PricingSection";
import { 
  LuInfinity, 
  LuTarget, 
  LuRocket, 
  LuHand, 
  LuBrain, 
  LuCircleCheck,
  LuTriangleAlert,
  LuTrendingDown,
  LuDollarSign
} from "react-icons/lu";

const SectionWrapper = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
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
        const result = await getCurrentUserAction();
        if (result.status === "success") {
          router.push("/dashboard");
        }
      } catch (e) {
        // Not authenticated, stay here
      }
    };
    checkAuth();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center transition-all duration-300 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PetrobrasLogo 
              className="h-auto scale-90 md:scale-100 origin-left shrink-0 transition-all duration-300" 
              variant={scrolled ? "default" : "home-top"} 
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Recursos", "Planos"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item === "Recursos" ? "features" : "pricing"}`}
                whileHover={{ scale: 1.1, color: "var(--primary-hex)" }}
                className={`text-sm font-bold transition uppercase tracking-wider ${scrolled ? "text-foreground" : "text-white"}`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <AuthThemeToggle isScrolled={scrolled} />
            <Link
              href="/login"
              className={`px-5 py-2 rounded-xl text-sm font-black transition-all shadow-sm flex items-center justify-center border ${
                scrolled 
                  ? "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 active:scale-95" 
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md active:scale-95 shadow-xl shadow-black/10"
              }`}
            >
              Entrar
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition whitespace-nowrap shadow-lg shadow-primary/20"
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
            <motion.div
              variants={fadeIn("down", 0.2)}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-lg"
            >
              <span className="text-white text-sm font-black tracking-widest uppercase flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Edital 2026 Confirmado
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn("up", 0.4)}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl"
            >
              <span className="block text-white">Sua vaga na</span>
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Petrobras.
              </span>
              <span className="block text-white/80 text-4xl md:text-5xl mt-2 font-light">
                Garantida pela IA.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn("up", 0.6)}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed drop-shadow-md font-medium"
            >
              A única plataforma com simulados infinitos e personalizados no
              padrão CESGRANRIO. Estude o que realmente cai.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.8)}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/register"
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105"
              >
                Começar Grátis
              </Link>
              <a
                href="#demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/20 transition flex items-center gap-2 group"
              >
                Ver como funciona
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Copywriting Section - Pain Points */}
      <SectionWrapper className="py-24 bg-slate-100/50 dark:bg-muted/30 border-y border-slate-200 dark:border-white/5">
        <motion.h2
          variants={fadeIn("up", 0)}
          className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center max-w-4xl mx-auto"
        >
          Por que 92% dos candidatos reprovam?
        </motion.h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {[
            {
              icon: <LuTriangleAlert className="text-red-500" size={32} />,
              title: "Questões repetidas",
              desc: "Os cursinhos tradicionais reciclam as mesmas questões de 2010.",
              color: "red",
            },
            {
              icon: <LuTrendingDown className="text-orange-500" size={32} />,
              title: "Estudar o que não cai",
              desc: "Você perde meses estudando conteúdos que nunca apareceram na prova.",
              color: "orange",
            },
            {
              icon: <LuDollarSign className="text-yellow-500" size={32} />,
              title: "Materiais caros",
              desc: "PDFs de 500 páginas que custam uma fortuna e não vão direto ao ponto.",
              color: "yellow",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.2)}
              whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex gap-6 items-start p-6 rounded-2xl transition-colors dark:hover:bg-white/5"
            >
              <div
                className={`w-16 h-16 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Solution Section (Features) */}
      <section
        id="features"
        className="py-24 bg-white dark:bg-background relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <SectionWrapper>
            <div className="text-center mb-16">
              <motion.h2
                variants={zoomIn(0.2, 1)}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-6"
              >
                A Revolução do Estudo
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.4)}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Nossa IA analisou todas as provas da CESGRANRIO dos últimos 10
                anos para criar o simulador perfeito.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <LuInfinity size={28} />,
                  title: "Questões Infinitas",
                  desc: "Nunca mais fique sem material. A IA gera novas questões únicas.",
                  color: "yellow",
                },
                {
                  icon: <LuTarget size={28} />,
                  title: "Foco no Edital",
                  desc: "Conteúdo 100% alinhado com o cargo de Técnico. Sem enrolação.",
                  color: "purple",
                },
                {
                  icon: <LuRocket size={28} />,
                  title: "Gamificação Real",
                  desc: "Evolua seu nível, ganhe XP e mantenha a constância com nosso sistema.",
                  color: "blue",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", index * 0.3)}
                  whileHover={{ y: -10 }}
                  className="bg-slate-50 dark:bg-muted/30 rounded-3xl p-8 border border-slate-200 dark:border-border hover:border-primary/40 dark:hover:border-primary/30 transition-all cursor-default shadow-md dark:shadow-none"
                >
                  <div
                    className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700 text-primary"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="py-24 bg-slate-50/50 dark:bg-muted/20 border-y border-slate-200 dark:border-white/5 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              Por dentro da plataforma
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16">
            A Interface do <span className="text-primary">Seu Sucesso</span>
          </h2>

          <div className="relative max-w-5xl mx-auto rounded-xl border border-border shadow-2xl shadow-primary/10 overflow-hidden bg-muted/50 backdrop-blur-sm transform transition-all hover:scale-[1.01] duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/images/hero-study.png"
              alt="Plataforma Petrobras Quest - Dashboard"
              className="w-full aspect-[16/9] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Dashboard Inteligente
              </h3>
              <p className="text-slate-300">
                Acompanhe seu desempenho em tempo real com métricas detalhadas
                por matéria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Professor Webinar Section - Elite Feature */}
      <section className="py-24 bg-white dark:bg-background border-t border-slate-200 dark:border-border relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.15] dark:bg-primary/20 border border-primary/30 dark:border-primary/40 text-primary text-xs font-black uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Exclusivo Plano Elite
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Seu Professor Particular <br />
                <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Disponível 24h
                </span>
              </h2>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Participe de <strong>Webinars Interativos</strong> onde um
                Avatar de IA ministra aulas completas sobre qualquer ponto do
                edital.
              </p>

              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 text-primary">
                    <LuHand size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      Levante a Mão
                    </h4>
                    <p className="text-muted-foreground">
                      Interrompa a aula a qualquer momento para tirar dúvidas
                      via voz ou texto.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 text-primary">
                    <LuBrain size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      Explicações Dinâmicas
                    </h4>
                    <p className="text-muted-foreground">
                      A IA adapta a explicação ao seu nível de conhecimento em
                      tempo real.
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-primary font-bold hover:opacity-80 transition group"
              >
                Ver planos disponíveis
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            <div className="lg:w-1/2 relative">
              {/* Placeholder for AI Avatar Interface */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20 bg-gray-900 aspect-video group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                {/* Interface Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center font-bold">
                      IA
                    </div>
                    <div>
                      <div className="text-primary-foreground font-bold text-sm">
                        Prof. Atlas
                      </div>
                      <div className="text-primary-foreground/80 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                        Falando sobre Termodinâmica
                      </div>
                    </div>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center gap-2 border border-white/10">
                    {LuCircleCheck && <LuCircleCheck className="text-primary" size={20} />} Levantar a mão
                  </button>
                </div>

                {/* Play Button visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer z-20">
                  <svg
                    className="w-8 h-8 text-primary-foreground ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Fallback Image/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-background" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-2xl z-30 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Ao Vivo
                  </span>
                </div>
                <div className="text-zinc-900 dark:text-foreground font-bold">
                  1.248 alunos estudando agora
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="border-t border-slate-200 dark:border-border">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-center text-muted-foreground text-sm">
        <p>
          &copy; 2026 A Vaga EH Minha. Feito com ❤️ e Inteligência Artificial.
        </p>
      </footer>
    </div>
  );
}
