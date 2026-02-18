'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTEUDO_MATERIAS, MateriaConteudo } from '@/data/conteudo';
import { CARGOS } from '@/data/cargos';
import { useAllAulasProgress } from '@/hooks/useAulaProgress';
import { carregarUsuario } from '@/lib/utils';
import { getProfissaoById } from '@/lib/profissoes-edital';
import { AnimatedBorder } from '@/components/ui/animated-border';

// Mapeamento de IDs do registro para IDs do profissoes-edital
const CARGO_ID_MAP: Record<string, string> = {
    'administracao': 'suprimento-adm',
    'seguranca': 'seguranca-trabalho',
    'logistica': 'logistica-transportes',
    'quimica': 'quimica-petroleo',
    'manutencao-mecanica': 'manutencao-mecanica',
    'manutencao-eletrica': 'manutencao-eletrica',
    'manutencao-instrumentacao': 'manutencao-instrumentacao',
    'operacao': 'operacao',
};

export default function AulasPage() {
    const [materiasVisiveis, setMateriasVisiveis] = useState<MateriaConteudo[]>([]);
    const [cargoNome, setCargoNome] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const { progressData, loading: progressLoading, getProgress } = useAllAulasProgress();

    useEffect(() => {
        const loadUserAndFilter = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (!response.ok) throw new Error('Falha ao carregar usuário');
                const data = await response.json();
                const usuario = data.user;
                const cargoIdOriginal = usuario?.cargo;

                // Mapear ID do cargo para o ID correto do profissoes-edital
                const cargoId = cargoIdOriginal ? (CARGO_ID_MAP[cargoIdOriginal] || cargoIdOriginal) : null;

                console.log('[Aulas] User:', usuario);
                console.log('[Aulas] Cargo Original:', cargoIdOriginal);
                console.log('[Aulas] Cargo Mapeado:', cargoId);

                if (cargoId) {
                    // Buscar cargo do usuário em CARGOS (para nome amigável)
                    // Nota: O fallback do dashboard-page.tsx usa 'operacao' se nulo
                    const cargo = CARGOS.find(c => c.id === cargoIdOriginal);

                    // Buscar profissão para conteúdo específico detalhado do edital
                    const profissao = getProfissaoById(cargoId);

                    console.log('[Aulas] Profissão encontrada:', profissao);

                    if (cargo) {
                        setCargoNome(cargo.nome);
                    } else if (profissao) {
                        setCargoNome(profissao.nome);
                    }

                    // Construir lista de matérias visíveis
                    const materiasBase: MateriaConteudo[] = CONTEUDO_MATERIAS.filter(m =>
                        m.id === 'portugues' || m.id === 'matematica'
                    );

                    // Adicionar matérias específicas da profissão se existir
                    if (profissao && profissao.blocos && profissao.blocos.length > 0) {
                        const especificosCard: MateriaConteudo = {
                            id: 'conhecimentos-especificos',
                            nome: 'Conhecimentos Específicos',
                            descricao: `Conteúdo técnico para ${profissao.nome}`,
                            icone: '📋',
                            cor: 'from-orange-500 to-red-500',
                            requiredPlan: 'Bronze',
                            topicos: profissao.blocos.flatMap((bloco, idx) =>
                                bloco.topicos.map((topico, tidx) => ({
                                    id: `${bloco.nome.toLowerCase().replace(/\s+/g, '-')}-${tidx}`,
                                    titulo: topico,
                                    descricao: bloco.nome,
                                    duracao: '10 min',
                                    ordem: idx * 10 + tidx + 1
                                }))
                            )
                        };
                        setMateriasVisiveis([...materiasBase, especificosCard]);
                    } else {
                        setMateriasVisiveis(materiasBase);
                    }
                } else {
                    // Sem cargo definido, mostrar base
                    setMateriasVisiveis(CONTEUDO_MATERIAS.filter(m =>
                        m.id === 'portugues' || m.id === 'matematica'
                    ));
                }
            } catch (error) {
                console.error('[Aulas] Erro ao carregar dados:', error);
                // Fallback para base em caso de erro
                setMateriasVisiveis(CONTEUDO_MATERIAS.filter(m =>
                    m.id === 'portugues' || m.id === 'matematica'
                ));
            } finally {
                setLoading(false);
            }
        };

        loadUserAndFilter();
    }, []);

    if (loading || progressLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4">
            {/* Page Header */}
            <div className="mb-12 flex items-start gap-4">
                <div className="text-4xl md:text-5xl flex-shrink-0 mt-1">
                    📚
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        Aulas por Matéria
                    </h1>
                    <p className="text-muted-foreground text-lg mt-2 font-medium">
                        {cargoNome ? `Conteúdo para: ${cargoNome}` : 'Escolha uma matéria para estudar'}
                    </p>
                </div>
            </div>

            {/* Matérias Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {materiasVisiveis.map((materia) => (
                    <Link
                        href={`/aulas/${materia.id}`}
                        key={materia.id}
                        className="group relative flex flex-col bg-slate-50/50 dark:bg-card backdrop-blur-lg rounded-3xl border border-border/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-primary/10 overflow-hidden"
                    >
                        <AnimatedBorder borderRadius="rounded-3xl" />

                        {/* Header Section */}
                        <div className="p-8 pb-4">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${materia.cor} text-3xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
                                    {materia.icone}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/50 text-primary text-xs font-bold border border-zinc-200 dark:border-zinc-700">
                                    {materia.topicos.length} Tópicos
                                </span>
                            </div>

                            <h2 className="text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase">
                                {materia.nome}
                            </h2>
                            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                                {materia.descricao}
                            </p>
                        </div>

                        {/* List of Topics (Pricing Style) */}
                        <div className="flex-1 px-8 py-4 space-y-3">
                            {materia.topicos.slice(0, 7).map((topico, idx) => {
                                const prog = getProgress(materia.id, topico.id);
                                const isCompleted = prog?.completed;
                                return (
                                    <div key={topico.id} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isCompleted ? 'bg-green-500' : 'bg-blue-500/40 group-hover/item:bg-blue-500'}`} />
                                        <span className={`truncate transition-colors flex-1 ${isCompleted ? 'text-green-600 dark:text-green-400 font-medium' : 'group-hover/item:text-foreground'}`}>
                                            {topico.titulo}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground/60 font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            {topico.duracao}
                                        </span>
                                        {isCompleted && (
                                            <span className="text-green-500 text-xs font-bold px-1.5 py-0.5 bg-green-500/10 rounded-full">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                            {materia.topicos.length > 7 && (
                                <div className="text-xs text-primary/60 font-medium pl-4.5">
                                    + {materia.topicos.length - 7} outros tópicos...
                                </div>
                            )}
                        </div>



                        {/* Decoration */}
                        <div className={`absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br ${materia.cor} opacity-[0.03] group-hover:opacity-[0.08] rounded-full transition-opacity`} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
