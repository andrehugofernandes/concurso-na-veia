"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { OtpTutorialContent } from "@/components/auth/OtpTutorialContent";
import { AnimatedInput } from "@/components/ui/animated-input";
import { LuUser, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { FaFacebook, FaHome } from "react-icons/fa";
import { loginAction, getCurrentUserAction } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { Lock, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

type AuthStep = "login" | "verify-otp" | "setup-otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("login");

  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "verify-otp" || step === "setup-otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAction({ username, password });

      if (result.status === "error") {
        throw new Error(result.error);
      }

      if (result.data?.mfaRequired) {
        setStep("verify-otp");
      } else if (result.data?.mfaSetupRequired) {
        router.push("/auth/setup-2fa");
      } else {
        const userResult = await getCurrentUserAction();
        if (userResult.data?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    if (value.length > 1) {
      const chars = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) newOtp[i] = chars[i] || "";
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleReset2FA = async () => {
    if (!confirm("Isso removerá seu autenticador atual. Você precisará escanear um novo QR Code ao logar novamente. Continuar?")) return;
    
    setOtpLoading(true);
    setOtpError("");
    try {
      const response = await fetch("/api/auth/reset-2fa", { method: "POST" });
      const result = await response.json();
      
      if (!response.ok || !result.success) throw new Error(result.error || "Falha no reset");
      
      alert("Autenticador removido com sucesso. Por favor, faça login novamente.");

      const supabase = createClient();
      await supabase.auth.signOut();
      setStep("login");
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      console.error("[LoginOTP] Erro ao resetar MFA:", err);
      setOtpError("Não foi possível resetar o 2FA. " + (err.message || ""));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;

    setOtpLoading(true);
    setOtpError("");

    try {
      const supabase = createClient();

      if (step === "setup-otp") {
        const response = await fetch("/api/auth/2fa/enable", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Código inválido");
      } else {
        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) throw factorsError;

        const totpFactor = factors.totp.find((f) => f.status === "verified");
        if (!totpFactor) throw new Error("Nenhum fator 2FA encontrado.");

        const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
          factorId: totpFactor.id,
          code,
        });
        if (verifyError) throw verifyError;
      }
      const userResult = await getCurrentUserAction();
      if (userResult.data?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("[LoginOTP] Erro na verificação:", err);
      setOtpError(err.message || "Código incorreto ou expirado.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  };

  const getRightContent = () => {
    if (step === "verify-otp") {
      return <OtpTutorialContent mode="verify" />;
    }
    if (step === "setup-otp") {
      return <OtpTutorialContent mode="setup" />;
    }
    return undefined;
  };

  const renderOtpInputs = () => (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            otpRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleOtpKeyDown(index, e)}
          onPaste={handleOtpPaste}
          maxLength={6}
          aria-label={`Dígito ${index + 1} do código OTP`}
          className="w-10 h-14 md:w-12 md:h-16 text-center text-xl font-black bg-background border border-border rounded-xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
        />
      ))}
    </div>
  );

  return (
    <AuthLayout
      rightContent={getRightContent()}
      otpMode={step === "setup-otp" ? "setup" : "verify"}
      showHelp={step !== "login"}
    >
      {step === "login" ? (
        <div className="flex flex-col gap-8 md:gap-10 mt-12 md:mt-20">
          <div className="text-center md:text-left space-y-2">
            <h1 
              className="text-2xl md:text-5xl text-center md:text-center font-black tracking-tighter leading-none bg-clip-text text-transparent transition-smooth font-display whitespace-nowrap"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Acesse sua conta
            </h1>
            <p className="text-center md:text-center text-muted-foreground text-sm md:text-lg font-medium">
              Bem-vindo de volta! Continue sua jornada.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl transition-smooth overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundImage: "var(--primary-gradient)" }} />

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <AnimatedInput
                id="username"
                label="Nome de Usuário"
                icon={<LuUser className="w-5 h-5" />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                surfaceClassName="bg-card"
                inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
                labelClassName="text-muted-foreground"
              />

              <AnimatedInput
                id="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                icon={<LuLock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                surfaceClassName="bg-card"
                inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
                labelClassName="text-muted-foreground"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? (
                      <LuEyeOff className="w-5 h-5" />
                    ) : (
                      <LuEye className="w-5 h-5" />
                    )}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Lembrar de mim
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-extrabold rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
                style={{ background: "var(--primary-gradient)" }}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-primary font-bold hover:underline transition"
                >
                  Criar conta grátis
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl w-fit mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground">
              {step === "setup-otp"
                ? "Configurar Autenticação"
                : "Verificação em Duas Etapas"}
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              Digite o código de 6 dígitos do seu aplicativo autenticador.
            </p>
          </div>

          {otpError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
              <p className="text-red-400 text-xs font-semibold">{otpError}</p>
            </div>
          )}

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            {renderOtpInputs()}

            <button
              type="submit"
              disabled={otp.join("").length !== 6 || otpLoading}
              className="w-full py-3.5 bg-primary text-primary-foreground font-extrabold rounded-xl hover:opacity-90 transition shadow-md disabled:opacity-50 text-sm uppercase tracking-wider"
              style={{ background: "var(--primary-gradient)" }}
            >
              {otpLoading ? "Verificando..." : "Confirmar Código"}
            </button>
          </form>

          <div className="flex flex-col gap-3 text-center pt-2 border-t border-border/60">
            {step === "verify-otp" && (
              <button
                onClick={handleReset2FA}
                className="text-xs text-primary hover:underline font-semibold transition"
              >
                Perdeu acesso ao autenticador? Resete aqui
              </button>
            )}
            <button
              onClick={() => {
                setStep("login");
                setOtp(["", "", "", "", "", ""]);
                setOtpError("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground font-medium transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para Login
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
