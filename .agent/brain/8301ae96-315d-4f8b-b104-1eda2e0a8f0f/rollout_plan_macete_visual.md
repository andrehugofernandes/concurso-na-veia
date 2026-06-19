# Plano de Rollout: Restauração do Macete Visual Premium

Este documento detalha os passos necessários para restaurar o estilo visual de alto impacto (com emojis e layouts de 2 colunas) em todas as aulas onde o padrão "Premium" anterior removeu elementos visuais amados pelo usuário.

## 🎯 Objetivo

Garantir que todas as aulas de **Matemática** e **Conhecimentos Específicos** possuam uma **Síntese Estratégica ("Macete Visual")** que utilize emojis grandes, animações e grids comparativos, mantendo o rigor técnico nos outros componentes (FlipCards, Intro, etc).

---

## 🛠️ O Novo Padrão de Síntese Estratégica

Cada módulo deve encerrar sua teoria com o seguinte bloco no `ModuleConsolidation`:

```tsx
sinteseEstrategica={{
  title: "Macete Visual: [Nome Criativo]",
  content: (
    <>
      <div className="text-6xl my-6 animate-bounce"> [EMOJIS RELACIONADOS] </div>
      <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
        "[FRASE DE IMPACTO / MNEMÔNICO]"
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
        {/* CARD 1 — FOCO A */}
        <div className="p-4 bg-[COR]-500/5 border border-[COR]-500/20 rounded-xl">
          <h4 className="text-lg font-bold text-[COR]-600 dark:text-[COR]-400 mb-2">Título A</h4>
          <p className="text-sm mt-2 font-black text-[COR]-700 dark:text-[COR]-300">Explicação A ✅</p>
        </div>
        {/* CARD 2 — FOCO B */}
        <div className="p-4 bg-[COR]-500/5 border border-[COR]-500/20 rounded-xl">
          <h4 className="text-lg font-bold text-[COR]-600 dark:text-[COR]-400 mb-2">Título B</h4>
          <p className="text-sm mt-2 font-black text-[COR]-700 dark:text-[COR]-300">Explicação B ✅</p>
        </div>
      </div>
    </>
  ),
}}
```

---

## 📅 Cronograma de Implementação

### 1. Matemática (Prioridade Alta)

- [x] **AulaConjuntos.tsx**: Módulo 1 (Finalizado)
- [ ] **AulaConjuntos.tsx**: Módulos 2 a 10 (Restaurar emojis e layout)
- [ ] **AulaRazaoProporcao.tsx**: Módulos 1-10
- [ ] **AulaEquacoes.tsx**: Módulos 1-10
- [ ] **AulaGeometria.tsx**: Módulos 1-10
- [ ] **AulaProbabilidade.tsx**: Módulos 1-10

### 2. Conhecimentos Específicos (Prioridade Média)

- [ ] **AulaProcessosRefino.tsx**: Focar em emojis industriais (🏗️ ⛽ 🏭)
- [ ] **AulaSegurancaTrabalho.tsx**: Focar em emojis de alerta (⚠️ 🦺 🛡️)
- [ ] **AulaInstrumentacao.tsx**: Focar em emojis técnicos (📟 🔌 ⚙️)

---

## 🔍 Guia de Ação para o Desenvolvedor

Para cada aula listada:

1. **Localize** o componente `ModuleConsolidation`.
2. **Substitua** o conteúdo simplificado de `sinteseEstrategica` pelo layout de "Macete Visual".
3. **Selecione** 2 ou 3 emojis que resumam o "coração" do módulo.
4. **Crie** uma frase de impacto (Mnemônico) curta e poderosa.
5. **Teste** a responsividade no celular (o grid deve empilhar corretamente).

---

> [!IMPORTANT]
> Este plano deve ser executado respeitando o `standard` de **não usar emojis nos FlipCards**, mantendo a distinção clara entre "Teoria Passo-a-Passo" (Lucide) e "Âncora de Memória" (Emoji).
