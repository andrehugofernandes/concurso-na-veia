import re
import os
from pathlib import Path

# --- DICIONÁRIO DE MACETES REAIS (CONJUNTOS) ---
CONJUNTOS_MACETES = {
    "1": {
        "title": "Hierarquia de Força", "emoji1": "🏗️", "emoji2": "📦",
        "mantra": "Elemento para Conjunto? **Pertence (∈)**. Conjunto para Conjunto? **Está Contido (⊂)**.",
        "cardA": "Pertencimento (∈)", "exA": "7 ∈ Primos.", "tipA": "Unitário 🎯"
    },
    "2": {
        "title": "Filtro de Operações", "emoji1": "🤝", "emoji2": "✂️",
        "mantra": "União (∪) **SOMA TUDO**. Interseção (∩) **SÓ O COMUM**. Diferença (-) **TIRA O OUTRO**.",
        "cardA": "União (∪)", "exA": "{1,2} ∪ {2,3} = {1,2,3}", "tipA": "Total 📂"
    },
    "3": {
        "title": "Boneca Russa", "emoji1": "🔢", "emoji2": "🪆",
        "mantra": "A ordem é: **ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ** (Naturais dentro de Inteiros, dentro de Racionais, dentro de Reais).",
        "cardA": "Naturais (ℕ)", "exA": "{0, 1, 2, ...}", "tipA": "Base 🧱"
    },
    "4": {
        "title": "Regra do Coração", "emoji1": "🎯", "emoji2": "❤️",
        "mantra": "No Diagrama de Venn, preencha a **INTERSEÇÃO CENTRAL** primeiro. É a chave do problema!",
        "cardA": "Centro (A ∩ B)", "exA": "Marque quem faz ambos.", "tipA": "Foco 📍"
    },
    "6": {
        "title": "Ajuste de Venn", "emoji1": "⚖️", "emoji2": "🔄",
        "mantra": "Ao somar A + B, você conta o meio **duas vezes**. Subtraia a interseção para equilibrar!",
        "cardA": "Fórmula", "exA": "n(A∪B) = n(A)+n(B)-n(A∩B)", "tipA": "Ajuste 🛠️"
    }
}

# --- DICIONÁRIO DE MACETES REAIS (PORCENTAGEM) ---
PORCENTAGEM_MACETES = {
    "1": {
        "title": "Regra da Vírgula", "emoji1": "🔢", "emoji2": "⚡",
        "mantra": "10%? Volte a vírgula **1 casa**. 1%? Volte **2 casas**. Simples assim!",
        "cardA": "10% de 450", "exA": "Basta ver como 45,0", "tipA": "Rápido 🏃"
    },
    "2": {
        "title": "Fator de Elite", "emoji1": "📈", "emoji2": "📉",
        "mantra": "Aumento de 20%? Multiplique por **1,2**. Desconto? Por **0,8**. Ganhe tempo!",
        "cardA": "Aumento (+)", "exA": "Capital * (1 + i)", "tipA": "Direto 🚀"
    },
    "6": {
        "title": "Juros Sucessivos", "emoji1": "🔄", "emoji2": "⚠️",
        "mantra": "Aumentos sucessivos se **MULTIPLICAM**. 10% + 10% = 21%, não 20%!",
        "cardA": "Fique Atento", "exA": "1,1 * 1,1 = 1,21", "tipA": "Alerta 🛑"
    }
}

def get_rich_content(aula_name, mod_num, mod_title):
    data = None
    if "Conjuntos" in aula_name: data = CONJUNTOS_MACETES.get(mod_num)
    elif "Porcentagem" in aula_name: data = PORCENTAGEM_MACETES.get(mod_num)
    
    # Fallback Genérico mas Rico
    if not data:
        data = {
            "title": f"Dica Master: {mod_title}",
            "emoji1": "🧠", "emoji2": "🎖️",
            "mantra": f"Domine o conceito de **{mod_title}** focando na base teórica e na prática constante.",
            "cardA": "Ponto Chave", "exA": "Entenda a lógica por trás da fórmula.", "tipA": "Conhecimento 💎"
        }
    
    # Cores dinâmicas baseadas no módulo
    colors = ["amber", "blue", "emerald", "rose", "violet", "orange", "indigo", "teal", "pink", "purple"]
    c1 = colors[(int(mod_num)-1)%len(colors)]
    c2 = colors[int(mod_num)%len(colors)]

    return f"""maceteVisual={{{{
              title: "O Macete do '{data['title']}'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>{data['emoji1']}</span>
                    <span>{data['emoji2']}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "{data['mantra']}"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-{c1}-500/5 border border-{c1}-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-{c1}-600 dark:text-{c1}-400 mb-2">
                        {data['cardA']}
                      </h4>
                      <p className="text-lg text-muted-foreground italic">
                        "{data.get('exA', 'Exemplo disponível em breve.')}"
                      </p>
                      <p className="text-[10px] mt-2 font-medium text-{c1}-700 dark:text-{c1}-300 uppercase">
                         {data.get('tipA', 'Dica de Elite')} ✅
                      </p>
                    </div>
                    <div className="p-4 bg-{c2}-500/5 border border-{c2}-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-{c2}-600 dark:text-{c2}-400 mb-2">
                        {data.get('cardB', 'Resumo Prático')}
                      </h4>
                      <p className="text-lg text-muted-foreground italic">
                        "{data.get('exB', 'Revise este ponto antes da prova.')}"
                      </p>
                      <p className="text-[10px] mt-2 font-medium text-{c2}-700 dark:text-{c2}-300 uppercase">
                         Foco Total ✅
                      </p>
                    </div>
                  </div>
                </>
              )
            }}}}"""

def enrich_math_files():
    math_dir = Path("src/components/aulas/matematica")
    for file_path in math_dir.glob("Aula*.tsx"):
        print(f"Processando {file_path.name}...")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Regex Robusta: Encontra TabsContent e dentro dele ModuleConsolidation
        tabs_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
        
        def tabs_replacer(m_tabs):
            header = m_tabs.group(1)
            mod_num = m_tabs.group(2)
            body = m_tabs.group(3)
            footer = m_tabs.group(4)
            
            # Buscar título do módulo no banner
            banner_title = "Conteúdo"
            b_match = re.search(r'<ModuleBanner.*?titulo="(.*?)"', body)
            if b_match: banner_title = b_match.group(1)
            
            # Gerar conteúdo rico
            rich_macete = get_rich_content(file_path.name, mod_num, banner_title)
            
            # Substituir o maceteVisual antigo
            # Procura maceteVisual={{ ... }} com cuidado para balanceamento de chaves básico
            # Usando uma regex que para no fechamento do objeto maceteVisual
            macete_pattern = re.compile(r'maceteVisual=\{\{.*?\}\}\s*\}*', re.DOTALL)
            
            # No nosso caso, o ModuleConsolidation costuma ter props seguidas por }} /
            # Vamos tentar capturar o bloco maceteVisual inteiro
            # Pattern: maceteVisual={{ até encontrar o próximo fechamento }} que não seja seguido por mais chaves internas
            # Uma abordagem mais simples: encontrar o Início e o Fim manual
            start_idx = body.find('maceteVisual={{')
            if start_idx != -1:
                # Encontrar o fechamento correspondente }}
                # Como o content ( ... ) pode ter chaves, precisamos de algo mais esperto
                # Mas para os arquivos atuais, costuma terminar em \n            }}
                end_search = body[start_idx:].find('}}')
                if end_search != -1:
                    real_end = start_idx + end_search + 2
                    new_body = body[:start_idx] + rich_macete + body[real_end:]
                    return header + new_body + footer
            
            return m_tabs.group(0)

        new_content = tabs_pattern.sub(tabs_replacer, content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"💎 {file_path.name} atualizado com Macetes Ultimate.")
        else:
            print(f"➖ {file_path.name} já atualizado ou sem padrão compatível.")

if __name__ == "__main__":
    enrich_math_files()
