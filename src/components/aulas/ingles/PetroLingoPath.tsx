"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LuLock, 
  LuCheck, 
  LuStar, 
  LuTrophy, 
  LuFlame,
  LuCompass,
  LuFileText,
  LuLink,
  LuAnchor,
  LuHardHat,
  LuWind
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Unit {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  isLocked: boolean;
  isCompleted: boolean;
  totalLevels: number;
  currentLevel: number;
}

interface PetroLingoPathProps {
  onSelectUnit: (unitId: string) => void;
  units: Unit[];
}

export default function PetroLingoPath({ onSelectUnit, units }: PetroLingoPathProps) {
  // Configuração visual da "Serpente" (Snake)
  // X offsets para criar o efeito de zigue-zague
  const offsets = [0, 40, 80, 40, 0, -40, -80, -40];

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6 flex flex-col items-center gap-1">
      {/* Header da Trilha */}
      <div className="w-full mb-12 flex items-center justify-between bg-card p-6 rounded-[32px] border-2 border-border shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shadow-inner">
            <LuFlame className="text-amber-500 w-8 h-8 fill-amber-500" />
          </div>
          <div>
            <h3 className="font-black text-2xl text-foreground">PETRO-LINGO</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Trilha de Inglês Técnico</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 text-emerald-600 font-black flex items-center gap-2">
            <LuTrophy size={18} />
            <span>120 XP</span>
          </div>
        </div>
      </div>

      {/* A Serpente de Níveis */}
      {units.map((unit, index) => {
        const xOffset = offsets[index % offsets.length];
        const nextXOffset = offsets[(index + 1) % offsets.length];
        const isLast = index === units.length - 1;

        return (
          <div 
            key={unit.id} 
            className="relative flex flex-col items-center"
            style={{ marginBottom: "2rem" }}
          >
            {/* Linha Conectora (SVG dinâmico para parecer desenhado) */}
            {!isLast && (
              <svg 
                className="absolute top-[60px] left-1/2 -translate-x-1/2 z-0 overflow-visible h-[140px] w-[200px]"
                pointerEvents="none"
              >
                <motion.path
                  d={`M ${100 + xOffset} 0 Q ${100 + xOffset} 70, ${100 + nextXOffset} 140`}
                  fill="none"
                  stroke={unit.isCompleted ? "currentColor" : "var(--border)"}
                  strokeWidth="6"
                  strokeDasharray="1, 12"
                  strokeLinecap="round"
                  className={cn(
                    "transition-colors duration-500",
                    unit.isCompleted ? "text-emerald-500/60" : "text-border/40"
                  )}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </svg>
            )}

            {/* O Nódulo (Círculo) */}
            <motion.div
              style={{ x: xOffset }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="z-10 group"
            >
              <div className="relative">
                {/* Rótulo da Unidade (Balaão Flutuante) */}
                <div className="absolute left-1/2 -top-16 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48 text-center z-20">
                  <div className="bg-foreground text-background text-xs font-black p-3 rounded-2xl shadow-2xl relative">
                    {unit.title}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                  </div>
                </div>

                <Button
                  disabled={unit.isLocked}
                  onClick={() => onSelectUnit(unit.id)}
                  className={cn(
                    "w-20 h-20 md:w-24 md:h-24 rounded-full p-0 flex flex-col items-center justify-center transition-all shadow-[0_8px_0_0_rgba(0,0,0,0.15)] active:translate-y-2 active:shadow-none border-b-8 relative overflow-hidden",
                    unit.isLocked 
                      ? "bg-zinc-200 border-zinc-400 dark:bg-zinc-800 dark:border-zinc-950 text-zinc-400 scale-95" 
                      : unit.isCompleted 
                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white" 
                        : "bg-primary hover:bg-primary/90 border-primary-foreground/30 text-white"
                  )}
                >
                  {unit.isLocked ? (
                    <LuLock size={32} />
                  ) : unit.isCompleted ? (
                    <LuCheck size={32} strokeWidth={4} />
                  ) : (
                    <div className="animate-bounce">
                      {unit.icon}
                    </div>
                  )}

                  {/* Círculo de Progresso ao redor se estiver em andamento */}
                  {!unit.isLocked && !unit.isCompleted && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="50%" cy="50%" r="48%" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="4" 
                        strokeOpacity="0.2"
                      />
                      <motion.circle 
                        cx="50%" cy="50%" r="48%" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="4" 
                        strokeDasharray="100 100"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: unit.currentLevel / unit.totalLevels }}
                      />
                    </svg>
                  )}
                </Button>
                
                {/* Estrela de Status se concluído com perfeição */}
                {unit.isCompleted && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    <LuStar size={18} fill="currentColor" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Badge de Título da Seção (Aparece a cada X unidades) */}
            {(index === 0 || index === 2 || index === 4) && (
              <motion.div 
                style={{ x: xOffset }}
                className="mt-6 mb-8 text-center"
              >
                <div className="bg-muted/50 px-6 py-2 rounded-2xl border border-border/50">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Unidade {Math.floor(index/2) + 1}</span>
                  <h4 className="font-bold text-foreground">{unit.subtitle}</h4>
                </div>
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Footer da Trilha */}
      <div className="mt-12 text-center opacity-30 flex flex-col items-center">
        <LuCompass className="w-12 h-12 mb-2" />
        <p className="text-sm font-bold uppercase tracking-widest">Fim da Trilha Atual</p>
        <p className="text-xs">Novas unidades em breve...</p>
      </div>
    </div>
  );
}
