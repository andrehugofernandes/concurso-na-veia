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
            number: "1",
            icon: "📲",
            title: "Baixe um Autenticador",
            description:
              "Instale o Google Authenticator ou Microsoft Authenticator na loja de apps do seu celular.",
          },
          {
            number: "2",
            icon: "📷",
            title: "Escaneie o QR Code",
            description:
              'No app autenticador, toque no botão "+" e escaneie o QR Code que aparece na tela.',
          },
          {
            number: "3",
            icon: "🔢",
            title: "Digite o Código",
            description:
              "O app vai gerar um código de 6 dígitos. Digite esse código no campo ao lado para ativar a proteção.",
          },
        ]
      : [
          {
            number: "1",
            icon: "📱",
            title: "Abra o Autenticador",
            description:
              "Abra o Google Authenticator ou o app que você usou para configurar sua conta.",
          },
          {
            number: "2",
            icon: "🔍",
            title: "Encontre sua Conta",
            description:
              'Procure por "A Vaga é Minha" ou "Petrobras Quest" na lista de contas do app.',
          },
          {
            number: "3",
            icon: "⌨️",
            title: "Digite o Código",
            description:
              "O app mostra um código de 6 dígitos que muda a cada 30 segundos. Digite-o no campo ao lado.",
          },
        ];

  return (
    <div className="flex flex-col h-full justify-center px-6 py-8 md:px-10 md:py-12">
      <div className="mb-8">
        <span
          className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border"
          style={{
            backgroundColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.15)",
            color: "var(--primary-hex)",
            borderColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.3)",
          }}
        >
          {mode === "setup" ? "Primeira vez?" : "Verificação"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {mode === "setup" ? "Como configurar" : "Como verificar"}
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          {mode === "setup"
            ? "Configure a autenticação em dois fatores para proteger sua conta."
            : "Acesse seu app autenticador para obter o código de verificação."}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4 items-start group">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200 shadow-lg"
              style={{
                backgroundColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.1)",
                borderColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.2)",
              }}
            >
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <span
                  style={{ color: "var(--primary-hex)" }}
                  className="text-xs font-mono"
                >
                  0{step.number}
                </span>
                {step.title}
              </h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <p className="text-xs text-white/40 leading-relaxed">
          <span className="font-semibold text-white/60">💡 Dica:</span> O código
          muda a cada 30 segundos. Se o código expirar, aguarde o próximo e
          tente novamente.
        </p>
      </div>
    </div>
  );
}
