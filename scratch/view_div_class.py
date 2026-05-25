with open("src/components/aulas/administracao/AulaGestaoQualidadeSuprimento.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import re
matches = re.findall(r'<div className="space-y-6[^>]*>', content)
print(matches[:10])
