import sqlite3
import os

db_path = r"c:\Workspace\petrobras-quest\backups\conversas_history.db"

if not os.path.exists(db_path):
    print("Database not found!")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Buscar mensagens da conversa 'da5b39a4-7fa5-4c06-8413-668beabd9614' que contêm 'AulaAdministracaoGeralSuprimento.tsx'
# e ordenar por tamanho do conteúdo decrescente para achar as mensagens que injetaram o código completo
cursor.execute("""
    SELECT id, type, length(content) as len, content
    FROM messages
    WHERE content LIKE '%AulaAdministracaoGeralSuprimento.tsx%'
    ORDER BY len DESC
""")

rows = cursor.fetchall()
conn.close()

if not rows:
    print("No messages found containing 'AulaAdministracaoGeralSuprimento.tsx'.")
    exit(0)

print(f"Encontradas {len(rows)} mensagens. Listando as 5 maiores:")
for idx, (msg_id, msg_type, length, content) in enumerate(rows[:5]):
    print(f"ID: {msg_id} | Tipo: {msg_type} | Tamanho: {length} bytes")
    # Escrever a maior no arquivo
    if idx == 0:
        with open("scratch/recuperado.txt", "w", encoding="utf-8") as f:
            f.write(content)
        print(f"-> A maior (ID {msg_id}) foi escrita em scratch/recuperado.txt")
