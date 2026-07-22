"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Tenant {
  id: string;
  nome: string;
}

export default function NovoCursoWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    materia_id: "portugues",
    imagem_capa: "",
    is_public: true,
    tenant_id: "",
    preco: "",
    stripe_price_id: "",
    editalText: "", // Campo para colar o conteúdo do edital
  });

  const [generatedAulas, setGeneratedAulas] = useState<any[]>([]);

  useEffect(() => {
    async function loadTenants() {
      const { data } = await supabase.from("tenants").select("id, nome");
      if (data) setTenants(data);
    }
    loadTenants();
  }, []);

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

  // Função para ler edital e gerar ementa premium estruturada via API de IA
  const handleGerarAulas = async () => {
    if (!formData.editalText) {
      setError("Por favor, cole o conteúdo do edital para gerar as aulas.");
      return;
    }

    setGenerating(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/aulas/gerar-wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editalText: formData.editalText,
          materiaId: formData.materia_id,
          tituloCurso: formData.titulo,
        }),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Falha na geração didática.");

      if (resData.success && resData.data.modulos) {
        setGeneratedAulas(resData.data.modulos);
        setSuccessMsg(`Sucesso! Ementa premium com ${resData.data.modulos.length} módulos completa, parágrafos C.E.D.E.A, podcasts e quizzes criados.`);
      }
    } catch (err: any) {
      setError(err.message || "Erro na conexão com o servidor de IA.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const payload = {
        titulo: formData.titulo,
        slug: formData.slug,
        materia_id: formData.materia_id,
        imagem_capa: formData.imagem_capa,
        is_public: formData.is_public,
        tenant_id: formData.is_public ? null : (formData.tenant_id || null),
        preco: formData.is_public && formData.preco ? parseFloat(formData.preco) : null,
        stripe_price_id: formData.is_public ? formData.stripe_price_id : null,
      };

      // 1. Criar o Curso
      const { data: curso, error: dbError } = await supabase
        .from("cursos")
        .insert(payload)
        .select()
        .single();

      if (dbError) throw dbError;

      // 2. Vincular as Aulas Premium geradas ao Curso recém-criado
      if (generatedAulas.length > 0) {
        for (const modulo of generatedAulas) {
          const aulaPayload = {
            titulo: modulo.titulo,
            slug: `${formData.slug}-modulo-${modulo.numero}`,
            curso_id: curso.id,
            materia_id: formData.materia_id,
            tenant_id: payload.tenant_id,
            metadata: {
              modulo_numero: modulo.numero,
              laboratorioTexto: modulo.laboratorioTexto || "",
              sinteseEstrategica: modulo.sinteseEstrategica || {},
              audio: modulo.audio || {},
            },
            conteudo: {
              modulos: [
                {
                  numero: modulo.numero,
                  titulo: modulo.titulo,
                  introducaoCEDEA: modulo.introducaoCEDEA,
                  flipCards: modulo.flipCards,
                  quiz: modulo.quiz,
                }
              ]
            }
          };

          // Salvar aula no banco
          const { error: aulaError } = await supabase
            .from("aulas")
            .insert(aulaPayload);

          if (aulaError) {
            console.error(`Erro ao salvar aula do módulo ${modulo.numero}:`, aulaError);
          }
        }
      }

      alert("Curso e ementa de aulas premium gerados com sucesso!");
      router.push("/admin/usuarios"); // Redireciona de volta para usuários
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao cadastrar o curso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Curso Inteligente</h1>
        <p className="text-muted-foreground mt-1">Wizard integrado com leitura de editais e geração didática premium por IA.</p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm p-4 rounded-xl">
          {successMsg}
        </div>
      )}

      {/* Indicador de Passos */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              step >= s ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
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

            {/* Configuração GovTech */}
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

            {/* Configuração B2C */}
            {formData.is_public && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold block">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="79.99"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold block">Stripe Price ID</label>
                  <input
                    type="text"
                    placeholder="price_..."
                    value={formData.stripe_price_id}
                    onChange={(e) => setFormData({ ...formData, stripe_price_id: e.target.value })}
                    className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                  />
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
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold block">Slug (Rota única)</label>
                <input
                  type="text"
                  placeholder="ex: petrobras-medio"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s/g, "-") })}
                  className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* PASSO 2: Informações da Vitrine */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Passo 2: Vitrine e Apresentação</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold block">Imagem de Capa (URL)</label>
              <input
                type="text"
                placeholder="https://exemplo.com/capa.png"
                value={formData.imagem_capa}
                onChange={(e) => setFormData({ ...formData, imagem_capa: e.target.value })}
                className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold block">Disciplina / Matéria Principal</label>
              <select
                value={formData.materia_id}
                onChange={(e) => setFormData({ ...formData, materia_id: e.target.value })}
                className="w-full p-2.5 border border-border bg-background rounded-xl text-sm"
              >
                <option value="portugues">Português</option>
                <option value="matematica">Matemática</option>
                <option value="quimica">Química</option>
                <option value="fisica">Física</option>
                <option value="administracao">Administração</option>
              </select>
            </div>
          </div>
        )}

        {/* PASSO 3: Geração Inteligente de Conteúdo (Edital) */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Passo 3: Geração Automática das Aulas (Edital)</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold block">Conteúdo Programático ou Edital</label>
              <textarea
                rows={6}
                placeholder="Cole aqui os tópicos oficiais do edital para que a IA divida e formate as aulas em 10 módulos premium com parágrafos C.E.D.E.A, FlipCards e Quizzes..."
                value={formData.editalText}
                onChange={(e) => setFormData({ ...formData, editalText: e.target.value })}
                className="w-full p-3 border border-border bg-background rounded-xl text-sm leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleGerarAulas}
              disabled={generating || !formData.editalText}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all text-sm disabled:opacity-50"
            >
              {generating ? "Processando Edital e Formatando Teoria Riqueza..." : "✨ Ler Edital e Gerar Aulas Premium"}
            </button>

            {generatedAulas.length > 0 && (
              <div className="border border-border rounded-xl p-4 bg-muted/30 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estrutura de Ementa Planejada:</p>
                <ul className="text-sm space-y-1.5 list-decimal list-inside text-foreground font-medium">
                  {generatedAulas.map((aula, i) => (
                    <li key={i}>{aula.titulo}</li>
                  ))}
                </ul>
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
            className="px-6 py-2.5 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition text-sm disabled:opacity-40"
          >
            Voltar
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition text-sm"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || generatedAulas.length === 0}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition text-sm disabled:opacity-50"
            >
              {loading ? "Gravando no Banco..." : "Finalizar e Publicar Curso"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
