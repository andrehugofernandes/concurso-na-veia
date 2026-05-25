import sys

filepath = r'c:\Workspace\petrobras-quest\src\components\aulas\shared.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Check current state
if 'LuInfo' in content:
    print('LuInfo already in file')
else:
    print('LuInfo NOT found - adding back')

# Find the extras block and add LuInfo before LuBookMarked
OLD = '  LuCircleX,\n  LuBookMarked,\n} from "react-icons/lu";'
NEW = '  LuCircleX,\n  LuInfo,\n  LuBookMarked,\n} from "react-icons/lu";'

if OLD in content:
    content = content.replace(OLD, NEW, 1)
    print('Added LuInfo before LuBookMarked (unix newlines)')
else:
    # Try with Windows line endings
    OLD_WIN = '  LuCircleX,\r\n  LuBookMarked,\r\n} from "react-icons/lu";'
    NEW_WIN = '  LuCircleX,\r\n  LuInfo,\r\n  LuBookMarked,\r\n} from "react-icons/lu";'
    if OLD_WIN in content:
        content = content.replace(OLD_WIN, NEW_WIN, 1)
        print('Added LuInfo before LuBookMarked (windows newlines)')
    else:
        # Try mixed CRLF
        OLD_MIX = '  LuCircleX,\r\r\n  LuBookMarked,\r\r\n} from "react-icons/lu";'
        NEW_MIX = '  LuCircleX,\r\r\n  LuInfo,\r\r\n  LuBookMarked,\r\r\n} from "react-icons/lu";'
        if OLD_MIX in content:
            content = content.replace(OLD_MIX, NEW_MIX, 1)
            print('Added LuInfo before LuBookMarked (mixed CRLF)')
        else:
            # Fallback: search for LuBookMarked and insert before
            idx = content.rfind('  LuBookMarked,')
            if idx >= 0:
                content = content[:idx] + '  LuInfo,\n' + content[idx:]
                print('Added LuInfo via index insertion before LuBookMarked')
            else:
                print('ERROR: Could not find insertion point!')
                sys.exit(1)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('shared.tsx saved!')

# Verify
with open(filepath, 'r', encoding='utf-8') as f:
    verify = f.read()

if 'LuInfo' in verify:
    print('VERIFIED: LuInfo is now in the file')
else:
    print('ERROR: LuInfo still missing!')
