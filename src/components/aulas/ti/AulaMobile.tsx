"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
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
} from "./data/mobile-quizzes";

export default function AulaMobile({
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_mobile_";

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Ecossistema & Segurança" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Nativo & Performance" },
    { id: "modulo-3", label: "Módulo 3", titulo: "PWA & Híbridos Pro" },
    { id: "modulo-4", label: "Módulo 4", titulo: "React Native: Architecture" },
    { id: "modulo-5", label: "Módulo 5", titulo: "RN: Advanced State" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Flutter & Dart Deep" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Flutter: Advanced Patterns" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Hardware & Background" },
    { id: "modulo-9", label: "Módulo 9", titulo: "UX/UI Design Systems" },
    { id: "modulo-10", label: "Módulo 10", titulo: "CI/CD & App Store Ops" },
  ] as const;

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
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
      isModuleUnlocked={(index) =>
        index === 0 || completedModules.has(MODULE_DEFS[index - 1].id)
      }
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
      {/* 📱 MÓDULO 1: ECOSSISTEMA & SEGURANÇA */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Análise do Ecossistema e Arquiteturas de Segurança Mobile"
          descricao="Investigação técnica sobre a arquitetura de sistemas operacionais móveis, modelos de sandboxing e protocolos de segurança de hardware."
          variant={mv[1]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="FUNDAMENTOS"
              title="Arquitetura de Sistemas e Abstração de Baixo Nível"
              variant={mv[1]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Android: Kernel Linux e Runtime (ART)
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  O sistema Android opera sobre o **Kernel Linux**, responsável pela gestão de drivers e isolamento de processos. A camada de execução atual, o **ART (Android Runtime)**, utiliza o paradigma de compilação **AOT (Ahead-of-Time)**, otimizando a performance sistêmica e a eficiência energética em comparação ao modelo interpretado.
                </p>
                <div className="p-4 bg-muted rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-mono text-center">
                    Kernel ➔ HAL ➔ ART ➔ Framework ➔ Apps
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  iOS: Arquitetura XNU e Subsistema Darwin
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Fundamentado no kernel híbrido **XNU (Darwin)**, o iOS integra hardware e software de forma simbiótica. A segurança é reforçada pelo **Secure Enclave**, um coprocessador isolado que gerencia dados biométricos e chaves criptográficas, garantindo a integridade do ecossistema.
                </p>
                <div className="p-4 bg-muted rounded-lg border-l-4 border-blue-500">
                  <p className="text-lg font-mono text-center">
                    Kernel ➔ Core OS ➔ Core Services ➔ Cocoa Touch
                  </p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Mecanismos de Isolamento e Segurança de Runtime"
              icone="🛡️"
              corIndicador="bg-red-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  titulo: "O Paradigma de Sandboxing",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        Cada aplicação é executada em um ambiente estritamente isolado. No Android, esse isolamento é imposto via **UID (User ID)** único por aplicação no nível do kernel. No iOS, o modelo de Sandbox restringe o acesso ao sistema de arquivos, exigindo permissões explícitas para interações fora do container do aplicativo.
                      </p>
                      <Comparison
                        title="Análise de Vetores de Risco: Rooting vs Jailbreaking"
                        left={{
                          title: "Rooting (Android)",
                          content: "Escalação de privilégios de superusuário no subsistema Linux.",
                          description: "Permite controle administrativo total, contudo, invalida protocolos de integridade como o Google Play Integrity (antigo SafetyNet).",
                          variant: "warning",
                        }}
                        right={{
                          title: "Jailbreaking (iOS)",
                          content: "Subversão das restrições de software impostas pela Apple.",
                          description: "Habilita a instalação de pacotes não autorizados, expondo o sistema a vulnerabilidades críticas de kernel e malwares.",
                          variant: "danger",
                        }}
                      />
                    </div>
                  ),
                },
                {
                  titulo: "Protocolos de Privacidade e Permissões Dinâmicas",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        A gestão de permissões evoluiu do modelo estático (tempo de instalação) para o modelo dinâmico (tempo de execução/runtime). Considerações fundamentais para exames:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📍</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Localização
                          </h6>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Precisão Fina (GPS) vs. Grosseira (Triangulação).
                          </p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📷</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Captura
                          </h6>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Acesso via Camera2 API (Android) ou AVFoundation (iOS).
                          </p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📂</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Persistência
                          </h6>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Scoped Storage: Restrição de acesso ao armazenamento global.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <AlertBox tipo="warning" titulo="Análise Técnica: Evolução dos Ambientes de Execução">
              A transição do Dalvik (**JIT - Just-in-Time**) para o ART (**AOT - Ahead-of-Time**) no Android representou um salto qualitativo na eficiência. Enquanto o JIT traduz o código durante a execução, o AOT compila a aplicação integralmente na instalação, reduzindo a latência de inicialização ao custo de um incremento marginal no uso de armazenamento.
            </AlertBox>
          </section>

          



          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{
              videoId: "mobile_architecture_intro",
              title: "Fundamentos de Arquitetura de Sistemas Móveis",
              duration: "15:45",
            }}
            audio={{
              artista: "Corpo Docente Especializado",
              titulo: "Protocolos de Segurança e Isolamento",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Hierarquia de Camadas Android",
                  type: "Diagrama Técnico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Hierarquia%20de%20Camadas%20Android",
                },
                {
                  title: "Arquitetura de Segurança iOS",
                  type: "Esquema Estrutural",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Arquitetura%20de%20Seguran%C3%A7a%20iOS",
                },
                {
                  title: "Vetores de Fragmentação de Mercado",
                  type: "Gráfico Analítico",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Vetores%20de%20Fragmenta%C3%A7%C3%A3o%20de%20Mercado",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes de Segurança e Conformidade",
              content: (
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>Isolamento (Sandboxing):</strong> Constitui o pilar fundamental da segurança de dados e processos.
                  </p>
                  <p>
                    <strong>Princípio do Menor Privilégio:</strong> Implementação rigorosa de permissões em tempo de execução.
                  </p>
                  <p>
                    <strong>Cadeia de Confiança:</strong> A integridade do kernel é vital; Root/Jailbreak rompem a segurança sistêmica.
                  </p>
                </div>
              ),
            }}
          />

          <QuizInterativo
            questoes={quizM1}
            titulo="Avaliação de Proficiência: Módulo 01"
            variant={mv[1]}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* 🚀 MÓDULO 2: NATIVO & PERFORMANCE */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Engenharia de Performance e Desenvolvimento Nativo"
          descricao="Análise profunda do ciclo de vida, modelos de gestão de memória (ARC/GC) e paradigmas de UI declarativa."
          variant={mv[2]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="DESEMPENHO"
              title="Parâmetros de Execução e Otimização Nativa"
              variant={mv[2]}
            />

            <ContentAccordion
              titulo="Arquiteturas de Gestão de Memória: ARC vs Garbage Collection"
              icone="🧠"
              corIndicador="bg-purple-500"
              slides={[
                {
                  titulo: "Ecossistema Apple: Automatic Reference Counting (ARC)",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg text-muted-foreground">
                        Diferente de sistemas com Garbage Collector (GC) dinâmico, o ecossistema Apple utiliza o **ARC**, que gerencia a memória em tempo de compilação, inserindo instruções de incremento e decremento de contagem de referências.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h6 className="font-bold text-lg flex items-center gap-1 uppercase tracking-tighter">
                            Strong References{" "}
                            <span className="text-red-500">
                              (Risco: Retain Cycle)
                            </span>
                          </h6>
                          <p className="text-[10px] uppercase text-muted-foreground">
                            Objetos que mantêm a retenção mútua, impedindo a desalocação e gerando vazamentos de memória.
                          </p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h6 className="font-bold text-lg flex items-center gap-1 uppercase tracking-tighter">
                            Weak / Unowned
                          </h6>
                          <p className="text-[10px] uppercase text-muted-foreground">
                            Referências que não incrementam o contador, fundamentais para a quebra de ciclos de retenção.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Ecossistema Android: Garbage Collection e Gerenciamento ART",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        O runtime **ART** implementa uma gestão automática de memória via Garbage Collection. Pontos críticos para análise:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg text-muted-foreground">
                        <li>
                          <strong>Heap Dinâmico:</strong> Alocação flexível baseada na disponibilidade de RAM do dispositivo.
                        </li>
                        <li>
                          <strong>Minimização de Pausas:</strong> O ART utiliza coletores concorrentes que reduzem significativamente o 'stop-the-world', mantendo a fluidez da UI.
                        </li>
                        <li>
                          <strong>Generational GC:</strong> Estratégia que prioriza a limpeza de objetos de curta duração (Young Generation).
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Ciclo de Vida: Análise Crítica e Gestão de Estados
              </h4>
              <p className="text-lg text-muted-foreground">
                A transição entre estados é o determinante principal para a eficiência energética e a retenção de dados voláteis.
              </p>

              <div className="space-y-8">
                <TimelineItem
                  passo={1}
                  titulo="Estado Ativo: Resumed"
                  descricao="A aplicação detém o foco do sistema. Processamento em foreground com prioridade máxima de CPU e GPU."
                />
                <TimelineItem
                  passo={2}
                  titulo="Persistência em Transição: Configuration Changes"
                  descricao="Eventos como a rotação de tela desencadeiam o ciclo de destruição e recriação da UI. O uso de ViewModels é imperativo para a manutenção do estado."
                />
                <TimelineItem
                  passo={3}
                  titulo="Estado Latente: Background (Stopped)"
                  descricao="Redução de prioridade. O sistema operacional reserva o direito de encerrar o processo para otimização de recursos globais."
                />
                <TimelineItem
                  passo={4}
                  titulo="Concorrência e Threading"
                  descricao="A Main Thread deve ser preservada exclusivamente para renderização. Processamento pesado deve ser delegado a Coroutines ou Grand Central Dispatch."
                  isLast={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-lg">
                <h5 className="font-bold border-b border-slate-700 pb-2 flex justify-between items-center">
                  Jetpack Compose
                  <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded">ANDROID</span>
                </h5>
                <p className="text-lg text-slate-400">
                  Paradigma declarativo que elimina a verbosidade do XML. Utiliza funções composáveis para definir a UI baseada em estado reativo.
                </p>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-lg">
                <h5 className="font-bold border-b border-slate-700 pb-2 flex justify-between items-center">
                  SwiftUI
                  <span className="text-[10px] bg-blue-500/20 text-blue-500 px-2 py-1 rounded">IOS</span>
                </h5>
                <p className="text-lg text-slate-400">
                  Framework declarativo unificado para o ecossistema Apple. Utiliza estruturas leves para descrever a interface de forma eficiente e segura.
                </p>
              </div>
            </div>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[2]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Performance Nativa",
              duration: "18:20",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Linguagens Modernas",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Memory Allocation",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Memory%20Allocation",
                },
                {
                  title: "CPU Profiler",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=CPU%20Profiler",
                },
                {
                  title: "Lifecycle Flow",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Lifecycle%20Flow",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Análise Técnica: Gerenciamento de Memória",
              content: (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-lg font-bold text-red-500">
                    Atenção aos Retain Cycles no ecossistema iOS
                  </p>
                  <p className="text-[10px] italic font-medium">
                    A utilização de [weak self] em closures é mandatória para evitar vazamentos de memória (Memory Leaks).
                  </p>
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM2}
            titulo="QUIZ: Módulo Nº 2"
            variant={mv[2]}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* 🌐 MÓDULO 3: PWA & HÍBRIDOS AVANÇADOS */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="Arquiteturas Híbridas e Progressive Web Apps (PWA)"
          descricao="Análise profunda sobre Service Workers, persistência em cache e a evolução das camadas de abstração entre Web e Nativo."
          variant={mv[3]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="ARQUITETURA"
              title="A Camada de Service Workers e Estratégias Offline"
              variant={mv[3]}
            />
            <ContentAccordion
              titulo="O Ciclo de Vida e Operação do Service Worker"
              icone="⚙️"
              corIndicador="bg-orange-500"
              slides={[
                {
                  titulo: "1. Registro, Instalação e Ativação",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O **Service Worker** opera como um script de background, isolado da thread principal da UI e do DOM, executando em um contexto de **WorkerGlobalScope**. O ciclo de vida compreende:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        <li><strong>Registration:</strong> O navegador aponta para o script e inicia o download.</li>
                        <li><strong>Installation:</strong> Ocorre o evento `install`. É o estágio ideal para o **Static Caching** (pre-caching do App Shell). Se houver erro, o worker é descartado.</li>
                        <li><strong>Activation:</strong> Após a instalação, o worker entra em estado `waiting` até que as abas antigas sejam fechadas, a menos que `skipWaiting()` seja invocado. No evento `activate`, realiza-se a limpeza de caches obsoletos.</li>
                      </ul>
                      <div className="p-3 bg-slate-900 rounded font-mono text-[10px] text-blue-300">
                        {'// Registro com escopo definido'}<br/>
                        {"navigator.serviceWorker.register('/sw.js', { scope: '/' });"}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "2. Interceptação de Requisições e Cache API",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Através do evento `fetch`, o Service Worker atua como um **Proxy de Rede** programável. Ele intercepta requisições e decide a estratégia de entrega via **Cache Storage API**:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-3">
                        <li>
                          <strong>Cache-First:</strong> Consulta o cache; se falhar, recorre à rede. Ideal para fontes e imagens estáticas.
                        </li>
                        <li>
                          <strong>Network-First:</strong> Tenta a rede para garantir dados frescos; recorre ao cache se estiver offline. Essencial para dados transacionais ou preços.
                        </li>
                        <li>
                          <strong>Stale-While-Revalidate:</strong> Entrega o conteúdo do cache imediatamente e dispara uma busca na rede em background para atualizar o cache para o próximo uso. Equilibra velocidade e frescor.
                        </li>
                        <li>
                          <strong>Network-Only / Cache-Only:</strong> Casos de uso restritos para segurança ou depuração.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />


            <Comparison
              title="Evolução das Camadas de Abstração (Bridge)"
              left={{
                title: "Apache Cordova",
                content: "Baseado em WebViews legadas e comunicação via Bridge serializada.",
                description:
                  "Depende de plugins que injetam código JS para acessar hardware. Performance limitada pela thread da WebView.",
                variant: "warning",
              }}
              right={{
                title: "Capacitor (Cross-Platform)",
                content: "Abordagem moderna com APIs nativas acessíveis via Promises/Async-Await.",
                description:
                  "Oferece uma integração mais profunda com o código nativo (Java/Swift), permitindo extensões mais performáticas e estáveis.",
                variant: "success",
              }}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">
                Web App Manifest: Identidade e Critérios de Instalação
              </h4>
              <p className="text-lg text-muted-foreground">
                O Manifesto é um descritivo em JSON que permite ao navegador tratar a aplicação web como um software independente no sistema operacional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente={<div className="font-bold">Display Mode: Standalone</div>}
                  verso="Elimina elementos de navegação do browser, simulando a imersão de um app nativo."
                />
                <FlipCard
                  frente={<div className="font-bold">Start URL & Scope</div>}
                  verso="Define o ponto de entrada da aplicação e delimita quais rotas estão sob controle do PWA."
                />
                <FlipCard
                  frente={<div className="font-bold">Background & Theme Colors</div>}
                  verso="Controla a estética da Splash Screen e da barra de status do sistema operacional."
                />
                <FlipCard
                  frente={<div className="font-bold">Shortcuts & Icons</div>}
                  verso="Define metadados para acesso rápido e suporte a diferentes densidades de tela."
                />
              </div>
            </div>

            <AlertBox tipo="info" titulo="Trusted Web Activity (TWA)">
              A tecnologia TWA permite encapsular um PWA dentro de um contêiner nativo para distribuição oficial na Google Play Store. Diferente de uma WebView comum, ela utiliza uma **Custom Tab** do Chrome, garantindo que o estado de cookies e sessões seja compartilhado entre o navegador e o app instalado.
            </AlertBox>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[3]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "PWA Profundo",
              duration: "20:00",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Estratégias de Cache",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Service Worker Life",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Service%20Worker%20Life",
                },
                {
                  title: "PWA Capabilities",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=PWA%20Capabilities",
                },
                {
                  title: "Web Manifest Structure",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Web%20Manifest%20Structure",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Mnemônico Estratégico: Pilares PWA",
              content: (
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>R</strong>esponsive (Adaptabilidade de interface).
                  </p>
                  <p>
                    <strong>I</strong>ndependente de rede (Operação Offline).
                  </p>
                  <p>
                    <strong>P</strong>rogressive (Funcionalidade incremental).
                  </p>
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM3}
            titulo="QUIZ: Módulo Nº 3"
            variant={mv[3]}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ⚛️ MÓDULO 4: REACT NATIVE ARCHITECTURE */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="Arquitetura de Baixo Nível em React Native"
          descricao="Análise técnica da transição para a 'New Architecture': JSI, Fabric, Turbo Modules e o motor de layout Yoga."
          variant={mv[4]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="SISTEMA"
              title="A Transição da Bridge para a JavaScript Interface (JSI)"
              variant={mv[4]}
            />

            <div className="bg-[#050505] p-8 rounded-2xl border border-slate-800 space-y-6">
              <h4 className="text-xl font-bold text-blue-400">
                The New Architecture: O Fim do Gargalo Assíncrono
              </h4>
              <p className="text-lg text-slate-300 leading-relaxed">
                A arquitetura legada baseava-se em uma **Bridge** que exigia a serialização/desserialização de dados em JSON, operando de forma estritamente assíncrona. A nova **New Architecture** rompe este paradigma com quatro pilares fundamentais:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    JSI (JavaScript Interface)
                  </h6>
                  <p className="text-xl text-slate-400 leading-relaxed text-foreground/85">
                    Uma camada leve escrita em C++ que permite ao motor JS manter referências diretas a métodos e objetos nativos (**Host Objects**). Elimina o overhead de JSON e permite chamadas síncronas.
                  </p>
                </div>
                <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    Fabric Rendering Engine
                  </h6>
                  <p className="text-xl text-slate-400 leading-relaxed text-foreground/85">
                    O novo sistema de renderização que opera diretamente via JSI. Oferece priorização de atualizações de UI, renderização síncrona em casos críticos (ex: inputs) e melhor integração com o motor Yoga.
                  </p>
                </div>
                <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    Turbo Modules
                  </h6>
                  <p className="text-xl text-slate-400 leading-relaxed text-foreground/85">
                    Evolução dos Native Modules. Permitem carregamento **Lazy** (sob demanda) e são fortemente tipados através do **Codegen**, garantindo segurança de interface entre JS e C++/Java/Swift.
                  </p>
                </div>
                <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    Hermes Engine
                  </h6>
                  <p className="text-xl text-slate-400 leading-relaxed text-foreground/85">
                    Motor JS otimizado para dispositivos móveis. Realiza compilação **Ahead-of-Time (AOT)** para Bytecode, reduzindo drasticamente o tempo de boot e o consumo de memória.
                  </p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Layout, Estilização e Virtualização"
              icone="🎨"
              corIndicador="bg-cyan-500"
              slides={[
                {
                  titulo: "Yoga Engine: O Motor de Layout Cross-Platform",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O React Native utiliza o **Yoga**, um motor de layout escrito em C++ que implementa o subconjunto Flexbox. Diferenças críticas em relação à Web:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-3">
                        <li>
                          <strong>Direcionamento Padrão:</strong> O `flexDirection` default é `column`, otimizado para o scrolling vertical de dispositivos móveis.
                        </li>
                        <li>
                          <strong>Unidades de Medida:</strong> Não há suporte para `rem` ou `%` em todas as propriedades; utiliza-se densidade de pixels independentes (**dp** no Android, **pt** no iOS).
                        </li>
                        <li>
                          <strong>Isolamento de Estilo:</strong> Não existe herança de CSS global; cada componente deve declarar explicitamente seus estilos via `StyleSheet`.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Otimização de Listas: Windowing e Reciclagem",
                  conteudo: (
                    <div className="space-y-4">
                      <Comparison
                        title="Performance de Renderização de Listas"
                        left={{
                          title: "ScrollView",
                          content: "Renderiza todos os componentes filhos simultaneamente.",
                          description:
                            "Indicado para conteúdos curtos. Em listas longas, causa estouro de memória (OOM) e lag de scroll.",
                          variant: "warning",
                        }}
                        right={{
                          title: "FlatList / VirtualizedList",
                          content: "Implementa a técnica de 'Windowing'.",
                          description:
                            "Mantém na memória apenas os itens visíveis (e um pequeno buffer), reciclando recursos para garantir 60 FPS estáveis.",
                          variant: "success",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Debug & Ferramentas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-border rounded-lg">
                  <span className="font-mono text-lg font-bold block mb-2">
                    Flipper
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Plataforma extensível para debugar layouts, rede e logs
                    nativos.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <span className="font-mono text-lg font-bold block mb-2">
                    React DevTools
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Inspeção de props, state e árvore de componentes React.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <span className="font-mono text-lg font-bold block mb-2">
                    Hermes
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Engine JS da Meta otimizada para mobile (bytecode
                    pré-compilado).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ModuleConsolidation
            index={4}
            variant={mv[4]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Arquitetura RN",
              duration: "25:00",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Bridge vs JSI",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "JSI Architecture",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=JSI%20Architecture",
                },
                {
                  title: "Yoga Engine Layout",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Yoga%20Engine%20Layout",
                },
                {
                  title: "Hermes Bytecode",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Hermes%20Bytecode",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Otimização de Renderização",
              content: (
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-lg">
                    <strong>Estratégia de Memorização:</strong> A implementação de <code>useMemo</code> e <code>useCallback</code> é fundamental no React Native para mitigar re-renderizações redundantes no JavaScript Thread, preservando a fluidez da interface.
                  </p>
                </div>
              ),
            }}
          />

          <QuizInterativo
            questoes={quizM4}
            titulo="QUIZ: Módulo Nº 4"
            variant={mv[4]}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* 🧭 MÓDULO 5: RN ADVANCED STATE */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="RN: Advanced State & Navigation"
          descricao="Gerenciamento de pilhas complexas e estados globais com foco em performance."
          variant={mv[5]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Gestão de Estado em Aplicações de Larga Escala"
              variant={mv[5]}
            />

            <ContentAccordion
              titulo="Arquitetura de Estado: Redux Toolkit (RTK)"
              icone="🔄"
              corIndicador="bg-violet-600"
              slides={[
                {
                  titulo: "Fluxo Unidirecional e Persistência",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        O Redux Toolkit permanece como a solução de referência para orquestração de estados em ecossistemas de alta escala. No ambiente mobile, a camada de <strong>RTK Query</strong> revoluciona o data-fetching com caching automático e sincronização de estado servidor-cliente.
                      </p>
                      <TimelineItem
                        passo={1}
                        titulo="Action Dispatching & Thunks"
                        descricao="Utilização de createAsyncThunk para orquestrar operações assíncronas e gerenciar estados de loading/error."
                      />
                      <TimelineItem
                        passo={2}
                        titulo="Reducer Logic (Slices)"
                        descricao="Funções puras que determinam a transição do estado de forma imutável via Immer.js, facilitando a legibilidade."
                      />
                      <TimelineItem
                        passo={3}
                        titulo="RTK Query & Caching"
                        descricao="Normalização automática de dados e invalidação de cache baseada em tags, otimizando o tráfego de rede."
                      />
                      <TimelineItem
                        passo={4}
                        titulo="Persistence & Hydration"
                        descricao="Integração com AsyncStorage via redux-persist para garantir a disponibilidade de dados críticos em modo offline."
                        isLast={true}
                      />
                    </div>
                  ),
                },
                {
                  titulo: "Alternativas: Zustand & Atomic State",
                  conteudo: (
                    <div className="space-y-4">
                      <Comparison
                        title="Zustand vs Enterprise Redux"
                        left={{
                          title: "Zustand",
                          content:
                            "Gerenciamento baseado em hooks, eliminando o boilerplate excessivo.",
                          description:
                            "Recomendado para estados efêmeros e agilidade no ciclo de desenvolvimento.",
                          variant: "success",
                        }}
                        right={{
                          title: "Redux Toolkit",
                          content:
                            "Arquitetura robusta com suporte avançado a Middlewares e Time-Travel Debugging.",
                          description:
                            "Ideal para lógicas de negócio complexas e governança de dados em larga escala.",
                          variant: "info",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">
                Orquestração de Navegação: React Navigation
              </h4>
              <p className="text-lg text-muted-foreground">
                Diretrizes para estruturação de fluxos complexos e hierarquias de rotas em ambientes corporativos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h6 className="font-bold underline italic">Deep Linking & Universal Links</h6>
                  <p className="text-lg">
                    Implementação de esquemas de URL personalizados (Custom Schemes) e vinculação de domínios para direcionamento direto a módulos específicos, essencial para notificações push transacionais.
                  </p>
                </div>
                <div className="space-y-4">
                  <h6 className="font-bold underline italic">Otimização de Payload em Rotas</h6>
                  <p className="text-lg">
                    Deve-se evitar a transferência de objetos volumosos via parâmetros de rota. A prática recomendada envolve a passagem exclusiva de identificadores únicos (IDs), delegando a recuperação de dados à camada de serviço ou cache na tela de destino.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
                <h6 className="font-bold text-blue-400 mb-2">
                  Native Stack vs JS Stack
                </h6>
                <p className="text-[10px] text-slate-400">
                  O **Native Stack** mapeia a navegação para os componentes
                  nativos de transição (UINavigationController no iOS e
                  Fragments no Android). Mais rápido e fluído, mas menos
                  customizável que a versão JS.
                </p>
              </div>
            </div>

            <AlertBox tipo="warning" titulo="Gerenciamento de Recursos: Memory Leaks">
              É fundamental realizar o descarte (cleanup) de observadores de navegação (<code>navigation.addListener</code>) no retorno do hook <code>useEffect</code>, prevenindo a retenção indevida de memória e execução de processos em background.
            </AlertBox>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[5]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Navigation & State",
              duration: "22:30",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Offline Persistent State",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Navigation Stack",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Navigation%20Stack",
                },
                {
                  title: "Redux Flow Mobile",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Redux%20Flow%20Mobile",
                },
                {
                  title: "Deep Link Logic",
                  type: "Fluxograma",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Deep%20Link%20Logic",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretriz: Arquitetura de Estado",
              content: (
                <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                  <p className="text-lg italic">
                    "Abstração de Estado: Em cenários onde a propagação de propriedades (Prop Drilling) excede dois níveis hierárquicos, recomenda-se a utilização de Context API ou gerenciadores de estado global para assegurar a manutenibilidade."
                  </p>
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM5}
            titulo="QUIZ: Módulo Nº 5"
            variant={mv[5]}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* 🎯 MÓDULO 6: FLUTTER & DART DEEP */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Flutter & Dart Core Deep"
          descricao="Aprofundando na engine Skia/Impeller, no ciclo de vida dos Widgets e no motor Dart."
          variant={mv[6]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Processamento Gráfico e Renderização"
              variant={mv[6]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full" />
                  Arquitetura Skia & Impeller
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Ao contrário de frameworks que delegam a interface aos componentes nativos, o Flutter opera via <strong>Rasterização Direta</strong>. Utilizando a engine Skia (ou Impeller em versões recentes), o framework renderiza cada pixel de forma independente, eliminando a sobrecarga de serialização e garantindo taxas de quadros (FPS) estáveis.
                </p>
                <AlertBox tipo="info" titulo="Evolução Gráfica: Impeller">
                  O motor Impeller foi desenvolvido para substituir o Skia no iOS/Android, endereçando problemas de <strong>Shader Compilation Junk</strong> através da pré-compilação de shaders, resultando em transições perfeitamente fluidas.
                </AlertBox>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  As Três Árvores
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  O Flutter gerencia três estruturas simultâneas para otimizar a
                  performance:
                </p>
                <ul className="space-y-4">
                  <li className="p-3 bg-muted rounded border-l-4 border-blue-400 text-lg">
                    <strong>Widget Tree:</strong> Representação imutável da configuração da interface.
                  </li>
                  <li className="p-3 bg-muted rounded border-l-4 border-amber-400 text-lg">
                    <strong>Element Tree:</strong> Camada de orquestração que vincula o Widget à renderização física.
                  </li>
                  <li className="p-3 bg-muted rounded border-l-4 border-red-400 text-lg">
                    <strong>RenderObject Tree:</strong> Camada de baixo nível responsável pelo cálculo de geometria (Layout) e pintura (Paint).
                  </li>
                </ul>
              </div>
            </div>

            <ContentAccordion
              titulo="Dart: Além do Básico"
              icone="🎯"
              corIndicador="bg-cyan-600"
              slides={[
                {
                  titulo: "Sound Null Safety",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O paradigma de <strong>Sound Null Safety</strong> garante a impossibilidade de exceções de referência nula em tempo de execução, desde que as variáveis sejam tipadas de forma determinística.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-border rounded-lg">
                          <code className="text-[10px] block font-bold text-red-400">
                            String name; // Erro!
                          </code>
                          <p className="text-[10px] mt-2">
                            Deve ser inicializado ou marcado com ?.
                          </p>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <code className="text-[10px] block font-bold text-green-400">
                            String? name; // OK
                          </code>
                          <p className="text-[10px] mt-2">
                            Pode ser nulo. Exige check antes do uso.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Concorrência: Isolates e Event Loop",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Diferente do modelo multi-thread tradicional, o Dart utiliza **Isolates**. Cada isolate possui sua própria heap de memória e thread de execução, comunicando-se exclusivamente via troca de mensagens (**Ports**).
                      </p>
                      <ul className="list-disc pl-5 text-lg text-muted-foreground space-y-2">
                        <li>
                          <strong>Main Isolate:</strong> Responsável pela execução da UI e processamento do Event Loop.
                        </li>
                        <li>
                          <strong>Background Isolates:</strong> Utilizados para processamento intensivo (parsing JSON pesado, criptografia), evitando o travamento da interface (jank).
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Mixins e Extensions",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Recursos avançados para reuso de código e extensibilidade sem herança múltipla.
                      </p>
                      <ul className="list-disc pl-5 text-lg text-muted-foreground space-y-2">
                        <li>
                          <strong>Mixins:</strong> Permitem injetar comportamentos em múltiplas classes sem estabelecer uma hierarquia rígida.
                        </li>
                        <li>
                          <strong>Extensions:</strong> Possibilitam a adição de funcionalidades a classes existentes (até mesmo da SDK nativa) de forma estática.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Ciclo de Vida do State</h4>
              <div className="space-y-4">
                <TimelineItem
                  passo={1}
                  titulo="initState()"
                  descricao="Chamado apenas uma vez quando o widget é inserido na árvore. Ideal para inicializar streams ou controladores."
                />
                <TimelineItem
                  passo={2}
                  titulo="didChangeDependencies()"
                  descricao="Chamado logo após o initState e sempre que um objeto InheritedWidget (como o Provider) mudar."
                />
                <TimelineItem
                  passo={3}
                  titulo="build()"
                  descricao="Onde a UI é montada. Deve ser uma função pura, sem lógica de rede ou efeitos colaterais."
                />
                <TimelineItem
                  passo={4}
                  titulo="dispose()"
                  descricao="Limpeza crítica. Pare controladores de animação, timers e feche sinks para evitar memory leaks."
                  isLast={true}
                />
              </div>
            </div>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[6]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Widgets & Rendering",
              duration: "19:00",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "A Magia das Árvores",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Triple Tree Logic",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Triple%20Tree%20Logic",
                },
                {
                  title: "Dart Runtime",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Dart%20Runtime",
                },
                {
                  title: "Rendering Pipeline",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Rendering%20Pipeline",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Composição de Widgets",
              content: (
                <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                  <p className="text-lg">
                    No ecossistema Flutter, a arquitetura é baseada integralmente na composição de Widgets; elementos de posicionamento (Center) e espaçamento (Padding) são tratados como objetos estruturais na árvore de renderização.
                  </p>
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM6}
            titulo="QUIZ: Módulo Nº 6"
            variant={mv[6]}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* 🔮 MÓDULO 7: FLUTTER ADVANCED PATTERNS */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Flutter: Advanced State Patterns"
          descricao="Masterizando BLoC, Riverpod e o ecossistema de arquitetura reativa."
          variant={mv[7]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Gerenciamento de Estado Reativo"
              variant={mv[7]}
            />

            <ContentAccordion
              titulo="Arquitetura de Gerenciamento de Estado Reativo"
              icone="🔄"
              corIndicador="bg-blue-600"
              slides={[
                {
                  titulo: "O Padrão BLoC (Business Logic Component)",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        O BLoC implementa o desacoplamento total entre a camada de apresentação e a lógica de negócio, utilizando o padrão <strong>Observer</strong> através de <em>Streams</em> e <em>Sinks</em>.
                      </p>
                      <div className="bg-slate-950 p-6 rounded-xl border border-blue-500/30">
                        <h6 className="text-lg font-mono text-blue-400 mb-4 uppercase">
                          Protocolo de Comunicação:
                        </h6>
                        <ul className="space-y-3">
                          <li className="text-[12px] text-slate-300 flex items-start gap-2">
                            <span className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
                              1
                            </span>{" "}
                            <span><strong>Event Injection:</strong> A UI despacha eventos assíncronos para o BLoC.</span>
                          </li>
                          <li className="text-[12px] text-slate-300 flex items-start gap-2">
                            <span className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
                              2
                            </span>{" "}
                            <span><strong>Logic Processing:</strong> O componente processa a lógica (ex: validações, I/O) sem conhecer a UI.</span>
                          </li>
                          <li className="text-[12px] text-slate-300 flex items-start gap-2">
                            <span className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
                              3
                            </span>{" "}
                            <span><strong>State Emission:</strong> Um novo estado imutável é emitido via Stream.</span>
                          </li>
                          <li className="text-[12px] text-slate-300 flex items-start gap-2">
                            <span className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
                              4
                            </span>{" "}
                            <span><strong>Widget Rebuild:</strong> O <em>BlocBuilder</em> intercepta a mudança e reconstrói cirurgicamente o widget correspondente.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Riverpod: Injeção de Dependência Robusta",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        Diferente do Provider, o <strong>Riverpod</strong> é um framework de injeção de dependência e gerenciamento de estado <em>compile-safe</em>, que não depende da árvore de widgets (BuildContext).
                      </p>
                      <AlertBox tipo="warning" titulo="Inversão de Controle">
                        O Riverpod permite a declaração de providers globais que são imutáveis e testáveis isoladamente, resolvendo problemas clássicos de "ProviderNotFoundException" em tempo de execução.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="Comparativo de Arquiteturas"
              left={{
                title: "Cubit",
                content:
                  "Versão simplificada do BLoC. Usa métodos em vez de eventos.",
                description:
                  "Ideal para fluxos lineares e reduções de boilerplate.",
                variant: "success",
              }}
              right={{
                title: "Redux (Flutter)",
                content: "Centralizado e imutável. Segue o padrão JavaScript.",
                description:
                  "Complexo no Flutter, mas poderoso para grandes estados globais.",
                variant: "warning",
              }}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Imutabilidade e Geração de Código com Freezed</h4>
              <p className="text-lg text-muted-foreground">
                O uso de classes seladas (sealed classes) e imutabilidade estrita é fundamental para garantir a previsibilidade do estado em aplicações Flutter de missão crítica.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente="Pattern Matching"
                  verso="Permite o tratamento exaustivo de todos os estados (Loading, Loaded, Error) via métodos 'when' ou 'maybeWhen'."
                />
                <FlipCard
                  frente="Deep Immutability"
                  verso="Garante que propriedades aninhadas não sejam alteradas acidentalmente, forçando o uso do método copyWith."
                />
              </div>
            </div>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[7]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "State Management Pro",
              duration: "24:15",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "BLoC vs Riverpod",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "BLoC Flow Diagram",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=BLoC%20Flow%20Diagram",
                },
                {
                  title: "Riverpod Scoping",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Riverpod%20Scoping",
                },
                {
                  title: "Freezed Logic",
                  type: "Infográfico",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Freezed%20Logic",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Padrão Observável (BLoC)",
              content: (
                <p className="text-lg">
                  <strong>Fluxo de Dados:</strong> Eventos são processados via <em>Sinks</em>, resultando na emissão de novos Estados através de <em>Streams</em>. Este padrão assegura a reatividade e desacoplamento da lógica de negócio.
                </p>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM7}
            titulo="QUIZ: Módulo Nº 7"
            variant={mv[7]}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* 🔓 MÓDULO 8: HARDWARE & BACKGROUND */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Hardware, Sensors & Background"
          descricao="Integrando com o mundo físico: Biometria, Localização e Processamento em Background."
          variant={mv[8]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Integração Avançada"
              variant={mv[8]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  📍 Geolocalização & Eficiência Energética
                </h4>
                <p className="text-lg text-muted-foreground text-justify">
                  A coleta de coordenadas geográficas no mobile é um dos recursos mais custosos para a bateria. Em cenários industriais (Petrobras), otimizamos o consumo diferenciando <strong>Foreground Location</strong> (alta precisão) de <strong>Background Location</strong> (baixa frequência/fenced).
                </p>
                <div className="p-4 bg-muted rounded-lg border border-border space-y-2">
                  <h6 className="text-[12px] font-bold uppercase text-blue-500">
                    Geofencing Operacional:
                  </h6>
                  <p className="text-[12px]">
                    Utiliza o hardware de baixo consumo do dispositivo para monitorar a entrada/saída de regiões poligonais (cercas virtuais), permitindo automações de segurança sem drenar a bateria com polling constante de GPS.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  🔐 Biometria e Trusted Execution
                </h4>
                <p className="text-lg text-muted-foreground text-justify">
                  A autenticação local via FaceID/TouchID utiliza o <strong>Secure Enclave</strong> (iOS) ou o <strong>TEE</strong> (Android). O aplicativo nunca acessa os dados biométricos; ele solicita uma verificação ao hardware seguro e recebe um <em>Cryptographic Token</em> de sucesso ou falha.
                </p>
                <AlertBox tipo="warning" titulo="Hardened Security">
                  Para dados sensíveis, utilize o <strong>Keychain</strong> (iOS) ou <strong>KeyStore</strong> (Android). O armazenamento comum não oferece proteção em dispositivos comprometidos (Root/Jailbreak).
                </AlertBox>
              </div>
            </div>

            <ContentAccordion
              titulo="Processamento em Background"
              icone="⚙️"
              corIndicador="bg-amber-600"
              slides={[
                {
                  titulo: "Android WorkManager",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        A API padrão para tarefas persistentes. Ela sobrevive a reinicializações e respeita o Doze Mode (economia de bateria).
                      </p>
                      <ul className="list-decimal pl-5 text-lg space-y-2">
                        <li>Defina restrições (ex: apenas no Wi-Fi e Carregando).</li>
                        <li>O sistema agenda para o melhor momento possível.</li>
                        <li>Garante execução mesmo que o app seja morto.</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Interoperabilidade Nativa (Method Channels)",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg text-muted-foreground">
                        Quando o framework não oferece um plugin pronto, utilizamos <strong>MethodChannels</strong> para invocar código nativo (Swift/Kotlin). Este processo envolve a serialização de dados via <em>BinaryMessenger</em>, gerando uma latência mínima inerente à ponte (Bridge).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={8}
            variant={mv[8]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Native APIs & Sensors",
              duration: "16:50",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Segurança de Dados Locais",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "TEE & Secure Enclave",
                  type: "Hardware",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=TEE%20%26%20Secure%20Enclave",
                },
                {
                  title: "Background Isolate",
                  type: "Threading",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Background%20Isolate",
                },
                {
                  title: "MethodChannel Flow",
                  type: "Arquitetura",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=MethodChannel%20Flow",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Ciclo de Vida Nativo",
              content: (
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  <div className="p-2 border border-border rounded">
                    1. Registro (Manifest/plist)
                  </div>
                  <div className="p-2 border border-border rounded">
                    2. Solicitação de Permissão (Rationale)
                  </div>
                  <div className="p-2 border border-border rounded">
                    3. Execução em Hardware Seguro
                  </div>
                </div>
              ),
            }}
          />

          <QuizInterativo
            questoes={quizM8}
            titulo="QUIZ: Módulo Nº 8"
            variant={mv[8]}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* 🎨 MÓDULO 9: UX/UI DESIGN SYSTEMS */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="UX/UI Design Mastery"
          descricao="Indo além da beleza: Design Systems, Acessibilidade e Micro-interações."
          variant={mv[9]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Design de Interação e Experiência do Usuário"
              variant={mv[9]}
            />

            <div className="space-y-8">
              <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <h4 className="text-xl font-bold mb-3">Design Systems & Tokens</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  No desenvolvimento moderno, a UI não é construída de forma <em>ad-hoc</em>. Utilizamos <strong>Design Tokens</strong> (variáveis de design como cores, espaçamentos e tipos) que garantem que o app siga a identidade visual da Petrobras em qualquer plataforma, facilitando mudanças globais e garantindo o <strong>Atomic Design</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted rounded-xl border border-border">
                  <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Consistência Multi-Plataforma
                  </h5>
                  <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                    Uso de bibliotecas de componentes que abstraem as diferenças entre <strong>Material Design</strong> (Android) e <strong>Human Interface Guidelines</strong> (iOS), mantendo a experiência do usuário coesa sem perder o <em>feeling</em> nativo de cada SO.
                  </p>
                </div>
                <div className="p-6 bg-muted rounded-xl border border-border">
                  <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Layouts Adaptativos
                  </h5>
                  <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                    Estratégias de <strong>Fluid Layouts</strong> para lidar com a fragmentação de telas: desde smartphones compactos até tablets e dispositivos dobráveis, utilizando <em>Media Queries</em> programáticas e <em>Flexbox/Grid</em>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-muted rounded-lg text-center border border-border group hover:border-primary/50 transition-colors">
                  <span className="block w-6 h-6 mx-auto bg-blue-500 rounded-full mb-2 shadow-sm"></span>
                  <p className="text-[10px] font-mono font-bold">token.brand.primary</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border group hover:border-primary/50 transition-colors">
                  <span className="block w-6 h-6 mx-auto bg-slate-200 rounded-full mb-2 shadow-sm"></span>
                  <p className="text-[10px] font-mono font-bold">token.neutral.surface</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border group hover:border-primary/50 transition-colors">
                  <span className="w-6 h-6 mx-auto border border-dashed border-border rounded-full mb-2 flex items-center justify-center text-[8px] font-bold">
                    16
                  </span>
                  <p className="text-[10px] font-mono font-bold">token.spacing.lg</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border group hover:border-primary/50 transition-colors">
                  <span className="w-6 h-6 mx-auto flex items-center justify-center text-[10px] font-bold">
                    Ag
                  </span>
                  <p className="text-[10px] font-mono font-bold">token.font.heading</p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Acessibilidade (a11y) & Inclusão"
              icone="♿"
              corIndicador="bg-green-600"
              slides={[
                {
                  titulo: "WCAG & Assistive Technologies",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Conformidade com os níveis <strong>AA/AAA da WCAG</strong>. O código deve ser semanticamente rico para ser interpretado corretamente por motores de assistência.
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        <li>
                          <strong>Semantic Labels:</strong> Descrições precisas que evitam redundância (ex: não diga "Botão de Voltar", diga apenas "Voltar").
                        </li>
                        <li>
                          <strong>Accessibility Traits/Actions:</strong> Definir se um componente é um <em>header</em>, <em>button</em> ou <em>adjustable</em> no iOS.
                        </li>
                        <li>
                          <strong>Dynamic Type:</strong> Garantir que o layout não quebre quando o usuário aumenta a fonte do sistema por necessidade visual.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "UX em Ambientes Críticos",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        Em cenários da Petrobras (ex: plataformas off-shore), a UI deve considerar o uso de luvas (áreas de toque ampliadas), alta luminosidade (contraste extremo) e modos de operação com uma mão em situações de emergência.
                      </p>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 rounded-lg">✨</span>
                Micro-interações & Percepção de Valor
              </h4>
              <p className="text-lg text-muted-foreground">
                Movimentos coreografados que reduzem a carga cognitiva e melhoram a satisfação do usuário.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente="Skeleton State (Lottie)"
                  verso="Elimina a ansiedade de carregamento, simulando a estrutura da página antes dos dados chegarem via API."
                />
                <FlipCard
                  frente="Haptic Orchestration"
                  verso="Vibrações táteis (Taptic Engine) que confirmam sucessos ou alertam erros críticos sem necessidade de som."
                />
                <FlipCard
                  frente="Staggered Layouts"
                  verso="Animações em cascata para listas, guiando o foco visual do usuário de forma fluida."
                />
                <FlipCard
                  frente="Interpolated Gestures"
                  verso="Navegação baseada em gestos que responde à velocidade e pressão do toque (Physics-based animations)."
                />
              </div>
            </div>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[9]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Premium UI/UX",
              duration: "18:40",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Design Systems no Mobile",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Touch Heatmap",
                  type: "Mapa",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Touch%20Heatmap",
                },
                {
                  title: "Contrast Checker",
                  type: "Tool",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Contrast%20Checker",
                },
                {
                  title: "Animation Curves",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Animation%20Curves",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Integridade Visual",
              content: (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-lg">
                  Para garantir a integridade da interface em dispositivos com <em>notches</em> ou <em>islands</em>, é imperativa a utilização do componente <strong>SafeArea</strong> (Flutter) ou do hook <strong>useSafeAreaInsets</strong> (React Native).
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM9}
            titulo="QUIZ: Módulo Nº 9"
            variant={mv[9]}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* 📦 MÓDULO 10: CI/CD & APP STORES */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="CI/CD & App Stores Ops"
          descricao="Conclusão: Automação de Processos, Auditoria de Lojas e Padrões de Release."
          variant={mv[10]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Entrega Contínua"
              variant={mv[10]}
            />

            <div className="space-y-10">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity font-black text-6xl">
                  FASTLANE
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  Orquestração com Fastlane
                </h4>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  A automação de release mobile é complexa devido ao isolamento das lojas. O <strong>Fastlane</strong> resolve isso através de <em>lanes</em> programáticas que padronizam o build e o deploy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h6 className="text-red-400 font-bold uppercase text-lg text-foreground/85 leading-relaxed tracking-widest italic">Match (Security First)</h6>
                    <p className="text-xl text-slate-400 text-foreground/85 leading-relaxed">
                      Criptografia de ponta a ponta para <strong>Certificados</strong> e <strong>Provisioning Profiles</strong>. Armazena as chaves num repositório Git privado, garantindo que todo o time use a mesma assinatura sem conflitos.
                    </p>
                  </div>
                  <div className="space-y-3 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h6 className="text-blue-400 font-bold uppercase text-lg text-foreground/85 leading-relaxed tracking-widest italic">App Thinning & Slicing</h6>
                    <p className="text-xl text-slate-400 text-foreground/85 leading-relaxed">
                      Processo onde a loja gera binários otimizados para cada dispositivo. O usuário baixa apenas os assets (densidade de tela, arquitetura CPU) necessários, economizando dados e espaço.
                    </p>
                  </div>
                </div>
              </div>

              <ContentAccordion
                titulo="Políticas e Rejeições nas Stores"
                icone="⚖️"
                corIndicador="bg-red-600"
                slides={[
                  {
                    titulo: "Apple Guideline 4.0: Design & Valor",
                    conteudo: (
                      <div className="space-y-4 text-lg">
                        <p>
                          A Apple exige que o app forneça funcionalidade que não possa ser replicada em um simples site (valor agregado mobile).
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground">
                          <li>
                            <strong>In-App Purchase (IAP):</strong> Obrigatória para conteúdos digitais. A tentativa de burlar usando links externos causa rejeição imediata.
                          </li>
                          <li>
                            <strong>Sign in with Apple:</strong> Mandatório se o app oferecer outros logins sociais (Google, Facebook).
                          </li>
                          <li>
                            <strong>App Tracking Transparency (ATT):</strong> Consentimento explícito para rastreamento de dados de terceiros.
                          </li>
                        </ul>
                      </div>
                    ),
                  },
                  {
                    titulo: "Google Play Integrity API",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-lg">
                          Proteção contra fraudes e modificações não autorizadas. A API verifica se a interação é de um binário genuíno instalado via loja oficial em um dispositivo certificado.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />

              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 rounded-lg">🚀</span>
                  Release Management Strategies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-muted/50 rounded-xl border border-border group hover:bg-muted transition-colors">
                    <h6 className="font-bold text-lg mb-2">TestFlight / Beta App</h6>
                    <p className="text-xl text-muted-foreground leading-snug text-foreground/85 leading-relaxed">
                      Ambiente de <em>Sandboxing</em> para até 10.000 usuários externos antes do release público.
                    </p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-xl border border-border group hover:bg-muted transition-colors">
                    <h6 className="font-bold text-lg mb-2">Staged Rollouts</h6>
                    <p className="text-xl text-muted-foreground leading-snug text-foreground/85 leading-relaxed">
                      Lançamento gradual (ex: 1% {"->"} 5% {"->"} 20% {"->"} 100%). Permite abortar o release caso métricas de <em>crash</em> subam no Firebase Crashlytics.
                    </p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-xl border border-border group hover:bg-muted transition-colors">
                    <h6 className="font-bold text-lg mb-2">Store Presence (ASO)</h6>
                    <p className="text-xl text-muted-foreground leading-snug text-foreground/85 leading-relaxed">
                      Otimização de keywords, screenshots e vídeos para conversão orgânica e descoberta na loja.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-border rounded-2xl">
                <h5 className="font-bold mb-4">
                  Checklist de Publicação Final
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      className="accent-green-500"
                    />
                    <span className="text-lg">
                      Código ofuscado (R8/Proguard)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      className="accent-green-500"
                    />
                    <span className="text-lg">
                      Logs de debug removidos (release mode)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      className="accent-green-500"
                    />
                    <span className="text-lg">
                      Políticas de privacidade atualizadas nas lojas
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      className="accent-green-500"
                    />
                    <span className="text-lg">
                      Certificados de produção gerados e seguros
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[10]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "App Stores Release",
              duration: "25:00",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "A Arte do Deploy Ininterrupto",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "CI/CD Pipeline Mobile",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=CI/CD%20Pipeline%20Mobile",
                },
                {
                  title: "App Thinning Logic",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=App%20Thinning%20Logic",
                },
                {
                  title: "Release Rollout",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Release%20Rollout",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese: Automação e Deployment",
              content: (
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-lg italic">
                  "A automação integral dos processos de lançamento minimiza riscos operacionais e assegura a integridade da entrega final, mitigando falhas humanas críticas no deployment."
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM10}
            titulo="QUIZ: Módulo Nº 10"
            variant={mv[10]}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
