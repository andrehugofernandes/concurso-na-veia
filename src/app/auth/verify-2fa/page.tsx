"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import AuthLayout from "@/components/auth/AuthLayout";
import { OtpTutorialContent } from "@/components/auth/OtpTutorialContent";
import { useTheme } from "@/lib/contexts/theme-context";

export default function Verify2FAPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ... (manter lógica de handleChange, handleKeyDown, handlePaste, handleVerify)
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
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const code = otp.join("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: factors, error: factorsError } =
        await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;
      const totpFactor = factors.totp.find((f) => f.status === "verified");
      if (!totpFactor) {
        setError("Nenhum fator 2FA encontrado.");
        return;
      }
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: totpFactor.id,
        code,
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Código incorreto ou expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      otpMode="verify"
      showHelp
      rightContent={<OtpTutorialContent mode="verify" />}
    >
      <div className="w-full max-w-md mx-auto">
        <div
          className="rounded-3xl p-6 md:p-10 border shadow-xl transition-all duration-300"
          style={{
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="text-center mb-6 md:mb-8">
            <div
              className="inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl mb-3 md:mb-4 ring-1"
              style={{
                backgroundColor: isDark
                  ? "rgba(var(--primary-rgb), 0.1)"
                  : "rgba(var(--primary-rgb), 0.05)",
                borderColor: "rgba(var(--primary-rgb), 0.2)",
              }}
            >
              <span className="text-2xl md:text-3xl">🔒</span>
            </div>
            <h1 className="font-bebas text-3xl md:text-4xl font-bold text-foreground">
              Verificação em 2 Fatores
            </h1>
            <p className="text-foreground/50 mt-1 md:mt-2 text-xs md:text-sm leading-relaxed">
              Digite o código de 6 dígitos gerado pelo seu aplicativo
              autenticador.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4 md:mb-6 text-center animate-shake">
              <p className="text-red-500 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6 md:space-y-8">
            <div className="flex justify-center gap-2">
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
                  className="w-12 h-16 rounded-xl text-foreground text-center text-3xl font-bebas transition-all focus:outline-none focus:ring-2 border"
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
              type="submit"
              disabled={otp.join("").length !== 6 || loading}
              className="w-full py-4 text-white font-bebas text-2xl uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                backgroundColor: "var(--primary-hex)",
                boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.3)",
              }}
            >
              {loading ? "Processando..." : "Confirmar Acesso"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/login")}
              className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors"
            >
              ← Voltar para a tela de login
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
