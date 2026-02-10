'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTEUDO_MATERIAS, MateriaConteudo } from '@/data/conteudo';
import { CARGOS } from '@/data/cargos';
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

export default function AulasPage() {
    const [materiasVisiveis, setMateriasVisiveis] = useState<MateriaConteudo[]>([]);
    const [cargoNome, setCargoNome] = useState<string>('');
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    📚 Aulas por Matéria
                </h1>
                <p className="text-gray-400 text-lg mt-2">
                    {cargoNome ? `Conteúdo para: ${cargoNome}` : 'Escolha uma matéria para estudar'}
                </p>
            </div>

            {/* Matérias Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materiasVisiveis.map((materia) => (
                    <Link
                        key={materia.id}
                        href={`/aulas/${materia.id}`}
                        className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:-translate-y-2"
                    >
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${materia.cor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${materia.cor} text-4xl mb-4`}>
                                {materia.icone}
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition">
                                {materia.nome}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4">
                                {materia.descricao}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-500">
                                    📖 {materia.topicos.length} tópicos
                                </span>
                                <span className="text-gray-500">
                                    ⏱️ {materia.topicos.reduce((acc, t) => acc + parseInt(t.duracao), 0)} min
                                </span>
                            </div>

                            {/* Arrow indicator */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all">
                                →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
