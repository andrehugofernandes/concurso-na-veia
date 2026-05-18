"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  FlipCard,
  Comparison,
  TimelineItem,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

// Quizzes do arquivo de dados:
import {
  quizM1,
  quizM2,
  quizM3,
  quizM4,
  quizM5,
  quizM6,
  quizM7,
  quizM8,
  quizM9,
  quizM10,
} from "./data/web-quizzes";

export default function AulaWeb({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_web_";

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

  // Definir os módulos da aula (Padrão Premium: 10 módulos)
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos HTTP/HTTPS" },
    { id: "modulo-2", label: "Módulo 2", titulo: "HTML5 e Semântica" },
    { id: "modulo-3", label: "Módulo 3", titulo: "CSS3: Flex e Grid" },
    { id: "modulo-4", label: "Módulo 4", titulo: "JS Moderno (ES6+)" },
    { id: "modulo-5", label: "Módulo 5", titulo: "DOM e Eventos" },
    { id: "modulo-6", label: "Módulo 6", titulo: "React.js: Hooks e Estado" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Consumo de APIs REST" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Segurança Web (OWASP)" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Performance e PWA" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Acessibilidade (WCAG)" },
  ] as const;

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules(prev => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex(m => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);

  const isModuleUnlocked = (index: number) => {
      if (index === 0) return true;
      return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      isCompleted={isCompleted}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      onComplete={onComplete}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      loading={loading}
    >
      {/* ══════════════════════════════════════════════════════
          MÓDULO 1: FUNDAMENTOS HTTP
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Protocolo HTTP/HTTPS"
          descricao="A base da comunicação na Web: Verbos, Status e Cabeçalhos."
          variant={mv[1]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="A Web em Camadas"
            description="Entenda o modelo Requisição/Resposta e como a Cesgranrio cobra códigos de status."
            variant={mv[1]}
          />

          <CardCarousel
            titulo="Principais Verbos HTTP"
            cards={[
              { titulo: "GET", descricao: "Solicita um recurso. Deve ser SEGURO e IDEMPOTENTE (não altera o servidor).", icone: "📥" },
              { titulo: "POST", descricao: "Cria um novo recurso. Não é idempotente por definição.", icone: "📝" },
              { titulo: "PUT & PATCH", descricao: "PUT substitui. PATCH atualiza parcialmente. Ambos devem ser idempotentes.", icone: "🔄" },
              { titulo: "DELETE", descricao: "Remove um recurso. Também é um método idempotente.", icone: "🗑️" }
            ]}
          />

          <AlertBox tipo="info" titulo="📍 TABELA DE STATUS 📍">
            **2xx:** Sucesso (200 OK, 201 Created). <br/>
            **3xx:** Redirecionamento (301 Permanente, 302 Temporário). <br/>
            **4xx:** Erro do Cliente (401 Auth, 403 Forbidden, 404 Not Found). <br/>
            **5xx:** Erro do Servidor (500 Internal Error, 503 Unavailable).
          </AlertBox>

          <section id="quiz-modulo-1">
            <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              variant={mv[1]}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 2: HTML5
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Estrutura e Semântica HTML5"
          descricao="Indo além das divs: Organização lógica para SEO e Acessibilidade."
          variant={mv[2]}
        />

        <div className="space-y-12">
           <ModuleSectionHeader
              index="INTRO"
              title="Tags Semânticas Modernas"
              description="Cada tag tem um propósito. Utilize a correta para ser amado pelo Google."
              variant={mv[2]}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <FlipCard frente="<header> & <footer>" verso="Cabeçalho e Rodapé. Podem existir em várias seções da página." />
               <FlipCard frente="<main> & <article>" verso="Main: Conteúdo central único. Article: Conteúdo independente e reutilizável." />
               <FlipCard frente="<aside> & <nav>" verso="Aside: Conteúdo relacionado mas lateral. Nav: Links de navegação do site." />
               <FlipCard frente="<section>" verso="Agrupamento genérico de conteúdo tematicamente relacionado." />
           </div>

          <section id="quiz-modulo-2">
            <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Módulo Nº 2"
              variant={mv[2]}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 3: CSS3
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="CSS3 Moderno: Flex e Grid"
          descricao="O fim do medo dos layouts complexos e a era da responsividade."
          variant={mv[3]}
        />

        <div className="space-y-12">
            <Comparison
                title="Flexbox vs CSS Grid"
                left={{
                    title: "Flexbox (Unidimensional)",
                    content: "Ideal para componentes, menus e alinhamento simples em linha ou coluna.",
                    description: "Foco no conteúdo individual.",
                    variant: "info"
                }}
                right={{
                    title: "CSS Grid (Bidimensional)",
                    content: "Ideal para layouts complexos de página inteira (Linhas e Colunas simultâneas).",
                    description: "Foco na estrutura do container.",
                    variant: "success"
                }}
            />

            <AlertBox tipo="warning" titulo="🚨 ALERTA CESGRANRIO">
                As propriedades **justify-content** (eixo principal) e **align-items** (eixo transversal) são as campeãs de audiência em questões de Flexbox. Saiba a diferença!
            </AlertBox>

          <section id="quiz-modulo-3">
            <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Módulo Nº 3"
              variant={mv[3]}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 4: JS MODERNO
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="JavaScript ES6+ e Programação Funcional"
          descricao="A evolução da linguagem para aplicações de grande porte."
          variant={mv[4]}
        />

        <div className="space-y-12">
            <ContentAccordion
              titulo="As Novidades que Mudaram o Jogo"
              icone="⚡"
              corIndicador="bg-yellow-500"
              mode="stacked"
              slides={[
                  { titulo: "Arrow Functions", conteudo: "Sintaxe curta () => { } e léxico do 'this' preservado." },
                  { titulo: "Destructuring", conteudo: "Extração fácil de dados de arrays e objetos { nome, cargo }." },
                  { titulo: "Template Literals", conteudo: "Uso de crases e `${}` para interpolação de strings." },
                  { titulo: "Modules", conteudo: "Sistema nativo de import e export para organização de arquivos." }
              ]}
            />

          <section id="quiz-modulo-4">
            <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Módulo Nº 4"
              variant={mv[4]}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 5: DOM E EVENTOS
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="Ciclo de Eventos e Manipulação de DOM"
          descricao="Como o JavaScript interage com o HTML vivo no navegador."
          variant={mv[5]}
        />

        <div className="space-y-12">
            <div className="space-y-4">
               <TimelineItem passo={1} titulo="Fase de Captura" descricao="O evento desce do topo do documento até o elemento alvo." />
               <TimelineItem passo={2} titulo="Fase do Alvo" descricao="O evento chega ao elemento que disparou a ação." />
               <TimelineItem passo={3} titulo="Fase de Borbulhamento (Bubbling)" descricao="O evento sobe de volta para os ancestrais por padrão." isLast={true} />
            </div>

            <AlertBox tipo="danger" titulo="Stop Propagation vs Prevent Default">
                **stopPropagation()**: Impede que o evento suba (bubbling). <br/>
                **preventDefault()**: Impede o comportamento padrão (ex: link não abrir, form não dar submit).
            </AlertBox>

          <section id="quiz-modulo-5">
            <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Módulo Nº 5"
              variant={mv[5]}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 6: REACT.JS
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Pensando em Componentes: React.js"
          descricao="A biblioteca que revolucionou o desenvolvimento de interfaces."
          variant={mv[6]}
        />

        <div className="space-y-12">
            <CardCarousel
                titulo="Os Hooks Fundamentais"
                cards={[
                    { titulo: "useState", descricao: "Gerenciamento de estado local. Dispara re-render." , icone: "🔋" },
                    { titulo: "useEffect", descricao: "Execução de efeitos (APIs, timers) no ciclo de vida.", icone: "🔄" },
                    { titulo: "useContext", descricao: "Consumo de estados globais sem 'prop drilling'.", icone: "🌐" },
                    { titulo: "useMemo / useCallback", descricao: "Otimização e memorização de valores e funções.", icone: "🧠" }
                ]}
            />

            <AlertBox tipo="info" titulo="Props vs State">
                **Props:** Passadas de pai para filho. São imutáveis para quem recebe. <br/>
                **State:** Interno do componente. Pode mudar e causa nova renderização.
            </AlertBox>

          <section id="quiz-modulo-6">
            <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Módulo Nº 6"
              variant={mv[6]}
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 7: APIs REST
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Consumo de APIs e Fluxo Assíncrono"
          descricao="Conectando sua interface aos dados do servidor."
          variant={mv[7]}
        />

        <div className="space-y-12">
            <ModuleSectionHeader
                 index={1}
                 title="Promises, Async e Await"
                 description="Gerenciando a espera sem travar o navegador."
                 variant={mv[7]}
            />

            <div className="p-6 bg-slate-900 border border-border rounded-xl font-mono text-lg leading-relaxed">
                <span className="text-blue-400">async function</span> getData() {'{'}<br/>
                &nbsp;&nbsp;<span className="text-blue-400">try</span> {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">const</span> res = <span className="text-blue-400">await</span> fetch(url);<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">const</span> json = <span className="text-blue-400">await</span> res.json();<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> json;<br/>
                &nbsp;&nbsp;{'}'} <span className="text-blue-400">catch</span> (e) {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;console.error(e);<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}
            </div>

          <section id="quiz-modulo-7">
            <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Módulo Nº 7"
              variant={mv[7]}
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 8: SEGURANÇA WEB
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Segurança no Frontend: OWASP Top 10"
          descricao="Proteja os usuários de ataques comuns e vulnerabilidades críticas."
          variant={mv[8]}
        />

        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AlertBox tipo="danger" titulo="XSS (Cross-Site Scripting)">
                    Ocorre quando scripts maliciosos são injetados na página. Prevenção: Sanitização e o header CSP (Content Security Policy).
                </AlertBox>
                <AlertBox tipo="warning" titulo="CSRF (Request Forgery)">
                    Ocorre quando um site malicioso faz o navegador enviar uma requisição para outro site onde o usuário está logado. Prevenção: Tokens CSRF e SameSite cookies.
                </AlertBox>
            </div>

            <FlipCard frente="CORS" verso="Mecanismo que limita quais domínios podem fazer requisições cross-origin para o seu servidor." />

          <section id="quiz-modulo-8">
            <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Módulo Nº 8"
              variant={mv[8]}
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 9: PERFORMANCE E PWA
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="Performance e Aplicações Progressivas (PWA)"
          descricao="Entregue experiências rápidas, confiáveis e que funcionam offline."
          variant={mv[9]}
        />

        <div className="space-y-12">
             <CardCarousel
                titulo="Pilares do PWA"
                cards={[
                    { titulo: "Service Workers", descricao: "Proxy entre cliente e rede. Gerencia cache e funções offline.", icone: "👷" },
                    { titulo: "Manifest.json", descricao: "Define ícones, cores e modo stand-alone (estilo app nativo).", icone: "📄" },
                    { titulo: "HTTPS", descricao: "Obrigatório para quase todas as APIs modernas de PWA.", icone: "🔒" }
                ]}
            />
            
            <AlertBox tipo="info" titulo="Core Web Vitals">
                Foco no LCP (Carregamento), FID (Interatividade) e CLS (Estabilidade Visual). O novo padrão ouro do Google.
            </AlertBox>

          <section id="quiz-modulo-9">
            <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Módulo Nº 9"
              variant={mv[9]}
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 10: ACESSIBILIDADE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="Acessibilidade Digital (WCAG)"
          descricao="Web para todos: Princípios da inclusão e padrões ARIA."
          variant={mv[10]}
        />

        <div className="space-y-12">
            <div className="p-6 bg-slate-900 border border-border rounded-xl">
                <h5 className="font-bold text-lg mb-4 underline decoration-blue-500">Princípios WCAG (POUR)</h5>
                <ul className="space-y-4">
                    <li>🔹 <strong>P</strong>erceptível: Alternativas para áudio/vídeo, contraste.</li>
                    <li>🔹 <strong>O</strong>perável: Navegação por teclado, sem limites de tempo curtos.</li>
                    <li>🔹 <strong>U</strong>nderstandable (Compreensível): Texto legível, predição de erros.</li>
                    <li>🔹 <strong>R</strong>obusto: Compatibilidade com tecnologias assistivas atuais e futuras.</li>
                </ul>
            </div>

          <section id="quiz-modulo-10">
            <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Módulo Nº 10"
              variant={mv[10]}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          <ModuleConsolidation
            index={1}
            variant={mv[10]}
            video={{ videoId: "", title: "", duration: "" }}
            resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: titulo,
                materia: materiaNome,
                images: []
            }}
            sinteseEstrategica={{
                title: "O Princípio Web",
                content: "Estrutura no HTML, Beleza no CSS, Comportamento no JS."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
