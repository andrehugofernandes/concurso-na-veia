
import re
html = open('src/components/aulas/administracao/AulaPlanejamentoEstrategico.tsx', encoding='utf-8').read()
tags = re.findall(r'<\/?(div|section|TabsContent)[>\s]', html)
open('count.json', 'w').write(str({'div': tags.count('<div') - tags.count('</div'), 'section': tags.count('<section') - tags.count('</section'), 'TabsContent': tags.count('<TabsContent') - tags.count('</TabsContent')}))
