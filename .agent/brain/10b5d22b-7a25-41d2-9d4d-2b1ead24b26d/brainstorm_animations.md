## 🧠 Brainstorm: Animações de Transição (Multi-Step Form)

### Context

Você sugeriu utilizarmos o componente premium do [useLayouts (Multi Step Form)](https://uselayouts.com/docs/components/multi-step-form) — que utiliza `framer-motion` — para trazer animações fluidas ("wow factor") entre os steps do nosso formulário de Denúncia. Como o nosso formulário já possui uma lógica complexa de persistência, Zustand/Zod, e um navegador de steps já redesenhado para o tema Premium (no passo anterior), precisamos decidir a melhor forma arquitetural de integrar essas animações sem quebrar as regras rígidas do nosso sistema.

---

### Option A: Substituição Total pelo Componente useLayouts (Plug & Play)

Instalar o componente diretamente via `npx shadcn@latest add "https://uselayouts.com/r/multi-step-form.json"` e transferir todo o nosso formulário (os 4 steps) ali para dentro, seguindo a estrutura exata deles.

✅ **Pros:**

- Usa o ecossistema exato do criador (Framer Motion já configurado com todos os _springs_ e _durations_).
- Menor esforço de prototipação de CSS/Animação; vem pronto para uso.

❌ **Cons:**

- **Alto Risco de Regressão:** Iria requerer desmontar a nossa estrutura atual (`DenunciaFormModal.tsx` e `DenunciaForm.tsx`), que já atende perfeitamente ao React Hook Form com schemas múltiplos.
- Perda do nosso redesign recente do `WizardStepper`, já que a biblioteca traz o "seu próprio" header de steps.

📊 **Effort:** High (Muito retrabalho estrutural)

---

### Option B: Integração Híbrida (Wrapper Customizado) - RECOMENDADO

Instalamos o `framer-motion` e estudamos o código fonte do _useLayouts_. Em vez de jogar fora o nosso `DenunciaFormModal.tsx` e o elegante `WizardStepper` que acabamos de fazer, nós criamos um wrapper de animação (ex: `<AnimatedStepContainer>`) que reproduz exatamente a física de entrada/saída (slide-in / slide-out) desenhada pela useLayouts, mas envolve o nosso formulário atual.

✅ **Pros:**

- **Segurança:** Mantém 100% da regra de negócios, Validação (Zod) e Server Actions intocadas.
- **Identidade Mantida:** Preserva o design "Anti-Cliché Premium" que fizemos na barra de progresso do WizardStepper.
- **Isolamento:** Adiciona a camada de UI fluida (Framer Motion) apenas renderizando os conteúdos de acordo com o `stepAtual` com animações de `initial`, `animate` e `exit`.

❌ **Cons:**

- Exige mapear a direção do "slide" (se o usuário avançou ou recuou no passo) para que a animação deslize para a direção correta (esquerda ou direita).

📊 **Effort:** Medium

---

### Option C: Micro-Interações CSS (Sem Framer Motion)

Em vez de usar uma biblioteca externa pesada de animações espaciais (Framer), usamos transições puras de Tailwind (`@keyframes`, `transition-transform duration-500`, etc.) controladas pela classe do step.

✅ **Pros:**

- Zero dependências adicionais no bundle (performance extrema).
- Super leve.

❌ **Cons:**

- Animações exclusivas em CSS dificilmente alcançam a suavidade "Spring Physics" que o Framer Motion tem e que o Frontend-Specialist recomenda para o teto de qualidade (_"Spring Physics: Animations should not be linear; they must feel organic"_).
- Não há um componente `AnimatePresence` nativo no React para aguardar a desmontagem, o que deixa as saídas secas.

📊 **Effort:** Low

---

## 💡 Recommendation

Seguindo os princípios do `frontend-specialist.md`: **"Static design is failure. UX must always feel alive"** e **"Spring physics is mandatory"**.

Eu recomendo a **Option B**.

Com a **Option B**, nós "roubamos como artistas": absorvemos a genialidade fluída do componente useLayouts (usando Framer Motion + Spring), mas sem sacrificar a robustez do nosso código atual e do nosso Stepper Premium. Nós apenas envelopamos nosso formulário com as variantes do Framer Motion.

O que acha desse direcionamento? Podemos instalar o Framer Motion e construir essa camada de animação ao redor do nosso Multi-Step atual?
