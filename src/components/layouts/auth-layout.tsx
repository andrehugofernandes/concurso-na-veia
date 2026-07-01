'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultTheme } from '@/lib/themes';
import { ParticleRingEffect } from '@/components/ui/particle-ring-effect';
import { ParticleCanvas } from '@/components/ui/particle-canvas';
import { getSiteSettingsAction } from '@/lib/actions/settings';

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title = 'Passei no Concurso Dashboard',
  subtitle = 'Autenticação Segura',
  imageSrc = '/images/login-bg.png',
  imageAlt = 'Login Background',
  children,
  className,
}: AuthLayoutProps) {
  const [themeKey, setThemeKey] = useState<string>(defaultTheme);
  const [siteLogoUrl, setSiteLogoUrl] = useState<string | null>(null);
  const [siteLogoAspectRatio, setSiteLogoAspectRatio] = useState<number | null>(null);
  const [loginParticlesStyle, setLoginParticlesStyle] = useState<'claude' | 'manus'>('claude');

  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme-color');
    if (storedTheme) setThemeKey(storedTheme);

    const handleThemeColorChange = (event: Event) => {
      const typedEvent = event as CustomEvent<{ themeKey?: string }>;
      const nextThemeKey = typedEvent.detail?.themeKey;
      if (!nextThemeKey) return;
      setThemeKey(nextThemeKey);
    };

    window.addEventListener('app-theme-color-change', handleThemeColorChange);
    return () => {
      window.removeEventListener('app-theme-color-change', handleThemeColorChange);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadPublicSettings = async () => {
      try {
        const result = await getSiteSettingsAction();
        if (result.status === 'success' && result.data) {
          if (isCancelled) return;
          setSiteLogoUrl(result.data.logoUrl ?? null);
          setLoginParticlesStyle(result.data.loginParticlesStyle === 'manus' ? 'manus' : 'claude');
        }
      } catch {
        if (!isCancelled) {
          setSiteLogoUrl(null);
          setLoginParticlesStyle('claude');
        }
      }
    };

    const handleSiteLogoUpdated = (event: Event) => {
      const typedEvent = event as CustomEvent<string | null>;
      const nextLogoUrl = typedEvent.detail;
      setSiteLogoUrl(typeof nextLogoUrl === 'string' ? nextLogoUrl : null);
    };

    const handleLoginParticlesStyleUpdated = (event: Event) => {
      const typedEvent = event as CustomEvent<'claude' | 'manus'>;
      const nextLoginParticlesStyle = typedEvent.detail;
      setLoginParticlesStyle(nextLoginParticlesStyle);
    };

    loadPublicSettings();
    window.addEventListener('wp2next:siteLogoUpdated', handleSiteLogoUpdated);
    window.addEventListener('wp2next:loginParticlesStyleUpdated', handleLoginParticlesStyleUpdated);

    return () => {
      isCancelled = true;
      window.removeEventListener('wp2next:siteLogoUpdated', handleSiteLogoUpdated);
      window.removeEventListener('wp2next:loginParticlesStyleUpdated', handleLoginParticlesStyleUpdated);
    };
  }, []);

  useEffect(() => {
    if (!siteLogoUrl) {
      setSiteLogoAspectRatio(null);
      return;
    }

    let isCancelled = false;
    const img = new window.Image();

    img.onload = () => {
      if (isCancelled) return;
      if (!img.naturalWidth || !img.naturalHeight) {
        setSiteLogoAspectRatio(null);
        return;
      }
      setSiteLogoAspectRatio(img.naturalWidth / img.naturalHeight);
    };

    img.onerror = () => {
      if (isCancelled) return;
      setSiteLogoAspectRatio(null);
    };

    img.src = siteLogoUrl;

    return () => {
      isCancelled = true;
    };
  }, [siteLogoUrl]);

  const titleGradientClassName = useMemo(() => {
    const mapping: Record<string, string> = {
      orange: 'bg-gradient-to-br from-orange-500 to-yellow-500 bg-clip-text text-transparent',
      yellow: 'bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-transparent',
      green: 'bg-gradient-to-br from-green-600 to-lime-400 bg-clip-text text-transparent',
      lightGreen: 'bg-gradient-to-br from-lime-400 to-green-600 bg-clip-text text-transparent',
      blue: 'bg-gradient-to-br from-blue-700 to-sky-400 bg-clip-text text-transparent',
      lightBlue: 'bg-gradient-to-br from-sky-400 to-blue-700 bg-clip-text text-transparent',
    };

    return mapping[themeKey] || mapping[defaultTheme];
  }, [themeKey]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      {/* Left Panel - Formulário */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        {loginParticlesStyle === 'manus' ? (
          <ParticleCanvas className="opacity-90" />
        ) : (
          <ParticleRingEffect className="opacity-90" />
        )}
        <div className="relative z-10 w-full max-w-lg space-y-8">
          {/* Logo/Title */}
          <div className="text-center">
            <h1
              data-testid="auth-title"
              data-title={title}
              className={cn(
                'relative isolate xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold',
                'before:pointer-events-none before:absolute before:inset-0 before:select-none',
                'before:content-[attr(data-title)] before:-z-10 before:translate-y-4',
                'before:text-black/20 before:blur-[12px] before:opacity-100',
                'dark:before:opacity-0',
                titleGradientClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {/* Children (formulário) */}
          <div className={cn('space-y-6', className)}>
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel - Imagem (hidden on mobile) */}
      <div className="relative hidden md:block md:w-1/2 bg-white dark:bg-slate-950">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}

        {siteLogoUrl && (
          <div className="absolute bottom-0 right-0 p-8">
            <Link href="/" className="block" aria-label="Ir para a página inicial">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className="relative h-12 w-auto max-w-[200px]"
                      style={{ aspectRatio: siteLogoAspectRatio || 1 }}
                    >
                      <Image
                        src={siteLogoUrl}
                        alt="Logo do site"
                        fill
                        sizes="200px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthLayout;
