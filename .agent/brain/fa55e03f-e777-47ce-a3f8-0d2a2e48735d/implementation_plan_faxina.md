# Plano de Implementação: Operação Faxina - Motor Ultimate

Este plano visa resolver a fragmentação dos scripts de correção e padronização, unificando toda a lógica de "Zero Hardcode" e Qualidade Editorial em um único motor robusto e seguro.

## User Review Required

> [!IMPORTANT]
> **O que mudará:**
> 1.  **Script Único:** Em vez de rodar dez scripts diferentes, haverá apenas o `node scripts/ultimate-fixer.js`.
> 2.  **Limpeza da Raiz:** A raiz do projeto será limpa. Arquivos de log, backups temporários e scripts soltos serão movidos para pastas dedicadas (`logs/`, `backups/`, `scripts/automation/`).
> 3.  **Organização de Documentos:** Arquivos `.md` de guias e relatórios serão movidos para `/docs`.
> 4.  **Workflow Central:** O arquivo `.agent/workflows/aula-ultimate.md` será o guia mestre que orquestra este novo script.

## Proposed Changes

### [Organização da Raiz do Projeto]

Para despoluir a raiz e manter apenas os arquivos da stack (Next.js/TS), realizaremos as seguintes movimentações:

#### 📂 [logs/](file:///c:/Workspace/petrobras-quest/logs)
Mover todos os arquivos `.txt`, `.log` e relatórios de erro:
- `build-output.log`, `build_log.txt`, `ts_errors.txt`, `tsc_check.txt`, etc.
- `concordancia_tags.txt`, `crase_lines.txt`, etc.

#### 📂 [backups/](file:///c:/Workspace/petrobras-quest/backups)
Mover arquivos de referência e versões antigas:
- `current_shared.tsx`, `old_shared.tsx`, `prev_shared.tsx`.
- `old_aula_utf8.ts`, `old_file_utf8.ts`.
- `files.zip`, `petrobras-next-completo.tar.gz`.

#### 📂 [docs/](file:///c:/Workspace/petrobras-quest/docs)
Mover arquivos de documentação e relatórios:
- `BRAND_DESIGN_GUIDE.md`, `CLAUDE_CODE_CONTEXT.md`, `UPGRADE_STATUS.md`.
- `Relatório de Recomendações de LLMs... .md`.

#### 📂 [scripts/automation/](file:///c:/Workspace/petrobras-quest/scripts/automation)
Mover scripts de utilidade e fixers que estão na raiz:
- Todos os `.py` (`fix_tags.py`, `analyze_tags.py`, `expand_aula.py`, etc.).
- Scripts JS soltos (`extract_h2.js`, `find_h2.js`, `generate_hash.js`, etc.).

### [Infraestrutura de Scripts]

#### [NEW] [ultimate-fixer.js](file:///c:/Workspace/petrobras-quest/scripts/ultimate-fixer.js)
Motor universal que combina:
- Sincronização de variantes `mv[N]`.
- Limpeza de gradientes manuais.
- Ajuste de tipografia editorial (`text-lg` e `text-justify`).
- Indexação automática de componentes interativos.
- Correção de títulos de resumos e quizzes.

#### [MODIFY] [aula-ultimate.md](file:///c:/Workspace/petrobras-quest/.agent/workflows/aula-ultimate.md)
Atualização das instruções para:
- Refletir o uso do novo script único.
- Incorporar as regras de "Zero Hardcode" como manifesto de design.

#### [MOVE] [Arquivos Legados]
Mover para `scripts/_legacy/`:
- `fix-module-banners.js`
- `fix-module-variants.js`
- `fix-quiz-indexing.js`
- `fix-resumo-multimedia.js`
- `fix-single-ultimate.js`
- `ultimate-math-fixer.js`
- `fix-module-consolidation-titles.js`

---

## Open Questions

> [!CAUTION]
> Algum desses scripts legados é usado em CI/CD externos ou processos que eu não consiga ver? Se sim, precisamos manter aliases ou não movê-los.

## Verification Plan

### Automated Tests
1.  Rodar `node scripts/ultimate-fixer.js src/components/aulas/portugues/AulaClassesPalavras.tsx`.
2.  Validar se o arquivo continua compilando e se os gradientes sumiram (mantendo a funcionalidade via `mv`).
3.  Verificar se a indexação dos componentes interativos (especialmente os novos que você adicionou) está correta (1, 2, 3...).

### Manual Verification
- Visualizar `AulaClassesPalavras.tsx` no browser e confirmar que o design permanece "Ultimate" mas o código está 100% limpo e automatizado.
