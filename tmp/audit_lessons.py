import os

directory = "src/components/aulas/"
relevant_folders = ["administracao", "matematica", "portugues"]

errors = []

for folder in relevant_folders:
    path = os.path.join(directory, folder)
    if not os.path.exists(path):
        continue
    for filename in os.listdir(path):
        if filename.endswith(".tsx"):
            filepath = os.path.join(path, filename)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                # Simple Case-Insensitive regex for AlertBox missing titulo
                # Searching tags: <AlertBox ... >
                import re
                alert_tags = re.findall(r'<AlertBox[^>]*>', content, re.IGNORECASE)
                for tag in alert_tags:
                    if 'titulo=' not in tag.lower():
                        errors.append(f"{filename}: AlertBox missing 'titulo'")
                
                # Check for videoId = (assignment in object)
                # Matches: videoId = "..." inside an object {{ ... }}
                if 'videoId =' in content or 'videoId=' in content:
                    # Let's count how many:
                    occurrences = content.count('videoId =') + content.count('videoId=')
                    # Actually, if it's a prop, videoId="..." is fine.
                    # But if it's an object being passed to video={{...}}, then videoId="..." would be a ERROR in JS if it's inside {{}}.
                    # JSX props: videoId="..." OK.
                    # JSX props: video={{ videoId: "..." }} OK.
                    # JSX props: video={{ videoId = "..." }} ERROR (assignment in object literal).
                    if 'video={{' in content:
                         if 'videoId =' in content or 'videoId=' in content:
                            errors.append(f"{filename}: videoId assignment using '=' inside video object (should be ':')")

                # Check for unescaped characters (rudimentary)
                # Look for { } in text.
                # Actually, let's just use grep for some specific bad patterns.
                
if errors:
    print("\n".join(errors))
else:
    print("No errors found in these patterns.")
