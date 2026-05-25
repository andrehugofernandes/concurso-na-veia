import os
import re

quizzes_dir = r"c:\Workspace\petrobras-quest\src\data\quizzes"
files = [f for f in os.listdir(quizzes_dir) if f.endswith(".ts")]

for file in files:
    path = os.path.join(quizzes_dir, file)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We find all definitions of questions in the files.
    # A question typically starts with { and has an id.
    # Let's count how many questions have 4 options and how many have 5 options.
    # We can do this by parsing the TS files using regex or simple block analysis.
    
    # Let's find each block of "options: [" or "opcoes: ["
    # and find the closing "]" of the array.
    matches = re.finditer(r'(options|opcoes):\s*\[', content)
    
    four_opts_count = 0
    five_opts_count = 0
    other_opts = []
    
    for match in matches:
        start_idx = match.end()
        # Find matching close bracket "]"
        bracket_count = 1
        current_idx = start_idx
        while bracket_count > 0 and current_idx < len(content):
            char = content[current_idx]
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
            current_idx += 1
        
        block = content[start_idx:current_idx-1]
        
        # Now let's count items in this block.
        # If it's a list of objects, we can count the occurrences of '{' or 'label:'
        # If it's a list of strings, we can count the occurrences of commas or quoted strings.
        # Let's count the number of comma-separated items or object items.
        if '{' in block:
            # It's an array of objects (like gestao-pessoas-quizzes)
            # Count the number of object definitions '{ ... }'
            items_count = block.count('{')
        else:
            # It's an array of strings
            # Let's find all quoted strings
            strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'', block)
            items_count = len(strings)
            
        if items_count == 4:
            four_opts_count += 1
        elif items_count == 5:
            five_opts_count += 1
        else:
            other_opts.append(items_count)
            
    other_summary = f", other: {other_opts}" if other_opts else ""
    print(f"File: {file} | 4 options: {four_opts_count} | 5 options: {five_opts_count}{other_summary}")
