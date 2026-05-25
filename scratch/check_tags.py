import re

def check_tags(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    stack = []
    # Simplified regex for tags, ignoring self-closing ones like <br />, <img />, etc.
    # We focus on major structural tags
    tag_pattern = re.compile(r'<(div|section|TabsContent|TabsList|TabsTrigger|AulaTemplate|ModuleBanner|ModuleSectionHeader|ContentAccordion|FlipCard|LessonTabs|QuizInterativo|MusicPlayerCard|ModuleSummaryCarouselNew|Fragment|>\s*<|/?[a-zA-Z]+)(?:\s+[^>]*?)?(/?|)>')
    
    # Actually, a better approach for JSX is to track exact tag names
    opening_pattern = re.compile(r'<([a-zA-Z0-9]+)(?:\s+[^>]*?)?>')
    closing_pattern = re.compile(r'</([a-zA-Z0-9]+)>')
    self_closing_pattern = re.compile(r'<([a-zA-Z0-9]+)(?:\s+[^>]*?)?/>')

    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Find all tags in line
        # This is tricky with JSX (comments, strings, etc.)
        # We'll do a simple scan first
        
        # Remove comments (simple)
        line = re.sub(r'\{/\*.*?\*/\}', '', line)
        line = re.sub(r'//.*', '', line)
        
        # Find all tags
        tags = re.findall(r'<[^>]+>', line)
        for tag in tags:
            if tag.startswith('</'):
                # Closing tag
                match = closing_pattern.match(tag)
                if match:
                    tag_name = match.group(1)
                    if not stack:
                        print(f"Error: Unexpected closing tag </{tag_name}> at line {line_num}")
                    else:
                        top_tag, top_line = stack.pop()
                        if top_tag != tag_name:
                            print(f"Error: Mismatched tag. Expected </{top_tag}> (from line {top_line}), but found {tag} at line {line_num}")
            elif tag.endswith('/>'):
                # Self-closing
                pass
            else:
                # Opening tag
                match = opening_pattern.match(tag)
                if match:
                    tag_name = match.group(1)
                    # Ignore common self-closing HTML tags if not marked as such
                    if tag_name.lower() in ['br', 'hr', 'img', 'input', 'link', 'meta']:
                        continue
                    stack.append((tag_name, line_num))

    if stack:
        print("\nUnclosed tags remaining in stack:")
        for tag_name, line_num in stack:
            print(f"- <{tag_name}> from line {line_num}")

check_tags('src/components/aulas/portugues/AulaConcordancia.tsx')
