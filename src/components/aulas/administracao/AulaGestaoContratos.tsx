"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { AulaProps, QuizQuestion ,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
  AlertBox,
} from "../shared";
import { LuFileCheck, LuShieldCheck, LuShieldAlert, LuSearch } from "react-icons/lu";
import { TabsContent } from "@/components/ui/tabs";

const QUIZ_CONTRATOS: Record<string, { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] }> = {
  "modulo-1": {
    questions: [
      {
        id: 1,
        question: "Qual a diferença entre a Gestão e a Fiscalização de Contratos na Administração Pública?",
        options: [
          "A gestão cuida do acompanhamento in loco dos serviços, enquanto a fiscalização é apenas financeira.",
          "A gestão é administrativa (acompanhamento geral, prazos, aditivos), enquanto a fiscalização é técnica e operacional (verificação in loco da execução).",
          "Não há diferença, são sinônimos utilizados pela Lei 13.303/2016 e pelo RLCP.",
          "A fiscalização é feita exclusivamente por órgãos externos (TCU), e a gestão pelo preposto.",
        ],
        correct: 1,
        explanation: "A gestão de contratos é mais ampla e administrativa (trâmites, vigência, penalidades), enquanto a fiscalização é uma atribuição técnica e operacional (verificar in loco se o serviço está sendo feito ou se o bem foi entregue conforme as especificações).",
      },
      {
        id: 2,
        question: "Por que o controle rigoroso de Notas Fiscais é considerado um pilar da boa gestão contratual?",
        options: [
          "Para garantir que a contratada pague mais impostos ao Fisco.",
          "Porque a nota fiscal serve de base para o processo de liquidação da despesa, atestando o direito do credor.",
          "Apenas para cumprir uma formalidade exigida pelos órgãos de controle interno.",
          "Para substituir o contrato físico em caso de perda.",
        ],
        correct: 1,
        explanation: "A nota fiscal é a base para a 'liquidação da despesa' (fase que antecede o pagamento). O fiscal deve atestar na nota que o objeto foi executado de forma satisfatória antes de encaminhar para pagamento.",
      },
      {
        id: 3,
        question: "Nos termos da Lei nº 13.303/2016, a empresa contratada deve manter preposto na execução do objeto contratual. O papel do preposto é:",
        options: [
          "ordenar alterações unilaterais de escopo em nome da estatal.",
          "representar a contratada durante a execução e receber notificações formais do fiscal.",
          "fiscalizar o trabalho dos empregados da própria empresa estatal.",
          "emitir laudos de atesto de Notas Fiscais em nome da Administração.",
        ],
        correct: 1,
        explanation: "O preposto é o representante legal da contratada designado para acompanhar a execução e se comunicar oficialmente com o fiscal de contratos, evitando relação de subordinação direta entre a estatal e os funcionários terceirizados.",
      },
      {
        id: 4,
        question: "(CESGRANRIO) Em um contrato de fornecimento contínuo de combustíveis para embarcações da Petrobras, um evento imprevisível gerou aumento extraordinário de 40% no custo do produto. Nesse caso, a contratada tem direito ao:",
        options: [
          "rescisão unilateral imediata, sem penalidades.",
          "reequilíbrio econômico-financeiro do contrato, para restaurar a equação original.",
          "reajuste automático fixo de 40% previsto em edital.",
          "aditivo de prazo, mas não de valor.",
        ],
        correct: 1,
        explanation: "O reequilíbrio econômico-financeiro é direito constitucional do contratado quando fatos imprevisíveis (álea econômica extraordinária) alteram a equação original do contrato. Difere do reajuste (que é periódico e previsto) e da revisão (que é provocada por ato da própria Administração).",
      },
    ],
  },
  "modulo-2": {
    questions: [
      {
        id: 1,
        question: "No contexto da Administração Pública, a exigência de Certidões Negativas de Débito (CNDs) deve ocorrer:",
        options: [
          "Apenas na fase de habilitação da licitação.",
          "Apenas na assinatura do contrato.",
          "Durante toda a execução contratual, preferencialmente antes de cada pagamento.",
          "Apenas no encerramento do contrato.",
        ],
        correct: 2,
        explanation: "A exigência não se limita à habilitação. As CNDs devem ser cobradas continuamente durante toda a execução contratual, para garantir a regularidade fiscal e trabalhista da contratada, condicionando os pagamentos à sua apresentação.",
      },
      {
        id: 2,
        question: "Qual o risco para a Administração Pública caso seja negligente na fiscalização do recolhimento do INSS e FGTS em contratos de prestação de serviços com cessão de mão de obra?",
        options: [
          "A responsabilidade subsidiária pelos débitos previdenciários e trabalhistas caso fique comprovada a culpa in vigilando (Súmula 331 TST).",
          "Não há nenhum risco prático, pois o contrato rege-se sob as regras do Direito Privado.",
          "A perda automática da garantia contratual apresentada pelo fornecedor.",
          "A necessidade de prorrogação forçada do contrato sem reajuste.",
        ],
        correct: 0,
        explanation: "De acordo com a Súmula 331 do TST, a omissão culposa da Administração na fiscalização das obrigações trabalhistas e previdenciárias gera responsabilidade subsidiária pelos débitos.",
      },
      {
        id: 3,
        question: "Caso o contratado atrase na entrega de certidão negativa de regularidade tributária no curso da execução do contrato, a conduta adequada da estatal é:",
        options: [
          "efetuar o pagamento do mês normalmente e aplicar uma multa verbal.",
          "reter de forma cautelar os pagamentos mensais até a devida regularização das certidões.",
          "descontar unilateralmente 50% do valor da fatura sem processo de contraditório.",
          "conceder novo prazo sem reter faturas vigentes.",
        ],
        correct: 1,
        explanation: "A retenção cautelar do pagamento de faturas é medida legal amparada pela jurisprudência e pelo edital de licitação para forçar o fornecedor a manter sua regularidade fiscal e trabalhista, protegendo a estatal de responsabilidades futuras.",
      },
    ],
  },
};

function toQQ(
  quiz: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] } | undefined,
): QuizQuestion[] {
  if (!quiz) return [];
  return quiz.questions.map((q) => ({
    id: q.id,
    pergunta: q.question,
    opcoes: q.options.map((o) => ({ label: o, valor: o })),
    correta: q.options[q.correct] ?? "",
    explicacao: q.explanation,
  }));
}

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Gestão x Fiscalização" },
  { id: "modulo-2", label: "Módulo 2", title: "Regularidade e Certidões" },
] as const;

export default function AulaGestaoContratos(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_contratos_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  const handleQuizComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));
      const progress = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      props.onUpdateProgress?.(progress);
      if (moduleId === "modulo-2") {
        props.onComplete?.();
      }
    }
  };

  const getModuleVariant = (num: number) => {
    const variants = ["cyan", "emerald", "amber", "rose", "blue"] as const;
    return variants[(num - 1) % variants.length];
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Gestão x Fiscalização"
        descricao="Entenda os papéis e a importância do controle na execução de contratos."
        variant={getModuleVariant(1)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="A Importância do Acompanhamento Contratual"
          description="A assinatura do contrato é apenas o começo da relação entre Administração e fornecedor."
          variant={getModuleVariant(1)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            A gestão e fiscalização de contratos no âmbito da Administração Pública (e empresas estatais como a Petrobras) é uma atividade estratégica essencial para garantir a legalidade, eficiência e economicidade. Um contrato bem gerido evita desperdícios, previne fraudes e garante a qualidade do serviço.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Diferença entre Gestão e Fiscalização</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">📋 Gestor do Contrato</h4>
              <p className="text-base text-muted-foreground">
                Responsável pelo acompanhamento <strong>administrativo</strong>. Cuida de prazos, vigência, saldos, formalização de aditivos, interlocução oficial com a empresa e aplicação de penalidades.
              </p>
            </div>
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">🔍 Fiscal do Contrato</h4>
              <p className="text-base text-muted-foreground">
                Atribuição <strong>técnica e operacional</strong>. Verifica <em>in loco</em> se a execução está de acordo com as especificações. É quem atesta as notas fiscais e avalia a qualidade da entrega.
              </p>
            </div>
          </div>

          <AlertBox tipo="info" titulo="Pegadinha de Prova">
            Na prática de muitas empresas, as duas funções (gestor e fiscal) podem recair sobre a mesma pessoa, mas <strong>conceitualmente</strong>, a prova da CESGRANRIO gosta de separar a parte macro/administrativa (Gestão) da verificação micro/técnica in loco (Fiscalização).
          </AlertBox>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Controle de Notas Fiscais</h3>
          <p>
            A nota fiscal é o documento que desencadeia a fase de <strong>Liquidação da Despesa</strong> (Lei 4.320/64). O controle dessas notas previne fraudes e pagamentos indevidos.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Verificação:</strong> Checar valores, quantidades e especificações técnicas.</li>
            <li><strong>Atesto:</strong> O fiscal assina atestando que o serviço foi prestado ou o bem entregue satisfatoriamente.</li>
            <li><strong>Retenções:</strong> Verificar impostos destacados (ISS, IRRF, INSS, PIS/COFINS).</li>
            <li><strong>Saldo:</strong> Abater o valor pago do saldo global do contrato.</li>
          </ul>

          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">
              💡 Resumo de Ouro — Módulo 1
            </span>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Gestão:</strong> Foco administrativo, prazos e saldo.</li>
              <li>✓ <strong>Fiscalização:</strong> Foco técnico, acompanhamento <em>in loco</em>.</li>
              <li>✓ <strong>Notas Fiscais:</strong> Sem atesto do fiscal certificando a entrega, não há pagamento (liquidação).</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        sinteseEstrategica={{
          title: "Acompanhar para não Errar",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">📝 👁️</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                O papel do fiscal é os &quot;olhos&quot; da Administração Pública. Sua assinatura em uma nota fiscal é uma declaração legal de que o recurso público está sendo bem aplicado.
              </p>
            </>
          ),
        }}
      podcast={{
            aulaId: "gestaocontratos",
            aulaTitulo: "Gestao Contratos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={1}
          variant={getModuleVariant(1)}
          title="Análise C.E.D.E."
          description="Gestão vs Fiscalização"
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Conceituação",
              icone: <LuFileCheck />,
              conteudo: (
                <div className="space-y-4">
                  <p>A <strong>Gestão</strong> trata dos trâmites (revisões, prorrogações, saldo financeiro). A <strong>Fiscalização</strong> é a verificação da fiel execução do objeto no campo.</p>
                </div>
              ),
            },
            {
              titulo: "Obrigatoriedade do Atesto",
              icone: <LuShieldCheck />,
              conteudo: (
                <div className="space-y-4">
                  <p>É vedado o pagamento antecipado (regra geral) na Administração Pública. A liquidação da despesa depende impreterivelmente do <strong>atesto</strong> na Nota Fiscal pelo fiscal do contrato.</p>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — Gestão de Contratos",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A banca CESGRANRIO aborda a gestão sob a ótica dos controles internos e responsabilidade legal. <strong>Tópicos mais cobrados (Frequência Alta):</strong>
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      🥇 O Preposto da Contratada
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      A contratada é <strong>obrigada</strong> a manter preposto no local da obra/serviço para representá-la (Art. 74 da Lei 13.303/16). O fiscal comunica-se com o preposto — jamais com os funcionários diretamente — para evitar vínculo empregatício.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">
                      🥈 Reequilíbrio Econômico-Financeiro
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Direito do contratado quando <strong>fatos imprevisíveis ou de consequências incalculáveis</strong> alteram a equação original do contrato.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-lg text-foreground/85 leading-relaxed">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border">
                        <strong>Reajuste</strong><br/>Periódico, previsto em cláusula (índice oficial)
                      </div>
                      <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded border">
                        <strong>Revisão</strong><br/>Provocada por ato da Administração que altera o objeto
                      </div>
                      <div className="p-2 bg-rose-50 dark:bg-rose-950/30 rounded border">
                        <strong>Reequilíbrio</strong><br/>Fato externo imprevisível que rompe a equação
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border font-mono text-xl text-foreground/85 leading-relaxed">
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">🧠 Macete de Código:</p>
                    <p className="text-gray-600 dark:text-gray-400">PREPOSTO = voz da contratada (não é empregado da estatal)</p>
                    <p className="text-gray-600 dark:text-gray-400">FISCAL = olhos da Administração (atesta a NF)</p>
                    <p className="text-gray-600 dark:text-gray-400">REEQUILÍBRIO = evento imprevisível externo → restaura equação</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <QuizInterativo
        titulo="Gestão e Fiscalização"
        numero={1}
        variant={getModuleVariant(1)}
        questoes={toQQ(QUIZ_CONTRATOS["modulo-1"])}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={2}
        titulo="Regularidade e Certidões"
        descricao="Verificação de obrigações tributárias, trabalhistas e riscos."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Mitigando Riscos Trabalhistas e Fiscais"
          description="A Administração Pública pode ser responsabilizada pelos calotes do fornecedor."
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <h3 className="text-2xl font-bold text-foreground mb-4">A Súmula 331 do TST e a Responsabilidade Subsidiária</h3>
          <p>
            Um dos maiores riscos em contratos de <strong>cessão de mão de obra</strong> (como limpeza, vigilância, manutenção terceirizada) é a inadimplência da empresa contratada com seus próprios funcionários ou com o Fisco.
          </p>
          <p>
            Segundo a <strong>Súmula 331 do TST</strong>, a Administração Pública tem responsabilidade <em>subsidiária</em> pelos débitos trabalhistas caso fique comprovada sua <strong>omissão culposa</strong> na fiscalização das obrigações do contrato (culpa <em>in vigilando</em>).
          </p>
          <AlertBox tipo="warning" titulo="Omissão do Fiscal">
            Se o fiscal atesta faturas de uma empresa terceirizada sem exigir o comprovante de pagamento do FGTS e INSS dos funcionários, e a empresa vai à falência, o Estado (e a Petrobras) terá que pagar essas dívidas, e o fiscal pode responder por improbidade e dano ao erário.
          </AlertBox>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Certidões Negativas de Débito (CNDs)</h3>
          <p>
            Para comprovar a regularidade fiscal e trabalhista, a empresa deve apresentar periodicamente:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Certidão Conjunta Federal:</strong> Receita e Dívida Ativa da União.</li>
            <li><strong>CRF do FGTS:</strong> Regularidade do Fundo de Garantia.</li>
            <li><strong>CNDT:</strong> Certidão Negativa de Débitos Trabalhistas (fundamental!).</li>
            <li><strong>Certidões Estaduais/Municipais:</strong> Conforme o escopo do contrato.</li>
          </ul>

          <p className="mt-4 font-semibold text-rose-600 dark:text-rose-400">
            Regra de Ouro: A exigência de regularidade fiscal NÃO se restringe à fase de licitação. Deve ser mantida durante TODA a execução contratual.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Responsabilidades Pessoais</h3>
          <p>
            Omissões na fiscalização geram punições severas para o agente público encarregado:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-muted border border-border rounded-lg text-xl text-foreground/85 leading-relaxed">
              <strong className="text-foreground block mb-1">Administrativa</strong>
              Advertência, suspensão ou demissão por negligência.
            </div>
            <div className="p-4 bg-muted border border-border rounded-lg text-xl text-foreground/85 leading-relaxed">
              <strong className="text-foreground block mb-1">Civil (Ressarcimento)</strong>
              Ter que pagar do próprio bolso o prejuízo causado ao Estado.
            </div>
            <div className="p-4 bg-muted border border-border rounded-lg text-xl text-foreground/85 leading-relaxed">
              <strong className="text-foreground block mb-1">Improbidade</strong>
              Multas pesadas e perda de função se houver dolo ou culpa grave.
            </div>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        sinteseEstrategica={{
          title: "O Custo da Omissão",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">⚖️ 📉</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                Fiscalizar tributos e CNDs não é burocracia inútil. É o escudo de proteção da empresa estatal contra processos bilionários na Justiça do Trabalho.
              </p>
            </>
          ),
        }}
      podcast={{
            aulaId: "gestaocontratos",
            aulaTitulo: "Gestao Contratos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={2}
          variant={getModuleVariant(2)}
          title="Análise C.E.D.E."
          description="Tributos e Súmula 331"
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Dicas: Pagamentos Condicionados",
              icone: <LuShieldAlert />,
              conteudo: (
                <div className="space-y-4">
                  <p>A prática padrão é <strong>reter ou suspender</strong> a liberação do pagamento da fatura mensal caso a empresa contratada não apresente as certidões e comprovantes do FGTS/INSS regularizados daquele mês.</p>
                </div>
              ),
            },
            {
              titulo: "Exceções: Regularização Tardia",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p>Caso a empresa atrase a certidão, a Administração retém o pagamento. Assim que a certidão for regularizada, o pagamento é liberado retroativamente, pois o serviço já foi prestado (evitando enriquecimento ilícito do Estado).</p>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — Risco de Omissão e Sanções",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A banca cobra tanto a responsabilidade subsidiária (Súmula 331) quanto as sanções administrativas por inadimplência contratual:
                  </p>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">
                      Culpa In Vigilando (Súmula 331 TST)
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      A responsabilidade da administração pelas dívidas trabalhistas da empresa contratada não é automática, mas decorre da comprovação de <strong>culpa in vigilando</strong> (falha na fiscalização de guias de INSS e FGTS).
                    </p>
                  </div>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-rose-700 dark:text-rose-300">
                      Sanções CAASE — Petrobras (RLCP)
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="text-lg text-foreground/85 leading-relaxed w-full">
                        <thead>
                          <tr className="bg-rose-100 dark:bg-rose-950/40">
                            <th className="p-2 text-left">Sanção</th>
                            <th className="p-2 text-left">Prazo Máx.</th>
                            <th className="p-2 text-left">Circunstância</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                          <tr className="border-b"><td className="p-2">Advertência</td><td className="p-2">Imediato</td><td className="p-2">Sem dano grave</td></tr>
                          <tr className="border-b"><td className="p-2">Susp. Branda</td><td className="p-2">1–6 meses</td><td className="p-2">Reincidência de advertência em 2 anos</td></tr>
                          <tr className="border-b"><td className="p-2">Susp. Média</td><td className="p-2">7–12 meses</td><td className="p-2">Dano médio à imagem/instalações</td></tr>
                          <tr><td className="p-2">Susp. Grave</td><td className="p-2">13–24 meses</td><td className="p-2">Fraude na licitação; recusa de assinar contrato</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border font-mono text-xl text-foreground/85 leading-relaxed">
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">🧠 Macete de Código:</p>
                    <p className="text-gray-600 dark:text-gray-400">CNDT + CRF-FGTS + Certidão Federal → exigir MENSALMENTE antes do pagamento</p>
                    <p className="text-gray-600 dark:text-gray-400">FRAUDE NA LICITAÇÃO → suspensão GRAVE (13 a 24 meses)</p>
                    <p className="text-gray-600 dark:text-gray-400">OMISSÃO DO FISCAL → responsabilidade subsidiária da estatal</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <QuizInterativo
          titulo="Regularidade e Certidões"
          numero={2}
          variant={getModuleVariant(2)}
          questoes={toQQ(QUIZ_CONTRATOS["modulo-2"])}
          onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
        />
      </div>
    </div>
  );

  return (
    <AulaTemplate
      {...props}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la.">
      <TabsContent value="modulo-1" className="mt-0">
        {renderModulo1()}
      </TabsContent>
      <TabsContent value="modulo-2" className="mt-0">
        {renderModulo2()}
      </TabsContent>
    </AulaTemplate>
  );
}
