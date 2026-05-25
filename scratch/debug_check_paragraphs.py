with open("src/components/aulas/administracao/AulaGestaoQualidadeSuprimento.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import re
# Vamos achar todas as divs com class contendo text-lg text-justify text-foreground/85 leading-relaxed
divs = re.findall(r'<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">(.*?)</div>', content, re.DOTALL)
print(f"Achei {len(divs)} divs do tipo intro.")
for idx, div in enumerate(divs):
    p_tags = re.findall(r'<p>.*?</p>', div, re.DOTALL)
    print(f"  Div {idx+1}: {len(p_tags)} parágrafos.")
