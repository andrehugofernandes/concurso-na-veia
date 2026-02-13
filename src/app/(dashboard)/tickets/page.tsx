'use client';

import { LuLifeBuoy, LuPlus } from 'react-icons/lu';

export default function TicketsPage() {
    return (
        <div className="p-4 md:p-8 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                            <LuLifeBuoy className="text-blue-500" /> Suporte e Tickets
                        </h1>
                        <p className="text-muted-foreground">Estamos aqui para ajudar você a conquistar sua vaga.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                        <LuPlus size={20} /> Novo Ticket
                    </button>
                </div>

                <div className="bg-card rounded-3xl border border-border p-12 text-center shadow-xl">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        🎫
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Você ainda não tem tickets</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Se tiver alguma dúvida técnica, problema com o sistema ou sugestão de conteúdo, abra um ticket e nossa equipe responderá em até 24h.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <div className="flex items-center gap-3 px-4 py-2 bg-background rounded-lg border border-border">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-sm font-medium">Equipe Online</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-background rounded-lg border border-border">
                            <span className="text-sm font-medium">Tempo médio: 4h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
