import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedModalWrapperProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedModalWrapper({ children, className }: AnimatedModalWrapperProps) {
  return (
    <div className={cn('relative group flex mt-4 ml-4 mr-4 mb-4 rounded-lg', className)}>
      {/* Plano de fundo interno */}
      <div className="absolute inset-[1px] rounded-lg pointer-events-none bg-white shadow-sm dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#121212] dark:to-[#080808]" />

      {/* Conteúdo do modal */}
      <div className="relative z-10 flex-1 rounded-lg overflow-hidden">
        {children}
      </div>
      
      {/* Borda animada usando conic-gradient - apenas dark mode */}
      <div className="absolute inset-0 rounded-lg overflow-hidden opacity-0 dark:opacity-100 pointer-events-none z-0">
        <div 
          className="absolute inset-0 animate-border-spin rounded-lg"
          style={{
            background: `conic-gradient(
              from var(--angle),
              transparent 0%,
              transparent 70%,
              var(--primary) 85%,
              var(--primary) 90%,
              var(--primary) 95%,
              transparent 100%
            )`,
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />
      </div>
      
      {/* Efeito de brilho adicional */}
      <div className="absolute inset-0 rounded-lg overflow-hidden opacity-0 dark:opacity-50 pointer-events-none blur-sm z-0">
        <div 
          className="absolute inset-0 animate-border-spin rounded-lg"
          style={{
            background: `conic-gradient(
              from var(--angle),
              transparent 0%,
              transparent 75%,
              var(--primary) 85%,
              var(--primary) 90%,
              var(--primary) 95%,
              transparent 100%
            )`,
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />
      </div>
    </div>
  );
}
