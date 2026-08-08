"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  PlusCircle, 
  Trash2, 
  Edit3,
  ExternalLink, 
  BookOpen, 
  Layers, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  RefreshCw,
  ShieldAlert,
  Upload,
  Sparkles,
  FileText,
  Palette,
  Clock,
  Award
} from "lucide-react";

interface CursoAdmin {
  id: string;
  nome: string;
  slug: string;
  orgao: string;
  cargo: string;
  nivel: string;
  niveis: string[];
  horas_estimadas: number;
  primary_color: string;
  secondary_color: string;
  descricao: string;
  total_materias: number;
  total_aulas: number;
  href: string | null;
  logo_url: string | null;
  active: boolean;
  status_edital: string;
  ano_edital_base: string;
}

// Mapeamento de fallback para logos locais oficiais de todos os concursos
const LOCAL_LOGO_MAP: Record<string, string> = {
  petrobras: "/assets/images/logos/petrobras-icon.png",
  caixa: "/assets/images/logos/caixa-economica-federal-icon.png",
  bb: "/assets/images/logos/banco-do-brasil-icon.png",
  "banco-do-brasil": "/assets/images/logos/banco-do-brasil-icon.png",
  correios: "/assets/images/logos/correios-icon.png",
  ibge: "/assets/images/logos/ibge-icon.png",
  inss: "/assets/images/logos/inss-icon.png",
  "ata-mf": "/assets/images/logos/ata-mf/Coat_of_arms_of_Brazil.svg.webp",
  prf: "/assets/images/logos/prf-icon.png",
  "pf-adm": "/assets/images/logos/pf-icon.png",
  tjsp: "/assets/images/logos/tjsp-icon.png",
  "tre-unificado": "/assets/images/logos/tre-icon.png",
};

function CursoAvatar({ curso }: { curso: CursoAdmin }) {
  const logoSrc = curso.logo_url || LOCAL_LOGO_MAP[curso.slug];

  return (
    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={curso.nome}
          className="w-full h-full object-contain"
        />
      ) : (
        <div
          className="w-full h-full rounded-lg flex items-center justify-center font-black text-white text-sm"
          style={{ backgroundColor: curso.primary_color }}
        >
          {curso.nome.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState<CursoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal de confirmação de exclusão
  const [deletingCourse, setDeletingCourse] = useState<CursoAdmin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal de edição de concurso
  const [editingCourse, setEditingCourse] = useState<CursoAdmin | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);



  // Feedback Alerts
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cursos/vitrine");
      if (!res.ok) throw new Error("Erro ao carregar lista de concursos");
      const data = await res.json();
      
      const mapped: CursoAdmin[] = (data.cursos || []).map((c: any) => ({
        id: c.id,
        nome: c.nome,
        slug: c.slug,
        orgao: c.orgao || c.cargo || "",
        cargo: c.cargo || "",
        nivel: c.nivel || "médio",
        niveis: Array.isArray(c.niveis) && c.niveis.length > 0 ? c.niveis : [c.nivel || "médio"],
        horas_estimadas: c.horas_estimadas || 90,
        primary_color: c.primary_color || "#0037C1",
        secondary_color: c.secondary_color || "#008C32",
        descricao: c.descricao || "",
        total_materias: c.total_materias || 0,
        total_aulas: c.total_aulas || 0,
        href: c.href,
        logo_url: c.logo_url || null,
        active: c.active !== false,
        status_edital: c.status_edital || "PRE_EDITAL",
        ano_edital_base: c.ano_edital_base || "2022",
      }));

      setCursos(mapped);
    } catch (err) {
      console.error("[AdminCursosPage] Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  // Excluir Concurso
  const handleDeleteConfirm = async () => {
    if (!deletingCourse) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/cursos/${deletingCourse.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Falha ao excluir o concurso.");
      }

      setCursos((prev) => prev.filter((c) => c.id !== deletingCourse.id));
      setFeedbackMsg({ type: "success", text: `O concurso "${deletingCourse.nome}" foi excluído com sucesso.` });
      setDeletingCourse(null);
    } catch (err: any) {
      console.error("[handleDeleteConfirm] Erro:", err);
      setFeedbackMsg({ type: "error", text: err.message || "Ocorreu um erro ao excluir o concurso." });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setFeedbackMsg(null), 5000);
    }
  };

  // Salvar Edição de Concurso
  const handleSaveEdit = async () => {
    if (!editingCourse) return;

    try {
      setIsSavingEdit(true);
      const res = await fetch(`/api/admin/cursos/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: editingCourse.nome,
          slug: editingCourse.slug,
          orgao: editingCourse.orgao,
          nivel: editingCourse.nivel,
          horas_estimadas: Number(editingCourse.horas_estimadas),
          primary_color: editingCourse.primary_color,
          secondary_color: editingCourse.secondary_color,
          descricao: editingCourse.descricao,
          status_edital: editingCourse.status_edital,
          ano_edital_base: editingCourse.ano_edital_base,
          href: editingCourse.href,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar alterações.");

      // Atualizar localmente
      setCursos((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...editingCourse } : c))
      );

      setFeedbackMsg({ type: "success", text: `Concurso "${editingCourse.nome}" atualizado com sucesso!` });
      setEditingCourse(null);
    } catch (err: any) {
      console.error("[handleSaveEdit] Erro:", err);
      setFeedbackMsg({ type: "error", text: err.message || "Erro ao salvar concurso." });
    } finally {
      setIsSavingEdit(false);
      setTimeout(() => setFeedbackMsg(null), 5000);
    }
  };


  const filteredCursos = cursos.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.orgao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 w-full space-y-8">
      {/* Header Centralizado de Gestão */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-muted px-2.5 py-1 rounded-lg font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao Painel
            </Link>
            <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-lg border border-primary/20">
              SYSADMIN CENTRAL
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Gestão Unificada de Concursos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Edite informações públicas, ative vitrines, importe editais em PDF e gerencie concursos do SaaS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCursos}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground transition"
            title="Atualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/cursos/novo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            Novo Curso (Wizard)
          </Link>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
            feedbackMsg.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
          }`}
        >
          {feedbackMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}



      {/* Barra de Pesquisa */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Pesquisar por concurso, slug ou órgão..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-xs text-muted-foreground hover:text-foreground bg-muted px-2 py-1 rounded"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Tabela Unificada de Concursos */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-sm">Carregando concursos cadastrados...</p>
          </div>
        ) : filteredCursos.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-foreground">Nenhum concurso encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Concurso / Logomarca / Slug</th>
                  <th className="py-3.5 px-4">Nível / Níveis</th>
                  <th className="py-3.5 px-4 text-center">Status Edital</th>
                  <th className="py-3.5 px-4 text-center">Aulas</th>
                  <th className="py-3.5 px-4 text-center">Vitrine</th>
                  <th className="py-3.5 px-6 text-right">Ações SYSADMIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredCursos.map((curso) => {
                  const isAvailable = !!curso.href;
                  const isPreEdital = curso.status_edital === "PRE_EDITAL";

                  return (
                    <tr key={curso.id} className="hover:bg-muted/30 transition-colors">
                      {/* Concurso / Logomarca Avatar / Slug */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <CursoAvatar curso={curso} />
                          <div>
                            <div className="font-extrabold text-foreground text-base leading-snug">
                              {curso.nome}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono mt-0.5">
                              /{curso.slug} • {curso.orgao}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Nível / Níveis de Escolaridade */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 items-center min-w-[200px]">
                          {curso.niveis && curso.niveis.length > 0 ? (
                            curso.niveis.map((n) => {
                              const isMedio = n.includes("médio") || n.includes("medio");
                              const isTecnico = n.includes("técnico") || n.includes("tecnico");
                              const isSuperior = n.includes("superior");

                              return (
                                <span
                                  key={n}
                                  className={`capitalize text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                    isMedio
                                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                                      : isTecnico
                                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
                                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                  }`}
                                >
                                  {n}
                                </span>
                              );
                            })
                          ) : (
                            <span className="capitalize text-xs font-semibold px-2.5 py-1 rounded-md bg-muted border border-border text-foreground">
                              {curso.nivel}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Edital */}
                      <td className="py-4 px-4 text-center">
                        {isPreEdital ? (
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30">
                            Pré-Edital ({curso.ano_edital_base})
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                            Edital Publicado ({curso.ano_edital_base})
                          </span>
                        )}
                      </td>

                      {/* Aulas */}
                      <td className="py-4 px-4 text-center">
                        <span className={`font-bold ${curso.total_aulas > 0 ? "text-primary" : "text-muted-foreground"}`}>
                          {curso.total_aulas > 0 ? `${curso.total_aulas} aulas` : "0 (Em Breve)"}
                        </span>
                      </td>

                      {/* Status Vitrine */}
                      <td className="py-4 px-4 text-center">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 border border-slate-500/20">
                            Em Breve
                          </span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Editar */}
                          <button
                            onClick={() => setEditingCourse(curso)}
                            className="p-2 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary text-primary hover:text-white transition shadow-xs"
                            title="Editar Informações do Concurso"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Ver Vitrine */}
                          <Link
                            href={curso.href || `/cursos/${curso.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition shadow-xs"
                            title="Visualizar na Vitrine Pública"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Excluir */}
                          <button
                            onClick={() => setDeletingCourse(curso)}
                            className="p-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition shadow-xs"
                            title="Excluir Concurso Permanentemente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Edição Completa de Concurso */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Editar Concurso</h3>
                  <p className="text-xs text-muted-foreground">Altera dados na Homepage e na Vitrine do SaaS</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Nome do Concurso:</label>
                <input
                  type="text"
                  value={editingCourse.nome}
                  onChange={(e) => setEditingCourse({ ...editingCourse, nome: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Slug da Rota:</label>
                <input
                  type="text"
                  value={editingCourse.slug}
                  onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Órgão */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Órgão / Instituição:</label>
                <input
                  type="text"
                  value={editingCourse.orgao}
                  onChange={(e) => setEditingCourse({ ...editingCourse, orgao: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Nível */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Nível de Escolaridade:</label>
                <select
                  value={editingCourse.nivel}
                  onChange={(e) => setEditingCourse({ ...editingCourse, nivel: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="médio">Médio</option>
                  <option value="técnico">Técnico</option>
                  <option value="superior">Superior</option>
                </select>
              </div>

              {/* Status do Edital */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Status do Edital:</label>
                <select
                  value={editingCourse.status_edital}
                  onChange={(e) => setEditingCourse({ ...editingCourse, status_edital: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="PRE_EDITAL">Pré-Edital (Base em Edital Anterior)</option>
                  <option value="EDITAL_PUBLICADO">Edital Publicado</option>
                  <option value="EM_BREVE">Em Breve (Desabilitado)</option>
                </select>
              </div>

              {/* Ano Edital Base */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Ano Edital Base:</label>
                <input
                  type="text"
                  value={editingCourse.ano_edital_base}
                  onChange={(e) => setEditingCourse({ ...editingCourse, ano_edital_base: e.target.value })}
                  placeholder="Ex: 2022"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Cor Primária */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Cor Primária (Hex):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingCourse.primary_color}
                    onChange={(e) => setEditingCourse({ ...editingCourse, primary_color: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-border p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={editingCourse.primary_color}
                    onChange={(e) => setEditingCourse({ ...editingCourse, primary_color: e.target.value })}
                    className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Cor Secundária */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Cor Secundária (Hex):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingCourse.secondary_color}
                    onChange={(e) => setEditingCourse({ ...editingCourse, secondary_color: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-border p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={editingCourse.secondary_color}
                    onChange={(e) => setEditingCourse({ ...editingCourse, secondary_color: e.target.value })}
                    className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Rota Href na Vitrine */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Link de Ativação na Vitrine (href):</label>
                <input
                  type="text"
                  value={editingCourse.href || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, href: e.target.value || null })}
                  placeholder="Ex: /cursos/bb (Deixe vazio para ficar Em Breve)"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Descrição */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Descrição Pública:</label>
                <textarea
                  rows={3}
                  value={editingCourse.descricao}
                  onChange={(e) => setEditingCourse({ ...editingCourse, descricao: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setEditingCourse(null)}
                disabled={isSavingEdit}
                className="px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:opacity-90 transition flex items-center gap-2"
              >
                {isSavingEdit ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deletingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Excluir Concurso?</h3>
                <p className="text-xs text-muted-foreground">Ação exclusiva para perfil SYSADMIN</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-2xl border border-border text-sm space-y-2">
              <p className="text-foreground font-semibold">
                Tem certeza que deseja excluir o concurso <span className="text-primary font-bold">"{deletingCourse.nome}"</span>?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Esta ação excluirá permanentemente o concurso, todos os seus cargos vinculados e as <strong>{deletingCourse.total_aulas} aulas didáticas</strong> associadas no banco de dados.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingCourse(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md transition flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Confirmar Exclusão
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
