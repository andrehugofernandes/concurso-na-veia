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
} from "./data/infra-quizzes";

export default function AulaInfraestruturaTI({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // Definir os módulos da aula (Padrão Premium: 10 módulos)
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Redes TCP/IP" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Roteamento e Switching" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Segurança de Redes" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Windows Server & AD" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Linux Administration" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Virtualização e Storage" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Contêineres (Docker/K8s)" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Cloud Computing" },
    { id: "modulo-9", label: "Módulo 9", titulo: "ITIL & Monitoramento" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Backup e Recovery" },
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
          MÓDULO 1: REDES TCP/IP
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Redes de Computadores e o Modelo TCP/IP"
          descricao="O fundamento de toda a infraestrutura moderna: do bit ao pacote."
          variant={mv[1]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Arquitetura TCP/IP vs OSI"
            description="Entenda como os dados viajam entre as camadas e como a Cesgranrio cobra as diferenças."
            variant={mv[1]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Comparison
              title="Comparativo de Camadas"
              left={{
                title: "Modelo OSI (7 Camadas)",
                content: "7 camadas: Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física.",
                description: "Modelo teórico de referência da ISO.",
                variant: "info"
              }}
              right={{
                title: "Modelo TCP/IP (4 Camadas)",
                content: "4 camadas: Aplicação, Transporte, Internet, Host-Rede.",
                description: "Modelo prático utilizado na Internet.",
                variant: "success"
              }}
            />

            <AlertBox
              tipo="info"
              titulo="📍 DICA DE PROVA (CESGRANRIO)"
            >
              A banca adora perguntar em qual camada o roteador e o switch operam. Lembre-se: Switch L2 (Camada 2 - Enlace) e Roteador (Camada 3 - Rede/Internet). Algumas questões citam switches L3, que também roteiam, mas o padrão é L2.
            </AlertBox>
          </div>

          <ContentAccordion
            titulo="Detalhamento - IPv4 e IPv6"
            icone="🌐"
            corIndicador="bg-blue-600"
            defaultOpen={true}
            mode="stacked"
            slides={[
                {
                    icone: "1️⃣",
                    titulo: "IPv4",
                    conteudo: "Endereçamento de 32 bits (4 octetos). Ex: 192.168.1.1. Esgotado mundialmente.",
                },
                {
                    icone: "2️⃣",
                    titulo: "IPv6",
                    conteudo: "Endereçamento de 128 bits (hexadecimal). Elimina NAT. IPSec nativo.",
                },
                {
                    icone: "3️⃣",
                    titulo: "Protocolos",
                    conteudo: (
                        <ul className="list-disc pl-5">
                            <li><strong>ARP:</strong> Resolve IP para MAC.</li>
                            <li><strong>ICMP:</strong> PING e diagnóstico.</li>
                            <li><strong>DNS:</strong> Porta 53. Traduz nomes em IPs.</li>
                        </ul>
                    )
                }
            ]}
          />

          <section id="quiz-modulo-1">
            <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              variant={mv[1]}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>

          <ModuleConsolidation
            index={2}
            variant={mv[1]}
            video={{
                videoId: "6_z6_z6_z6_",
                title: "TCP/IP vs OSI",
                duration: "10:00"
            }}
            resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                    { title: "Arquitetura TCP/IP", type: "Diagrama", placeholderColor: "bg-blue-500" }
                ]
            }}
            maceteVisual={{
                title: "Mneumônico de Camadas",
                content: "Memorize: Roteador = Camada 3 (Rede). Switch = Camada 2 (Enlace). Hub = Camada 1 (Física)."
            }}
            audio={{
                audioUrl: "",
                titulo: "Protocolos Base",
                artista: "Infra Expert"
            }}
          />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 2: ROTEAMENTO E SWITCHING
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Roteamento e Comutação (Switching)"
          descricao="O trânsito dos dados: VLANs, protocolos de roteamento e Spanning Tree."
          variant={mv[2]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Coração da Rede Local"
            description="Como isolar tráfego e evitar loops infinitos em sua infraestrutura."
            variant={mv[2]}
          />

          <div className="space-y-4">
            <TimelineItem
              passo={1}
              titulo="VLANs - Segmentação Lógica"
              descricao="Permite criar múltiplas redes virtuais em um único switch físico. Melhora a segurança e reduz o tráfego de broadcast."
            />
            <TimelineItem
              passo={2}
              titulo="STP - Spanning Tree Protocol"
              descricao="Essencial para evitar loops de camada 2. Ele 'desliga' caminhos redundantes até que o caminho principal falhe."
            />
            <TimelineItem
              passo={3}
              titulo="Routing - Roteamento Dinâmico"
              descricao="OSPF (Link State) e BGP (Path Vector). Como a Petrobras conecta sites distantes de forma resiliente."
              isLast={true}
            />
          </div>

          <ContentAccordion
            titulo="Comparativo: Protocolos de Roteamento"
            icone="🗺️"
            corIndicador="bg-green-600"
            defaultOpen={false}
            mode="stacked"
            slides={[
                {
                    titulo: "Interior Gateway (IGP)",
                    conteudo: (
                        <div className="bg-slate-900/40 p-6 rounded-xl border border-green-500/20">
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li><strong>RIP:</strong> Baseado em saltos (máx 15).</li>
                                <li><strong>OSPF:</strong> Baseado em custo de link. Rápido.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    titulo: "Exterior Gateway (EGP)",
                    conteudo: (
                        <div className="bg-slate-900/40 p-6 rounded-xl border border-blue-500/20">
                            <p className="text-sm"><strong>BGP:</strong> O protocolo da Internet. Baseado em políticas de Sistemas Autônomos (AS).</p>
                        </div>
                    )
                }
            ]}
          />

          <section id="quiz-modulo-2">
            <QuizInterativo
              questoes={quizM2}
              titulo="Checkpoint de Comutação"
              variant={mv[2]}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          <ModuleConsolidation
            index={2}
            variant={mv[2]}
            video={{ videoId: "", title: "", duration: "" }}
            resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: titulo,
                materia: materiaNome,
                images: []
            }}
            maceteVisual={{
                title: "L2 vs L3",
                content: "Switching trata da rede local (MAC). Roteamento trata da conexão entre redes (IP)."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 3: SEGURANÇA DE REDES
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="Segurança de Perímetro e Redes"
          descricao="Firewalls, VPNs e defesas contra ataques externos."
          variant={mv[3]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader 
            index={1}
            title="Estratégia de Defesa em Profundidade"
            description="A segurança de redes não é um produto único, mas um conjunto de camadas."
            variant={mv[3]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Comparison
              title="Firewalls: Tipos Principais"
              left={{
                title: "Packet Filtering",
                content: "Analisa apenas cabeçalhos IP/Porta.",
                description: "Baixo consumo, sem estado.",
                variant: "danger"
              }}
              right={{
                title: "Stateful Inspection",
                content: "Monitora o 'estado' da sessão.",
                description: "Padrão moderno, entende o fluxo.",
                variant: "success"
              }}
            />

            <AlertBox
              tipo="warning"
              titulo="Ataques de Negação de Serviço (DoS/DDoS)"
            >
              A banca adora o ataque SYN Flood. Ele esgota os recursos do servidor ao pedir abertura de conexões e nunca as fechar. Defesa clássica: SYN Cookies.
            </AlertBox>
          </div>

          <ContentAccordion
              titulo="VPNs (Virtual Private Networks)"
              icone="🔒"
              corIndicador="bg-purple-600"
              mode="stacked"
              slides={[
                {
                  titulo: "IPSec",
                  conteudo: <p>Padrão de indústria para VPNs Site-to-Site. Opera na camada de Rede.</p>,
                  icone: "🔐"
                },
                {
                  titulo: "SSL/TLS VPN",
                  conteudo: <p>Ideal para acesso remoto de usuários via navegador. Mais flexível.</p>,
                  icone: "🌐"
                }
              ]}
            />

          <section id="quiz-modulo-3">
            <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Módulo Nº 3"
              variant={mv[3]}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          <ModuleConsolidation
              index={2}
              variant={mv[3]}
              video={{ videoId: "", title: "", duration: "" }}
              resumoVisual={{ moduloNome: "Módulo 3", tituloAula: titulo, materia: materiaNome, images: [] }}
              maceteVisual={{
                  title: "IDS vs IPS",
                  content: "IDS detecta, IPS bloqueia ataques em tempo real."
              }}
               audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 4: WINDOWS SERVER & AD
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="Administração de Identidade e Windows Server"
          descricao="Active Directory, GPOs e Serviços de Infraestrutura Microsoft."
          variant={mv[4]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Domínio no Active Directory"
            description="Como os objetos são organizados e gerenciados hierarquicamente."
            variant={mv[4]}
          />

          <CardCarousel
            titulo="Componentes do AD"
            cards={[
              {
                titulo: "Controlador de Domínio (DC)",
                descricao: "O servidor que autentica usuários e detém a cópia do banco de dados do AD.",
                icone: "🖥️",
                corFundo: "bg-blue-500/20"
              },
              {
                titulo: "GPO - Group Policy",
                descricao: "Configurações centralizadas aplicadas a OUs, permitindo padronizar segurança em milhares de PCs.",
                icone: "📜",
                corFundo: "bg-blue-500/20"
              },
              {
                titulo: "DNS no AD",
                descricao: "O AD não funciona sem DNS. É ele quem localiza onde estão os controladores de domínio.",
                icone: "🔍",
                corFundo: "bg-blue-500/20"
              }
            ]}
          />

          <section id="quiz-modulo-4">
            <QuizInterativo
              questoes={quizM4}
              titulo="Certificação AD"
              variant={mv[4]}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          <ModuleConsolidation
            index={2}
            variant={mv[4]}
            video={{ videoId: "", title: "", duration: "" }}
            resumoVisual={{ moduloNome: "Módulo 4", tituloAula: titulo, materia: materiaNome, images: [] }}
            maceteVisual={{
                title: "AD = Centralização",
                content: "Múltiplas máquinas, um gerenciamento centralizado via GPOs."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 5: LINUX ADMINISTRATION
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="Linux para Servidores e Infraestrutura"
          descricao="Administração via CLI, permissões avançadas e serviços críticos."
          variant={mv[5]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Terminal e Permissões"
            description="Dominar o terminal Linux é obrigatório para ambientes críticos."
            variant={mv[5]}
          />

           <ContentAccordion
              titulo="Comandos de Sobrevivência"
              icone="⌨️"
              corIndicador="bg-orange-600"
              mode="stacked"
              slides={[
                  {
                      titulo: "Permissões e Donos",
                      conteudo: (
                        <ul className="space-y-3 font-mono text-sm">
                            <li><strong>chown user:group:</strong> Muda dono.</li>
                            <li><strong>chmod 755:</strong> Muda rwxr-xr-x.</li>
                        </ul>
                      )
                  },
                  {
                      titulo: "Sistema",
                      conteudo: (
                        <ul className="space-y-3 font-mono text-sm">
                            <li><strong>df -h:</strong> Uso de disco.</li>
                            <li><strong>systemctl:</strong> Gerencia serviços (Systemd).</li>
                        </ul>
                      )
                  }
              ]}
           />

           <AlertBox
              tipo="info"
              titulo="Estrutura de Diretórios"
           >
              Decore: /etc (configurações), /var (logs), /home (usuários), /usr (binários).
           </AlertBox>

           <section id="quiz-modulo-5">
            <QuizInterativo
                questoes={quizM5}
                titulo="QUIZ: Módulo Nº 5"
                variant={mv[5]}
                onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
           </section>

           <ModuleConsolidation
                index={2}
                variant={mv[5]}
                video={{ videoId: "", title: "", duration: "" }}
                resumoVisual={{ moduloNome: "Módulo 5", tituloAula: titulo, materia: materiaNome, images: [] }}
                maceteVisual={{
                    title: "Tudo é arquivo",
                    content: "No Linux, quase tudo pode ser configurado via arquivos em /etc."
                }}
                 audio={{ audioUrl: "", titulo: "", artista: "" }}
            />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 6: VIRTUALIZAÇÃO E STORAGE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Virtualização, Storage e Datacenter"
          descricao="Abstraindo o hardware: VMware, Hyper-V e tecnologias de Storage."
          variant={mv[6]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Hipervisores e Abstração"
            description="Como rodar múltiplos sistemas no mesmo hardware com segurança e performance."
            variant={mv[6]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="Storage SAN"
              verso="Rede dedicada para blocos de dados. Alta performance via Fiber Channel."
            />
            <FlipCard
              frente="Storage NAS"
              verso="Compartilhamento de arquivos em nível de rede (NFS/CIFS)."
            />
          </div>

          <Comparison
            title="Sistemas de RAID"
            left={{
              title: "RAID 0 e 1",
              content: "RAID 0 (Performance) / RAID 1 (Espelhamento).",
              description: "Foco em velocidade ou redundância simples.",
              variant: "warning"
            }}
            right={{
              title: "RAID 5 e 10",
              content: "RAID 5 (Paridade) / RAID 10 (Híbrido).",
              description: "Equilíbrio ou alta performance com segurança.",
              variant: "success"
            }}
          />

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
          MÓDULO 7: CONTÊINERES (DOCKER/K8S)
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Contêineres e Orquestração"
          descricao="Docker, Kubernetes e o paradigma de aplicações imutáveis."
          variant={mv[7]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index={1}
            title="VM vs Contêiner"
            description="Entenda a diferença fundamental de arquitetura entre máquinas virtuais e Docker."
            variant={mv[7]}
          />

          <Comparison
             title="Diferença de Arquitetura"
             left={{
               title: "Máquina Virtual",
               content: "Possui SO convidado completo sobre um hipervisor.",
               description: "Peso maior, isolamento total.",
               variant: "info"
             }}
             right={{
               title: "Contêiner (Docker)",
               content: "Compartilha o Kernel do host via Docker Engine.",
               description: "Leveza e velocidade de boot (segundos).",
               variant: "success"
             }}
          />

          <ContentAccordion
            titulo="Kubernetes (K8s) - O Maestro"
            icone="☸️"
            corIndicador="bg-blue-400"
            mode="stacked"
            slides={[
                {
                    titulo: "Conceitos K8s",
                    conteudo: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-slate-800 rounded border border-blue-500/30"><strong>Pod:</strong> Menor unidade de deploy.</div>
                            <div className="p-3 bg-slate-800 rounded border border-blue-500/30"><strong>Node:</strong> Máquina que roda os pods.</div>
                        </div>
                    )
                }
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
          MÓDULO 8: CLOUD COMPUTING
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Cloud Computing: Modelos e Estratégias"
          descricao="Saindo do datacenter local: IaaS, PaaS, SaaS e Cloud Architecture."
          variant={mv[8]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
             index={1}
             title="Padrões de Serviço Cloud"
             description="A famosa pirâmide da nuvem cobrada exaustivamente em provas."
             variant={mv[8]}
          />

          <Comparison
            title="Modelos de Nuvem"
            left={{
              title: "IaaS & PaaS",
              content: "Infraestrutura (EC2) vs Plataforma (RDS).",
              description: "Nível de controle do SO vs foco no código.",
              variant: "info"
            }}
            right={{
              title: "SaaS & Serverless",
              content: "Software Pronto (O365) vs Sem Servidor (Lambda).",
              description: "Aplicação final vs eventos sob demanda.",
              variant: "success"
            }}
          />

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
          MÓDULO 9: ITIL & MONITORAMENTO
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="Governança, ITIL 4 e Monitoração"
          descricao="Gerenciando o valor e mantendo a visibilidade da saúde dos sistemas."
          variant={mv[9]}
        />

        <div className="space-y-12">
           <ModuleSectionHeader
              index={1}
              title="Cultura de Monitoramento e ITIL"
              description="Boas práticas globais para gestão de serviços de tecnologia."
              variant={mv[9]}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <AlertBox
                  tipo="info"
                  titulo="📍 ITIL 4 - Práticas"
               >
                  No ITIL 4 falamos em 'Práticas' (34 no total). O foco é o Fluxo de Valor e os 7 Princípios Orientadores.
               </AlertBox>
               <div className="bg-slate-900/40 p-6 rounded-xl border border-yellow-500/20">
                  <h4 className="text-yellow-400 font-bold mb-4">Golden Signals</h4>
                  <p className="text-sm text-gray-300">Latência, Tráfego, Erros e Saturação.</p>
               </div>
           </div>

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
          MÓDULO 10: BACKUP E RECOVERY
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="Backup e Recuperação de Desastres"
          descricao="Garantindo que a Petrobras nunca pare e nenhum dado seja perdido."
          variant={mv[10]}
        />

        <div className="space-y-12">
           <ModuleSectionHeader
              index={1}
              title="RPO vs RTO"
              description="As métricas de tempo e perda de dados permitidas em um desastre."
              variant={mv[10]}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">RPO</h4>
                <p className="text-sm text-gray-400">Quanto dado você aceita perder? Define a frequência do backup.</p>
              </div>
              <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">RTO</h4>
                <p className="text-sm text-gray-400">Quanto tempo o serviço pode ficar fora? Define a velocidade de recup.</p>
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
            index={2}
            variant={mv[10]}
            video={{ videoId: "", title: "", duration: "" }}
            resumoVisual={{ moduloNome: "Módulo 10", tituloAula: titulo, materia: materiaNome, images: [] }}
            maceteVisual={{
              title: "Regra 3-2-1",
              content: "3 cópias, 2 mídias diferentes, 1 off-site (nuvem/outra sede)."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
