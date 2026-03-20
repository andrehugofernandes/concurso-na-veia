"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth";
import { verifyCheckoutSession } from "@/lib/actions/stripe";
import AuthLayout from "@/components/auth/AuthLayout";
import { LuCheck, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { AnimatedInput } from "@/components/ui/animated-input";

function CompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const plan = searchParams.get("plan");

  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nivel: "",
    cargo: "",
    plan: plan || "free",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Carregar dados da sessão do Stripe
  useEffect(() => {
    const loadSessionData = async () => {
      if (!sessionId) {
        setError("Sessão não encontrada");
        setLoading(false);
        return;
      }

      try {
        const data = await verifyCheckoutSession(sessionId);

        if (data.success && data.metadata) {
          setFormData((prev) => ({
            ...prev,
            email: data.customerEmail || data.metadata?.user_email || "",
            nome: data.metadata?.user_nome || "",
            username: data.metadata?.username || "",
            nivel: data.metadata?.user_nivel || "",
            cargo: data.metadata?.user_cargo || "",
            plan: data.metadata?.app_plan || plan || "free",
          }));
        } else {
          setError("Erro ao carregar dados da sessão");
        }
      } catch (err: any) {
        setError("Erro ao processar: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSessionData();
  }, [sessionId, plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const origin = typeof window !== "undefined" ? window.location.origin : "";
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

  if (loading && !formData.nome) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="bg-white dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700/50 shadow-xl mt-12">
        <div className="text-center mb-6">
          <LuCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Finalize seu cadastro
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Defina uma senha forte para sua conta
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados somente leitura do Stripe */}
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nome</label>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{formData.nome}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{formData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-slate-700 pt-3">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Username</label>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">@{formData.username}</p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nível</label>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{formData.nivel === "medio" ? "Médio" : "Superior"}</p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Plano</label>
                <p className="text-sm font-bold text-primary uppercase">{formData.plan}</p>
              </div>
            </div>
          </div>

          {/* Senha */}
          <AnimatedInput
            id="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            icon={<LuLock className="w-5 h-5 opacity-50" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="Crie uma senha forte"
            surfaceClassName="bg-card"
            inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition"
                tabIndex={-1}
              >
                {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
              </button>
            }
          />

          {/* Password Requirements */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl space-y-2 border border-gray-200 dark:border-slate-700">
            <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">
              Requisitos mínimos:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {[
                { len: formData.password.length >= 12, text: "12+ caracteres" },
                { len: /[A-Z]/.test(formData.password), text: "Letra maiúscula" },
                { len: /[a-z]/.test(formData.password), text: "Letra minúscula" },
                { len: /[0-9]/.test(formData.password), text: "Um número" },
                { len: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: "Especial" },
              ].map((req, idx) => (
                <li
                  key={idx}
                  className={`text-xs flex items-center gap-2 transition-colors ${
                    req.len ? "text-green-500 font-medium" : "text-gray-400"
                  }`}
                >
                  {req.len ? "✅" : "⭕"} {req.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Confirmar Senha */}
          <AnimatedInput
            id="confirmPassword"
            label="Confirmar Senha"
            type={showConfirmPassword ? "text" : "password"}
            icon={<LuLock className="w-5 h-5 opacity-50" />}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            placeholder="Repita a senha"
            surfaceClassName="bg-card"
            inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
            trailing={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground transition"
                tabIndex={-1}
              >
                {showConfirmPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
              </button>
            }
          />

          {/* Termos */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
              Li e aceito os{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Política de Privacidade
              </a>
            </span>
          </label>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]"
              style={{ background: "var(--primary-gradient)" }}
            >
              {loading ? "Criando conta..." : "Criar Minha Conta"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:text-primary/80 transition"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400" />
      </div>
    }>
      <CompleteContent />
    </Suspense>
  );
}
