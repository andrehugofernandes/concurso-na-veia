import os
import re

dir_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"
imports = set()

for filename in os.listdir(dir_path):
    if filename.endswith(".tsx"):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            # Encontra blocos de import de react-icons/lu
            match = re.search(r'import\s+\{([^}]+)\}\s+from\s+["\']react-icons/lu["\']', content)
            if match:
                names = [name.strip() for name in match.group(1).split(",")]
                for name in names:
                    if name:
                        imports.add(name)

print("Icons found:")
for name in sorted(imports):
    print(f"  {name}")
