'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LuZap, LuTimer, LuChartBar } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface SimuladoConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (config: { quantidade: number; dificuldade: string; assunto: string }) => void;
    title: string;
    icon?: string;
    color?: string;
    topicos?: { id: string; titulo: string }[];
}

export function SimuladoConfigModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    icon,
    color,
    topicos = [],
}: SimuladoConfigModalProps) {
    const [dificuldade, setDificuldade] = useState<string>('Médio');
    const [assunto, setAssunto] = useState<string>('all');

    const handleConfirm = () => {
        onConfirm({
            quantidade: 20,
            dificuldade,
            assunto: assunto === 'all' ? 'Todos os tópicos (Misturado)' : assunto
        });
        onClose();
    };

    const dificuldades = ['Fácil', 'Médio', 'Difícil', 'Casca de Banana'];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white dark:bg-[#121214] border-none p-0 overflow-hidden shadow-2xl rounded-[32px]">
                {/* Header Estilo Screenshot */}
                <div className={cn(
                    "p-8 pb-6 bg-gradient-to-br flex items-center justify-between",
                    color
                )}>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <LuZap className="w-5 h-5 text-white/70" />
                    </button>
                </div>

                <div className="p-8 pt-0 space-y-8">
                    {/* Dificuldade */}
                    <div className="space-y-4">
                        <label className="text-[13px] font-bold text-[#121214]/40 dark:text-white/40 tracking-wide">
                            Nível de Dificuldade
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {dificuldades.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDificuldade(d)}
                                    className={cn(
                                        "py-3.5 rounded-xl transition-all font-bold text-[15px] shadow-sm active:scale-95",
                                        dificuldade === d
                                            ? "bg-[#F3B31C] text-white"
                                            : "bg-[#F0F4F8] dark:bg-[#1a1a1e] text-[#4A5568] dark:text-white/60 hover:bg-[#E2E8F0] dark:hover:bg-[#252529]"
                                    )}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Assunto - Apenas se houver tópicos variados */}
                    {topicos.length > 0 && (
                        <div className="space-y-4">
                            <label className="text-[13px] font-bold text-[#121214]/40 dark:text-white/40 tracking-wide">
                                Assunto Específico (Opcional)
                            </label>
                            <div className="relative group">
                                <select
                                    value={assunto}
                                    onChange={(e) => setAssunto(e.target.value)}
                                    className="w-full bg-white dark:bg-[#121214] border-2 border-[#F3B31C] rounded-xl py-4 px-5 text-[15px] font-bold text-[#121214] dark:text-white appearance-none outline-none focus:ring-2 focus:ring-[#F3B31C]/20 transition-all cursor-pointer shadow-sm"
                                >
                                    <option value="all">Todos os tópicos (Misturado)</option>
                                    {/* Deduplicação programática para evitar erros de key */}
                                    {Array.from(new Map(topicos.map(t => [t.titulo, t])).values()).map((t) => (
                                        <option key={t.id || t.titulo} value={t.titulo}>
                                            {t.titulo}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <span className="text-[#F3B31C] text-lg">▾</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action */}
                    <Button
                        onClick={handleConfirm}
                        className="w-full h-16 bg-[#F3B31C] hover:bg-[#D99E16] text-white rounded-[20px] text-lg font-black uppercase tracking-widest shadow-lg shadow-[#F3B31C]/20 active:scale-[0.98] transition-all"
                    >
                        INICIAR SIMULADO
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
