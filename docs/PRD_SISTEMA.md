# PRD (Product Requirements Document) - Sistema Petrobras Quest

## Visão Geral do Sistema
O **Petrobras Quest** é uma plataforma de estudos gamificados focada na preparação para concursos da CESGRANRIO, especificamente para a Petrobras. A aplicação é construída em Next.js 16 e tem como objetivo oferecer um ambiente de aprendizado dinâmico e focado.

---

## Framework Pedagógico C.E.D.E.A.
Todo conteúdo pedagógico (Aulas, Resumos, Guias) deve obrigatoriamente seguir a metodologia **C.E.D.E.A**:

1. **C - Contextualização**: Introdução ao tema e sua relevância no edital.
2. **E - Exploração**: Aprofundamento teórico, exigindo um mínimo de **10 parágrafos densos e aprofundados por módulo/tópico**. Nada de resumos superficiais.
3. **D - Demonstração**: Exemplos práticos aplicados a questões da banca.
4. **E - Exercícios**: Questões focadas na banca CESGRANRIO.
5. **A - Avaliação**: Revisão dos pontos-chave.

---

## Diretrizes de Design (Design Tokens)
- **Tipografia**: 
  - `Khand`: Utilizada obrigatoriamente em todos os cabeçalhos (`headings` como H1, H2, H3).
  - `Poppins`: Utilizada obrigatoriamente no corpo de texto (`body`).
- **Purple Ban**: É estritamente **PROIBIDA** a utilização de qualquer tom de roxo, violeta ou variações.

---

## Subsistema de Histórico de Conversas (Contexto Inteligente)
Para evitar perda de contexto em conversas longas ou novas sessões, o ecossistema incorpora um banco de dados SQLite local (`backups/conversas_history.db`).

### Regras de Uso do Contexto
- Antes de implementar aulas, backend ou features complexas, o agente DEVE buscar o histórico.
- **Ferramenta CLI**: A busca deve ser feita utilizando o script de busca:
  `python scripts/get_context.py --query "TERMO_DESEJADO"`
- O script `scripts/sync_conversations.py` deve ser executado periodicamente para manter a base local de histórico sincronizada com o cérebro da IDE.
