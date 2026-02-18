'use client';

import { useState } from 'react';
import { Usuario, TipoSimulado } from '@/lib/types';
import { CONTEUDO_MATERIAS, MateriaConteudo } from '@/data/conteudo';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { SimuladoConfigModal } from './SimuladoConfigModal';
import { getProfissaoById } from '@/lib/profissoes-edital';
import { CARGO_ID_MAP } from '@/lib/cargos-map';
import { cn } from '@/lib/utils';
import { LuTimer, LuTarget, LuFlame, LuBookOpen, LuSettings, LuLayoutDashboard, LuChartBar, LuZap } from 'react-icons/lu';

interface Props {
    usuario: Usuario;
    iniciarSimulado: (tipo: TipoSimulado, quantidade: number, dificuldade?: string, assunto?: string) => void;
    gerandoQuestoes: boolean;
    tipoPagina?: 'geral' | 'especifico' | 'maratona';
}

export default function SimuladoHome({ usuario, iniciarSimulado, gerandoQuestoes, tipoPagina = 'geral' }: Props) {
    const [materiaSelecionada, setMateriaSelecionada] = useState<{ id: string; nome: string; icone: string; cor: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mapeamento de IDs do registro para IDs do profissoes-edital (copiado de aulas/page.tsx)
    const cargoIdOriginal = usuario?.cargo;

    // Normalização básica para bater com o map (lowercase e sem acentos)
    const normalizedCargo = cargoIdOriginal?.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-');

    const cargoId = normalizedCargo ? (CARGO_ID_MAP[normalizedCargo as keyof typeof CARGO_ID_MAP] || normalizedCargo) : null;
    const profissao = cargoId ? getProfissaoById(cargoId) : null;

    // Filtra as matérias com base no tipo da página
    let materiasVisiveis: any[] = [];

    if (tipoPagina === 'geral') {
        materiasVisiveis = CONTEUDO_MATERIAS.filter(m =>
            m.id === 'portugues' || m.id === 'matematica'
        ).map(m => ({
            id: m.id,
            nome: m.nome,
            descricao: m.descricao,
            icone: m.icone,
            cor: m.cor,
            topicos: m.topicos
        }));

        if (profissao) {
            materiasVisiveis.push({
                id: 'especificas',
                nome: 'Simulado Específico',
                descricao: `Questões focadas em ${profissao.nome}`,
                icone: '📋',
                cor: 'from-orange-500 to-red-500',
                topicos: profissao.blocos?.flatMap(b => b.topicos.map(t => ({ titulo: t }))) || []
            });
        }
    } else if (tipoPagina === 'especifico') {
        // Mock de simulados específicos ou conteúdo do cargo
        if (profissao && profissao.blocos) {
            materiasVisiveis = profissao.blocos.map((bloco, idx) => ({
                id: `especifico-${idx}`,
                nome: bloco.nome,
                descricao: `Simulado focado em ${bloco.nome}`,
                icone: '🎯',
                cor: 'from-emerald-500 to-teal-500',
                topicos: bloco.topicos.map(t => ({ titulo: t }))
            }));
        }
    } else if (tipoPagina === 'maratona') {
        materiasVisiveis = [
            {
                id: 'maratona-100',
                nome: 'Maratona 100',
                descricao: 'Desafio supremo de 100 questões',
                icone: '🔥',
                cor: 'from-red-600 to-orange-600',
                topicos: Array(10).fill({ titulo: 'Simulação Real do Edital' })
            }
        ];
    }

    const handleOpenModal = (materia: any) => {
        setMateriaSelecionada(materia);
        setIsModalOpen(true);
    };

    const handleConfirmSimulado = (config: { quantidade: number; dificuldade: string; assunto: string }) => {
        if (materiaSelecionada) {
            iniciarSimulado(materiaSelecionada.id as TipoSimulado, config.quantidade, config.dificuldade, config.assunto);
        }
    };

    return (
        <div className="p-2 md:p-4">
            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                    {tipoPagina === 'geral' ? '🔥 Simulados Rápidos' :
                        tipoPagina === 'especifico' ? '🎯 Simulados Específicos' : '🔥 Maratona 100'}
                </h1>
                <p className="text-muted-foreground text-lg mt-2 font-medium">
                    {tipoPagina === 'geral' ? 'Escolha uma área para praticar com questões de IA' :
                        tipoPagina === 'especifico' ? 'Treinamento focado nos conhecimentos técnicos' : 'O desafio final para sua aprovação'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {materiasVisiveis.map((materia) => (
                    <div
                        key={materia.id}
                        onClick={() => handleOpenModal(materia)}
                        className="group relative flex flex-col bg-slate-50/50 dark:bg-card backdrop-blur-lg rounded-3xl border border-border/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-primary/10 overflow-hidden cursor-pointer"
                    >
                        <AnimatedBorder borderRadius="rounded-3xl" />

                        {/* Header Section */}
                        <div className="p-8 pb-4">
                            <div className="flex items-start justify-between mb-6">
                                <div className={cn(
                                    "flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br text-3xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform",
                                    materia.cor
                                )}>
                                    {materia.icone}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/50 text-primary text-xs font-bold border border-zinc-200 dark:border-zinc-700">
                                    {materia.topicos.length} Áreas
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
                            {materia.topicos.slice(0, 6).map((topico: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                                    <span className="truncate group-hover/item:text-foreground transition-colors font-medium">
                                        {topico.titulo}
                                    </span>
                                </div>
                            ))}
                            {materia.topicos.length > 6 && (
                                <div className="text-xs text-primary/60 font-black pl-4.5 uppercase tracking-wider">
                                    + {materia.topicos.length - 6} outros tópicos...
                                </div>
                            )}
                        </div>



                        {/* Decoration */}
                        <div className={cn(
                            "absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br opacity-[0.03] group-hover:opacity-[0.08] rounded-full transition-opacity",
                            materia.cor
                        )} />
                    </div>
                ))}
            </div>

            {materiaSelecionada && (
                <SimuladoConfigModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmSimulado}
                    title={materiaSelecionada.nome}
                    icon={materiaSelecionada.icone}
                    color={materiaSelecionada.cor}
                    topicos={(materiaSelecionada as any).topicos}
                />
            )}
        </div>
    );
}
