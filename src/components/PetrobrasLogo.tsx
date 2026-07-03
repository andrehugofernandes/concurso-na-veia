import React from "react";
import Link from "next/link";

export default function PetrobrasLogo({ 
  className, 
  variant,
  compact 
}: { 
  className?: string; 
  variant?: "default" | "white" | "home-top" | "hero-tab";
  compact?: boolean;
}) {
  return (
    <Link 
      href="/" 
      className={`flex items-center group hover:opacity-90 transition-opacity ${
        compact ? "gap-2" : "gap-6 md:gap-3"
      } ${className || ""}`}
    >
      {/* Badge PRETO com Rounded-MD - Estilo Admin Premium */}
      <div className={`relative bg-black rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex-shrink-0 border border-white/5 ${
        compact ? "w-8 h-8 md:w-9 md:h-9" : "w-10 h-10 md:w-11 md:h-11"
      }`}>
        <div 
          className="absolute inset-0 rounded-md bg-primary/20 opacity-20 group-hover:opacity-40 transition-opacity"
        />
        <img
          src="/logo-icone.png"
          alt="Petrobras Quest Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[260%] h-[260%] max-w-none object-contain z-10 transition-all duration-300 group-hover:scale-110"
          style={{ filter: `drop-shadow(0 15px 25px hsl(var(--primary)))` }}
        />
      </div>
      
      <div className={`flex flex-col justify-center leading-none ${compact ? "ml-0.5" : "ml-1"}`}>
        <h1 className={`font-bebas font-bold tracking-tight leading-none whitespace-nowrap flex items-baseline ${
          compact ? "text-[23px] md:text-[24px] gap-1" : "text-[36px] md:text-[36px] gap-2"
        }`}>
          <span 
            className={`${(variant === "white" || variant === "home-top") ? "text-white" : variant === "hero-tab" ? "text-foreground dark:text-primary-foreground" : "text-foreground dark:text-white"} transition-colors duration-300`}
          >
            PASSEI
          </span>
          <span 
            className={`transition-colors duration-300 text-primary ${variant === "hero-tab" ? "dark:text-primary-foreground" : ""}`}
          >
            NO CONCURSO
          </span>
        </h1>
        <span 
          className={`font-sans font-black uppercase ${(variant === "white" || variant === "home-top") ? "text-white/80" : variant === "hero-tab" ? "text-foreground/80 dark:text-primary-foreground/80" : "text-foreground/80 dark:text-white/80"} mt-0.5 whitespace-nowrap transition-colors duration-300 block text-center leading-none`} 
          style={{ 
            fontSize: compact ? '7.5px' : '10.88px', 
            letterSpacing: compact ? '0.68em' : '0.72em', 
            marginRight: compact ? '-0.68em' : '-0.72em' 
          }}
        >
          SUA APROVAÇÃO AQUI
        </span>
      </div>
    </Link>
  );
}
