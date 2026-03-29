"""
Módulo de proteção para scripts de refactor/manutenção.
Impede que scripts toquem em arquivos críticos de infraestrutura.
"""
import os
import subprocess

# Arquivos e diretórios que NUNCA devem ser modificados por scripts em massa
PROTECTED_PATHS = [
    "src/app/",
    "src/components/layouts/",
    "src/components/admin/",
    "src/components/posts/",
    "src/components/media/",
    "src/components/users/",
    "src/contexts/",
    "src/lib/",
    "src/middleware",
    "src/hooks/",
    "next.config",
    "tailwind.config",
    "tsconfig",
    "package.json",
    ".env",
]

# Apenas esses diretórios podem ser alvo de scripts em massa
ALLOWED_MASS_EDIT_DIRS = [
    "src/components/aulas/",
    "src/data/",
]


def is_protected(file_path: str) -> bool:
    """Retorna True se o arquivo está em um caminho protegido."""
    normalized = file_path.replace("\\", "/")
    for protected in PROTECTED_PATHS:
        if protected in normalized:
            return True
    return False


def is_allowed_for_mass_edit(file_path: str) -> bool:
    """Retorna True se o arquivo está em um diretório permitido para edição em massa."""
    normalized = file_path.replace("\\", "/")
    return any(allowed in normalized for allowed in ALLOWED_MASS_EDIT_DIRS)


def safe_write(file_path: str, content: str, dry_run: bool = False) -> bool:
    """
    Escreve no arquivo apenas se não estiver protegido.
    Com dry_run=True, apenas mostra o que faria sem modificar.
    """
    if is_protected(file_path):
        print(f"🛑 BLOQUEADO: {file_path} (arquivo protegido)")
        return False

    if not is_allowed_for_mass_edit(file_path):
        print(f"⚠️  IGNORADO: {file_path} (fora dos diretórios permitidos)")
        return False

    if dry_run:
        print(f"🔍 DRY-RUN: {file_path} seria modificado")
        return True

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ {file_path}")
    return True


def safe_read(file_path: str) -> str | None:
    """Lê um arquivo com verificação de existência."""
    if not os.path.exists(file_path):
        print(f"❌ Arquivo não encontrado: {file_path}")
        return None
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def git_stash_before(label: str = "script-backup"):
    """Cria um git stash antes de operações destrutivas."""
    try:
        result = subprocess.run(
            ["git", "stash", "push", "-m", f"auto-backup: {label}"],
            capture_output=True, text=True
        )
        if "No local changes" in result.stdout:
            print("ℹ️  Nenhuma mudança local para guardar.")
        else:
            print(f"💾 Backup criado: git stash ('{label}')")
    except Exception as e:
        print(f"⚠️  Não foi possível criar stash: {e}")
