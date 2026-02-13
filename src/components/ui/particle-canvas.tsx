'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { availableThemes, defaultTheme } from '@/lib/themes';

type ParticleCanvasProps = {
  particleColor?: string;
  density?: number;
  className?: string;
};

type CanvasSize = {
  width: number;
  height: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  seed: number;
};

function readThemeKeyFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem('app-theme-color');
  return value ? value : null;
}

function resolveParticleColorHex(forcedThemeKey?: string) {
  const themeKey = forcedThemeKey || readThemeKeyFromStorage() || defaultTheme;
  return availableThemes[themeKey]?.primary || availableThemes[defaultTheme]?.primary || '#3b82f6';
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const r = Number.parseInt(clean.substring(0, 2), 16);
  const g = Number.parseInt(clean.substring(2, 4), 16);
  const b = Number.parseInt(clean.substring(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return { r: 59, g: 130, b: 246 };
  }
  return { r, g, b };
}

export const ParticleCanvas = React.forwardRef<HTMLCanvasElement, ParticleCanvasProps>(
  ({ particleColor, density = 1.0, className = '' }, ref) => {
    const localCanvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 600 });
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMousePosRef = useRef({ x: -1000, y: -1000 });
    const lastInteractionTimeRef = useRef<number>(0);
    const idleProfileRef = useRef<{
      mode: 'pulse' | 'waves' | 'anamorphic';
      modeStartMs: number;
      modeDurationMs: number;
      a: number;
      b: number;
      c: number;
    } | null>(null);
    const colorRef = useRef<string>(particleColor || resolveParticleColorHex());

    const effectiveParticleColor = useMemo(() => {
      return particleColor || resolveParticleColorHex();
    }, [particleColor]);

    useLayoutEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      const updateSize = () => {
        const rect = element.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        setCanvasSize({ width, height });
      };

      updateSize();

      const observer = new ResizeObserver(() => updateSize());
      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      const canvas =
        localCanvasRef.current || (ref as React.MutableRefObject<HTMLCanvasElement> | null)?.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const { width, height } = canvasSize;
      canvas.width = width;
      canvas.height = height;

      colorRef.current = effectiveParticleColor;

      const particleCount = Math.floor(160 * density);
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size,
          baseSize: size,
          alpha: Math.random() * 0.5 + 0.2,
          baseAlpha: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          seed: Math.random() * 1000,
        });
      }
      particlesRef.current = particles;

      const handleThemeColorChange = (event: Event) => {
        const typedEvent = event as CustomEvent<{ themeKey?: string }>;
        colorRef.current = resolveParticleColorHex(typedEvent.detail?.themeKey);
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseRef.current.x = x;
        mouseRef.current.y = y;

        const isInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
        if (!isInside) {
          lastMousePosRef.current = { x, y };
          return;
        }

        const dx = x - lastMousePosRef.current.x;
        const dy = y - lastMousePosRef.current.y;
        if (dx * dx + dy * dy > 4) {
          lastInteractionTimeRef.current = performance.now();
        }
        lastMousePosRef.current = { x, y };
      };

      const handleMouseLeave = () => {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      };

      window.addEventListener('app-theme-color-change', handleThemeColorChange);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      let rafId: number | null = null;
      let isRunning = true;

      const ensureIdleProfile = (nowMs: number) => {
        const current = idleProfileRef.current;
        if (current && nowMs - current.modeStartMs < current.modeDurationMs) return current;

        const modes: Array<'pulse' | 'waves' | 'anamorphic'> = ['pulse', 'waves', 'anamorphic'];
        const mode = modes[Math.floor(Math.random() * modes.length)] ?? 'waves';
        const next = {
          mode,
          modeStartMs: nowMs,
          modeDurationMs: 3500 + Math.floor(Math.random() * 4500),
          a: 0.6 + Math.random() * 1.2,
          b: 0.6 + Math.random() * 1.2,
          c: 0.6 + Math.random() * 1.2,
        };
        idleProfileRef.current = next;
        return next;
      };

      const render = () => {
        if (!isRunning) return;

        ctx.clearRect(0, 0, width, height);

        const rgb = hexToRgb(colorRef.current);
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mouseRadius = 150;

        const nowMs = performance.now();
        const isMouseInside = mx >= 0 && my >= 0 && mx <= width && my <= height;
        const idleDelayMs = 1500;
        const isIdle = !isMouseInside || nowMs - lastInteractionTimeRef.current > idleDelayMs;
        const idleProfile = isIdle ? ensureIdleProfile(nowMs) : null;
        if (!isIdle) {
          idleProfileRef.current = null;
        }

        const t = nowMs * 0.001;
        const breathe = 0.5 + 0.5 * Math.sin(t * 1.15);

        for (const p of particles) {
          let drawSize = p.baseSize;
          if (isIdle && idleProfile) {
            const pulse = 0.85 + 0.35 * breathe + 0.08 * Math.sin(t * (1.8 + idleProfile.a) + p.phase);
            drawSize = p.baseSize * pulse;
          }

          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (!isIdle && dist < mouseRadius && dist > 0) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.8;
            p.vy += Math.sin(angle) * force * 0.8;
            p.alpha = Math.min(1, p.baseAlpha + force * 0.6);
          } else {
            if (isIdle && idleProfile) {
              const idleAlpha = Math.min(
                1,
                p.baseAlpha + 0.12 + 0.22 * breathe + 0.12 * Math.sin(t * (2.0 + idleProfile.b) + p.phase)
              );
              p.alpha += (idleAlpha - p.alpha) * 0.06;
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            }
          }

          if (isIdle && idleProfile) {
            if (idleProfile.mode === 'pulse') {
              const drift = 0.025 + 0.015 * breathe;
              p.vx += Math.sin(t * (1.7 + idleProfile.a) + p.seed) * drift;
              p.vy += Math.cos(t * (1.5 + idleProfile.b) + p.seed) * drift;
            }

            if (idleProfile.mode === 'waves') {
              const angle =
                Math.sin(p.x * (0.008 + 0.002 * idleProfile.a) + t * (0.9 + idleProfile.b) + p.seed) +
                Math.cos(p.y * (0.006 + 0.002 * idleProfile.b) + t * (1.1 + idleProfile.c) + p.seed * 0.7);
              const intensity = 0.05 + 0.03 * breathe;
              p.vx += Math.cos(angle) * intensity;
              p.vy += Math.sin(angle) * intensity;
              p.vy += Math.sin(p.x * 0.01 + t * (1.8 + idleProfile.a)) * 0.02;
            }

            if (idleProfile.mode === 'anamorphic') {
              const centerX = width * 0.5 + Math.sin(t * (0.35 + idleProfile.a * 0.12)) * width * 0.22;
              const centerY = height * 0.5 + Math.cos(t * (0.28 + idleProfile.b * 0.12)) * height * 0.18;
              const stretchX = 1.6 + idleProfile.a * 0.35;
              const stretchY = 0.7 + idleProfile.b * 0.25;
              const adx = (centerX - p.x) * stretchX;
              const ady = (centerY - p.y) * stretchY;
              const adist = Math.sqrt(adx * adx + ady * ady);
              if (adist > 0.001) {
                const force = Math.min(1, adist / 260);
                const aangle = Math.atan2(ady, adx);
                const intensity = (0.045 + 0.03 * breathe) * force;
                p.vx += Math.cos(aangle) * intensity;
                p.vy += Math.sin(aangle) * intensity;
                p.vx += -Math.sin(aangle) * intensity * 0.35;
                p.vy += Math.cos(aangle) * intensity * 0.35;
              }
            }
          }

          p.vx *= 0.96;
          p.vy *= 0.96;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.alpha})`;
          ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const alpha = (1 - dist / 100) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        if (!isIdle && mx > 0 && my > 0 && mx < width && my < height) {
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius);
          gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
          gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
          ctx.beginPath();
          ctx.arc(mx, my, mouseRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        if (isIdle && idleProfile) {
          const centerX = width * 0.5 + Math.sin(t * (0.35 + idleProfile.a * 0.12)) * width * 0.18;
          const centerY = height * 0.5 + Math.cos(t * (0.28 + idleProfile.b * 0.12)) * height * 0.14;
          const radius = 220 + 90 * breathe;
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.06 + 0.05 * breathe})`);
          gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        rafId = window.requestAnimationFrame(render);
      };

      render();

      return () => {
        isRunning = false;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
        window.removeEventListener('app-theme-color-change', handleThemeColorChange);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [canvasSize, effectiveParticleColor, density, ref]);

    return (
      <div
        ref={containerRef}
        className={cn('absolute inset-0 h-full w-full pointer-events-none', className)}
      >
        <canvas ref={ref || localCanvasRef} className="block h-full w-full" />
      </div>
    );
  },
);

ParticleCanvas.displayName = 'ParticleCanvas';

export default ParticleCanvas;
