"use client";

import { Button } from "@/components/ui/button";
import { FileText, GraduationCap, Book, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroSection2() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector("header") as HTMLElement | null;
      const topbar = document.querySelector(".topbar") as HTMLElement | null;
      const headerHeight = header?.offsetHeight || 0;
      const topbarHeight = topbar?.offsetHeight || 0;
      const offset = headerHeight + topbarHeight + 20; // Additional padding
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuração do canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Elementos de saúde com cores vibrantes
    const elements = [
      { type: "virus", color: "rgba(255, 99, 71, 0.5)", size: 15, speed: 1.5 }, // Vermelho tomate
      {
        type: "antibody",
        color: "rgba(30, 144, 255, 0.5)",
        size: 12,
        speed: 2,
      }, // Azul dodger
      { type: "molecule", color: "rgba(50, 205, 50, 0.5)", size: 10, speed: 1 }, // Verde limão
      { type: "cell", color: "rgba(255, 215, 0, 0.5)", size: 20, speed: 0.8 }, // Amarelo ouro
      { type: "pill", color: "rgba(0, 206, 209, 0.5)", size: 12, speed: 1.2 }, // Turquesa
      {
        type: "syringe",
        color: "rgba(147, 112, 219, 0.5)",
        size: 18,
        speed: 1.3,
      }, // Roxo médio
      { type: "mask", color: "rgba(60, 179, 113, 0.5)", size: 16, speed: 1.1 }, // Verde mar
      { type: "heart", color: "rgba(220, 20, 60, 0.5)", size: 14, speed: 0.9 }, // Carmesim
      { type: "cross", color: "rgba(70, 130, 180, 0.5)", size: 15, speed: 1 }, // Azul aço
      {
        type: "bacteria",
        color: "rgba(255, 165, 0, 0.5)",
        size: 18,
        speed: 1.2,
      }, // Laranja
    ];

    // Ajuste de cores para o modo escuro (maior opacidade)
    const darkModeElements = elements.map((element) => ({
      ...element,
      color: element.color.replace("0.5)", "0.7)"), // Aumenta opacidade para 0.7 no modo escuro
    }));

    // Criar partículas
    const particles = Array.from({ length: 40 }, () => {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const element = (isDarkMode ? darkModeElements : elements)[
        Math.floor(Math.random() * elements.length)
      ];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: element.size + Math.random() * 5,
        speedX: (Math.random() - 0.5) * element.speed,
        speedY: (Math.random() - 0.5) * element.speed,
        color: element.color,
        type: element.type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };
    });

    // Função para desenhar seringa
    const drawSyringe = (ctx: CanvasRenderingContext2D, size: number) => {
      // Corpo da seringa
      ctx.fillStyle = "rgba(186, 85, 211, 0.6)";
      ctx.fillRect(-size / 3, -size / 2, size / 1.5, size);

      // Detalhes
      ctx.strokeStyle = "rgba(147, 112, 219, 0.9)";
      ctx.lineWidth = 2;
      ctx.strokeRect(-size / 3, -size / 2, size / 1.5, size);

      // Êmbolo
      ctx.fillStyle = "rgba(200, 162, 200, 0.8)";
      ctx.fillRect(-size / 4, -size / 2 - size / 8, size / 2, size / 4);

      // Agulha
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.lineTo(0, size / 2 + size / 3);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cone da agulha
      ctx.beginPath();
      ctx.moveTo(-size / 8, size / 2);
      ctx.lineTo(0, size / 2 + size / 8);
      ctx.lineTo(size / 8, size / 2);
      ctx.fillStyle = "rgba(153, 50, 204, 0.8)";
      ctx.fill();
    };

    // Função para desenhar máscara
    const drawMask = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();

      // Parte central
      ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2);

      // Alças
      ctx.moveTo(-size / 2, -size / 4);
      ctx.lineTo(-size / 2 - size / 3, -size / 4 - size / 5);

      ctx.moveTo(size / 2, -size / 4);
      ctx.lineTo(size / 2 + size / 3, -size / 4 - size / 5);

      ctx.strokeStyle = "rgba(46, 139, 87, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dobras
      for (let i = -1; i <= 1; i += 2) {
        ctx.beginPath();
        ctx.ellipse((i * size) / 4, 0, size / 8, size / 4, 0, 0, Math.PI);
        ctx.stroke();
      }
    };

    // Função para desenhar coração
    const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, size / 4);

      // Curvas superiores
      ctx.bezierCurveTo(
        size / 2,
        -topCurveHeight,
        size / 2,
        -topCurveHeight,
        0,
        -size / 2
      );

      ctx.bezierCurveTo(
        -size / 2,
        -topCurveHeight,
        -size / 2,
        -topCurveHeight,
        0,
        size / 4
      );

      // Parte inferior
      ctx.bezierCurveTo(0, size / 2, 0, size / 2, 0, size / 2);

      ctx.fillStyle = "rgba(220, 20, 60, 0.6)";
      ctx.fill();
    };

    // Função para desenhar cruz médica
    const drawCross = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.strokeStyle = "rgba(70, 130, 180, 0.7)";
      ctx.lineWidth = 4;

      // Haste vertical
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(0, size / 2);
      ctx.stroke();

      // Haste horizontal
      ctx.beginPath();
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(size / 2, 0);
      ctx.stroke();
    };

    // Função para desenhar bactéria
    const drawBacteria = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Flagelos
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);

        // Curva sinuosa
        const cp1x = Math.cos(angle) * size * 0.8;
        const cp1y = Math.sin(angle) * size * 0.8;
        const cp2x = Math.cos(angle + 0.5) * size * 1.2;
        const cp2y = Math.sin(angle + 0.5) * size * 1.2;
        const endX = Math.cos(angle + 1) * size * 1.5;
        const endY = Math.sin(angle + 1) * size * 1.5;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.strokeStyle = "rgba(255, 140, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Verificar bordas
        if (particle.x < -particle.size * 2)
          particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size * 2)
          particle.x = -particle.size;
        if (particle.y < -particle.size * 2)
          particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size * 2)
          particle.y = -particle.size;

        // Desenhar elemento
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;

        switch (particle.type) {
          case "virus":
            // Desenhar vírus (círculo com espinhos)
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(220, 20, 60, 0.6)";
            for (let i = 0; i < 8; i++) {
              const angle = (i / 8) * Math.PI * 2;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(
                Math.cos(angle) * (particle.size + 5),
                Math.sin(angle) * (particle.size + 5)
              );
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            break;

          case "antibody":
            // Desenhar anticorpo (formato Y)
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(0, particle.size / 6);
            ctx.moveTo(0, particle.size / 6);
            ctx.lineTo(-particle.size / 2, particle.size);
            ctx.moveTo(0, particle.size / 6);
            ctx.lineTo(particle.size / 2, particle.size);
            ctx.lineWidth = 3;
            ctx.stroke();
            break;

          case "molecule":
            // Desenhar molécula (círculos conectados)
            const atoms = 3 + Math.floor(Math.random() * 2);
            const coords = [];
            for (let i = 0; i < atoms; i++) {
              const angle = (i / atoms) * Math.PI * 2;
              const dist = particle.size / 2;
              const x = Math.cos(angle) * dist;
              const y = Math.sin(angle) * dist;
              coords.push({ x, y });

              ctx.beginPath();
              ctx.arc(x, y, particle.size / 3, 0, Math.PI * 2);
              ctx.fill();
            }

            // Ligação entre átomos
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            for (let i = 0; i < coords.length; i++) {
              for (let j = i + 1; j < coords.length; j++) {
                ctx.beginPath();
                ctx.moveTo(coords[i].x, coords[i].y);
                ctx.lineTo(coords[j].x, coords[j].y);
                ctx.stroke();
              }
            }
            break;

          case "cell":
            // Desenhar célula (círculo irregular)
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            for (let i = 0; i < 5; i++) {
              const angle = (i / 5) * Math.PI * 2;
              const bumpSize = particle.size * (0.8 + Math.random() * 0.4);
              ctx.lineTo(
                Math.cos(angle) * bumpSize,
                Math.sin(angle) * bumpSize
              );
            }
            ctx.closePath();
            ctx.fill();
            break;

          case "pill":
            // Desenhar pílula (cápsula)
            ctx.beginPath();
            ctx.arc(
              -particle.size / 3,
              0,
              particle.size / 2,
              Math.PI / 2,
              (Math.PI * 3) / 2
            );
            ctx.arc(
              particle.size / 3,
              0,
              particle.size / 2,
              (Math.PI * 3) / 2,
              Math.PI / 2
            );
            ctx.closePath();
            ctx.fill();
            break;

          case "syringe":
            drawSyringe(ctx, particle.size);
            break;

          case "mask":
            drawMask(ctx, particle.size);
            break;

          case "heart":
            drawHeart(ctx, particle.size);
            break;

          case "cross":
            drawCross(ctx, particle.size);
            break;

          case "bacteria":
            drawBacteria(ctx, particle.size);
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Redimensionamento responsivo
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 pt-16 pb-10 overflow-x-hidden relative">
      {/* Canvas animado com elementos de saúde */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-15 dark:opacity-20 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1600px] relative z-10">
        {/* Conteúdo principal */}
        <div className="flex flex-col items-center gap-8 mb-16">
          {/* Zé Gotinha e Video */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-20">
            {/* Zé Gotinha */}
            <div className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px] flex-shrink-0">
              <Image
                src="/zegotinha.gif"
                alt="Zé Gotinha"
                width={360}
                height={360}
                className="object-contain drop-shadow-lg"
                priority
                unoptimized
              />
            </div>

            {/* Video de Apresentação */}
            <div className="relative h-[250px] sm:h-[320px] md:h-[360px] flex-shrink-0">
              <video
                controls
                className="w-full h-full object-cover rounded-xl shadow-lg"
                poster="/videos/imunemais.png"
              >
                <source src="/videos/video-apresentacao.MOV" type="video/mp4" />
                <track kind="captions" label="Português" srcLang="pt-BR" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Títulos e botões */}
          <div className="flex flex-col items-center max-w-[1200px] w-full">
            <div className="text-center mb-6">
              <h1
                className="mt-4 font-black mb-2 text-4xl sm:text-5xl md:text-6xl tracking-tight
                bg-gradient-to-br from-orange-500 to-yellow-500 bg-clip-text text-transparent
                py-2 leading-relaxed drop-shadow-sm"
              >
                IMUNE+ JABOATÃO
              </h1>
              <p className="text-xl sm:text-2xl md:text-xl uppercase opacity-80 font-medium text-gray-700 dark:text-gray-300">
                Sistema integrado de recursos para profissionais de imunização
                de Jaboatão dos Guararapes
              </p>
            </div>

            {/* CTA Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <Button
                onClick={() => scrollToSection("biblioteca")}
                className="group bg-gradient-to-br from-[#008C32] to-[#00DD4F] hover:opacity-90 text-white font-semibold py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-14 text-base shadow-md flex items-center justify-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full transition-transform duration-300 group-hover:scale-105">
                  <Book className="h-4 w-4" />
                </span>
                <span className="truncate">BIBLIOTECA IMUNE+</span>
              </Button>

              <Button
                onClick={() => scrollToSection("impressos")}
                className="group bg-gradient-to-bl from-[#008C32] to-[#00DD4F] hover:opacity-90 text-white font-semibold py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-14 text-base shadow-md flex items-center justify-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full transition-transform duration-300 group-hover:scale-105">
                  <FileText className="h-4 w-4" />
                </span>
                <span className="truncate">IMPRESSOS IMUNE+</span>
              </Button>

              <Button
                onClick={() => scrollToSection("capacita")}
                className="group bg-gradient-to-tr from-[#008C32] to-[#00DD4F] hover:opacity-90 text-white font-semibold py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-14 text-base shadow-md flex items-center justify-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full transition-transform duration-300 group-hover:scale-105">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <span className="truncate">CAPACITA+</span>
              </Button>

              <Button
                onClick={() => scrollToSection("imuneplay")}
                className="group bg-gradient-to-br from-[#00DD4F] to-[#008C32] hover:opacity-90 text-white font-semibold py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-14 text-base shadow-md flex items-center justify-center gap-2"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full transition-transform duration-300 group-hover:scale-105">
                  <Play className="h-4 w-4" />
                </span>
                <span className="truncate">IMUNEPLAY</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
