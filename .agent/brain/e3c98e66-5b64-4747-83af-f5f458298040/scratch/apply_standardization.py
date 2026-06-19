import os
import re

replacements = {
    r'\bArena de Elite\b': 'Avaliação de Fixação Avançada',
    r'\bCombo de Elite\b': 'Conteúdo Integrado',
    r'\bNível Elite\b': 'Nível Avançado',
    r'\bMentalidade Elite\b': 'Mentalidade Estratégica',
    r'\bMestre da Segurança\b': 'Especialista em Segurança',
    r'\bMestre de Segurança\b': 'Especialista em Segurança',
    r'\bSimulado Mestre\b': 'Simulado Geral',
    r'\bMestre em ([A-Z][a-z]+)\b': r'Especialista em \1',
    r'\bMestres da ([A-Z][a-z]+)\b': r'Especialistas da \1',
    r'\bpegadinhas?\b': 'pontos de atenção',
    r'\bbizus?\b': 'orientação técnica',
    r'\bLetal\b': 'Crítico',
    r'\bElite\b': 'Avançado',
    r'\bO Pulo do Gato\b': 'Destaque Estratégico',
    r'\bO Mantra\b': 'O Princípio',
    r'\bProibições Fatais\b': 'Restrições de Uso',
    r'\bA Diferença Letal\b': 'Diferenciação Técnica',
    r'\bA Regra de Ouro\b': 'Princípio Fundamental',
}

def apply_replacements(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') and file.startswith('Aula'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for pattern, replacement in replacements.items():
                    # Case insensitive replacement for some terms if needed, 
                    # but here we use word boundaries and some specific casing
                    new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {path}")
                    count += 1
    return count

if __name__ == "__main__":
    aulas_dir = r'c:\Workspace\petrobras-quest\src\components\aulas'
    updated_count = apply_replacements(aulas_dir)
    print(f"Finished updating {updated_count} files.")
