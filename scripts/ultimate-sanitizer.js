const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'aulas', 'portugues', 'AulaClassesPalavras.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const mnemonics = {
  4: { tag: "SUB.RE.", text: "O Pronome **SUB**stitui ou **RE**fere-se." },
  5: { tag: "F.E.A.", text: "O Verbo foca na **F**lexão, **E**strutura e **A**specto." },
  6: { tag: "C.I.L.A.", text: "O Advérbio foca na **C**ircunstância, **I**nvariabilidade, **L**ógica e **A**djunto." },
  7: { tag: "L.I.G.A.", text: "A Preposição **L**iga, **I**ndica, **G**overna e **A**ssocia." },
  8: { tag: "C.O.N.E.", text: "A Conjunção **C**onecta, **O**rdena, **N**exa e **E**strutura." },
  9: { tag: "E.M.O.", text: "A Interjeição expressa **E**moção, **M**ovimento e **O**rdem." },
  10: { tag: "C.O.F.M.", text: "O Numeral indica **C**ardinal, **O**rdinal, **F**racionário e **M**ultiplicativo." }
};

const intros = {
  4: { title: "O Pronome: O Mestre da Coesão", desc: "Substituição, referência e a economia vocabular.", p: ["O **Pronome** é a classe de palavra variável que tem como função primordial **substituir** ou **referir-se** a um substantivo (ou a uma oração inteira). Diferente do substantivo, que possui significado léxico próprio, o pronome possui significado **gramatical ou de contexto**, dependendo de quem fala e de quem se fala.", "Imagine o pronome como o **'dublê'** de um ator principal (o substantivo). Quando o substantivo precisa descansar para não cansar o leitor, o pronome entra em cena para manter a história andando sem repetições exaustivas. Sem os pronomes, textos longos se tornariam uma ladainha de nomes repetidos; com eles, criamos elos de **referenciação**.", "A tipologia pronominal é vasta: **Pessoais** (eu, tu, ele), **Possessivos** (meu, teu, seu), **Demonstrativos** (este, esse, aquele), **Relativos** (que, cujo) e **Indefinidos** (alguém, tudo). A flexão é complexa, abrangendo gênero, número e o **caso** (Reto vs Oblíquo).", "Em manuais da **Petrobras**, o uso de pronomes demonstrativos e relativos é uma questão de **segurança**. Ao ler 'O inspetor identificou a falha no motor; **esta** exige reparo', o pronome 'esta' refere-se à falha, evitando confusões perigosas na manutenção técnica.", "A **Cesgranrio** foca intensamente em **Colocação Pronominal** e no uso do pronome relativo **CUJO**. Lembre-se que 'cujo' indica posse, nunca aceita artigo após si e concorda com o 'possuído'. Além disso, pronomes retos (eu, tu) não podem ser objeto direto."] },
  5: { title: "O Verbo: O Motor da Oração", desc: "Ação, estado, fenômeno e a complexidade temporal.", p: ["O **Verbo** é a classe de palavra variável que exprime **ação, estado, fenômeno da natureza ou processo**, situando o fato no **tempo**. É a classe gramatical mais complexa e flexível, sendo capaz de indicar pessoa, momento e atitude do falante (certeza, dúvida ou ordem).", "Imagine o verbo como o **'motor'** de uma máquina. Enquanto os substantivos são as peças estáticas, o verbo é o que lhes dá movimento e propósito. Ele conecta o sujeito ao seu destino, transformando uma lista de nomes em uma narrativa viva.", "A estrutura verbal se divide em **Radical**, **Vogal Temática** e **Desinências**. As flexões abrangem três **Modos** (Indicativo, Subjuntivo e Imperativo), três **Vozes** (Ativa, Passiva e Reflexiva) e uma miríade de **Tempos** cronológicos.", "Em manuais de **operação da Petrobras**, o uso do modo **Imperativo** e do **Infinitivo** é vital para a segurança operacional. Instruções como 'Verifique a pressão' não admitem ambiguidade temporal. Um erro na interpretação de um tempo verbal pode ser crítico.", "A **Cesgranrio** é famosa por cobrar a **Correlação Verbal** e os tempos do **Subjuntivo**. A banca testa se o candidato sabe que um futuro do pretérito exige um imperfeito do subjuntivo correspondente ('Eu iria se você viesse')."] },
  6: { title: "O Advérbio: A Circunstância", desc: "O modificador invariável que dá tom e precisão às ações.", p: ["O **Advérbio** é a classe de palavra **invariável** que especifica a **circunstância** em que ocorre um fato (tempo, lugar, modo, causa). Ele modifica o **verbo**, o **adjetivo** ou um **outro advérbio**, mantendo-se estático em gênero e número.", "Pense no advérbio como o **'filtro'** de uma câmera. Ele não muda o objeto, mas altera a forma como o percebemos. Dizer que alguém está 'cansado' é uma coisa; dizer que está **'extremamente'** cansado muda a intensidade e o foco da mensagem.", "A classificação é semântica: **Lugar** (aqui, lá), **Tempo** (ontem, logo), **Modo** (bem, calmamente), **Intensidade** (muito), **Negação** (não), **Afirmação** (sim) e **Dúvida** (talvez). Muitos terminam em **'-mente'**.", "Em relatórios técnicos da **Petrobras**, advérbios de lugar e modo são cruciais. Ao descrever que uma válvula opera **'intermitentemente'** em vez de **'continuamente'**, o técnico fornece dados vitais para os diagnósticos de falha.", "A **Cesgranrio** foca na distinção entre o **Advérbio** e o **Adjetivo** em funções 'camaleão'. Lembre-se do teste de ouro: se a palavra variar para o plural, é adjetivo; se ficar estática, é advérbio ('Eles falam baixo' vs 'Eles são baixos')."] },
  7: { title: "A Preposição: O Elo de Ligação", desc: "Subordinação, regência e o caminho para a crase.", p: ["A **Preposição** é a classe de palavra **invariável** que liga dois termos, estabelecendo uma relação de dependência ou subordinação. O primeiro termo é o regente e o segundo o regido. Sem ela, as palavras estariam soltas, sem um fio condutor lógico.", "Imagine a preposição como um **'elo de corrente'**. Ela não tem significado completo sozinha, mas é essencial para que os outros termos funcionem juntos. É ela que nos diz se o café é 'com' ou 'sem' açúcar, mudando a realidade da frase com poucas letras.", "As preposições podem ser **Essenciais** (ante, após, até, com, contra, de, por, sem) ou **Acidentais** (como, segundo). Elas também se unem a outras palavras por **Combinação** (ao = a + o) ou **Contração** (do = de + o).", "No cotidiano da **Petrobras**, as preposições regem a lógica dos **contratos** e das **normas técnicas**. A diferença entre 'inspeção DA plataforma' (posse) e 'inspeção NA plataforma' (lugar) define a responsabilidade jurídica e operacional em campo.", "A **Cesgranrio** foca na **Regência Verbal e Nominal**, testando se o candidato sabe qual preposição cada termo exige. Verbos como 'aspirar' (desejar) e 'assistir' (ver) exigem a preposição 'a'. O domínio das preposições é o pilar fundamental para não errar a **Crase**."] },
  8: { title: "A Conjunção: O Cimento do Texto", desc: "Conectivos que articulam ideias, causas e consequências.", p: ["A **Conjunção** é a classe de palavra **invariável** que liga orações ou termos de mesma função, estabelecendo relações coordenadas ou subordinadas. Ela é o arquiteto que constrói o raciocínio complexo do texto.", "Imagine a conjunção como o **'cimento'** de uma parede de tijolos. Sem o cimento, os tijolos caem ou ficam amontoados sem ordem. A conjunção define se um fato é a causa do outro ('porque'), se é uma oposição ('mas') ou se é uma condição ('se').", "Dividem-se em **Coordenativas** (independentes) e **Subordinativas** (dependentes). Cada uma carrega um valor semântico que altera o rumo da argumentação, sendo a ferramenta primordial da inteligibilidade textual e da coesão lógica.", "Em **pareceres técnicos** da Petrobras, o uso de conjunções conclusivas e concessivas é fundamental. 'Embora o custo seja alto, a manutenção é necessária' usa a concessão para justificar um investimento estratégico através de uma ressalva ética.", "A **Cesgranrio** ama questões de **valor semântico** das conjunções. Frequentemente pede para substituir um 'conquanto' por um 'embora' ou um 'porquanto' por um 'porque', testando o entendimento e os ajustes nos modos verbais exigidos."] },
  9: { title: "A Interjeição: A Emoção Viva", desc: "A expressão dos sentimentos e o tom da comunicação.", p: ["A **Interjeição** é a classe de palavra **invariável** que exprime emoções, estados de espírito ou apelos súbitos. Funciona como uma unidade de sentido completa, condensando toda uma reação emocional do falante diante de um contexto.", "Pense nela como o **'emoji'** do texto. Ela dá o colorido emocional que as palavras frias às vezes não conseguem transmitir. Um simples 'Ah!' pode significar alegria, dor ou ironia, dependendo puramente da entonação e da situação do discurso.", "Não exerce função sintática propriamente dita; é um **apêndice emocional**. Pode indicar alegria (oba!), dor (ai!), surpresa (nossa!) ou desejo (oxalá!). Sua pontuação é quase sempre marcada pelo ponto de **exclamação**.", "Em canais de **emergência** na Petrobras, interjeições de **apelo** (Cuidado! Atenção! Fogo!) são as palavras mais rápidas e eficazes para prevenir acidentes, gerando uma reação instintiva e imediata de preservação em campo.", "A **Cesgranrio** insere interjeições em textos literários ou discursos para testar a percepção do candidato sobre o **tom do texto** e as regras sutis de **pontuação** (como o uso da vírgula após a interjeição em vez da exclamação direta)."] },
  10: { title: "O Numeral: A Precisão Quantitativa", desc: "Contagem, ordenação e a exatidão dos dados.", p: ["O **Numeral** é a classe de palavra que indica **quantidade exata** de seres ou a **posição** que eles ocupam em uma série. Trazem a frieza e a precisão dos dados, sendo fundamentais para a objetividade da comunicação técnica.", "Imagine o numeral como a **'régua'** do texto. Ele retira qualquer margem de dúvida sobre 'quanto' ou 'qual', substituindo conceitos genéricos por dados concretos de produção ou cronogramas de projeto físico em relatórios técnicos.", "Eles classificam-se em: **Cardinais** (um, cem), **Ordinais** (primeiro), **Fracionários** (meio, terço) e **Multiplicativos** (dobro, triplo). Alguns numerais admitem flexão de gênero e número, trazendo concordância à frase.", "A precisão dos numerais é o coração da **gestão de estoques** na Petrobras. Um relatório que indica o 'terço' da capacidade produtiva ou 'duzentas' unidades de um componente exige leitura literal, pois impacta diretamente nos custos e na logística.", "A **Cesgranrio** foca na **Escrita por Extenso** e na **Concordância** dos numerais. Questões clássicas envolvem o uso de 'ambos' and a distinção entre numerais e artigos indefinidos (um/uns), onde o contexto determina a função literal."] }
};

function generateRichIntro(id) {
  const intro = intros[id];
  const mn = mnemonics[id];
  if (!intro) return "";

  return `
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="${intro.title}"
            description="${intro.desc}"
            variant={mv[${id}]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            ${intro.p.map(p => `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`).join('\n\n            ')}

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: ${mn.tag}</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: ${mn.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
              </p>
            </div>
          </div>
        </section>\n\n        `;
}

function generateMesaRevisao(id, tag, mnem) {
  const name = intros[id] ? intros[id].title.split(':')[0] : "Modulo";
  return `
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={7} title="Mesa de Revisão" variant={mv[${id}]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Resumo: ${name}"
                        duration="12:00"
                        thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    images={[ { title: "${name}", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]}
                    moduloNome="M${id}: ${name}"
                  />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: ${tag}</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">${mnem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
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
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <LuMusic className="w-10 h-10 text-blue-500" />
                    </div>
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>\n\n        `;
}

console.log("🛠️ Iniciando ULTIMATE ORCHESTRATOR V4 (Unificação Total)...");

const parts = content.split('<TabsContent');
const newContentParts = [parts[0]];

for (let i = 1; i < parts.length; i++) {
   let part = '<TabsContent' + parts[i];
   const match = part.match(/value="modulo-(\d+)"/i);
   
   if (match) {
       const id = parseInt(match[1]);
       console.log(`🏗️ Processando Módulo ${id}...`);

       // 1. Limpeza de Entulho (M4-M10)
       if (id >= 4) {
           // Encontrar o banner do módulo
           const bannerRegex = new RegExp(`<ModuleBanner[\\s\\S]*?numero={${id}}[\\s\\S]*?/>`, "i");
           const bannerMatch = part.match(bannerRegex);
           
           if (bannerMatch) {
               const banner = bannerMatch[0];
               const bannerIdx = part.indexOf(banner);
               
               // Injetar Rich Intro
               const richIntro = generateRichIntro(id);
               
               // Remover intro antiga se existir (tudo entre o banner e a próxima seção)
               // E injetar a nova.
               const remainder = part.substring(bannerIdx + banner.length);
               const nextHeaderRegex = /<ModuleSectionHeader[\s\S]*?index={([12])}/i;
               const nextHeaderMatch = remainder.match(nextHeaderRegex);
               
               let cleanRemainder = remainder;
               if (nextHeaderMatch && (nextHeaderMatch[1] === "1" || remainder.substring(0, 300).includes("RICH INTRO"))) {
                   const headerPos = remainder.indexOf(nextHeaderMatch[0]);
                   const nextSectionMatch = remainder.substring(headerPos + 10).match(/<section/i);
                   if (nextSectionMatch) {
                       const nextSectionPos = headerPos + 10 + remainder.substring(headerPos + 10).indexOf(nextSectionMatch[0]);
                       cleanRemainder = remainder.substring(nextSectionPos);
                   }
               }
               
               part = part.substring(0, bannerIdx + banner.length) + richIntro + cleanRemainder;
           }
       }

       // 2. Injeção da Mesa de Revisão (M1-M10)
       // Achar o QuizInterativo (fim do conteúdo de texto)
       const quizRegex = /<QuizInterativo[\s\S]*?\/>/i;
       const quizMatch = part.match(quizRegex);
       
       if (quizMatch && intros[id]) {
           const quiz = quizMatch[0];
           const quizIdx = part.indexOf(quiz);
           const beforeQuiz = part.substring(0, quizIdx);
           
           // Remover seções de mídia antigas (LessonTabs, Resumo e Multimídia, etc.)
           let cleanBeforeQuiz = beforeQuiz.replace(/<section[\s\S]*?Resumo e Multimídia[\s\S]*?<\/section>/gi, '');
           cleanBeforeQuiz = cleanBeforeQuiz.replace(/<section[\s\S]*?LessonTabs[\s\S]*?<\/section>/gi, '');
           
           const mesa = generateMesaRevisao(id, mnemonics[id].tag, mnemonics[id].text);
           part = cleanBeforeQuiz + mesa + part.substring(quizIdx);
       }
   }
   newContentParts.push(part);
}

let finalContent = newContentParts.join('');

// SANITIZAÇÃO FINAL
finalContent = finalContent.replace(/{\/\*[\s\S]*?\*\/}/g, ''); // Remover TODOS os comentários JSX para limpar o parser
finalContent = finalContent.replace(/text-foreground\/85 leading-relaxed text-lg text-justify text-foreground\/85 leading-relaxed/g, 'text-foreground/85 leading-relaxed text-lg text-justify');
finalContent = finalContent.replace(/<\/section>\s*<\/section>/g, '</section>');

fs.writeFileSync(filePath, finalContent);
console.log("💎 UNIFICAÇÃO V4 COMPLETA! Aula pronta para o Ar.");
