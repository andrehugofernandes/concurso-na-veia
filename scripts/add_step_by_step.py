import os
import re
import json

PORTUGUESE_FILES = [
    r"src/components/aulas/portugues/AulaClassesPalavras.tsx",
    r"src/components/aulas/portugues/AulaCoesaoCoerencia.tsx",
    r"src/components/aulas/portugues/AulaConcordancia.tsx",
    r"src/components/aulas/portugues/AulaCrase.tsx",
    r"src/components/aulas/portugues/AulaInterpretacaoTexto.tsx",
    r"src/components/aulas/portugues/AulaOrtografia.tsx",
    r"src/components/aulas/portugues/AulaPontuacao.tsx",
    r"src/components/aulas/portugues/AulaReescritaFrases.tsx",
    r"src/components/aulas/portugues/AulaRegencia.tsx",
    r"src/components/aulas/portugues/AulaSintaxe.tsx",
    r"src/components/aulas/portugues/AulaTiposTextuais.tsx"
]

MATEMATICA_FILES = [
    r"src/components/aulas/matematica/AulaAnaliseCombinatoria.tsx",
    r"src/components/aulas/matematica/AulaConjuntos.tsx",
    r"src/components/aulas/matematica/AulaEquacoes1Grau.tsx",
    r"src/components/aulas/matematica/AulaEquacoes2Grau.tsx",
    r"src/components/aulas/matematica/AulaFuncoesAfimQuadratica.tsx",
    r"src/components/aulas/matematica/AulaFuncoesExponenciais.tsx",
    r"src/components/aulas/matematica/AulaFuncoesLogaritmicas.tsx",
    r"src/components/aulas/matematica/AulaGeometriaAnalitica.tsx",
    r"src/components/aulas/matematica/AulaGeometriaEspacial.tsx",
    r"src/components/aulas/matematica/AulaGeometriaPlana.tsx",
    r"src/components/aulas/matematica/AulaMatematicaFinanceira.tsx",
    r"src/components/aulas/matematica/AulaMatrizesDeterminantes.tsx",
    r"src/components/aulas/matematica/AulaPorcentagem.tsx",
    r"src/components/aulas/matematica/AulaProbabilidade.tsx",
    r"src/components/aulas/matematica/AulaProgressoesPa.tsx",
    r"src/components/aulas/matematica/AulaProgressoesPg.tsx",
    r"src/components/aulas/matematica/AulaRazaoProporcao.tsx",
    r"src/components/aulas/matematica/AulaSistemasLineares.tsx",
    r"src/components/aulas/matematica/AulaTrigonometria.tsx"
]

ADMINISTRACAO_FILES = [
    r"src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx",
    r"src/components/aulas/administracao/AulaGestaoQualidadeSuprimento.tsx",
    r"src/components/aulas/administracao/AulaLogisticaSuprimento.tsx",
    r"src/components/aulas/administracao/AulaComprasSuprimento.tsx",
    r"src/components/aulas/administracao/AulaAtendimentoCliente.tsx",
    r"src/components/aulas/administracao/AulaEstrategiasNegociacao.tsx",
    r"src/components/aulas/administracao/AulaGestaoContratos.tsx",
    r"src/components/aulas/administracao/AulaGestaoAlmoxarifado.tsx",
    r"src/components/aulas/administracao/AulaLei13303.tsx",
    r"src/components/aulas/administracao/AulaRLCP.tsx",
    r"src/components/aulas/administracao/AulaAdministrativoTributario.tsx",
    r"src/components/aulas/administracao/AulaContabilidadeBasica.tsx",
    r"src/components/aulas/administracao/AulaDireitoTributario.tsx",
    r"src/components/aulas/administracao/AulaAdministracaoTributaria.tsx"
]

ALL_FILES = PORTUGUESE_FILES + MATEMATICA_FILES + ADMINISTRACAO_FILES

WORKSPACE_DIR = r"c:\Workspace\petrobras-quest"

def escape_jsx_string(text):
    if not isinstance(text, str):
        return ""
    # Avoid json.dumps to prevent converting accented characters into unicode escape sequences (like \u00e1)
    escaped = text.replace('\\', '\\\\') \
                  .replace('"', '\\"') \
                  .replace('\n', '\\n') \
                  .replace('\r', '')
    return escaped

def parse_questions_from_text(text):
    questions = []
    pos = 0
    while True:
        idx = text.find('{', pos)
        if idx == -1:
            break
        # Parse matching brackets
        bracket_count = 1
        end_idx = idx + 1
        while end_idx < len(text) and bracket_count > 0:
            if text[end_idx] == '{':
                bracket_count += 1
            elif text[end_idx] == '}':
                bracket_count -= 1
            end_idx += 1
        
        block = text[idx:end_idx]
        pos = idx + 1
        
        has_pergunta = 'pergunta' in block or 'question' in block
        has_correta = 'correta' in block or 'correct' in block
        
        if has_pergunta and has_correta:
            p_match = re.search(r'(?:pergunta|question):\s*["\'`](.*?)["\'`],', block, re.DOTALL)
            if not p_match:
                p_match = re.search(r'(?:pergunta|question):\s*(.*?),', block, re.DOTALL)
            p = p_match.group(1).strip() if p_match else ""
            
            c_match = re.search(r'(?:correta|correct):\s*["\'`](.*?)["\'`],?', block)
            if not c_match:
                c_match = re.search(r'(?:correta|correct):\s*(\d+|[A-E]),?', block)
            c = c_match.group(1).strip().strip('"').strip("'") if c_match else ""
            
            e_match = re.search(r'(?:explicacao|explanation):\s*["\'`](.*?)["\'`],?', block, re.DOTALL)
            if not e_match:
                e_match = re.search(r'(?:explicacao|explanation):\s*(.*?),?\s*$', block, re.DOTALL)
            e = e_match.group(1).strip() if e_match else ""
            
            # Clean up quotes
            if e.endswith(','): e = e[:-1].strip()
            for q in ['"', "'", '`']:
                if e.startswith(q) and e.endswith(q): e = e[1:-1]
                if p.startswith(q) and p.endswith(q): p = p[1:-1]
                
            opcoes = []
            opcoes_block_match = re.search(r'(?:opcoes|options):\s*\[(.*?)\]', block, re.DOTALL)
            if opcoes_block_match:
                opcoes_text = opcoes_block_match.group(1)
                
                opt_objects = re.findall(r'\{\s*["\']?label["\']?:\s*["\'](.*?)["\'],\s*["\']?valor["\']?:\s*["\'](.*?)["\']\s*\}', opcoes_text)
                if not opt_objects:
                    opt_objects = re.findall(r'\{\s*["\']?label["\']?:\s*["\'`](.*?)["\'`],\s*["\']?valor["\']?:\s*["\'`](.*?)["\'`]\s*\}', opcoes_text, re.DOTALL)
                
                if opt_objects:
                    for label, valor in opt_objects:
                        opcoes.append({"label": label, "valor": valor})
                else:
                    string_opts = re.findall(r'["\'`](.*?)["\'`]', opcoes_text, re.DOTALL)
                    for i, opt_val in enumerate(string_opts):
                        label = chr(65 + i) # A, B, C, D, E
                        opcoes.append({"label": label, "valor": opt_val})
                        
            if c.isdigit():
                idx_val = int(c)
                if 0 <= idx_val < len(opcoes):
                    c = opcoes[idx_val]["label"]
                else:
                    c = chr(65 + idx_val)
            
            if p and c and e and opcoes:
                questions.append({
                    "pergunta": p,
                    "opcoes": opcoes,
                    "correta": c,
                    "explicacao": e
                })
    return questions

def parse_quiz_file_flexible(filepath):
    if os.path.isdir(filepath):
        return {}
    if not os.path.exists(filepath):
        if os.path.exists(filepath + ".ts"):
            filepath = filepath + ".ts"
        elif os.path.exists(filepath + ".tsx"):
            filepath = filepath + ".tsx"
        else:
            return {}
            
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    quizzes = {}
    
    for match in re.finditer(r'export\s+const\s+(\w+)\s*(?::\s*[^=]+)?\s*=\s*([\[\{])', content):
        var_name = match.group(1)
        bracket_type = match.group(2)
        start_pos = match.end()
        
        open_char = bracket_type
        close_char = ']' if open_char == '[' else '}'
        
        bracket_count = 1
        pos = start_pos
        while pos < len(content) and bracket_count > 0:
            if content[pos] == open_char:
                bracket_count += 1
            elif content[pos] == close_char:
                bracket_count -= 1
            pos += 1
        block_content = content[start_pos:pos-1]
        
        if open_char == '[':
            quizzes[var_name] = parse_questions_from_text(block_content)
        else:
            for key_match in re.finditer(r'["\']?(modulo-\d+)["\']?\s*:\s*([\[\{])', block_content):
                key_name = key_match.group(1)
                sub_bracket_type = key_match.group(2)
                sub_start = key_match.end()
                
                sub_open_char = sub_bracket_type
                sub_close_char = ']' if sub_open_char == '[' else '}'
                
                sub_bracket_count = 1
                sub_pos = sub_start
                while sub_pos < len(block_content) and sub_bracket_count > 0:
                    if block_content[sub_pos] == sub_open_char:
                        sub_bracket_count += 1
                    elif block_content[sub_pos] == sub_close_char:
                        sub_bracket_count -= 1
                    sub_pos += 1
                sub_content = block_content[sub_start:sub_pos-1]
                quizzes[f"{var_name}:{key_name}"] = parse_questions_from_text(sub_content)
                
    return quizzes

def parse_explanation(explanation, correta):
    explanation = explanation.strip()
    sentences = re.split(r'(?<=[.!?])\s+', explanation)
    
    dica = ""
    remaining_sentences = []
    for s in sentences:
        if any(w in s.lower() for w in ["dica", "macete", "cuidado", "lembre", "atenção", "cesgranrio", "banca"]):
            dica += s + " "
        else:
            remaining_sentences.append(s)
            
    if not dica and len(sentences) > 1:
        dica = sentences[-1]
        remaining_sentences = sentences[:-1]
    elif not dica:
        dica = "Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
        remaining_sentences = sentences
        
    step1 = "Identificar o contexto e as regras cobradas no enunciado."
    step2 = "Analisar as alternativas e eliminar distratores com erros óbvios."
    step3 = f"Confirmar a alternativa {correta} como a resposta correta."
    
    if len(remaining_sentences) == 1:
        step2 = remaining_sentences[0]
    elif len(remaining_sentences) == 2:
        step1 = remaining_sentences[0]
        step2 = remaining_sentences[1]
    elif len(remaining_sentences) >= 3:
        step1 = remaining_sentences[0]
        step2 = " ".join(remaining_sentences[1:-1])
        step3 = remaining_sentences[-1]
        
    return step1.strip(), step2.strip(), step3.strip(), dica.strip()

def make_alternativas_jsx(opcoes, correta):
    lines = []
    for opt in opcoes:
        is_correta = "true" if opt['label'] == correta else "false"
        texto_escaped = escape_jsx_string(opt['valor'])
        lines.append(f'              {{ letra: "{opt["label"]}", texto: "{texto_escaped}", correta: {is_correta} }}')
    return "[\n" + ",\n".join(lines) + "\n            ]"

def generate_step_by_step_jsx(m, question, variant_str):
    p1, p2, p3, dica = parse_explanation(question['explicacao'], question['correta'])
    enunciado_escaped = escape_jsx_string(question['pergunta'])
    alternativas_jsx = make_alternativas_jsx(question['opcoes'], question['correta'])
    
    p1 = escape_jsx_string(p1)
    p2 = escape_jsx_string(p2)
    p3 = escape_jsx_string(p3)
    dica = escape_jsx_string(dica)
    
    template = """        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={__INDEX__}
          titulo="Na Prática: Como a Banca Cobra"
          variant={__VARIANT__}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="__ENUNCIADO__"
          alternativas={__ALT__}
          dicaEstrategica="__DICA__"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "__P1__" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "__P2__" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "__P3__" }
          ]}
        />"""
        
    return template.replace("__INDEX__", str(m)) \
                   .replace("__VARIANT__", variant_str) \
                   .replace("__ENUNCIADO__", enunciado_escaped) \
                   .replace("__ALT__", alternativas_jsx) \
                   .replace("__DICA__", dica) \
                   .replace("__P1__", p1) \
                   .replace("__P2__", p2) \
                   .replace("__P3__", p3)

def replace_completed_modules_state(content):
    match = re.search(r'const\s+\[completedModules,\s*setCompletedModules\]\s*=\s*useState', content)
    if not match:
        return content
        
    start_pos = match.start()
    
    pos = match.end()
    while pos < len(content) and content[pos] != '(':
        pos += 1
        
    if pos >= len(content):
        return content
        
    bracket_count = 1
    pos += 1
    while pos < len(content) and bracket_count > 0:
        if content[pos] == '(':
            bracket_count += 1
        elif content[pos] == ')':
            bracket_count -= 1
        pos += 1
        
    end_pos = pos
    while end_pos < len(content) and content[end_pos] in [' ', '\t', '\n', '\r', ';']:
        if content[end_pos] == ';':
            end_pos += 1
            break
        end_pos += 1
        
    original_statement = content[start_pos:end_pos]
    
    hook_state_code = """const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);"""
  
    return content.replace(original_statement, hook_state_code)

def remove_completed_modules_effect(content):
    pos = 0
    while True:
        match = content.find('useEffect', pos)
        if match == -1:
            break
            
        start_pos = match
        pos_in = start_pos + len('useEffect')
        while pos_in < len(content) and content[pos_in] != '(':
            pos_in += 1
            
        if pos_in >= len(content):
            pos = match + 1
            continue
            
        bracket_count = 1
        pos_in += 1
        while pos_in < len(content) and bracket_count > 0:
            if content[pos_in] == '(':
                bracket_count += 1
            elif content[pos_in] == ')':
                bracket_count -= 1
            pos_in += 1
            
        end_pos = pos_in
        while end_pos < len(content) and content[end_pos] in [' ', '\t', '\n', '\r', ';']:
            if content[end_pos] == ';':
                end_pos += 1
                break
            end_pos += 1
            
        effect_block = content[start_pos:end_pos]
        
        if 'completed_modules' in effect_block and 'completedModules' in effect_block:
            content = content.replace(effect_block, '')
            pos = start_pos
            continue
            
        pos = match + 1
        
    return content

def process_file(relative_path):
    fullpath = os.path.join(WORKSPACE_DIR, relative_path)
    if not os.path.exists(fullpath):
        print(f"File not found: {relative_path}")
        return False
        
    with open(fullpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    print(f"\nProcessing {relative_path}...")
    
    # Find subject
    subject = "portugues"
    if "matematica" in relative_path.lower():
        subject = "matematica"
    elif "administracao" in relative_path.lower():
        subject = "administracao"
        
    # Get quiz imports
    quiz_imports = re.findall(r'import\s+\{([^}]+)\}\s+from\s+["\']([^"\']+)["\']', content)
    
    all_quizzes = {}
    for imp_vars, imp_path in quiz_imports:
        if "quiz" in imp_path.lower() or "quiz" in imp_vars.lower():
            resolved_path = ""
            if imp_path.startswith("./"):
                resolved_path = os.path.join(os.path.dirname(fullpath), imp_path)
            elif imp_path.startswith("@/"):
                resolved_path = os.path.join(WORKSPACE_DIR, "src", imp_path[2:])
            else:
                resolved_path = os.path.join(WORKSPACE_DIR, "src", imp_path)
                
            quizzes_in_file = parse_quiz_file_flexible(resolved_path)
            all_quizzes.update(quizzes_in_file)
            
    inline_quizzes = parse_questions_from_text(content)
    if inline_quizzes:
        all_quizzes["INLINE"] = inline_quizzes
        
    module_questions = {}
    for m in range(1, 12):
        found = False
        for var in all_quizzes.keys():
            m_str = f"M{m}_"
            if m_str in var or f"M0{m}_" in var:
                module_questions[m] = all_quizzes[var]
                found = True
                break
                
            sub_key = f"modulo-{m}"
            if var.endswith(":" + sub_key):
                module_questions[m] = all_quizzes[var]
                found = True
                break
                
    # 1. Add import of useAulaProgress
    if "import { useAulaProgress }" not in content:
        content = re.sub(r'("use client";?\n)', r'\1import { useAulaProgress } from "@/hooks/useAulaProgress";\n', content)
        
    # 2. Add QuestaoResolvidaStepByStep to shared imports if not present
    shared_import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+["\'](?:\.\./shared|@/components/aulas/shared)["\']', content)
    if shared_import_match:
        shared_vars = shared_import_match.group(1)
        if "QuestaoResolvidaStepByStep" not in shared_vars:
            stripped_vars = shared_vars.rstrip()
            if stripped_vars.endswith(','):
                new_shared_vars = stripped_vars + "\n  QuestaoResolvidaStepByStep"
            else:
                new_shared_vars = stripped_vars + ",\n  QuestaoResolvidaStepByStep"
            content = content.replace(shared_vars, new_shared_vars)
            
    # 3. Replace useState completedModules definition
    content = replace_completed_modules_state(content)
        
    # Remove localStorage useEffects for completedModules
    content = remove_completed_modules_effect(content)
    
    # Replace setCompletedModules callbacks inside handleModuleComplete (multiline regex replacement)
    pattern_callback = r'setCompletedModules\(\s*(?:\(prev\)|\(?prev\)?)\s*=>\s*\{\s*const\s+n\s*=\s*new\s+Set\(prev\);\s*n\.add\(moduleId\);\s*return\s+n;\s*\}\s*\);?'
    replacement_callback = r'''const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));'''
    content = re.sub(pattern_callback, replacement_callback, content)
    
    # Replace any other setCompletedModules calls (including clean setCompletedModules(s) in useEffects)
    content = re.sub(r'setCompletedModules\(\s*([^)]+)\s*\);', r'updateCompletedModules(Array.from(\1));', content)
    
    # 4. Inject QuestaoResolvidaStepByStep before ModuleConsolidation
    pos = 0
    modifications = []
    
    for mc_match in re.finditer(r'<ModuleConsolidation', content):
        mc_start = mc_match.start()
        mc_end = content.find('/>', mc_start) + 2
        mc_block = content[mc_start:mc_end]
        
        idx_match = re.search(r'index=\{\s*(\d+)\s*\}', mc_block)
        if not idx_match:
            idx_match = re.search(r'moduloNumero=\{\s*(\d+)\s*\}', mc_block)
        if not idx_match:
            idx_match = re.search(r'index=\{\s*mIdx\s*\+\s*1\s*\}', mc_block)
            if idx_match:
                continue
                
        if not idx_match:
            print("  Could not resolve index for ModuleConsolidation block")
            continue
            
        m_idx = int(idx_match.group(1))
        
        preceding_text = content[max(0, mc_start - 300):mc_start]
        if "QuestaoResolvidaStepByStep" in preceding_text:
            print(f"  Module {m_idx} already has QuestaoResolvidaStepByStep")
            continue
            
        questions = module_questions.get(m_idx)
        if not questions:
            search_area = content[mc_end:min(len(content), mc_end + 3000)]
            quiz_match = re.search(r'<QuizInterativo\s+questoes=\{\s*([^}]+)\s*\}', search_area)
            if quiz_match:
                quiz_var_name = quiz_match.group(1).strip()
                if quiz_var_name in all_quizzes:
                    questions = all_quizzes[quiz_var_name]
                else:
                    for k, val in all_quizzes.items():
                        if k.endswith(":" + quiz_var_name):
                            questions = val
                            break
                            
        if not questions:
            print(f"  Warning: No quiz questions found for module {m_idx}")
            continue
            
        first_q = questions[0]
        
        variant_match = re.search(r'variant=\{\s*(\w+(?:\[\d+\])?)\s*\}', mc_block)
        if not variant_match:
            variant_match = re.search(r'variant=["\'](\w+)["\']', mc_block)
        variant_str = variant_match.group(1) if variant_match else "mv[1]"
        if not variant_str.startswith("mv") and not variant_str.startswith("get") and not variant_str.startswith("'") and not variant_str.startswith('"'):
            variant_str = f'"{variant_str}"'
            
        step_jsx = generate_step_by_step_jsx(m_idx, first_q, variant_str)
        modifications.append((mc_start, step_jsx + "\n\n        "))
        print(f"  Scheduled injection for module {m_idx}")
        
    modifications.sort(key=lambda x: x[0], reverse=True)
    new_content = content
    for offset, jsx in modifications:
        new_content = new_content[:offset] + jsx + new_content[offset:]
        
    # 5. Inject canComplete in AulaTemplate if not present
    if "<AulaTemplate" in new_content and "canComplete" not in new_content:
        new_content = new_content.replace(
            '<AulaTemplate',
            '<AulaTemplate\n      canComplete={completedModules.size >= MODULE_DEFS.length}\n      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."'
        )
        print("  Injected canComplete safety lock in AulaTemplate")
            
    if new_content != content:
        backup_path = fullpath + ".bak"
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        with open(fullpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  Successfully updated {relative_path} (backup saved)")
        return True
    else:
        print(f"  No changes needed for {relative_path}")
        return False

if __name__ == "__main__":
    success_count = 0
    for file in ALL_FILES:
        try:
            if process_file(file):
                success_count += 1
        except Exception as e:
            print(f"  Error processing {file}: {e}")
            import traceback
            traceback.print_exc()
            
    print(f"\nDone! Successfully updated {success_count} files.")
