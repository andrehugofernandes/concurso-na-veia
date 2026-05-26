#!/usr/bin/env python3
"""
Audit educational modules for Rich Intro & Premium FlipCard compliance.

Usage:
  python .agent/skills/rich-intro-premium-flips-builder/scripts/audit_modules.py src/components/aulas/

Detects:
  - bg-primary/10 (generic FlipCard color)
  - text-3xl emoji containers
  - "Ponto de Atenção" generic subtitles
  - index={1} where INTRO expected (first ModuleSectionHeader after ModuleBanner)
  - Intro sections with < 5 <p> tags
"""

import sys
import os
import re
from pathlib import Path

RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
RESET = "\033[0m"
BOLD = "\033[1m"

ANTI_PATTERNS = [
    {
        "id": "GENERIC_COLOR",
        "pattern": r'bg-primary/10',
        "severity": "ERROR",
        "message": "FlipCard using generic bg-primary/10 instead of themed color (e.g., bg-teal-500/10)",
    },
    {
        "id": "EMOJI_ICON",
        "pattern": r'text-3xl">\s*[^\s<]',
        "severity": "ERROR",
        "message": "FlipCard using emoji instead of Lucide icon",
    },
    {
        "id": "GENERIC_SUBTITLE",
        "pattern": r'Ponto de Aten[çc][ãa]o',
        "severity": "ERROR",
        "message": 'Generic subtitle "Ponto de Atenção" — use descriptive subtitle',
    },
    {
        "id": "GAP_4_GRID",
        "pattern": r'grid-cols-1 md:grid-cols-3 gap-4',
        "severity": "WARNING",
        "message": "FlipCard grid using gap-4 instead of gap-6",
    },
    {
        "id": "OLD_VERSO_STYLE",
        "pattern": r'space-y-3 text-lg',
        "severity": "WARNING",
        "message": "FlipCard verso using old layout (space-y-3 text-lg) — should be space-y-4 p-4 flex",
    },
]


def find_intro_issues(content: str, filepath: str) -> list:
    """Check for index={1} where INTRO is expected and short intros."""
    issues = []
    lines = content.split("\n")

    # Find all TabsContent blocks
    module_starts = []
    for i, line in enumerate(lines):
        if 'TabsContent value="modulo-' in line:
            module_starts.append(i)

    for start_idx in module_starts:
        # Find the first ModuleSectionHeader after ModuleBanner
        banner_found = False
        for j in range(start_idx, min(start_idx + 40, len(lines))):
            if "ModuleBanner" in lines[j]:
                banner_found = True
            if banner_found and "ModuleSectionHeader" in lines[j]:
                # Check if it uses index="INTRO" or index={1}
                header_block = " ".join(lines[j:j+4])
                if 'index={1}' in header_block or "index={1}" in header_block:
                    if 'index="INTRO"' not in header_block:
                        issues.append({
                            "line": j + 1,
                            "severity": "ERROR",
                            "id": "MISSING_INTRO_INDEX",
                            "message": f'First section uses index={{1}} instead of index="INTRO"',
                        })

                # Count <p> tags in the intro section (next ~50 lines)
                p_count = 0
                for k in range(j, min(j + 60, len(lines))):
                    if "</section>" in lines[k]:
                        break
                    if "<p>" in lines[k] or "<p " in lines[k]:
                        p_count += 1

                if p_count < 5 and p_count > 0:
                    issues.append({
                        "line": j + 1,
                        "severity": "WARNING",
                        "id": "SHORT_INTRO",
                        "message": f"Intro has only {p_count}/5 paragraphs (C.E.D.E.A requires 5)",
                    })
                break

    return issues


def audit_file(filepath: str) -> dict:
    """Audit a single file for compliance."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    issues = []
    lines = content.split("\n")

    # Check anti-patterns
    for ap in ANTI_PATTERNS:
        for i, line in enumerate(lines):
            if re.search(ap["pattern"], line):
                issues.append({
                    "line": i + 1,
                    "severity": ap["severity"],
                    "id": ap["id"],
                    "message": ap["message"],
                })

    # Check intro structure
    issues.extend(find_intro_issues(content, filepath))

    return {
        "file": filepath,
        "issues": issues,
        "errors": len([i for i in issues if i["severity"] == "ERROR"]),
        "warnings": len([i for i in issues if i["severity"] == "WARNING"]),
    }


def main():
    if len(sys.argv) < 2:
        print(f"{RED}Usage: python audit_modules.py <path>{RESET}")
        sys.exit(1)

    target = Path(sys.argv[1])
    files = []

    if target.is_file():
        files = [target]
    elif target.is_dir():
        files = sorted(target.rglob("Aula*.tsx"))
    else:
        print(f"{RED}Path not found: {target}{RESET}")
        sys.exit(1)

    if not files:
        print(f"{YELLOW}No Aula*.tsx files found in {target}{RESET}")
        sys.exit(0)

    total_errors = 0
    total_warnings = 0
    results = []

    print(f"\n{BOLD}{CYAN}=== Rich Intro & Premium FlipCards Audit ==={RESET}\n")

    for f in files:
        result = audit_file(str(f))
        results.append(result)
        total_errors += result["errors"]
        total_warnings += result["warnings"]

        if result["issues"]:
            status = f"{RED}X FAIL{RESET}" if result["errors"] > 0 else f"{YELLOW}! WARN{RESET}"
            print(f"  {status}  {f.name} ({result['errors']}E / {result['warnings']}W)")
            for issue in result["issues"]:
                color = RED if issue["severity"] == "ERROR" else YELLOW
                print(f"        {color}L{issue['line']:>4}{RESET} [{issue['id']}] {issue['message']}")
        else:
            print(f"  {GREEN}* PASS{RESET}  {f.name}")

    print(f"\n{BOLD}{'-' * 50}{RESET}")
    print(f"  Files scanned: {len(files)}")
    print(f"  {RED}Errors:   {total_errors}{RESET}")
    print(f"  {YELLOW}Warnings: {total_warnings}{RESET}")

    compliant = len([r for r in results if not r["issues"]])
    print(f"  {GREEN}Compliant: {compliant}/{len(files)}{RESET}")

    if total_errors > 0:
        print(f"\n  {RED}{BOLD}[FAIL] AUDIT FAILED - {total_errors} error(s) must be fixed{RESET}\n")
        sys.exit(1)
    elif total_warnings > 0:
        print(f"\n  {YELLOW}{BOLD}[WARN] AUDIT PASSED WITH WARNINGS{RESET}\n")
    else:
        print(f"\n  {GREEN}{BOLD}[OK] ALL MODULES COMPLIANT{RESET}\n")


if __name__ == "__main__":
    main()
