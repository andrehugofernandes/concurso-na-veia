import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBorderCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedBorderCard({ children, className }: AnimatedBorderCardProps) {
  return (
    <div className={cn('relative group flex', className)}>
      {/* Conteúdo do card */}
      <div className="relative z-10 flex-1">
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
