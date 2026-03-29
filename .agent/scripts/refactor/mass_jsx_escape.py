import os
import re
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from safeguard import safe_write, safe_read

DRY_RUN = "--dry-run" in sys.argv

def escape_jsx_file(path):
    content = safe_read(path)
    if content is None:
        return

    # Procurar por { e } que NÃO estão sendo usados pelo React (ex: em props ou expressions)
    # Uma heurística comum em nossas aulas: dentro de <p>, <span> ou como valores de strings literais em maceteVisual
    
    # Substituir chaves literais por {"{"} e {"}"}
    # Primeiro protegemos os comentários React {/* e */}
    content = content.replace('{/*', '___COMMENT_START___')
    content = content.replace('*/}', '___COMMENT_END___')
    
    # Protegemos expressões de props como variant={...} ou index={...} ou numero={...}
    # TENTAMOS PROTEGER TODA QUALQUER PROP QUE COMECE COM ={ OU ={{
    # Captura props comuns com chaves simples ou duplas
    content = re.sub(r'(\w+)=\{\{', r'__DOUBLE_PROP_\1_START__', content)
    content = re.sub(r'\}\}', r'__DOUBLE_PROP_END__', content)
    
    props_to_protect = ["index", "numero", "variant", "questoes", "onComplete", "onOpenChange", "duration", "onUpdateProgress", "videoId", "value", "moduloNumero", "titulo", "icone", "corIndicador"]
    for prop in props_to_protect:
        content = re.sub(rf'{prop}=\{{(.+?)\}}', rf'__PROP_{prop}_START__\1__PROP_{prop}_END__', content, flags=re.DOTALL)
    
    # Protegemos também imports destruturados e funções
    content = re.sub(r'import \{(.+?)\} from', r'import __IMPORT_START__\1__IMPORT_END__ from', content)
    content = re.sub(r'export default function (.+?)\((.+?)\) \{', r'export default function \1(\2) __FUNCTION_START__', content)
    
    # Agora substituímos as chaves que sobraram (as nuas que aparecem no meio do texto/macetes)
    # MAS PRIMEIRO REMOVEMOS QUALQUER ESCAPE JÁ EXISTENTE PARA EVITAR DUPLICIDADE
    content = content.replace('{"{"}', '{')
    content = content.replace('{"}"}', '}')
    
    content = content.replace('{', '{"{"}')
    content = content.replace('}', '{"}"}')
    
    # Restauramos as coisas protegidas
    content = content.replace('___COMMENT_START___', '{/*')
    content = content.replace('___COMMENT_END___', '*/}')
    content = content.replace('__DOUBLE_PROP_END__', '}}')
    content = re.sub(r'__DOUBLE_PROP_(\w+)_START__', r'\1={{', content)
    content = content.replace('__FUNCTION_START__', '{')
    content = re.sub(r'import __IMPORT_START__(.+?)__IMPORT_END__ from', r'import {\1} from', content)
    
    for prop in props_to_protect:
        content = re.sub(rf'__PROP_{prop}_START__(.+?)__PROP_{prop}_END__', rf'{prop}={{\1}}', content, flags=re.DOTALL)
    
    # Corrigimos excessos (ex: double escaping se já houvesse algum parcial)
    content = content.replace('{"{"}{"{"}', '{"{"}')
    content = content.replace('{"}"}{"}"}', '{"}"}')

    safe_write(path, content, dry_run=DRY_RUN)

if __name__ == "__main__":
    import sys
    
    aulas_dir = "src/components/aulas/matematica"
    
    if len(sys.argv) > 1:
        # Se passar o path do arquivo individual
        target_files = [sys.argv[1]]
    else:
        # Pega todos os arquivos tsx no diretório de matemática
        target_files = [os.path.join(aulas_dir, f) for f in os.listdir(aulas_dir) if f.endswith(".tsx")]
    
    for target in target_files:
        if os.path.exists(target):
            print(f"Escapando JSX em {target}...")
            try:
                escape_jsx_file(target)
                print(f"✅ {os.path.basename(target)}: Build fix concluído.")
            except Exception as e:
                print(f"❌ Erro em {target}: {str(e)}")
