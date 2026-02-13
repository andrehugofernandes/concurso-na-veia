'use client';

import { cn } from '@/lib/utils';

interface AnimatedBorderProps {
  className?: string;
  /** Se true, mostra o efeito de brilho adicional */
  withGlow?: boolean;
  /** Radius do border-radius. Default: rounded-lg */
  borderRadius?: string;
}

/**
 * Componente de borda animada com conic-gradient
 * Aparece apenas no modo dark e usa a cor --primary do sistema de skins
 * 
 * Uso: Adicione como filho de um elemento com position: relative
 * 
 * @example
 * <div className="relative">
 *   <AnimatedBorder />
 *   {children}
 * </div>
 */
export function AnimatedBorder({ className, withGlow = true, borderRadius = 'rounded-lg' }: AnimatedBorderProps) {
  return (
    <>
      {/* Bordas animadas - duas cobrinhas equidistantes (180° de diferença) */}
      <div
        className={cn(
          'absolute inset-0 overflow-hidden opacity-0 dark:opacity-100 pointer-events-none z-[-1]',
          borderRadius,
          className
        )}
      >
        {/* Primeira cobrinha */}
        <div
          className={cn("absolute inset-0 animate-border-spin", borderRadius)}
          style={{
            background: `conic-gradient(
              from var(--angle),
              transparent 0%,
              transparent 85%,
              var(--primary) 92.5%,
              var(--primary) 95%,
              var(--primary) 97.5%,
              transparent 100%
            )`,
            padding: '1.5px', // Ligeiramente mais espessa para destaque
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />
        {/* Segunda cobrinha (180° de diferença) */}
        <div
          className={cn("absolute inset-0 animate-border-spin", borderRadius)}
          style={{
            background: `conic-gradient(
              from calc(var(--angle) + 180deg),
              transparent 0%,
              transparent 85%,
              var(--primary) 92.5%,
              var(--primary) 95%,
              var(--primary) 97.5%,
              transparent 100%
            )`,
            padding: '1.5px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />
      </div>

      {/* Efeito de brilho adicional - duas cobrinhas */}
      {withGlow && (
        <div
          className={cn(
            'absolute inset-0 overflow-hidden opacity-0 dark:opacity-40 pointer-events-none blur-md z-[-1]',
            borderRadius,
            className
          )}
        >
          {/* Primeira cobrinha glow */}
          <div
            className={cn("absolute inset-0 animate-border-spin", borderRadius)}
            style={{
              background: `conic-gradient(
                from var(--angle),
                transparent 0%,
                transparent 87.5%,
                var(--primary) 92.5%,
                var(--primary) 95%,
                var(--primary) 97.5%,
                transparent 100%
              )`,
              padding: '1px',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />
          {/* Segunda cobrinha glow (180° de diferença) */}
          <div
            className={cn("absolute inset-0 animate-border-spin", borderRadius)}
            style={{
              background: `conic-gradient(
                from calc(var(--angle) + 180deg),
                transparent 0%,
                transparent 87.5%,
                var(--primary) 92.5%,
                var(--primary) 95%,
                var(--primary) 97.5%,
                transparent 100%
              )`,
              padding: '1px',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />
        </div>
      )}
    </>
  );
}
