---
description: Como integrar o Sistema de Coloração no Workflow /aula
---

# 🔗 Integração com Workflow `/aula`

Este documento mostra como o **Sistema de Coloração de Módulos (1-10)** deve ser implementado no workflow de criação de aulas.

---

## 📋 Atualizações Necessárias no `.agent/workflows/aula.md`

### PASSO 3: Criar/reescrever o componente da aula

**Adicionar seção obrigatória antes de "Conteúdo obrigatório por módulo":**

```markdown
### ⚠️ OBRIGATÓRIO: Sistema de Coloração de Módulos

Cada aula deve usar o Sistema de Coloração de Módulos (1-10).
Sem exceções. Sem cores hardcoded.

**Arquivo de referência:**
- Documentação: `.agent/design-systems/MODULO_COLOR_SYSTEM.md`
- Código: `src/lib/moduleColors.ts`

**Imports obrigatórios:**

\`\`\`tsx
import { getModuleVariant, getModuleColor } from "@/lib/moduleColors";
\`\`\`

**Cada módulo deve seguir:**

1. **ModuleBanner**
   \`\`\`tsx
   <ModuleBanner
     index={1}  // ← Número do módulo (1-10)
     titulo="Fundamentos de Conjuntos"
     descricao="..."
   />
   // → Automaticamente será azul (módulo 1)
   // → Módulo 2 será ciano, módulo 3 verde, etc
   \`\`\`

2. **ModuleSectionHeader**
   \`\`\`tsx
   <ModuleSectionHeader
     index={1}
     title="Conceitos Fundamentais"
     variant={getModuleVariant(1)}  // ← OBRIGATÓRIO
   />
   \`\`\`

3. **CardCarousel**
   \`\`\`tsx
   <CardCarousel
     cards={[...]}
     slidesPerView={2}
     corIndicador={`bg-${getModuleColor(1)}`}  // ← OBRIGATÓRIO
   />
   \`\`\`

4. **Quiz/QuizInterativo**
   \`\`\`tsx
   <QuizInterativo
     questoes={quizM1}
     // Usar cor do módulo
   />
   \`\`\`

**Validação (Checklist):**

- [ ] ModuleBanner tem `index={1}` a `index={10}`
- [ ] ModuleSectionHeader tem `variant={getModuleVariant(index)}`
- [ ] CardCarousel tem `corIndicador={...}` com cor do módulo
- [ ] Quiz renderiza com cor do módulo
- [ ] Nenhuma cor hardcoded em strings (grep: `bg-blue`, `bg-red`, etc)
- [ ] Teste visual: 10 cores diferentes visíveis
```

---

## 🎨 Paleta de Cores (Referência Rápida)

| Módulo | Cor      | Tailwind      | Hex       |
|--------|----------|---------------|-----------|
| 1      | Azul     | blue-500      | #3b82f6   |
| 2      | Ciano    | cyan-500      | #06b6d4   |
| 3      | Esmeralda| emerald-500   | #10b981   |
| 4      | Teal     | teal-500      | #14b8a6   |
| 5      | Violeta  | violet-500    | #a78bfa   |
| 6      | Âmbar    | amber-500     | #f59e0b   |
| 7      | Laranja  | orange-500    | #f97316   |
| 8      | Vermelho | red-500       | #ef4444   |
| 9      | Rosa     | pink-500      | #ec4899   |
| 10     | Índigo   | indigo-500    | #6366f1   |

---

## 📝 Exemplo Completo (Um Módulo)

```tsx
// CORRETO ✅

export default function AulaExemplo({ ... }: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Aprofundamento" },
    // ... até modulo-10
  ];

  return (
    <AulaTemplate active={activeTab} onChangeTab={setActiveTab} modules={MODULE_DEFS}>
      <TabsContent value="modulo-1">
        {/* BANNER - Automaticamente azul (módulo 1) */}
        <ModuleBanner
          index={1}
          titulo="Fundamentos do Assunto"
          descricao="Definições e conceitos iniciais"
        />

        <div className="space-y-[50px]">
          {/* SEÇÃO 1 */}
          <section className="bg-card rounded-2xl border border-border p-8 space-y-6">
            {/* HEADER - Usa variant azul (módulo 1) */}
            <ModuleSectionHeader
              index={1}
              title="Conceitos Iniciais"
              variant={getModuleVariant(1)}
            />

            {/* CARROSSEL - Usa indicador azul */}
            <CardCarousel
              cards={[...]}
              slidesPerView={2}
              corIndicador={`bg-${getModuleColor(1)}`}
            />

            {/* ALERTA */}
            <AlertBox tipo="warning">Pegadinha CESGRANRIO</AlertBox>
          </section>

          {/* CONSOLIDAÇÃO */}
          <ModuleConsolidation
            index={1}
            variant={getModuleVariant(1)}
            // ... props
          />

          {/* QUIZ */}
          <section id="quiz-modulo-1">
            <QuizInterativo questoes={quizM1} ... />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-2">
        {/* Repetir para módulo 2, mas com index={2} */}
        {/* → Automaticamente CIANO (cyan-500) em todos lugares */}
      </TabsContent>

      {/* ... até modulo-10 (Índigo) */}
    </AulaTemplate>
  );
}
```

---

## ❌ Exemplos de ERROS Comuns

### Erro 1: Cores Hardcoded
```tsx
// ❌ ERRADO
<ModuleBanner variant="blue" />  // Todos azuis!
<div className="bg-orange-500" />  // Módulo 7 em string!
```

### Erro 2: Index Faltando
```tsx
// ❌ ERRADO
<ModuleSectionHeader title="..." variant="blue" />
// Qual módulo é? Não há índice!
```

### Erro 3: Variant Inconsistente
```tsx
// ❌ ERRADO
<ModuleSectionHeader index={5} variant="blue" />
// Módulo 5 é violeta, não azul!
```

### Erro 4: Sem Usar Funções Auxiliares
```tsx
// ❌ ERRADO
corIndicador="bg-emerald-500"  // Hardcoded!

// ✅ CORRETO
corIndicador={`bg-${getModuleColor(3)}`}
```

---

## ✅ Validação Automática

### Grep para Cores Hardcoded

```bash
# EXECUTAR ANTES DE DEPLOY:

# Procura por cores hardcoded em aulas
grep -r "bg-blue-500\|bg-cyan-500\|bg-emerald-500" src/components/aulas/

# Procura por variant hardcoded
grep -r 'variant="blue"\|variant="cyan"' src/components/aulas/

# Se encontrar algo, é não-conformidade!
```

### Teste Visual

1. Abrir cada aula no browser
2. Verificar se:
   - [ ] Módulo 1 é AZUL
   - [ ] Módulo 2 é CIANO
   - [ ] Módulo 3 é ESMERALDA
   - [ ] ... (até módulo 10 = ÍNDIGO)
   - [ ] Banner, header e indicadores tem a mesma cor
   - [ ] 10 cores visiblemente diferentes

---

## 🔄 Fluxo de Implementação

### Ao Criar uma Aula Nova

1. **Ler** `.agent/design-systems/MODULO_COLOR_SYSTEM.md`
2. **Copiar** imports de `moduleColors.ts`
3. **Garantir** cada módulo (1-10) tem:
   - ModuleBanner com `index={N}`
   - ModuleSectionHeader com `variant={getModuleVariant(N)}`
   - CardCarousel com `corIndicador={...}`
4. **Testar** visualmente
5. **Validar** com grep (nenhuma cor hardcoded)
6. **Deploy**

### Ao Atualizar uma Aula Existente

1. **Varredura** com grep para cores hardcoded
2. **Substituir** cores hardcoded por funções
3. **Adicionar** `variant` em ModuleSectionHeader
4. **Validar** com grep novamente
5. **Teste visual**
6. **Deploy**

---

## 📞 Troubleshooting

**P: Onde encontrar a paleta?**
R: `.agent/design-systems/PALETA_VISUAL.txt` (ASCII art com todas as cores)

**P: Como validar se está correto?**
R: `.agent/audits/COLOR_SYSTEM_AUDIT.md` (checklist por aula)

**P: Preciso usar outra cor?**
R: Não. Sistema é obrigatório. Se a paleta não serve, abra issue.

**P: Como importar as funções?**
R: `import { getModuleVariant, getModuleColor } from "@/lib/moduleColors";`

**P: E se a aula não tiver 10 módulos?**
R: Aulas SEMPRE têm 10 módulos no padrão premium. Ver `.agent/workflows/aula.md` PASSO 3.

---

## 🎯 Próximas Ações

1. ✅ Sistema documentado
2. ✅ Funções criadas (`moduleColors.ts`)
3. ⏳ **Atualizar workflow `/aula`** para incluir esta seção
4. ⏳ **Varredura completa** de aulas existentes
5. ⏳ **Correção** de aulas não-conformes
6. ⏳ **Treinar LLM** para usar automaticamente

---

## 📚 Referências

- **Paleta**: `.agent/design-systems/PALETA_VISUAL.txt`
- **Documentação Completa**: `.agent/design-systems/MODULO_COLOR_SYSTEM.md`
- **Código**: `src/lib/moduleColors.ts`
- **Auditoria**: `.agent/audits/COLOR_SYSTEM_AUDIT.md`
- **Workflow**: `.agent/workflows/aula.md`

---

**Última atualização:** 2026-03-14
**Status:** 🟢 Pronto para integração
