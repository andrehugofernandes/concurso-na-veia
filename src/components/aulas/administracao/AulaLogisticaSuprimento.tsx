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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );

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
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre Logística" },
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
            index={1}
            variant={mv[1]}
            title="A Missão Estratégica da Logística"
            description="Muito além de transportar: como a logística cria valor competitivo para a Petrobras."
          />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              A <strong>logística</strong> é a área responsável por planejar, implementar e controlar o fluxo eficiente de materiais,
              informações e recursos, desde a origem (fornecedor) até o destino final (cliente ou plataforma). Na Petrobras,
              logística não é apenas &quot;entregar coisas&quot; — é garantir que <strong>sondas, químicos, peças de reposição e alimentos</strong> cheguem
              às plataformas offshore em condições perfeitas, no prazo correto e com custo otimizado.
            </p>
            <p>
              O conceito clássico do <strong>Council of Supply Chain Management Professionals (CSCMP)</strong> define logística como
              a parte do Supply Chain que planeja, implementa e controla o fluxo e armazenagem eficientes e eficazes de bens,
              serviços e informações relacionadas, do ponto de origem ao ponto de consumo. Essa definição é a que a <strong>CESGRANRIO</strong> adota
              em suas provas — memorize-a.
            </p>
            <p>
              A logística cria <strong>quatro tipos de valor (utilidades)</strong>: (1) <strong>Utilidade de Lugar</strong> — levar o produto
              onde ele é necessário; (2) <strong>Utilidade de Tempo</strong> — entregar quando é necessário; (3) <strong>Utilidade de Posse</strong> —
              facilitar a transferência de propriedade; (4) <strong>Utilidade de Forma</strong> — contribuir para a transformação
              (embalagem, unitização). Na Petrobras, a utilidade de lugar e tempo são críticas: uma peça que chega 1 dia atrasada
              a uma plataforma pode paralisar operações de milhões de reais por dia.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">📦 Os 7 Certos da Logística</p>
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
              { titulo: "Visão Sistêmica", descricao: "Otimizar o todo, não as partes isoladas — o custo total logístico é o que importa.", icone: <LuFileText />, corFundo: "bg-indigo-500/10" },
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
          <ContentAccordion
            slides={[
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <AlertBox tipo="warning" titulo="Pegadinha clássica">
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
          maceteVisual={{
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
          <ModuleSectionHeader index={2} variant={mv[2]} title="A Ciência do Estoque" description="Quanto manter, quando repor e como classificar — o trio de ouro da gestão de materiais." />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              <strong>Gestão de estoques</strong> é a arte de equilibrar dois extremos: ter material demais (capital parado, custo
              de armazenagem) vs. ter material de menos (risco de parada operacional, perda de receita). Na Petrobras, esse
              equilíbrio é crítico: uma válvula que falta numa plataforma offshore pode custar milhões em produção perdida,
              mas manter estoque excessivo em bases terrestres congela capital que poderia ser investido em exploração.
            </p>
            <p>
              A <strong>Curva ABC</strong> (Pareto) classifica itens em 3 faixas: <strong>A</strong> (20% dos itens = 80% do valor),
              <strong>B</strong> (30% dos itens = 15% do valor), <strong>C</strong> (50% dos itens = 5% do valor). Itens A são
              controlados com rigor extremo; itens C podem ter controle simplificado. Já a <strong>classificação XYZ</strong> mede
              a criticidade: <strong>X</strong> = imprescindível (parada total sem ele), <strong>Y</strong> = importante,
              <strong>Z</strong> = substituível.
            </p>
            <p>
              O <strong>Ponto de Pedido (PP)</strong> é o nível de estoque que, ao ser atingido, dispara automaticamente uma nova
              compra. Fórmula: PP = (Demanda média × Lead Time) + Estoque de Segurança. O <strong>Lote Econômico de Compra (LEC)</strong> é
              a quantidade ideal por pedido que minimiza o custo total (custo de pedir + custo de manter).
            </p>
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-2">📊 Classificação ABC + XYZ</p>
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
          <ContentAccordion
            slides={[
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
          maceteVisual={{
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
          <ModuleSectionHeader index={3} variant={mv[3]} title="A Ciência da Armazenagem" description="Muito mais que guardar: como o layout e a tecnologia maximizam eficiência." />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              <strong>Armazenagem</strong> é a atividade logística que gerencia o espaço físico necessário para manter estoques.
              Inclui recebimento, conferência, endereçamento, estocagem, separação (picking), embalagem e expedição.
              Na Petrobras, os armazéns em bases como Macaé e Niterói são vitais para o fluxo offshore.
            </p>
            <p>
              Os <strong>layouts de armazém</strong> mais cobrados em prova são: (1) <strong>Layout em U</strong> — recebimento e expedição
              no mesmo lado, favorecendo cross-docking; (2) <strong>Layout em I (Flow-through)</strong> — recebimento numa ponta, expedição
              na outra; (3) <strong>Layout em L</strong> — solução intermediária. O <strong>WMS (Warehouse Management System)</strong> é o
              software que controla toda a operação, desde endereçamento até rastreabilidade de lotes.
            </p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">📐 Princípios de Armazenagem</p>
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
          <ContentAccordion
            slides={[
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
          maceteVisual={{ title: "Regra de Ouro do Picking", content: (<div className="text-center text-lg font-bold"><p>Mais GIRO = Mais PERTO da porta</p><p className="text-muted-foreground font-normal text-sm mt-1">Itens classe A ficam na zona nobre do armazém</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "Podcast: Dentro do CD", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="QUIZ: Armazenagem e CDs" numero={3} variant={mv[3]} onComplete={(score) => handleModuleComplete("modulo-3", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 4 ==================== */}
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        <ModuleBanner numero={4} titulo="Modais e Gestão de Transportes" variant={mv[4]} descricao="Os 5 modais de transporte, intermodalidade, multimodalidade e o papel do dutoviário na Petrobras." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} variant={mv[4]} title="Os 5 Modais de Transporte" description="Rodoviário, ferroviário, aquaviário, dutoviário e aéreo — características e trade-offs." />
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O Brasil possui uma <strong>matriz de transporte desequilibrada</strong>: ~60% rodoviário, ~21% ferroviário, ~14% aquaviário,
              ~4% dutoviário, ~1% aéreo. Na Petrobras, o <strong>dutoviário</strong> é o modal estratégico — a malha de oleodutos e gasodutos
              movimenta a maior parte da produção. Já o <strong>aquaviário</strong> (cabotagem + navegação offshore) é essencial para
              abastecer plataformas e transportar petróleo cru dos FPSOs.
            </p>
            <p>
              Cada modal tem <strong>trade-offs</strong>: rodoviário é flexível mas caro por tonelada-km; ferroviário é barato mas inflexível;
              aquaviário tem maior capacidade mas é lento; dutoviário tem alto investimento inicial mas custo operacional ínfimo;
              aéreo é o mais rápido mas o mais caro. A CESGRANRIO adora pedir para comparar modais em cenários específicos.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">🚢 Modais na Petrobras</p>
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
          <ContentAccordion
            slides={[
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
          maceteVisual={{ title: "Hierarquia de Custo", content: (<div className="text-center text-lg font-bold space-y-1"><p className="text-emerald-400">Dutoviário 💰</p><p className="text-blue-400">Aquaviário 💰💰</p><p className="text-cyan-400">Ferroviário 💰💰💰</p><p className="text-amber-400">Rodoviário 💰💰💰💰</p><p className="text-rose-400">Aéreo 💰💰💰💰💰</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", titulo: "Podcast: Modais Brasileiros", artista: "Prof. Supply Chain" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="QUIZ: Modais e Transportes" numero={4} variant={mv[4]} onComplete={(score) => handleModuleComplete("modulo-4", score)} />
      </TabsContent>

      {/* ==================== MÓDULO 5 ==================== */}
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        <ModuleBanner numero={5} titulo={MODULE_DEFS[4].title} variant={mv[5]} descricao="Fluxos Internos e Externos." />
        <ModuleConsolidation
          index={5}
          variant={mv[5]}
          video={{ videoId: "LOG5_V", title: "Inbound/Outbound", duration: "14:00" }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Fluxos",
            materia: "Logística",
            images: [{ title: "Supply Chain", type: "Diagrama", placeholderColor: "bg-indigo-100" }],
          }}
          maceteVisual={{ title: "In vs Out", content: "Inbound (Chegada) -> Produção -> Outbound (Saída)." }}
          audio={{ audioUrl: "#", titulo: "Cadeia Integrada", artista: "Petrobras Quest" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-5")}
          titulo="QUIZ: Fluxos"
          numero={5}
          variant={mv[5]}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 6 ==================== */}
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        <ModuleBanner numero={6} titulo={MODULE_DEFS[5].title} variant={mv[6]} descricao="VMI e Efeito Chicote." />
        <ModuleConsolidation
          index={6}
          variant={mv[6]}
          video={{ videoId: "LOG6_V", title: "SCM", duration: "16:00" }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "SCM",
            materia: "Logística",
            images: [{ title: "Bullwhip Effect", type: "Gráfico", placeholderColor: "bg-violet-100" }],
          }}
          maceteVisual={{ title: "Chicote", content: "Flutuação na demanda gera estoque incerto nos fornecedores." }}
          audio={{ audioUrl: "#", titulo: "Efeito Chicote", artista: "Petrobras Quest" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-6")}
          titulo="QUIZ: SCM"
          numero={6}
          variant={mv[6]}
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 7 ==================== */}
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        <ModuleBanner numero={7} titulo={MODULE_DEFS[6].title} variant={mv[7]} descricao="OTIF e Nível de Serviço." />
        <ModuleConsolidation
          index={7}
          variant={mv[7]}
          video={{ videoId: "LOG7_V", title: "Indicadores", duration: "12:00" }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Indicadores",
            materia: "Logística",
            images: [{ title: "KPIs", type: "Tabela", placeholderColor: "bg-rose-100" }],
          }}
          maceteVisual={{ title: "OTIF", content: "On Time (Na Hora) + In Full (Completo)." }}
          audio={{ audioUrl: "#", titulo: "Métricas", artista: "Petrobras Quest" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-7")}
          titulo="QUIZ: KPIs"
          numero={7}
          variant={mv[7]}
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 8 ==================== */}
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        <ModuleBanner numero={8} titulo={MODULE_DEFS[7].title} variant={mv[8]} descricao="PNRS e Descarte Industrial." />
        <ModuleConsolidation
          index={8}
          variant={mv[8]}
          video={{ videoId: "LOG8_V", title: "Logística Reversa", duration: "13:00" }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Reversa",
            materia: "Logística",
            images: [{ title: "Ciclo Reverso", type: "Diagrama", placeholderColor: "bg-emerald-100" }],
          }}
          maceteVisual={{ title: "PNRS", content: "Lei 12.305 - Destinação adequada de resíduos." }}
          audio={{ audioUrl: "#", titulo: "O Caminho de Volta", artista: "Petrobras Quest" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-8")}
          titulo="QUIZ: Reversa"
          numero={8}
          variant={mv[8]}
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 9 ==================== */}
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        <ModuleBanner numero={9} titulo={MODULE_DEFS[8].title} variant={mv[9]} descricao="Bacia de Campos e Santos." />
        <ModuleConsolidation
          index={9}
          variant={mv[9]}
          video={{ videoId: "LOG9_V", title: "Offshore", duration: "20:00" }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Petrobras",
            materia: "Bases",
            images: [{ title: "Porto de Macaé", type: "Mapa", placeholderColor: "bg-blue-100" }],
          }}
          maceteVisual={{ title: "Support Boats", content: "PSV (Suprimento) e AHTS (Âncoras)." }}
          audio={{ audioUrl: "#", titulo: "No Mar", artista: "Petrobras Quest" }}
        />
        <QuizInterativo
          questoes={mapQuizQuestions("modulo-9")}
          titulo="QUIZ: Petrobras"
          numero={9}
          variant={mv[9]}
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 10 ==================== */}
      <TabsContent value="modulo-10" className="space-y-12 mt-0">
        <ModuleBanner numero={10} titulo={MODULE_DEFS[9].title} variant={mv[10]} descricao="Simulado Final 70 questões." />
        <AlertBox tipo="success" titulo="Arena Final">
          Simulado integrado de todos os temas. Foco no cargo de Profissional de Suprimento.
        </AlertBox>
        <QuizInterativo
          questoes={getRandomQuestions(mapQuizQuestions("modulo-10"), 10)}
          titulo="SIMULADO FINAL"
          numero={10}
          variant={mv[10]}
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
