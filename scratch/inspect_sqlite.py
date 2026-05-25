import sqlite3
import os

conv_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations"
dbs = [f for f in os.listdir(conv_dir) if f.endswith('.db')]
print(f"Bancos de dados SQLite encontrados: {dbs}")

for db in dbs:
    db_path = os.path.join(conv_dir, db)
    print(f"\nInspecionando {db}:")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Listar tabelas
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [t[0] for t in cursor.fetchall()]
        print(f"  Tabelas: {tables}")
        
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            cnt = cursor.fetchone()[0]
            print(f"    Tabela '{table}': {cnt} registros")
            
            # Mostrar estrutura
            cursor.execute(f"PRAGMA table_info({table});")
            info = cursor.fetchall()
            cols = [col[1] for col in info]
            print(f"      Colunas: {cols}")
            
            # Mostrar os primeiros 3 registros
            if cnt > 0:
                cursor.execute(f"SELECT * FROM {table} LIMIT 2;")
                rows = cursor.fetchall()
                print("      Amostra de registros:")
                for r in rows:
                    # Truncar campos longos
                    r_str = str(r)[:200]
                    print(f"        {r_str}...")
        
        conn.close()
    except Exception as e:
        print(f"  Erro ao acessar {db}: {e}")
