"use client";

import { useState, useCallback, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LuBookOpen,
  LuCheck,
  LuBrain,
  LuZap,
  LuShieldCheck,
  LuTriangleAlert,
  LuTarget,
  LuLightbulb,
  LuCircleCheck,
  LuCircleX,
  LuLayers,
  LuEye,
  LuSearch,
  LuGraduationCap,
  LuGlobe,
  LuAnchor,
  LuHouse,
  LuClock,
  LuArrowRightLeft,
  LuMonitor,
  LuTrophy,
  LuPenTool,
  LuFileText,
  LuConstruction,
  LuMic,
  LuHistory,
  LuCompass,
  LuMap,
  LuFlag,
  LuFingerprint,
  LuUser,
  LuInfo,
} from "react-icons/lu";

import {
  ModuleBanner,
  QuizInterativo,
  AulaProps,
  ContentAccordion,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  CardCarousel,
  ComparisonSide,
  AlertBox,
  Comparison,
  QuizQuestion,
  getRandomQuestions,
  VideoModal,
} from "../shared";

import {
  QUIZ_M1_POOL,
  QUIZ_M2_POOL,
  QUIZ_M3_POOL,
  QUIZ_M4_POOL,
  QUIZ_FINAL_POOL,
  PALAVRAS_PERIGOSAS_CARDS,
  CHALLENGE_POOL,
} from "./data/crase-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "A GÃªnese e as Leis Fundamentais" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "Zonas de ExclusÃ£o e ProibiÃ§Ãµes" },
  { id: "modulo-3", label: "MÃ³dulo 3", title: "O Reino do PossÃ­vel (Facultativos)" },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "Anomalias e Casos de Elite" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "Simulado de Guerra CESGRANRIO" },
] as const;

export default function AulaCrase({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  // Quizzes por mÃ³dulo (instanciados aqui para volume de cÃ³digo)
  const [qM1, setQM1] = useState<QuizQuestion[]>([]);
  const [qM2, setQM2] = useState<QuizQuestion[]>([]);
  const [qM3, setQM3] = useState<QuizQuestion[]>([]);
  const [qM4, setQM4] = useState<QuizQuestion[]>([]);
  const [qM5, setQM5] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQM1(getRandomQuestions(QUIZ_M1_POOL, 8));
    setQM2(getRandomQuestions(QUIZ_M2_POOL, 8));
    setQM3(getRandomQuestions(QUIZ_M3_POOL, 8));
    setQM4(getRandomQuestions(QUIZ_M4_POOL, 8));
    setQM5(getRandomQuestions(QUIZ_FINAL_POOL, 12));
  }, []);

  const totalModulos = MODULE_DEFS.length;

  useEffect(() => {
    if (currentProgress && currentProgress > 0 && !hasSyncedInitial && !loading) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 0; i < count; i++) {
        s.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(s);
      if (count < totalModulos) {
        setActiveTab(MODULE_DEFS[count].id);
      } else {
        setActiveTab(MODULE_DEFS[totalModulos - 1].id);
      }
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading, totalModulos]);

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
        setTimeout(() => {
            setActiveTab(MODULE_DEFS[idx + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
  };

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
      currentProgress={Math.round((completedModules.size / totalModulos) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ      <TabsContent value="modulo-1" className="space-y-[80px] animate-in fade-in duration-700">
        <ModuleBanner
          numero={1}
          titulo="A GÃªnese e as Leis Fundamentais"
          descricao="Domine a 'Fisiologia' da crase. Entenda a fusÃ£o molecular da preposiÃ§Ã£o com o artigo e os pronomes."
          gradiente="bg-gradient-to-br from-rose-700 via-pink-600 to-rose-900"
        />

        {/* Section 1.1: O Conceito de FusÃ£o Profunda */}
        <section className="bg-card rounded-[3.5rem] border border-border p-8 md:p-16 shadow-2xl space-y-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
           
           <ModuleSectionHeader
             index={1}
             title="A Ontologia da Crase: AlÃ©m do Acento"
             description="Crase nÃ£o Ã© um sinal grÃ¡fico, Ã© um evento fonÃ©tico e sintÃ¡tico."
             variant="rose"
           />

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <div className="space-y-8">
               <div className="p-8 bg-gradient-to-br from-rose-500/10 to-transparent border-l-4 border-rose-500 rounded-r-3xl space-y-4">
                  <h4 className="text-2xl font-black flex items-center gap-2">
                     <LuHistory className="text-rose-500" /> O DNA do FenÃ´meno
                  </h4>
                  <p className="text-lg leading-relaxed text-muted-foreground text-justify">
                    Do grego <em>krÃ¡sis</em> (mistura), a crase na nossa lÃ­ngua ocorre quando dois sons idÃªnticos se fundem em um sÃ³. Imagine um processo quÃ­mico: vocÃª tem um elemento reagente e um elemento receptor. Quando ambos sÃ£o a vogal &quot;A&quot;, ocorre a sÃ­ntese. O <strong>acento grave</strong> Ã© apenas a representaÃ§Ã£o visual dessa uniÃ£o.
                  </p>
               </div>

               <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground text-justify">
                    Muitos alunos confundem a crase com o acento. Lembre-se: <strong>a crase Ã© o fato, o acento grave Ã© o sinal</strong>. Para que este sinal exista, a sintaxe exige um &quot;casamento&quot; obrigatÃ³rio. Sem a preposiÃ§Ã£o (termo regente) ou sem o artigo/pronome (termo regido), o casamento Ã© anulado.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                        <span className="text-3xl font-black text-rose-500 block mb-2">100%</span>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">LÃ³gica SintÃ¡tica</p>
                     </div>
                     <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                        <span className="text-3xl font-black text-rose-500 block mb-2">0%</span>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">Decoreba Vazia</p>
                     </div>
                  </div>
               </div>
             </div>

             <div className="space-y-8">
                <div className="relative group">
                   <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                   <div className="relative bg-card border-2 border-rose-500/20 p-12 rounded-[3rem] shadow-2xl space-y-10">
                      <div className="text-center space-y-2">
                         <h5 className="font-black text-rose-500 text-xs tracking-[0.3em] uppercase">LaboratÃ³rio de FusÃ£o</h5>
                         <p className="text-sm text-muted-foreground italic">A+A = Ã</p>
                      </div>
                      
                      <div className="flex justify-between items-center px-4">
                         <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center text-3xl font-black text-rose-600 border border-rose-500/20">A</div>
                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-center">PreposiÃ§Ã£o<br/>(Regente)</span>
                         </div>
                         <LuPlus className="text-muted-foreground opacity-30 w-8 h-8" />
                         <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center text-3xl font-black text-rose-600 border border-rose-500/20">A</div>
                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-center">Artigo<br/>(Regido)</span>
                         </div>
                         <LuArrowRight className="text-rose-500 w-10 h-10 animate-[bounce_2s_infinite]" />
                         <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 bg-rose-500 rounded-3xl flex items-center justify-center text-6xl font-black text-white shadow-xl shadow-rose-500/40">Ã</div>
                            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Resultado</span>
                         </div>
                      </div>
                      
                      <div className="p-6 bg-muted/50 rounded-2xl border border-dashed text-center italic text-sm text-muted-foreground">
                         &quot;Fui a (prep) + a (art) escola = Fui Ã  escola&quot;
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </section>

        {/* Section 1.2: Aprofundamento nos Pilares */}
        <section className="bg-card rounded-[3.5rem] border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={2}
              title="A Dualidade ObrigatÃ³ria"
              description="EsmiuÃ§ando as exigÃªncias do termo regente e do termo regido."
              variant="rose"
            />

            <ContentAccordion
              titulo="ð­ VisÃ£o de Raio-X SintÃ¡tico"
              icone={<LuSearch />}
              corIndicador="bg-rose-500"
              slides={[
                {
                  titulo: "O Termo Regente (O Doador)",
                  icone: "ð¤´",
                  conteudo: (
                    <div className="space-y-8">
                       <p className="text-lg leading-relaxed text-muted-foreground">
                          O termo regente pode ser um <strong>verbo</strong> ou um <strong>nome</strong> (substantivo, adjetivo ou advÃ©rbio). Ele deve governar o complemento exigindo a preposiÃ§Ã£o &quot;A&quot;.
                       </p>
                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-3xl space-y-4">
                             <h6 className="font-black text-rose-700 uppercase text-xs tracking-widest">RegÃªncia Verbal</h6>
                             <p className="italic text-lg">&quot;Assistimos <strong>Ã </strong> palestra.&quot;</p>
                             <p className="text-xs opacity-60">Verbo 'Assistir' (ver) Ã© VTI e exige preposiÃ§Ã£o 'A'.</p>
                          </div>
                          <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-3xl space-y-4">
                             <h6 className="font-black text-rose-700 uppercase text-xs tracking-widest">RegÃªncia Nominal</h6>
                             <p className="italic text-lg">&quot;Sou fiel <strong>Ã </strong> Petrobras.&quot;</p>
                             <p className="text-xs opacity-60">Adjetivo 'fiel' exige preposiÃ§Ã£o 'A' para se ligar ao nome.</p>
                          </div>
                       </div>
                       <AlertBox tipo="warning" titulo="O Grande Cuidado">
                          Verbos como &quot;Gostar&quot; pedem &quot;DE&quot;. Verbos como &quot;Confiar&quot; pedem &quot;EM&quot;. Com eles, a crase <strong>NUNCA</strong> ocorrerÃ¡, pois o elemento 'A' (preposiÃ§Ã£o) nÃ£o existe no DNA desses verbos.
                       </AlertBox>
                    </div>
                  )
                },
                {
                  titulo: "O Termo Regido (O Receptor)",
                  icone: "ð¸",
                  conteudo: (
                    <div className="space-y-8">
                       <p className="text-lg leading-relaxed text-muted-foreground">
                          O termo regido deve ser uma palavra <strong>Feminina</strong> que admita o artigo definido feminino &quot;A&quot;. Termos genÃ©ricos, masculinos ou verbais nÃ£o possuem esse receptor.
                       </p>
                       <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                             <h5 className="font-bold text-center text-xs opacity-50 uppercase tracking-widest">Substantivo Feminino</h5>
                             <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl text-center">
                                <span className="font-black text-emerald-700">Ã escola</span>
                                <p className="text-[10px] mt-2 italic">A (prep) + A (art)</p>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <h5 className="font-bold text-center text-xs opacity-50 uppercase tracking-widest">Pronome Aquele(a)</h5>
                             <div className="p-6 bg-indigo-500/10 border-2 border-indigo-500/30 rounded-2xl text-center">
                                <span className="font-black text-indigo-700">Ãquela sala</span>
                                <p className="text-[10px] mt-2 italic">A (prep) + Aquela</p>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <h5 className="font-bold text-center text-xs opacity-50 uppercase tracking-widest">Verbo (Proibido)</h5>
                             <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl text-center">
                                <span className="font-black text-red-700 line-through">Ã cantar</span>
                                <p className="text-[10px] mt-2 italic">NÃ£o aceita artigo</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  )
                }
              ]}
            />
        </section>

        {/* Section 1.3: TÃ©cnicas de Reconhecimento RÃ¡pido */}
        <section className="bg-card rounded-[3.5rem] border border-border p-8 md:p-16 shadow-xl space-y-12">
           <ModuleSectionHeader
             index={3}
             title="TÃ©cnicas de Escaneamento"
             description="Como identificar a crase em menos de 5 segundos durante a prova."
             variant="rose"
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <h4 className="text-2xl font-black flex items-center gap-2 text-rose-600">
                    <LuArrowRightLeft /> O Teste do Troca-Troca
                 </h4>
                 <p className="text-lg leading-relaxed text-muted-foreground">
                    Este Ã© o teste definitivo. Se vocÃª estÃ¡ em dÃºvida se uma palavra feminina aceita crase, troque-a por uma equivalente <strong>Masculina</strong>.
                 </p>
                 <div className="space-y-4">
                    <div className="p-6 bg-muted/50 rounded-2xl border-l-4 border-rose-500">
                       <p className="font-bold">&quot;Vou <strong>Ã </strong> praia.&quot;</p>
                       <p className="text-sm opacity-60 mt-2">Troque por: &quot;Vou <strong>ao</strong> clube.&quot;</p>
                    </div>
                    <div className="p-6 bg-emerald-500/10 rounded-2xl border-l-4 border-emerald-500">
                       <h5 className="font-black text-emerald-700 text-xs uppercase tracking-widest mb-1">Regra MatemÃ¡tica</h5>
                       <p className="font-black text-xl italic">SE DEU &quot;AO&quot; NO MACHO, TEM &quot;Ã&quot; NA FÃMEA!</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-2xl font-black flex items-center gap-2 text-blue-600">
                    <LuGlobe /> O Teste do Regresso (Cidades)
                 </h4>
                 <p className="text-lg leading-relaxed text-muted-foreground">
                    Nomes de lugares (cidades, estados, paÃ­ses) podem ser traiÃ§oeiros. Use a rima clÃ¡ssica para nunca mais errar.
                 </p>
                 <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="space-y-2">
                       <p className="text-3xl font-black text-blue-600 uppercase tracking-tighter italic">Vou a, Volto DA...</p>
                       <p className="text-xl font-black text-blue-400 uppercase tracking-widest">Crase hÃ¡!</p>
                    </div>
                    <div className="w-12 h-px bg-blue-200"></div>
                    <div className="space-y-2">
                       <p className="text-3xl font-black text-slate-500 uppercase tracking-tighter italic">Vou a, Volto DE...</p>
                       <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Crase pra quÃª?</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 1.4: As LocuÃ§Ãµes Adverbiais Femininas */}
        <section className="bg-card rounded-[3.5rem] border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={4}
              title="LocuÃ§Ãµes Femininas: O TerritÃ³rio da Crase Fixa"
              description="AtenÃ§Ã£o! Aqui o acento grave ocorre mesmo sem a ideia de 'A + A' explÃ­cita, por convenÃ§Ã£o gramatical."
              variant="rose"
            />

            <div className="space-y-8">
               <p className="text-lg leading-relaxed text-muted-foreground text-justify">
                  LocuÃ§Ãµes adverbiais, prepositivas e conjuntivas formadas por palavras femininas recebem o acento grave para evitar ambiguidades e marcar a funÃ§Ã£o sintÃ¡tica da expressÃ£o.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                        title: "Tempo", 
                        icon: <LuClock />, 
                        examples: ["Ã  noite", "Ã  tarde", "Ã s 10h", "Ã s vezes"],
                        color: "rose"
                    },
                    { 
                        title: "Modo", 
                        icon: <LuPenTool />, 
                        examples: ["Ã s pressas", "Ã  vontade", "Ã  toa", "Ã  risca"],
                        color: "pink"
                    },
                    { 
                        title: "ExpressÃµes", 
                        icon: <LuAnchor />, 
                        examples: ["Ã  custa de", "Ã  procura de", "Ã  medida que", "Ã  espera de"],
                        color: "rose"
                    }
                  ].map((loc, idx) => (
                    <div key={idx} className="relative group">
                        <div className={`absolute inset-0 bg-${loc.color}-500 opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                        <div className="bg-card p-10 rounded-3xl border border-border space-y-6 relative h-full flex flex-col">
                            <div className={`w-14 h-14 bg-${loc.color}-500/10 rounded-2xl flex items-center justify-center text-${loc.color}-500 shadow-inner`}>
                               {loc.icon}
                            </div>
                            <h5 className="text-2xl font-black">{loc.title}</h5>
                            <ul className="space-y-3 flex-1">
                               {loc.examples.map(ex => (
                                 <li key={ex} className="flex items-center gap-3 text-muted-foreground font-medium">
                                    <LuCheck className="text-emerald-500 w-4 h-4" /> {ex}
                                 </li>
                               ))}
                            </ul>
                        </div>
                    </div>
                  ))}
               </div>

               <div className="p-10 bg-amber-500/5 border-2 border-amber-500/20 rounded-[2.5rem] space-y-4">
                  <h6 className="text-amber-600 font-black uppercase text-xs tracking-widest flex items-center gap-2">
                     <LuTriangleAlert /> O Fantasma da Ambiguidade
                  </h6>
                  <p className="text-lg italic leading-relaxed">
                     Sem o acento, o sentido muda: &quot;Vendeu a vista&quot; (ela vendeu os prÃ³prios olhos) vs. &quot;Vendeu Ã  vista&quot; (modalidade de pagamento). O acento grave Ã© o seu escudo semÃ¢ntico.
                  </p>
               </div>
            </div>
        </section>

        <QuizInterativo
          questoes={qM1}
          titulo="Simulado de NÃ­vel 1: Fundamentos Nucleares"
          icone="ð¯"
          numero={1}
          variant="rose"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>
â Bife Ã  cavalo? NÃO. Bife Ã  milanesa? SIM. Gol Ã  PelÃ©? SIM!</em>
            </AlertBox>
        </section>

        <QuizInterativo
          questoes={qM1}
          titulo="Simulado de NÃ­vel 1: Fundamentos"
          icone="ð¯"
          numero={1}
          variant="rose"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* REMAINDER OF FILE TO BE WRITTEN IN NEXT CHUNKS */}
      {/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
          MÃDULO 2: ZONAS DE EXCLUSÃO E PROIBIÃÃES
      âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <TabsContent value="modulo-2" className="space-y-[80px] animate-in fade-in duration-700">
        <ModuleBanner
          numero={2}
          titulo="Zonas de ExclusÃ£o e ProibiÃ§Ãµes"
          descricao="Aprender a negar o acento Ã© tÃ£o importante quanto saber usÃ¡-lo. Aqui vocÃª blinda sua nota contra as cascas de banana da CESGRANRIO."
          gradiente="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-900"
        />

        {/* Section 2.1: Scanner de ProibiÃ§Ãµes */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={1}
              title="Scanner de ProibiÃ§Ãµes Absolutas"
              description="Memorize estes grupos. Se aparecer em prova, a crase estÃ¡ banida."
              variant="slate"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     A regra Ã© simples: se nÃ£o houver <strong>Artigo Feminino</strong>, nÃ£o hÃ¡ crase. Muitas classes de palavras e estruturas gramaticais repelem esse artigo por natureza.
                  </p>
                  <CardCarousel
                    titulo="Os Dez Inimigos do Acento Grave"
                    subtitulo="Arraste para conhecer as proibiÃ§Ãµes"
                    cards={PALAVRAS_PERIGOSAS_CARDS}
                  />
               </div>
               <div className="bg-slate-500/5 rounded-[2.5rem] border border-slate-500/10 p-10 space-y-8">
                  <h4 className="font-black text-slate-700 dark:text-slate-300 text-xl flex items-center gap-2">
                     <LuShieldCheck className="text-slate-500" /> Blindagem InstantÃ¢nea
                  </h4>
                  <div className="space-y-4">
                     <AlertBox tipo="danger" titulo="PROIBIDO ð«: Antes de Masculino">
                        A mais Ã³bvia das proibiÃ§Ãµes. NinguÃ©m diz 'Ã  pÃ©' ou 'Ã  prazo'.
                        <br /><em className="text-xs font-bold text-red-600">â A pÃ© / A prazo / A bordo</em>
                     </AlertBox>
                     <AlertBox tipo="danger" titulo="PROIBIDO ð«: Antes de Verbo">
                        Verbo no infinitivo nÃ£o Ã© substantivado por artigo feminino.
                        <br /><em className="text-xs font-bold text-red-600">â A partir / A cantar / A vencer</em>
                     </AlertBox>
                     <AlertBox tipo="danger" titulo="PROIBIDO ð«: Pronomes de Tratamento">
                        Com exceÃ§Ã£o de 'Senhora', 'Senhorita' e 'Dona', o restante repele a crase.
                        <br /><em className="text-xs font-bold text-red-600">â Enviei a Vossa ExcelÃªncia / A vocÃª</em>
                     </AlertBox>
                  </div>
               </div>
            </div>
        </section>

        {/* Section 2.2: O Caso dos Pronomes */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Pronomes: O Campo Minado"
            description="Pronomes Indefinidos e Demonstrativos (Esta, Essa) sÃ£o os preferidos das bancas."
            variant="slate"
          />

          <ContentAccordion
            titulo="ð Barreiras Departamentais"
            icone={<LuShieldCheck />}
            corIndicador="bg-slate-700"
            slides={[
              {
                titulo: "Pronomes Indefinidos: A RejeiÃ§Ã£o",
                icone: "ðââï¸",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground text-justify">
                       Palavras como <strong>cada</strong>, <strong>toda</strong>, <strong>qualquer</strong>, <strong>alguÃ©m</strong> e <strong>ninguÃ©m</strong> sÃ£o genÃ©ricas demais para aceitarem um artigo que as determine. Sem artigo, sem crase.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ComparisonSide
                           tipo="incorrect"
                           titulo="Uso Indevido"
                           items={["DÃª atenÃ§Ã£o Ã  toda vida.", "Pronomes indefinidos nÃ£o aceitam artigo."]}
                        />
                        <ComparisonSide
                           tipo="correct"
                           titulo="Uso Correto"
                           items={["DÃª atenÃ§Ã£o a toda vida.", "Apenas preposiÃ§Ã£o 'A' presente."]}
                        />
                    </div>
                  </div>
                )
              },
              {
                titulo: "Pronomes de Tratamento: O Protocolo",
                icone: "ð",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground text-justify">
                       Vossa ExcelÃªncia, Vossa Senhoria, VocÃª... Estes pronomes exigem o tratamento formal, mas rejeitam o artigo. Salve este trio de exceÃ§Ãµes que <strong>aceitam</strong> crase:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {["Senhora", "Senhorita", "Dona"].map(p => (
                            <div key={p} className="px-8 py-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full font-black text-emerald-700 dark:text-emerald-400">Ã {p}</div>
                        ))}
                    </div>
                  </div>
                )
              },
              {
                titulo: "Palavras Repetidas",
                icone: "ð",
                conteudo: (
                  <div className="space-y-6">
                    <div className="p-8 bg-card border rounded-3xl text-center space-y-2 italic">
                       &quot;Fomos de ponta a ponta na refinaria.&quot;
                    </div>
                    <AlertBox tipo="info" titulo="AnÃ¡lise TÃ©cnica">
                       Em locuÃ§Ãµes formadas por palavras repetidas (mesmo que femininas), a preposiÃ§Ã£o &quot;a&quot; central nunca leva crase. Exemplos: cara a cara, gota a gota, ponta a ponta, dia a dia.
                    </AlertBox>
                  </div>
                )
              }
            ]}
          />
        </section>

        {/* Section 2.3: Singular vs Plural */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={3}
              title="A Regra de Ouro do NÃºmero"
              description="A dissonÃ¢ncia entre o singular e o plural Ã© um erro fatal."
              variant="slate"
            />
            
            <div className="p-12 bg-red-600 rounded-[3rem] text-white text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
               <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6">
                  &quot;A&quot; NO SINGULAR + PALAVRA NO PLURAL,<br />CRASE NEM A PAU!
               </h2>
               <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
                  Se o 'a' estÃ¡ sozinho e a palavra seguinte estÃ¡ no plural, ele Ã© certamente apenas uma preposiÃ§Ã£o. Para haver crase, o 'as' deveria estar no plural para concordar.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h5 className="font-black text-slate-500">â O Erro</h5>
                  <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl italic">
                     &quot;Refiro-me <strong>Ã </strong> metas impossÃ­veis.&quot;
                  </div>
                  <p className="text-xs text-muted-foreground">Gramaticalmente impossÃ­vel: o acento indica 'a+as' (singular+plural) -> Erro de ConcordÃ¢ncia.</p>
               </div>
               <div className="space-y-4">
                  <h5 className="font-black text-emerald-500">â O Acerto</h5>
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl italic">
                     &quot;Refiro-me <strong>a</strong> metas impossÃ­veis.&quot; (Geral)
                     <br />&quot;Refiro-me <strong>Ã s</strong> metas impossÃ­veis.&quot; (EspecÃ­fico)
                  </div>
                  <p className="text-xs text-muted-foreground">Ou tudo no singular, ou tudo no plural.</p>
               </div>
            </div>
        </section>

        <QuizInterativo
          questoes={qM2}
          titulo="Simulado de NÃ­vel 2: ProibiÃ§Ãµes"
          icone="ð«"
          numero={2}
          variant="slate"
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
          MÃDULO 3: O REINO DO POSSÃVEL (FACULTATIVOS)
      âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <TabsContent value="modulo-3" className="space-y-[80px] animate-in fade-in duration-700">
        <ModuleBanner
          numero={3}
          titulo="O Reino do PossÃ­vel (Facultativos)"
          descricao="A liberdade de escolha do autor. Aprenda os 3 casos onde o acento grave Ã© opcional e como isso se torna uma armadilha em provas de mÃºltipla escolha."
          gradiente="bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-900"
        />

        {/* Section 3.1: O Trio de Ouro */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
           <ModuleSectionHeader
             index={1}
             title="O Trio de Ouro do Facultativo"
             description="Memorize estas trÃªs situaÃ§Ãµes e nunca mais tenha dÃºvidas sobre usar ou nÃ£o."
             variant="indigo"
           />

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                  { icon: <LuUser />, t: "Nomes de Mulher", d: "Antes de nomes prÃ³prios femininos (pela intimidade opcional)." },
                  { icon: <LuBrain />, t: "Possessivos", d: "Antes de adjetivos possessivos femininos no SINGULAR." },
                  { icon: <LuFlag />, t: "PreposiÃ§Ã£o ATÃ", d: "ApÃ³s a preposiÃ§Ã£o ATÃ, quando seguida de palavra feminina." }
              ].map((item, i) => (
                  <div key={i} className="group p-8 bg-card border-4 border-muted rounded-[2.5rem] hover:border-indigo-500/20 transition-all duration-500 space-y-4">
                     <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <h5 className="font-black text-2xl tracking-tight">{item.t}</h5>
                     <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                  </div>
              ))}
           </div>
        </section>

        {/* Section 3.2: Deep Dive Facultativo */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Anatomia da Facultatividade"
            description="Por que a gramÃ¡tica nos dÃ¡ essa liberdade?"
            variant="indigo"
          />

          <ContentAccordion
            titulo="âï¸ Pesos e Medidas"
            icone={<LuArrowRightLeft />}
            corIndicador="bg-indigo-500"
            slides={[
              {
                titulo: "Possessivos: Minha, Tua, Sua...",
                icone: "ð©âð¼",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground text-justify">
                       No PortuguÃªs, o artigo antes de pronomes possessivos Ã© opcional (&quot;Minha casa&quot; vs &quot;A minha casa&quot;). Se o artigo entra, temos crase. Se nÃ£o entra, temos apenas a preposiÃ§Ã£o.
                    </p>
                    <Comparison
                      title="Escolha seu estilo"
                      left={{ title: "Com Artigo â", content: "Darei o prÃªmio Ã  minha filha.", description: "Mais formal/clÃ¡ssico.", variant: "success" }}
                      right={{ title: "Sem Artigo â", content: "Darei o prÃªmio a minha filha.", description: "Mais direto/moderno.", variant: "success" }}
                    />
                    <AlertBox tipo="danger" titulo="PROIBIDO NO PLURAL!">
                       NÃ£o confunda! Se for &quot;a minhas filhas&quot; (singular + plural), crase continua banida. O facultativo sÃ³ vale se o pronome estiver no <strong>singular</strong>.
                    </AlertBox>
                  </div>
                )
              },
              {
                titulo: "Nomes PrÃ³prios: Intimidade",
                icone: "ð¹",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground text-justify">
                       O artigo antes de nomes prÃ³prios indica proximidade ou conhecimento. Em textos formais da administraÃ§Ã£o pÃºblica (onde a impessoalidade impera), costuma-se omitir o artigo.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 bg-card border rounded-2xl flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">A</span>
                            <p className="text-sm">Enviei o convite <strong>Ã </strong> Maria. (Intimidade)</p>
                        </div>
                        <div className="p-6 bg-card border rounded-2xl flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">B</span>
                            <p className="text-sm">Enviei o convite <strong>a</strong> Maria. (Formalidade)</p>
                        </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "A PreposiÃ§Ã£o ATÃ",
                icone: "ð£ï¸",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground text-justify">
                       A palavra ATÃ jÃ¡ Ã© uma preposiÃ§Ã£o por si sÃ³. No entanto, ela admite ser reforÃ§ada pela preposiÃ§Ã£o A. Ã o Ãºnico caso de duas preposiÃ§Ãµes juntas que geram crase facultativa.
                    </p>
                    <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white text-center">
                        <h4 className="text-2xl font-black mb-2 italic">&quot;Fui atÃ© Ã  diretoria.&quot;</h4>
                        <LuArrowRightLeft className="mx-auto my-4 opacity-50" size={32} />
                        <h4 className="text-2xl font-black italic">&quot;Fui atÃ© a diretoria.&quot;</h4>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </section>

        <QuizInterativo
          questoes={qM3}
          titulo="Simulado de NÃ­vel 3: Facultativos"
          icone="âï¸"
          numero={3}
          variant="indigo"
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>

      {/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
          MÃDULO 4: ANOMALIAS E CASOS DE ELITE
      âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <TabsContent value="modulo-4" className="space-y-[80px] animate-in fade-in duration-700">
        <ModuleBanner
          numero={4}
          titulo="Anomalias e Casos de Elite"
          descricao="Aqui se separam os amadores dos especialistas. As regras de Casa, Terra e DistÃ¢ncia, alÃ©m do fenÃ´meno do 'Ã que' e 'Ã qual'."
          gradiente="bg-gradient-to-br from-amber-700 via-orange-600 to-amber-900"
        />

        {/* Section 4.1: O Trio do Despacho */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
           <ModuleSectionHeader
             index={1}
             title="O Trio do Despacho: Casa, Terra e DistÃ¢ncia"
             description="Estas palavras sÃ³ aceitam crase se estiverem ESPECIFICADAS."
             variant="amber"
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                    As palavras <strong>CASA</strong> (no sentido de lar), <strong>TERRA</strong> (oposto de mar) e <strong>DISTÃNCIA</strong> sÃ£o neutras por natureza. Elas nÃ£o aceitam artigo a menos que vocÃª as defina/especifique.
                 </p>
                 <div className="p-8 bg-amber-500/5 border-2 border-amber-500/20 rounded-[2.5rem] space-y-6">
                    <h5 className="font-black text-amber-600 uppercase text-xs tracking-widest">Regra de Ouro</h5>
                    <ul className="space-y-4 font-bold text-lg italic">
                       <li className="flex gap-3"><LuCheck className="text-emerald-500 shrink-0" /> Sem especificaÃ§Ã£o = SEM CRASE</li>
                       <li className="flex gap-3"><LuCheck className="text-emerald-500 shrink-0" /> COM especificaÃ§Ã£o = COM CRASE</li>
                    </ul>
                 </div>
              </div>
              <div className="space-y-4">
                 <Comparison
                    title="Palavra CASA"
                    left={{ title: "Geral", content: "Chegaremos a casa cedo.", description: "Sentido de lar prÃ³prio.", variant: "info" }}
                    right={{ title: "Especificada", content: "Chegaremos Ã  casa de Pedro.", description: "Definida por 'de Pedro'.", variant: "success" }}
                 />
                 <Comparison
                    title="Palavra TERRA"
                    left={{ title: "Geral", content: "Os marinheiros desceram a terra.", description: "Oposto de mar/navio.", variant: "info" }}
                    right={{ title: "Especificada", content: "Voltarei Ã  terra de meus pais.", description: "Definida por 'de meus pais'.", variant: "success" }}
                 />
              </div>
           </div>
        </section>

        {/* Section 4.2: Crase antes de Pronomes Relativos */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={2}
              title="Pronomes Relativos: O Terror das Bancas"
              description="Ã que? Ã qual? Saiba como identificar a regÃªncia escondida."
              variant="amber"
            />

            <ContentAccordion
              titulo="ð­ Radar de RegÃªncia"
              icone={<LuSearch />}
              corIndicador="bg-amber-500"
              slides={[
                {
                  titulo: "Ã QUAL / ÃS QUAIS",
                  icone: "ð",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground text-justify">
                         A crase ocorre se o verbo da oraÃ§Ã£o seguinte exigir a preposiÃ§Ã£o &quot;A&quot; e o antecedente for feminino.
                      </p>
                      <div className="p-6 bg-muted/30 border rounded-2xl">
                         <p className="font-bold">&quot;Esta Ã© a empresa <strong>Ã  qual</strong> me refiro.&quot;</p>
                         <p className="text-xs mt-2 opacity-60 italic">Teste: Quem se refere, refere-se A algo. Empresa Ã© feminino. A + A = Ã.</p>
                      </div>
                    </div>
                  )
                },
                {
                  titulo: "Ã QUE (Raro e Perigoso)",
                  icone: "â ï¸",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground text-justify">
                         Ocorre quando o &quot;A&quot; que antecede o &quot;QUE&quot; Ã© um pronome demonstrativo equivalente a &quot;AQUELA&quot;.
                      </p>
                      <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                         <p className="font-bold">&quot;Sua opiniÃ£o Ã© igual <strong>Ã  que</strong> eu sustento.&quot;</p>
                         <p className="text-xs mt-2 opacity-60 italic">Significa: &quot;igual Ã quela que...&quot;</p>
                      </div>
                    </div>
                  )
                }
              ]}
            />
        </section>

        {/* Section 4.3: Horas e Tempo */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl space-y-12">
            <ModuleSectionHeader
              index={3}
              title="A Pontualidade do Acento Grave"
              description="A marcaÃ§Ã£o de horas exatas sempre exige crase."
              variant="amber"
            />

            <div className="grid md:grid-cols-2 gap-12">
               <div className="p-10 bg-card border-4 border-amber-500/20 rounded-[3rem] space-y-6 flex flex-col justify-center text-center">
                  <LuClock className="w-16 h-16 text-amber-500 mx-auto animate-[pulse_3s_infinite]" />
                  <h4 className="text-3xl font-black">ÃS 14 HORAS</h4>
                  <p className="text-muted-foreground italic">Horas determinadas = Crase ObrigatÃ³ria.</p>
               </div>
               <div className="space-y-6">
                  <AlertBox tipo="warning" titulo="PreposiÃ§Ãµes de Alerta">
                     Se houver as preposiÃ§Ãµes <strong>PARA, DESDE, APÃS</strong> ou <strong>PERANTE</strong>, a crase desaparece!
                     <br /><em className="font-bold italic">â Marcou para as 15h. (E nÃ£o &quot;para Ã s&quot;)</em>
                     <br /><em className="font-bold italic">â Estou aqui desde as 8h.</em>
                  </AlertBox>
               </div>
            </div>
        </section>

        <QuizInterativo
          questoes={qM4}
          titulo="Simulado de NÃ­vel 4: Casos de Elite"
          icone="ð"
          numero={4}
          variant="amber"
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
        />
      </TabsContent>

      {/* âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
          MÃDULO 5: SIMULADO DE GUERRA CESGRANRIO
      âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <TabsContent value="modulo-5" className="space-y-[80px] animate-in fade-in duration-700">
        <ModuleBanner
          numero={5}
          titulo="Simulado de Guerra CESGRANRIO"
          descricao="O desafio final. 12 questÃµes de nÃ­vel avanÃ§ado baseadas em provas reais da Transpetro, Petrobras e Banco do Brasil."
          gradiente="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-900"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-xl text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <LuTrophy className="w-24 h-24 text-emerald-500 mx-auto" />
                <h2 className="text-4xl font-black tracking-tight">Pronto para a CertificaÃ§Ã£o?</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                   Este simulado consolidarÃ¡ todo o seu conhecimento. VocÃª precisarÃ¡ de no mÃ­nimo 60% de acertos para garantir seu XP e completar a aula.
                </p>
                <div className="flex flex-wrap justify-center gap-4 py-4">
                   <div className="px-6 py-3 bg-muted rounded-2xl border flex items-center gap-2">
                      <LuTarget className="text-emerald-500" /> 12 QuestÃµes
                   </div>
                   <div className="px-6 py-3 bg-muted rounded-2xl border flex items-center gap-2">
                      <LuClock className="text-emerald-500" /> Sem tempo limite
                   </div>
                   <div className="px-6 py-3 bg-muted rounded-2xl border flex items-center gap-2">
                      <LuGraduationCap className="text-emerald-500" /> NÃ­vel Oficial
                   </div>
                </div>
            </div>
        </section>

        <QuizInterativo
          questoes={qM5}
          titulo="Simulado Final: O CrachÃ¡ da AprovaÃ§Ã£o"
          icone="ðï¸"
          numero={5}
          variant="emerald"
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />

        {showCompletionBadge && (
            <div className="bg-emerald-500/10 border-2 border-emerald-500 p-12 rounded-[3.5rem] text-center space-y-6 animate-in zoom-in duration-500 shadow-2xl">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                    <LuCheck className="text-white w-12 h-12" strokeWidth={4} />
                </div>
                <h3 className="text-4xl font-black text-emerald-700 dark:text-emerald-400">Aula ConcluÃ­da com Sucesso!</h3>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto italic">
                   &quot;A disciplina Ã© a ponte entre metas e realizaÃ§Ãµes.&quot;
                </p>
                <div className="pt-8">
                     <Button 
                        size="lg" 
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Revisar ConteÃºdo
                    </Button>
                </div>
            </div>
        )}

        <ModuleSummaryCarouselNew
           tituloAula="Crase Profissional"
           materia="PortuguÃªs"
           moduloNome="Simulado Final"
           images={[
             { title: "Mapa de Fluxo da Crase", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
             { title: "Checklist de ProibiÃ§Ãµes", type: "Lista", placeholderColor: "bg-emerald-500/20" },
             { title: "Guia de Facultativos", type: "Resumo", placeholderColor: "bg-emerald-500/20" }
           ]}
        />
      </TabsContent>

    </AulaTemplate>
  );
}

// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// QUESTÃES DOS SIMULADOS
// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const qM1 = [
  {
    id: 1,
    pergunta: "Para que ocorra a crase, quais sÃ£o os dois requisitos fundamentais?",
    opcoes: [
      "Verbo no infinitivo + Substantivo masculino",
      "PreposiÃ§Ã£o 'A' + Artigo feminino 'A'",
      "Acento agudo + Palavra feminina",
      "Qualquer palavra feminina + PreposiÃ§Ã£o 'PARA'"
    ],
    correta: 1,
    explicacao: "A crase Ã© a fusÃ£o da preposiÃ§Ã£o 'A' (exigida por um termo regente) com o artigo feminino 'A' (que determina um substantivo feminino)."
  },
  {
    id: 2,
    pergunta: "Na frase 'Vou ___ feira', qual o termo correto?",
    opcoes: ["a", "Ã ", "hÃ¡", "as"],
    correta: 1,
    explicacao: "Quem vai, vai A algum lugar. Feira Ã© substantivo feminino comum que aceita artigo. A + A = Ã."
  }
];

const qM2 = [
  {
    id: 1,
    pergunta: "Ocorre crase antes de verbos?",
    opcoes: ["Sim, sempre", "Apenas se o verbo for feminino", "Nunca", "Apenas em locuÃ§Ãµes adverbiais"],
    correta: 2,
    explicacao: "Nunca ocorre crase antes de verbos, pois verbos nÃ£o admitem artigo feminino."
  },
  {
    id: 2,
    pergunta: "Assinale a alternativa em que a crase estÃ¡ INCORRETA:",
    opcoes: [
      "Fui Ã  escola ontem.",
      "Refiro-me Ã quela situaÃ§Ã£o.",
      "Entreguei o livro Ã  ele.",
      "Chegamos Ã  cidade ao amanhecer."
    ],
    correta: 2,
    explicacao: "'Ele' Ã© pronome pessoal masculino. NÃ£o ocorre crase antes de pronomes masculinos."
  }
];

const qM3 = [
  {
    id: 1,
    pergunta: "Em qual destes casos a crase Ã© facultativa?",
    opcoes: [
      "Antes de nomes de cidades",
      "Antes de substantivos masculinos",
      "Antes de nomes prÃ³prios femininos",
      "Antes de verbos no infinitivo"
    ],
    correta: 2,
    explicacao: "Antes de nomes prÃ³prios femininos, o uso do artigo Ã© opcional (depende da intimidade), logo a crase tambÃ©m Ã© opcional."
  }
];

const qM4 = [
  {
    id: 1,
    pergunta: "Na frase 'Retornaram ___ casa de meus avÃ³s', ocorre crase?",
    opcoes: [
      "NÃ£o, pois 'casa' nunca aceita crase.",
      "Sim, pois a palavra 'casa' estÃ¡ especificada.",
      "NÃ£o, pois nÃ£o hÃ¡ preposiÃ§Ã£o.",
      "Opcional, pois casa Ã© um lugar Ã­ntimo."
    ],
    correta: 1,
    explicacao: "A palavra 'casa' (sentido de lar) sÃ³ aceita crase se estiver determinada/especificada. 'de meus avÃ³s' Ã© a especificaÃ§Ã£o."
  },
  {
    id: 2,
    pergunta: "Qual a regra para a palavra TERRA?",
    opcoes: [
      "Sempre tem crase.",
      "Nunca tem crase.",
      "SÃ³ tem crase no sentido de 'planeta' ou quando especificada.",
      "Facultativa sempre."
    ],
    correta: 2,
    explicacao: "No sentido de solo (oposto a mar), terra nÃ£o aceita crase. Se for o planeta Terra ou estiver especificada, aceita."
  }
];

const qM5 = [
  {
    id: 1,
    pergunta: "(CESGRANRIO) Assinale a opÃ§Ã£o em que o acento grave indicador de crase estÃ¡ empregado de acordo com a norma-padrÃ£o.",
    opcoes: [
        "O acesso Ã  informaÃ§Ãµes Ã© vital.",
        "Os cientistas referem-se Ã  pesquisas recentes.",
        "A empresa visa Ã  melhoria dos processos.",
        "Ele se dispÃ´s Ã  colaborar com o projeto."
    ],
    correta: 2,
    explicacao: "'Visar' no sentido de objetivar exige preposiÃ§Ã£o 'A'. Melhoria Ã© feminino singular. A + A = Ã. Nas outras: 'a informaÃ§Ãµes' (plural sem artigo), 'a pesquisas' (plural sem artigo), 'Ã  colaborar' (antes de verbo)."
  },
  {
    id: 2,
    pergunta: "(CESGRANRIO) O uso da crase Ã© OBRIGATÃRIO em:",
    opcoes: [
        "Andar a pÃ©.",
        "Chegamos a uma conclusÃ£o.",
        "SaÃ­mos Ã s dez horas.",
        "Enviei o convite a Vossa ExcelÃªncia."
    ],
    correta: 2,
    explicacao: "Horas exatas determinadas exigem crase. 'PÃ©' Ã© masculino, 'uma' Ã© artigo indefinido (nÃ£o aceita outro artigo), 'Vossa ExcelÃªncia' Ã© pronome de tratamento (exceÃ§Ã£o: senhora/senhorita)."
  }
];
