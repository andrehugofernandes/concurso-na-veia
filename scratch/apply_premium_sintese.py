# -*- coding: utf-8 -*-
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"
FILES = [
    "AulaAdministracaoGeralSuprimento.tsx",
    "AulaAdministracaoTributaria.tsx",
    "AulaAdministrativoTributario.tsx",
    "AulaComprasSuprimento.tsx",
    "AulaContabilidadeBasica.tsx",
    "AulaDireitoTributario.tsx",
    "AulaGestaoProcessos.tsx",
    "AulaGestaoQualidadeSuprimento.tsx",
    "AulaLei13303.tsx",
    "AulaLogisticaSuprimento.tsx",
]

COLORS = ["emerald", "blue", "cyan", "teal", "amber", "rose"]

def refactor_sintese(content):
    # Regex seguro para capturar toda a prop sinteseEstrategica={{...}} 
    # garantindo que ela termine antes da próxima prop ou fim da tag
    pattern = r'sinteseEstrategica=\{\{.*?\}\}(?=\s*(?:audio|variant)=|\s*/>)'
    
    def replacer(match):
        block = match.group(0)
        
        # 1. Extrair title
        title_match = re.search(r'title:\s*["\'](.*?)["\']', block)
        main_title = title_match.group(1) if title_match else "Síntese Estratégica"

        # 2. Extrair Emojis
        emoji_match = re.search(r'animate-pulse[^>]*>(.*?)</span>', block)
        if not emoji_match:
            emoji_match = re.search(r'animate-pulse[^>]*>(.*?)</div>', block)
        emojis = emoji_match.group(1).strip() if emoji_match else "🎯 🔍"
        if '<' in emojis: emojis = "🎯 🔍" # Fallback se pegar tags HTML
        
        # 3. Extrair Cards
        cards = []
        card_matches = re.finditer(r'<div className="p-4[^>]*rounded-xl[^>]*>(.*?)</div>\s*(?=<div className="p-4|</div)', block, re.DOTALL)
        for c in card_matches:
            c_content = c.group(1)
            t_match = re.search(r'<p[^>]*font-bold[^>]*>(.*?)</p>', c_content)
            if not t_match: t_match = re.search(r'<h[4-6][^>]*>(.*?)</h[4-6]>', c_content)
            card_title = t_match.group(1) if t_match else "Conceito Chave"
            
            d_match = re.search(r'<p[^>]*text-[^>]*text-muted-foreground[^>]*>(.*?)</p>', c_content)
            if not d_match: d_match = re.search(r'<p[^>]*text-muted-foreground[^>]*>(.*?)</p>', c_content)
            card_desc = d_match.group(1) if d_match else "Aprofundamento técnico necessário para a prova."
            
            card_title = re.sub(r'<[^>]+>', '', card_title)
            cards.append({"title": card_title.strip(), "desc": card_desc.strip()})
        
        if not cards:
            t_matches = re.findall(r'<p[^>]*font-bold[^>]*>(.*?)</p>', block)
            d_matches = re.findall(r'<p[^>]*text-muted-foreground[^>]*>(.*?)</p>', block)
            for i in range(len(t_matches)):
                t = t_matches[i]
                d = d_matches[i] if i < len(d_matches) else "Conceito essencial."
                cards.append({"title": re.sub(r'<[^>]+>', '', t).strip(), "desc": d.strip()})
        
        # Fallback ultimate para cards vazios
        if not cards:
            cards.append({"title": "Conceito Central", "desc": "Sintetize esta ideia para a prova."})

        # Construir o novo JSX
        new_jsx = f'sinteseEstrategica={{{{\n'
        new_jsx += f'            title: "{main_title}",\n'
        new_jsx += f'            content: (\n'
        new_jsx += f'              <>\n'
        new_jsx += f'                <div className="text-6xl my-6 animate-pulse text-center">{emojis}</div>\n'
        
        frase_impacto = f"\"{main_title}\": Memorize estas relações cruciais para garantir pontos seguros e não cair nas típicas pegadinhas da banca."
        new_jsx += f'                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">\n'
        new_jsx += f'                  {frase_impacto}\n'
        new_jsx += f'                </p>\n'
        
        cols = 2 if len(cards) <= 2 else 3
        new_jsx += f'                <div className="grid grid-cols-1 md:grid-cols-{cols} gap-6 mt-8 text-left">\n'
        
        for i, card in enumerate(cards):
            color = COLORS[i % len(COLORS)]
            new_jsx += f'                  <div className="p-4 bg-{color}-500/5 border border-{color}-500/20 rounded-xl">\n'
            new_jsx += f'                    <h4 className="text-lg font-bold text-{color}-600 dark:text-{color}-400 mb-2">\n'
            new_jsx += f'                      {card["title"]}\n'
            new_jsx += f'                    </h4>\n'
            new_jsx += f'                    <p className="text-lg text-muted-foreground italic">\n'
            new_jsx += f'                      {card["desc"]}\n'
            new_jsx += f'                    </p>\n'
            new_jsx += f'                    <p className="text-sm mt-2 font-medium text-{color}-700 dark:text-{color}-300">\n'
            new_jsx += f'                      DIRETRIZ TÁTICA: Aplicação direta. ✅\n'
            new_jsx += f'                    </p>\n'
            new_jsx += f'                  </div>\n'
            
        new_jsx += f'                </div>\n'
        new_jsx += f'              </>\n'
        new_jsx += f'            )\n'
        new_jsx += f'          }}}}'
        
        return new_jsx

    # Aplica substituição
    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    return new_content, count

print("="*60)
print("INICIANDO REATOR DE SÍNTESE ESTRATÉGICA PREMIUM (V2 SEGURO)")
print("="*60)

for f in FILES:
    fp = os.path.join(BASE, f)
    with open(fp, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content, count = refactor_sintese(content)
    
    if count > 0:
        with open(fp, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"[+] {f}: {count} módulos atualizados com o padrão Premium.")
    else:
        print(f"[-] {f}: Nenhuma síntese estratégica processada.")

print("\n[CONCLUÍDO] Script de Refatoração Premium finalizado.")
