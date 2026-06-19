"""
Script: create_matematica_image_dirs.py
Cria a estrutura de pastas para imagens 9:16 das aulas de matemática,
espelhando o padrão de /public/assets/images/portugues/{nome-da-aula}/{modulo-N}/.
"""

import os
import json

# Raiz destino das imagens de matemática
BASE_DIR = r"c:\Workspace\petrobras-quest\public\assets\images\matematica"

# Mapeamento: nome-da-pasta → (número de módulos, título da aula)
AULAS = {
    "conjuntos": (10, "Conjuntos"),
    "porcentagem": (10, "Porcentagem"),
    "razao-proporcao": (10, "Razão e Proporção"),
    "equacoes-1-grau": (10, "Equações do 1º Grau"),
    "equacoes-2-grau": (10, "Equações do 2º Grau"),
    "sistemas-lineares": (10, "Sistemas Lineares"),
    "funcoes-afim-quadratica": (10, "Funções Afim e Quadrática"),
    "funcoes-exponenciais": (10, "Funções Exponenciais"),
    "funcoes-logaritmicas": (10, "Funções Logarítmicas"),
    "matrizes-determinantes": (10, "Matrizes e Determinantes"),
    "progressoes-pa": (10, "Progressões Aritméticas"),
    "progressoes-pg": (10, "Progressões Geométricas"),
    "analise-combinatoria": (10, "Análise Combinatória"),
    "probabilidade": (10, "Probabilidade"),
    "matematica-financeira": (10, "Matemática Financeira"),
    "geometria-plana": (10, "Geometria Plana"),
    "geometria-espacial": (10, "Geometria Espacial"),
    "geometria-analitica": (10, "Geometria Analítica"),
    "trigonometria": (10, "Trigonometria"),
}

# Nomes dos arquivos placeholder esperados em cada módulo (seguindo a skill matematica-visual-builder)
PLACEHOLDER_FILES = [
    "m{n}-conceito.png",       # Tipo 1: Mapa Mental
    "m{n}-formula.png",        # Tipo 2: Passo a Passo
    "m{n}-dicas.png",          # Tipo 3: Pegadinhas & Dicas
]

def create_structure():
    created_dirs = []
    created_readmes = []

    os.makedirs(BASE_DIR, exist_ok=True)

    for aula_slug, (n_modulos, aula_titulo) in AULAS.items():
        aula_dir = os.path.join(BASE_DIR, aula_slug)
        os.makedirs(aula_dir, exist_ok=True)

        for modulo_n in range(1, n_modulos + 1):
            modulo_dir = os.path.join(aula_dir, f"modulo-{modulo_n}")
            os.makedirs(modulo_dir, exist_ok=True)
            created_dirs.append(modulo_dir)

            # Criar README.md em cada pasta de módulo com instruções do prompt
            readme_path = os.path.join(modulo_dir, "README.md")
            readme_content = f"""# {aula_titulo} — Módulo {modulo_n}

## Imagens Esperadas (9:16 retrato, fundo branco/creme)

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `m{modulo_n}-conceito.png` | Mapa Mental | Conceito central do módulo em mind map colorido |
| `m{modulo_n}-formula.png` | Passo a Passo | Fórmula principal + exemplo resolvido |
| `m{modulo_n}-dicas.png` | Pegadinhas | Comparativo ✅ vs ❌ + macete CESGRANRIO |

## Instruções de Geração (Nano Banana Pro 2)

Consulte a skill em:
`.agent/skills/matematica-visual-builder/SKILL.md`

### Estilo Obrigatório
- Formato: **9:16 retrato** (1080×1920 px)
- Fundo: **branco ou creme** (#FFFDF4)
- Estilo: mind map colorido, "concurseira notebook"
- **PROIBIDO**: dark, cyberpunk, neon, fundo escuro

### Caminho de Upload
`/public/assets/images/matematica/{aula_slug}/modulo-{modulo_n}/`
"""
            with open(readme_path, "w", encoding="utf-8") as f:
                f.write(readme_content)
            created_readmes.append(readme_path)

    return created_dirs, created_readmes

def generate_url_mapping():
    """Gera o mapeamento de imageUrl para cada módulo de cada aula."""
    mapping = {}
    for aula_slug, (n_modulos, aula_titulo) in AULAS.items():
        mapping[aula_slug] = {}
        for n in range(1, n_modulos + 1):
            base = f"/assets/images/matematica/{aula_slug}/modulo-{n}"
            mapping[aula_slug][f"modulo-{n}"] = {
                "conceito": f"{base}/m{n}-conceito.png",
                "formula": f"{base}/m{n}-formula.png",
                "dicas": f"{base}/m{n}-dicas.png",
            }
    return mapping

if __name__ == "__main__":
    print("🗂️  Criando estrutura de imagens para aulas de Matemática...")
    print(f"📁  Destino: {BASE_DIR}\n")

    dirs, readmes = create_structure()

    print(f"✅  {len(dirs)} pastas de módulos criadas")
    print(f"📄  {len(readmes)} arquivos README.md criados\n")

    # Exportar mapeamento de URLs como JSON para referência
    url_map = generate_url_mapping()
    map_path = os.path.join(BASE_DIR, "_url_map.json")
    with open(map_path, "w", encoding="utf-8") as f:
        json.dump(url_map, f, ensure_ascii=False, indent=2)
    print(f"🗺️   Mapeamento de URLs salvo em: {map_path}\n")

    print("📂  Estrutura criada:")
    for aula_slug, (n_modulos, _) in AULAS.items():
        print(f"  matematica/{aula_slug}/ → {n_modulos} módulos × 3 imagens = {n_modulos * 3} slots")

    print(f"\n🎯  Total: {len(AULAS)} aulas | {sum(n for n, _ in AULAS.values())} módulos | {sum(n for n, _ in AULAS.values()) * 3} imagens a gerar")
    print("\n✨  Feito! Agora gere as imagens no Nano Banana Pro 2 e salve nas pastas criadas.")
