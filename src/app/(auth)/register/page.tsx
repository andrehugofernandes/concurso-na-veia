"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registerAction } from "@/lib/actions/auth";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { createInfinitePayPixChargeRegister } from "@/lib/actions/infinitepay";
import { InfinitePayPixModal } from "@/components/checkout/InfinitePayPixModal";
import AuthLayout from "@/components/auth/AuthLayout";
import { AnimatedInput } from "@/components/ui/animated-input";
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff, LuQrCode } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { StripeEmbeddedCheckout } from "@/components/stripe/StripeEmbeddedCheckout";
import { PROFISSOES } from "@/lib/profissoes-edital";

const NIVEIS = [
  { id: "medio", nome: "Nível Médio", icon: "📖", desc: "Cargos gerais de nível médio" },
  { id: "tecnico", nome: "Nível Técnico", icon: "🔧", desc: "Cargos técnicos e operacionais" },
  { id: "superior", nome: "Nível Superior", icon: "🎓", desc: "Engenharia, Análise e Geologia" },
];

const PETROBRAS_CARGOS_TECNICO = PROFISSOES.filter((p) => p.nivel === "tecnico").map((p) => ({
  id: p.id,
  nome: `Petrobras - ${p.nome}`,
}));

const PETROBRAS_CARGOS_SUPERIOR = PROFISSOES.filter((p) => p.nivel === "superior").map((p) => ({
  id: p.id,
  nome: `Petrobras - ${p.nome}`,
}));

const CARGOS = {
  medio: [
    { id: "suprimento-adm", nome: "Petrobras - Técnico de Suprimento de Bens e Serviços - Administração" },
    { id: "caixa-tecnico", nome: "Caixa - Técnico Bancário" },
    { id: "bb-escriturario", nome: "Banco do Brasil - Escriturário" },
    { id: "correios-agente", nome: "Correios - Agente de Correios" },
    { id: "ibge-recenseador", nome: "IBGE - Recenseador/Agente" },
    { id: "inss-tecnico", nome: "INSS - Técnico do Seguro Social" },
    { id: "ata-mf", nome: "ATA-MF - Assistente Técnico Administrativo" },
  ],
  tecnico: [
    ...PETROBRAS_CARGOS_TECNICO,
  ],
  superior: [
    ...PETROBRAS_CARGOS_SUPERIOR,
  ],
};

function Activity({ mode, children }: { mode: "visible" | "hidden"; children: React.ReactNode }) {
  return (
    <div style={{ display: mode === "visible" ? "block" : "none" }} aria-hidden={mode === "hidden"}>
      {children}
    </div>
  );
}

const STEPS = [
  { num: 1, label: "Dados" },
  { num: 2, label: "Cargo" },
  { num: 3, label: "Plano" },
  { num: 4, label: "Senha" },
];

function StepIndicator({
  current,
  onStepClick,
}: {
  current: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {STEPS.map((s, i) => {
        const done = current > s.num;
        const active = current === s.num;
        return (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            {/* Clickable Circle & Label */}
            <button
              type="button"
              onClick={() => onStepClick?.(s.num)}
              className="flex flex-col items-center group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110 ${
                  done
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : active
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md"
                      : "bg-accent text-muted-foreground border border-border group-hover:border-primary/50"
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
                  active
                    ? "text-primary font-bold"
                    : done
                      ? "text-primary/70 font-semibold"
                      : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
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

// Normaliza o slug do concurso para o ID interno (ex: 'banco-do-brasil' → 'bb')
function normalizeConcursoSlug(slug: string): string {
  const map: Record<string, string> = {
    "banco-do-brasil": "bb",
    "banco-brasil": "bb",
    "caixa-economica-federal": "caixa",
    "caixa-economica": "caixa",
    "correios-ecf": "correios",
    "inss-prev": "inss",
  };
  return map[slug] || slug;
}

function normalizeNivel(nivel: string): string {
  if (!nivel) return "";
  const n = nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (n.includes("medio")) return "medio";
  if (n.includes("tecnico")) return "tecnico";
  if (n.includes("superior")) return "superior";
  return n;
}

// Resolve nivel+cargo a partir do concurso normalizado (fallback quando não vem na URL)
function resolveNivelCargoByConcurso(concurso: string): { nivel: string; cargo: string } | null {
  switch (concurso) {
    case "petrobras": return { nivel: "tecnico", cargo: "operacao" };
    case "caixa":     return { nivel: "medio",   cargo: "caixa-tecnico" };
    case "bb":        return { nivel: "medio",   cargo: "bb-escriturario" };
    case "correios":  return { nivel: "medio",   cargo: "correios-agente" };
    case "ibge":      return { nivel: "medio",   cargo: "ibge-recenseador" };
    case "inss":      return { nivel: "medio",   cargo: "inss-tecnico" };
    case "ata-mf":    return { nivel: "medio",   cargo: "ata-mf" };
    default:          return null;
  }
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan") || "free";

  const rawConcurso  = searchParams.get("concurso") || "";
  const concursoFromUrl = normalizeConcursoSlug(rawConcurso);
  const cargoFromUrl    = searchParams.get("cargo")  || "";
  const nivelFromUrl    = normalizeNivel(searchParams.get("nivel") || "");

  // Resolve nivel/cargo de forma síncrona (lazy init) para evitar render vazio no Step 3
  const resolvedInit = (() => {
    if (!concursoFromUrl) return { nivel: "", cargo: "", concurso: "" };
    let nivel = nivelFromUrl;
    let cargo = cargoFromUrl;
    if (!nivel || !cargo) {
      const resolved = resolveNivelCargoByConcurso(concursoFromUrl);
      if (resolved) { nivel = resolved.nivel; cargo = resolved.cargo; }
    }
    return { nivel: normalizeNivel(nivel), cargo, concurso: concursoFromUrl };
  })();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nivel: resolvedInit.nivel,
    cargo: resolvedInit.cargo,
    plan: planFromUrl,
    concurso: resolvedInit.concurso,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Checkout Gateway ('stripe' ou 'efi')
  const [paymentGateway, setPaymentGateway] = useState<"stripe" | "efi">("stripe");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [efiPixData, setEfiPixData] = useState<any>(null);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);

  // Sinaliza que veio da vitrine com cargo pré-selecionado → pular Passo 2
  const cameFromUrlWithCargo = !!(concursoFromUrl && (cargoFromUrl || resolvedInit.cargo));
  const [, setCameFromUrlWithCargo] = useState(cameFromUrlWithCargo);


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
    const nivelNorm = normalizeNivel(formData.nivel);
    if (nivelNorm === "medio" || nivelNorm === "tecnico") {
      return [
        { id: "free", nome: "Iniciante", preco: "Grátis", descricao: "5 questões/dia, histórico de 3 dias", tag: null },
        { id: "aprovado-medio", nome: "Aprovado Médio", preco: "R$ 49,99", descricao: "Questões ilimitadas, simulados, explicações IA", tag: null },
        { id: "elite-medio", nome: "Elite Médio", preco: "R$ 79,99", descricao: "Tudo + NaVeiaLingo (Inglês), Mentoria, Cronograma", tag: "POPULAR" },
        { id: "elite-total", nome: "Elite Total", preco: "R$ 149,99", descricao: "Acesso a TODOS os cargos, Médio + Superior", tag: "COMPLETO" },
        { id: "vitalis-total", nome: "Vitalis Total", preco: "R$ 650,00", descricao: "Acesso VITALÍCIO a TODOS os concursos presentes e futuros da plataforma", tag: "VITALÍCIO VIP" },
      ];
    } else if (nivelNorm === "superior") {
      return [
        { id: "free", nome: "Iniciante", preco: "Grátis", descricao: "5 questões/dia, histórico de 3 dias", tag: null },
        { id: "aprovado-superior", nome: "Aprovado Superior", preco: "R$ 69,99", descricao: "Questões ilimitadas, simulados, explicações IA", tag: null },
        { id: "elite-superior", nome: "Elite Superior", preco: "R$ 119,99", descricao: "Tudo + NaVeiaLingo (Inglês), Mentoria, Cronograma", tag: "RECOMENDADO" },
        { id: "elite-total", nome: "Elite Total", preco: "R$ 149,99", descricao: "Acesso a TODOS os cargos, Médio + Superior", tag: "COMPLETO" },
        { id: "vitalis-total", nome: "Vitalis Total", preco: "R$ 650,00", descricao: "Acesso VITALÍCIO a TODOS os concursos presentes e futuros da plataforma", tag: "VITALÍCIO VIP" },
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
      if (cameFromUrlWithCargo) {
        setStep(3);
      } else {
        setStep(2);
      }
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
          if (paymentGateway === "efi") {
            const result = await createInfinitePayPixChargeRegister({
              planKey: formData.plan,
              userData: {
                nome: formData.nome,
                email: formData.email,
                username: formData.username,
                nivel: formData.nivel,
                cargo: formData.cargo,
              },
            });
            if (result.error) {
              setError(result.error);
            } else {
              setEfiPixData(result);
              setIsPixModalOpen(true);
            }
          } else {
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

  const handleResetGateway = () => {
    setClientSecret(null);
    setEfiPixData(null);
    setIsPixModalOpen(false);
  };

  const handleBack = () => {
    setError("");
    if (step === 3 && (clientSecret || efiPixData)) {
      handleResetGateway();
      return;
    }
    if (step === 3 && cameFromUrlWithCargo) {
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    }
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
        <StepIndicator
          current={step}
          onStepClick={(targetStep) => {
            setError("");
            if (step === 3) handleResetGateway();
            setStep(targetStep);
          }}
        />

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* =========== STEP 1: Dados Pessoais =========== */}
        <Activity mode={step === 1 ? "visible" : "hidden"}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
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
                <p className="text-[10px] text-muted-foreground px-1 mt-1">
                  Seu identificador único na plataforma
                </p>
              </div>
            </div>

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
        </Activity>

        {/* =========== STEP 2: Nível + Cargo =========== */}
        <Activity mode={step === 2 ? "visible" : "hidden"}>
          <div className="space-y-6">
            {/* Nível */}
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-3">Nível do concurso</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                <label className="block text-sm font-medium text-foreground/90 mb-3">Cargo pretendido</label>
                <div className="grid grid-cols-2 gap-2">
                  {(() => {
                    const concursoAtivo = formData.concurso || concursoFromUrl;
                    const todosCargos = CARGOS[formData.nivel as keyof typeof CARGOS] || [];
                    
                    // Filtrar cargos baseados no concurso ativo
                    const cargosFiltrados = todosCargos.filter((cargo) => {
                      if (!concursoAtivo) return true; // Se não tem concurso especificado, mostra todos
                      
                      // Regras específicas de concurso
                      if (concursoAtivo === "petrobras") {
                        const pertencePetrobras = PROFISSOES.some(p => p.id === cargo.id);
                        return pertencePetrobras;
                      } else {
                        return cargo.id.startsWith(concursoAtivo) || cargo.id === `${concursoAtivo}-tecnico` || cargo.id === `${concursoAtivo}-agente` || cargo.id === `${concursoAtivo}-recenseador` || cargo.id === `${concursoAtivo}-escriturario`;
                      }
                    });

                    return cargosFiltrados.map((cargo) => (
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
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>
        </Activity>

        {/* =========== STEP 3: Plano =========== */}
        <Activity mode={step === 3 ? "visible" : "hidden"}>
          <div className="space-y-3">
            {clientSecret ? (
               <div className="mt-4 -mx-4 md:mx-0">
                 <button
                   type="button"
                   onClick={handleResetGateway}
                   className="mb-4 px-3 py-1.5 rounded-lg bg-accent border border-border text-xs font-bold text-primary hover:bg-accent/80 transition flex items-center gap-2"
                 >
                   ← Trocar forma de pagamento ou plano
                 </button>
                 <StripeEmbeddedCheckout clientSecret={clientSecret} />
               </div>
            ) : (
              <>
                {/* Contexto do cargo selecionado */}
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl border border-border mb-2">
                  <span className="text-2xl">{NIVEIS.find((n) => n.id === formData.nivel)?.icon || "📋"}</span>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Cargo selecionado</p>
                    <p className="font-bold text-foreground text-sm">{cargoNome}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground/80 mb-1">Escolha seu plano:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getPlanosByNivel().map((plano) => {
                    const isVitalis = plano.id === "vitalis-total";
                    const isSelected = formData.plan === plano.id;
                    return (
                      <button
                        key={plano.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, plan: plano.id });
                          handleResetGateway();
                        }}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                          isVitalis ? "col-span-1 md:col-span-2" : ""
                        } ${
                          isSelected
                            ? isVitalis
                              ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20"
                              : "border-primary bg-primary/10"
                            : isVitalis
                              ? "border-border hover:border-amber-500/50 bg-gradient-to-r from-amber-500/5 to-transparent"
                              : "border-border hover:border-border/80 bg-background/30"
                        }`}
                      >
                        {plano.tag && (
                          <span
                            className={`absolute -top-2.5 right-4 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isVitalis
                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-sm"
                                : "bg-yellow-400 text-black"
                            }`}
                          >
                            {plano.tag}
                          </span>
                        )}
                        <div>
                          <p className={`font-bold ${isVitalis ? "text-amber-600 dark:text-amber-400 text-base" : "text-foreground dark:text-white"}`}>
                            {plano.nome}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{plano.descricao}</p>
                        </div>
                        <div className="text-right mt-3">
                          <p className={`font-black text-lg ${isVitalis ? "text-amber-600 dark:text-amber-400" : "text-yellow-500 dark:text-yellow-400"}`}>{plano.preco}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {formData.plan !== "free" && (
                  <div className="mt-5 p-4 rounded-xl bg-accent/30 border border-border">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Forma de Pagamento
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentGateway("stripe");
                          handleResetGateway();
                        }}
                        className={`p-3 rounded-lg border-2 text-left transition-all flex flex-col justify-between ${
                          paymentGateway === "stripe"
                            ? "border-indigo-500 bg-indigo-500/10 text-foreground"
                            : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <SiStripe className="w-5 h-5 text-[#635BFF]" />
                          <span className="font-bold text-sm">Cartão (Stripe)</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1">
                          Cartão de Crédito em até 12x
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentGateway("efi");
                          handleResetGateway();
                        }}
                        className={`p-3 rounded-lg border-2 text-left transition-all flex flex-col justify-between ${
                          paymentGateway === "efi"
                            ? "border-green-500 bg-green-500/10 text-foreground"
                            : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <LuQrCode className="w-5 h-5 text-emerald-500" />
                          <span className="font-bold text-sm">PIX (InfinitePay)</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1">
                          QR Code + Copia e Cola
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
           </div>
        </Activity>

        {/* =========== STEP 4: Senha =========== */}
        <Activity mode={step === 4 ? "visible" : "hidden"}>
          <div className="space-y-5">
            {/* Resumo */}
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg border border-border text-sm">
              <span className="text-primary font-bold">{planNome}</span>
              <span className="text-border">|</span>
              <span className="text-muted-foreground">{cargoNome}</span>
            </div>

            {/* Senhas em 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Requisitos */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 p-3 bg-accent/40 rounded-lg border border-border">
              {passwordChecks.map((req, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs ${req.ok ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                  {req.ok ? <CheckIcon /> : <div className="w-4 h-4 rounded-full border border-border" />}
                  {req.label}
                </div>
              ))}
            </div>

            {/* Termos */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-input bg-background text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                Li e aceito os{" "}
                <Link href="/termos" target="_blank" className="text-primary hover:underline">Termos de Uso</Link>{" "}
                e a{" "}
                <Link href="/privacidade" target="_blank" className="text-primary hover:underline">Política de Privacidade</Link>
              </span>
            </label>
          </div>
        </Activity>

        {/* Navigation */}
        {(!clientSecret || step !== 3) && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition text-sm"
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
                (step === 3 && !formData.plan) ||
                (step === 4 && !termsAccepted)
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

      <InfinitePayPixModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        onSuccess={() => {
          setIsPixModalOpen(false);
          setStep(4);
        }}
        pixData={efiPixData}
      />
    </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="relative z-10 w-full max-w-3xl">
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
