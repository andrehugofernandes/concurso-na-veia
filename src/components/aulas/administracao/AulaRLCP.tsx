"use client";

/**
 * AulaRLCP - Regulamento de Licitações e Contratos da Petrobras
 * Premium aula para Nível Técnico/Médio
 &lt; 
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
  QuizInterativo,
  QuizQuestion,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_RLCP } from "@/data/quizzes/rlcp-quizzes";

/** Converts the local Quiz format to the QuizQuestion[] format expected by QuizInterativo */
function toQQ(quiz: (typeof QUIZ_RLCP)[string] | undefined): QuizQuestion[] {
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
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais RLCP" },
  { id: "modulo-2", label: "Módulo 2", title: "Modalidades de Licitação" },
  { id: "modulo-3", label: "Módulo 3", title: "Procedimento Licitatório" },
  { id: "modulo-4", label: "Módulo 4", title: "Edital e Termo de Referência" },
  { id: "modulo-5", label: "Módulo 5", title: "Julgamento e Adjudicação" },
  { id: "modulo-6", label: "Módulo 6", title: "Recursos e Impugnações" },
  { id: "modulo-7", label: "Módulo 7", title: "Contratos e Execução" },
  { id: "modulo-8", label: "Módulo 8", title: "Inabilitação e Desempate" },
  { id: "modulo-9", label: "Módulo 9", title: "RLCP na Prática Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaRLCP(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const quizM1 = QUIZ_RLCP["modulo-1"];
  const quizM2 = QUIZ_RLCP["modulo-2"];
  const quizM3 = QUIZ_RLCP["modulo-3"];
  const quizM4 = QUIZ_RLCP["modulo-4"];
  const quizM5 = QUIZ_RLCP["modulo-5"];
  const quizM6 = QUIZ_RLCP["modulo-6"];
  const quizM7 = QUIZ_RLCP["modulo-7"];
  const quizM8 = QUIZ_RLCP["modulo-8"];
  const quizM9 = QUIZ_RLCP["modulo-9"];
  const quizM10 = QUIZ_RLCP["modulo-10"];

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

  const renderModulo1 = () => {
    const variant = getModuleVariant(1);
    return (
      <TabsContent value="modulo-1" className="space-y-6">


        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={variant}
            title="Conceitos e Âmbito de Aplicação"
          />
          <ContentAccordion
            titulo="Detalhamento do Conteúdo"
            slides={[
              {
                title: "O que é o RLCP?",
                content:
                  "O Regulamento de Licitações e Contratos da Petrobras (RLCP) é o documento que define como a Petrobras deve contratar obras, serviços e compras. Ele baseia-se na Lei 13.303/2016 (Lei das Estatais) e visa garantir competitividade e transparência nas escolhas da companhia.",
              },
              {
                title: "A Quem se Aplica?",
                content:
                  "Aplica-se à Petrobras (Holding) e suas subsidiárias integrais. Toda contratação que envolva recursos da companhia deve seguir estas regras, salvo exceções específicas devidamente justificadas.",
              },
              {
                title: "Princípios Fundamentais",
                content:
                  "Eficiência, economicidade, publicidade, moralidade e igualdade. A Petrobras deve buscar o melhor custo-benefício, mantendo a ética e permitindo que o mercado compita de forma justa.",
              },
            ]}
          />
        







<ModuleConsolidation
          index={1}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Introdução ao RLCP",
            duration: "05:20",
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Conceitos Fundamentais",
            materia: "RLCP",
            images: [
              {
                title: "Princípios",
                type: "Base",
                placeholderColor: "indigo",
                imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Âmbito",
                type: "Regra",
                placeholderColor: "blue",
                imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
              },
            ],
          }}
          maceteVisual={{
            title: "P.I.L.A.R. - Princípios do RLCP",
            content: (
              <div className="space-y-2 text-left">
                <p><strong>P</strong>ublicidade</p>
                <p><strong>I</strong>mpessoalidade</p>
                <p><strong>L</strong>egalidade</p>
                <p><strong>A</strong>utonomia</p>
                <p><strong>R</strong>azoabilidade</p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "#",
            titulo: "Podcast RLCP M1",
            artista: "Time de Compliance",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 1"
            questoes={toQQ(quizM1)}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo2 = () => {
    const variant = getModuleVariant(2);
    return (
      <TabsContent value="modulo-2" className="space-y-6">


        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Tipos de Licitação"
          />
          <ContentAccordion
            titulo="Detalhamento das Modalidades"
            slides={[
              {
                title: "Concorrência: Modalidade Aberta",
                content:
                  "Qualquer interessado pode participar (maior publicidade). Prazo mínimo: 5 dias úteis. Ideal para contratos de grande vulto. Exemplo: compra de 10.000 toneladas de aço.",
              },
              {
                title: "Tomada de Preços: Com Pré-qualificação",
                content:
                  "Participante deve estar cadastrado como fornecedor de Petrobras. Prazo mínimo: 3 dias úteis. Menos formalidade que Concorrência. Exemplo: compra de peças de equipamento.",
              },
              {
                title: "Convite: Pequenas Compras",
                content:
                  "Para compras de baixo valor. Petrobras convida 3+ fornecedores cadastrados. Prazo: 1 dia útil. Rápido e direto. Exemplo: compra de material de escritório.",
              },
              {
                title: "Dispensa de Licitação: Exceções",
                content:
                  "Quando licitação é impossível (emergência, desastre natural) ou desnecessária (fornecedor único patentado). Requer justificativa. Documentação posterior é obrigatória.",
              },
            ]}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📌 Compra de Tubulação
              </h4>
              <p className="text-sm text-muted-foreground">
                Petrobras precisa de 1.000 km de tubulação. Publica edital (RLCP) definindo:
                especificações (diâmetro, material), quantidade, prazo de entrega. Empresas
                concorrem. Critério: menor preço + qualidade. Vencedor assina contrato.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚡ Contratação de Consultoria
              </h4>
              <p className="text-sm text-muted-foreground">
                Petrobras contrata consultoria para projeto estratégico. Usa Melhor Técnica:
                qualidade (metodologia, equipe, experiência) é mais importante que preço.
                Melhor proposta técnica vence.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🚨 Situação de Emergência
              </h4>
              <p className="text-sm text-muted-foreground">
                Vazamento de óleo requer resposta imediata. Petrobras dispensa licitação
                formal (calamidade) mas garante documentação. Contrata fornecedor de resposta
                rápida. Após situação controlada, justifica contratos.
              </p>
            </div>
          </div>
        







<ModuleConsolidation
          index={2}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Modalidades de Licitação",
            duration: "08:15",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Modalidades de Licitação",
            materia: "RLCP",
            images: [
              {
                title: "Concorrência",
                type: "Destaque",
                placeholderColor: "blue",
                imageUrl: "https://images.unsplash.com/photo-1454165833767-131435bb4496?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Dispensa",
                type: "Exceção",
                placeholderColor: "rose",
                imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
              },
            ],
          }}
          maceteVisual={{
            title: "C.T.C. - O Trio das Modalidades",
            content: (
              <div className="space-y-2 text-left">
                <p><strong>C</strong>oncorrência: Geral.</p>
                <p><strong>T</strong>omada: Cadastrados.</p>
                <p><strong>C</strong>onvite: Pequenos.</p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "#",
            titulo: "Modalidades em 5 Minutos",
            artista: "Auditório Petrobras",
          }}
        />

                  <QuizInterativo
            questoes={toQQ(quizM2)}
            titulo="Gestão Estratégica"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo3 = () => {
    const variant = getModuleVariant(3);
    return (
      <TabsContent value="modulo-3" className="space-y-6">


        <div className="space-y-6">
          <ModuleSectionHeader
            index={3}
            variant={variant}
            title="As Fases da Licitação"
          />
          <ContentAccordion
            titulo="Fluxo da Contratação"
            slides={[
              {
                title: "Fase Preparatória (Interna)",
                content:
                  "Definição do que será comprado, estimativa de custos e elaboração do Termo de Referência. É o momento de decidir a modalidade e o critério de julgamento.",
              },
              {
                title: "Fase de Divulgação",
                content:
                  "Publicação do edital. O mercado toma conhecimento da demanda da Petrobras. Prazos devem ser respeitados conforme a modalidade escolhida.",
              },
              {
                title: "Fase de Apresentação de Propostas",
                content:
                  "Fornecedores enviam seus lances ou propostas técnicas/comerciais. Pode ser por meio eletrônico ou presencial.",
              },
              {
                title: "Julgamento e Habilitação",
                content:
                  "A Petrobras avalia as propostas (quem tem o melhor preço/técnica) e depois verifica se o vencedor tem documentação em dia (habilitação).",
              },
            ]}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📅 Cronograma Típico de Concorrência
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>01/03:</strong> Edital publicado. <br />
                <strong>03/03:</strong> Prazo de impugnação (2 dias antes de 05/03). <br />
                <strong>05/03:</strong> Prazo de resposta começa. <br />
                <strong>12/03:</strong> Prazo termina (5 dias úteis). Recebimento de propostas 10h. <br />
                <strong>13-14/03:</strong> Julgamento (habilitação, mérito). <br />
                <strong>15/03:</strong> Publicação de resultado. Prazo de recurso: 2 dias úteis. <br />
                <strong>17/03:</strong> Prazo de recurso termina. <br />
                <strong>18/03:</strong> Homologação. <br />
                <strong>19/03:</strong> Adjudicação. Vencedor assina contrato.
              </p>
            </div>
          </div>
        







<ModuleConsolidation
          index={3}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Passo a Passo da Licitação",
            duration: "12:30",
          }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Procedimento Licitatório",
            materia: "RLCP",
            images: [
              {
                title: "Fase Interna",
                type: "Início",
                placeholderColor: "emerald",
                imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Fase Externa",
                type: "Execução",
                placeholderColor: "blue",
                imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779e22db9?auto=format&fit=crop&q=80&w=800",
              },
            ],
          }}
          maceteVisual={{
            title: "A Ordem dos Fatores",
            content: (
              <div className="space-y-2 text-left">
                <p><strong>1.</strong> Preparação (Interna)</p>
                <p><strong>2.</strong> Divulgação (Edital)</p>
                <p><strong>3.</strong> Lances/Propostas</p>
                <p><strong>4.</strong> Julgamento</p>
                <p><strong>5.</strong> Habilitação</p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "#",
            titulo: "Fluxograma Licitatório",
            artista: "Auditório Petrobras",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 3"
            questoes={toQQ(quizM3)}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo4 = () => {
    const variant = getModuleVariant(4);
    return (
      <>
        <TabsContent value="modulo-4" className="space-y-12">
          <ModuleConsolidation
            index={4}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "TR e Edital",
              duration: "08:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "O Termo de Referência e o Edital",
              materia: "RLCP",
              images: [
                {
                  title: "Termo de Referência",
                  type: "Documento",
                  placeholderColor: "bg-blue-500/10",
                },
                {
                  title: "O Edital",
                  type: "Convocação",
                  placeholderColor: "bg-indigo-500/10",
                },
              ],
            }}
            maceteVisual={{
              title: "TR vs Edital",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                    <h6 className="font-bold text-blue-600 mb-1">Termo de Referência (TR)</h6>
                    <p className="text-xs text-muted-foreground">O "O QUE" será comprado. Especificações técnicas, quantidades e prazos.</p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                    <h6 className="font-bold text-indigo-600 mb-1">Edital</h6>
                    <p className="text-xs text-muted-foreground">As "REGRAS DO JOGO". Como será a licitação, prazos e julgamento.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Podcast: O Coração da Licitação",
              artista: "Supply Chain Team",
            }}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="4.1"
              variant={variant}
              title="Especificações e Regras"
              description="A importância de documentos bem elaborados para o sucesso da contratação."
            />
            <ContentAccordion
              slides={[
                {
                  title: "Termo de Referência (TR)",
                  content: "O TR descreve EXATAMENTE o objeto. Inclui especificações técnicas (material, tamanho, padrão ISO), quantidades, prazos de entrega e critérios de qualidade. Exemplo: 'tubulação de aço API 5L Grade X65, diâmetro 24 pol'.",
                },
                {
                  title: "Edital - Documento Formal de Convocação",
                  content:
                    "Edital é o documento público que convoca a licitação. Contém: 1) Objeto (o que se compra), 2) Modalidade, 3) Critério de julgamento, 4) Prazos (resposta, julgamento, recurso), 5) Requisitos de habilitação, 6) TR anexado, 7) Contatos, 8) Local de retirada de documentos, 9) Preço estimado (quando público).",
                },
                {
                  title: "Preço Estimado ou Valor de Referência",
                  content:
                    "Petrobras pesquisa mercado antes de licitar. Cria estimativa de custo justo. Pode ser publicada no edital (transparência) ou mantida confidencial. Serve para desclassificar propostas manifestamente caras ou absurdamente baratas.",
                },
                {
                  title: "Requisitos de Habilitação no Edital",
                  content:
                    "Edital especifica: inscrição em órgão regulador (CNPJ, registro profissional), capacidade técnica (certificados, referências), capacidade financeira (patrimônio mínimo), ausência de débitos (com fisco, tribunais). Fornecedor deve comprovar tudo.",
                },
                {
                  title: "Critério de Julgamento no Edital",
                  content:
                    "Edital deixa CLARO qual é o critério: 'Menor Preço', 'Melhor Técnica', 'Técnica + Preço' (combinação com pesos), 'Maior Desconto'. Critério é aplicado igualmente a todas as propostas.",
                },
                {
                  title: "Importância de TR e Edital Bem Elaborados",
                  content:
                    "TR sem especificações claras = propostas incomparáveis ('qual é mais caro?'). Edital com critério vago = julgamento questionável. Resultado: litígios, recursos, atrasos. TR+Edital bem feitos = processo rápido, justo, eficiente.",
                },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            index="4.1"
            variant={variant}
            title="Exemplos de TR e Edital"
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📋 Exemplo 1: TR para Tubulação
              </h4>
              <p className="text-sm text-muted-foreground">
                <strong>Objeto:</strong> Fornecimento de 1.000 km de tubulação. <br />
                <strong>Especificação:</strong> Aço API 5L Grade X65, diâmetro 24\", espessura 15.9mm. <br />
                <strong>Qualidade:</strong> Teste hidrostático a 72 atm. Certificado de origem. <br />
                <strong>Entrega:</strong> Porto de Santos, 12 meses. <br />
                <strong>Garantia:</strong> 24 meses contra defeitos de fabricação.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📄 Exemplo 2: Edital para Tubulação
              </h4>
              <p className="text-sm text-muted-foreground">
                <strong>Objeto:</strong> Conforme TR anexado. <br />
                <strong>Modalidade:</strong> Concorrência Internacional. <br />
                <strong>Critério:</strong> Menor Preço (proposta com menor preço que atenda TR vence). <br />
                <strong>Prazo Resposta:</strong> 5 dias úteis. <br />
                <strong>Preço Estimado:</strong> R$ 200 milhões (divulgado para transparência). <br />
                <strong>Habilitação:</strong> Inscrição CNPJ, certificação ISO 9001, últimas 3 demonstrações financeiras, 2 referências de projetos similares.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚠️ Caso Negativo: TR Vago
              </h4>
              <p className="text-sm text-muted-foreground">
                <strong>Erro:</strong> \"Compra tubulação de aço, tamanho grande, qualidade boa, entrega rápida\". <br />
                <strong>Problema:</strong> 'Grande' = qual diâmetro? 'Boa' = qual norma? 'Rápida' = quantos dias? <br />
                <strong>Resultado:</strong> Propostas incomparáveis. Fornecedor A oferece 10\" @ R$100m. Fornecedor B oferece 24\" @ R$200m. Qual é melhor? Litígio.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            index="4.2"
            variant={variant}
            title="Prática - Quiz Interativo"
          />
          <QuizInterativo
            titulo="Fixação Módulo 4"
            questoes={toQQ(quizM4)}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </TabsContent>
      </>
    );
  };

  const renderModulo5 = () => {
    const variant = getModuleVariant(5);
    return (
      <TabsContent value="modulo-5" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="5.1"
            variant={variant}
            title="Processo de Julgamento"
            description="Entenda como as propostas são avaliadas e selecionadas."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Comissão de Licitação",
                conteudo: "A Comissão é multidisciplinar e composta por especialistas: Engenharia, Financeiro, Jurídico e Supply Chain. Atuam de forma colegiada.",
                icone: "👥",
              },
              {
                title: "Fase de Habilitação",
                conteudo: "Verificação da idoneidade e capacidade: CNPJ válido, certificações, regularidade fiscal e patrimônio mínimo.",
                icone: "🛡️",
              },
              {
                title: "Homologação e Adjudicação",
                conteudo: "A Homologação é a validação jurídica do processo. A Adjudicação é o ato formal que consagra o vencedor.",
                icone: "🏆",
              },
            ]}
          />

          <ModuleSectionHeader
            index="5.2"
            variant={variant}
            title="Critérios de Julgamento e Homologação"
            description="Aplicação dos critérios de seleção e formalização do resultado da licitação."
          />
        







<ModuleConsolidation
          index={5}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Julgamento e Adjudicação",
            duration: "06:45",
          }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Julgamento e Adjudicação",
            materia: "RLCP",
            images: [
              {
                title: "Comissão de Licitação",
                type: "Dossiê",
                placeholderColor: "bg-indigo-500/10",
              },
              {
                title: "Critérios de Julgamento",
                type: "Diagrama",
                placeholderColor: "bg-emerald-500/10",
              },
              {
                title: "Fluxo de Adjudicação",
                type: "Mapa Mental",
                placeholderColor: "bg-amber-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Critérios de Seleção",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                  <div className="text-2xl mb-2">💵</div>
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-400">Menor Preço</h5>
                  <p className="text-xs text-muted-foreground">O critério mais comum para bens e serviços comuns.</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                  <div className="text-2xl mb-2">📐</div>
                  <h5 className="font-bold text-blue-700 dark:text-blue-400">Melhor Técnica</h5>
                  <p className="text-xs text-muted-foreground">Foco na qualidade e expertise técnica do fornecedor.</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <h5 className="font-bold text-purple-700 dark:text-purple-400">Técnica e Preço</h5>
                  <p className="text-xs text-muted-foreground">Equilíbrio entre custo e qualidade técnica.</p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            titulo: "Rap do Julgamento",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 5"
            questoes={toQQ(quizM5)}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo6 = () => {
    const variant = getModuleVariant(6);
    return (
      <TabsContent value="modulo-6" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="6.1"
            variant={variant}
            title="Direito de Defesa"
            description="Mecanismos para garantir a legalidade e a transparência do certame."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Impugnação",
                conteudo: "Questiona regras do edital que ferem a Lei 13.303 ou o RLCP. Deve ser respondido motivadamente pela Petrobras.",
                icone: "🛡️",
              },
              {
                title: "Recurso Administrativo",
                conteudo: "Interposto contra decisões da comissão de licitação (julgamento ou habilitação). Tem efeito suspensivo como regra.",
                icone: "⚖️",
              },
            ]}
          />
        







<ModuleConsolidation
          index={6}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Recursos e Impugnações",
            duration: "09:12",
          }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Controle do Processo",
            materia: "RLCP",
            images: [
              {
                title: "Impugnação",
                type: "Documento",
                placeholderColor: "bg-indigo-500/10",
              },
              {
                title: "Recurso",
                type: "Ação",
                placeholderColor: "bg-purple-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Impugnar vs Recorrer",
            content: (
              <div className="space-y-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-sm font-bold">Impugnação: DO EDITAL (Antes)</p>
                  <p className="text-xs">Prazo: Até 2 dias úteis antes das propostas.</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-sm font-bold">Recurso: DO RESULTADO (Depois)</p>
                  <p className="text-xs">Prazo: 2 dias úteis após a publicação.</p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            titulo: "Voz do Licitante",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 6"
            questoes={toQQ(quizM6)}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo7 = () => {
    const variant = getModuleVariant(7);
    return (
      <TabsContent value="modulo-7" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="7.1"
            variant={variant}
            title="Execução Contratual"
            description="Como a Petrobras garante que o que foi licitado seja entregue."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Obrigações das Partes",
                conteudo: "Fornecedor entrega conforme TR; Petrobras fiscaliza e paga conforme cronograma financeiro.",
                icone: "🤝",
              },
              {
                title: "Sanções",
                conteudo: "Em caso de atraso ou má qualidade, aplicam-se multas, advertências ou suspensão do direito de licitar.",
                icone: "⚠️",
              },
            ]}
          />
        







<ModuleConsolidation
          index={7}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Gestão de Contratos",
            duration: "11:45",
          }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Vida do Contrato",
            materia: "RLCP",
            images: [
              {
                title: "Fiscalização",
                type: "Atividade",
                placeholderColor: "bg-emerald-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Checklist de Recebimento",
            content: (
              <ul className="text-left text-xs space-y-2 list-decimal list-inside">
                <li>Entrega do objeto</li>
                <li>Recebimento Provisório (conferência)</li>
                <li>Testes de qualidade</li>
                <li>Recebimento Definitivo (aceite final)</li>
              </ul>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            titulo: "Pós-Licitação",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 7"
            questoes={toQQ(quizM7)}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo8 = () => {
    const variant = getModuleVariant(8);
    return (
      <TabsContent value="modulo-8" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="8.1"
            variant={variant}
            title="Causas de Exclusão e Desempate"
            description="Entenda os motivos que levam à eliminação de licitantes e propostas."
          />
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                title: "Inabilitação",
                conteudo: "Licitante não atende requisitos de habilitação: CNPJ, regularidade fiscal, capacidade técnica e financeira.",
                icone: "🛡️",
              },
              {
                title: "Desclassificação",
                conteudo: "Proposta não atende especificações do TR ou tem preço manifestamente excessivo/inequível.",
                icone: "📏",
              },
            ]}
          />
        







<ModuleConsolidation
          index={8}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Inabilitação e Desclassificação",
            duration: "07:15",
          }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Causas de Exclusão",
            materia: "RLCP",
            images: [
              {
                title: "Inabilitação",
                type: "Dossiê",
                placeholderColor: "bg-red-500/10",
              },
              {
                title: "Desclassificação",
                type: "Diagrama",
                placeholderColor: "bg-orange-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Inabilitação vs Desclassificação",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h5 className="font-bold text-red-700 dark:text-red-400">Inabilitação</h5>
                  <p className="text-xs text-muted-foreground">Problema com o LICITANTE (Documentos, Capacidade).</p>
                </div>
                <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <h5 className="font-bold text-orange-700 dark:text-orange-400">Desclassificação</h5>
                  <p className="text-xs text-muted-foreground">Problema com a PROPOSTA (Preço, Técnica).</p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            titulo: "Rap do Excluído",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 8"
            questoes={toQQ(quizM8)}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo9 = () => {
    const variant = getModuleVariant(9);
    return (
      <TabsContent value="modulo-9" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="9.1"
            variant={variant}
            title="Aplicações Práticas"
            description="Exemplos reais de como a Petrobras aplica o RLCP."
          />
        







<ModuleConsolidation
          index={9}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "RLCP na Petrobras",
            duration: "08:20",
          }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Prática Corporativa",
            materia: "RLCP",
            images: [
              {
                title: "Compliance",
                type: "Petrobras",
                placeholderColor: "bg-emerald-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Papel do Técnico",
            content: (
              <p className="text-xs text-muted-foreground">
                O Técnico de Suprimento atua na elaboração do TR, participa de comissões e fiscaliza a entrega dos bens.
              </p>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            titulo: "Música do Suprimento",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Fixação Módulo 9"
            questoes={toQQ(quizM9)}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo10 = () => {
    const variant = getModuleVariant(10);
    return (
      <TabsContent value="modulo-10" className="space-y-12">


        <div className="space-y-6">
          <ModuleSectionHeader
            index="10.1"
            variant={variant}
            title="Simulado Mestre"
            description="Desafie-se com o conteúdo completo de Administração e RLCP."
          />
        







<ModuleConsolidation
          index={10}
          variant={variant}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Simulado Final",
            duration: "15:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Grand Finale",
            materia: "RLCP",
            images: [
              {
                title: "Certificado",
                type: "Meta",
                placeholderColor: "bg-amber-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Você está pronto!",
            content: <p className="text-xs">Domine o RLCP e conquiste sua vaga.</p>,
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Vitória no RLCP",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="Simulado Mestre"
            questoes={toQQ(quizM10)}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    );
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={(index) => isModuleUnlocked(`modulo-${index + 1}`)}
      titulo="RLCP - Regulamento de Licitações Petrobras"
      descricao="Procedimentos transparentes de compras, contratações e gestão de contratos"
      duracao="2h 30m"
      materiaNome="Administração"
      materiaCor="amber"
      materiaId="administracao"
      isCompleted={completedModules.size === MODULE_DEFS.length}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
      xpGanho={props.xpGanho}
    >
      <div className="mt-8">
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
      </div>
    </AulaTemplate>
  );
}
