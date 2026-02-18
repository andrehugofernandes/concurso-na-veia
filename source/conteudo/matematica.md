# Matemática - Conteúdo Completo para Concursos Petrobras

Este material foi preparado seguindo o conteúdo programático do edital Petrobras (CESGRANRIO/CEBRASPE).

---

## 1. TEORIA DOS CONJUNTOS

### 1.1 Conceitos Fundamentais

**Conjunto**: Coleção de elementos bem definidos.

**Notações:**
- Elemento pertence ao conjunto: a ∈ A
- Elemento não pertence: b ∉ A
- Conjunto vazio: ∅ ou { }
- Conjunto universo: U

### 1.2 Subconjuntos

A ⊂ B significa que todo elemento de A também pertence a B.

**Propriedades:**
- ∅ ⊂ A (o vazio é subconjunto de qualquer conjunto)
- A ⊂ A (todo conjunto é subconjunto de si mesmo)
- Se A ⊂ B e B ⊂ A, então A = B

### 1.3 Operações com Conjuntos

**União (A ∪ B)**: Elementos que pertencem a A OU a B (ou ambos)
```
A = {1, 2, 3}
B = {3, 4, 5}
A ∪ B = {1, 2, 3, 4, 5}
```

**Interseção (A ∩ B)**: Elementos que pertencem a A E a B
```
A = {1, 2, 3}
B = {3, 4, 5}
A ∩ B = {3}
```

**Diferença (A - B)**: Elementos de A que NÃO pertencem a B
```
A = {1, 2, 3}
B = {3, 4, 5}
A - B = {1, 2}
```

**Complementar (Aᶜ ou A')**: Elementos do universo que NÃO pertencem a A
```
U = {1, 2, 3, 4, 5}
A = {1, 2}
Aᶜ = {3, 4, 5}
```

### 1.4 Cardinalidade

n(A ∪ B) = n(A) + n(B) - n(A ∩ B)

> **Exemplo típico CESGRANRIO:**
> Em uma refinaria, 120 funcionários falam inglês, 80 falam espanhol e 30 falam ambos. Quantos falam pelo menos uma das línguas?
> 
> n(I ∪ E) = 120 + 80 - 30 = **170 funcionários**

---

## 2. FUNÇÕES

### 2.1 Conceitos Básicos

**Função**: Relação que associa cada elemento do domínio a um único elemento do contradomínio.

f: A → B, x ↦ f(x)

- **Domínio**: Conjunto de valores válidos para x
- **Contradomínio**: Conjunto onde estão os valores de f(x)
- **Imagem**: Subconjunto do contradomínio efetivamente atingido

### 2.2 Função Afim (1º Grau)

**Forma**: f(x) = ax + b

- **a**: coeficiente angular (inclinação)
- **b**: coeficiente linear (intercepto)

**Gráfico**: Reta

| Coeficiente | Comportamento |
|-------------|---------------|
| a > 0 | Função crescente |
| a < 0 | Função decrescente |
| a = 0 | Função constante |

**Raiz (zero)**: x = -b/a

> **Exemplo industrial:**
> O custo de produção de uma refinaria é C(x) = 5000 + 15x, onde x é o número de barris.
> - Custo fixo: R$ 5.000
> - Custo variável: R$ 15 por barril
> - Para 1000 barris: C(1000) = 5000 + 15(1000) = R$ 20.000

### 2.3 Função Quadrática (2º Grau)

**Forma**: f(x) = ax² + bx + c (a ≠ 0)

**Gráfico**: Parábola
- a > 0: concavidade para cima (∪)
- a < 0: concavidade para baixo (∩)

**Raízes (Bhaskara):**
```
x = (-b ± √Δ) / 2a
Δ = b² - 4ac
```

| Discriminante | Raízes |
|---------------|--------|
| Δ > 0 | Duas raízes reais distintas |
| Δ = 0 | Duas raízes reais iguais |
| Δ < 0 | Nenhuma raiz real |

**Vértice:**
```
xᵥ = -b / 2a
yᵥ = -Δ / 4a
```

> **Exemplo CESGRANRIO:**
> O lucro de uma empresa é L(x) = -2x² + 40x - 100. Qual a quantidade x que maximiza o lucro?
> 
> xᵥ = -40 / (2×(-2)) = -40 / -4 = **10 unidades**

### 2.4 Função Exponencial

**Forma**: f(x) = aˣ (a > 0 e a ≠ 1)

**Propriedades:**
- a > 1: função crescente
- 0 < a < 1: função decrescente
- f(0) = 1 sempre

**Regras de potenciação:**
- aᵐ × aⁿ = aᵐ⁺ⁿ
- aᵐ ÷ aⁿ = aᵐ⁻ⁿ
- (aᵐ)ⁿ = aᵐˣⁿ
- a⁻ⁿ = 1/aⁿ
- a¹/ⁿ = ⁿ√a

> **Aplicação - Crescimento populacional:**
> A população de bactérias em um tanque segue P(t) = 1000 × 2ᵗ
> - t = 0: P(0) = 1000
> - t = 3: P(3) = 1000 × 8 = 8000 bactérias

### 2.5 Função Logarítmica

**Definição**: logₐ b = c ↔ aᶜ = b

**Propriedades:**
- logₐ 1 = 0
- logₐ a = 1
- logₐ (m × n) = logₐ m + logₐ n
- logₐ (m / n) = logₐ m - logₐ n
- logₐ mⁿ = n × logₐ m
- logₐ b = logc b / logc a (mudança de base)

> **Exemplo típico:**
> log₂ 32 = log₂ 2⁵ = **5**
> 
> log 1000 = log 10³ = **3** (log na base 10)

### 2.6 Função Trigonométrica

**Círculo Trigonométrico:**

| Ângulo | 0° | 30° | 45° | 60° | 90° |
|--------|-----|-----|-----|-----|-----|
| radianos | 0 | π/6 | π/4 | π/3 | π/2 |
| sen | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 |
| tan | 0 | √3/3 | 1 | √3 | ∄ |

**Relação Fundamental**: sen²θ + cos²θ = 1

**Período:**
- sen(x) e cos(x): período 2π
- tan(x): período π

---

## 3. EQUAÇÕES

### 3.1 Equação do 1º Grau

**Forma**: ax + b = 0

**Solução**: x = -b/a

> **Exemplo:**
> 3x - 15 = 0
> 3x = 15
> x = 5

### 3.2 Equação do 2º Grau

**Forma**: ax² + bx + c = 0

**Fórmula de Bhaskara:**
```
Δ = b² - 4ac
x = (-b ± √Δ) / 2a
```

> **Exemplo:**
> x² - 5x + 6 = 0
> Δ = 25 - 24 = 1
> x = (5 ± 1) / 2
> x₁ = 3 e x₂ = 2

**Relações de Girard:**
- Soma das raízes: x₁ + x₂ = -b/a
- Produto das raízes: x₁ × x₂ = c/a

### 3.3 Sistemas Lineares

**Sistema 2×2:**
```
a₁x + b₁y = c₁
a₂x + b₂y = c₂
```

**Métodos de resolução:**
1. Substituição
2. Adição (eliminação)
3. Regra de Cramer (determinantes)

**Classificação:**
- **SPD** (Sistema Possível Determinado): uma única solução
- **SPI** (Sistema Possível Indeterminado): infinitas soluções
- **SI** (Sistema Impossível): nenhuma solução

---

## 4. ANÁLISE COMBINATÓRIA

### 4.1 Princípio Fundamental da Contagem

Se um evento pode ocorrer de m maneiras e outro de n maneiras, então ambos podem ocorrer de m × n maneiras.

> **Exemplo:**
> Uma senha é formada por 2 letras (26 opções cada) e 3 dígitos (10 opções cada).
> Total de senhas: 26 × 26 × 10 × 10 × 10 = **676.000**

### 4.2 Fatorial

n! = n × (n-1) × (n-2) × ... × 2 × 1

**Casos especiais:**
- 0! = 1
- 1! = 1

**Valores úteis:**
```
5! = 120
6! = 720
7! = 5.040
10! = 3.628.800
```

### 4.3 Permutação

**Permutação simples**: Arranjos de n elementos, usando todos eles.
```
Pₙ = n!
```

> **Exemplo:**
> De quantas formas 5 pessoas podem se sentar em 5 cadeiras?
> P₅ = 5! = **120 formas**

**Permutação com repetição**:
```
Pₙᵃ'ᵇ'ᶜ = n! / (a! × b! × c!)
```

> **Exemplo:**
> Anagramas de "BANANA":
> P₆²'³'¹ = 6! / (2! × 3! × 1!) = 720 / 12 = **60 anagramas**

### 4.4 Arranjo

**Arranjo simples**: Sequências ordenadas de k elementos, escolhidos dentre n.
```
Aₙ,ₖ = n! / (n-k)!
```

> **Exemplo:**
> De quantas formas podemos escolher presidente, vice e secretário dentre 10 pessoas?
> A₁₀,₃ = 10! / 7! = 10 × 9 × 8 = **720 formas**

### 4.5 Combinação

**Combinação simples**: Subconjuntos de k elementos, escolhidos dentre n (ordem não importa).
```
Cₙ,ₖ = n! / (k! × (n-k)!)
```

> **Exemplo:**
> De quantas formas podemos escolher 3 operadores dentre 10 candidatos?
> C₁₀,₃ = 10! / (3! × 7!) = 720 / 6 = **120 formas**

**Propriedade**: Cₙ,ₖ = Cₙ,ₙ₋ₖ

---

## 5. PROGRESSÕES

### 5.1 Progressão Aritmética (PA)

**Definição**: Sequência onde a diferença entre termos consecutivos é constante (razão r).

**Termo geral**: aₙ = a₁ + (n-1) × r

**Soma dos n primeiros termos**:
```
Sₙ = (a₁ + aₙ) × n / 2
```

> **Exemplo CESGRANRIO:**
> Uma produção aumenta 50 barris por mês. Se no 1º mês produziu 1000 barris, qual a produção no 12º mês?
> 
> a₁ = 1000, r = 50, n = 12
> a₁₂ = 1000 + 11 × 50 = **1550 barris**

### 5.2 Progressão Geométrica (PG)

**Definição**: Sequência onde a razão entre termos consecutivos é constante (razão q).

**Termo geral**: aₙ = a₁ × qⁿ⁻¹

**Soma dos n primeiros termos** (q ≠ 1):
```
Sₙ = a₁ × (qⁿ - 1) / (q - 1)
```

**Soma de PG infinita** (|q| < 1):
```
S∞ = a₁ / (1 - q)
```

> **Exemplo:**
> Uma bactéria dobra a cada hora. Se há 100 inicialmente, quantas após 5 horas?
> 
> a₁ = 100, q = 2, n = 6 (inicial + 5 horas)
> a₆ = 100 × 2⁵ = **3200 bactérias**

---

## 6. MATRIZES E DETERMINANTES

### 6.1 Operações com Matrizes

**Soma**: Soma elemento a elemento (matrizes de mesma ordem)
```
A + B = [aᵢⱼ + bᵢⱼ]
```

**Multiplicação por escalar**:
```
k × A = [k × aᵢⱼ]
```

**Multiplicação de matrizes** (A(m×n) × B(n×p) = C(m×p)):
- Número de colunas de A = Número de linhas de B
- cᵢⱼ = soma dos produtos linha_i de A × coluna_j de B

### 6.2 Matriz Transposta

Aᵗ: linhas viram colunas
```
A = |1 2|      Aᵗ = |1 3|
    |3 4|           |2 4|
```

### 6.3 Determinantes

**2×2**:
```
|a b|
|c d| = ad - bc
```

**3×3 (Regra de Sarrus)**:
```
|a b c|
|d e f| = aei + bfg + cdh - ceg - bdi - afh
|g h i|
```

**Propriedades:**
- det(Aᵗ) = det(A)
- Linha/coluna de zeros: det = 0
- Duas linhas iguais: det = 0
- det(AB) = det(A) × det(B)

### 6.4 Matriz Inversa

A⁻¹ existe se det(A) ≠ 0

**Para 2×2**:
```
A⁻¹ = 1/det(A) × | d  -b|
                  |-c   a|
```

---

## 7. GEOMETRIA PLANA

### 7.1 Ângulos

- **Ângulo reto**: 90°
- **Ângulo raso**: 180°
- **Ângulos complementares**: somam 90°
- **Ângulos suplementares**: somam 180°

### 7.2 Triângulos

**Classificação por lados:**
- Equilátero: 3 lados iguais
- Isósceles: 2 lados iguais
- Escaleno: 3 lados diferentes

**Classificação por ângulos:**
- Acutângulo: 3 ângulos agudos
- Retângulo: 1 ângulo reto
- Obtusângulo: 1 ângulo obtuso

**Soma dos ângulos internos**: 180°

**Área**: A = (base × altura) / 2

**Teorema de Pitágoras** (triângulo retângulo):
```
hipotenusa² = cateto₁² + cateto₂²
```

### 7.3 Quadriláteros

| Figura | Área | Perímetro |
|--------|------|-----------|
| Quadrado (lado L) | L² | 4L |
| Retângulo (base b, altura h) | b × h | 2(b + h) |
| Paralelogramo | b × h | 2(b + L) |
| Trapézio | (B + b) × h / 2 | B + b + L₁ + L₂ |
| Losango | D × d / 2 | 4L |

### 7.4 Círculo

- **Circunferência** (perímetro): C = 2πr
- **Área**: A = πr²
- **Setor circular** (ângulo θ em radianos): A = r²θ/2

### 7.5 Polígonos Regulares

**Soma dos ângulos internos**: (n - 2) × 180°

**Cada ângulo interno**: (n - 2) × 180° / n

---

## 8. GEOMETRIA ESPACIAL

### 8.1 Prismas

**Volume**: V = Área_base × altura

**Área lateral**: A_lat = Perímetro_base × altura

**Área total**: A_total = 2 × A_base + A_lat

### 8.2 Cilindro

- **Volume**: V = πr²h
- **Área lateral**: A_lat = 2πrh
- **Área total**: A_total = 2πr² + 2πrh = 2πr(r + h)

> **Exemplo típico Petrobras (tanques):**
> Um tanque cilíndrico tem raio 5m e altura 12m. Qual seu volume?
> V = π × 5² × 12 = **300π m³ ≈ 942,48 m³**

### 8.3 Cone

- **Volume**: V = πr²h/3
- **Área lateral**: A_lat = πrg (g = geratriz)
- **Geratriz**: g² = r² + h²

### 8.4 Esfera

- **Volume**: V = 4πr³/3
- **Área**: A = 4πr²

### 8.5 Pirâmide

- **Volume**: V = Área_base × altura / 3

---

## 9. GEOMETRIA ANALÍTICA

### 9.1 Ponto no Plano Cartesiano

**Distância entre dois pontos**:
```
d(A,B) = √[(x₂-x₁)² + (y₂-y₁)²]
```

**Ponto médio**:
```
M = ((x₁+x₂)/2, (y₁+y₂)/2)
```

### 9.2 Equação da Reta

**Forma geral**: ax + by + c = 0

**Forma reduzida**: y = mx + n
- m: coeficiente angular (inclinação)
- n: coeficiente linear (intercepto em y)

**Coeficiente angular**:
```
m = (y₂ - y₁) / (x₂ - x₁) = tan(α)
```

**Retas paralelas**: m₁ = m₂
**Retas perpendiculares**: m₁ × m₂ = -1

### 9.3 Equação da Circunferência

**Forma reduzida**: (x - a)² + (y - b)² = r²
- Centro: (a, b)
- Raio: r

---

## 10. MATEMÁTICA FINANCEIRA

### 10.1 Juros Simples

O juro é calculado sempre sobre o capital inicial.

**Fórmulas:**
```
J = C × i × t
M = C + J = C × (1 + i × t)
```

Onde:
- J: juros
- C: capital inicial
- i: taxa (na forma decimal)
- t: tempo
- M: montante

> **Exemplo:**
> Capital de R$ 10.000 a 2% a.m. por 6 meses.
> J = 10.000 × 0,02 × 6 = R$ 1.200
> M = 10.000 + 1.200 = **R$ 11.200**

### 10.2 Juros Compostos

O juro é calculado sobre o montante do período anterior (juros sobre juros).

**Fórmula:**
```
M = C × (1 + i)ᵗ
```

> **Exemplo:**
> Capital de R$ 10.000 a 2% a.m. por 6 meses.
> M = 10.000 × (1,02)⁶ = 10.000 × 1,1262 = **R$ 11.262**

### 10.3 Taxas Equivalentes

Taxas equivalentes produzem o mesmo montante em períodos diferentes.

**Fórmula** (taxa mensal para anual):
```
(1 + i_anual) = (1 + i_mensal)¹²
```

> **Exemplo:**
> Taxa mensal de 1%. Qual a taxa anual equivalente?
> (1 + i_a) = (1,01)¹² = 1,1268
> i_a = 12,68% a.a.

### 10.4 Descontos

**Desconto Simples Comercial (por fora)**:
```
D = N × i × t
A = N - D = N × (1 - i × t)
```

**Desconto Simples Racional (por dentro)**:
```
A = N / (1 + i × t)
D = N - A
```

Onde:
- N: valor nominal (valor futuro)
- D: desconto
- A: valor atual (valor presente)

### 10.5 Séries de Pagamentos

**Valor Presente de Anuidade**:
```
PV = PMT × [(1 + i)ⁿ - 1] / [i × (1 + i)ⁿ]
```

**Valor Futuro de Anuidade**:
```
FV = PMT × [(1 + i)ⁿ - 1] / i
```

---

## DICAS FINAIS PARA A PROVA

1. **Memorize fórmulas importantes**: Bhaskara, áreas, volumes, juros compostos

2. **Atenção às unidades**: Sempre verifique se taxa e tempo estão na mesma unidade

3. **Use aproximações**: π ≈ 3,14, √2 ≈ 1,41, √3 ≈ 1,73

4. **Confira os cálculos**: Erros de aritmética são comuns sob pressão

5. **Interprete o resultado**: Verifique se a resposta faz sentido no contexto do problema
