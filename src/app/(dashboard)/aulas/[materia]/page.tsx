'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getMateriaById, MateriaConteudo } from '@/data/conteudo';
import { notFound } from 'next/navigation';
import { carregarUsuario } from '@/lib/utils';
import { getProfissaoById } from '@/lib/profissoes-edital';

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

interface PageProps {
    params: Promise<{ materia: string }>;
}

export default function MateriaPage({ params }: PageProps) {
    const { materia: materiaId } = use(params);
    const [materia, setMateria] = useState<MateriaConteudo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMateriaData = async () => {
            // 1. Verificar se é uma matéria padrão
            const materiaEncontrada = getMateriaById(materiaId);

            if (materiaEncontrada) {
                setMateria(materiaEncontrada);
                setLoading(false);
                return;
            }

            // 2. Se for conhecimentos-especificos, criar dinamicamente
            if (materiaId === 'conhecimentos-especificos') {
                try {
                    const response = await fetch('/api/auth/me');
                    if (!response.ok) throw new Error('Falha ao carregar usuário');
                    const data = await response.json();
                    const usuario = data.user;
                    const cargoIdOriginal = usuario?.cargo;
                    const cargoId = cargoIdOriginal ? (CARGO_ID_MAP[cargoIdOriginal] || cargoIdOriginal) : null;

                    if (cargoId) {
                        const profissao = getProfissaoById(cargoId);

                        if (profissao && profissao.blocos) {
                            const especificosMateria: MateriaConteudo = {
                                id: 'conhecimentos-especificos',
                                nome: 'Conhecimentos Específicos',
                                descricao: `Conteúdo técnico para ${profissao.nome}`,
                                icone: '📋',
                                cor: 'from-orange-500 to-red-500',
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
                            setMateria(especificosMateria);
                        }
                    }
                } catch (error) {
                    console.error('[Aulas/Materia] Erro:', error);
                }
            }

            setLoading(false);
        };

        loadMateriaData();
    }, [materiaId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    if (!materia) {
        notFound();
    }

    return (
        <div className="p-2 md:p-4">
            {/* Back Link */}
            <Link href="/aulas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar às Matérias
            </Link>

            {/* Page Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${materia.cor} text-4xl`}>
                    {materia.icone}
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        {materia.nome}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {materia.descricao}
                    </p>
                </div>
            </div>

            {/* Progress overview */}
            <div className="mb-8 bg-card rounded-xl p-6 border border-border shadow-lg">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-wider">Progresso geral</span>
                    <span className="text-yellow-500 font-bold">0/{materia.topicos.length} concluídos</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-0 transition-all" />
                </div>
            </div>

            {/* Tópicos List */}
            <div className="space-y-4">
                {materia.topicos.map((topico, index) => (
                    <Link
                        key={topico.id}
                        href={`/aulas/${materiaId}/${topico.id}`}
                        className="group flex items-center gap-4 bg-card backdrop-blur-lg rounded-xl p-5 border border-border shadow-lg hover:border-yellow-500/50 transition-all active:scale-[0.98]"
                    >
                        {/* Order number */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold group-hover:bg-yellow-500 group-hover:text-slate-900 transition">
                            {index + 1}
                        </div>

                        <div className="flex-grow min-w-0">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition truncate">
                                {topico.titulo}
                            </h3>
                            <p className="text-muted-foreground text-sm truncate">
                                {topico.descricao}
                            </p>
                        </div>

                        {/* Duration */}
                        <div className="flex-shrink-0 text-muted-foreground text-xs font-bold bg-muted px-2 py-1 rounded flex items-center gap-1">
                            ⏱️ {topico.duracao}
                        </div>

                        {/* Status indicator */}
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-border group-hover:border-yellow-500 transition bg-background shadow-inner" />

                        {/* Arrow */}
                        <div className="flex-shrink-0 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all">
                            →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
