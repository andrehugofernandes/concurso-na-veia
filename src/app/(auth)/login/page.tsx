"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { OtpTutorialContent } from "@/components/auth/OtpTutorialContent";
import { AnimatedInput } from "@/components/ui/animated-input";
import { LuUser, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { FaFacebook, FaHome } from "react-icons/fa";
import { loginAction, verify2FAAction } from "@/lib/actions/auth";

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

  // Focus first OTP input when switching to OTP step
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
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP handlers
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
      const { reset2FAAction } = await import("@/lib/actions/auth");
      const result = await reset2FAAction();
      
      if (result.status === "error") throw new Error(result.error);
      
      alert("Autenticador removido com sucesso. Por favor, faça login novamente.");
      setStep("login");
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      console.error("[LoginOTP] Erro ao resetar MFA:", err);
      setOtpError("Não foi possível resetar o 2FA automaticamente.");
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
      if (step === "setup-otp") {
        const response = await fetch("/api/auth/2fa/enable", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Código inválido");
      } else {
        const result = await verify2FAAction(code);
        if (result.status === "error") throw new Error(result.error);
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("[LoginOTP] Erro na verificação:", err);
      setOtpError(err.message);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  };

  // Determine right column content
  const getRightContent = () => {
    if (step === "verify-otp") {
      return <OtpTutorialContent mode="verify" />;
    }
    if (step === "setup-otp") {
      return <OtpTutorialContent mode="setup" />;
    }
    return undefined; // Default image via AuthLayout
  };

  // Render OTP input group
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
          className="w-12 h-14 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
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
        <>
          {/* Login Form */}
          <div className="bg-white mt-12 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700/50 shadow-xl dark:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4 md:mb-6">
              Entrar na sua conta
            </h2>

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
                surfaceClassName="bg-white dark:bg-slate-800/50"
                inputClassName="bg-white dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl"
                labelClassName="text-gray-500 dark:text-gray-400"
              />

              <AnimatedInput
                id="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                icon={<LuLock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                surfaceClassName="bg-white dark:bg-slate-800/50"
                inputClassName="bg-white dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl"
                labelClassName="text-gray-500 dark:text-gray-400"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
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
                    className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Lembrar de mim
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-primary font-semibold hover:text-primary/80 transition"
                >
                  Criar conta grátis
                </Link>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-800/50 text-gray-500 dark:text-gray-400">
                    ou continue com
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-[#1877F2] hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                  <FaFacebook className="w-6 h-6" />
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center justify-center p-3 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700/50 transition"
                >
                  <FaHome className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition hidden md:inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Voltar para o início
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* OTP Form */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">🔒</span>
              <h2 className="text-2xl font-bold text-white">
                {step === "setup-otp"
                  ? "Configurar Autenticação"
                  : "Verificação em Duas Etapas"}
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Digite o código de 6 dígitos do seu aplicativo autenticador.
              </p>
            </div>

            {otpError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
                <p className="text-red-400 text-sm">{otpError}</p>
              </div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {renderOtpInputs()}

              <button
                type="submit"
                disabled={otp.join("").length !== 6 || otpLoading}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? "Verificando..." : "Confirmar"}
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4 text-center">
              {step === "verify-otp" && (
                <button
                  onClick={handleReset2FA}
                  className="text-primary hover:underline text-sm font-semibold transition-all"
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
                className="text-gray-400 hover:text-white text-sm transition"
              >
                ← Voltar para Login
              </button>
            </div>
          </div>
        </>
      )}
    </AuthLayout>
  );
}
