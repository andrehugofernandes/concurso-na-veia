import os
import sqlite3
import json

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
            role TEXT,
            content TEXT,
            timestamp TEXT,
            FOREIGN KEY (conversation_id) REFERENCES conversations (id)
        )
    ''')
    conn.commit()
    return conn

def extract_strings_from_pb(pb_path):
    # Fallback to basic string extraction from the binary file if protobuf parsing is too complex
    strings = []
    with open(pb_path, 'rb') as f:
        data = f.read()
        
    current_str = []
    for byte in data:
        if 32 <= byte <= 126 or byte == 10: # Printable ASCII and newline
            current_str.append(chr(byte))
        else:
            if len(current_str) > 10:
                strings.append("".join(current_str))
            current_str = []
    return strings

def main():
    db_path = r"c:\Workspace\petrobras-quest\context_history.db"
    conn = init_db(db_path)
    cursor = conn.cursor()
    
    # Try local_conversations.db from the IDE first if it exists
    ide_db = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations\local_conversations.db"
    if os.path.exists(ide_db):
        try:
            ide_conn = sqlite3.connect(ide_db)
            ide_cursor = ide_conn.cursor()
            ide_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = ide_cursor.fetchall()
            print(f"Tables in ide db: {tables}")
            ide_conn.close()
        except Exception as e:
            print(f"Could not read IDE db: {e}")
            
    # Then read all .pb files
    pb_dir = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations"
    pb_files = [f for f in os.listdir(pb_dir) if f.endswith('.pb')]
    
    for pb_file in pb_files:
        conv_id = pb_file.replace('.pb', '')
        cursor.execute("INSERT OR IGNORE INTO conversations (id) VALUES (?)", (conv_id,))
        
        strings = extract_strings_from_pb(os.path.join(pb_dir, pb_file))
        # Find large chunks of text that look like prompts or responses
        for s in strings:
            if len(s) > 50: # Likely content
                cursor.execute("INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)", 
                               (conv_id, 'extracted', s))
    conn.commit()
    conn.close()
    print("Database built successfully.")

if __name__ == '__main__':
    main()
