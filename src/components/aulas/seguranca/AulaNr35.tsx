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
  QUIZ_M1_NR35_GESTAO,
  QUIZ_M2_NR35_AR_PT,
  QUIZ_M3_NR35_SISTEMAS,
  QUIZ_M4_NR35_EMERGENCIA,
  QUIZ_M5_NR35_ACESSOS,
} from "./data/nr35-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", numero: 1, label: "Gestão", titulo: "Gestão e Planejamento", descricao: "Definição de altura, responsabilidades e análise prévia." },
  { id: "modulo-2", numero: 2, label: "Controle", titulo: "Análise de Risco e PT", descricao: "AR, Permissão de Trabalho e Medidas de Proteção." },
  { id: "modulo-3", numero: 3, label: "Sistemas", titulo: "Proteção contra Quedas", descricao: "EPI, EPC e Ancoragens (Cinturão e Talabartes)." },
  { id: "modulo-4", numero: 4, label: "Socorro", titulo: "Emergência e Salvamento", descricao: "Plano de Resgate e Intolerância à Suspensão Inerte." },
  { id: "modulo-5", numero: 5, label: "Normas", titulo: "Acessos por Cordas e Escadas", descricao: "Anexos I (Cordas) e II (Escadas) revisados." },
] as const;

export default function AulaNr35({
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

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
      titulo={titulo || "NR-35 - Segurança no Trabalho em Altura"}
      descricao={descricao || "Domine a diretriz normativa para prevenção de quedas, essencial para operações na Petrobras."}
      duracao={duracao || "180 min"}
      materiaNome={materiaNome || "Segurança e NRs"}
      materiaCor={materiaCor || "from-amber-600 to-orange-700"}
      materiaId={materiaId || "nrs"}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* 🟧 MÓDULO 1: GESTÃO */}
      <TabsContent value="modulo-1" className="space-y-6">
        <ModuleBanner 
            numero={1} 
            titulo="Gestão, Planejamento e Organização" 
            descricao="Responsabilidades e definições cruciais da norma (Rer. 2023)."
            variant="amber"
        />
        
        <RichIntro>
            <p>O trabalho em altura é a causa número um de fatalidades no setor de Óleo e Gás e na Construção Civil. Por isso, a <strong>NR-35</strong> não é recomendação: é <strong>Lei Ordinária</strong> (através da CLT). A norma considera trabalho em altura toda atividade executada acima de <strong>2,00 metros</strong> do nível inferior, onde haja risco de queda. Note o detalhe: se você está a 1 metro de altura, mas sob um fosso de 5 metros, a NR-35 já se aplica.</p>
            <p>A gestão do risco começa com as <strong>Responsabilidades</strong>. É dever da empresa (empregador) garantir a implementação das medidas de proteção, realizar o treinamento bianual de 8h e assegurar a supervisão. O trabalhador, por sua vez, deve zelar por sua segurança, usar obrigatoriamente os EPIs e interromper o trabalho caso detecte um risco grave e iminente (Direito de Recusa).</p>
            <p>O <strong>Planejamento</strong> deve priorizar a 'Hierarquia de Controle': 1. Evitar o trabalho em altura (ex: usar drone de inspeção); 2. Impedir a queda através de barreiras física (EPCs); 3. Mitigar as consequências da queda (EPIs com absorvedor de energia).</p>
        </RichIntro>

        <AlertBox tipo="info" titulo="Ponto de Prova (Reciclagem)">
            O treinamento inicial deve ter carga horária de 8 horas. A reciclagem (treinamento periódico) é obrigatória a cada **dois anos**, mas também deve ocorrer se houver mudança nos procedimentos ou após afastamento superior a 90 dias.
        </AlertBox>

        

<ModuleConsolidation 
            index={1}
            variant="amber"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "Princípios da NR-35",
                duration: "10:30"
            }}
            resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Gestão NR-35",
                materia: "Segurança",
                images: [
                    { title: "Limite de 2,00m", type: "infographic", placeholderColor: "amber" },
                    { title: "Direitos e Deveres", type: "card", placeholderColor: "orange" }
                ]
            }}
            maceteVisual={{
                title: "O Mnemônico de Planejamento",
                content: <p className="text-lg italic">"Eliminar &rarr; Prevenir &rarr; Mitigar." Essa é a ordem de sobrevivência!</p>
            }}
            audio={{
                audioUrl: "/audio/nr35-m1.mp3",
                titulo: "Gestão de Segurança",
                artista: "Técnico Petrobras"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M1_NR35_GESTAO}
            numero={2}
            titulo="QUIZ: Módulo Nº 1"
            onComplete={() => handleModuleComplete("modulo-1")}
        />
      </TabsContent>

      {/* 🟧 MÓDULO 2: CONTROLE */}
      <TabsContent value="modulo-2" className="space-y-6">
        <ModuleBanner 
            numero={2} 
            titulo="Análise de Risco (AR) e PT" 
            descricao="As ferramentas de controle administrativo e operacional."
            variant="amber"
        />
        
        <RichIntro>
            <p>A atividade só sai do papel no trabalho em altura após a <strong>Análise de Risco (AR)</strong>. Esta deve considerar: o isolamento da área (para não atingir pessoas embaixo), o local em que o trabalho será executado, a seleção de pontos de ancoragem, as condições climáticas (vento, chuva) e os riscos adicionais (elétrico, inflamáveis, calor).</p>
            <p>Para atividades não rotineiras, é obrigatória a <strong>Permissão de Trabalho (PT)</strong>. Ela tem validade limitada à duração da atividade, devendo ser encerrada ao final do turno. Na Petrobras, as PTs são documentadas e assinadas pelo Emitente e pelo Responsável pelo Serviço, garantindo rastreabilidade e segurança coletiva.</p>
        </RichIntro>

        <Comparison 
          title="Atividades Rotineiras vs Não Rotineiras"
          left={{
            title: "Rotineiras",
            content: "Padronizadas por Procedimento Operacional.",
            description: "Exige AR, mas pode dispensar PT se previsto em norma interna.",
            variant: "info"
          }}
          right={{
            title: "Não Rotineiras",
            content: "Atividades eventuais ou imprevisíveis.",
            description: "Exige AR e Permissão de Trabalho (PT) obrigatória.",
            variant: "warning"
          }}
        />

        <QuizInterativo 
            questoes={QUIZ_M2_NR35_AR_PT}
            numero={1}
            titulo="QUIZ: Módulo Nº 2"
            onComplete={() => handleModuleComplete("modulo-2")}
        />
      </TabsContent>

      {/* 🟧 MÓDULO 3: SISTEMAS */}
      <TabsContent value="modulo-3" className="space-y-6">
        <ModuleBanner 
            numero={3} 
            titulo="Sistemas de Proteção contra Quedas" 
            descricao="Equipamentos, ancoragens e o uso correto do Cinturão Pará-quedas."
            variant="rose"
        />
        
        <RichIntro>
            <p>O <strong>Sistema de Proteção Contra Quedas (SPCQ)</strong> é dividido em: Sistema de Proteção Coletiva (EPC - ex: guarda-corpo, redes) e Sistema de Proteção Individual (SPIQ). O SPIQ é um conjunto composto por: Elemento de Engate (Cinturão), Elemento de Ligação (Talabarte ou Trava-quedas) e Ponto de Ancoragem.</p>
            <p>O **Cinturão de Segurança tipo Paraquedista** é o único permitido para trabalho em altura. Deve ser verificado diariamente (inspeção pré-uso) em busca de cortes, abrasões ou partes metálicas oxidadas. Um componente vital é o **Absorvedor de Energia**, usado em talabartes de 2 metros: sua função é garantir que a força de impacto no corpo em uma queda não ultrapasse os limites suportáveis pelos órgãos internos.</p>
        </RichIntro>

        <ContentAccordion 
            titulo="Equipamentos Chave"
            icone="👷"
            mode="stacked"
            slides={[
                {
                    titulo: "Talabarte em Y",
                    conteudo: "Permite que o trabalhador se desloque mantendo sempre um ponto de conexão preso à estrutura (100% de conexão).",
                    icone: "⛓️"
                },
                {
                    titulo: "Trava-Quedas Retrátil",
                    conteudo: "Funciona como um 'cinto de segurança de carro', bloqueando instantaneamente a queda no menor espaço possível.",
                    icone: "🧲"
                },
                {
                    titulo: "Linha de Vida Vertical/Horizontal",
                    conteudo: "Sistemas temporários ou permanentes que servem como o ponto de conexão estável para o trabalhador.",
                    icone: "🛤️"
                }
            ]}
        />

        

<ModuleConsolidation 
            index={3}
            variant="rose"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "Inspecionando EPIs",
                duration: "14:45"
            }}
            resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "EPI e EPC",
                materia: "Segurança",
                images: [
                    { title: "Esquema da Zona de Queda Livre", type: "diagram", placeholderColor: "rose" },
                    { title: "Pontos de Ancoragem", type: "infographic", placeholderColor: "pink" }
                ]
            }}
            maceteVisual={{
                title: "A ZQL (Zona de Queda Livre)",
                content: <p className="text-lg">"Antes de subir, calcule se o chão vai te atingir!" ZQL = Comprimento do Talabarte + Absorvedor Aberto + Altura do Trabalhador + 1m de Segurança.</p>
            }}
            audio={{
                audioUrl: "/audio/nr35-m3.mp3",
                titulo: "Sistemas Anti-Queda",
                artista: "Mestre de Segurança"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M3_NR35_SISTEMAS}
            numero={4}
            titulo="QUIZ: Módulo Nº 3"
            onComplete={() => handleModuleComplete("modulo-3")}
        />
      </TabsContent>

      {/* 🟧 MÓDULO 4: SOCORRO */}
      <TabsContent value="modulo-4" className="space-y-6">
        <ModuleBanner 
            numero={4} 
            titulo="Emergência e Salvamento" 
            descricao="A corrida contra o tempo em caso de queda real."
            variant="amber"
        />
        
        <RichIntro>
            <p>Se as proteções falharam e o trabalhador caiu, a batalha não acabou. O **Plano de Resgate** deve estar pronto ANTES da subida. O maior risco após a queda (com o trabalhador ainda pendurado) é a **Intolerância à Suspensão Inerte** (Trauma de Suspensão).</p>
            <p>A gravidade puxa o sangue para as pernas, mas o movimento muscular que auxilia o retorno do sangue ao coração está impedido (o trabalhador está imóvel). Isso pode causar síncope e morte em menos de 15 minutos se o resgate não for rápido e especializado.</p>
        </RichIntro>

        <AlertBox tipo="danger" titulo="Risco Crítico">
            Um trabalhador suspenso e inconsciente é uma emergência médica de prioridade absoluta. Nunca trabalhe sozinho em altura; a vigilância mútua é o que garante o resgate rápido.
        </AlertBox>

        <QuizInterativo 
            questoes={QUIZ_M4_NR35_EMERGENCIA}
            numero={1}
            titulo="QUIZ: Módulo Nº 4"
            onComplete={() => handleModuleComplete("modulo-4")}
        />
      </TabsContent>

      {/* 🟧 MÓDULO 5: NORMAS ESPECÍFICAS */}
      <TabsContent value="modulo-5" className="space-y-6">
        <ModuleBanner 
            numero={5} 
            titulo="Acessos por Cordas e Escadas" 
            descricao="Os Anexos I e II da NR-35 e as técnicas especiais."
            variant="amber"
        />
        
        <RichIntro>
            <p>O <strong>Anexo I (Acesso por Cordas)</strong> é muito comum em inspeções de plataformas da Petrobras. Exige certificação específica (Irata ou Abendi) e obrigatoriamente duas cordas separadas: Corda de Trabalho e Corda de Segurança (Back-up).</p>
            <p>O <strong>Anexo II (Escadas)</strong> trata das escadas individuais (simples, de abrira ou extensíveis). Regra de ouro da escada simples: ângulo de inclinação de 75° (ou 4 para 1) e deve ultrapassar o ponto de apoio em pelo menos 1 metro.</p>
        </RichIntro>

        

<ModuleConsolidation 
            index={5}
            variant="amber"
            video={{
                videoId: "dQw4w9WgXcQ",
                title: "Segurança em Escadas Industriais",
                duration: "18:00"
            }}
            resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Anexos Especiais",
                materia: "Segurança",
                images: [
                    { title: "Nó de Ancoragem (Acesso por Corda)", type: "infographic", placeholderColor: "amber" },
                    { title: "Padrão de Escada Extensível", type: "diagram", placeholderColor: "orange" }
                ]
            }}
            maceteVisual={{
                title: "A Regra dos 3 Pontos",
                content: <p className="text-lg italic">"Duas mãos e um pé, ou dois pés e uma mão. Na escada, nunca se solta do corrimão!"</p>
            }}
            audio={{
                audioUrl: "/audio/nr35-m5.mp3",
                titulo: "Acessos Especializados",
                artista: "Mestre da Segurança"
            }}
        />

                <QuizInterativo 
            questoes={QUIZ_M5_NR35_ACESSOS}
            numero={6}
            titulo="QUIZ: Módulo Nº 5"
            onComplete={() => handleModuleComplete("modulo-5")}
        />
      </TabsContent>

    </AulaTemplate>
  );
}
