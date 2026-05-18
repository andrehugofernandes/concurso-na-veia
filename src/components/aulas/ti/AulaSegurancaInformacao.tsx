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
} from "./data/seguranca-informacao-quizzes";

export default function AulaSegurancaInformacao({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_seguranca_informacao_";

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Pilares da Segurança (CID)" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Criptografia" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Certificação Digital" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Assinatura Digital" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Ameaças e Malwares" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Segurança de Redes (IDS/IPS)" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Controle de Acesso" },
    { id: "modulo-8", label: "Módulo 8", titulo: "ISO 27001 e 27002" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Gestão de Incidentes (BCP)" },
    { id: "modulo-10", label: "Módulo 10", titulo: "LGPD e Ética" },
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
          MÓDULO 1: PILARES DA SEGURANÇA (CID)
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos e a Tríade CID"
          descricao="O alicerce da SI: Confidencialidade, Integridade e Disponibilidade."
          variant={mv[1]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Os Pilares Essenciais"
            description="Entenda como cada pilar protege a informação sob diferentes perspectivas."
            variant={mv[1]}
          />

          <CardCarousel
            titulo="Propriedades da Informação"
            cards={[
              {
                titulo: "Confidencialidade",
                descricao: "Garante que a informação só seja acessível por quem tem permissão explícita.",
                icone: "🤫",
                corFundo: "bg-blue-500/20"
              },
              {
                titulo: "Integridade",
                descricao: "Garante que a informação não seja alterada de forma indevida durante transporte ou armazenamento.",
                icone: "💎",
                corFundo: "bg-emerald-500/20"
              },
              {
                titulo: "Disponibilidade",
                descricao: "Garante que a informação esteja acessível sempre que o usuário autorizado precisar.",
                icone: "⚡",
                corFundo: "bg-amber-500/20"
              }
            ]}
          />

          <AlertBox tipo="info" titulo="📍 DICA DE PROVA: Autenticidade e Não-repúdio">
            Além da tríade CID, a Cesgranrio cobra **Autenticidade** (prova de quem enviou) e **Não-repúdio** (impossibilidade de negar a autoria).
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
          MÓDULO 2: CRIPTOGRAFIA
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Criptografia Simétrica e Assimétrica"
          descricao="A arte de esconder mensagens de olhos não autorizados."
          variant={mv[2]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Sistemas de Chaves"
            description="Diferenças fundamentais entre algoritmos e suas aplicações reais."
            variant={mv[2]}
          />

          <Comparison
             title="Simétrica vs Assimétrica"
             left={{
               title: "Simétrica (Chave Única)",
               content: "Usa a mesma chave para cifrar e decifrar.",
               description: "Rápida, ideal para grandes volumes (AES, 3DES).",
               variant: "info"
             }}
             right={{
               title: "Assimétrica (Par Público/Privado)",
               content: "O que uma cifra, apenas a outra decifra.",
               description: "Segura para troca de chaves e assinaturas (RSA, ECC).",
               variant: "success"
             }}
          />

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
          MÓDULO 3: CERTIFICAÇÃO DIGITAL
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="Certificados Digitais e ICP-Brasil"
          descricao="A 'identidade virtual' com validade jurídica oficial no Brasil."
          variant={mv[3]}
        />

        <div className="space-y-12">
           <ModuleSectionHeader
              index="INTRO"
              title="Hierarquia de Confiança"
              description="Entenda o papel das ACs e ARs na estrutura brasileira."
              variant={mv[3]}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <FlipCard frente="AC (Autoridade Certificadora)" verso="Emite, renova e revoga certificados. É a 'mãe' da assinatura." />
               <FlipCard frente="AR (Autoridade de Registro)" verso="Entidade física que confere os documentos do usuário antes da emissão." />
           </div>

           <AlertBox tipo="warning" titulo="Tipos de Certificados (A1, A3)">
              **A1:** Armazenado em software (computador). Validade de 1 ano. 
              **A3:** Armazenado em hardware (Token/Smartcard). Validade de até 3-5 anos.
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
          MÓDULO 4: ASSINATURA DIGITAL
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="Processo de Assinatura Digital"
          descricao="Integridade e Não-repúdio garantidos por hash e chaves privadas."
          variant={mv[4]}
        />

        <div className="space-y-12">
           <ContentAccordion
              titulo="Como funciona a Assinatura (Passo a Passo)"
              icone="✍️"
              corIndicador="bg-indigo-600"
              mode="stacked"
              slides={[
                  {
                      titulo: "1. Criação do Hash",
                      conteudo: "O documento é processado por um algoritmo (ex: SHA-256) para gerar um 'resumo' único.",
                      icone: "✂️"
                  },
                  {
                      titulo: "2. Cifra com Chave Privada",
                      conteudo: "O emissor cifra o Hash com sua chave PRIVADA. Isso é a assinatura digital.",
                      icone: "🔑"
                  },
                  {
                      titulo: "3. Verificação",
                      conteudo: "O receptor decifra a assinatura com a Chave Pública do emissor e compara o hash recebido com o hash local.",
                      icone: "✅"
                  }
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
          MÓDULO 5: AMEAÇAS E MALWARES
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="Malwares e Ameaças Digitais"
          descricao="Conheça o inimigo para saber como se defender."
          variant={mv[5]}
        />

        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AlertBox tipo="danger" titulo="Vírus vs Worm">
                    **Vírus:** Precisa de um hospedeiro e interação humana (clique). 
                    **Worm:** Procura frestas de rede para se propagar sozinho.
                </AlertBox>
                <AlertBox tipo="warning" titulo="Cavalo de Troia (Trojan)">
                    Entra de forma legítima (jogo, PDF, etc) mas carrega uma 'carga' maliciosa oculta.
                </AlertBox>
            </div>

            <Comparison
                title="Ameaças Específicas"
                left={{
                    title: "Ransomware",
                    content: "Sequestra os arquivos via criptografia.",
                    description: "Foco em extorsão financeira.",
                    variant: "danger"
                }}
                right={{
                    title: "Phishing",
                    content: "Engenharia social por e-mail/SMS.",
                    description: "Foco em roubo de credenciais (identidade).",
                    variant: "warning"
                }}
            />

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
          MÓDULO 6: SEGURANÇA DE REDES (IDS/IPS)
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Defesas de Rede (IDS, IPS e Firewall)"
          descricao="O escudo digital que protege os perímetros corporativos."
          variant={mv[6]}
        />

        <div className="space-y-12">
            <ModuleSectionHeader
                index="INTRO"
                title="Detecção vs Prevenção"
                description="Monitorar ataques é bom, bloqueá-los é melhor."
                variant={mv[6]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FlipCard frente="IDS" verso="Monitora o tráfego e avisa o administrador 'Estão te atacando!'. Atuando de forma PASSIVA." />
                <FlipCard frente="IPS" verso="Monitora o tráfego e BLOQUEIA pacotes maliciosos na hora. Atua de forma ATIVA." />
            </div>

            <AlertBox tipo="info" titulo="WAF (Web Application Firewall)">
               Focado na Camada 7 (Aplicação). Protege contra SQL Injection e Cross-Site Scripting (XSS).
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
          MÓDULO 7: CONTROLE DE ACESSO
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Sistemas de Controle de Acesso"
          descricao="Identificação, Autenticação e Autorização (IAA)."
          variant={mv[7]}
        />

        <div className="space-y-12">
            <div className="space-y-4">
               <TimelineItem passo={1} titulo="Identificação" descricao="O usuário diz quem é (login)." />
               <TimelineItem passo={2} titulo="Autenticação" descricao="O sistema confere provas (senha, biometria, token)." />
               <TimelineItem passo={3} titulo="Autorização" descricao="O sistema libera o que ele pode fazer (permissões)." isLast={true} />
            </div>

            <ContentAccordion
              titulo="Modelos de Controle (AC)"
              icone="👮"
              corIndicador="bg-slate-600"
              mode="stacked"
              slides={[
                  { titulo: "RBAC (Role-Based)", conteudo: "Baseado no cargo ou função (ex: Perfil 'Financeiro')." },
                  { titulo: "DAC (Discretionary)", conteudo: "O dono do arquivo decide quem acessa (Windows, Linux)." },
                  { titulo: "MAC (Mandatory)", conteudo: "Baseado em rótulos de segurança (Militar, Sigiloso)." }
              ]}
            />

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
          MÓDULO 8: ISO 27001 E 27002
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Gestão com ISO/IEC 27001 e 27002"
          descricao="Padrões internacionais para Gestão da Segurança da Informação (SGSI)."
          variant={mv[8]}
        />

        <div className="space-y-12">
            <Comparison
                title="27001 vs 27002"
                left={{
                    title: "ISO 27001 (Gestão)",
                    content: "Requisitos para criar e certificar um SGSI. Foco no processo e PDCA.",
                    description: "Norma Certificável.",
                    variant: "info"
                }}
                right={{
                    title: "ISO 27002 (Prática)",
                    content: "Guia detalhado com diretrizes e controles de segurança.",
                    description: "Não certificável (Manual).",
                    variant: "success"
                }}
            />

            <AlertBox tipo="info" titulo="Ciclo PDCA na 27001">
                Planejar (Plan), Executar (Do), Verificar (Check) e Agir/Melhorar (Act). Ciclo de melhoria contínua da segurança.
            </AlertBox>

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
          MÓDULO 9: GESTÃO DE INCIDENTES (BCP)
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="Resiliência e Continuidade"
          descricao="Planos para garantir que o negócio sobreviva a grandes perdas."
          variant={mv[9]}
        />

        <div className="space-y-12">
             <CardCarousel
                titulo="Estrutura do PCN (BCP)"
                cards={[
                    { titulo: "BCP", descricao: "O Plano Geral de Continuidade de Negócios.", icone: "📋" },
                    { titulo: "DRP", descricao: "Recuperação técnica de Desastres (TI).", icone: "🆘" },
                    { titulo: "BIA", descricao: "Análise de Impacto no Negócio. Identifica o que é crítico.", icone: "📏" }
                ]}
            />

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
          MÓDULO 10: LGPD E ÉTICA
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="LGPD e Proteção de Dados"
          descricao="A lei brasileira de proteção de dados e os direitos do titular."
          variant={mv[10]}
        />

        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-900 rounded-xl border border-border">
                    <h5 className="font-bold mb-2">Fundamentos da LGPD</h5>
                    <p className="text-lg text-slate-400">Privacidade by Design, Transparência, Consentimento e Finalidade.</p>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-border">
                    <h5 className="font-bold mb-2">Atores da Lei</h5>
                    <p className="text-lg text-slate-400">Titular, Controlador (quem decide), Operador (quem processa) e o Encarregado (DPO).</p>
                </div>
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
                title: "Resumo Final",
                content: "Segurança não é um evento, é um processo contínuo de vigilância e proteção."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
