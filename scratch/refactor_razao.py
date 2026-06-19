import re
import os

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\matematica\AulaRazaoProporcao.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Definir os novos blocos de ModuleConsolidation para os módulos 1 a 10
# Cada módulo terá index correto (3 ou 4), moduloNumero (1 a 10), e as 3 imagens com prompts reais.

new_consolidations = {}

# Módulo 1
new_consolidations[1] = """            <ModuleConsolidation
              index={3}
              moduloNumero={1}
              variant={mv[1]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 1",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Razões — Conceitos Fundamentais",
                    type: "Mapa Mental",
                    placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme #FFFDF4. Centro: círculo azul "RAZÃO a/b". 5 ramos: Escala (mapa cartográfico), Rendimento (engrenagem), Densidade (cilindro de fluido), Razão de Mistura (béquer), e Razão Áurea (espiral). Estilo caderno concurseira. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-1/m1-conceito.png",
                  },
                  {
                    title: "Passo a Passo — Simplificação de Razão",
                    type: "Passo a Passo",
                    placeholderColor: "bg-sky-100 dark:bg-sky-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Diagrama vertical. Título: "SIMPLIFICAÇÃO DE RAZÃO". Passo 1: Fração a/b. Passo 2: Achar MDC. Passo 3: Dividir pelo MDC. Exemplo: 210.000 / 300.000 = 21/30 = 7/10. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-1/m1-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — Razão",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo de aviso. Título: ⚠️ PEGADINHAS — RAZÃO. Grid: ✅ Razão de A para B → A/B vs ❌ B/A. ✅ Unidades diferentes (converter!) vs ❌ Dividir sem converter. ✅ Reduzir à forma irredutível vs ❌ Deixar sem simplificar. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-1/m1-dicas.png",
                  },
                ],
              }}"""

# Módulo 2
new_consolidations[2] = """            <ModuleConsolidation
              index={3}
              moduloNumero={2}
              variant={mv[2]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 2",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Proporções — Conceitos Fundamentais",
                    type: "Mapa Mental",
                    placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: PROPORÇÃO. Ramos: Definição (a/b = c/d), Termos (extremos a e d, meios b e c), Constante k, Propriedades. Ícone de balança de dois pratos no fundo. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-2/m2-conceito.png",
                  },
                  {
                    title: "Propriedade Fundamental na Prática",
                    type: "Passo a Passo",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Diagrama. Título: "PROPRIEDADE FUNDAMENTAL". Equação a/b = c/d com setas diagonais cruzadas mostrando a × d = b × c. Exemplo: 2/3 = 4/6 → 2×6 = 3×4 = 12. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-2/m2-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — Proporção",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — PROPORÇÃO. Grid: ✅ a × d = b × c vs ❌ a + d = b + c. ✅ Alternar termos (a/c = b/d) vs ❌ Somar sem critérios (a+b = c+d). ✅ Inverter ambos os lados (b/a = d/c) vs ❌ Inverter só um lado. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-2/m2-dicas.png",
                  },
                ],
              }}"""

# Módulo 3
new_consolidations[3] = """            <ModuleConsolidation
              index={3}
              moduloNumero={3}
              variant={mv[3]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 3",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Regra de Três — Conceitos",
                    type: "Mapa Mental",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: REGRA DE TRÊS SIMPLES. Ramos: Grandezas, Direta (ambas sobem), Inversa (uma sobe, outra desce), Tabela de montagem. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-3/m3-conceito.png",
                  },
                  {
                    title: "Direta ou Inversa? Como Decidir",
                    type: "Fluxograma de Decisão",
                    placeholderColor: "bg-yellow-100 dark:bg-yellow-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Fluxograma. Título: "DIRETA ou INVERSA?". Fluxo: Aumenta A -> B aumenta também? -> Sim: DIRETA (multiplica cruzado ✕) | Não: INVERSA (multiplica em linha =). Exemplos visuais simples. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-3/m3-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — Regra de Três",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — REGRA DE 3. Grid: ✅ Inversa: inverter fração antes de cruzar vs ❌ Cruzar direto na inversa. ✅ Analisar lógica das setas vs ❌ Olhar só os números. ✅ Unidades iguais na mesma coluna vs ❌ Misturar horas/minutos. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-3/m3-dicas.png",
                  },
                ],
              }}"""

# Módulo 4
new_consolidations[4] = """            <ModuleConsolidation
              index={3}
              moduloNumero={4}
              variant={mv[4]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 4",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Divisão Proporcional",
                    type: "Mapa Mental",
                    placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: DIVISÃO PROPORCIONAL. Ramos: Divisão Direta, Divisão Inversa (inverso 1/a, 1/b), Constante k, Partes de um todo. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-4/m4-conceito.png",
                  },
                  {
                    title: "O Método da Constante k",
                    type: "Passo a Passo",
                    placeholderColor: "bg-sky-100 dark:bg-sky-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Diagrama passo a passo. Título: "CONSTANTE DE PROPORCIONALIDADE K". Passos: 1. x = A·k, y = B·k, z = C·k. 2. (A+B+C)·k = Total. 3. k = Total / (A+B+C). 4. Achar cada parte. Exemplo: Dividir 120 prop. a 2, 3 e 5 -> 10k=120 -> k=12. Partes: 24, 36, 60. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-4/m4-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — Divisão",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — DIVISÃO. Grid: ✅ Soma das partes = Total vs ❌ Divisão sem somar. ✅ Inversa: prop a 1/A, 1/B vs ❌ Divisão Inversa prop a -A, -B. ✅ Constante k única para todas as partes vs ❌ Usar constante diferente. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-4/m4-dicas.png",
                  },
                ],
              }}"""

# Módulo 5
new_consolidations[5] = """            <ModuleConsolidation
              index={3}
              moduloNumero={5}
              variant={mv[5]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 5",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Grandezas Proporcionais",
                    type: "Mapa Mental",
                    placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: GRANDEZAS PROP. Ramos: Diretamente Prop. (y/x=k), Inversamente Prop. (x·y=k), Gráficos, Exemplos reais (produção vs tempo, vazão vs tempo). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-5/m5-conceito.png",
                  },
                  {
                    title: "Gráficos de Grandezas Diretas e Inversas",
                    type: "Passo a Passo",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Desenho de dois gráficos. Esquerda: Reta inclinada subindo para Diretamente Proporcional (y = kx). Direita: Hipérbole descendo para Inversamente Proporcional (y = k/x). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-5/m5-formula.png",
                  },
                  {
                    title: "Pegadinhas — Gráficos e Constantes",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — GRÁFICOS. Grid: ✅ Gráfico Inverso: curva hipérbole vs ❌ Reta inclinada descendo. ✅ y/x = k (razão constante) vs ❌ y - x = k. ✅ x · y = k (produto constante) vs ❌ x + y = k. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-5/m5-dicas.png",
                  },
                ],
              }}"""

# Módulo 6
new_consolidations[6] = """            <ModuleConsolidation
              index={3}
              moduloNumero={6}
              variant={mv[6]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 6",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Divisão Inversa e Composta",
                    type: "Mapa Mental",
                    placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: DIVISÃO AVANÇADA. Ramos: Coeficientes invertidos, Divisão Composta, Frações, MMC de denominadores. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-6/m6-conceito.png",
                  },
                  {
                    title: "Método de Divisão Inversa com MMC",
                    type: "Passo a Passo",
                    placeholderColor: "bg-purple-100 dark:bg-purple-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Diagrama vertical. Título: "INVERSA COM FRAÇÕES". Exemplo: Divida 360 inversamente prop a 2 e 3. Passos: 1. Inverter -> 1/2 e 1/3. 2. MMC(2,3) = 6. 3. Frações -> 3/6 e 2/6. 4. k -> 3k+2k=360 -> 5k=360 -> k=72. 5. Resultados: 216 e 144. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-6/m6-formula.png",
                  },
                  {
                    title: "Pegadinhas — MMC na Divisão Inversa",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — DIV. INVERSA. Grid: ✅ MMC ajusta denominadores vs ❌ Ignorar denominadores e somar inversos direto. ✅ Inverter ANTES de aplicar k vs ❌ Aplicar k e inverter no final (1/(2k)). ✅ Proporcional aos numeradores equivalentes vs ❌ Dividir pelas frações sem MMC. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-6/m6-dicas.png",
                  },
                ],
              }}"""

# Módulo 7
new_consolidations[7] = """            <ModuleConsolidation
              index={3}
              moduloNumero={7}
              variant={mv[7]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 7",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Proporção Contínua",
                    type: "Mapa Mental",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: PROP. CONTÍNUA. Ramos: Definição (a/b = b/c), Média Proporcional/Geométrica (b = √a·c), Terceira Proporcional (termo c), Extremos. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-7/m7-conceito.png",
                  },
                  {
                    title: "Média Geométrica vs Aritmética",
                    type: "Passo a Passo",
                    placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo de equações. Caixa 1 (Geométrica): b = √(a × c), ex: 4, 8, 16 -> 8 = √64. Caixa 2 (Aritmética): b = (a+c)/2, ex: 4, 10, 16 -> 10 = 20/2. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-7/m7-formula.png",
                  },
                  {
                    title: "Pegadinhas — Média Proporcional",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — CONTÍNUA. Grid: ✅ a/b = b/c → b² = a · c vs ❌ 2b = a + c. ✅ Terceira proporcional c = b²/a vs ❌ c = 2b - a. ✅ Média geométrica para contínua vs ❌ Média aritmética para contínua. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-7/m7-dicas.png",
                  },
                ],
              }}"""

# Módulo 8
new_consolidations[8] = """            <ModuleConsolidation
              index={3}
              moduloNumero={8}
              variant={mv[8]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 8",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Escalas e Plantas",
                    type: "Mapa Mental",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: ESCALAS & MAPAS. Ramos: Escala Linear (E = d/D), Escala de Área (E² = a/A), Escala de Volume (E³ = v/V), Conversão de unidades. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-8/m8-conceito.png",
                  },
                  {
                    title: "Passo a Passo — Conversão de Escalas",
                    type: "Passo a Passo",
                    placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Desenho explicativo. Título: "COMO RESOLVER ESCALA". Passos: 1. Escala = Desenho / Real. 2. Converter para a mesma unidade (1 km = 100.000 cm). 3. Calcular. Exemplo: Escala 1:50.000, mapa = 7cm -> Real: 7 × 50.000 = 350.000 cm = 3,5 km. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-8/m8-formula.png",
                  },
                  {
                    title: "Pegadinhas — Escalas de Área e Volume",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — ESCALAS. Grid: ✅ Mesma unidade antes de dividir vs ❌ Dividir cm por km. ✅ Escala ao quadrado (E²) para áreas vs ❌ Usar escala linear para áreas. ✅ Escala ao cubo (E³) para volumes vs ❌ Usar escala linear para volumes. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-8/m8-dicas.png",
                  },
                ],
              }}"""

# Módulo 9
new_consolidations[9] = """            <ModuleConsolidation
              index={3}
              moduloNumero={9}
              variant={mv[9]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 9",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Aplicações Industriais",
                    type: "Mapa Mental",
                    placeholderColor: "bg-slate-100 dark:bg-slate-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental. Centro: PETROBRAS E PROPORÇÕES. Ramos: Vazão em oleoduto (prop ao diâmetro²), FPSO (GOR gás-óleo), Refinaria (aproveitamento), Orçamentos de consórcios. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-9/m9-conceito.png",
                  },
                  {
                    title: "Fórmulas de Engenharia na Prática",
                    type: "Passo a Passo",
                    placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Desenho de vazão e produção. Vazão = Volume / Tempo. GOR = Gás / Óleo. Exemplos: Poço produz 10.000 m³ gás e 2.000 m³ óleo -> GOR = 5:1. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-9/m9-formula.png",
                  },
                  {
                    title: "Pegadinhas — Vazão e Oleodutos",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ PEGADINHAS — PETROBRAS. Grid: ✅ Vazão prop ao diâmetro² (área) vs ❌ Vazão prop ao diâmetro linear. ✅ Taxa de falhas = falhas/tempo vs ❌ Taxa = tempo/falhas. ✅ Consórcio: divisão proporcional ao capital vs ❌ Divisão igualitária de lucros. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-9/m9-dicas.png",
                  },
                ],
              }}"""

# Módulo 10
new_consolidations[10] = """            <ModuleConsolidation
              index={4}
              moduloNumero={10}
              variant={mv[10]}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 10",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa Mental Master — Razão e Proporção",
                    type: "Mapa Mental",
                    placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo creme, estilo concurseira):
                    // Mapa mental master. Centro: RAZÃO & PROPORÇÃO MASTER. Ramos: Razão, Proporção, Regra de 3, Divisão Proporcional, Escalas. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-10/m10-conceito.png",
                  },
                  {
                    title: "Fórmulas Essenciais para a Prova",
                    type: "Passo a Passo",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Formulário. Título: "FÓRMULAS ESSENCIAIS". Lista: 1. Razão r=a/b. 2. Proporção ad=bc. 3. Divisão x=Ak, y=Bk. 4. Média Geométrica b=√ac. 5. Escala E=d/D, E²=a/A. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-10/m10-formula.png",
                  },
                  {
                    title: "Guia Antifalha — CESGRANRIO",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco, estilo concurseira):
                    // Comparativo. Título: ⚠️ GUIA ANTIFALHA. Checklist: ✅ Numerador é o primeiro mencionado. ✅ Simplifique até a forma irredutível. ✅ Direta/Inversa analisada logicamente. ✅ Escala de área E² e volume E³. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl: "/assets/images/matematica/razao-proporcao/modulo-10/m10-dicas.png",
                  },
                ],
              }}"""


# 2. Vamos fazer a substituição dos ModuleConsolidation.
# Localizar cada <ModuleConsolidation ... /> e substituir pelo novo bloco correspondente.
# Como o fechamento do ModuleConsolidation no código contém múltiplos campos (video, resumoVisual, sinteseEstrategica, audio, etc.), 
# vamos localizar o ModuleConsolidation da linha correspondente e substituir até o final da tag.
# No arquivo, o ModuleConsolidation tem a seguinte estrutura aproximada em todos:
#            <ModuleConsolidation
#              index={...}
#              variant={...}
#              video={{
#                ...
#              }}
#              resumoVisual={{
#                ...
#              }}
#              sinteseEstrategica={{
#                ...
#              }}
#              audio={{
#                ...
#              }}
#            />

# Vamos carregar o código e procurar por "<ModuleConsolidation" de forma estruturada.
# Para evitar bugs com regex complicadas em blocos gigantes de nested braces, 
# podemos encontrar o índice inicial do "<ModuleConsolidation" e o final correspondente.
# Mas na verdade, podemos usar o fato de que a propriedade `resumoVisual={{ ... }}` é o que muda substancialmente, 
# mas também queremos mudar `index` e injetar `moduloNumero`.
# Vamos fazer uma substituição mais segura localizando o bloco completo do resumoVisual em cada ocorrência.
# Vamos ver como está cada ocorrência.
# Ocorrência 1 (linha 591):
#             <ModuleConsolidation
#               index={3}
#               variant={mv[1]}
#               video={{
#                 videoId: "h3S9XW1WzIk",
#                 title: "Revisão do Módulo 1",
#                 duration: "8:30",
#               }}
#               resumoVisual={{
#                 moduloNome: "Módulo 1",
#                 tituloAula: "Razão e Proporção",
#                 materia: "Matemática",
#                 images: [
#                   {
#                     title: "Conceito Principal",
#                     type: "Mapa Mental",
#                     placeholderColor: "bg-indigo-500/20",
#                   },
#                   {
#                     title: "Exemplos Práticos",
#                     type: "Esquema",
#                     placeholderColor: "bg-indigo-500/20",
#                   },
#                   {
#                     title: "Aplicações",
#                     type: "Fórmula",
#                     placeholderColor: "bg-indigo-500/20",
#                   },
#                 ],
#               }}

# Podemos substituir de "<ModuleConsolidation\n\s+index={X}\n\s+variant={mv[X]}\n\s+video={{\n\s+videoId: [^\n]+\n\s+title: [^\n]+\n\s+duration: [^\n]+\n\s+}}\n\s+resumoVisual={{\n\s+moduloNome: [^\n]+\n\s+tituloAula: [^\n]+\n\s+materia: [^\n]+\n\s+images: \[\n\s+({[^{}]+},?\n\s+)+\]\n\s+}}"
# usando uma regex ou simplesmente achando a tag resumoVisual no bloco de cada módulo.

# Para simplificar e garantir 100% de exatidão, vamos ler o arquivo AulaRazaoProporcao.tsx como linhas, 
# e fazer as substituições sabendo as linhas em que cada ModuleConsolidation começa.
# Como o número de linhas pode mudar ligeiramente durante as edições, vamos achar o número das linhas dinamicamente no Python.

lines = code.splitlines()

# Encontrar os índices das linhas contendo "<ModuleConsolidation"
consolidation_indices = [i for i, line in enumerate(lines) if "<ModuleConsolidation" in line]
print(f"Encontrados {len(consolidation_indices)} ModuleConsolidation calls nas linhas: {[idx+1 for idx in consolidation_indices]}")

# Vamos processar do final para o início para não bagunçar os índices das linhas
for i in range(len(consolidation_indices) - 1, -1, -1):
    mod_num = i + 1
    start_idx = consolidation_indices[i]
    
    # Encontrar o fechamento de "resumoVisual={{ ... }}" para este ModuleConsolidation
    # Ele começa com resumoVisual={{
    # E fecha com }}
    # Vamos escanear a partir de start_idx
    resumo_start = -1
    resumo_end = -1
    brace_count = 0
    in_resumo = False
    
    for j in range(start_idx, len(lines)):
        if "resumoVisual={{" in lines[j]:
            resumo_start = j
            in_resumo = True
            brace_count = 2 # as duas chaves de {{
            continue
        
        if in_resumo:
            # Contar chaves abertas e fechadas
            brace_count += lines[j].count("{")
            brace_count -= lines[j].count("}")
            if brace_count == 0:
                resumo_end = j
                break
                
    if resumo_start != -1 and resumo_end != -1:
        # Fazer a substituição do bloco ModuleConsolidation inteiro (da linha do <ModuleConsolidation até o fim de resumoVisual)
        # Vamos substituir de start_idx até resumo_end com o novo bloco new_consolidations[mod_num]
        print(f"Substituindo ModuleConsolidation do Modulo {mod_num} (linhas {start_idx+1} ate {resumo_end+1})")
        lines[start_idx:resumo_end+1] = [new_consolidations[mod_num]]

# Juntar o código de volta
code = "\n".join(lines)

# 3. Remover as seções duplicadas de resumo visual ao final de cada módulo.
# Elas começam com "{/* ─── RESUMO VISUAL ─── */}" ou "{/* ─── RESUMO ─── */}" ou "{/* ─── RESUMO FINAL ─── */}"
# e vão até a próxima seção de fechamento "</TabsContent>" ou o início da próxima seção.
# Na verdade, a forma mais limpa é deletar o bloco que contém o "<ModuleSummaryCarouselNew" e a tag <section> que o envolve.
# Cada seção externa redundante é delimitada por:
#           {/* ─── RESUMO ... ─── */}
#           <section className="bg-card ...">
#             ...
#           </section>
# Vamos fazer uma busca regex para remover essas seções.
# As seções redundantes têm a estrutura:
#           {/* ─── RESUMO (VISUAL|FINAL)? ─── */}
#           <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
#             <ModuleSectionHeader ... />
#             <LessonTabs ... content: (<ModuleSummaryCarouselNew ... />) ... />
#           </section>
#
# Vamos usar uma regex para remover esse bloco de cada aba.
# Exemplo de regex:
# r'\{\/\* ─── RESUMO(?: VISUAL| FINAL)? ─── \*\\}\s*<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm (?:space-y-8 )?mt-12">.*?<\/section>'
# Mas o regex DOTALL pode comer mais do que o esperado se for guloso, então usaremos não-guloso .*?
# Para garantir que pare exatamente no </section> correto daquela seção, podemos buscar por:
# <ModuleSummaryCarouselNew ... /> dentro daquela seção.

pattern = re.compile(
    r'\{\/\*\s*───\s*RESUMO(?: VISUAL| FINAL)?\s*───\s*\*\/\}\s*<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm [^"]*mt-12">.*?<\/section>',
    re.DOTALL
)

matches = pattern.findall(code)
print(f"Encontradas {len(matches)} seções externas redundantes para remover.")

code_cleaned, count = pattern.subn("", code)
print(f"Removidas {count} seções externas redundantes.")

# Gravar as alterações
with open(file_path, "w", encoding="utf-8") as f:
    f.write(code_cleaned)

print("Refatoracao concluida!")
