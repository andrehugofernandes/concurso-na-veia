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
  AlertBox,
} from "../shared";
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

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
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

  const renderModulo1 = () => {
    const variant = getModuleVariant(1);

    return (
      <TabsContent value="modulo-1" className="space-y-6">

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            variant={mv[1]}
            title="Princípios Fundamentais do RLCP"
            description="O framework de licitações transparentes e competitivas da Petrobras."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              O <strong>RLCP (Regulamento de Licitações e Contratos da Petrobras)</strong> é o documento que disciplina como a Petrobras contrata obras, serviços, compras e aluguel.
              Baseia-se na <strong>Lei 13.303/2016</strong> (Lei das Estatais), que exige que empresas públicas sigam procedimentos competitivos, transparentes e éticos. O RLCP não é capricho —
              é obrigação legal que garante que cada real gasto em licitação é destinado ao melhor custo-benefício.
            </p>
            <p>
              O RLCP é aplicável a <strong>Petrobras Holding e suas subsidiárias integrais</strong> (empresas 100% Petrobras). Toda contratação acima de um piso mínimo (variam por
              categoria) deve seguir RLCP: compra de aço para plataformas, contratação de empreiteiros para manutenção, aluguel de escritórios. Exceções existem (emergências, contratos
              já estabelecidos com fornecedores) mas precisam de justificativa documentada e aprovação de gestor autorizado.
            </p>
            <p>
              Os <strong>cinco princípios fundamentais</strong> do RLCP são: (1) <strong>Eficiência</strong> — melhor resultado com menor custo; (2) <strong>Economicidade</strong> — prudência
              fiscal, evitar desperdício; (3) <strong>Publicidade</strong> — transparência, edital publicado, participação aberta; (4) <strong>Moralidade</strong> — ética, combate a corrupção,
              sem favoritismo; (5) <strong>Igualdade</strong> — todos fornecedores tratados justamente, sem discriminação. Esses princípios estão no cerne de Lei 13.303.
            </p>
            <p>
              Historicamente, antes do RLCP, empresas estatais compravam sem critério de mercado — eram "caixas preta" onde gestores escolhiam fornecedores amigos. Lei 13.303 (2016) mudou
              radicalmente: obrigou abertura de licitação pública (salvo exceções), estabeleceu critérios objetivos de julgamento, criou direitos de fornecedores. RLCP é a implementação
              técnica dessa exigência legal na Petrobras.
            </p>
            <p>
              Neste módulo, você aprenderá os princípios nucleares, o escopo de aplicação (quem segue, que tipos de contratação), as exceções legais (emergências, contratos de pessoal),
              e como esses princípios aparecem em questões CESGRANRIO. Será o fundamento para todos os módulos subsequentes.
            </p>

            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">⚖️ Cinco Princípios do RLCP</p>
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
          <ContentAccordion
            slides={[
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
            index={1}
            variant={mv[2]}
            title="Modalidades de Licitação"
            description="Concorrência, Tomada de Preços, Convite — escolher a modalidade correta é crítico."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              Lei 13.303 e RLCP definem <strong>4 modalidades de licitação</strong>, cada uma apropriada para um cenário diferente: (1) <strong>Concorrência</strong> — maior publicidade,
              qualquer fornecedor, prazos longos, ideal para grandes valores; (2) <strong>Tomada de Preços</strong> — fornecedores pré-qualificados, prazos médios, valor médio;
              (3) <strong>Convite</strong> — fornecedores convidados diretos, prazos curtos, baixo valor; (4) <strong>Dispensa/Inexigibilidade</strong> — exceções (emergência, fornecedor único).
            </p>
            <p>
              A <strong>Concorrência</strong> é a modalidade padrão, mais rigorosa e aberta. Qualquer fornecedor pode participar — Petrobras publica edital em jornal, edital da Petrobras (site),
              e aguarda propostas. Prazo mínimo: 5 dias úteis. Usada para grandes valores (compra de equipamentos de milhões, empreitada de construção). A Concorrência atende melhor ao
              princípio de igualdade (ninguém favorecido) e economicidade (máxima competição = menor preço).
            </p>
            <p>
              A <strong>Tomada de Preços</strong> é "meio termo" — participantes devem estar no cadastro de fornecedores da Petrobras (pré-qualificados em termos de capacidade técnica/financeira).
              Prazo mínimo: 3 dias úteis. Usada para valores médios e contratações com fornecedores já conhecidos. Exemplo: Petrobras precisa de peças de reposição — convida seus fornecedores
              cadastrados a apresentar propostas. Menos formalidade que Concorrência, mas ainda competitiva.
            </p>
            <p>
              O <strong>Convite</strong> é "fast-track" para pequenas compras. Petrobras convida 3+ fornecedores cadastrados a enviar propostas. Prazo: 1 dia útil. Exemplo: compra de
              material de escritório, peças pequenas, serviços menores. O Convite é ágil mas menos competitivo (só fornecedores convidados participam). Lei 13.303 permite porque é baixo risco/valor.
            </p>
            <p>
              Neste módulo, você aprenderá quando cada modalidade se aplica (valores-limite por modalidade), procedimentos específicos de cada uma, prazos, e critérios de julgamento.
              Questões CESGRANRIO frequentemente perguntam: "Qual modalidade para compra de R$ 500mil?" ou "Concorrência vs Tomada de Preços: qual diferença?" Dominar isso é essencial.
            </p>

            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">📋 Quatro Modalidades</p>
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
          <ContentAccordion
            slides={[
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
            index={1}
            variant={mv[3]}
            title="Procedimento Licitatório: Fases"
            description="Preparação, publicidade, julgamento, adjudicação — roteiro de uma licitação completa."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              Uma licitação completa segue <strong>4 fases bem definidas</strong>: (1) <strong>Preparatória</strong> — definir o que comprar, estimar custos, elaborar Termo de Referência;
              (2) <strong>Publicação/Inscrição</strong> — publicar edital, deixar aberto para inscrição de interessados, fornecer informações; (3) <strong>Julgamento</strong> — abrir propostas,
              analisar conformidade, avaliar técnica e preço; (4) <strong>Adjudicação/Homologação</strong> — declarar vencedor, finalizar contrato, iniciar execução.
            </p>
            <p>
              A <strong>Fase Preparatória</strong> é interna à Petrobras. Gestor identifica necessidade ("precisamos renovar equipamento de perfuração"). Prepara especificação técnica detalhada
              (dimensões, funcionalidades, padrões). Estima custos (quanto deveria custar no mercado). Elabora <strong>Termo de Referência</strong> — documento que define exatamente o que
              será licitado, critérios de aceitação, SLAs, prazos. Escolhe a modalidade apropriada (Concorrência se grande valor, Convite se pequeno).
            </p>
            <p>
              A <strong>Fase de Publicação</strong> ocorre após aprovação interna. Edital é publicado (jornal, site Petrobras, B3). Fornecedores têm tempo para se inscrever e tirar dúvidas.
              Petrobras realiza reunião "pós-edital" para esclarecer: "O que significaa cláusula 5.2?" ou "Qual é a especificação técnica mínima?" Essa transparência garante que fornecedores
              compreendem exatamente o que é esperado — não há surpresa depois.
            </p>
            <p>
              A <strong>Fase de Julgamento</strong> é onde decisões importantes acontecem. Propostas recebidas são analisadas em duas dimensões: (1) <strong>Conformidade</strong> — atende aos
              requisitos técnicos do Termo de Referência? (2) <strong>Mérito</strong> — qual melhor preço? Qual melhor técnica? Critério mais comum é "menor preço" (economicidade), mas em
              alguns casos usa-se "técnica + preço" (para projetos complexos onde qualidade técnica importa mais que apenas preço mais baixo).
            </p>
            <p>
              A <strong>Fase de Adjudicação/Homologação</strong> fecha o processo. Vencedor é declarado e comunicado. Há período de "recurso" onde outros fornecedores podem contestar ("achamos
              que o julgamento foi injusto"). Resolvidos recursos, a licitação é "homologada" (aprovada formalmente). Contrato é assinado, adiantamento eventualmente liberado, e execução (entrega,
              serviço) começa. Neste módulo aprenderá essas 4 fases em detalhe com exemplos reais Petrobras.
            </p>

            <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-violet-600 dark:text-violet-400 text-lg mb-2">🔄 Quatro Fases do Procedimento</p>
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
          <ContentAccordion
            slides={[
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
      <>
        <TabsContent value="modulo-4" className="space-y-12">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              variant={mv[4]}
              title="Termo de Referência e Edital"
              description="Os documentos-mestres que definem o que será licitado e como."
            />

            <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
              <p>
                O <strong>Termo de Referência (TR)</strong> e o <strong>Edital</strong> são os "pilares documentais" de uma licitação. TR é o documento técnico (O QUÊ será contratado?);
                Edital é o documento legal/administrativo (COMO será o processo?). Sem ambos bem elaborados, licitação fracassa: fornecedores não entendem, propostas são inconformes, processos
                são contestados em justiça.
              </p>
              <p>
                O <strong>Termo de Referência (TR)</strong> descreve em detalhe técnico a necessidade: especificação de produto (dimensões, funcionalidades, padrões), ou descrição de serviço
                (escopo, SLAs, tempo de execução, critérios de aceitação). TR deve ser tão claro que qualquer fornecedor do mercado consegue entender exatamente o que será avaliado. Exemplo:
                "Compra de 100 toneladas de aço ASTM A36 com tolerância ±2mm nas dimensões". Não pode ser vago: "Compra de aço de boa qualidade".
              </p>
              <p>
                O <strong>Edital</strong> é o "contrato de processo" — define as regras do jogo: qual modalidade (Concorrência, Convite), prazos de inscrição e entrega, forma de julgamento
                (menor preço, técnica+preço, melhor técnica), critérios de desempate, cronograma. Edital também especifica documentação exigida (registros, certificações, atestados de clientes
                anteriores), responsabilidades das partes, penalidades por descumprimento.
              </p>
              <p>
                <strong>Diferença crítica:</strong> TR responde "O quê?" (o bem/serviço); Edital responde "Como?" (o processo). Um fornecedor que entende bem o TR sabe se consegue fornecer.
                Um fornecedor que entende bem o Edital sabe como participar e em que condições será julgado. Ambos precisam estar alinhados — se Edital exige TR detalhado mas TR é vago,
                fornecedor fica confuso.
              </p>
              <p>
                Lei 13.303 e RLCP exigem que TR e Edital sejam publicados com antecedência (mínimo 3-5 dias) para que fornecedores preparem propostas adequadas. Neste módulo, você aprenderá
                a estrutura exata de TR (especificações técnicas, critérios de aceitação, SLAs), de Edital (modalidade, prazos, julgamento), e como redigir ambos de forma clara e defensável.
              </p>

              <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">📄 Termo de Referência vs Edital</p>
                <ul className="text-lg space-y-1 text-foreground">
                  <li>✓ <strong>TR:</strong> Técnico; O QUÊ será contratado; Especificações, SLAs, critérios aceitação</li>
                  <li>✓ <strong>Edital:</strong> Legal; COMO será o processo; Modalidade, prazos, julgamento, documentação</li>
                  <li>✓ <strong>Ambos:</strong> Devem ser claros, sem ambiguidade, publicados antecipadamente</li>
                </ul>
              </div>
            </div>
          </section>

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
                    <p className="text-lg text-muted-foreground">O "O QUE" será comprado. Especificações técnicas, quantidades e prazos.</p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                    <h6 className="font-bold text-indigo-600 mb-1">Edital</h6>
                    <p className="text-lg text-muted-foreground">As "REGRAS DO JOGO". Como será a licitação, prazos e julgamento.</p>
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
              title="Especificações e Regras no Detalhe"
              description="A importância de documentos bem estruturados para a contratação perfeita."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Fundamentos",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>O <strong>Termo de Referência (TR)</strong> é o DNA técnico imutável. Já o <strong>Edital</strong> é a regra do ringue burocrático e mercantil. "O TR diz se comprei tinta epóxi dupla. O Edital diz que se a empresa atrasar ela toma multa no faturamento." A união incindível dos dois consolida o objeto e a execução das vontades da Diretoria da Petrobras, que assine abaixo o edito de validade.</p>
                      <AlertBox tipo="info" titulo="O Preço Oculto (Orçamento Sigiloso)">
                        Na Lei 13.303 e RLCP, a estatal PODE e DEVE manter o preço estimado <strong>sigiloso</strong> no edital (embora strictamente registrado nos cofres da CGU e TCU). Isso força a competitividade máxima ("Quem dá menos no escuro?"). Exibir o preço faria tudo formar cartel beirando o teto do preço.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: TR e Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h4 className="font-bold text-foreground mb-2">📄 TR Deficiente (Gatilhos de Processos Judiciais)</h4>
                        <p className="text-base text-muted-foreground"><strong>Erro letal real:</strong> Um mantenedor escreve "Compra tubulação de aço, tamanho grande, qualidade boa". O que acontece? Cartel aproveita, entra com recurso, entrega aço chinês fino de construção civil (baratíssimo) no lugar de Duto de Vazão de 400 libras! TR falho mata a planta inteira antes mesmo da perfuração.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Critérios Universais de Julgamento",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Menor Preço:</strong> Comprou caneta, resma de papel de escritório ou luva de EPI comum de vitrine? Critério absoluto: menor cifrão ganha sem debate.</li>
                        <li><strong>Técnica e Preço:</strong> Comprou Projeto Inédito de Plataforma SS? O que pesa é o intelecto da engenheira que assina e o método físico para flutuação das vigas; aqui o preço é só metade (ou menos) da equação do ranking ponderado do Edital!</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Habilitação e Balanços",
                  icone: <LuSearch />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Microempresas (ME / EPP)">
                        Mesmo numa megalicitação rigorosa, o edital pode prever desempate fático ou isenções simplificadas trans-fases para as microempresas do estatuto Cidadão em conformidade subsidiária no RLCP. Uma ME com imposto levemente pendente ganha dias para regularizar "antes do fim", o oposto do expurgo instantâneo que as gigantes do cartel levariam!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6 mt-12">
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
    const variant = mv[4];
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

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              variant={mv[5]}
              title="Julgamento e Adjudicação"
              description="Como as propostas são avaliadas e o vencedor é declarado."
            />

            <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
              <p>
                Após o prazo de inscrição fechar, Petrobras abre as propostas recebidas e inicia <strong>julgamento</strong>. Julgamento ocorre em duas etapas: (1) <strong>Habilitação</strong> —
                o fornecedor atende aos requisitos legais? (CNPJ válido, sem débitos, certificações exigidas?); (2) <strong>Julgamento de Mérito</strong> — qual proposta melhor atende ao Termo de Referência
                e ao critério de julgamento escolhido (menor preço, técnica+preço, melhor técnica)?
              </p>
              <p>
                A <strong>Habilitação</strong> é "gatekeeping" — elimina fornecedores que não têm capacidade legal/técnica de cumprir. Verifica: CNPJ ativo (Receita Federal), regularidade fiscal
                (sem débitos INSS/Trabalhista), certificações técnicas exigidas (ISO, normas específicas), patrimônio mínimo (se exigido), referências de clientes anteriores. Se fornecedor não passa
                nessa etapa, proposta é rejeitada (MESMO que ofereça melhor preço). Não adianta preço ótimo se fornecedor é insolvente.
              </p>
              <p>
                O <strong>Julgamento de Mérito</strong> compara fornecedores habilitados usando critério pré-definido no Edital. Critérios comuns: (1) <strong>Menor Preço</strong> — quem oferece menor
                valor total; (2) <strong>Técnica + Preço</strong> — pontuação técnica (0-100) + preço ponderados (ex.: técnica 60%, preço 40%); (3) <strong>Melhor Técnica</strong> — apenas qualidade técnica,
                depois negociação de preço com vencedor. Critério deve estar claro no Edital ANTES do processo.
              </p>
              <p>
                Após julgamento, há período de <strong>"recursos"</strong> — fornecedores que acharam injusto podem contestar. Petrobras analisa recursos, valida se julgamento foi legal, e decide.
                Resolvidos recursos, resultado é <strong>homologado</strong> (aprovado formalmente pelo gestor autorizado). Vencedor é declarado e convidado a assinar contrato e eventualmente prestar
                garantia (caução, seguro).
              </p>
              <p>
                Neste módulo, você aprenderá critérios de habilitação específicos (RLCP exige qual documentação?), forma de julgamento (cálculo de pontuação técnica), como contestar resultado (direito do
                fornecedor), e como Petrobras homologa licitação. Essencial para entender final do processo licitatório.
              </p>

              <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">🏆 Julgamento em Duas Etapas</p>
                <ul className="text-lg space-y-1 text-foreground">
                  <li>✓ <strong>Habilitação:</strong> CNPJ, fiscal, certificações, patrimônio — quem pode participar?</li>
                  <li>✓ <strong>Mérito:</strong> Menor Preço vs Técnica+Preço vs Melhor Técnica</li>
                  <li>✓ <strong>Recursos:</strong> Fornecedores podem contestar resultado</li>
                  <li>✓ <strong>Homologação:</strong> Gestor aprova formalmente; contrato assinado</li>
                </ul>
              </div>
            </div>
          </section>

          <ModuleSectionHeader
            index="5.2"
            variant={variant}
            title="Critérios de Julgamento e Homologação"
            description="Aplicação dos critérios de seleção e formalização do resultado da licitação."
          />














<ModuleConsolidation
          index={4}
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
                  <p className="text-lg text-muted-foreground">O critério mais comum para bens e serviços comuns.</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                  <div className="text-2xl mb-2">📐</div>
                  <h5 className="font-bold text-blue-700 dark:text-blue-400">Melhor Técnica</h5>
                  <p className="text-lg text-muted-foreground">Foco na qualidade e expertise técnica do fornecedor.</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <h5 className="font-bold text-purple-700 dark:text-purple-400">Técnica e Preço</h5>
                  <p className="text-lg text-muted-foreground">Equilíbrio entre custo e qualidade técnica.</p>
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
            titulo="QUIZ: Julgamento e Adjudicação"
            questoes={toQQ(quizM5)}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
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
            index={1}
            variant={mv[6]}
            title="Recursos e Impugnações"
            description="Direitos do fornecedor de contestar decisões da licitação."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              A Lei 13.303 e RLCP garantem que fornecedores tenham <strong>direito de contestar decisões</strong> de licitação se acharem injustas. Existem dois mecanismos: (1) <strong>Impugnação</strong> —
              questiona REGRAS do edital (é legal? segue RLCP?); (2) <strong>Recurso</strong> — questiona RESULTADO (julgamento foi justo? habilitação foi correta?). Ambos têm prazos (expirados, perdem direito)
              e procedimentos específicos.
            </p>
            <p>
              A <strong>Impugnação do Edital</strong> ocorre ANTES da licitação acontecer — fornecedor lê edital publicado e identifica cláusula que acha ilegal ou discriminatória. Exemplo: "Edital exige certificação
              ISO que só 1 fornecedor tem — é discriminatório!" Impugnação deve ser feita em prazo curto (geralmente 2-3 dias úteis antes da abertura). Petrobras responde por escrito, justificando por que mantém
              cláusula (ou a remove se realmente for ilegal). Decisão é formal e vinculante.
            </p>
            <p>
              O <strong>Recurso Administrativo</strong> ocorre DEPOIS do resultado ser divulgado — fornecedor que perdeu ou foi habilitado indevidamente pode contestar. Recurso questiona: "Por quê fulano ganhou se
              oferecia preço mais alto?" ou "Por quê fui inabilitado? Meu CNPJ está regularizado!" Deve ser feito em prazo específico (geralmente 5 dias úteis após resultado). Petrobras analisa, considera argumentos,
              valida se julgamento foi legal, e decide mantém ou altera resultado.
            </p>
            <p>
              Há <strong>direitos do recorrente</strong>: ser ouvido, ter acesso à documentação, obter resposta motivada. Há também <strong>obrigações</strong>: impugnar/recorrer em prazo, por escrito, com fundamentos
              legais específicos (não é "acho injusto"; é "artigo X do RLCP foi violado porque..."). Fornecedor que não impugna/recorre no prazo perde direito — é como processo judicial, há prazos rígidos.
            </p>
            <p>
              Neste módulo, você aprenderá quando impugnar (ANTES) vs recorrer (DEPOIS), prazos exatos, como formalizar contestação, quais argumentos são válidos, como Petrobras responde. Essencial para fornecedores
              e para gestores Petrobras que recebem contestações.
            </p>

            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">⚖️ Impugnação vs Recurso</p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Impugnação:</strong> ANTES da licitação; questiona REGRAS do edital; prazo curto</li>
                <li>✓ <strong>Recurso:</strong> DEPOIS do resultado; questiona RESULTADO; prazo 5 dias</li>
                <li>✓ <strong>Formal:</strong> Por escrito, com fundamentos legais, dentro de prazos rígidos</li>
                <li>✓ <strong>Resposta:</strong> Petrobras responde motivadamente em prazo definido</li>
              </ul>
            </div>
          </div>
        </section>

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
          index={3}
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
                  <p className="text-lg font-bold">Impugnação: DO EDITAL (Antes)</p>
                  <p className="text-lg">Prazo: Até 2 dias úteis antes das propostas.</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-lg font-bold">Recurso: DO RESULTADO (Depois)</p>
                  <p className="text-lg">Prazo: 2 dias úteis após a publicação.</p>
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
            titulo="QUIZ: Recursos e Impugnações"
            questoes={toQQ(quizM6)}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
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
            index={1}
            variant={mv[7]}
            title="Contratos e Execução"
            description="De assinatura até cumprimento: obrigações, sanções, encerramento."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              Após vencedor ser declarado, Petrobras formaliza <strong>contrato</strong> — acordo legal que define direitos e deveres de ambas as partes. Contrato é baseado no Edital e Termo de Referência,
              mas detalha ainda mais: cronograma de entrega, forma de pagamento (parcelas? frete incluído?), garantias exigidas (caução em dinheiro? seguro?), penalidades por atraso, como fiscalizar qualidade.
            </p>
            <p>
              O <strong>cronograma</strong> é crítico — define quando fornecedor entrega (data/prazo) e quando Petrobras paga. Exemplo: "Fornecedor entrega 100 toneladas em 2 parcelas (50 em 30 dias, 50 em 60 dias).
              Petrobras paga 30 dias após recebimento e aceitação." Se fornecedor atrasa entrega, incide multa (ex.: 0,5% do valor por dia de atraso, até máximo 10%). Se atraso é muito grave ({'>'}30 dias), Petrobras pode
              rescindir contrato e cobrar fornecedor por perdas (comprar de outro a preço mais alto e cobrar diferença).
            </p>
            <p>
              A <strong>execução contratual</strong> envolve fiscalização: Petrobras designa "fiscal do contrato" (gerente responsável) que verifica se entrega atende ao Termo de Referência. Verifica dimensões,
              qualidade, prazos. Se aprovado, Petrobras aceita formalmente. Se rejeitado, fornecedor deve corrigir (substituir peças defeituosas, entregar novamente). Fiscalização é OBRIGATÓRIA por lei — garante que
              recurso público é bem gasto.
            </p>
            <p>
              <strong>Sanções por descumprimento:</strong> Lei 13.303 permite que Petrobras aplique multas (até 20% do valor), advertência, suspensão (6 meses a 5 anos sem licitar com Petrobras), ou impedimento permanente
              (se fraude). Essas sanções são formalizadas em "Declaração de Idoneidade" — fornecedor que é impedido fica marcado e não consegue licitar com nenhuma empresa pública.
            </p>
            <p>
              Neste módulo, você aprenderá estrutura de contrato Petrobras (cláusulas obrigatórias, ónus de cada parte), cronogramas (como negocia prazos), fiscalização (como Petrobras valida conformidade),
              sanções (quando aplicar, como calcular), e encerramento (como contrato é liquidado e arquivo). Essencial para quem executa contrato.
            </p>

            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">📝 Execução Contratual: Pilares</p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Contrato:</strong> Acordo formal baseado Edital + TR, com cronograma e formas pagamento</li>
                <li>✓ <strong>Fiscalização:</strong> Gestor verifica conformidade com TR; aprova ou rejeita entrega</li>
                <li>✓ <strong>Sanções:</strong> Multa, advertência, suspensão, impedimento por descumprimento</li>
                <li>✓ <strong>Encerramento:</strong> Contrato liquidado, documentação arquivada</li>
              </ul>
            </div>
          </div>
        </section>

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
          index={3}
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
              <ul className="text-left text-lg space-y-2 list-decimal list-inside">
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
            titulo="QUIZ: Contratos e Execução"
            questoes={toQQ(quizM7)}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
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
            index={1}
            variant={mv[8]}
            title="Inabilitação, Eliminação e Desempate"
            description="Critérios que excluem fornecedores e como desempatar propostas iguais."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              Durante o processo licitatório, fornecedores podem ser <strong>inabilitados</strong> (excluídos por não cumprir requisitos) ou propostas podem ser <strong>eliminadas</strong> (rejeitadas por não conformidade técnica).
              Diferença: inabilitação é questão legal/administrativa (CNPJ inválido, débitos fiscais); eliminação é questão técnica (proposta não atende Termo de Referência). Ambos levam à rejeição.
            </p>
            <p>
              <strong>Inabilitação</strong> ocorre quando fornecedor não passa na fase de habilitação. Motivos: (1) CNPJ inativo ou com débitos na Receita Federal; (2) débitos trabalhistas (não paga salários);
              (3) falta certificações exigidas (ISO, normas técnicas); (4) patrimônio mínimo abaixo do requerido; (5) condenação criminal (reputação abalada). Inabilitado = automaticamente rejeitado, não importa
              se oferecia melhor preço.
            </p>
            <p>
              <strong>Eliminação</strong> ocorre quando proposta não atende tecnicamente ao Termo de Referência. Exemplos: "Edital exige aço ASTM A36; fornecedor ofertou A350 (diferente)" = elimina. "Edital exige
              entrega em 30 dias; fornecedor disse 90 dias" = elimina. Eliminação protege Petrobras de receber algo que não serve — é questão de conformidade técnica.
            </p>
            <p>
              <strong>Desempate</strong> ocorre quando dois fornecedores oferecem EXATAMENTE o mesmo preço (raro, mas acontece). Edital deve prever critério de desempate: (1) melhor técnica (se criterio foi preço);
              (2) maior experiência (número de projetos similares); (3) maior proximidade de localização (reduz frete); (4) sorteio (último recurso). Critério DEVE estar claro no Edital antes do processo — não pode definir
              depois quando alguém empatou.
            </p>
            <p>
              Neste módulo, você aprenderá causas específicas de inabilitação no RLCP, diferença entre inabilitação/eliminação, critérios de desempate segundo Lei 13.303, e como contestar decisão de inabilitação/eliminação
              (via recurso). Essencial para fornecedores que precisam entender por quê foram rejeitados e para gestores que precisam justificar rejeição.
            </p>

            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">❌ Inabilitação vs Eliminação vs Desempate</p>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Inabilitação:</strong> Fornecedor não qualificado (legal/fiscal); CNPJ, débitos, certificações</li>
                <li>✓ <strong>Eliminação:</strong> Proposta não conforme (técnico); não atende TR, prazos, especificações</li>
                <li>✓ <strong>Desempate:</strong> Dois fornecedores com mesmo preço; usar critério prédefinido no Edital</li>
              </ul>
            </div>
          </div>
        </section>

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
          index={3}
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
                  <p className="text-lg text-muted-foreground">Problema com o LICITANTE (Documentos, Capacidade).</p>
                </div>
                <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <h5 className="font-bold text-orange-700 dark:text-orange-400">Desclassificação</h5>
                  <p className="text-lg text-muted-foreground">Problema com a PROPOSTA (Preço, Técnica).</p>
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
            titulo="QUIZ: Inabilitação e Desempate"
            questoes={toQQ(quizM8)}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>
    );
  };

  const renderModulo9 = () => {
    const variant = mv[8];
    return (
      <TabsContent value="modulo-9" className="space-y-12">


        <div className="space-y-6">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              variant={mv[9]}
              title="RLCP na Prática Petrobras"
              description="Casos reais, estrutura organizacional, papéis e responsabilidades."
            />

            <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
              <p>
                A Petrobras executa <strong>centenas de licitações por ano</strong> — desde pequenas compras de material de escritório até grandes contratos de engenharia (bilhões). Toda licitação segue RLCP.
                <strong> Estrutura organizacional</strong> envolve: (1) Unidade de negócio (Ex.: E&P Norte) define necessidade; (2) Área de Suprimentos elabora Termo de Referência; (3) Comissão de Licitação
                (designada formalmente) conduz processo; (4) Conselho de Administração aprova grandes contratos (acima de certo valor); (5) Auditoria verifica conformidade com RLCP.
              </p>
              <p>
                <strong>Papéis e responsabilidades:</strong> Gestor (da unidade de negócio) define o quê precisa. Especialista em Suprimentos escreve Termo de Referência técnico. Técnico de Suprimento
                prepara Edital (regras legais). Comissão de Licitação administra inscrição, abertura de propostas, julgamento. Fiscal do contrato (após assinatura) acompanha execução. Cada papel é crítico — erro
                de um invalida licitação.
              </p>
              <p>
                <strong>Compliance e Transparência:</strong> Petrobras criou sistema SPRC (Sistema de Pesquisa de Registro de Compras) — base de dados pública com todos os contratos, fornecedores, valores.
                Objetivo: transparência, combate a corrupção. Qualquer servidor Petrobras que violar RLCP (favorecer fornecedor, desviar procedimento) é responsabilizado administrativamente e penalmente.
                "Connaisseur" de compliance: conhecer RLCP é proteção pessoal — você evita ser cúmplice de fraude.
              </p>
              <p>
                <strong>Exemplos Petrobras:</strong> (1) Compra de aço para plataformas de produção — Concorrência aberta, 3 meses de processo; (2) Contratação de serviço de limpeza para escritório — Convite ágil,
                1 semana; (3) Aluguel de espaço em FPSO (navio) — Tomada de Preços, fornecedores pré-qualificados; (4) Emergência de reparo de vazamento — Dispensa de licitação justificada. Cada caso segue
                RLCP mas adapta procedimento à urgência.
              </p>
              <p>
                Neste módulo, você aprenderá como Petrobras organiza licitações, papéis de cada área, documentos gerados (Edital, Termo de Referência, Ata de Julgamento, Contrato), cronogramas reais,
                e lições aprendidas (erros comuns, como evitar). Essencial para trabalhar em Suprimentos na Petrobras.
              </p>

              <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-violet-600 dark:text-violet-400 text-lg mb-2">🏢 Papéis na Licitação Petrobras</p>
                <ul className="text-lg space-y-1 text-foreground">
                  <li>✓ <strong>Gestor:</strong> Define necessidade; autoriza processo</li>
                  <li>✓ <strong>Especialista Suprimentos:</strong> Escreve Termo de Referência técnico</li>
                  <li>✓ <strong>Técnico Suprimento:</strong> Prepara Edital (regras); administra processo</li>
                  <li>✓ <strong>Comissão Licitação:</strong> Julgamento e adjudicação</li>
                  <li>✓ <strong>Fiscal Contrato:</strong> Acompanha execução; fiscaliza qualidade</li>
                </ul>
              </div>
            </div>
          </section>

          <ModuleSectionHeader
            index="9.1"
            variant={variant}
            title="Aplicações Práticas"
            description="Exemplos reais de como a Petrobras aplica o RLCP."
          />













<ModuleConsolidation
          index={3}
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
              <p className="text-lg text-muted-foreground">
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
            titulo="QUIZ: RLCP na Prática Petrobras"
            questoes={toQQ(quizM9)}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
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
            index={1}
            variant={mv[10]}
            title="Simulado Mestre RLCP"
            description="Teste integrado: M1-M9 consolidados em questões CESGRANRIO autênticas."
          />

          <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
            <p>
              Você completou 9 módulos: princípios, modalidades, procedimento, edital/TR, julgamento, recursos, contratos, inabilitação, e prática Petrobras. Agora <strong>consolida tudo</strong> em um
              <strong> Simulado Mestre</strong> que espelha questões CESGRANRIO reais. Este simulado testa INTEGRAÇÃO — questões combinam múltiplos módulos.
            </p>
            <p>
              Uma questão típica CESGRANRIO começa em procedimento (M3), toca modalidade (M2), evoluir para critério de julgamento (M5), e termina em execução contratual (M7). Você precisa pensar
              holistically — não em compartimentos. Exemplo: "Em uma Concorrência, dois fornecedores empataram no preço. Como Petrobras desempata?" Resposta envolve M2 (Concorrência), M5 (critério desempate),
              M9 (prática Petrobras).
            </p>
            <p>
              <strong>Mínimo 75% (6 de 8 questões)</strong> indica domínio adequado de RLCP. Abaixo disso, revise módulos com maior dificuldade (feedbacks indicam quais). Acima de 90%? Você está pronto para
              combinar RLCP + Lei 13.303 (aula anterior) e para estudar outros cargos técnicos da Petrobras.
            </p>
            <p>
              <strong>Dicas para o Simulado:</strong> (1) Leia questão 2 vezes — primeira contexto, segunda para sublinhar pergunta; (2) Identifique qual módulo é NÚCLEO (procedimento? julgamento? contrato?);
              (3) Procure no conhecimento daquele módulo; (4) Valide em Lei 13.303 e RLCP (não intuição); (5) Se dúvida, descarte alternativas que violam princípios (transparência, igualdade, economicidade).
            </p>
            <p>
              Após simulado, você terá completado Suprimento-Administração MVP: Lei 13.303 (governança), RLCP (licitações), e logo AulaAdministrativoTributario (contabilidade/tributos). Essa tríade cobre
              89% do conhecimento exigido para Técnico de Suprimento. Parabéns pelo progresso!
            </p>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">👑 Simulado Mestre: 5-Step Strategy</p>
              <ol className="text-lg space-y-1 text-foreground list-decimal list-inside">
                <li><strong>Leia 2x:</strong> Contexto na primeira; Pergunta na segunda</li>
                <li><strong>Identifique módulo-núcleo:</strong> Qual conceito (M1-M9) é central?</li>
                <li><strong>Resolva em RLCP:</strong> Procure em Lei/RLCP (não adivinhe)</li>
                <li><strong>Valide em Petrobras:</strong> A resposta faz sentido na empresa?</li>
                <li><strong>Confira princípios:</strong> Transparência? Igualdade? Economicidade?</li>
              </ol>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader
            index="10.1"
            variant={variant}
            title="Simulado Mestre"
            description="Desafie-se com o conteúdo completo de Administração e RLCP."
          />














<ModuleConsolidation
          index={3}
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
            content: <p className="text-lg">Domine o RLCP e conquiste sua vaga.</p>,
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Vitória no RLCP",
            artista: "Petrobras Quest",
          }}
        />

                  <QuizInterativo
            titulo="QUIZ: Simulado Mestre"
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
