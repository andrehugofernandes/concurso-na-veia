import os

def check_props(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        if '<AulaTemplate' in content:
            missing = []
            if 'isModuleUnlocked' not in content:
                missing.append('isModuleUnlocked')
            if 'isCompleted' not in content:
                missing.append('isCompleted')
            if 'completedModules' not in content:
                missing.append('completedModules')
            if 'activeTab' not in content:
                missing.append('activeTab')
            if 'setActiveTab' not in content:
                missing.append('setActiveTab')
            if 'modules' not in content:
                missing.append('modules')
            if missing:
                return missing
    return None

base_dir = r'c:\Workspace\petrobras-quest\src\components\aulas'
results = {}
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.startswith('Aula') and file.endswith('.tsx'):
            result = check_props(os.path.join(root, file))
            if result:
                results[file] = result

if results:
    for file, props in results.items():
        print(f"{file} missing props: {', '.join(props)}")
else:
    print("All AulaTemplate components have the checked props.")
