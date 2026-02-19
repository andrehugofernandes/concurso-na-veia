'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  imagePlaceholder?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  imagePlaceholder = true,
}: AuthLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado esquerdo - Formulário */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">

          {/* Logo */}
          <div className="flex items-start">
            <h1
              className="font-black mb-2 text-4xl sm:text-5xl md:text-6xl tracking-tight
              bg-gradient-to-br from-orange-500 to-yellow-500 bg-clip-text text-transparent
              py-2 leading-relaxed drop-shadow-sm"
            >
              <span className="text-5xl sm:text-6xl md:text-8xl">IMUNE+</span> JABOATÃO
            </h1>
          </div>


          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>

          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 mb-8">{subtitle}</p>
          )}

          {children}
        </div>
      </div>

      {/* Lado direito - Imagem */}
      <div className="hidden md:block md:w-1/2 bg-green-500 relative">
        {imagePlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full">
              <Image
                src="/images/bg-login-new.png"
                alt="Faça Login no Sistema"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 p-8">
              <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/zegotinha.gif"
                      alt="Logo IMUNE+ Jaboatão"
                      width={48}
                      height={48}
                      className="w-14 h-14"
                    />
                  </div>
                  <Link href="/" className="block">
                    <div>
                      <h3 className="font-bold text-gray-900">IMUNE+ JABOATÃO</h3>
                      <p className="text-sm text-gray-600">Portal de Informações</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
