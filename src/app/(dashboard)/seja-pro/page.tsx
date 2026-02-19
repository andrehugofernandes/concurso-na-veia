'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Usuario } from '@/lib/types';
import { carregarUsuario, salvarUsuario } from '@/lib/utils';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { Button } from '@/components/ui/button';
import { LuCheck, LuZap, LuCrown, LuCircleCheck } from 'react-icons/lu';
import { cn } from '@/lib/utils';

export default function SejaProPage() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const dados = carregarUsuario();
        if (dados) {
            setUsuario(dados);
        }
    }, []);

    const handleUpgrade = (plan: 'pro' | 'enterprise') => {
        if (!usuario) return;

        // Simulação de upgrade (em produção seria redirecionamento de checkout)
        const novoUsuario = { ...usuario, plan };
        setUsuario(novoUsuario);
        salvarUsuario(novoUsuario);
        alert(`Parabéns! Você agora é ${plan.toUpperCase()}! 🚀`);
    };

    const planos = [
        {
            id: 'free',
            nome: 'Iniciante',
            preco: 'R$ 0',
            periodo: '/mês',
            descricao: 'Para conhecer a plataforma e testar a metodologia.',
            icone: '🌱',
            cor: 'from-gray-500 to-slate-600',
            beneficios: [
                { texto: '5 questões diárias', status: true },
                { texto: 'Explicações básicas', status: true },
                { texto: 'Histórico de 3 dias', status: true },
                { texto: 'Professor IA', status: false },
                { texto: 'Cronograma personalizado', status: false },
            ],
            cta: 'Plano Atual',
            destaque: false
        },
        {
            id: 'pro',
            nome: 'Aprovado',
            preco: 'R$ 49',
            precoCentavos: '90',
            periodo: '/mês',
            descricao: 'Tudo o que você precisa para garantir sua vaga.',
            icone: '🚀',
            cor: 'from-yellow-400 to-orange-500',
            beneficios: [
                { texto: 'Questões ILIMITADAS', status: true },
                { texto: 'Explicações detalhadas com IA', status: true },
                { texto: 'Histórico completo + Gráficos', status: true },
                { texto: 'Cronograma Inteligente', status: true },
                { texto: 'Professor IA 24h', status: false },
            ],
            cta: 'Quero ser PRO',
            destaque: true
        },
        {
            id: 'enterprise',
            nome: 'Elite',
            preco: 'R$ 99',
            precoCentavos: '90',
            periodo: '/mês',
            descricao: 'A experiência definitiva de aprendizado com IA.',
            icone: '👑',
            cor: 'from-purple-600 to-indigo-700',
            beneficios: [
                { texto: 'Tudo do plano Aprovado', status: true },
                { texto: 'Professor IA (Webinar)', status: true },
                { texto: 'Mentoria Semanal', status: true },
                { texto: 'Acesso Antecipado', status: true },
                { texto: 'Suporte VIP 24h', status: true },
            ],
            cta: 'Assinar ELITE',
            destaque: false
        }
    ];

    return (
        <div className="p-2 md:p-4">
            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight flex items-center gap-4">
                    <LuZap className="text-yellow-500 w-10 h-10 md:w-12 md:h-12 fill-yellow-500" />
                    Seja Pro
                </h1>
                <p className="text-muted-foreground text-lg mt-2 font-medium max-w-2xl">
                    Escolha o plano ideal para acelerar sua aprovação.
                    O conteúdo da Petrobras é denso, não perca tempo com métodos antigos.
                </p>
            </div>

            {/* Condição Atual */}
            {usuario && (
                <div className="mb-12 p-6 rounded-3xl bg-secondary/30 border border-border/50 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                        {usuario.plan === 'pro' ? '🚀' : usuario.plan === 'enterprise' ? '👑' : '🌱'}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">
                            Seu Plano Atual: <span className="text-primary uppercase tracking-tight">{usuario.plan || 'Free'}</span>
                        </h3>
                        <p className="text-muted-foreground">
                            {usuario.plan === 'free'
                                ? 'Você está usando a versão limitada. Suas chances de aprovação aumentam 3x com o Plano Pro.'
                                : 'Parabéns por investir na sua carreira! Aproveite todos os recursos liberados.'}
                        </p>
                    </div>
                    <div className="md:ml-auto">
                        <div className="px-4 py-2 bg-background/50 rounded-xl border border-border/50 text-sm font-bold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Status da Conta: Ativa
                        </div>
                    </div>
                </div>
            )}

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {planos.map((plano) => (
                    <div
                        key={plano.id}
                        className={cn(
                            "group relative flex flex-col bg-card backdrop-blur-lg rounded-3xl border transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl overflow-hidden",
                            plano.destaque
                                ? "border-primary/50 shadow-primary/10 md:scale-105"
                                : "border-border/50 dark:border-white/5 hover:border-primary/50"
                        )}
                    >
                        {plano.id !== 'free' && <AnimatedBorder borderRadius="rounded-3xl" />}

                        {plano.destaque && (
                            <div className="absolute top-0 right-10 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest z-20">
                                Mais Popular
                            </div>
                        )}

                        {/* Header */}
                        <div className="p-8 pb-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={cn(
                                    "flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br text-2xl shadow-lg",
                                    plano.cor
                                )}>
                                    {plano.icone}
                                </div>
                                <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">
                                    {plano.nome}
                                </h2>
                            </div>

                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-black text-foreground tracking-tighter">{plano.preco}</span>
                                {plano.precoCentavos && <span className="text-xl font-bold text-foreground/80">,{plano.precoCentavos}</span>}
                                <span className="text-muted-foreground font-medium">{plano.periodo}</span>
                            </div>

                            <p className="text-muted-foreground text-sm font-medium">
                                {plano.descricao}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="flex-1 px-8 py-6 space-y-4">
                            {plano.beneficios.map((ben, idx) => (
                                <div key={idx} className={cn(
                                    "flex items-start gap-3 text-sm",
                                    ben.status ? "text-foreground font-medium" : "text-muted-foreground/50 line-through"
                                )}>
                                    {ben.status ? (
                                        <LuCircleCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">✕</div>
                                    )}
                                    <span>{ben.texto}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="p-8 pt-4">
                            <button
                                onClick={() => handleUpgrade(plano.id as any)}
                                disabled={usuario?.plan === plano.id}
                                className={cn(
                                    "flex items-center justify-center w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98] group/btn",
                                    plano.destaque
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                        : "bg-secondary/50 text-foreground border border-border/50 hover:bg-secondary",
                                    usuario?.plan === plano.id && "opacity-50 cursor-not-allowed grayscale"
                                )}
                            >
                                {usuario?.plan === plano.id ? 'Plano Atual' : plano.cta}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Info */}
            <div className="mt-16 text-center text-muted-foreground text-sm max-w-xl mx-auto">
                <p>
                    Pagamento processado de forma segura. Ao assinar, você concorda com nossos termos de uso.
                    Dúvidas? Entre em contato com nosso suporte via Ticket.
                </p>
            </div>
        </div>
    );
}
