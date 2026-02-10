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
        <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${materia.cor} text-4xl`}>
                    {materia.icone}
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {materia.nome}
                    </h1>
                    <p className="text-gray-400 mt-1">
                        {materia.descricao}
                    </p>
                </div>
            </div>

            {/* Progress overview */}
            <div className="mb-8 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Progresso geral</span>
                    <span className="text-yellow-400 font-bold">0/{materia.topicos.length} concluídos</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-0 transition-all" />
                </div>
            </div>

            {/* Tópicos List */}
            <div className="space-y-4">
                {materia.topicos.map((topico, index) => (
                    <Link
                        key={topico.id}
                        href={`/aulas/${materiaId}/${topico.id}`}
                        className="group flex items-center gap-4 bg-slate-800/50 backdrop-blur-lg rounded-xl p-5 border border-slate-700/50 hover:border-yellow-500/50 transition-all"
                    >
                        {/* Order number */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold group-hover:bg-yellow-500 group-hover:text-slate-900 transition">
                            {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                                {topico.titulo}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {topico.descricao}
                            </p>
                        </div>

                        {/* Duration */}
                        <div className="flex-shrink-0 text-gray-500 text-sm flex items-center gap-1">
                            ⏱️ {topico.duracao}
                        </div>

                        {/* Status indicator */}
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-yellow-500 transition" />

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
