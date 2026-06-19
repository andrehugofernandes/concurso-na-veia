import os

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    for idx, line in enumerate(lines):
        # Check if the line has non-ascii characters or characters outside the common latin-1 printables
        # Check specifically for corrupt byte markers or things like ''
        if any(c in line for c in ['', 'ð', 'Ÿ', 'â', 'œ', 'Ã', 'Â', '€', '™', '']):
            # Safe print
            safe_line = line.strip().encode('ascii', errors='backslashreplace').decode('ascii')
            print(f"Line {idx+1}: {safe_line[:140]}")
else:
    print("File not found")
