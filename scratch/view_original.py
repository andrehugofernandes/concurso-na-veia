import subprocess

try:
    content = subprocess.check_output(
        ["git", "show", "origin/main:src/components/aulas/ingles/AulaTextComprehension.tsx"],
        text=True,
        encoding="utf-8"
    )
    lines = content.splitlines()
    for idx in range(910, 955):
        if idx < len(lines):
            print(f"{idx+1}: {lines[idx]}")
except Exception as e:
    print(f"Error: {e}")
