"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PROFISSOES, 
  CONHECIMENTOS_BASICOS, 
  Profissao, 
  AREAS 
} from "@/lib/profissoes-edital";
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
  LuAward
} from "react-icons/lu";

// Mapeamento de imagens fardadas das profissões na Refinaria Abreu e Lima (RNEST)
function getProfissaoImage(id: string, area: string, nivel: string): string {
  if (id.includes("operacao")) {
    return "/assets/images/profissoes/petrobras_tecnico_operacao.png";
  }
  if (id.includes("seguranca") || id.includes("enfermagem")) {
    return "/assets/images/profissoes/petrobras_seguranca_trabalho.png";
  }
  if (id.includes("mecanica") || id.includes("caldeiraria")) {
    return "/assets/images/profissoes/petrobras_manutencao_mecanica.png";
  }
  if (id.includes("eletrica") || id.includes("instrumentacao")) {
    return "/assets/images/profissoes/petrobras_manutencao_eletrica.png";
  }
  if (id.includes("quimica") || id.includes("inspecao")) {
    return "/assets/images/profissoes/petrobras_quimica_inspecao.png";
  }
  if (id.includes("logistica") || id.includes("suprimento") || id.includes("edificacoes")) {
    return "/assets/images/profissoes/petrobras_logistica_suprimento.png";
  }
  if (id.includes("eng-petroleo") || id.includes("geologia") || id.includes("geofisica")) {
    return "/assets/images/profissoes/petrobras_engenharia_petroleo.png";
  }
  if (id.includes("analista-sistemas")) {
    return "/assets/images/profissoes/petrobras_analista_ti.png";
  }
  if (area === "Engenharia" || nivel === "superior") {
    return "/assets/images/profissoes/petrobras_engenheiro_senior.png";
  }
  return "/assets/images/profissoes/petrobras_logistica_suprimento.png";
}

// Descrição detalhada da atuação na Refinaria Abreu e Lima (RNEST)
function getAtuacaoRefinaria(id: string, nome: string): string {
  if (id === "suprimento-adm") {
    return "Gestão de contratos de suprimentos, licitações pelo RLCP, contratação de serviços e materiais estratégicos para a Refinaria Abreu e Lima.";
  }
  if (id.includes("operacao")) {
    return "Controle direto das unidades de destilação atmosférica, coqueamento retardado e hidrotratamento de diesel (HDT) na RNEST.";
  }
  if (id.includes("seguranca") || id.includes("enfermagem")) {
    return "Auditoria de NR-33/NR-35, gestão de SESMT, APR/HAZOP e socorro tático em ambiente industrial refinador.";
  }
  if (id.includes("mecanica") || id.includes("caldeiraria")) {
    return "Manutenção preditiva de compressores de grande porte, turbinas a vapor, reagentes e permutadores de calor.";
  }
  if (id.includes("eletrica") || id.includes("instrumentacao")) {
    return "Operação de subestações de alta tensão, calibração de malhas de controle CLP/SDCD e atuadores pneumáticos.";
  }
  if (id.includes("quimica") || id.includes("inspecao")) {
    return "Análise físico-química de frações de petróleo, ensaios não destrutivos de corrosão e garantia de especificação do S-10.";
  }
  if (id.includes("logistica") || id.includes("edificacoes")) {
    return "Gestão de inventário de insumos, escoamento de combustíveis por oleodutos/dutos e fiscalização de obras civis.";
  }
  if (id.includes("eng-petroleo") || id.includes("geologia") || id.includes("geofisica")) {
    return "Otimização de processos de produção de óleo pesado, modelagem de fluidos e garantia de escoamento até a refinaria.";
  }
  if (id.includes("analista-sistemas")) {
    return "Desenvolvimento e sustentação de sistemas SCADA, redes industriais e infraestrutura de alta disponibilidade na RNEST.";
  }
  return "Gestão técnica, orçamento de obras e conformidade operacional de grandes projetos na Refinaria Abreu e Lima.";
}

export default function VitrinePetrobrasPage() {
  const { currentTheme } = useTheme();
  const [selectedNivel, setSelectedNivel] = useState<"todos" | "medio" | "tecnico" | "superior">("todos");
  const [selectedArea, setSelectedArea] = useState<string>("todas");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtragem inteligente de profissões
  const filteredProfissoes = useMemo(() => {
    return PROFISSOES.filter((p) => {
      if (selectedNivel !== "todos" && p.nivel !== selectedNivel) {
        return false;
      }
      if (selectedArea !== "todas" && p.area !== selectedArea) {
        return false;
      }
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchNome = p.nome.toLowerCase().includes(query);
        const matchArea = p.area.toLowerCase().includes(query);
        const matchTopicos = p.blocos.some((b) =>
          b.topicos.some((t) => t.toLowerCase().includes(query))
        );
        return matchNome || matchArea || matchTopicos;
      }
      return true;
    });
  }, [selectedNivel, selectedArea, searchTerm]);

  const countMedio = useMemo(() => PROFISSOES.filter((p) => p.nivel === "medio").length, []);
  const countTecnico = useMemo(() => PROFISSOES.filter((p) => p.nivel === "tecnico").length, []);
  const countSuperior = useMemo(() => PROFISSOES.filter((p) => p.nivel === "superior").length, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Menu Sticky Fixo no Topo */}
      <StickyHeader alwaysVisible={true} />

      {/* Conteúdo Principal — Modelo Oficial de Layout Secundário */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-20 max-w-7xl">
        
        {/* Banner Hero / Cabeçalho do Concurso integrando ao Sistema de Skins */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 relative overflow-hidden text-center">
          
          {/* Fundo Panorâmico com a Refinaria Abreu e Lima visível nas laterais */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src="/images/carousel-4.png" 
              alt="Refinaria Abreu e Lima (RNEST) Petrobras" 
              className="w-full h-full object-cover object-center opacity-60 dark:opacity-40 transition-opacity duration-700"
            />
            {/* Gradiente Radial / Centralizado dinâmico */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.25)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,rgba(15,23,42,0.88)_50%,rgba(15,23,42,0.25)_100%)]" />
          </div>

          {/* Conteúdo Centralizado no Meio */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Logomarca Centralizada e Destacada */}
            <div className="mb-8 mt-2">
              <img 
                src="/assets/images/logos/petrobras-hz.png" 
                alt="Petrobras" 
                className="h-10 md:h-14 object-contain filter drop-shadow-sm" 
              />
            </div>

            {/* Pílulas de Ação e Pré-Edital com suporte a Skin */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/60 shadow-xs"
              >
                <LuArrowLeft className="w-3.5 h-3.5" />
                Voltar para a Página Inicial
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <LuSparkles className="w-4 h-4 text-primary animate-pulse" />
                PRÉ-EDITAL PETROBRAS • REFINARIA ABREU E LIMA (RNEST)
              </div>
            </div>

            {/* Título Blocado com Skin Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-5 text-balance max-w-4xl mx-auto">
              Vitrine de Cargos & <span className="text-primary">Atuação Operacional</span>
            </h1>

            {/* Subtítulo Centralizado */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto text-center">
              Conheça as profissões do concurso Petrobras com imagens exclusivas da atuação técnica na <strong>Refinaria Abreu e Lima</strong>. Navegue entre os cargos de Nível Médio, Nível Técnico e Nível Superior.
            </p>

            {/* Banner de estatísticas com Suporte a Skin */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full max-w-4xl mx-auto">
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-primary">{countMedio} Cargo</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Nível Médio (Bens e Serviços)</div>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{countTecnico} Cargos</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Ênfases Técnicas</div>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{countSuperior} Cargos</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Nível Superior</div>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-slate-900 dark:text-white">RNEST</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Foco Operacional</div>
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
                Todos os Cargos ({PROFISSOES.length})
              </button>

              <button
                onClick={() => setSelectedNivel("medio")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "medio"
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-black ring-2 ring-primary/50"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
                style={selectedNivel === "medio" ? { backgroundImage: "var(--primary-gradient)" } : {}}
              >
                <LuAward className="w-4 h-4" />
                Nível Médio (Bens e Serviços - Adm) ({countMedio})
              </button>

              <button
                onClick={() => setSelectedNivel("tecnico")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedNivel === "tecnico"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <LuWrench className="w-4 h-4" />
                Nível Técnico ({countTecnico})
              </button>

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

          {/* Filtro por Áreas de Atuação */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-2">
              <LuFilter className="w-3.5 h-3.5 text-primary" />
              Área:
            </span>

            <button
              onClick={() => setSelectedArea("todas")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                selectedArea === "todas"
                  ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700/60"
              }`}
            >
              Todas ({PROFISSOES.length})
            </button>

            {AREAS.map((area) => {
              const count = PROFISSOES.filter((p) => p.area === area).length;
              return (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    selectedArea === area
                      ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700/60"
                  }`}
                >
                  {area} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Cards Retangulares Elegantes com Suporte Total ao Skin System */}
        {filteredProfissoes.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <LuTarget className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhum cargo encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Não encontramos profissões correspondentes aos filtros selecionados. Tente buscar por outros termos ou limpar os filtros.
            </p>
            <button
              onClick={() => {
                setSelectedNivel("todos");
                setSelectedArea("todas");
                setSearchTerm("");
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProfissoes.map((p, index) => {
                const isExpanded = !!expandedCards[p.id];
                const isMedio = p.nivel === "medio";
                const isTecnico = p.nivel === "tecnico";
                const imagePath = getProfissaoImage(p.id, p.area, p.nivel);
                const atuacaoTexto = getAtuacaoRefinaria(p.id, p.nome);
                const totalTopicosEspecificos = p.blocos.reduce(
                  (acc, b) => acc + b.topicos.length,
                  0
                );

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                  >
                    {/* Header Retangular do Card com Imagem Fardada Petrobras */}
                    <div className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden shrink-0">
                      <img 
                        src={imagePath} 
                        alt={`Atuação de ${p.nome} na Refinaria Abreu e Lima`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      
                      {/* Overlay Gradiente elegante */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                      {/* Tag de Localização RNEST */}
                      <div className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md text-primary px-3 py-1 rounded-full border border-slate-700/80 text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                        <LuMapPin className="w-3.5 h-3.5 text-primary" />
                        Refinaria Abreu e Lima
                      </div>

                      {/* Badges de Nível Overlay na Foto */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                            isMedio
                              ? "bg-primary text-white font-black"
                              : isTecnico
                              ? "bg-amber-500/90 text-slate-950"
                              : "bg-cyan-500/90 text-slate-950"
                          }`}
                          style={isMedio ? { backgroundImage: "var(--primary-gradient)" } : {}}
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

                        <span className="text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                          {p.area}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do Card Retangular */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      {/* Título & Descrição de Atuação na Refinaria */}
                      <div className="mb-5">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2 leading-snug">
                          {p.nome}
                        </h3>

                        <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-slate-700 dark:text-slate-300">
                          <LuBriefcase className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            <strong className="text-primary font-semibold">Atuação em Campo: </strong> 
                            {atuacaoTexto}
                          </p>
                        </div>
                      </div>

                      {/* Resumo de Matérias (Conhecimentos Básicos + Específicos) */}
                      <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-950/70 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
                        {/* Conhecimentos Básicos */}
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                            <span className="flex items-center gap-1.5 text-primary">
                              <LuBookOpen className="w-3.5 h-3.5" />
                              Conhecimentos Básicos
                            </span>
                            <span className="text-[10px] text-slate-400">Comum a todos</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 font-medium">
                              {CONHECIMENTOS_BASICOS.linguaPortuguesa.nome}
                            </span>
                            <span className="text-[11px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 font-medium">
                              {CONHECIMENTOS_BASICOS.matematica.nome}
                            </span>
                            {p.nivel === "superior" && (
                              <span className="text-[11px] bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800 font-bold flex items-center gap-1">
                                <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                                  <img src="/images/petrolingo/petrolingo.png" alt="PetroLingo" className="w-2.5 h-2.5 object-contain" />
                                </span>
                                Inglês
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Conhecimentos Específicos */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                              <LuFileText className="w-3.5 h-3.5" />
                              Conhecimentos Específicos
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {p.blocos.length} Blocos ({totalTopicosEspecificos} tópicos)
                            </span>
                          </div>

                          {/* Blocos de matérias com Skin Pills */}
                          <div className="space-y-2">
                            {p.blocos.map((bloco, bIdx) => (
                              <div key={bIdx} className="text-xs">
                                <div className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] mb-1">
                                  {bloco.nome}:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {bloco.topicos.slice(0, isExpanded ? bloco.topicos.length : 3).map((topico, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20 font-medium"
                                    >
                                      {topico}
                                    </span>
                                  ))}
                                  {!isExpanded && bloco.topicos.length > 3 && (
                                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md">
                                      +{bloco.topicos.length - 3} mais
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expandir / Colapsar */}
                      <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary flex items-center justify-center gap-1 mb-4 py-1.5 border-t border-b border-slate-100 dark:border-slate-800/80 transition-colors font-medium"
                      >
                        {isExpanded ? (
                          <>
                            Ocultar detalhes <LuChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Ver grade completa dos {totalTopicosEspecificos} tópicos <LuChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {/* Botão de Ação Direta com Gradient do Skin System */}
                      <Link
                        href={`/register?concurso=petrobras&cargo=${p.id}&nivel=${p.nivel === "superior" ? "superior" : "medio"}`}
                        className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white hover:text-white group-hover:text-white font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-primary/20 group-hover:scale-[1.02]"
                        style={{ backgroundImage: "var(--primary-gradient)" }}
                      >
                        Garantir Vaga neste Cargo
                        <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            Pronto para conquistar sua vaga na Petrobras?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Escolha seu cargo, monte seu plano de estudos com simulados infinitos padrão Cesgranrio e utilize nossa inteligência artificial para gabaritar o edital da Refinaria Abreu e Lima.
          </p>
          <Link
            href="/register?concurso=petrobras"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white group-hover:text-white font-black text-base shadow-xl shadow-primary/30 hover:scale-105 transition-all"
            style={{ backgroundImage: "var(--primary-gradient)" }}
          >
            Iniciar Teste Gratuito Agora
            <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </main>

      {/* Rodapé Padrão */}
      <HomeFooter />
      <ScrollToTop />
    </div>
  );
}
