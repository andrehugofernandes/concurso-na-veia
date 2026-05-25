import re

def check_jsx_structure(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove comments
    content = re.sub(r'\{/\*.*?\*/\}', '', content, flags=re.DOTALL)
    content = re.sub(r'//.*', '', content)
    
    # We want to track structural tags: section, div, TabsContent, etc.
    tags_to_track = ['section', 'div', 'TabsContent', 'TabsList', 'TabsTrigger', 'AulaTemplate', 'ModuleBanner', 'ModuleSectionHeader', 'ContentAccordion', 'FlipCard', 'LessonTabs', 'QuizInterativo', 'MusicPlayerCard', 'ModuleSummaryCarouselNew', 'Fragment']
    
    # Find all tags
    # <Tag ... /> or <Tag ... > or </Tag>
    pattern = re.compile(r'</?([a-zA-Z0-9]+)(?:\s+[^>]*?)?(/?|)>')
    
    stack = []
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        line_num = i + 1
        # Find all tags in this line
        # Note: This doesn't handle multi-line tags well, but usually closing tags are on their own line or at the end
        # and opening tags start on a line.
        for match in pattern.finditer(line):
            tag_full = match.group(0)
            tag_name = match.group(1)
            is_closing = tag_full.startswith('</')
            is_self_closing = tag_full.endswith('/>')
            
            if tag_name not in tags_to_track and not tag_name[0].isupper():
                continue # Skip small HTML tags or non-structural ones
            
            if is_self_closing:
                continue
            
            if is_closing:
                if not stack:
                    print(f"Error: Unexpected closing tag {tag_full} at line {line_num}")
                else:
                    top_tag, top_line = stack.pop()
                    if top_tag != tag_name:
                        print(f"Error: Mismatched tag. Expected </{top_tag}> (from line {top_line}), but found {tag_full} at line {line_num}")
            else:
                stack.append((tag_name, line_num))

    if stack:
        print("\nUnclosed tags remaining in stack:")
        for tag_name, line_num in stack:
            print(f"- <{tag_name}> from line {line_num}")

check_jsx_structure('src/components/aulas/portugues/AulaConcordancia.tsx')
