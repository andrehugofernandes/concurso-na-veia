'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const FloatingButton: React.FC = () => {
  const pathname = usePathname();
  
  // Não renderiza o botão na página de login
  if (pathname === '/login') {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 right-32 z-50">
      <Link
        href="https://deolhonaconsulta.jaboatao.pe.gov.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-16 bg-gradient-to-br from-[#008C32] to-[#42BD84] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 pr-4"
      >
        <Image
          src="/images/deolho.png"
          alt="De Olho na Consulta"
          width={150}
          height={100}
          className="object-contain"
        />
      </Link>
    </div>
  );
};

export default FloatingButton;
