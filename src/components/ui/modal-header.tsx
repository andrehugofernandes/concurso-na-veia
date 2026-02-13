import React from 'react';
import { LuX } from 'react-icons/lu';
import { DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalHeaderProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClose: () => void;
  className?: string;
}

/**
 * Componente padrão para header de modais
 * Segue o padrão visual do imune-mais com cores dinâmicas via --primary
 * Inclui DialogTitle para acessibilidade (screen readers)
 */
export function ModalHeader({
  icon,
  title,
  description,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-6 py-4 bg-[var(--primary,#0037C1)] border-b border-slate-700 rounded-t-lg flex-shrink-0',
        className
      )}
    >
      {/* DialogTitle para acessibilidade - visualmente oculto mas acessível para screen readers */}
      <DialogTitle className="sr-only">{title}</DialogTitle>

      {/* Badge com Ícone */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20">
        <div className="text-white text-xl">{icon}</div>
      </div>

      {/* Título e Descrição */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {description && (
          <p className="text-sm text-white/80 mt-0.5">{description}</p>
        )}
      </div>

      {/* Botão Fechar */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Fechar modal"
      >
        <LuX size={24} />
      </button>
    </div>
  );
}
