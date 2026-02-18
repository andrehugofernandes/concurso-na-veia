# 🎓 AULA COMPLETA - REESCRITA DE FRASES (HTML V2.0)
> **⏱️ Tempo de Estudo Estimado: 45 min**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)
> [!IMPORTANT]
> **Padrões de Layout:**
> 1. **Container principal:** `space-y-12`.
> 2. **Container da aula (`<main>`):** `container mx-auto px-6 py-8 max-w-6xl`.
> 3. **Cada TabsContent:** `space-y-16`.
> 4. **Seções de conteúdo:** Card `bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm`.
> 5. **Fontes Gerais:** Corpo: `text-base md:text-lg`.
> 6. **Banners de Módulo:** Gradientes variando do `primary`.
> 7. **Lógica Modular:** 3 Módulos com desbloqueio via quiz (70% de acerto).

---

## 📚 ESTRUTURA PEDAGÓGICA (CONTEÚDO)

### Módulo 1: Fundamentos da Reescritura
- **Teoria:** O que a Cesgranrio cobra? (Manutenção do Sentido Original + Correção Gramatical).
- **Semântica:** Sinônimos vs. Contexto.
- **Vantagem Competitiva:** Identificando mudanças sutis que alteram o sentido.

### Módulo 2: Técnicas e Transformações
- **Vozes Verbais:** Transposição de Ativa para Passiva (e vice-versa).
- **Discurso:** Direto para Indireto.
- **Substituição de Conectivos:** Mantendo o valor lógico (Causal, Concessivo, Adversativo).
- **Nominalização:** Transformação de orações em substantivos.

### Módulo 3: Prática de Elite
- **Armadilhas da Cesgranrio:** Inversão de termos, omissão de complementos, alteração de tempos verbais.
- **Desafio Prático:** Laboratório de Reescrita (Certo vs. Errado com Comentários).
- **Quiz Final:** Simulado de Prova.

---

## 🛠️ COMPONENTES OBRIGATÓRIOS

1. **ModuleBanner:** No início de cada aba.
2. **AlertBox:** Para "Pulo do Gato" e "Cuidado!".
3. **CardCarousel:** Para listar tipos de transformações.
4. **ContentAccordion:** Para detalhar técnicas de reescrita.
5. **FlipCard:** Para o Laboratório de Gabarito (Desafio Prático).
6. **QuizInterativo:** Com pools de 4 questões por módulo.

---

## 📝 ESCOPO TÉCNICO (CÓDIGO)

O componente deve seguir a estrutura de `AulaInterpretacaoTexto.tsx`, utilizando os hooks de progresso e as definições modulares padrão do sistema.
- **Materia:** 'portugues'
- **Topico:** 'reescritura'
- **Pool de Questões:** Mínimo de 12 questões (4 por quiz).
- **Pool de Desafios:** Mínimo de 4 desafios no Laboratório.
