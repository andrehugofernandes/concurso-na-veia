"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registerAction } from "@/lib/actions/auth";

const NIVEIS = [
  { id: "medio", nome: "Nível Médio/Técnico", icon: "🔧" },
  { id: "superior", nome: "Nível Superior", icon: "🎓" },
];

const CARGOS = {
  medio: [
    { id: "operacao", nome: "Técnico de Operação" },
    { id: "manutencao-mecanica", nome: "Manutenção Mecânica" },
    { id: "manutencao-eletrica", nome: "Manutenção Elétrica" },
    { id: "manutencao-instrumentacao", nome: "Manutenção Instrumentação" },
    { id: "seguranca", nome: "Segurança do Trabalho" },
    { id: "administracao", nome: "Suprimentos/Administração" },
    { id: "logistica", nome: "Logística de Transportes" },
    { id: "quimica", nome: "Química de Petróleo" },
  ],
  superior: [
    { id: "eng-petroleo", nome: "Engenheiro de Petróleo" },
    { id: "eng-mecanico", nome: "Engenheiro Mecânico" },
    { id: "eng-eletrico", nome: "Engenheiro Elétrico" },
    { id: "eng-civil", nome: "Engenheiro Civil" },
    { id: "analista-sistemas", nome: "Analista de Sistemas" },
    { id: "analista-admin", nome: "Analista de Administração" },
    { id: "geologo", nome: "Geólogo" },
    { id: "economista", nome: "Economista" },
  ],
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan") || "free";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nivel: "",
    cargo: "",
    plan: planFromUrl,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const requirements = [
      formData.password.length >= 12,
      /[A-Z]/.test(formData.password),
      /[a-z]/.test(formData.password),
      /[0-9]/.test(formData.password),
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    ];

    if (!requirements.every(Boolean)) {
      setError("A senha não atende aos requisitos de segurança.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const result = await registerAction(formData, origin);

      if (result.status === "error") {
        throw new Error(result.error);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
      <h1 className="text-2xl font-bold text-white text-center mb-2">
        {step === 1 && "Criar sua conta"}
        {step === 2 && "Escolha sua área"}
        {step === 3 && "Finalize seu cadastro"}
      </h1>
      <p className="text-gray-400 text-center mb-6">
        {step === 1 && "Passo 1: Informações básicas"}
        {step === 2 && "Passo 2: Para qual cargo você vai estudar?"}
        {step === 3 && "Passo 3: Defina sua senha"}
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome de Usuário (Login)
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value.toLowerCase().replace(/\s/g, ""),
                  })
                }
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                placeholder="usuario_exemplo"
              />
              <p className="text-xs text-gray-500 mt-1">
                Este será seu identificador único no sistema.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                placeholder="seu@email.com"
              />
            </div>
          </>
        )}

        {/* Step 2: Select Level and Position */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Nível do concurso
              </label>
              <div className="grid grid-cols-2 gap-4">
                {NIVEIS.map((nivel) => (
                  <button
                    key={nivel.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, nivel: nivel.id, cargo: "" })
                    }
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.nivel === nivel.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <span className="text-2xl">{nivel.icon}</span>
                    <p className="text-white font-medium mt-2">{nivel.nome}</p>
                  </button>
                ))}
              </div>
            </div>

            {formData.nivel && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Cargo pretendido
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {CARGOS[formData.nivel as keyof typeof CARGOS].map(
                    (cargo) => (
                      <button
                        key={cargo.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, cargo: cargo.id })
                        }
                        className={`p-3 rounded-lg border text-left text-sm transition-all ${
                          formData.cargo === cargo.id
                            ? "border-yellow-500 bg-yellow-500/10 text-white"
                            : "border-slate-600 text-gray-300 hover:border-slate-500"
                        }`}
                      >
                        {cargo.nome}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition pr-12"
                placeholder="Crie uma senha forte"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-white transition"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Requirements Checklist */}
            <div className="bg-slate-700/30 p-4 rounded-xl space-y-2 border border-slate-600">
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                Requisitos da senha:
              </p>
              <ul className="space-y-1">
                <li
                  className={`text-xs flex items-center gap-2 transition-colors ${formData.password.length >= 12 ? "text-green-400 font-medium" : "text-gray-400"}`}
                >
                  {formData.password.length >= 12 ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                  Mínimo de 12 caracteres
                </li>
                <li
                  className={`text-xs flex items-center gap-2 transition-colors ${/[A-Z]/.test(formData.password) ? "text-green-400 font-medium" : "text-gray-400"}`}
                >
                  {/[A-Z]/.test(formData.password) ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                  Pelo menos uma letra maiúscula
                </li>
                <li
                  className={`text-xs flex items-center gap-2 transition-colors ${/[a-z]/.test(formData.password) ? "text-green-400 font-medium" : "text-gray-400"}`}
                >
                  {/[a-z]/.test(formData.password) ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                  Pelo menos uma letra minúscula
                </li>
                <li
                  className={`text-xs flex items-center gap-2 transition-colors ${/[0-9]/.test(formData.password) ? "text-green-400 font-medium" : "text-gray-400"}`}
                >
                  {/[0-9]/.test(formData.password) ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                  Pelo menos um número
                </li>
                <li
                  className={`text-xs flex items-center gap-2 transition-colors ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-green-400 font-medium" : "text-gray-400"}`}
                >
                  {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                  Pelo menos um caractere especial (!@#$...)
                </li>
              </ul>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar senha
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition pr-12"
                placeholder="Repita a senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Plan Selection */}
            <div className="p-4 rounded-xl border border-slate-600 bg-slate-700/30">
              <p className="text-sm text-gray-400 mb-2">Plano selecionado:</p>
              <p className="text-white font-semibold">
                {formData.plan === "pro" && "🚀 Pro - R$ 29/mês"}
                {formData.plan === "enterprise" && "💎 Enterprise - R$ 99/mês"}
                {formData.plan === "free" && "🆓 Gratuito"}
              </p>
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-400">
                Li e aceito os{" "}
                <a href="#" className="text-yellow-400 hover:underline">
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a href="#" className="text-yellow-400 hover:underline">
                  Política de Privacidade
                </a>
              </span>
            </label>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 border-2 border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={
              loading || (step === 2 && (!formData.nivel || !formData.cargo))
            }
            className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                Criando conta...
              </span>
            ) : step === 3 ? (
              "Criar Conta"
            ) : (
              "Continuar"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <span className="text-4xl">🛢️</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Petrobras Quest AI
            </span>
          </Link>
        </div>

        {/* Progress Steps (moved inside component if needed, or kept here if stateless) */}
        {/* For simplicity, let's keep progress steps inside the form component or move them there. 
                     Wait, the steps logical state is inside RegisterForm now. The indicator needs access to 'step'.
                     Better move the indicator INSIDE RegisterForm to avoid prop drilling complex state.
                 */}

        <Suspense
          fallback={
            <div className="text-white text-center">
              Carregando formulário...
            </div>
          }
        >
          <RegisterForm />
        </Suspense>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition inline-flex items-center gap-2"
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
      </div>
    </div>
  );
}
