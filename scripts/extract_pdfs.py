"""
Script para extrair texto dos PDFs de Conhecimentos Específicos.
Converte para Markdown estruturado para uso no Petrobras Quest.
"""
import fitz  # PyMuPDF
import os
import re

SOURCE_DIR = os.path.join(os.path.dirname(__file__), '..', 'source', 'conteudo')

PDF_FILES = [
    '03 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf',
    '04 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf',
    '05 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf',
]

OUTPUT_FILES = [
    'conhecimentos_especificos_03.md',
    'conhecimentos_especificos_04.md',
    'conhecimentos_especificos_05.md',
]


def extract_pdf_to_markdown(pdf_path: str, output_path: str) -> None:
    """Extract text from PDF and save as structured markdown."""
    doc = fitz.open(pdf_path)
    
    filename = os.path.basename(pdf_path)
    # Determine the part number from filename
    part_num = filename[:2]
    
    lines = []
    lines.append(f"# Conhecimentos Específicos - Parte {part_num}")
    lines.append(f"> Extraído automaticamente de: `{filename}`")
    lines.append(f"> Total de páginas: {len(doc)}")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    for page_num, page in enumerate(doc, 1):
        text = page.get_text("text")
        
        if not text.strip():
            continue
        
        lines.append(f"## Página {page_num}")
        lines.append("")
        
        # Clean up the text
        cleaned = clean_text(text)
        lines.append(cleaned)
        lines.append("")
        lines.append("---")
        lines.append("")
    
    doc.close()
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"  ✅ Extraído: {output_path} ({len(lines)} linhas)")


def clean_text(text: str) -> str:
    """Clean and format extracted text."""
    # Remove excessive whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Remove page headers/footers (common patterns)
    text = re.sub(r'(?m)^\s*\d+\s*$', '', text)  # standalone page numbers
    text = re.sub(r'(?m)^.*PREP PETROBRAS.*$', '', text)  # header lines
    
    # Trim leading/trailing whitespace per line
    lines = [line.strip() for line in text.split('\n')]
    text = '\n'.join(lines)
    
    # Remove excessive blank lines again after cleaning
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip()


def main():
    print("=" * 60)
    print("📄 Extração de PDFs - Conhecimentos Específicos")
    print("   Petrobras Quest - Suprimentos de Bens e Serviços")
    print("=" * 60)
    print()
    
    for pdf_file, output_file in zip(PDF_FILES, OUTPUT_FILES):
        pdf_path = os.path.join(SOURCE_DIR, pdf_file)
        output_path = os.path.join(SOURCE_DIR, output_file)
        
        if not os.path.exists(pdf_path):
            print(f"  ❌ Não encontrado: {pdf_file}")
            continue
        
        print(f"  📖 Processando: {pdf_file}")
        extract_pdf_to_markdown(pdf_path, output_path)
    
    print()
    print("✅ Extração concluída!")
    print(f"   Arquivos salvos em: {os.path.abspath(SOURCE_DIR)}")


if __name__ == '__main__':
    main()
