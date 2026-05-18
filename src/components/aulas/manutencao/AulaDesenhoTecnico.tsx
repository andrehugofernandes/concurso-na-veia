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
  ModuleConsolidation,
  AlertBox,
  Comparison,
} from "../shared";

import {
  QUIZ_M1_DESENHO_FUNDAMENTOS,
  QUIZ_M2_DESENHO_PROJECAO,
  QUIZ_M3_DESENHO_CORTES,
  QUIZ_M4_DESENHO_COTAGEM,
  QUIZ_M5_DESENHO_ISOMETRICOS,
} from "./data/desenho-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", numero: 1, label: "Fundamentos", titulo: "Fundamentos e Normas ABNT", descricao: "Formatos de papel, legendas e escalas em desenho técnico." },
  { id: "modulo-2", numero: 2, label: "Projeções", titulo: "Projeção Ortográfica e Diedros", descricao: "A linguagem universal das vistas e o 1º Diedro." },
  { id: "modulo-3", numero: 3, label: "Cortes", titulo: "Cortes, Seções e Hachuras", descricao: "Revelando o interior dos componentes mecânicos." },
  { id: "modulo-4", numero: 4, label: "Cotagem", titulo: "Cotagem e Dimensionamento", descricao: "Como indicar medidas sem margem para erro." },
  { id: "modulo-5", numero: 5, label: "Isométricos", titulo: "Tubulações e Fluxogramas", descricao: "O padrão Petrobras: Isométricos e P&ID." },
] as const;

export default function AulaDesenhoTecnico({
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_manutencao_desenho_tecnico_";

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
      titulo={titulo || "Desenho Técnico Industrial (ABNT/ISO)"}
      descricao={descricao || "Domine a linguagem universal da engenharia aplicada à manutenção e inspeção da Petrobras."}
      duracao={duracao || "120 min"}
      materiaNome={materiaNome || "Manutenção Técnica"}
      materiaCor={materiaCor || "from-blue-600 to-indigo-700"}
      materiaId={materiaId || "manutencao"}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* 🟦 MÓDULO 1: FUNDAMENTOS */}
      <TabsContent value="modulo-1" className="space-y-6">
        <ModuleBanner 
            numero={1} 
            titulo="Fundamentos e Normas ABNT" 
            descricao="O alfabeto do desenhista técnico e as normas de padronização."
            variant="blue"
        />
        
        <RichIntro>
            <p>O Desenho Técnico não é uma 'arte' no sentido subjetivo, mas sim uma <strong>linguagem técnica universal</strong>. Para um profissional de manutenção ou inspeção na Petrobras, saber ler e interpretar um desenho é tão vital quanto saber usar uma ferramenta manual. Na indústria brasileira, a base normativa é ditada pela ABNT (Associação Brasileira de Normas Técnicas), que segue de perto as normas internacionais ISO. Sem a padronização, uma peça fabricada em uma usina em São Paulo jamais encaixaria em um equipamento operando em uma plataforma no meio do Atlântico.</p>
            <p>Um dos pilares da organização é o <strong>Formato de Papel (NBR 10068)</strong>. A série 'A' é o padrão mundial, começando pelo A0 (que possui exatamente 1m² de área) e indo até o A4 (formato de folha simples de escritório). O segredo da série A é a proporção constante de 1:√2, o que permite que, ao dobrar uma folha A0 ao meio, tenhamos duas folhas A1, e assim por diante. Nos grandes projetos da Petrobras, os desenhos de conjunto costumam vir em formatos maiores (A0 ou A1), enquanto detalhes de fabricação e listas de materiais ficam em A3 ou A4.</p>
            <p>A <strong>Legenda</strong> (ou Carimbo) é o RG do desenho. Localizada no canto inferior direito da folha (NBR 10068), ela deve conter obrigatoriamente: o título do projeto, a escala, a unidade de medida (geralmente mm), o diedro de projeção e o número de rastreabilidade do documento. Na Petrobras, as legendas seguem padrões corporativos rígidos para facilitar o arquivamento em sistemas de GED (Gestão Eletrônica de Documentos).</p>
            <p>Por fim, temos a <strong>Escala (NBR 8196)</strong>. Como seria impossível desenhar uma torre de destilação de 40 metros em tamanho real, utilizamos a escala de redução (ex: 1:50). Já para componentes minúsculos de instrumentação, usamos a escala de ampliação (ex: 5:1). A escala natural (1:1) é o ideal de clareza, mas raramente possível em grandes equipamentos.</p>
        </RichIntro>

        <AlertBox tipo="warning" titulo="Dica para Concurso">
            Sempre que a escala for maior que 1 (ex: 2:1, 5:1, 10:1), trata-se de <strong>AMPLIAÇÃO</strong>. O primeiro número é sempre o 'desenho' e o segundo é o 'real'. 1:X (Redução), X:1 (Ampliação), 1:1 (Natural).
        </AlertBox>

        <ModuleSectionHeader 
            index="INTRO"
            title="Série A e Proporções" 
            description="Entendendo as dimensões e dobragens padrão."
            variant="blue"
        />

        <ContentAccordion 
            titulo="Formatos e Dobragem"
            icone="📐"
            mode="carousel"
            slides={[
                {
                    titulo: "Formato A0",
                    conteudo: "841 x 1189 mm. Área de 1m². É o formato 'base' de toda a série A.",
                    icone: "📏"
                },
                {
                    titulo: "Escalas Sugeridas",
                    conteudo: "ABNT 8196 prevê: Redução (1:2, 1:5, 1:10, 1:20, 1:50), Natural (1:1) e Ampliação (2:1, 5:1, 10:1).",
                    icone: "🔍"
                },
                {
                    titulo: "Dobragem Técnica",
                    conteudo: "Todo desenho, independentemente do tamanho da folha, deve ser dobrado para atingir o formato A4 final, deixando a LEGENDA visível no canto inferior direito.",
                    icone: "📁"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={1}
            variant="blue"
            video={{
                videoId: "9cIrI73r200",
                title: "O Alfabeto do Desenho Técnico",
                duration: "12:00"
            }}
            resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Fundamentos",
                materia: "Manutenção",
                images: [
                    { title: "Tabela de Formatos A0-A4", type: "table", placeholderColor: "blue" },
                    { title: "Esquema de Dobragem", type: "infographic", placeholderColor: "indigo" }
                ]
            }}
            sinteseEstrategica={{
                title: "A Regra do Oposto na Escala",
                content: <p className="text-lg">"Se o 1 vem atrás, o desenho é maior. Se o 1 vem na frente, o desenho é menor!"</p>
            }}
            audio={{
                audioUrl: "/audio/desenho-m1.mp3",
                titulo: "Podcast: Normas ABNT",
                artista: "Mestre da Manutenção"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M1_DESENHO_FUNDAMENTOS}
            numero={2}
            titulo="QUIZ: Módulo Nº 1"
            onComplete={() => handleModuleComplete("modulo-1")}
        />
      </TabsContent>

      {/* 🟦 MÓDULO 2: PROJEÇÕES */}
      <TabsContent value="modulo-2" className="space-y-6">
        <ModuleBanner 
            numero={2} 
            titulo="Projeção Ortográfica e Diedros" 
            descricao="Como transformar objetos 3D em vistas 2D precisas."
            variant="indigo"
        />
        
        <RichIntro>
            <p>O maior desafio do desenho técnico é representar um objeto tridimensional em um papel que é bidimensional. A solução clássica da engenharia é a <strong>Projeção Ortográfica (NBR 10067)</strong>. No Brasil, utilizamos o <strong>1º Diedro (Método E)</strong>, enquanto em países como EUA e Japão é comum o 3º Diedro. No concurso da Petrobras, saber a posição das vistas no 1º diedro é ponto certo na prova.</p>
            <p>No 1º Diedro, o objeto situa-se entre o observador e o plano de projeção. Isso gera uma disposição específica das vistas: a <strong>Vista Frontal</strong> (Elevação) fica no centro; a <strong>Vista Superior</strong> (Planta) fica abaixo da frontal; e a <strong>Vista Lateral Esquerda</strong> (Perfil) fica à direita da frontal. Essa inversão lógica (superior em baixo, esquerda na direita) é a 'pontos de atenção' básica.</p>
            <p>Além das vistas principais, o desenho ortográfico utiliza diferentes tipos de linhas para comunicar informações (NBR 8403): a <strong>Linha Contínua Larga</strong> representa contornos visíveis; a <strong>Linha Tracejada</strong> indica contornos ocultos; e a <strong>Linha de Traço e Ponto</strong> indica eixos de simetria e centros de furos.</p>
        </RichIntro>

        <Comparison 
          title="1º Diedro (Brasil) vs 3º Diedro (EUA/Japão)"
          left={{
            title: "1º Diedro (NBR 10067)",
            content: "Observador -> Objeto -> Plano",
            description: "Superior fica EMBAIXO da Frontal. Esquerda fica à DIREITA.",
            variant: "success"
          }}
          right={{
            title: "3º Diedro (ISO/ANSI)",
            content: "Observador -> Plano -> Objeto",
            description: "Superior fica ACIMA da Frontal. Esquerda fica à ESQUERDA.",
            variant: "info"
          }}
        />

        

<ModuleConsolidation 
            index={2}
            variant="indigo"
            video={{
                videoId: "8l_m2-v5R4c",
                title: "Vistas Ortográficas Paso a Paso",
                duration: "15:40"
            }}
            resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Projeções",
                materia: "Manutenção",
                images: [
                    { title: "Símbolo do 1º Diedro", type: "infographic", placeholderColor: "blue" },
                    { title: "Layout em Cruz das Vistas", type: "diagram", placeholderColor: "indigo" }
                ]
            }}
            sinteseEstrategica={{
                title: "Destaque Estratégico",
                content: <p className="text-lg italic">"Superior em baixo, esquerda na direita. No Brasil a projeção é assim feita!"</p>
            }}
            audio={{
                audioUrl: "/audio/desenho-m2.mp3",
                titulo: "A Lógica das Vistas",
                artista: "Mestre da Manutenção"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M2_DESENHO_PROJECAO}
            numero={3}
            titulo="QUIZ: Módulo Nº 2"
            onComplete={() => handleModuleComplete("modulo-2")}
        />
      </TabsContent>

      {/* 🟦 MÓDULO 3: CORTES */}
      <TabsContent value="modulo-3" className="space-y-6">
        <ModuleBanner 
            numero={3} 
            titulo="Cortes, Seções e Hachuras" 
            descricao="Revelando o interior dos componentes sem destruir o desenho."
            variant="emerald"
        />
        
        <RichIntro>
            <p>Quando uma peça possui detalhes internos muito complexos (como canais de óleo em um bloco de motor ou sede de válvula), as linhas tracejadas acabam confundindo a interpretação. Nesse caso, utilizamos o <strong>Corte (NBR 10067/12298)</strong>. Imaginamos que a peça foi serrada por um plano secante, permitindo visualizar o que há por dentro.</p>
            <p>As superfícies atingidas pelo corte são representadas por <strong>Hachuras</strong>. Estas são linhas finas, paralelas e geralmente inclinadas a 45°. Elas não indicam apenas que a peça foi cortada, mas também podem representar o tipo de material (embora a NBR 12298 recomende o uso de hachura geral de 45° para todos os materiais, reservando hachuras específicas para convenções setoriais).</p>
        </RichIntro>

        <ContentAccordion 
            titulo="Tipos de Corte"
            icone="🪓"
            mode="stacked"
            slides={[
                {
                    titulo: "Corte Total",
                    conteudo: "O plano atravessa a peça de ponta a ponta.",
                    icone: "🏁"
                },
                {
                    titulo: "Meio-Corte",
                    conteudo: "Usado em peças simétricas. Metade é vista em corte e a outra metade como vista externa.",
                    icone: "🌓"
                },
                {
                    titulo: "Corte Parcial (Rompimento)",
                    conteudo: "Corte localizado para mostrar apenas um detalhe específico, delimitado por uma linha de ruptura fina sinuosa.",
                    icone: "🩹"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={3}
            variant="emerald"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "A Arte das Hachuras",
                duration: "08:15"
            }}
            resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Cortes",
                materia: "Manutenção",
                images: [
                    { title: "Convenções de Hachuras", type: "infographic", placeholderColor: "emerald" },
                    { title: "Diferença: Corte vs Seção", type: "diagram", placeholderColor: "teal" }
                ]
            }}
            sinteseEstrategica={{
                title: "Hachura não é enfeite",
                content: <p className="text-lg">"Lugar de hachura é no lugar da massa!" Se for vazio, não tem risquinho.</p>
            }}
            audio={{
                audioUrl: "/audio/desenho-m3.mp3",
                titulo: "Visualização Interna",
                artista: "Mestre da Manutenção"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M3_DESENHO_CORTES}
            numero={4}
            titulo="QUIZ: Módulo Nº 3"
            onComplete={() => handleModuleComplete("modulo-3")}
        />
      </TabsContent>

      {/* 🟦 MÓDULO 4: COTAGEM */}
      <TabsContent value="modulo-4" className="space-y-6">
        <ModuleBanner 
            numero={4} 
            titulo="Cotagem e Dimensionamento" 
            descricao="Nenhum desenho serve para fabricação sem medidas exatas."
            variant="amber"
        />
        
        <RichIntro>
            <p>Um desenho pode estar perfeitamente projetado, mas se a <strong>Cotagem (NBR 10126)</strong> estiver errada, a peça será um sucata. Cotar é o ato de colocar as dimensões essenciais da peça no desenho. Em mecânica industrial, a unidade padrão é o milímetro (mm). Existem três componentes básicos em uma cota: a <strong>Linha de Cota</strong> (onde fica a seta), a <strong>Cota</strong> (o valor numérico) e as <strong>Linhas Auxiliares</strong> (que limitam a medida).</p>
        </RichIntro>

        <AlertBox tipo="danger" titulo="Erro Fatal no Campo">
            Nunca tente medir um desenho técnico com uma régua escolar para descobrir uma dimensão que falta. Isso é terminantemente proibido. Se uma cota falta, o desenho está incompleto. A escala do desenho serve apenas para proporção visual, nunca para medição direta pelo executor.
        </AlertBox>

        

<ModuleConsolidation 
            index={4}
            variant="amber"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "Regras de Ouro da Cotagem",
                duration: "11:20"
            }}
            resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Cotagem",
                materia: "Manutenção",
                images: [
                    { title: "Símbolos Ø, R, □", type: "card", placeholderColor: "amber" },
                    { title: "Cotagem em Série vs Paralela", type: "infographic", placeholderColor: "orange" }
                ]
            }}
            sinteseEstrategica={{
                title: "A Orientação da Cota",
                content: <p className="text-lg">"Leia de baixo ou da direita." As cotas devem estar sempre acima da linha de cota.</p>
            }}
            audio={{
                audioUrl: "/audio/desenho-m4.mp3",
                titulo: "Dimensionando com Sucesso",
                artista: "Mestre da Manutenção"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M4_DESENHO_COTAGEM}
            numero={5}
            titulo="QUIZ: Módulo Nº 4"
            onComplete={() => handleModuleComplete("modulo-4")}
        />
      </TabsContent>

      {/* 🟦 MÓDULO 5: ISOMÉTRICOS E P&ID */}
      <TabsContent value="modulo-5" className="space-y-6">
        <ModuleBanner 
            numero={5} 
            titulo="Tubulações e Fluxogramas" 
            descricao="O dia a dia do técnico na área operacional da Petrobras."
            variant="rose"
        />
        
        <RichIntro>
            <p>Na manutenção de refinarias e UPGNs, você raramente verá desenhos ortográficos isolados de peças simples. O que impera são os <strong>Desenhos de Tubulações</strong>. Os dois tipos mais comuns são: o <strong>Fluxograma de Engenharia ou P&ID</strong> (Diagrama de Instrumentação e Tubulação), que é um diagrama lógico, e o <strong>Isométrico de Tubulação</strong>, que é um desenho em perspectiva que serve para a fabricação (spools).</p>
            <p>O isométrico de tubulação foge das vistas ortográficas para mostrar a linha em 3D de forma simplificada em uma única folha. Ele utiliza eixos a 120° e símbolos padronizados para válvulas, flanges e curvas. É através do isométrico que o técnico identifica a classe de pressão, o material e o posicionamento geográfico da linha.</p>
        </RichIntro>

        

<ModuleConsolidation 
            index={5}
            variant="rose"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "Lendo Isométricos Petrobras",
                duration: "20:00"
            }}
            resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Tubulações",
                materia: "Manutenção",
                images: [
                    { title: "Simbologia de Válvulas", type: "table", placeholderColor: "rose" },
                    { title: "Interpretação de P&ID", type: "infographic", placeholderColor: "pink" }
                ]
            }}
            sinteseEstrategica={{
                title: "A Bússola no Isométrico",
                content: <p className="text-lg">"Olhe sempre para o Norte!" Todo isométrico indica a direção do Norte de Projeto para orientação no campo.</p>
            }}
            audio={{
                audioUrl: "/audio/desenho-m5.mp3",
                titulo: "Guia de Fluxogramas",
                artista: "Mestre da Manutenção"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M5_DESENHO_ISOMETRICOS}
            numero={6}
            titulo="QUIZ: Módulo Nº 5"
            onComplete={() => handleModuleComplete("modulo-5")}
        />
      </TabsContent>

    </AulaTemplate>
  );
}
