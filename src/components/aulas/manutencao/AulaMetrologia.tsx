"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleBanner,
  AulaProps,
  AulaTemplate,
  RichIntro,
  ModuleSectionHeader,
  ContentAccordion,
  QuizInterativo,
  Comparison,
  ModuleConsolidation,
} from "../shared";

import {
  QUIZ_M1_FUNDAMENTOS,
  QUIZ_M2_PAQUIMETRO,
  QUIZ_M3_MICROMETRO,
  QUIZ_M4_TOLERANCIAS,
  QUIZ_M5_RUGOSIDADE,
} from "./data/metrologia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", numero: 1, label: "Fundamentos", titulo: "Fundamentos e Unidades", descricao: "O Sistema Internacional e o Sistema Inglês na Mecânica." },
  { id: "modulo-2", numero: 2, label: "Paquímetro", titulo: "Medição com Paquímetro", descricao: "Uso do nônio e leitura em milímetros e polegadas." },
  { id: "modulo-3", numero: 3, label: "Micrômetro", titulo: "Micrômetro: Alta Precisão", descricao: "Leitura centesimal e cuidados com o instrumento." },
  { id: "modulo-4", numero: 4, label: "Tolerâncias", titulo: "Tolerâncias e Ajustes", descricao: "Sistema ISO 286 de furos e eixos." },
  { id: "modulo-5", numero: 5, label: "Rugosidade", titulo: "Estado de Superfície", descricao: "Parâmetros Ra, Rz e medição de rugosidade." },
] as const;

export default function AulaMetrologia({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_manutencao_metrologia_";

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

  useEffect(() => {
    if (isCompleted) {
      setCompletedModules(new Set(MODULE_DEFS.map(m => m.id)));
    }
  }, [isCompleted]);

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);

    if (newCompleted.size === 5) {
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
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
      {/* 🟢 MÓDULO 1: FUNDAMENTOS */}
      <TabsContent value="modulo-1" className="space-y-6">
        <ModuleBanner 
            numero={1} 
            titulo="Fundamentos e Unidades de Medida" 
            descricao="A base da precisão industrial na Petrobras."
        />
        
        <RichIntro>
            <p>A metrologia é o pilar fundamental de qualquer operação industrial, mas em refinarias e plataformas da Petrobras, sua importância é elevada ao nível de segurança operacional. Uma medição errada em um flange de pressão ou em um mancal de turbina pode levar a vazamentos catastróficos ou falhas mecânicas severas. No Brasil, adotamos o Sistema Internacional de Unidades (SI), onde o metro (m) é a base, mas na prática mecânica, o milímetro (mm) impera como a unidade padrão de projeto.</p>
            <p>Entretanto, o setor de óleo e gás possui forte influência da engenharia norte-americana e britânica, o que exige do profissional o domínio absoluto do Sistema Inglês de Medidas (Polegadas). A polegada padrão (1") equivale a exatamente 25,4 mm. Saber converter frações de polegada (como 1/8", 3/16") para milímetros é uma tarefa diária nos almoxarifados e oficinas de manutenção da companhia.</p>
            <p>Além do valor nominal, a metrologia estuda a incerteza de medição e a rastreabilidade. Todo instrumento utilizado na Petrobras deve ser periodicamente calibrado e rastreável à Rede Brasileira de Calibração (RBC). Isso garante que um milímetro medido em Macaé seja exatamente o mesmo milímetro medido em uma sonda no pré-sal ou em uma refinaria no Paraná.</p>
            <p>A precisão exigida varia conforme a aplicação: componentes de bombas centrífugas de alta rotação exigem precisão de centésimos ou milésimos de milímetro, enquanto estruturas de caldeiraria pesada trabalham com tolerâncias na casa dos milímetros inteiros. Compreender essas escalas é o primeiro passo para não cometer erros básicos de interpretação de desenho técnico.</p>
        </RichIntro>

        <ModuleSectionHeader 
            index="INTRO"
            title="Conceitos Chave" 
            description="Termos que aparecem no seu dia a dia e na prova."
            variant="indigo"
        />

        <ContentAccordion 
            titulo="Glossário Técnico"
            icone="📖"
            mode="carousel"
            slides={[
                {
                    titulo: "Resolução vs Precisão",
                    conteudo: "Resolução é a menor variação que o instrumento consegue detectar (ex: 0,01mm). Precisão é o quão próximo do valor real a medição está. Um instrumento pode ser muito sensível (alta resolução), mas estar descalibrado (baixa precisão).",
                    icone: "🎯"
                },
                {
                    titulo: "Rastreabilidade",
                    conteudo: "Propriedade de relacionar o resultado de uma medição a padrões nacionais ou internacionais através de uma cadeia ininterrupta de comparações (calibração).",
                    icone: "🔗"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={1}
            variant="indigo"
            resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Metrologia Industrial",
                materia: "Manutenção Técnica",
                images: [
                    { title: "Grandezas do SI", type: "infographic", placeholderColor: "blue" },
                    { title: "Conversão Pol/mm", type: "table", placeholderColor: "indigo" }
                ]
            }}
            sinteseEstrategica={{
                title: "Destaque Estratégico: 25,4",
                content: <p className="text-lg italic">"Vinte e cinco vírgula quatro, no meu bolso eu sempre guardo. De polegada para mm, multiplique sem medo!"</p>
            }}
            podcast={{
            aulaId: "metrologia",
            aulaTitulo: "Metrologia",
            materia: "Manutenção",
            materiaId: "manutencao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                <QuizInterativo 
            questoes={QUIZ_M1_FUNDAMENTOS}
            numero={2}
            titulo="QUIZ: Módulo Nº 1"
            onComplete={() => handleModuleComplete("modulo-1")}
        />
      </TabsContent>

      {/* 🟦 MÓDULO 2: PAQUÍMETRO */}
      <TabsContent value="modulo-2" className="space-y-6">
        <ModuleBanner 
            numero={2} 
            titulo="Medição com Paquímetro" 
            descricao="O instrumento mais versátil da oficina mecânica."
            variant="emerald"
        />
        
        <RichIntro>
            <p>O paquímetro é, sem dúvida, o instrumento mais utilizado na manutenção industrial da Petrobras devido à sua incrível versatilidade. Com ele, é possível medir dimensões externas (orelhas fixas), internas (orelhas móveis), profundidade (vareta) e ressaltos. No entanto, essa versatilidade vem com um custo: a precisão do paquímetro é limitada à sua resolução, que geralmente varia entre 0,05 mm e 0,02 mm nos modelos analógicos mais comuns. Em aplicações que exigem tolerâncias inferiores a 0,02 mm, o paquímetro deve ser substituído pelo micrômetro.</p>
            <p>A 'mágica' do paquímetro reside no Nônio (ou Vernier). O nônio é uma escala móvel que desliza sobre a régua principal fixa. Para calcular a resolução de um paquímetro, dividimos o menor valor da escala fixa (geralmente 1mm) pelo número de divisões do nônio. Assim, um nônio com 20 divisões tem resolução de 0,05 mm (1/20), enquanto um de 50 divisões oferece 0,02 mm (1/50). Saber realizar essa conta mental é questão recorrente em provas da Cesgranrio.</p>
            <p>Erro de Paralaxe: Um dos maiores desafios no uso do paquímetro analógico é a posição do olho do operador. Se você não olhar perpendicularmente à escala, o alinhamento das gravuras do nônio com a régua parecerá deslocado, gerando uma medida falsa. É por isso que em medições críticas de campo, onde o acesso é difícil, o uso de paquímetros digitais tem se tornado o padrão na inspeção de equipamentos da Petrobras.</p>
            <p>Cuidados e Manutenção: Como qualquer instrumento de precisão, as faces de medição (os 'bicos') devem estar limpas e sem rebarbas. Um erro comum é aplicar pressão excessiva sobre a peça, o que pode flexionar as mandíbulas do paquímetro e distorcer a medida. O profissional de manutenção de excelência sabe que medir é 'sentir o contato', não apertar o instrumento sobre a peça.</p>
        </RichIntro>

        <ModuleSectionHeader 
            index={2}
            title="Partes e Funcionamento" 
            description="Identificando os componentes e calculando a resolução."
            variant="emerald"
        />

        <ContentAccordion 
            titulo="Anatomia do Instrumento"
            icone="🛠️"
            mode="carousel"
            slides={[
                {
                    titulo: "Orelha Fixa e Móvel",
                    conteudo: "Utilizadas para medir diâmetros externos e espessuras. Devem estar perfeitamente paralelas para uma medida confiável.",
                    icone: "📏"
                },
                {
                    titulo: "Bicos para Internos",
                    conteudo: "Permitem medir diâmetros de furos e larguras de rasgos. Exigem cuidado para não inclinar o instrumento durante a medição.",
                    icone: "🕳️"
                },
                {
                    titulo: "Cálculo da Resolução (R)",
                    conteudo: "R = e / n, onde 'e' é a menor divisão da escala fixa e 'n' é o número de divisões do nônio. Ex: 1mm / 50 div = 0,02 mm.",
                    icone: "🧮"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={2}
            variant="emerald"
            resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Paquímetro",
                materia: "Metrologia",
                images: [
                    { title: "Leitura do Nônio", type: "diagram", placeholderColor: "emerald" },
                    { title: "Tipos de Paquímetro", type: "gallery", placeholderColor: "green" }
                ]
            }}
            sinteseEstrategica={{
                title: "Resolução na Mão",
                content: <p className="text-lg">Sempre 1 dividido pelo número de casinhas do nônio. 50 divisões? 0,02. 20 divisões? 0,05.</p>
            }}
            podcast={{
            aulaId: "metrologia",
            aulaTitulo: "Metrologia",
            materia: "Manutenção",
            materiaId: "manutencao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                <QuizInterativo 
            questoes={QUIZ_M2_PAQUIMETRO}
            numero={3}
            titulo="QUIZ: Módulo Nº 2"
            onComplete={() => handleModuleComplete("modulo-2")}
        />
      </TabsContent>

      {/* 🟧 MÓDULO 3: MICRÔMETRO */}
      <TabsContent value="modulo-3" className="space-y-6">
        <ModuleBanner 
            numero={3} 
            titulo="Micrômetro: A Alta Precisão" 
            descricao="Medições centesimais (0,01mm) e milésimas."
            variant="violet"
        />
        
        <RichIntro>
            <p>Quando entramos no universo das tolerâncias de ajuste de precisão (como o assento de um rolamento em um eixo de bomba), o paquímetro deixa de ser suficiente. É aqui que entra o micrômetro, um instrumento baseado no princípio do parafuso micrométrico. Enquanto um paquímetro 'desliza', o micrômetro 'gira'. Esse movimento helicoidal permite que uma volta completa do tambor desloque o fuso em apenas 0,5 mm, dividindo essa distância em 50 partes no próprio tambor, o que resulta em uma resolução padrão de 0,01 mm (um centésimo).</p>
            <p>O design do micrômetro em formato de 'C' (o arco) confere-lhe uma rigidez superior, essencial para evitar deformações elásticas durante a medição. Além disso, ele possui um componente vital chamado catraca (ou fricção). A catraca limita a força que o operador aplica sobre a peça, garantindo que toda medição seja feita com a mesma pressão. Sem a catraca, diferentes operadores obteriam medidas diferentes para a mesma peça, destruindo a confiabilidade do processo.</p>
            <p>Leitura do Micrômetro Analógico: A leitura é feita em três etapas. Primeiro, observa-se os milímetros inteiros na bainha fixa (traços superiores). Depois, verifica-se se há meio milímetro (0,5mm) exposto no traço inferior da bainha. Por fim, soma-se o valor indicado no tambor giratório. É um processo mais lento que o do paquímetro, mas indispensável para garantir que componentes rotativos de alta performance da Petrobras não entrem em colapso por folgas inadequadas.</p>
            <p>Faixas de Medição: Diferente do paquímetro, que pode medir de 0 a 150mm em um único instrumento, os micrômetros possuem faixas limitadas de 25 em 25 mm (0-25mm, 25-50mm, 75-100mm, etc.). Isso ocorre porque o fuso micrométrico deve ser curto para manter a precisão extrema. O mecânico deve, portanto, selecionar o instrumento correto antes de ir para a frente de trabalho.</p>
        </RichIntro>

        <ModuleSectionHeader 
            index={3}
            title="Precisão nos Detalhes" 
            description="Entendendo a anatomia da precisão centesimal."
            variant="violet"
        />

        <Comparison 
          title="Paquímetro vs Micrômetro"
          left={{
            title: "Paquímetro",
            content: "Versatilidade e Rapidez",
            description: "Resolução 0,05mm / 0,02mm. Rápido, mas sujeito a erro de pressão ou paralelismo.",
            variant: "info"
          }}
          right={{
            title: "Micrômetro",
            content: "Alta Precisão e Repetibilidade",
            description: "Resolução 0,01mm / 0,001mm. Catraca garante pressão constante nas medições.",
            variant: "success"
          }}
        />

        

<ModuleConsolidation 
            index={3}
            variant="violet"
            resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Micrômetro",
                materia: "Metrologia",
                images: [
                    { title: "Bainha e Tambor", type: "diagram", placeholderColor: "violet" },
                    { title: "Exemplos de Leitura", type: "infographic", placeholderColor: "purple" }
                ]
            }}
            sinteseEstrategica={{
                title: "Dica de Ouro: O traço de baixo",
                content: <p className="text-lg">Viu o traço debaixo da bainha? Some na hora 0,50mm ao valor do tambor!</p>
            }}
            podcast={{
            aulaId: "metrologia",
            aulaTitulo: "Metrologia",
            materia: "Manutenção",
            materiaId: "manutencao",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                <QuizInterativo 
            questoes={QUIZ_M3_MICROMETRO}
            numero={4}
            titulo="QUIZ: Módulo Nº 3"
            onComplete={() => handleModuleComplete("modulo-3")}
        />
      </TabsContent>

      {/* 🟨 MÓDULO 4: TOLERÂNCIAS */}
      <TabsContent value="modulo-4" className="space-y-6">
        <ModuleBanner 
            numero={4} 
            titulo="Tolerâncias e Ajustes" 
            descricao="Sistema ISO 286 e intercâmbio de peças."
            variant="amber"
        />
        
        <RichIntro>
            <p>Na produção em série e na manutenção industrial, é impossível fabricar duas peças tecnicamente idênticas. Por isso, trabalhamos com o conceito de Tolerância: a variação permitida na dimensão de uma peça sem que ela perca sua funcionalidade. Na Petrobras, seguimos o sistema internacional ISO de tolerâncias e ajustes, que utiliza letras e números (ex: H7/g6) para definir como um furo e um eixo devem se acoplar.</p>
            <p>O campo de tolerância é definido por uma letra e um número. Letras MAIÚSCULAS indicam Furos (ex: H7), enquanto letras minúsculas indicam eixos (ex: g6). O número indica a qualidade da tolerância (IT); quanto menor o número, mais precisa e cara é a fabricação da peça. Um ajuste H7/g6 é um ajuste com folga, ideal para peças que precisam deslizar ou girar uma em relação à outra em lubrificação hidrodinâmica.</p>
            <p>Ajustes com Interferência (Prensados): Existem casos onde o eixo é deliberadamente fabricado um pouco maior que o furo. Para montar essas peças, é necessário o uso de prensas hidráulicas ou o resfriamento do eixo em nitrogênio líquido. Esse tipo de ajuste é comum na montagem de camisas de cilindros ou buchas fixas que não podem se mover sob carga pesada.</p>
            <p>A dimensão nominal é apenas uma referência de projeto. A dimensão REAL deve estar entre a Dimensão Máxima e a Dimensão Mínima calculadas a partir da tolerância. O cálculo da folga ou interferência máxima e mínima é um dos temas preferidos da Cesgranrio para eliminar candidatos desatentos.</p>
        </RichIntro>

        <ModuleSectionHeader 
            index={4}
            title="Sistema de Ajustes" 
            description="Entendendo a linguagem H7/g6."
            variant="amber"
        />

        <ContentAccordion 
            titulo="Tipos de Ajuste"
            icone="⚙️"
            mode="stacked"
            slides={[
                {
                    titulo: "Ajuste com Folga",
                    conteudo: "Sempre sobra espaço entre o eixo e o furo. Ex: H7/g6. Essencial para eixos rotativos.",
                    icone: "🟢"
                },
                {
                    titulo: "Ajuste com Interferência",
                    conteudo: "O eixo é maior que o furo. Ex: H7/p6. Peças montadas sob pressão.",
                    icone: "🔴"
                },
                {
                    titulo: "Ajuste Incerto",
                    conteudo: "Pode haver folga ou interferência dependendo das variações reais. Ex: H7/js6.",
                    icone: "🟡"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={4}
            variant="amber"
            resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Tolerâncias",
                materia: "Metrologia",
                images: [
                    { title: "Tabela de Ajustes", type: "infographic", placeholderColor: "amber" },
                    { title: "Folga vs Interferência", type: "diagram", placeholderColor: "orange" }
                ]
            }}
            sinteseEstrategica={{
                title: "Maiúsculo vs Minúsculo",
                content: <p className="text-lg">"FURO é GRANDE (Letra Maiúscula), eixo é pequeno (letra minúscula)."</p>
            }}
            podcast={{
            aulaId: "metrologia",
            aulaTitulo: "Metrologia",
            materia: "Manutenção",
            materiaId: "manutencao",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                <QuizInterativo 
            questoes={QUIZ_M4_TOLERANCIAS}
            numero={5}
            titulo="QUIZ: Módulo Nº 4"
            onComplete={() => handleModuleComplete("modulo-4")}
        />
      </TabsContent>

      {/* 🟥 MÓDULO 5: RUGOSIDADE */}
      <TabsContent value="modulo-5" className="space-y-6">
        <ModuleBanner 
            numero={5} 
            titulo="Estado de Superfície (Rugosidade)" 
            descricao="Microgeometria e durabilidade das peças."
            variant="rose"
        />
        
        <RichIntro>
            <p>Além das dimensões, a qualidade da superfície de uma peça é crucial para sua vida útil. A rugosidade é o conjunto de irregularidades microgeométricas deixadas pelas ferramentas de corte ou processos de fundição. Se uma superfície for muito rugosa, ela causará desgaste excessivo em selos mecânicos e gaxetas, gerando vazamentos em equipamentos de bombeamento da Petrobras. Se for muito lisa, pode dificultar a retenção do filme de óleo lubrificante.</p>
            <p>O parâmetro mais comum é o Ra (Rugosidade Média), que representa a média aritmética dos desvios do perfil em relação à linha média. É medido em micrômetros (µm). Outro parâmetro importante é o Rz, que mede a distância entre os picos e vales mais altos dentro de um comprimento de amostragem. Diferentes processos de fabricação geram diferentes classes de rugosidade (N1 a N12).</p>
            <p>O instrumento utilizado para essa medição é o Rugosímetro. Ele possui uma ponta de diamante ultrafina que percorre a superfície, transformando as irregularidades em sinais elétricos que o computador processa. Na manutenção preditiva, a alteração da rugosidade de um colo de eixo pode indicar o início de um processo de falha por falta de lubrificação ou contaminação do óleo.</p>
            <p>Simbologia em Desenho: A rugosidade é representada por um símbolo de triângulo (ou 'check') com o valor de Ra sobre ele. Compreender esses símbolos é vital para o mecânico que recebe uma peça nova do estoque e precisa validar se ela atende aos requisitos técnicos severos de uma turbina de contrapressão ou compressor centrífugo.</p>
        </RichIntro>

        <ModuleSectionHeader 
            index={5}
            title="Parâmetros de Rugosidade" 
            description="Ra, Rz e a classe N."
            variant="rose"
        />

        <ContentAccordion 
            titulo="Medição de Superfície"
            icone="🔬"
            mode="carousel"
            slides={[
                {
                    titulo: "Parâmetro Ra",
                    conteudo: "Média aritmética dos desvios. É o parâmetro universal mais utilizado no mundo.",
                    icone: "📈"
                },
                {
                    titulo: "Classes de Rugosidade",
                    conteudo: "Vão de N1 (superfície espelhada) até N12 (bruta/serrada). A maioria das peças mecânicas fica entre N6 e N9.",
                    icone: "📊"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={5}
            variant="rose"
            resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Rugosidade",
                materia: "Metrologia",
                images: [
                    { title: "Perfil de Rugosidade", type: "graph", placeholderColor: "rose" },
                    { title: "Simbolologia N", type: "table", placeholderColor: "red" }
                ]
            }}
            sinteseEstrategica={{
                title: "Ra x Rz",
                content: <p className="text-lg">"Ra é a média, Rz é o pico. Para a Cesgranrio, o Ra é o favorito!"</p>
            }}
            podcast={{
            aulaId: "metrologia",
            aulaTitulo: "Metrologia",
            materia: "Manutenção",
            materiaId: "manutencao",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                <QuizInterativo 
            questoes={QUIZ_M5_RUGOSIDADE}
            numero={6}
            titulo="QUIZ: Módulo Nº 5"
            onComplete={() => handleModuleComplete("modulo-5")}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
