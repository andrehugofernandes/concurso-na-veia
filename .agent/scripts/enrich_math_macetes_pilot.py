import re
from pathlib import Path

def apply_ultimate_macetes_conjuntos(file_path):
    path = Path(file_path)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Mapeamento de Macetes para Conjuntos
    macetes = {
        "1": {
            "title": "A Hierarquia de Força",
            "emoji1": "🏗️", "emoji2": "📦",
            "mantra": "Elemento para Conjunto? Use **Pertence (∈)**. Conjunto para Conjunto? Use **Está Contido (⊂)**.",
            "cardA": "Pertencimento (∈)", "exA": "O número 7 pertence aos Primos.", "tipA": "Vínculo Unitário 🎯", "colorA": "amber",
            "cardB": "Inclusão (⊂)", "exB": "Os Naturais estão nos Inteiros.", "tipB": "Vínculo Coletivo 🔗", "colorB": "orange"
        },
        "2": {
            "title": "O Filtro das Operações",
            "emoji1": "🤝", "emoji2": "✂️",
            "mantra": "União (∪) é **SOMA** total. Interseção (∩) é **SÓ O COMUM**. Diferença (A-B) é tirar o intruso.",
            "cardA": "União (∪: Juntar)", "exA": "{1,2} ∪ {2,3} = {1,2,3}", "tipA": "Coleção Total 📂", "colorA": "blue",
            "cardB": "Interseção (∩: Corte)", "exB": "{1,2} ∩ {2,3} = {2}", "tipB": "Ponto Comum 📍", "colorB": "indigo"
        },
        "3": {
            "title": "A Boneca Russa Numérica",
            "emoji1": "🔢", "emoji2": "🪆",
            "mantra": "Os conjuntos se 'abraçam': **ℕ** (Naturais) está dentro de **ℤ** (Inteiros), que está em **ℚ** (Racionais), que está em **ℝ** (Reais).",
            "cardA": "Racionais (ℚ)", "exA": "Toda fração e dízima periódica.", "tipA": "Divisão Exata 🍕", "colorA": "emerald",
            "cardB": "Irracionais (I)", "exB": "π, √2 e decimais infinitos sem padrão.", "tipB": "O 'Restante' 🌀", "colorB": "teal"
        },
        "4": {
            "title": "A Regra do Coração",
            "emoji1": "🎯", "emoji2": "❤️",
            "mantra": "Em diagramas de Venn, **COMECE SEMPRE PELA INTERSEÇÃO** central. É dali que os cálculos fluem.",
            "cardA": "Coração (A ∩ B)", "exA": "Preencha primeiro quem faz ambos.", "tipA": "Marco Zero 🚀", "colorA": "rose",
            "cardB": "Apenas (A - B)", "exB": "Subtraia o centro do total de A.", "tipB": "Exclusividade ✨", "colorB": "pink"
        },
        "5": {
            "title": "Mentalidade de Prova",
            "emoji1": "🧠", "emoji2": "⏱️",
            "mantra": "No simulado, o maior erro é a **Leitura Apressada**. Marque 'Apenas', 'Exceto' e 'Simultaneamente'.",
            "cardA": "Interpretação", "exA": "Busque restrições no enunciado.", "tipA": "Olho Clínico 🔍", "colorA": "violet",
            "cardB": "Velocidade", "exB": "Corte alternativas absurdas.", "tipB": "Ganho de Tempo ⚡", "colorB": "purple"
        },
        "6": {
            "title": "O Ajuste de Contas",
            "emoji1": "⚖️", "emoji2": "🔄",
            "mantra": "Ao somar A + B, você conta o meio **DUAS VEZES**. A fórmula subtrai uma vez para equilibrar.",
            "cardA": "A + B", "exA": "Soma bruta dos dois círculos.", "tipA": "Excesso Inicial 📈", "colorA": "amber",
            "cardB": "Subtrair Meio", "exB": "|A∪B| = |A| + |B| - |A∩B|", "tipB": "Ajuste Fino 🛠️", "colorB": "orange"
        },
        "7": {
            "title": "A Dança dos Sinais",
            "emoji1": "➕", "emoji2": "➖",
            "mantra": "Para 3 conjuntos, o sinal alterna: **Soma** (individuais) - **Subtrai** (pares) + **Soma** (trio).",
            "cardA": "Interseções Pares", "exA": "Subtraia (A∩B), (A∩C) e (B∩C).", "tipA": "Limpeza 🧹", "colorA": "blue",
            "cardB": "O Centro (Trio)", "exB": "Some (A∩B∩C) no final.", "tipB": "Fechamento 🔑", "colorB": "indigo"
        },
        "8": {
            "title": "Identidade Irracional",
            "emoji1": "🥧", "emoji2": "🆔",
            "mantra": "Não confunda: dízima periódica (0,333...) é **RACIONAL**. Dízima não periódica (π) é **IRRACIONAL**.",
            "cardA": "Racional (ℚ)", "exA": "Pode ser escrito como a/b.", "tipA": "Controlável 📏", "colorA": "emerald",
            "cardB": "Irracional (I)", "exB": "Raízes não exatas (√3, √5).", "tipB": "Imprevisível 🌊", "colorB": "teal"
        },
        "9": {
            "title": "Inversão de Dualidade",
            "emoji1": "🔄", "emoji2": "🎭",
            "mantra": "A negação troca tudo: O complementar da União é a **Interseção das Negações**. O 'OU' vira 'E'.",
            "cardA": "¬(A ∪ B)", "exA": "Negação vira ¬A ∩ ¬B", "tipA": "U vira ∩ 🔄", "colorA": "rose",
            "cardB": "¬(A ∩ B)", "exB": "Negação vira ¬A ∪ ¬B", "tipB": "∩ vira U 🔄", "colorB": "pink"
        },
        "10": {
            "title": "Checklist do Aprovado",
            "emoji1": "✅", "emoji2": "🎖️",
            "mantra": "Último passo: Revise se subtraiu as interseções e se os conjuntos numéricos estão na ordem certa.",
            "cardA": "Revisão Final", "exA": "Confira os dados do enunciado.", "tipA": "Segurança Total 🛡️", "colorA": "violet",
            "cardB": "Certificação", "exB": "Você dominou o conteúdo!", "tipB": "Rumo à Posse 🚀", "colorB": "purple"
        }
    }

    # Regex para encontrar ModuleConsolidation dentro de cada modulo
    tabs_content_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
    
    def replacer(match):
        header = match.group(1)
        mod_num = match.group(2)
        body = match.group(3)
        footer = match.group(4)
        
        m = macetes.get(mod_num)
        if not m: return match.group(0)

        # Template Rico
        new_macete_content = f"""maceteVisual={{{{
            title: "O Macete do '{m['title']}'",
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
                  <div className="p-4 bg-{m['colorA']}-500/5 border border-{m['colorA']}-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-{m['colorA']}-600 dark:text-{m['colorA']}-400 mb-2">
                      {m['cardA']}
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "{m['exA']}"
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-{m['colorA']}-700 dark:text-{m['colorA']}-300 uppercase">
                       {m['tipA']} ✅
                    </p>
                  </div>
                  <div className="p-4 bg-{m['colorB']}-500/5 border border-{m['colorB']}-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-{m['colorB']}-600 dark:text-{m['colorB']}-400 mb-2">
                      {m['cardB']}
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "{m['exB']}"
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-{m['colorB']}-700 dark:text-{m['colorB']}-300 uppercase">
                       {m['tipB']} ✅
                    </p>
                  </div>
                </div>
              </>
            )
          }}}}"""

        # Substituir o maceteVisual antigo pelo novo
        # Padrão para encontrar o maceteVisual={ ... }
        macete_pattern = re.compile(r'maceteVisual=\{\{.*?\}\}\}', re.DOTALL)
        if macete_pattern.search(body):
            new_body = macete_pattern.sub(new_macete_content, body)
            return header + new_body + footer
        return match.group(0)

    final_content = tabs_content_pattern.sub(replacer, content)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(final_content)
    print(f"💎 Macetes Premium aplicados com sucesso em {path.name}.")

if __name__ == "__main__":
    apply_ultimate_macetes_conjuntos("src/components/aulas/matematica/AulaConjuntos.tsx")
