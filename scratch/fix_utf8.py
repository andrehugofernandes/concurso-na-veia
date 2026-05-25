import os
import glob

# Mapping of common CP1252 mangled UTF-8 characters to their correct UTF-8 strings
REPLACEMENTS = {
    "Ã¡": "á",
    "Ã¢": "â",
    "Ã£": "ã",
    "Ã¤": "ä",
    "Ã©": "é",
    "Ãª": "ê",
    "Ã«": "ë",
    "Ã­": "í",
    "Ã®": "î",
    "Ã¯": "ï",
    "Ã³": "ó",
    "Ã´": "ô",
    "Ãµ": "õ",
    "Ã¶": "ö",
    "Ãº": "ú",
    "Ã»": "û",
    "Ã¼": "ü",
    "Ã§": "ç",
    "Ã±": "ñ",
    "Ã€": "À",
    "Ã": "Á",
    "Ã‚": "Â",
    "Ãƒ": "Ã",
    "Ã„": "Ä",
    "Ã‰": "É",
    "ÃŠ": "Ê",
    "Ã‹": "Ë",
    "Ã": "Í",
    "ÃŽ": "Î",
    "Ã": "Ï",
    "Ã“": "Ó",
    "Ã”": "Ô",
    "Ã•": "Õ",
    "Ã–": "Ö",
    "Ãš": "Ú",
    "Ã›": "Û",
    "Ãœ": "Ü",
    "Ã‡": "Ç",
    "Ã‘": "Ñ",
    "ðŸŽ¯": "🎯",
    "ðŸ“š": "📚",
    "ðŸš€": "🚀",
    "ðŸ’¡": "💡",
    "ðŸ”": "🔍",
    "ðŸ“": "📝",
    "â€œ": '"',
    "â€": '"',
    "â€˜": "'",
    "â€™": "'",
    "â€“": "-",
    "â€”": "—",
    "â€¦": "...",
    "Âº": "º",
    "Âª": "ª",
    "Â§": "§",
    "Â": " ",  # Sometimes non-breaking spaces become Â
}

def fix_utf8(directory):
    files = glob.glob(os.path.join(directory, "**", "*.tsx"), recursive=True)
    files.extend(glob.glob(os.path.join(directory, "**", "*.ts"), recursive=True))
    files.extend(glob.glob(os.path.join(directory, "**", "*.md"), recursive=True))
    
    fixed_files = 0
    
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # We need to sort by length descending to replace larger clusters like emojis first,
        # but in this dictionary they are mostly distinct. We will sort just in case.
        for mangled, fixed in sorted(REPLACEMENTS.items(), key=lambda x: len(x[0]), reverse=True):
            content = content.replace(mangled, fixed)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed UTF-8 issues in: {filepath}")
            fixed_files += 1
            
    print(f"Total files fixed: {fixed_files}")

if __name__ == '__main__':
    fix_utf8(r"c:\Workspace\petrobras-quest\src\components\aulas")
    fix_utf8(r"c:\Workspace\petrobras-quest\src\data") # sometimes data has it too
