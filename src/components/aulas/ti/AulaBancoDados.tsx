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
} from "./data/banco-dados-quizzes";

export default function AulaBancoDados({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_banco_dados_";

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos e Modelagem ER" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Modelo Relacional" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Normalização de Dados" },
    { id: "modulo-4", label: "Módulo 4", titulo: "SQL: DDL (Definição)" },
    { id: "modulo-5", label: "Módulo 5", titulo: "SQL: DML (Manipulação)" },
    { id: "modulo-6", label: "Módulo 6", titulo: "SQL: Joins e Subqueries" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Transações e ACID" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Bancos NoSQL" },
    { id: "modulo-9", label: "Módulo 9", titulo: "BI e Data Warehouse" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Tunning e Performance" },
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
          MÓDULO 1: MODELAGEM ER
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Modelagem Conceitual"
          descricao="O mundo real transcrito para o diagrama: Entidades, Atributos e Relacionamentos."
          variant={mv[1]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Modelo Entidade-Relacionamento (MER)"
            description="A gramática da modelagem de dados. Como a Cesgranrio cobra a leitura de diagramas."
            variant={mv[1]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Comparison
              title="Tipos de Atributos"
              left={{
                title: "Atributo Simples",
                content: "Um valor único e atômico (ex: CPF).",
                description: "Não pode ser subdividido.",
                variant: "info"
              }}
              right={{
                title: "Atributo Composto",
                content: "Subdividido em partes (ex: Nome -> Nome, Sobrenome).",
                description: "Pode ser quebrado em atributos atômicos.",
                variant: "warning"
              }}
            />

            <AlertBox tipo="info" titulo="📍 DICA DE PROVA: Atributo Multivalorado">
              Representado por elipses duplas {`(( ))`}. Exemplo: Telefone de um funcionário (ele pode ter vários). Em SQL, isso gera uma nova tabela.
            </AlertBox>
          </div>

          <ContentAccordion
            titulo="Cardinalidade e Participação"
            icone="🔀"
            corIndicador="bg-blue-600"
            mode="stacked"
            slides={[
                {
                    icone: "📊",
                    titulo: "1:1, 1:N, N:M",
                    conteudo: "Define quantos registros de uma entidade podem se associar a outra. Relacionamentos Muitos-para-Muitos (N:M) devem ser resolvidos com uma tabela associativa.",
                },
                {
                    icone: "⛓️",
                    titulo: "Obrigatoriedade",
                    conteudo: "Representada por (0,N) ou (1,N). (0) significa participação opcional, (1) significa obrigatória.",
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
            video={{ videoId: "", title: "", duration: "" }}
            resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: titulo,
                materia: materiaNome,
                images: []
            }}
            sinteseEstrategica={{
                title: "Destaque Estratégico",
                content: "Entidade = Substantivo. Atributo = Adjetivo. Relacionamento = Verbo."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 2: MODELO RELACIONAL
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Implementação no Modelo Relacional"
          descricao="Das bolinhas e quadrados para Tabelas, Tuplas e Atributos."
          variant={mv[2]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Chaves e Integridade"
            description="O esqueleto que mantém o banco de dados consistente."
            variant={mv[2]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="Chave Primária (PK)"
              verso="Identificador único da tupla. Não permite nulos e não se repete. Ex: ID_EMPREGADO."
            />
            <FlipCard
              frente="Chave Estrangeira (FK)"
              verso="Atributo que referencia a PK de outra tabela, garantindo o relacionamento."
            />
          </div>

          <AlertBox tipo="info" titulo="Integridade de Entidade vs Referencial">
              Integridade de Entidade: PK não pode ser nula. 
              Integridade Referencial: FK deve apontar para uma PK válida ou ser nula (se permitido).
          </AlertBox>

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
          MÓDULO 3: NORMALIZAÇÃO
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="A Arte da Normalização"
          descricao="Eliminando redundâncias e anomalias de atualização."
          variant={mv[3]}
        />

        <div className="space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="As Três Formas Normais Obrigatórias"
            description="O tema mais cobrado pela Cesgranrio em Banco de Dados."
            variant={mv[3]}
          />

          <div className="space-y-4">
             <TimelineItem
                passo={1}
                titulo="1ª Forma Normal (1FN)"
                descricao="Atributos atômicos (sem repetições ou compostos) e remoção de nomes de colunas repetidos."
             />
             <TimelineItem
                passo={2}
                titulo="2ª Forma Normal (2FN)"
                descricao="Estar na 1FN + Remoção de dependências parciais (atrib. depende de apenas parte da chave composta)."
             />
             <TimelineItem
                passo={3}
                titulo="3ª Forma Normal (3FN)"
                descricao="Estar na 2FN + Remoção de dependências transitivas (atrib. depende de outro não-chave)."
                isLast={true}
             />
          </div>

          <AlertBox tipo="warning" titulo="🚨 ALERTA CESGRANRIO">
            A banca adora dar uma frase do tipo 'Atributos não chave devem ser totalmente dependentes da chave primária' e perguntar qual a forma normal correta. A resposta é **2FN**.
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
          MÓDULO 4: SQL DDL
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="SQL: Linguagem de Definição de Dados (DDL)"
          descricao="Criando e alterando os objetos do banco de dados."
          variant={mv[4]}
        />

        <div className="space-y-12">
            <CardCarousel
                titulo="Comandos de Definição"
                cards={[
                    {
                        titulo: "CREATE",
                        descricao: "Cria tabelas, índices e visões. Define tipos (INT, VARCHAR, DATE).",
                        icone: "🔨"
                    },
                    {
                        titulo: "ALTER",
                        descricao: "Modifica estruturas existentes (ADD COLUMN, MODIFY, RENAME).",
                        icone: "⚙️"
                    },
                    {
                        titulo: "DROP & TRUNCATE",
                        descricao: "DROP exclui a tabela. TRUNCATE limpa apenas os dados rapidamente.",
                        icone: "🗑️"
                    }
                ]}
            />

            <AlertBox tipo="info" titulo="Constraints (Restrições)">
                Importante para prova: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY e CHECK (valida valores ex: idade {`>`} 18).
            </AlertBox>

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
          MÓDULO 5: SQL DML
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="SQL: Linguagem de Manipulação de Dados (DML)"
          descricao="O poder do SELECT e das funções de agregação."
          variant={mv[5]}
        />

        <div className="space-y-12">
           <ModuleSectionHeader
               index="INTRO"
               title="Consultas e Agregações"
               description="Extrair inteligência dos dados."
               variant={mv[5]}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 bg-slate-900 rounded-xl border border-border font-mono text-lg leading-relaxed">
                   <span className="text-blue-400">SELECT</span> nome, cargo <br/>
                   <span className="text-blue-400">FROM</span> funcionarios <br/>
                   <span className="text-blue-400">WHERE</span> salario {`>`} 5000 <br/>
                   <span className="text-blue-400">ORDER BY</span> nome <span className="text-blue-400">DESC</span>;
               </div>
               <div className="space-y-4">
                    <p className="font-bold underline">Funções de Grupo:</p>
                    <ul className="list-disc pl-5 text-lg space-y-2">
                        <li><strong>COUNT:</strong> Conta registros.</li>
                        <li><strong>SUM / AVG:</strong> Soma e Média.</li>
                        <li><strong>MAX / MIN:</strong> Valores extremos.</li>
                    </ul>
               </div>
           </div>

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
          MÓDULO 6: JOINS E SUBQUERIES
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Joins, Unions e Subqueries"
          descricao="Conectando peças do quebra-cabeça de dados."
          variant={mv[6]}
        />

        <div className="space-y-12">
            <Comparison
                title="Tipos de JOIN"
                left={{
                    title: "INNER JOIN",
                    content: "Retorna apenas o que coincide nas duas tabelas.",
                    description: "Interseção pura.",
                    variant: "info"
                }}
                right={{
                    title: "OUTER JOIN (Left/Right)",
                    content: "Preserva registros da tabela 'mestre' mesmo sem par.",
                    description: "Cria nulos onde não há match.",
                    variant: "success"
                }}
            />

            <ContentAccordion
              titulo="Subconsultas e Predicados"
              icone="🔍"
              corIndicador="bg-cyan-600"
              mode="stacked"
              slides={[
                  {
                      titulo: "EXISTS e IN",
                      conteudo: "EXISTS é booleano e costuma ser mais performático em subconsultas grandes. IN compara valores contra uma lista.",
                  },
                  {
                      titulo: "UNION vs UNION ALL",
                      conteudo: "UNION remove duplicatas (mais pesado). UNION ALL apenas empilha tudo.",
                  }
              ]}
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
          MÓDULO 7: TRANSAÇÕES E ACID
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Controle de Transações e Concorrência"
          descricao="Garantindo que os dados não se corrompam em ambientes multiusuário."
          variant={mv[7]}
        />

        <div className="space-y-12">
            <CardCarousel
                titulo="Propriedades ACID"
                cards={[
                    { titulo: "Atomicidade", descricao: "Tudo ou nada. Se um comando falha, volta tudo.", icone: "⚛️" },
                    { titulo: "Consistência", descricao: "O banco vai de um estado válido a outro válido.", icone: "⚖️" },
                    { titulo: "Isolamento", descricao: "Uma transação não interfere em outra simultânea.", icone: "🛡️" },
                    { titulo: "Durabilidade", descricao: "Após o commit, os dados são permanentes.", icone: "💾" }
                ]}
            />

            <AlertBox tipo="danger" titulo="Níveis de Isolamento (ANSI SQL)">
                Cuidado com os fenômenos: Leitura Suja, Leitura Não-Repetível e Leitura Fantasma. Níveis: Read Uncommitted, Read Committed, Repeatable Read e Serializable.
            </AlertBox>

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
          MÓDULO 8: BANCOS NOSQL
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
            numero={8}
            titulo="NoSQL: Não Apenas SQL"
            descricao="Escalabilidade horizontal e modelos de dados flexíveis."
            variant={mv[8]}
        />

        <div className="space-y-12">
            <ModuleSectionHeader
                index={1}
                title="Categorias NoSQL"
                description="O fim do tamanho único?"
                variant={mv[8]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard frente="Chave-Valor" verso="Simples e ultra rápido. Ex: Redis, DynamoDB." />
                <FlipCard frente="Documentos" verso="Armazena JSON/BSON. Flexível. Ex: MongoDB." />
                <FlipCard frente="Colunas" verso="Escaneamento de grandes volumes. Ex: Cassandra." />
                <FlipCard frente="Grafos" verso="Foco em conexões. Ex: Neo4j." />
            </div>

            <AlertBox tipo="info" titulo="Teorema CAP">
                Você só pode escolher dois: Consistência, Disponibilidade e Particionamento. NoSQL geralmente sacrifica Consistência em favor de Disponibilidade (BASE).
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
          MÓDULO 9: BI E DATA WAREHOUSE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
           numero={9}
           titulo="Business Intelligence e Analytics"
           descricao="Transformando dados brutos em decisões estratégicas."
           variant={mv[9]}
        />

        <div className="space-y-12">
            <Comparison
                title="OLTP vs OLAP"
                left={{
                    title: "OLTP",
                    content: "Transações em tempo real (Dia a dia).",
                    description: "Escrita rápida, dados atuais.",
                    variant: "info"
                }}
                right={{
                    title: "OLAP",
                    content: "Análise de grandes volumes (Histórico).",
                    description: "Leitura pesada, agregações.",
                    variant: "success"
                }}
            />

            <div className="p-6 bg-slate-900/40 rounded-xl border border-border">
                <h4 className="font-bold text-lg mb-4">Modelos Dimensional (Star vs Snowflake)</h4>
                <p className="text-lg"><strong>Star Schema:</strong> Dimensões desnormalizadas (redundantes). Mais rápido.</p>
                <p className="text-lg"><strong>Snowflake:</strong> Dimensões normalizadas. Menos espaço, consultas mais lentas.</p>
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
          MÓDULO 10: TUNNING E PERFORMANCE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
            numero={10}
            titulo="Tunning e Administração Avançada"
            descricao="Velocidade e estabilidade em ambiente de missão crítica."
            variant={mv[10]}
        />

        <div className="space-y-12">
            <ModuleSectionHeader
                index="INTRO"
                title="Índices e Planos de Execução"
                description="Onde a mágica (e os gargalos) acontecem."
                variant={mv[10]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-green-900/10 border border-green-500/20 rounded-xl">
                    <h5 className="font-bold text-green-400 mb-2">B-Tree (O Clássico)</h5>
                    <p className="text-lg">Balancamento automático. Ótimo para buscas de igualdade e intervalos.</p>
                </div>
                <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                    <h5 className="font-bold text-blue-400 mb-2">Hash Index</h5>
                    <p className="text-lg">Extremanente rápido para busca exata (=), mas inútil para faixas ({`>`}, {`<`}).</p>
                </div>
            </div>

            <AlertBox tipo="warning" titulo="SARGability">
               Evite usar funções no lado esquerdo do WHERE (ex: {`WHERE YEAR(data) = 2024`}). Isso quebra o uso de índices. Use faixas de data.
            </AlertBox>

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
            resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: titulo,
                materia: materiaNome,
                images: []
            }}
            sinteseEstrategica={{
                title: "Dica de Ouro",
                content: "Backup sem teste de Restore não é Backup. É esperança."
            }}
             audio={{ audioUrl: "", titulo: "", artista: "" }}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
