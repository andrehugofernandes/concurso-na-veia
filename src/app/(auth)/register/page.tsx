"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registerAction } from "@/lib/actions/auth";
import { createCheckoutSession } from "@/lib/actions/stripe";
import AuthLayout from "@/components/auth/AuthLayout";
import { AnimatedInput } from "@/components/ui/animated-input";
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { StripeEmbeddedCheckout } from "@/components/stripe/StripeEmbeddedCheckout";

const NIVEIS = [
  { id: "medio", nome: "Nível Médio/Técnico", icon: "🔧", desc: "Cargos técnicos e operacionais" },
  { id: "superior", nome: "Nível Superior", icon: "🎓", desc: "Engenharia, Análise e Geologia" },
];

const CARGOS = {
  medio: [
    { id: "operacao", nome: "Técnico de Operação" },
    { id: "manutencao-mecanica", nome: "Manutenção Mecânica" },
    { id: "manutencao-eletrica", nome: "Manutenção Elétrica" },
    { id: "manutencao-instrumentacao", nome: "Manutenção Instrumentação" },
    { id: "enfermagem-trabalho", nome: "Técnico de Enfermagem do Trabalho" },
    { id: "seguranca", nome: "Segurança do Trabalho" },
    { id: "administracao", nome: "Suprimentos/Administração" },
    { id: "logistica", nome: "Logística de Transportes" },
    { id: "quimica", nome: "Química de Petróleo" },
    { id: "caixa-tecnico", nome: "Caixa - Técnico Bancário" },
    { id: "bb-escriturario", nome: "Banco do Brasil - Escriturário" },
    { id: "correios-agente", nome: "Correios - Agente de Correios" },
    { id: "ibge-recenseador", nome: "IBGE - Recenseador/Agente" },
    { id: "inss-tecnico", nome: "INSS - Técnico do Seguro Social" },
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

const STEPS = [
  { num: 1, label: "Dados" },
  { num: 2, label: "Cargo" },
  { num: 3, label: "Plano" },
  { num: 4, label: "Senha" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {STEPS.map((s, i) => {
        const done = current > s.num;
        const active = current === s.num;
        return (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-accent text-muted-foreground border border-border"
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium transition-colors ${
                  active ? "text-primary" : done ? "text-primary/70" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-2 mb-5">
                <div
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    current > s.num ? "bg-primary" : "bg-border"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

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
    concurso: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Checkout Embutido
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const concursoFromUrl = searchParams.get("concurso") || "";

  useEffect(() => {
    if (concursoFromUrl) {
      let nivel = "";
      let cargo = "";

      if (concursoFromUrl === "petrobras") {
        nivel = "medio";
        cargo = "operacao";
      } else if (concursoFromUrl === "caixa") {
        nivel = "medio";
        cargo = "caixa-tecnico";
      } else if (concursoFromUrl === "bb") {
        nivel = "medio";
        cargo = "bb-escriturario";
      } else if (concursoFromUrl === "correios") {
        nivel = "medio";
        cargo = "correios-agente";
      } else if (concursoFromUrl === "ibge") {
        nivel = "medio";
        cargo = "ibge-recenseador";
      } else if (concursoFromUrl === "inss") {
        nivel = "medio";
        cargo = "inss-tecnico";
      }

      if (nivel && cargo) {
        setFormData((prev) => ({
          ...prev,
          nivel,
          cargo,
          concurso: concursoFromUrl,
        }));
      }
    }
  }, [concursoFromUrl]);

  const handleCargoSelect = (cargoId: string) => {
    let concurso = "petrobras";
    if (cargoId === "caixa-tecnico") concurso = "caixa";
    else if (cargoId === "bb-escriturario") concurso = "bb";
    else if (cargoId === "correios-agente") concurso = "correios";
    else if (cargoId === "ibge-recenseador") concurso = "ibge";
    else if (cargoId === "inss-tecnico") concurso = "inss";

    setFormData((prev) => ({
      ...prev,
      cargo: cargoId,
      concurso,
    }));
  };

  const getPlanosByNivel = () => {
    if (formData.nivel === "medio") {
      return [
        { id: "free", nome: "Iniciante", preco: "Grátis", descricao: "5 questões/dia, histórico de 3 dias", tag: null },
        { id: "aprovado-medio", nome: "Aprovado Médio", preco: "R$ 49,99/mês", descricao: "Questões ilimitadas, simulados, explicações IA", tag: null },
        { id: "elite-medio", nome: "Elite Médio", preco: "R$ 79,99/mês", descricao: "Tudo + Professor IA 24h, Mentoria, Cronograma", tag: "POPULAR" },
        { id: "elite-total", nome: "Elite Total", preco: "R$ 149,99/mês", descricao: "Acesso a TODOS os cargos, Médio + Superior", tag: "COMPLETO" },
      ];
    } else if (formData.nivel === "superior") {
      return [
        { id: "free", nome: "Iniciante", preco: "Grátis", descricao: "5 questões/dia, histórico de 3 dias", tag: null },
        { id: "aprovado-superior", nome: "Aprovado Superior", preco: "R$ 69,99/mês", descricao: "Questões ilimitadas, simulados, explicações IA", tag: null },
        { id: "elite-superior", nome: "Elite Superior", preco: "R$ 119,99/mês", descricao: "Tudo + Professor IA 24h, Mentoria, Cronograma", tag: "RECOMENDADO" },
        { id: "elite-total", nome: "Elite Total", preco: "R$ 149,99/mês", descricao: "Acesso a TODOS os cargos, Médio + Superior", tag: "COMPLETO" },
      ];
    }
    return [];
  };

  const handleNext = async () => {
    setError("");

    if (step === 1) {
      if (!formData.nome || !formData.username || !formData.email) {
        setError("Preencha todos os campos obrigatórios");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.nivel || !formData.cargo) {
        setError("Selecione nível e cargo");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (formData.plan !== "free") {
        setLoading(true);
        try {
          const result = await createCheckoutSession({
            planKey: formData.plan,
            userData: {
              nome: formData.nome,
              email: formData.email,
              username: formData.username,
              nivel: formData.nivel,
              cargo: formData.cargo,
            },
          });
          if (result.clientSecret) {
            setClientSecret(result.clientSecret);
          } else {
            setError(result.error || "Erro ao criar sessão de pagamento");
          }
        } catch (err: any) {
          setError(err.message || "Erro ao processar pagamento");
        } finally {
          setLoading(false);
        }
      } else {
        setStep(4);
      }
      return;
    }

    if (step === 4) {
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
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const passwordChecks = [
    { ok: formData.password.length >= 12, label: "Mínimo 12 caracteres" },
    { ok: /[A-Z]/.test(formData.password), label: "Uma letra maiúscula" },
    { ok: /[a-z]/.test(formData.password), label: "Uma letra minúscula" },
    { ok: /[0-9]/.test(formData.password), label: "Um número" },
    { ok: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), label: "Um caractere especial" },
  ];

  const cargoNome = formData.cargo
    ? CARGOS[formData.nivel as keyof typeof CARGOS]?.find((c) => c.id === formData.cargo)?.nome
    : "";

  const planNome = getPlanosByNivel().find((p) => p.id === formData.plan)?.nome || formData.plan;

  return (
    <div className="flex flex-col gap-8 md:gap-10 mt-12 md:mt-20">
      {/* Título de Boas-vindas com Skin Gradient */}
      <div className="text-center md:text-left space-y-2">
        <h1 
          className="text-4xl md:text-6xl font-black tracking-tighter leading-none bg-clip-text text-transparent transition-smooth font-display whitespace-nowrap"
          style={{ backgroundImage: "var(--primary-gradient)" }}
        >
          Crie sua conta
        </h1>
        <p className="text-muted-foreground text-sm md:text-lg font-medium">
          Comece hoje sua jornada rumo à aprovação.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden transition-smooth shadow-xl">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-primary-hex via-primary-hover-hex to-primary-hex" style={{ backgroundColor: "var(--primary-hex)" }} />

      <div className="p-6 md:p-8">
        <StepIndicator current={step} />

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* =========== STEP 1: Dados Pessoais =========== */}
        {step === 1 && (
          <div className="space-y-5">
            <AnimatedInput
              id="nome"
              label="Nome completo"
              type="text"
              icon={<LuUser className="w-5 h-5" />}
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              placeholder="Seu nome completo"
              surfaceClassName="bg-card"
              inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
            />

            <AnimatedInput
              id="username"
              label="Username"
              type="text"
              icon={<LuUser className="w-5 h-5 opacity-50" />}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, "") })
              }
              required
              placeholder="usuario_exemplo"
              surfaceClassName="bg-card"
              inputClassName="bg-background border-border text-foreground rounded-xl focus:border-primary focus:ring-primary/20"
            />
            <p className="text-[10px] text-muted-foreground px-1 -mt-4">
              Seu identificador único na plataforma
            </p>

            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              icon={<LuMail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="seu@email.com"
            />
          </div>
        )}

        {/* =========== STEP 2: Nível + Cargo =========== */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Nível */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Nível do concurso</label>
              <div className="grid grid-cols-2 gap-3">
                {NIVEIS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, nivel: n.id, cargo: "" })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.nivel === n.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/80 bg-background/50"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{n.icon}</span>
                    <p className="text-foreground font-semibold text-sm">{n.nome}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{n.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cargo */}
            {formData.nivel && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Cargo pretendido</label>
                <div className="grid grid-cols-2 gap-2">
                  {CARGOS[formData.nivel as keyof typeof CARGOS].map((cargo) => (
                    <button
                      key={cargo.id}
                      type="button"
                      onClick={() => handleCargoSelect(cargo.id)}
                      className={`px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                        formData.cargo === cargo.id
                          ? "border-primary bg-primary/10 text-foreground font-medium"
                          : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                      }`}
                    >
                      {cargo.nome}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========== STEP 3: Plano =========== */}
        {step === 3 && (
          <div className="space-y-3">
            {clientSecret ? (
               <div className="mt-4 -mx-4 md:mx-0">
                 <StripeEmbeddedCheckout clientSecret={clientSecret} />
               </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-500 text-sm">
                    {NIVEIS.find((n) => n.id === formData.nivel)?.icon} {cargoNome}
                  </p>
                </div>
                {getPlanosByNivel().map((plano) => (
                  <button
                    key={plano.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: plano.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                      formData.plan === plano.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/80 bg-background/30"
                    }`}
                  >
                    {plano.tag && (
                      <span className="absolute -top-2.5 right-4 bg-yellow-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {plano.tag}
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">{plano.nome}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{plano.descricao}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-black text-yellow-400 text-lg">{plano.preco}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}
           </div>
        )}

        {/* =========== STEP 4: Senha =========== */}
        {step === 4 && (
          <div className="space-y-5">
            {/* Resumo */}
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg border border-border text-sm">
              <span className="text-primary font-bold">{planNome}</span>
              <span className="text-border">|</span>
              <span className="text-muted-foreground">{cargoNome}</span>
            </div>

            {/* Senha */}
            <AnimatedInput
              id="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              icon={<LuLock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="Crie uma senha forte"
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

            {/* Requisitos */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
              {passwordChecks.map((req, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs ${req.ok ? "text-green-400" : "text-gray-500"}`}>
                  {req.ok ? <CheckIcon /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                  {req.label}
                </div>
              ))}
            </div>

            {/* Confirmar */}
            <AnimatedInput
              id="confirmPassword"
              label="Confirmar senha"
              type={showConfirmPassword ? "text" : "password"}
              icon={<LuLock className="w-5 h-5 opacity-50" />}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              placeholder="Repita a senha"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  {showConfirmPassword ? (
                    <LuEyeOff className="w-5 h-5" />
                  ) : (
                    <LuEye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            {/* Termos */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-400">
                Li e aceito os{" "}
                <a href="#" className="text-yellow-400 hover:underline">Termos de Uso</a>{" "}
                e a{" "}
                <a href="#" className="text-yellow-400 hover:underline">Política de Privacidade</a>
              </span>
            </label>
          </div>
        )}

        {/* Navigation */}
        {(!clientSecret || step !== 3) && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-zinc-700 text-gray-300 font-semibold rounded-lg hover:bg-zinc-800 transition text-sm"
              >
                Voltar
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={
                loading ||
                (step === 2 && (!formData.nivel || !formData.cargo)) ||
                (step === 3 && !formData.plan)
              }
              className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              style={{ background: "var(--primary-gradient)" }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2 justify-center">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {step === 3 && formData.plan !== "free" ? "Gerando checkout..." : "Processando..."}
                </span>
              ) : step === 4 ? (
                "Criar Conta"
              ) : step === 3 ? (
                formData.plan === "free" ? "Continuar com plano gratuito" : "Ir para pagamento"
              ) : (
                "Continuar"
              )}
            </button>
          </div>
        )}

        {/* Login link */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition font-display">
            Fazer login
          </Link>
        </p>

        {/* Back to home */}
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition inline-flex items-center gap-2 text-sm font-medium"
          >
            <FaHome className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="relative z-10 w-full max-w-lg">
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400 mx-auto" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>
    </AuthLayout>
  );
}
