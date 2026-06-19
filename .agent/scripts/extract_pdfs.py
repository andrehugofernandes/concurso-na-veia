import os
import PyPDF2

pdf_dir = r"c:\Workspace\petrobras-quest\source\conteudo"
out_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain\aa34de2f-619f-40c0-b2df-0d6d2f6dc1c2\scratch"
os.makedirs(out_dir, exist_ok=True)

pdfs = [
    "03 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf",
    "04 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf",
    "05 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Espec ficos.pdf"
]

for pdf in pdfs:
    pdf_path = os.path.join(pdf_dir, pdf)
    out_path = os.path.join(out_dir, f"{pdf.split()[0]}_extracted.txt")
    
    print(f"Extracting {pdf}...")
    try:
        with open(pdf_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for i, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text += f"\n\n--- PAGE {i+1} ---\n\n" + page_text
        
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Saved to {out_path}")
    except Exception as e:
        print(f"Error extracting {pdf}: {e}")
