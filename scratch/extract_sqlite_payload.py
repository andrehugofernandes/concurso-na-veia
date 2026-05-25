import sqlite3
import re

db_path = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations\2571cd42-9bbd-4f33-8ae5-ac5ca9ab53ad.db"
print(f"Inspecionando blobs no SQLite: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT idx, step_payload, step_type FROM steps LIMIT 10;")
    rows = cursor.fetchall()
    
    for idx, payload, s_type in rows:
        print(f"\nPasso {idx} (type={s_type}):")
        if payload:
            print(f"  Tamanho do payload: {len(payload)} bytes")
            # Tentar extrair strings legíveis do blob
            strings = []
            current = []
            for b in payload:
                if 32 <= b <= 126 or b in [10, 13, 9]:
                    current.append(chr(b))
                else:
                    if len(current) >= 6:
                        strings.append("".join(current))
                    current = []
            if len(current) >= 6:
                strings.append("".join(current))
                
            print(f"  Strings encontradas ({len(strings)}):")
            for s in strings[:15]:
                print(f"    - {repr(s)}")
        else:
            print("  Payload vazio.")
            
    conn.close()
except Exception as e:
    print(f"Erro: {e}")
