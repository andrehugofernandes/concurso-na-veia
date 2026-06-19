import os

ingles_dir = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"
files = [f for f in os.listdir(ingles_dir) if f.endswith(".tsx")]
print(files)
