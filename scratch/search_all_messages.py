import sqlite3
import os

db_path = r"c:\Workspace\petrobras-quest\context_history.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Search for any messages containing mentions of the files or key terms
terms = [
    "Qualidade",
    "Logistica",
    "Compras",
    "Lei13303",
    "RLCP",
    "Contabilidade",
    "DireitoTributario",
    "AdministracaoTributaria"
]

for term in terms:
    cursor.execute('''
        SELECT id, conversation_id, source, type, length(content)
        FROM messages
        WHERE content LIKE ?
    ''', (f'%{term}%',))
    rows = cursor.fetchall()
    print(f"Term: {term} -> {len(rows)} matches")
    for r in rows[:3]:
        print(f"  Msg ID: {r[0]} | Conv: {r[1]} | Source: {r[2]} | Type: {r[3]} | Len: {r[4]}")

conn.close()
