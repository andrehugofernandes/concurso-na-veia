import re
import os

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"
if not os.path.exists(path):
    print("File not found")
    exit(1)

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Substituir variant={mv[X]} por variant={mv[1]}
content = re.sub(r'variant=\{mv\[\d+\]\}', 'variant={mv[1]}', content)

# 2. Corrigir numero={...} nos Quizzes com base no módulo
# Encontramos os blocos de TabsContent modulo-1 a modulo-10
pattern = r'(<TabsContent value="modulo-(\d+)">.*?</TabsContent>)'
# Como o tabs content pode ter tags aninhadas, vamos processar linha a linha ou identificar o TabsContent correspondente
# Uma alternativa é buscar por modulo-1 ate modulo-10
for m in range(1, 11):
    modulo_val = f"modulo-{m}"
    # Vamos achar a seção correspondente
    # Uma forma robusta de achar a seção modulo-X é achar o início de <TabsContent value="modulo-X">
    # até o início do próximo modulo-Y ou o final do retorno JSX
    start_tag = f'<TabsContent value="modulo-{m}">'
    end_tag = f'</TabsContent>'
    
    start_idx = content.find(start_tag)
    if start_idx == -1:
        continue
        
    # Vamos achar o final correspondente. Como o final do TabsContent é </TabsContent>,
    # mas existem outros </TabsContent> abaixo, o correto é pegar o conteúdo até a próxima aba ou final.
    next_m = m + 1
    if next_m <= 10:
        next_tag = f'<TabsContent value="modulo-{next_m}">'
        end_idx = content.find(next_tag)
    else:
        # Último módulo, vai até o final dos TabsContent ou fechamento do AulaTemplate
        end_idx = content.find('</AulaTemplate>')
        
    if end_idx == -1:
        end_idx = len(content)
        
    modulo_block = content[start_idx:end_idx]
    
    # Dentro deste bloco, substituir <QuizInterativo ... numero={...} por numero={m}
    # Vamos achar QuizInterativo e seu numero={...}
    def replace_quiz_num(match):
        quiz_text = match.group(0)
        # Substitui numero={qualquer_coisa} por numero={m}
        updated = re.sub(r'numero=\{\d+\}', f'numero={{{m}}}', quiz_text)
        return updated
        
    updated_block = re.sub(r'<QuizInterativo[\s\S]*?/>', replace_quiz_num, modulo_block)
    
    # Atualizar o conteúdo principal
    content = content[:start_idx] + updated_block + content[end_idx:]

# 3. Substituir os ícones de Accordion com base no título do slide
# slides={[ { titulo: "① Conceituação...", icone: "...", conteudo: ... } ]}
# Vamos identificar todos os blocos de item de accordion que têm titulo contendo ①, ②, ③, ④
# E substituir a propriedade icone
def clean_accordion_item(match):
    item_text = match.group(0)
    # Identificar o número no título
    if '①' in item_text or '1.' in item_text or 'Conceituação' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuBookOpen className="w-5 h-5" />', item_text)
    elif '②' in item_text or '2.' in item_text or 'Exemplificação' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuPlay className="w-5 h-5" />', item_text)
    elif '③' in item_text or '3.' in item_text or 'Dicas' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuLightbulb className="w-5 h-5" />', item_text)
    elif '④' in item_text or '4.' in item_text or 'Exceções' in item_text or 'Pegadilha' in item_text:
        item_text = re.sub(r'icone:\s*("[^"]*"|<[^>]*>)', 'icone: <LuTriangleAlert className="w-5 h-5" />', item_text)
    return item_text

# Vamos aplicar nos itens do array slides
# Um item do accordion é estruturado como: { titulo: "...", icone: ..., conteudo: ... }
# Vamos procurar por trechos entre chaves que começam com titulo:
content = re.sub(r'\{\s*titulo:\s*["\'].*?["\'],\s*icone:\s*.*?,[\s\S]*?\}', clean_accordion_item, content)

# 4. Decodificar caracteres corrompidos comuns adicionais no texto se houver
# Vamos salvar o arquivo
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Success: Refactored AulaReadingStrategies.tsx")
