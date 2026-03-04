# PRD — Geração de Conteúdo Educacional para Plataforma "A Vaga É Minha"

> **Documento de Produto para uso no Google NotebookLM**
> Versão: 1.0 | Data: 04/03/2026
> Autor: André Hugo Fernandes

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 O que é "A Vaga É Minha"

**A Vaga É Minha** é uma plataforma SaaS (Software as a Service) brasileira de preparação para **concursos públicos** no Brasil. O produto oferece aulas interativas com quizzes, gamificação (XP, medalhas, streaks), simulados e acompanhamento de progresso personalizado.

### 1.2 Público-Alvo

- Candidatos a **concursos públicos federais, estaduais e municipais** no Brasil
- Foco inicial: **Concurso Petrobras 2026** (banca CESGRANRIO)
- Níveis: Médio/Técnico e Superior
- Perfil: Trabalhadores que estudam em horário livre, universitários, concurseiros dedicados

### 1.3 Foco Atual: Petrobras 2026 — Banca CESGRANRIO

> [!IMPORTANT]
> **Mudança de banca confirmada:** O concurso Petrobras 2026 será organizado pela **CESGRANRIO**, diferente do edital 2023.2 que foi pela Cebraspe. Isso impacta diretamente o **estilo das questões**, o **formato da prova** e a **abordagem pedagógica**.

#### Diferenças CESGRANRIO vs. Cebraspe

| Aspecto       | Cebraspe (2023.2)        | CESGRANRIO (2026)                               |
| ------------- | ------------------------ | ----------------------------------------------- |
| Formato       | Certo/Errado             | Múltipla Escolha (5 alternativas: A-E)          |
| Penalização   | -1 por erro              | Sem penalização                                 |
| Estilo        | Frases assertivas longas | Enunciados com contexto + pergunta direta       |
| Interpretação | Muito literal            | Mais contextualizado, com "pegadinhas" sutis    |
| Matemática    | Raciocínio lógico puro   | Cálculos aplicados + interpretação de enunciado |
| Português     | Gramática técnica        | Interpretação de texto + gramática aplicada     |

---

## 2. PROBLEMA A SER RESOLVIDO

### 2.1 O Gap de Conteúdo

O conteúdo atual das aulas (`source/conteudo/lingua-portuguesa.md` e `source/conteudo/matematica.md`) é **resumido e superficial** — adequado como referência rápida, mas **insuficiente** para construir aulas completas de uma plataforma educacional premium.

**Sintomas do problema:**

- Cada aula precisa de **pedidos manuais constantes** para expandir o conteúdo
- O tempo de criação por aula é **5x maior** do que o necessário
- O conteúdo carece de **contextualização para Petrobras/CESGRANRIO**
- Faltam **exemplos resolvidos passo a passo**
- Faltam **tabelas comparativas**, **dicas de prova** e **pegadinhas comuns**
- Não há **questões no estilo CESGRANRIO** em volume suficiente

### 2.2 O que o NotebookLM deve resolver

O NotebookLM deve transformar os materiais-fonte em **conteúdo denso, didático e pronto para implementação** — eliminando a necessidade de expansão manual durante a criação das aulas.

---

## 3. ESTRUTURA DE UMA AULA NA PLATAFORMA

> [!NOTE]
> Cada aula da plataforma é um **componente React** com 5 módulos interativos. O conteúdo gerado pelo NotebookLM deve ser rico o suficiente para preencher esta estrutura sem gaps.

### 3.1 Anatomia de uma Aula (5 Módulos)

```
AULA: [Nome do Tópico]
├── MÓDULO 1: Fundamentos / Conceitos Base
│   ├── Banner temático
│   ├── Seção 1: Definição e contexto
│   │   ├── Accordion com 2-4 slides de conteúdo
│   │   ├── AlertBox (dicas, pegadinhas, contexto Petrobras)
│   │   └── Exemplos resolvidos (mínimo 3)
│   ├── Seção 2: Subtópico aprofundado
│   │   ├── Cards comparativos
│   │   ├── Tabelas de resumo
│   │   └── Casos especiais
│   ├── Seção 3: Resumo Visual + Multimídia
│   └── QUIZ (6 questões estilo CESGRANRIO)
│
├── MÓDULO 2: Regras e Métodos
│   ├── [mesma estrutura com conteúdo progressivo]
│   └── QUIZ (5-6 questões)
│
├── MÓDULO 3: Casos Especiais / Aplicações
│   ├── [mesma estrutura]
│   └── QUIZ (5-6 questões)
│
├── MÓDULO 4: Problemas Avançados / Contexto Industrial
│   ├── [mesma estrutura]
│   └── QUIZ (4-5 questões)
│
└── MÓDULO 5: Desafio Final
    ├── Revisão geral
    └── QUIZ FINAL (4-6 questões integradoras)
```

### 3.2 Requisitos de Conteúdo por Módulo

| Elemento                 | Quantidade Mínima     | Descrição                                   |
| ------------------------ | --------------------- | ------------------------------------------- |
| **Conceitos explicados** | 4-6 por módulo        | Com definição, exemplo e contexto Petrobras |
| **Exemplos resolvidos**  | 3-5 por módulo        | Passo a passo detalhado                     |
| **Tabelas comparativas** | 1-2 por módulo        | (quando aplicável) ex: regras vs exceções   |
| **Dicas de prova**       | 2-3 por módulo        | "A CESGRANRIO costuma cobrar..."            |
| **Pegadinhas**           | 1-2 por módulo        | Com AlertBox de aviso                       |
| **Contexto industrial**  | 1-2 por módulo        | Aplicação na Petrobras/indústria            |
| **Questões de Quiz**     | 5-6 por módulo (pool) | Formato CESGRANRIO (5 alternativas A-E)     |

### 3.3 Formato de Questão CESGRANRIO

```
{
  id: número,
  pergunta: "Enunciado contextualizado com situação prática...",
  opcoes: [
    { label: "A", valor: "Distrator plausível 1" },
    { label: "B", valor: "Distrator plausível 2" },
    { label: "C", valor: "RESPOSTA CORRETA" },
    { label: "D", valor: "Distrator plausível 3" },
    { label: "E", valor: "Distrator plausível 4" },
  ],
  correta: "C",
  explicacao: "Explicação detalhada justificando a resposta correta e por que as demais estão incorretas."
}
```

**Regras para questões no estilo CESGRANRIO (últimos 10 anos):**

1. **Enunciado contextualizado**: Sempre que possível, insira uma situação prática (refinaria, plataforma, escritório, campo)
2. **Distratores plausíveis**: As alternativas erradas devem parecer corretas para quem não domina o tema
3. **Uma só resposta correta**: Inequivocamente correta
4. **Explicação pedagógica**: A explicação deve ensinar, não apenas dizer "letra C está certa"
5. **Variação de dificuldade**: Fácil (20%) → Médio (50%) → Difícil (30%)
6. **Pool mínimo**: 6 questões por pool, para que o sistema selecione aleatoriamente

---

## 4. MATÉRIAS E TÓPICOS — MAPEAMENTO COMPLETO

### 4.1 Conhecimentos Básicos (Comum a TODAS as ênfases — Nível Técnico)

#### LÍNGUA PORTUGUESA (11 Tópicos)

| #   | Tópico                        | ID no Sistema         | Status         |
| --- | ----------------------------- | --------------------- | -------------- |
| 1   | Interpretação de Texto        | `interpretacao-texto` | ✅ Aula criada |
| 2   | Coesão e Coerência            | `coesao-coerencia`    | ✅ Aula criada |
| 3   | Reescrita de Frases           | `reescrita-frases`    | ✅ Aula criada |
| 4   | Crase                         | `crase`               | ✅ Aula criada |
| 5   | Pontuação                     | `pontuacao`           | ✅ Aula criada |
| 6   | Concordância Verbal e Nominal | `concordancia`        | ✅ Aula criada |
| 7   | Regência Verbal e Nominal     | `regencia`            | ✅ Aula criada |
| 8   | Sintaxe                       | `sintaxe`             | ✅ Aula criada |
| 9   | Classes de Palavras           | `classes-palavras`    | ✅ Aula criada |
| 10  | Tipos Textuais                | `tipos-textuais`      | ✅ Aula criada |
| 11  | Ortografia e Acentuação       | `ortografia`          | ✅ Aula criada |

**Conteúdo necessário para CADA tópico de Português:**

- Regras completas com TODOS os casos especiais
- Exemplos do cotidiano industrial (manuais técnicos, relatórios, normas)
- Tabela de regras vs exceções
- Pegadinhas históricas da CESGRANRIO
- 30+ questões no estilo CESGRANRIO (para preencher 5 quizzes de 6 questões cada)

#### MATEMÁTICA (19 Tópicos)

| #   | Tópico                     | ID no Sistema             | Status         |
| --- | -------------------------- | ------------------------- | -------------- |
| 1   | Teoria dos Conjuntos       | `conjuntos`               | ✅ Aula criada |
| 2   | Razão e Proporção          | `razao-proporcao`         | ✅ Aula criada |
| 3   | Porcentagem                | `porcentagem`             | ✅ Aula criada |
| 4   | Equações de 1º Grau        | `equacoes-1grau`          | ✅ Aula criada |
| 5   | Equações de 2º Grau        | `equacoes-2grau`          | ✅ Aula criada |
| 6   | Funções Afim e Quadrática  | `funcoes-afim-quadratica` | ✅ Aula criada |
| 7   | Funções Exponenciais       | `funcoes-exponenciais`    | ✅ Aula criada |
| 8   | Funções Logarítmicas       | `funcoes-logaritmicas`    | ⏳ Pendente    |
| 9   | Progressão Aritmética (PA) | `progressoes-pa`          | ⏳ Pendente    |
| 10  | Progressão Geométrica (PG) | `progressoes-pg`          | ⏳ Pendente    |
| 11  | Matrizes e Determinantes   | `matrizes-determinantes`  | ⏳ Pendente    |
| 12  | Sistemas Lineares          | `sistemas-lineares`       | ⏳ Pendente    |
| 13  | Análise Combinatória       | `analise-combinatoria`    | ⏳ Pendente    |
| 14  | Probabilidade              | `probabilidade`           | ⏳ Pendente    |
| 15  | Trigonometria              | `trigonometria`           | ⏳ Pendente    |
| 16  | Geometria Plana            | `geometria-plana`         | ⏳ Pendente    |
| 17  | Geometria Espacial         | `geometria-espacial`      | ⏳ Pendente    |
| 18  | Geometria Analítica        | `geometria-analitica`     | ⏳ Pendente    |
| 19  | Matemática Financeira      | `matematica-financeira`   | ⏳ Pendente    |

**Conteúdo necessário para CADA tópico de Matemática:**

- Todas as fórmulas com demonstração intuitiva (não formal)
- Mínimo 5 exemplos resolvidos passo a passo
- Aplicações no contexto Petrobras (volumes, custos, cronogramas, juros)
- Propriedades e teoremas com mnemônicos
- Tabela de "Erros comuns" vs "O correto"
- 30+ questões no estilo CESGRANRIO (para preencher 5 quizzes de 5-6 questões cada)

### 4.2 Conhecimentos Específicos por Profissão (Nível Técnico)

> [!WARNING]
> As matérias específicas abaixo são o **próximo horizonte** após conclusão dos conhecimentos básicos. O conteúdo deve ser mapeado com a mesma profundidade.

#### Profissões Nível Técnico (16 ênfases do edital 2023.2)

| #   | Profissão                   | Blocos de Conhecimento                        |
| --- | --------------------------- | --------------------------------------------- |
| 1   | Enfermagem do Trabalho      | APH, Epidemiologia, NRs, PCMSO, Biossegurança |
| 2   | Inspeção de Equipamentos    | Eletroquímica, Metrologia, END, Corrosão      |
| 3   | Logística de Transportes    | Armazenagem, Modais, Lei 13.303, NR 11        |
| 4   | Manutenção – Caldeiraria    | Tecnologia Mecânica, Soldagem, Metalurgia     |
| 5   | Manutenção – Elétrica       | Circuitos CC/CA, Máquinas Elétricas, NR-10    |
| 6   | Manutenção – Instrumentação | Metrologia, CLP, SCADA, Fieldbus              |
| 7   | Manutenção – Mecânica       | Elementos de Máquinas, Bombas, Preditiva      |
| 8   | Operação                    | Termodinâmica, Refino, Segurança de Processo  |
| 9   | Operação de Lastro          | Estabilidade Naval, SOLAS, MARPOL             |
| 10  | PCM – Edificações           | Materiais, Topografia, AutoCAD, NR 18         |
| 11  | PCM – Elétrica              | Projetos, Luminotécnica, NBR, NR 10           |
| 12  | PCM – Instrumentação        | P&ID, ISA, CLP, Comissionamento               |
| 13  | PCM – Mecânica              | Tubulações, Soldagem, ASME/API, Rigging       |
| 14  | Química de Petróleo         | Analítica, Cromatografia, Qualidade           |
| 15  | Segurança do Trabalho       | Gestão de Riscos, NRs, ISO 45001, HAZOP       |
| 16  | Suprimento – Administração  | Administração, Lei 13.303, Contabilidade      |

---

## 5. DIRETRIZES PARA GERAÇÃO DE CONTEÚDO (NOTEBOOKLM)

### 5.1 Tom e Linguagem

- **Didático e acessível**: Linguagem clara, sem academicismo excessivo
- **Contextualizado**: Sempre que possível, exemplos do ambiente Petrobras (refinaria, plataforma offshore, laboratório, escritório)
- **Progressivo**: Do mais simples ao mais complexo dentro de cada tópico
- **Motivador**: Frases como "Esse tipo de questão caiu 3 vezes nos últimos 5 concursos"

### 5.2 Estilo CESGRANRIO — Características a Observar

Com base nos últimos 10 anos de provas da CESGRANRIO (Petrobras, BB, CEF, BNDES, IBGE):

#### Português (CESGRANRIO)

- **Textos longos** (300-600 palavras) como base para 5-8 questões
- Foco em **inferência** e **interpretação** (não decoreba)
- Questões de **substituição de palavras/expressões** mantendo o sentido
- Questões de **função do conectivo** no contexto
- Questões de **reescritura** com análise de manutenção de sentido
- Questões de **concordância/regência** inseridas no texto
- Questões de **pontuação** com justificativa gramatical

#### Matemática (CESGRANRIO)

- **Enunciados longos** com situação-problema contextualizada
- Exige **interpretação do enunciado** antes do cálculo
- Alternativas com **valores muito próximos** (exige precisão)
- Mistura de conceitos em uma questão (ex: porcentagem + regra de 3)
- Questões de **análise de gráficos e tabelas**
- Problemas de **matemática financeira** com contexto bancário/empresarial
- **Geometria aplicada** (volumes de tanques, áreas de terrenos)

### 5.3 Profundidade Exigida por Tópico

Para cada tópico, o conteúdo gerado deve conter **OBRIGATORIAMENTE**:

```
1. DEFINIÇÃO FORMAL
   → Conceito matemático/gramatical preciso

2. EXPLICAÇÃO INTUITIVA
   → "Em outras palavras..." com analogia do cotidiano

3. CONTEXTUALIZAÇÃO PETROBRAS
   → Como isso aparece no dia a dia de um técnico/operador

4. REGRAS COMPLETAS
   → Todas as regras, sem exceção
   → Incluindo casos especiais e exceções

5. EXEMPLOS RESOLVIDOS (mínimo 5 por subtópico)
   → Passo a passo numerado
   → Do fácil ao difícil

6. TABELA DE RESUMO
   → Formato visual para consulta rápida

7. PEGADINHAS DA CESGRANRIO
   → "A banca costuma..."
   → "Cuidado com..."

8. POOL DE QUESTÕES (mínimo 6 por módulo, 30 por aula)
   → Formato: 5 alternativas (A-E)
   → Explicação detalhada da resposta
   → Contextualização industrial quando possível
```

### 5.4 Formato de Saída Esperado

O conteúdo deve ser gerado em **Markdown estruturado** seguindo este template:

```markdown
# [Matéria] — Tópico X: [Nome do Tópico]

## Módulo 1: [Subtítulo]

### 1.1 [Conceito]

**Definição:** [...]

**Explicação Intuitiva:** [...]

**Contexto Petrobras:** [...]

#### Regras

| Regra | Exemplo | Exceção |
| ----- | ------- | ------- |
| ...   | ...     | ...     |

#### Exemplos Resolvidos

**Exemplo 1** (Fácil):

> Enunciado...
> **Resolução:**
>
> 1. Passo 1
> 2. Passo 2
>    **Resposta:** [...]

**Exemplo 2** (Médio):
[...]

**Exemplo 3** (Difícil/CESGRANRIO):
[...]

#### Pegadinhas Comuns

⚠️ A CESGRANRIO costuma [...]
⚠️ Cuidado com [...]

### Quiz Pool — Módulo 1 (6 questões)

**Q1.** [Enunciado contextualizado]
(A) [...]
(B) [...]
(C) [...]
(D) [...]
(E) [...]
**Gabarito:** C
**Explicação:** [...]

[... Q2 a Q6 ...]

## Módulo 2: [Subtítulo]

[... mesma estrutura ...]
```

---

## 6. LISTA DE MATERIAIS-FONTE PARA O NOTEBOOKLM

### 6.1 Documentos Internos do Projeto

| Arquivo                         | Descrição                              | Caminho                                                               |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| Conteúdo de Português           | Base teórica de Língua Portuguesa      | `source/conteudo/lingua-portuguesa.md`                                |
| Conteúdo de Matemática          | Base teórica de Matemática             | `source/conteudo/matematica.md`                                       |
| Guia de Matérias por Edital     | Mapeamento por profissão               | `source/Guia Estruturado de Matérias - Petrobras Edital 2023.2.md`    |
| Relatório Detalhado de Matérias | 16 profissões + nível superior         | `source/relatorio_materias_petrobras.md`                              |
| Profissões por Escolaridade     | Classificação Médio/Técnico e Superior | `source/Relação de Profissões Petrobras por Nível de Escolaridade.md` |
| Prompt de Aula EAD              | Template de construção de aulas        | `source/PROMPT_AULA_EAD.md`                                           |
| Perfil CESGRANRIO Português     | Análise do estilo da banca             | `source/conteudo/PERFIL_CESGRANRIO_PORTUGUES.md`                      |

### 6.2 Fontes Externas Recomendadas

- Editais Petrobras 2021 e 2023.2 (Cebraspe)
- Provas anteriores CESGRANRIO (Petrobras 2010-2014, BB 2018-2024, CEF 2020-2024)
- Edital CESGRANRIO Petrobras 2026 (quando disponível)
- Livros de referência por matéria (Gramática do Cegalla, Matemática do Iezzi)

---

## 7. CRITÉRIOS DE QUALIDADE

### 7.1 Checklist por Tópico Gerado

- [ ] Definição formal + explicação intuitiva
- [ ] Contextualização Petrobras (mínimo 2 exemplos)
- [ ] Todas as regras com exceções documentadas
- [ ] Mínimo 5 exemplos resolvidos passo a passo
- [ ] Tabela de resumo visual
- [ ] Mínimo 2 pegadinhas da CESGRANRIO identificadas
- [ ] Pool de 30+ questões no formato correto (5 alternativas A-E)
- [ ] Explicação detalhada para cada questão
- [ ] Progressão de dificuldade (20% fácil, 50% médio, 30% difícil)
- [ ] Sem erros matemáticos ou gramaticais nas questões

### 7.2 O que NÃO fazer

- ❌ Conteúdo genérico sem contextualização
- ❌ Questões com mais de uma resposta correta
- ❌ Exemplos sem resolução passo a passo
- ❌ Regras sem exceções (quando existem)
- ❌ Módulos com menos de 2 seções de conteúdo
- ❌ Pools de quiz com menos de 6 questões

---

## 8. PRIORIZAÇÃO DE ENTREGA

### Sprint 1 (Atual): Conhecimentos Básicos — Matemática

Foco: Aulas 8-19 (Funções Logarítmicas → Matemática Financeira)

### Sprint 2: Revisão e Enriquecimento — Português

Foco: Ampliar conteúdo das 11 aulas existentes com mais questões e exemplos

### Sprint 3: Conhecimentos Específicos — Operação

Foco: Primeira profissão específica (mais procurada nos concursos Petrobras)

### Sprint 4+: Demais Profissões

Foco: Expansão gradual por demanda dos usuários

---

> [!TIP]
> **Para o NotebookLM**: Ao processar este PRD junto com os materiais-fonte, gere o conteúdo seguindo a estrutura do **Seção 5.4** (Formato de Saída). Cada tópico deve ser **autocontido e completo**, pronto para ser implementado como componente React sem necessidade de expansão manual adicional.
