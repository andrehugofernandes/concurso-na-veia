const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'components', 'aulas', 'portugues', 'AulaClassesPalavras.tsx');

const mnemonics = {
  4: { tag: "SUB.RE.", text: "O Pronome **SUB**stitui ou **RE**fere-se." },
  5: { tag: "F.E.A.", text: "O Verbo foca na **F**lexão, **E**strutura e **A**specto." },
  6: { tag: "C.I.L.A.", text: "O Advérbio foca na **C**ircunstância, **I**nvariabilidade, **L**ógica e **A**djunto." },
  7: { tag: "L.I.G.A.", text: "A Preposição **L**iga, **I**ndica, **G**overna e **A**ssocia." },
  8: { tag: "C.O.N.E.", text: "A Conjunção **C**onecta, **O**rdena, **N**exa e **E**strutura." },
  9: { tag: "E.M.O.", text: "A Interjeição expressa **E**moção, **M**ovimento e **O**rdem." },
  10: { tag: "C.O.F.M.", text: "O Numeral indica **C**ardinal, **O**rdinal, **F**racionário e **M**ultiplicativo." }
};

const modulesData = [
  { id: 1, name: "O Substantivo", desc: "A classe que nomeia os seres e as coisas.", quiz: "QUIZ_M1_SUBSTANTIVO" },
  { id: 2, name: "O Adjetivo e o Artigo", desc: "A classe que caracteriza e o determinante do substantivo.", quiz: "QUIZ_M2_ADJETIVO_ARTIGO" },
  { id: 3, name: "O Verbo (I)", desc: "Estrutura e flexões básicas do motor da frase.", quiz: "QUIZ_M3_VERBO_I" },
  { id: 4, name: "O Verbo (II)", desc: "Tempos, modos e a complexidade verbal.", quiz: "QUIZ_M4_VERBO_II" },
  { id: 5, name: "O Pronome (I)", desc: "O substituto estratégico e o mestre da coesão textual.", quiz: "QUIZ_M5_PRONOME_I" },
  { id: 6, name: "O Pronome (II)", desc: "Demonstrativos, Relativos e Indefinidos.", quiz: "QUIZ_M6_PRONOME_II" },
  { id: 7, name: "O Advérbio", desc: "A circunstância modificadora e invariável.", quiz: "QUIZ_M7_ADVERBIO" },
  { id: 8, name: "A Preposição", desc: "O elo de subordinação essencial para a regência.", quiz: "QUIZ_M8_PREPOSICAO_NUMERAL" },
  { id: 9, name: "A Conjunção", desc: "O cimento textual que articula ideias.", quiz: "QUIZ_M9_CONJUNCAO" },
  { id: 10, name: "O Numeral e Conclusão", desc: "A precisão da contagem e o domínio da Morfologia.", quiz: "QUIZ_M10_FINAL_CLASSES" }
];

const intros = {
  4: { title: "O Verbo: O Motor da Oração (Parte II)", desc: "Ação, estado, fenômeno e a complexidade temporal.", p: ["O **Verbo** é a classe de palavra variável que exprime **ação, estado, fenômeno da natureza ou processo**, situando o fato no **tempo**. Nesta segunda parte, focamos na profundidade das correlações temporais e no uso estratégico dos modos verbais.", "Imagine o verbo como o **'motor'** de uma máquina. Enquanto os substantivos são as peças estáticas, o verbo é o que lhes dá movimento e propósito. Ele conecta o sujeito ao seu destino, transformando uma lista de nomes em uma narrativa viva.", "A estrutura verbal se divide em **Radical**, **Vogal Temática** e **Desinências**. As flexões abrangem três **Modos** (Indicativo, Subjuntivo e Imperativo), três **Vozes** (Ativa, Passiva e Reflexiva).", "Em manuais de **operação da Petrobras**, o uso do modo **Imperativo** e do **Infinitivo** é vital para a segurança operacional. Instruções como 'Verifique a pressão' não admitem ambiguidade temporal. Um erro na interpretação de um tempo verbal pode ser crítico.", "A **Cesgranrio** é famosa por cobrar a **Correlação Verbal** e os tempos do **Subjuntivo**. A banca testa se o candidato sabe que um futuro do pretérito exige um imperfeito do subjuntivo correspondente ('Eu iria se você viesse')."] },
  5: { title: "O Pronome: O Mestre da Coesão", desc: "Substituição, referência e a economia vocabular.", p: ["O **Pronome** é a classe de palavra variável que tem como função primordial **substituir** ou **referir-se** a um substantivo (ou a uma oração inteira). Diferente do substantivo, que possui significado léxico próprio, o pronome possui significado **gramatical ou de contexto**.", "Imagine o pronome como o **'dublê'** de um ator principal (o substantivo). Quando o substantivo precisa descansar para não cansar o leitor, o pronome entra em cena para manter a história andando sem repetições exaustivas. Sem os pronomes, textos seriam exaustivos.", "A tipologia pronominal é vasta: **Pessoais** (eu, tu, ele), **Possessivos** (meu, teu, seu), **Demonstrativos** (este, esse, aquele), **Relativos** (que, cujo) e **Indefinidos** (alguém, tudo).", "Em manuais da **Petrobras**, o uso de pronomes demonstrativos e relativos é uma questão de **segurança**. Ao ler 'O inspetor identificou a falha no motor; **esta** exige reparo', o pronome 'esta' refere-se à falha, evitando confusões perigosas.", "A **Cesgranrio** foca intensamente em **Colocação Pronominal** e no uso do pronome relativo **CUJO**. Lembre-se que 'cujo' indica posse, nunca aceita artigo após si e concorda com o 'possuído'."] },
  6: { title: "O Pronome (II): Referenciação Avançada", desc: "Domínio dos relativos e demonstrativos no texto técnico.", p: ["A segunda parte do estudo dos **Pronomes** foca nos elementos de coesão anafórica e catafórica. Os pronomes **Relativos** (que, qual, cujo, onde) são fundamentais para criar orações subordinadas adjetivas, enquanto os **Demonstrativos** situam o objeto no tempo, espaço ou texto.", "Nesta fase, o pronome atua como o **'GPS'** do leitor. Ele indica onde estamos no texto e a quem exatamente estamos nos referindo, impedindo que a atenção do usuário se perca em frases ambíguas ou mal estruturadas.", "O domínio do pronome **CUJO** é o divisor de águas entre o candidato amador e o profissional. Ele é o único pronome que exige um substantivo antes e depois, indicando uma relação de posse indissolúvel entre ambos.", "Em **relatórios de incidentes** da Petrobras, a precisão do pronome relativo 'onde' (apenas para lugares físicos) vs 'em que' (para situações) é monitorada para manter o rigor técnico da comunicação escrita.", "A **Cesgranrio** foca na substituição de elementos por pronomes relativos adequados e na análise do termo antecedente. Errar o 'cujo' ou usar 'onde' para tempo é um erro fatal na redação e nas questões de gramática."] },
  7: { title: "O Advérbio: A Circunstância", desc: "O modificador invariável que dá tom e precisão às ações.", p: ["O **Advérbio** é a classe de palavra **invariável** que especifica a **circunstância** em que ocorre um fato (tempo, lugar, modo, causa). Ele modifica o **verbo**, o **adjetivo** ou um **outro advérbio**, mantendo-se estático.", "Pense no advérbio como o **'filtro'** de uma câmera. Ele não muda o objeto, mas altera a forma como o percebemos. Dizer que alguém está 'cansado' é uma coisa; dizer que está **'extremamente'** cansado muda a intensidade.", "A classificação é semântica: **Lugar** (aqui, lá), **Tempo** (ontem, logo), **Modo** (bem, calmamente), **Intensidade** (muito). Muitos terminam em **'-mente'**.", "Em relatórios técnicos da **Petrobras**, advérbios de lugar e modo são cruciais. Ao descrever que uma válvula opera **'intermitentemente'** em vez de **'continuamente'**, o técnico fornece dados vitais.", "A **Cesgranrio** foca na distinção entre o **Advérbio** e o **Adjetivo** em funções 'camaleão'. Lembre-se do teste de ouro: se a palavra variar para o plural, é adjetivo; se ficar estática, é advérbio."] },
  8: { title: "A Preposição: O Elo de Ligação", desc: "Subordinação, regência e o caminho para a crase.", p: ["A **Preposição** é a classe de palavra **invariável** que liga dois termos, estabelecendo uma relação de dependência ou subordinação. O primeiro termo é o regente e o segundo o regido.", "Imagine a preposição como um **'elo de corrente'**. Ela não tem significado completo sozinha, mas é essencial para que os outros termos funcionem juntos. É ela que nos diz se o café é 'com' ou 'sem' açúcar.", "As preposições podem ser **Essenciais** (ante, após, até, com, contra, de, por, sem). Elas também se unem a outras palavras por **Combinação** (ao) ou **Contração** (do).", "No cotidiano da **Petrobras**, as preposições regem a lógica dos **contratos**. A diferença entre 'inspeção DA plataforma' (posse) e 'inspeção NA plataforma' (lugar) define a responsabilidade jurídica.", "A **Cesgranrio** foca na **Regência Verbal e Nominal**, testando se o candidato sabe qual preposição cada termo exige. O domínio das preposições é o pilar fundamental para não errar a **Crase**."] },
  9: { title: "A Conjunção: O Cimento do Texto", desc: "Conectivos que articulam ideias, causas e consequências.", p: ["A **Conjunção** é a classe de palavra **invariável** que liga orações ou termos de mesma função, estabelecendo relações coordenadas ou subordinadas. Ela é o arquiteto que constrói o raciocínio.", "Imagine a conjunção como o **'cimento'** de uma parede de tijolos. Sem o cimento, os tijolos caem ou ficam amontoados sem ordem. A conjunção define se um fato é a **causa** ou a **oposição**.", "Dividem-se em **Coordenativas** (independentes) e **Subordinativas** (dependentes). Cada uma carrega um valor semântico que altera o rumo da argumentação, sendo a ferramenta primordial da coesão.", "Em **pareceres técnicos** da Petrobras, o uso de conjunções conclusivas e concessivas é fundamental. 'Embora o custo seja alto, a manutenção é necessária' usa a concessão estrategicamente.", "A **Cesgranrio** ama questões de **valor semântico** das conjunções. Frequentemente pede para substituir um 'conquanto' por um 'embora' ou um 'porquanto' por um 'porque'."] },
  10: { title: "O Numeral e a Interjeição", desc: "A precisão dos dados e a força da emoção.", p: ["O **Numeral** indica quantidade exata ou posição, trazendo a frieza dos dados. A **Interjeição** exprime emoções ou apelos súbitos, funcionando como uma unidade de sentido completa e condensada.", "Imagine o numeral como a **'régua'** e a interjeição como o **'emoji'** do texto. Um traz a exatidão métrica necessária para projetos técnicos, enquanto o outro traz o colorido emocional da linguagem humana.", "Os numerais classificam-se em Cardinais, Ordinais, Fracionários e Multiplicativos. As interjeições são invariáveis e quase sempre marcadas pelo ponto de **exclamação**.", "Na **Petrobras**, a precisão dos numerais é o coração da gestão de estoques, enquanto as interjeições de **apelo** (Cuidado! Atenção!) são vitais para a segurança e prevenção de acidentes em campo.", "A **Cesgranrio** foca na escrita por extenso e concordância dos numerais, além de testar a percepção do tom emocional em textos literários através das interjeições."] }
};

function buildFile() {
  let out = `"use client";

import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaProps,
  VideoModal,
  AulaTemplate,
} from "../shared";
import { getAllModuleVariants } from "@/lib/moduleColors";
import {
  QUIZ_M1_SUBSTANTIVO,
  QUIZ_M2_ADJETIVO_ARTIGO,
  QUIZ_M3_VERBO_I,
  QUIZ_M4_VERBO_II,
  QUIZ_M5_PRONOME_I,
  QUIZ_M6_PRONOME_II,
  QUIZ_M7_ADVERBIO,
  QUIZ_M8_PREPOSICAO_NUMERAL,
  QUIZ_M9_CONJUNCAO,
  QUIZ_M10_FINAL_CLASSES,
} from "./data/classes-palavras-quizzes";

import {
  LuBookOpen,
  LuCirclePlay,
  LuMonitor,
  LuBrain,
  LuMusic,
  LuCheck,
} from "react-icons/lu";

export default function AulaClassesPalavras({ onComplete }: AulaProps) {
  const [mv, setMv] = useState<any>([]);

  useEffect(() => {
    setMv(getAllModuleVariants(10, "portugues"));
  }, []);

  const handleModuleComplete = useCallback((moduleId: string, score: number) => {
    console.log(\`Modulo \${moduleId} completo: \${score}\`);
  }, []);

  if (mv.length === 0) return null;

  return (
    <AulaTemplate
      titulo="As 10 Classes de Palavras"
      materia="Português"
      moduloAtivo="modulo-1"
    >\n`;

  // MÓDULOS 1-10
  for(let i=1; i<=10; i++) {
    const mod = modulesData.find(m => m.id === i) || {name: "Módulo "+i, desc: ""};
    const intro = intros[i];
    const mn = mnemonics[i];
    const quizName = mod.quiz;

    out += `
      <TabsContent value="modulo-${i}" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={${i}} 
          titulo="${mod.name}" 
          descricao="${mod.desc}" 
          variant={mv[${i}]} 
        />\n`;

    // RICH INTRO (M4-M10)
    if (intro) {
      out += `
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="${intro.title}"
            description="${intro.desc}"
            variant={mv[${i}]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            ${intro.p.map(p => `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`).join('\n            ')}

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: ${mn ? mn.tag : "MOD-"+i}</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: ${mn ? mn.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : "A classe " + mod.name + " é fundamental."}
              </p>
            </div>
          </div>
        </section>\n`;
    }

    // CONTEÚDO TÉCNICO (Placeholder)
    out += `
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[${i}]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para ${mod.name}...</p>
        </section>\n`;

    // MESA DE REVISÃO
    out += `
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[${i}]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: ${mod.name}" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "${mod.name}", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M${i}: ${mod.name}" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: ${mn ? mn.tag : "M"+i}</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">${mn ? mn.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : "Foco total na classe gramatical!"}</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>\n`;

    out += `
        <section className="mt-16">
          <QuizInterativo questoes={${quizName} || []} titulo="QUIZ: ${mod.name}" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-${i}", score)} variant={mv[${i}]} />
        </section>
      </TabsContent>\n`;
  }

  // BANNER DE CONCLUSÃO
  out += `
      <TabsContent value="conclusao" className="space-y-12 mt-12">
        <section className="mt-24 mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-12 text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <LuBookOpen className="text-5xl text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic underline decoration-blue-500 decoration-4 underline-offset-8">
                Morfologia Dominada!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Você concluiu a maratona das 10 classes de palavras. Agora você
                possui a base sólida para enfrentar sintaxe, regência e
                concordância na Cesgranrio!
              </p>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-0 font-black text-xl px-16 py-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest flex items-center gap-4 mx-auto"
              >
                Concluir Aula de Elite <LuCheck className="text-2xl" />
              </Button>
            </div>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}`;

  fs.writeFileSync(targetPath, out);
  console.log("💎 REGENERATION SUCCESSFUL!");
}

buildFile();
