"use client";

/**
 * AulaGestaoQualidade - Gestão de Qualidade
 * Aula Premium para Técnico de Suprimento Petrobras
 *
 * Status: 10 módulos premium com conteúdo completo
 */

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AulaProps,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  QuizQuestion,
  ModuleBanner,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { GESTAO_QUALIDADE_QUIZZES } from "@/data/quizzes/gestao-qualidade-quizzes";

/** Converts the local Quiz format to QuizQuestion[] expected by QuizInterativo */
function toQQ(
  quiz:
    | {
        questions: {
          id: number;
          question: string;
          options: string[];
          correct: number;
          explanation: string;
        }[];
      }
    | undefined,
): QuizQuestion[] {
  if (!quiz) return [];
  return quiz.questions.map((q) => ({
    id: q.id,
    pergunta: q.question,
    opcoes: q.options.map((o) => ({ label: o, valor: o })),
    correta: q.options[q.correct] ?? "",
    explicacao: q.explanation,
  }));
}

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos da Qualidade" },
  { id: "modulo-2", label: "Módulo 2", title: "Normas ISO 9001" },
  { id: "modulo-3", label: "Módulo 3", title: "Ferramentas da Qualidade" },
  { id: "modulo-4", label: "Módulo 4", title: "TQM - Gestão Total da Qualidade" },
  { id: "modulo-5", label: "Módulo 5", title: "Controle Estatístico (CEP / 6σ)" },
  { id: "modulo-6", label: "Módulo 6", title: "Auditoria da Qualidade" },
  { id: "modulo-7", label: "Módulo 7", title: "Qualidade em Serviços" },
  { id: "modulo-8", label: "Módulo 8", title: "Gestão de Não-Conformidades" },
  { id: "modulo-9", label: "Módulo 9", title: "Qualidade na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaGestaoQualidade(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)]),
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => {
        const newSet = new Set([...prev, moduleId]);
        const progress = Math.round((newSet.size / MODULE_DEFS.length) * 100);
        props.onUpdateProgress?.(progress);
        return newSet;
      });
    }
  };

  const isModuleUnlocked = (moduleId: string) => {
    const moduleIndex = MODULE_DEFS.findIndex((m) => m.id === moduleId);
    if (moduleIndex === 0) return true;
    const previousModule = MODULE_DEFS[moduleIndex - 1];
    return completedModules.has(previousModule.id);
  };

  // ─────────────────────────────────────────────
  // M1 — Fundamentos da Qualidade
  // ─────────────────────────────────────────────
  const renderModulo1 = () => {
    const variant = getModuleVariant(1);
    return (
      <TabsContent value="modulo-1" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Fundamentos da Qualidade"
            description="Definições, evolução histórica e os grandes pensadores que moldaram a gestão da qualidade."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Qualidade não é um conceito moderno — existe desde que humanos fabricam ferramentas.
              Mas sua gestão sistemática é do séc. XX. A <strong>ISO 8402</strong> define qualidade
              como <em>"a totalidade das características de uma entidade que lhe confere a
              capacidade de satisfazer necessidades explícitas e implícitas do cliente"</em>.
              Essa definição é fundamental: qualidade não é apenas ausência de defeitos,
              mas a capacidade de satisfazer necessidades — inclusive as que o cliente não
              expressou verbalmente.
            </p>
            <p>
              A <strong>evolução histórica</strong> da qualidade segue quatro eras distintas:
              (1) <strong>Era da Inspeção</strong> (final séc. XIX) — verificação pós-produção,
              separar bons dos ruins, sem foco em processo; (2) <strong>Era do CEP</strong>
              (1920s, Walter Shewhart) — controle estatístico durante o processo, cartas de
              controle, prevenção em vez de correção; (3) <strong>Era da Garantia da Qualidade</strong>
              (1950s) — sistemas, procedimentos e auditorias para garantir qualidade de forma
              sistêmica; (4) <strong>Era do TQM</strong> (1980s) — gestão total, toda a
              organização responsável, foco estratégico.
            </p>
            <p>
              Os <strong>quatro grandes gurus da qualidade</strong> e suas contribuições:
              (1) <strong>W. Edwards Deming</strong> — 14 pontos de gestão, Ciclo PDCA como
              ferramenta central, transformou a indústria japonesa no pós-guerra; (2) <strong>Joseph Juran</strong>
              — Trilogia da Qualidade (Planejamento, Controle, Melhoria), foco em custo da
              qualidade; (3) <strong>Philip Crosby</strong> — "Zero Defeitos" e "Qualidade é
              Gratuita" (o custo da não-qualidade supera o da prevenção); (4) <strong>Kaoru Ishikawa</strong>
              — círculos de qualidade, diagrama de causa-efeito (espinha de peixe).
            </p>
            <p>
              David Garvin (Harvard) sistematizou as <strong>8 dimensões da qualidade</strong>:
              Desempenho (características operacionais primárias), Características (extras/
              adicionais), Confiabilidade (probabilidade de falhar no prazo), Conformidade
              (atendimento a especificações), Durabilidade (vida útil), Atendimento (serviço
              pós-venda), Estética (aparência/sensações) e Qualidade Percebida (reputação/
              imagem da marca). Cada produto ou serviço pode ser avaliado em qualquer
              combinação dessas dimensões.
            </p>
            <p>
              No contexto da <strong>Petrobras e do setor de Óleo &amp; Gás</strong>, a qualidade
              assume dimensão crítica: falhas em equipamentos de perfuração, tubulações de
              alta pressão ou válvulas de segurança podem causar explosões, derramamentos
              de óleo e tragédias ambientais irreversíveis. O caso Deepwater Horizon (2010)
              demonstrou que não-conformidades em um sistema de segurança custam vidas e
              bilhões. Qualidade em O&amp;G não é diferencial competitivo — é pré-requisito
              de existência.
            </p>

            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-2">
                🏆 8 Dimensões de Garvin
              </p>
              <ul className="text-lg space-y-1 text-foreground grid grid-cols-2 gap-x-4">
                <li>✓ <strong>Desempenho:</strong> Características operacionais</li>
                <li>✓ <strong>Características:</strong> Extras e adicionais</li>
                <li>✓ <strong>Confiabilidade:</strong> Probabilidade de não falhar</li>
                <li>✓ <strong>Conformidade:</strong> Atendimento às especificações</li>
                <li>✓ <strong>Durabilidade:</strong> Vida útil do produto</li>
                <li>✓ <strong>Atendimento:</strong> Serviço pós-venda</li>
                <li>✓ <strong>Estética:</strong> Aparência e sensações</li>
                <li>✓ <strong>Qualidade Percebida:</strong> Reputação / imagem</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Análise C.E.D.E."
            description="Conceituação, Exemplificação, Dicas e Exceções sobre fundamentos da qualidade."
          />
          <ContentAccordion
            titulo="Fundamentos da Qualidade — Aprofundamento"
            slides={[
              {
                title: "Conceituação: O que é Qualidade?",
                content:
                  "Qualidade tem múltiplas faces: (1) Transcendente — excelência absoluta, reconhecida mas indefinível; (2) Baseada no produto — características mensuráveis; (3) Baseada no usuário — adequação ao uso (Juran); (4) Baseada na manufatura — conformidade com especificações; (5) Baseada no valor — melhor relação custo/benefício. Para concursos, a definição ISO 8402 é a mais cobrada.",
              },
              {
                title: "Exemplificação: PDCA de Deming na Petrobras",
                content:
                  "Plan (Planejar): Equipe identifica vazamento recorrente em compressor — define meta de reduzir de 5 para 0 ocorrências/mês. Do (Fazer): Implementa novo protocolo de selagem e treinamento de operadores. Check (Verificar): Após 30 dias monitora ocorrências — 2 vazamentos. Act (Agir): Ajusta protocolo e padroniza a melhoria. Próximo ciclo: eliminar as 2 ocorrências restantes.",
              },
              {
                title: "Dicas: O que cai em CESGRANRIO sobre Gurus",
                content:
                  "Memorize as associações: DEMING = 14 pontos + PDCA. JURAN = Trilogia (planejamento/controle/melhoria) + 'adequação ao uso'. CROSBY = Zero Defeitos + 'qualidade é gratuita' + custo da não-qualidade. ISHIKAWA = Diagrama espinha de peixe + Círculos de Qualidade. FEIGENBAUM = TQC (Total Quality Control). TAGUCHI = Função de Perda da Qualidade.",
              },
              {
                title: "Exceções: Qualidade Não é Apenas ISO",
                content:
                  "Erro comum: confundir 'ter ISO 9001' com 'ter qualidade'. A certificação demonstra conformidade com requisitos do SGQ, mas não garante que o produto seja bom. Empresas com ISO podem produzir produtos medíocres se as especificações forem baixas. Qualidade é determinada pelos requisitos do cliente, não pela norma. A ISO é uma ferramenta para sistematizar — a qualidade real vem das especificações e da cultura.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "Deming & PDCA",
                descricao:
                  "14 pontos de gestão + ciclo Plan-Do-Check-Act. Transformou a indústria japonesa e é base de todo SGQ moderno.",
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Juran & Trilogia",
                descricao:
                  "Planejamento, Controle e Melhoria da qualidade. 'Qualidade é adequação ao uso'. Foco no custo da qualidade.",
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Crosby & Zero Defeitos",
                descricao:
                  "'Qualidade é gratuita' — o custo de prevenir defeitos é menor que o custo de corrigi-los. Conformidade como padrão.",
                corFundo: "bg-violet-500/10",
              },
              {
                titulo: "Ishikawa & 7 Ferramentas",
                descricao:
                  "Diagrama de causa-efeito (espinha de peixe), círculos de qualidade e as 7 ferramentas clássicas de controle.",
                corFundo: "bg-cyan-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={3}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "Fundamentos da Qualidade", duration: "06:30" }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Fundamentos da Qualidade",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Evolução Histórica", type: "Linha do Tempo", placeholderColor: "blue", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
                { title: "8 Dimensões Garvin", type: "Framework", placeholderColor: "indigo", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "D.J.C.I. — Os Gurus da Qualidade",
              content: (
                <div className="space-y-2 text-left">
                  <p><strong>D</strong>eming → PDCA + 14 Pontos</p>
                  <p><strong>J</strong>uran → Trilogia (Plan/Control/Improve)</p>
                  <p><strong>C</strong>rosby → Zero Defeitos + Qualidade Gratuita</p>
                  <p><strong>I</strong>shikawa → Espinha de Peixe + Círculos Q</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Qualidade M1", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Fundamentos da Qualidade"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-1"])}
            numero={4}
            variant={mv[1]}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M2 — Normas ISO 9001:2015
  // ─────────────────────────────────────────────
  const renderModulo2 = () => {
    const variant = mv[1];
    return (
      <TabsContent value="modulo-2" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Normas ISO 9001:2015"
            description="Estrutura de Alto Nível, 7 princípios, PDCA nas cláusulas e o processo de certificação."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              A <strong>ISO 9001:2015</strong> é a norma internacional de requisitos para
              Sistemas de Gestão da Qualidade (SGQ), emitida pela International Organization
              for Standardization. É a norma mais adotada mundialmente — mais de 1 milhão de
              organizações certificadas em 170 países. A versão 2015 trouxe mudanças
              significativas em relação à 2008: foco em riscos, pensamento estratégico, e
              flexibilidade para qualquer tipo de organização.
            </p>
            <p>
              A <strong>Estrutura de Alto Nível (HLS — High Level Structure)</strong> organiza
              a ISO 9001:2015 em 10 cláusulas padrão, compartilhadas por todas as normas ISO
              de sistemas de gestão. Cláusulas 1-3 são introdutórias. As cláusulas de
              requisitos (4-10) mapeiam diretamente sobre o PDCA: 4-7 (Plan), 8 (Do),
              9 (Check), 10 (Act). Essa estrutura harmonizada facilita sistemas integrados
              (qualidade + ambiental + segurança).
            </p>
            <p>
              Os <strong>7 Princípios da Gestão da Qualidade</strong> são a fundação filosófica
              da ISO 9001: (1) Foco no cliente — satisfazer e superar expectativas;
              (2) Liderança — líderes criam condições para atingir objetivos; (3) Engajamento
              das pessoas — pessoas competentes e comprometidas; (4) Abordagem de processo —
              gerenciar atividades como processos interligados; (5) Melhoria — melhoria
              contínua como objetivo permanente; (6) Decisão baseada em evidências — análise
              de dados e informações; (7) Gestão de relacionamento — gerenciar relacionamentos
              com partes interessadas (fornecedores, clientes).
            </p>
            <p>
              O <strong>pensamento baseado em risco</strong> é a grande novidade da versão 2015.
              Não exige um procedimento formal de análise de risco — é uma mentalidade: ao
              planejar processos, identificar o que pode dar errado (riscos) e o que pode ser
              explorado (oportunidades). Ações preventivas devem ser proporcionais à magnitude
              do risco. Isso substitui o conceito de "ação preventiva" formal da versão 2008.
            </p>
            <p>
              O <strong>processo de certificação</strong> segue: (1) Preparação interna —
              implementar o SGQ; (2) Auditoria de Estágio 1 — auditor revisa documentação e
              verifica prontidão; (3) Auditoria de Estágio 2 — auditoria completa no local,
              verifica efetividade; (4) Certificação — emissão do certificado (válido 3 anos);
              (5) Auditorias de Vigilância — anuais para manter a certificação; (6) Auditoria
              de Recertificação — a cada 3 anos para renovar. Toda auditoria de certificação
              é de 3ª parte, por organismo acreditado pelo INMETRO no Brasil.
            </p>

            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">
                📋 Estrutura de Alto Nível ISO 9001:2015 (HLS)
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Cláusula 4:</strong> Contexto da organização (partes interessadas, escopo)</li>
                <li>✓ <strong>Cláusula 5:</strong> Liderança (política, papéis e responsabilidades)</li>
                <li>✓ <strong>Cláusula 6:</strong> Planejamento (riscos, objetivos da qualidade)</li>
                <li>✓ <strong>Cláusula 7:</strong> Apoio (recursos, competência, comunicação)</li>
                <li>✓ <strong>Cláusula 8:</strong> Operação (planejamento e controle operacional)</li>
                <li>✓ <strong>Cláusula 9:</strong> Avaliação de desempenho (monitoramento, auditoria)</li>
                <li>✓ <strong>Cláusula 10:</strong> Melhoria (não-conformidades, melhoria contínua)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Análise C.E.D.E."
            description="Aprofundando a ISO 9001:2015 com casos práticos e dicas para prova."
          />
          <ContentAccordion
            titulo="ISO 9001:2015 — Aprofundamento"
            slides={[
              {
                title: "Conceituação: Os 7 Princípios em Detalhe",
                content:
                  "Os 7 princípios não são requisitos — são fundamentos. Memorize: F-L-E-P-M-D-G (Foco no cliente, Liderança, Engajamento, Processo, Melhoria, Decisão em evidências, Gestão de relacionamento). A ISO pergunta: 'Você entende o que o cliente quer?' (P1), 'A alta direção está comprometida?' (P2), 'Seus colaboradores têm competência?' (P3), 'Seus processos estão interligados?' (P4).",
              },
              {
                title: "Exemplificação: PDCA nas Cláusulas",
                content:
                  "Na prática: Plan (4-7) = a Petrobras analisa contexto (riscos de mercado), define política de qualidade, estabelece objetivos (zero NC em fornecimento crítico) e garante recursos (auditores, laboratórios). Do (8) = executa processos: qualifica fornecedores, inspeciona recebimento, controla produção. Check (9) = mede indicadores, realiza auditorias internas, análise crítica. Act (10) = corrige NCs, melhora processos.",
              },
              {
                title: "Dicas: Diferenças Versão 2008 vs 2015",
                content:
                  "Novidades 2015 que caem em prova: (1) Contexto da organização (cláusula 4) — novo; (2) Pensamento baseado em risco — substituiu ação preventiva formal; (3) Não exige mais Representante da Direção (RD) obrigatório; (4) Não exige Manual da Qualidade obrigatório; (5) Informação documentada substituiu 'documentos' e 'registros'; (6) Escopo mais flexível para excluir requisitos inaplicáveis.",
              },
              {
                title: "Exceções: Certificação não é Garantia de Qualidade",
                content:
                  "Importante distinção: certificação ISO 9001 garante que o SGQ está em conformidade com a norma — não que os produtos são bons. Se a empresa define especificações baixas e as cumpre sistematicamente, é certificável. A qualidade real depende das especificações definidas. Questões CESGRANRIO frequentemente exploram esta distinção: certificação ≠ produto de qualidade.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "10 Cláusulas HLS",
                descricao:
                  "Estrutura harmonizada entre todas as normas ISO. Cláusulas 4-10 são os requisitos reais do SGQ.",
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "7 Princípios da Qualidade",
                descricao:
                  "Foco no cliente, Liderança, Engajamento, Processo, Melhoria, Evidências, Relacionamento.",
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Pensamento Baseado em Risco",
                descricao:
                  "Identificar riscos e oportunidades em cada processo. Ações preventivas proporcionais à magnitude.",
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Auditoria de 3ª Parte",
                descricao:
                  "Certificação por organismo acreditado independente. Válida 3 anos, com vigilância anual.",
                corFundo: "bg-blue-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={3}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "ISO 9001:2015 Descomplicada", duration: "07:15" }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Normas ISO 9001:2015",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Estrutura HLS", type: "Diagrama", placeholderColor: "emerald", imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800" },
                { title: "PDCA nas Cláusulas", type: "Mapeamento", placeholderColor: "teal", imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "PDCA → ISO: Plan=4-7, Do=8, Check=9, Act=10",
              content: (
                <div className="space-y-2 text-left">
                  <p><strong>Plan</strong> → Cláusulas 4-7 (Contexto, Liderança, Planej., Apoio)</p>
                  <p><strong>Do</strong> → Cláusula 8 (Operação — execução)</p>
                  <p><strong>Check</strong> → Cláusula 9 (Avaliação de desempenho)</p>
                  <p><strong>Act</strong> → Cláusula 10 (Melhoria — corrigir e melhorar)</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast ISO 9001 M2", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Normas ISO 9001"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-2"])}
            numero={4}
            variant={mv[2]}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M3 — Ferramentas da Qualidade
  // ─────────────────────────────────────────────
  const renderModulo3 = () => {
    const variant = mv[2];
    return (
      <TabsContent value="modulo-3" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Ferramentas da Qualidade"
            description="As 7 ferramentas clássicas de controle e análise: de Ishikawa a Pareto."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Kaoru Ishikawa definiu as <strong>7 Ferramentas Clássicas da Qualidade</strong>
              como ferramentas que qualquer colaborador deveria dominar para resolver 95% dos
              problemas de qualidade. São: Fluxograma, Diagrama de Causa-Efeito, Diagrama de
              Pareto, Histograma, Carta de Controle, Diagrama de Dispersão e Folha de
              Verificação. Cada uma tem um propósito específico na análise e controle de processos.
            </p>
            <p>
              O <strong>Diagrama de Causa-Efeito</strong> (Ishikawa, espinha de peixe) é a
              ferramenta central de brainstorming. Organiza as causas potenciais de um
              problema em 6 categorias (<strong>6M</strong>): Mão de obra (habilidades,
              treinamento), Máquina (equipamentos, calibração), Método (procedimentos,
              padrões), Material (matéria-prima, componentes), Meio Ambiente (temperatura,
              umidade) e Medição (instrumentos, calibração). O problema (efeito) fica na
              cabeça do peixe; as causas nas espinhas.
            </p>
            <p>
              O <strong>Diagrama de Pareto</strong> implementa o Princípio 80/20 de Vilfredo
              Pareto: aproximadamente 80% dos problemas são causados por 20% das causas.
              É um gráfico de barras decrescentes com linha cumulativa — os primeiros 20%
              das causas que geram 80% dos problemas são os "poucos vitais". Focar nos
              poucos vitais maximiza o impacto das ações de melhoria com mínimo esforço.
            </p>
            <p>
              A <strong>Carta de Controle</strong> (Shewhart) monitora um processo ao longo
              do tempo. Define três linhas: Linha Central (LC = média), Limite Superior de
              Controle (LSC = média + 3σ) e Limite Inferior de Controle (LIC = média - 3σ).
              Pontos dentro dos limites indicam processo "sob controle estatístico" (variação
              aleatória). Pontos fora dos limites ou padrões não aleatórios indicam "causas
              especiais" — investigação necessária.
            </p>
            <p>
              O <strong>Fluxograma</strong> mapeia visualmente o fluxo de atividades usando
              símbolos padronizados ANSI: retângulo (atividade), losango (decisão), círculo
              (início/fim), setas (fluxo). É fundamental para entender e comunicar processos,
              identificar redundâncias, pontos de decisão críticos e gargalos. Em auditorias
              ISO 9001, o fluxograma é evidência da "abordagem de processo".
            </p>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">
                🐟 Os 6M do Diagrama de Ishikawa
              </p>
              <ul className="text-lg space-y-1 text-foreground grid grid-cols-2 gap-x-4">
                <li>✓ <strong>Mão de obra:</strong> Habilidades, treinamento</li>
                <li>✓ <strong>Máquina:</strong> Equipamentos, calibração</li>
                <li>✓ <strong>Método:</strong> Procedimentos, padrões</li>
                <li>✓ <strong>Material:</strong> Matéria-prima, componentes</li>
                <li>✓ <strong>Meio Ambiente:</strong> Temperatura, umidade</li>
                <li>✓ <strong>Medição:</strong> Instrumentos, calibração</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Análise C.E.D.E."
            description="Aplicação prática das ferramentas em cenários reais de O&G."
          />
          <ContentAccordion
            titulo="Ferramentas da Qualidade — Aprofundamento"
            slides={[
              {
                title: "Conceituação: Quando Usar Cada Ferramenta",
                content:
                  "Guia rápido: PROBLEMA DESCONHECIDO → Ishikawa (mapear causas) + Pareto (priorizar). MEDIÇÃO CONTÍNUA → Histograma (distribuição) + Carta de Controle (evolução temporal). RELAÇÃO ENTRE VARIÁVEIS → Diagrama de Dispersão. COLETA DE DADOS → Folha de Verificação. MAPEAMENTO DE PROCESSO → Fluxograma. A escolha certa da ferramenta define a qualidade da análise.",
              },
              {
                title: "Exemplificação: Pareto em Suprimentos Petrobras",
                content:
                  "Problema: 150 devoluções de materiais/mês. Análise Pareto revelou: dimensão incorreta = 62 devoluções (41%), material errado = 38 (25%), documentação incompleta = 28 (19%), outros = 22 (15%). Resultado: as 2 primeiras causas = 66% do total. Ação concentrada nessas 2 causas resolve 2/3 do problema. Isso é o poder do Pareto — foco nos poucos vitais.",
              },
              {
                title: "Dicas: O que CESGRANRIO Mais Cobra sobre Ferramentas",
                content:
                  "Questões frequentes: (1) Identificar a ferramenta correta para um cenário descrito; (2) Qual ferramenta usa ±3σ? (Carta de Controle); (3) Qual aplica o princípio 80/20? (Pareto); (4) Qual mapeia causas em categorias? (Ishikawa/6M); (5) Qual mostra distribuição de dados? (Histograma); (6) Qual verifica correlação entre duas variáveis? (Dispersão).",
              },
              {
                title: "Exceções: Ferramentas Novas vs Clássicas",
                content:
                  "As '7 Ferramentas Clássicas' são de Ishikawa para nível operacional. Existem também as '7 Novas Ferramentas da Qualidade' (para gestão): Diagrama de Afinidade, Diagrama de Relações, Diagrama de Árvore, Diagrama de Seta, Diagrama de Matriz, Análise de Dados em Matriz e Gráfico PDPC. Para concursos Petrobras, foco nas 7 clássicas — as novas raramente são cobradas.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "Diagrama de Ishikawa",
                descricao:
                  "Espinha de peixe com 6M: Mão de obra, Máquina, Método, Material, Meio Ambiente, Medição.",
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Diagrama de Pareto",
                descricao:
                  "80% dos problemas vêm de 20% das causas. Gráfico de barras decrescentes com linha cumulativa.",
                corFundo: "bg-orange-500/10",
              },
              {
                titulo: "Carta de Controle",
                descricao:
                  "Monitor de processo no tempo. LSC e LIC em ±3σ. Detecta causas especiais de variação.",
                corFundo: "bg-red-500/10",
              },
              {
                titulo: "Histograma",
                descricao:
                  "Distribuição de frequência dos dados. Revela forma (normal/assimétrica) e variabilidade do processo.",
                corFundo: "bg-yellow-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={3}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "7 Ferramentas da Qualidade", duration: "08:00" }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Ferramentas da Qualidade",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Espinha de Peixe", type: "Diagrama 6M", placeholderColor: "amber", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
                { title: "Curva de Pareto", type: "80/20", placeholderColor: "orange", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "F.I.P.H.C.D.F. — As 7 Ferramentas",
              content: (
                <div className="space-y-2 text-left text-lg">
                  <p><strong>F</strong>luxograma → Mapear processo</p>
                  <p><strong>I</strong>shikawa → Causas (6M)</p>
                  <p><strong>P</strong>areto → Prioridade 80/20</p>
                  <p><strong>H</strong>istograma → Distribuição</p>
                  <p><strong>C</strong>arta de Controle → Tempo</p>
                  <p><strong>D</strong>ispersão → Correlação</p>
                  <p><strong>F</strong>olha Verificação → Coleta</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Ferramentas M3", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Ferramentas da Qualidade"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-3"])}
            numero={4}
            variant={mv[3]}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M4 — TQM
  // ─────────────────────────────────────────────
  const renderModulo4 = () => {
    const variant = mv[3];
    return (
      <TabsContent value="modulo-4" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="TQM — Gestão Total da Qualidade"
            description="Filosofia onde qualidade é responsabilidade de todos: Kaizen, 5S, Poka-Yoke e Benchmarking."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              <strong>TQM (Total Quality Management)</strong> é uma filosofia de gestão que
              emergiu nos anos 1980s nos EUA como resposta à competitividade japonesa. Difere
              das abordagens anteriores porque a qualidade passa a ser responsabilidade de
              TODOS — não apenas do departamento de QA. A palavra "Total" significa: todos
              os processos, todas as pessoas, todos os departamentos, toda a cadeia de valor.
            </p>
            <p>
              <strong>Kaizen</strong> (改善 — "mudança para melhor") é o coração do TQM japonês.
              Originado na Toyota, é a filosofia de melhoria contínua com pequenas melhorias
              diárias, incrementais, realizadas por TODOS os colaboradores. Diferente da
              reengenharia (mudança radical e traumática), o Kaizen é evolutivo e sustentável.
              Um colaborador que sugere uma melhoria pequena todo dia transforma o processo
              ao longo do tempo mais do que uma grande reforma esporádica.
            </p>
            <p>
              O <strong>5S</strong> é a implementação prática do Kaizen no ambiente de trabalho.
              Os 5 sensos são: (1) <strong>Seiri (Classificar)</strong> — separar o necessário
              do desnecessário e eliminar o segundo; (2) <strong>Seiton (Ordenar)</strong> —
              um lugar para cada coisa, cada coisa em seu lugar; (3) <strong>Seiso (Limpar)</strong>
              — manter limpo e identificar causas de sujeira; (4) <strong>Seiketsu
              (Padronizar)</strong> — criar padrões para os 3S anteriores; (5) <strong>Shitsuke
              (Disciplinar)</strong> — incorporar os 4S como hábito, autodisciplina.
            </p>
            <p>
              <strong>Poka-Yoke</strong> (ポカヨケ — "à prova de erros"), criado por Shigeo Shingo
              na Toyota, são dispositivos ou mecanismos que tornam fisicamente impossível
              cometer certos erros. Exemplos clássicos: conector USB que só encaixa de um
              jeito, embalagem assimétrica que impede montagem invertida, sensor que para
              máquina se tampa não estiver fechada. Elimina erros na fonte — melhor que
              detectar ou corrigir depois.
            </p>
            <p>
              <strong>Benchmarking</strong> é a prática sistemática de comparar processos e
              desempenho com os melhores da classe. Tipos: (1) Competitivo — vs concorrentes
              diretos; (2) Funcional — comparar funções similares em outros setores (ex:
              logística da Petrobras vs logística da Amazon); (3) Interno — comparar unidades
              ou filiais da mesma empresa. O benchmarking não é cópia — é aprendizado
              adaptado ao contexto próprio.
            </p>

            <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-violet-600 dark:text-violet-400 text-lg mb-2">
                🔄 Ciclo 5S com Exemplos Práticos
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>1S Seiri (Classificar):</strong> Remover ferramentas quebradas do almoxarifado</li>
                <li>✓ <strong>2S Seiton (Ordenar):</strong> Identificar cada gaveta, etiquetas de localização</li>
                <li>✓ <strong>3S Seiso (Limpar):</strong> Limpeza semanal + identificar causa de óleo no piso</li>
                <li>✓ <strong>4S Seiketsu (Padronizar):</strong> Checklist de limpeza, fotos do padrão esperado</li>
                <li>✓ <strong>5S Shitsuke (Disciplinar):</strong> Auditoria 5S mensal, reconhecer equipes exemplares</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="TQM — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: TQM como Cultura",
                content:
                  "TQM não é programa — é cultura organizacional. Três pilares: (1) Foco no cliente externo e interno (o próximo da cadeia é seu cliente); (2) Melhoria contínua em todos os processos; (3) Envolvimento total — desde o CEO até o operador. Sem comprometimento da alta direção, TQM fracassa: torna-se apenas um slogan.",
              },
              {
                title: "Exemplificação: 5S em Plataforma Offshore",
                content:
                  "Plataforma P-55: antes do 5S, ferramentas perdidas causavam 4h/semana de improdutividade. Após 5S: cada ferramenta tem local marcado no painel, ausência visível imediatamente. Limpeza revelou vazamento de óleo na bomba. Padronização criou checklist diário. Resultado: improdutividade caiu para 20min/semana. O 5S preveniu um acidente potencial (vazamento detectado cedo).",
              },
              {
                title: "Dicas: TQM vs TQC vs ISO",
                content:
                  "Distinção importante: TQC (Feigenbaum, 1950s) = controle técnico em todos os departamentos. TQM = TQC + dimensão estratégica + cultura + liderança. ISO 9001 = sistema de gestão com requisitos específicos, auditável e certificável. TQM é mais filosófico e amplo; ISO é mais normativo e verificável. Uma empresa pode ser ISO certificada sem praticar TQM genuíno.",
              },
              {
                title: "Exceções: Poka-Yoke tem Limites",
                content:
                  "Poka-yoke funciona para erros repetitivos e previsíveis. Não funciona para falhas criativas ou sabotagem. Também pode ser caro de implementar (engenharia de projeto). Em O&G, poka-yokes são extensivamente usados: válvulas que não permitem conexão errada, sistemas de lockout/tagout que impedem energização acidental. Mas nenhum poka-yoke substitui treinamento e cultura de segurança.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "Kaizen",
                descricao:
                  "Melhoria contínua incremental. Pequenas melhorias diárias por todos os colaboradores superam grandes reformas esporádicas.",
                corFundo: "bg-violet-500/10",
              },
              {
                titulo: "5S",
                descricao:
                  "Seiri (Classificar), Seiton (Ordenar), Seiso (Limpar), Seiketsu (Padronizar), Shitsuke (Disciplinar).",
                corFundo: "bg-purple-500/10",
              },
              {
                titulo: "Poka-Yoke",
                descricao:
                  "Dispositivo à prova de erros. Torna fisicamente impossível cometer certos tipos de erros no processo.",
                corFundo: "bg-fuchsia-500/10",
              },
              {
                titulo: "Benchmarking",
                descricao:
                  "Comparação sistemática com os melhores da classe. Competitivo, funcional ou interno.",
                corFundo: "bg-pink-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "TQM e Filosofia da Qualidade Total", duration: "07:45" }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "TQM — Gestão Total da Qualidade",
              materia: "Gestão de Qualidade",
              images: [
                { title: "5S na Prática", type: "Metodologia", placeholderColor: "violet", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800" },
                { title: "Kaizen Mindset", type: "Cultura", placeholderColor: "purple", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "TQM = K.5.P.B.",
              content: (
                <div className="space-y-2 text-left">
                  <p><strong>K</strong>aizen → Melhoria contínua incremental</p>
                  <p><strong>5</strong>S → Organização e disciplina</p>
                  <p><strong>P</strong>oka-Yoke → À prova de erros</p>
                  <p><strong>B</strong>enchmarking → Comparar com os melhores</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast TQM M4", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: TQM - Gestão Total da Qualidade"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-4"])}
            numero={3}
            variant={mv[4]}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M5 — CEP e Seis Sigma
  // ─────────────────────────────────────────────
  const renderModulo5 = () => {
    const variant = mv[4];
    return (
      <TabsContent value="modulo-5" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="CEP e Seis Sigma"
            description="Controle Estatístico de Processos, cartas de controle e a metodologia DMAIC do 6σ."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O <strong>Controle Estatístico de Processos (CEP)</strong> foi desenvolvido por
              Walter Shewhart na Bell Labs nos anos 1920s. A ideia central: todo processo
              tem variabilidade — a questão é distinguir variação <strong>normal</strong>
              (causas comuns, aleatórias, inerentes ao sistema) de variação
              <strong> anormal</strong> (causas especiais, identificáveis, que exigem
              intervenção). A resposta à causa comum é melhorar o sistema; a resposta
              à causa especial é investigar e eliminar.
            </p>
            <p>
              As <strong>Cartas de Controle de Shewhart</strong> monitoram um processo ao
              longo do tempo, com três linhas: Linha Central (LC = média), Limite Superior
              de Controle (LSC = média + 3σ) e Limite Inferior de Controle (LIC = média - 3σ).
              Um ponto fora dos limites acionará investigação. Mas existem outros sinais de
              causa especial além de pontos fora dos limites: 7 pontos consecutivos acima
              ou abaixo da linha central, 6 pontos consecutivos em tendência ascendente/
              descendente, etc. (Regras de Nelson).
            </p>
            <p>
              A <strong>capacidade do processo</strong> é medida pelos índices Cp e Cpk:
              Cp = (LSE - LIE) / (6σ) — mede a capacidade potencial sem considerar
              centramento; Cpk = min[(LSE - média), (média - LIE)] / (3σ) — mede a
              capacidade real, considerando onde o processo está centrado. Valores ≥ 1,33
              indicam processo capaz no nível Seis Sigma. Valores &lt; 1,00 indicam processo
              incapaz, gerando não-conformidades sistematicamente.
            </p>
            <p>
              <strong>Seis Sigma</strong> foi formalizado pela Motorola nos anos 1980s e
              popularizado pela GE com Jack Welch. O objetivo: atingir 3,4 DPMO (Defeitos
              Por Milhão de Oportunidades). A metodologia central é o <strong>DMAIC</strong>:
              Define (definir problema e meta), Measure (medir desempenho atual), Analyze
              (analisar causas raiz), Improve (implementar soluções), Control (controlar o
              novo processo). A hierarquia de especialistas inclui Green Belt, Black Belt
              e Master Black Belt.
            </p>
            <p>
              O <strong>Lean Six Sigma</strong> combina Lean (eliminação de desperdícios —
              os 8 Mudas: superprodução, espera, transporte, superprocessamento, inventário,
              movimento, defeitos, talento desperdiçado) com Six Sigma (redução de variação
              e defeitos). Lean torna o processo mais rápido eliminando atividades sem valor.
              Six Sigma torna o processo mais preciso reduzindo variação. Juntos,
              produzem processos ágeis e confiáveis.
            </p>

            <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">
                📊 Níveis Sigma e DPMO Correspondentes
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>3σ:</strong> 66.807 DPMO → 93,3% de conformidade</li>
                <li>✓ <strong>4σ:</strong> 6.210 DPMO → 99,4% de conformidade</li>
                <li>✓ <strong>5σ:</strong> 233 DPMO → 99,98% de conformidade</li>
                <li>✓ <strong>6σ:</strong> 3,4 DPMO → 99,99966% de conformidade</li>
                <li className="text-muted-foreground">Maioria das empresas opera entre 3σ e 4σ</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="CEP e Seis Sigma — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: Variação é Normal — Mas Qual Tipo?",
                content:
                  "Causa comum (aleatória): resultado de muitos fatores pequenos e inevitáveis — temperatura ambiente, pequenas variações de matéria-prima, desgaste gradual. O processo está 'em controle estatístico'. A solução é melhorar o sistema (ex: usar matéria-prima mais homogênea). Causa especial: evento identificável e específico — lote defeituoso, operador sem treinamento, falha de equipamento. Exige ação corretiva pontual.",
              },
              {
                title: "Exemplificação: DMAIC em Soldagem Offshore",
                content:
                  "D: Problema = 4,7% taxa de defeitos em soldagem (meta: <0,5%). M: Medir 500 soldas, coletar dados de temperatura, velocidade, operador. A: Análise Pareto revela: 68% dos defeitos = variação de temperatura pré-aquecimento. I: Instalar controlador automático de temperatura. C: Carta de Controle monitora temperatura continuamente, alerta desvios. Resultado: defeitos reduzidos para 0,3%.",
              },
              {
                title: "Dicas: O que CESGRANRIO cobra sobre CEP",
                content:
                  "Conceitos mais cobrados: (1) Diferença causas comuns vs especiais; (2) Significado de Cp e Cpk (processo capaz = ≥1,33); (3) DMAIC na ordem correta; (4) DPMO de 6σ = 3,4 (não 3,4 milhões!); (5) Limites de controle = ±3σ (não são limites de especificação do cliente); (6) Lean Six Sigma = Lean (velocidade) + Six Sigma (precisão).",
              },
              {
                title: "Exceções: CEP não resolve tudo",
                content:
                  "CEP pressupõe processo estável e repetitivo. Para projetos únicos (como construção de uma plataforma), outros métodos são necessários (FMEA, risk management). CEP também requer dados contínuos e volume suficiente — não funciona bem com dados esparsos. Em serviços (suprimentos), adapta-se usando cartas de atributos (proporção de entregas no prazo) em vez de cartas de variáveis.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "Cartas de Controle",
                descricao:
                  "LSC e LIC em ±3σ da média. Detecta causas especiais. Shewhart, 1920s, Bell Labs.",
                corFundo: "bg-red-500/10",
              },
              {
                titulo: "Cp e Cpk",
                descricao:
                  "Cp = capacidade potencial. Cpk = capacidade real (centrada). Valores ≥ 1,33 = processo capaz.",
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "DMAIC",
                descricao:
                  "Define → Measure → Analyze → Improve → Control. Metodologia estruturada do Seis Sigma.",
                corFundo: "bg-orange-500/10",
              },
              {
                titulo: "Lean Six Sigma",
                descricao:
                  "Lean = eliminar desperdícios (velocidade). Six Sigma = reduzir variação (precisão). Juntos = excelência.",
                corFundo: "bg-amber-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "CEP e Seis Sigma na Prática", duration: "09:00" }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "CEP e Seis Sigma",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Carta de Controle", type: "±3σ", placeholderColor: "red", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
                { title: "DMAIC Ciclo", type: "Seis Sigma", placeholderColor: "orange", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "DMAIC = Define.Mede.Analisa.Improve.Control",
              content: (
                <div className="space-y-2 text-left text-lg">
                  <p><strong>D</strong>efine → Problema + Meta SMART</p>
                  <p><strong>M</strong>easure → Medir desempenho atual</p>
                  <p><strong>A</strong>nalyze → Causa raiz (Pareto, Ishikawa)</p>
                  <p><strong>I</strong>mprove → Implementar solução</p>
                  <p><strong>C</strong>ontrol → Carta de controle + padronizar</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast CEP/6σ M5", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Controle Estatístico (CEP / 6σ)"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-5"])}
            numero={3}
            variant={mv[5]}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M6 — Auditoria da Qualidade
  // ─────────────────────────────────────────────
  const renderModulo6 = () => {
    const variant = mv[5];
    return (
      <TabsContent value="modulo-6" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Auditoria da Qualidade"
            description="Tipos de auditoria, processo em 4 etapas, evidências objetivas e não-conformidades."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              A <strong>auditoria da qualidade</strong> é um processo sistemático, independente
              e documentado para obter evidências e avaliá-las objetivamente, a fim de
              determinar em que extensão os critérios de auditoria são atendidos (ISO 19011).
              Três palavras-chave: <em>sistemático</em> (planejado, estruturado),
              <em>independente</em> (auditor não audita sua própria área) e
              <em>documentado</em> (evidências registradas).
            </p>
            <p>
              <strong>Classificação por parte</strong>: (1) <strong>1ª Parte (Interna)</strong> —
              a própria organização audita seus processos, exigida pela ISO 9001 (cláusula 9.2);
              (2) <strong>2ª Parte</strong> — um cliente audita seu fornecedor (auditoria de
              fornecedor) ou a empresa audita seus fornecedores; (3) <strong>3ª Parte</strong> —
              organismo acreditado e independente realiza auditoria de certificação.
              Credibilidade crescente: 1ª &lt; 2ª &lt; 3ª parte.
            </p>
            <p>
              O <strong>processo de auditoria</strong> segue 4 etapas padrão:
              (1) <strong>Planejamento</strong> — definir objetivo, escopo, critérios (quais
              normas/requisitos serão verificados), equipe auditora, cronograma e checklist;
              (2) <strong>Execução</strong> — coletar evidências por entrevistas, observação
              de atividades, análise de documentos e registros; (3) <strong>Relatório</strong> —
              consolidar constatações, classificar (NC, observação, oportunidade de melhoria),
              apresentar ao auditado; (4) <strong>Acompanhamento</strong> — verificar que as
              ações corretivas foram implementadas efetivamente no prazo acordado.
            </p>
            <p>
              <strong>Tipos de constatações</strong>: (1) Não-Conformidade Maior (NC Major) —
              ausência de requisito do SGQ ou falha sistêmica que pode causar entrega de
              produto não conforme; (2) Não-Conformidade Menor (NC Minor) — falha isolada
              que não compromete o sistema; (3) Observação — situação que pode se tornar
              NC se não tratada; (4) Oportunidade de Melhoria — boa prática pode ser
              expandida ou processo pode ser aprimorado sem NC.
            </p>
            <p>
              O <strong>auditor líder</strong> deve ter: competência técnica na norma auditada,
              conhecimento do setor, habilidades de comunicação e entrevista, objetividade
              e imparcialidade. A independência é mandatória — conflito de interesses
              invalida a auditoria. Para auditorias de 3ª parte, o auditor deve ser
              certificado por organismos como IRCA (International Register of Certificated
              Auditors).
            </p>

            <div className="bg-sky-500/10 border-l-4 border-sky-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-sky-600 dark:text-sky-400 text-lg mb-2">
                🔍 Processo de Auditoria em 4 Etapas
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>1. Planejamento:</strong> Escopo, critérios, equipe, cronograma, checklist</li>
                <li>✓ <strong>2. Execução:</strong> Coleta de evidências (entrevistas, observação, documentos)</li>
                <li>✓ <strong>3. Relatório:</strong> Constatações classificadas (NC, observações, oportunidades)</li>
                <li>✓ <strong>4. Acompanhamento:</strong> Verificação da efetividade das ações corretivas</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="Auditoria da Qualidade — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: Auditoria ≠ Fiscalização",
                content:
                  "Erro conceitual frequente: auditoria não é 'caçar culpados' ou fiscalização punitiva. É avaliação de conformidade sistêmica. O objetivo é identificar oportunidades de melhoria e verificar conformidade, não punir pessoas. Uma auditoria bem conduzida é colaborativa. A diferença: fiscal busca transgressões para punir; auditor busca evidências para avaliar conformidade e agregar valor.",
              },
              {
                title: "Exemplificação: Auditoria de Fornecedor Petrobras",
                content:
                  "Petrobras audita fornecedor de válvulas críticas (2ª parte). Planejamento: escopo = processo de produção e controle de qualidade; critério = API 6D + requisitos contratuais. Execução: entrevistas com engenheiro de produção, observação dos testes hidrostáticos, revisão de certificados de material. Constatação: 3 NCs menores (registros incompletos). Relatório emitido. Fornecedor implementa correções em 30 dias.",
              },
              {
                title: "Dicas: O que CESGRANRIO cobra sobre Auditorias",
                content:
                  "Pontos mais cobrados: (1) Classificação 1ª/2ª/3ª parte; (2) Sequência correta: Planejamento → Execução → Relatório → Acompanhamento; (3) Definição de evidência objetiva (fatos verificáveis, não opiniões); (4) Diferença NC vs Observação vs Oportunidade de Melhoria; (5) Independência do auditor é mandatória; (6) Programa de auditoria ISO 9001 deve cobrir todos os processos.",
              },
              {
                title: "Exceções: Auditoria Interna não é Mais Fácil",
                content:
                  "Mito: auditoria interna é 'para inglês ver'. Na realidade, uma auditoria interna bem conduzida é tão rigorosa quanto uma de 3ª parte. A diferença é o objetivo: interna busca melhoria; de certificação busca verificar conformidade com norma. Empresas que negligenciam auditorias internas têm surpresas desagradáveis nas auditorias de certificação — e tendem a perder a certificação.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "1ª Parte (Interna)",
                descricao:
                  "A empresa audita a si mesma. Exigida pela ISO 9001 cláusula 9.2. Menor credibilidade externa, maior valor interno.",
                corFundo: "bg-sky-500/10",
              },
              {
                titulo: "2ª Parte (Fornecedor)",
                descricao:
                  "Cliente audita seu fornecedor. Verifica capacidade técnica e conformidade com requisitos contratuais.",
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "3ª Parte (Certificação)",
                descricao:
                  "Organismo acreditado e independente. Máxima credibilidade. Resulta em certificado ISO válido por 3 anos.",
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Evidência Objetiva",
                descricao:
                  "Dados verificáveis baseados em fatos: documentos, registros, observações diretas. Não são opiniões.",
                corFundo: "bg-violet-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "Auditoria da Qualidade — Guia Completo", duration: "08:30" }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Auditoria da Qualidade",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Processo de Auditoria", type: "4 Etapas", placeholderColor: "sky", imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" },
                { title: "Tipos de Auditoria", type: "1ª/2ª/3ª Parte", placeholderColor: "blue", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "PERA — Processo de Auditoria",
              content: (
                <div className="space-y-2 text-left">
                  <p><strong>P</strong>lanejamento → Escopo, critérios, equipe</p>
                  <p><strong>E</strong>xecução → Coleta de evidências</p>
                  <p><strong>R</strong>elatório → NCs, observações, OM</p>
                  <p><strong>A</strong>companhamento → Verificar ações corretivas</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Auditoria M6", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Auditoria da Qualidade"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-6"])}
            numero={3}
            variant={mv[6]}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M7 — Qualidade em Serviços
  // ─────────────────────────────────────────────
  const renderModulo7 = () => {
    const variant = mv[6];
    return (
      <TabsContent value="modulo-7" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Qualidade em Serviços"
            description="SERVQUAL, Gap Model, momentos da verdade e NPS aplicados ao contexto Petrobras."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Serviços diferem de produtos físicos em quatro características fundamentais:
              (1) <strong>Intangibilidade</strong> — não podem ser tocados ou testados antes
              de comprados; (2) <strong>Inseparabilidade</strong> — produção e consumo
              ocorrem simultaneamente (o serviço é consumido enquanto é produzido);
              (3) <strong>Variabilidade (Heterogeneidade)</strong> — a qualidade varia
              conforme quem presta, quando e onde; (4) <strong>Perecibilidade</strong> —
              não podem ser estocados (um quarto de hotel vazio hoje é receita perdida para
              sempre). Essas características criam desafios únicos para a gestão da qualidade.
            </p>
            <p>
              O modelo <strong>SERVQUAL</strong>, desenvolvido por Parasuraman, Zeithaml e
              Berry nos anos 1980s, avalia a qualidade em serviços através de 5 dimensões:
              (1) <strong>Tangíveis</strong> — aparência das instalações, equipamentos e
              pessoal; (2) <strong>Confiabilidade</strong> — capacidade de entregar o prometido
              com precisão e consistência; (3) <strong>Responsividade</strong> — disposição
              para ajudar e fornecer serviço rápido; (4) <strong>Segurança (Assurance)</strong>
              — conhecimento e cortesia, capacidade de inspirar confiança;
              (5) <strong>Empatia</strong> — atenção individualizada, entender necessidades
              específicas. Pesquisas apontam Confiabilidade como a dimensão mais importante
              na maioria dos contextos.
            </p>
            <p>
              O <strong>Gap Model</strong> (Modelo de Lacunas) de Parasuraman identifica
              5 gaps que causam insatisfação do cliente. O Gap 5 — diferença entre expectativa
              e percepção do cliente — é o resultado final dos Gaps 1-4 (internos à empresa).
              Para reduzir o Gap 5, é necessário fechar os gaps anteriores: entender o que
              o cliente quer (Gap 1), traduzir em especificações (Gap 2), entregar conforme
              especificado (Gap 3) e comunicar adequadamente o que será entregue (Gap 4).
            </p>
            <p>
              O <strong>NPS (Net Promoter Score)</strong>, criado por Fred Reichheld (Bain &amp; Co),
              é a pergunta mais simples da qualidade: "Em uma escala de 0-10, o quanto você
              recomendaria nossa empresa a um amigo?" Promotores (9-10) são leais e
              recomendam ativamente. Neutros (7-8) são satisfeitos mas indiferentes.
              Detratores (0-6) são insatisfeitos e podem prejudicar a reputação.
              NPS = %Promotores - %Detratores. Varia de -100 a +100.
            </p>
            <p>
              No contexto da <strong>Petrobras</strong>, a qualidade de serviços internos é
              tão crítica quanto a de produtos. O departamento de suprimentos presta serviços
              para unidades operacionais (clientes internos). A manutenção presta serviços
              para operações. A logística presta serviços para toda a cadeia. SERVQUAL pode
              ser aplicado internamente para medir a satisfação dos clientes internos e
              identificar gaps de melhoria.
            </p>

            <div className="bg-teal-500/10 border-l-4 border-teal-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-teal-600 dark:text-teal-400 text-lg mb-2">
                ⭐ 5 Dimensões do SERVQUAL
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Tangíveis:</strong> Instalações físicas, equipamentos, aparência</li>
                <li>✓ <strong>Confiabilidade:</strong> Entrega do prometido com precisão (a mais importante!)</li>
                <li>✓ <strong>Responsividade:</strong> Prontidão e disposição para ajudar</li>
                <li>✓ <strong>Segurança:</strong> Conhecimento, cortesia, transmitir confiança</li>
                <li>✓ <strong>Empatia:</strong> Atenção individualizada, entender o cliente</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="Qualidade em Serviços — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: Qualidade Percebida vs Objetiva",
                content:
                  "Em serviços, a qualidade é percebida — existe na mente do cliente, não apenas nas métricas internas. Um serviço tecnicamente perfeito pode ser percebido como ruim se a comunicação falha (Gap 4). O inverso também: um serviço mediocre pode ser percebido como bom se as expectativas foram gerenciadas baixo. A gestão da qualidade em serviços exige gerenciar tanto a entrega quanto as expectativas.",
              },
              {
                title: "Exemplificação: SERVQUAL no Suprimento Petrobras",
                content:
                  "Pesquisa SERVQUAL com clientes internos do suprimento: Confiabilidade = 3,2/5 (expectativa 4,8, gap = -1,6). Responsividade = 3,8/5 (expectativa 4,5, gap = -0,7). Empatia = 4,1/5 (expectativa 4,2, gap = -0,1). Diagnóstico: o maior gap é em Confiabilidade (entrega no prazo e especificação correta). Ação prioritária: melhorar processos de planejamento e confirmação de pedidos.",
              },
              {
                title: "Dicas: Momentos da Verdade em Prova",
                content:
                  "Jan Carlzon (SAS): 'Cada contato entre o cliente e a empresa é um momento da verdade'. Em concursos, questões pedem identificar 'momentos da verdade' em cenários de serviço. Todo ponto de contato é um momento: receber uma cotação, fazer uma entrega, atender uma reclamação, responder um e-mail. A experiência do cliente é a soma de todos esses momentos.",
              },
              {
                title: "Exceções: SERVQUAL tem Críticas",
                content:
                  "Críticas ao SERVQUAL: (1) Mede expectativas ex-ante vs percepção ex-post — mas expectativas mudam durante o serviço; (2) Assume que qualidade = diferença entre expectativa e percepção (mas às vezes percepção > expectativa sem o serviço ser objetivamente bom); (3) As 5 dimensões não são universais — variam por setor. Alternativas: SERVPERF (mede apenas percepção), modelos nórdicos de qualidade.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "SERVQUAL — 5 Dimensões",
                descricao:
                  "Tangíveis, Confiabilidade (a + importante), Responsividade, Segurança, Empatia.",
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Gap Model",
                descricao:
                  "5 lacunas entre expectativa e percepção. Gap 5 = resultado final da experiência do cliente.",
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "NPS",
                descricao:
                  "Promotores (9-10) - Detratores (0-6). Métrica simples e poderosa de lealdade do cliente.",
                corFundo: "bg-green-500/10",
              },
              {
                titulo: "Momentos da Verdade",
                descricao:
                  "Cada interação cliente-empresa forma a percepção de qualidade. Jan Carlzon / SAS Airlines.",
                corFundo: "bg-lime-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "SERVQUAL e Qualidade em Serviços", duration: "07:30" }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Qualidade em Serviços",
              materia: "Gestão de Qualidade",
              images: [
                { title: "5 Dimensões SERVQUAL", type: "Framework", placeholderColor: "teal", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" },
                { title: "Gap Model", type: "Diagrama", placeholderColor: "emerald", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "T.C.R.S.E. — As 5 Dimensões SERVQUAL",
              content: (
                <div className="space-y-2 text-left">
                  <p><strong>T</strong>angíveis → Aparência física</p>
                  <p><strong>C</strong>onfiabilidade → Entrega do prometido ★</p>
                  <p><strong>R</strong>esponsividade → Prontidão para ajudar</p>
                  <p><strong>S</strong>egurança → Conhecimento + confiança</p>
                  <p><strong>E</strong>mpatia → Atenção individualizada</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Serviços M7", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Qualidade em Serviços"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-7"])}
            numero={3}
            variant={mv[7]}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M8 — Gestão de Não-Conformidades
  // ─────────────────────────────────────────────
  const renderModulo8 = () => {
    const variant = mv[7];
    return (
      <TabsContent value="modulo-8" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Gestão de Não-Conformidades"
            description="CAPA, ação corretiva vs preventiva, 5 Porquês, FMEA e rastreabilidade de desvios."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Uma <strong>não-conformidade (NC)</strong> é o não atendimento a um requisito
              — norma, especificação técnica, procedimento operacional, regulação legal ou
              requisito do cliente. NCs podem ser detectadas em auditorias, inspeções de
              processo, inspeções de recebimento, reclamações de clientes ou análise de
              dados. Toda NC deve ser documentada, analisada quanto à causa raiz e tratada
              com ações corretivas.
            </p>
            <p>
              O sistema <strong>CAPA (Corrective and Preventive Action)</strong> é a espinha
              dorsal do tratamento de NCs no SGQ. Ação <strong>Corretiva</strong>: elimina
              a causa de uma NC JÁ ocorrida para evitar recorrência. Ação
              <strong> Preventiva</strong>: elimina a causa de uma NC POTENCIAL antes que
              ocorra. Ação de <strong>Contenção</strong>: medida imediata para limitar o
              impacto da NC (segregar lote, parar linha, reter entrega) — não resolve a
              causa, apenas limita o dano enquanto a ação corretiva é preparada.
            </p>
            <p>
              A <strong>Análise de Causa Raiz</strong> é o coração da ação corretiva eficaz.
              Sem identificar a causa raiz real, a mesma NC voltará a ocorrer.
              Ferramentas principais: <strong>5 Porquês</strong> (perguntar "por quê?"
              repetidamente até a causa raiz), <strong>Diagrama de Ishikawa</strong> (mapear
              causas em 6M), <strong>FMEA</strong> (Análise de Modo de Falha e Efeitos —
              preventiva, identifica falhas potenciais antes que ocorram).
            </p>
            <p>
              O <strong>FMEA (Failure Mode and Effects Analysis)</strong> é uma ferramenta
              preventiva para priorizar riscos. Para cada modo de falha potencial, avalia:
              <strong>Severidade</strong> (1-10: impacto se a falha ocorrer),
              <strong>Ocorrência</strong> (1-10: probabilidade de a causa ocorrer) e
              <strong>Detecção</strong> (1-10: capacidade de detectar a falha antes de chegar
              ao cliente). O <strong>RPN = Severidade × Ocorrência × Detecção</strong> (1-1000).
              Modos de falha com maior RPN têm prioridade de ação corretiva/preventiva.
            </p>
            <p>
              A <strong>rastreabilidade</strong> dos registros de NCs é mandatória pela
              ISO 9001 (cláusula 10.2). Toda NC deve ter: descrição clara, evidências,
              análise de causa raiz documentada, ações tomadas (contenção e corretiva),
              prazo e responsável, verificação de eficácia. Esse histórico é essencial para
              análise de tendências, identificação de NCs sistêmicas e evidência para
              auditorias.
            </p>

            <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">
                🔄 Fluxo CAPA em 6 Passos
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>1. Identificar</strong> a não-conformidade e documentar</li>
                <li>✓ <strong>2. Conter</strong> o impacto imediato (segregação, contenção)</li>
                <li>✓ <strong>3. Analisar</strong> a causa raiz (5 Porquês, Ishikawa, FMEA)</li>
                <li>✓ <strong>4. Planejar</strong> ação corretiva com responsável e prazo</li>
                <li>✓ <strong>5. Implementar</strong> a ação corretiva</li>
                <li>✓ <strong>6. Verificar</strong> eficácia (a NC não voltou a ocorrer?)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="Não-Conformidades — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: A Hierarquia de Respostas",
                content:
                  "Quando uma NC é identificada, há três níveis de resposta: (1) Ação de CONTENÇÃO — imediata, limita dano, temporária; (2) Ação CORRETIVA — investiga e elimina causa raiz, permanente; (3) Ação PREVENTIVA — proativa, elimina causas de NCs potenciais. A maioria das organizações foca nas ações corretivas (reativas). As excelentes investem em preventivas (proativas) usando FMEA e análise de risco.",
              },
              {
                title: "Exemplificação: 5 Porquês em Falha de Válvula",
                content:
                  "NC: válvula de segurança não funcionou no teste. Por quê? Atuador sem pressão. Por quê? Linha de ar comprimido bloqueada. Por quê? Filtro entupido. Por quê? Manutenção preventiva não realizada. Por quê? Não havia procedimento de manutenção para esse filtro. CAUSA RAIZ: ausência de procedimento de manutenção preventiva. Ação corretiva: criar procedimento + incluir no plano de manutenção.",
              },
              {
                title: "Dicas: FMEA e RPN em Prova",
                content:
                  "FMEA: memorize a fórmula RPN = Severidade × Ocorrência × Detecção. Notas de 1-10 em cada. RPN varia de 1-1000. A alavanca mais eficaz: quando Severidade é alta (risco de vida), foque em reduzir Detecção (melhorar capacidade de detectar antes de chegar ao cliente) pois Severidade geralmente não pode ser reduzida. Detecção 1 = facilmente detectável; 10 = impossível detectar.",
              },
              {
                title: "Exceções: ISO 9001:2015 e Ação Preventiva",
                content:
                  "Mudança importante 2015: a ISO 9001:2015 eliminou formalmente o requisito de 'ação preventiva' como elemento separado. Ele foi incorporado ao 'pensamento baseado em risco' (cláusula 6.1). Na prática, as organizações ainda realizam ações preventivas — mas agora chamadas de 'ações para tratar riscos'. Para provas: a versão 2008 tinha ação preventiva; a 2015 não tem mais como requisito explícito separado.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "Ação de Contenção",
                descricao:
                  "Resposta imediata para limitar dano. Segregar lote, parar linha. Temporária — não elimina a causa.",
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "Ação Corretiva",
                descricao:
                  "Elimina causa raiz de NC já ocorrida. Permanente. Baseada em análise de causa (5 Porquês, Ishikawa).",
                corFundo: "bg-red-500/10",
              },
              {
                titulo: "5 Porquês",
                descricao:
                  "Técnica Toyota: questionar 'por quê?' 5 vezes até chegar à causa raiz real do problema.",
                corFundo: "bg-orange-500/10",
              },
              {
                titulo: "FMEA",
                descricao:
                  "RPN = Severidade × Ocorrência × Detecção. Prioriza modos de falha por nível de risco.",
                corFundo: "bg-amber-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "Gestão de Não-Conformidades CAPA", duration: "08:00" }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Gestão de Não-Conformidades",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Fluxo CAPA", type: "6 Passos", placeholderColor: "rose", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
                { title: "FMEA RPN", type: "S×O×D", placeholderColor: "red", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "CAPA = Conter → Analisar → Planejar → Agir",
              content: (
                <div className="space-y-2 text-left text-lg">
                  <p><strong>C</strong>onter → Ação imediata, limitar dano</p>
                  <p><strong>A</strong>nalisar → 5 Porquês / Ishikawa / FMEA</p>
                  <p><strong>P</strong>lanejar → Responsável + prazo + solução</p>
                  <p><strong>A</strong>gir → Implementar e verificar eficácia</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast NC/CAPA M8", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Gestão de Não-Conformidades"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-8"])}
            numero={3}
            variant={mv[8]}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M9 — Qualidade na Petrobras
  // ─────────────────────────────────────────────
  const renderModulo9 = () => {
    const variant = mv[8];
    return (
      <TabsContent value="modulo-9" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Qualidade na Petrobras"
            description="SGI, normas setoriais API, ISO 29001, qualificação de fornecedores e rastreabilidade."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              A Petrobras opera um <strong>Sistema de Gestão Integrado (SGI)</strong> que
              unifica três sistemas: Qualidade (ISO 9001), Meio Ambiente (ISO 14001) e
              Saúde e Segurança Ocupacional (ISO 45001). A integração é estratégica: em
              O&amp;G, esses três sistemas são inseparáveis — uma falha de qualidade (válvula
              defeituosa) é simultaneamente um risco de segurança (explosão) e ambiental
              (derramamento). O SGI evita duplicidade de auditorias e cria sinergia entre
              os sistemas.
            </p>
            <p>
              Além da ISO 9001 genérica, o setor de O&amp;G tem normas setoriais específicas:
              <strong>ISO 29001</strong> — equivalente à ISO 9001 com requisitos adicionais
              para fornecedores de produtos e serviços da indústria de petróleo, petroquímica
              e gás natural; <strong>API (American Petroleum Institute)</strong> — especificações
              técnicas detalhadas para equipamentos: API 5L (tubos de aço), API 6D (válvulas
              para dutos), API 6A (equipamentos de cabeça de poço), API 650 (tanques);
              <strong>ASME</strong> — códigos para vasos de pressão e caldeiras (usados em
              refinarias).
            </p>
            <p>
              A <strong>qualificação de fornecedores</strong> na Petrobras para materiais
              críticos é um processo rigoroso que vai muito além de verificar um certificado
              ISO: (1) Avaliação de capacidade técnica (instalações, equipamentos, pessoal);
              (2) Auditoria da qualidade de 2ª parte nas instalações do fornecedor;
              (3) Qualificação de produto — ensaios e testes extensivos conforme normas
              API/ASME; (4) Inclusão na AVL (<em>Approved Vendor List</em> — lista de
              fornecedores aprovados). Só após todas essas etapas o fornecedor pode fornecer
              materiais críticos para a Petrobras.
            </p>
            <p>
              A <strong>inspeção de recebimento</strong> de materiais verifica conformidade
              antes que entrem no estoque: certificados de conformidade (conformidade com
              API/ASME), certificados de material (composição química, propriedades mecânicas),
              inspeção dimensional e visual, e testes específicos quando exigidos (pressão
              hidrostática, dureza). Materiais não conformes são identificados, segregados
              e devolvidos ao fornecedor com relatório de não-conformidade.
            </p>
            <p>
              A <strong>rastreabilidade de materiais</strong> em O&amp;G é crítica: cada
              componente deve ter histórico rastreável desde sua fabricação até sua instalação.
              Métodos: código de barras, RFID, documentação de origem (heat number para
              aços, número de lote para elastômeros). Em caso de falha ou recall, a
              rastreabilidade permite identificar exatamente quais outros componentes do
              mesmo lote estão instalados — potencialmente evitando acidentes catastróficos.
            </p>

            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-orange-600 dark:text-orange-400 text-lg mb-2">
                🛢️ Pirâmide do SGI Petrobras
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Topo — SGI:</strong> Política integrada QSE + Objetivos corporativos</li>
                <li>✓ <strong>Nível 1 — Normas:</strong> ISO 9001 + ISO 14001 + ISO 45001 + ISO 29001</li>
                <li>✓ <strong>Nível 2 — Setoriais:</strong> API 5L / 6D / 6A / 650 | ASME | ANP</li>
                <li>✓ <strong>Base — Processos:</strong> Qualificação de fornecedores + Inspeção + Rastreabilidade</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ContentAccordion
            titulo="Qualidade Petrobras — Análise C.E.D.E."
            slides={[
              {
                title: "Conceituação: QSE como Sistema Único",
                content:
                  "QSE (Qualidade, Saúde/Segurança, Meio Ambiente) não são sistemas separados no SGI — são facetas de um mesmo sistema integrado. Um procedimento de manutenção deve garantir simultaneamente: qualidade da manutenção (ISO 9001), segurança do técnico (ISO 45001) e gestão de resíduos gerados (ISO 14001). A integração reduz burocracia e cria coerência entre as três perspectivas.",
              },
              {
                title: "Exemplificação: Qualificação de Fornecedor de Válvulas",
                content:
                  "Petrobras necessita qualificar novo fornecedor de válvulas API 6D: (1) Avaliação documental — ISO 9001, licenças API, capacidade técnica; (2) Auditoria de 2ª parte — visita à fábrica, verificar processo de forja, maquinagem e testes; (3) Qualificação de produto — 3 válvulas do tipo específico para testes destrutivos e não-destrutivos; (4) Aprovação na AVL — inclusão no banco de fornecedores aprovados. Processo: 6-12 meses.",
              },
              {
                title: "Dicas: API vs ISO — o que cai em prova",
                content:
                  "Distinção importante para prova: ISO = normas de SISTEMA de gestão (como você gerencia); API = especificações TÉCNICAS de PRODUTO (o que o produto deve ser). Uma empresa pode ser ISO certificada e não ter qualificação API. Para fornecer à Petrobras: precisa de ambas. ISO 29001 = ISO 9001 com requisitos extras específicos para O&G. ASME = códigos de projeto/fabricação para vasos de pressão e tubulações.",
              },
              {
                title: "Exceções: AVL não é Permanente",
                content:
                  "Erro: pensar que uma vez aprovado na AVL, o fornecedor está aprovado para sempre. A Petrobras mantém programas de requalificação periódica: auditorias de vigilância, re-ensaios de qualificação de produto, avaliação de desempenho (NCs, reclamações, devoluções). Fornecedores com histórico de não-conformidades graves podem ser suspensos ou excluídos da AVL. A qualificação é um processo contínuo.",
              },
            ]}
          />
          <CardCarousel
            cards={[
              {
                titulo: "SGI — Sistema Integrado",
                descricao:
                  "ISO 9001 (Qualidade) + ISO 14001 (Meio Ambiente) + ISO 45001 (SSO) integrados em um único sistema.",
                corFundo: "bg-orange-500/10",
              },
              {
                titulo: "ISO 29001",
                descricao:
                  "ISO 9001 com requisitos adicionais para O&G. Exigida de fornecedores de produtos e serviços críticos.",
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Normas API",
                descricao:
                  "API 5L (tubos), API 6D (válvulas dutos), API 6A (cabeça de poço), API 650 (tanques). Referências mundiais.",
                corFundo: "bg-yellow-500/10",
              },
              {
                titulo: "AVL — Approved Vendor List",
                descricao:
                  "Lista de fornecedores qualificados pela Petrobras. Processo rigoroso: auditoria + qualificação de produto.",
                corFundo: "bg-lime-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "Sistema de Qualidade Petrobras", duration: "09:15" }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Qualidade na Petrobras",
              materia: "Gestão de Qualidade",
              images: [
                { title: "SGI Petrobras", type: "Sistema", placeholderColor: "orange", imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800" },
                { title: "Normas Setoriais API", type: "O&G", placeholderColor: "amber", imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "SGI = Q + A + SSO (ISO 9001 + 14001 + 45001)",
              content: (
                <div className="space-y-2 text-left text-lg">
                  <p><strong>Q</strong>ualidade → ISO 9001 / ISO 29001</p>
                  <p><strong>A</strong>mbiental → ISO 14001 + IBAMA + ANP</p>
                  <p><strong>S</strong>SO → ISO 45001 (saúde + segurança)</p>
                  <p><strong>+</strong> Normas setoriais → API, ASME, ABNT</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Qualidade Petrobras M9", artista: "Time Petrobras Quest" }}
          />
          <QuizInterativo
            titulo="QUIZ: Qualidade na Petrobras"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-9"])}
            numero={3}
            variant={mv[9]}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // M10 — Simulado Mestre
  // ─────────────────────────────────────────────
  const renderModulo10 = () => {
    const variant = mv[9];
    return (
      <TabsContent value="modulo-10" className="space-y-6">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Simulado Mestre"
            description="6 questões integradas de nível CESGRANRIO cobrindo todos os 9 módulos."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              O <strong>Simulado Mestre</strong> é a consolidação de toda a jornada de
              aprendizado em Gestão de Qualidade. Estas 6 questões integram conhecimentos
              dos 9 módulos anteriores em cenários complexos, no estilo CESGRANRIO —
              com casos práticos, raciocínio aplicado e distinções sutis que exigem
              compreensão profunda, não apenas memorização.
            </p>
            <p>
              Para alcançar a pontuação de aprovação (≥70%), você precisará dominar:
              fundamentos e gurus (Deming, Juran, Crosby, Ishikawa), estrutura ISO 9001:2015
              (HLS, PDCA, 7 princípios), ferramentas da qualidade (7 clássicas, 6M),
              filosofia TQM (Kaizen, 5S, Poka-Yoke), CEP e Seis Sigma (DMAIC, cartas de
              controle, RPN), auditoria (tipos, processo, evidências), SERVQUAL (5 dimensões,
              Gap Model), CAPA e FMEA, e o contexto Petrobras (SGI, API, AVL).
            </p>
            <p>
              Questões de nível mestre testam a capacidade de <strong>aplicar</strong>
              conceitos em situações novas, não apenas <strong>reconhecer</strong>
              definições. Esteja preparado para cenários que misturam ferramentas (ex: usar
              FMEA + 5 Porquês juntos), compare conceitos similares (Cp vs Cpk, ação
              corretiva vs preventiva) e exijam raciocínio de trade-off (qual dimensão
              SERVQUAL priorizar em qual contexto).
            </p>

            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">
                👑 Revisão Expressa — Os 10 Conceitos Mais Cobrados
              </p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>1.</strong> PDCA → Plan=4-7, Do=8, Check=9, Act=10 (ISO 9001)</li>
                <li>✓ <strong>2.</strong> DMAIC → Define, Measure, Analyze, Improve, Control (6σ)</li>
                <li>✓ <strong>3.</strong> RPN = Severidade × Ocorrência × Detecção (FMEA)</li>
                <li>✓ <strong>4.</strong> 6σ = 3,4 DPMO | 3σ = 66.807 DPMO</li>
                <li>✓ <strong>5.</strong> SERVQUAL: T.C.R.S.E. — Confiabilidade é a mais importante</li>
                <li>✓ <strong>6.</strong> 5S: Seiri, Seiton, Seiso, Seiketsu, Shitsuke</li>
                <li>✓ <strong>7.</strong> Auditoria: 1ª (interna), 2ª (fornecedor), 3ª (certificação)</li>
                <li>✓ <strong>8.</strong> Pareto: 80% problemas ← 20% causas</li>
                <li>✓ <strong>9.</strong> SGI Petrobras: ISO 9001 + ISO 14001 + ISO 45001</li>
                <li>✓ <strong>10.</strong> Gurus: Deming=PDCA, Juran=Trilogia, Crosby=Zero Defeitos</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <CardCarousel
            cards={[
              {
                titulo: "Fundamentos + ISO",
                descricao:
                  "Gurus (Deming/Juran/Crosby/Ishikawa), 8 dimensões Garvin, ISO 9001 HLS, 7 princípios, PDCA nas cláusulas.",
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Ferramentas + TQM",
                descricao:
                  "7 ferramentas clássicas (6M, Pareto, Cartas), Kaizen, 5S, Poka-Yoke, Benchmarking.",
                corFundo: "bg-violet-500/10",
              },
              {
                titulo: "CEP + Auditoria",
                descricao:
                  "DMAIC, Cp/Cpk ≥ 1,33, DPMO 6σ=3,4. Auditoria 1ª/2ª/3ª parte, PERA, evidência objetiva.",
                corFundo: "bg-purple-500/10",
              },
              {
                titulo: "Serviços + NC + Petrobras",
                descricao:
                  "SERVQUAL T.C.R.S.E., Gap Model, CAPA, 5 Porquês, FMEA RPN, SGI, API, AVL.",
                corFundo: "bg-fuchsia-500/10",
              },
            ]}
          />
          <ModuleConsolidation
            index={2}
            variant={variant}
            video={{ videoId: "dQw4w9WgXcQ", title: "Revisão Final — Gestão de Qualidade", duration: "10:00" }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Simulado Mestre",
              materia: "Gestão de Qualidade",
              images: [
                { title: "Mapa da Qualidade", type: "Revisão", placeholderColor: "indigo", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" },
                { title: "Exame Final", type: "Simulado", placeholderColor: "violet", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" },
              ],
            }}
            maceteVisual={{
              title: "Qualidade = F.I.T.C.S.A.",
              content: (
                <div className="space-y-2 text-left text-lg">
                  <p><strong>F</strong>undamentos → Gurus + 8 Dimensões</p>
                  <p><strong>I</strong>SO 9001 → HLS + PDCA + 7 Princípios</p>
                  <p><strong>T</strong>QM → Kaizen + 5S + Poka-Yoke</p>
                  <p><strong>C</strong>EP/6σ → DMAIC + RPN + DPMO</p>
                  <p><strong>S</strong>erviços → SERVQUAL + Gap Model</p>
                  <p><strong>A</strong>uditoria → PERA + CAPA + SGI</p>
                </div>
              ),
            }}
            audio={{ audioUrl: "#", titulo: "Podcast Final Gestão Qualidade", artista: "Time Petrobras Quest" }}
          />

          {completedModules.has("modulo-10") && (
            <ModuleBanner
              titulo="ESPECIALISTA EM GESTÃO DE QUALIDADE"
              descricao="Você dominou todos os conceitos de qualidade para o concurso Petrobras!"
              variant={variant}
            />
          )}

          <QuizInterativo
            titulo="QUIZ: Simulado Mestre"
            questoes={toQQ(GESTAO_QUALIDADE_QUIZZES["modulo-10"])}
            numero={3}
            variant={mv[10]}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    );
  };

  // ─────────────────────────────────────────────
  // Render principal
  // ─────────────────────────────────────────────
  return (
    <AulaTemplate
      {...props}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Gestão de Qualidade"
      descricao="Princípios da qualidade, ferramentas e melhoria de processos para Técnico de Suprimento."
      duracao="5h 00min"
      materiaNome={props.materiaNome ?? "Administração"}
      materiaCor={props.materiaCor ?? "blue"}
      materiaId={props.materiaId ?? "especifica-bloco-i-administracao-suprimento"}
      isCompleted={completedModules.has("modulo-10")}
      currentProgress={Math.round((completedModules.size / MODULE_DEFS.length) * 100)}
      onComplete={props.onComplete}
    >
      {renderModulo1()}
      {renderModulo2()}
      {renderModulo3()}
      {renderModulo4()}
      {renderModulo5()}
      {renderModulo6()}
      {renderModulo7()}
      {renderModulo8()}
      {renderModulo9()}
      {renderModulo10()}
    </AulaTemplate>
  );
}
