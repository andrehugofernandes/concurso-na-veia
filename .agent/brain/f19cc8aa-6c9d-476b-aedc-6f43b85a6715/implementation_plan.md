# Plano de Implementação - Refinamento Elite Total & Níveis do Edital

Este plano detalha a reorganização da página de aulas para agrupar profissões por nível (Técnico/Superior) e otimizar o posicionamento da Língua Inglesa.

## Mudanças Propostas

### 1. Camada de Dados (`src/data`)
- **Inglês para Nível Técnico**: Garantir que as matérias de Inglês continuem disponíveis para usuários Elite, mesmo que seu cargo base seja de nível Técnico.

### 2. Interface do Usuário (`src/app/(dashboard)/aulas/page.tsx`)

#### [STRUCTURE]
- **Sua Grade Principal**: Uma única seção contendo tanto as matérias básicas (Português, Matemática) quanto as específicas do cargo do usuário.
- **Língua Inglesa**: Integrada à grade principal se for Nível Superior; caso contrário, movida para o grupo de acesso Elite Superior.
- **Catálogo Elite**: Dividido em blocos claros por nível escolar:
    - `Edital Nível Superior`
    - `Edital Nível Técnico`

#### [VISUAL]
- Usar cabeçalhos distintivos para "Sua Grade" e para os níveis do catálogo.
- Manter o padrão de cartões com preview de tópicos.

## Plano de Verificação

### Testes Manuais
1. **Usuário Técnico (Padrão)**: Deve ver apenas Português e Matemática nas bases.
2. **Usuário Superior (Padrão/Elite)**: Deve ver Português, Matemática e Inglês nas bases.
3. **Usuário Técnico (Elite)**: Deve encontrar Inglês na seção Elite ou em destaque, além das bases comuns.
4. **Catálogo**: Verificar se a divisão entre "Nível Superior" e "Nível Técnico" está clara e correta.

