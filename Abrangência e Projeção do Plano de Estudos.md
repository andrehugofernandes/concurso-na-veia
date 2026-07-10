# Abrangência e Projeção do Plano de Estudos

Vamos reformular a geração do plano de estudos e a interface para que o usuário saiba exatamente quando concluirá todo o edital, além de resolver a distribuição das matérias.

## Proposta de Alterações

### 1. Novo Algoritmo de Intercalação (Round-Robin)
A função `gerarCronograma` no `page.tsx` será alterada para distribuir os tópicos intercalando as matérias. Em vez de esgotar todo o Português antes de passar para Matemática, o algoritmo fará um rodízio (ex: 1 tópico de Português, 1 de Específica, 1 de Matemática, e assim por diante), preenchendo os minutos disponíveis no dia.

### 2. Projeção de Conclusão do Edital
- **Cálculo Total:** O sistema somará o tempo de todos os tópicos do edital da profissão escolhida.
- **Semanas Necessárias:** Dividirá o total de minutos pela disponibilidade semanal informada pelo usuário (ex: 15h/semana).
- **Data Prevista:** Calculará a data exata de conclusão adicionando as semanas necessárias à data atual.

### 3. Impacto na UI (Interface)
- **Novo Card de Projeção:** Na visão geral do Plano de Estudos, adicionaremos um card em destaque com a Data de Conclusão Prevista (ou substituiremos um dos cards atuais, como o de "Alertas" que já tem no Dossiê, para evitar duplicação).
- **Simulador de Horas Dinâmico:** Na tela de configuração (onde o usuário escolhe as horas semanais no slider), exibiremos em tempo real a projeção de conclusão baseada no número de horas escolhidas no slider, mostrando a data prevista. Isso incentiva o estudante a aumentar a carga horária se a data de um edital estiver próxima.

## Arquivos Modificados
### [MODIFY] src/app/(dashboard)/plano-estudos/page.tsx
- Atualização da função `gerarCronograma` para rodízio de matérias (Intercalação).
- Criação de funções auxiliares de cálculo de previsão de data.
- Atualização dos stats cards.
- Atualização visual no momento de configuração (slider de horas).

> [!IMPORTANT]
> **User Review Required**
> As estimativas de duração dos tópicos no momento consideram que cada tópico consome todo o seu tempo estimado. O cálculo será linear com base nas horas por semana. Você concorda com essa abordagem para eu poder aplicar o código?
