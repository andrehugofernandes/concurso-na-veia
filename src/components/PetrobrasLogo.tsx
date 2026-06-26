import React from "react";
import Link from "next/link";

export default function PetrobrasLogo({ className, variant }: { className?: string; variant?: "default" | "white" | "home-top" | "hero-tab" }) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-6 md:gap-3 group hover:opacity-90 transition-opacity ${className}`}
    >
      {/* Badge PRETO com Rounded-MD - Estilo Admin Premium */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 bg-black rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex-shrink-0 border border-white/5">
        <div 
          className="absolute inset-0 rounded-md opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: "var(--primary-hex)" }}
        />
        <img
          src="/logo-icone.png"
          alt="Petrobras Quest Logo"
          /* Ícone EXTREMO (w-[260%]) para passar bastante das bordas */
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[260%] h-[260%] max-w-none object-contain z-10 transition-all duration-300 group-hover:scale-110"
          style={{ filter: `drop-shadow(0 15px 25px var(--primary-hex))` }}
        />
      </div>
      
      <div className="flex flex-col justify-center leading-tight ml-1">
        <h1 className="font-bebas font-bold text-[36px] md:text-[36px] tracking-tight leading-tight whitespace-nowrap flex items-baseline gap-2">
          <span 
            className={`${(variant === "white" || variant === "home-top") ? "text-white" : variant === "hero-tab" ? "text-foreground dark:text-primary-foreground" : "text-foreground dark:text-white"} transition-colors duration-300`}
          >
            PASSEI
          </span>
          <span 
            className={`transition-colors duration-300 ${variant === "hero-tab" ? "dark:text-primary-foreground" : "dark:text-white"}`}
            style={variant === "hero-tab" ? undefined : { color: "var(--primary-hex)" }}
          >
            NO CONCURSO
          </span>
        </h1>
        <span 
          className={`font-sans font-black uppercase ${(variant === "white" || variant === "home-top") ? "text-white/80" : variant === "hero-tab" ? "text-foreground/80 dark:text-primary-foreground/80" : "text-foreground/80 dark:text-white/80"} mt-0 whitespace-nowrap transition-colors duration-300 inline-block mx-auto overflow-hidden text-ellipsis`} 
          style={{ fontSize: '10.88px', letterSpacing: '0.72em', marginRight: '-0.72em' }}
        >
          SUA APROVAÇÃO AQUI
        </span>
      </div>
    </Link>
  );
}
