"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import AuthLayout from "@/components/auth/AuthLayout";
import { OtpTutorialContent } from "@/components/auth/OtpTutorialContent";
import { enrollMFAAction, verify2FAAction, getCurrentUserAction } from "@/lib/actions/auth";

export default function Setup2FAPage() {
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [isDark, setIsDark] = useState(false);

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [factorId, setFactorId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Detectar o tema real do DOM de forma resiliente
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    const initSetup = async () => {
      try {
        const supabase = (await import("@/lib/supabase/client")).createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const result = await enrollMFAAction();
        if (result.status === "error" || !result.data) {
          setError(result.error || "Erro ao iniciar configuração");
          return;
        }

        setFactorId(result.data.id);
        setSecret(result.data.totp.secret);

        // MODIFICAÇÃO: Injetar o nome AVAGAEHMINHA na URI do QR Code
        // URI original do Supabase é algo como:
        // otpauth://totp/localhost:3000:user@email.com?secret=xxx&issuer=localhost:3000
        let uri = result.data.totp.uri;
        if (uri) {
          try {
            const urlObj = new URL(uri);
            const userEmail = user?.email || "usuario";
            
            // Alterar o path (label) e o parâmetro issuer
            urlObj.pathname = `Passei no Concurso:${userEmail}`;
            urlObj.searchParams.set("issuer", "Passei no Concurso");
            uri = urlObj.toString();
          } catch (e) {
            console.warn("Falha ao personalizar URI do MFA:", e);
          }
        }

        const qrUrl = await QRCode.toDataURL(uri);
        setQrCodeUrl(qrUrl);
      } catch (err: any) {
        console.error("Error setup 2FA:", err);
        setError(err.message || "Erro ao iniciar configuração do 2FA");
      } finally {
        setLoading(false);
      }
    };

    initSetup();
    return () => observer.disconnect();
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    if (value.length > 1) {
      const pastedData = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "")
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const verifyAndActivate = async () => {
    setError("");
    const code = otp.join("");
    try {
      const result = await verify2FAAction(code, factorId);

      if (result.status === "error") throw new Error(result.error);

      // Success! Redirect based on role
      const userResult = await getCurrentUserAction();
      if (userResult.data?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("Código inválido. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  return (
    <AuthLayout
      otpMode="setup"
      showHelp
      rightContent={<OtpTutorialContent mode="setup" />}
    >
      <div
        className="backdrop-blur-xl rounded-3xl p-6 md:p-8 border shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: isDark
            ? "rgba(15, 23, 42, 0.4)"
            : "rgba(255, 255, 255, 0.95)",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center mb-6 md:mb-8">
          <div
            className="inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl mb-3 md:mb-4 ring-1 ring-amber-500/20"
            style={{
              backgroundColor: isDark
                ? "rgba(245, 158, 11, 0.1)"
                : "rgba(245, 158, 11, 0.05)",
            }}
          >
            <span className="text-2xl md:text-3xl">🛡️</span>
          </div>
          <h1 className="font-bebas text-3xl md:text-4xl font-bold text-foreground">
            Configuração de 2FA
          </h1>
          <p className="text-foreground/50 mt-1 md:mt-2 text-xs md:text-sm leading-relaxed">
            Escaneie o QR Code abaixo com seu aplicativo autenticador para
            proteger sua conta.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4 md:mb-6 text-center animate-shake">
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div
            className="p-6 rounded-2xl border transition-colors"
            style={{
              backgroundColor: isDark
                ? "rgba(30, 41, 59, 0.3)"
                : "rgba(248, 250, 252, 0.8)",
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4">
              Passo 1: Escaneie o código
            </p>
            <div className="flex justify-center bg-white p-4 rounded-2xl w-fit mx-auto mb-4 shadow-xl">
              {qrCodeUrl && (
                <Image
                  src={qrCodeUrl}
                  alt="QR Code 2FA"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="text-center">
              <span className="text-[10px] text-foreground/40 font-mono break-all px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full select-all">
                {secret}
              </span>
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border transition-colors"
            style={{
              backgroundColor: isDark
                ? "rgba(30, 41, 59, 0.3)"
                : "rgba(248, 250, 252, 0.8)",
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4">
              Passo 2: Digite o código gerado
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-10 h-14 md:w-12 md:h-16 rounded-xl text-foreground text-center text-2xl md:text-3xl font-bebas font-bold transition-all focus:outline-none focus:ring-2 border"
                  style={
                    {
                      backgroundColor: isDark
                        ? "rgba(30, 41, 59, 0.5)"
                        : "#ffffff",
                      borderColor: digit
                        ? "var(--primary-hex)"
                        : isDark
                          ? "rgba(51, 65, 85, 1)"
                          : "rgba(209, 213, 219, 1)",
                      "--tw-ring-color": "var(--primary-hex)",
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <button
              onClick={verifyAndActivate}
              disabled={otp.join("").length !== 6}
              className="w-full py-4 text-white font-bebas font-bold text-2xl uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                backgroundColor: "var(--primary-hex)",
                boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.3)",
              }}
            >
              Verificar e Ativar
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors"
          >
            ← Cancelar e voltar
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
