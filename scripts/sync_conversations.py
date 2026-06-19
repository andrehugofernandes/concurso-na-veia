import os
import json
import sqlite3

def init_db(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            created_at TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversation_id TEXT,
            source TEXT,
            type TEXT,
            content TEXT,
            timestamp TEXT,
            FOREIGN KEY (conversation_id) REFERENCES conversations (id)
        )
    ''')
    conn.commit()
    return conn

def main():
    brain_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\brain"
    
    # Path inside the workspace
    workspace_dir = r"c:\Workspace\petrobras-quest"
    backups_dir = os.path.join(workspace_dir, "backups")
    os.makedirs(backups_dir, exist_ok=True)
    db_path = os.path.join(backups_dir, "conversas_history.db")
    
    if not os.path.exists(brain_dir):
        print(f"Diretório de conversas não encontrado: {brain_dir}")
        return
        
    conn = init_db(db_path)
    cursor = conn.cursor()
    
    count_convs = 0
    count_msgs = 0
    
    print(f"Buscando transcripts em {brain_dir}...")
    
    # Iterate through conversation folders
    for conv_id in os.listdir(brain_dir):
        conv_dir = os.path.join(brain_dir, conv_id)
        if not os.path.isdir(conv_dir):
            continue
            
        transcript_path = os.path.join(conv_dir, ".system_generated", "logs", "transcript.jsonl")
        
        if os.path.exists(transcript_path):
            # Check if conversation already parsed to avoid duplicate inserts
            cursor.execute("SELECT id FROM conversations WHERE id = ?", (conv_id,))
            if cursor.fetchone():
                continue
                
            count_convs += 1
            cursor.execute("INSERT OR IGNORE INTO conversations (id) VALUES (?)", (conv_id,))
            
            with open(transcript_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if not line.strip():
                        continue
                    try:
                        data = json.loads(line)
                        source = data.get('source', '')
                        msg_type = data.get('type', '')
                        content = data.get('content', '')
                        timestamp = data.get('created_at', '')
                        
                        # Save meaningful content
                        if content and isinstance(content, str):
                            cursor.execute('''
                                INSERT INTO messages (conversation_id, source, type, content, timestamp) 
                                VALUES (?, ?, ?, ?, ?)
                            ''', (conv_id, source, msg_type, content, timestamp))
                            count_msgs += 1
                    except Exception as e:
                        print(f"Erro ao parsear linha no conv {conv_id}: {e}")
                        
    conn.commit()
    conn.close()
    print(f"Banco de dados consolidado em {db_path}!")
    print(f"{count_convs} novas conversas processadas, {count_msgs} mensagens extraídas com sucesso.")

if __name__ == '__main__':
    main()
