# Plano: Remoção de Referências Autorais — Proteção contra Plágio e Direitos Autorais

## Contexto

O projeto Petrobras Quest contém **centenas de referências diretas** a autores, obras e gramáticas protegidas por direitos autorais. Isso expõe o projeto a riscos jurídicos significativos, pois o conteúdo se apresenta como se fosse baseado (ou extraído) dessas obras.

A estratégia é **despersonalizar** todo o conteúdo, substituindo referências a autores/obras por linguagem genérica baseada em:
- **Norma-padrão da língua portuguesa** (gramática normativa pública)
- **Conceitos matemáticos universais** (domínio público)
- **Teorias administrativas de domínio público** (conceitos consagrados)

---

## 🔍 Autores Identificados por Matéria

### 📚 PORTUGUÊS (RISCO ALTO — Prioridade 1)

| Autor | Obra Citada | Ocorrências | Arquivos Afetados |
|-------|-------------|-------------|-------------------|
| **Evanildo Bechara** | "Moderna Gramática Portuguesa" | ~60+ | 6 arquivos |
| **Celso Cunha** | "Nova Gramática do Português Contemporâneo" | ~10+ | 2 arquivos |

**Arquivos afetados:**

| Arquivo | Bechara | Celso Cunha | Total |
|---------|---------|-------------|-------|
| `AulaCoesaoCoerencia.tsx` | ~35 | 0 | ~35 |
| `AulaReescritaFrases.tsx` | ~4 | ~4 | ~8 |
| `AulaInterpretacaoTexto.tsx` | ~3 | 0 | ~3 |
| `AulaClassesPalavras.tsx` | ~3 | 0 | ~3 |
| `AulaConcordancia.tsx` | ~2 | 0 | ~2 |
| `AulaRegencia.tsx` | ~2 | ~1 | ~3 |

**Expressões-chave a remover:**
- `"Segundo Evanildo Bechara"` → substituir por `"Segundo a gramática normativa"`
- `"Moderna Gramática Portuguesa"` → substituir por `"a tradição gramatical"`
- `"Padrão Bechara"` → substituir por `"padrão normativo"` ou `"norma culta"`
- `"O Microscópio de Bechara"` → substituir por `"Análise Normativa Aprofundada"`
- `"Segundo Celso Cunha"` → substituir por `"Conforme a gramática normativa"`
- `"Nova Gramática do Português Contemporâneo"` → remover título da obra
- `"gramática de Bechara"` → `"gramática normativa"`
- `"gramática de Bechara e Cunha"` → `"tradição gramatical normativa"`

---

### 📊 ADMINISTRAÇÃO (RISCO MÉDIO — Prioridade 2)

> [!IMPORTANT]
> Os autores de Administração são um caso **diferente** de Português. Nomes como Porter, Maslow, Herzberg, Deming etc. são **indissociáveis de suas teorias** — as próprias bancas de concurso cobram "Segundo Porter", "Teoria de Maslow" etc. Remover esses nomes **prejudicaria a qualidade pedagógica** e a fidelidade ao conteúdo de prova.

| Autor | Contexto | Risco | Recomendação |
|-------|----------|-------|--------------|
| **Michael Porter** | 5 Forças, Estratégias Genéricas | ⚠️ BAIXO | **MANTER** — nome é parte do conceito |
| **Henry Mintzberg** | 5 Ps da Estratégia | ⚠️ BAIXO | **MANTER** |
| **Maslow** | Pirâmide de Necessidades | ⚠️ BAIXO | **MANTER** |
| **Herzberg** | Teoria dos 2 Fatores | ⚠️ BAIXO | **MANTER** |
| **McGregor** | Teoria X e Y | ⚠️ BAIXO | **MANTER** |
| **Chiavenato** | Gestão de Pessoas (obra citada) | 🔴 ALTO | **REMOVER referência à obra** |
| **Deming** | 14 Pontos, PDCA | ⚠️ BAIXO | **MANTER** |
| **Juran** | Trilogia da Qualidade | ⚠️ BAIXO | **MANTER** |
| **Crosby** | Zero Defeitos | ⚠️ BAIXO | **MANTER** |
| **Ishikawa** | Diagrama Causa-Efeito, CCQ | ⚠️ BAIXO | **MANTER** |
| **Feigenbaum** | TQC | ⚠️ BAIXO | **MANTER** |
| **Shewhart** | Gráficos de Controle | ⚠️ BAIXO | **MANTER** |
| **Pareto** | Princípio 80/20 | ⚠️ BAIXO | **MANTER** |
| **Kaplan & Norton** | BSC | ⚠️ BAIXO | **MANTER** |
| **Lambert** | 8 Processos SCM | ⚠️ BAIXO | **MANTER** |
| **Vroom** | Teoria da Expectativa | ⚠️ BAIXO | **MANTER** |
| **Adams** | Teoria da Equidade | ⚠️ BAIXO | **MANTER** |
| **Hersey & Blanchard** | Liderança Situacional | ⚠️ BAIXO | **MANTER** |
| **Peter Drucker** | Frase citada | ⚠️ BAIXO | **MANTER** (citação acadêmica) |
| **PMBOK** | Guia de Projetos | ⚠️ BAIXO | **MANTER** (referência padrão) |
| **Ansoff** | Matriz de Crescimento | ⚠️ BAIXO | **MANTER** |

> [!NOTE]
> Na Administração, os nomes dos autores **SÃO o conteúdo**. As bancas perguntam "Segundo Porter..." ou "Na teoria de Maslow...". Remover esses nomes seria pedagógicamente errado. O risco jurídico é **inexistente** porque estamos referenciando conceitos acadêmicos públicos, não copiando textos de obras.

**Única ação necessária em Administração:**
- `AulaGestãoDePessoas.tsx` linha 2559: Remover referência bibliográfica completa de Chiavenato (`"CHIAVENATO, Idalberto. Gestão de Pessoas..."`)

---

### 🔢 MATEMÁTICA (SEM RISCO)

> [!TIP]
> **Nenhuma referência autoral** foi encontrada nas aulas de matemática. Todo o conteúdo é baseado em conceitos matemáticos universais de domínio público. ✅ Nenhuma ação necessária.

---

### 🌐 OUTRAS MATÉRIAS (SEM RISCO)

| Matéria | Status |
|---------|--------|
| Inglês | ✅ Sem referências autorais |
| Segurança | ✅ Sem referências autorais |
| Operação | ✅ Sem referências autorais |
| TI | ✅ Sem referências autorais |
| Manutenção | ✅ Sem referências autorais |

---

## User Review Required

> [!IMPORTANT]
> **Decisão sobre Administração:** Os autores de Administração (Porter, Maslow, Herzberg, Deming etc.) devem ser mantidos porque seus nomes **são parte inseparável dos conceitos cobrados em prova**. A banca CESGRANRIO literalmente pergunta "Segundo Porter..." nas questões. Remover esses nomes prejudicaria o aluno. Você concorda com essa abordagem?

> [!WARNING]  
> **Referência bibliográfica de Chiavenato:** Na aula de Gestão de Pessoas existe uma referência bibliográfica completa (`CHIAVENATO, Idalberto. Gestão de Pessoas: O Novo Papel...`). Isso sugere que conteúdo pode ter sido extraído dessa obra. Recomendo remover a referência bibliográfica mas manter o nome "Chiavenato" quando for parte do conceito teórico (ex: "Evolução de Chiavenato").

---

## Open Questions

1. **Profundidade da reformulação em Português:** Devemos apenas trocar os nomes/referências por termos genéricos, ou reformular também os parágrafos teóricos para garantir que o texto não seja identificável como paráfrase de Bechara/Celso Cunha?

2. **"Padrão Bechara" como marca pedagógica:** O projeto usa "Padrão Bechara" como um selo de qualidade/marca interna. Devemos substituir por algo como "Padrão Normativo" ou "Padrão Gramatical de Elite"?

---

## Proposed Changes

### Componente: Aulas de Português (6 arquivos)

Substituição sistemática de todas as referências a Bechara e Celso Cunha. A tabela de substituição:

| Original | Substituição |
|----------|-------------|
| `Segundo Evanildo Bechara` | `Segundo a gramática normativa` |
| `Segundo Celso Cunha` | `Conforme a norma-padrão` |
| `Para Evanildo Bechara` | `Na perspectiva da tradição gramatical` |
| `Bechara ensina que` | `A gramática normativa estabelece que` |
| `Bechara adverte que` | `A norma culta adverte que` |
| `Bechara classifica` | `A tradição gramatical classifica` |
| `Bechara define` | `A gramática normativa define` |
| `Bechara distingue` | `A norma-padrão distingue` |
| `Bechara destaca` | `A gramática normativa destaca` |
| `Bechara alerta` | `A norma culta alerta` |
| `Bechara identifica` | `A gramática normativa identifica` |
| `Bechara explica` | `A gramática normativa explica` |
| `Bechara sistematiza` | `A norma-padrão sistematiza` |
| `"Moderna Gramática Portuguesa"` | `a tradição gramatical normativa` |
| `"Nova Gramática do Português Contemporâneo"` | `a gramática normativa da língua` |
| `Padrão Bechara` | `Padrão Normativo` |
| `O Microscópio de Bechara` | `Análise Normativa Aprofundada` |
| `gramática de Bechara` | `gramática normativa` |
| `gramática de Bechara e Cunha` | `tradição gramatical normativa` |
| `gramática normativa de Bechara` | `gramática normativa da língua` |
| `Normativa Bechara` | `Normativa da Língua` |
| `preceptiva de Bechara` | `tradição gramatical` |

---

#### [MODIFY] [AulaCoesaoCoerencia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaCoesaoCoerencia.tsx)
- ~35 ocorrências de "Bechara" e variações
- ~5 ocorrências de "Moderna Gramática Portuguesa"
- Substituição em massa usando a tabela acima

#### [MODIFY] [AulaReescritaFrases.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaReescritaFrases.tsx)
- ~4 ocorrências de "Bechara" + ~4 de "Celso Cunha"
- Remover títulos de obras ("Moderna Gramática", "Nova Gramática")
- Substituir por termos genéricos

#### [MODIFY] [AulaInterpretacaoTexto.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaInterpretacaoTexto.tsx)
- ~3 ocorrências de "Bechara"
- Remover título de seção "Aprofundamento: O Microscópio de Bechara"
- Substituir "A Unidade Sociocomunicativa (Bechara)" → "A Unidade Sociocomunicativa"

#### [MODIFY] [AulaClassesPalavras.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaClassesPalavras.tsx)
- ~3 ocorrências de "Bechara"
- Remover título "Moderna Gramática Portuguesa"
- Substituir "Normativa Bechara" por "norma-padrão"

#### [MODIFY] [AulaConcordancia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaConcordancia.tsx)
- ~2 ocorrências de "Bechara"
- Substituir "gramática normativa de Bechara" por "gramática normativa"

#### [MODIFY] [AulaRegencia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaRegencia.tsx)
- ~2 ocorrências de "Bechara" + ~1 "Cunha"
- Substituir "gramática de Bechara e Cunha" por "tradição gramatical normativa"

---

### Componente: Aulas de Administração (1 arquivo)

#### [MODIFY] [AulaGestãoDePessoas.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGestãoDePessoas.tsx)
- Remover referência bibliográfica completa na linha 2559: `CHIAVENATO, Idalberto. Gestão de Pessoas: O Novo Papel dos Recursos Humanos nas Organizações.`
- Manter menções contextuais ao nome "Chiavenato" como conceito teórico

---

## Verification Plan

### Automated Tests

```bash
# Após as substituições, verificar que NENHUMA referência autoral permanece em Português:
grep -rni "Bechara\|Evanildo\|Celso Cunha\|Moderna Gramática\|Nova Gramática" src/components/aulas/portugues/

# Verificar que referências bibliográficas completas foram removidas de Administração:
grep -rni "CHIAVENATO.*Gestão de Pessoas.*Novo Papel" src/components/aulas/administracao/

# Verificar que o projeto compila sem erros:
pnpm build
```

### Manual Verification

- Revisar visualmente cada aula alterada para garantir que o texto flui naturalmente após as substituições
- Confirmar que nenhum título de obra protegida permanece no conteúdo
- Verificar que a qualidade pedagógica não foi comprometida

---

## Resumo Executivo

| Ação | Arquivos | Estimativa |
|------|----------|------------|
| **Português: remover Bechara** | 6 arquivos | ~55 substituições |
| **Português: remover Celso Cunha** | 2 arquivos | ~10 substituições |
| **Português: remover títulos de obras** | 4 arquivos | ~10 substituições |
| **Administração: remover ref. bibliográfica** | 1 arquivo | 1 substituição |
| **Matemática** | 0 | ✅ Sem ação |
| **Demais matérias** | 0 | ✅ Sem ação |
| **TOTAL** | **7 arquivos** | **~76 substituições** |
