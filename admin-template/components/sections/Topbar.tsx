// components/Topbar.tsx
'use client';

import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';

export function Topbar() {
  // Lista de links de redes sociais
  const socialLinks = [
    { 
      id: 'instagram', 
      href: 'https://www.instagram.com/prefjaboatao/', 
      icon: <FaInstagram className="text-white hover:text-yellow-300 text-lg" />,
      label: 'Instagram da Prefeitura de Jaboatão'
    },
    { 
      id: 'twitter', 
      href: 'https://x.com/jaboataoonline', 
      icon: <FaXTwitter className="text-white hover:text-yellow-300 text-lg" />,
      label: 'Twitter da Prefeitura de Jaboatão'
    },
    { 
      id: 'facebook', 
      href: 'https://www.facebook.com/PrefeituradoJaboatao', 
      icon: <FaFacebook className="text-white hover:text-yellow-300 text-lg" />,
      label: 'Facebook da Prefeitura de Jaboatão'
    },
    { 
      id: 'youtube', 
      href: 'https://www.youtube.com/prefeiturajaboatao', 
      icon: <FaYoutube className="text-white hover:text-yellow-300 text-lg" />,
      label: 'YouTube da Prefeitura de Jaboatão'
    }
  ];

  // Lista de links institucionais
  const institutionalLinks = [
    { 
      id: 'diario-oficial', 
      href: 'http://diariooficial.jaboatao.pe.gov.br/', 
      label: 'Diário Oficial',
      external: true
    },
    { 
      id: 'site-oficial', 
      href: 'http://jaboatao.pe.gov.br/', 
      label: 'Site Oficial',
      external: true
    },
    { 
      id: 'transparencia', 
      href: 'https://portaldatransparencia.jaboatao.pe.gov.br/', 
      label: 'Portal da Transparência',
      external: true
    },
    { 
      id: 'ouvidoria', 
      href: 'http://ouvidoria.jaboatao.pe.gov.br/', 
      label: 'Ouvidoria',
      external: true
    },
    { 
      id: 'contribuinte', 
      href: 'https://www.tinus.com.br/csp/JABOATAO/portal/index.csp', 
      label: 'Portal do Contribuinte',
      external: true
    },
    { 
      id: 'servidor', 
      href: 'https://servidor.jaboatao.pe.gov.br/', 
      label: 'Portal do Servidor',
      external: true
    },
    { 
      id: 'covid', 
      href: 'https://jaboataoemacao.jaboatao.pe.gov.br/', 
      label: 'COVID-19',
      external: true
    },
    { 
      id: 'radar', 
      href: 'https://radardatransparencia.atricon.org.br/radar-da-transparencia-publica.html', 
      label: 'Radar da Transparência',
      external: true
    },
    { 
      id: 'ouvidoria-icon', 
      href: 'https://eouve.com.br/#/ouvidoria', 
      label: 'Ouvidoria',
      external: true,
      icon: (
        <Image 
          src="/images/iconamarelo.png" 
          alt="" 
          width={20} 
          height={20} 
          className="inline-block"
          aria-hidden="true"
        />
      )
    }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0037C1] py-1 text-white text-sm px-[20px] xl:px-[50px] 
                        flex flex-col xl:flex-row xl:justify-between items-center gap-2 z-50">
                          
      {/* Redes sociais */}
      <nav aria-label="Redes sociais">
        <ul className="flex gap-2 justify-center items-center">
          {socialLinks.map(({ id, href, icon, label }) => (
            <li key={id}>
              <Link 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-1"
                aria-label={label}
              >
                <span className="sr-only">{label}</span>
                {icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Links institucionais - apenas em telas grandes */}
      <nav className="hidden xl:block" aria-label="Links institucionais">
        <ul className="flex gap-3 font-open-sans items-center">
          {institutionalLinks.map(({ id, href, label, external, icon }) => (
            <li key={id}>
              <Link 
                href={href} 
                target={external ? "_blank" : "_self"} 
                rel={external ? "noopener noreferrer" : undefined}
                className="hover:underline inline-flex items-center gap-1 text-xs md:text-sm h-full"
              >
                {icon && <span aria-hidden="true">{icon}</span>}
                {!icon && label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
