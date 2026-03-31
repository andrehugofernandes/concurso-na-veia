# GUIA TÉCNICO - IMPLEMENTAÇÃO AULAS BLOCO III
**Para Desenvolvedores:** Referência prática para corrigir Aulas 1 e 4
**Baseado em:** Aulas 2-3 como modelo de excelência

---

## ÍNDICE

1. [Estrutura de Módulo ULTIMATE](#estrutura-de-módulo-ultimate)
2. [Aula 1: Conversão de Loop para Funções](#aula-1-conversão-de-loop-para-funções)
3. [Aula 4: Adição de Props e Completamento M1](#aula-4-adição-de-props-e-completamento-m1)
4. [Snippets de Código](#snippets-de-código)
5. [Checklist de Qualidade](#checklist-de-qualidade)

---

## ESTRUTURA DE MÓDULO ULTIMATE

Um módulo ULTIMATE segue este padrão OBRIGATÓRIO (ordem importa):

```tsx
// Container do módulo
<TabsContent value="modulo-{N}" className="space-y-[50px]">
  <div className="space-y-12 animate-in fade-in duration-500">

    {/* BLOCO 1: ModuleBanner */}
    <ModuleBanner
      numero={N}
      titulo="Título Específico do Módulo"
      descricao="Descrição curta (1-2 linhas)"
      variant={getModuleVariant(N)}  {/* ← CRITICAL: colorização automática */}
    />

    {/* BLOCO 2: RichIntro Section */}
    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
      <ModuleSectionHeader
        index={N}
        title="Subtítulo ou Contexto"
        description="Breve descrição da seção"
        variant={getModuleVariant(N)}  {/* ← CRITICAL: match ModuleBanner */}
      />

      {/* BLOCO 3: RichIntro (5 parágrafos + AlertBox) */}
      <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>PARÁGRAFO 1: Definição formal do conceito...</p>
        <p>PARÁGRAFO 2: Analogia ou comparação (para facilitar entendimento)...</p>
        <p>PARÁGRAFO 3: Contexto Petrobras específico...</p>
        <p>PARÁGRAFO 4: Aplicação prática ou exemplo...</p>
        <p>PARÁGRAFO 5: Dica CESGRANRIO (como questões aparecem em provas)...</p>

        <AlertBox variant={getModuleVariant(N)}>
          <strong>📌 Destaque ou Definição:</strong> Resumir ponto-chave em 1-2 linhas.
        </AlertBox>
      </div>

      {/* BLOCO 4: ContentAccordion (4 abas C.E.D.E.) */}
      <ContentAccordion
        variant={getModuleVariant(N)}
        slides={[
          {
            titulo: "Conceito/Essencial",
            icone: <LuBrain />,
            conteudo: (
              <div className="space-y-4">
                <p>Definição concisa do termo.</p>
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl">
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Ponto 1</li>
                    <li>Ponto 2</li>
                    <li>Ponto 3</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            titulo: "Exemplos/Aplicação",
            icone: <LuTarget />,
            conteudo: (
              <p>Casos concretos de aplicação. Pode ser um parágrafo ou lista.</p>
            ),
          },
          {
            titulo: "Dicas/Detalhamento",
            icone: <LuLightbulb />,
            conteudo: (
              <p>Estratégias de estudo, macetes, comparações úteis.</p>
            ),
          },
          {
            titulo: "Exceções/Petrobras",
            icone: <LuShieldCheck />,
            conteudo: (
              <p>Casos especiais, contexto Petrobras, aplicação prática na empresa.</p>
            ),
          },
        ]}
      />
    </section>

    {/* BLOCO 5: ComponentesReforço (CardCarousel + opcionalmente FlipCard) */}
    <section>
      <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
      <CardCarousel
        cards={[
          {
            title: "Exemplo 1: Caso Real na Petrobras",
            descricao: "Descrição de como o conceito é aplicado em situação real...",
          },
          {
            title: "Exemplo 2: Situação de Teste",
            descricao: "Como poderia aparecer em questão CESGRANRIO...",
          },
          {
            title: "Exemplo 3: Aplicação Prática",
            descricao: "Um terceiro exemplo de uso...",
          },
        ]}
      />
    </section>

    {/* BLOCO 6: ModuleConsolidation (4-tab) */}
    <section id={`consolidacao-modulo-${N}`} className="mt-16">
      <ModuleConsolidation
        index={N}
        variant={getModuleVariant(N)}
        video={{
          videoId: "video-id-aqui",  {/* ← substituir com ID real se houver */}
          title: `Resumo: Título do Módulo`,
          duration: "10:00",  {/* ← duração aproximada */}
        }}
        resumoVisual={{
          moduloNome: `Módulo ${N}`,
          tituloAula: "Nome da Aula",
          materia: "Administração",
          images: [
            {
              title: "Conceito ou Tema",
              type: "Resumo",
              placeholderColor: "bg-indigo-500/10",  {/* ← match variant */}
            },
            {
              title: "Segundo Visual",
              type: "Diagrama",
              placeholderColor: "bg-indigo-500/10",
            },
          ],
        }}
        maceteVisual={{
          title: `Mantra do Módulo ${N}`,
          content: (
            <p className="text-lg italic">
              "Frase ou regra mnemônica para memorizar o conceito."
            </p>
          ),
        }}
        audio={{
          audioUrl: "#",  {/* ← substituir com URL real se houver */}
          titulo: `Título da Faixa de Áudio`,
          artista: "Prof. Ou Artista",
        }}
      />

      {/* BLOCO 7: QuizInterativo */}
      <QuizInterativo
        questoes={QUIZ_DATA["modulo-{N}"].questions}  {/* ← mapear para dados reais */}
        titulo={`4️⃣ QUIZ: Título do Módulo`}
        numero={N}
        variant={getModuleVariant(N)}
        icone="🎯"
        onComplete={(score) => handleModuleComplete(`modulo-${N}`, score)}
      />
    </section>

  </div>
</TabsContent>
```

### Checklist por Bloco:
- ✅ **ModuleBanner**: `numero`, `titulo`, `descricao`, `variant={getModuleVariant(N)}`
- ✅ **RichIntro**: 5 parágrafos estruturados + 1 AlertBox
- ✅ **ModuleSectionHeader**: `index={N}`, `title`, `description`, `variant={getModuleVariant(N)}`
- ✅ **ContentAccordion**: 4 abas com `icone` e `conteudo`
- ✅ **CardCarousel**: 3+ cards com `title` e `descricao`
- ✅ **ModuleConsolidation**: `video`, `resumoVisual`, `maceteVisual`, `audio`
- ✅ **QuizInterativo**: `questoes`, `titulo`, `numero`, `variant`, `onComplete`

---

## AULA 1: CONVERSÃO DE LOOP PARA FUNÇÕES

### Problema Atual (Linhas ~397-629):
```tsx
{[
  { mod: "modulo-2", num: 2, titulo: "Funções Administrativas (PODC)", ... },
  { mod: "modulo-3", num: 3, titulo: "Estruturas Organizacionais", ... },
  // ... 6 mais com dados genéricos
].map(({ mod, num, titulo: modTitulo, desc, grad, intro, content }) => (
  <TabsContent key={mod} value={mod} className="space-y-[50px]">
    // Conteúdo IDÊNTICO para todos 8 módulos
  </TabsContent>
))}
```

**Por que é problema?**
- Cada módulo tem CONTEÚDO GENÉRICO
- `intro` e `content` são placeholders ("Explicação sobre...", "Detalhes sobre...")
- ContentAccordion não varia por módulo
- Impossível ter exemplos Petrobras específicos

### Solução (Substituir Loop por 8 Funções):

#### PASSO 1: Deletar o LOOP inteiro (linhas 397-629)
Procurar por:
```tsx
{/* ═══ MÓDULOS 2-9 ═══ */}
{[
```
até
```tsx
))}
```
e **deletar tudo isso**.

#### PASSO 2: Adicionar 8 Funções
Inserir ANTES de `{/* ═══ MÓDULO 10: Simulado Mestre ═══ */}`:

```tsx
// ═══ MÓDULO 2: Funções Administrativas (PODC) ═══
const renderModulo2 = () => (
  <TabsContent value="modulo-2" className="space-y-[50px]">
    <div className="space-y-12 animate-in fade-in duration-500">
      <ModuleBanner
        numero={2}
        titulo="Funções Administrativas (PODC)"
        descricao="O ciclo administrativo moderno: Planejar, Organizar, Dirigir e Controlar."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={2}
          title="Entenda o Ciclo PODC"
          description="Fundação de toda decisão administrativa em Petrobras"
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            O modelo <strong>PODC (Planejamento, Organização, Direção, Controle)</strong>
            é a espinha dorsal de qualquer organização. Representa um ciclo contínuo
            de retroalimentação onde cada fase alimenta a próxima...
          </p>
          <p>
            <strong>Analogia:</strong> Pense em PODC como um GPS. Planejamento define
            o destino (aonde queremos ir). Organização mapeia a rota (como distribuir
            recursos). Direção é dirigir o carro (liderar e motivar). Controle é
            verificar se chegamos no destino certo no tempo certo.
          </p>
          <p>
            Na <strong>Petrobras</strong>, PODC aparece em todas as operações. Exploração
            de novos campos segue PODC rigorosamente. Refinarias planejam produção,
            organizam turmas, dirigem operações 24/7, e controlam qualidade continuamente.
          </p>
          <p>
            <strong>Aplicação prática:</strong> Um técnico de suprimento usa PODC
            quando negocia contratos. Planeja quantidade necessária, organiza cronograma
            de entrega, dirige relacionamento com fornecedor, e controla qualidade/prazos.
          </p>
          <p>
            <strong>Dica CESGRANRIO:</strong> Questões sobre PODC costumam pedir
            identificação de qual fase está sendo descrita ("Em qual função administrativa
            a empresa revisa se atingiu metas?"). Memorize: P=destino, O=distribuição,
            D=liderança, C=verificação.
          </p>

          <AlertBox variant={getModuleVariant(2)}>
            <strong>💡 Definição-Chave:</strong> PODC não é linear; é um ciclo.
            O Controle retroalimenta o próximo Planejamento.
          </AlertBox>
        </div>

        <ContentAccordion
          variant={getModuleVariant(2)}
          slides={[
            {
              titulo: "O Ciclo PODC Explicado",
              icone: <LuTrendingUp />,
              conteudo: (
                <div className="space-y-4">
                  <p>
                    <strong>P - Planejamento:</strong> Definir objetivos, estratégias,
                    e planos de ação para atingir metas.
                  </p>
                  <p>
                    <strong>O - Organização:</strong> Estruturar recursos (pessoas,
                    materiais, informação) para executar plano.
                  </p>
                  <p>
                    <strong>D - Direção:</strong> Liderar, motivar, comunicar, e
                    orientar pessoas na execução.
                  </p>
                  <p>
                    <strong>C - Controle:</strong> Monitorar, comparar resultados com
                    metas, e corrigir desvios.
                  </p>
                </div>
              ),
            },
            {
              titulo: "Exemplos em Petrobras",
              icone: <LuTarget />,
              conteudo: (
                <div className="space-y-4">
                  <p>
                    <strong>Exploração:</strong> P=planejam métodos de perfuração,
                    O=alocam equipes, D=coordenam operações 24h, C=monitoram produção.
                  </p>
                  <p>
                    <strong>Suprimento:</strong> P=definem necessidades, O=selecionam
                    fornecedores, D=negociam contratos, C=verificam cumprimento.
                  </p>
                  <p>
                    <strong>Refino:</strong> P=planejam blend de óleos, O=alocam
                    unidades, D=operam 24/7, C=testam qualidade produto final.
                  </p>
                </div>
              ),
            },
            {
              titulo: "Dicas de Estudo",
              icone: <LuLightbulb />,
              conteudo: (
                <p>
                  Memorizando: "Planejar, Organizar, Dirigir, Controlar" → P.O.D.C.
                  Pense em cada fase como pergunta: (P) Para onde vamos? (O) Como
                  organizamos? (D) Quem lidera? (C) Como sabemos que deu certo?
                </p>
              ),
            },
            {
              titulo: "Visão Petrobras",
              icone: <LuShieldCheck />,
              conteudo: (
                <p>
                  Em Petrobras, PODC é mandatório em operações de alto risco.
                  Lei 13.303 exige que todas decisões sigam processo estruturado.
                  Falha em qualquer fase pode resultar em atrasos operacionais,
                  desperdício de recursos, ou pior, acidentes de segurança.
                </p>
              ),
            },
          ]}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
        <CardCarousel
          cards={[
            {
              title: "Novo Projeto de Exploração",
              descricao:
                "Planejam volume estimado de óleo. Organizam equipes e equipamentos. Dirigem operações offshore. Controlam produção diária vs meta.",
            },
            {
              title: "Contrato de Suprimento",
              descricao:
                "Planejam quantidade anual. Organizam processos licitatórios. Dirigem negociações. Controlam prazos e qualidade de entrega.",
            },
            {
              title: "Expansão de Refinaria",
              descricao:
                "Planejam nova unidade. Organizam construção e testes. Dirigem startup gradual. Controlam eficiência vs projeto.",
            },
          ]}
        />
      </section>

      <section id="quiz-modulo-2" className="mt-16">
        <ModuleConsolidation
          index={2}
          variant={getModuleVariant(2)}
          video={{
            videoId: "b1VjGMSRfMk",
            title: "Resumo: PODC",
            duration: "10:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Administração Geral",
            materia: "Administração",
            images: [
              {
                title: "Ciclo PODC",
                type: "Diagrama",
                placeholderColor: "bg-emerald-500/10",
              },
              {
                title: "Aplicação Prática",
                type: "Exemplo",
                placeholderColor: "bg-emerald-500/10",
              },
            ],
          }}
          maceteVisual={{
            title: "Mantra do Módulo 2",
            content: (
              <p className="text-lg italic">
                "PODC é contínuo: planejar define, organizar arruma, dirigir move, controlar verifica e retroalimenta."
              </p>
            ),
          }}
          audio={{
            audioUrl: "#",
            titulo: "PODC - Funções Administrativas",
            artista: "Prof. Administração",
          }}
        />
        <QuizInterativo
          questoes={ADMINISTRACAO_GERAL_QUIZZES["modulo-2"].questions}
          titulo="4️⃣ QUIZ: PODC"
          numero={2}
          variant={getModuleVariant(2)}
          icone="🎯"
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </section>
    </div>
  </TabsContent>
);
```

#### PASSO 3: Adicionar Chamadas das Funções no Return
Antes da seção de Módulo 10, adicionar:

```tsx
{renderModulo2()}
{renderModulo3()}
{renderModulo4()}
{renderModulo5()}
{renderModulo6()}
{renderModulo7()}
{renderModulo8()}
{renderModulo9()}
```

### Padrão para M3-M9:
Repetir o padrão acima (renderModulo2), adaptando:
- `numero={3}`, `titulo`, `descricao`
- RichIntro com 5 parágrafos DIFERENTES
- ContentAccordion com 4 abas DIFERENTES
- CardCarousel com 3 exemplos Petrobras DIFERENTES
- ModuleConsolidation com `maceteVisual` DIFERENTE

---

## AULA 4: ADIÇÃO DE PROPS E COMPLETAMENTO M1

### Problema 1: ModuleBanner SEM `variant`

**Encontrar (usar Ctrl+F):**
```tsx
<ModuleBanner numero={
```

Haverá ~11 ocorrências. Verificar cada uma:

**❌ ANTES (sem variant):**
```tsx
<ModuleBanner numero={1} titulo="Administração Tributária" descricao="..." />
```

**✅ DEPOIS (com variant):**
```tsx
<ModuleBanner
  numero={1}
  titulo="Administração Tributária"
  descricao="..."
  variant={getModuleVariant(1)}
/>
```

### Problema 2: M1 RichIntro Incompleta

**Localizar:** Função `renderModulo1()` (linha ~71)

**✅ ADICIONAR após `ModuleSectionHeader` e antes de `renderModulo2()`:**

```tsx
<div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
  <p>
    <strong>Administração Tributária</strong> é a disciplina que estuda a gestão
    de tributos nas organizações. Diferentemente do Direito Tributário (que estuda
    normas e leis), Administração Tributária foca em <strong>como as empresas
    gerenciam seus impostos e contribuições</strong> de forma eficiente, legal e
    estratégica.
  </p>

  <p>
    <strong>Analogia:</strong> Se o Direito Tributário é o manual de instruções
    do carro, Administração Tributária é a habilidade de dirigir. Você conhece
    as regras (direção correta, velocidade máxima), mas também precisa saber como
    otimizar o trajeto (gasolina, manutenção) e chegar no destino com segurança.
  </p>

  <p>
    Na <strong>Petrobras</strong>, Administração Tributária é crítica. Com operações
    em múltiplos estados e até países, deve navegar diferentes regimes tributários.
    Impostos sobre óleo, ICMS estadual, COFINS federal, e taxas de exploração impactam
    a rentabilidade de cada projeto. Gestão eficiente de tributos libera caixa para
    reinvestimento em exploração ou retorno a acionistas.
  </p>

  <p>
    <strong>Aplicação Prática:</strong> Um gerente de suprimento na Petrobras negocia
    preços de serviços. Deve considerar impacto fiscal: ICMS, PIS, COFINS sobre aquisição.
    Um contrato bem estruturado pode economizar 3-5% em impostos, equivalendo a milhões
    de reais em projetos grandes.
  </p>

  <p>
    <strong>Dica CESGRANRIO:</strong> Questões sobre Administração Tributária costumam
    pedir diferenciação entre "legal" (permitido por lei) e "apropriado" (alinhado com
    conformidade). A Petrobras investe em cumprimento rigoroso, rejeitando até economias
    tributárias marginais que pareçam "criativas". Memorize: conformidade > economia.
  </p>

  <AlertBox variant={getModuleVariant(1)}>
    <strong>📌 Essencial:</strong> Administração Tributária não é elisão fiscal
    ("burlar lei"). É planejamento tributário lícito dentro da lei.
  </AlertBox>
</div>
```

### Problema 3: M1 ContentAccordion Incompleta

**Verificar:** Se `renderModulo1()` já tem `<ContentAccordion>` ou não.

**Se não tiver, adicionar APÓS RichIntro acima:**

```tsx
<ContentAccordion
  variant={getModuleVariant(1)}
  slides={[
    {
      titulo: "Conceitos Fundamentais",
      icone: <LuBrain />,
      conteudo: (
        <div className="space-y-4">
          <p>
            <strong>Tributo:</strong> Compulsão pecuniária (dinheiro) do contribuinte
            ao Estado, sem contraprestação direta específica.
          </p>
          <p>
            <strong>Contribuinte:</strong> Pessoa física ou jurídica que sofre o fato
            gerador e tem dever de pagar tributo.
          </p>
          <p>
            <strong>Fato Gerador:</strong> Evento descrito em lei que gera obrigação
            de pagar tributo. Ex: venda (ICMS), lucro (IR), consumo (IPI).
          </p>
        </div>
      ),
    },
    {
      titulo: "Órgãos Arrecadadores",
      icone: <LuTarget />,
      conteudo: (
        <div className="space-y-3">
          <p>
            <strong>Receita Federal:</strong> Arrecada IR, IPI, COFINS, PIS (federal).
          </p>
          <p>
            <strong>SEFAZ Estadual:</strong> Arrecada ICMS e IPVA.
          </p>
          <p>
            <strong>Prefeituras:</strong> Arrecadam ISS (serviços), IPTU (imóvel).
          </p>
          <p>
            <strong>INSS/FGTS:</strong> Contribuições previdenciárias.
          </p>
        </div>
      ),
    },
    {
      titulo: "Dicas de Estudo",
      icone: <LuLightbulb />,
      conteudo: (
        <p>
          Mnemônico para órgãos: "RESIF" (Receita Federal, SEFAZ Estadual, Secretarias
          municipais, INSS, FGTS). Saiba QUEM arrecada, QUAL imposto, e EM QUAL momento.
        </p>
      ),
    },
    {
      titulo: "Visão Petrobras",
      icone: <LuShieldCheck />,
      conteudo: (
        <p>
          Petrobras está sujeita a todos 5 órgãos acima. Principais cargas: IR sobre
          lucros, COFINS sobre receita, ICMS sobre vendas estaduais, e royalties/participação
          especial sobre exploração (lei petrolífera específica). Compliance tributário é
          prioritário e auditado rigorosamente por órgãos e acionistas.
        </p>
      ),
    },
  ]}
/>
```

### Problema 4: Validar maceteVisual em ModuleConsolidation

**Verificar:** Cada `ModuleConsolidation` tem `maceteVisual` prop com `title` e `content`.

**Padrão esperado:**
```tsx
<ModuleConsolidation
  index={N}
  variant={getModuleVariant(N)}
  // ... outros props
  maceteVisual={{
    title: `O Pulo do Gato - Módulo ${N}`,
    content: <p className="text-lg italic">{"Frase mnemônica ou macete aqui..."}</p>
  }}
  // ...
/>
```

Se não tiver, adicionar em cada `renderModulo{N}()`.

---

## SNIPPETS DE CÓDIGO

### Snippet 1: ModuleBanner com variant
```tsx
<ModuleBanner
  numero={N}
  titulo="Título do Módulo"
  descricao="Descrição curta (1-2 linhas)"
  variant={getModuleVariant(N)}
/>
```

### Snippet 2: RichIntro Estruturada (5 parágrafos)
```tsx
<div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
  <p><strong>Parágrafo 1:</strong> Definição formal...</p>
  <p><strong>Parágrafo 2:</strong> Analogia/Comparação...</p>
  <p><strong>Parágrafo 3:</strong> Contexto Petrobras...</p>
  <p><strong>Parágrafo 4:</strong> Aplicação prática...</p>
  <p><strong>Parágrafo 5:</strong> Dica CESGRANRIO...</p>

  <AlertBox variant={getModuleVariant(N)}>
    <strong>📌 Destaque:</strong> Resumo ou definição-chave.
  </AlertBox>
</div>
```

### Snippet 3: ContentAccordion com 4 abas
```tsx
<ContentAccordion
  variant={getModuleVariant(N)}
  slides={[
    {
      titulo: "Conceito",
      icone: <LuBrain />,
      conteudo: <p>Definição formal...</p>,
    },
    {
      titulo: "Exemplos",
      icone: <LuTarget />,
      conteudo: <p>Casos práticos...</p>,
    },
    {
      titulo: "Dicas",
      icone: <LuLightbulb />,
      conteudo: <p>Estratégias de estudo...</p>,
    },
    {
      titulo: "Petrobras",
      icone: <LuShieldCheck />,
      conteudo: <p>Contexto específico...</p>,
    },
  ]}
/>
```

### Snippet 4: CardCarousel
```tsx
<CardCarousel
  cards={[
    {
      title: "Exemplo 1: Caso Real",
      descricao: "Descrição detalhada...",
    },
    {
      title: "Exemplo 2: Situação de Teste",
      descricao: "Descrição detalhada...",
    },
    {
      title: "Exemplo 3: Aplicação Prática",
      descricao: "Descrição detalhada...",
    },
  ]}
/>
```

### Snippet 5: ModuleConsolidation Completo
```tsx
<ModuleConsolidation
  index={N}
  variant={getModuleVariant(N)}
  video={{
    videoId: "youtube-id",
    title: `Resumo: Título`,
    duration: "10:00",
  }}
  resumoVisual={{
    moduloNome: `Módulo ${N}`,
    tituloAula: "Nome da Aula",
    materia: "Administração",
    images: [
      {
        title: "Tema 1",
        type: "Tipo",
        placeholderColor: "bg-indigo-500/10",
      },
      {
        title: "Tema 2",
        type: "Tipo",
        placeholderColor: "bg-indigo-500/10",
      },
    ],
  }}
  maceteVisual={{
    title: `Mantra do Módulo ${N}`,
    content: (
      <p className="text-lg italic">
        "Frase ou regra mnemônica..."
      </p>
    ),
  }}
  audio={{
    audioUrl: "#",
    titulo: "Título da Faixa",
    artista: "Nome Artista",
  }}
/>
```

### Snippet 6: QuizInterativo
```tsx
<QuizInterativo
  questoes={QUIZ_DATA["modulo-{N}"].questions}
  titulo={`4️⃣ QUIZ: Título`}
  numero={N}
  variant={getModuleVariant(N)}
  icone="🎯"
  onComplete={(score) => handleModuleComplete(`modulo-${N}`, score)}
/>
```

---

## CHECKLIST DE QUALIDADE

### Para Cada Módulo (M1-M10):

- [ ] ModuleBanner renderiza com cor (via `getModuleVariant(N)`)
- [ ] RichIntro tem 5 parágrafos distintos
- [ ] RichIntro parágrafo 3 menciona Petrobras
- [ ] RichIntro parágrafo 5 tem "Dica CESGRANRIO"
- [ ] RichIntro tem AlertBox com destaque
- [ ] ContentAccordion tem 4 abas (Conceito, Exemplos, Dicas, Petrobras)
- [ ] Cada aba tem `icone` diferente
- [ ] CardCarousel tem 3+ cards
- [ ] ModuleConsolidation tem `video`, `resumoVisual`, `maceteVisual`, `audio`
- [ ] `maceteVisual` é único por módulo (não genérico)
- [ ] QuizInterativo aparece depois de ModuleConsolidation
- [ ] QuizInterativo tem `onComplete` que chama `handleModuleComplete`

### Para Toda a Aula:

- [ ] 10 `<TabsContent value="modulo-{N}">` renderizados
- [ ] Cada módulo tem cor diferente (M1 ≠ M2 ≠ ... ≠ M10)
- [ ] Progresso visual (completion badges ou barra)
- [ ] Progression de deslock (M2 só acessível após M1 completo)
- [ ] M10 é simulado (pode ter menos exemplos ou quiz consolidado)
- [ ] Sem console errors
- [ ] Responsivo em mobile

### Para Renderização no Navegador:

- [ ] Página carrega sem delay excessivo
- [ ] Cada módulo aparecer quando clicado
- [ ] RichIntro visível e legível
- [ ] ContentAccordion tabs funcionam (click → muda conteúdo)
- [ ] CardCarousel pode scrollar/navegar
- [ ] Quiz pode responder e submeter
- [ ] Completion badge aparece após M10 quiz completo
- [ ] Dark mode funciona (se aplicável)

---

## MAPEAMENTO DE CORES

Use `getModuleVariant(N)` para colorização automática:

```
M1  → Índigo      (getModuleVariant(1))
M2  → Esmeralda   (getModuleVariant(2))
M3  → Violeta     (getModuleVariant(3))
M4  → Rosa        (getModuleVariant(4))
M5  → Púrpura     (getModuleVariant(5))
M6  → Âmbar       (getModuleVariant(6))
M7  → Azul        (getModuleVariant(7))
M8  → Verde       (getModuleVariant(8))
M9  → Laranja/Rosa(getModuleVariant(9))
M10 → Preto/Ardósia(getModuleVariant(10))
```

**Importantíssimo:** Sempre passar `variant={getModuleVariant(N)}` para:
- ModuleBanner
- ModuleSectionHeader
- ContentAccordion
- ModuleConsolidation
- QuizInterativo

---

## REFERÊNCIAS

| Arquivo | Localização | Uso |
|---------|-------------|-----|
| `moduleColors.ts` | `src/lib/` | `getModuleVariant(N)` |
| `ModuleBanner.tsx` | `src/components/aulas/shared/` | Props: numero, titulo, descricao, variant |
| `ContentAccordion.tsx` | `src/components/aulas/shared/` | Props: variant, slides[] |
| `CardCarousel.tsx` | `src/components/aulas/shared/` | Props: cards[] |
| `ModuleConsolidation.tsx` | `src/components/aulas/shared/` | Props: index, variant, video, resumoVisual, maceteVisual, audio |
| `QuizInterativo.tsx` | `src/components/aulas/shared/` | Props: questoes, titulo, numero, variant, onComplete |
| `AulaContabilidadeBasica.tsx` | `src/components/aulas/administracao/` | MODELO DE REFERÊNCIA |
| `AulaDireitoTributario.tsx` | `src/components/aulas/administracao/` | MODELO DE REFERÊNCIA |

---

**FIM DO GUIA TÉCNICO**
Use este documento como referência durante implementação de Aulas 1 e 4.
