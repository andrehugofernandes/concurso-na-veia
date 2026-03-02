'use client';

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type VariantStage = {
  initial: CSSProperties;
  animate: CSSProperties;
};

type TextRollVariants = {
  enter: VariantStage;
  exit?: VariantStage;
};

interface TextRollProps {
  className?: string;
  variants?: TextRollVariants;
  children: ReactNode;
}

/**
 * Componente para animar títulos com efeito de rotação e blur.
 * Caso variants não seja informado, aplica uma animação padrão.
 */
export function TextRoll({ className, variants, children }: TextRollProps) {
  const enter = variants?.enter ?? {
    initial: { transform: 'rotateX(90deg)', filter: 'blur(2px)' },
    animate: { transform: 'rotateX(0deg)', filter: 'blur(0px)' },
  };

  const transition = { duration: 0.6, easing: 'ease' };

  return (
    <span
      className={cn(
        'inline-block origin-bottom will-change-transform',
        'animate-[text-roll_0.6s_ease_forwards]',
        className
      )}
      style={{
        transform: enter.initial.transform ?? 'rotateX(90deg)',
        filter: enter.initial.filter ?? 'blur(2px)',
        animationTimingFunction: transition.easing,
        animationDuration: `${transition.duration}s`,
      }}
    >
      {children}
      <style jsx global>{`
        @keyframes text-roll {
          0% {
            transform: ${enter.initial.transform ?? 'rotateX(90deg)'};
            filter: ${enter.initial.filter ?? 'blur(2px)'};
          }
          100% {
            transform: ${enter.animate.transform ?? 'rotateX(0deg)'};
            filter: ${enter.animate.filter ?? 'blur(0px)'};
          }
        }
      `}</style>
    </span>
  );
}

export function TextRollCustomVariants() {
  return (
    <TextRoll
      className="text-4xl text-black dark:text-white"
      variants={{
        enter: {
          initial: { transform: 'rotateX(0deg)', filter: 'blur(0px)' },
          animate: { transform: 'rotateX(90deg)', filter: 'blur(2px)' },
        },
        exit: {
          initial: { transform: 'rotateX(90deg)', filter: 'blur(2px)' },
          animate: { transform: 'rotateX(0deg)', filter: 'blur(0px)' },
        },
      }}
    >
      motion-primitives
    </TextRoll>
  );
}
