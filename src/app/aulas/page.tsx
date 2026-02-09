'use client';

import Link from 'next/link';
import { CONTEUDO_MATERIAS } from '@/data/conteudo';

export default function AulasPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="container mx-auto px-6 py-8">
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                    ← Voltar ao Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
                    📚 Aulas por Matéria
                </h1>
                <p className="text-gray-400 text-lg mt-2">
                    Escolha uma matéria para estudar
                </p>
            </header>

            {/* Matérias Grid */}
            <main className="container mx-auto px-6 pb-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CONTEUDO_MATERIAS.map((materia) => (
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
            </main>
        </div>
    );
}
