import re
from pathlib import Path

def refactor_resumo_multimidia(file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"File {file_path} not found.")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Padrão para cada módulo (TabsContent)
    # Buscamos o conteúdo de cada TabsContent individualmente
    tabs_content_pattern = re.compile(r'(<TabsContent\s+value="modulo-(\d+)"[^>]*>)(.*?)(</TabsContent>)', re.DOTALL)
    
    def replacer(match):
        full_match = match.group(0)
        tabs_content_start = match.group(1)
        mod_id = match.group(2)
        body = match.group(3)
        tabs_content_end = match.group(4)

        # 1. Localizar a seção "Resumo e Multimídia"
        resumo_section_pattern = re.compile(
            r'(\s*<section[^>]*>\s*<ModuleSectionHeader[^>]*title="Resumo e Multimídia"[^>]*>.*?</section>)', 
            re.DOTALL
        )
        resumo_section_match = resumo_section_pattern.search(body)
        
        if not resumo_section_match:
            return full_match

        resumo_section_text = resumo_section_match.group(1)

        # 2. Extrair imagens do ModuleSummaryCarouselNew
        images_match = re.search(r'images=\{\[\s*(.*?)\s*\]\}', resumo_section_text, re.DOTALL)
        extracted_images = []
        if images_match:
            images_raw = images_match.group(1)
            # Extrair cada objeto de imagem { ... }
            image_blocks = re.findall(r'\{\s*(.*?)\s*\}', images_raw, re.DOTALL)
            for block in image_blocks:
                extracted_images.append("{" + block.strip() + "}")

        # 3. Extrair dados de áudio do MusicPlayerCard
        audio_data = {}
        audio_card_match = re.search(r'<MusicPlayerCard\s+(.*?)\s*/>', resumo_section_text, re.DOTALL)
        if audio_card_match:
            props_raw = audio_card_match.group(1)
            # Extrair props como audioUrl, titulo, artista, etc.
            props = re.findall(r'(\w+)=(?:\{["\']?(.*?)["\']?\}|["\'](.*?)["\'])', props_raw, re.DOTALL)
            for p_name, p_val_curly, p_val_quote in props:
                p_val = p_val_curly or p_val_quote
                audio_data[p_name] = p_val
            
            # Caso especial para lyrics que pode usar template strings (backticks)
            lyrics_match = re.search(r'lyrics=\{(`.*?`)\}', props_raw, re.DOTALL)
            if lyrics_match:
                audio_data['lyrics'] = lyrics_match.group(1)

        # 4. Localizar ModuleConsolidation no corpo do módulo
        consolidation_match = re.search(r'<(ModuleConsolidation\b.*?)/>', body, re.DOTALL)
        if not consolidation_match:
            return full_match # Não achou onde injetar, pula
        
        consolidation_text = consolidation_match.group(0)
        new_consolidation_text = consolidation_text

        # 5. Injetar imagens extraídas no resumoVisual.images
        if extracted_images:
            images_list_str = ",\n                ".join(extracted_images)
            images_prop_pattern = re.compile(r'(images:\s*\[).*?(\])', re.DOTALL)
            if images_prop_pattern.search(new_consolidation_text):
                new_consolidation_text = images_prop_pattern.sub(rf'\1\n                {images_list_str}\n              \2', new_consolidation_text)
            else:
                # Se não tiver a prop images dentro de resumoVisual, tenta adicionar
                # (Mas no AulaConjuntos já tem placeholders)
                pass

        # 6. Atualizar a prop audio do ModuleConsolidation
        if audio_data:
            audio_props_list = []
            if 'audioUrl' in audio_data: audio_props_list.append(f'audioUrl: "{audio_data["audioUrl"]}"')
            if 'titulo' in audio_data: audio_props_list.append(f'titulo: "{audio_data["titulo"]}"')
            if 'artista' in audio_data: audio_props_list.append(f'artista: "{audio_data["artista"]}"')
            if 'capaUrl' in audio_data: audio_props_list.append(f'capaUrl: "{audio_data["capaUrl"]}"')
            if 'lyrics' in audio_data: 
                audio_props_list.append(f'lyrics: {audio_data["lyrics"]}')
            
            new_audio_prop = "audio={{\n              " + ",\n              ".join(audio_props_list) + "\n            }}"
            audio_prop_pattern = re.compile(r'audio=\{\{.*?\}\}', re.DOTALL)
            new_consolidation_text = audio_prop_pattern.sub(new_audio_prop, new_consolidation_text)

        # 7. Remover a seção duplicada
        new_body = body.replace(resumo_section_text, "")
        
        # 8. Substituir o ModuleConsolidation original pelo atualizado
        new_body = new_body.replace(consolidation_text, new_consolidation_text)

        return tabs_content_start + new_body + tabs_content_end

    new_content = tabs_content_pattern.sub(replacer, content)

    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ Refatoração de 'Resumo e Multimídia' para 'ModuleConsolidation' concluída em {path.name}.")
    else:
        print(f"⚠️ Nenhuma seção duplicada encontrada para refatorar em {path.name}.")

if __name__ == "__main__":
    refactor_resumo_multimidia("src/components/aulas/matematica/AulaConjuntos.tsx")
