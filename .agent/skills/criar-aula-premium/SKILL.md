# 🎓 SKILL: Criar Aula Premium com 10 Módulos

## Objetivo
Automatizar a criação de uma aula completa no padrão **Premium** com:
- ✅ 10 módulos estruturados
- ✅ Sistema de cores dinâmicas (mv[N])
- ✅ Indexação automática de cards
- ✅ Quizzes com títulos dinâmicos
- ✅ Cards de resumo com títulos corretos
- ✅ Gradientes de banner alinhados

## Pré-requisitos
- Node.js v14+
- Repositório Petrobras Quest inicializado
- Acesso a `/scripts/` e `src/lib/moduleColors.ts`

## Processo Completo (Passo a Passo)

### PASSO 1: Criar Arquivo Base da Aula
**Arquivo:** `src/components/aulas/[materia]/Aula[Nome].tsx`

**Estrutura mínima necessária:**
```tsx
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ModuleBanner } from "@/components/aulas/shared";
import { getModuleVariant } from "@/lib/moduleColors";

export default function AulaNovaAula() {
  const [activeTab, setActiveTab] = useState("modulo-1");

  // --- NOMES DOS MÓDULOS (CUSTOMIZAR) ---
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Nome do Módulo 1" },
    { id: "modulo-2", label: "Módulo 2", title: "Nome do Módulo 2" },
    { id: "modulo-3", label: "Módulo 3", title: "Nome do Módulo 3" },
    { id: "modulo-4", label: "Módulo 4", title: "Nome do Módulo 4" },
    { id: "modulo-5", label: "Módulo 5", title: "Nome do Módulo 5" },
    { id: "modulo-6", label: "Módulo 6", title: "Nome do Módulo 6" },
    { id: "modulo-7", label: "Módulo 7", title: "Nome do Módulo 7" },
    { id: "modulo-8", label: "Módulo 8", title: "Nome do Módulo 8" },
    { id: "modulo-9", label: "Módulo 9", title: "Nome do Módulo 9" },
    { id: "modulo-10", label: "Módulo 10", title: "Nome do Módulo 10" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* MÓDULO 1 */}
      <TabsContent value="modulo-1">
        <ModuloBanner
          numero={1}
          titulo="Nome do Módulo 1"
          descricao="Descrição breve do módulo."
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
        />
        <div className="space-y-[50px]">
          {/* Adicionar conteúdo do módulo aqui */}
        </div>
      </TabsContent>

      {/* MÓDULO 2-10: Repetir estrutura acima */}
    </Tabs>
  );
}
```

**Checklist:**
- [ ] Arquivo criado em `src/components/aulas/[materia]/Aula[Nome].tsx`
- [ ] MODULE_DEFS preenchido com 10 módulos
- [ ] Importações básicas adicionadas
- [ ] Estrutura Tabs/TabsContent criada

---

### PASSO 2: Estruturar Módulos com Cards Base

Para cada módulo, adicionar a estrutura mínima:

```tsx
<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
  <ModuleSectionHeader
    index={1}  {/* Será ajustado automaticamente pelo script */}
    title="Título da Seção"
    description="Descrição breve"
    variant={getModuleVariant(1)}  {/* Será convertido para mv[1] */}
  />
  {/* Conteúdo do card aqui */}
</section>
```

**Estrutura esperada por módulo:**
- 3-5 cards de conteúdo (ModuleSectionHeader)
- 1 card ModuleConsolidation (Resumo)
- 1 QuizInterativo

---

### PASSO 3: Executar Scripts de Automação

**Ordem de execução (IMPORTANTE):**

#### 3.1 - Normalizar Variantes de Cores e Indexação
```bash
node scripts/fix-module-variants.js
```
**O que faz:**
- ✅ Substitui `getModuleVariant(N)` → `mv[N]` dinâmico
- ✅ Re-indexa cards sequencialmente (1,2,3...) por módulo
- ✅ Insere declaração `const mv` automaticamente

**Verificar:** Procure por `const mv = Object.fromEntries` no arquivo

---

#### 3.2 - Ajustar Quizzes (Título + Indexação)
```bash
node scripts/fix-quiz-indexing.js
```
**O que faz:**
- ✅ Ajusta `numero={N}` baseado na quantidade de cards do módulo
- ✅ Substitui `titulo` por dinâmico: "QUIZ: [Nome do Módulo]"
- ✅ Extrai nomes de MODULE_DEFS automaticamente

**Verificar:** Quizzes devem ter `numero={último_card + 1}` e `titulo="QUIZ: ..."`

---

#### 3.3 - Ajustar Banners
```bash
node scripts/fix-module-banners.js
```
**O que faz:**
- ✅ Ajusta gradientes dos ModuleBanner
- ✅ Usa cores corretas por módulo (claro 1-5, escuro 6-10)

**Verificar:** Banners têm gradiente com cores corretas

---

#### 3.4 - Ajustar Cards de Resumo (ModuleConsolidation)
```bash
node scripts/fix-module-consolidation-titles.js
```
**O que faz:**
- ✅ Ajusta `moduloNome` para dinâmico: "Módulo N"
- ✅ Preserva indexação já calculada

**Verificar:**
- [ ] Cards de resumo dizem "Resumo do Módulo N" correto
- [ ] **Macete Visual segue o padrão rico do workflow `aula-ultimate.md` (Ícones + Frase + Comparative Cards)**

---

#### 3.5 - Mover "Resumo e Multimídia" (APENAS PARA MATEMÁTICA)
```bash
node scripts/fix-resumo-multimedia.js
```
**O que faz:**
- ✅ Encontra cards "Resumo e Multimídia" com ModuleSummaryCarouselNew
- ✅ Move imagens para dentro de `resumoVisual` do ModuleConsolidation
- ✅ Remove card separado

**Nota:** Só executa em aulas de matemática com padrão específico

---

### PASSO 4: Verificação Final

```bash
# Compilar TypeScript
npx tsc --noEmit

# Verificar se há erros de cores ou indexação
grep -r "getModuleVariant(" src/components/aulas/matematica/AulaNovaAula.tsx
# Resultado esperado: 0 ocorrências (todas devem ser mv[N])

# Verificar declaração mv
grep -c "const mv = Object.fromEntries" src/components/aulas/matematica/AulaNovaAula.tsx
# Resultado esperado: 1
```

---

## Estrutura de Cores Aplicada

**Módulos 1-5 (Cores Claras -300):**
- Âmbar Claro (#fcd34d)
- Azul Claro (#93c5fd)
- Esmeralda Clara (#a7f3d0)
- Vermelho Claro (#fb7185)
- Violeta Clara (#e9d5ff)

**Módulos 6-10 (Cores Escuras -900):**
- Âmbar Muito Escuro (#78350f)
- Azul Muito Escuro (#1e3a8a)
- Esmeralda Muito Escura (#064e3b)
- Vermelho Muito Escuro (#500724)
- Violeta Muito Escura (#4c0519)

---

## Indexação Automática

Os scripts calculam a indexação baseado na **quantidade de cards dentro de cada módulo**:

```
Módulo N:
├── ModuleSectionHeader (index=1)
├── ModuleSectionHeader (index=2)
├── ModuleSectionHeader (index=3)
├── ModuleConsolidation (index=4) ← automaticamente incrementado
└── QuizInterativo (numero=5) ← último + 1
```

**Importante:** A indexação é **sequencial por módulo**, não global!

---

## Exemplo de Execução Completa

```bash
# 1. Criar arquivo base em src/components/aulas/matematica/AulaNovaAula.tsx
# 2. Preencher conteúdo dos 10 módulos
cd /workspace/petrobras-quest

# 3. Executar scripts em ordem
node scripts/fix-module-variants.js
node scripts/fix-quiz-indexing.js
node scripts/fix-module-banners.js
node scripts/fix-module-consolidation-titles.js
node scripts/fix-resumo-multimedia.js  # Opcional, só se houver "Resumo e Multimídia"

# 4. Verificar
npx tsc --noEmit
```

---

## Troubleshooting

### ❌ Problema: Scripts não acham a aula
**Solução:** Verifique se o arquivo está em `src/components/aulas/[materia]/`

### ❌ Problema: Colors não aparecem certas
**Solução:** Rode `fix-module-banners.js` novamente
**Verificar:** `src/lib/moduleColors.ts` está com as 10 cores corretas

### ❌ Problema: Quizzes com numero errado
**Solução:** Rode `fix-quiz-indexing.js` novamente
**Verificar:** MODULE_DEFS tem exatamente 10 módulos com `title:` ou `titulo:`

### ❌ Problema: Cards numerados fora de sequência
**Solução:** Rode `fix-module-variants.js` novamente
**Verificar:** Não há `getModuleVariant(` restantes (apenas `mv[N]`)

---

## Portabilidade para Outras LLMs

Esta skill foi projetada para ser **portável para Claude 3.5 Sonnet, GPT-4, Gemini e outras LLMs** com:

### ✅ Documentação Clara
- Cada script tem comentários explicativos
- Regex patterns documentados
- Ordem de execução clara

### ✅ Dependências Mínimas
- Apenas Node.js built-in (fs, path)
- Nenhuma dependência externa
- Scripts independentes e combináveis

### ✅ Output Previsível
- Cada script mostra quantas mudanças foram feitas
- Logs indicam sucesso/falha
- Idempotente (safe to run multiple times)

### ✅ Fácil de Adaptar
- Padrões regex bem documentados
- Estrutura clara de busca/replace
- Configurações centralizadas (moduleColors.ts)

---

## ⚠️ Proteções de Segurança (IMPORTANTE!)

Todos os scripts foram redesenhados com **proteções contra perda de conteúdo**:

### Como funcionam:
- ✅ `safeWriteFile()`: Bloqueia gravação se conteúdo encolher >2%
- ✅ Valida que componentes críticos não foram removidos
- ✅ Processa de trás pra frente para preservar posições
- ✅ Usa busca por posição + contagem de chaves (não regex perigosa)

### Se um script bloquear:
```bash
# Usar --force APENAS se tiver certeza
node scripts/fix-module-variants.js --force
```

### Antes de rodar QUALQUER script:
1. Faça um `git commit` do estado atual
2. Rode em UM arquivo de teste primeiro
3. Verifique com `git diff arquivo-teste.tsx`
4. Se tudo OK, rode nos outros

**Leia `scripts/SAFETY_GUIDELINES.md` antes de criar novos scripts!**

---

## Próximos Passos (Futuro)

- [ ] Criar template de aula vazia pronta para uso
- [ ] Criar CLI unificado que roda todos scripts em sequência
- [ ] Adicionar validação de MODULE_DEFS antes de rodar scripts
- [ ] Exportar scripts como módulo NPM reutilizável

---

**Versão:** 1.1
**Data:** 2026-03-15 (revisado com proteções)
**Autor:** Claude Code
**Status:** ✅ Testado, pronto para produção, com proteção contra perda de dados
