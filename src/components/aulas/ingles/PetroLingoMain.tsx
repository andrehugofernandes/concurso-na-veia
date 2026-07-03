import React, { useState, useMemo } from "react";
import PetroLingoPath from "./PetroLingoPath";
import PetroLingoExercise, { SentenceData } from "./PetroLingoExercise";
import { usePetroLingoProgress } from "@/hooks/usePetroLingoProgress";
import { 
  LuFileText, 
  LuLink, 
  LuAnchor, 
  LuHardHat, 
  LuWaves, 
  LuShieldCheck,
  LuLoader,
  LuZap,
  LuTarget,
  LuLayers,
  LuSearch,
  LuCheck,
  LuTrophy
} from "react-icons/lu";

// Interface para os dados da trilha
interface PetroLingoUnitData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  totalLevels: number;
  exercises: SentenceData[];
}

// Dados da Trilha Mestra Fixa para Petrobras English
// O conteúdo agora reflete o vocabulário técnico das aulas de Operação e Administração
const MASTER_UNITS_DATA: {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  totalLevels: number;
  exercises: SentenceData[];
}[] = [
  {
    id: "petrolingo-unit-1",
    title: "The Linker Kingdom",
    subtitle: "Conectores Lógicos",
    icon: <LuLink size={32} />,
    color: "emerald",
    totalLevels: 3,
    exercises: [
      {
        id: "l1-e1",
        portuguese: "O engenheiro trabalha na refinaria.",
        english: ["The", "engineer", "works", "at", "the", "refinery."],
        options: ["médico", "técnico", "plataforma", "escritório", "de", "uma"],
        explanation: "Em inglês, profissões e locais de trabalho costumam usar o artigo 'the'. Cuidado com os falsos cognatos: 'engineer' significa engenheiro, enquanto 'refinery' é refinaria."
      },
      {
        id: "l1-e2",
        type: "cloze",
        clozePrefix: "The workers stay",
        clozeSuffix: "the platform.",
        portuguese: "Complete com a preposição correta para 'na plataforma':",
        english: ["on"],
        options: ["in", "on", "at", "under"],
        explanation: "Para superfícies como plataformas, usamos 'on'. Questão de preposição clássica."
      },
      {
        id: "l1-e3",
        type: "matching",
        portuguese: "Combine os pares técnicos:",
        english: ["Done"],
        pairs: [
          { en: "Oil", pt: "Petróleo" },
          { en: "Safety", pt: "Segurança" },
          { en: "Drill", pt: "Simulado" },
          { en: "Task", pt: "Tarefa" }
        ],
        explanation: "Memorizar termos técnicos é fundamental para a velocidade de leitura."
      },
      {
        id: "l1-e4",
        portuguese: "Embora o sistema falhasse, o backup funcionou.",
        english: ["Although", "the", "system", "failed,", "the", "backup", "worked."],
        explanation: "'Although' (Embora) introduz uma contradição, questão recorrente na Cesgranrio."
      },
      {
        id: "l1-e5",
        portuguese: "No entanto, precisamos de mais dados.",
        english: ["However,", "we", "need", "more", "data."],
        explanation: "'However' (No entanto) expressa oposição, tão frequente quanto 'But'."
      }
    ]
  },
  {
    id: "petrolingo-unit-2",
    title: "The Passive Force",
    subtitle: "Voz Passiva Técnica",
    icon: <LuLayers size={32} />,
    color: "blue",
    totalLevels: 5,
    exercises: [
      {
        id: "l2-e1",
        portuguese: "O petróleo é extraído em águas profundas.",
        english: ["Oil", "is", "extracted", "in", "deep", "waters."],
        explanation: "A voz passiva (is extracted) foca no processo, comum em textos técnicos da Petrobras."
      },
      {
        id: "l2-e2",
        type: "cloze",
        clozePrefix: "The new pipeline",
        clozeSuffix: "built last year.",
        portuguese: "Complete com o verbo auxiliar correto para a voz passiva no passado:",
        english: ["was"],
        options: ["is", "were", "was", "has been"],
        explanation: "'Pipeline' é singular, então 'was' é o correto para o passado simples na voz passiva."
      },
      {
        id: "l2-e3",
        type: "matching",
        portuguese: "Combine os verbos na voz passiva:",
        english: ["Done"],
        pairs: [
          { en: "is produced", pt: "é produzido" },
          { en: "was discovered", pt: "foi descoberto" },
          { en: "will be installed", pt: "será instalado" },
          { en: "has been repaired", pt: "foi reparado" }
        ],
        explanation: "Pratique as diferentes formas da voz passiva."
      },
      {
        id: "l2-e4",
        portuguese: "O relatório foi escrito pelo engenheiro.",
        english: ["The", "report", "was", "written", "by", "the", "engineer."],
        explanation: "O 'by' indica o agente da passiva nos textos de prova."
      },
      {
        id: "l2-e5",
        portuguese: "A manutenção tem sido feita regularmente.",
        english: ["Maintenance", "has", "been", "done", "regularly."],
        explanation: "'Has been done' é a voz passiva no Present Perfect, indicando continuidade."
      }
    ]
  },
  {
    id: "petrolingo-unit-3",
    title: "Reference Quest",
    subtitle: "Referência Pronominal",
    icon: <LuSearch size={32} />,
    color: "amber",
    totalLevels: 4,
    exercises: [
      {
        id: "l3-e1",
        portuguese: "A máquina parou porque ela estava velha.",
        english: ["The", "machine", "stopped", "because", "it", "was", "old."],
        explanation: "Cesgranrio pergunta: 'it' se refere a quê? Resposta: The machine."
      },
      {
        id: "l3-e2",
        type: "cloze",
        clozePrefix: "The engineers are working. ",
        clozeSuffix: "are very skilled.",
        portuguese: "Complete com o pronome correto para 'os engenheiros':",
        english: ["They"],
        options: ["He", "She", "It", "They"],
        explanation: "'They' é o pronome pessoal para se referir a múltiplos indivíduos."
      },
      {
        id: "l3-e3",
        type: "matching",
        portuguese: "Combine os pronomes com seus referentes:",
        english: ["Done"],
        pairs: [
          { en: "it", pt: "a máquina" },
          { en: "they", pt: "os trabalhadores" },
          { en: "which", pt: "o processo" },
          { en: "whose", pt: "do técnico" }
        ],
        explanation: "Entender a referência pronominal é chave para a coesão textual."
      },
      {
        id: "l3-e4",
        portuguese: "O técnico cuja ferramenta quebrou avisou o chefe.",
        english: ["The", "technician", "whose", "tool", "broke", "notified", "the", "boss."],
        explanation: "'Whose' indica posse (cujo/cuja), item gramatical avançado da Cesgranrio."
      }
    ]
  },
  {
    id: "petrolingo-unit-4",
    title: "Permission & Need",
    subtitle: "Verbos Modais",
    icon: <LuZap size={32} />,
    color: "purple",
    totalLevels: 4,
    exercises: [
      {
        id: "l4-e1",
        portuguese: "Você deve usar capacete na unidade.",
        english: ["You", "must", "wear", "a", "helmet", "in", "the", "unit."],
        explanation: "'Must' indica obrigação forte, essencial para questões de segurança (HSE)."
      },
      {
        id: "l4-e2",
        type: "cloze",
        clozePrefix: "We",
        clozeSuffix: "check the valves regularly.",
        portuguese: "Complete com o modal que indica recomendação:",
        english: ["should"],
        options: ["must", "can", "should", "might"],
        explanation: "'Should' é usado para dar conselhos ou fazer recomendações."
      },
      {
        id: "l4-e3",
        type: "matching",
        portuguese: "Combine os modais com seus significados:",
        english: ["Done"],
        pairs: [
          { en: "must", pt: "obrigação" },
          { en: "can", pt: "capacidade" },
          { en: "should", pt: "recomendação" },
          { en: "might", pt: "possibilidade" }
        ],
        explanation: "Cada modal tem um nuance específico que a Cesgranrio explora."
      },
      {
        id: "l4-e4",
        portuguese: "Pode haver um vazamento no tanque.",
        english: ["There", "might", "be", "a", "leak", "in", "the", "tank."],
        explanation: "'Might' ou 'May' indicam possibilidade remota ou incerteza."
      }
    ]
  },
  {
    id: "petrolingo-unit-5",
    title: "The Clue Finder",
    subtitle: "Sinônimos e Contexto",
    icon: <LuTarget size={32} />,
    color: "red",
    totalLevels: 4,
    exercises: [
      {
        id: "l5-e1",
        portuguese: "A produção caiu drasticamente.",
        english: ["Production", "dropped", "sharply."],
        explanation: "Cesgranrio adora trocar 'dropped' por 'fell' ou 'decreased'."
      },
      {
        id: "l5-e2",
        type: "cloze",
        clozePrefix: "The company aims to",
        clozeSuffix: "its profits.",
        portuguese: "Complete com um sinônimo de 'increase':",
        english: ["boost"],
        options: ["decrease", "reduce", "boost", "lower"],
        explanation: "'Boost' é um sinônimo comum para 'increase' em contextos de negócios."
      },
      {
        id: "l5-e3",
        type: "matching",
        portuguese: "Combine as palavras com seus sinônimos:",
        english: ["Done"],
        pairs: [
          { en: "provide", pt: "supply" },
          { en: "task", pt: "duty" },
          { en: "achieve", pt: "attain" },
          { en: "significant", pt: "important" }
        ],
        explanation: "Expandir o vocabulário de sinônimos melhora a compreensão de texto."
      },
      {
        id: "l5-e4",
        portuguese: "A tarefa foi concluída com sucesso.",
        english: ["The", "task", "was", "successfully", "completed."],
        explanation: "'Task' é sinônimo de 'Assignment' ou 'Duty' (tarefa/dever)."
      }
    ]
  },
  {
    id: "petrolingo-unit-6",
    title: "Technical Pitfalls",
    subtitle: "Falsos Cognatos",
    icon: <LuShieldCheck size={32} />,
    color: "rose",
    totalLevels: 4,
    exercises: [
      {
        id: "l6-e1",
        portuguese: "Atualmente, nós usamos novas tecnologias.",
        english: ["Currently,", "we", "use", "new", "technologies."],
        explanation: "'Currently' significa 'atualmente'. NÃO confunda com 'Actually' (na verdade)."
      },
      {
        id: "l6-e2",
        type: "cloze",
        clozePrefix: "He",
        clozeSuffix: "to be sick, but he was fine.",
        portuguese: "Complete com o falso cognato de 'pretender':",
        english: ["pretended"],
        options: ["intended", "pretended", "aimed", "planned"],
        explanation: "'Pretend' significa 'fingir', enquanto 'intend' significa 'pretender'."
      },
      {
        id: "l6-e3",
        type: "matching",
        portuguese: "Combine os falsos cognatos com seus significados corretos:",
        english: ["Done"],
        pairs: [
          { en: "actually", pt: "na verdade" },
          { en: "eventually", pt: "finalmente" },
          { en: "sensible", pt: "sensato" },
          { en: "parents", pt: "pais" }
        ],
        explanation: "Falsos cognatos são armadilhas comuns em provas de inglês técnico."
      },
      {
        id: "l6-e4",
        portuguese: "Nós consultamos a biblioteca técnica.",
        english: ["We", "consulted", "the", "technical", "library."],
        explanation: "'Library' é biblioteca. 'Bookstore' é livraria. Cuidado com o falso cognato."
      }
    ]
  },
  {
    id: "petrolingo-unit-7",
    title: "Reading Master",
    subtitle: "Estratégias de Leitura",
    icon: <LuFileText size={32} />,
    color: "yellow",
    totalLevels: 4,
    exercises: [
      {
        id: "l7-e1",
        type: "reading" as const,
        text: "The refining process begins with fractional distillation. Crude oil is heated until it vaporizes and the components condense at different heights in the column. Heavier fractions settle at the bottom, while lighter gases rise to the top.",
        portuguese: "De acordo com o texto, o que determina onde os componentes do petróleo se condensam?",
        english: ["A altura na coluna de destilação."],
        options: [
          "A pressão aplicada no topo da coluna.",
          "A altura na coluna de destilação.",
          "A quantidade total de petróleo bruto.",
          "O preço do barril no mercado externo."
        ],
        explanation: "O texto afirma: 'components condense at different heights in the column'. Questão clássica de localização de informação (Scanning)."
      },
      {
        id: "l7-e2",
        type: "reading",
        text: "Safety is the paramount priority in offshore operations. Every worker must undergo rigorous training before boarding a platform. Furthermore, daily drills are mandatory to ensure everyone knows the emergency protocols.",
        portuguese: "O que o texto afirma ser obrigatório diariamente para garantir o conhecimento dos protocolos?",
        english: ["Treinamentos práticos (drills)."],
        options: [
          "Treinamentos práticos (drills).",
          "Apenas o uso de equipamentos de proteção.",
          "Folgas remuneradas após o embarque.",
          "Relatórios escritos de mil páginas."
        ],
        explanation: "O termo 'daily drills are mandatory' indica que os exercícios/treinamentos diários são obrigatórios."
      },
      {
        id: "l7-e3",
        type: "reading",
        text: "Environmental regulations in the oil industry have become increasingly strict over the last decade. Companies that fail to comply with these rules face heavy fines and potential suspension of their operating licenses. Therefore, sustainability is now a core part of strategic planning.",
        portuguese: "Qual a consequência citada para as empresas que não cumprirem as normas ambientais?",
        english: ["Multas pesadas e suspensão de licenças."],
        options: [
          "Aumento imediato do preço do petróleo.",
          "Multas pesadas e suspensão de licenças.",
          "Contratação obrigatória de mais estagiários.",
          "Mudança gratuita da sede para outro país."
        ],
        explanation: "O texto diz: 'face heavy fines and potential suspension of their operating licenses'."
      },
      {
        id: "l7-e4",
        type: "reading",
        text: "Petrobras remains a leader in deep-water technology. By using remotely operated vehicles (ROVs), the company can inspect pipelines at depths exceeding 2,000 meters. This technology minimizes risks to divers and ensures continuous production.",
        portuguese: "O uso de ROVs é destacado no texto principalmente por:",
        english: ["Minimizar riscos aos mergulhadores."],
        options: [
          "Aumentar o custo da manutenção.",
          "Minimizar riscos aos mergulhadores.",
          "Substituir todos os engenheiros da plataforma.",
          "Reduzir a profundidade de exploração."
        ],
        explanation: "O texto afirma explicitamente: 'This technology minimizes risks to divers'."
      }
    ]
  },
  {
    id: "petrolingo-unit-8",
    title: "Final Challenge",
    subtitle: "Simulado de Elite",
    icon: <LuTrophy size={32} />,
    color: "indigo",
    totalLevels: 5,
    exercises: [
      {
        id: "l8-e1",
        portuguese: "Embora o projeto fosse caro, ele foi aprovado.",
        english: ["Although", "the", "project", "was", "expensive,", "it", "was", "approved."],
        explanation: "Mix de Conector (Although) + Voz Passiva (was approved) + Referência (it)."
      },
      {
        id: "l8-e2",
        type: "cloze",
        clozePrefix: "The oil rig",
        clozeSuffix: "located offshore.",
        portuguese: "Complete com o verbo 'to be' no presente para 'plataforma de petróleo':",
        english: ["is"],
        options: ["are", "is", "was", "were"],
        explanation: "'Oil rig' é singular, então 'is' é o correto para o presente simples."
      },
      {
        id: "l8-e3",
        type: "matching",
        portuguese: "Combine os termos técnicos com suas definições:",
        english: ["Done"],
        pairs: [
          { en: "Refinery", pt: "Local de processamento de petróleo" },
          { en: "Reservoir", pt: "Acúmulo subterrâneo de petróleo" },
          { en: "Drilling", pt: "Perfuração" },
          { en: "Subsea", pt: "Submarino" }
        ],
        explanation: "Conhecimento de termos técnicos é crucial para a prova."
      },
      {
        id: "l8-e4",
        type: "reading" as const,
        text: "The transition to renewable energy sources is a global trend. While oil remains a significant part of the energy matrix, investments in wind and solar power are growing. This shift is driven by the need to reduce greenhouse gas emissions.",
        portuguese: "De acordo com o texto, o que está impulsionando a mudança para energias renováveis?",
        english: ["A necessidade de reduzir emissões."],
        options: [
          "A escassez total de petróleo no mundo.",
          "A necessidade de reduzir emissões.",
          "O desejo de aumentar o preço da energia.",
          "A proibição do uso de carros a gasolina."
        ],
        explanation: "O texto afirma: 'This shift is driven by the need to reduce greenhouse gas emissions'."
      }
    ]
  }
];

export default function PetroLingoMain() {
  const [view, setView] = useState<"path" | "exercise">("path");
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Hook de persistência customizado para PetroLingo
  const unitIds = useMemo(() => MASTER_UNITS_DATA.map(u => u.id), []);
  const { progress, loading, completeUnit, resetProgress } = usePetroLingoProgress(unitIds);

  // Une os dados da trilha estática com o progresso do banco
  const units = useMemo(() => {
    return MASTER_UNITS_DATA.map(u => ({
      ...u,
      isLocked: progress[u.id]?.isLocked ?? true,
      isCompleted: progress[u.id]?.completed ?? false,
      currentLevel: progress[u.id]?.completed ? u.totalLevels : 0
    }));
  }, [progress, loading]);

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    setView("exercise");
  };

  const handleFinishExercise = async (score: number) => {
    // Atualiza o progresso no banco via RPC
    if (selectedUnitId) {
      await completeUnit(selectedUnitId, 25);
    }
    setView("path");
  };

  const handleBackToPath = () => {
    setView("path");
  };

  const selectedUnit = MASTER_UNITS_DATA.find(u => u.id === selectedUnitId);

  if (loading && view === "path") {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-background gap-4">
        <LuLoader className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-bold animate-pulse text-lg tracking-widest uppercase">Carregando Trilha...</p>
      </div>
    );
  }

  const content = (
    <div className="w-full text-foreground transition-colors duration-300">
      {view === "path" ? (
        <div className="space-y-6">
          <PetroLingoPath 
            units={units} 
            onSelectUnit={handleSelectUnit} 
            onResetProgress={async () => {
              if (confirm("Tem certeza que deseja zerar o progresso do PetroLingo e recomeçar a trilha do zero?")) {
                await resetProgress();
              }
            }}
          />
        </div>
      ) : (
        selectedUnit && (
          <PetroLingoExercise 
            exercises={selectedUnit.exercises.length > 0 ? selectedUnit.exercises : [
              {
                id: "placeholder",
                portuguese: "O conteúdo desta unidade está em desenvolvimento...",
                english: ["Loading", "Content", "Soon"],
                explanation: "Esta unidade será preenchida com questões da Cesgranrio."
              }
            ]} 
            onBack={handleBackToPath}
            onFinish={handleFinishExercise}
          />
        )
      )}
    </div>
  );

  return (
    <div className="w-full min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto w-full">
        {content}
      </div>
    </div>
  );
}
