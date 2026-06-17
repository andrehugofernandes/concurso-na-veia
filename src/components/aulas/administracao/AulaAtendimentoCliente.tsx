"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users,
  MessageCircle,
  ThumbsUp,
  HeadphonesIcon,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { ModuleBanner, ModuleSectionHeader, ContentAccordion, QuizInterativo, AulaProps, QuizQuestion } from "../shared";

const STORAGE_KEY_PREFIX = "petrobras_quest_atendimento_cliente_";

export default function AulaAtendimentoCliente(props: AulaProps) {
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});

  // Carrega progresso salvo
  useEffect(() => {
    const savedProgress = localStorage.getItem(`${STORAGE_KEY_PREFIX}progress`);
    const savedSections = localStorage.getItem(`${STORAGE_KEY_PREFIX}sections`);
    
    if (savedProgress) setProgress(Number(savedProgress));
    if (savedSections) setCompletedSections(JSON.parse(savedSections));
    // Marca leitura de slides como concluída na montagem
    setTimeout(() => markSectionCompleted('slides'), 100);
  }, []);

  // Salva progresso
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}progress`, progress.toString());
    localStorage.setItem(`${STORAGE_KEY_PREFIX}sections`, JSON.stringify(completedSections));
  }, [progress, completedSections]);

  const markSectionCompleted = (sectionId: string) => {
    if (!completedSections[sectionId]) {
      const newSections = { ...completedSections, [sectionId]: true };
      setCompletedSections(newSections);
      
      const totalSections = 3; // Slides, Boas Práticas, Quiz
      const completedCount = Object.values(newSections).filter(Boolean).length;
      setProgress(Math.round((completedCount / totalSections) * 100));
    }
  };

  const slides: any[] = [
    {
      id: "intro",
      title: "O Papel do Atendimento ao Cliente",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            O atendimento ao cliente é um dos pilares centrais da experiência do consumidor e da reputação de qualquer organização. Muito além de responder a perguntas ou solucionar problemas, atender bem significa construir uma <strong>relação de confiança</strong>, respeito e valorização mútua.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <HeartHandshake className="w-5 h-5 mr-2" /> Fator de Diferenciação
            </h4>
            <p className="text-gray-700">
              Em mercados competitivos com produtos e serviços semelhantes, a qualidade do atendimento é muitas vezes o <strong>principal fator de fidelização</strong>.
            </p>
          </div>
          <p className="text-gray-700">
            Um bom atendimento pode transformar um cliente insatisfeito em um promotor da marca, enquanto uma falha pode levar à perda definitiva de oportunidades e à disseminação de uma imagem negativa (especialmente nas redes sociais).
          </p>
        </div>
      )
    },
    {
      id: "jornada",
      title: "O Atendimento na Jornada do Cliente",
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            O papel do atendimento vai muito além do ponto de contato inicial. Ele está presente em todas as fases da jornada do cliente:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-2">1. Prospecção</h4>
              <p className="text-sm text-gray-600">O primeiro contato define expectativas e cria a primeira impressão sobre a marca.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-2">2. Venda</h4>
              <p className="text-sm text-gray-600">Momento em que as dúvidas são esclarecidas e a confiança é construída para a tomada de decisão.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-2">3. Pós-venda</h4>
              <p className="text-sm text-gray-600">O suporte contínuo que determinará a permanência ou não do cliente com a organização.</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-4 flex items-start">
            <Lightbulb className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700">
              O atendimento <strong>não é responsabilidade exclusiva de um departamento</strong>, mas uma função estratégica que deve ser incorporada à cultura organizacional. Todos os colaboradores influenciam na percepção do cliente.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "boas_praticas",
      title: "Boas Práticas de Atendimento",
      icon: <CheckCircle2 className="w-6 h-6 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Para que o atendimento seja eficaz, algumas práticas fundamentais devem ser observadas:
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <strong className="text-gray-800">Escuta Ativa:</strong>
                <p className="text-sm text-gray-600">Compreender o que o cliente está dizendo, prestando atenção ao conteúdo, ao tom e às emoções envolvidas.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <strong className="text-gray-800">Empatia:</strong>
                <p className="text-sm text-gray-600">Colocar-se no lugar do cliente, reconhecer sua frustração ou necessidade, e demonstrar real interesse em ajudá-lo.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <strong className="text-gray-800">Clareza na Comunicação:</strong>
                <p className="text-sm text-gray-600">Informações devem ser transmitidas de forma objetiva, evitando jargões técnicos ou ambiguidades que possam confundir.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <strong className="text-gray-800">Agilidade:</strong>
                <p className="text-sm text-gray-600">Respeitar o tempo do cliente, mas sem comprometer a qualidade da solução oferecida.</p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "canais_digitais",
      title: "Atendimento Digital e Resolução de Conflitos",
      icon: <HeadphonesIcon className="w-6 h-6 text-red-500" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Canais Digitais (Omnichannel)</h4>
          <p className="text-gray-700 text-sm">
            O atendimento por e-mail, chat, redes sociais e aplicativos exige linguagem adaptada, rápida resposta e <strong>consistência na informação</strong>. É fundamental integrar os canais (via CRM e histórico) para garantir uma visão unificada do cliente, evitando que ele precise repetir seu problema a cada novo contato.
          </p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Resolução de Conflitos</h4>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Reclamações e falhas devem ser tratadas como <strong>oportunidades</strong> de mostrar compromisso. Ao reconhecer o erro e propor soluções rápidas (ou compensações proporcionais), a empresa demonstra integridade.
                </p>
              </div>
              <p className="text-sm font-medium text-red-800 mt-2 italic">
                "Mais do que o problema em si, o que realmente marca a experiência do cliente é a forma como ele foi tratado diante da adversidade."
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 border border-gray-200 mt-4">
            <strong>Dica:</strong> A melhoria contínua depende da coleta e análise de feedbacks (Pesquisas de Satisfação, NPS, monitoramento de interações) para identificar pontos fracos e ajustar processos.
          </div>
        </div>
      )
    },
    {
      id: "raio_x_cesgranrio",
      title: "Raio-X CESGRANRIO — Casos Práticos",
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A banca <strong>CESGRANRIO</strong> aborda a teoria de atendimento sob um viés muito prático e integrado à estratégia de marketing e custos de transação:
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-amber-900 flex items-center">
              📌 Armadilha 1: Custo Psíquico / Desgaste Emocional
            </h4>
            <p className="text-sm text-gray-700">
              Para a CESGRANRIO, aumentar o <strong>valor percebido</strong> pelo cliente exige reduzir os custos totais da transação. Além de dinheiro e tempo, a banca cobra com alta frequência a redução de custos não financeiros, especialmente o <strong>desgaste emocional (custos psíquicos)</strong> até a definição do negócio.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-blue-900 flex items-center">
              📌 Armadilha 2: Laços de Fidelidade (Retenção de Clientes)
            </h4>
            <p className="text-sm text-gray-700">
              Programas de fidelidade que dão pontos para troca por descontos ou brindes são classificados pela banca como estratégias de retenção por <strong>laços financeiros</strong>. Já as baseadas em atendimento consultivo e relações pessoais são <strong>laços sociais</strong>.
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 border border-gray-200 mt-2">
            <strong>Macete de Código:</strong> Viu uma questão de valor ao cliente? Busque alternativas que tratem de "tempo" ou "desgaste emocional/psíquico". Viu pontos por desconto? É laço financeiro.
          </div>
        </div>
      )
    }
  ];

  const quizQuestions = [
    {
      id: "q1",
      question: "No contexto do atendimento ao cliente, qual alternativa melhor define a prática da 'Empatia'?",
      options: [
        "Apresentar argumentos lógicos de que o cliente está errado e a empresa está certa.",
        "Transmitir informações de forma objetiva, usando linguagem estritamente técnica.",
        "Colocar-se no lugar do cliente, reconhecer sua frustração e demonstrar real interesse em ajudá-lo.",
        "Ignorar os problemas apresentados e oferecer um desconto padronizado.",
        "Acelerar o atendimento cortando as falas do cliente para garantir agilidade métrica."
      ],
      correctAnswer: 2,
      explanation: "Empatia é a capacidade de colocar-se no lugar do cliente, entendendo suas emoções e frustrações, e demonstrando um interesse genuíno na resolução de suas necessidades."
    },
    {
      id: "q2",
      question: "Qual das afirmativas abaixo é CORRETA sobre o papel do atendimento nas organizações modernas?",
      options: [
        "O atendimento é responsabilidade exclusiva do setor de Call Center ou SAC.",
        "O atendimento é uma função estratégica que deve ser incorporada à cultura organizacional, envolvendo todos que interagem com o cliente.",
        "O bom atendimento é medido unicamente pela velocidade com que a interação é finalizada.",
        "Nas plataformas digitais, não há necessidade de consistência na informação, desde que o tempo de resposta seja baixo.",
        "Reclamações representam um custo perdido e o cliente insatisfeito deve ser desencorajado a entrar em contato novamente."
      ],
      correctAnswer: 1,
      explanation: "O atendimento não é responsabilidade exclusiva de um departamento, mas sim uma função estratégica inerente à cultura organizacional. Todos os colaboradores influenciam na percepção que o cliente tem da empresa."
    },
    {
      id: "q3",
      question: "Para aumentar o valor percebido pelo cliente nas transações de suprimentos, o agente comercial deve focar na redução de custos não financeiros que impactam a experiência do comprador. Um exemplo típico de custo não financeiro a ser minimizado pela empresa é o(a):",
      options: [
        "custo unitário do produto ofertado pela concorrência.",
        "desgaste emocional até a definição do negócio.",
        "impacto da aquisição no orçamento anual do cliente.",
        "montante financeiro investido na instalação do bem.",
        "prazo de vigência das garantias contratuais mínimas."
      ],
      correctAnswer: 1,
      explanation: "De acordo com os conceitos de marketing cobrados pela CESGRANRIO, os custos totais da transação incluem o tempo, a energia física e os custos psíquicos (desgaste emocional). Reduzir o desgaste emocional do comprador eleva o valor percebido da aquisição."
    }
  ];

  function toQQ(questions: typeof quizQuestions): QuizQuestion[] {
    return questions.map((q, idx) => ({
      id: idx + 1,
      pergunta: q.question,
      opcoes: q.options.map((o) => ({ label: o, valor: o })),
      correta: q.options[q.correctAnswer] ?? "",
      explicacao: q.explanation,
    }));
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <ModuleBanner 
        numero={1}
        titulo="Atendimento ao Cliente"
        descricao="A importância do bom atendimento, as fases da jornada do cliente, escuta ativa, empatia e resolução de conflitos nas organizações."
        variant="cyan"
      />

      {/* Barra de Progresso */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8 sticky top-4 z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso da Aula</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-8">
        <section>
          <ModuleSectionHeader 
            index={1}
            title="1. Fundamentos do Atendimento" 
          />
          <ContentAccordion 
            mode="stacked"
            slides={slides as any} 
          />
        </section>

        <section>
          <ModuleSectionHeader 
            index={2}
            title="2. Fixação de Conhecimento" 
          />
          <Card>
            <CardContent className="p-6">
              <QuizInterativo 
                questoes={toQQ(quizQuestions)} 
                onComplete={(score) => {
                  markSectionCompleted('quiz');
                  props.onComplete?.();
                }} 
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
