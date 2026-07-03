"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LuLock, 
  LuCheck, 
  LuStar, 
  LuTrophy, 
  LuFlame,
  LuVolume2,
  LuBookOpen,
  LuGift,
  LuRotateCcw,
  LuHouse,
  LuShield,
  LuUser,
  LuHeart,
  LuMessageSquare,
  LuBookMarked,
  LuZap,
  LuFastForward
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
  onResetProgress?: () => void;
}

const PETROLINGO_CHARACTERS = [
  {
    id: "engineer",
    name: "Eng. Pedro",
    image: "/images/petrolingo/engineer.png"
  },
  {
    id: "geologist",
    name: "Dra. Helena",
    image: "/images/petrolingo/geologist.png"
  },
  {
    id: "diver",
    name: "Mergulhador Lucas",
    image: "/images/petrolingo/diver.png"
  },
  {
    id: "operator",
    name: "Técnico Bruno",
    image: "/images/petrolingo/operator.png"
  }
];

export default function PetroLingoPath({ onSelectUnit, units, onResetProgress }: PetroLingoPathProps) {
  // Offsets da Serpente em S (Zig-zag Duolingo style)
  const offsets = [0, 45, 80, 45, 0, -45, -80, -45];

  // Identifica a unidade ativa atual e a primeira unidade bloqueada para "PULAR PRA CÁ?"
  const activeUnitIndex = units.findIndex(u => !u.isCompleted && !u.isLocked);
  const firstLockedIndex = units.findIndex(u => u.isLocked);
  const currentUnit = units[activeUnitIndex >= 0 ? activeUnitIndex : 0] || units[0];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center pb-24 relative select-none">
      
      {/* 1. TOP STATS BAR (ESTILO DUOLINGO: FLAMAS, GEMAS, VIDAS) */}
      <div className="w-full bg-card/90 backdrop-blur-md border-b border-border px-5 py-3 flex items-center justify-between z-30 sticky top-0 shadow-sm">
        <div className="flex items-center gap-1.5 font-black text-sm text-foreground">
          <span className="text-xl">🦜</span>
          <span className="text-sm uppercase font-black tracking-wider text-sky-500">
            PETRO<span className="text-green-500">LINGO</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-black">
          <div className="flex items-center gap-1 text-amber-500">
            <LuFlame className="w-4 h-4 fill-amber-500" />
            <span>1</span>
          </div>
          <div className="flex items-center gap-1 text-sky-500">
            <span className="text-sm">💎</span>
            <span>678</span>
          </div>
          <div className="flex items-center gap-1 text-rose-500">
            <LuZap className="w-4 h-4 fill-rose-500" />
            <span>25</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER BANNER DA SEÇÃO (ESTILO DUOLINGO: BANNER VERDE / AZUL) */}
      <div className="w-full p-4 z-20">
        <div className="w-full bg-sky-500 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between relative overflow-hidden border-b-4 border-sky-700">
          <div className="space-y-1 z-10 max-w-[80%]">
            <p className="text-xs font-black uppercase tracking-widest text-sky-100 opacity-90">
              SEÇÃO 1, UNIDADE {activeUnitIndex >= 0 ? activeUnitIndex + 1 : 1}
            </p>
            <h3 className="text-xl font-black tracking-tight leading-snug">
              {currentUnit?.title || "Inglês Técnico Petrobras"}
            </h3>
          </div>

          <button 
            onClick={onResetProgress}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-md transition-colors text-white z-10"
            title="Resetar Progresso da Trilha"
          >
            <LuBookMarked className="w-6 h-6" />
          </button>

          {/* Efeito sutil de luz no fundo */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* 3. A SERPENTE DE NÓDULOS 3D EM S (S-CURVE TRAIL) */}
      <div className="w-full px-6 py-6 flex flex-col items-center gap-10 relative">
        {units.map((unit, index) => {
          const xOffset = offsets[index % offsets.length];
          const character = PETROLINGO_CHARACTERS[index % PETROLINGO_CHARACTERS.length];
          const isFirstLocked = index === firstLockedIndex;

          return (
            <div 
              key={unit.id} 
              className="relative flex flex-col items-center w-full"
            >
              {/* Nódulo 3D Brilhante (Estilo Duolingo) */}
              <motion.div
                style={{ transform: `translateX(${xOffset}px)` }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="z-10 relative group"
              >
                {/* Balão "PULAR PRA CÁ?" na primeira unidade bloqueada */}
                {isFirstLocked && (
                  <div className="absolute left-1/2 -top-14 -translate-x-1/2 z-40 animate-bounce">
                    <div className="bg-white text-emerald-600 border-2 border-emerald-500 text-[11px] font-black px-4 py-1.5 rounded-2xl shadow-xl relative whitespace-nowrap uppercase tracking-wider flex items-center gap-1">
                      <span>PULAR PRA CÁ?</span>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[8px] border-t-emerald-500 border-x-[6px] border-x-transparent" />
                    </div>
                  </div>
                )}

                {/* Rótulo da Unidade Flutuante ao passar o mouse */}
                {!isFirstLocked && (
                  <div className="absolute left-1/2 -top-14 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none w-48 text-center z-30">
                    <div className="bg-zinc-900 text-white text-xs font-black p-2.5 rounded-2xl shadow-2xl relative flex flex-col items-center gap-0.5 border border-zinc-700">
                      <span>{unit.title}</span>
                      {unit.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-extrabold uppercase flex items-center gap-1">
                          <LuRotateCcw size={10} /> Clique para Repetir
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  disabled={unit.isLocked && !isFirstLocked}
                  onClick={() => onSelectUnit(unit.id)}
                  className={cn(
                    "w-20 h-20 rounded-full p-0 flex items-center justify-center transition-all shadow-[0_8px_0_0_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-none border-b-[6px] relative overflow-hidden group/btn",
                    unit.isLocked && !isFirstLocked
                      ? "bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-400 opacity-60 scale-95" 
                      : isFirstLocked 
                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white shadow-emerald-600/30 scale-105"
                        : unit.isCompleted 
                          ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white" 
                          : "bg-sky-500 hover:bg-sky-600 border-sky-700 text-white animate-pulse"
                  )}
                >
                  {/* Ícone interno dinâmico */}
                  {isFirstLocked ? (
                    <LuFastForward size={32} className="fill-white" />
                  ) : unit.isLocked ? (
                    <LuLock size={28} className="text-zinc-400" />
                  ) : unit.isCompleted ? (
                    <LuCheck size={32} strokeWidth={4} />
                  ) : index % 3 === 1 ? (
                    <LuVolume2 size={30} className="fill-white" />
                  ) : index % 3 === 2 ? (
                    <LuBookOpen size={28} />
                  ) : (
                    <LuStar size={30} className="fill-white" />
                  )}

                  {/* Anel de luz interior */}
                  {!unit.isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-full" />
                  )}
                </Button>

                {/* Estrela de Status Dourada */}
                {unit.isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-xs font-black">
                    ★
                  </div>
                )}
              </motion.div>

              {/* PERSONAGEM DA PETROBRAS EM PÉ AO LADO DO CAMINHO (CINZA SE BLOQUEADO) */}
              {(index === 1 || index === 3 || index === 5) && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    transform: `translateX(${xOffset > 0 ? xOffset - 90 : xOffset + 90}px)` 
                  }}
                  className={cn(
                    "absolute top-0 flex flex-col items-center pointer-events-none z-0 transition-all",
                    unit.isLocked && "grayscale opacity-50"
                  )}
                >
                  {/* Avatar do Personagem */}
                  <div className="w-16 h-16 relative">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  {/* Pedestal com Estrelas */}
                  <div className="bg-muted/60 border border-border px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm -mt-1">
                    <span className={cn("text-[9px] font-black", unit.isLocked ? "text-zinc-400" : "text-amber-400")}>⭐⭐⭐</span>
                  </div>
                </motion.div>
              )}

              {/* BAÚ DE RECOMPENSAS / XP BÔNUS DE METADE DO MÓDULO */}
              {index === 2 && (
                <div className="my-2 flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => alert("🎁 Você ganhou +50 XP Bônus de Estudo Petrobras!")}
                    className="w-14 h-14 bg-amber-400 border-b-4 border-amber-600 rounded-2xl flex items-center justify-center shadow-lg text-amber-950 transition-all cursor-pointer"
                  >
                    <LuGift size={28} />
                  </motion.button>
                </div>
              )}
            </div>
          );
        })}

        {/* 4. CARD DE FINAL DE SEÇÃO & BLOQUEIO DA SEÇÃO 2 (ESTILO DUOLINGO IMAGEM 3) */}
        <div className="w-full mt-10 p-6 bg-card border-2 border-border rounded-[36px] text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="inline-block bg-muted px-4 py-1 rounded-full text-[10px] font-black text-muted-foreground uppercase tracking-widest border border-border">
            A SEGUIR
          </div>
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-border flex items-center justify-center mx-auto text-zinc-500">
            <LuLock size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-foreground">🔒 Seção 2: Inglês Técnico Avançado</h3>
            <p className="text-xs font-medium text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Aprenda palavras, expressões e conceitos gramaticais avançados da Petrobras para gabaritar a prova.
            </p>
          </div>
          <Button
            onClick={() => alert("🚀 Conclua todas as unidades da Seção 1 para desbloquear a Seção 2 ou faça o teste de nivelamento!")}
            variant="outline"
            className="w-full rounded-2xl py-6 bg-card hover:bg-muted border-2 border-primary/40 text-primary font-black text-sm uppercase tracking-wider shadow-md transition-all"
          >
            PULAR PRA CÁ?
          </Button>
        </div>
      </div>

      {/* 5. BARRA DE NAVEGAÇÃO INFERIOR (FIXA DUOLINGO STYLE) */}
      <div className="w-full bg-card border-t border-border px-6 py-3 flex items-center justify-around z-30 sticky bottom-0 shadow-lg">
        <button className="flex flex-col items-center gap-1 text-sky-500 font-bold text-xs">
          <div className="p-2 bg-sky-500/10 rounded-2xl">
            <LuHouse size={22} />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-bold text-xs">
          <div className="p-2 hover:bg-muted rounded-2xl">
            <LuShield size={22} />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-bold text-xs">
          <div className="p-2 hover:bg-muted rounded-2xl">
            <LuTrophy size={22} />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-bold text-xs">
          <div className="p-2 hover:bg-muted rounded-2xl">
            <LuHeart size={22} />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-bold text-xs">
          <div className="p-2 hover:bg-muted rounded-2xl">
            <LuUser size={22} />
          </div>
        </button>
      </div>

    </div>
  );
}
