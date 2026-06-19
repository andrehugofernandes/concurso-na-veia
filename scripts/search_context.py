import sqlite3
import argparse

def search_context(query, limit=5):
    db_path = r"c:\Workspace\petrobras-quest\context_history.db"
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Simple case-insensitive LIKE search
        cursor.execute('''
            SELECT conversation_id, source, type, content 
            FROM messages 
            WHERE content LIKE ? 
            LIMIT ?
        ''', (f'%{query}%', limit))
        
        results = cursor.fetchall()
        conn.close()
        
        if not results:
            print(f"Nenhum resultado encontrado para: '{query}'")
            return
            
        print(f"=== Resultados da busca por '{query}' ===")
        for row in results:
            conv_id, source, msg_type, content = row
            print(f"\n[Conversa: {conv_id} | Origem: {source} | Tipo: {msg_type}]")
            # Print a snippet of the content to keep it readable
            snippet = content[:500] + "..." if len(content) > 500 else content
            print(snippet)
            print("-" * 50)
            
    except Exception as e:
        print(f"Erro ao consultar banco de dados: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Buscar no historico de contexto do Antigravity.")
    parser.add_argument("query", help="Termo de busca")
    parser.add_argument("--limit", type=int, default=5, help="Limite de resultados (padrao: 5)")
    args = parser.parse_args()
    
    search_context(args.query, args.limit)
