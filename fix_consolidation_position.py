import os
import glob
import re
from typing import Tuple, List, Optional, cast

def get_text_range(data: str, start: int, end: int) -> str:
    """Helper to extract range without triggering unusual slice errors in some linters."""
    if start < 0: start = 0
    data_len = len(data)
    if end > data_len: end = data_len
    if start >= end: return ""
    
    # Using a list join as a workaround for linters that reject str slicing
    chars = []
    for i in range(start, end):
        chars.append(data[i])
    return "".join(chars)

def parse_jsx_element(file_text: str, start_idx: int, tag_name: str) -> Tuple[Optional[str], int, int]:
    """Naive JSX parser for the specific formatting of ModuleConsolidation."""
    pos = file_text.find(f"<{tag_name}", start_idx)
    if pos == -1:
        return None, -1, -1

    cursor = pos + 1
    jsx_depth = 0
    tag_depth = 1 
    in_string_double = False
    in_string_single = False
    
    content_len = len(file_text)
    while cursor < content_len:
        c = file_text[cursor]
        
        # Simple state machine to find the end
        if in_string_double:
            if c == '"' and file_text[cursor-1] != '\\':
                in_string_double = False
        elif in_string_single:
            if c == "'" and file_text[cursor-1] != '\\':
                in_string_single = False
        else:
            if c == '"':
                in_string_double = True
            elif c == "'":
                in_string_single = True
            elif c == '{':
                jsx_depth += 1
            elif c == '}':
                jsx_depth -= 1
            elif jsx_depth == 0:
                if c == '<':
                    tag_depth += 1
                elif c == '/' and (cursor + 1 < content_len) and file_text[cursor + 1] == '>':
                    tag_depth -= 1
                    if tag_depth == 0:
                        return get_text_range(file_text, pos, cursor+2), pos, cursor+2
        cursor += 1
        
    return None, -1, -1

def process_file(filepath: str) -> None:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            file_text = f.read()

        new_content, changed = custom_reorder(file_text)
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def custom_reorder(full_content: str) -> Tuple[str, bool]:
    """Reorders ModuleConsolidation to be before QuizInterativo in each TabsContent."""
    parts = full_content.split('<TabsContent')
    if len(parts) <= 1:
        return full_content, False
        
    new_parts: List[str] = [parts[0]]
    changed = False

    # Avoid parts[1:] slice
    for i in range(1, len(parts)):
        block_text = cast(str, parts[i])
        
        mc_match = re.search(r'([\t ]*)<ModuleConsolidation', block_text)
        quiz_match = re.search(r'([\t ]*)<QuizInterativo', block_text)
        
        if mc_match and quiz_match:
            mc_start = mc_match.start()
            mc_indent = mc_match.group(1)
            
            mc_element, start_p, end_p = parse_jsx_element(block_text, mc_start, "ModuleConsolidation")
            
            if mc_element and start_p != -1:
                quiz_start_pos = quiz_match.start()
                
                if start_p < quiz_start_pos:
                    # Remove it using our helper instead of slice
                    before_mc = get_text_range(block_text, 0, start_p)
                    after_mc = get_text_range(block_text, end_p, len(block_text))
                    text_no_mc = before_mc + after_mc
                    
                    new_quiz_match = re.search(r'([\t ]*)<QuizInterativo', text_no_mc)
                    if new_quiz_match:
                        new_q_start = new_quiz_match.start()
                        
                        pre_quiz = get_text_range(text_no_mc, 0, new_q_start)
                        post_quiz = get_text_range(text_no_mc, new_q_start, len(text_no_mc))
                        
                        reordered = pre_quiz + mc_element.strip() + "\n\n" + mc_indent + post_quiz
                        new_parts.append('<TabsContent' + reordered)
                        changed = True
                        continue
                        
        new_parts.append('<TabsContent' + block_text)

    return ("".join(new_parts), changed)

if __name__ == "__main__":
    search_dir = 'src/components/aulas'
    if os.path.exists(search_dir):
        for dirpath, _, filenames in os.walk(search_dir):
            for filename in filenames:
                if filename.endswith('.tsx'):
                    filepath = os.path.join(dirpath, filename)
                    process_file(filepath)
    else:
        print(f"Directory {search_dir} not found.")

