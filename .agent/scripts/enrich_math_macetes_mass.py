import re
import os
from pathlib import Path

# --- DICIONÁRIO DE MACETES POR TEMA (Baseado nos arquivos detectados) ---
THEME_MACETES = {
    "Porcentagem": {
        "1": {
            "title": "A Regra do Zero", "emoji1": "🔢", "emoji2": "⚡",
            "mantra": "Para calcular **10%**, basta mover a vírgula 1 casa. Para **1%**, mova 2 casas. O resto é multiplicação simples!",
            "cardA": "Método 10%", "exA": "10% de 450 = 45.", "tipA": "Corte o Zero ✂️", "colorA": "amber"
        },
        "2": {
            "title": "O Atalho do Fator", "emoji1": "📈", "emoji2": "📉",
            "mantra": "Não calcule a % e depois some. Use **Faltou ou Sobrou**: Aumento de 20%? Multiplique por 1,2. Desconto? Multiplique por 0,8.",
            "cardA": "Aumento (+)", "exA": "Valor × (1 + taxa)", "tipA": "Ganho Real 🚀", "colorA": "blue"
        },
        "6": {
            "title": "A Armadilha Composta", "emoji1": "🔄", "emoji2": "⚠️",
            "mantra": "Aumentos sucessivos **SE MULTIPLICAM**. 10% + 10% não é 20%, é 21% (|1,1 * 1,1 = 1,21|).",
            "cardA": "Erro Comum", "exA": "Somar as porcentagens.", "tipA": "Cuidado! 🛑", "colorA": "rose"
        }
    },
    "Probabilidade": {
        "1": {
            "title": "A Razão do Sucesso", "emoji1": "🎲", "emoji2": "🎯",
            "mantra": "Probabilidade é simplesmente: **O que eu quero** dividido pelo **Total de chances**. Mantenha o foco no Espaço Amostral!",
            "cardA": "Favoráveis", "exA": "O que a questão pede.", "tipA": "Desejo 🌟", "colorA": "emerald"
        }
    },
    "Financeira": {
        "1": {
            "title": "Simples vs Composto", "emoji1": "💰", "emoji2": "⏳",
            "mantra": "Juro Simples cresce como **Reta** (sempre sobre o capital inicial). Composto cresce como **Juros sobre Juros**.",
            "cardA": "Juro Simples", "exA": "J = C * i * t", "tipA": "Linear 📏", "colorA": "amber"
        }
    }
}

# --- TEMPLATES GENÉRICOS POR TIPO DE MÓDULO ---
GENERIC_TEMPLATES = [
    {
        "keywords": ["Introdução", "Conceitos", "Fundamentos", "Base"],
        "emoji1": "🏗️", "emoji2": "💎",
        "mantra": "Todo grande problema se resolve dominando a **base**. Foque na definição antes de decorar a fórmula!",
        "cardA": "Conceituação", "exA": "Entenda o 'Porquê' do tema.", "tipA": "Alicerces 🧱", "colorA": "amber",
        "cardB": "Aplicação", "exB": "Como isso cai na prova.", "tipB": "Impacto 🎯", "colorB": "orange"
    },
    {
        "keywords": ["Fórmulas", "Cálculo", "Operações", "Equações"],
        "emoji1": "🧮", "emoji2": "⚙️",
        "mantra": "Fórmulas são ferramentas. Saiba **quando** usar cada uma e economize tempo precioso na CESGRANRIO.",
        "cardA": "Atalho Tático", "exA": "Simplifique antes de multiplicar.", "tipA": "Velocidade ⚡", "colorA": "blue",
        "cardB": "Atenção", "exB": "Cuidado com unidades de medida.", "tipB": "Precisão ✅", "colorB": "indigo"
    },
    {
        "keywords": ["Gráficos", "Funções", "Geometria", "Análise"],
        "emoji1": "📐", "emoji2": "📈",
        "mantra": "Um gráfico vale mais que mil números. Identifique visualmente a **tendência** e elimine alternativas absurdas.",
        "cardA": "Visualização", "exA": "Onde a curva corta os eixos?", "tipA": "Insight 💡", "colorA": "emerald",
        "cardB": "Interpretação", "exB": "A função cresce ou decresce?", "tipB": "Direção 🚀", "colorB": "teal"
    },
    {
        "keywords": ["Simulado", "Final", "Revisão", "Consolidação"],
        "emoji1": "🏆", "emoji2": "🎖️",
        "mantra": "A aprovação vem da **consistência**. Revise os erros, entenda as pegadinhas e mantenha a calma.",
        "cardA": "Estratégia", "exA": "Pule as difíceis, garanta as fáceis.", "tipA": "Tático 🧠", "colorA": "rose",
        "cardB": "Meta", "exB": "70% de acerto é o objetivo mínimo.", "tipB": "Vencer! 🏁", "colorB": "pink"
    }
]

def get_best_template(aula_name, mod_num, mod_title):
    # 1. Tentar Macete Específico
    for theme, mods in THEME_MACETES.items():
        if theme in aula_name:
            if str(mod_num) in mods:
                return mods[str(mod_num)]
    
    # 2. Tentar Template por Keyword
    for temp in GENERIC_TEMPLATES:
        for kw in temp["keywords"]:
            if kw.lower() in mod_title.lower():
                return temp
                
    # 3. Fallback Seguro
    return GENERIC_TEMPLATES[0]

def enrich_file(file_path):
    path = Path(file_path)
    if not path.exists(): return
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Identificar nome da aula
    aula_name = path.stem.replace("Aula", "")
    
    # Regex para TabsContent
    tabs_content_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
    
    def replacer(match):
        header = match.group(1)
        mod_num = match.group(2)
        body = match.group(3)
        footer = match.group(4)
        
        # Extrair título do banner para contexto
        banner_match = re.search(r'<ModuleBanner.*?titulo="(.*?)"', body)
        mod_title = banner_match.group(1) if banner_match else "Conteúdo"
        
        m = get_best_template(aula_name, mod_num, mod_title)
        
        # Cores seguras based on module number
        variant_colors = ["amber", "blue", "emerald", "rose", "violet", "orange", "indigo", "teal", "pink", "purple"]
        idx = (int(mod_num) - 1) % len(variant_colors)
        base_color = variant_colors[idx]
        sec_color = variant_colors[(idx + 1) % len(variant_colors)]

        # Se o template já tiver cores definidas, usa elas, senão usa as dinâmicas
        c1 = m.get("colorA", base_color)
        c2 = m.get("colorB", sec_color)

        new_macete_content = f"""maceteVisual={{{{
              title: "O Macete do '{m.get('title', mod_title)}'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>{m['emoji1']}</span>
                    <span>{m['emoji2']}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "{m['mantra']}"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-{c1}-500/5 border border-{c1}-500/20 rounded-xl font-sans">
                      <h4 className="text-lg font-bold text-{c1}-600 dark:text-{c1}-400 mb-2">
                        {m['cardA']}
                      </h4>
                      <p className="text-lg text-muted-foreground italic">
                        "{m['exA']}"
                      </p>
                      <p className="text-[10px] mt-2 font-medium text-{c1}-700 dark:text-{c1}-300 uppercase">
                         {m['tipA']} ✅
                      </p>
                    </div>
                    <div className="p-4 bg-{c2}-500/5 border border-{c2}-500/20 rounded-xl font-sans">
                      <h4 className="text-lg font-bold text-{c2}-600 dark:text-{c2}-400 mb-2">
                        {m.get('cardB', 'Atenção')}
                      </h4>
                      <p className="text-lg text-muted-foreground italic">
                        "{m.get('exB', 'Revise este ponto antes da prova.')}"
                      </p>
                      <p className="text-[10px] mt-2 font-medium text-{c2}-700 dark:text-{c2}-300 uppercase">
                         {m.get('tipB', 'Mantenha o Foco')} ✅
                      </p>
                    </div>
                  </div>
                </>
              )
            }}}}"""

        # Substituição via Regex
        macete_pattern = re.compile(r'maceteVisual=\{\{.*?\}\}\s*\}\}', re.DOTALL)
        if macete_pattern.search(body):
            new_body = macete_pattern.sub(new_macete_content, body)
            return header + new_body + footer
        return match.group(0)

    final_content = tabs_content_pattern.sub(replacer, content)
    
    if final_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)
        print(f"✅ {path.name}: Macetes enriquecidos.")
    else:
        print(f"➖ {path.name}: Nenhuma alteração necessária.")

if __name__ == "__main__":
    math_dir = Path("src/components/aulas/matematica")
    for file in math_dir.glob("Aula*.tsx"):
        enrich_file(file)
