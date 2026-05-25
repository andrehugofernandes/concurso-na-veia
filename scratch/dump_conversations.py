import sqlite3

db_path = r"c:\Workspace\petrobras-quest\backups\conversas_history.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT DISTINCT conversation_id FROM messages")
convs = cursor.fetchall()
print(f"Total conversations in database: {len(convs)}")

for c in convs:
    cursor.execute("SELECT source, type, content FROM messages WHERE conversation_id = ? ORDER BY id ASC LIMIT 1", (c[0],))
    first_msg = cursor.fetchone()
    if first_msg:
        print(f"Conv ID: {c[0]}")
        print(f"  First msg [{first_msg[0]} - {first_msg[1]}]: {first_msg[2][:150]}...")
        
conn.close()
