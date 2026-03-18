import re
with open("tsc_errors.txt", "r", encoding="utf-16") as f:
    lines = f.readlines()

for line in lines:
    if "src/components/aulas" in line and "error TS" in line:
        print(line.strip())
