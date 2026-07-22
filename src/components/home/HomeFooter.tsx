import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaTiktok, FaYoutube } from 'react-icons/fa6';
import ConcursoNaVeiaLogo from '../ConcursoNaVeiaLogo';
import AnimatedElement from '../ui/AnimatedElement';

export default function HomeFooter() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 lg:gap-8 mb-16">
          {/* Brand & Info */}
          <AnimatedElement delay={0.1} className="col-span-2 lg:col-span-2">
            <div className="mb-6 inline-block dark">
              <ConcursoNaVeiaLogo variant="default" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
              A plataforma definitiva de estudos impulsionada por Inteligência Artificial. Revolucionamos a forma como você se prepara para os maiores concursos do Brasil com metodologia ativa e simulados infinitos.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <FaTiktok size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <FaXTwitter size={20} />
              </a>
            </div>
          </AnimatedElement>

          {/* Links: Produto */}
          <AnimatedElement delay={0.2} className="col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-bold mb-6">Produto</h4>
            <ul className="space-y-4 text-sm text-slate-400 flex flex-col items-center lg:items-start">
              <li><Link href="#features" className="hover:text-primary transition-colors">Funcionalidades</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Planos e Preços</Link></li>
              <li><Link href="#resultados" className="hover:text-primary transition-colors">Metodologia</Link></li>
              <li><Link href="#testimonials" className="hover:text-primary transition-colors">Casos de Sucesso</Link></li>
              <li><Link href="#petrolingo" className="hover:text-primary transition-colors">PetroLingo (Inglês Técnico)</Link></li>
            </ul>
          </AnimatedElement>

          {/* Links: Empresa */}
          <AnimatedElement delay={0.3} className="col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-slate-400 flex flex-col items-center lg:items-start">
              <li><Link href="#" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Carreiras</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contato</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Parceiros</Link></li>
            </ul>
          </AnimatedElement>

          {/* Links: Legal */}
          <AnimatedElement delay={0.4} className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400 flex flex-col items-center lg:items-start">
              <li><Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Garantia de 7 dias</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Central de Ajuda</Link></li>
            </ul>
          </AnimatedElement>
        </div>

        {/* Bottom Bar */}
        <AnimatedElement delay={0.5} className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Concurso Na Veia. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            Feito com <span className="text-red-500">❤️</span> e Inteligência Artificial.
          </div>
        </AnimatedElement>
      </div>
    </footer>
  );
}
