⚠️ GUIA DE SEGURANÇA PARA SCRIPTS DE AUTOMAÇÃO
============================================

## REGRA DE OURO: NUNCA PERDER CONTEÚDO

Quando você trabalha com scripts que modificam arquivos TSX/HTML, o risco CRÍTICO é **perder blocos de conteúdo inteiros**. Isso já aconteceu uma vez neste projeto e custou horas de trabalho.

---

## O QUE ACONTECEU (Histórico)

### Incidente - 2026-03-14

**O Problema:**
- Scripts usavam regex com `[\s\S]*?` para encontrar componentes
- O padrão `[\s\S]*?` é "não-guloso" mas **sem âncoras**
- Quando múltiplos componentes similares existem, a regex pode:
  - Começar em um `<ModuleBanner` e terminar no `/>` do **próximo** componente
  - Ou pior: remover todo um bloco entre `<section>` e `</section>` se houver múltiplas seções

**O Resultado:**
- **AulaPorcentagem**: perdeu 2.065 linhas (quase todo conteúdo)
- **AulaConjuntos**: perdeu 955 linhas
- **Outras 28 aulas**: 170-200 linhas cada
- **Total**: ~4.668 linhas de conteúdo premium perdidas

**Como foi descoberto:**
- Usuário visualizou a aula no navegador
- Módulo 1 estava vazio (somente "Resumo do Módulo" aparecia)
- `git diff` mostrou redução maciça de linhas

---

## PROTEÇÕES IMPLEMENTADAS

### 1. **Módulo `scripts/lib/safety.js`**

Todas as funções críticas agora usam:

```javascript
const { safeWriteFile, findTsxFiles, findSelfClosingTagBounds, isForceMode } = require("./lib/safety");
```

**`safeWriteFile(filePath, newContent, originalContent, options)`**
- ✅ Bloqueia gravação se conteúdo **encolheu mais de 2%**
- ✅ Valida que componentes críticos não foram removidos:
  - `ContentAccordion`, `FlipCard`, `CardCarousel`
  - `ModuleConsolidation`, `QuizInterativo`
  - `ModuleSectionHeader`, `ModuleBanner`
- ✅ Mostra mensagem de erro clara antes de bloquear
- ✅ Permite `--force` para ignorar (com advertência visual)

**Exemplo de uso:**
```javascript
if (safeWriteFile(filePath, newContent, originalContent, { relPath })) {
  totalFilesChanged++;
} else {
  totalBlocked++;
  continue; // Não salva, continua próximo arquivo
}
```

### 2. **Funções de Busca Seguras**

Em vez de:
```javascript
// ❌ PERIGOSO
const regex = /<ModuleBanner[\s\S]*?\/>/g;
```

Use:
```javascript
// ✅ SEGURO
const startIdx = content.indexOf("<ModuleBanner");
const endIdx = findTagEnd(content, startIdx);
```

**Diferenças:**
- `[\s\S]*?` não respeita chaves `{}` (pode cruzar propriedades)
- `findTagEnd()` **conta chaves** para não cruzar expressões JSX
- `findEnclosingSection()` balanceia tags aninhadas corretamente

### 3. **Processamento Reverso**

Sempre processa do final para o início quando há múltiplas edições:

```javascript
// ❌ PERIGOSO - as posições mudam após primeira substituição
for (let i = 0; i < items.length; i++) {
  content = content.replace(oldText, newText);
}

// ✅ SEGURO - preserva posições absolutas
for (let i = items.length - 1; i >= 0; i--) {
  const start = items[i].start;
  const end = items[i].end;
  content = content.substring(0, start) + newText + content.substring(end);
}
```

---

## PADRÃO OBRIGATÓRIO PARA NOVOS SCRIPTS

Se você criar um novo script, **DEVE** seguir este template:

```javascript
/**
 * Script para [DESCRIÇÃO]
 *
 * O que faz:
 * - ✅ [Ação 1]
 * - ✅ [Ação 2]
 * - ⚠️ Remove [seção específica] (controlado)
 *
 * ⚠️ SAFETY: [Qual proteção está sendo usada]
 */

const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, isForceMode } = require("./lib/safety");

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);
const forceMode = isForceMode();

let totalFilesChanged = 0;
let totalBlocked = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");
  if (/* skip condition */) continue;

  const originalContent = content;
  let fileChanges = 0;

  // --- MODIFICAÇÕES AQUI ---
  // NUNCA use [\s\S]*? sem âncoras
  // SEMPRE use findTagEnd(), findEnclosingSection(), etc.

  if (fileChanges > 0) {
    const relPath = path.relative(aulaDir, filePath);

    if (forceMode) {
      fs.writeFileSync(filePath, content, "utf8");
      totalFilesChanged++;
    } else if (safeWriteFile(filePath, content, originalContent, { relPath })) {
      totalFilesChanged++;
    } else {
      totalBlocked++;
      continue;
    }

    console.log(`  ✅ ${relPath}: ${fileChanges} mudança(s)`);
  }
}

console.log(`\nTotal: ${totalFilesChanged} arquivos modificados`);
if (totalBlocked > 0) {
  console.log(`⚠️  ${totalBlocked} arquivo(s) BLOQUEADO(s) por segurança. Use --force para forçar.`);
}
```

---

## REGEX - REGRAS DE OURO

### ❌ NUNCA FAÇA ISTO

```javascript
// 1. Regex sem âncoras claras
/<Component[\s\S]*?\/>/g
// Problema: pode capturar desde um <Component até o /> de outro

// 2. Capture groups complexos demais
/(<ModuleConsolidation)([\s\S]*?)(\/>)/
// Problema: se houver <Component ... /> dentro, `[\s\S]*?` pega tudo até o último />

// 3. Substituição genérica
content = content.replace(oldText, newText);
// Problema: se oldText aparecer 2x, ambas são substituídas (risco!)
// Melhor: verificar que oldText é único ou usar posições absolutas
```

### ✅ SEMPRE FAÇA ISTO

```javascript
// 1. Busca por posição
const idx = content.indexOf("<ComponentName");
const endIdx = findTagEnd(content, idx); // Respeita chaves

// 2. Substitua por posição
const oldTag = content.substring(idx, endIdx);
const newTag = oldTag.replace(/property="[^"]*"/, 'property="novo"');
content = content.substring(0, idx) + newTag + content.substring(endIdx);

// 3. Verificação de sanidade
if (oldTag === newTag) {
  // Nada mudou, continue
  continue;
}

// 4. Use safeWriteFile
if (!safeWriteFile(filePath, content, originalContent)) {
  // Script bloqueou por segurança, NÃO salva
  continue;
}
```

---

## CHECKLIST ANTES DE RODAR QUALQUER SCRIPT

- [ ] **Fiz um commit** do estado atual? (`git status` deve estar limpo antes de rodar)
- [ ] **Li o código do script** e identifiquei as regex usadas?
- [ ] **Rodei em um único arquivo de teste** primeiro? (`node script.js | head -20`)
- [ ] **Verifiquei o resultado** com `git diff arquivo-teste.tsx`?
- [ ] **Rastreei o tamanho do arquivo** antes/depois? (`wc -l antes.tsx depois.tsx`)
- [ ] **Se algo reduziu >2%**, investiguei antes de rodar em todos os arquivos?

---

## COMO DEBUGAR SE ALGO DER ERRADO

### 1. Primeira coisa: Reverter
```bash
git checkout -- src/components/aulas/
# Volta TODAS as aulas ao último commit
```

### 2. Entender o que deu errado
```bash
git diff HEAD -- src/components/aulas/matematica/AulaConjuntos.tsx | head -100
# Mostra as primeiras 100 linhas de diferença
```

### 3. Testar em um arquivo isolado
```bash
# Copia um arquivo para teste
cp src/components/aulas/matematica/AulaConjuntos.tsx /tmp/test-conjuntos.tsx

# Roda o script (se permitido)
node scripts/fix-module-variants.js

# Compara tamanho
wc -l /tmp/test-conjuntos.tsx src/components/aulas/matematica/AulaConjuntos.tsx
```

### 4. Se o script bloqueou por segurança
```bash
# Força a execução (só se tiver certeza do que está fazendo)
node scripts/fix-module-variants.js --force
```

---

## SCRIPTS CORRIGIDOS (2026-03-15)

Todos estes scripts foram reescritos com proteções `safeWriteFile`:

1. ✅ `scripts/fix-module-variants.js` - Converte getModuleVariant() → mv[N]
2. ✅ `scripts/fix-quiz-indexing.js` - Ajusta número e título dos quizzes
3. ✅ `scripts/fix-module-banners.js` - Atualiza gradientes de cores
4. ✅ `scripts/fix-module-consolidation-titles.js` - Ajusta títulos de resumo
5. ✅ `scripts/fix-resumo-multimedia.js` - Move cards de "Resumo e Multimídia"
6. ✅ `scripts/lib/safety.js` - Módulo compartilhado de proteção

---

## EXEMPLO REAL: O que mudou

### Antes (❌ Perigoso)
```javascript
// Remoção genérica - pode apagar conteúdo não-intencional
content = content.replace(fullSection, "");
```

### Depois (✅ Seguro)
```javascript
// Remoção controlada por posição
const start = sectionStart;
const end = sectionEnd;
if (start !== -1 && end !== -1) {
  content = content.substring(0, start) + content.substring(end);
  // E validado por safeWriteFile antes de gravar
}
```

---

## CONCLUSÃO

**Sempre que for automatizar mudanças em código:**

1. **Favoreça busca por posição** sobre regex global
2. **Use `safeWriteFile()` sempre** antes de gravação
3. **Processe de trás pra frente** se houver múltiplas edições
4. **Teste em um arquivo primeiro** antes de rodar em todos
5. **Tenha um commit recente** para poder reverter rapidamente

**A 2% threshold é CONSERVADORA** - permite mudanças legítimas mas bloqueia acidentes.

---

**Versão:** 1.0
**Data:** 2026-03-15
**Status:** 🛡️ Proteção crítica ativa
