"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  AulaProps,
  ModuleSectionHeader,
  AulaTemplate,
  getRandomQuestions,
  LessonTabs,
  ModuleSummaryCarouselNew,
  VideoModal,
  MusicPlayerCard,
  ModuleConsolidation,
  TextAnalysisLab,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrophy,
  LuTriangleAlert,
  LuShieldAlert,
  LuSearch,
  LuLink,
  LuEye,
  LuCpu,
  LuCirclePlay as LuPlayCircle,
  LuMusic,
  LuBrain,
  LuDna,
  LuCheck,
  LuHammer,
  LuLayers,
  LuNewspaper,
  LuFileCheck,
} from "react-icons/lu";

import { getModuleVariant } from "@/lib/moduleColors";

// Data
import {
  QUIZ_M1_POOL,
  QUIZ_M2_POOL,
  QUIZ_M3_POOL,
  QUIZ_M4_POOL,
  QUIZ_M5_POOL,
  QUIZ_M6_POOL,
  QUIZ_M7_POOL,
  QUIZ_M8_POOL,
  QUIZ_M9_POOL,
  QUIZ_M10_POOL,
  QUIZ_FINAL_POOL,
} from "./data/interpretacao-texto-quizzes";

export default function AulaInterpretacaoTexto({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
  const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "A Diferença Letal" },
    { id: "modulo-2", label: "Módulo 2", titulo: "O Tópico Frasal" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Coesão e Argumentação" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Tipologia Textual" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Coesão Referencial" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Pistas e Entrelinhas" },
    { id: "modulo-7", label: "Módulo 7", titulo: "As Ameaças Triplas" },
    { id: "modulo-8", label: "Módulo 8", titulo: "A Lógica CESGRANRIO" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Checklist Tático" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Arena de Elite" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  const [quizM1, setQuizM1] = useState(QUIZ_M1_POOL);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_POOL);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_POOL);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_POOL);
  const [quizM5, setQuizM5] = useState(QUIZ_M5_POOL);
  const [quizM6, setQuizM6] = useState(QUIZ_M6_POOL);
  const [quizM7, setQuizM7] = useState(QUIZ_M7_POOL);
  const [quizM8, setQuizM8] = useState(QUIZ_M8_POOL);
  const [quizM9, setQuizM9] = useState(QUIZ_M9_POOL);
  const [quizM10, setQuizM10] = useState(QUIZ_M10_POOL);
  const [quizFinal, setQuizFinal] = useState(QUIZ_FINAL_POOL);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 6));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 6));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 6));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 6));
    setQuizM5(getRandomQuestions(QUIZ_M5_POOL, 6));
    setQuizM6(getRandomQuestions(QUIZ_M6_POOL, 6));
    setQuizM7(getRandomQuestions(QUIZ_M7_POOL, 6));
    setQuizM8(getRandomQuestions(QUIZ_M8_POOL, 6));
    setQuizM9(getRandomQuestions(QUIZ_M9_POOL, 6));
    setQuizM10(getRandomQuestions(QUIZ_M10_POOL, 6));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 10));
  }, [isCompleted]);

  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading, MODULE_DEFS.length]);

  const handleModuleComplete = (moduleId: string, score: number = 100) => {
    if (score >= 70) {
      const newSet = new Set(completedModules);
      newSet.add(moduleId);
      setCompletedModules(newSet);

      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      if (onUpdateProgress) onUpdateProgress(percent);

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[index + 1].id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      } else {
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return true; // Liberado para estudo contínuo
  };

  if (loading) return null;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ─── MÓDULO 1: A DIFERENÇA LETAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="A Diferença Letal"
          descricao="O Dossiê Premium de Compreensão vs. Interpretação. A fronteira exata entre o que o texto afirma e o que a banca induz."
          variant={mv[1]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="A Fronteira do Sentido: Compreensão vs. Interpretação"
            description="O checklist mental obrigatório para blindar sua pontuação contra os venenos das alternativas 'quase' certas."
            variant={mv[1]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              No teatro de operações da CESGRANRIO, a leitura não é um ato de
              lazer, mas um exercício de <strong>extração técnica</strong>. O
              edital da Petrobras demanda que você diferencie, com precisão
              cirúrgica, o que é um dado <em>explícito</em> (Compreensão) do que
              é uma conclusão <em>autorizada</em> (Interpretação). Essa
              distinção é a linha divisória entre o aprovado e o candidato que
              "acha" que entendeu.
            </p>
            <p>
              A <strong>Compreensão</strong> foca no que está 'esparramado'
              visualmente nas linhas. É a decodificação imediata: "Segundo o
              autor...", "O texto afirma que...", "Conforme o fragmento...". Se
              você precisar concluir algo que não está escrito com todas as
              letras, você já não está mais em solo de compreensão literal. É
              aqui que os erros de <em>Redução</em> e <em>Extrapolação</em>{" "}
              começam a ser montados como armadilhas térmicas.
            </p>
            <p>
              Já a <strong>Interpretação</strong> exige o diálogo com as
              entrelinhas (o implícito). É o nível das deduções lógicas que têm
              lastro textual. Comandos como "Depreende-se do texto...",
              "Infere-se que...", ou "A intenção do autor é..." convocam sua
              capacidade de síntese e de conectar pontos que o autor deixou como
              pistas, mas não como declarações diretas.
            </p>
            <p>
              Para o perfil Petrobras, os textos costumam ser informativos,
              técnicos ou opinativos-institucionais. O maior risco reside em
              injetar seu próprio conhecimento de mundo (sua vivência em
              refinarias ou sua opinião sobre energia) no texto. O que importa
              não é o que você sabe, mas o que o{" "}
              <strong>examinador escreveu</strong>. Chamamos isso de manter o
              olhar dentro do Tribunal Textual.
            </p>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🛡️ Regra de Ouro C.E.D.E.
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>C</strong>onstatar: Verifique se a palavra existe no
                  texto (Compreensão).
                </li>
                <li>
                  <strong>E</strong>vitar Excesso: Não conclua o que o texto não
                  autoriza (Extrapolação).
                </li>
                <li>
                  <strong>D</strong>eduzir com Lastro: Busque a conexão lógica
                  entre dois parágrafos (Interpretação).
                </li>
                <li>
                  <strong>E</strong>xcluir Opinião: Se sua experiência pessoal
                  diz "A" mas o texto diz "B", marque "B".
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Natureza do Processo"
            description="Para a CESGRANRIO, o maior erro do candidato é 'viajar' para além dos limites do texto. Vamos blindar sua leitura agora."
            variant={mv[1]}
          />

          <ContentAccordion
            mode="stacked"
            titulo="Aprofundamento: O Microscópio de Bechara"
            icone={<LuSearch />}
            corIndicador="bg-amber-500"
            defaultOpen={false}
            slides={[
              {
                titulo: "A Unidade Sociocomunicativa (Bechara)",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      Para Evanildo Bechara, o texto não é um amontoado casual
                      de frases, mas sim uma{" "}
                      <strong>unidade sociocomunicativa</strong> elaborada com
                      um propósito muito bem delimitado. Isso significa que a
                      escolha de cada vocábulo, conjunção ou pontuação obedece a
                      uma intenção do autor perante seu leitor.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      A banca CESGRANRIO explora esse princípio exigindo do
                      candidato a capacidade de enxergar além da palavra
                      isolada. Não se analisa um advérbio ou pronome fora de seu
                      ecossistema. É preciso apreender o valor
                      semântico-discursivo global: por que o texto foi escrito?
                      Qual a tese central?
                    </p>
                    <div className="p-5 bg-muted/40 rounded-xl border-l-4 border-amber-500 italic mt-6">
                      <p className="text-sm md:text-base text-foreground font-medium">
                        "Não analisamos frases soltas; analisamos a função
                        pragmática que aquela estrutura gramatical exerce na
                        sustentação do argumento global do autor."
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "O Jogo da Referenciação e Dêixis",
                icone: "🔗",
                conteudo: (
                  <div className="space-y-5">
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                      Dominar a referenciação é a chave mestra da Interpretação
                      de Elite. Os pronomes e expressões dêiticas são os
                      "grampos" que seguram o tecido do texto. Quando o autor
                      cita um elemento e depois o retoma com "isso", "aquele" ou
                      "o qual", ele cria uma teia coesiva que a banca testará
                      impiedosamente.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <span className="font-bold text-blue-600 dark:text-blue-400 block mb-2 uppercase tracking-wider text-sm">
                          Anáfora (Resgate)
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          O elemento anafórico olha para o{" "}
                          <strong>passado</strong> do texto. Ele retoma uma
                          palavra ou ideia já apresentada para evitar repetição
                          massante e manter a fluidez lógica.
                          <br />
                          <br />
                          <em className="text-foreground">
                            Ex: "A segurança é inegociável na indústria.{" "}
                            <strong>Ela</strong> previne tragédias
                            irreversíveis."
                          </em>
                          <br />
                          <span className="text-xs opacity-70">
                            (Neste caso, 'Ela' ancora-se sintaticamente em
                            'segurança').
                          </span>
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-2 uppercase tracking-wider text-sm">
                          Catáfora (Antecipação)
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          O elemento catafórico atua como um holofote que
                          ilumina o <strong>futuro</strong> do texto. Ele
                          anuncia uma informação que o autor ainda vai entregar,
                          gerando expectativa discursiva.
                          <br />
                          <br />
                          <em className="text-foreground">
                            Ex: "O plano diretor é <strong>este</strong>:
                            prospecção imediata no pré-sal."
                          </em>
                          <br />
                          <span className="text-xs opacity-70">
                            (O pronome 'este' atua cataforicamente apontando
                            para frente).
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Compreensão (Explícito) vs Interpretação (Implícito)",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      Saber mapear fronteiras é vital. Errar ao diferenciar o
                      que está escrito do que se pode deduzir logicamente é a
                      armadilha preferida da CESGRANRIO.
                    </p>
                    <ul className="space-y-4 mt-4 list-none pl-0">
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                        <p className="text-sm md:text-base">
                          <strong>Compreensão Textual:</strong> Trabalha com a
                          fotografia exata do texto. Responde a comandos como:{" "}
                          <em>"O autor informa que..."</em>,{" "}
                          <em>"Segundo o texto..."</em>. Tudo deve ser provado
                          materialmente localizando o trecho (fatos
                          decodificáveis diretamente).
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <p className="text-sm md:text-base">
                          <strong>Interpretação Textual:</strong> Opera no campo
                          da inferência lógica e dos pressupostos. Responde a:{" "}
                          <em>"Conclui-se que..."</em>,{" "}
                          <em>"Infere-se que..."</em>. Aqui, o texto é o ponto
                          de partida material que autoriza deduções seguras, sem
                          que você extrapole sua bagagem pessoal (Validação via
                          C.E.D.E.).
                        </p>
                      </li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* LABORATÓRIO TÁTICO M1 */}
        <TextAnalysisLab
          index={2}
          variant={mv[1]}
          titulo="Dossiê Técnico: O Relatório da Refinaria"
          subtitulo="Aplique os conceitos de explícito vs. implícito num fragmento real de manual industrial."
          legenda={[
            { cor: "bg-blue-400", label: "Fato Explícito (Compreensão)" },
            { cor: "bg-emerald-400", label: "Pista Implícita (Interpretação)" },
          ]}
          texto={
            <div className="space-y-4 text-base md:text-lg leading-relaxed">
              <p>
                "A paralisia do setor de manutenção em 2023{" "}
                <span className="bg-blue-400/30 dark:bg-blue-400/20 px-1 rounded ring-1 ring-blue-400/50">
                  não decorreu de falta de verba
                </span>
                , mas de uma{" "}
                <span
                  className="bg-emerald-400/30 dark:bg-emerald-400/20 px-1 rounded ring-1 ring-emerald-400/50 hover:bg-emerald-400/40 transition-colors cursor-help"
                  title="Inferência Lícita de Má Gestão"
                >
                  crise de gestão logística sem precedentes
                </span>
                . Embora as peças estivessem estocadas, o fluxo de distribuição
                falhou,{" "}
                <span className="bg-blue-400/30 dark:bg-blue-400/20 px-1 rounded ring-1 ring-blue-400/50">
                  impedindo a liberação de 40% das ordens de serviço
                </span>{" "}
                no primeiro semestre."
              </p>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Laboratório de Gabarito: Certo vs Errado"
            description="Teste sua percepção crítica nas armadilhas comuns da CESGRANRIO."
            variant={mv[1]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner">
                    <LuShieldAlert className="w-12 h-12 text-red-500 animate-pulse-slow" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    ALERTA: Falsa Conclusão Financeira?
                  </span>
                  <span className="text-sm text-red-500/80 font-medium">
                    A culpa foi da verba?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                    <LuShieldAlert className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-sm">
                      Falso (Contradição Direta)
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    O texto afirma taxativamente que a paralisia{" "}
                    <strong>"não decorreu de falta de verba"</strong>.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Bancas gostam de explorar nosso "senso comum" (crise = falta
                    de dinheiro) para induzir a erro. Ao fazer a prova, não
                    julgue a empresa com sua bagagem existencial. Julgue-a
                    estritamente pelos limites do léxico ali escrito.
                  </p>
                </div>
              }
              categoria="Armadilhas Frequentes"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTarget className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Gargalo foi 100% Interno e Humano?
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Lógica e Dedução
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-sm">
                      Verdadeiro (Inferência Lícita)
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Ao contrastar que a falha ocorreu devido a uma "crise de
                    gestão logística" enquanto as "peças já estivessem
                    estocadas", o autor circunscreve o gargalo.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Mesmo sem usar explicitamente a palavra "humano", deduzir
                    isso é uma inferência corretíssima (Dedução com Lastro),
                    pois falha logística com estoques cheios só pode culminar
                    nas engrenagens operacionais (gestão de processos).
                  </p>
                </div>
              }
              categoria="Interpretação de Elite"
            />
          </div>
        </section>

        <ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title:
              "Compreensão vs Interpretação: A Diferença que te faz Passar",
            duration: "12:30",
            thumbnail:
              "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: A Fronteira do Sentido",
                type: "Infográfico",
                placeholderColor: "bg-blue-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/infografico-compreensao.png",
              },
              {
                title: "Mapa 2: Comandos de Prova",
                type: "Fluxograma",
                placeholderColor: "bg-sky-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/fluxograma-leitura.png",
              },
              {
                title: "Mapa 3: Matriz de Tipos",
                type: "Tático",
                placeholderColor: "bg-indigo-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/mapa-mental-tipos.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Onde Está?'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🎯 🔍</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Se a pergunta diz <strong>'Segundo o texto'</strong>, a
                  resposta está NA SUA CARA. Se diz{" "}
                  <strong>'Depreende-se'</strong>, a resposta está NAS
                  ENTRELINHAS."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Compreensão (Explícito)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "O autor afirma que..."
                    </p>
                    <p className="text-sm mt-2 font-medium text-emerald-700 dark:text-emerald-300">
                      BUSCA: Copia e cola / Paráfrase. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Interpretação (Implícito)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "Infere-se que..."
                    </p>
                    <p className="text-sm mt-2 font-medium text-blue-700 dark:text-blue-300">
                      BUSCA: Conclusão lógica autorizada. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Podcast: Decifrando o Relatório Técnico",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Intro] - O segredo está em não projetar seus medos no texto...",
          }}
          variant={mv[1]}
        />

        <QuizInterativo
          questoes={quizM1}
          titulo="QUIZ: A Diferença Letal"
          icone="🛡️"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
        />
      </TabsContent>

      {/* ─── MÓDULO 2: O TÓPICO FRASAL ─── */}
      <TabsContent value="modulo-2" className="space-y-[40px]">
        <ModuleBanner
          numero={2}
          titulo="O Tópico Frasal"
          descricao="A técnica cirúrgica para encontrar a ideia central do parágrafo em segundos, ignorando o ruído visual."
          variant={mv[2]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="O Coração Estrutural da Mensagem"
            description="Localize e extraia a ideia central (O Tópico Frasal) sem ser consumido por desvios e distrações."
            variant={mv[2]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              A velocidade com a qual um profissional técnico compreende um
              memorando ou laudo em uma refinaria deve ser a mesma aplicada na
              hora da prova. O grande acelerador dessa clareza analítica
              chama-se <strong>Tópico Frasal</strong>: o elemento central de um
              parágrafo que resume a carga semântica ou argumentativa inteira do
              bloco textual, servindo de viga mestra.
            </p>
            <p>
              Em linhas gerais, um parágrafo argumentativo bem construído não é
              uma mistura aleatória de ideias; ele é, de certa forma, uma
              mini-dissertação. Ele possui sua própria introdução, corpo e
              desfecho argumentativo. Descobrir a sua "âncora" inicial impede
              que você se perca nas informações subsidiárias (adornos) ou nos
              exemplos apresentativos que o autor insere para ganhar
              credibilidade descritiva.
            </p>
            <p>
              Seja em um modelo analítico ou dissertativo, os tópicos frasais
              assumem dinâmicas múltiplas: pode ser uma{" "}
              <em>declaração contundente inicial</em> (modelo adotado em cerca
              de 70% dos ensaios examinados pela CESGRANRIO); uma{" "}
              <em>definição</em> conceitual; um eixo de{" "}
              <em>comparação/contraste</em>; ou uma formulação em tom de
              interrogação seguida da tese.
            </p>
            <p>
              Muitas questões disparam o comando: "O segundo parágrafo
              constitui-se a partir da seguinte diretriz..." – nesses casos, a
              banca ignorou todos os rodeios estéticos e está validando
              unicamente a capacidade do candidato de extrair e sintetizar o
              Tópico Frasal subjacente. Confundir o miolo ou um exemplo solto
              com a verdadeira tese gera perda quase certa de pontuação.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🎯 Tática de Radar: Encontrando a Viga Primária
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Passo 1:</strong> Leia a primeira frase do parágrafo,
                  pois ela costuma ser a declaração nuclear.
                </li>
                <li>
                  <strong>Passo 2:</strong> Submeta-a a um teste de isolamento.
                  Se as frases subsequentes parecem "responder" ou
                  "exemplificar" essa primeira linha, este é o seu Tópico
                  Frasal.
                </li>
                <li>
                  <strong>Passo 3:</strong> Em caso positivo baseie qualquer
                  resumo de ideias centralizadas apenas nessa chave lógica.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Métodos de Construção"
            description="Como os parágrafos são arquitetados na prática técnica."
            variant={mv[2]}
          />

          <ContentAccordion
            mode="stacked"
            titulo="Métodos de Construção do Tópico Frasal"
            icone={<LuCpu />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Declaração Inicial (O Padrão Ouro)",
                icone: "📌",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      Neste método, o autor apresenta uma afirmação categórica,
                      direta e inquestionável logo na primeira ou segunda linha
                      do parágrafo. É uma tese em miniatura. O restante do
                      parágrafo existirá unicamente para comprovar, ilustrar ou
                      destrinchar aquela declaração inicial.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Estrategicamente, esse é o "Padrão Ouro" da leitura
                      instrumental. Quando se deparar com ele, você pode ler a
                      primeira frase e literalmente acelerar ou pular o resto do
                      parágrafo se estiver apenas buscando a estrutura
                      hierárquica do texto na primeira leitura de reconhecimento
                      ("Scanning").
                    </p>
                    <div className="p-4 bg-muted/40 rounded-xl border-l-2 border-emerald-500 italic mt-2 text-sm md:text-base text-foreground/90">
                      <strong>Exemplo prático:</strong> "A transição para o
                      hidrogênio verde exige maciça infraestrutura prévia."{" "}
                      <br />
                      <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1 block">
                        (Fim da leitura essencial. Daqui pra frente são adereços
                        de sustentação).
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Definição (O Padrão Didático)",
                icone: "📖",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      O parágrafo se abre com o intuito primordial de conceituar
                      um termo técnico, um objeto, um processo ou uma situação.
                      É o formato clássico que permeia a tipologia descritiva ou
                      expositiva de manuais rigorosos.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      <strong>Atenção da Banca:</strong> A CESGRANRIO gosta de
                      usar definições extensas para confundir a tipologia
                      textual. Um texto pode iniciar com uma rica definição mas
                      sua essência final ser injuntiva (ditando ordens
                      operacionais ligadas a essa definição).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "3. Contraste (O Padrão Argumentativo Dialético)",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      Aqui o autor ancora a ideia central num dramático embate
                      de forças semânticas. O Tópico Frasal traz, de imediato,
                      duas pontas de uma contradição irresolvível ou de uma
                      potente relação de quebra de expectativa lógica.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Em vez de afirmar linearmente que algo "subiu", ele
                      arquiteta: "Embora o risco geológico seja astronômico, a
                      recompensa do bloco justifica a perfuração preliminar".
                      Essa estrutura dialética obrigatoriamente exigirá
                      Conjunções Adversativas ou Concessivas fincadas já na
                      fundação do parágrafo.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[2]}
          titulo="Raio-X do Parágrafo Técnico"
          subtitulo="Identifique a 'Viga Mestra' e como ela sustenta os 'Adornos' (detalhes)."
          legenda={[
            { cor: "bg-emerald-500", label: "Tópico Frasal (Viga)" },
            { cor: "bg-slate-400", label: "Desenvolvimento (Adorno)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "
                <span className="bg-emerald-500/30 dark:bg-emerald-500/20 px-1 rounded ring-1 ring-emerald-500/50">
                  A segurança operacional em plataformas offshore é
                  indissociável da saúde mental da equipe
                </span>
                . Dados recentes indicam que 30% dos incidentes leves decorrem
                de fadiga cognitiva. Além disso, o regime de confinamento exige
                protocolos de lazer que, embora pareçam secundários,{" "}
                <span className="bg-slate-400/30 dark:bg-slate-400/20 px-1 rounded ring-1 ring-slate-400/50 italic">
                  blindam a operação contra falhas humanas catastróficas
                </span>
                ."
              </p>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Prática de Combate: Localização"
            description="Onde está o coração do texto?"
            variant={mv[2]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuSearch className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Tópico Frasal: Sempre na cabeça?
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    A primeira regra da localização
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-sm">
                      Predominantemente SIM
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Em textos de natureza técnica, burocrática e gerencial
                    (estilo purista cobrado pela CESGRANRIO em concursos para
                    estatal), a premissa de eficácia é mandatória.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    O <strong>Ponto de Impacto</strong> semântico reside
                    brutalmente na abertura estrutural. O autor condensa a tese
                    global no exato início literário visando afiançar que o
                    leitor extrairá a essência primária de imediato, mitigando o
                    ruído cognitivo proveniente do excesso de dados estatísticos
                    subsequentes.
                  </p>
                </div>
              }
              categoria="Engenharia do Parágrafo"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuTriangleAlert className="w-12 h-12 text-amber-500 animate-pulse-slow" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Tem tópico implícito?
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Parágrafos sem centro claro
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuShieldAlert className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-sm">
                      SIM (Diluído Oculto)
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Blocos textuais consubstancialmente{" "}
                    <strong>narrativos ou abertamente literários</strong> (como
                    os fragmentos de crônicas às vezes usados na prova)
                    furtam-se de estampar uma "frase-síntese governamental".
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Nesses cenários inóspitos de prova, a espinha dorsal
                    discursiva não grita por você. O Tópico repousa inteiramente
                    infuso no somatório das peças orgânicas da narrativa.
                    Reivindica-se do candidato a capacidade letal de síntese
                    extrativa.
                  </p>
                </div>
              }
              categoria="Tática de Contingência"
            />
          </div>
        </section>

        <TextAnalysisLab
          index={4}
          variant={mv[2]}
          titulo="Laboratório: O Tópico Frasal"
          subtitulo="Identificando a espinha dorsal do parágrafo técnico."
          legenda={[
            {
              cor: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              label: "Tópico Frasal (Ideia Central)",
            },
            {
              cor: "bg-slate-300 dark:bg-slate-700",
              label: "Desenvolvimento (Detalhes)",
            },
          ]}
          texto={
            <>
              <span className="bg-emerald-400/20 text-emerald-900 dark:text-emerald-100 border-b border-emerald-400/50 px-1 rounded-sm">
                A transição energética da Petrobras não é apenas um compromisso
                ambiental, mas uma necessidade estratégica de sobrevivência
                mercadológica.
              </span>{" "}
              <span className="opacity-50">
                Embora o petróleo ainda seja a espinha dorsal financeira da
                companhia, o investimento em fontes renováveis saltou 15% no
                último biênio...
              </span>
            </>
          }
        />

        <ModuleConsolidation
          index={5}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Engenharia do Parágrafo: Dominando o Tópico Frasal",
            duration: "10:15",
            thumbnail:
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa de Conectivos Causais",
                type: "Infográfico",
                placeholderColor: "bg-emerald-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/mapa-mental-causais.png",
              },
              {
                title: "Mapa de Concessivas",
                type: "Esquema",
                placeholderColor: "bg-teal-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/mapa-mental-concessivas.png",
              },
              {
                title: "Tabela de Conectivos",
                type: "Tático",
                placeholderColor: "bg-cyan-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/tabela-conectivos.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Viga Mestra'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🏛️ 🏗️</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O parágrafo é um edifício. O <strong>Tópico Frasal</strong> é
                  a viga mestra. Se você a encontra, o resto é apenas decoração
                  (exemplos, dados, detalhes)."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Dedução (Início)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "A energia solar é farta..." + Provas.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Indução (Fim)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      Provas... + "Portanto, a energia solar..."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: A Arquitetura do Parágrafo",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Host] - Se você ler apenas a primeira frase de cada parágrafo...",
          }}
          variant={mv[2]}
        />

        <QuizInterativo
          questoes={quizM2}
          titulo="QUIZ: O Tópico Frasal"
          icone="🏗️"
          numero={6}
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
          variant={mv[2]}
        />
      </TabsContent>

      {/* ─── MÓDULO 3: LEITURA ESTRATÉGICA ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Coesão e Argumentação"
          descricao="A 'Cola' que une as ideias e os 'Martelos' que as sustentam. Domine a lógica invisível preferida da Cesgranrio."
          variant={mv[3]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="As Engrenagens do Argumento"
            description="Como autores costuram palavras para induzir lógicas e provar teorias."
            variant={mv[3]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Um texto argumentativo assemelha-se a uma rede de alta precisão
              lógica. Cada afirmação precisa de cabos de sustentação para não
              ruir, e esses cabos assumem a forma de{" "}
              <strong>coesão argumentativa</strong> (ou coesão sequencial),
              gerada de modo estruturado através de conjunções, advérbios e
              expressões conectivas que evidenciam qual a progressão das ideias.
            </p>
            <p>
              A compreensão de nível sênior ignora a superficialidade e vai
              direto à espinha dorsal do autor. O que ele está fazendo? Ele está
              apresentando uma consequência inevitável ("Portanto"),
              demonstrando uma oposição técnica ("Contudo"), introduzindo uma
              concessão tolerável ("Embora") ou apenas sinalizando um acréscimo
              ("Além disso")? Cada conectivo opera como uma "placa de trânsito"
              para o fluxo do raciocínio.
            </p>
            <p>
              O erro capital é ler buscando reter "somente o assunto principal".
              Na CESGRANRIO, o modo como as informações se entrelaçam cria a
              interpretação final. Uma questão clássica pedirá a reescritura de
              um trecho alterando as conjunções sem prejudicar a lógica global.
              Memorizar todos os tipos de conectivos das gramáticas tradicionais
              é fundamental.
            </p>
            <p>
              Pense em um manual que diga: "<strong>Dado que</strong> a corrosão
              aumenta, <strong>torna-se vital</strong> substituir as ligas,{" "}
              <strong>ainda que</strong> a operação demande atrasos". "Dado que"
              marca a causa. "Ainda que" prevê e quebra uma oposição
              pré-fabricada pelo autor (o incômodo do atraso), garantindo
              vitória para a ideia de substituição.
            </p>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                A Tríade de Conectivos Perigosos CESGRANRIO
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                  <strong className="block text-indigo-600 dark:text-indigo-400">
                    Embora / Conquanto
                  </strong>
                  <span className="text-muted-foreground">
                    (Concessão) Permite a realidade de um obstáculo sem que este
                    impeça o fato principal.
                  </span>
                </div>
                <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                  <strong className="block text-rose-600 dark:text-rose-400">
                    Portanto / Por conseguinte
                  </strong>
                  <span className="text-muted-foreground">
                    (Conclusão) Cimenta o peso prático do argumento
                    preexistente.
                  </span>
                </div>
                <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                  <strong className="block text-emerald-600 dark:text-emerald-400">
                    Pois / Visto que
                  </strong>
                  <span className="text-muted-foreground">
                    (Causa/Explicação) Justificam, na base técnica e lógica, a
                    adoção de um evento antecedente.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ContentAccordion
            mode="stacked"
            titulo="Operadores Argumentativos de Alto Impacto"
            icone={<LuHammer />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Oposição: O 'Mas' vs O 'Embora'",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      <strong>Conceituação Normativa:</strong> A CESGRANRIO
                      testa implacavelmente a sua habilidade de identificar as
                      nuances do contraste. Conjunções{" "}
                      <strong>Adversativas</strong> (Mas, Porém, Contudo,
                      Todavia, Entretanto) enfatizam categoricamente a ideia na
                      qual estão ancoradas, derrubando a força da contraparte.
                      Conjunções <strong>Concessivas</strong> (Embora,
                      Conquanto, Ainda que) introduzem um obstáculo válido,
                      porém secundário, dando a vitória lógica à oração
                      principal.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-tight text-sm">
                          Adversativa (Foco no Obstáculo):
                        </p>
                        <p className="italic text-sm md:text-base text-foreground/90">
                          "O pré-sal é altamente promissor, <strong>mas</strong>{" "}
                          a pressão extrema exige metalurgia caríssima."
                        </p>
                        <ul className="mt-2 text-xs md:text-sm list-disc pl-4 space-y-1">
                          <li>
                            O autor vence o argumento focando na dificuldade
                            técnica.
                          </li>
                          <li>Tirou o brilho da promessa.</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-tight text-sm">
                          Concessiva (Foco no Destino Superado):
                        </p>
                        <p className="italic text-sm md:text-base text-foreground/90">
                          "<strong>Embora</strong> a pressão extrema exija
                          metalurgia caríssima, o pré-sal é altamente
                          promissor."
                        </p>
                        <ul className="mt-2 text-xs md:text-sm list-disc pl-4 space-y-1">
                          <li>
                            A dificuldade existe, mas não impede o sucesso.
                            Destacou a glória.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Causa vs Consequência (A Lógica Intocável)",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      Embora Causa e Efeito sejam duas faces de um mesmo evento,
                      a CESGRANRIO pedirá que você identifique quem deflagrou o
                      quê. O dominó que cai primeiro é a <strong>Causa</strong>.
                      O dominó que cai em reação é a{" "}
                      <strong>Consequência</strong>.
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-500/10 rounded-xl border border-slate-500/20">
                        <p className="font-bold mb-1 text-slate-700 dark:text-slate-300 uppercase tracking-widest text-xs">
                          Vestindo a Capa da CAUSA:
                        </p>
                        <p className="text-sm md:text-base opacity-90">
                          Termos: "Visto que", "Já que", "Uma vez que",
                          "Porquanto".
                        </p>
                        <p className="mt-2 italic text-sm md:text-base text-foreground/90">
                          "A produção desabou <strong>visto que</strong> (porque
                          - a raiz) houve corrosão no manifold."
                        </p>
                      </div>
                      <div className="p-4 bg-slate-500/10 rounded-xl border border-slate-500/20">
                        <p className="font-bold mb-1 text-slate-700 dark:text-slate-300 uppercase tracking-widest text-xs">
                          Vestindo a Capa da CONSEQUÊNCIA:
                        </p>
                        <p className="text-sm md:text-base opacity-90">
                          Termos: "De sorte que", "De modo que", "Tão (forte)
                          ... que".
                        </p>
                        <p className="mt-2 italic text-sm md:text-base text-foreground/90">
                          "A corrosão bateu nível crítico,{" "}
                          <strong>de sorte que</strong> (gerando - o resultado)
                          a produção desabou."
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Dossiê de Conectivos"
            description="Memorização rápida para os termos que a Cesgranrio 'adora'."
            variant={mv[3]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuLink className="w-10 h-10 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-foreground">
                    Porquanto
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Equação do Passado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3 p-2 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-emerald-500 flex items-center gap-2 border-b border-emerald-500/10 pb-2 uppercase tracking-wide text-sm">
                    <LuCheck className="w-4 h-4" /> CAUSAL EXPLICATIVA
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Irmão siamês formal do <strong>PORQUE</strong>. Ele introduz
                    o motivo gerador lógico de um acontecimento. Evite travar a
                    leitura; traduza mentalmente para "uma vez que".
                  </p>
                  <p className="text-sm bg-muted/40 p-3 rounded-lg border-l-2 border-emerald-500 italic mt-2 text-foreground/80">
                    "A torre foi evacuada <strong>porquanto</strong> os sensores
                    indicaram alta concentração de H2S."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                    <LuLink className="w-10 h-10 text-indigo-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-foreground">
                    Conquanto
                  </span>
                  <span className="text-sm text-indigo-500/80 font-medium">
                    A Pegadinha Suprema
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3 p-2 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-indigo-500 flex items-center gap-2 border-b border-indigo-500/10 pb-2 uppercase tracking-wide text-sm">
                    <LuCheck className="w-4 h-4" /> CONCESSIVA
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Sinônimo letal de <strong>EMBORA</strong>. Bancas adoram
                    usá-lo porque a sonoridade confunde com "Portanto"
                    (conclusiva). O conquanto sempre abre alas para uma objeção
                    secundária superada.
                  </p>
                  <p className="text-sm bg-muted/40 p-3 rounded-lg border-l-2 border-indigo-500 italic mt-2 text-foreground/80">
                    "<strong>Conquanto</strong> o barril de brent caísse de
                    preço, o lucro local superou estimativas."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuLink className="w-10 h-10 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-foreground">
                    Aliás
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Reajuste de Rotas
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3 p-2 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-amber-500 flex items-center gap-2 border-b border-amber-500/10 pb-2 uppercase tracking-wide text-sm">
                    <LuCheck className="w-4 h-4" /> RETIFICAÇÃO / ACRÉSCIMO
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Conector avançado e coringa. Costuma ser usado para somar um
                    peso probatório drástico na argumentação ou para retificar
                    levemente o que foi dito, amplificando seu efeito
                    pragmático.
                  </p>
                  <p className="text-sm bg-muted/40 p-3 rounded-lg border-l-2 border-amber-500 italic mt-2 text-foreground/80">
                    "Nossos navios são os mais seguros do mar transatlântico;{" "}
                    <strong>aliás</strong>, detemos certificação máxima global."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[3]}
          titulo="Rastreamento de Referentes"
          subtitulo="A quem este pronome está servindo? Evite a armadilha do referente mais próximo."
          legenda={[
            { cor: "bg-amber-500", label: "Referente Principal" },
            { cor: "bg-slate-400", label: "Anáfora (Substituto)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "A{" "}
                <span className="bg-amber-500/30 dark:bg-amber-500/20 px-1 rounded ring-1 ring-amber-500/50">
                  subsidiária
                </span>{" "}
                enviou o relatório ao comitê de ética após{" "}
                <span className="bg-slate-400/30 dark:bg-slate-400/20 px-1 rounded ring-1 ring-slate-400/50 font-bold italic">
                  esta
                </span>{" "}
                detectar irregularidades no balanço."
              </p>
              <div className="p-3 bg-amber-500/5 dark:bg-amber-500/10 border-l-4 border-amber-500 text-lg text-amber-800 dark:text-amber-200">
                Atenção: "Esta" (pronome demonstrativo) refere-se ao elemento
                mais próximo: o <strong>comitê de ética</strong>, e não à
                subsidiária.
              </div>
            </div>
          }
        />

        <ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Operadores Lógicos: A 'Cola' do Texto Petrobras",
            duration: "11:45",
            thumbnail:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Card de Extrapolação",
                type: "Tático",
                placeholderColor: "bg-red-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/card-extrapolacao.png",
              },
              {
                title: "Infográfico do Cone",
                type: "Diagrama",
                placeholderColor: "bg-amber-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/infografico-cone.png",
              },
              {
                title: "Mapa Mental: Rota Lógica",
                type: "Esquema",
                placeholderColor: "bg-orange-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/mapa-mental-rota.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Muro de Tijolos'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🔗 🧱</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O texto é um muro. Os <strong>Conectivos</strong> são o
                  cimento. Sem eles, as frases (tijolos) caem sozinhas."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                      Mas (Adversativa)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Estudei muito, mas não passei." (Foco no Mas)
                    </p>
                  </div>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                      Embora (Concessiva)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Embora não tenha passado, estudei muito."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Conectivos de Impacto",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Host] - Se vir um 'Embora', saiba que a ideia principal vem depois da vírgula...",
          }}
          variant={mv[3]}
        />

        <QuizInterativo
          questoes={quizM3}
          titulo="QUIZ: Coesão e Argumentação"
          icone="🧠"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
          variant={mv[3]}
        />
      </TabsContent>

      {/* ─── MÓDULO 4: TIPOLOGIA TEXTUAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Tipologia Textual"
          descricao="O DNA do Texto. Identifique o gênero e o tipo predominante para antecipar a intenção da Cesgranrio."
          variant={mv[4]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="O DNA do Texto: Arquitetura Tipológica"
            description="Categorize o fluxo de informação e antecipe as perguntas da CESGRANRIO com base na estrutura do gênero."
            variant={mv[4]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Identificar a <strong>Tipologia Textual</strong> predominante é
              como realizar uma triagem de risco em um ambiente industrial:
              define as ferramentas de análise que você irá utilizar. No
              universo Petrobras-CESGRANRIO, os textos são predominantemente
              híbridos, mas possuem um "centro de gravidade" estrutural: a{" "}
              <em>Dissertação</em> (Expositiva ou Argumentativa) e a{" "}
              <em>Injunção</em> (Instrução técnica).
            </p>
            <p>
              A <strong>Dissertação-Argumentativa</strong> é o campo de batalha
              das teses. O autor não apenas informa, ele defende um
              posicionamento (ex: os desafios da transição energética). Aqui,
              você deve caçar 'conectivos lógicos' de causa e consequência. Já
              na <strong>Dissertação-Expositiva</strong>, o foco é a
              neutralidade técnica e factual. A banca costuma cobrar aqui a
              capacidade de síntese de dados e a identificação de conceitos.
            </p>
            <p>
              Não ignore os tons <strong>Injuntivos</strong>. Embora raros como
              textos completos, aparecem muito em gêneros como manuais de
              operação ou normas reguladoras (NRs). O segredo está nos verbos de
              comando ou instruções procedimentais. Se você detectar o
              imperativo, a questão provavelmente pedirá a finalidade de uma
              instrução específica.
            </p>
            <p>
              Finalmente, os textos <strong>Narrativos</strong> e{" "}
              <strong>Descritivos</strong> raramente aparecem como eixos
              centrais, mas servem de "adornos" para humanizar relatórios
              institucionais. Saber diferenciar a narração de um evento passado
              da argumentação sobre o seu impacto é vital para não confundir o
              cronológico com o causal.
            </p>
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                ⚠️ Tática de Tipologia: O Pêndulo de Análise
              </h4>
              <p className="text-sm italic">
                Ao ler as primeiras 5 linhas, pergunte-se:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Ele quer me convencer?</strong> (Argumentativo) &rarr;
                  Busque a Tese.
                </li>
                <li>
                  <strong>Ele quer me dar dados?</strong> (Expositivo) &rarr;
                  Busque os Fatos e Definições.
                </li>
                <li>
                  <strong>Ele quer que eu faça algo?</strong> (Injuntivo) &rarr;
                  Busque os Verbos de Comando.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Matriz de Tipos: O Filtro Petrobras"
            description="As provas focam em Dissertação e Injunção. Mas as armadilhas estão nos textos Narrativos disfarçados."
            variant={mv[4]}
          />

          <ContentAccordion
            mode="stacked"
            titulo="O Trio de Elite da Tipologia"
            icone={<LuBrain />}
            corIndicador="bg-rose-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Dissertação-Argumentativa (O Combate)",
                icone: "🖋️",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      <strong>Objetivo Principal:</strong> Persuadir o leitor de
                      uma <strong>Tese</strong>. O autor assume uma trincheira e
                      usa os dados não para informar, mas como armas para provar
                      seu ponto. A CESGRANRIO focará nas conjunções e na opinião
                      camuflada (adjetivos valorativos).
                    </p>
                    <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                      <p className="italic text-foreground/90 text-sm md:text-base">
                        "É <strong>imperativo</strong> que a Petrobras mantenha
                        o monopólio estratégico do refino,{" "}
                        <u className="decoration-indigo-500 decoration-2">
                          dado que
                        </u>{" "}
                        (causa da proposta) a segurança nacional{" "}
                        <strong>depende</strong> dessa autonomia."
                      </p>
                    </div>
                    <ul className="text-sm md:text-base space-y-2 border-t border-border pt-4 mt-2">
                      <li className="flex gap-2 items-start">
                        <LuCheck className="text-indigo-500 mt-1 shrink-0" />{" "}
                        <span>
                          <strong>Marcador Clássico:</strong> Subjetividade. A
                          presença de um Juízo de Valor (bom, ruim, imperativo,
                          essencial).
                        </span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <LuCheck className="text-indigo-500 mt-1 shrink-0" />{" "}
                        <span>
                          <strong>Foco na Prova:</strong> Identificar a tese
                          central ou o argumento principal que a sustenta.
                        </span>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "2. Dissertação-Expositiva (O Relatório)",
                icone: "📊",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-sm md:text-base leading-relaxed">
                      <strong>Objetivo Principal:</strong> Informar com isenção.
                      O autor atua como um repórter técnico. Ele expõe fatos,
                      estatísticas ou conceitos, mas{" "}
                      <strong>não toma partido</strong>. Este é o domínio da
                      ciência e das notícias puras.
                    </p>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <p className="italic text-foreground/90 text-sm md:text-base">
                        "A nova unidade de refino localizada na Bahia opera
                        atualmente com <strong>95%</strong> de capacidade,
                        processando <strong>200 mil barris/dia</strong> desde o{" "}
                        <strong>primeiro semestre de 2023</strong>."
                      </p>
                    </div>
                    <ul className="text-sm md:text-base space-y-2 border-t border-border pt-4 mt-2">
                      <li className="flex gap-2 items-start">
                        <LuCheck className="text-blue-500 mt-1 shrink-0" />{" "}
                        <span>
                          <strong>Marcador Clássico:</strong> Impessoalidade
                          total (3ª pessoa), dados matemáticos, linguagem
                          denotativa (literal).
                        </span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <LuCheck className="text-blue-500 mt-1 shrink-0" />{" "}
                        <span>
                          <strong>Foco na Prova:</strong> Interpretação literal
                          e compreensão de informações precisas no texto.
                        </span>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "3. Texto Injuntivo (A Ordem/O Manual)",
                icone: "⚙️",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground text-balance">
                    <p className="text-sm md:text-base leading-relaxed">
                      <strong>Objetivo Principal:</strong> Comandar o leitor a
                      agir. É o texto que ensina, prescreve, regula ou doutrina.
                      Na Petrobras, você viverá cercado de Injunção: Manuais de
                      Operação, NRs e Procedimentos Padrão.
                    </p>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                      <p className="italic text-foreground/90 text-sm md:text-base">
                        "<strong>Aperte</strong> a válvula vermelha e{" "}
                        <strong>verifique</strong> a pressão. Em caso de
                        anomalia, <strong>isolar</strong> o setor."
                      </p>
                    </div>
                    <AlertBox tipo="warning" titulo="O Raio-X do Verbo">
                      <p className="text-sm">
                        A "alma" da Injunção é o verbo. Ele pode estar no{" "}
                        <strong>Imperativo</strong> ("Abra", "Feche") ou
                        ancorado no{" "}
                        <strong>Infinitivo com força de ordem</strong> ("Manter
                        a área limpa"). Se o texto é um manual, a tipologia é
                        injuntiva.
                      </p>
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Duelo de Gêneros & Tipos"
            description="Testando sua percepção tática de predominância."
            variant={mv[4]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                    <LuNewspaper className="w-12 h-12 text-indigo-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    O Editorial
                  </span>
                  <span className="text-sm font-medium text-indigo-500/80">
                    Jornais e Revistas
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-indigo-500 flex items-center gap-2 border-b border-indigo-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuCheck className="w-5 h-5" /> DISSERTATIVO-ARGUMENTATIVO
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    O editorial é a "voz oficial" do veículo de imprensa.
                    Diferente de uma mera notícia reportada (expositiva), o
                    editorial escolhe um lado do campo e ataca ou defende uma
                    política pública.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-indigo-500">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      A Regra da Prova:
                    </p>
                    <p className="text-sm italic opacity-90">
                      Ao ver a fonte "Editora X / Jornal Y (Editorial)",
                      imediatamente cace a TESE nas primeiras linhas do texto.
                    </p>
                  </div>
                </div>
              }
              categoria="Gêneros na Prática"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuShieldAlert className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    Manual Técnico
                  </span>
                  <span className="text-sm font-medium text-orange-500/80">
                    Normas e Procedimentos
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-orange-500 flex items-center gap-2 border-b border-orange-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuCheck className="w-5 h-5" /> TEXTO INJUNTIVO
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Gênero soberano em provas técnicas. Ele não quer convencer
                    você de que a máquina é boa; ele quer obrigar você a não
                    pular os passos de segurança previstos.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-orange-500">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      A Regra da Prova:
                    </p>
                    <p className="text-sm italic opacity-90">
                      Leia sublinhando verbos imperativos. Identificar quem
                      realiza e a quem a ordem se destina é alvo carimbado de
                      questões.
                    </p>
                  </div>
                </div>
              }
              categoria="Gêneros na Prática"
            />
          </div>
        </section>

        <TextAnalysisLab
          index={3}
          variant={mv[4]}
          titulo="Identificando o DNA"
          subtitulo="Qual a intenção primária do autor neste fragmento?"
          legenda={[
            { cor: "bg-indigo-500", label: "Marca de Dissertação" },
            { cor: "bg-amber-400", label: "Marca de Injunção (Instrução)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "
                <span className="bg-indigo-500/30 dark:bg-indigo-500/20 px-1 rounded ring-1 ring-indigo-500/50">
                  Considerando a instabilidade geopolítica, a Petrobras deve
                  priorizar a autosuficiência asfáltica
                </span>
                . Para isso,{" "}
                <span className="bg-amber-400/30 dark:bg-amber-400/20 px-1 rounded ring-1 ring-amber-400/50 italic font-bold">
                  realoque os investimentos
                </span>{" "}
                da unidade X para a unidade Y imediatamente."
              </p>
              <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 border-l-4 border-indigo-500 text-lg text-indigo-800 dark:text-indigo-200">
                Análise: O texto é híbrido, mas a <strong>predominância</strong>{" "}
                é dissertativa no início (tese) e injuntiva no final (comando).
              </div>
            </div>
          }
        />

        <ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "DNA do Texto: Tipologias e Gêneros de Elite",
            duration: "09:45",
            thumbnail:
              "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Matriz de Tipos",
                type: "Infográfico",
                placeholderColor: "bg-blue-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'DNA Textual'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🧬 📄</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O tipo textual é o DNA. Se tem <strong>imperativo</strong>, é
                  Injunção. Se tem <strong>opinião</strong>, é Dissertação. Se{" "}
                  <strong>relata fatos</strong>, é Narração."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Dissertação (Opinião)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "É fundamental que a empresa invista..."
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Injunção (Instrução)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Utilize o EPI antes de iniciar..."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "DNA Textual em 3 Minutos",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics:
              "[Host] - Tipologia não é gênero. Gênero é o frasco, Tipologia é o conteúdo...",
          }}
          variant={mv[4]}
        />

        <QuizInterativo
          questoes={quizM4}
          titulo="QUIZ: Tipologia Textual"
          icone="🧬"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant={mv[4]}
        />
      </TabsContent>

      {/* ─── MÓDULO 5: VÍCIOS E VELOCIDADE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Vícios e Velocidade"
          descricao="Elimine as âncoras que te impedem de ler os textos técnicos da Petrobras em tempo recorde."
          variant={mv[5]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="O Fator Velocidade: Leitura em Fluxo"
            description="Corte as âncoras cognitivas que atrasam seu processamento e ganhe os minutos preciosos que definem a classificação."
            variant={mv[5]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Nas provas de 1ª linha (Petrobras/BNDES), o maior inimigo não é a
              dificuldade do conteúdo, mas o <strong>cronômetro</strong>. Muitos
              candidatos exímios tecnicamente falham por não conseguir terminar
              a prova ou por lerem o texto três vezes antes de atacar as
              alternativas. Ler rápido não é correr; é saber o que processar e o
              que ignorar.
            </p>
            <p>
              A <strong>Subvocalização</strong> (ouvir a voz na mente) é a
              principal âncora que limita sua velocidade à fala humana (150
              ppm). A leitura visual pura, focada em blocos de sentido
              ("chunks"), permite saltar para 500+ ppm sem perda de compreensão
              global. É o treinamento do olho para captar a estrutura do
              parágrafo antes mesmo de mergulhar em cada preposição.
            </p>
            <p>
              Outro vício fatal é a <strong>Regressão Involuntária</strong>.
              Voltar ao início da frase porque "achou que não entendeu" destrói
              a coesão mental em construção. Muitas vezes, o entendimento se
              completa ao final do parágrafo ou através das conexões lógicas que
              seguem. Mantenha o fluxo adiante; se houver dúvida real, o
              enunciado da questão te levará de volta ao ponto exato.
            </p>
            <p>
              A técnica do <strong>Guia Visual</strong> (usar a caneta para
              marcar o caminho) ajuda a manter a concentração contínua e evita
              que o olho se perca em saltos entre linhas. Em textos técnicos com
              colunas estreitas, essa tática aumenta a retenção em até 30% sob
              pressão de tempo.
            </p>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                ⚡ Protocolo de Velocidade Petrobras
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Leitura de Reconhecimento:</strong> 40 segundos para
                  captar o assunto e o tom (Skimming).
                </li>
                <li>
                  <strong>Leitura de Estudo:</strong> Focada nos Tópicos Frasais
                  identificados no Módulo 2.
                </li>
                <li>
                  <strong>Ponto de Retenção:</strong> Pare ao final de cada
                  parágrafo e diga a si mesmo uma palavra que o resuma.
                </li>
                <li>
                  <strong>Corte de Vício:</strong> Não mova os lábios e não
                  volte atrás até o final do período.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="As Âncoras do Candidato"
            description="Para ler rápido, não é preciso ler 'correndo', mas sim ler sem carregar peso desnecessário."
            variant={mv[5]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuBrain className="w-12 h-12 text-red-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    Subvocalização
                  </span>
                  <span className="text-sm font-medium text-red-500/80">
                    O Freio da Mente
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-red-500 flex items-center gap-2 border-b border-red-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuShieldAlert className="w-5 h-5" /> VÍCIO DE LENTIDÃO
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Hábito primário de "ouvir a própria voz" na mente ao ler.
                    Esse teto neuromuscular trava a velocidade (cerca de
                    150ppm). A leitura puramente visual salta para 600+ ppm sem
                    perda de contexto.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-red-500">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      A Cura:
                    </p>
                    <p className="text-sm italic opacity-90">
                      Evite mover os lábios (mesmo sem som). Force os olhos a
                      saltarem por blocos de 3 a 5 palavras. Com o tempo, o
                      nervo óptico envia a imagem que logo se converte em
                      sentido puro.
                    </p>
                  </div>
                </div>
              }
              categoria="Velocidade de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuTriangleAlert className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    Regressão Ocular
                  </span>
                  <span className="text-sm font-medium text-orange-500/80">
                    A Ansiedade do Entendimento
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-orange-500 flex items-center gap-2 border-b border-orange-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuShieldAlert className="w-5 h-5" /> DESTRUTOR DE FLUXO
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Impulso histérico de voltar no texto por "medo de não ter
                    entendido". Rompe o fluxo lógico de progressão. O cérebro
                    trabalha como um quebra-cabeça, que clareia conforme mais
                    peças chegam.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-orange-500">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      A Cura:
                    </p>
                    <p className="text-sm italic opacity-90">
                      Leia com o guia visual e "empurre" os olhos
                      implacavelmente à frente. Aceite a ambiguidade temporária.
                      Geralmente, o sentido morava no final daquele mesmo
                      parágrafo.
                    </p>
                  </div>
                </div>
              }
              categoria="Velocidade de Elite"
            />
          </div>

          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
              <LuTarget className="w-5 h-5" /> Técnica do Guia Visual
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Use a ponta de uma caneta (ou o cursor do mouse) para guiar o
              olho. O seu olho é atraído pelo movimento. Ao seguir um guia, você
              evita saltos e regressões, mantendo o foco nos{" "}
              <strong>termos operacionais</strong> do texto técnico.
            </p>

            <ContentAccordion
              mode="stacked"
              titulo="O Protocolo dos 3 Passos de Leitura"
              icone={<LuEye />}
              corIndicador="bg-violet-500"
              slides={[
                {
                  titulo: "1. Leitura de Reconhecimento (Skimming)",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm md:text-base leading-relaxed">
                        <strong>Objetivo:</strong> Mapear o terreno antes do
                        ataque. É uma leitura a jato (30 a 60 segundos) feita
                        imediatamente após ler o enunciado da questão.
                      </p>
                      <ul className="text-sm md:text-base space-y-2 border-t border-border pt-4 mt-2">
                        <li className="flex gap-2 items-start">
                          <LuCheck className="text-violet-500 mt-1 shrink-0" />{" "}
                          <span>
                            <strong>Onde focar:</strong> Título, subtítulo,
                            primeira linha do 1º parágrafo (o tema) e a fonte do
                            texto.
                          </span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <LuCheck className="text-violet-500 mt-1 shrink-0" />{" "}
                          <span>
                            <strong>O que ignorar:</strong> Todos os detalhes,
                            exemplos e conjunções do miolo do texto.
                          </span>
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "2. Leitura de Compreensão Global",
                  icone: "📘",
                  conteudo: (
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm md:text-base leading-relaxed">
                        <strong>Objetivo:</strong> Rastrear a "Cadeia de Tópicos
                        Frasais". Você lê para entender a tese e os argumentos
                        macro, mantendo um ritmo constante de progressão visual.
                      </p>
                      <ul className="text-sm md:text-base space-y-2 border-t border-border pt-4 mt-2">
                        <li className="flex gap-2 items-start">
                          <LuCheck className="text-violet-500 mt-1 shrink-0" />{" "}
                          <span>
                            <strong>Onde focar:</strong> Nas primeiras e últimas
                            frases de cada parágrafo (onde moram as conclusões
                            parciais).
                          </span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <LuCheck className="text-violet-500 mt-1 shrink-0" />{" "}
                          <span>
                            <strong>Ponto Crítico:</strong> Bloquear totalmente
                            a regressão ocular. Não entendeu uma palavra?
                            Avance! Pelo contexto, o sentido se fechará adiante.
                          </span>
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "3. Leitura Analítica (Microscópica)",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm md:text-base leading-relaxed">
                        <strong>Objetivo:</strong> O tiro de precisão
                        ("Scanning"). Executada somente no parágrafo ou linha
                        exata exigida pelo enunciado para validar uma premissa.
                      </p>
                      <ul className="text-sm md:text-base space-y-2 border-t border-border pt-4 mt-2">
                        <li className="flex gap-2 items-start">
                          <LuCheck className="text-violet-500 mt-1 shrink-0" />{" "}
                          <span>
                            <strong>Onde focar:</strong> Palavras de Restrição
                            (somente, apenas, nunca, sempre) e Conectivos
                            Lógicos (mas, porque, portanto) que podem inverter o
                            jogo.
                          </span>
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[5]}
          titulo="Laboratório de Velocidade"
          subtitulo="Tente captar o sentido dos blocos destacados sem subvocalizar."
          legenda={[
            { cor: "bg-emerald-500", label: "Bloco de Sentido (Chunk)" },
          ]}
          texto={
            <div className="flex flex-wrap gap-2 leading-relaxed">
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                O refino de petróleo
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                no Brasil enfrenta
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                desafios logísticos
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                sem precedentes
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                devido à escala.
              </span>
            </div>
          }
        />

        <ModuleConsolidation
          index={5}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Leitura de Elite: Eliminando Vícios e Ganhando Velocidade",
            duration: "07:30",
            thumbnail:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Card de Tese",
                type: "Tático",
                placeholderColor: "bg-emerald-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
              },
              {
                title: "Infográfico de Comandos",
                type: "Diagrama",
                placeholderColor: "bg-teal-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
              },
              {
                title: "Mapa Mental: Inferência",
                type: "Esquema",
                placeholderColor: "bg-green-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Leitura em Blocos'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">⚡ 📖</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Não leia palavras, leia <strong>sentidos</strong>. Seu
                  cérebro é capaz de captar 3 ou 4 palavras de uma vez como se
                  fosse uma foto."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                      Subvocalização (Vício)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Ler em voz alta na cabeça."
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Visão Periférica (Elite)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Captar blocos de 3+ palavras."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Velocidade Tática",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics:
              "[Host] - Ler rápido não é correr, é saber o que ignorar...",
          }}
          variant={mv[5]}
        />

        <QuizInterativo
          questoes={quizM5}
          titulo="QUIZ: Coesão Referencial"
          icone="⚡"
          numero={6}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
          variant={mv[5]}
        />
      </TabsContent>

      {/* ─── MÓDULO 6: AS ENTRELINHAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="As Entrelinhas (Inferência)"
          descricao="A arte de ler o que não foi escrito, mas foi 'pago' para ser entendido. Pressupostos vs Subentendidos."
          variant={mv[6]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="As Entrelinhas: A Subjetividade Objetiva"
            description="Aprenda a ler o que não foi escrito com tinta, mas está assinado pela intenção do autor."
            variant={mv[6]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Muitos candidatos acreditam que a interpretação é um campo de
              "achismo" ou opinião subjetiva. Para a CESGRANRIO, contudo, as
              entrelinhas são <strong>matemáticas</strong>. Elas dependem de
              gatilhos gramaticais e lógicos chamados pressupostos e
              subentendidos. Dominar essa distinção é o que separa o palpiteiro
              do analista de elite.
            </p>
            <p>
              O <strong>Pressuposto</strong> é uma informação que o autor não
              diz, mas que é <em>inevitavelmente verdadeira</em> para que a
              frase tenha sentido. Ele é gerado por palavras "gatilho" (ex:
              "Pedro <u>deixou</u> de fumar" inegavelmente pressupõe que ele
              fumava). Se a banca pergunta sobre um pressuposto, ela está
              pedindo algo inegociável. Negar o pressuposto é destruir a lógica
              do texto.
            </p>
            <p>
              Já o <strong>Subentendido</strong> é uma insinuação. Ele depende
              do contexto e da "maldade" do leitor, mas pode ser negado pelo
              autor sem que ele pareça mentiroso. É uma inferência provável, mas
              não obrigatória. A banca adora colocar subentendidos extremamente
              sedutores em alternativas falsas para te levar ao erro de{" "}
              <em>Extrapolação</em>.
            </p>
            <p>
              Nas provas da Petrobras, o foco costuma recair sobre os
              pressupostos gerados por advérbios (ainda, já, agora) e verbos de
              mudança de estado. Detectar que "A produção <u>ainda</u> não
              atingiu o ápice" pressupõe que ela vai atingir ou que se espera
              que atinja, é a chave para matar questões de alta complexidade
              analítica em segundos.
            </p>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🔍 Radar de Entrelinhas: O Filtro de Prova
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Passo 1:</strong> Identifique se a pergunta pede "O
                  que se afirma" (Explícito) ou "O que se infere" (Implícito).
                </li>
                <li>
                  <strong>Passo 2:</strong> Sublinhe palavras de mudança
                  (voltou, deixou, continua, passou a).
                </li>
                <li>
                  <strong>Passo 3:</strong> Teste da Negação: Se eu disser que a
                  ideia é falsa, a frase original do texto continua fazendo
                  sentido? Se não, é um Pressuposto.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Lógica de Detecção"
            description="Não é 'achismo'. É dedução lógica baseada em marcas gramaticais."
            variant={mv[6]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-cyan-500/10 rounded-full shadow-inner ring-1 ring-cyan-500/20">
                    <LuSearch className="w-12 h-12 text-cyan-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    Pressuposto
                  </span>
                  <span className="text-sm font-medium text-cyan-500/80">
                    A Matemática do Texto
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-cyan-500 flex items-center gap-2 border-b border-cyan-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuCheck className="w-5 h-5" /> DEDUÇÃO OBRIGATÓRIA
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Informação que o texto não diz com todas as letras, mas que
                    é <strong>logicamente blindada</strong> pela gramática
                    (verbos e advérbios). Negá-la destrói o sentido original.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-cyan-500">
                    <p className="text-sm italic opacity-90">
                      "O vazamento na P-53 <strong>voltou</strong> a preocupar."{" "}
                      <br />→ Pressuposto cravado: Antes já havia preocupado.
                    </p>
                  </div>
                </div>
              }
              categoria="As Entrelinhas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                  <div className="p-5 bg-teal-500/10 rounded-full shadow-inner ring-1 ring-teal-500/20">
                    <LuFileCheck className="w-12 h-12 text-teal-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground mt-2">
                    Subentendido
                  </span>
                  <span className="text-sm font-medium text-teal-500/80">
                    O Perigo da Insinuação
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-teal-500 flex items-center gap-2 border-b border-teal-500/10 pb-3 uppercase tracking-wide text-sm">
                    <LuShieldAlert className="w-5 h-5" /> DEDUÇÃO PROVÁVEL
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Insinuação que depende exclusivamente do contexto. Como não
                    possui "trava" gramatical, o autor pode negar. Bancas
                    utilizam para induzir a quebra de foco.
                  </p>
                  <div className="bg-muted/40 p-4 rounded-xl border-l-2 border-teal-500">
                    <p className="text-sm italic opacity-90">
                      A CESGRANRIO usa subentendidos gritantes nas alternativas
                      A e B. Eles parecem fazer sentido na via lógica, mas sem a
                      prova material, ignore-os. Recuse a "criatividade".
                    </p>
                  </div>
                </div>
              }
              categoria="As Entrelinhas"
            />
          </div>
          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-cyan-600 flex items-center gap-2">
              <LuSearch className="w-5 h-5" /> Gatilhos de Inferência
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-sm transition hover:shadow-md">
                <span className="font-extrabold text-cyan-700 dark:text-cyan-400 block mb-2 uppercase tracking-wide text-xs">
                  Verbos Mutadores
                </span>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Marcadores como 'parou', 'voltou', 'deixou de', 'passou a'.
                  Eles amarram passado e presente indissociavelmente.
                </p>
              </div>
              <div className="p-5 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800 shadow-sm transition hover:shadow-md">
                <span className="font-extrabold text-sky-700 dark:text-sky-400 block mb-2 uppercase tracking-wide text-xs">
                  Advérbios Condutores
                </span>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  'Ainda', 'já', 'agora', 'finalmente'. O 'ainda' é o rei da
                  banca, pois embute que uma virada está prevista.
                </p>
              </div>
              <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 shadow-sm transition hover:shadow-md">
                <span className="font-extrabold text-teal-700 dark:text-teal-400 block mb-2 uppercase tracking-wide text-xs">
                  Ajetivos Avaliativos
                </span>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  'O desastroso', 'a incensada'. Se o texto crava um adjetivo
                  desse peso, há um pressuposto de julgamento prévio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[6]}
          titulo="Laboratório de Inferência"
          subtitulo="Extraia o pressuposto oculto na frase operacional."
          legenda={[{ cor: "bg-cyan-500", label: "Marca de Pressuposto" }]}
          texto={
            <>
              "A Petrobras{" "}
              <span className="bg-cyan-500/20 px-1 rounded border border-cyan-500/30 font-bold italic">
                continuará
              </span>{" "}
              investindo em refino sustentável." (Pressuposto: Já investe hoje).
            </>
          }
        />

        <ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Arte das Entrelinhas: Pressupostos e Subentendidos",
            duration: "08:15",
            thumbnail:
              "https://images.unsplash.com/photo-1454165833767-023023e1e2d1?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Anatomia da Inferência",
                type: "Diagrama",
                placeholderColor: "bg-cyan-900/10",
              },
              {
                title: "Mapa 2: Gatilhos Gramaticais",
                type: "Infográfico",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Mapa 3: Filtro de Verdade",
                type: "Tático",
                placeholderColor: "bg-teal-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Detetive Textual'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🕵️‍♂️ 🔍</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O Pressuposto é o que está{" "}
                  <strong>escrito com tinta invisível</strong> (obrigatório). O
                  Subentendido é o que o autor quer que você{" "}
                  <strong>pense</strong> (sugestão)."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                      Pressuposto (Gramática)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A Petrobras **voltou** a crescer."
                    </p>
                    <p className="text-sm mt-2 font-medium text-cyan-700 dark:text-cyan-300">
                      INDICADOR: O verbo 'voltar' garante que ela não crescia.
                      ✅
                    </p>
                  </div>
                  <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">
                      Subentendido (Contexto)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "Está calor aqui dentro, não acha?"
                    </p>
                    <p className="text-sm mt-2 font-medium text-teal-700 dark:text-teal-300">
                      INDICADOR: Sugestão de abrir a janela. Pode ser negado. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Detetive de Entrelinhas",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Dica] - Se o autor diz que algo 'parou', pressupõe-se que ocorria antes...",
          }}
          variant={mv[6]}
        />

        <QuizInterativo
          questoes={quizM6}
          titulo="QUIZ: Pistas e Entrelinhas"
          icone="🕵️"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
          variant={mv[6]}
        />
      </TabsContent>

      {/* ─── MÓDULO 7: AS AMEAÇAS TRIPLAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="As Ameaças Triplas"
          descricao="Redução, Extrapolação e Contradição. Detecte os venenos das alternativas falsas lógicas."
          variant={mv[7]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="A Trindade do Erro: Detectando Venenos"
            description="Mapeie os caminhos falsos da banca e blinde sua mente contra Redução, Extrapolação e Contradição."
            variant={mv[7]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              A CESGRANRIO não cria alternativas erradas de forma aleatória; ela
              utiliza uma engenharia de distrações baseada em três vícios
              lógicos capitais. Aprender a dar nome ao erro de uma alternativa
              falsa é o <strong>poder definitivo</strong> do candidato de elite.
              Quando você para de procurar a certa e começa a identificar por
              que as outras quatro são venenosas, sua taxa de acerto beira os
              100%.
            </p>
            <p>
              O primeiro erro é a <strong>Redução</strong>: a alternativa diz
              algo que está no texto, mas é apenas uma parte pequena da verdade.
              Ela ignora a conclusão principal ou foca num detalhe acessório,
              tornando a resposta incompleta (e, portanto, errada). É a famosa
              "meio-certo" que seduz o candidato apressado que leu o texto
              apenas uma vez.
            </p>
            <p>
              O segundo e mais perigoso é a <strong>Extrapolação</strong>: a
              alternativa faz todo o sentido do mundo, é lógica, é "bonita" e
              pode até ser uma verdade científica... mas{" "}
              <em>não foi escrita no texto</em>. O examinador usa seu
              conhecimento prévio sobre a Petrobras ou sobre o Brasil para te
              fazer marcar algo que o autor jamais disse. Se não está no papel,
              é mentira para a prova!
            </p>
            <p>
              Por fim, temos a <strong>Contradição</strong>: a banca inverte o
              sinal lógico. Troca um "sempre" por "quase sempre", ou afirma que
              o autor defende X quando, na verdade, ele o cita apenas para
              refutá-lo logo em seguida. Identificar esses desvios de rota exige
              foco total nos conectivos de oposição (mas, porém, contudo).
            </p>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🛡️ Filtro de Blindagem de Alternativas
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
                <li>
                  <strong>Redução:</strong> "Isso aconteceu, mas é o foco
                  principal da pergunta?"
                </li>
                <li>
                  <strong>Extrapolação:</strong> "Onde exatamente no texto está
                  a palavra que prova isso?"
                </li>
                <li>
                  <strong>Contradição:</strong> "O autor concorda com isso ou
                  está citando alguém para criticar?"
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Trindade do Erro"
            description="As três formas clássicas que a Cesgranrio usa para invalidar uma interpretação correta."
            variant={mv[7]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuShieldAlert className="w-10 h-10 text-orange-500" />
                  </div>
                  <span className="text-xl font-black uppercase tracking-widest text-foreground mt-2">
                    1. Redução
                  </span>
                  <span className="text-sm font-medium text-orange-500/80">
                    O "Meio-Certo"
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-orange-500 flex items-center gap-2 border-b border-orange-500/10 pb-3 uppercase tracking-wide text-xs">
                    <LuCheck className="w-4 h-4" /> VERDADE INCOMPLETA
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A afirmação está no texto, porém foca apenas em uma{" "}
                    <strong>fração minoritária</strong> do argumento principal,
                    ignorando a conclusão macroecônomica ou central.
                  </p>
                  <div className="bg-muted/40 p-3 rounded-xl border-l-2 border-orange-500">
                    <p className="text-sm italic opacity-90">
                      Ao restringir a ideia do autor, a banca cria uma resposta
                      que não abrange a magnitude do enunciado.
                    </p>
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuSearch className="w-10 h-10 text-red-500" />
                  </div>
                  <span className="text-xl font-black uppercase tracking-widest text-foreground mt-2">
                    2. Extrapolação
                  </span>
                  <span className="text-sm font-medium text-red-500/80">
                    A Ilusão Lógica
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-red-500 flex items-center gap-2 border-b border-red-500/10 pb-3 uppercase tracking-wide text-xs">
                    <LuShieldAlert className="w-4 h-4" /> O ACHISMO GOURMET
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Traz informações verídicas sobre o Brasil ou o mundo que
                    fazem total sentido, mas que{" "}
                    <strong>jamais foram citadas</strong> no texto original.
                  </p>
                  <div className="bg-muted/40 p-3 rounded-xl border-l-2 border-red-500">
                    <p className="text-sm italic opacity-90">
                      O avaliador explora o ego do candidato que tenta
                      demonstrar conhecimentos gerais ao invés de se ater ao
                      documento base.
                    </p>
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
                  <div className="p-4 bg-rose-500/10 rounded-full shadow-inner ring-1 ring-rose-500/20">
                    <LuTarget className="w-10 h-10 text-rose-500" />
                  </div>
                  <span className="text-xl font-black uppercase tracking-widest text-foreground mt-2">
                    3. Contradição
                  </span>
                  <span className="text-sm font-medium text-rose-500/80">
                    A Rota Oposta
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                  <p className="font-bold text-rose-500 flex items-center gap-2 border-b border-rose-500/10 pb-3 uppercase tracking-wide text-xs">
                    <LuShieldAlert className="w-4 h-4" /> INVERSÃO DE VALORES
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A afirmação cruza perpendicularmente a tese do autor,
                    normalmente ocultando uma negação ou alterando o escopo por
                    intermédio de restritivos (somente, nada).
                  </p>
                  <div className="bg-muted/40 p-3 rounded-xl border-l-2 border-rose-500">
                    <p className="text-sm italic opacity-90">
                      Geralmente, o autor cita o ponto falso durante o
                      embasamento apenas para refutá-lo como "falácia" nas
                      linhas vitais.
                    </p>
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <LuShieldAlert className="w-5 h-5" /> Regra de Ouro: A Blindagem
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">1.</span>
                <span>
                  Ignore o seu conhecimento prévio sobre o tema da Petrobras.
                  Responda apenas com o texto.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">2.</span>
                <span>
                  Se houver 2 'certas', a mais completa vence (evite a Redução).
                </span>
              </li>
            </ul>
          </div>
        </section>

        <TextAnalysisLab
          index={3}
          variant={mv[7]}
          titulo="Scanner de Ameaças"
          subtitulo="Identifique por que as alternativas abaixo seriam invalidadas."
          legenda={[{ cor: "bg-red-500", label: "Contradição Direta" }]}
          texto={
            <>
              Texto: "A Petrobras reduziu custos." <br />
              Alt A: "A Petrobras{" "}
              <span className="bg-red-500/20 px-1 rounded border border-red-500/30 font-bold italic text-red-700">
                ignorou a economia
              </span>{" "}
              de custos."
            </>
          }
        />

        <ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Campo Minado: Evitando Redução, Extrapolação e Contradição",
            duration: "09:10",
            thumbnail:
              "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Radar de Erros",
                type: "Diagrama",
                placeholderColor: "bg-red-900/10",
              },
              {
                title: "Mapa 2: Blindagem Lógica",
                type: "Infográfico",
                placeholderColor: "bg-rose-900/10",
              },
              {
                title: "Mapa 3: Checkpoint de Questão",
                type: "Tático",
                placeholderColor: "bg-orange-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Desarmador de Bombas'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🚫 💣</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A alternativa incorreta é um campo minado. A{" "}
                  <strong>Redução</strong> esconde a carga total, a{" "}
                  <strong>Extrapolação</strong> traz reforços de fora e a{" "}
                  <strong>Contradição</strong> é fogo amigo."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                      Extrapolação (Mais comum)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A energia nuclear é o futuro do Brasil." (O texto só
                      citou que é uma opção).
                    </p>
                    <p className="text-sm mt-2 font-medium text-orange-700 dark:text-orange-300">
                      PERIGO: Parece lógico, mas NÃO está no texto. ❌
                    </p>
                  </div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">
                      Fidelidade (Regra de Ouro)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A energia nuclear é uma das opções citadas."
                    </p>
                    <p className="text-sm mt-2 font-medium text-rose-700 dark:text-rose-300">
                      INDICADOR: Limita-se ao que foi DE fato escrito. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Radar de Armadilhas (Módulo 7)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
A prova é um campo com minas no chão 
Extrapolar é a maior tentação 
Cuidado com o "Sempre" e com o "Jamais" 
Pois o autor quase nunca diz tanto assim, rapaz! 

Tem a Redução que te conta a metade 
Esconde o que falta pra ser a verdade 
E a Contradição que te diz o contrário 
Pra te confundir e te fazer de otário 

[Pre-Chorus]
Se o texto não disse, não tente inventar 
Dentro do limite você tem que ficar! 

[Chorus]
Liga o radar, olha a armadilha 
A Cesgranrio joga com a matilha 
Se é Redução, falta informação 
Se Extrapolou, viajou na diversão 

Mantenha a calma, use a blindagem 
Não caia no truque dessa miragem 
Fique no texto, siga o que foi dito 
E vença esse jogo, que hoje tá bonito!`,
          }}
          variant={mv[7]}
        />

        <QuizInterativo
          questoes={quizM7}
          titulo="QUIZ: As Ameaças Triplas"
          icone="🚫"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
          variant={mv[7]}
        />
      </TabsContent>

      {/* ─── MÓDULO 8: INTENÇÃO AUTORAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Intenção Autoral"
          descricao="Para que o texto foi escrito? Decifre a finalidade principal e o tom do autor."
          variant={mv[8]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="Intenção Autoral: O 'Porquê' Invisível"
            description="Decifre a finalidade real do texto para antecipar o gabarito. O autor quer informar, convencer ou apenas criticar?"
            variant={mv[8]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Nenhum texto nasce no vácuo. Cada vírgula em um editorial de
              jornal ou em um relatório de sustentabilidade da Petrobras possui
              uma <strong>Intencionalidade</strong>. Identificar esse propósito
              primário é o atalho para entender qual será o foco das perguntas
              de interpretação profunda da banca.
            </p>
            <p>
              A <strong>Finalidade Informativa (Expositiva)</strong> é neutra. O
              autor quer que você saiba fatos, dados e processos. Aqui, a
              interpretação é quase sempre literal. Mas quando entramos na{" "}
              <strong>Finalidade Persuasiva (Argumentativa)</strong>, o autor
              quer que você mude de opinião ou apoie uma tese. Nesses casos, a
              banca focará nas estratégias de convencimento e no uso de
              adjetivos valorativos.
            </p>
            <p>
              O <strong>Tom do Texto</strong> (irônico, sério, institucional,
              crítico) é revelado através das marcas de subjetividade. O uso de
              aspas para destacar termos, por exemplo, é um sinal clássico de
              ironia ou distanciamento crítico que a CESGRANRIO adora cobrar.
              Identificar que o autor está sendo sarcástico muda completamente o
              valor de verdade das frases.
            </p>
            <p>
              Um erro comum é projetar uma intenção que não existe. Se o texto é
              um manual técnico, ele é <em>instrucional/injuntivo</em>; não
              procure profundidade filosófica ou ironia onde o objetivo é apenas
              garantir a segurança operacional. Mantenha seu radar calibrado
              para o Gênero do texto.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🎯 Tática de Intencionalidade
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Pergunta Chave:</strong> "Se este texto desaparecesse,
                  o que o mundo deixaria de saber ou de ser convencido?"
                </li>
                <li>
                  <strong>Marcadores de Tom:</strong> Fique atento a advérbios
                  de modo e adjetivos desnecessários à informação pura (ex:
                  "triste realidade" vs "realidade").
                </li>
                <li>
                  <strong>Uso de Aspas:</strong> Se houver aspas num texto
                  opinativo, presuma ironia até que se prove o contrário.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Vontade por Trás das Palavras"
            description="Identificar o objetivo (informativo, persuasivo ou crítico) é 50% da questão."
            variant={mv[8]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuTarget className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">
                      Informativo vs. Persuasivo
                    </h6>
                    <p className="text-lg font-medium opacity-80">
                      Qual o objetivo real do autor?
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    O texto **informativo** apenas relata fatos (neutro). O
                    **persuasivo** quer mudar sua opinião ou convencer de uma
                    tese (subjetivo).
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Dica: Textos da Petrobras costumam ser Informativos, mas com
                    tom 'Institucional' (positivo).
                  </div>
                </div>
              }
              categoria="Intenção Autoral"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuBrain className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">
                      Crítico vs. Elogioso
                    </h6>
                    <p className="text-lg font-medium opacity-80">
                      O tom das palavras escolhidas.
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    A escolha de adjetivos indica o tom. O uso de **aspas**
                    quase sempre indica ironia ou distanciamento crítico da
                    banca.
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Atenção: A Cesgranrio adora perguntar sobre o 'efeito de
                    sentido' de um termo entre aspas.
                  </div>
                </div>
              }
              categoria="Intenção Autoral"
            />
          </div>

          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <LuTarget className="w-5 h-5" /> Foco na Finalidade
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-lg text-blue-800 dark:text-blue-300">
                <strong>Dica de Ouro:</strong> Procure pelo verbo de ação na
                conclusão. Se o autor termina com solicitações ou visões de
                futuro, a intenção é <strong>propositiva</strong>. Se termina
                apenas com dados, é <strong>expositiva</strong>.
              </p>
            </div>
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[8]}
          titulo="Laboratório de Tom"
          subtitulo="Identifique se o autor está sendo irônico, sério ou apenas relatando."
          legenda={[{ cor: "bg-blue-500", label: "Marca de Intencionalidade" }]}
          texto={
            <>
              "É{" "}
              <span className="bg-blue-500/20 px-1 rounded border border-blue-500/30 font-bold italic text-blue-700">
                curioso
              </span>{" "}
              que, após anos de silêncio, o setor subitamente redescobriu a
              ética." (Tom: Irônico/Crítico).
            </>
          }
        />

        <ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Vontade do Autor: Decifrando Intenção e Tons",
            duration: "06:15",
            thumbnail:
              "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Espectro de Tons",
                type: "Diagrama",
                placeholderColor: "bg-blue-900/10",
              },
              {
                title: "Mapa 2: Marcadores de Opinião",
                type: "Infográfico",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Mapa 3: Finalidades do Texto",
                type: "Tático",
                placeholderColor: "bg-indigo-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Mira Autoral'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🎯 🧠</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A intenção é o alvo do autor. Se ele usa aspas ou
                  'supostamente', o tom é <strong>irônico</strong>. Se ele só
                  usa dados, o tom é <strong>expositivo</strong>."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Ironia (Armadilha)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "O 'genial' plano resultou em prejuízo."
                    </p>
                    <p className="text-sm mt-2 font-medium text-blue-700 dark:text-blue-300">
                      INDICADOR: Aspas no 'genial' desmentem o elogio. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-600 dark:text-sky-400 mb-2">
                      Informativo (Neutralidade)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A empresa registrou lucro de 10%."
                    </p>
                    <p className="text-sm mt-2 font-medium text-sky-700 dark:text-sky-300">
                      INDICADOR: Fatos matemáticos sem adjetivos. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "A Mira do Autor (Módulo 8)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Por trás de cada linha tem um coração 
Uma vontade louca ou uma opinião 
Se o autor quer te dar informação 
Ele limpa os adjetivos da sua visão 

Mas se ele usa aspas pra ironizar 
Ou verbos de comando pra te persuadir 
A intenção tá lá, pronta pra brilhar 
Basta você saber pra onde ela vai fugir 

[Pre-Chorus]
É um tom irônico ou é institucional? 
Mapeia o adjetivo e acerta o final! 

[Chorus]
Na mira do autor, veja o objetivo 
Pode ser irônico ou só descritivo 
Ele quer te convencer ou só te relatar? 
A intenção é a chave pra você passar 

Mira no alvo, busca a finalidade 
Entre o fato puro e a subjetividade 
Decifre o tom, ganhe a questão 
E mostre pro mundo sua superação!`,
          }}
          variant={mv[8]}
        />

        <QuizInterativo
          questoes={quizM8}
          titulo="QUIZ: A Lógica CESGRANRIO"
          icone="🎯"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
          variant={mv[8]}
        />
      </TabsContent>

      {/* ─── MÓDULO 9: A LÓGICA CESGRANRIO (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="A Lógica Cesgranrio"
          descricao="O DNA das questões. Mapeamento de sinônimos técnicos e eixos temáticos repetitivos."
          variant={mv[9]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="Algoritmo da Aprovação: Checklist Operacional"
            description="Passe do olhar selvagem para uma arquitetura robótica inabalável de validação analítica."
            variant={mv[9]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O segredo das performances extremas na leitura da CESGRANRIO se
              deve à automação de metodologias procedimentais, descartando
              fluxos de genialidade natural, adotando engrenagens matemáticas
              rígidas para lidar com "achismos". É fundamental possuir o próprio
              Framework/Protocolo validatório da alternativa correta para evitar
              perdas cognitivas e hesitações durante provas imersas em grandes
              perdas de carga de bateria metabólica de exauridos examinandos.
            </p>
            <p>
              O Procedimento se instaura logo na Leitura Diagnóstica. Não leia
              como ler um romance (passivo interativo agradável); realize
              escaneamento agressivo e utilitário, com lápis grafite a punho
              atacando conjunções vitais e Tópicos Frasais, traçando boxes
              marcadores naqueles núcleos duros que revelam, sem ressalvas, se o
              Autor inclina sua defesa à pauta X ou apoia a refutação por
              argumentação baseada em Y. O resumo parágrafo a parágrafo de três
              vocábulos sela tudo isso metodologicamente!
            </p>
            <p>
              Avance posteriormente na dissecação modular do Problema de Prova.
              Quando questionado sobre interpretações inferidoras, evite
              reprocessar fragmentos amplos em tela cheia na sua mente. Delimite
              as demarcações exatas de escopo! Refutem premissas isoladamente em
              cada "letra": verifique a baliza e o eixo ("Se citou evento A do
              texto sendo justificado pelo viés de C da Letra K" - a menção
              central ocorreu? Sim. O referencial temporal se confirma? Sim. A
              motivação declarada é espelho do texto originário? Não).
              Conclusão: "X" nessa assertiva sem sofrimento!
            </p>
            <p>
              Pela mecânica das grandes estatais como Petrobras e Transpetro, a
              disciplina técnica rege a perfeição. Ao duvidar furiosamente entre
              duas alternativas paradoxais, execute sempre à Lei do Tribunal
              Textual Evidenciatório (O lastro). O examinador o ataca com
              interpretações dúbias altamente possíveis... não discuta; apenas
              demande imediatamente a palavra "escrita" textualmente (Pista
              Material Base) capaz de abalizar perante um júri racional qual
              opção reside verdadeiramente sob um ancoradouro dissecável.
            </p>
            <div className="bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/80 dark:to-gray-900/80 rounded-lg border border-slate-300 dark:border-slate-700 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                Checklist das Boas Práticas Absolutas de Concurso
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
                <li>
                  Inspecione enunciados identificando a demanda restritiva
                  geográfica ou tipológica ANTES.
                </li>
                <li>
                  A detecção das sinalizações coesivas (conectivos causais e de
                  transição e oposição).
                </li>
                <li>
                  Vigilância máxima e total às ameaças universalistas do léxico
                  e alternativas reducionistas.
                </li>
                <li>
                  Sustentação na matriz explícita de "Tribunal Textual Base"
                  diante do perigo inferidor difuso.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="Sinônimos Técnicos"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-blue-500 block">
                    VOCABULÁRIO
                  </span>
                  <p className="text-lg">
                    A banca troca 'fomentar' por 'estimular', 'negligenciar' por
                    'omitir'. Domine a lista de 50 verbos recorrentes da
                    Cesgranrio.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="Eixos Temáticos"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-indigo-500 block">
                    RECORRÊNCIA
                  </span>
                  <p className="text-lg">
                    90% dos textos giram em torno de: Transição Energética,
                    Sustentabilidade e Inovação Tecnológica na Indústria.
                  </p>
                </div>
              }
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
              <LuSearch className="w-5 h-5" /> Radar de Questão
            </h4>
            <p className="text-lg">
              Sempre que aparecer um termo entre aspas no texto, a Cesgranrio
              perguntará sobre a <strong>ressignificação</strong> ou o{" "}
              <strong>efeito de sentido</strong> desse termo no contexto.
            </p>
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          variant={mv[9]}
          titulo="Scanner de Sinônimos"
          subtitulo="Mapeie as trocas permitidas pela banca."
          legenda={[{ cor: "bg-blue-500", label: "Equivalência Semântica" }]}
          texto={
            <>
              Texto: "A gestão{" "}
              <span className="bg-blue-500/20 px-1 rounded border border-blue-500/30 font-bold italic text-blue-700">
                viabilizou
              </span>{" "}
              o projeto." <br />A banca aceitará: "A gestão{" "}
              <span className="underline underline-offset-4 decoration-blue-500">
                tornou possível
              </span>
              ..."
            </>
          }
        />

        <ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "O Filtro Cesgranrio: Sinônimos e Eixos Temáticos",
            duration: "08:45",
            thumbnail:
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Dicionário de Sinônimos da Banca",
                type: "Tático",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
                placeholderColor: "bg-blue-900/10",
              },
              {
                title: "Temas Recorrentes na Petrobras",
                type: "Infográfico",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Eixos de Comando Textual",
                type: "Diagrama",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
                placeholderColor: "bg-indigo-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Troca de Peças'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🧩 🔄</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A lógica da banca é a <strong>equivalência</strong>. Se ela
                  troca 'viabilizar' por 'tornar possível', ela está testando
                  sua agilidade semântica, não sua criatividade."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Fomentar (Cesgranrio)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "É preciso fomentar o debate."
                    </p>
                    <p className="text-sm mt-2 font-medium text-blue-700 dark:text-blue-300">
                      EQUIVALENTE: Estimular / Promover. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Negligenciar (Cesgranrio)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A gestão negligenciou os dados."
                    </p>
                    <p className="text-sm mt-2 font-medium text-indigo-700 dark:text-indigo-300">
                      EQUIVALENTE: Omitir / Desconsiderar. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Troca de Peças (Módulo 9)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Mudar a palavra sem mudar o sentido 
É o desafio que te deixa aturdido 
"Viabilizar" é "tornar possível" 
Um vocabulário que te faz invencível 

Se o texto diz "fomentar" o debate 
É "promover" que a alternativa abate 
"Negligenciar" é "deixar de lado" 
Fique esperto pra não ser enganado! 

[Pre-Chorus]
É a semântica, o jogo das palavras 
Derrubando muros, abrindo as lavras! 

[Chorus]
Na troca de peças, o sentido se mantém 
Sinônimo técnico que te leva o bem 
Não é o que parece, é o que ele traduz 
Mapeia a troca e enxergue a luz 

A peça encaixa, o quebra-cabeça 
Faz com que a questão rápido apareça 
Mude a palavra, segure o valor 
E saia da prova como um vencedor!`,
          }}
          variant={mv[9]}
        />

        <QuizInterativo
          questoes={quizM9}
          titulo="QUIZ: Checklist Tático"
          icone="🧠"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
          variant={mv[9]}
        />
      </TabsContent>

      {/* ─── MÓDULO 10: ARENA DE ELITE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="A prova final. O Checklist de Blindagem antes do grande desafio."
          variant={mv[10]}
        />

        {/* ★ NOVO: Rich Intro Section */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
          <ModuleSectionHeader
            index="INTRO"
            title="Arena de Elite: Blindagem Final"
            description="O checklist de pré-combate para garantir que nenhum vício ou pegadinha te tire do topo da lista."
            variant={mv[10]}
          />
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              Você chegou à <strong>Arena de Elite</strong>. Agora, o
              conhecimento teórico deve ser convertido em reflexo operacional.
              Em uma prova da Petrobras, o cansaço acumulado nas últimas
              questões de Português é o que causa as falhas de atenção mais
              fatais. Sua blindagem final depende de um processo rígido e
              mecânico de resolução que ignora o estresse do ambiente.
            </p>
            <p>
              O primeiro pilar da blindagem é a{" "}
              <strong>Hierarquia de Comandos</strong>. Leia o enunciado antes do
              texto. Identifique se a questão demanda{" "}
              <em>localização literal</em> ou <em>inferência global</em>. Se for
              localização, vá direto ao parágrafo citado com o olhar de "busca e
              apreensão"; se for global, recupere o Tópico Frasal de cada bloco
              que você mapeou na sua Leitura Diagnóstica.
            </p>
            <p>
              O segundo pilar é a <strong>Lei do Lastro Material</strong>.
              Nunca, sob hipótese alguma, escolha uma alternativa baseada apenas
              no seu "feeling". Você deve ser capaz de sublinhar no texto a
              prova material que autoriza aquela resposta. Se você não consegue
              apontar o dedo para a palavra ou conectivo que sustenta a opção,
              você está em zona de risco de Extrapolação.
            </p>
            <p>
              Por fim, lembre-se da <strong>Gestão de Tempo Crítico</strong>.
              Questões de interpretação podem ser buracos negros de tempo se
              você deixar. Se travou entre duas alternativas, use o Filtro de
              Venenos do Módulo 7. Se ainda assim persistir a dúvida, marque o
              radar e avance. O subconsciente muitas vezes resolve o paradoxo
              enquanto você processa outras questões mais simples.
            </p>
            <div className="bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-slate-950/30 dark:to-zinc-950/30 rounded-lg border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                🛡️ Checklist de Saída para a Prova
              </h4>
              <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
                <li>Enunciado lido e demanda (Geral vs Local) identificada?</li>
                <li>Tópicos Frasais isolados e adjetivos de tom circulados?</li>
                <li>
                  Alternativas falsas classificadas
                  (Redução/Extrapolação/Contradição)?
                </li>
                <li>A alternativa escolhida tem prova física no papel?</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Checklist de Blindagem Final"
            description="Revise os 5 mandamentos da interpretação Cesgranrio antes de começar."
            variant={mv[10]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuEye className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    1. Olhar de Raio-X
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-zinc-100">
                    Sua primeira missão é identificar se a questão pede o
                    **sentido global** (o texto todo) ou **localizado** (uma
                    linha específica).
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary font-bold">
                    Check: Leia o comando da questão 2x antes de ir ao texto.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuShieldAlert className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    2. Filtro Anti-Achismo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-zinc-100">
                    Corte toda informação que não está escrita. Se a alternativa
                    fizer sentido mas **não tiver prova no texto**, ela é
                    Extrapolação.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary font-bold">
                    Regra: O texto é sua única verdade. O que você sabe de fora
                    não conta.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTarget className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    3. Radar de Sinônimos
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-zinc-100">
                    Fique atento à troca de verbos técnicos. A banca substitui
                    termos para ver se você entende a **equivalência semântica**
                    no contexto industrial.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary font-bold">
                    Dica: Domine verbos como 'viabilizar', 'fomentar' e
                    'negligenciar'.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
          </div>

          <div className="bg-orange-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-orange-200 dark:border-primary/20">
            <h4 className="font-bold text-orange-700 dark:text-primary mb-3 flex items-center gap-2">
              <LuTrophy className="w-5 h-5" /> Mensagem Especial: A Blindagem
            </h4>
            <p className="text-lg italic text-muted-foreground">
              "A interpretação na Petrobras não é sobre adivinhação, é sobre
              **mapeamento**. Se você utilizou as técnicas deste dossiê, o
              gabarito é apenas uma consequência lógica. Boa sorte na Arena." -
              Professor IA.
            </p>
          </div>
        </section>

        <ModuleConsolidation
          index={2}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Checklist de Elite: A Blindagem Final",
            duration: "07:30",
            thumbnail:
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Fluxograma de Resposta Eficiente",
                type: "Diagrama",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
                placeholderColor: "bg-amber-900/10",
              },
              {
                title: "Filtro de Eliminação Rápida",
                type: "Tático",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
                placeholderColor: "bg-orange-900/10",
              },
              {
                title: "Checklist de Ouro da Aprovação",
                type: "Infográfico",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
                placeholderColor: "bg-yellow-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Vencedor da Arena'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">👑 🚀</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Você agora é um <strong>Mestre da Exegese</strong>. A prova
                  não é sobre o que você acha, é sobre o que o texto permite.
                  Confie no Dossiê e blinde sua nota."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                      A Tática do Descarte
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Não busque a certa, elimine as erradas por Redução,
                      Extrapolação ou Contradição. Sobrará a verdade.
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Foco no Comando
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Responda o que o enunciado pediu, não o que o texto diz em
                      outras partes. O comando é soberano.
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Gabaritando a Arena (Módulo 10)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Chegou a hora, o momento final 
A prova te espera, o clima é real 
Mapeou o parágrafo, achou a viga 
Agora é na Arena que a gente briga 

Lembrou dos conectivos e da coesão 
Limpou o DNA da sua visão 
Vincou as entrelinhas com precisão 
Pra não cair em nenhuma redução 

[Pre-Chorus]
A blindagem tá feita, o radar tá ligado 
O seu nome na lista já tá desenhado! 

[Chorus]
Gabaritando a Arena, com a mente de elite 
Pro seu sucesso não tem mais limite 
A Petrobras chama, o sonho é real 
Interpretação mestre, nível funcional 

Dossiê completo, missão cumprida 
Uma nova etapa na sua vida 
Confia no treino, use a estratégia 
E brilhe na prova, saia da média!`,
          }}
          variant={mv[10]}
        />

        <QuizInterativo
          questoes={quizFinal}
          titulo="QUIZ: Arena de Elite"
          icone="👑"
          numero={3}
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
          variant={mv[10]}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
