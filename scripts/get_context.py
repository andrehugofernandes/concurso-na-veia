import sqlite3
import argparse
import os

def search_context(query_string):
    workspace_dir = r"c:\Workspace\petrobras-quest"
    db_path = os.path.join(workspace_dir, "backups", "conversas_history.db")
    
    if not os.path.exists(db_path):
        print(f"Banco de dados não encontrado: {db_path}")
        print("Rode o script 'scripts/sync_conversations.py' primeiro para criar a base.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # We will search using a basic LIKE query
    search_term = f"%{query_string}%"
    
    cursor.execute('''
        SELECT m.conversation_id, m.source, m.type, m.content
        FROM messages m
        WHERE m.content LIKE ?
        ORDER BY m.id ASC
    ''', (search_term,))
    
    results = cursor.fetchall()
    conn.close()
    
    if not results:
        print(f"\n--- Nenhuma menção encontrada para '{query_string}' no histórico. ---")
        return

    print(f"\n--- Resultados encontrados para '{query_string}' ({len(results)} ocorrências) ---\n")
    
    # Group results by conversation to make it easier to read
    grouped = {}
    for r in results:
        conv_id = r[0]
        if conv_id not in grouped:
            grouped[conv_id] = []
        grouped[conv_id].append((r[1], r[2], r[3]))
        
    for conv_id, msgs in grouped.items():
        print(f"==================================================")
        print(f"ID da Conversa: {conv_id}")
        print(f"==================================================")
        for idx, (source, msg_type, content) in enumerate(msgs):
            if idx > 5:
                print("... [Muitos resultados omitidos]")
                break
            # Truncate content if too long
            short_content = content[:500] + "..." if len(content) > 500 else content
            print(f"[{source} - {msg_type}]: {short_content}\n")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Buscar contexto em conversas antigas do Agente.")
    parser.add_argument('--query', type=str, required=True, help="Termo de busca.")
    args = parser.parse_args()
    
    search_context(args.query)
