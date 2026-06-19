---
name: administracao-suprimento-builder
description: "Especializa o agente na criação, expansão e formatação pedagógica de aulas do bloco de Administração e Suprimentos do Petrobras Quest, aplicando a introdução teórica densa (C.E.D.E.A de 10 parágrafos), tipografia aumentada (desktop-first), acordeons stacked e conformidade estrita com o Purple Ban."
allowed-tools: Read, Write, Edit, Command
version: 1.0
priority: HIGH
skills:
  - clean-code
  - criar-aula-premium
triggers:
  - administracao geral suprimento
  - bloco i administracao
  - gerir aulas suprimento
  - C.E.D.E.A expandido
---

# Skill: Administração e Suprimentos Builder

> **PROPÓSITO:** Padronizar as aulas teóricas e práticas do bloco estratégico de Administração Geral, Gestão de Materiais e Suprimentos no Petrobras Quest. Esta skill orienta a produção de conteúdo denso, alinhado ao rigor acadêmico cobrado em concursos públicos de nível superior da Petrobras (banca CESGRANRIO).

---

## 📐 1. ESTRUTURAÇÃO PEDAGÓGICA C.E.D.E.A EXPANDIDA

Toda introdução de módulo deve possuir alta densidade explicativa, abandonando resumos breves em prol de um dossiê teórico detalhado.

### A. Anatomia dos 10 Parágrafos (Pilar a Pilar)
A introdução do módulo (`index="INTRO"`) deve possuir **exatamente 10 parágrafos**, estruturados da seguinte forma:
1. **Contexto (Parágrafos 1 e 2):** Contextualização histórica do tema e relevância do conceito no planejamento estratégico de grandes corporações.
2. **Explicação (Parágrafos 3 e 4):** Aprofundamento conceitual direto, definindo terminologias, teorias clássicas e autores fundamentais (ex: Simon, Herzberg, Katz, Fayol).
3. **Demonstração (Parágrafos 5 e 6):** Exemplo prático do dia a dia organizacional, contrapondo erros e acertos operacionais.
4. **Expansão (Parágrafos 7 e 8):** Discussão de fluxos informais, exceções regulatórias, conflitos relacionais ou desdobramentos de mercado decorrentes do conceito.
5. **Aplicação (Parágrafos 9 e 10):** Correlação direta com a Petrobras (operações integradas offshore/onshore) e conformidade com a Lei das Estatais (Lei 13.303/16).

### B. Elemento Wrapper
Use obrigatoriamente a classe de formatação e espaçamento abaixo para o container da introdução:
```tsx
<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
  {/* Parágrafos densos */}
</div>
```

---

## 📐 2. COMPONENTES TEÓRICOS & ACCORDIONS (STACKED-FIRST)

O card principal de aprofundamento técnico ("Análise Técnica C.E.D.E.") deve adotar o componente de acordeon e títulos formais.

### A. Títulos Acadêmicos Conservadores
Substitua títulos informais ou genéricos por nomenclaturas de rigor acadêmico de acordo com o módulo:
* *Fundamentos:* Habilidades e Papéis Gerenciais no Contexto Administrativo
* *PODC:* Aprofundamento Funcional do Ciclo Administrativo
* *Estruturas:* Modelagem e Análise do Design Organizacional
* *Comportamento:* Vetores da Dinâmica Humana nas Organizações
* *Processos:* Metodologia e Ciclos de Melhoria BPM
* *Teorias:* Fundamentos Históricos e Escolas de Pensamento
* *Comunicação:* Mecanismos de Diálogo e Gestão de Conflitos
* *Decisão:* Racionalidade Decisória e Vetores de Inovação
* *Petrobras:* Direito Administrativo Aplicado à Sociedade de Economia Mista

### B. Configuração e Fontes do Acordeon
* **Modo Stacked:** Sempre declare `mode="stacked"` no `ContentAccordion` para permitir a expansão simultânea de itens.
* **Proibição de Tamanhos Pequenos:** É estritamente **proibido** utilizar `text-sm`, `text-xs` ou `text-xxs` no corpo de texto dos itens do acordeon.
* **Tamanhos Homologados (Desktop-First):**
  * Corpo de texto padrão: `text-lg text-justify`
  * Títulos de tabelas ou cabeçalhos internos (`h5`, `h6`, `strong` destacados): `text-xl`
  * Emojis de Destaque / Conclusão: `text-6xl my-6 animate-pulse`

---

## 🔄 3. SEQUÊNCIA CRONOLÓGICA DE CARDS (FLUXO PEDAGÓGICO)

Cada módulo deve guiar o aluno em um fluxo intuitivo de aquisição de conhecimento, onde o resumo e a consolidação de áudio/vídeo preparam o terreno para o teste final.

A ordem dos componentes deve ser exatamente:
1. **Banner do Módulo** (`ModuleBanner`)
2. **Introdução Teórica** (`ModuleSectionHeader` com `index="INTRO"` + Bloco C.E.D.E.A de 10 parágrafos)
3. **Acordeon Acadêmico** (`ContentAccordion` com `mode="stacked"`)
4. **Exemplos e Exercícios de Fixação** (se houver)
5. **Flashcards de Revisão** (`FlipCard`s em grid com `gap-6` e ícones Lucide)
6. **Mesa de Consolidação** (`ModuleConsolidation` contendo links de mídia e `sinteseEstrategica`)
7. **Quiz Interativo** (`QuizInterativo` fechando o módulo)

> ⚠️ **REGRA DE OURO:** O resumo do módulo (`ModuleConsolidation`) deve sempre vir **antes** do quiz (`QuizInterativo`). O quiz é o último elemento do fluxo de cada módulo.

---

## 🎨 4. ESTÉTICA PREMIUM & PURPLE BAN

O design visual deve evocar seriedade e profissionalismo técnico.

* **🚫 Purple Ban:** Não utilize cores violeta, fúcsia, roxo ou índigo em fundos, bordas ou textos de destaque. Prefira `teal`, `emerald`, `cyan`, `blue`, `amber` ou `rose`.
* **Emojis Grandes:** O campo `sinteseEstrategica` do `ModuleConsolidation` deve começar com uma linha contendo emojis animados grandes (ex: `<span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span>`).
* **Grids de Síntese:** Estruture os tópicos críticos em grids semânticos (`grid grid-cols-1 md:grid-cols-3 gap-4 text-lg`) com fundos suaves (`bg-[color]-500/10`) e bordas coloridas.
* **Geometria:** Mantenha bordas consistentes e cantos arredondados premium de acordo com as regras de design.
