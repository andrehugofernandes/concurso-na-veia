"use client";

import { ReactNode } from "react";

interface OtpTutorialContentProps {
  mode: "setup" | "verify";
}

export function OtpTutorialContent({ mode }: OtpTutorialContentProps) {
  const steps =
    mode === "setup"
      ? [
          {
            number: "01",
            icon: "📲",
            title: "Baixe um Autenticador",
            description:
              "Instale o Google Authenticator ou Microsoft Authenticator na loja de apps do seu celular.",
          },
          {
            number: "02",
            icon: "📷",
            title: "Escaneie o QR Code",
            description:
              'No app autenticador, toque no botão "+" e escaneie o QR Code que aparece na tela.',
          },
          {
            number: "03",
            icon: "🔢",
            title: "Digite o Código",
            description:
              "O app vai gerar um código de 6 dígitos. Digite esse código no campo ao lado para ativar a proteção.",
          },
        ]
      : [
          {
            number: "01",
            icon: "📱",
            title: "Abra o Autenticador",
            description:
              "Abra o Google Authenticator ou o app que você usou para configurar sua conta.",
          },
          {
            number: "02",
            icon: "🔍",
            title: "Encontre sua Conta",
            description:
              'Procure por "A Vaga é Minha" ou "Petrobras Quest" na lista de contas do app.',
          },
          {
            number: "03",
            icon: "⌨️",
            title: "Digite o Código",
            description:
              "O app mostra um código de 6 dígitos que muda a cada 30 segundos. Digite-o no campo ao lado.",
          },
        ];

  return (
    <div className="relative flex flex-col h-full justify-center px-6 py-8 md:px-10 md:py-12 overflow-hidden">
      {/* Background Glow matching Image 2 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg opacity-30 pointer-events-none z-0">
        <div
          className="absolute inset-0 blur-[100px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary-hex) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="text-center md:text-left mb-8">
          <span
            className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 border"
            style={{
              backgroundColor: "rgba(var(--primary-rgb, 245, 158, 11), 0.1)",
              color: "var(--primary-hex)",
              borderColor: "rgba(var(--primary-rgb, 245, 158, 11), 0.3)",
            }}
          >
            {mode === "setup" ? "Passo a Passo" : "Verificação"}
          </span>
          <h2 className="font-bebas text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            {mode === "setup" ? "Como configurar" : "Como verificar"}
          </h2>
          <p className="text-foreground/50 text-xs md:text-sm leading-relaxed max-w-md">
            {mode === "setup"
              ? "Siga estas etapas simples para ativar a proteção extra em sua conta."
              : "Acesse seu aplicativo autenticador para obter o token de acesso temporário."}
          </p>
        </div>

        <div className="space-y-5">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4 items-start group">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl group-hover:scale-105 transition-all duration-300 shadow-xl"
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.4)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 16px -4px rgba(0,0,0,0.4)",
                }}
              >
                {step.icon}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    style={{ color: "var(--primary-hex)" }}
                    className="text-[10px] font-bold font-mono"
                  >
                    {step.number}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-foreground/40 text-[11px] md:text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-5 rounded-2xl border backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex gap-3 items-start">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-[10px] md:text-xs text-foreground/60 leading-relaxed font-medium">
                <span className="text-foreground font-bold">Dica:</span> O
                código muda a cada 30 segundos. Se o código expirar no app,
                aguarde o próximo ser gerado e tente novamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
