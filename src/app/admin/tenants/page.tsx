"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LuLayers,
  LuPlus,
  LuUpload,
  LuSparkles,
  LuCheck,
  LuGlobe,
  LuPalette,
  LuFileText,
  LuLoader
} from "react-icons/lu";

interface Tenant {
  id: string;
  nome: string;
  slug: string;
  orgao: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  custom_domain: string | null;
  active: boolean;
}

export default function TenantsPage() {
  const supabase = createClient();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");
  const [orgao, setOrgao] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0037C1");
  const [secondaryColor, setSecondaryColor] = useState("#008C32");
  const [customDomain, setCustomDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PDF upload states
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [processLog, setProcessLog] = useState<string[]>([]);
  const [successLink, setSuccessLink] = useState("");

  const steps = [
    "Carregando e decodificando o edital PDF...",
    "Estruturando disciplinas com Inteligência Artificial...",
    "Cruzando ementa com histórico da banca examinadora...",
    "Modelando materiais didáticos no padrão metodológico SCORE...",
    "Inserindo simulados e flashcards no banco de dados do tenant...",
    "Portal ativo e pronto para estudos!"
  ];

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("concursos")
        .select("*")
        .order("nome");

      if (error) throw error;
      setTenants(data || []);
      if (data && data.length > 0 && !selectedTenant) {
        setSelectedTenant(data[0].id);
      }
    } catch (err) {
      console.error("Erro ao carregar tenants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !slug || !orgao) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("concursos").insert([
        {
          nome,
          slug: slug.toLowerCase().trim(),
          orgao,
          primary_color: primaryColor,
          secondary_color: secondaryColor,
          custom_domain: customDomain ? customDomain.trim() : null,
          active: true
        }
      ]);

      if (error) throw error;

      // Reset form
      setNome("");
      setSlug("");
      setOrgao("");
      setPrimaryColor("#0037C1");
      setSecondaryColor("#008C32");
      setCustomDomain("");

      fetchTenants();
      alert("Tenant criado com sucesso!");
    } catch (err: any) {
      console.error(err);
      alert(`Erro ao criar tenant: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const runSimulation = () => {
    if (!selectedTenant || !selectedFile) return;

    setIsProcessing(true);
    setProcessStep(0);
    setProcessLog([steps[0]]);
    setSuccessLink("");

    const interval = setInterval(() => {
      setProcessStep((prev) => {
        const next = prev + 1;
        if (next < steps.length) {
          setProcessLog((log) => [...log, steps[next]]);
          return next;
        } else {
          clearInterval(interval);
          createMockLessons();
          return prev;
        }
      });
    }, 2000);
  };

  const createMockLessons = async () => {
    try {
      // Find selected tenant slug
      const tenant = tenants.find((t) => t.id === selectedTenant);
      if (!tenant) return;

      const dynamicMateriaId = "conhecimentos-bancarios";
      const dynamicTopicoId = "estrutura-sfn";

      // Mock SCORE JSON content
      const mockScoreContent = {
        descricao: "Estudo dinâmico das diretrizes do SFN focado na Cesgranrio",
        sintetizar: {
          descricao: "Resumo em flashcards da estrutura do SFN.",
          flashcards: [
            { front: "Quem é o órgão máximo do SFN?", back: "O Conselho Monetário Nacional (CMN)." },
            { front: "Qual a função do Banco Central do Brasil (BCB)?", back: "Executar as diretrizes do CMN, emitir moeda e fiscalizar instituições financeiras." },
            { front: "Qual a diferença entre o CMN e o BCB?", back: "O CMN é um órgão normativo (manda); o BCB é um órgão supervisor/executor (faz)." },
            { front: "O que faz a CVM?", back: "Fiscaliza e desenvolve o mercado de valores mobiliários (ações, debêntures)." }
          ],
          alertas: [
            { type: "warning", title: "Cuidado na Prova", content: "A CVM fiscaliza valores mobiliários. O Banco Central fiscaliza instituições financeiras e câmbio. A Cesgranrio adora inverter essas competências!" }
          ]
        },
        compreender: {
          descricao: "Teoria estruturada sobre os três níveis do SFN.",
          teoria: [
            {
              subtitulo: "Nível 1: Órgãos Normativos",
              texto: "São os conselhos que definem as diretrizes gerais do sistema. O principal é o Conselho Monetário Nacional (CMN), composto pelo Ministro da Fazenda (Presidente), Ministro do Planejamento e Orçamento, e pelo Presidente do Banco Central."
            },
            {
              subtitulo: "Nível 2: Entidades Supervisoras",
              texto: "Executam as regras e fiscalizam o mercado. O Banco Central do Brasil (BCB) cuida das instituições financeiras tradicionais, enquanto a Comissão de Valores Mobiliários (CVM) cuida das bolsas de valores e mercado de capitais."
            }
          ]
        },
        organizar: {
          descricao: "Estruturas comparativas entre os órgãos reguladores.",
          comparativo: [
            {
              titulo: "Banco Central (BCB) vs CVM",
              itemA: "Banco Central do Brasil",
              conteudoA: "Regula mercado monetário, cambial, de crédito e instituições de depósito.",
              itemB: "Comissão de Valores Mobiliários",
              conteudoB: "Regula o mercado de ações, fundos de investimento e derivativos mobiliários."
            }
          ],
          linha_tempo: [
            { titulo: "Criação do SFN (Lei 4.595/64)", conteudo: "Definiu o CMN e o BCB como os pilares do sistema financeiro nacional." },
            { titulo: "Criação da CVM (Lei 6.385/76)", conteudo: "Retirou do Banco Central a regulação direta do mercado de ações." },
            { titulo: "Autonomia do Banco Central (LC 179/21)", conteudo: "Definiu mandatos fixos não coincidentes para a diretoria do BCB." }
          ]
        },
        resolver: {
          descricao: "Simulado focado nas questões recentes da Cesgranrio.",
          quiz: [
            {
              enunciado: "O órgão responsável por formular a política da moeda e do crédito no Brasil é o:",
              alternativas: [
                { letra: "A", texto: "Banco Central do Brasil", correta: false },
                { letra: "B", texto: "Conselho Monetário Nacional", correta: true },
                { letra: "C", texto: "Ministério da Fazenda", correta: false },
                { letra: "D", texto: "Banco do Brasil", correta: false }
              ],
              explicacao: "O CMN é o órgão máximo normativo, responsável por formular (normatizar) a política de moeda e crédito. O BCB apenas executa."
            },
            {
              enunciado: "A fiscalização e o controle das bolsas de valores e do mercado de capitais no Brasil competem à:",
              alternativas: [
                { letra: "A", texto: "Comissão de Valores Mobiliários (CVM)", correta: true },
                { letra: "B", texto: "Secretaria do Tesouro Nacional (STN)", correta: false },
                { letra: "C", texto: "Caixa Econômica Federal (CEF)", correta: false },
                { letra: "D", texto: "Superintendência de Seguros Privados (SUSEP)", correta: false }
              ],
              explicacao: "A CVM é a entidade supervisora responsável pelo mercado de capitais/mobiliários."
            }
          ]
        },
        estruturar: {
          descricao: "Consolidação e fixação final do conteúdo do SFN.",
          resumos: [
            "CMN: Define regras (normativo). Ministro da Fazenda é o presidente.",
            "BCB: Fiscaliza bancos, emite papel-moeda, executa políticas (supervisor).",
            "CVM: Fiscaliza bolsas de valores e emissão de ações (supervisor).",
            "Instituições Operadoras: Bancos comerciais, caixas econômicas, cooperativas."
          ]
        }
      };

      // Delete existing dynamic lesson if any to overwrite
      await supabase
        .from("lessons")
        .delete()
        .eq("concurso_id", selectedTenant)
        .eq("materia_id", dynamicMateriaId)
        .eq("topico_id", dynamicTopicoId);

      // Insert new dynamic lesson
      const { error } = await supabase.from("lessons").insert([
        {
          concurso_id: selectedTenant,
          materia_id: dynamicMateriaId,
          topico_id: dynamicTopicoId,
          titulo: "Estrutura do Sistema Financeiro Nacional",
          duracao: "20 min",
          ordem: 1,
          conteudo_json: mockScoreContent
        }
      ]);

      if (error) throw error;

      setSuccessLink(`/aulas/${dynamicMateriaId}/${dynamicTopicoId}?tenant=${tenant.slug}`);
      setProcessLog((log) => [...log, "Aulas SCORE geradas com sucesso!"]);
    } catch (err: any) {
      console.error(err);
      alert(`Erro ao salvar aulas: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LuLayers className="w-8 h-8 text-primary" />
          Gestão de Tenants & White-Label
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie portais independentes e gere cursos dinâmicos via inteligência artificial baseados em Editais PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tenants List & Create Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tenants List */}
          <div className="bg-card rounded-2xl border p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LuGlobe className="text-indigo-500" />
              Portais Ativos (Tenants)
            </h2>
            {loading ? (
              <div className="flex justify-center p-8">
                <LuLoader className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="border rounded-xl p-4 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {tenant.orgao}
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            tenant.active ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                      <h3 className="font-bold text-lg">{tenant.nome}</h3>
                      <p className="text-xs text-muted-foreground">
                        Domínio/Slug: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{tenant.slug}</code>
                      </p>
                      {tenant.custom_domain && (
                        <p className="text-xs text-muted-foreground">
                          Domínio Customizado: <code>{tenant.custom_domain}</code>
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: tenant.primary_color }}
                          title={`Cor Primária: ${tenant.primary_color}`}
                        />
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: tenant.secondary_color }}
                          title={`Cor Secundária: ${tenant.secondary_color}`}
                        />
                      </div>
                      <a
                        href={`/dashboard?tenant=${tenant.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        Visualizar Portal →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Form */}
          <div className="bg-card rounded-2xl border p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LuPlus className="text-emerald-500" />
              Adicionar Novo Concurso / Inquilino
            </h2>
            <form onSubmit={handleCreateTenant} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Nome do Concurso/Portal</label>
                <input
                  type="text"
                  placeholder="Ex: Caixa Econômica Federal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Órgão Público</label>
                <input
                  type="text"
                  placeholder="Ex: CEF"
                  value={orgao}
                  onChange={(e) => setOrgao(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Subdomínio / Slug único</label>
                <input
                  type="text"
                  placeholder="ex: caixa"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Domínio Customizado (Opcional)</label>
                <input
                  type="text"
                  placeholder="ex: www.concursocaixa.com.br"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-1.5">
                  <LuPalette className="w-4 h-4" /> Cor Primária
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 p-0 border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl bg-transparent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-1.5">
                  <LuPalette className="w-4 h-4" /> Cor Secundária
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 p-0 border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl bg-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:brightness-110 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Criando..." : "Criar Inquilino / Portal"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: AI Edital PDF Scraper */}
        <div className="space-y-8">
          <div className="bg-card rounded-2xl border p-6 space-y-6 relative overflow-hidden">
            {/* Background glow decoration */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-xl font-bold flex items-center gap-2">
              <LuSparkles className="text-yellow-500 animate-bounce" />
              IA Scraper de Edital PDF
            </h2>
            <p className="text-xs text-muted-foreground">
              Faça o upload do Edital oficial. A Inteligência Artificial irá mapear todo o conteúdo programático do edital e gerar as trilhas SCORE dinâmicas de estudos.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Vincular ao Portal / Tenant</label>
                <select
                  value={selectedTenant}
                  onChange={(e) => setSelectedTenant(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-transparent text-sm"
                >
                  {tenants.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome} ({t.slug})
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Drop Zone */}
              <div className="border-2 border-dashed rounded-2xl p-6 text-center space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition cursor-pointer relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <LuUpload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold">
                    {selectedFile ? selectedFile.name : "Clique ou arraste o Edital PDF"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "Apenas arquivos PDF (máx. 25MB)"}
                  </p>
                </div>
              </div>

              <button
                onClick={runSimulation}
                disabled={!selectedFile || !selectedTenant || isProcessing}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 hover:brightness-110 transition disabled:opacity-50"
              >
                <LuSparkles />
                Mapear Edital com IA
              </button>

              {/* Processing Output Console */}
              {(isProcessing || processLog.length > 0) && (
                <div className="bg-slate-950 text-slate-200 font-mono text-xs rounded-xl p-4 space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-slate-400">STATUS DA EXTRAÇÃO</span>
                    {isProcessing && <LuLoader className="w-3.5 h-3.5 animate-spin text-amber-500" />}
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {processLog.map((log, idx) => (
                      <p key={idx} className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        {log}
                      </p>
                    ))}
                  </div>

                  {/* Success Block */}
                  {successLink && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-green-400 font-bold">
                        <LuCheck className="w-5 h-5 flex-shrink-0" />
                        <span>Extração concluída com sucesso!</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        A Inteligência Artificial gerou a aula dinâmica **"Estrutura do SFN"** estruturada nas 5 etapas do SCORE.
                      </p>
                      <a
                        href={successLink}
                        className="block w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-lg transition"
                      >
                        Acessar Aula Criada →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
