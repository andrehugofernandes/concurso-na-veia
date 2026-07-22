"use client";

import { Smartphone, QrCode, KeyRound, Search, Lock, Lightbulb } from "lucide-react";

interface OtpTutorialContentProps {
  mode: "setup" | "verify";
}

export function OtpTutorialContent({ mode }: OtpTutorialContentProps) {
  const steps =
    mode === "setup"
      ? [
          {
            number: "01",
            icon: <Smartphone className="w-6 h-6 text-amber-400" />,
            title: "Baixe um Autenticador",
            description:
              "Instale o Google Authenticator ou Microsoft Authenticator na loja de apps do seu celular.",
          },
          {
            number: "02",
            icon: <QrCode className="w-6 h-6 text-amber-400" />,
            title: "Escaneie o QR Code",
            description:
              'No app autenticador, toque no botão "+" e escaneie o QR Code que aparece na tela.',
          },
          {
            number: "03",
            icon: <KeyRound className="w-6 h-6 text-amber-400" />,
            title: "Digite o Código",
            description:
              "O app vai gerar um código de 6 dígitos. Digite esse código no campo ao lado para ativar a proteção.",
          },
        ]
      : [
          {
            number: "01",
            icon: <Smartphone className="w-6 h-6 text-amber-400" />,
            title: "Abra o Autenticador",
            description:
              "Abra o Google Authenticator ou o aplicativo que você utilizou no cadastro.",
          },
          {
            number: "02",
            icon: <Search className="w-6 h-6 text-amber-400" />,
            title: "Encontre sua Conta",
            description:
              'Procure por "Concurso Na Veia" na lista de contas do aplicativo.',
          },
          {
            number: "03",
            icon: <Lock className="w-6 h-6 text-amber-400" />,
            title: "Digite o Código",
            description:
              "O aplicativo mostrará um código de 6 dígitos que muda a cada 30 segundos. Digite-o ao lado.",
          },
        ];

  return (
    <div className="relative flex flex-col h-full justify-center px-6 py-8 md:px-10 md:py-12 overflow-hidden">
      {/* Glow ambiente suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg opacity-25 pointer-events-none z-0">
        <div
          className="absolute inset-0 blur-[120px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary-hex, #ff8500) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="text-center md:text-left space-y-2">
          <span className="inline-block px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {mode === "setup" ? "Passo a Passo de Ativação" : "Segurança da Conta"}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {mode === "setup" ? "Como configurar" : "Como verificar"}
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-md">
            {mode === "setup"
              ? "Siga estas etapas simples para ativar a autenticação em duas etapas."
              : "Acesse seu aplicativo autenticador para obter o código de acesso temporário."}
          </p>
        </div>

        {/* Passos */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-4 items-start p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-slate-700 transition-all group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md">
                {step.icon}
              </div>
              <div className="flex-1 min-w-0 pt-0.5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold font-mono text-amber-400">
                    {step.number}
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-300/90 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Card Dica */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-bold">Dica:</strong> O código é renovado a cada 30 segundos. Se o tempo expirar, utilize o novo código gerado pelo aplicativo.
          </p>
        </div>
      </div>
    </div>
  );
}
