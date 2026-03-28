import re
from pathlib import Path

def refactor_all_resumos_safe(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"File {file_path} not found.")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Padrão para cada módulo (TabsContent)
    # Procuramos por cade módulo individuamente
    tabs_content_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
    
    def replacer(match):
        tabs_content_start = match.group(1)
        mod_index = int(match.group(2))
        body = match.group(3)
        tabs_content_end = match.group(4)

        # 1. Localizar a seção que contém o ModuleSummaryCarouselNew (Não-guloso)
        # Esse regex encontra a seção MAIS CURTA que contém o componente, ou seja, de um <section ao </section> mais próximo que o envolva.
        # (?s) liga o modo DOTALL localmente dentro do grupo
        carousel_pattern = re.compile(r'(?s)(\s*<section[^>]*>(?:(?!<section).)*?<ModuleSummaryCarouselNew[^>]*>.*?</section>)')
        carousel_match = carousel_pattern.search(body)
        
        if not carousel_match:
            return tabs_content_start + body + tabs_content_end

        resumo_section_text = carousel_match.group(1)

        # 2. Extrair imagens do ModuleSummaryCarouselNew
        images_match = re.search(r'images=\{\[\s*(.*?)\s*\]\}', resumo_section_text, re.DOTALL)
        extracted_images = []
        if images_match:
            images_raw = images_match.group(1)
            # Extrair cada objeto { ... }
            image_blocks = re.findall(r'\{\s*(.*?)\s*\}', images_raw, re.DOTALL)
            for block in image_blocks:
                # Normalização de cores legadas para o novo padrão 500/20
                block = re.sub(r'bg-(\w+)-100(?: dark:bg-(\w+)-900/30)?', r'bg-\1-500/20', block)
                extracted_images.append("{" + block.strip() + "}")

        # 3. Extrair áudio
        audio_data = {}
        audio_card_match = re.search(r'<MusicPlayerCard\s+(.*?)\s*/>', resumo_section_text, re.DOTALL)
        if audio_card_match:
            props_raw = audio_card_match.group(1)
            # Regex robusto para pegar as props com aspas ou chaves
            props = re.findall(r'(\w+)=(?:\{["\']?(.*?)["\']?\}|["\'](.*?)["\']|(\{`.*?`\}))', props_raw, re.DOTALL)
            for p_name, p_val_curly, p_val_quote, p_val_template in props:
                p_val = p_val_curly or p_val_quote or p_val_template
                if p_val: audio_data[p_name] = p_val.strip()
            
            # Repetia lógica para lyrics em template strings
            if 'lyrics' not in audio_data:
                lyrics_match = re.search(r'lyrics=\{(`.*?`)\}', props_raw, re.DOTALL)
                if lyrics_match:
                    audio_data['lyrics'] = lyrics_match.group(1)

        # 4. Localizar ModuleConsolidation
        consolidation_match = re.search(r'<(ModuleConsolidation\b.*?)/>', body, re.DOTALL)
        if not consolidation_match:
            return tabs_content_start + body + tabs_content_end
        
        consolidation_text = consolidation_match.group(0)
        new_consolidation_text = consolidation_text

        # 5. Injetar imagens
        if extracted_images:
            images_list_str = ",\n                ".join(extracted_images)
            images_prop_pattern = re.compile(r'(images:\s*\[).*?(\])', re.DOTALL)
            if images_prop_pattern.search(new_consolidation_text):
                new_consolidation_text = images_prop_pattern.sub(rf'\1\n                {images_list_str}\n              \2', new_consolidation_text)

        # 6. Atualizar áudio
        if audio_data:
            audio_props_list = []
            if 'audioUrl' in audio_data: 
                val = audio_data["audioUrl"].strip("{}'`\"")
                audio_props_list.append(f'audioUrl: "{val}"')
            if 'titulo' in audio_data: 
                val = audio_data["titulo"].strip("{}'`\"")
                audio_props_list.append(f'titulo: "{val}"')
            if 'artista' in audio_data: 
                val = audio_data["artista"].strip("{}'`\"")
                audio_props_list.append(f'artista: "{val}"')
            if 'capaUrl' in audio_data: 
                val = audio_data["capaUrl"].strip("{}'`\"")
                audio_props_list.append(f'capaUrl: "{val}"')
            if 'lyrics' in audio_data: 
                val = audio_data["lyrics"]
                if not val.startswith('{'): val = f"{val}"
                audio_props_list.append(f'lyrics: {val}')
            
            new_audio_prop = "audio={{\n              " + ",\n              ".join(audio_props_list) + "\n            }}"
            audio_prop_pattern = re.compile(r'audio=\{\{.*?\}\}', re.DOTALL)
            new_consolidation_text = audio_prop_pattern.sub(new_audio_prop, new_consolidation_text)

        # 7. Finalização
        new_body = body.replace(resumo_section_text, "")
        new_body = new_body.replace(consolidation_text, new_consolidation_text)

        return tabs_content_start + new_body + tabs_content_end

    final_content = tabs_content_pattern.sub(replacer, content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(final_content)
    print(f"✅ Safe refactoring of all modules completed for {path.name}.")

if __name__ == "__main__":
    refactor_all_resumos_safe("src/components/aulas/matematica/AulaConjuntos.tsx")
