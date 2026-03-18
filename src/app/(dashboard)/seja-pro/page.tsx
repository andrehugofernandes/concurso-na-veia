'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Usuario } from '@/lib/types';
import { carregarUsuario } from '@/lib/utils';
import { getCurrentUserAction } from '@/lib/actions/auth';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { LuZap, LuCircleCheck, LuLoader, LuGraduationCap, LuBriefcase } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { StripePlan } from '@/lib/stripe';
import { createAuthenticatedCheckout, createPortalSession } from '@/lib/actions/stripe';

const PLANOS_MEDIO = [
  {
    id: 'aprovado-medio' as StripePlan,
    nome: 'Aprovado',
    nivel: 'Médio',
    preco: 'R$ 49',
    precoCentavos: '99',
    periodo: '/mês',
    descricao: 'Tudo o que você precisa para garantir sua vaga no nível técnico/médio.',
    icone: '🚀',
    cor: 'from-yellow-400 to-orange-500',
    destaque: false,
    beneficios: [
      { texto: 'Aulas de todas as matérias (nível médio)', status: true },
      { texto: 'Questões ilimitadas', status: true },
      { texto: 'Simulados completos', status: true },
      { texto: 'Histórico e gráficos de desempenho', status: true },
      { texto: 'Professor IA 24h', status: false },
      { texto: 'Mentoria semanal', status: false },
    ],
    cta: 'Assinar Aprovado Médio',
  },
  {
    id: 'elite-medio' as StripePlan,
    nome: 'Elite',
    nivel: 'Médio',
    preco: 'R$ 79',
    precoCentavos: '99',
    periodo: '/mês',
    descricao: 'A experiência definitiva com IA e mentoria para o nível técnico/médio.',
    icone: '👑',
    cor: 'from-purple-500 to-indigo-600',
    destaque: true,
    beneficios: [
      { texto: 'Tudo do plano Aprovado Médio', status: true },
      { texto: 'Professor IA 24h', status: true },
      { texto: 'Mentoria semanal ao vivo', status: true },
      { texto: 'Acesso antecipado a novos conteúdos', status: true },
      { texto: 'Suporte VIP', status: true },
      { texto: 'Cronograma personalizado por IA', status: true },
    ],
    cta: 'Assinar Elite Médio',
  },
];

const PLANOS_SUPERIOR = [
  {
    id: 'aprovado-superior' as StripePlan,
    nome: 'Aprovado',
    nivel: 'Superior',
    preco: 'R$ 69',
    precoCentavos: '99',
    periodo: '/mês',
    descricao: 'Tudo o que você precisa para garantir sua vaga no nível superior.',
    icone: '🚀',
    cor: 'from-yellow-400 to-orange-500',
    destaque: false,
    beneficios: [
      { texto: 'Aulas de todas as matérias (nível superior)', status: true },
      { texto: 'Questões ilimitadas', status: true },
      { texto: 'Simulados completos', status: true },
      { texto: 'Histórico e gráficos de desempenho', status: true },
      { texto: 'Professor IA 24h', status: false },
      { texto: 'Mentoria semanal', status: false },
    ],
    cta: 'Assinar Aprovado Superior',
  },
  {
    id: 'elite-superior' as StripePlan,
    nome: 'Elite',
    nivel: 'Superior',
    preco: 'R$ 119',
    precoCentavos: '99',
    periodo: '/mês',
    descricao: 'A experiência definitiva com IA e mentoria para o nível superior.',
    icone: '👑',
    cor: 'from-purple-500 to-indigo-600',
    destaque: true,
    beneficios: [
      { texto: 'Tudo do plano Aprovado Superior', status: true },
      { texto: 'Professor IA 24h', status: true },
      { texto: 'Mentoria semanal ao vivo', status: true },
      { texto: 'Acesso antecipado a novos conteúdos', status: true },
      { texto: 'Suporte VIP', status: true },
      { texto: 'Cronograma personalizado por IA', status: true },
    ],
    cta: 'Assinar Elite Superior',
  },
];

const PLANO_TOTAL = {
  id: 'elite-total' as StripePlan,
  nome: 'Elite Total',
  nivel: 'Médio + Superior',
  preco: 'R$ 149',
  precoCentavos: '99',
  periodo: '/mês',
  descricao: 'Acesso completo a todos os cargos, matérias, IA e mentoria. O plano definitivo.',
  icone: '💎',
  cor: 'from-yellow-500 to-amber-600',
  destaque: false,
  beneficios: [
    { texto: 'Todos os cargos: médio + superior', status: true },
    { texto: 'Todas as matérias desbloqueadas', status: true },
    { texto: 'Professor IA 24h', status: true },
    { texto: 'Mentoria semanal ao vivo', status: true },
    { texto: 'Suporte VIP prioritário', status: true },
    { texto: 'Cronograma personalizado por IA', status: true },
  ],
  cta: 'Assinar Elite Total',
};

const NOME_PLANO: Record<string, string> = {
  'aprovado-medio': 'Aprovado Médio',
  'aprovado-superior': 'Aprovado Superior',
  'elite-medio': 'Elite Médio',
  'elite-superior': 'Elite Superior',
  'elite-total': 'Elite Total',
  free: 'Iniciante',
};

const ICONE_PLANO: Record<string, string> = {
  'aprovado-medio': '🚀',
  'aprovado-superior': '🚀',
  'elite-medio': '👑',
  'elite-superior': '👑',
  'elite-total': '💎',
  free: '🌱',
};

export default function SejaProPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ tipo: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const result = await getCurrentUserAction();
      if (result.status === 'success' && result.data) {
        setUsuario(result.data as Usuario);
      } else {
        const local = carregarUsuario();
        if (local) setUsuario(local);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const plan = searchParams.get('plan') ?? '';
      setFeedback({
        tipo: 'success',
        msg: `🎉 Assinatura ativada! Bem-vindo ao plano ${NOME_PLANO[plan] ?? plan}`,
      });
      router.replace('/seja-pro');
    } else if (searchParams.get('canceled') === 'true') {
      setFeedback({ tipo: 'error', msg: 'Pagamento cancelado. Tente novamente quando quiser.' });
      router.replace('/seja-pro');
    }
  }, [searchParams, router]);

  const handleCheckout = async (plan: StripePlan) => {
    setLoadingPlan(plan);
    setFeedback(null);
    try {
      const result = await createAuthenticatedCheckout(plan);
      if (result.error) throw new Error(result.error);
      if (result.url) window.location.href = result.url;
    } catch (err: any) {
      setFeedback({ tipo: 'error', msg: err.message });
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const result = await createPortalSession();
      if (result.error) throw new Error(result.error);
      if (result.url) window.location.href = result.url;
    } catch (err: any) {
      setFeedback({ tipo: 'error', msg: err.message });
      setPortalLoading(false);
    }
  };

  const isPago = usuario?.plan && usuario.plan !== 'free';
  const planAtual = usuario?.plan ?? 'free';

  return (
    <div className="p-2 md:p-[80px]">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight flex items-center gap-4">
          <LuZap className="text-yellow-500 w-10 h-10 md:w-12 md:h-12 fill-yellow-500" />
          A Vaga EH Minha
        </h1>
        <p className="text-muted-foreground text-lg mt-2 font-medium max-w-2xl">
          Escolha o seu nível de concurso e o plano ideal para acelerar sua aprovação.
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={cn(
          'mb-8 p-4 rounded-2xl border text-sm font-medium',
          feedback.tipo === 'success'
            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
        )}>
          {feedback.msg}
        </div>
      )}

      {/* Plano atual */}
      {usuario && (
        <div className="mb-12 p-6 rounded-3xl bg-secondary/30 border border-border/50 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
            {ICONE_PLANO[planAtual] ?? '🌱'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Seu Plano Atual:{' '}
              <span className="text-primary uppercase tracking-tight">
                {NOME_PLANO[planAtual] ?? 'Iniciante'}
              </span>
            </h3>
            <p className="text-muted-foreground">
              {isPago
                ? 'Parabéns por investir na sua carreira! Aproveite todos os recursos liberados.'
                : 'Você está usando a versão limitada. Escolha um plano para acelerar sua aprovação.'}
            </p>
          </div>
          <div className="md:ml-auto flex flex-col items-end gap-2">
            <div className="px-4 py-2 bg-background/50 rounded-xl border border-border/50 text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Status: Ativa
            </div>
            {isPago && (
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="text-xs text-muted-foreground underline hover:text-foreground transition disabled:opacity-50"
              >
                {portalLoading ? 'Abrindo portal...' : 'Gerenciar / Cancelar assinatura'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Todos os 5 planos */}
      <div className="mb-12">
        <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
          Escolha seu plano
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          5 opções para diferentes perfis e necessidades. Cancele quando quiser, sem compromisso.
        </p>

        {/* NÍVEL MÉDIO */}
        <div className="mb-12">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <LuBriefcase className="w-4 h-4" />
            Nível Médio / Técnico
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
            {PLANOS_MEDIO.map((plano) => {
              const isCurrent = planAtual === plano.id;
              const isLoading = loadingPlan === plano.id;

              return (
                <div
                  key={plano.id}
                  className={cn(
                    'group relative flex flex-col bg-card backdrop-blur-lg rounded-3xl border transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl overflow-hidden',
                    plano.destaque
                      ? 'border-primary/50 shadow-primary/10 md:scale-105'
                      : 'border-border/50 dark:border-white/5 hover:border-primary/50'
                  )}
                >
                  <AnimatedBorder borderRadius="rounded-3xl" />

                  {plano.destaque && (
                    <div className="absolute top-0 right-10 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest z-20">
                      Mais Popular
                    </div>
                  )}

                  <div className="p-8 pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={cn(
                        'flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br text-2xl shadow-lg',
                        plano.cor
                      )}>
                        {plano.icone}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase leading-none">
                          {plano.nome}
                        </h2>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Nível {plano.nivel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mt-4 mb-3">
                      <span className="text-4xl font-black text-foreground tracking-tighter">{plano.preco}</span>
                      <span className="text-xl font-bold text-foreground/80">,{plano.precoCentavos}</span>
                      <span className="text-muted-foreground font-medium">{plano.periodo}</span>
                    </div>

                    <p className="text-muted-foreground text-sm font-medium">{plano.descricao}</p>
                  </div>

                  <div className="flex-1 px-8 py-6 space-y-4">
                    {plano.beneficios.map((ben, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-start gap-3 text-sm',
                          ben.status ? 'text-foreground font-medium' : 'text-muted-foreground/50 line-through'
                        )}
                      >
                        {ben.status
                          ? <LuCircleCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          : <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">✕</div>
                        }
                        <span>{ben.texto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 pt-4">
                    <button
                      onClick={() => { if (!isCurrent && !isLoading) handleCheckout(plano.id); }}
                      disabled={isCurrent || isLoading}
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98]',
                        plano.destaque
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40'
                          : 'bg-secondary/50 text-foreground border border-border/50 hover:bg-secondary',
                        isCurrent && 'opacity-50 cursor-not-allowed grayscale'
                      )}
                    >
                      {isLoading && <LuLoader className="w-4 h-4 animate-spin" />}
                      {isCurrent ? 'Plano Atual' : plano.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NÍVEL SUPERIOR */}
        <div className="mb-12">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <LuGraduationCap className="w-4 h-4" />
            Nível Superior
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
            {PLANOS_SUPERIOR.map((plano) => {
              const isCurrent = planAtual === plano.id;
              const isLoading = loadingPlan === plano.id;

              return (
                <div
                  key={plano.id}
                  className={cn(
                    'group relative flex flex-col bg-card backdrop-blur-lg rounded-3xl border transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl overflow-hidden',
                    plano.destaque
                      ? 'border-primary/50 shadow-primary/10 md:scale-105'
                      : 'border-border/50 dark:border-white/5 hover:border-primary/50'
                  )}
                >
                  <AnimatedBorder borderRadius="rounded-3xl" />

                  {plano.destaque && (
                    <div className="absolute top-0 right-10 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest z-20">
                      Mais Popular
                    </div>
                  )}

                  <div className="p-8 pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={cn(
                        'flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br text-2xl shadow-lg',
                        plano.cor
                      )}>
                        {plano.icone}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase leading-none">
                          {plano.nome}
                        </h2>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Nível {plano.nivel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mt-4 mb-3">
                      <span className="text-4xl font-black text-foreground tracking-tighter">{plano.preco}</span>
                      <span className="text-xl font-bold text-foreground/80">,{plano.precoCentavos}</span>
                      <span className="text-muted-foreground font-medium">{plano.periodo}</span>
                    </div>

                    <p className="text-muted-foreground text-sm font-medium">{plano.descricao}</p>
                  </div>

                  <div className="flex-1 px-8 py-6 space-y-4">
                    {plano.beneficios.map((ben, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-start gap-3 text-sm',
                          ben.status ? 'text-foreground font-medium' : 'text-muted-foreground/50 line-through'
                        )}
                      >
                        {ben.status
                          ? <LuCircleCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          : <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">✕</div>
                        }
                        <span>{ben.texto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 pt-4">
                    <button
                      onClick={() => { if (!isCurrent && !isLoading) handleCheckout(plano.id); }}
                      disabled={isCurrent || isLoading}
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98]',
                        plano.destaque
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40'
                          : 'bg-secondary/50 text-foreground border border-border/50 hover:bg-secondary',
                        isCurrent && 'opacity-50 cursor-not-allowed grayscale'
                      )}
                    >
                      {isLoading && <LuLoader className="w-4 h-4 animate-spin" />}
                      {isCurrent ? 'Plano Atual' : plano.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Máximo Acesso</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Elite Total — sempre visível */}
        <div className="max-w-3xl">
          {(() => {
            const plano = PLANO_TOTAL;
            const isCurrent = planAtual === plano.id;
            const isLoading = loadingPlan === plano.id;

            return (
              <div className={cn(
                'relative flex flex-col md:flex-row bg-card backdrop-blur-lg rounded-3xl border transition-all duration-300 shadow-xl overflow-hidden',
                'border-amber-500/50 shadow-amber-500/10'
              )}>
                <AnimatedBorder borderRadius="rounded-3xl" />

                <div className="absolute top-0 right-10 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest z-20">
                  Acesso Total
                </div>

                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-4 mb-2">
                    <div className={cn(
                      'flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br text-2xl shadow-lg',
                      plano.cor
                    )}>
                      {plano.icone}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-foreground tracking-tight uppercase leading-none">
                        {plano.nome}
                      </h2>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                        {plano.nivel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mt-4 mb-3">
                    <span className="text-4xl font-black text-foreground tracking-tighter">{plano.preco}</span>
                    <span className="text-xl font-bold text-foreground/80">,{plano.precoCentavos}</span>
                    <span className="text-muted-foreground font-medium">{plano.periodo}</span>
                  </div>

                  <p className="text-muted-foreground text-sm font-medium">{plano.descricao}</p>
                </div>

                <div className="flex flex-col md:w-1/2 px-8 md:px-0 md:pr-8 py-8 md:py-8">
                  <div className="flex-1 space-y-4 mb-6">
                    {plano.beneficios.map((ben, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-foreground font-medium">
                        <LuCircleCheck className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{ben.texto}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => { if (!isCurrent && !isLoading) handleCheckout(plano.id); }}
                    disabled={isCurrent || isLoading}
                    className={cn(
                      'flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98]',
                      'bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:bg-amber-400',
                      isCurrent && 'opacity-50 cursor-not-allowed grayscale'
                    )}
                  >
                    {isLoading && <LuLoader className="w-4 h-4 animate-spin" />}
                    {isCurrent ? 'Plano Atual' : plano.cta}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-8 text-center text-muted-foreground text-sm max-w-xl mx-auto space-y-2">
        <p>Pagamento seguro via Stripe. Cancele quando quiser pelo portal do cliente.</p>
        <p className="text-xs opacity-60">Dúvidas? Entre em contato via Ticket no suporte.</p>
      </div>
    </div>
  );
}
