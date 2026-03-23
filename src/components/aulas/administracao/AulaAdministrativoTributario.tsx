"use client";

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  LuBookOpen,
  LuCalculator,
  LuFileText,
  LuTrendingUp,
} from "react-icons/lu";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Contabilidade Básica" },
  { id: "modulo-2", label: "Módulo 2", title: "Estrutura Contábil" },
  { id: "modulo-3", label: "Módulo 3", title: "Tributos: Conceitos" },
  { id: "modulo-4", label: "Módulo 4", title: "ICMS e IPI" },
  { id: "modulo-5", label: "Módulo 5", title: "Impostos de Renda" },
  { id: "modulo-6", label: "Módulo 6", title: "Contribuições Sociais" },
  { id: "modulo-7", label: "Módulo 7", title: "Administração Tributária" },
  { id: "modulo-8", label: "Módulo 8", title: "Planejamento Tributário" },
  { id: "modulo-9", label: "Módulo 9", title: "Tributos na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaAdministrativoTributario(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => {
        const newSet = new Set([...prev, moduleId]);
        const progress = Math.round((newSet.size / MODULE_DEFS.length) * 100);
        props.onUpdateProgress?.(progress);
        return newSet;
      });
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Administrativo e Tributário"
      descricao="Contabilidade básica, direito tributário e administração tributária para Técnico de Suprimento."
      duracao="3h 30min"
      materiaNome="Administração"
      materiaCor="indigo"
      materiaId="administracao"
      isCompleted={completedModules.has("modulo-10")}
      currentProgress={Math.round((completedModules.size / MODULE_DEFS.length) * 100)}
      onComplete={() => props.onUpdateProgress?.(100)}
    >
      {/* MÓDULO 1: Contabilidade Básica */}
      <TabsContent value="modulo-1" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Contabilidade Básica"
          descricao="Fundamentos: equação contábil, demonstrações financeiras, conceitos essenciais."
          variant={getModuleVariant(1)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Princípios Fundamentais da Contabilidade"
            description="Equação contábil, demonstrações financeiras, papel na empresa."
            variant={getModuleVariant(1)}
          />

          <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
            <p>
              <strong>Contabilidade</strong> é a ciência que registra, analisa e reporta transações financeiras de uma empresa. Na Petrobras, Contabilidade é crítica: registra todos os gastos (milhões diários),
              mostra saúde financeira, permite decisões estratégicas. A <strong>Equação Fundamental da Contabilidade</strong> é: <strong>Ativos = Passivos + Patrimônio Líquido</strong>. Ativos são o que
              empresa POSSUI (caixa, máquinas, prédios); Passivos é o que DEVE (empréstimos, contas a pagar); Patrimônio Líquido é o valor residual (quanto donos têm direito).
            </p>
            <p>
              Toda transação contábil mantém essa equação em equilíbrio. Exemplo: Petrobras paga R$ 1 milhão por equipamento com dinheiro. Ativos aumentam (equipamento +1M), caixa diminui (-1M) → Ativos continuam iguais.
              Essa consistência é essência da Contabilidade. Se equação desbalanceia, há erro de registro.
            </p>
            <p>
              Existem <strong>três demonstrações financeiras principais</strong>: (1) <strong>Balanço Patrimonial (BP)</strong> — mostra Ativos, Passivos, PL em data específica ("foto" da empresa);
              (2) <strong>Demonstração de Resultado (DRE)</strong> — mostra receitas, custos, lucro em período (ano/trimestre); (3) <strong>Fluxo de Caixa</strong> — mostra entradas/saídas dinheiro.
              Investidores leem essas três para entender empresa.
            </p>
            <p>
              Na Petrobras, Contabilidade alimenta decisões críticas: "Conseguimos pagar dividendos este ano?" (vê se há caixa); "Podemos fazer novo investimento em E&P?" (vê se há capital); "Qual division é mais
              lucrativa?" (compara DRE por divisão). Sem Contabilidade clara, gestores operam no escuro.
            </p>
            <p>
              Neste módulo, você aprenderá equação contábil, estrutura de BP/DRE/Fluxo, conceitos básicos (débito/crédito), e como Petrobras divulga resultados ao mercado. Essencial para qualquer cargo administrativo.
            </p>

            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-2">📊 Fundamentos</p>
              <ul className="text-sm space-y-1 text-foreground">
                <li>✓ <strong>Equação:</strong> Ativos = Passivos + Patrimônio Líquido</li>
                <li>✓ <strong>Balanço Patrimonial:</strong> Foto estática em data</li>
                <li>✓ <strong>DRE:</strong> Receita - Custos = Lucro (período)</li>
                <li>✓ <strong>Fluxo Caixa:</strong> Entradas/Saídas dinheiro</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={1} title="Conteúdo Principal" variant={getModuleVariant(1)} />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação",
                icone: <LuBookOpen />,
                conteudo: (
                  <p>Contabilidade registra e analisa transações. Equação Fundamental: Ativos = Passivos + PL. Mantém-se sempre equilibrada.</p>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuCalculator />,
                conteudo: (
                  <p>Petrobras compra máquina por R$ 5M com dinheiro. Ativos: máquina +5M, caixa -5M. Total Ativos = Ativos. Equação mantém equilíbrio.</p>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <p>Sempre verifique se BP está balanceado (Ativos = Passivos + PL). Se desbalancear, há erro. DRE e Fluxo Caixa complementam BP.</p>
                ),
              },
              {
                titulo: "Exceções",
                icone: <LuFileText />,
                conteudo: (
                  <p>Há ajustes contábeis (depreciação, provisões) que não afetam caixa. Por isso DRE ≠ Fluxo Caixa. Entender diferença é crítico.</p>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={1}
          variant={getModuleVariant(1)}
          video={{
            videoId: "h3S9XW1WzIk",
            title: "Fundamentos Contábeis",
            duration: "10:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Contabilidade Básica",
            materia: "Administração",
            images: [
              { title: "Equação Contábil", type: "Fórmula", placeholderColor: "bg-indigo-500/20" },
              { title: "Balanço Patrimonial", type: "Estrutura", placeholderColor: "bg-indigo-500/20" },
            ],
          }}
          maceteVisual={{
            title: "Regra de Ouro",
            content: (
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  Ativos = Passivos + PL (SEMPRE!)
                </p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            titulo: "Áudio: Equação Contábil",
            artista: "Prof. Contabilidade",
          }}
        />

        <QuizInterativo
          questoes={[
            {
              id: "m1q1",
              pergunta: "Qual é a equação fundamental da contabilidade?",
              opcoes: [
                { label: "Ativos = Passivos + PL", valor: "a" },
                { label: "Receita - Custos = Lucro", valor: "b" },
                { label: "Caixa = Fluxo de Caixa", valor: "c" },
                { label: "Nenhuma das anteriores", valor: "d" },
              ],
              correta: "a",
              explicacao: "A equação Ativos = Passivos + Patrimônio Líquido é o princípio fundamental de toda contabilidade.",
            },
          ]}
          titulo="QUIZ: Contabilidade Básica"
          numero={1}
          variant={getModuleVariant(1)}
          icone="📊"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* MÓDULO 2: Estrutura Contábil */}
      <TabsContent value="modulo-2" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={2}
          titulo="Estrutura Contábil"
          descricao="Partidas dobradas, plano de contas, T-accounts — mecanismo de registro."
          variant={getModuleVariant(2)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Sistema de Partidas Dobradas"
            description="Como transações são registradas: débito e crédito, equilíbrio, plano de contas."
            variant={getModuleVariant(2)}
          />

          <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
            <p>
              O sistema de <strong>Partidas Dobradas</strong> (ou Double-Entry) é a base técnica da contabilidade moderna. Princípio: <strong>toda transação afeta DOIS contos</strong> mantendo a equação balanceada.
              Exemplo: Petrobras paga salário. Conta de Despesa de Pessoal aumenta (débito), Caixa diminui (crédito). Partida = Débito + Crédito de valores iguais.
            </p>
            <p>
              <strong>Débito vs Crédito:</strong> Não são "bom/ruim" — são DIREÇÕES. Para contos de Ativo: Débito = aumenta, Crédito = diminui. Para contos de Passivo: Crédito = aumenta, Débito = diminui.
              Para Despesa: Débito = aumenta. Para Receita: Crédito = aumenta. Memorizando: Ativos vão para ESQUERDA (débito), Passivos/Receita vão para DIREITA (crédito).
            </p>
            <p>
              O <strong>Plano de Contas (CoA)</strong> é lista estruturada de todas as contas que empresa usa. Petrobras tem milhares: Caixa (1001), Contas a Receber (1010), Máquinas (1020), Contas a Pagar (2001),
              Empréstimos (2010), Capital Social (3001), Receita de Vendas (4001), Despesa de Pessoal (5001), etc. Cada transação deve ser registrada em conta específica do CoA.
            </p>
            <p>
              Visualmente, usa-se <strong>T-Accounts</strong> — representação em forma de T mostrando débitos à esquerda, créditos à direita. Útil para rastrear saldo final de conta específica. Exemplo: T-Account de
              Caixa começa com saldo X, depois débito de Y (entrada), crédito de Z (saída) → saldo final é X+Y-Z.
            </p>
            <p>
              Neste módulo, você aprenderá regras de débito/crédito por tipo de conta, estrutura do plano de contas Petrobras, como usar T-Accounts, e como toda transação mantém equação balanceada. Essencial para
              entender fluxo de informação contábil.
            </p>

            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-2">📝 Regras Débito/Crédito</p>
              <ul className="text-sm space-y-1 text-foreground">
                <li>✓ <strong>Ativos:</strong> Débito = aumenta; Crédito = diminui</li>
                <li>✓ <strong>Passivos:</strong> Débito = diminui; Crédito = aumenta</li>
                <li>✓ <strong>Despesa:</strong> Débito = aumenta (reduz PL)</li>
                <li>✓ <strong>Receita:</strong> Crédito = aumenta (aumenta PL)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="Conteúdo Principal" variant={getModuleVariant(2)} />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação",
                icone: <LuBookOpen />,
                conteudo: (
                  <p>Partidas dobradas: toda transação = débito + crédito (valores iguais). Mantém equação sempre balanceada.</p>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuCalculator />,
                conteudo: (
                  <p>Petrobras recebe R$ 1M de cliente. Débito: Caixa +1M. Crédito: Receita +1M. Ativo aumenta (débito), Receita registrada (crédito). Balanceado.</p>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <p>Memorize: Ativos ESQUERDA (débito), Passivos DIREITA (crédito). Use T-Accounts para visualizar saldo. Total débitos = Total créditos.</p>
                ),
              },
              {
                titulo: "Exceções",
                icone: <LuFileText />,
                conteudo: (
                  <p>Alguns registros (ajustes de depreciação) não afetam caixa mas são necessários. Contadores precisam entender por quê.</p>
                ),
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant={getModuleVariant(2)}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Partidas Dobradas",
            duration: "9:15",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Estrutura Contábil",
            materia: "Administração",
            images: [
              { title: "T-Account", type: "Estrutura", placeholderColor: "bg-emerald-500/20" },
              { title: "Débito e Crédito", type: "Regras", placeholderColor: "bg-emerald-500/20" },
            ],
          }}
          maceteVisual={{
            title: "Regra T-Account",
            content: (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  Débito Esquerda | Crédito Direita (Ativos)
                </p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            titulo: "Áudio: Débito e Crédito",
            artista: "Prof. Contabilidade",
          }}
        />

        <QuizInterativo
          questoes={[
            {
              id: "m2q1",
              pergunta: "Em uma conta de Ativo, débito significa:",
              opcoes: [
                { label: "Aumenta o saldo", valor: "a" },
                { label: "Diminui o saldo", valor: "b" },
                { label: "Não afeta o saldo", valor: "c" },
                { label: "Anula o saldo", valor: "d" },
              ],
              correta: "a",
              explicacao: "Em contos de Ativo, débito sempre aumenta o saldo. Crédito diminui.",
            },
          ]}
          titulo="QUIZ: Estrutura Contábil"
          numero={2}
          variant={getModuleVariant(2)}
          icone="📊"
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* MÓDULOS 3-10: Placeholder com estrutura */}
      {MODULE_DEFS.slice(2).map((mod, idx) => (
        <TabsContent key={mod.id} value={mod.id} className="space-y-12 mt-0 outline-none">
          <ModuleBanner
            numero={idx + 3}
            titulo={mod.title}
            descricao={`Módulo ${idx + 3}: ${mod.title}`}
            variant={getModuleVariant(idx + 3)}
          />

          <AlertBox tipo="info" titulo="Em Desenvolvimento">
            <p className="text-sm">
              Este módulo será expandido em breve com conteúdo completo premium (10 módulos).
              Estrutura está pronta para integração.
            </p>
          </AlertBox>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
