'use client';

import { LuTrophy } from 'react-icons/lu';

export default function RankingsPage() {
    return (
        <div className="p-4 md:p-8 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-500 mb-6">
                    <LuTrophy size={40} />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">Rankings em Breve</h1>
                <p className="text-muted-foreground text-lg mb-8">
                    Estamos preparando o sistema de classificação global. Em breve você poderá comparar seu desempenho com outros alunos!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-lg">
                        <div className="text-2xl mb-2">🏅</div>
                        <h3 className="font-bold text-foreground">Ranking Semanal</h3>
                        <p className="text-sm text-muted-foreground">Dispute os melhores lugares da semana e ganhe recompensas exclusivas.</p>
                    </div>
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-lg">
                        <div className="text-2xl mb-2">🔥</div>
                        <h3 className="font-bold text-foreground">Hall da Fama</h3>
                        <p className="text-sm text-muted-foreground">Os alunos com maior XP acumulado de todos os tempos.</p>
                    </div>
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-lg">
                        <div className="text-2xl mb-2">⚡</div>
                        <h3 className="font-bold text-foreground">Ranking de Matérias</h3>
                        <p className="text-sm text-muted-foreground">Veja quem são os especialistas em cada área do conhecimento.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
