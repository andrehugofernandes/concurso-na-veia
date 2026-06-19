
import re
import sys

def count_tags(file_path):
    tags_to_track = [
        'TabsContent',
        'section',
        'ModuleSectionHeader',
        'div',
        'Accordion',
        'AccordionItem',
        'Tabs'
    ]
    
    results = {tag: {'open': 0, 'close': 0} for tag in tags_to_track}
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
            for tag in tags_to_track:
                # Regex for opening tag (avoiding self-closing)
                # Example: <TabsContent ... >
                open_pattern = rf'<{tag}(?:\s+[^>]*[^/])?>'
                # Regex for closing tag
                # Example: </TabsContent>
                close_pattern = rf'</{tag}>'
                # Regex for self-closing tag
                # Example: <TabsContent ... />
                self_close_pattern = rf'<{tag}\s+[^>]*/>'
                
                results[tag]['open'] = len(re.findall(open_pattern, content))
                results[tag]['close'] = len(re.findall(close_pattern, content))
                results[tag]['self_closing'] = len(re.findall(self_close_pattern, content))

        print(f"{'Tag':<25} | {'Open':<6} | {'Close':<6} | {'Balance'}")
        print("-" * 55)
        for tag, counts in results.items():
            balance = counts['open'] - counts['close']
            print(f"{tag:<25} | {counts['open']:<6} | {counts['close']:<6} | {balance}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    count_tags(sys.argv[1])
