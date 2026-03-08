# 🎓 AULA COMPLETA - COESÃO E COERÊNCIA (PREMIUM v2.0)

> **⏱️ Tempo de Estudo Estimado: 90 min**
> **🎯 Foco: Padrão CESGRANRIO / Petrobras**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)

> [!IMPORTANT]
> **Protocolo C.E.D.E. Ativado:**
>
> 1. **Conceituação:** Definição clara do recurso (Anáfora, Catáfora, Elipse, etc).
> 2. **Exemplificação:** Casos reais focados na indústria de petróleo e gás.
> 3. **Dicas:** Macetes táticos para identificar o recurso em segundos.
> 4. **Exceções/Pegadinhas:** O "pulo do gato" da Cesgranrio para derrubar candidatos.

---

## 📄 COMPONENTE REACT: AULA_COESAO_COERENCIA.TSX

### MODULE_DEFS (10 Módulos)

1. **Módulo 1:** O Tecido do Texto (Coesão vs Coerência)
2. **Módulo 2:** O Poder do Retrovisor (Anáfora)
3. **Módulo 3:** O Farol do Sentido (Catáfora)
4. **Módulo 4:** O Silêncio Eloquente (Elipse e Zêugma)
5. **Módulo 5:** Substituições de Elite (Coesão Lexical)
6. **Módulo 6:** A Dança dos Conectivos (Sequencial)
7. **Módulo 7:** Concessão & Oposição (O Duelo Conjutivo)
8. **Módulo 8:** Arquitetura da Coerência (Lógica Interna)
9. **Módulo 9:** Progressão e Relevância (Continuidade)
10. **Módulo 10:** Arena de Elite (Simulado Final)

---

## 📚 ESTRUTURA DOS MÓDULOS (DETALHE TÉCNICO)

### Módulo 1: O Tecido do Texto

- **Foco:** Diferença entre a "Liga" (Coesão) e a "Lógica" (Coerência).
- **Componente:** `ComparisonSide` mostrando um texto coeso mas incoerente (ex: "O técnico reparou o duto, e por isso o navio voou").
- **Pegadinha:** A Cesgranrio costuma dizer que um texto é incoerente só porque falta um conectivo. Falso! Pode haver coerência sem coesão explícita (pelo contexto).

### Módulo 2: O Poder do Retrovisor

- **Foco:** Anáfora (retomada).
- **Tipos:** Pronominal (Ele, Esse), Sinonímica (Navio -> Embarcação), Epitética (Rio de Janeiro -> A Cidade Maravilhosa).
- **Dica:** Os pronomes "ESSE", "ESSA", "ISSO" são anafóricos (olham para trás).

### Módulo 3: O Farol do Sentido

- **Foco:** Catáfora (antecipação).
- **Dica:** Os pronomes "ESTE", "ESTA", "ISTO" são tipicamente catafóricos (preparam para o que virá).
- **Exemplo:** "O plano é **este**: aumentar a produção."

### Módulo 4: O Silêncio Eloquente

- **Foco:** Elipse (omissão geral) e Zêugma (omissão de termo já dito).
- **Visual:** `FlipCard` mostrando frases com e sem a omissão destacada.
- **Macete:** A vírgula vicária (que substitui o verbo) é o maior sinal de Zêugma na prova.

### Módulo 5: Substituições de Elite

- **Foco:** Nominalização (Transformar verbo em substantivo) e Hiperonímia (Geral -> Particular).
- **Exemplo:** "A plataforma **operou** bem. A **operação** garantiu o recorde." (Nominalização).

### Módulo 6: A Dança dos Conectivos

- **Foco:** Coesão Sequencial.
- **Tabela:** Conjunções coordenativas e subordinativas essenciais.
- **Atenção:** Valor semântico vs. Classificação gramatical.

### Módulo 7: Concessão & Oposição

- **Foco:** EMBORA (Concessivo) vs MAS (Adversativo).
- **Impacto:** O "Embora" não anula a oração principal. O "Mas" introduz a ideia que "ganha" no argumento.
- **Duelo:** Como a Cesgranrio pede a troca de um pelo outro alterando a estrutura do verbo.

### Módulo 8: Arquitetura da Coerência

- **Foco:** Princípio da Não-Contradição.
- **Exemplo:** O texto não pode dizer que o lucro subiu e depois reclamar da queda de receita no mesmo período sem explicação.

### Módulo 9: Progressão e Relevância

- **Foco:** Manutenção do tema (Continuidade) e Injeção de novas informações (Progressão).
- **Erro:** O texto circular (Tautologia) que não sai do lugar.

### Módulo 10: Arena de Elite

- **Foco:** 10 questões de nível difícil misturando todos os conceitos.
- **Cenário:** Relatórios de exploração, notícias de economia e editais.

---

## 🎯 CHECKLIST DE ENTREGA - COMPONENTE .TSX

- [ ] Importar `QUIZ_M1_COESAO` até `QUIZ_M10_ARENA`.
- [ ] Implementar `ModuleBanner` com gradientes Premium.
- [ ] Usar `ContentAccordion` para o protocolo C.E.D.E. em cada módulo.
- [ ] Adicionar `ComparisonSide` no Módulo 1 e 7.
- [ ] Adicionar `FlipCard` no Módulo 4 e 5.
- [ ] Garantir 100% de responsividade no mobile.
