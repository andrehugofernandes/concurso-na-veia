"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "@/lib/contexts/theme-context";
import StickyHeader from "@/components/home/StickyHeader";
import HomeFooter from "@/components/home/HomeFooter";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { 
  LuSearch, 
  LuGraduationCap, 
  LuWrench, 
  LuArrowRight, 
  LuBookOpen, 
  LuLayers, 
  LuSparkles, 
  LuFilter,
  LuChevronDown,
  LuChevronUp,
  LuArrowLeft,
  LuFileText,
  LuTarget,
  LuMapPin,
  LuBriefcase,
  LuAward,
  LuLoader,
  LuInfo
} from "react-icons/lu";

interface ConcursoData {
  id: string;
  nome: string;
  slug: string;
  orgao: string;
  primary_color: string;
  secondary_color: string;
  logo_url?: string;
  descricao?: string;
  status_edital?: string;
  ano_edital_base?: string;
}

interface CargoData {
  id: string;
  nivel: string;
  nome: string;
  slug: string;
  descricao: string;
  materias_basicas: string[];
  materias_especificas: string[];
}

const COURSE_BG_MAP: Record<string, string> = {
  "petrobras": "/images/carousel-4.png",
  "ata-mf": "/images/bg/ata-mf.png",
  "ibge": "/images/bg/ibge.png",
  "inss": "/images/bg/inss.png",
  "caixa": "/images/bg/caixa.png",
  "bb": "/images/bg/bb.png",
  "banco-do-brasil": "/images/bg/bb.png",
  "correios": "/images/bg/correios.png",
  "prf": "/images/bg/prf.png",
  "pf-adm": "/images/bg/pf-adm.png",
  "tjsp": "/images/bg/tjsp.png",
  "tre-unificado": "/images/bg/tre-unificado.png",
};

// Mapa oficial de logomarcas vetorizadas/transparentes dos concursos
const COURSE_LOGO_MAP: Record<string, string> = {
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

export default function VitrineConcursoPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "bb";
  const supabase = createClient();
  const { currentTheme } = useTheme();

  const [concurso, setConcurso] = useState<ConcursoData | null>(null);
  const [cargos, setCargos] = useState<CargoData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedNivel, setSelectedNivel] = useState<"todos" | "médio" | "técnico" | "superior">("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchConcursoAndCargos();
  }, [slug]);

  const fetchConcursoAndCargos = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Concurso
      const { data: concursoData, error: concursoErr } = await supabase
        .from("concursos")
        .select("*")
        .eq("slug", slug.toLowerCase())
        .single();

      if (concursoData && !concursoErr) {
        setConcurso(concursoData);
        
        // 2. Fetch Cargos for this concurso
        const { data: cargosData, error: cargosErr } = await supabase
          .from("cargos")
          .select("*")
          .eq("concurso_id", concursoData.id)
          .order("created_at", { ascending: true });
          
        if (cargosData && !cargosErr) {
          setCargos(cargosData);
        }
      } else {
        setConcurso({
          id: "default",
          nome: slug.toUpperCase(),
          slug: slug.toLowerCase(),
          orgao: slug.toUpperCase(),
          primary_color: "#0037C1",
          secondary_color: "#008C32",
          status_edital: "PRE_EDITAL",
          ano_edital_base: "2022"
        });
      }
    } catch (err) {
      console.error("Erro ao carregar concurso e cargos:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtragem inteligente de cargos
  const filteredCargos = useMemo(() => {
    return cargos.filter((c) => {
      if (selectedNivel !== "todos" && c.nivel !== selectedNivel) {
        return false;
      }
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchNome = c.nome.toLowerCase().includes(query);
        const matchBasicas = c.materias_basicas?.some(m => m.toLowerCase().includes(query));
        const matchEspecificas = c.materias_especificas?.some(m => m.toLowerCase().includes(query));
        return matchNome || matchBasicas || matchEspecificas;
      }
      return true;
    });
  }, [cargos, selectedNivel, searchTerm]);

  const cargosForNivelFilter = useMemo(() => {
    return cargos.filter((c) => {
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchNome = c.nome.toLowerCase().includes(query);
        return matchNome;
      }
      return true;
    });
  }, [cargos, searchTerm]);

  const countMedio = cargosForNivelFilter.filter((c) => c.nivel === "médio").length;
  const countTecnico = cargosForNivelFilter.filter((c) => c.nivel === "técnico").length;
  const countSuperior = cargosForNivelFilter.filter((c) => c.nivel === "superior").length;

  const primaryColor = concurso?.primary_color || "var(--primary)";
  const bgHeaderImage = COURSE_BG_MAP[slug.toLowerCase()] || "/images/bg/bb.png";
  const isPreEdital = concurso?.status_edital === "PRE_EDITAL" || slug.toLowerCase() === "bb";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center">
        <LuLoader className="w-10 h-10 animate-spin text-primary mb-3" />
        <p className="text-sm font-semibold text-muted-foreground">Carregando Vitrine do Concurso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Menu Sticky Fixo no Topo */}
      <StickyHeader alwaysVisible={true} />

      {/* Conteúdo Principal — Modelo Oficial de Layout Secundário */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-20 max-w-7xl">
        
        {/* Banner Hero / Cabeçalho do Concurso integrando ao Sistema de Skins */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 relative overflow-hidden text-center">
          
          {/* Fundo Panorâmico */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src={bgHeaderImage} 
              alt={concurso?.nome || "Concurso Público"} 
              className="w-full h-full object-cover object-center opacity-40 dark:opacity-20 transition-opacity duration-700"
            />
            {/* Gradiente Radial / Centralizado dinâmico */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.25)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,rgba(15,23,42,0.88)_50%,rgba(15,23,42,0.25)_100%)]" />
          </div>

          {/* Conteúdo Centralizado no Meio */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Logomarca Oficial Centralizada e Destacada */}
            {(() => {
              const officialLogo = COURSE_LOGO_MAP[slug.toLowerCase()] || COURSE_LOGO_MAP[concurso?.slug?.toLowerCase() || ""] || (concurso?.logo_url && (concurso.logo_url.endsWith(".png") || concurso.logo_url.endsWith(".svg") || concurso.logo_url.includes("logo") || concurso.logo_url.includes("icon")) ? concurso.logo_url : null) || "/assets/images/logos/banco-do-brasil-icon.png";
              return (
                <div className="mb-6 mt-2">
                  <img 
                    src={officialLogo} 
                    alt={concurso?.orgao || concurso?.nome || "Logo"} 
                    className="h-16 md:h-24 object-contain filter drop-shadow-md max-w-[280px]" 
                  />
                </div>
              );
            })()}

            {/* Pílulas de Ação e Status Transparente do Edital */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Link 
                href="/#cursos" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/60 shadow-xs"
              >
                <LuArrowLeft className="w-3.5 h-3.5" />
                Voltar para Vitrine
              </Link>

              {isPreEdital ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-xs">
                  <LuSparkles className="w-4 h-4 animate-pulse text-amber-500" />
                  PRÉ-EDITAL 2026 — BASEADO NO EDITAL 2022 (CESGRANRIO)
                </div>
              ) : (
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs"
                  style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)`, color: primaryColor, borderColor: `color-mix(in srgb, ${primaryColor} 30%, transparent)` }}
                >
                  <LuSparkles className="w-4 h-4 animate-pulse" />
                  CONCURSO OFICIAL {new Date().getFullYear()}
                </div>
              )}
            </div>

            {/* Título Blocado com Skin Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-5 text-balance max-w-4xl mx-auto">
              Vitrine de Cargos <br/> <span style={{ color: primaryColor }}>{concurso?.orgao || concurso?.nome}</span>
            </h1>

            {/* Subtítulo Centralizado */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto text-center">
              {concurso?.descricao || `Conheça os cargos do concurso ${concurso?.nome}. Navegue entre as opções, verifique as matérias exigidas e inicie sua preparação antecipada.`}
            </p>

            {/* Nota Informativa Transparente para Cursos Pré-Edital (Ex: Banco do Brasil) */}
            {isPreEdital && (
              <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm text-left max-w-3xl flex items-start gap-3 shadow-xs">
                <LuInfo className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <strong className="font-bold">Estratégia de Aprovação Pré-Edital:</strong> Este curso preparatório foi elaborado rigorosamente com base no <strong>Edital N° 01/2022 BB (Cargo Escriturário — Banca Fundação Cesgranrio)</strong>. Estudar com antecedência pelo último edital oficial é a estratégia mais recomendada por especialistas para dominar a banca antes da publicação do edital de 2026.
                </div>
              </div>
            )}

            {/* Banner de estatísticas com Suporte a Skin */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full max-w-3xl mx-auto">
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black" style={{ color: primaryColor }}>{countMedio}</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Nível Médio</div>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{countTecnico}</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Nível Técnico</div>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{countSuperior}</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Nível Superior</div>
              </div>
            </div>

          </div>
        </div>

        {/* Card de Barra de Filtros e Busca */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Tabs de Nível - Dinâmicas com Skin */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 overflow-x-auto">
              <button
                onClick={() => setSelectedNivel("todos")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "todos"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <LuLayers className="w-4 h-4" />
                Todos ({cargosForNivelFilter.length})
              </button>

              {countMedio > 0 && (
                <button
                  onClick={() => setSelectedNivel("médio")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "médio"
                    ? "text-white shadow-md font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
                style={selectedNivel === "médio" ? { backgroundColor: primaryColor, backgroundImage: "var(--primary-gradient)" } : {}}
              >
                <LuAward className="w-4 h-4" />
                Nível Médio ({countMedio})
                </button>
              )}

              {countTecnico > 0 && (
                <button
                  onClick={() => setSelectedNivel("técnico")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "técnico"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <LuWrench className="w-4 h-4" />
                Nível Técnico ({countTecnico})
                </button>
              )}

              {countSuperior > 0 && (
                <button
                  onClick={() => setSelectedNivel("superior")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "superior"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20 font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <LuGraduationCap className="w-4 h-4" />
                Nível Superior ({countSuperior})
                </button>
              )}
            </div>

            {/* Input de Busca */}
            <div className="relative flex-1 max-w-md">
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar cargo, matéria ou palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid de Cards Retangulares Elegantes — Padrão Petrobras (Imagem 2) */}
        {filteredCargos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <LuTarget className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhum cargo encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Não encontramos cargos correspondentes aos filtros selecionados. Tente buscar por outros termos ou limpar os filtros.
            </p>
            <button
              onClick={() => {
                setSelectedNivel("todos");
                setSearchTerm("");
              }}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-colors shadow-md"
              style={{ backgroundColor: primaryColor, backgroundImage: "var(--primary-gradient)" }}
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCargos.map((c, index) => {
                const isExpanded = !!expandedCards[c.id];
                const isMedio = c.nivel === "médio";
                const isTecnico = c.nivel === "técnico";
                
                return (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                    style={{ borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
                  >
                    {/* Header Retangular do Card com Altura h-52 sm:h-56 Idêntica à Imagem 2 (Padrão Petrobras) */}
                    <div className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden shrink-0">
                      {/* Foto de Fundo Profissional (Nano Banana / Stock) */}
                      <img 
                        src={bgHeaderImage} 
                        alt={`Atuação no concurso ${concurso?.nome}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      
                      {/* Overlay Gradiente Elegante para Máxima Leitura */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Logomarca no Centro caso exista */}
                      {concurso?.logo_url && (
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/70 shadow-md">
                          <img 
                            src={concurso.logo_url} 
                            alt={concurso.orgao}
                            className="h-7 w-auto object-contain" 
                          />
                        </div>
                      )}

                      {/* Tag do Órgão / Localização no Canto Superior Esquerdo */}
                      <div className="absolute top-3.5 left-3.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 text-[11px] font-bold flex items-center gap-1.5 shadow-md text-white">
                        <LuMapPin className="w-3.5 h-3.5 text-primary" style={{ color: primaryColor }} />
                        <span className="truncate max-w-[200px]">{c.nome}</span>
                      </div>

                      {/* Badges de Nível Overlay na Foto (Inferior) */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                            isMedio
                              ? "bg-emerald-600 text-white font-black"
                              : isTecnico
                              ? "bg-amber-500 text-slate-950 font-black"
                              : "bg-cyan-500 text-slate-950 font-black"
                          }`}
                        >
                          {isMedio ? (
                            <LuAward className="w-3.5 h-3.5" />
                          ) : isTecnico ? (
                            <LuWrench className="w-3.5 h-3.5" />
                          ) : (
                            <LuGraduationCap className="w-3.5 h-3.5" />
                          )}
                          {isMedio ? "Nível Médio" : isTecnico ? "Nível Técnico" : "Nível Superior"}
                        </span>

                        <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs font-bold shadow-md">
                          {isPreEdital ? "Edital 2022 (Cesgranrio)" : "Edital Oficial 2026"}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do Card Retangular */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      {/* Título & Descrição de Atuação */}
                      <div className="mb-5">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white transition-colors mb-2 leading-snug" style={{ color: primaryColor }}>
                          {c.nome}
                        </h3>

                        <div className="flex items-start gap-2 rounded-xl p-3 text-xs text-slate-700 dark:text-slate-300 border" style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 5%, transparent)`, borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}>
                          <LuBriefcase className="w-4 h-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                          <p className="leading-relaxed">
                            {c.descricao}
                          </p>
                        </div>
                      </div>

                      {/* Resumo de Matérias (Conhecimentos Básicos + Específicos) */}
                      <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-950/70 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
                        {/* Conhecimentos Básicos */}
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                            <span className="flex items-center gap-1.5" style={{ color: primaryColor }}>
                              <LuBookOpen className="w-3.5 h-3.5" />
                              Conhecimentos Básicos
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(c.materias_basicas || []).map((mat, i) => (
                              <span key={i} className="text-[11px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 font-medium">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Conhecimentos Específicos */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                              <LuFileText className="w-3.5 h-3.5" />
                              Conhecimentos Específicos
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {(c.materias_especificas || []).slice(0, isExpanded ? c.materias_especificas.length : 3).map((mat, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md border font-medium"
                                style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`, color: primaryColor, borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
                              >
                                {mat}
                              </span>
                            ))}
                            {!isExpanded && (c.materias_especificas || []).length > 3 && (
                              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md">
                                +{(c.materias_especificas || []).length - 3} mais
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expandir / Colapsar */}
                      {(c.materias_especificas || []).length > 3 && (
                        <button
                          onClick={() => toggleExpand(c.id)}
                          className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary flex items-center justify-center gap-1 mb-4 py-1.5 border-t border-b border-slate-100 dark:border-slate-800/80 transition-colors font-medium"
                        >
                          {isExpanded ? (
                            <>
                              Ocultar detalhes <LuChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Ver grade completa <LuChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      )}

                      {/* Botão de Ação Direta com Gradient do Skin System e Texto Branco Fixo no Hover */}
                      <Link
                        href={`/register?concurso=${concurso?.slug}&cargo=${c.slug}&nivel=${c.nivel}`}
                        className="w-full py-3.5 px-4 rounded-xl !text-white hover:!text-white group-hover:!text-white font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md group-hover:scale-[1.02]"
                        style={{ backgroundColor: primaryColor, backgroundImage: "var(--primary-gradient)", color: "#ffffff" }}
                      >
                        <span className="!text-white group-hover:!text-white font-black">Garantir Vaga neste Cargo</span>
                        <LuArrowRight className="w-4 h-4 !text-white group-hover:!text-white group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* CTA Banner de Rodapé */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 text-center relative overflow-hidden mt-14">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Pronto para conquistar sua vaga no concurso {concurso?.orgao || concurso?.nome}?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Escolha seu cargo, monte seu plano de estudos com simulados infinitos e utilize nossa inteligência artificial para gabaritar o edital.
          </p>
          <Link
            href={`/register?concurso=${concurso?.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full !text-white hover:!text-white group-hover:!text-white font-black text-base shadow-xl hover:scale-105 transition-all"
            style={{ backgroundColor: primaryColor, backgroundImage: "var(--primary-gradient)", color: "#ffffff" }}
          >
            <span className="!text-white group-hover:!text-white font-black">Iniciar Teste Gratuito Agora</span>
            <LuArrowRight className="w-5 h-5 !text-white group-hover:!text-white" />
          </Link>
        </div>

      </main>

      {/* Rodapé Padrão */}
      <HomeFooter />
      <ScrollToTop />
    </div>
  );
}
