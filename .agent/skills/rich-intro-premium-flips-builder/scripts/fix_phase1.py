#!/usr/bin/env python3
"""
Phase 1: Mechanical fix for Rich Intro compliance.

1. Changes index={1} -> index="INTRO" ONLY for the first ModuleSectionHeader after each ModuleBanner
2. Changes gap-4 -> gap-6 in FlipCard grid contexts (grid-cols-3 gap-4)

Usage:
  python fix_phase1.py src/components/aulas/        # dry-run (default)
  python fix_phase1.py src/components/aulas/ --apply # apply changes
"""

import sys
import re
from pathlib import Path

DRY_RUN = "--apply" not in sys.argv

def fix_intro_index(content: str) -> tuple[str, int]:
    """Replace index={1} with index='INTRO' only for the first MSH after each ModuleBanner."""
    lines = content.split("\n")
    fixes = 0

    i = 0
    while i < len(lines):
        # Find ModuleBanner
        if "ModuleBanner" in lines[i]:
            # Now find the FIRST ModuleSectionHeader after this banner
            for j in range(i + 1, min(i + 40, len(lines))):
                if "ModuleSectionHeader" in lines[j]:
                    # Check within this line and the next few lines for index={1}
                    for k in range(j, min(j + 4, len(lines))):
                        if "index={1}" in lines[k]:
                            lines[k] = lines[k].replace("index={1}", 'index="INTRO"')
                            fixes += 1
                            break
                    break  # Only fix the FIRST header after banner
            i = j + 1 if 'j' in dir() else i + 1
        else:
            i += 1

    return "\n".join(lines), fixes


def fix_gap4(content: str) -> tuple[str, int]:
    """Replace gap-4 with gap-6 in FlipCard grid contexts."""
    # Only match grid-cols-3 gap-4 patterns (FlipCard grids)
    new_content, count = re.subn(
        r'(grid-cols-1\s+md:grid-cols-3\s+)gap-4',
        r'\1gap-6',
        content
    )
    return new_content, count


def process_file(filepath: Path) -> dict:
    """Process a single file."""
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    content = original
    intro_fixes = 0
    gap_fixes = 0

    content, intro_fixes = fix_intro_index(content)
    content, gap_fixes = fix_gap4(content)

    changed = content != original
    total = intro_fixes + gap_fixes

    if changed and not DRY_RUN:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

    return {
        "file": filepath.name,
        "intro_fixes": intro_fixes,
        "gap_fixes": gap_fixes,
        "total": total,
        "changed": changed,
    }


def main():
    if len(sys.argv) < 2:
        print("Usage: python fix_phase1.py <path> [--apply]")
        sys.exit(1)

    target = Path(sys.argv[1])
    files = sorted(target.rglob("Aula*.tsx")) if target.is_dir() else [target]

    if not files:
        print(f"No Aula*.tsx files found in {target}")
        sys.exit(0)

    mode = "DRY-RUN" if DRY_RUN else "APPLYING"
    print(f"\n=== Phase 1: Mechanical Fixes ({mode}) ===\n")

    total_intro = 0
    total_gap = 0
    changed_files = 0

    for f in files:
        result = process_file(f)
        total_intro += result["intro_fixes"]
        total_gap += result["gap_fixes"]

        if result["changed"]:
            changed_files += 1
            print(f"  [FIX] {result['file']}: {result['intro_fixes']} INTRO + {result['gap_fixes']} gap fixes")
        # Skip printing files with no changes

    print(f"\n{'-' * 50}")
    print(f"  Files scanned:  {len(files)}")
    print(f"  Files changed:  {changed_files}")
    print(f"  INTRO fixes:    {total_intro}")
    print(f"  gap-4 fixes:    {total_gap}")
    print(f"  Total fixes:    {total_intro + total_gap}")

    if DRY_RUN and (total_intro + total_gap) > 0:
        print(f"\n  ** DRY-RUN mode. Run with --apply to save changes. **\n")
    elif not DRY_RUN:
        print(f"\n  [OK] All changes applied.\n")
    else:
        print(f"\n  [OK] No changes needed.\n")


if __name__ == "__main__":
    main()
