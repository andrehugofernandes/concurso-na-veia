"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth";
import { verifyCheckoutSession } from "@/lib/actions/stripe";

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
            email: data.customerEmail || data.metadata.user_email || "",
            nome: data.metadata.user_nome || "",
            username: data.metadata.username || "",
            nivel: data.metadata.user_nivel || "",
            cargo: data.metadata.user_cargo || "",
            plan: data.metadata.app_plan || plan || "free",
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Finalize seu cadastro
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Defina uma senha forte para sua conta
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados somente leitura do Stripe */}
          <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nome</label>
              <input
                type="text"
                value={formData.nome}
                disabled
                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded text-gray-300 text-sm opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded text-gray-300 text-sm opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                disabled
                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded text-gray-300 text-sm opacity-60"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nível</label>
                <input
                  type="text"
                  value={formData.nivel === "medio" ? "Médio" : "Superior"}
                  disabled
                  className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded text-gray-300 text-sm opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Cargo</label>
                <input
                  type="text"
                  value={formData.cargo}
                  disabled
                  className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded text-gray-300 text-sm opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Senha */}
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
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="bg-slate-700/30 p-4 rounded-xl space-y-2 border border-slate-600">
            <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
              Requisitos da senha:
            </p>
            <ul className="space-y-1">
              {[
                { len: formData.password.length >= 12, text: "Mínimo de 12 caracteres" },
                { len: /[A-Z]/.test(formData.password), text: "Pelo menos uma letra maiúscula" },
                { len: /[a-z]/.test(formData.password), text: "Pelo menos uma letra minúscula" },
                { len: /[0-9]/.test(formData.password), text: "Pelo menos um número" },
                { len: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: "Pelo menos um caractere especial" },
              ].map((req, idx) => (
                <li
                  key={idx}
                  className={`text-xs flex items-center gap-2 transition-colors ${
                    req.len ? "text-green-400 font-medium" : "text-gray-400"
                  }`}
                >
                  {req.len ? "✅" : "⭕"} {req.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Confirmar Senha */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirmar Senha
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
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Termos */}
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

          {/* Botões */}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="flex-1 py-4 border-2 border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition text-center"
            >
              Voltar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
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
    </div>
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
