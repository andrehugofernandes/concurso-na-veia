"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  LuFileText, 
  LuUpload, 
  LuSparkles, 
  LuLoader, 
  LuCheck, 
  LuArrowLeft, 
  LuArrowRight,
  LuImage,
  LuRefreshCw,
  LuWand,
  LuBookOpen,
  LuLayers
} from "react-icons/lu";

interface ConcursoOption {
  id: string;
  nome: string;
}

const WIZARD_STEPS = [
  { num: 1, label: "Mercado" },
  { num: 2, label: "Vitrine" },
  { num: 3, label: "Matérias" },
];

function StepIndicator({
  current,
  onStepClick,
}: {
  current: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-8 px-2 max-w-md mx-auto">
      {WIZARD_STEPS.map((s, i) => {
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
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold transition-all duration-300 group-hover:scale-110 ${
                  done
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : active
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md scale-105"
                      : "bg-accent text-muted-foreground border border-border group-hover:border-primary/50"
                }`}
              >
                {done ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors ${
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
            {i < WIZARD_STEPS.length - 1 && (
              <div className="flex-1 mx-3 mb-5">
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

export default function NovoCursoWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [tenants, setTenants] = useState<ConcursoOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingCapa, setGeneratingCapa] = useState(false);
  const [extractingPdf, setExtractingPdf] = useState(false);
  const [pdfSuccessMsg, setPdfSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    imagem_capa: "",
    is_public: true,
    tenant_id: "",
    preco: "79.99",
    stripe_price_id: "price_stripe_padrao",
    editalText: "",
    conteudoProgramatico: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [generatedAulas, setGeneratedAulas] = useState<any[]>([]);
  const [disciplinasList, setDisciplinasList] = useState<any[]>([]);
  const [bancaIdentificada, setBancaIdentificada] = useState("padrao");

  useEffect(() => {
    async function loadConcursos() {
      const { data } = await supabase.from("concursos").select("id, nome");
      if (data) setTenants(data);
    }
    loadConcursos();
  }, []);

  // Gerar Capa com IA Nano Banana automaticamente ao entrar no Passo 2
  useEffect(() => {
    if (step === 2 && !formData.imagem_capa) {
      handleGerarCapaNanoBanana();
    }
  }, [step]);

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!formData.titulo || !formData.slug) {
        setError("Título e Slug são obrigatórios.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Gerar Capa de Curso com IA Nano Banana
  const handleGerarCapaNanoBanana = async () => {
    setGeneratingCapa(true);
    setError("");

    try {
      const response = await fetch("/api/cursos/gerar-capa-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          slug: formData.slug,
        }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Falha ao gerar capa com IA.");
      }

      setFormData((prev) => ({
        ...prev,
        imagem_capa: resData.imageUrl,
      }));
    } catch (err: any) {
      console.error("[NovoCursoWizard] Erro ao gerar capa:", err);
      setFormData((prev) => ({
        ...prev,
        imagem_capa: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      }));
    } finally {
      setGeneratingCapa(false);
    }
  };

  // Extrair texto corrido do arquivo PDF selecionado
  const handleExtractPdfText = async (file: File) => {
    setExtractingPdf(true);
    setError("");
    setPdfSuccessMsg("");

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/pdf/extract-text", {
        method: "POST",
        body: data,
      });

      const resJson = await response.json();
      if (!response.ok || resJson.error) {
        throw new Error(resJson.error || "Falha ao extrair texto do PDF.");
      }

      setFormData((prev) => ({
        ...prev,
        editalText: resJson.text,
        conteudoProgramatico: resJson.conteudoProgramatico || "",
      }));

      const cpMsg = resJson.conteudoProgramatico
        ? ` | Conteúdo Programático localizado (${resJson.conteudoProgramaticoLength.toLocaleString('pt-BR')} chars)`
        : " | ⚠️ Conteúdo programático não localizado automaticamente";
      setPdfSuccessMsg(`✅ PDF "${resJson.filename}" lido com sucesso! (${resJson.characterCount.toLocaleString('pt-BR')} caracteres)${cpMsg}`);
    } catch (err: any) {
      console.error("[NovoCursoWizard] Erro na leitura de PDF:", err);
      setError(err.message || "Não foi possível ler o arquivo PDF.");
    } finally {
      setExtractingPdf(false);
    }
  };

  // Função para ler edital e gerar ementa cobrindo TODAS AS MATÉRIAS do edital automaticamente
  const handleGerarAulas = async () => {
    if (!formData.editalText) {
      setError("Por favor, selecione um arquivo PDF ou cole o texto do edital para gerar as aulas.");
      return;
    }

    setGenerating(true);
    setError("");
    setSuccessMsg("");

    try {
      console.log("[NovoCursoWizard] Enviando para gerar-wizard:", {
        editalTextLength: formData.editalText.length,
        conteudoProgramaticoLength: formData.conteudoProgramatico?.length || 0,
        tituloCurso: formData.titulo,
      });

      const response = await fetch("/api/aulas/gerar-wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editalText: formData.editalText,
          conteudoProgramatico: formData.conteudoProgramatico || null,
          tituloCurso: formData.titulo,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        console.error("[NovoCursoWizard] Erro da API:", resData);
        throw new Error(resData.error || "Falha na geração didática.");
      }

      if (resData.success && resData.data.modulos) {
        setGeneratedAulas(resData.data.modulos);
        setDisciplinasList(resData.data.disciplinas || []);
        if (resData.data.banca) setBancaIdentificada(resData.data.banca);
        setSuccessMsg(`✅ A IA mapeou ${resData.data.totalDisciplinas} disciplinas do edital e gerou ${resData.data.modulos.length} módulos/aulas completos.`);
      }
    } catch (err: any) {
      setError(err.message || "Erro na conexão com o servidor de IA.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setGenerating(false);
    }
  };

  // Submeter e Publicar o Curso via Server API Route /api/cursos/salvar-wizard
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/cursos/salvar-wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          slug: formData.slug,
          imagem_capa: formData.imagem_capa,
          modulos: generatedAulas,
        }),
      });

      const resData = await response.json();
      if (!response.ok || resData.error) {
        throw new Error(resData.error || "Falha ao publicar o curso.");
      }

      // [NaVeiaLingo] - Dispara a geração dinâmica da trilha do Lingo para esse curso
      try {
        console.log("Iniciando geração background do NaVeiaLingo...");
        fetch("/api/aulas/gerar-lingo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            concursoId: resData.concursoId,
            tituloCurso: formData.titulo,
            cargo: "Geral",
            banca: bancaIdentificada
          })
        }); // Sem await propositalmente para não travar a UI (Fire and Forget)
      } catch (e) {
        console.warn("Aviso ao tentar acionar gerar-lingo", e);
      }

      alert("🎉 Curso e Ementa Completa com Todas as Matérias publicados com sucesso!");
      router.push(`/cursos/${resData.slug}`);
    } catch (err: any) {
      console.error("[NovoCursoWizard] Erro ao publicar:", err);
      setError(err.message || "Erro ao publicar o curso.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Curso Inteligente</h1>
        <p className="text-muted-foreground mt-1 text-sm">Wizard integrado com leitura de edital PDF, geração de todas as matérias e capa IA Nano Banana.</p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm p-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm p-4 rounded-xl font-medium">
          {successMsg}
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Step Indicator no padrão idêntico da página de Register */}
        <StepIndicator
          current={step}
          onStepClick={(targetStep) => {
            if (targetStep < step || (targetStep === 2 && formData.titulo && formData.slug) || (targetStep === 3 && step >= 2)) {
              setStep(targetStep);
            }
          }}
        />

        {/* PASSO 1: Segmentação de Mercado */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Passo 1: Segmentação de Mercado</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold">Distribuição do Curso</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.is_public === true}
                    onChange={() => setFormData({ ...formData, is_public: true, tenant_id: "" })}
                    className="text-primary focus:ring-primary"
                  />
                  <span>Venda Aberta B2C (Público)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.is_public === false}
                    onChange={() => setFormData({ ...formData, is_public: false })}
                    className="text-primary focus:ring-primary"
                  />
                  <span>Contrato Governamental GovTech (Privado)</span>
                </label>
              </div>
            </div>

            {!formData.is_public && (
              <div className="space-y-2">
                <label className="text-sm font-semibold block">Órgão Governamental (Tenant)</label>
                <select
                  value={formData.tenant_id}
                  onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                >
                  <option value="">Selecione o Tenant/Prefeitura</option>
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.is_public && (
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
                <LuLayers className="w-5 h-5 text-primary shrink-0" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Precificação Padrão Global:</strong> Este curso será automaticamente comercializado utilizando as faixas de preços padrões da plataforma (Iniciante, Aprovado, Elite, Elite Total e Vitalício) para os níveis aplicáveis.
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold block">Título do Curso</label>
                <input
                  type="text"
                  placeholder="Ex: Concurso Na Veia - Médio"
                  value={formData.titulo}
                  onChange={(e) => {
                    const val = e.target.value;
                    const autoSlug = val
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/[\s_-]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    setFormData({ ...formData, titulo: val, slug: autoSlug });
                  }}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold block">Slug (Rota única)</label>
                <input
                  type="text"
                  placeholder="ex: petrobras-medio"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[\s_]+/g, "-") })}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* PASSO 2: Vitrine e Apresentação (COM GERADOR DE CAPA NANO BANANA) */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <LuImage className="text-primary" /> Passo 2: Vitrine e Capa Automática
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                A Inteligência Artificial Nano Banana gera automaticamente uma capa temática em HD para o concurso.
              </p>
            </div>

            {/* PREVIEW DA CAPA NANO BANANA */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold block">Imagem de Capa (Gerada por IA Nano Banana)</label>
                <button
                  type="button"
                  onClick={handleGerarCapaNanoBanana}
                  disabled={generatingCapa}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition"
                >
                  {generatingCapa ? (
                    <LuLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LuWand className="w-3.5 h-3.5" />
                  )}
                  {generatingCapa ? "Gerando Capa..." : "Gerar Nova Variação Nano Banana"}
                </button>
              </div>

              {/* CARD DE VISUALIZAÇÃO 16:9 */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center group shadow-md">
                {generatingCapa ? (
                  <div className="flex flex-col items-center gap-2 text-amber-400 p-8 text-center">
                    <LuLoader className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-bold">Nano Banana criando arte temática HD...</span>
                  </div>
                ) : formData.imagem_capa ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imagem_capa}
                      alt="Capa do Curso"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider w-fit mb-2">
                        <LuSparkles className="w-3 h-3" /> Nano Banana IA
                      </div>
                      <h3 className="text-xl font-black text-white">{formData.titulo || "Título do Curso"}</h3>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8 text-muted-foreground space-y-2">
                    <LuImage className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-xs font-medium">Nenhuma capa gerada ainda.</p>
                  </div>
                )}
              </div>

              {/* CAMPO DE URL EDITAL (OPCIONAL MANUAL) */}
              <div className="pt-2 space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  URL da Imagem (Editável se preferir customizar)
                </label>
                <input
                  type="text"
                  value={formData.imagem_capa}
                  onChange={(e) => setFormData({ ...formData, imagem_capa: e.target.value })}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-xs font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* AVISO DE MULTI-DISCIPLINAS AUTOMÁTICAS */}
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
              <LuLayers className="w-5 h-5 text-primary shrink-0" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Mapeamento Didático Automático:</strong> Todas as disciplinas do edital (Português, RLM, Conhecimentos Específicos, Legislação, TI) serão extraídas e estruturadas pela IA no próximo passo sem necessidade de seleção manual.
              </div>
            </div>
          </div>
        )}

        {/* PASSO 3: Leitor de PDF e Geração de Todas as Matérias */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Passo 3: Geração de Todas as Matérias (Edital)</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Importe o arquivo PDF do Edital. A IA irá mapear todas as disciplinas do concurso e gerar os 10 Módulos Didáticos completos.
                </p>
              </div>
            </div>

            {/* LEITOR DE EDITAL EM PDF */}
            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6 bg-primary/5 space-y-4 hover:border-primary/60 transition">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <LuFileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Leitor Inteligente de Edital PDF</h3>
                    <p className="text-xs text-muted-foreground">
                      Converte o arquivo PDF diretamente em texto corrido formatado
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPdfFile(file);
                        handleExtractPdfText(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={extractingPdf}
                  />
                  <button
                    type="button"
                    disabled={extractingPdf}
                    className="px-4 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:brightness-110 transition"
                  >
                    {extractingPdf ? (
                      <>
                        <LuLoader className="w-4 h-4 animate-spin" />
                        Lendo PDF...
                      </>
                    ) : (
                      <>
                        <LuUpload className="w-4 h-4" />
                        Selecionar PDF Edital
                      </>
                    )}
                  </button>
                </div>
              </div>

              {pdfSuccessMsg && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                  <LuCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>{pdfSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* ÁREA DE TEXTO CORRIDO DO EDITAL */}
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center justify-between">
                <span>Conteúdo Programático em Texto Corrido (Todas as Matérias)</span>
                {formData.editalText && (
                  <span className="text-xs text-muted-foreground font-normal">
                    {formData.editalText.length.toLocaleString('pt-BR')} caracteres
                  </span>
                )}
              </label>
              <textarea
                rows={7}
                placeholder="O texto corrido do edital com todas as disciplinas aparecerá aqui automaticamente após enviar o PDF, ou você pode colar a ementa completa..."
                value={formData.editalText}
                onChange={(e) => setFormData({ ...formData, editalText: e.target.value })}
                className="w-full p-4 border border-border bg-background rounded-xl text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <button
              type="button"
              onClick={handleGerarAulas}
              disabled={generating || !formData.editalText || extractingPdf}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-primary to-emerald-600 text-white font-extrabold rounded-2xl hover:brightness-110 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {generating ? (
                <>
                  <LuLoader className="w-5 h-5 animate-spin" />
                  <span>Mapeando Todas as Matérias e Formatando 10 Módulos Didáticos com IA...</span>
                </>
              ) : (
                <>
                  <LuSparkles className="w-5 h-5 text-amber-300" />
                  <span>Mapear Todas as Matérias e Gerar Aulas Completas</span>
                </>
              )}
            </button>

            {/* LISTA DE MÓDULOS DIDÁTICOS GERADOS COM MATÉRIAS AUTOMÁTICAS */}
            {generatedAulas.length > 0 && (
              <div className="border border-border rounded-2xl p-5 bg-muted/30 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ementa Integrada com Todas as Disciplinas do Edital:</p>
                  <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    100% Multi-Disciplinar
                  </span>
                </div>
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {generatedAulas.map((aula, i) => (
                    <div key={i} className="p-3.5 bg-card border border-border/60 rounded-xl text-sm space-y-1.5 shadow-xs">
                      <div className="flex justify-between items-start gap-2">
                        <div className="font-bold text-foreground">
                          Módulo {aula.numero}: {aula.titulo}
                        </div>
                        <span className="shrink-0 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {aula.materia_nome || "Geral"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium pt-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">10 Parágrafos C.E.D.E.A</span>
                        <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">4 Acordeons</span>
                        <span className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">Questão Comentada</span>
                        <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">Áudio & Podcast</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">3 Mapas 9:16</span>
                        <span className="bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded">Quizzes Cesgranrio</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between mt-8 border-t border-border pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || loading}
            className="px-6 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition text-sm disabled:opacity-40 flex items-center gap-2"
          >
            <LuArrowLeft className="w-4 h-4" /> Voltar
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition text-sm flex items-center gap-2"
            >
              Continuar <LuArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || generatedAulas.length === 0}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl transition text-sm disabled:opacity-50 shadow-md flex items-center gap-2"
            >
              {loading ? <LuLoader className="w-4 h-4 animate-spin" /> : <LuCheck className="w-4 h-4" />}
              {loading ? "Salvando..." : "Finalizar e Publicar Curso"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
