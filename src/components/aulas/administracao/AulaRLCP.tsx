"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

/**
 * AulaRLCP - Regulamento de Licitações e Contratos da Petrobras
 * Premium aula para Nível Técnico/Médio
 &lt; 
 * Status: 10 módulos premium com conteúdo completo
 */

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AulaProps,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  ContentAccordion,
  QuizInterativo,
  QuizQuestion,
  AlertBox,
  QuestaoResolvidaStepByStep} from "../shared";
import { 
  LuBrain, 
  LuBookOpen, 
  LuFileText, 
  LuSearch 
} from "react-icons/lu";
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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

export default function AulaRLCP(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_r_l_c_p_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  

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

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      updateCompletedModules([...completedModules, moduleId]);
      const progress = Math.round(((completedModules.size + 1) / MODULE_DEFS.length) * 100);
      props.onUpdateProgress?.(progress);
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[1]}
            title="Princípios Fundamentais do RLCP"
            description="O framework de licitações transparentes e competitivas da Petrobras."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>RLCP (Regulamento de Licitações e Contratos da Petrobras)</strong> é o documento que disciplina como a Petrobras contrata obras, serviços, compras e aluguel.
              Baseia-se na <strong>Lei 13.303/2016</strong> (Lei das Estatais), que exige que empresas públicas sigam procedimentos competitivos, transparentes e éticos. O RLCP não é capricho —
              é obrigação legal que garante que cada real gasto em licitação é destinado ao melhor custo-benefício.</p>
            <p>CESGRANRIO cobra as novidades do RLCP derivado da Lei 13.303/16, destacando a isonomia e a busca pela proposta que ofereça maior retorno econômico.</p>
            <p>O RLCP é aplicável a <strong>Petrobras Holding e suas subsidiárias integrais</strong> (empresas 100% Petrobras). Toda contratação acima de um piso mínimo (variam por
              categoria) deve seguir RLCP: compra de aço para plataformas, contratação de empreiteiros para manutenção, aluguel de escritórios. Exceções existem (emergências, contratos
              já estabelecidos com fornecedores) mas precisam de justificativa documentada e aprovação de gestor autorizado.</p>
            <p>O regulamento interno disciplina as diretrizes de contratação da Petrobras, substituindo a incidência direta da lei federal clássica de licitações.</p>
            <p>Os <strong>cinco princípios fundamentais</strong> do RLCP são: (1) <strong>Eficiência</strong> — melhor resultado com menor custo; (2) <strong>Economicidade</strong> — prudência
              fiscal, evitar desperdício; (3) <strong>Publicidade</strong> — transparência, edital publicado, participação aberta; (4) <strong>Moralidade</strong> — ética, combate a corrupção,
              sem favoritismo; (5) <strong>Igualdade</strong> — todos fornecedores tratados justamente, sem discriminação. Esses princípios estão no cerne de Lei 13.303.</p>
            <p>Como exemplo prático, o RLCP flexibiliza as negociações de preços em certames eletrônicos, permitindo que a comissão pleiteie melhores descontos.</p>
            <p>Historicamente, antes do RLCP, empresas estatais compravam sem critério de mercado — eram "caixas preta" onde gestores escolhiam fornecedores amigos. Lei 13.303 (2016) mudou
              radicalmente: obrigou abertura de licitação pública (salvo exceções), estabeleceu critérios objetivos de julgamento, criou direitos de fornecedores. RLCP é a implementação
              técnica dessa exigência legal na Petrobras.</p>
            <p>Os princípios orientadores compreendem: publicidade, impessoalidade, moralidade, economicidade, celeridade e eficiência operacional.</p>
            <p>Neste módulo, você aprenderá os princípios nucleares, o escopo de aplicação (quem segue, que tipos de contratação), as exceções legais (emergências, contratos de pessoal),
              e como esses princípios aparecem em questões CESGRANRIO. Será o fundamento para todos os módulos subsequentes.</p>
            <p>Fiscais de contrato da Petrobras seguem as regras formais do RLCP para atestar a integridade de medições técnicas efetuadas em campo.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">⚖️ Cinco Princípios do RLCP</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Eficiência:</strong> Melhor resultado; menor custo</li>
                <li>✓ <strong>Economicidade:</strong> Prudência fiscal; sem desperdício</li>
                <li>✓ <strong>Publicidade:</strong> Transparência; edital aberto; participação livre</li>
                <li>✓ <strong>Moralidade:</strong> Ética; combate corrupção; sem favoritismo</li>
                <li>✓ <strong>Igualdade:</strong> Todos fornecedores tratados justamente</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Conceitos e Âmbito de Aplicação"
          />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: A Origem do RLCP",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>O <strong>Regulamento de Licitações e Contratos da Petrobras (RLCP)</strong> é a cartilha intrínseca da estatal, originada obrigatoriamente a partir da edição da rigorosa Lei das Estatais (Lei 13.303/16). Sem ele, voltaríamos ao engessamento público generalista ou ao caos privatista anárquico.</p>
                    <AlertBox tipo="info" titulo="O Marco Civilizatório das Estatais">
                      O RLCP mescla a hiper-agilidade para a Petrobras ser um leão concorrencial contra as petrolíferas globais e o cofre de cristal ético transparente para garantir que não haja vazamentos corruptos dos repasses ao Erário e acionistas.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Âmbito de Aplicação",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Caso real:</strong> Um galpão na Noruega alugado pela Equinor (parceira) usa as leis locais. Mas se a <strong>Petrobras Holanda (Petrobras Netherlands B.V. - PNBV)</strong> (subsidiária integral) for realizar contratações vitais bilionárias pro consórcio, ela também se curva aos princípios do RLCP brasileiro em conformidade transnacional imposta pela Holding no Brasil.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Os Princípios Intocáveis",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Eficiência vs Economicidade:</strong> Costumam confundir os dois. Eficiência é "fazer rápido sem retrabalho travado". Economicidade é "fechar a torneira do desperdício de dinheiro". Se você comprar a sonda mais barata quebradiça (economicidade burra), o poço vaza e gasta fortunas (ineficiência real).</li>
                      <li><strong>Publicidade Transparente:</strong> Ninguém tranca o edital no armário do comprador. Qualquer fornecedor da praça com acesso à web deve ver a licitação nascendo, podendo se capacitar para atacar.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Blindagem de Segredo Industrial",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Onde a Transparência Tem Limite">
                      No princípio da Publicidade, há exceções duras: A Petrobras JAMAIS divulga projetos geológicos estratégicos ou invenções patenteáveis secretas vitais em editais de licitação, inviabilizando o roubo de dados por multinacionais petrolíferas espiãs gringas.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Quais são as principais fases de um procedimento licitatório em RLCP?"
          alternativas={[
            { letra: "A", texto: "Apenas publicação do edital e recebimento de propostas", correta: false },
              { letra: "B", texto: "Edital, publicidade, recebimento de propostas, julgamento, homologação, adjudicação", correta: true },
              { letra: "C", texto: "Conversa informal com fornecedores e escolha direta", correta: false },
              { letra: "D", texto: "Apenas lançamento do edital, sem etapas subsequentes", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Procedimento RLCP: 1) Edital (publicação e prazos), 2) Publicidade (divulgação clara), 3) Recebimento (propostas em data/hora), 4) Julgamento (análise por critério), 5) Homologação (confirmação formal), 6) Adjudicação (contrato)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3}
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
                placeholderColor: "cyan",
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
          sinteseEstrategica={{
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
            titulo="QUIZ: Conceitos Fundamentais RLCP"
            questoes={toQQ(quizM1)}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo2 = () => {
    const variant = mv[1];
    return (
      <TabsContent value="modulo-2" className="space-y-6">

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[2]}
            title="Modalidades de Licitação"
            description="Concorrência, Tomada de Preços, Convite — escolher a modalidade correta é crítico."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>Lei 13.303 e RLCP definem <strong>4 modalidades de licitação</strong>, cada uma apropriada para um cenário diferente: (1) <strong>Concorrência</strong> — maior publicidade,
              qualquer fornecedor, prazos longos, ideal para grandes valores; (2) <strong>Tomada de Preços</strong> — fornecedores pré-qualificados, prazos médios, valor médio;
              (3) <strong>Convite</strong> — fornecedores convidados diretos, prazos curtos, baixo valor; (4) <strong>Dispensa/Inexigibilidade</strong> — exceções (emergência, fornecedor único).</p>
            <p>A banca exige distinguir as modalidades de licitação pública e as regras do RLCP, com destaque para a celeridade do pregão eletrônico.</p>
            <p>A <strong>Concorrência</strong> é a modalidade padrão, mais rigorosa e aberta. Qualquer fornecedor pode participar — Petrobras publica edital em jornal, edital da Petrobras (site),
              e aguarda propostas. Prazo mínimo: 5 dias úteis. Usada para grandes valores (compra de equipamentos de milhões, empreitada de construção). A Concorrência atende melhor ao
              princípio de igualdade (ninguém favorecido) e economicidade (máxima competição = menor preço).</p>
            <p>O regulamento unifica os procedimentos licitatórios em rito comum eletrônico com ampla publicidade eletrônica no portal Petronect.</p>
            <p>A <strong>Tomada de Preços</strong> é "meio termo" — participantes devem estar no cadastro de fornecedores da Petrobras (pré-qualificados em termos de capacidade técnica/financeira).
              Prazo mínimo: 3 dias úteis. Usada para valores médios e contratações com fornecedores já conhecidos. Exemplo: Petrobras precisa de peças de reposição — convida seus fornecedores
              cadastrados a apresentar propostas. Menos formalidade que Concorrência, mas ainda competitiva.</p>
            <p>A adoção do modo de disputa aberto permite lances sucessivos de fornecedores; o modo fechado preserva o sigilo comercial das propostas.</p>
            <p>O <strong>Convite</strong> é "fast-track" para pequenas compras. Petrobras convida 3+ fornecedores cadastrados a enviar propostas. Prazo: 1 dia útil. Exemplo: compra de
              material de escritório, peças pequenas, serviços menores. O Convite é ágil mas menos competitivo (só fornecedores convidados participam). Lei 13.303 permite porque é baixo risco/valor.</p>
            <p>A contratação direta sem licitação exige parecer jurídico consistente ou enquadramento exato em hipóteses de dispensa ou inexigibilidade de lei.</p>
            <p>Neste módulo, você aprenderá quando cada modalidade se aplica (valores-limite por modalidade), procedimentos específicos de cada uma, prazos, e critérios de julgamento.
              Questões CESGRANRIO frequentemente perguntam: "Qual modalidade para compra de R$ 500mil?" ou "Concorrência vs Tomada de Preços: qual diferença?" Dominar isso é essencial.</p>
            <p>A Petrobras utiliza cotações eletrônicas no Petronect para selecionar prestadores de serviços de SMS em refinarias operacionais.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">📋 Quatro Modalidades</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Concorrência:</strong> Aberta a todos; 5 dias; grandes valores</li>
                <li>✓ <strong>Tomada Preços:</strong> Pré-qualificados; 3 dias; médios valores</li>
                <li>✓ <strong>Convite:</strong> 3+ convidados; 1 dia; baixos valores</li>
                <li>✓ <strong>Dispensa:</strong> Emergência ou fornecedor único; exceção</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="Tipos de Licitação"
          />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Modalidades Ágeis",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Ao se desacorrentar da retrógrada e superada Lei 8.666/93 para a nova Lei 13.303 e RLCP, a estatal explodiu a rigidez burra. O foco passou de "rito formal" para "resultado no bolso empresarial rápido e lícito". O edital agora foca em 3 modalidades abertas claras.</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Concorrência vs Convite",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <h4 className="font-bold text-foreground mb-2">📌 Compra de 1.000 km de Tubulação</h4>
                      <p className="text-base text-muted-foreground">Aqui o certame pega fogo globalmente! Modalidade aberta gigantesca para o mundo. Qualquer interessado desce na arena para o duelo. É a <strong>Concorrência</strong>!</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg border border-border mt-4">
                      <h4 className="font-bold text-foreground mb-2">📌 Cadernos para a Reunião da Diretoria</h4>
                      <p className="text-base text-muted-foreground">Seria cômico fazer a Europa inteira precificar cadernos pautados. O pregoeiro da área tira 3 lojistas aprovados da gaveta e manda um Zap/Email urgente: <strong>Convite</strong> relâmpago microdirecionado.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: A Estratégica Tomada de Preço",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Tomada de Preços:</strong> O "Filé Mignon" da segurança no meio do caminho. É mais que o Convite e menos assustadora que a Concorrência infinita e pesada. A sacada da Cesgranrio: Lembre-se, na Tomada, a Petrobras EXIGE fornecedores previamente <strong>cadastrados e com atestado balizado fiscal/técnico</strong> no cofre da estatal. </li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Dispensa vs Inexigibilidade",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Quando Escapar da Licitação">
                      <ul className="list-disc pl-5 mt-2">
                        <li><strong>Dispensa:</strong> (Raridades, pechinchas extremas, caixas de fósforo, emergência vazamento). "Dá pra competir mas não temos tempo pra burocratizar".</li>
                        <li><strong>Inexigibilidade:</strong> A patente do remédio, o artista global x exclusivo, ou a bomba de extração russa insubstituível patenteada. "É IMPOSSÍVEL competir matematicamente".</li>
                      </ul>
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Quais são as principais fases de um procedimento licitatório em RLCP?"
          alternativas={[
            { letra: "A", texto: "Apenas publicação do edital e recebimento de propostas", correta: false },
              { letra: "B", texto: "Edital, publicidade, recebimento de propostas, julgamento, homologação, adjudicação", correta: true },
              { letra: "C", texto: "Conversa informal com fornecedores e escolha direta", correta: false },
              { letra: "D", texto: "Apenas lançamento do edital, sem etapas subsequentes", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Procedimento RLCP: 1) Edital (publicação e prazos), 2) Publicidade (divulgação clara), 3) Recebimento (propostas em data/hora), 4) Julgamento (análise por critério), 5) Homologação (confirmação formal), 6) Adjudicação (contrato)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3}
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
          sinteseEstrategica={{
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
            titulo="QUIZ: Modalidades de Licitação"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo3 = () => {
    const variant = mv[2];
    return (
      <TabsContent value="modulo-3" className="space-y-6">

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[3]}
            title="Procedimento Licitatório: Fases"
            description="Preparação, publicidade, julgamento, adjudicação — roteiro de uma licitação completa."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>Uma licitação completa segue <strong>4 fases bem definidas</strong>: (1) <strong>Preparatória</strong> — definir o que comprar, estimar custos, elaborar Termo de Referência;
              (2) <strong>Publicação/Inscrição</strong> — publicar edital, deixar aberto para inscrição de interessados, fornecer informações; (3) <strong>Julgamento</strong> — abrir propostas,
              analisar conformidade, avaliar técnica e preço; (4) <strong>Adjudicação/Homologação</strong> — declarar vencedor, finalizar contrato, iniciar execução.</p>
            <p>Questões abordam as fases cronológicas do procedimento. Lembre-se: no RLCP a fase de julgamento precede a análise da documentação de habilitação.</p>
            <p>A <strong>Fase Preparatória</strong> é interna à Petrobras. Gestor identifica necessidade ("precisamos renovar equipamento de perfuração"). Prepara especificação técnica detalhada
              (dimensões, funcionalidades, padrões). Estima custos (quanto deveria custar no mercado). Elabora <strong>Termo de Referência</strong> — documento que define exatamente o que
              será licitado, critérios de aceitação, SLAs, prazos. Escolhe a modalidade apropriada (Concorrência se grande valor, Convite se pequeno).</p>
            <p>O rito inicia-se na fase preparatória (especificação técnica), progride para a divulgação, apresentação de propostas, julgamento, habilitação e homologação.</p>
            <p>A <strong>Fase de Publicação</strong> ocorre após aprovação interna. Edital é publicado (jornal, site Petrobras, B3). Fornecedores têm tempo para se inscrever e tirar dúvidas.
              Petrobras realiza reunião "pós-edital" para esclarecer: "O que significaa cláusula 5.2?" ou "Qual é a especificação técnica mínima?" Essa transparência garante que fornecedores
              compreendem exatamente o que é esperado — não há surpresa depois.</p>
            <p>Como demonstração prática, a comissão avalia e classifica as propostas de preços comerciais antes de abrir certidões fiscais de concorrentes.</p>
            <p>A <strong>Fase de Julgamento</strong> é onde decisões importantes acontecem. Propostas recebidas são analisadas em duas dimensões: (1) <strong>Conformidade</strong> — atende aos
              requisitos técnicos do Termo de Referência? (2) <strong>Mérito</strong> — qual melhor preço? Qual melhor técnica? Critério mais comum é "menor preço" (economicidade), mas em
              alguns casos usa-se "técnica + preço" (para projetos complexos onde qualidade técnica importa mais que apenas preço mais baixo).</p>
            <p>A inversão de fases otimiza o tempo administrativo ao exigir análise documental apenas da empresa classificada em primeiro lugar.</p>
            <p>A <strong>Fase de Adjudicação/Homologação</strong> fecha o processo. Vencedor é declarado e comunicado. Há período de "recurso" onde outros fornecedores podem contestar ("achamos
              que o julgamento foi injusto"). Resolvidos recursos, a licitação é "homologada" (aprovada formalmente). Contrato é assinado, adiantamento eventualmente liberado, e execução (entrega,
              serviço) começa. Neste módulo aprenderá essas 4 fases em detalhe com exemplos reais Petrobras.</p>
            <p>Em bases de suprimentos da Petrobras, a inversão de fases no Petronect acelera a aquisição de sobressalentes mecânicos para exploração offshore.</p>
            <div className="bg-teal-500/10 border-l-4 border-teal-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-teal-600 dark:text-teal-400 text-lg mb-2">🔄 Quatro Fases do Procedimento</span>
              <ol className="text-lg space-y-1 text-foreground list-decimal list-inside">
                <li><strong>Preparatória:</strong> Termo de Referência, especificação, estimativa, modalidade</li>
                <li><strong>Publicação:</strong> Edital publicado, inscrição aberta, esclarecimentos</li>
                <li><strong>Julgamento:</strong> Conformidade, técnica, preço — quem vence?</li>
                <li><strong>Adjudicação:</strong> Vencedor declarado, recursos resolvidos, contrato assinado</li>
              </ol>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={variant}
            title="As Fases da Licitação"
          />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: O Rito Processual",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>O processo de licitação no RLCP é um encadeamento sagrado inquebrável de etapas lógicas ordenadas para impedir a manipulação. Se você julgar preço sem antes checar habilitação jurídica em certas modalidades clássicas, vicia-se o rito. O rito garante previsibilidade jurídica ao fornecedor e lisura máxima ao agente púbico e à Petrobras.</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Cronograma Sagrado",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base text-muted-foreground mb-3"><strong>A Trilha Fática:</strong></p>
                      <ol className="list-decimal pl-5 space-y-1 text-base">
                        <li><strong>01/03 (Fase Preparatória Oculta):</strong> A matriz demanda a obra e desenha orçamento sigiloso.</li>
                        <li><strong>05/03 (Divulgação):</strong> O edital é escancarado no site e na B3.</li>
                        <li><strong>20/03 (Abertura):</strong> Encerra o prazo de inscrição; propostas reveladas ao pranto ou riso.</li>
                        <li><strong>21/03 (Julgamento/Habilitação):</strong> O vencedor das cifras é auditado se não deve no fisco.</li>
                        <li><strong>30/03 (Adjudicação):</strong> Martelo batido sem margem para choro livre dos rivais (já recorreram). Contrato assinado!</li>
                      </ol>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Inversão de Fases na 13.303",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="info" titulo="O Julgamento Vem Antes da Habilitação">
                      Na <strong>velha 8.666</strong>, todas as empresas entregavam caminhões de papelada pro comitê ficar atolado lendo antes mesmo de saber os preços. A <strong>Lei 13.303 / RLCP</strong> foi cirúrgica: inverte as fases! Abre tudo de preço primeiro. Avalia só os documentos do #1 colocado! Se os documentos dele tiverem errados, passa pro #2. Agilidade insana e monstra em licitar.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Desinversão Controlada",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Será que a estatal é OBRIGADA a fazer invertido sempre? <strong>NÃO!</strong> Em licitações de obra técnica bizarra (como um super porto modular atômico), o edital PODE exigir que a Habilitação e Técnica sejam lidas primeiro (desinverter fases com autorização explícita). Isso extirpa prefeituras aventureiras de arriscar a segurança do leilão dando menores preços antes sem nem conseguir entregar.</p>
                  </div>
                ),
              },
            ]}
          />
        













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Quais são as principais fases de um procedimento licitatório em RLCP?"
          alternativas={[
            { letra: "A", texto: "Apenas publicação do edital e recebimento de propostas", correta: false },
              { letra: "B", texto: "Edital, publicidade, recebimento de propostas, julgamento, homologação, adjudicação", correta: true },
              { letra: "C", texto: "Conversa informal com fornecedores e escolha direta", correta: false },
              { letra: "D", texto: "Apenas lançamento do edital, sem etapas subsequentes", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Procedimento RLCP: 1) Edital (publicação e prazos), 2) Publicidade (divulgação clara), 3) Recebimento (propostas em data/hora), 4) Julgamento (análise por critério), 5) Homologação (confirmação formal), 6) Adjudicação (contrato)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

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
          sinteseEstrategica={{
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
            titulo="QUIZ: Procedimento Licitatório"
            questoes={toQQ(quizM3)}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo4 = () => {
    const variant = mv[3];
    return (
      <TabsContent value="modulo-4" className="space-y-12">
        <div>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[4]}
              title="Termo de Referência e Edital"
              description="Os documentos-mestres que definem o que será licitado e como."
            />

            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Termo de Referência (TR)</strong> e o <strong>Edital</strong> são os "pilares documentais" de uma licitação. TR é o documento técnico (O QUÊ será contratado?);
                Edital é o documento legal/administrativo (COMO será o processo?). Sem ambos bem elaborados, licitação fracassa: fornecedores não entendem, propostas são inconformes, processos
                são contestados em justiça.</p>
            <p>CESGRANRIO exige a distinção entre Edital (regras do certame) e Termo de Referência (especificações técnicas completas dos bens).</p>
            <p>O <strong>Termo de Referência (TR)</strong> descreve em detalhe técnico a necessidade: especificação de produto (dimensões, funcionalidades, padrões), ou descrição de serviço
                (escopo, SLAs, tempo de execução, critérios de aceitação). TR deve ser tão claro que qualquer fornecedor do mercado consegue entender exatamente o que será avaliado. Exemplo:
                "Compra de 100 toneladas de aço ASTM A36 com tolerância ±2mm nas dimensões". Não pode ser vago: "Compra de aço de boa qualidade".</p>
            <p>O edital deve conter critérios objetivos de julgamento e habilitação, vedando especificações direcionadas que limitem a ampla concorrência.</p>
            <p>O <strong>Edital</strong> é o "contrato de processo" — define as regras do jogo: qual modalidade (Concorrência, Convite), prazos de inscrição e entrega, forma de julgamento
                (menor preço, técnica+preço, melhor técnica), critérios de desempate, cronograma. Edital também especifica documentação exigida (registros, certificações, atestados de clientes
                anteriores), responsabilidades das partes, penalidades por descumprimento.</p>
            <p>O Termo de Referência (TR) detalha os prazos, locais de entrega e as características de qualidade exigidas para o fornecimento do material.</p>
            <p><strong>Diferença crítica:</strong> TR responde "O quê?" (o bem/serviço); Edital responde "Como?" (o processo). Um fornecedor que entende bem o TR sabe se consegue fornecer.
                Um fornecedor que entende bem o Edital sabe como participar e em que condições será julgado. Ambos precisam estar alinhados — se Edital exige TR detalhado mas TR é vago,
                fornecedor fica confuso.</p>
            <p>A impugnação de edital é direito de licitantes e cidadãos que identificarem irregularidades ou vedações ilegais de concorrência.</p>
            <p>Lei 13.303 e RLCP exigem que TR e Edital sejam publicados com antecedência (mínimo 3-5 dias) para que fornecedores preparem propostas adequadas. Neste módulo, você aprenderá
                a estrutura exata de TR (especificações técnicas, critérios de aceitação, SLAs), de Edital (modalidade, prazos, julgamento), e como redigir ambos de forma clara e defensável.</p>
            <p>Técnicos de suprimentos da Petrobras auxiliam na elaboração técnica de termos de referência para contratação de insumos para bacias.</p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">📄 Termo de Referência vs Edital</span>
                <ul className="text-lg space-y-1 text-foreground">
                  <li>✓ <strong>TR:</strong> Técnico; O QUÊ será contratado; Especificações, SLAs, critérios aceitação</li>
                  <li>✓ <strong>Edital:</strong> Legal; COMO será o processo; Modalidade, prazos, julgamento, documentação</li>
                  <li>✓ <strong>Ambos:</strong> Devem ser claros, sem ambiguidade, publicados antecipadamente</li>
                </ul>
              </div>
            
          
          
          </div>
          </section>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a comissão responsável pelo julgamento em uma Licitação RLCP?"
          alternativas={[
            { letra: "A", texto: "Apenas o Diretor da empresa", correta: false },
              { letra: "B", texto: "Comissão de Licitação (membros designados, multidisciplinar)", correta: true },
              { letra: "C", texto: "Qualquer funcionário de Petrobras", correta: false },
              { letra: "D", texto: "Uma pessoa apenas para garantir sigilo", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Atas registram decisões."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Comissão de Licitação: grupo multidisciplinar (engenharia, financeiro, legal, etc.) designado para julgamento." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Garante: competência técnica, imparcialidade, transparência." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={5}
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
                  placeholderColor: "bg-cyan-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "TR vs Edital",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                    <h6 className="font-bold text-blue-600 mb-1">Termo de Referência (TR)</h6>
                    <p className="text-lg text-muted-foreground">O "O QUE" será comprado. Especificações técnicas, quantidades e prazos.</p>
                  </div>
                  <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <h6 className="font-bold text-cyan-600 mb-1">Edital</h6>
                    <p className="text-lg text-muted-foreground">As "REGRAS DO JOGO". Como será a licitação, prazos e julgamento.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Documentos da Licitação",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Termo de Referência e Edital"
            questoes={toQQ(quizM4)}
            onComplete={(score) => handleModuleComplete('modulo-4', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo5 = () => {
    const variant = mv[4];
    return (
      <TabsContent value="modulo-5" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="Julgamento de Propostas"
            description="Como a Petrobras decide quem vence: do menor preço à melhor técnica."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>julgamento</strong> é a fase onde a Petrobras analisa as propostas comerciais e técnicas. O critério principal, no RLCP, é a busca pela <strong>proposta mais vantajosa</strong>, que nem sempre é apenas o menor valor nominal, mas o melhor custo-benefício (ciclo de vida do produto).</p>
            <p>A prova aborda os critérios de julgamento: menor preço, melhor técnica, melhor combinação técnica-preço e maior retorno econômico.</p>
            <p>Os critérios comuns são: <strong>Menor Preço</strong> (padronizados), <strong>Melhor Técnica</strong> (complexos), ou <strong>Técnica e Preço</strong> (equilíbrio). Após o julgamento, ocorre a verificação de <strong>exequibilidade</strong>: se o preço for absurdamente baixo, o licitante deve provar que consegue entregar, para evitar abandono de contrato.</p>
            <p>O julgamento comercial rejeita propostas inexequíveis com preços irrisórios ou propostas com valores manifestamente superiores aos orçados.</p>
            <p>O julgamento comercial rejeita propostas inexequíveis com preços irrisórios ou manifestamente superiores ao valor de referência orçado pela equipe técnica da comissão contratante.</p>
            <p>A adjudicação transfere o objeto do certame al licitante vencedor homologado, gerando a expectativa de celebração formal do contrato.</p>
            <p>A adjudicação do objeto ao licitante vencedor homologado gera a expectativa legítima de celebração do contrato, criando para a estatal a obrigação de formalizar o instrumento contratual.</p>
            <p>Os critérios de desempate priorizam empresas locais de médio e pequeno porte ou prestadores que comprovem investimentos em tecnologia nacional.</p>
            <p>Os critérios de desempate no RLCP priorizam empresas de médio e pequeno porte cadastradas regionalmente ou prestadores que comprovem investimentos certificados em tecnologia nacional.</p>
            <p>Nas grandes licitações de refino da Petrobras, a análise comercial no Petronect aponta a proposta vencedora conforme critérios pré-edital.</p>
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-2">⚖️ Critérios de Julgamento</span>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Menor Preço:</strong> Quando o objeto é comum e bem definido</li>
                <li>✓ <strong>Maior Desconto:</strong> Variável do menor preço (comum em serviços)</li>
                <li>✓ <strong>Melhor Técnica:</strong> Foco total na qualidade (projetos inovadores)</li>
                <li>✓ <strong>Técnica e Preço:</strong> Ponderação entre custo e expertise</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="5.1"
            variant={variant}
            title="Conformidade e Exequibilidade"
            description="Garantindo que a proposta seja realista e atenda ao edital."
          />
          <ContentAccordion mode="stacked" slides={[
              {
                title: "Conformidade Técnica",
                conteudo: "Verificação se a proposta atende a todos os requisitos do Termo de Referência. Propostas fora da especificação são eliminadas.",
                icone: "🔍",
              },
              {
                title: "Preço Inequível",
                conteudo: "Preços manifestamente baixos que colocam em risco a execução. O licitante é chamado a justificar seus custos.",
                icone: "📉",
              },
            ]}
          />

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a comissão responsável pelo julgamento em uma Licitação RLCP?"
          alternativas={[
            { letra: "A", texto: "Apenas o Diretor da empresa", correta: false },
              { letra: "B", texto: "Comissão de Licitação (membros designados, multidisciplinar)", correta: true },
              { letra: "C", texto: "Qualquer funcionário de Petrobras", correta: false },
              { letra: "D", texto: "Uma pessoa apenas para garantir sigilo", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Atas registram decisões."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Comissão de Licitação: grupo multidisciplinar (engenharia, financeiro, legal, etc.) designado para julgamento." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Garante: competência técnica, imparcialidade, transparência." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={5}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Fase de Julgamento",
              duration: "08:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Julgamento",
              materia: "RLCP",
              images: [
                {
                  title: "Análise de Preços",
                  type: "Planilha",
                  placeholderColor: "bg-blue-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Princípio Fundamental",
              content: (
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                  <p className="text-lg font-medium">
                    Vantajosidade = Menor Custo Total (Aquisição + Operação + Manutenção).
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Critérios de Escolha",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Julgamento de Propostas"
            questoes={toQQ(quizM5)}
            onComplete={(score) => handleModuleComplete('modulo-5', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo6 = () => {
    const variant = mv[5];
    return (
      <TabsContent value="modulo-6" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="Recursos e Impugnações"
            description="Como contestar o edital ou o resultado da licitação."
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O direito de <strong>impugnar</strong> e <strong>recorrer</strong> garante a transparência. A impugnação ocorre ANTES da abertura, contra o edital. O recurso ocorre DEPOIS, contra o resultado.</p>
            <p>Questões sobre recursos cobram os prazos unificados de manifestação e a necessidade de comprovar prejuízo jurídico real nas impugnações.</p>
            <p>Há direitos claros: ser ouvido, acessar documentos e obter resposta motivada. A Petrobras deve responder em prazos rígidos, garantindo que o processo não seja maculado por erros administrativos.</p>
            <p>O rito de recurso no RLCP adota fase única recursal pós-julgamento de habilitados, concentrando todos os questionamentos em peça única administrativa.</p>
            <p>O recurso administrativo no RLCP deve ser interposto no prazo previsto no edital, com motivação objetiva e comprovação do interesse jurídico do recorrente.</p>
            <p>A interposição de recurso suspende o andamento licitatório apenas se houver manifesto risco de dano irreparável ao erário municipal ou estatal.</p>
            <p>A decisão proferida em grau de recurso vincula as partes e integra o processo administrativo, podendo ser objeto de controle externo pelo TCU ou pela CGU.</p>
            <p>A comissão avalia os argumentos recursais e pode reconsiderar sua decisão prévia ou encaminhar a peça para julgamento de alçada superior.</p>
            <p>A preclusão processual no certame garante a celeridade das contratações ao impedir a reabertura de fases já superadas sem motivo legal fundamentado.</p>
            <p>A equipe jurídica da Petrobras analisa impugnações de fornecedores derrotados, garantindo a lisura técnica de contratos celebrados.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">⚖️ Impugnação vs Recurso</span>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Impugnação:</strong> Contra as REGRAS do edital (Prazo: até 2 dias úteis antes)</li>
                <li>✓ <strong>Recurso:</strong> Contra o RESULTADO (Prazo: 5 dias úteis após publicação)</li>
                <li>✓ <strong>Formal:</strong> Por escrito, fundamentado em lei ou no RLCP</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="6.1"
            variant={variant}
            title="Direito de Defesa"
            description="Mecanismos para garantir a legalidade."
          />
          <ContentAccordion mode="stacked" slides={[
              {
                title: "Prazos",
                conteudo: "Essenciais para não perder o direito. Impugnação é prévia, recurso é a posteriori.",
                icone: "⏱️",
              },
              {
                title: "Motivação",
                conteudo: "Toda decisão da Petrobras em recursos deve ser motivada e pública.",
                icone: "✍️",
              },
            ]}
          />

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a diferença entre 'Impugnação de Edital' e 'Recurso de Resultado'?"
          alternativas={[
            { letra: "A", texto: "São a mesma coisa", correta: false },
              { letra: "B", texto: "Impugnação: desafio ao Edital antes do julgamento. Recurso: desafio ao resultado após julgamento", correta: true },
              { letra: "C", texto: "Impugnação é mais rápida que recurso", correta: false },
              { letra: "D", texto: "Recurso não é permitido em RLCP", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Impugnação: questionamento do edital ANTES da licitação (" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
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
              tituloAula: "Controle",
              materia: "RLCP",
              images: [
                {
                  title: "Recursos em Análise",
                  type: "Documento",
                  placeholderColor: "bg-cyan-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Antes vs Depois",
              content: (
                 <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                   <p className="text-lg">Impugna o Edital (Regras). Recorre do Resultado (Ações).</p>
                 </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Direito de Defesa",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Recursos e Impugnações"
            questoes={toQQ(quizM6)}
            onComplete={(score) => handleModuleComplete('modulo-6', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo7 = () => {
    const variant = mv[6];
    return (
      <TabsContent value="modulo-7" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="Contratos e Execução"
            description="Da assinatura ao encerramento: obrigações e fiscalização."
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>contrato</strong> é o selo final da licitação. Ele define os prazos, formas de pagamento, garantias e punições. A Petrobras exige fiscalização rigorosa em cada entrega.</p>
            <p>A banca cobra o regime jurídico dos contratos celebrados no RLCP, as regras de alteração unilateral e reajustes anuais de preços.</p>
            <p>Os contratos celebrados sob o RLCP disciplinam com clareza as obrigações das partes, os indicadores de desempenho, os critérios de medição e os mecanismos de reajuste.</p>
            <p>Os contratos administrativos das estatais seguem regras de direito privado mitigadas por cláusulas de privilégio público de fiscalização.</p>
            <p>A garantia contratual — caução, seguro-garantia ou fiança bancária — protege a estatal de eventuais inadimplementos do contratado durante a execução do objeto.</p>
            <p>O contratado é obrigado a aceitar acréscimos ou supressões qualitativas no objeto do contrato nos tetos e percentuais definidos em lei.</p>
            <p>As sanções administrativas previstas no RLCP — advertência, multa, suspensão — são aplicadas proporcionalmente à gravidade do descumprimento contratual comprovado.</p>
            <p>A rescisão amigável ou judicial do contrato ocorre em casos de inadimplemento prolongado das obrigações ou por razões de força maior comprovadas.</p>
            <p>O controle de riscos licitatórios monitora variações abruptas de escopo e preços de mercado, atestando a lisura ética e a moralidade administrativa de todos os processos de concorrência.</p>
            <p>Fiscais da Petrobras acompanham medições físicas mensais de prestação de serviços logísticos de forma impessoal nas refinarias.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">📝 Pilares da Execução</span>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Fiscalização:</strong> Obrigatória por lei para garantir qualidade</li>
                <li>✓ <strong>Sanções:</strong> Multas e suspensões por descumprimento</li>
                <li>✓ <strong>Prazos:</strong> Cronogramas rígidos de entrega e pagamento</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="7.1"
            variant={variant}
            title="Gestão de Contratos"
            description="Como a Petrobras garante o que foi comprado."
          />
          <ContentAccordion mode="stacked" slides={[
              {
                title: "Fiscal do Contrato",
                conteudo: "Designado formalmente pela Petrobras para validar entregas e conformidade técnica.",
                icone: "👷",
              },
              {
                title: "Sanções Contratuais",
                conteudo: "Advertência, multa (até 20%), suspensão temporária e impedimento de licitar.",
                icone: "⚠️",
              },
            ]}
          />

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é o passo imediatamente após adjudicação em RLCP?"
          alternativas={[
            { letra: "A", texto: "Fornecedor começa a trabalhar imediatamente", correta: false },
              { letra: "B", texto: "Celebração de contrato entre Petrobras e fornecedor adjudicado", correta: true },
              { letra: "C", texto: "Publicação em jornal, sem contrato", correta: false },
              { letra: "D", texto: "Pagamento antecipado", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Após adjudicação: Petrobras convida fornecedor a assinar contrato."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Contrato detalha: obrigações, cronograma, forma de pagamento, penalidades, garantias e rescisão." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={7}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Gestão Contratual",
              duration: "11:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Vida do Contrato",
              materia: "RLCP",
              images: [
                {
                  title: "Fiscalização Ativa",
                  type: "Campo",
                  placeholderColor: "bg-cyan-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Regra do Fiscal",
              content: (
                 <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                   <p className="text-lg">Não aceita? Não paga. O fiscal é o guardião do TR.</p>
                 </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Fiscalização e Sanção",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Contratos e Execução"
            questoes={toQQ(quizM7)}
            onComplete={(score) => handleModuleComplete('modulo-7', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo8 = () => {
    const variant = mv[7];
    return (
      <TabsContent value="modulo-8" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="Inabilitação e Desclassificação"
            description="Diferenças entre problemas no licitante e problemas na proposta."
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Inabilitação:</strong> Problema no Licitante (CPF/CNPJ, certidões negativas, capacidade técnica/financeira). É a exclusão do sujeito.</p>
            <p>Provas abordam as hipóteses de inabilitação de concorrentes por descumprimento de certidões fiscais ou insolvência financeira atestada.</p>
            <p><strong>Desclassificação:</strong> Problema na Proposta (Preço excessivo, especificações erradas no TR). É a exclusão do objeto ofertado.</p>
            <p>A habilitação contábil analisa índices de liquidez corrente gerais das empresas; a habilitação jurídica atesta a regularidade cadastral.</p>
            <p>A habilitação jurídica comprova a regularidade constitutiva da empresa; a habilitação técnica atesta a experiência em objeto idêntico ao licitado com acervo comprovado.</p>
            <p>Licitantes em recuperação judicial podem participar de certames estatais se comprovarem viabilidade financeira de executar a obra.</p>
            <p>A habilitação econômico-financeira analisa os índices de liquidez corrente e o patrimônio líquido mínimo para evitar a contratação de empresas insolventes.</p>
            <p>A inabilitação decorre de falsidade documental declarada ou inaptidão técnica comprovada por diligência técnica de fiscalização.</p>
            <p>Documentos vencidos no momento da fase de habilitação geram inabilitação imediata do licitante, vedada a substituição posterior durante o certame ativo.</p>
            <p>Na Petrobras, a verificação documental no Petronect assegura que apenas empresas solventes e idôneas celebrem termos de fornecimento.</p>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">🚫 Causas Comuns</span>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Falha Técnica:</strong> Não atender ao TR (Elimina a Proposta)</li>
                <li>✓ <strong>Falha Fiscal:</strong> Certidão vencida (Inabilita o Licitante)</li>
                <li>✓ <strong>Ilegalidade:</strong> Fraude ou conluio detectado</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="8.1"
            variant={variant}
            title="Critérios de Exclusão"
            description="Padrões objetivos de rejeição."
          />
          <ContentAccordion mode="stacked" slides={[
              {
                title: "Desempate",
                conteudo: "Quando preços são iguais, usa-se critérios de técnica, experiência ou, por fim, sorteio.",
                icone: "⚖️",
              },
              {
                title: "Saneamento",
                conteudo: "A Petrobras pode permitir a correção de erros meramente formais que não alteram a substância da proposta.",
                icone: "🩹",
              },
            ]}
          />

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a principal razão para inabilitar um licitante em RLCP?"
          alternativas={[
            { letra: "A", texto: "Porque Petrobras não gostou do fornecedor", correta: false },
              { letra: "B", texto: "Falta de documentação exigida, capacidade técnica insuficiente ou problemas legais/financeiros", correta: true },
              { letra: "C", texto: "Porque fornecedor é pequeno demais", correta: false },
              { letra: "D", texto: "Inabilitação não existe em RLCP", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Sem habilitação, proposta não é nem analisada."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Inabilitação: licitante não atende requisitos de habilitação (documentação, registro, solvência)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Comissão verifica certificados, inscrição, regularidade fiscal." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={8}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Exclusões no RLCP",
              duration: "07:15",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Inabilitação e Desclassificação",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Causas de Exclusão",
              materia: "RLCP",
              images: [
                {
                  title: "Rejeição de Proposta",
                  type: "Status",
                  placeholderColor: "bg-red-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Inabilita vs Desclassifica",
              content: (
                 <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                   <p className="text-lg">Inabilita a Empresa (Who). Desclassifica a Oferta (What).</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Inabilitação e Desempate"
            questoes={toQQ(quizM8)}
            onComplete={(score) => handleModuleComplete('modulo-8', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo9 = () => {
    const variant = mv[8];
    return (
      <TabsContent value="modulo-9" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="RLCP na Prática Petrobras"
            description="Casos reais, estrutura organizacional e compliance."
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Petrobras realiza centenas de licitações por ano usando o RLCP. Toda licitação passa por Suprimentos e Compliance para evitar fraudes e garantir eficiência.</p>
            <p>Questões sobre o RLCP prático na Petrobras exigem familiaridade com o portal Petronect e o controle externo exercido pelo TCU.</p>
            <p>O controle externo das contratações da Petrobras é exercido pelo TCU, que pode determinar a anulação de contratos eivados de vícios de legalidade ou de superfaturamento.</p>
            <p>O portal Petronect garante a publicidade integral das concorrências e a celeridade operacional da cadeia logística nacional da companhia.</p>
            <p>Os portais de transparência publicam os contratos celebrados, os valores pagos e os resultados de auditorias, garantindo o acesso público à rastreabilidade das compras.</p>
            <p>Diligências de conformidade técnica são efetuadas por equipes colegiadas para certificar a regularidade fabril de tubulações submarinas.</p>
            <p>O compliance contratual na Petrobras exige que fornecedores declarem ausência de conflito de interesses e aderência ao programa de integridade da companhia.</p>
            <p>O controle de riscos licitatórios monitora variações abruptas de escopo e atesta a lisura ética de todos os processos de concorrência.</p>
            <p>O monitoramento de riscos de execução contratual identifica desvios de prazo e escopo de forma antecipada, permitindo a adoção de planos de ação corretivos.</p>
            <p>Auditorias anuais preventivas do TCU avaliam a aderência de compras e contratos da Petrobras às regras do Regulamento de Licitações.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">🏢 Organização Interna</span>
              <ul className="text-lg space-y-1">
                <li>✓ <strong>Unidade Solicitante:</strong> Define a necessidade inicial</li>
                <li>✓ <strong>Suprimentos:</strong> Conduz a licitação tecnicamente</li>
                <li>✓ <strong>Jurídico:</strong> Valida o edital e o contrato final</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="9.1"
            variant={variant}
            title="Aplicações Reais"
            description="Como a empresa opera o dia a dia."
          />
                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Como Petrobras aplica RLCP em suas licitações internacionais?"
          alternativas={[
            { letra: "A", texto: "RLCP não se aplica fora do Brasil", correta: false },
              { letra: "B", texto: "RLCP se aplica com ajustes para legislação local; Petrobras publica editais em português e inglês", correta: true },
              { letra: "C", texto: "Apenas Lei 6.404/76 é usada no exterior", correta: false },
              { letra: "D", texto: "Petrobras não faz compras internacionais", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Critérios de julgamento respeitam legislação local quando necessário."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "RLCP em Exterior: Petrobras aplica princípios RLCP (transparência, igualdade, publicidade) conforme Lei 13.303." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Editais são bilíngues (português/inglês) para atrair fornecedores internacionais." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={9}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Vida Corporativa e RLCP",
              duration: "08:20",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Rotina de Suprimentos",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Prática",
              materia: "RLCP",
              images: [
                {
                  title: "Estrutura Petrobras",
                  type: "Org",
                  placeholderColor: "bg-emerald-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Compliance Always",
              content: (
                 <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                   <p className="text-lg">Na Petrobras, o RLCP é a Bíblia do Suprimento. Transparência acima de tudo.</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: RLCP na Prática Petrobras"
            questoes={toQQ(quizM9)}
            onComplete={(score) => handleModuleComplete('modulo-9', score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo10 = () => {
    const variant = mv[9];
    return (
      <TabsContent value="modulo-10" className="space-y-12">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            variant={variant}
            title="Simulado Geral RLCP"
            description="Desafio final integrando todos os conceitos do curso."
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Agora é a hora da verdade. O Simulado Geral traz questões no padrão CESGRANRIO que misturam princípios, modalidades e execução contratual. Prepare-se para pensar como um Técnico de Suprimento da Petrobras.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="10.1"
            variant={variant}
            title="Grand Finale"
            description="Avaliação de domínio do Regulamento."
          />
                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant={variant}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um licitante questiona o Edital alegando critério de desempate prejudicial. Qual é o procedimento correto?"
          alternativas={[
            { letra: "A", texto: "Ignorar questionamento e prosseguir licitação", correta: false },
              { letra: "B", texto: "Licitante pode impugnar edital (até 2 dias úteis antes do recebimento). Petrobras analisa e, se válida, corrige e republica edital", correta: true },
              { letra: "C", texto: "Desqualificar licitante que impugna", correta: false },
              { letra: "D", texto: "Criar novo edital sem informar ao licitante", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Se licitante identifica vício (ex:"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Impugnação de Edital: direito garantido por RLCP." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={10}
            variant={variant}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Simulado Final",
              duration: "15:00",
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Vitória no RLCP",
              artista: "Petrobras Quest",
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Simulado",
              materia: "RLCP",
              images: [
                {
                  title: "Certificação",
                  type: "Meta",
                  placeholderColor: "bg-amber-500/10",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Você está pronto!",
              content: (
                 <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                   <p className="text-lg">Domine o RLCP e conquiste sua vaga.</p>
                 </div>
              ),
            }}
          />

          <QuizInterativo
            titulo="QUIZ: Simulado Geral"
            questoes={toQQ(quizM10)}
            onComplete={(score) => handleModuleComplete('modulo-10', score)}
          />
        </div>
      </TabsContent>
    );
  };

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={(index) => isModuleUnlocked(`modulo-${index + 1}`)}
      titulo="RLCP - Regulamento de Licitações Petrobras"
      descricao="Procedimentos transparentes de compras, contratações e gestão de contratos"
      duracao="2h 30m"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
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
