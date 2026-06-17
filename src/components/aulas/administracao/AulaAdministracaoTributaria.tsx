"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

/**
 * AulaAdministracaoTributaria
 *
 * Técnico de Suprimento de Bens e Serviços - Administração (Nível Técnico/Médio)
 * Bloco III - Tributos
 *
 * 10 módulos premium com padrão C.E.D.E.:
 * - Resumo (ModuleConsolidation)
 * - Explicação (ContentAccordion)
 * - Exemplos (CardCarousel com casos Petrobras)
 * - Prática (QuizInterativo)
 */

import { useState, useEffect } from "react";
import { AulaProps, QuizQuestion,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
} from "../shared";
import { TabsContent } from "@/components/ui/tabs";
import { ADMINISTRACAO_TRIBUTARIA_QUIZZES } from "@/data/quizzes/administracao-tributaria-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

function toQQ(quiz: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] } | undefined): QuizQuestion[] {
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
  { id: "modulo-1", label: "Módulo 1", title: "Administração Tributária: Conceitos" },
  { id: "modulo-2", label: "Módulo 2", title: "Órgãos Arrecadadores" },
  { id: "modulo-3", label: "Módulo 3", title: "Registros e Documentos Fiscais" },
  { id: "modulo-4", label: "Módulo 4", title: "Declarações Tributárias" },
  { id: "modulo-5", label: "Módulo 5", title: "Prazos e Obrigações Acessórias" },
  { id: "modulo-6", label: "Módulo 6", title: "Gestão de Impostos" },
  { id: "modulo-7", label: "Módulo 7", title: "Controle de Créditos Tributários" },
  { id: "modulo-8", label: "Módulo 8", title: "Sistemas de Informação Tributária" },
  { id: "modulo-9", label: "Módulo 9", title: "Administração Tributária em Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

export default function AulaAdministracaoTributaria(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_administracao_tributaria_";

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
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const progress = Math.round(
        (nextCompleted.size / (MODULE_DEFS.length - 1)) * 100
      );
      props.onUpdateProgress?.(progress);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={1} titulo="Administração Tributária: Conceitos" descricao="Disciplina que estuda gestão de tributos na empresa" variant={getModuleVariant(1)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Administração Tributária: Conceitos"
          description="Disciplina que estuda gestão de tributos na empresa"
          variant={getModuleVariant(1)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Administração Tributária</strong> é a disciplina que estuda como as empresas gerenciam suas obrigações tributárias de forma eficiente, legal e estratégica. Na Petrobras, essa gestão é particularmente complexa devido ao volume de operações em múltiplas jurisdições (federal, estadual, municipal) e à diversidade de tributos incidentes. A administração tributária envolve planejamento estruturado, documentação rigorosa, cumprimento de prazos e otimização de custos tributários sem incorrer em riscos legais.</p>
            <p>CESGRANRIO exige o entendimento dos conceitos fundamentais da administração tributária. A atividade administrativa de cobrança e fiscalização é vinculada e obrigatória.</p>
            <p>O <strong>objetivo central</strong> da administração tributária é triplo: (1) <strong>Conformidade Legal</strong> — cumprir integralmente as obrigações perante o fisco; (2) <strong>Otimização de Custos</strong> — estruturar operações para reduzir legalmente a carga tributária; (3) <strong>Segurança Jurídica</strong> — manter documentação e registros que suportem as operações em caso de fiscalização. Uma má administração tributária resulta em multas significativas, juros de mora, reputação prejudicada e até responsabilidade criminal dos gestores (Lei 8.137/90).</p>
            <p>A administração tributária compreende a fiscalização, arrecadação, controle e execução dos créditos tributários constituídos pelo lançamento fiscal.</p>
            <p>A <strong>gestão de tributos envolve múltiplos atores</strong>: o Departamento Fiscal registra operações e prepara declarações; o Analista Tributário planeja estruturas e monitora exposição fiscal; o Contador presta apoio técnico; a Diretoria é responsável final perante o governo. Em grandes empresas como Petrobras, existe departamento tributário dedicado com especialistas em ICMS, IR, PIS, COFINS e outras especialidades. Cada uma dessas áreas requer expertise específica: o especialista em ICMS conhece créditos, débitos, apuração por estado; o especialista em IR domina estimativas, bases de cálculo, conformidade.</p>
            <p>Como demonstração prática, a constituição do crédito tributário opera-se pelo lançamento administrativo efetuado pelo auditor fiscal de forma formal.</p>
            <p>Os <strong>benefícios de uma boa administração tributária</strong> são imensuráveis: evita multas e juros (economia de centenas de milhões por ano em grandes empresas); melhora a liquidez ao planejar fluxo de caixa de tributos; reduz riscos legais e de fiscalização; permite planejamento estratégico (qual estrutura de negócio é mais eficiente?); melhora relacionamento com fisco e credibilidade junto a investidores e credores. Empresas com conformidade tributária excelente conseguem melhores condições de financiamento e mais confiança do mercado.</p>
            <p>As certidões de dívida ativa (CDA) constituem títulos executivos extrajudiciais que amparam a cobrança judicial promovida pela procuradoria fazendária.</p>
            <p>Neste módulo, você entenderá os conceitos fundamentais de administração tributária: quais são os desafios, qual é o escopo, quem são os responsáveis, como a gestão tributária impacta a estratégia empresarial. Esses conceitos são a base para todos os módulos subsequentes que explorarão órgãos arrecadadores, documentos, declarações, prazos e sistemas específicos. Dominar administração tributária é essencial para qualquer profissional que trabalhe em departamentos administrativos, financeiros ou de suprimentos da Petrobras.</p>
            <p>A Petrobras gerencia processos administrativos fiscais através de equipe especializada para responder tempestivamente a intimações da Receita Federal.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">🎯 Conceitos-Chave</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>Administração Tributária:</strong> Gestão sistemática de obrigações tributárias</li>
              <li>✓ <strong>Conformidade:</strong> Cumprir 100% exigências legais e prazos</li>
              <li>✓ <strong>Otimização:</strong> Reduzir custos tributários via estruturação legal</li>
              <li>✓ <strong>Segurança Jurídica:</strong> Documentação e registros que sustentam posição fiscal</li>
              <li>✓ <strong>Múltiplas Jurisdições:</strong> Federal (RFB), Estadual (SEFAZ), Municipal (Prefeitura)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Durante procedimento fiscal regular na Petrobras, o auditor da Receita Federal do Brasil (RFB) intima o representante legal a apresentar os livros comerciais e fiscais da empresa. O representante recusa-se ao fornecimento sob a alegação de cláusula de sigilo contratual privada celebrada com parceiros comerciais. Nos termos do Código Tributário Nacional (CTN), a conduta do representante é:"
          alternativas={[
              { letra: "A", texto: "legítima, pois o sigilo comercial privado se sobrepõe ao interesse arrecadatório estatal.", correta: false },
              { letra: "B", texto: "ilegítima, pois a fiscalização dos livros comerciais pela autoridade tributária não está sujeita a limitações constantes de leis ou contratos privados.", correta: true },
              { letra: "C", texto: "legítima, desde que haja parecer prévio do conselho fiscal da sociedade anônima.", correta: false },
              { letra: "D", texto: "ilegítima, dependendo, contudo, de mandado de busca judicial para prosseguimento do exame.", correta: false },
              { letra: "E", texto: "legítima, cabendo à Receita Federal requerer as informações diretamente aos parceiros internacionais.", correta: false }
            ]}
          dicaEstrategica="195 do CTN, para efeitos da legislação tributária, não têm aplicação quaisquer disposições legais limitativas do direito de examinar livros, arquivos, papéis e efeitos comerciais dos comerciantes ou industriais."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Conforme o Art." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Administração Tributária: Conceitos", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Conceitos Fundamentais", type: "Conceito", placeholderColor: "bg-emerald-500/20" },
            { title: "Órgãos e Jurisdições", type: "Estrutura", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Tripé da Administração Tributária",
          content: <div className="text-lg space-y-2"><p><strong>1. Conformidade:</strong> Cumprir prazos e obrigações</p><p><strong>2. Otimização:</strong> Reduzir custos legalmente</p><p><strong>3. Segurança:</strong> Documentação robusta</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Administração Tributária", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "O que é Administração Tributária?", icone: "📚", conteudo: "Disciplina de gestão que estuda como a empresa administra suas obrigações tributárias. Envolve planejamento, registro, cumprimento de prazos, controle de créditos, e conformidade." },
          { titulo: "Desafios Principais", icone: "⚠️", conteudo: "Múltiplos tributos (IR, ICMS, ISS, IPI, PIS, COFINS, INSS, FGTS). Múltiplas jurisdições. Prazos diferentes. Mudanças frequentes na legislação." },
          { titulo: "Papéis e Responsabilidades", icone: "👥", conteudo: "Gerente Tributário: planeja e monitora. Contador: registra e declara. Departamento Fiscal: cumpre obrigações. CEO/Diretor: responsável final." },
          { titulo: "Benefícios da Boa Gestão", icone: "✅", conteudo: "Evita multas e juros. Melhora liquidez. Reduz riscos legais. Permite planejamento estratégico. Melhora reputação." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Planejamento Anual", descricao: "Empresa elabora calendário de obrigações tributárias: IR (mês 4), ICMS (mensal), ISS (conforme município). Evita atrasos." },
          { title: "Risco de Não-Conformidade", descricao: "Empresa não documenta ISS retido. Prefeitura cobra multa + juros. Impacto: R$ 50 mil em multa (poderia ser evitado)." },
          { title: "Otimização Bem Executada", descricao: "Empresa identifica crédito de ICMS não aproveitado. Resgata R$ 100 mil em compensação. Melhora liquidez." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-1"])}
        titulo="Quiz: Administração Tributária - Conceitos"
        numero={1}
        variant={getModuleVariant(1)}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={2} titulo="Órgãos Arrecadadores" descricao="Receita Federal, SEFAZ estadual, prefeituras e INSS/FGTS" variant={getModuleVariant(2)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Órgãos Arrecadadores"
          description="Receita Federal, SEFAZ estadual, prefeituras e INSS/FGTS"
          variant={getModuleVariant(2)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Receita Federal do Brasil (RFB)</strong> é o órgão federal responsável pela arrecadação, fiscalização e cobrança de tributos federais. Subordinada ao Ministério da Fazenda, a RFB arrecada Imposto de Renda (IR), Imposto sobre Produtos Industrializados (IPI), Contribuição Social sobre o Lucro Líquido (CSLL), PIS (Programa de Integração Social), COFINS (Contribuição para Financiamento da Seguridade Social) e outros tributos federais. A RFB também processa declarações eletrônicas (DIPJ, ECF, ECD) e realiza fiscalização em larga escala. Para a Petrobras, a RFB é interlocutor crítico: recolhimentos mensais de IR, PIS, COFINS; conformidade em declarações anuais; monitoramento de créditos e compensações.</p>
            <p>A banca cobra o papel e limites de atuação dos órgãos arrecadadores, como a Receita Federal do Brasil (RFB) e as secretarias de fazenda estaduais.</p>
            <p>As <strong>SEFAZ (Secretarias de Fazenda Estaduais)</strong> são órgãos estaduais responsáveis principalmente pela arrecadação do ICMS (Imposto sobre Circulação de Mercadorias e Serviços), o tributo mais importante para os estados. Cada estado tem sua SEFAZ (SEFAZ-SP, SEFAZ-RJ, SEFAZ-MG, etc.) e mantém sistemas de informação como SPED, NF-e (Nota Fiscal Eletrônica) e SIAT (Sistema de Informações Ambientais Integradas). A SEFAZ também realiza fiscalização de ICMS, controla créditos e débitos, e coordena com outras SFAZs em operações interestaduais. Para Petrobras, que opera em vários estados, a relação com cada SEFAZ é essencial: apuração de ICMS por estado, uso de créditos, conformidade estadual.</p>
            <p>Os órgãos arrecadadores possuem poder de polícia administrativa para fiscalizar livros comerciais, intimar prepostos e lacrar estabelecimentos infratores.</p>
            <p>As <strong>Prefeituras Municipais</strong> são responsáveis por tributos municipais, principalmente o ISS (Imposto sobre Serviços de Qualquer Natureza), IPTU (Imposto Predial Territorial Urbano) e taxas municipais diversas. Cada município pode ter legislação específica, prazos diferentes e procedimentos próprios. O ISS é particularmente importante para Petrobras em operações de prestação de serviços: consultorias, manutenção, etc. As prefeituras não têm estrutura de fiscalização tão sofisticada quanto RFB e SFAZs, mas são rígidas em cobranças e multas.</p>
            <p>A repartição de competências impede conflitos ao segmentar as receitas fiscais entre união, estados e municípios conforme a Carta Magna.</p>
            <p>O <strong>INSS (Instituto Nacional de Seguridade Social)</strong> arrecada contribuições previdenciárias e gerencia registros de filiação de contribuintes. As alíquotas de INSS do empregador e empregado são descontadas e recolhidas até o dia 15 do mês seguinte. O FGTS (Fundo de Garantia do Tempo de Serviço) é gerenciado pela Caixa Econômica Federal e também é recolhido regularmente (alíquota 8% do salário). Ambos os órgãos possuem sistemas de informação (CAGED, GPS, conectividade social) onde Petrobras reporta informações de empregados.</p>
            <p>O contencioso administrativo tributário (como CARF) julga em instâncias paritárias as defesas apresentadas contra autuações federais.</p>
            <p>A <strong>coordenação entre órgãos</strong> é fundamental em administração tributária. RFB compartilha informações com SFAZs via SPED; sistemas cruzam dados para validar consistência (receita bruta RFB vs. saídas ICMS); discrepâncias geram questionamentos. Para Petrobras, operar com transparência e consistência entre jurisdições evita múltiplas autuações. A gestão tributária eficiente envolve entender a hierarquia, papéis, sistemas e prazos de cada órgão e estruturar operações para satisfazer todos simultaneamente.</p>
            <p>A Petrobras atua em estreito alinhamento com a Receita Federal, prestando esclarecimentos e fornecendo dados de importação pelo sistema Siscomex.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">🏛️ Órgãos Principais</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>RFB:</strong> Federal — IR, IPI, CSLL, PIS, COFINS</li>
              <li>✓ <strong>SEFAZ:</strong> Estadual — ICMS (tributo estadual mais importante)</li>
              <li>✓ <strong>Prefeitura:</strong> Municipal — ISS, IPTU, taxas</li>
              <li>✓ <strong>INSS:</strong> Contribuições previdenciárias</li>
              <li>✓ <strong>FGTS:</strong> Fundo de Garantia (gerido por Caixa Econômica)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Receita Federal do Brasil (RFB) arrecada principalmente:"
          alternativas={[
              { letra: "A", texto: "ICMS", correta: false },
              { letra: "B", texto: "IR, IPI, COFINS, PIS e outros tributos federais", correta: true },
              { letra: "C", texto: "ISS", correta: false },
              { letra: "D", texto: "IPTU", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "RFB: órgão federal que arrecada tributos federais (IR, IPI, impostos aduaneiros, contribuições sociais federais)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Órgãos Arrecadadores", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 2",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "RFB", type: "Federal", placeholderColor: "bg-emerald-500/20" },
            { title: "SEFAZ/Prefeitura", type: "Estadual/Municipal", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Hierarquia dos Órgãos",
          content: <div className="text-lg space-y-2"><p><strong>Federal:</strong> RFB (IR, COFINS, PIS)</p><p><strong>Estadual:</strong> SEFAZ (ICMS)</p><p><strong>Municipal:</strong> Prefeitura (ISS)</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Órgãos Arrecadadores", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Receita Federal (RFB)", icone: "🏛️", conteudo: "Órgão federal que arrecada IR, IPI, COFINS, PIS. Responsável por fiscalizar e processar declarações eletrônicas." },
          { titulo: "SEFAZ Estadual", icone: "📍", conteudo: "Secretaria de Fazenda estadual - arrecada ICMS. Cada estado tem sua SEFAZ. Mantém sistemas NF-e e SPED." },
          { titulo: "Prefeitura Municipal", icone: "🏢", conteudo: "Arrecada ISS, IPTU, impostos municipais. Legislação varia por município. Fiscalização local." },
          { titulo: "INSS/FGTS", icone: "💼", conteudo: "INSS: Instituto Nacional Seguridade Social. FGTS: gerenciado por Caixa Econômica. Ambos têm sistemas próprios." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Hierarquia Tributária", descricao: "RFB (federal) > SEFAZ (estadual) > Prefeitura (municipal). Cada nível cobra seus tributos. Dados compartilhados via sistemas." },
          { title: "Sistemas de Informação", descricao: "RFB: ECF, DIPJ, ECD online. SEFAZ: SPED, NF-e. INSS: CAGED, GPS. Empresas enviam dados via internet para órgãos." },
          { title: "Documentação Necessária", descricao: "Manter RPA (Recibos de Pagamento), Comprovantes de Recolhimento, Declarações. Órgãos verificam se pagamentos foram feitos corretamente." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-2"])}
        titulo="Quiz: Órgãos Arrecadadores"
        numero={2}
        variant={getModuleVariant(2)}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={3} titulo="Registros e Documentos Fiscais" descricao="Nota Fiscal, RPA, livros fiscais e escrituração contábil digital" variant={getModuleVariant(3)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Registros e Documentos Fiscais"
          description="Nota Fiscal, RPA, livros fiscais e escrituração contábil digital"
          variant={getModuleVariant(3)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Nota Fiscal Eletrônica (NF-e)</strong> é documento obrigatório para circulação de mercadorias no Brasil desde 2006. Emitida eletronicamente por software integrado, a NF-e contém informações: dados do vendedor (CNPJ, inscrição estadual), comprador (CNPJ/CPF), produto (descrição, NCM, quantidade, preço), valor total, tributos (ICMS, IPI, PIS, COFINS) e assinatura digital. A SEFAZ autoriza a nota (2-3 minutos) e gera DANFE (Documento Auxiliar da Nota Fiscal Eletrônica) que acompanha mercadoria. NF-e gera obrigações: registros em livros, pagamento de impostos, conformidade fiscal.</p>
            <p>Questões abordam os registros e livros fiscais obrigatórios, com destaque para a escrituração de notas fiscais de entrada e saída eletrônicas.</p>
            <p>O <strong>Recibo de Pagamento Autônomo (RPA)</strong> é documento para prestação de serviço ocasional por autônomo. Diferente de NF-e, é mais simples: descrição do serviço, valor, alíquota INSS (~11%), ISS (~3%, varia por município). Empresa emite RPA para cada autônomo que presta serviço. Importante para conformidade: RPA deve indicar retenção de ISS (responsabilidade do cliente), INSS (por conta do autônomo). Em Petrobras, muitas contratações pontuais de consultores/técnicos usam RPA.</p>
            <p>Os livros de registro de entradas, saídas, apuração do ICMS e controle de produção e estoque (Registro K) estruturam a fiscalização eletrônica.</p>
            <p>Os <strong>Livros Fiscais Obrigatórios</strong> são registros que documentam operações. Livro de Apuração ICMS: registra diariamente saídas (débitos) e entradas (créditos). Diferença = ICMS a pagar. Livro de Imposto de Renda: registra receitas, custos e despesas (para cálculo de IR). Livro de Entrada de Mercadoria: controla compras. Livro de Saída de Mercadoria: controla vendas. Escrituração Contábil Digital (ECD): transmissão de livros diário e razão à RFB em formato XML. Obrigatória para empresas acima de certo faturamento. Garante rastreabilidade de operações.</p>
            <p>O preenchimento inexato de registros contábeis no SPED enseja autuações por inconsistência patrimonial detectada por cruzamentos automatizados.</p>
            <p>A <strong>Escrituração Contábil Digital (ECD)</strong> é sistema de transmissão de informações contábeis (livro diário e razão) à Receita Federal. Obrigatória para empresas enquadradas em Lucro Real e com receita bruta acima de certos limites. Formato: arquivo XML enviado via certificado digital à RFB até prazo (geralmente 30 de junho). ECD permite rastreabilidade total: cada operação é registrada e pode ser auditada. Discrepâncias entre NF-e/SPED e ECD geram questionamentos fiscais.</p>
            <p>A Nota Fiscal Eletrônica (NF-e) unifica a coleta de dados de circulação física de mercadorias em formato digital XML auditável em tempo real.</p>
            <p>A <strong>importância desses registros</strong> para Petrobras é crítica. Milhões de operações diárias geram documentação em volume colossal. Controle rigoroso (sistemas integrados de ERP) garante: conformidade fiscal (pagar impostos corretos), defesa em fiscalização (documentação robusta), planejamento tributário (dados para análise). Falta de registro ou erros expõem empresa a multas, juros, penalidades criminais. Auditorias internas (compliance) verificam se documentação está completa e consistente.</p>
            <p>Almoxarifados da Petrobras realizam a escrituração automatizada de notas fiscais eletrônicas de materiais integrados diretamente no SAP ERP.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">📄 Documentos Críticos</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>NF-e:</strong> Nota Fiscal Eletrônica (obrigatória, circulação mercadoria)</li>
              <li>✓ <strong>RPA:</strong> Recibo Pagamento Autônomo (serviço ocasional)</li>
              <li>✓ <strong>Livros Fiscais:</strong> Apuração ICMS, IR, entrada/saída</li>
              <li>✓ <strong>ECD:</strong> Escrituração Contábil Digital (transmissão RFB)</li>
              <li>✓ <strong>Retenção:</strong> ISS, IR na fonte (documentação de retenção)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Nota Fiscal Eletrônica (NF-e) é obrigatória para:"
          alternativas={[
              { letra: "A", texto: "Apenas grandes empresas", correta: false },
              { letra: "B", texto: "Circulação de mercadoria (desde 2006 para maioria)", correta: true },
              { letra: "C", texto: "Nunca é obrigatória", correta: false },
              { letra: "D", texto: "Apenas importação", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Emitida eletronicamente, autorizada pela SEFAZ, rastreada digitalmente."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "NF-e: obrigatória para circulação de mercadoria." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={3}
        variant={getModuleVariant(3)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Registros e Documentos Fiscais", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 3",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "NF-e e RPA", type: "Documentos", placeholderColor: "bg-emerald-500/20" },
            { title: "Livros Fiscais", type: "Registros", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Documentação Essencial",
          content: <div className="text-lg space-y-2"><p><strong>NF-e:</strong> Venda de mercadoria</p><p><strong>RPA:</strong> Serviço autônomo</p><p><strong>ECD:</strong> Contabilidade digital</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Documentos Fiscais", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Nota Fiscal Eletrônica", icone: "📋", conteudo: "Documento obrigatório para circulação de mercadoria. Emitido eletronicamente, autorizado pela SEFAZ. Gera obrigações de registro e pagamento de impostos." },
          { titulo: "Documentos de Serviço", icone: "💼", conteudo: "RPA: para autônomo ocasional. NFS-e: em alguns municípios (eletrônica). Comprovante de ISS retido: importante para documentação." },
          { titulo: "Livros Fiscais", icone: "📚", conteudo: "Livro de Apuração ICMS: débitos/créditos. Livro de Entrada/Saída: controle de operações. Livro de IR: receitas e despesas." },
          { titulo: "ECD: Transmissão Digital", icone: "💻", conteudo: "Sistema de transmissão de livros contábeis à RFB. Obrigatória para empresas no Lucro Real. Formato XML via certificado digital." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Nota Fiscal de Venda", descricao: "Petrobras vende 1.000 barris de óleo. NF-e: produto, quantidade, preço, tributos (ICMS, COFINS, PIS), emitida eletronicamente." },
          { title: "RPA de Consultor", descricao: "Consultor presta serviço R$ 5.000. Emite RPA: descrição, valor, INSS 11%, ISS ~3%. Entrega RPA à empresa." },
          { title: "Livro de ICMS", descricao: "Julho: Entradas ICMS crédito R$ 50 mil. Saídas ICMS débito R$ 80 mil. ICMS a pagar = 80 - 50 = R$ 30 mil." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-3"])}
        titulo="Quiz: Registros e Documentos Fiscais"
        numero={3}
        variant={getModuleVariant(3)}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={4} titulo="Declarações Tributárias" descricao="DIPJ, ECF, DACON, SPED - declarações obrigatórias ao fisco" variant={getModuleVariant(4)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Declarações Tributárias"
          description="DIPJ, ECF, DACON, SPED - declarações obrigatórias ao fisco"
          variant={getModuleVariant(4)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>DIPJ (Declaração de Imposto Pessoa Jurídica)</strong> é declaração anual de Imposto de Renda que apresenta a posição tributária da empresa ao fisco. Apresenta: receita bruta, custos, despesas, lucro calculado. Bases de cálculo: lucro real (empresa calcula IR sobre lucro) ou lucro presumido (alíquota sobre receita). DIPJ declara IR calculado, estimativas já pagas (recolhimentos mensais), saldo a pagar ou restituição. Prazo: até 30 de abril do ano seguinte ao exercício. Erros em DIPJ podem gerar autuações, multas, lançamento de ofício pela RFB. Para Petrobras, DIPJ é declaração crítica envolvendo cálculos complexos, bases ajustadas, créditos diversos.</p>
            <p>CESGRANRIO cobra os prazos e trâmites de declarações tributárias digitais como DCTF, EFD-Reinf, SPED Fiscal e DIRF anuais.</p>
            <p>A <strong>ECF (Escrituração Contábil Fiscal)</strong> é declaração mensal (ou por período de apuração) que apresenta bases para cálculo de tributos federais: IR, CSLL, PIS, COFINS. Obrigatória para empresas no Lucro Real. ECF lista: receitas, custos, despesas, ajustes fiscais (diferenças contábeis/fiscais), bases de cálculo por alíquota. Transmissão até dia 15 do mês seguinte ao período via SPED. ECF permite RFB monitorar bases e cruzar com SPED/ECD para validar consistência.</p>
            <p>As declarações tributárias acessórias informam ao fisco os fatos geradores de obrigações tributárias principais ocorridos no período de apuração.</p>
            <p>A <strong>DACON (Declaração de Compensação)</strong> é declaração que formaliza compensação de crédito tributário. Quando empresa tem crédito (de ICMS, IR, PIS, COFINS, etc.) e quer compensar (abater) contra débito futuro do mesmo tributo (ou outro autorizado), usa DACON. Exemplo: empresa tem crédito ICMS de R$ 500k (compra de máquina) e quer compensar contra ICMS futuro. DACON registra: crédito origem, montante, tributo a compensar, período. Permite fisco monitorar compensações e evitar fraudes.</p>
            <p>Como demonstração operacional, o cruzamento de dados entre a DCTF e a EFD-Contribuições permite ao fisco detectar divergências de saldos.</p>
            <p>O <strong>SPED (Sistema Público de Escrituração Digital)</strong> é plataforma integrada de transmissão de informações fiscais e contábeis ao governo. Módulos principais: EFD-ICMS/IPI (arquivo com lançamentos de ICMS/IPI mensais), EFD-Contribuições (arquivo com PIS/COFINS mensais), ECF (contábil). Transmissão: via certificado digital até dia 15 do mês seguinte à RFB. SPED é "espinha dorsal" da administração tributária moderna: integra informações, permite análise cruzada (consistência fiscal), rastreabilidade total de operações.</p>
            <p>A declaração de débitos e créditos tributários federais (DCTF) confessa a dívida e autoriza a cobrança imediata de saldos inadimplidos.</p>
            <p>A <strong>importância dessas declarações</strong> é que consolidam posição fiscal da empresa. Erros em DIPJ, ECF ou DACON podem ser questionados pela RFB e gerar processos administrativos. Para Petrobras, com operações complexas e volume imenso, precisão é crítica. Sistemas integrados (ERP + software fiscal) garantem: cálculos corretos, conformidade automática com prazos, rastreabilidade de dados. Equipes de contabilidade/fiscal preparam, analistas tributários revisam, compliance aprova antes de transmissão.</p>
            <p>A Petrobras possui fluxos mensais rígidos de validação de arquivos EFD-Reinf antes do envio obrigatório aos repositórios federais.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">📋 Declarações-Chave</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>DIPJ:</strong> Anual de IR (até 30 de abril)</li>
              <li>✓ <strong>ECF:</strong> Mensal de bases fiscais (até dia 15 mês seguinte)</li>
              <li>✓ <strong>DACON:</strong> Compensação de crédito (quando aplicável)</li>
              <li>✓ <strong>SPED:</strong> Transmissão integrada (EFD-ICMS, EFD-Contrib, ECF)</li>
              <li>✓ <strong>Certificado Digital:</strong> Assinatura de todas as declarações</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="DIPJ (Declaração Imposto Pessoa Jurídica) é apresentada:"
          alternativas={[
              { letra: "A", texto: "Mensalmente", correta: false },
              { letra: "B", texto: "Anualmente (até 30 de abril)", correta: true },
              { letra: "C", texto: "Nunca", correta: false },
              { letra: "D", texto: "A cada 3 anos", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Prazo: até 30 de abril do ano seguinte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "DIPJ: declaração anual de IR de PJ." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apresenta receitas, custos, despesas, cálculo de IR." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={4}
        variant={getModuleVariant(4)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Declarações Tributárias", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 4",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "DIPJ e ECF", type: "Declarações", placeholderColor: "bg-emerald-500/20" },
            { title: "SPED", type: "Sistema", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Calendário de Declarações",
          content: <div className="text-lg space-y-2"><p><strong>ECF:</strong> Até dia 15 (mensal)</p><p><strong>DACON:</strong> Quando compensar</p><p><strong>DIPJ:</strong> Até 30 de abril</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Declarações Tributárias", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "DIPJ: Imposto de Renda Anual", icone: "📊", conteudo: "Declaração anual de IR. Apresenta receitas, custos, despesas, lucro. Calcula IR, indica estimativas pagas, saldo a pagar/restituição." },
          { titulo: "ECF: Bases Mensais", icone: "📈", conteudo: "Declaração mensal de bases para IR, CSLL, PIS, COFINS. Obrigatória para Lucro Real. Transmissão até dia 15." },
          { titulo: "DACON: Compensação de Créditos", icone: "💳", conteudo: "Formaliza compensação de crédito tributário. Empresa tem crédito, quer abater contra débito. Monitora compensações." },
          { titulo: "SPED: Plataforma Integrada", icone: "💻", conteudo: "Sistema de transmissão integrada: EFD-ICMS, EFD-Contrib, ECF. Via certificado digital até dia 15." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "DIPJ Anual", descricao: "Empresa faturamento R$ 10 mi. Receita Bruta R$ 10 mi. IR calculado sobre lucro ~R$ 250k. DIPJ declara estimativas pagas R$ 200k, saldo R$ 50k." },
          { title: "ECF Mensal", descricao: "Maio: Receita R$ 1 mi. Custos R$ 600k. Despesas R$ 200k. Lucro R$ 200k. Base IR: 200k × 25% = R$ 50k." },
          { title: "DACON de Compensação", descricao: "Empresa tem crédito ICMS R$ 100k. Usa DACON para compensar contra ICMS futuro de R$ 100k." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-4"])}
        titulo="Quiz: Declarações Tributárias"
        numero={4}
        variant={getModuleVariant(4)}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={5} titulo="Prazos e Obrigações Acessórias" descricao="Calendário tributário e penalidades por atraso" variant={getModuleVariant(5)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Prazos e Obrigações Acessórias"
          description="Calendário tributário e penalidades por atraso"
          variant={getModuleVariant(5)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>calendário de prazos</strong> é elemento crítico da administração tributária. ICMS (estadual): recolhimento até dia 15. PIS/COFINS: até dia 15. IR (se apuração mensal): até dia 21. INSS: até dia 15 do mês seguinte. FGTS: até dia 7-8 do mês seguinte. Esses prazos são rígidos: atraso = multa de mora + juros. Para Petrobras, com centenas de recolhimentos mensais, planejamento financeiro rigoroso garante caixa disponível para vencer todas as obrigações. Um atraso de um dia em ICMS (tributo com maiores valores) resulta em multa + juros de centenas de milhares.</p>
            <p>A prova aborda o cálculo e cumprimento de prazos de recolhimento de impostos retidos na fonte e das obrigações acessórias corporativas.</p>
            <p>Os <strong>prazos de declaração</strong> são igualmente críticos. DIPJ: até 30 de abril. ECF/SPED: até dia 15 do mês seguinte ao período. Declaração tardia = multa por omissão (até 20% do imposto). Não apresentar declaração = multa ainda maior. Algumas declarações têm penalidades que aumentam com dias em atraso (progressivas). Para grandes empresas, atrasos são impraticáveis: reputação prejudicada, sistema de cobrança automática de fisco, possíveis bloqueios de operações.</p>
            <p>O descumprimento de prazos regulamentares para o pagamento de tributos atrai a incidência de juros de mora pela taxa SELIC e multa de ofício.</p>
            <p>As <strong>obrigações acessórias contínuas</strong> incluem: emitir NF para toda venda (obrigação de forma), manter livros contábeis/fiscais (obrigação de registro), registrar operações corretamente (obrigação de precisão), manter comprovantes de pagamento (obrigação de prova). Prazo de guarda: 5 anos (prazo de prescrição tributária). Empresa que não mantém documentação enfrenta dificuldades em fiscalização: não consegue comprovar posição, sofre autuações de ofício.</p>
            <p>A contagem de prazos em processos administrativos tributários segue o Código Tributário Nacional, diferenciando-se de prazos processuais comuns.</p>
            <p>As <strong>penalidades por atraso</strong> são significativas. Multa de Ofício: 0,5% ao mês sobre o valor da dívida (máximo 20% total). Juros de Mora: SELIC (taxa básica de juros, ~10% ao ano). Multa por Declaração Tardia: até 20% do imposto. Multa por Omissão: até R$ 20 mil (ou percentual do imposto). Multa agravada em caso de fraude/fraude (até 150%). Em Petrobras, uma autuação por atraso de IR pode representar milhões em multa + juros. Justificativa: "sistema fiscal não permite preguiça".</p>
            <p>A denúncia espontânea afasta a incidência de multas punitivas se o contribuinte confessar e pagar o tributo devido antes de fiscalizações.</p>
            <p>A <strong>gestão de prazos</strong> envolve: calendário rigoroso (agenda mensal de todos os vencimentos), fluxo de caixa tributário (prever quanto sai de caixa em cada data), acompanhamento (avisos automáticos 5 dias antes do vencimento), execução (pagamento 2-3 dias antes para evitar falhas), comprovação (manter todos os recibos/comprovantes). Grandes empresas usam softwares que integram ERP + sistema fiscal para automação. Petrobras tem departamentos dedicados ao calendário tributário: elimina risco de esquecimento.</p>
            <p>O setor de tesouraria da Petrobras programa diariamente o recolhimento eletrônico de DARFs e guias estaduais para evitar multas de mora.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">⏰ Prazos Críticos</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>Recolhimento:</strong> ICMS/PIS/COFINS/INSS até dia 15</li>
              <li>✓ <strong>IR:</strong> Até dia 21 (estimativa) ou 30 abril (DIPJ)</li>
              <li>✓ <strong>ECF/SPED:</strong> Até dia 15 mês seguinte</li>
              <li>✓ <strong>Guarda de Documentos:</strong> 5 anos (prescrição)</li>
              <li>✓ <strong>Penalidades:</strong> 0,5% ao mês + SELIC (multas podem ser altas)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Prazo de recolhimento de ICMS é até:"
          alternativas={[
              { letra: "A", texto: "Dia 7", correta: false },
              { letra: "B", texto: "Dia 15 (estadual, pode variar por estado)", correta: true },
              { letra: "C", texto: "Dia 21", correta: false },
              { letra: "D", texto: "Final do mês", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Atraso = multa 0,5% ao mês + juros."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "ICMS: apuração mensal, recolhimento até dia 15 (alguns estados 21)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={5}
        variant={getModuleVariant(5)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Prazos e Obrigações", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 5",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Calendário Tributário", type: "Prazos", placeholderColor: "bg-emerald-500/20" },
            { title: "Penalidades", type: "Consequências", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Regra de Ouro",
          content: <div className="text-lg space-y-2"><p><strong>Dia 15:</strong> ICMS, PIS, COFINS, INSS</p><p><strong>Dia 21:</strong> IR (estimativa)</p><p><strong>Não atrasar = evitar multas imensas</strong></p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Prazos Tributários", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Calendário de Prazos Federais", icone: "📅", conteudo: "ICMS: dia 15. PIS/COFINS: dia 15. IR: dia 21. INSS: dia 15. DIPJ: até 30 de abril." },
          { titulo: "Prazos por Tipo de Tributo", icone: "📊", conteudo: "Mensais: ICMS, PIS, COFINS, INSS. Trimestrais: IR estimativa. Anuais: DIPJ, CAGED." },
          { titulo: "Obrigações Acessórias", icone: "📋", conteudo: "Emitir NF, manter livros, registrar corretamente, guardar comprovantes (5 anos)." },
          { titulo: "Penalidades por Atraso", icone: "⚠️", conteudo: "Multa 0,5%/mês (máx 20%). Juros SELIC. Multa declaração tardia até 20%." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Calendário Mensal", descricao: "Dia 7: FGTS. Dia 15: ICMS, PIS, COFINS, INSS. Dia 21: IR. Empresa segue rigorosamente." },
          { title: "Atraso de ICMS", descricao: "ICMS R$ 50 mil venceu dia 15. Recolhido dia 22 (7 dias atraso). Multa: 50k × 0,5% × 7 = R$ 1.750. Juros ~R$ 500." },
          { title: "Falta de Declaração", descricao: "Empresa não apresenta DIPJ. RFB emite auto: multa por omissão ~20% do imposto (poderia ser R$ 50 mil)." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-5"])}
        titulo="Quiz: Prazos e Obrigações"
        numero={5}
        variant={getModuleVariant(5)}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={6} titulo="Gestão de Impostos" descricao="Planejamento tributário, fluxo de caixa e otimização de custos" variant={getModuleVariant(6)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Gestão de Impostos"
          description="Planejamento tributário, fluxo de caixa e otimização de custos"
          variant={getModuleVariant(6)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>planejamento tributário integrado</strong> é análise estruturada de como operações geram imposto e como minimizá-lo legalmente. Exemplo: Petrobras precisa comprar equipamento. Opção 1: compra à vista (gera ICMS crédito na compra). Opção 2: aluga (gera ISS na locação). Qual gera menos imposto? Análise compara carga tributária total (ICMS, ISS, impostos sobre lucro) com benefícios econômicos (posse vs. uso). Planejamento tributário é LEGAL: estrutura operação conforme lei para melhorar resultado.</p>
            <p>Questões sobre gestão de impostos cobram o controle preventivo de contingências fiscais e a apuração de saldos credores de compensação.</p>
            <p>O <strong>controle de fluxo de caixa tributário</strong> é previsão de quando impostos serão pagos. Exemplo: Petrobras tem sazonalidade (Q1 vendas altas, Q2-Q4 vendas baixas). Imposto acompanha: Q1 caixa saindo para pagar ICMS alto, Q2-Q4 menos. Gestão: separar caixa em Q1 para cobrir picos de imposto em Q2. Sem isso, empresa pode ter "squeeze" de caixa: dinheiro entrando pouco, mas imposto a pagar muito. Fluxo de caixa tributário integra-se ao planejamento financeiro geral.</p>
            <p>A gestão de impostos compreende a auditoria de alíquotas incidentes e o planejamento de drawback para desonerar importações fabris.</p>
            <p>O <strong>aproveitamento de créditos</strong> reduz imposto a pagar. ICMS Crédito: quando empresa compra insumo, gera direito de abater ICMS futuro (não pagável imediatamente). PIS/COFINS Crédito: similar. Importante: documentação correta (NF, RPA) comprovação. Empresa que aproveita créditos corretamente paga menos imposto efetivo. Exemplo: empresa com crédito ICMS de R$ 500k pode compensar contra ICMS futuro, economizando R$ 500k de caixa.</p>
            <p>A conciliação mensal de contas fiscais confronta o saldo de impostos a pagar registrado no passivo com as guias efetivamente quitadas.</p>
            <p>A <strong>compensação e restituição</strong> são estratégias para aproveitar créditos. Compensação: usar crédito para abater débito (economia imediata, sem saída de caixa). Restituição: pedir ao fisco devolver crédito em dinheiro (menos comum, complexa, mas válida em situações específicas como exportação). Ambas são legítimas e fazem parte de boa administração tributária. Fisco reconhece compensação como operação normal (desde que cumpridos prazos e procedimentos).</p>
            <p>O monitoramento de riscos fiscais avalia a probabilidade de perda em processos administrativos judiciais, classificando-as em provável, possível ou remota.</p>
            <p>A <strong>gestão de impostos em Petrobras</strong> é particularmente sofisticada. Bilhões em imposto anual significam: pequenas melhorias de 0,1% resultam em dezenas de milhões de economia. Departamento tributário trabalha com planejadores tributários, economistas, analistas. Cada operação relevante (fusão, investimento em novo campo, mudança de estrutura) é analisada: "qual é o impacto tributário?" Objetivo: maximizar retorno aos acionistas respeitando plenamente a lei.</p>
            <p>A Petrobras provisiona contabilmente bilhões de reais em seu balanço para cobrir contingências tributárias avaliadas com risco de perda provável.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">💰 Gestão Tributária</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>Planejamento:</strong> Analisar operações para otimizar tributação (legal)</li>
              <li>✓ <strong>Fluxo de Caixa:</strong> Prever quando imposto vence</li>
              <li>✓ <strong>Créditos:</strong> Aproveitar ICMS, PIS, COFINS créditos</li>
              <li>✓ <strong>Compensação:</strong> Abater crédito contra débito (economia imediata)</li>
              <li>✓ <strong>Restituição:</strong> Em situações específicas (exportação, etc.)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Planejamento Tributário Integrado envolve:"
          alternativas={[
              { letra: "A", texto: "Apenas vender mais", correta: false },
              { letra: "B", texto: "Analisar operações e estruturar para minimizar imposto de forma lícita", correta: true },
              { letra: "C", texto: "Fraudar impostos", correta: false },
              { letra: "D", texto: "Não envolve nada", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Ilícito = frauda."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Planejamento: análise de qual operação/estrutura gera menos imposto." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Lícito = usa opções da lei." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={6}
        variant={getModuleVariant(6)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Gestão de Impostos", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 6",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Planejamento Tributário", type: "Estratégia", placeholderColor: "bg-emerald-500/20" },
            { title: "Fluxo de Caixa", type: "Gestão", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Equação de Sucesso",
          content: <div className="text-lg space-y-2"><p><strong>Conformidade:</strong> 100% cumprimento</p><p><strong>+Otimização:</strong> reduzir custos legalmente</p><p><strong>=Excelência tributária</strong></p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Gestão de Impostos", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Planejamento Tributário Integrado", icone: "📊", conteudo: "Análise estruturada: qual operação gera menos imposto? Compra vs aluguel? Qual estrutura é mais eficiente? Objetivo: decidir com base em carga tributária total." },
          { titulo: "Fluxo de Caixa Tributário", icone: "💵", conteudo: "Previsão de imposto a pagar por mês. Sazonalidade: alto em certos períodos. Gestão separa caixa para cobrir picos. Evita falta de liquidez." },
          { titulo: "Aproveitamento de Créditos", icone: "✅", conteudo: "ICMS, PIS, COFINS créditos geram direito de abater. Documentação correta (NF, RPA) é essencial. Crédito aproveitado = menos imposto a pagar." },
          { titulo: "Compensação e Restituição", icone: "💳", conteudo: "Compensação: usar crédito abater débito (economia imediata). Restituição: pedir dinheiro de volta (menos comum). Ambas estratégias legítimas." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Planejamento de Compra", descricao: "Máquina: custo R$ 100k + ICMS R$ 18k = R$ 118k. Aproveita ICMS crédito R$ 18k abate vendas futuras. Efetivo: máquina R$ 100k." },
          { title: "Fluxo de Caixa Anual", descricao: "Vendas sazonais: 60% Q1, 40% Q2-Q4. Imposto: Q1 alto, Q2-Q4 baixo. Gestão separa caixa Q1 para cobrir picos Q2." },
          { title: "Restituição de Crédito", descricao: "Exportadora tem crédito ICMS R$ 200k (operações isentas). Solicita restituição. Governo restitui R$ 200k." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-6"])}
        titulo="Quiz: Gestão de Impostos"
        numero={6}
        variant={getModuleVariant(6)}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={7} titulo="Controle de Créditos Tributários" descricao="Apuração de ICMS, PIS/COFINS, aproveitamento e prescrição de créditos" variant={getModuleVariant(7)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Controle de Créditos Tributários"
          description="Apuração de ICMS, PIS/COFINS, aproveitamento e prescrição de créditos"
          variant={getModuleVariant(7)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>sistema de crédito em cascata</strong> do ICMS é mecanismo que evita tributação múltipla. Exemplo: fabricante vende a varejista (ICMS débito na venda), varejista compra (ICMS crédito na compra). Crédito pode abater débito. Resultado: consumidor final paga ICMS uma vez (não em cada etapa). Sistema funciona porque cada etapa registra débito/crédito corretamente. Importância: manter registro diário, apuração mensal, documentação. Falta de controle = perda de crédito = tributação em cascata (injusta).</p>
            <p>A banca exige conhecimentos de controle de créditos tributários acumulados sobre aquisições e o trâmite de compensação via PER/DCOMP.</p>
            <p>As <strong>condições para aproveitamento</strong> de crédito são rigorosas. Para ICMS: operação deve ser típica da empresa (compra de insumo para revenda), documentação correta (NF emitida legalmente), operação legal (não fraudulenta). Para PIS/COFINS: insumo deve ser para produção ou comercialização. Crédito negado = empresa não consegue abater, fica com custo tributário mais alto. RFB fiscaliza aproveitamento: se crédito não está bem documentado, multa.</p>
            <p>O controle de créditos tributários acumulados de ICMS sobre exportações exige homologação prévia nas secretarias estaduais de fazenda.</p>
            <p>A <strong>documentação comprobatória</strong> é essencial. Nota Fiscal: deve indicar produtos, quantidade, preço, ICMS. Sem data correta, dados do vendedor/comprador, assinatura digital = crédito rejeitado. RPA/Recibo: deve indicar ISS retido, serviço prestado. Comprovante de Pagamento: DARF mostrando recolhimento (prova de que imposto foi pago). Toda documentação entra em processo de prova em auditoria. Documentação fraca = risco de autuação.</p>
            <p>O sistema PER/DCOMP eletrônico unifica os pedidos de restituição e declarações de compensação de tributos federais pagos a maior.</p>
            <p>A <strong>prescrição de crédito</strong> é limite temporal para aproveitamento. Crédito ICMS prescreve em 5 anos se não aproveitado (compensado ou levado para resultado). Crédito PIS/COFINS pode ter prescrição diferente (varia por legislação). Importante: acompanhar saldo de crédito para não perder direito. Empresa com crédito de R$ 1 milhão que deixa prescrever perde R$ 1 mi em potencial de economia. Por isso existe gestão de créditos: planilhas, acompanhamento, compensação antes de prescrever.</p>
            <p>A compensação extingue o crédito tributário sob condição resolutória de homologação posterior pela Receita Federal em até cinco anos.</p>
            <p>O <strong>controle de créditos em Petrobras</strong> é operação sofisticada. Empresa com bilhões em faturamento pode ter créditos de centenas de milhões. Petrobras mantém sistemas de BI (Business Intelligence) que monitoram: saldo de crédito por tipo (ICMS, PIS, COFINS), vencimento, estratégia de compensação. Cada trimestre, equipe revisa oportunidades de compensação para maximizar caixa. Crédito bem gerenciado melhora posição de caixa sem afetar conformidade.</p>
            <p>A Petrobras compensa mensalmente créditos tributários de PIS e COFINS acumulados com débitos de IRPJ incidentes no refino nacional.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">📋 Controle de Créditos</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>ICMS Crédito:</strong> Direito de abater em ICMS futuro</li>
              <li>✓ <strong>PIS/COFINS Crédito:</strong> Abate em débito futuro (insumos)</li>
              <li>✓ <strong>Documentação:</strong> NF, RPA, comprovante pagamento essenciais</li>
              <li>✓ <strong>Prescrição:</strong> ICMS prescreve 5 anos se não aproveitado</li>
              <li>✓ <strong>Compensação:</strong> Abater crédito antes de prescrever (evita perda)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Crédito ICMS gera direito de:"
          alternativas={[
              { letra: "A", texto: "Não pagar ICMS nunca", correta: false },
              { letra: "B", texto: "Abater ICMS pago em compra no ICMS devido em venda", correta: true },
              { letra: "C", texto: "Fraude", correta: false },
              { letra: "D", texto: "Sem relação", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Precisa de documentação (NF correta)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Crédito ICMS: direito inato (vem da lei)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Compra com ICMS = nasce crédito." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={7}
        variant={getModuleVariant(7)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Controle de Créditos", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 7",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Apuração ICMS", type: "Sistema", placeholderColor: "bg-emerald-500/20" },
            { title: "Prescrição de Créditos", type: "Gestão", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Fórmula ICMS",
          content: <div className="text-lg space-y-2"><p><strong>Débito (saída):</strong> ICMS na venda</p><p><strong>- Crédito (entrada):</strong> ICMS na compra</p><p><strong>= ICMS a pagar</strong> (a diferença)</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Créditos Tributários", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Sistema de Crédito em Cascata", icone: "🔄", conteudo: "ICMS: débito na venda, crédito na compra. Diferença = ICMS a pagar. Evita tributação em cascata. Requer registro correto." },
          { titulo: "Condições de Aproveitamento", icone: "✅", conteudo: "Para ICMS: operação típica, documentação correta, legal. Para PIS/COFINS: insumo para produção/comercialização." },
          { titulo: "Documentação Comprobatória", icone: "📄", conteudo: "NF (CNPJ, produtos, preço, ICMS). RPA/Recibo (ISS retido). Comprovante pagamento (DARF). Tudo para fisco aceitar crédito." },
          { titulo: "Prescrição e Compensação", icone: "⏰", conteudo: "ICMS prescreve 5 anos. Importante acompanhar. Compensar antes de prescrever (evita perda)." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Apuração ICMS Mensal", descricao: "Entrada: compra NF R$ 10k + ICMS R$ 1.800 = crédito R$ 1.800. Saída: venda NF R$ 15k + ICMS R$ 2.700 = débito R$ 2.700. Apuração: 2.700 - 1.800 = R$ 900 a pagar." },
          { title: "Auditoria de Crédito", descricao: "Empresa apresenta crédito ICMS R$ 50k. Fisco verifica: NF sem assinatura digital = crédito rejeitado. Multa por crédito indevido." },
          { title: "Demonstrativo de Crédito", descricao: "Controle mensal: Saldo Inicial R$ 20k + Créditos Novos R$ 30k - Débito Compensado R$ 25k = Saldo Final R$ 25k." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-7"])}
        titulo="Quiz: Controle de Créditos"
        numero={7}
        variant={getModuleVariant(7)}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={8} titulo="Sistemas de Informação Tributária" descricao="NF-e, SPED, certificado digital, validação de dados" variant={getModuleVariant(8)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Sistemas de Informação Tributária"
          description="NF-e, SPED, certificado digital, validação de dados"
          variant={getModuleVariant(8)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>NF-e (Nota Fiscal Eletrônica)</strong> é sistema obrigatório desde 2006 para circulação de mercadorias. Empresa emite NF-e eletronicamente via software (integrado ao ERP). Sistema valida formato (XML), calcula hash. NF-e é enviada à SEFAZ estadual via internet (https). SEFAZ valida dados (CNPJ existe? Produto tem NCM válido? Impostos calculados corretamente?). Se OK, SEFAZ autoriza e retorna número de protocolo. Comprador recebe DANFE (documento auxiliar) via email em 2-3 minutos. NF-e é rastreável: SEFAZ mantém histórico de todas as NF-e emitidas. Controle: empresa não consegue "desaparecer" com nota (transparência fiscal).</p>
            <p>Questões cobram a segurança da informação e a integração de sistemas corporativos como SAP com os portais do SPED governamentais.</p>
            <p>O <strong>EFD-ICMS/IPI e EFD-Contribuições (SPED)</strong> são arquivos digitais transmitidos à RFB. EFD-ICMS: contém todos os lançamentos de ICMS/IPI do mês. EFD-Contribuições: contém PIS/COFINS. Formato: arquivo digital (tipo TXT estruturado). Empresa exporta dados do ERP, gera arquivo, assina digitalmente. Transmissão: até dia 15 do mês seguinte via SPED (Sistema Público Escrituração Digital) à RFB. RFB cruza dados com ECF (contábil) e NF-e: se houver discrepâncias, questiona empresa. Objetivo: rastreabilidade total de operações.</p>
            <p>Os sistemas de informação tributária automatizam a geração de registros fiscais e cruzam dados logísticos para evitar erros humanos na apuração.</p>
            <p>O <strong>Certificado Digital (e-CPF, e-CNPJ)</strong> é assinatura digital que prova autoria de NF-e e SPED. Válido por 1 ano (renovação necessária). Funciona em token (pequeno dispositivo USB) ou smart card. Custo: ~R$ 300-500 por ano. Armazenamento: seguro, sem deixar cópia em computador. Certificado é pessoal (responsabilidade do signatário): se alguém usa seu certificado para fraude, você é responsável. Por isso, em grandes empresas, certificados corporativos com controle de acesso (quem pode usar, logs de acesso). Petrobras tem procedimentos rígidos para certificados: poucos funcionários autorizados, auditoria.</p>
            <p>A certificação digital e as chaves de segurança garantem a autenticidade dos dados fiscais transmitidos aos servidores federais do SPED.</p>
            <p>A <strong>validação de dados antes de transmissão</strong> é etapa crítica. Software de NF-e valida: CNPJ existe no cadastro de contribuintes? Produto tem NCM válido? Alíquota de ICMS está conforme estado? Preço está íntegro (sem decimais errados)? Quantidade corresponde à nota? Se erro, software rejeita e pede correção antes de enviar. Evita: rejeição pela SEFAZ, atraso em documentação, risco fiscal. Após validação, empresa assina e envia. SEFAZ faz segunda validação: se tudo OK, autoriza; se erro, retorna com código de rejeição (empresa corrige e reenvia).</p>
            <p>O armazenamento em banco de dados de arquivos XML de notas fiscais eletrônicas por prazos legais é dever do contribuinte auditável.</p>
            <p>A <strong>transformação digital tributária</strong> em Petrobras envolve: ERP integrado com sistema fiscal, automação de geração de NF-e/SPED (sem digitação manual), assinatura digital integrada (certificado em servidor seguro), transmissão automática, BI tributário (dashboards de conformidade, alertas de atraso). Benefício: elimina erro humano, garante conformidade, automatiza, reduz equipe necessária. Petrobras investe bilhões em sistemas: garantir conformidade em escala (milhões de NF-e/ano).</p>
            <p>O setor de TI da Petrobras atualiza constantemente os módulos fiscais do ERP SAP para atender a alterações do leiaute do SPED.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">💻 Sistemas Críticos</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>NF-e:</strong> Nota Fiscal Eletrônica (obrigatória)</li>
              <li>✓ <strong>EFD-ICMS:</strong> Lançamentos ICMS/IPI (até dia 15)</li>
              <li>✓ <strong>EFD-Contribuições:</strong> PIS/COFINS (até dia 15)</li>
              <li>✓ <strong>Certificado Digital:</strong> Assinatura (validade 1 ano)</li>
              <li>✓ <strong>Validação:</strong> Antes de transmissão (evita rejeição)</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="NF-e (Nota Fiscal Eletrônica) é emitida:"
          alternativas={[
              { letra: "A", texto: "Em papel", correta: false },
              { letra: "B", texto: "Eletronicamente via software, autorizada pela SEFAZ", correta: true },
              { letra: "C", texto: "Verbalmente", correta: false },
              { letra: "D", texto: "Sem sistema", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Rastreado."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "NF-e: processo eletrônico." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Empresa emite em software, envia a SEFAZ, SEFAZ autoriza e gera código de segurança." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={8}
        variant={getModuleVariant(8)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Sistemas de Informação", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 8",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "NF-e e SPED", type: "Sistemas", placeholderColor: "bg-emerald-500/20" },
            { title: "Certificado Digital", type: "Segurança", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Fluxo Digital",
          content: <div className="text-lg space-y-2"><p><strong>ERP → NF-e (valida) → Assina (cert.) → SEFAZ</strong></p><p><strong>ERP → SPED (valida) → Assina → RFB</strong></p><p>Tudo integrado, automático</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Sistemas Tributários", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "NF-e (Nota Fiscal Eletrônica)", icone: "📱", conteudo: "Obrigatória desde 2006. Emitida eletronicamente. SEFAZ autoriza em 2-3 min. DANFE é documento auxiliar. Rastreável: SEFAZ mantém histórico." },
          { titulo: "EFD-ICMS/IPI e EFD-Contrib (SPED)", icone: "📊", conteudo: "Arquivos digitais com lançamentos mensais. Transmissão até dia 15 à RFB. RFB cruza com NF-e/ECD. Rastreabilidade total." },
          { titulo: "Certificado Digital", icone: "🔐", conteudo: "Assinatura de NF-e e SPED. Válido 1 ano (~R$ 300-500). Token/smart card. Pessoal/responsabilidade do signatário." },
          { titulo: "Validação Antes de Transmissão", icone: "✓", conteudo: "Software valida: CNPJ, produto (NCM), ICMS, preço. Evita rejeição SEFAZ. Automática, sem erro humano." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Emissão de NF-e", descricao: "Venda: empresa emite NF-e em software. Valida (CNPJ OK, NCM OK, impostos OK). Envia SEFAZ. SEFAZ autoriza. Comprador visualiza em 2-3 min." },
          { title: "Envio de SPED", descricao: "Maio finalizado. Empresa gera arquivo EFD-ICMS com 150 saídas, 80 entradas. Assina digitalmente com certificado. Transmite até dia 15 de junho." },
          { title: "Certificado Digital", descricao: "CNPJ renova certificado digital (vencimento: 31/03/2024). Novo válido 01/04/2024 a 31/03/2025. Custo R$ 400." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-8"])}
        titulo="Quiz: Sistemas de Informação"
        numero={8}
        variant={getModuleVariant(8)}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={9} titulo="Administração Tributária em Petrobras" descricao="Desafios específicos, múltiplas jurisdições, royalties e governance" variant={getModuleVariant(9)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Administração Tributária em Petrobras"
          description="Desafios específicos, múltiplas jurisdições, royalties e governance"
          variant={getModuleVariant(9)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>Os <strong>desafios tributários específicos de Petrobras</strong> são imensos. Empresa opera em múltiplos estados (SP, RJ, MG, BA, etc.): cada estado tem ICMS diferente (SP 18%, RJ 20%, MG 12%). Apuração: separar ICMS por estado, pagar para cada SEFAZ diferente. Complexidade multiplicada. Múltiplos tributos incidem simultaneamente: IRPJ, CSLL, PIS, COFINS, ICMS, ISS, impostos sobre combustível, royalties, PE (Participação Especial em alguns campos). Operações integradas: exploração (petróleo), transporte (dutos), refino (processamento), distribuição (vendas). Cada etapa tem tributação própria. Volume: Petrobras fatura dezenas de bilhões/ano, gera imposto de bilhões/ano. Gestão em escala desafiadora.</p>
            <p>Questões sobre a Petrobras abordam a atuação como substituto tributário progressivo e a arrecadação massiva de impostos retidos nos combustíveis.</p>
            <p>A <strong>gestão de múltiplas jurisdições</strong> envolve expertise regional. Petrobras tem especialistas por estado: analista ICMS-SP entende legislação de São Paulo, alíquotas, benefícios fiscais específicos. Analista ICMS-RJ entende dinâmica do Rio. Cada estado tem particularidades (regimes especiais, substituição tributária, etc.). Coordenação: consolidar informações de todas as unidades para relatório corporativo. Conformidade: cumprir obrigações de cada estado (prazos, formas de recolhimento, declarações). Risco: opera em 27 jurisdições (26 estados + DF), cada com seu risco tributário.</p>
            <p>A substituição tributária progressiva atribui à Petrobras o recolhimento prévio do ICMS sobre combustíveis que serão vendidos ao consumidor final.</p>
            <p>A <strong>gestão de royalties e Participação Especial</strong> é operação específica. Campos de petróleo têm contrato de concessão (governo concede direito de explorar). Contrato define: royalties (% da produção repassada ao governo), PE (participação adicional em campos super-lucrosos). Administração: calcular royalties corretamente (produção × preço × alíquota), repassar ao governo mensalmente, registrar contabilmente. Exemplo: campo produz 10k bbl/dia, royalties 5% = 500 bbl/dia. Preço Brent R$ 300/bbl = R$ 150k/dia em royalties (~R$ 4,5 mi/mês). Auditoria: governo verifica cálculos (fraude seria desastrosa). Petrobras tem sistemas dedicados para royalties: garantir precisão.</p>
            <p>A apuração de impostos em operações com bacias petrolíferas exige controle fiscal estrito das faturas de afretamento marítimo de FPSOs.</p>
            <p>A <strong>estrutura de conformidade em Petrobras</strong> é robusta. Departamento Tributário (nível corporativo) coordena estratégia global. Unidades de Negócio têm analistas tributários locais. Auditoria Interna valida conformidade (verificar se DIPJ está correto, se SPED foi transmitido, se documentos estão adequados). Compliance Corporativa supervisiona (Lei 13.303 exige conformidade máxima em estatal). Relatório Integrado (para CVM/acionistas) consolida posição tributária. Objetivo: transparência total, zero tolerância para não-conformidade.</p>
            <p>A conciliação de faturas fiscais de fornecedores internacionais de engenharia requer verificação das retenções de IRRF e CIDE de tecnologia.</p>
            <p>Os <strong>sistemas de informação em Petrobras</strong> são world-class. ERP corporativo integra dados de todas as unidades em tempo real. Sistema de BI (Business Intelligence) consolida tributos: dashboard de ICMS por estado (quem pagou quanto, quando), dashboard de IR/CSLL (bases, cálculos), dashboard de royalties (produção, preços, cálculos). Alertas automáticos: prazo de recolhimento vencendo amanhã, nota fiscal com erro de CNPJ, discrepância entre sistemas. Automação: cálculo de tributos sem erro humano, transmissão automática de SPED, geração automática de documentos. Investimento: Petrobras gasta centenas de milhões em sistemas: retorno via conformidade + otimização = bilhões.</p>
            <p>O Técnico de Suprimentos da Petrobras fiscaliza a correta aplicação de retenções tributárias federais e municipais em faturas de prestadores.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">⛽ Petrobras Específico</span>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>Múltiplas Jurisdições:</strong> 27 estados + DF, cada com legislação</li>
              <li>✓ <strong>Royalties:</strong> % produção repassada ao governo (bilhões/ano)</li>
              <li>✓ <strong>PE (Participação Especial):</strong> Em campos super-lucrosos</li>
              <li>✓ <strong>Compliance:</strong> Lei 13.303 exige conformidade máxima</li>
              <li>✓ <strong>Sistemas:</strong> ERP integrado, BI tributário, automação</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Complexidade tributária em Petrobras vem de:"
          alternativas={[
              { letra: "A", texto: "Nada complexo", correta: false },
              { letra: "B", texto: "Múltiplos estados, tributos integrados (ICMS em cascata), royalties, PE, volume bilionário", correta: true },
              { letra: "C", texto: "Apenas ICMS", correta: false },
              { letra: "D", texto: "Sem complexidade", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="Além disso: royalties, PE (participações), IR, PIS, COFINS."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Petrobras opera em 5+ estados." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada ICMS diferente." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={9}
        variant={getModuleVariant(9)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Tributação em Petrobras", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 9",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Múltiplas Jurisdições", type: "Complexidade", placeholderColor: "bg-emerald-500/20" },
            { title: "Royalties e Governance", type: "Operação", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Complexidade Petrobras",
          content: <div className="text-lg space-y-2"><p><strong>27 estados:</strong> cada um com ICMS diferente</p><p><strong>Bilhões em imposto:</strong> exigem precisão absoluta</p><p><strong>Royalties/PE:</strong> repassos bilionários ao governo</p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Tributação Petrobras", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Desafios de Múltiplas Jurisdições", icone: "🗺️", conteudo: "Petrobras opera em 27 jurisdições. Cada estado: ICMS diferente, regras diferentes, prazos diferentes. Especialistas por estado. Consolidação corporativa." },
          { titulo: "Royalties e Participação Especial", icone: "⛽", conteudo: "Campos: contrato define royalties (% produção). Administração calcula, repassa governo. PE: participação adicional em campos lucrativos." },
          { titulo: "Estrutura de Conformidade", icone: "✅", conteudo: "Departamento Tributário corporativo. Analistas locais. Auditoria interna. Compliance corporativa. Lei 13.303: conformidade máxima." },
          { titulo: "Sistemas de Informação", icone: "💻", conteudo: "ERP integrado. BI tributário (dashboards). Alertas automáticos. Automação. Investimento: bilhões em sistemas." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "ICMS por Estado", descricao: "Petrobras vende gasolina em 5 estados. Cada estado: ICMS diferente (SP 18%, RJ 20%, MG 12%). Apuração por estado. Pagar para cada SEFAZ." },
          { title: "Royalties de Produção", descricao: "Campo produz 50k bbl/dia. Royalties 5% = 2.500 bbl/dia. Preço Brent R$ 300/bbl = R$ 750k/dia em royalties (~R$ 22,5 mi/mês)." },
          { title: "Relatório Trimestral", descricao: "Petrobras consolida ICMS (5 estados) R$ 2 bi. IRPJ R$ 1 bi. Royalties/PE R$ 800 mi. Total R$ 3,8 bi trimestral. Reporta para diretoria e CVM." },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-9"])}
        titulo="Quiz: Tributação em Petrobras"
        numero={9}
        variant={getModuleVariant(9)}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner numero={10} titulo="Simulado Geral - Administração Tributária" descricao="Teste integrado: conceitos, prazos, procedimentos, aplicação Petrobras" variant={getModuleVariant(10)} />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Simulado Geral - Administração Tributária"
          description="Teste integrado: conceitos, prazos, procedimentos, aplicação Petrobras"
          variant={getModuleVariant(10)}
        />
        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            O <strong>Simulado Geral integra conhecimento</strong> de todos os 9 módulos anteriores em questões práticas. Não é teste de memorização, mas de compreensão e aplicação. Questões: cenários realistas (empresa tem situação tributária X, qual é o procedimento correto?), análise crítica (identifique órgão responsável, prazo aplicável, documentação necessária), decisão (qual estratégia reduz imposto legalmente?). Objetivo: validar se você domina administração tributária de forma integrada.
          </p>
          <p>
            Os <strong>domínios avaliados</strong> no simulado incluem: (1) <strong>Conhecimento:</strong> quem é o órgão arrecadador? Qual é o prazo? Qual documentação é necessária? (2) <strong>Procedimentos:</strong> como registrar operação? Como aproveitar crédito? Como fazer declaração? Qual é o passo-a-passo correto? (3) <strong>Gestão:</strong> como otimizar fluxo tributário? Como evitar multas? Como estruturar operação para minimizar imposto? Todas as dimensões aparecem nas questões.
          </p>
          <p>
            A <strong>estratégia de resolução</strong> é sistemática: (1) Leia situação com atenção: qual é o tributo em questão? Qual é a operação? Qual é o estado? (2) Identifique órgão responsável: RFB (federal), SEFAZ (estadual), Prefeitura (municipal)? (3) Aplique procedimento: qual é o prazo? Qual documentação? Qual é o passo-a-passo? (4) Verifique resposta: coerente com Lei? Não há exceção que mude resposta? Revise pensamento crítico.
          </p>
          <p>
            A <strong>preparação para prova Petrobras</strong> com esse simulado deve ser rigorosa. Atingir 70% ou mais demonstra competência de técnico em administração tributária. Questões cobram: gestão de impostos, conformidade, prazos, sistemas, procedimentos administrativos. Se você entende como responder corretamente, preparou bem para qualquer questão de prova. Simulado é "ensaio geral" antes da prova oficial. Tempo: geralmente 10-15 questões, 30-45 minutos (teste sua velocidade).
          </p>
          <p>
            Os <strong>benefícios de passar no Simulado Geral</strong> com ≥70%: demonstra que você consolidou aprendizado dos 10 módulos, está pronto para prova, pode responder questões práticas de administração tributária em ambiente real (Petrobras), tem base sólida para evitar erros em operações reais. Estudar administração tributária não é apenas para passar em prova: é para trabalhar com integridade e competência na Petrobras. Cada procedimento que você aprende aqui protege empresa de riscos tributários.
          </p>
          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">👑 Domínio Total</p>
            <ul className="text-lg space-y-2 text-foreground">
              <li>✓ <strong>Conhecimento:</strong> Órgãos, tributos, prazos, documentos</li>
              <li>✓ <strong>Procedimentos:</strong> Registro, créditos, declarações, conformidade</li>
              <li>✓ <strong>Gestão:</strong> Otimização, planejamento, fluxo de caixa</li>
              <li>✓ <strong>Aplicação:</strong> Cenários Petrobras (múltiplos estados, royalties)</li>
              <li>✓ <strong>70%+ = Competência Provada em Administração Tributária</strong></li>
            </ul>
          </div>
        </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Empresa tem ICMS a pagar R$ 50 mil, INSS R$ 20 mil, IR R$ 30 mil. Qual é total e por onde começa pagamento?"
          alternativas={[
              { letra: "A", texto: "R$ 100 mil, começar por IR", correta: false },
              { letra: "B", texto: "R$ 100 mil total. Ordem: FGTS (dia 7) > INSS (dia 15) > ICMS (dia 15) > IR (dia 21) conforme vencimentos", correta: true },
              { letra: "C", texto: "R$ 50 mil apenas", correta: false },
              { letra: "D", texto: "Sem ordem", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
            ]}
          dicaEstrategica="FGTS venceu primeiro."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Gestão de prazos: respeitar vencimento de cada tributo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Ordem não é escolha, é lei." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={10}
        variant={getModuleVariant(10)}
        video={{ videoId: "dQw4w9WgXcQ", title: "Simulado Geral", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 10",
          tituloAula: "Administração Tributária",
          materia: "Administração",
          images: [
            { title: "Integração de Conceitos", type: "Teste", placeholderColor: "bg-emerald-500/20" },
            { title: "Aplicação Prática", type: "Competência", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Estrutura Simulado",
          content: <div className="text-lg space-y-2"><p><strong>10 questões integradas</strong> cobrindo todos módulos</p><p><strong>Conhecimento + Procedimentos + Gestão</strong></p><p><strong>70%+ = Expert em Tributária</strong></p></div>,
        }}
        audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Simulado Geral", artista: "Prof. Administração" }}
      />

      <ContentAccordion mode="stacked" 
        slides={[
          { titulo: "Estrutura do Simulado", icone: "📝", conteudo: "10 questões que integram conhecimento de múltiplos módulos. Tópicos: órgãos, documentos, declarações, prazos, créditos, sistemas, gestão, procedimentos." },
          { titulo: "Domínios Avaliados", icone: "🎯", conteudo: "Conhecimento: quem? qual? quando? Procedimentos: como? qual passo? Gestão: por que? qual estratégia? Aplicação: cenários Petrobras." },
          { titulo: "Estratégia de Resolução", icone: "📋", conteudo: "Leia com atenção. Identifique órgão. Aplique procedimento. Verifique resposta. Revise pensamento." },
          { titulo: "Preparação para Concurso", icone: "👑", conteudo: "70%+ = competência em tributária. Prepara para prova Petrobras. Conhecimento prático para trabalhar em gestão tributária real." },
        ]}
      />

      <CardCarousel
        cards={[
          { title: "Gestão de Prazos", descricao: "ICMS vencimento dia 15, INSS dia 15, IR dia 21, FGTS dia 7. Se vencimento cai em domingo, quando pagar? Qual prioridade de caixa?" },
          { title: "Procedimento Correto", descricao: "Empresa tem crédito ICMS R$ 500k (compra insumo). Qual procedimento? Emitir DACON? Compensar contra ICMS próximo mês? Documentação necessária?" },
          { title: "Gestão em Petrobras", descricao: "Campo petróleo produz 10k bbl/dia. Royalties 5% = 500 bbl. Preço Brent R$ 100/bbl. Qual valor mensal royalties? Como registrar?" },
        ]}
      />

      <QuizInterativo
        questoes={toQQ(ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-10"])}
        titulo="Simulado Geral - Administração Tributária"
        numero={10}
        variant={getModuleVariant(10)}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Administração Tributária"
      descricao="Gestão de tributos para técnico em suprimento - Administração"
      duracao="20h"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.size >= MODULE_DEFS.length - 1}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
    >
      <TabsContent value="modulo-1" className="space-y-12 mt-0">
        {renderModulo1()}
      </TabsContent>
      <TabsContent value="modulo-2" className="space-y-12 mt-0">
        {renderModulo2()}
      </TabsContent>
      <TabsContent value="modulo-3" className="space-y-12 mt-0">
        {renderModulo3()}
      </TabsContent>
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        {renderModulo4()}
      </TabsContent>
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        {renderModulo5()}
      </TabsContent>
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        {renderModulo6()}
      </TabsContent>
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        {renderModulo7()}
      </TabsContent>
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        {renderModulo8()}
      </TabsContent>
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        {renderModulo9()}
      </TabsContent>
      <TabsContent value="modulo-10" className="space-y-12 mt-0">
        {renderModulo10()}
      </TabsContent>
    </AulaTemplate>
  );
}
