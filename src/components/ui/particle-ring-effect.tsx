'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { availableThemes, defaultTheme } from '@/lib/themes';

type Particle = {
  baseAngle: number;
  baseRadius: number;
  angleOffset: number;
  alpha: number;
  size: number;
  row: number;
};

type Hsl = {
  h: number;
  s: number;
  l: number;
};

function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace('#', '');
  if (normalized.length !== 6) return null;

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }): Hsl {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  const l = (max + min) / 2;
  if (delta === 0) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));

  let h = 0;
  switch (max) {
    case rNorm:
      h = ((gNorm - bNorm) / delta) % 6;
      break;
    case gNorm:
      h = (bNorm - rNorm) / delta + 2;
      break;
    case bNorm:
      h = (rNorm - gNorm) / delta + 4;
      break;
    default:
      h = 0;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  return {
    h,
    s: s * 100,
    l: l * 100,
  };
}

function seededRandom(seed: number, index: number) {
  const x = Math.sin(seed + index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function readPrimaryColorHex(): string | null {
  if (typeof window === 'undefined') return null;
  const root = window.getComputedStyle(document.documentElement);
  const value = root.getPropertyValue('--primary');
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('#')) return trimmed;
  return null;
}

function readThemeKeyFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem('app-theme-color');
  return value ? value : null;
}

export function ParticleRingEffect({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const themeHslRef = useRef<Hsl>({ h: 210, s: 60, l: 35 });

  const config = useMemo(
    () => ({
      ringRadius: 180,
      ringThickness: 400,
      particleCount: 80,
      particleRows: 25,
      particleSize: 2,
      particleMinAlpha: 0.15,
      particleMaxAlpha: 0.5,
      seed: 200,
      animationSpeed: 0.003,
      pulseSpeed: 0.0015,
      minInnerRadius: 180,
      maxInnerRadius: 500,
      velocityDecay: 0.95,
    }),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateThemeColor = (forcedThemeKey?: string) => {
      const themeKey = forcedThemeKey || readThemeKeyFromStorage();
      const primaryFromTheme = themeKey ? availableThemes[themeKey]?.primary : undefined;
      const primaryHex = primaryFromTheme || readPrimaryColorHex() || availableThemes[defaultTheme]?.primary;
      const parsed = primaryHex ? parseHexColor(primaryHex) : null;
      themeHslRef.current = parsed ? rgbToHsl(parsed) : { h: 210, s: 60, l: 35 };
    };

    updateThemeColor();

    const handleThemeColorChange = (event: Event) => {
      const typedEvent = event as CustomEvent<{ themeKey?: string }>;
      const themeKey = typedEvent.detail?.themeKey;
      updateThemeColor(themeKey);
    };

    window.addEventListener('app-theme-color-change', handleThemeColorChange);

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    for (let row = 0; row < config.particleRows; row++) {
      for (let i = 0; i < config.particleCount; i++) {
        const angle = (i / config.particleCount) * Math.PI * 2;
        const radiusOffset = (row / config.particleRows) * config.ringThickness;
        const radius = config.ringRadius + radiusOffset;

        const index = row * config.particleCount + i;
        const randomOffset = seededRandom(config.seed, index);
        const angleOffset = randomOffset * Math.PI * 0.2;

        const rowFactor = config.particleRows <= 1 ? 0 : row / (config.particleRows - 1);
        const alpha =
          config.particleMaxAlpha -
          (config.particleMaxAlpha - config.particleMinAlpha) * rowFactor;

        particles.push({
          baseAngle: angle,
          baseRadius: radius,
          angleOffset,
          alpha,
          size: config.particleSize + seededRandom(config.seed + 1000, index) * 1,
          row,
        });
      }
    }

    particlesRef.current = particles;

    const targetCenter = { x: 50, y: 50 };
    const smoothCenter = { x: 50, y: 50 };

    const lastMousePos = { x: 0, y: 0 };
    const mouseMoveHistory: Array<{ speed: number; time: number }> = [];

    let time = 0;
    let pulse = 0;
    let currentInnerRadius = config.minInnerRadius;
    let targetInnerRadius = config.minInnerRadius;
    let mouseVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX;
      const currentY = e.clientY;

      const deltaX = currentX - lastMousePos.x;
      const deltaY = currentY - lastMousePos.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      mouseMoveHistory.push({ speed, time: Date.now() });
      if (mouseMoveHistory.length > 10) mouseMoveHistory.shift();

      const recentMoves = mouseMoveHistory.filter((move) => Date.now() - move.time < 200);
      const avgSpeed =
        recentMoves.reduce((sum, move) => sum + move.speed, 0) / (recentMoves.length || 1);

      mouseVelocity = avgSpeed;

      const speedFactor = Math.min(avgSpeed / 20, 1);
      targetInnerRadius =
        config.minInnerRadius + (config.maxInnerRadius - config.minInnerRadius) * speedFactor;

      lastMousePos.x = currentX;
      lastMousePos.y = currentY;

      targetCenter.x = (e.clientX / rect.width) * 100;
      targetCenter.y = (e.clientY / rect.height) * 100;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const easing = 0.05;
      smoothCenter.x += (targetCenter.x - smoothCenter.x) * easing;
      smoothCenter.y += (targetCenter.y - smoothCenter.y) * easing;

      const centerX = (smoothCenter.x / 100) * width;
      const centerY = (smoothCenter.y / 100) * height;

      currentInnerRadius += (targetInnerRadius - currentInnerRadius) * 0.1;

      mouseVelocity *= config.velocityDecay;
      if (mouseVelocity < 0.1) {
        targetInnerRadius += (config.minInnerRadius - targetInnerRadius) * 0.05;
      }

      time += config.animationSpeed;
      pulse += config.pulseSpeed;

      const pulseRadius = Math.sin(pulse * Math.PI * 2) * 30;
      const ripple = Math.sin(time * Math.PI * 2) * 0.2;

      const themeHsl = themeHslRef.current;
      const baseHue = themeHsl.h;
      const baseSaturation = clamp(themeHsl.s + 10, 35, 90);

      for (const particle of particlesRef.current) {
        const currentAngle =
          particle.baseAngle + particle.angleOffset + time * (1 + particle.row * 0.08);
        const currentRadius = particle.baseRadius + pulseRadius + ripple * (particle.row * 2);

        if (currentRadius < currentInnerRadius) continue;

        const x = centerX + Math.cos(currentAngle) * currentRadius;
        const y = centerY + Math.sin(currentAngle) * currentRadius;

        if (x < 0 || x > width || y < 0 || y > height) continue;

        const rowFactor = particle.row / config.particleRows;
        const lightness = clamp(18 + rowFactor * 30, 12, 60);

        ctx.fillStyle = `hsla(${baseHue}, ${baseSaturation}%, ${lightness}%, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('app-theme-color-change', handleThemeColorChange);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 h-full w-full pointer-events-none', className)}
      style={{ mixBlendMode: 'normal' }}
    />
  );
}

export default ParticleRingEffect;
