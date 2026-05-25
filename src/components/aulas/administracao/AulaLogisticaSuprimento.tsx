"use client";

import { useState, useEffect } from "react";
import {
  AulaTemplate,
  ModuleBanner,
  ModuleSectionHeader,
  AlertBox,
  ContentAccordion,
  ModuleConsolidation,
  QuizInterativo,
  AulaProps,
  CardCarousel,
  getRandomQuestions,
} from "../shared";
import { TabsContent } from "@/components/ui/tabs";
import {
  LuZap,
  LuBookOpen,
  LuFileText,
  LuBrain,
  LuActivity,
  LuRepeat,
  LuSearch,
  LuCheck,
  LuPlay,
  LuImage,
  LuVolume2,
} from "react-icons/lu";
import { LOGISTICA_QUIZZES } from "@/data/quizzes/logistica-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

/**
 * AULA: Logística e Distribuição (Suprimento) - Ultimate V4.1
 * Estabilidade: Padrão Ouro (10 Módulos + Consolidação Completa)
 */
export default function AulaLogisticaSuprimento(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_logistica_suprimento_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          const arr = JSON.parse(saved);
          return new Set(arr);
        } catch (e) {
          return new Set();
        }
      }
    }
    return new Set();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}completed_modules`,
        JSON.stringify(Array.from(completedModules))
      );
    }
  }, [completedModules]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Fundamentos e Cadeia de Suprimentos" },
    { id: "modulo-2", label: "Módulo 2", title: "Gestão Integrada de Estoques" },
    { id: "modulo-3", label: "Módulo 3", title: "Armazenagem e Centros de Distribuição" },
    { id: "modulo-4", label: "Módulo 4", title: "Modais e Gestão de Transportes" },
    { id: "modulo-5", label: "Módulo 5", title: "Logística Inbound e Outbound" },
    { id: "modulo-6", label: "Módulo 6", title: "Supply Chain Management (SCM)" },
    { id: "modulo-7", label: "Módulo 7", title: "Indicadores de Desempenho (KPIs)" },
    { id: "modulo-8", label: "Módulo 8", title: "Logística Reversa e Sustentabilidade" },
    { id: "modulo-9", label: "Módulo 9", title: "Logística Offshore Petrobras" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral Logística" },
  ] as const;

  const handleModuleComplete = (modId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => new Set([...prev, modId]));
      const progress = Math.round((completedModules.size / (MODULE_DEFS.length - 1)) * 100);
      props.onUpdateProgress?.(progress);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = LOGISTICA_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt, i) => ({
        label: String.fromCharCode(65 + i),
        valor: opt,
      })),
      correta: String.fromCharCode(65 + q.correct),
      explicacao: q.explanation,
    }));
  };

  // Variantes de cor via sistema centralizado (getModuleVariant)
  const mv = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, any>;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      modules={MODULE_DEFS}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Logística e Distribuição (Suprimento)"
      descricao="Domine os conceitos fundamentais de logística, gestão de estoques, modais de transporte e as particularidades da logística offshore na Petrobras."
      duracao="20h"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.size >= MODULE_DEFS.length - 1}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      <TabsContent value="modulo-1" className="space-y-12 mt-0">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos e Cadeia de Suprimentos"
          descricao="O papel estratégico da logística na criação de valor e a evolução do Supply Chain Management."
          variant={mv[1]}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[1]}
            title="A Missão Estratégica da Logística"
            description="Muito além de transportar: como a logística cria valor competitivo para a Petrobras."
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>logística</strong> é a área responsável por planejar, implementar e controlar o fluxo eficiente de materiais,
              informações e recursos, desde a origem (fornecedor) até o destino final (cliente ou plataforma). Na Petrobras,
              logística não é apenas &quot;entregar coisas&quot; — é garantir que <strong>sondas, químicos, peças de reposição e alimentos</strong> cheguem
              às plataformas offshore em condições perfeitas, no prazo correto e com custo otimizado.</p>
            <p>Questões de exames de logística da Petrobras abordam a gestão integrada da cadeia (SCM) e os fluxos contínuos de materiais e dados.</p>
            <p>O conceito clássico do <strong>Council of Supply Chain Management Professionals (CSCMP)</strong> define logística como
              a parte do Supply Chain que planeja, implementa e controla o fluxo e armazenagem eficientes e eficazes de bens,
              serviços e informações relacionadas, do ponto de origem ao ponto de consumo. Essa definição é a que a <strong>CESGRANRIO</strong> adota
              em suas provas — memorize-a.</p>
            <p>A logística integrada é dividida em subsistemas funcionais: inbound (suprimento de fornecedores) e outbound (distribuição física de produtos).</p>
            <p>A logística cria <strong>quatro tipos de valor (utilidades)</strong>: (1) <strong>Utilidade de Lugar</strong> — levar o produto
              onde ele é necessário; (2) <strong>Utilidade de Tempo</strong> — entregar quando é necessário; (3) <strong>Utilidade de Posse</strong> —
              facilitar a transferência de propriedade; (4) <strong>Utilidade de Forma</strong> — contribuir para a transformação
              (embalagem, unitização). Na Petrobras, a utilidade de lugar e tempo são críticas: uma peça que chega 1 dia atrasada
              a uma plataforma pode paralisar operações de milhões de reais por dia.</p>
            <p>Um exemplo clássico de trade-off reside no equilíbrio entre consolidar cargas para reduzir frete e o correspondente aumento no inventário médio.</p>
            <p>O conceito de <strong>logística reversa</strong> ganha destaque no edital 2023 da Petrobras: trata-se do retorno de produtos, embalagens e resíduos ao ciclo produtivo. Na indústria do petróleo, isso inclui retorno de tambores de químicos, catalisadores gastos e equipamentos recuperados das plataformas. Empresas estatais estão sujeitas à Política Nacional de Resíduos Sólidos (Lei 12.305/2010).</p>
            <p>A integração alinha o planejamento de demanda com a capacidade fabril (S&OP), mitigando faltas de insumos nos almoxarifados centrais.</p>
            <p>Em provas da CESGRANRIO, quando o enunciado descreve "uma empresa que garante produto certo, quantidade certa, local certo e momento certo, com custo mínimo", está descrevendo os <strong>7 Certos da Logística</strong>. Identifique-os e elimine alternativas que confundem logística com produção. O Técnico de Administração deve dominar essa distinção para não perder pontos em questões de interpretação.</p>
            <p>Na Petrobras, a cadeia logística estende-se das bacias marítimas de exploração até o refino por dutos terrestres operados pela Transpetro.</p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">📦 Os 7 Certos da Logística</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ Produto <strong>certo</strong>, na quantidade <strong>certa</strong></li>
                <li>✓ No lugar <strong>certo</strong>, no tempo <strong>certo</strong></li>
                <li>✓ Na condição <strong>certa</strong>, ao custo <strong>certo</strong></li>
                <li>✓ Para o cliente <strong>certo</strong></li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[1]}
            title="Pilares Logísticos"
            description="Os fundamentos que sustentam toda a cadeia de suprimentos."
          />
          <CardCarousel
            cards={[
              { titulo: "Utilidade de Lugar", descricao: "Levar o recurso exatamente onde ele é necessário — da base terrestre à plataforma offshore.", icone: <LuActivity />, corFundo: "bg-amber-500/10" },
              { titulo: "Utilidade de Tempo", descricao: "Garantir que o material chegue no momento certo, evitando paradas operacionais milionárias.", icone: <LuRepeat />, corFundo: "bg-blue-500/10" },
              { titulo: "Logística Integrada", descricao: "Fluxo sincronizado de materiais, informações e recursos financeiros ao longo da cadeia.", icone: <LuBrain />, corFundo: "bg-emerald-500/10" },
              { titulo: "Trade-off Logístico", descricao: "Equilibrar custo de transporte vs. custo de estoque vs. nível de serviço ao cliente.", icone: <LuSearch />, corFundo: "bg-cyan-500/10" },
              { titulo: "Cadeia de Valor", descricao: "A logística como elo estratégico entre fornecedores, operações e clientes finais.", icone: <LuZap />, corFundo: "bg-rose-500/10" },
              { titulo: "Visão Sistêmica", descricao: "Otimizar o todo, não as partes isoladas — o custo total logístico é o que importa.", icone: <LuFileText />, corFundo: "bg-cyan-500/10" },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[1]}
            title="Análise Técnica C.E.D.E."
            description="Conceituação, Exemplificação, Dicas e Exceções dos fundamentos logísticos."
          />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: A Evolução da Logística",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A logística evoluiu em <strong>4 fases históricas</strong>: (1) <strong>Fragmentação</strong> (até 1960) — atividades isoladas
                      sem coordenação; (2) <strong>Integração Funcional</strong> (1960-1980) — agrupamento em distribuição física e gestão de materiais;
                      (3) <strong>Integração Interna</strong> (1980-2000) — visão de custo total logístico; (4) <strong>Integração Estratégica</strong> (2000+) —
                      Supply Chain Management e colaboração interempresarial.
                    </p>
                    <AlertBox tipo="info" titulo="Definição CSCMP">
                      Logística é a parte do SCM que planeja, implementa e controla o fluxo e armazenagem eficientes de bens, serviços e informações,
                      do ponto de origem ao ponto de consumo, visando atender aos requisitos do cliente.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Logística na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras opera uma das logísticas mais complexas do mundo: abastecer plataformas a 300 km da costa,
                      em alto-mar, com condições climáticas imprevisíveis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-emerald-500" /> Inbound</h5>
                        <p className="text-lg">Recebimento de tubos, válvulas e químicos nos portos de Macaé e Niterói.</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-blue-500" /> Outbound</h5>
                        <p className="text-lg">Embarque em PSVs (Platform Supply Vessels) para as plataformas da Bacia de Santos.</p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas Táticas: Questões CESGRANRIO",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A CESGRANRIO cobra frequentemente a diferença entre <strong>Logística</strong> e <strong>Supply Chain Management</strong>.</p>
                    <ul className="list-disc pl-5 space-y-2 text-lg">
                      <li><strong>Logística</strong> é PARTE do SCM — foca no fluxo físico e de informações.</li>
                      <li><strong>SCM</strong> é o TODO — inclui logística + relacionamento com fornecedores + estratégia de compras + gestão de demanda.</li>
                      <li>Se a questão falar em &quot;coordenação entre empresas&quot;, é <strong>SCM</strong>. Se falar em &quot;fluxo de materiais&quot;, é <strong>Logística</strong>.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Logística vs. Operações",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Cuidado para não confundir logística com gestão de operações:</p>
                    <AlertBox tipo="warning" titulo="pontos de atenção clássica">
                      Logística NÃO é responsável pela transformação do produto (refino, perfuração). Ela cuida do FLUXO entre
                      as etapas de transformação. A transformação em si é responsabilidade da Gestão de Operações/Produção.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={1}
          variant={mv[1]}
          video={{ videoId: "LOG1_V", title: "Fundamentos da Logística", duration: "15:00" }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Logística",
            materia: "Suprimento",
            images: [
              { title: "Cadeia de Valor", type: "Esquema", placeholderColor: "bg-amber-500/20" },
              { title: "7 Certos", type: "Infográfico", placeholderColor: "bg-blue-500/20" },
            ],
          }}
          sinteseEstrategica={{
            title: "Os 7 Certos",
            content: (
              <div className="space-y-2 text-lg font-bold text-center">
                <p>Produto + Quantidade + Lugar + Tempo</p>
                <p>+ Condição + Custo + Cliente</p>
                <p className="text-muted-foreground font-normal text-sm mt-2">= Logística Perfeita</p>
              </div>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Podcast: Essência Logística", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-1")}
          titulo="QUIZ: Fundamentos e Cadeia de Suprimentos"
          numero={1}
          variant={mv[1]}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 2 ==================== */}
      <TabsContent value="modulo-2" className="space-y-12 mt-0">
        <ModuleBanner numero={2} titulo="Gestão Integrada de Estoques" variant={mv[2]} descricao="Curva ABC, classificação XYZ, Ponto de Pedido e Lote Econômico de Compra." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[2]} title="A Ciência do Estoque" description="Quanto manter, quando repor e como classificar — o trio de ouro da gestão de materiais." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Gestão de estoques</strong> é a arte de equilibrar dois extremos: ter material demais (capital parado, custo
              de armazenagem) vs. ter material de menos (risco de parada operacional, perda de receita). Na Petrobras, esse
              equilíbrio é crítico: uma válvula que falta numa plataforma offshore pode custar milhões em produção perdida,
              mas manter estoque excessivo em bases terrestres congela capital que poderia ser investido em exploração.</p>
            <p>A banca exige cálculos de ponto de pedido, lote econômico de compras (LEC) e o controle preventivo pela curva ABC por valor financeiro.</p>
            <p>A <strong>Curva ABC</strong> (Pareto) classifica itens em 3 faixas: <strong>A</strong> (20% dos itens = 80% do valor),
              <strong>B</strong> (30% dos itens = 15% do valor), <strong>C</strong> (50% dos itens = 5% do valor). Itens A são
              controlados com rigor extremo; itens C podem ter controle simplificado. Já a <strong>classificação XYZ</strong> mede
              a criticidade: <strong>X</strong> = imprescindível (parada total sem ele), <strong>Y</strong> = importante,
              <strong>Z</strong> = substituível.</p>
            <p>O ponto de pedido determina o momento exato de disparar reposição: PP = (Demanda Média x Lead Time) + Estoque de Segurança.</p>
            <p>O <strong>Ponto de Pedido (PP)</strong> é o nível de estoque que, ao ser atingido, dispara automaticamente uma nova
              compra. Fórmula: PP = (Demanda média × Lead Time) + Estoque de Segurança. O <strong>Lote Econômico de Compra (LEC)</strong> é
              a quantidade ideal por pedido que minimiza o custo total (custo de pedir + custo de manter).</p>
            <p>Métodos de valoração como PEPS (FIFO) registram saídas pelo custo histórico antigo; o Custo Médio Ponderado dilui oscilações de preços.</p>
            <p>O <strong>Sistema MRP (Material Requirements Planning)</strong> calcula automaticamente as necessidades de materiais com base na demanda prevista, estrutura do produto (BOM — Bill of Materials) e estoques em mãos. Seu sucessor, o <strong>MRP II</strong>, incorpora capacidade produtiva e recursos financeiros. O <strong>ERP (Enterprise Resource Planning)</strong> integra MRP com módulos de compras, RH e financeiro — como o SAP utilizado pela Petrobras em suas operações globais.</p>
            <p>A acurácia de inventário avalia a exatidão entre o estoque físico real e os saldos em sistema por meio de contagens cíclicas periódicas.</p>
            <p>Questão típica CESGRANRIO: "Uma empresa tem demanda de 500 unidades/mês, lead time de 2 meses e estoque de segurança de 300 unidades. Qual o Ponto de Pedido?" — Aplicando PP = (500 × 2) + 300 = <strong>1.300 unidades</strong>. O Técnico de Suprimento deve dominar esse cálculo para resolver questões quantitativas sem calculadora, usando apenas as fórmulas memorizadas.</p>
            <p>Em bases offshore da Petrobras, a contagem diária de sobressalentes críticos previne paradas onerosas na exploração de hidrocarbonetos.</p>
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-2">📊 Classificação ABC + XYZ</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>AX:</strong> Alto valor + Imprescindível = Controle máximo</li>
                <li>✓ <strong>CZ:</strong> Baixo valor + Substituível = Controle mínimo</li>
                <li>✓ Cruzamento ABC×XYZ gera <strong>9 categorias</strong> de gestão</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} variant={mv[2]} title="Ferramentas de Estoques" description="As técnicas que a CESGRANRIO cobra em toda prova de Suprimento." />
          <CardCarousel
            cards={[
              { titulo: "Curva ABC (Pareto)", descricao: "20% dos itens representam 80% do valor — foque neles.", icone: <LuActivity />, corFundo: "bg-blue-500/10" },
              { titulo: "Classificação XYZ", descricao: "Mede criticidade: X (vital), Y (importante), Z (dispensável).", icone: <LuSearch />, corFundo: "bg-emerald-500/10" },
              { titulo: "Ponto de Pedido", descricao: "PP = (Demanda × Lead Time) + Estoque de Segurança.", icone: <LuRepeat />, corFundo: "bg-amber-500/10" },
              { titulo: "Lote Econômico (LEC)", descricao: "Quantidade ótima que minimiza custo total de aquisição e manutenção.", icone: <LuZap />, corFundo: "bg-rose-500/10" },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} variant={mv[2]} title="Análise C.E.D.E." description="Dominando estoques para a prova CESGRANRIO." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Tipos de Estoque",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Existem <strong>5 tipos principais</strong>: (1) Matéria-prima; (2) Produtos em processamento (WIP); (3) Produtos acabados; (4) Estoque de segurança; (5) Estoque em trânsito.</p>
                    <AlertBox tipo="info" titulo="Custo Total de Estoque">
                      CT = Custo de Aquisição + Custo de Manutenção + Custo de Pedido + Custo de Falta. O LEC minimiza esse CT.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Estoques na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Na Petrobras, itens classe <strong>AX</strong> incluem BOP (Blowout Preventer) e risers flexíveis — peças caríssimas e absolutamente vitais para segurança.</p>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-lg"><strong>Caso real:</strong> Um riser custa R$ 2-5 milhões e leva 6 meses para fabricar. Classificação: A (valor) + X (imprescindível). Controle: inventário mensal + inspeção visual semanal.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas Táticas: Fórmulas de Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A CESGRANRIO adora cobrar cálculos de PP e LEC:</p>
                    <ul className="list-disc pl-5 space-y-2 text-lg">
                      <li><strong>PP</strong> = D × LT + ES (Demanda × Lead Time + Estoque Segurança)</li>
                      <li><strong>LEC</strong> = √(2DS / H) onde D=demanda anual, S=custo de pedido, H=custo de manutenção unitário</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: JIT e Estoque Zero",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <p>O sistema <strong>Just-in-Time</strong> busca estoque zero, mas na Petrobras offshore isso é <strong>impossível</strong>.</p>
                    <AlertBox tipo="warning" titulo="Atenção!">
                      JIT funciona em fábricas terrestres com fornecedores próximos. Em plataformas a 300 km da costa, o estoque de segurança é obrigatório — não existe &quot;entrega em 2 horas&quot; no meio do oceano.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant={mv[2]}
          video={{ videoId: "LOG2_V", title: "Gestão Integrada de Estoques", duration: "16:00" }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Estoques",
            materia: "Logística",
            images: [
              { title: "Curva ABC", type: "Gráfico", placeholderColor: "bg-blue-500/20" },
              { title: "Fórmula LEC", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
            ],
          }}
          sinteseEstrategica={{
            title: "ABC em 3 segundos",
            content: (
              <div className="space-y-2 text-lg font-bold text-center">
                <p className="text-rose-400">A = 20% itens → 80% valor</p>
                <p className="text-amber-400">B = 30% itens → 15% valor</p>
                <p className="text-emerald-400">C = 50% itens → 5% valor</p>
              </div>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "Podcast: Estoques Inteligentes", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-2")}
          titulo="QUIZ: Gestão Integrada de Estoques"
          numero={2}
          variant={mv[2]}
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 3 ==================== */}
      <TabsContent value="modulo-3" className="space-y-12 mt-0">
        <ModuleBanner numero={3} titulo="Armazenagem e Centros de Distribuição" variant={mv[3]} descricao="Layouts de armazém, WMS, FIFO/LIFO e técnicas de picking industrial." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[3]} title="A Ciência da Armazenagem" description="Muito mais que guardar: como o layout e a tecnologia maximizam eficiência." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Armazenagem</strong> é a atividade logística que gerencia o espaço físico necessário para manter estoques.
              Inclui recebimento, conferência, endereçamento, estocagem, separação (picking), embalagem e expedição.
              Na Petrobras, os armazéns em bases como Macaé e Niterói são vitais para o fluxo offshore.</p>
            <p>CESGRANRIO cobra layouts de CDs e métodos de picking. Lembre-se de que o cross-docking dispensa a estocagem intermediária na distribuição.</p>
            <p>Os <strong>layouts de armazém</strong> mais cobrados em prova são: (1) <strong>Layout em U</strong> — recebimento e expedição
              no mesmo lado, favorecendo cross-docking; (2) <strong>Layout em I (Flow-through)</strong> — recebimento numa ponta, expedição
              na outra; (3) <strong>Layout em L</strong> — solução intermediária. O <strong>WMS (Warehouse Management System)</strong> é o
              software que controla toda a operação, desde endereçamento até rastreabilidade de lotes.</p>
            <p>O layout em 'U' otimiza a movimentação interna em armazéns com alto giro ao dispor recebimento e expedição em docas integradas vizinhas.</p>
            <p>O <strong>cross-docking</strong> é a técnica de transferir mercadoria do veículo de chegada diretamente para o veículo de saída, sem armazenagem intermediária. É amplamente usado por distribuidores de alimentos e medicamentos que exigem agilidade. Na Petrobras, o cross-docking aplica-se na transferência de cargas entre navios PSV e helicópteros nas bases logísticas de Macaé e Niterói.</p>
            <p>Os sistemas porta-paletes convencionais garantem 100% de seletividade no picking, enquanto sistemas compactos maximizam o espaço útil.</p>
            <p>A <strong>unitização de cargas</strong> reduz custos de movimentação: <strong>paletização</strong> agrupa volumes em paletes (padrão ABNT NBR NM ISO 8611: 1.200×1.000mm); <strong>conteinerização</strong> usa contêineres ISO de 20 ou 40 pés. A Petrobras utiliza <em>offshore containers</em> certificados pela DNV, sob norma EN 12079, projetados para içamento em alto-mar com resistência à corrosão salina e impactos de onda.</p>
            <p>O WMS (Warehouse Management System) coordena a armazenagem inteligente e tarefas físicas de operadores de empilhadeiras em tempo real.</p>
            <p>Ao identificar uma questão CESGRANRIO sobre "<em>qual processo elimina a necessidade de armazenagem temporária no CD</em>", a resposta é <strong>cross-docking</strong>. Quando a questão menciona "<em>sistema que gerencia todas as movimentações dentro do armazém</em>", é o <strong>WMS (Warehouse Management System)</strong>. Esses dois conceitos são os mais cobrados do Módulo de Armazenagem.</p>
            <p>Os Centros de Defesa Ambiental (CDA) da Petrobras estocam preventivamente barreiras flutuantes para despacho imediato em sinistros ambientais.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">📐 Princípios de Armazenagem</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>FIFO:</strong> First In, First Out — primeiro que entra, primeiro que sai (perecíveis)</li>
                <li>✓ <strong>LIFO:</strong> Last In, First Out — usado em granéis e commodities</li>
                <li>✓ <strong>FEFO:</strong> First Expired, First Out — para produtos com validade</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={3} variant={mv[3]} title="Estrutura do CD" description="Como funciona um Centro de Distribuição por dentro." />
          <CardCarousel
            cards={[
              { titulo: "Layout em U", descricao: "Recebi e expedi pelo mesmo lado — ideal para cross-docking.", icone: <LuRepeat />, corFundo: "bg-emerald-500/10" },
              { titulo: "WMS", descricao: "Sistema que controla endereçamento, picking, rastreabilidade e inventário em tempo real.", icone: <LuBrain />, corFundo: "bg-blue-500/10" },
              { titulo: "Picking/Separação", descricao: "Processo de coleta de itens no armazém — quanto mais rápido, menor o custo.", icone: <LuZap />, corFundo: "bg-amber-500/10" },
              { titulo: "Cross-Docking", descricao: "Material vai direto do recebimento para expedição, sem estocar — reduz custos.", icone: <LuActivity />, corFundo: "bg-rose-500/10" },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader index={3} variant={mv[3]} title="Análise C.E.D.E." description="Dominando armazenagem para a prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Funções da Armazenagem",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A armazenagem tem <strong>4 funções</strong>: (1) Abrigo — proteger materiais; (2) Consolidação — agrupar cargas de diferentes origens; (3) Transferência — redistribuir para destinos; (4) Sorting — separar e classificar.</p>
                    <AlertBox tipo="info" titulo="Custo de Armazenagem">
                      Inclui: aluguel, mão de obra, equipamentos, seguro, obsolescência e oportunidade do capital parado.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Bases Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A base de Macaé (RJ) é o maior hub logístico offshore do Brasil. Opera 24/7 carregando PSVs com suprimentos para as plataformas.</p>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-lg"><strong>Processo:</strong> Recebimento → Conferência (RFID) → Endereçamento (WMS) → Separação → Unitização em cestas offshore → Embarque no PSV.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: FIFO vs LIFO vs FEFO",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A CESGRANRIO adora cenários práticos:</p>
                    <ul className="list-disc pl-5 space-y-2 text-lg">
                      <li><strong>Alimentos para plataforma?</strong> → FEFO (validade mais curta sai primeiro)</li>
                      <li><strong>Tubos de aço empilhados?</strong> → LIFO (último empilhado sai primeiro por logística física)</li>
                      <li><strong>Peças de reposição?</strong> → FIFO (evitar obsolescência)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Armazenagem Zero",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Cross-Docking ≠ Eliminação total">
                      O cross-docking reduz a necessidade de estoque, mas não elimina a armazenagem: ainda é preciso um espaço físico para receber, classificar e reexpedir.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={3} variant={mv[3]}
          video={{ videoId: "LOG3_V", title: "Armazenagem e Centros de Distribuição", duration: "14:00" }}
          resumoVisual={{ moduloNome: "Módulo 3", tituloAula: "Armazenagem", materia: "Logística", images: [{ title: "Layout em U", type: "Esquema", placeholderColor: "bg-emerald-500/20" }, { title: "Fluxo WMS", type: "Diagrama", placeholderColor: "bg-cyan-500/20" }] }}
          sinteseEstrategica={{ title: "Regra de Ouro do Picking", content: (<div className="text-center text-lg font-bold"><p>Mais GIRO = Mais PERTO da porta</p><p className="text-muted-foreground font-normal text-sm mt-1">Itens classe A ficam na zona nobre do armazém</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "Podcast: Dentro do CD", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="QUIZ: Armazenagem e CDs" numero={3} variant={mv[3]} onComplete={(score) => handleModuleComplete("modulo-3", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 4 ==================== */}
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        <ModuleBanner numero={4} titulo="Modais e Gestão de Transportes" variant={mv[4]} descricao="Os 5 modais de transporte, intermodalidade, multimodalidade e o papel do dutoviário na Petrobras." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[4]} title="Os 5 Modais de Transporte" description="Rodoviário, ferroviário, aquaviário, dutoviário e aéreo — características e trade-offs." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O Brasil possui uma <strong>matriz de transporte desequilibrada</strong>: ~60% rodoviário, ~21% ferroviário, ~14% aquaviário,
              ~4% dutoviário, ~1% aéreo. Na Petrobras, o <strong>dutoviário</strong> é o modal estratégico — a malha de oleodutos e gasodutos
              movimenta a maior parte da produção. Já o <strong>aquaviário</strong> (cabotagem + navegação offshore) é essencial para
              abastecer plataformas e transportar petróleo cru dos FPSOs.</p>
            <p>A banca avalia as características de cada modal de transporte. O aquaviário destaca-se pela alta capacidade de carga a baixíssimo custo por ton/km.</p>
            <p>Cada modal tem <strong>trade-offs</strong>: rodoviário é flexível mas caro por tonelada-km; ferroviário é barato mas inflexível;
              aquaviário tem maior capacidade mas é lento; dutoviário tem alto investimento inicial mas custo operacional ínfimo;
              aéreo é o mais rápido mas o mais caro. A CESGRANRIO adora pedir para comparar modais em cenários específicos.</p>
            <p>A intermodalidade utiliza contratos e transportadores diferentes para cada trecho; a multimodalidade opera sob um único contrato com um OTM.</p>
            <p>A logística inbound gerencia o recebimento criteriosa de insumos dos fornecedores, controlando agendamento de docas, conferência física e registro fiscal de entradas no sistema ERP.</p>
            <p>O modal ferroviário é altamente eficiente para transportar granéis minerais sobre longas distâncias, com excelente economia de escala.</p>
            <p>O outbound coordena o despacho e a rastreabilidade das entregas ao cliente interno ou externo, garantindo a conformidade das janelas de entrega com os acordos de nível de serviço.</p>
            <p>O modal dutoviário oferece fluxos ininterruptos para granéis líquidos e gasosos, embora exija pesados aportes iniciais em infraestrutura.</p>
            <p>Os sistemas TMS (Transportation Management System) automatizam a contratação de fretes, a otimização de rotas e o rastreamento em tempo real de cargas transportadas pelos modais logísticos.</p>
            <p>A Petrobras utiliza intensamente o modal aéreo por helicópteros para o transporte diário de turmas de rendição de tripulações para plataformas offshore.</p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">🚢 Modais na Petrobras</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Dutoviário:</strong> Oleodutos (OSBRA, OSPAR) e gasodutos (Bolívia-Brasil)</li>
                <li>✓ <strong>Aquaviário:</strong> PSVs para plataformas + cabotagem de derivados</li>
                <li>✓ <strong>Rodoviário:</strong> Distribuição de combustíveis às bases</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={4} variant={mv[4]} title="Comparativo de Modais" description="Vantagens e desvantagens de cada modal de transporte." />
          <CardCarousel
            cards={[
              { titulo: "Rodoviário", descricao: "Flexível, porta-a-porta, mas alto custo por t/km e dependência de infraestrutura viária.", icone: <LuActivity />, corFundo: "bg-amber-500/10" },
              { titulo: "Ferroviário", descricao: "Ideal para granéis a longa distância. Baixo custo, mas rota fixa e lento.", icone: <LuRepeat />, corFundo: "bg-blue-500/10" },
              { titulo: "Aquaviário", descricao: "Maior capacidade de carga. Essencial para comércio exterior e cabotagem.", icone: <LuZap />, corFundo: "bg-cyan-500/10" },
              { titulo: "Dutoviário", descricao: "Petrobras: modal-chave. Alto investimento, menor custo operacional. Opera 24/7.", icone: <LuBrain />, corFundo: "bg-emerald-500/10" },
              { titulo: "Aéreo", descricao: "Mais rápido, mais caro. Usado para peças urgentes e emergências offshore.", icone: <LuSearch />, corFundo: "bg-rose-500/10" },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader index={4} variant={mv[4]} title="Análise C.E.D.E." description="Dominando transportes para prova de Suprimento." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Inter vs Multi",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>Intermodalidade</strong> = mais de 1 modal + mais de 1 documento (cada trecho tem seu CT-e). <strong>Multimodalidade</strong> = mais de 1 modal + 1 único documento (OTM emitido pelo Operador de Transporte Multimodal).</p>
                    <AlertBox tipo="info" titulo="Operador de Transporte Multimodal (OTM)">
                      Responsável único pela carga do início ao fim, mesmo usando diferentes modais. Regulado pela Lei 9.611/98.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Dutos Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A Petrobras opera ~7.700 km de oleodutos e ~9.100 km de gasodutos. O <strong>OSBRA</strong> (Oleoduto São Paulo–Brasília) transporta derivados para o Centro-Oeste.</p>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-lg"><strong>Vantagem competitiva:</strong> Dutoviário opera 24h/dia, 365 dias/ano, sem motorista, sem estrada, sem congestionamento. Custo variável próximo de zero após construção.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Comparação Rápida",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Decore esta hierarquia para a prova:</p>
                    <ul className="list-disc pl-5 space-y-1 text-lg">
                      <li><strong>Velocidade:</strong> Aéreo {">"} Rodoviário {">"} Ferroviário {">"} Aquaviário {">"} Dutoviário</li>
                      <li><strong>Capacidade:</strong> Aquaviário {">"} Dutoviário {">"} Ferroviário {">"} Rodoviário {">"} Aéreo</li>
                      <li><strong>Custo/ton-km:</strong> Dutoviário {"<"} Aquaviário {"<"} Ferroviário {"<"} Rodoviário {"<"} Aéreo</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Cabotagem vs Longo Curso",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Não confundir!">
                      <strong>Cabotagem</strong> = navegação entre portos do mesmo país. <strong>Longo Curso</strong> = navegação internacional. A Petrobras usa ambos — cabotagem para derivados na costa e longo curso para exportação de petróleo.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={4} variant={mv[4]}
          video={{ videoId: "LOG4_V", title: "Modais e Gestão de Transportes", duration: "18:00" }}
          resumoVisual={{ moduloNome: "Módulo 4", tituloAula: "Transportes", materia: "Logística", images: [{ title: "Matriz Modal BR", type: "Infográfico", placeholderColor: "bg-amber-500/20" }, { title: "Malha Dutoviária", type: "Mapa", placeholderColor: "bg-emerald-500/20" }] }}
          sinteseEstrategica={{ title: "Hierarquia de Custo", content: (<div className="text-center text-lg font-bold space-y-1"><p className="text-emerald-400">Dutoviário 💰</p><p className="text-blue-400">Aquaviário 💰💰</p><p className="text-cyan-400">Ferroviário 💰💰💰</p><p className="text-amber-400">Rodoviário 💰💰💰💰</p><p className="text-rose-400">Aéreo 💰💰💰💰💰</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", titulo: "Podcast: Modais Brasileiros", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="QUIZ: Modais e Transportes" numero={4} variant={mv[4]} onComplete={(score) => handleModuleComplete("modulo-4", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 5 ==================== */}
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        <ModuleBanner numero={5} titulo="Logística Inbound e Outbound" variant={mv[5]} descricao="Fluxos de entrada e saída, Milk Run, Cross-Docking, Last Mile e Postponement." />

        {/* ★ RICH INTRO SECTION */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[5]} title="Fluxos de Entrada e Saída" description="Como os materiais chegam à empresa e como os produtos alcançam o cliente final." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A logística se divide em dois grandes fluxos: <strong>Inbound</strong> (logística de entrada) e <strong>Outbound</strong> (logística de saída).
              O <strong>Inbound</strong> abrange todas as atividades desde o fornecedor até a empresa — compras, recebimento, conferência, armazenagem de matérias-primas.
              O <strong>Outbound</strong> cobre da empresa até o cliente final — separação, embalagem, expedição, transporte e entrega.
              Na Petrobras, o Inbound traz tubos, válvulas e químicos das fábricas para as bases terrestres; o Outbound embarca esses materiais em PSVs rumo às plataformas.</p>
            <p>A prova aborda a gestão de entrada física e a distribuição física de saída. Lembre-se de que a logística inbound gerencia agendamentos e recepção de insumos.</p>
            <p>O <strong>Milk Run</strong> é uma estratégia de coleta programada onde um veículo percorre uma rota fixa coletando materiais de múltiplos
              fornecedores — como o leiteiro que passa de casa em casa. Reduz custos de transporte (em até 40%) e viabiliza entregas frequentes
              com lotes menores, aproximando-se do JIT. Na indústria automotiva é amplamente usado; na Petrobras, versões adaptadas são usadas
              na coleta de materiais em fornecedores do polo industrial de Macaé.</p>
            <p>O recebimento físico e fiscal envolve a conferência quantitativa de volumes confrontada com a nota fiscal e o pedido de compra cadastrado no ERP.</p>
            <p>O <strong>Cross-Docking</strong> é a operação onde a mercadoria chega ao CD e é imediatamente redirecionada para expedição, sem ser estocada.
              Existem 3 tipos: (1) <strong>Direto</strong> — paletes já vêm separados por destino; (2) <strong>Indireto</strong> — mercadorias são separadas
              e reagrupadas no CD; (3) <strong>Oportunista</strong> — transferência imediata para atender pedido urgente. Na Petrobras, materiais urgentes
              para plataformas frequentemente passam por cross-docking oportunista na base de Macaé.</p>
            <p>Sistemas de gerenciamento de pátio (YMS) coordenam o fluxo físico de carretas nas docas de grandes plantas industriais, otimizando o carregamento.</p>
            <p>A <strong>Last Mile</strong> (última milha) é o trecho final da entrega ao consumidor — e o mais caro (até 53% do custo total de transporte).
              No contexto offshore da Petrobras, a &quot;última milha&quot; não é terrestre: é o transporte marítimo do porto à plataforma via PSV ou o
              transbordo por helicóptero para peças críticas. Esse trecho é extremamente custoso e logisticamente complexo, sujeito a condições
              climáticas adversas e janelas operacionais de embarque limitadas.</p>
            <p>O transit time (tempo de transporte) e as janelas de entrega devem ser rigorosamente planejados no outbound para manter o nível de serviço acordado.</p>
            <p>O <strong>Postponement</strong> (postergação) adia a configuração final do produto até que o pedido do cliente seja confirmado — reduzindo
              estoques de produtos acabados. Na Petrobras, o conceito se aplica à <strong>montagem modular</strong> de equipamentos: peças genéricas
              são mantidas em estoque e a configuração específica (calibração, montagem) é feita sob demanda para cada plataforma.
              A CESGRANRIO cobra frequentemente a diferença entre Postponement de forma (montagem final) e Postponement logístico (adiamento do envio).</p>
            <p>Em bases terrestres da Petrobras, a conferência física e fiscal de insumos químicos para fluidos de perfuração segue rigorosos protocolos de recebimento.</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Fluxo Completo: Inbound → Outbound</h4>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                <span className="px-3 py-1 bg-blue-500/10 rounded-full">Fornecedor</span>
                <span>→</span>
                <span className="px-3 py-1 bg-blue-500/10 rounded-full">Milk Run</span>
                <span>→</span>
                <span className="px-3 py-1 bg-amber-500/10 rounded-full">Recebimento</span>
                <span>→</span>
                <span className="px-3 py-1 bg-amber-500/10 rounded-full">Armazém / Cross-Dock</span>
                <span>→</span>
                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">Separação</span>
                <span>→</span>
                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">Expedição</span>
                <span>→</span>
                <span className="px-3 py-1 bg-rose-500/10 rounded-full">Last Mile</span>
                <span>→</span>
                <span className="px-3 py-1 bg-rose-500/10 rounded-full">Cliente/Plataforma</span>
              </div>
            </div>
          
          
          
          </div>
        </section>

        {/* ★ C.E.D.E. */}
        <div className="space-y-6">
          <ModuleSectionHeader index={5} variant={mv[5]} title="Análise C.E.D.E." description="Conceituação, Exemplificação, Dicas e Exceções sobre fluxos logísticos." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Os 3 Fluxos Logísticos",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Além de Inbound e Outbound, existe o <strong>fluxo reverso</strong> (módulo 8). Os 3 fluxos juntos formam a logística integrada. Cada um exige planejamento, controle e indicadores específicos.</p>
                    <AlertBox tipo="info" titulo="Fluxo de Informações">
                      Além do fluxo físico, existe o fluxo de informações (pedidos, notas fiscais, EDI) que percorre o caminho INVERSO: do cliente para o fornecedor. É esse fluxo que aciona as compras e o Milk Run.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Milk Run na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>A Petrobras utiliza um sistema adaptado de Milk Run para coletar materiais no polo industrial de Macaé:</p>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Rota fixa:</strong> Caminhão sai da base → Coleta válvulas no Fornecedor A → Coleta juntas no Fornecedor B → Coleta tubos no Fornecedor C → Retorna à base. Economia de 35% vs. entregas individuais.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas Táticas: Questões sobre Fluxos",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Milk Run</strong> = COLETA programada (empresa vai buscar). Não confundir com entrega pelo fornecedor.</li>
                      <li><strong>Cross-Docking</strong> = SEM estocagem. Se a questão mencionar &quot;armazenar temporariamente&quot;, não é cross-docking puro.</li>
                      <li><strong>Postponement</strong> = ADIAR customização. Se a questão falar em &quot;antecipar produção&quot;, é o oposto (Make-to-Stock).</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando o Milk Run NÃO funciona",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Limitações do Milk Run">
                      O Milk Run exige fornecedores geograficamente próximos e volumes previsíveis. Para fornecedores internacionais (válvulas importadas da Europa) ou demandas esporádicas (emergências offshore), o modelo é inviável — usa-se transporte dedicado ou frete aéreo.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* COMPONENTES EXISTENTES PRESERVADOS */}
        <ModuleConsolidation
          index={5}
          variant={mv[5]}
          video={{ videoId: "LOG5_V", title: "Logística Inbound e Outbound", duration: "14:00" }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Fluxos",
            materia: "Logística",
            images: [
              { title: "Fluxo Inbound/Outbound", type: "Diagrama", placeholderColor: "bg-blue-500/20" },
              { title: "Milk Run", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
            ],
          }}
          sinteseEstrategica={{
            title: "O Macete do 'Leiteiro'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🥛</span>
                  <span>🚛</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>Milk Run</strong> = Leiteiro. A empresa manda o caminhão <strong>buscar</strong> nos fornecedores, na rota fixa, como o leiteiro de casa em casa.&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Inbound</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Tudo que ENTRA na empresa.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300 uppercase">Fornecedor → Empresa ✅</p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Outbound</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Tudo que SAI da empresa.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">Empresa → Cliente ✅</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", titulo: "Podcast: Cadeia Integrada", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-5")}
          titulo="QUIZ: Logística Inbound e Outbound"
          numero={5}
          variant={mv[5]}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 6 ==================== */}
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        <ModuleBanner numero={6} titulo="Supply Chain Management (SCM)" variant={mv[6]} descricao="VMI, Efeito Chicote, CPFR, ECR e a gestão colaborativa da cadeia de suprimentos." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[6]} title="A Cadeia como Organismo Vivo" description="Supply Chain Management é a coordenação estratégica entre TODAS as empresas envolvidas." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Supply Chain Management (SCM)</strong> é a gestão integrada de todos os elos da cadeia de suprimentos — desde o fornecedor
              do fornecedor até o cliente do cliente. Enquanto a <strong>logística</strong> foca no fluxo físico dentro de uma empresa, o SCM amplia
              a visão para a <strong>colaboração interempresarial</strong>: planejamento conjunto de demanda, compartilhamento de informações,
              sincronização de estoques e alinhamento estratégico entre parceiros comerciais. É o conceito de &quot;competir como cadeia, não como empresa isolada&quot;.</p>
            <p>Questões sobre SCM cobram a integração estreita de fluxos e o relacionamento colaborativo. O efeito chicote descreve a distorção da demanda ao longo da cadeia.</p>
            <p>O <strong>VMI (Vendor Managed Inventory)</strong> é um modelo onde o próprio fornecedor gerencia o estoque do cliente.
              O fornecedor monitora os níveis de estoque (via EDI ou IoT) e decide quando e quanto repor, garantindo disponibilidade sem
              intervenção do comprador. Na Petrobras, fornecedores de lubrificantes e químicos operam em regime de VMI nas refinarias:
              eles monitoram os tanques remotamente e agendam entregas antes que o nível crítico seja atingido.</p>
            <p>O efeito chicote amplia a variação dos pedidos à medida que nos afastamos do cliente final devido à falta de visibilidade compartilhada de dados em tempo real.</p>
            <p>O <strong>Efeito Chicote (Bullwhip Effect)</strong> é o fenômeno onde pequenas variações na demanda do consumidor final causam
              oscilações cada vez maiores nos pedidos dos elos anteriores da cadeia. Uma variação de 5% na demanda do varejo pode se transformar
              em variações de 40-50% nos pedidos ao fabricante. As causas são: (1) processamento da demanda em lotes; (2) racionamento por
              escassez; (3) flutuações de preço; (4) falta de visibilidade end-to-end. A CESGRANRIO adora esse tema.</p>
            <p>Ferramentas colaborativas como o CPFR integram previsões de vendas e planejamentos de reabastecimento contínuo entre varejo e indústria.</p>
            <p>O <strong>CPFR (Collaborative Planning, Forecasting and Replenishment)</strong> é uma metodologia de 9 passos onde varejistas e
              fornecedores compartilham previsões de demanda e planejam reposições conjuntamente. Já o <strong>ECR (Efficient Consumer Response)</strong> é
              a estratégia focada no setor de varejo para responder eficientemente à demanda do consumidor, com 4 pilares: reposição eficiente,
              sortimento eficiente, promoção eficiente e introdução eficiente de novos produtos.</p>
            <p>A gestão de relacionamentos em SCM (SRM) segmenta fornecedores entre táticos e estratégicos, construindo parcerias para mitigar riscos de ruptura.</p>
            <p>Na prova CESGRANRIO, a diferença fundamental entre Logística e SCM é a <strong>amplitude</strong>: logística é operacional e intraempresarial;
              SCM é estratégico e interempresarial. Se a questão mencionar &quot;parceria entre empresas&quot;, &quot;compartilhamento de informações com fornecedores&quot;
              ou &quot;visão de cadeia&quot;, é SCM. Se falar em &quot;movimentação de materiais&quot; ou &quot;armazenagem&quot;, é logística.</p>
            <p>A Petrobras estabelece portais integrados para que fabricantes acompanhem as previsões de consumo de peças sobressalentes de refinarias nacionais.</p>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Ferramentas de Colaboração na SC</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                  <span className="font-bold">VMI</span>
                  <span className="text-muted-foreground">Fornecedor gerencia estoque do cliente</span>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                  <span className="font-bold">CPFR</span>
                  <span className="text-muted-foreground">Planejamento colaborativo de demanda</span>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                  <span className="font-bold">ECR</span>
                  <span className="text-muted-foreground">Resposta eficiente ao consumidor</span>
                </div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={6} variant={mv[6]} title="Análise C.E.D.E." description="Dominando Supply Chain Management para a prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Os 8 Processos-Chave do SCM",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Segundo Lambert (2008), o SCM possui <strong>8 processos-chave</strong>: (1) Gestão do Relacionamento com Clientes (CRM); (2) Gestão do Serviço ao Cliente; (3) Gestão da Demanda; (4) Atendimento de Pedidos; (5) Gestão do Fluxo de Manufatura; (6) Gestão do Relacionamento com Fornecedores (SRM); (7) Desenvolvimento e Comercialização de Produtos; (8) Gestão de Devoluções.</p>
                    <AlertBox tipo="info" titulo="SCM vs Logística">
                      Logística é uma PARTE do SCM. SCM inclui logística + procurement + marketing + finanças + operações, tudo coordenado entre múltiplas empresas.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Efeito Chicote Real",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Exemplo clássico: a Procter & Gamble percebeu que as vendas de fraldas Pampers eram estáveis, mas os pedidos ao fabricante de celulose variavam 40%. Causa: cada elo &quot;inflava&quot; seus pedidos por medo de desabastecimento.</p>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Na Petrobras:</strong> Uma variação de 10% na produção de uma refinaria pode gerar variações de 30% nos pedidos de catalisadores ao fornecedor japonês, pois cada gerência intermediária adiciona &quot;estoque de segurança&quot; ao seu pedido.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas Táticas: SCM na CESGRANRIO",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Efeito Chicote</strong> = amplificação da variação de demanda para trás na cadeia. A solução é compartilhar informações em tempo real.</li>
                      <li><strong>VMI</strong> = o FORNECEDOR decide quando repor. O cliente perde autonomia de compra, mas ganha disponibilidade garantida.</li>
                      <li><strong>CPFR ≠ VMI:</strong> No CPFR ambos planejam juntos; no VMI o fornecedor decide sozinho com base em dados do cliente.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: SCM em Ambientes de Monopólio",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Cuidado com o conceito de 'parceria'">
                      Em mercados de monopólio/oligopólio (como fornecedores de equipamentos subsea), o &quot;SCM colaborativo&quot; pode ser assimétrico: a Petrobras tem poucos fornecedores para escolher, o que limita o poder de negociação apesar da retórica de &quot;parceria&quot;.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={6} variant={mv[6]}
          video={{ videoId: "LOG6_V", title: "Supply Chain Management", duration: "16:00" }}
          resumoVisual={{ moduloNome: "Módulo 6", tituloAula: "SCM", materia: "Logística", images: [{ title: "Bullwhip Effect", type: "Gráfico", placeholderColor: "bg-amber-500/20" }, { title: "Modelo CPFR", type: "Diagrama", placeholderColor: "bg-blue-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'Chicote'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🐂</span>
                  <span>🪢</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;Pequena variação na ponta <strong>amplifica</strong> na base. Quanto mais longe do consumidor, mais &quot;chicoteado&quot; é o pedido.&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Causa</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Cada elo infla o pedido por medo de faltar.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-amber-700 dark:text-amber-300 uppercase">Falta de visibilidade ✅</p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Solução</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Compartilhar dados de demanda em tempo real.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">CPFR + VMI + EDI ✅</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", titulo: "Podcast: Efeito Chicote", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-6")} titulo="QUIZ: Supply Chain Management" numero={6} variant={mv[6]} onComplete={(score) => handleModuleComplete("modulo-6", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 7 ==================== */}
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        <ModuleBanner numero={7} titulo="Indicadores de Desempenho (KPIs)" variant={mv[7]} descricao="OTIF, Fill Rate, Lead Time, Nível de Serviço e Custo Logístico Total." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[7]} title="Medir para Gerenciar" description="Se você não mede, não gerencia — os KPIs que definem a eficiência logística." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>KPIs (Key Performance Indicators)</strong> são métricas quantificáveis que avaliam a eficiência e eficácia das operações
              logísticas. Na Petrobras, os KPIs logísticos são monitorados em dashboards de gestão para garantir que os suprimentos cheguem
              às plataformas no prazo, na quantidade correta e ao menor custo possível. Sem KPIs, decisões são tomadas &quot;no achismo&quot; — e no
              offshore, isso pode custar vidas e milhões.</p>
            <p>Fórmulas de KPIs são cobradas frequentemente. OTIF (On Time In Full) mede o percentual de pedidos que foram entregues no prazo exato e na quantidade completa.</p>
            <p>O <strong>OTIF (On Time In Full)</strong> é o indicador-rei da logística: mede o percentual de entregas realizadas <strong>no prazo</strong> (On Time)
              <strong>E</strong> <strong>completas</strong> (In Full). OTIF = (Entregas no prazo e completas / Total de entregas) × 100. Uma entrega que chega
              no prazo mas incompleta NÃO é OTIF. Uma entrega completa mas atrasada TAMBÉM NÃO é OTIF. Benchmark mundial: 95%+. Na Petrobras
              offshore, onde atrasos paralisam operações, o OTIF é rastreado diariamente.</p>
            <p>O Giro de Estoque calcula a rapidez com que o inventário é renovado (CMV dividido pelo estoque médio); a Cobertura indica os dias de autonomia do saldo físico.</p>
            <p>O <strong>Fill Rate</strong> (taxa de atendimento) mede o percentual de pedidos atendidos completamente a partir do estoque disponível,
              sem necessidade de backorder. Fill Rate = (Pedidos atendidos integralmente / Total de pedidos) × 100. Já o <strong>Lead Time</strong> é o
              tempo total desde o pedido até a entrega efetiva — inclui processamento, separação, transporte e conferência. Na cadeia offshore,
              o lead time pode variar de 3 dias (materiais em estoque na base) a 6 meses (equipamentos importados sob encomenda).</p>
            <p>O KPI de acurácia de recebimento físico mede desvios entre notas fiscais e contagem de volumes nas docas de descarga dos centros de distribuição.</p>
            <p>O <strong>Nível de Serviço</strong> é a probabilidade de não haver falta de estoque durante o lead time de ressuprimento. Nível de
              serviço de 95% significa que, em 95 de cada 100 ciclos de ressuprimento, o estoque será suficiente para atender a demanda.
              Aumentar o nível de serviço de 95% para 99% pode dobrar o estoque de segurança necessário — é um trade-off custo vs. disponibilidade.</p>
            <p>O indicador de custo de transporte como percentual das vendas líquidas ajuda gerentes a identificar a eficiência de frotas e a necessidade de redespachos.</p>
            <p>O <strong>Custo Logístico Total</strong> é a soma de todos os custos envolvidos na operação logística: transporte + armazenagem + estoques
              + processamento de pedidos + custos de TI + custos de falta. No Brasil, o custo logístico representa ~12% do PIB (vs. ~8% nos EUA),
              devido à dependência do modal rodoviário e infraestrutura precária. A CESGRANRIO cobra frequentemente cálculos de custo total
              e trade-offs entre componentes.</p>
            <p>A área de suprimentos da Petrobras monitora mensalmente os índices de avarias e o OTIF de prestadores de serviços logísticos offshore e terrestres.</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Dashboard de KPIs Logísticos</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
                <div className="p-3 bg-blue-500/10 rounded-lg"><span className="font-bold">OTIF</span><span className="text-muted-foreground">Meta: 95%+</span></div>
                <div className="p-3 bg-emerald-500/10 rounded-lg"><span className="font-bold">Fill Rate</span><span className="text-muted-foreground">Meta: 98%+</span></div>
                <div className="p-3 bg-amber-500/10 rounded-lg"><span className="font-bold">Lead Time</span><span className="text-muted-foreground">Meta: minimizar</span></div>
                <div className="p-3 bg-rose-500/10 rounded-lg"><span className="font-bold">Custo Total</span><span className="text-muted-foreground">Meta: &lt;12% receita</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={7} variant={mv[7]} title="Análise C.E.D.E." description="KPIs que caem na prova CESGRANRIO." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Família de KPIs",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Os KPIs logísticos se dividem em 4 famílias: (1) <strong>Tempo</strong> (Lead Time, Cycle Time, Order-to-Delivery); (2) <strong>Qualidade</strong> (OTIF, taxa de avaria, índice de devoluções); (3) <strong>Custo</strong> (Custo/ton-km, custo de armazenagem/m²); (4) <strong>Produtividade</strong> (pedidos/hora, paletes movimentados/turno).</p>
                    <AlertBox tipo="info" titulo="Balanced Scorecard Logístico">
                      Além dos KPIs operacionais, empresas como a Petrobras usam BSC com 4 perspectivas: Financeira, Clientes, Processos Internos e Aprendizado.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: OTIF na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Cenário:</strong> Base de Macaé despacha 100 cargas/mês para plataformas. 92 chegam no prazo E completas. 5 chegam no prazo mas incompletas (peças faltando). 3 chegam completas mas atrasadas. <strong>OTIF = 92%</strong> (abaixo da meta de 95%).</p>
                    </div>
                    <p>As 5 entregas incompletas geram backorders e interrupções operacionais. As 3 atrasadas causam parada de manutenção preventiva.</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Fórmulas de Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>OTIF</strong> = (On Time ∩ In Full) / Total × 100. ATENÇÃO: é interseção (AND), não soma!</li>
                      <li><strong>Fill Rate</strong> = Pedidos completos do estoque / Total pedidos × 100</li>
                      <li><strong>Giro de Estoque</strong> = Custo dos Produtos Vendidos / Estoque Médio (maior giro = melhor)</li>
                      <li><strong>Cobertura</strong> = Estoque Médio / Demanda Média Diária = dias de estoque disponível</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando 100% OTIF é RUIM",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Paradoxo do OTIF perfeito">
                      Um OTIF de 100% pode indicar estoque EXCESSIVO — se você nunca falta material, talvez esteja mantendo estoque demais (capital parado). O ideal é balancear OTIF alto com custo de estoque razoável. Questões CESGRANRIO exploram esse trade-off.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={7} variant={mv[7]}
          video={{ videoId: "LOG7_V", title: "KPIs Logísticos", duration: "14:00" }}
          resumoVisual={{ moduloNome: "Módulo 7", tituloAula: "KPIs", materia: "Logística", images: [{ title: "Dashboard KPIs", type: "Tabela", placeholderColor: "bg-blue-500/20" }, { title: "Fórmula OTIF", type: "Esquema", placeholderColor: "bg-rose-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'OTIF'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>⏰</span>
                  <span>📦</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>On Time</strong> = na hora. <strong>In Full</strong> = completo. Se falha UM dos dois, NÃO é OTIF.&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">On Time ⏰</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Chegou no prazo combinado?&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300 uppercase">Pontualidade ✅</p>
                  </div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">In Full 📦</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Veio tudo que foi pedido?&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-rose-700 dark:text-rose-300 uppercase">Completude ✅</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", titulo: "Podcast: Métricas que Importam", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-7")} titulo="QUIZ: Indicadores de Desempenho" numero={7} variant={mv[7]} onComplete={(score) => handleModuleComplete("modulo-7", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 8 ==================== */}
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        <ModuleBanner numero={8} titulo="Logística Reversa e Sustentabilidade" variant={mv[8]} descricao="PNRS (Lei 12.305/10), responsabilidade compartilhada, economia circular e descarte industrial." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[8]} title="O Caminho de Volta" description="Logística reversa: quando o produto faz o percurso contrário — do consumidor de volta ao fabricante." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Logística Reversa</strong> é o processo de planejar, implementar e controlar o fluxo de matérias-primas, estoque em processamento,
              produtos acabados e informações relacionadas, do <strong>ponto de consumo ao ponto de origem</strong>, com o propósito de recapturar valor
              ou dar destinação adequada. É o &quot;fluxo de volta&quot;: devoluções, reciclagem, remanufatura e descarte responsável.</p>
            <p>A banca exige domínio da Lei 12.305 (Política Nacional de Resíduos Sólidos). A logística reversa impõe a responsabilidade compartilhada pelo ciclo pós-consumo.</p>
            <p>A <strong>PNRS (Política Nacional de Resíduos Sólidos — Lei 12.305/2010)</strong> é o marco legal que obriga empresas a implementar
              logística reversa para seus produtos pós-consumo. A lei estabelece a <strong>responsabilidade compartilhada pelo ciclo de vida</strong>:
              fabricantes, importadores, distribuidores, comerciantes, consumidores e titulares de serviços de limpeza urbana são TODOS
              responsáveis pela destinação final adequada dos resíduos. A CESGRANRIO cobra frequentemente os conceitos da PNRS.</p>
            <p>A logística reversa divide-se em: canais reversos pós-venda (retorno de itens não utilizados ou avariados) e pós-consumo (descarte e reciclagem de resíduos).</p>
            <p>Existem dois tipos de logística reversa: (1) <strong>Pós-venda</strong> — devoluções por defeito, arrependimento (CDC), excesso de estoque,
              garantia, recall; (2) <strong>Pós-consumo</strong> — reciclagem, remanufatura, desmanche, descarte ambientalmente correto. Na Petrobras,
              a logística reversa pós-consumo é crítica: óleos lubrificantes usados, catalisadores esgotados, embalagens contaminadas e
              equipamentos obsoletos precisam de destinação especial conforme normas ambientais (IBAMA, ANP, CONAMA).</p>
            <p>Um fluxo reverso eficiente exige triagem rigorosa na origem para segregar materiais recicláveis, passíveis de remanufatura ou refugo sanitário final.</p>
            <p>A <strong>economia circular</strong> expande o conceito de logística reversa: em vez de &quot;extrair → produzir → descartar&quot; (linear),
              busca-se &quot;extrair → produzir → usar → recuperar → reutilizar&quot; (circular). Na Petrobras, exemplos incluem: rerrefino de óleo
              lubrificante usado (recolhimento obrigatório pela Resolução CONAMA 362), reuso de água produzida em plataformas, e
              descomissionamento de plataformas com aproveitamento de componentes metálicos.</p>
            <p>O conceito de economia circular redesenha fluxos industriais para reinserir subprodutos e embalagens usadas no ciclo de produção original.</p>
            <p>Na prova CESGRANRIO, atenção aos <strong>instrumentos da PNRS</strong>: acordos setoriais (voluntários entre governo e setor privado),
              termos de compromisso (obrigatórios quando há descumprimento) e regulamentos (normativos do poder público). A lei também
              introduz a ordem de prioridade: não geração → redução → reutilização → reciclagem → tratamento → disposição final ambientalmente adequada.</p>
            <p>O plano de gestão de resíduos em refinarias da Petrobras garante a destinação ecologicamente correta de borras oleosas e catalisadores industriais exauridos.</p>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Hierarquia de Resíduos (PNRS)</h4>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                <span className="px-3 py-1 bg-emerald-500/20 rounded-full font-bold">1. Não Gerar</span>
                <span>→</span>
                <span className="px-3 py-1 bg-emerald-500/15 rounded-full">2. Reduzir</span>
                <span>→</span>
                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">3. Reutilizar</span>
                <span>→</span>
                <span className="px-3 py-1 bg-amber-500/10 rounded-full">4. Reciclar</span>
                <span>→</span>
                <span className="px-3 py-1 bg-amber-500/15 rounded-full">5. Tratar</span>
                <span>→</span>
                <span className="px-3 py-1 bg-rose-500/10 rounded-full">6. Dispor</span>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={8} variant={mv[8]} title="Análise C.E.D.E." description="Logística Reversa para a prova de Suprimento." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Pós-Venda vs Pós-Consumo",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>Pós-venda:</strong> produto retorna ao vendedor/fabricante antes ou pouco depois do uso (defeito, recall, garantia, devolução). <strong>Pós-consumo:</strong> produto retorna APÓS o fim de sua vida útil (reciclagem, remanufatura, descarte).</p>
                    <AlertBox tipo="info" titulo="Remanufatura ≠ Reciclagem">
                      Remanufatura restaura o produto ao estado original (↑ valor agregado). Reciclagem transforma o material em insumo para novo produto (↓ valor agregado mas ↑ sustentabilidade).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Reversa na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Óleo Lubrificante:</strong> Resolução CONAMA 362/2005 obriga o recolhimento de óleo usado. A Petrobras coleta em postos e refinarias → envia para rerrefinarias credenciadas → óleo base é recuperado e retorna ao mercado. Taxa de rerrefino: ~36% do volume vendido.</p>
                    </div>
                    <p>Outros exemplos: catalisadores esgotados (recuperação de metais nobres como platina), baterias industriais (logística reversa obrigatória) e embalagens de produtos químicos (lavagem tríplice e devolução).</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas: PNRS na Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Responsabilidade compartilhada</strong> = TODOS os elos da cadeia são responsáveis, não só o fabricante.</li>
                      <li><strong>Acordo setorial</strong> = mecanismo CONTRATUAL entre governo e setor privado para logística reversa.</li>
                      <li>A lei NÃO proíbe aterros sanitários — ela os coloca como ÚLTIMA opção na hierarquia.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Resíduos Perigosos",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Classe I (Perigosos)">
                      Resíduos perigosos (Classe I) como óleos contaminados, solventes e amianto têm regras AINDA MAIS rigorosas que a PNRS — seguem CONAMA 358 e normas da ABNT NBR 10.004. Na Petrobras, são tratados por empresas especializadas com licença IBAMA.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={8} variant={mv[8]}
          video={{ videoId: "LOG8_V", title: "Logística Reversa e Sustentabilidade", duration: "15:00" }}
          resumoVisual={{ moduloNome: "Módulo 8", tituloAula: "Reversa", materia: "Logística", images: [{ title: "Ciclo Reverso", type: "Diagrama", placeholderColor: "bg-emerald-500/20" }, { title: "Hierarquia PNRS", type: "Infográfico", placeholderColor: "bg-amber-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete da 'Seta Invertida'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>♻️</span>
                  <span>🔄</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;Logística normal: fornecedor → cliente. Logística reversa: cliente → <strong>origem</strong>. A seta se inverte.&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pós-Venda</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Defeito? Devolve ao vendedor.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">Garantia, Recall ✅</p>
                  </div>
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Pós-Consumo</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Acabou? Recicla ou descarta certo.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-amber-700 dark:text-amber-300 uppercase">Reciclagem, PNRS ✅</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", titulo: "Podcast: O Caminho de Volta", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-8")} titulo="QUIZ: Logística Reversa" numero={8} variant={mv[8]} onComplete={(score) => handleModuleComplete("modulo-8", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 9 ==================== */}
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        <ModuleBanner numero={9} titulo="Logística Offshore Petrobras" variant={mv[9]} descricao="PSV, AHTS, FPSO, Bacias de Campos e Santos, bases terrestres e desafios operacionais no mar." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant={mv[9]} title="Logística no Alto-Mar" description="A cadeia de suprimentos mais desafiadora do Brasil: abastecer plataformas a 300 km da costa." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>logística offshore da Petrobras</strong> é uma das operações mais complexas do mundo: enviar suprimentos, equipamentos,
              alimentos, químicos e pessoas para plataformas de petróleo localizadas em alto-mar, a distâncias de 100 a 300 km da costa.
              O ciclo logístico inclui: planejamento de demanda na plataforma → requisição ao almoxarifado na base terrestre → separação e
              unitização em cestas → embarque em <strong>PSV (Platform Supply Vessel)</strong> → travessia marítima (12-36h) → içamento por guindaste
              na plataforma → conferência e armazenagem a bordo.</p>
            <p>Questões sobre logística offshore exigem familiaridade com navios PSV, AHTS, bases terrestres e a complexidade de abastecimento em alto-mar.</p>
            <p>As <strong>embarcações de apoio</strong> são o coração da logística offshore. O <strong>PSV (Platform Supply Vessel)</strong> é o
              &quot;caminhão do mar&quot; — transporta cargas secas (cestas, contêineres), granéis líquidos (água industrial, combustível, fluidos de
              perfuração) e granéis sólidos (cimento, barita). O <strong>AHTS (Anchor Handling Tug Supply)</strong> é a embarcação multitarefa: além de
              suprimentos, faz manuseio de âncoras para posicionamento de sondas. Há também o <strong>RSV (ROV Support Vessel)</strong> para operações
              submarinas com ROVs (veículos operados remotamente) e o <strong>OSRV (Oil Spill Recovery Vessel)</strong> para resposta a vazamentos.</p>
            <p>A coordenação logística offshore atua em bases integradas gerenciando o fluxo de cargas gerais pesadas, granéis líquidos e tubulações de perfuração.</p>
            <p>As <strong>bases de apoio terrestre</strong> são os hubs logísticos: <strong>Macaé (RJ)</strong> é a maior base offshore da América Latina,
              atendendo as Bacias de Campos e Santos. <strong>Niterói (RJ)</strong>, <strong>Vitória (ES)</strong> e <strong>Aracaju (SE)</strong> complementam
              a rede. Cada base possui armazéns, cais de atracação, áreas de unitização e heliponto. A escolha da base depende da proximidade
              à bacia operacional: Campos (Macaé), Santos (Niterói/Itaguaí) e Espírito Santo (Vitória).</p>
            <p>O navio PSV (Platform Supply Vessel) transporta água potável, combustível diesel e suprimentos para as sondas e navios-plataforma (FPSO).</p>
            <p>O <strong>FPSO (Floating Production Storage and Offloading)</strong> é a unidade flutuante que produz, processa e armazena petróleo
              antes de transferi-lo a navios-tanque para transporte a refinarias. O FPSO é essencialmente uma &quot;refinaria flutuante+tanque+porto&quot;
              — e precisa de suprimentos contínuos para operar. O Pré-Sal da Bacia de Santos usa majoritariamente FPSOs por causa da
              profundidade extrema (2.000-3.000m de lâmina d&apos;água + 5.000m de profundidade do reservatório).</p>
            <p>A gestão de tráfego de helicópteros exige planejamento rigoroso de peso, balanceamento e condições meteorológicas nas bacias produtoras.</p>
            <p>Os <strong>desafios logísticos offshore</strong> incluem: (1) condições climáticas adversas (ondas, ventos, correntes) que podem
              impedir operações de embarque/desembarque por dias; (2) janelas operacionais limitadas — o içamento de cargas só acontece em
              condições favoráveis; (3) espaço extremamente limitado a bordo das plataformas; (4) custos elevados — uma diária de PSV pode
              custar US$ 20.000-50.000; (5) regulamentação rigorosa da ANP e Marinha (NORMAM). Esses fatores tornam o planejamento logístico
              offshore um exercício de precisão cirúrgica.</p>
            <p>O terminal portuário de Imbetiba, em Macaé, é o principal polo de escoamento logístico offshore de materiais pesados e tubos de perfuração da Petrobras.</p>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Frota de Apoio Offshore</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
                <div className="p-3 bg-blue-500/10 rounded-lg"><span className="font-bold">PSV</span><span className="text-muted-foreground">Suprimentos gerais</span></div>
                <div className="p-3 bg-amber-500/10 rounded-lg"><span className="font-bold">AHTS</span><span className="text-muted-foreground">Âncoras + supply</span></div>
                <div className="p-3 bg-emerald-500/10 rounded-lg"><span className="font-bold">FPSO</span><span className="text-muted-foreground">Produção flutuante</span></div>
                <div className="p-3 bg-rose-500/10 rounded-lg"><span className="font-bold">OSRV</span><span className="text-muted-foreground">Emergências (oil spill)</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={9} variant={mv[9]} title="Análise C.E.D.E." description="Logística offshore que cai na prova de Suprimento." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Ciclo Logístico Offshore",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>O ciclo completo: (1) Requisição na plataforma → (2) Consolidação na base terrestre → (3) Unitização em cestas/contêineres → (4) Embarque no PSV → (5) Travessia marítima → (6) Içamento por guindaste → (7) Conferência a bordo → (8) Armazenagem na plataforma.</p>
                    <AlertBox tipo="info" titulo="Unitização">
                      Unitizar é agrupar materiais diversos em uma única unidade de carga (cesta, contêiner, skid) para facilitar o içamento por guindaste. Cada cesta tem limite de peso (até 12 toneladas para cestas tipo &quot;cargo basket&quot;).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Dia a Dia em Macaé",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Operação típica:</strong> 5h — requisições chegam das plataformas. 8h — separação no armazém via WMS. 14h — cestas unitizadas no cais. 16h — embarque no PSV. 4h (dia seguinte) — PSV chega à plataforma P-53. 6h — início do içamento (se mar permitir). Tempo total: ~25h.</p>
                    </div>
                    <p>Em dias de mau tempo, o PSV pode ficar &quot;esperando janela&quot; por até 72h ao lado da plataforma, sem poder fazer operações de carga.</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Siglas de Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>PSV</strong> = Platform Supply Vessel (suprimento geral)</li>
                      <li><strong>AHTS</strong> = Anchor Handling Tug Supply (âncoras + reboque + supply)</li>
                      <li><strong>FPSO</strong> = Floating Production Storage and Offloading (produz + armazena + exporta)</li>
                      <li><strong>PLSV</strong> = Pipe Laying Support Vessel (lançamento de dutos submarinos)</li>
                      <li><strong>DP</strong> = Dynamic Positioning (posicionamento dinâmico, sem âncoras)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Emergências e Helicóptero",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Quando o PSV não resolve">
                      Em emergências médicas ou peças críticas urgentes (que podem paralisar a produção), usa-se transporte por helicóptero — muito mais caro (R$ 30.000-80.000/voo), mas chega em 1-2h vs. 24-36h do PSV. É a &quot;última milha de emergência&quot; offshore.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={9} variant={mv[9]}
          video={{ videoId: "LOG9_V", title: "Logística Offshore Petrobras", duration: "20:00" }}
          resumoVisual={{ moduloNome: "Módulo 9", tituloAula: "Petrobras", materia: "Offshore", images: [{ title: "Mapa Bacias", type: "Mapa", placeholderColor: "bg-blue-500/20" }, { title: "Frota PSV/AHTS", type: "Infográfico", placeholderColor: "bg-amber-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'Barco Certo'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🚢</span>
                  <span>🛢️</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>PSV</strong> = caminhão do mar (Suprimento). <strong>AHTS</strong> = guincho do mar (Âncoras). <strong>FPSO</strong> = fábrica flutuante (Produção).&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">PSV 🚛</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Leva comida, peça, químico.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300 uppercase">Platform Supply Vessel ✅</p>
                  </div>
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">AHTS ⚓</h4>
                    <p className="text-lg text-muted-foreground italic">&quot;Puxa, posiciona, ancora.&quot;</p>
                    <p className="text-[10px] mt-2 font-medium text-amber-700 dark:text-amber-300 uppercase">Anchor Handling Tug Supply ✅</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", titulo: "Podcast: No Mar", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-9")} titulo="QUIZ: Logística Offshore Petrobras" numero={9} variant={mv[9]} onComplete={(score) => handleModuleComplete("modulo-9", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 10 ==================== */}
      <TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={10}
          titulo="Simulado Geral"
          descricao="Teste final abrangente. Aprovação destrava a XP completa da Missão Geração Ouro da CESGRANRIO focada em concursos Petrobras."
          variant={getModuleVariant(10)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Simulado Geral: Logística"
            description="Avaliação integrada consolidando todos os conceitos estudados nesta aula."
            variant={getModuleVariant(10)}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O Simulado Geral é a avaliação integradora que sintetiza tudo que você aprendeu nos 9 módulos anteriores de Logística e Cadeia de Suprimentos. O simulado exige a correlação entre múltiplos conceitos, como gestão de estoques, custos de armazenagem, roteirização de transportes e logística reversa. Você enfrentará questões de alta complexidade que simulam o planejamento logístico real da companhia e seus trade-offs clássicos.</p>
            <p>A estrutura do simulado foi projetada seguindo o perfil rigoroso de cobrança das bancas examinadoras. A pontuação mínima de 70% é o sarrafo exigido para consolidar o aprendizado e liberar o progresso final da disciplina. O gerenciamento de tempo é parte essencial da prova, obrigando a resolução ágil de cálculos de consumo médio e nível de serviço.</p>
            <p>Os cenários práticos avaliados abordam desde a movimentação física de materiais em centros de distribuição até o abastecimento complexo de plataformas de petróleo offshore por navios PSV na Bacia de Campos e Santos. O conhecimento dos modais de transporte e das melhores práticas de estocagem é cobrado de forma aplicada.</p>
            <p>Os modais de transporte (marítimo, dutoviário, rodoviário, ferroviário e aéreo) e a gestão de estoques (PEPS, UEPS, Média Ponderada) regulam o custo logístico total e o nível de serviço.</p>
            <p>A estratégia de resolução passa por identificar as restrições logísticas de cada enunciado e as regras gerais de inventário (como PEPS, UEPS e Custo Médio). Evitar erros de cálculo de reposição e entender a interface com a área de compras são os pontos chaves para gabaritar a seção.</p>
            <p>Um exemplo de trade-off logístico é o equilíbrio entre manter altos estoques locais de peças críticas (maior custo de armazenagem) ou depender de transporte aéreo de emergência (maior custo de frete).</p>
            <p>A aplicação prática no contexto da Petrobras exige a compreensão das dinâmicas integradas do refino e escoamento nacional, sempre sob o regime jurídico e as diretrizes de governança da Lei das Estatais e auditorias do TCU.</p>
            <p>A gestão de Centros de Distribuição (CD) envolve roteirização inteligente, layout otimizado e processos de cross-docking para acelerar a movimentação física de cargas e insumos industriais.</p>
            <p>Na Petrobras, a logística offshore opera com navios de apoio (PSVs) que saem das bases de Macaé e Niterói, exigindo planejamento rigoroso sob conformidade regulatória da Lei das Estatais.</p>
            <p>Atingir a pontuação mínima valida que você desenvolveu o raciocínio crítico necessário para atuar na companhia.</p>
          </div>
        </section>

        <ContentAccordion mode="stacked" slides={[
            {
              titulo: "Visão Integrada de Conceitos",
              icone: <LuBrain />,
              conteudo: <p className="text-lg text-justify">O simulado exige que você conecte as teorias, os processos práticos de suporte e a conformidade ética em cenários realistas de auditorias e concorrência.</p>
            },
            {
              titulo: "Tempo e Estratégia",
              icone: <LuFileText />,
              conteudo: <p className="text-lg text-justify">Treine a resolução de questões sob a média de 3 minutos por item. Aprenda a identificar as pegadinhas da banca e a eliminar alternativas incorretas rapidamente.</p>
            },
            {
              titulo: "Padrão CESGRANRIO",
              icone: <LuBookOpen />,
              conteudo: <p className="text-lg text-justify">As questões simulam fielmente as provas recentes da Petrobras, cobrando o discernimento entre casos práticos e a legislação em vigor.</p>
            },
            {
              titulo: "Calibração de Desempenho",
              icone: <LuSearch />,
              conteudo: <p className="text-lg text-justify">Utilize o resultado do simulado para identificar quais módulos requerem revisão ativa. Focar nas suas fraquezas agora garante os pontos decisivos no dia da prova.</p>
            }
          ]}
        />

        <ModuleConsolidation
          index={10}
          variant={getModuleVariant(10)}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Revisão e Simulado Geral de Logística",
            duration: "25:15"
          }}
          resumoVisual={{
            moduloNome: "Simulado Final",
            tituloAula: "Logística",
            materia: "Suprimento",
            images: [
              { title: "Mapa Mental Geral de Revisão", type: "infográfico", placeholderColor: "bg-rose-500/20" }
            ]
          }}
          sinteseEstrategica={{
            title: "O Ponto Final",
            content: <div className="text-center"><span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span><p className="text-lg italic text-center">"O Técnico de Suprimentos zela pela conformidade técnica de cada processo operacional."</p></div>
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Podcast: Sucesso no Concurso Petrobras",
            artista: "Prof. Suprimentos"
          }}
        />

        <QuizInterativo
          titulo="Simulado Final: Logística"
          numero={10}
          variant={getModuleVariant(10)}
          questoes={mapQuizQuestions('modulo-10')}
          onComplete={(score: number) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
