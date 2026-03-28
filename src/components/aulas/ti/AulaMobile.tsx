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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

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
          titulo="Ecossistema & Segurança Mobile"
          descricao="Aprofundando na arquitetura dos sistemas e nos modelos de sandboxing."
          variant={mv[1]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Arquitetura de Baixo Nível"
              variant={mv[1]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Android: Linux & ART
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  O Android utiliza o kernel Linux para gerenciar drivers e
                  segurança. Acima dele, o **ART (Android Runtime)** substituiu
                  o antigo Dalvik, utilizando compilação **AOT (Ahead-of-Time)**
                  para melhorar a performance e o consumo de bateria.
                </p>
                <div className="p-4 bg-muted rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-mono">
                    Kernel {"->"} HAL {"->"} ART {"->"} Framework {"->"} Apps
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  iOS: XNU & Darwin
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Baseado no kernel Darwin (BSD/Mach), o iOS é um sistema
                  fechado onde o hardware e software são co-desenhados. A
                  segurança é baseada no **Secure Enclave** (coprocessador
                  isolado para biometria e chaves).
                </p>
                <div className="p-4 bg-muted rounded-lg border-l-4 border-blue-500">
                  <p className="text-lg font-mono">
                    Kernel {"->"} CoreOS {"->"} CoreServices {"->"} CocoaTouch{" "}
                    {"->"} Apps
                  </p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Segurança e Isolamento (Sandboxing)"
              icone="🛡️"
              corIndicador="bg-red-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  titulo: "O Modelo de Sandbox",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        Cada aplicativo roda em um ambiente isolado. No Android,
                        cada app tem seu próprio **UID (User ID)** único no
                        kernel Linux. No iOS, o sandbox impede que um app acesse
                        arquivos de outro sem permissão explícita.
                      </p>
                      <Comparison
                        title="Vulnerabilidades e Alterações"
                        left={{
                          title: "Rooting (Android)",
                          content:
                            "Obtenção de privilégios de superusuário no Linux.",
                          description:
                            "Permite controle total, mas quebra o modelo de segurança do Google (SafetyNet).",
                          variant: "warning",
                        }}
                        right={{
                          title: "Jailbreaking (iOS)",
                          content:
                            "Remoção de restrições de software da Apple.",
                          description:
                            "Permite apps foras da loja, mas expõe o sistema a malwares de kernel.",
                          variant: "danger",
                        }}
                      />
                    </div>
                  ),
                },
                {
                  titulo: "Permissões e Privacidade",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        As permissões evoluíram de 'estáticas' (instalação) para
                        'dinâmicas' (runtime). Importante para concursos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📍</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Localização
                          </h6>
                          <p className="text-[10px] text-muted-foreground">
                            Fina (GPS) vs Grosseira (Wi-Fi/Célula).
                          </p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📷</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Câmera
                          </h6>
                          <p className="text-[10px] text-muted-foreground">
                            Acesso via Camera2 API ou CameraX.
                          </p>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                          <span className="text-2xl mb-2 block">📂</span>
                          <h6 className="font-bold text-lg uppercase tracking-wider">
                            Storage
                          </h6>
                          <p className="text-[10px] text-muted-foreground">
                            Scoped Storage (Android 10+) limita o acesso global.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <AlertBox tipo="warning" titulo="Foco no Concurso: Dalvik vs ART">
              Dalvik usava **JIT** (Just-in-Time), traduzindo código na hora do
              uso. O **ART** usa **AOT** (Ahead-of-Time), compilando tudo na
              instalação. Resultado: Apps abrem mais rápido, mas ocupam mais
              espaço em disco.
            </AlertBox>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[1]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Entendendo o Ecossistema",
              duration: "15:45",
            }}
            audio={{
              artista: "Prof. Antigravity",
              titulo: "Segurança Mobile Profunda",
              audioUrl: "",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Android Layer Stack",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "iOS Security Arch",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Market Fragmentation",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "O Mantra da Segurança",
              content: (
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>Isolamento:</strong> Sandboxing é a base.
                  </p>
                  <p>
                    <strong>Privilégio:</strong> Menor privilégio possível
                    (Runtime Permissions).
                  </p>
                  <p>
                    <strong>Integridade:</strong> Root/Jailbreak comprometem a
                    confiança.
                  </p>
                </div>
              ),
            }}
          />

                    <QuizInterativo
            questoes={quizM1}
            titulo="QUIZ: Módulo Nº 1"
            variant={mv[1]}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* 🚀 MÓDULO 2: NATIVO & PERFORMANCE */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Nativo Profundo & Performance"
          descricao="Ciclo de vida avançado, gerenciamento de memória e linguagens modernas."
          variant={mv[2]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index={1}
              title="A Lógica do Sistema"
              variant={mv[2]}
            />

            <ContentAccordion
              titulo="Gerenciamento de Memória: ARC vs GC"
              icone="🧠"
              corIndicador="bg-purple-500"
              slides={[
                {
                  titulo: "Swift: Automatic Reference Counting (ARC)",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg text-muted-foreground">
                        O iOS não possui um Garbage Collector (GC) tradicional.
                        Ele usa o **ARC**, que insere comandos de retenção e
                        liberação de memória em tempo de compilação.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h6 className="font-bold text-lg flex items-center gap-1">
                            Strong References{" "}
                            <span className="text-red-500">
                              (Perigo: Retain Cycle)
                            </span>
                          </h6>
                          <p className="text-[10px]">
                            Aumentam o contador de referências. Dois objetos que
                            se referenciam 'fortemente' nunca são liberados.
                          </p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h6 className="font-bold text-lg flex items-center gap-1">
                            Weak / Unowned
                          </h6>
                          <p className="text-[10px]">
                            Não aumentam o contador. Essenciais para evitar
                            vazamentos de memória (Memory Leaks).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Android: Garbage Collection (GC)",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        O ART gerencia a memória automaticamente. Pontos para
                        prova:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg text-muted-foreground">
                        <li>
                          <strong>Heap:</strong> Onde os objetos vivem.
                        </li>
                        <li>
                          <strong>Pause Times:</strong> O momento em que o GC
                          'para o mundo' para limpar objetos (reduzido
                          drasticamente no ART).
                        </li>
                        <li>
                          <strong>Generational GC:</strong> Objetos mais novos
                          são limpos com mais frequência que objetos antigos.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">
                Ciclo de Vida: Aprofundamento Técnico
              </h4>
              <p className="text-lg text-muted-foreground">
                Não decore apenas os nomes, entenda o **PORQUÊ** de cada estado.
              </p>

              <div className="space-y-8">
                <TimelineItem
                  passo={1}
                  titulo="Estado: Ativo (Resumed)"
                  descricao="O app está no topo da pilha, tem o foco e está processando interações. Frequência de CPU máxima."
                />
                <TimelineItem
                  passo={2}
                  titulo="Mudança: Config Change (Rotação)"
                  descricao="No Android, por padrão, a Activity é DESTRUÍDA e RECRIADA. Dados devem ser salvos no ViewModel ou onSaveInstanceState."
                />
                <TimelineItem
                  passo={3}
                  titulo="Estado: Background (Stopped)"
                  descricao="O sistema pode matar o processo a qualquer momento para liberar RAM para o app da frente. Estado vital para persistência imediata."
                />
                <TimelineItem
                  passo={4}
                  titulo="Gerenciamento de Threads"
                  descricao="NUNCA faça operações de rede no UI Thread (Main Thread). Use Coroutines (Kotlin) ou GCD (Swift)."
                  isLast={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                <h5 className="font-bold border-b border-slate-700 pb-2">
                  Jetpack Compose
                </h5>
                <p className="text-lg text-slate-400">
                  O novo padrão Android para UI declarativa. Menos código, mais
                  reatividade. Remove o uso de XMLs pesados.
                </p>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                <h5 className="font-bold border-b border-slate-700 pb-2">
                  SwiftUI
                </h5>
                <p className="text-lg text-slate-400">
                  Mesma lógica do Compose para Apple. Usa struct em vez de
                  classes para visão, sendo extremamente leve.
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "CPU Profiler",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Lifecycle Flow",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "O Pulo do Gato: Memória",
              content: (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-lg font-bold text-red-500">
                    Cuidado com Retain Cycles no iOS!
                  </p>
                  <p className="text-[10px] italic">
                    Sempre use [weak self] em closures que capturam referências
                    para evitar leaks.
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

      {/* 🌐 MÓDULO 3: PWA & HÍBRIDOS PRO */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="PWA & Híbridos Avançados"
          descricao="Masterizando Service Workers, Web App Manifest e a evolução além do Cordova."
          variant={mv[3]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Estratégias Offline First"
              variant={mv[3]}
            />

            <ContentAccordion
              titulo="O Ciclo de Vida do Service Worker"
              icone="⚙️"
              corIndicador="bg-orange-500"
              slides={[
                {
                  titulo: "1. Registro e Instalação",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O navegador registra o arquivo JS em background. No
                        evento `install`, geralmente fazemos o pre-cache dos
                        arquivos estáticos (App Shell).
                      </p>
                      <div className="p-3 bg-slate-900 rounded font-mono text-[10px]">
                        self.addEventListener('install', (e) {"=>"} &#123; ...
                        &#125;)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "2. Ativação e Interceptação",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O Service Worker se torna o 'proxy' da rede. Ele pode
                        usar estratégias como:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        <li>
                          <strong>Cache First:</strong> Tenta o cache, se falhar
                          vai na rede (Ideal para fotos, estilos).
                        </li>
                        <li>
                          <strong>Network First:</strong> Tenta rede, se falhar
                          usa cache (Ideal para dados de API que mudam).
                        </li>
                        <li>
                          <strong>Stale-While-Revalidate:</strong> Serve o cache
                          e atualiza o conteúdo em background.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="A Evolução das WebViews"
              left={{
                title: "Apache Cordova",
                content: "Baseado em plugins e bridge lenta. Abordagem antiga.",
                description:
                  "Arquitetura baseada em eventos. Performance depende da WebView do sistema.",
                variant: "warning",
              }}
              right={{
                title: "Capacitor (Ionic)",
                content: "Acesso moderno às APIs e melhor performance.",
                description:
                  "Abordagem baseada em Promises e integração nativa mais profunda.",
                variant: "success",
              }}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">
                Web App Manifest: O Coração do PWA
              </h4>
              <p className="text-lg text-muted-foreground">
                O arquivo JSON que diz ao sistema: "Eu não sou apenas um site".
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente={<div className="font-bold">display: standalone</div>}
                  verso="Remove a barra de endereços do navegador. O app parece nativo."
                />
                <FlipCard
                  frente={<div className="font-bold">start_url</div>}
                  verso="Define qual página o app deve abrir quando tocado no ícone."
                />
                <FlipCard
                  frente={<div className="font-bold">background_color</div>}
                  verso="Usada na Splash Screen (tela de carregamento) gerada pelo sistema."
                />
                <FlipCard
                  frente={<div className="font-bold">scope</div>}
                  verso="Controla quais URLs o PWA pode 'patrulhar'."
                />
              </div>
            </div>

            <AlertBox tipo="info" titulo="TWA (Trusted Web Activity)">
              Uma tecnologia do Google que permite empacotar um PWA para
              publicação na Play Store usando uma guia customizada do Chrome,
              mantendo alta performance.
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "PWA Capabilities",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Web Manifest Structure",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "PWA = R.I.P.",
              content: (
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>R</strong>esponsive (Qualquer tela).
                  </p>
                  <p>
                    <strong>I</strong>ndependente de rede (Offline).
                  </p>
                  <p>
                    <strong>P</strong>rogressive (Funciona no velho, brilha no
                    novo).
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
          titulo="React Native: Advanced Architecture"
          descricao="Entenda a Bridge, JSI, Fabric e Turbo Modules na nova arquitetura."
          variant={mv[4]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index={1}
              title="O Motor Interno"
              variant={mv[4]}
            />

            <div className="bg-[#050505] p-8 rounded-2xl border border-slate-800 space-y-6">
              <h4 className="text-xl font-bold text-blue-400">
                The New Architecture: JSI
              </h4>
              <p className="text-lg text-slate-300 leading-relaxed">
                A antiga "Bridge" era assíncrona e serializava tudo em JSON. A
                nova **JSI (JavaScript Interface)** permite que o JavaScript
                tenha uma referência direta aos objetos nativos em C++,
                eliminando o gargalo de performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="p-4 bg-slate-900 rounded-lg space-y-2">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    Fabric
                  </h6>
                  <p className="text-[10px]">
                    O novo motor de renderização. Renderiza a UI nativamente de
                    forma muito mais eficiente e thread-safe.
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg space-y-2">
                  <h6 className="text-lg font-bold uppercase text-blue-500">
                    Turbo Modules
                  </h6>
                  <p className="text-[10px]">
                    Carregamento 'lazy' (sob demanda) de módulos nativos. Reduz
                    drasticamente o tempo de startup do app.
                  </p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Layout & Estilização Avançada"
              icone="🎨"
              corIndicador="bg-cyan-500"
              slides={[
                {
                  titulo: "Yoga Engine: Flexbox Deep Dive",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Diferente da Web, o RN usa o motor **Yoga**. Diferenças
                        cruciais:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-3">
                        <li>
                          <strong>flexDirection:</strong> No RN o padrão é
                          `column`, na Web é `row`.
                        </li>
                        <li>
                          <strong>Flexibility:</strong> No RN usamos `flex: 1`,
                          na Web o `flex` é uma propriedade atalho complexa.
                        </li>
                        <li>
                          <strong>Unidades:</strong> Não existe `rem` ou `em`.
                          Usamos números puros que representam pixels
                          independentes de densidade (dp/pt).
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Virtualização: FlatList vs SectionList",
                  conteudo: (
                    <div className="space-y-4">
                      <Comparison
                        title="Performance de Listas"
                        left={{
                          title: "FlatList",
                          content: "Listas lineares com dados dinâmicos.",
                          description:
                            "Usa windowing para renderizar apenas o necessário.",
                          variant: "info",
                        }}
                        right={{
                          title: "SectionList",
                          content: "Listas agrupadas com cabeçalhos fixos.",
                          description:
                            "Ideal para agendas ou contatos categorizados.",
                          variant: "info",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Debug & Ferramentas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            index={2}
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Yoga Engine Layout",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Hermes Bytecode",
                  type: "Esquema",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "Dica de Performance",
              content: (
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-lg">
                    <strong>Use Memoization:</strong> useMemo e useCallback são
                    vitais no RN para evitar re-renderizações que pesam no JS
                    Thread.
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
              index={1}
              title="Estado na Escala Corporativa"
              variant={mv[5]}
            />

            <ContentAccordion
              titulo="Redux Toolkit (RTK) no Mobile"
              icone="🔄"
              corIndicador="bg-violet-600"
              slides={[
                {
                  titulo: "O Fluxo Unidirecional",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        O Redux ainda é o padrão para apps complexos. No mobile,
                        adicionamos o **Persistence layer** para suporte
                        offline.
                      </p>
                      <TimelineItem
                        passo={1}
                        titulo="Action Dispatched"
                        descricao="O UI dispara um evento (ex: 'LOGIN_REQUEST')."
                      />
                      <TimelineItem
                        passo={2}
                        titulo="Reducer / Slice"
                        descricao="A lógica pura que altera o estado imutável."
                      />
                      <TimelineItem
                        passo={3}
                        titulo="Store Update"
                        descricao="Toda a árvore recebe o novo estado via Selectors."
                      />
                      <TimelineItem
                        passo={4}
                        titulo="Persistência"
                        descricao="Uso de redux-persist para salvar na AsyncStorage."
                        isLast={true}
                      />
                    </div>
                  ),
                },
                {
                  titulo: "Alternativas: Zustand & Context",
                  conteudo: (
                    <div className="space-y-4">
                      <Comparison
                        title="Zustand vs Redux"
                        left={{
                          title: "Zustand",
                          content:
                            "Hook-based, sem boilerplate. Extremamente rápido.",
                          description:
                            "Ideal para estados menores e rapidez de dev.",
                          variant: "success",
                        }}
                        right={{
                          title: "Redux",
                          content:
                            "Escalável, ferramentas de debug incríveis (DevTools).",
                          description:
                            "Padrão para equipes grandes e lógica densa.",
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
                Navegação Profissional: React Navigation
              </h4>
              <p className="text-lg text-muted-foreground">
                Como estruturar apps complexos (Petrobras Dashboards).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h6 className="font-bold underline italic">Deep Linking</h6>
                  <p className="text-lg">
                    Permite abrir telas específicas via URL (ex:
                    `petrobras://relatorio/50`). Vital para notificações push
                    que levam o usuário a uma ação.
                  </p>
                </div>
                <div className="space-y-4">
                  <h6 className="font-bold underline italic">Param Passing</h6>
                  <p className="text-lg">
                    Evite passar objetos gigantes via rota. Passe apenas o ID e
                    busque o dado do estado global ou API na tela de destino.
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

            <AlertBox tipo="warning" titulo="Memory Leaks em Listeners">
              Sempre remova os listeners de navegação (`navigation.addListener`)
              no cleanup do seu `useEffect` para evitar que funções fiquem
              rodando em background desnecessariamente.
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Redux Flow Mobile",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Deep Link Logic",
                  type: "Fluxograma",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "Prop Drilling? Jamais!",
              content: (
                <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                  <p className="text-lg italic">
                    "Se o dado viaja mais de 2 níveis para baixo, considere
                    Context ou uma Store Global."
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
              index={1}
              title="A Pintura da Interface"
              variant={mv[6]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full" />
                  Skia & Impeller Engine
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Diferente do React Native, o Flutter não usa componentes
                  nativos. Ele desenha cada pixel na tela usando a engine
                  **Skia** (ou a nova **Impeller** no iOS/Android moderno). Isso
                  garante 60/120 FPS constantes, pois elimina a 'bridge' de
                  layout.
                </p>
                <AlertBox tipo="info" titulo="O Que é Impeller?">
                  É a nova engine de renderização que resolve problemas de
                  "jank" (engasgos) de shaders pré-compilados, tornando as
                  animações fluidas desde a primeira execução.
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
                    <strong>Widget Tree:</strong> Configuração imutável (o
                    plano).
                  </li>
                  <li className="p-3 bg-muted rounded border-l-4 border-amber-400 text-lg">
                    <strong>Element Tree:</strong> Gerencia o ciclo de vida e
                    liga o Widget ao objeto de tela.
                  </li>
                  <li className="p-3 bg-muted rounded border-l-4 border-red-400 text-lg">
                    <strong>RenderObject Tree:</strong> Onde ocorre o cálculo de
                    tamanho (layout) e pintura (paint).
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
                        O Dart garante que um erro de 'null' nunca ocorra em
                        runtime se o tipo não for explicitamente anulável.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  titulo: "Mixins e Extensions",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Poderosos recursos de reuso de código sem herança
                        múltipla.
                      </p>
                      <ul className="list-disc pl-5 text-lg text-muted-foreground space-y-2">
                        <li>
                          <strong>Mixins:</strong> Compartilham comportamentos
                          entre classes que não herdam uma da outra.
                        </li>
                        <li>
                          <strong>Extensions:</strong> Adicionam métodos a
                          classes já existentes (ex: Int, String) sem
                          modificá-las.
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Dart Runtime",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Rendering Pipeline",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "Tudo é um Widget!",
              content: (
                <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                  <p className="text-lg">
                    No Flutter, até o alinhamento (Center) e o espaçamento
                    (Padding) são Widgets, não propriedades de CSS.
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
              index={1}
              title="Gerenciamento de Estado Reativo"
              variant={mv[7]}
            />

            <ContentAccordion
              titulo="O Padrão BLoC (Business Logic Component)"
              icone="🔄"
              corIndicador="bg-blue-600"
              slides={[
                {
                  titulo: "Separação de Preocupações",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        O BLoC separa a lógica da UI usando **Streams** e
                        **Sinks**. A UI envia Eventos e o BLoC devolve Estados.
                      </p>
                      <div className="bg-slate-950 p-6 rounded-xl border border-blue-500/30">
                        <h6 className="text-lg font-mono text-blue-400 mb-4 uppercase">
                          Workflow do BLoC:
                        </h6>
                        <ul className="space-y-2">
                          <li className="text-[10px] text-slate-300 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              1
                            </span>{" "}
                            UI dispara um <strong>Event</strong> (ex:
                            IncrementEvent).
                          </li>
                          <li className="text-[10px] text-slate-300 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              2
                            </span>{" "}
                            BLoC processa a lógica de negócio (ex: API Call).
                          </li>
                          <li className="text-[10px] text-slate-300 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              3
                            </span>{" "}
                            BLoC emite um novo <strong>State</strong> (ex:
                            SuccessState).
                          </li>
                          <li className="text-[10px] text-slate-300 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              4
                            </span>{" "}
                            Widgets usam <strong>BlocBuilder</strong> para
                            reconstruir apenas o necessário.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Riverpod: O Sucessor do Provider",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Resolve problemas de segurança em tempo de compilação e
                        elimina a necessidade do BuildContext para acessar o
                        estado.
                      </p>
                      <AlertBox tipo="warning" titulo="Vantagem Riverpod">
                        Diferente do Provider original, o Riverpod não depende
                        da árvore de widgets, permitindo declarar providers
                        globais que são escopados automaticamente.
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
              <h4 className="text-xl font-bold">Imutabilidade com Freezed</h4>
              <p className="text-lg text-muted-foreground">
                Gerar código para estados imutáveis e Uniões (Sealed Classes).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Union Types"
                  verso="Permite definir estados como: Loading, Loaded, Error de forma tipada."
                />
                <FlipCard
                  frente="Deep Copy"
                  verso="Gera o método copyWith para alterar campos em objetos imutáveis."
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Riverpod Scoping",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Freezed Logic",
                  type: "Infográfico",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "Sinks e Streams",
              content: (
                <p className="text-lg">
                  "Eventos entram no Sink, Estados saem para o Stream." Memorize
                  isso para BLoC.
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
              index={1}
              title="Integração Avançada"
              variant={mv[8]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  📍 Localização & Geofencing
                </h4>
                <p className="text-lg text-muted-foreground">
                  Trabalhar com localização no mobile exige cuidado com o
                  consumo de bateria. Diferenciamos **Foreground location**
                  (apenas com app aberto) de **Background location** (app
                  fechado).
                </p>
                <div className="p-4 bg-muted rounded-lg border border-border space-y-2">
                  <h6 className="text-[10px] font-bold uppercase">
                    Geofencing:
                  </h6>
                  <p className="text-[10px]">
                    Cria cercas virtuais. Quando o funcionário da Petrobras
                    entra na refinaria, o app pode disparar um alerta
                    automaticamente.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  🔐 Biometria & Segurança Nativa
                </h4>
                <p className="text-lg text-muted-foreground text-justify">
                  Uso de FaceID (iOS) e Impressão Digital (Android) via APIs
                  unificadas. O app não recebe o dado da digital, mas sim um{" "}
                  <strong>Token de sucesso</strong> vindo do hardware seguro.
                </p>
                <AlertBox tipo="warning" titulo="Keystore vs Keychain">
                  Sempre armazene tokens sensíveis aqui, nunca no
                  SharedPreferences/AsyncStorage comum, que são facilmente lidos
                  em dispositivos rooteados.
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
                        A API padrão para tarefas persistentes. Ela sobrevive a
                        reinicializações e respeita o **Doze Mode** (economia de
                        bateria).
                      </p>
                      <ul className="list-decimal pl-5 text-lg space-y-2">
                        <li>
                          Defina restrições (ex: apenas no Wi-Fi e Carregando).
                        </li>
                        <li>
                          O sistema agenda para o melhor momento possível.
                        </li>
                        <li>
                          Garante execução garantida, mesmo que o app seja
                          morto.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "iOS Background Fetch",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg text-center italic">
                        "Background no iOS é um privilégio, não um direito."
                      </p>
                      <p className="text-lg">
                        O sistema aprende o padrão de uso do usuário e acorda o
                        app periodicamente para atualizar dados (ex: e-mails).
                      </p>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Armazenamento Local</h4>
              <Comparison
                title="Bancos de Dados Mobile"
                left={{
                  title: "SQLite / Room",
                  content: "SQL Relacional clássico. Robusto e transacional.",
                  description: "Ideal para dados estruturados complexos.",
                  variant: "info",
                }}
                right={{
                  title: "Hive / Realm",
                  content: "NoSQL de alta performance (Baseado em chaves).",
                  description:
                    "Extremamente rápido para leitura e escrita simples.",
                  variant: "success",
                }}
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
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
                  title: "Sensor Hub Arch",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "WorkManager Life",
                  type: "Esquema",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Native Bridge Flow",
                  type: "Fluxo",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "O Fluxo de Permissão",
              content: (
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  <div className="p-2 border border-border rounded">
                    1. Declarar (Manifest)
                  </div>
                  <div className="p-2 border border-border rounded">
                    2. Checar (Check)
                  </div>
                  <div className="p-2 border border-border rounded">
                    3. Pedir (Request)
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
              index={1}
              title="A Experiência do Usuário"
              variant={mv[9]}
            />

            <div className="space-y-8">
              <h4 className="text-xl font-bold">Design Token Architecture</h4>
              <p className="text-lg text-muted-foreground">
                Em apps corporativos de grande escala (Petrobras), não usamos
                cores 'hardcoded'. Usamos Tokens.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center border border-border">
                  <span className="block w-6 h-6 mx-auto bg-blue-500 rounded-full mb-2"></span>
                  <p className="text-[10px] font-mono">brand.primary</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border">
                  <span className="block w-6 h-6 mx-auto bg-slate-200 rounded-full mb-2"></span>
                  <p className="text-[10px] font-mono">neutral.light</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border">
                  <span className="w-6 h-6 mx-auto border border-dashed rounded-full mb-2 flex items-center justify-center text-[8px]">
                    T
                  </span>
                  <p className="text-[10px] font-mono">spacing.04 (16px)</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center border border-border">
                  <span className="w-6 h-6 mx-auto flex items-center justify-center text-[10px]">
                    Aa
                  </span>
                  <p className="text-[10px] font-mono">font.body.m</p>
                </div>
              </div>
            </div>

            <ContentAccordion
              titulo="Acessibilidade (a11y) no Mobile"
              icone="♿"
              corIndicador="bg-green-600"
              slides={[
                {
                  titulo: "TalkBack & VoiceOver",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        O código deve ser navegável por leitores de tela. Sempre
                        use labels descritivos em botões de ícone.
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        <li>
                          <strong>accessibilityLabel:</strong> O que o leitor
                          diz.
                        </li>
                        <li>
                          <strong>accessibilityHint:</strong> O que acontece se
                          o usuário clicar.
                        </li>
                        <li>
                          <strong>minimumTouchTarget:</strong> 44x44 dp para
                          evitar erros de toque.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Cores e Contraste",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Ratio mínimo de 4.5:1 para texto normal. Teste sempre o
                        'Dark Mode' e como ele afeta a legibilidade em ambientes
                        de alta luminosidade (ex: plataformas de petróleo).
                      </p>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Micro-interações & Lottie</h4>
              <p className="text-lg text-muted-foreground">
                Movimentos que dão feedback e vida ao app.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente="Skeleton Loading"
                  verso="Melhora a percepção de performance enquanto os dados baixam."
                />
                <FlipCard
                  frente="Haptic Feedback"
                  verso="Pequenas vibrações ao completar ações críticas (ex: erro no formulário)."
                />
                <FlipCard
                  frente="Staggered Animation"
                  verso="Itens de lista aparecendo um a um, criando um efeito de cascata mais suave."
                />
                <FlipCard
                  frente="Shared Element Transitions"
                  verso="Objetos que parecem 'viajar' de uma tela para outra durante a navegação."
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Contrast Checker",
                  type: "Tool",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Animation Curves",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "Safe Area",
              content: (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-lg">
                  Sempre use o widget <strong>SafeArea</strong> no Flutter ou o
                  hook <strong>useSafeAreaInsets</strong> no RN para evitar que
                  a UI seja cortada pelo 'notch' ou 'island' do celular.
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
          descricao="O capítulo final: Automação total, Review das lojas e Padrões de Release."
          variant={mv[10]}
        />
        <div className="space-y-[60px] pb-20">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-md space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Entrega Contínua"
              variant={mv[10]}
            />

            <div className="space-y-10">
              <div className="bg-indigo-950 p-8 rounded-2xl border border-indigo-500/30">
                <h4 className="text-xl font-bold text-indigo-400 mb-4">
                  Fastlane Mastery
                </h4>
                <p className="text-lg text-indigo-200">
                  O Fastlane é a 'canivete suíço' da automação mobile. Ele
                  gerencia desde os certificados até o upload final para as
                  lojas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <span className="text-indigo-400 font-bold block italic uppercase text-[10px]">
                      Match
                    </span>
                    <p className="text-[10px]">
                      Gerencia as chaves de assinatura do iOS na nuvem para toda
                      a equipe. Fim do caos do 'Certificate Revoked'.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-indigo-400 font-bold block italic uppercase text-[10px]">
                      Supply
                    </span>
                    <p className="text-[10px]">
                      Automatiza o upload de screenshots em 20 línguas
                      diferentes para o Google Play em segundos.
                    </p>
                  </div>
                </div>
              </div>

              <ContentAccordion
                titulo="O Mistério do App Store Review"
                icone="🍎"
                corIndicador="bg-slate-500"
                slides={[
                  {
                    titulo: "Diretriz 4.0: Business & Design",
                    conteudo: (
                      <div className="space-y-4 text-lg">
                        <p>
                          A Apple rejeita apps que não parecem 'nativos' ou que
                          são apenas sites empacotados. É necessário ter valor
                          agregado real.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Segurança:</strong> Uso de HTTPS
                            obrigatório.
                          </li>
                          <li>
                            <strong>Pagamentos:</strong> Uso forçado da IAP
                            (In-App Purchase) para bens digitais.
                          </li>
                          <li>
                            <strong>Login:</strong> Se tiver login social, o
                            'Sign in with Apple' é obrigatório.
                          </li>
                        </ul>
                      </div>
                    ),
                  },
                  {
                    titulo: "Google Play Integrity",
                    conteudo: (
                      <p className="text-lg">
                        Uso do Play Integrity API para garantir que o
                        dispositivo do usuário não foi comprometido e que o app
                        é original da loja.
                      </p>
                    ),
                  },
                ]}
              />

              <div className="space-y-6">
                <h4 className="text-xl font-bold">
                  Release Patterns (Distribuição)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-muted rounded-xl border border-border">
                    <h6 className="font-bold text-lg mb-2">Internal Testing</h6>
                    <p className="text-[10px] text-muted-foreground">
                      Até 100 testers internos. Deploy imediato.
                    </p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl border border-border">
                    <h6 className="font-bold text-lg mb-2">
                      Alpha / TestFlight
                    </h6>
                    <p className="text-[10px] text-muted-foreground">
                      Primeira barreira de review externa. Geralmente 10 mil
                      testers.
                    </p>
                  </div>
                  <div className="p-6 bg-muted rounded-xl border border-border">
                    <h6 className="font-bold text-lg mb-2">Staged Rollout</h6>
                    <p className="text-[10px] text-muted-foreground">
                      Lançamento gradual (5% {"->"} 20% {"->"} 100%) para
                      monitorar crashes.
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
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "App Thinning Logic",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "/temp-img.png",
                },
                {
                  title: "Release Rollout",
                  type: "Gráfico",
                  placeholderColor: "amber",
                  imageUrl: "/temp-img.png",
                },
              ],
            }}
            maceteVisual={{
              title: "O Mantra do Lançamento",
              content: (
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-lg italic">
                  "Automatize tudo o que puder, pois o erro humano no dia do
                  lançamento custa caro nas lojas."
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
