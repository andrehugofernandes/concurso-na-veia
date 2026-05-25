const fs = require('fs');

let code = fs.readFileSync('c:\\Workspace\\petrobras-quest\\src\\components\\aulas\\portugues\\AulaCrase.tsx', 'utf-8');

// The changes required are:
// 1. ModuleSectionHeader index={1} for the intros -> index="INTRO"
// 2. Expand intros to 5 paragraphs.
// 3. FlipCard frente layouts to be "Massete Visual".

// First, let's identify all FlipCards that need the Massete Visual layout.
// They look like: <FlipCard\s+frente={<div className="font-bold text-lg">.*?<\/div>}\s+verso={
// We will replace them with the richer layout.

const flipCardRegex = /<FlipCard\s+frente={<div className="font-bold text-lg">(.*?)<\/div>}\s+verso=\{/g;
code = code.replace(flipCardRegex, (match, title) => {
  // Extract emoji and text from title
  const matchEmoji = title.match(/^([^a-zA-Z\s]+)\s*(.*)/);
  let emoji = "💡";
  let text = title;
  if (matchEmoji) {
    emoji = matchEmoji[1].trim();
    text = matchEmoji[2].trim();
  }
  
  return `<FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-primary/10 rounded-full shadow-inner ring-1 ring-primary/20 text-3xl">
                      ${emoji}
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      ${text}
                    </span>
                    <span className="text-sm text-primary/80 font-medium">
                      Ponto de Atenção
                    </span>
                  </div>
                }
                verso={`;
});

// Replace Intro Module 2
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="A Engenharia do Teste" variant=\{mv\[2\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="A Engenharia do Teste do Masculino"
            description="O método definitivo para verificar a presença de artigo feminino oculto."
            variant={mv[2]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O Teste do Masculino é, indiscutivelmente, a ferramenta mais poderosa e pragmática para a resolução de questões de crase em provas de concursos, especialmente as da banca CESGRANRIO. A premissa estrutural do teste baseia-se na simetria de gênero da língua portuguesa. Se a crase ocorre pela fusão da preposição "a" com o artigo definido feminino "a" (ou "as"), ao substituirmos a palavra feminina regida por um substantivo masculino equivalente, devemos necessariamente encontrar a combinação da preposição "a" com o artigo definido masculino "o" (ou "os"), resultando na contração "ao" ou "aos".
            </p>
            <p>
              A aplicação do método é direta e lógica: quando nos deparamos com uma estrutura como "Vou a farmácia" e há dúvida sobre a existência de crase, basta substituir "farmácia" (substantivo feminino) por "supermercado" ou "mercado" (substantivo masculino). A construção resultante é "Vou AO supermercado". O aparecimento do "ao" comprova, de forma irrefutável, que o verbo "ir" exige a preposição "a" e que o substantivo exige o artigo. Logo, ao retornar para a palavra feminina, a fusão (A + A) é confirmada, e a forma correta é "Vou à farmácia".
            </p>
            <p>
              É fundamental compreender que não basta a palavra feminina ser substituída; a estrutura da frase deve ser mantida. Caso a substituição resulte apenas em "o" (ex: "Visitei a farmácia" → "Visitei o supermercado"), fica evidente que apenas o artigo está presente. O verbo "visitar" é transitivo direto e não exige preposição. Portanto, não há crase ("Visitei a farmácia" sem acento grave). Da mesma forma, se resultar apenas em "a" (preposição), sem fusão, também não há crase (ex: "Fui a pé" → "Fui a cavalo").
            </p>
            <p>
              Na redação técnica e na comunicação corporativa da Petrobras, a precisão proporcionada por este teste evita ambiguidades em manuais, relatórios e e-mails normativos. Dizer "Reportou-se à gerência" (ao diretor) traz uma clareza estrutural diferente de "Avaliou a gerência" (o diretor). A crase, portanto, atua como uma bússola sintática que orienta o leitor sobre a função de cada termo na oração, sendo o Teste do Masculino o instrumento primário de calibração.
            </p>
            <p>
              Em provas, a banca tenta induzir o candidato ao erro utilizando palavras femininas abstratas ou locuções onde a substituição não parece imediata. A regra de ouro é: substitua por qualquer palavra masculina, não precisa ser sinônimo perfeito, desde que cumpra a mesma função sintática. A mecânica da regência não altera as propriedades lógicas da frase; ela apenas expõe o esqueleto oculto da oração, transformando a decoreba em uma constatação puramente analítica.
            </p>
          </div>`
);

// Replace Intro Module 3
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="A Incompatibilidade Lógica" variant=\{mv\[3\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="A Incompatibilidade Lógica: Verbos e a Crase"
            description="Entenda por que verbos repelem artigos e inviabilizam a fusão da crase."
            variant={mv[3]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Um dos erros gramaticais mais letais e facilmente evitáveis no uso da língua portuguesa é a colocação do acento grave indicativo de crase diante de verbos. A regra é categórica, absoluta e não admite flexibilizações: <strong>nunca se usa crase antes de verbos</strong>. Para internalizar essa proibição, é crucial compreender a natureza das classes gramaticais envolvidas na equação da crase, em vez de recorrer apenas à memorização mecânica da regra.
            </p>
            <p>
              Retornemos à equação fundamental: Crase = Preposição (a) + Artigo Definido Feminino (a). O papel exclusivo dos artigos, sejam definidos ou indefinidos, é determinar ou indeterminar <strong>substantivos</strong>. Verbos indicam ações, estados ou fenômenos da natureza; eles não possuem gênero (masculino/feminino) e, por sua própria natureza sintática e morfológica, jamais admitem a anteposição de um artigo. Sem artigo, a fusão matemática da crase torna-se impossível.
            </p>
            <p>
              Ao analisarmos uma oração como "Ele começou a falar", a partícula "a" atua solitariamente como preposição exigida pela locução verbal aspectual de início de ação ("começar a"). O verbo "falar", no infinitivo, não aceita determinante. Tentar colocar uma crase nessa construção implicaria assumir a existência de um "a" artigo antes do verbo, criando uma aberração gramatical. A preposição permanece pura e inalterada, sem acento grave.
            </p>
            <p>
              No ambiente corporativo e operacional da Petrobras, relatórios frequentes utilizam construções com infinitivos. Expressões como "procedimento a ser adotado", "passamos a operar", "disposto a negociar" e "voltar a funcionar" são corriqueiras e devem estar impecavelmente corretas. Um desvio dessa regra elementar em um documento oficial demonstra desatenção aos princípios mais básicos da norma culta e compromete a qualidade da redação técnica.
            </p>
            <p>
              A CESGRANRIO tem predileção especial por explorar essa regra em suas questões, frequentemente inserindo verbos após a preposição "a" em alternativas que tentam confundir o candidato pelo som ou pelo paralelismo falso. Construções traiçoeiras como "estou apto a estudar" (onde "apto" exige "a", mas "estudar" é verbo) são clássicas. A tática de resolução é cirúrgica: encontrou o "a" antes de um verbo? Elimine a alternativa que contém a crase instantaneamente.
            </p>
          </div>`
);

// Replace Intro Module 4
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="O Escudo dos Pronomes" variant=\{mv\[4\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="O Escudo dos Pronomes: A Regulação do Artigo"
            description="Compreenda como os pronomes bloqueiam a crase ao rejeitarem artigos femininos."
            variant={mv[4]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A relação entre pronomes e a crase é governada por uma premissa gramatical estrita: a grande maioria dos pronomes repudia a presença do artigo definido. Como a crase exige a soma de uma preposição "a" com um artigo feminino "a", a ausência deste último inviabiliza a fusão matemática. Este fenômeno cria o que podemos chamar de "zona de bloqueio", onde o acento grave é terminantemente proibido diante de pronomes pessoais, indefinidos, relativos (com exceção de "a qual") e tratamento.
            </p>
            <p>
              Analisemos os pronomes pessoais (eu, tu, ele, nós, vós, eles; me, te, se, o, a, lhe; mim, ti, si). Expressões como "Entreguei o relatório <strong>a</strong> ela" ou "Refiro-me <strong>a</strong> você" ilustram a impossibilidade da crase. O verbo "entregar" ou "referir-se" fornece a preposição "a", mas os pronomes "ela" e "você" não aceitam artigo. Ninguém diz "A ela chegou", mas apenas "Ela chegou". O mesmo princípio aplica-se a pronomes indefinidos como "alguém", "ninguém", "todos", "cada", onde a crase é um erro categórico.
            </p>
            <p>
              Os pronomes de tratamento, fundamentais na comunicação corporativa, também compartilham dessa restrição. Com exceção de "Senhora", "Senhorita" e "Dona" (que admitem artigo), todos os demais pronomes de reverência repudiam a crase. Escreve-se corretamente "Solicito a Vossa Senhoria" ou "Dirijo-me a Sua Excelência", sem qualquer sinal grave. Apenas ao usar as exceções mencionadas a crase se efetiva, como em "Referi-me <strong>à</strong> Senhora Diretora".
            </p>
            <p>
              No cotidiano profissional de uma companhia da magnitude da Petrobras, a precisão no trato formal é um indicativo de excelência na comunicação. Erros na aplicação da crase antes de pronomes de tratamento em ofícios, memorandos ou e-mails formais comprometem a seriedade do documento. Compreender a lógica de que o pronome de tratamento (em sua maioria) não convive com artigos é o escudo perfeito contra deslizes gramaticais na redação oficial.
            </p>
            <p>
              A banca organizadora, atenta a essas nuances, costuma criar alternativas que parecem corretas pelo ritmo ou pela sonoridade da leitura, mas que escondem pronomes bloqueadores. A estratégia de resolução exige frieza analítica: ao identificar um "a" diante de pronome, ative o alerta. Se for pessoal, indefinido ou de tratamento (fora das exceções), elimine a crase sumariamente. Esse discernimento automatizado poupa tempo e garante o acerto em questões de nível intermediário e avançado.
            </p>
          </div>`
);

// Replace Intro Module 5
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="O Status dos Nomes Próprios" variant=\{mv\[5\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="O Status dos Nomes Próprios Femininos"
            description="Desvende a facultatividade da crase diante de nomes próprios de pessoas."
            variant={mv[5]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A regra da crase diante de nomes próprios femininos introduz o conceito gramatical de facultatividade. Enquanto muitas regras da norma culta ditam proibições ou obrigatoriedades absolutas, aqui a língua permite ao falante (ou escritor) a liberdade de escolha. Essa opcionalidade não decorre da preposição, mas sim do comportamento do <strong>artigo definido</strong> diante de prenomes na língua portuguesa.
            </p>
            <p>
              No português do Brasil, o uso do artigo antes de nomes próprios é considerado uma questão estilística ou regional. É igualmente correto afirmar "Joana é uma excelente engenheira" (sem artigo) ou "<strong>A</strong> Joana é uma excelente engenheira" (com artigo). Como o artigo é facultativo, a crase também se torna opcional quando um termo regente exige a preposição "a". Assim, "Entreguei o projeto <strong>a</strong> Joana" (só preposição) e "Entreguei o projeto <strong>à</strong> Joana" (preposição + artigo) estão gramaticalmente perfeitas.
            </p>
            <p>
              Existe, no entanto, um detalhe sintático que anula essa facultatividade: a <strong>especificação</strong>. Se o nome próprio feminino for determinado por um sobrenome, um título ou um adjetivo restritivo, o uso do artigo passa a ser compulsório para a manutenção do equilíbrio da oração. Consequentemente, a crase torna-se <strong>obrigatória</strong> se o termo anterior exigir preposição. Escreve-se, então, "Refiro-me <strong>à</strong> Joana Silva" ou "Dirigiu-se <strong>à</strong> ilustre Joana".
            </p>
            <p>
              No ambiente formal de trabalho, como nas comunicações oficiais da Petrobras, a tendência é evitar a familiaridade que o artigo confere aos nomes próprios. Por isso, em memorandos e documentos, frequentemente vemos construções sem a crase antes de nomes de colaboradores (ex: "Solicito <strong>a</strong> Mariana que revise o documento"). Contudo, para fins de prova, é vital lembrar que ambas as formas são chanceladas pelas gramáticas tradicionais.
            </p>
            <p>
              Nas questões da CESGRANRIO, o conhecimento dessa dicotomia (simples vs. especificado) é frequentemente cobrado. A banca tenta confundir o candidato misturando casos de crase obrigatória com casos facultativos na mesma alternativa. A técnica é identificar imediatamente se o nome próprio está sozinho (facultativo) ou acompanhado de determinantes (obrigatório), garantindo assim a eliminação precisa das alternativas distratoras.
            </p>
          </div>`
);

// Replace Intro Module 7
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="A Lógica do Tempo e da Proporção" variant=\{mv\[7\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="A Lógica do Tempo e da Proporção: Horas e Medidas"
            description="Entenda as nuances sintáticas na indicação de horas e expressões proporcionais."
            variant={mv[7]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A indicação de horas e expressões de medida constitui um dos territórios mais delicados do estudo da crase, pois envolve locuções fixas e regras de regência bastante específicas. Na indicação de <strong>horas exatas ou determinadas</strong>, a norma culta estabelece o uso obrigatório do acento indicativo de crase, fundindo a preposição "a" exigida pelo contexto temporal com o artigo definido feminino "as" que acompanha o numeral subentendido ("as horas").
            </p>
            <p>
              Construções como "A reunião começará <strong>às</strong> 14 horas" ou "Ele chegou <strong>à</strong> uma hora da tarde" são emblemáticas dessa exigência gramatical. A crase, neste contexto, atua como um marcador temporal rigoroso. Contudo, essa obrigatoriedade é imediatamente dissolvida caso a indicação de horas venha antecedida por preposições estruturais distintas, como "desde", "até", "após", "entre" ou "para". 
            </p>
            <p>
              Se dissermos "Aguardei desde as 10 horas", não há crase, pois a preposição "desde" já cumpre a função conectiva, restando apenas o artigo "as". Da mesma forma, em "Reunião marcada para as 15h" ou "Ele só chegará após as 18h", a preposição anterior anula a necessidade da preposição "a", rompendo a equação da crase. A única exceção peculiar é a preposição "até", que admite a crase facultativa: "Vou até as 14h" ou "Vou até às 14h".
            </p>
            <p>
              Na gestão de projetos e na elaboração de cronogramas da Petrobras, a precisão na grafia das horas não é um preciosismo estilístico, mas um imperativo de clareza operacional. Um documento que estabelece um prazo "das 8h as 17h" sem crase pode parecer desleixado. O correto, na indicação de intervalos, é a estrutura correlativa "das... às..." ("das 8h às 17h"), indicando "de + as" e "a + as".
            </p>
            <p>
              A banca examinadora frequentemente explora a confusão entre horas exatas e numerais cardinais não temporais. Um exemplo clássico de erro é colocar crase antes de quantias ou medidas gerais ("O projeto custou a partir de dois milhões" - sem crase). Para não cair em armadilhas, o candidato deve certificar-se de que o numeral efetivamente indica uma hora específica no relógio, e não uma quantidade genérica de tempo ("O voo durou duas horas" - sem crase).
            </p>
          </div>`
);

// Replace Intro Module 8
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="A Dinâmica da Especificação" variant=\{mv\[8\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="A Engenharia da Especificação: Casa, Terra e Distância"
            description="Por que as palavras 'casa', 'terra' e 'distância' subvertem as regras gerais."
            variant={mv[8]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O estudo da crase atinge seu nível de maior refinamento ao abordarmos o trio de palavras "casa", "terra" e "distância". Essas três palavras femininas possuem uma peculiaridade morfológica e semântica notável: em sua forma genérica e inespecífica, elas <strong>rejeitam o artigo definido feminino</strong>. Como o artigo é um dos componentes vitais da fusão da crase, a ausência dele inviabiliza o uso do acento grave quando essas palavras não possuem determinantes.
            </p>
            <p>
              Consideremos a palavra "casa" (no sentido de lar, domicílio do próprio falante). Ao dizermos "Retornarei a casa ao final do expediente", a preposição "a" exigida pelo verbo "retornar" encontra-se solitária, sem o artigo feminino. Contudo, a mecânica se inverte radicalmente assim que a "casa" é especificada ou determinada por um adjunto adnominal. Se dissermos "Retornarei <strong>à casa dos meus pais</strong>", a especificação ("dos meus pais") força o aparecimento do artigo "a", validando a equação da crase.
            </p>
            <p>
              A mesma lógica implacável governa a palavra "terra". Quando empregada em oposição a "mar" ou "bordo" (sentido de chão firme), ela repele o artigo: "Os marinheiros desceram a terra". Sem especificadores, a crase é gramaticalmente impossível. Mas, ao receber uma determinação, o artigo é imediatamente convocado: "O navio chegou <strong>à terra dos navegantes</strong>" ou "Retornou <strong>à terra natal</strong>". Neste último caso, a fusão de preposição e artigo exige o acento grave.
            </p>
            <p>
              A palavra "distância" fecha o trio seguindo rigorosamente a regra da determinação. Em locuções genéricas ("Ensino a distância", "Observou a distância"), a crase é proibida. Entretanto, se a medida da distância for especificada ou delimitada no contexto, a crase passa a ser obrigatória: "Os seguranças permaneceram <strong>à distância de cinquenta metros</strong>" ou "Identificou o vazamento <strong>à distância de um quilômetro</strong>".
            </p>
            <p>
              A CESGRANRIO testa exaustivamente essa regra em seus exames, exigindo do candidato um olhar clínico para identificar a presença ou ausência de termos especificadores (adjetivos, locuções adjetivas) associados a "casa", "terra" ou "distância". A estratégia de aprovação reside em não se deixar levar pelo "ouvidômetro" ou pela intuição fonética, mas em procurar ativamente pela existência de um determinante sintático logo após esses três substantivos.
            </p>
          </div>`
);

// Replace Intro Module 9
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="A Dinâmica dos Pronomes" variant=\{mv\[9\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="A Fusão Demonstrativa: Aquele, Aquela e Aquilo"
            description="Entenda como a preposição se funde com a vogal inicial dos pronomes demonstrativos."
            variant={mv[9]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Embora o conceito clássico da crase seja a fusão da preposição "a" com o artigo definido feminino "a", existe uma segunda e crucial manifestação deste fenômeno fonético: a fusão da preposição "a" com a vogal inicial "a" dos pronomes demonstrativos <strong>aquele(s)</strong>, <strong>aquela(s)</strong> e <strong>aquilo</strong>. Este é um cenário onde a regra parece subverter a lógica inicial de "palavras femininas", pois a crase pode ocorrer até mesmo diante de vocábulos masculinos ("àquele") ou neutros ("àquilo").
            </p>
            <p>
              A estrutura matemática da crase, contudo, permanece idêntica. Se o termo regente (verbo ou nome) exige a preposição "a" e o termo regido inicia-se com o pronome "aquele/aquela/aquilo", o choque das duas vogais "a" provoca a crase. Exemplo: O verbo "referir-se" exige a preposição "a". Ao juntá-lo com o pronome "aquele", temos: "Refiro-me A + Aquele" = "Refiro-me <strong>àquele</strong> documento". A lógica é perfeitamente simétrica, fonética e estrutural.
            </p>
            <p>
              A grande armadilha neste módulo reside no pronome "aquilo". Por ser uma palavra neutra e invariável, muitos candidatos assumem erroneamente que não pode haver crase diante dela. Contudo, a crase aqui não resulta da fusão com um artigo feminino, mas sim da fusão com a letra "A" que inicia a própria palavra "Aquilo". Logo, se o verbo exigir preposição, a crase será obrigatória: "Não dei atenção <strong>àquilo</strong>" (dar atenção A + Aquilo).
            </p>
            <p>
              Na redação técnica da Petrobras, a utilização de pronomes demonstrativos é recorrente para evitar repetições nominais excessivas. Frases como "O projeto atual assemelha-se <strong>àquele</strong> desenvolvido em 2020" ou "A nova diretriz sobrepõe-se <strong>àquela</strong> anterior" demonstram coesão textual de alto nível. O domínio dessa fusão prepositiva-demonstrativa é essencial para redigir memorandos e ofícios com rigor gramatical e clareza de referenciamento.
            </p>
            <p>
              A técnica de prova para resolver questões com esses pronomes é ainda mais simples do que o Teste do Masculino. Basta substituir o pronome "aquele/aquela/aquilo" por "a este/a esta/a isto" ou "a esse/a essa/a isso". Se, na frase reconstruída, a preposição "a" se mantiver evidente antes de "este" ou "esse", então a crase no pronome original é confirmada. Exemplo: "Refiro-me a este documento" garante que a forma correta é "Refiro-me <strong>àquele</strong> documento".
            </p>
          </div>`
);

// Replace Intro Module 10
code = code.replace(
  /<ModuleSectionHeader index=\{1\} title="O Arsenal Analítico" variant=\{mv\[10\]\} \/>\s*<div className="space-y-6 text-lg text-justify text-foreground\/85 leading-relaxed">\s*<p>.*?<\/p>\s*<\/div>/s,
  `<ModuleSectionHeader
            index="INTRO"
            title="O Arsenal Analítico: Consolidação Estrutural"
            description="Revisão final e metodologia de ataque para aniquilar qualquer questão de crase."
            variant={mv[10]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O domínio pleno da crase não se resume à memorização isolada das regras listadas nos módulos anteriores, mas à capacidade de aplicar a "Equação Fundamental" (A + A = À) de forma automatizada e sistêmica. O Simulado Integrado é a arena de elite onde testamos essa competência. Ao se deparar com uma questão da CESGRANRIO, a análise sintática deve operar como um reflexo condicionado, varrendo a oração em busca do termo regente (que pede a preposição) e do termo regido (que admite o artigo).
            </p>
            <p>
              A metodologia de ataque para provas de alto nível segue um protocolo de eliminação em três etapas. Etapa 1: A "Triagem Visual". Elimine instantaneamente alternativas que possuam crase diante de palavras masculinas, verbos no infinitivo e pronomes de tratamento (salvo senhora/dona/senhorita). Essa triagem inicial, puramente mecânica, resolve estatisticamente 40% das questões ou alternativas, poupando tempo valioso de raciocínio lógico.
            </p>
            <p>
              Etapa 2: A "Auditoria de Regência". Para as alternativas que sobreviveram à triagem, direcione o foco não para a palavra feminina com crase, mas para o termo que a antecede (o verbo ou o nome regente). Questione-o mentalmente: "Você exige a preposição 'a'?". Se a resposta for não (um verbo transitivo direto, por exemplo), a crase está errada, independentemente de haver um substantivo feminino adorável logo a seguir. O pino da equação não existe.
            </p>
            <p>
              Etapa 3: O "Teste de Substituição" (Teste do Masculino ou da Especificação). Se o verbo exigir preposição, volte a atenção ao termo regido. Troque a palavra feminina por um equivalente masculino; se aparecer "ao", a crase está validada. Se a palavra for "casa", "terra" ou "distância", procure avidamente por adjuntos adnominais que as especifiquem. É nesta etapa que os casos obscuros são iluminados pela lógica estrutural.
            </p>
            <p>
              A excelência na redação e na interpretação, características de um profissional de alto padrão da Petrobras, manifesta-se no domínio absoluto dessas minúcias gramaticais. Errar crase em prova é entregar pontos valiosos à concorrência; errar em um relatório executivo é comprometer a credibilidade técnica. Este módulo final tem o propósito de consolidar a teoria em um reflexo prático, garantindo a imunidade total contra as armadilhas clássicas da regência nominal e verbal.
            </p>
          </div>`
);

fs.writeFileSync('c:\\Workspace\\petrobras-quest\\src\\components\\aulas\\portugues\\AulaCrase.tsx', code);
console.log('Done!');
