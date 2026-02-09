'use client';

import { use } from 'react';
import Link from 'next/link';
import { getMateriaById } from '@/data/conteudo';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ materia: string }>;
}

export default function MateriaPage({ params }: PageProps) {
    const { materia: materiaId } = use(params);
    const materia = getMateriaById(materiaId);

    if (!materia) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="container mx-auto px-6 py-8">
                <Link href="/aulas" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                    ← Voltar às Matérias
                </Link>

                <div className="flex items-center gap-4 mt-4">
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
                <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Progresso geral</span>
                        <span className="text-yellow-400 font-bold">0/{materia.topicos.length} concluídos</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-0 transition-all" />
                    </div>
                </div>
            </header>

            {/* Tópicos List */}
            <main className="container mx-auto px-6 pb-16">
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
            </main>
        </div>
    );
}
