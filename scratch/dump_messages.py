import sqlite3

db_path = r"c:\Workspace\petrobras-quest\backups\conversas_history.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all user requests
cursor.execute('''
    SELECT conversation_id, source, type, content
    FROM messages
    WHERE source = 'USER_EXPLICIT' AND type = 'USER_INPUT'
''')
user_msgs = cursor.fetchall()
print(f"Total user requests: {len(user_msgs)}")

for idx, (conv_id, source, msg_type, content) in enumerate(user_msgs):
    print(f"\n[{idx+1}] Conv: {conv_id}")
    # Extract only the USER_REQUEST content
    import re
    m = re.search(r'<USER_REQUEST>(.*?)</USER_REQUEST>', content, re.DOTALL)
    req = m.group(1).strip() if m else content[:300]
    print(req[:500] + "..." if len(req) > 500 else req)
    print("-" * 50)

conn.close()
