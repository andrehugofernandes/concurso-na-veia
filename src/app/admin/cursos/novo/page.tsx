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
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    materia_id: "portugues",
    imagem_capa: "",
    is_public: true,
    tenant_id: "",
    preco: "",
    stripe_price_id: "",
  });

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

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

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

      const { data, error: dbError } = await supabase
        .from("cursos")
        .insert(payload)
        .select()
        .single();

      if (dbError) throw dbError;

      alert("Curso criado com sucesso!");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao cadastrar o curso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Curso</h1>
        <p className="text-muted-foreground mt-1">Wizard de criação de ementas B2C ou White Label (GovTech).</p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm p-4 rounded-xl">
          {error}
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
            <h2 className="text-xl font-bold">Passo 1: Segmentação e Ementa</h2>
            
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
                  placeholder="Ex: Petrobras Quest - Médio"
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

        {/* PASSO 3: Confirmação e Criação */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Passo 3: Confirmar e Finalizar</h2>
            <div className="bg-muted p-4 rounded-xl border space-y-2 text-sm">
              <p><strong>Nome:</strong> {formData.titulo}</p>
              <p><strong>Rota:</strong> /cursos/{formData.slug}</p>
              <p><strong>Distribuição:</strong> {formData.is_public ? "Público B2C" : "Privado GovTech"}</p>
              {formData.is_public ? (
                <p><strong>Preço:</strong> R$ {formData.preco || "Gratuito"}</p>
              ) : (
                <p><strong>Tenant ID:</strong> {formData.tenant_id || "Geral"}</p>
              )}
            </div>
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
              disabled={loading}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition text-sm"
            >
              {loading ? "Criando..." : "Finalizar e Salvar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
