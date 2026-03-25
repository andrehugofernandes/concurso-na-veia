# 🚀 MVP Dashboard - Técnico de Suprimento de Bens e Serviços (Administração)

**Status:** ✅ **ATIVO E FUNCIONAL**
**Data de Ativação:** 2026-03-25
**Usuário Teste:** andrehugofernandes
**Cargo:** suprimento-adm (Nível Técnico)

---

## 📊 Visão Geral do MVP

O MVP consiste em uma dashboard personalizada que exibe os **3 blocos de conhecimentos específicos** para o cargo **Técnico de Suprimento de Bens e Serviços - Administração**, conforme edital Petrobras 2026.

### ✨ Características

- ✅ Dashboard dinâmica baseada no cargo do usuário
- ✅ Exibição de 3 blocos com tópicos específicos
- ✅ Integração completa com sistema de progresso
- ✅ Visualização de aulas por bloco
- ✅ Suporte a diferentes cargos (Administrador, Engenharias, Técnicos, etc.)

---

## 📍 Localização da Dashboard

**URL Principal:**
```
http://localhost:3000/aulas
```

**Arquivo:**
```
src/app/(dashboard)/aulas/page.tsx
```

---

## 📚 Blocos do Cargo suprimento-adm

### Bloco I - Administração
**4 Tópicos:**
1. Administração geral
2. Gestão de qualidade
3. Logística
4. Compras

**Status:** 🔄 Em desenvolvimento (estrutura em profissoes-edital.ts)

---

### Bloco II - Legislação ✅ ULTIMATE
**2 Aulas Completas:**

| Aula | Status | Módulos | Linhas | Rich Intro |
|------|--------|---------|--------|-----------|
| [Lei 13.303](src/components/aulas/administracao/AulaLei13303.tsx) | ✅ COMPLETA | 10 | 2.223 | ✅ 5/módulo |
| [RLCP](src/components/aulas/administracao/AulaRLCP.tsx) | ✅ COMPLETA | 10 | 1.626 | ✅ 5/módulo |

**Tópicos:**
- Lei 13.303 (Art. 28-91) - Estatuto das Estatais
- Regulamento de Licitações Petrobras (RLCP)

---

### Bloco III - Tributos ⏳ UPGRADE PENDENTE
**3 Aulas (Estrutura Premium → ULTIMATE):**

| Aula | Status | Módulos | Linhas | Rich Intro |
|------|--------|---------|--------|-----------|
| [Contabilidade Básica](src/components/aulas/administracao/AulaContabilidadeBasica.tsx) | ❌ SEM INTRO | 10 | 732 | ❌ 0 |
| [Direito Tributário](src/components/aulas/administracao/AulaDireitoTributario.tsx) | ❌ SEM INTRO | 10 | 732 | ❌ 0 |
| [Administração Tributária](src/components/aulas/administracao/AulaAdministracaoTributaria.tsx) | ❌ SEM INTRO | 10 | 732 | ❌ 0 |

**Tópicos:**
- Contabilidade básica
- Direito tributário
- Administração tributária

**Próxima Ação:** Rodar workflow `/aula-ultimate` para upgrade ULTIMATE

---

## 🔧 Arquitetura Técnica

### Fluxo de Dados

```
Usuário (andrehugofernandes)
    ↓
getProgramaDeEstudos('suprimento-adm')
    ↓
profissoes-edital.ts (PROFISSOES[suprimento-adm].blocos)
    ↓
Gera 3 MateriaConteudo dinamicamente
    ↓
/aulas/page.tsx (renderiza grid de blocos)
    ↓
Link para /aulas/[materia-id]
    ↓
Exibe tópicos e aulas do bloco
```

### Arquivos Críticos

| Arquivo | Função |
|---------|--------|
| `src/data/programa-estudos.ts` | Gera blocos dinamicamente |
| `src/lib/profissoes-edital.ts` | Define profissões e blocos |
| `src/lib/cargos-map.ts` | Mapeia cargo → profissão |
| `src/app/(dashboard)/aulas/page.tsx` | Dashboard visual |
| `src/app/(dashboard)/aulas/[materia]/page.tsx` | Página do bloco |

---

## 🎯 Fluxo do Usuário (MVP)

### 1. Login
```bash
Email: andrehugofernandes@gmail.com
Username: andrehugofernandes
Cargo: suprimento-adm
```

### 2. Acessar Dashboard de Aulas
```
Dashboard → Botão "Aulas" → http://localhost:3000/aulas
```

### 3. Ver os 3 Blocos
```
┌─────────────────────────────────────┐
│  BLOCO I - ADMINISTRAÇÃO            │
│  4 Tópicos                          │
│  (Em desenvolvimento)               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  BLOCO II - LEGISLAÇÃO ✅           │
│  2 Aulas: Lei 13.303, RLCP          │
│  Status: ULTIMATE (Completo)        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  BLOCO III - TRIBUTOS ⏳            │
│  3 Aulas: Contabilidade, etc.       │
│  Status: Aguardando Upgrade ULTIMATE│
└─────────────────────────────────────┘
```

### 4. Clicar em um Bloco
→ Acessar `/aulas/[bloco-id]`
→ Ver lista de tópicos
→ Clicar em tópico → Acessar aula

### 5. Estudar a Aula
→ Módulo interativo
→ Quiz para validar aprendizado
→ Marcar como concluído
→ Desbloquear próximo módulo

---

## 📈 Status de Conclusão

### MVP Atual
- [x] Dashboard funcional
- [x] Blocos gerados dinamicamente
- [x] Usuário testador configurado
- [x] Bloco II (Legislação) ULTIMATE ✅
- [ ] Bloco I (Administração) aulas implementadas
- [ ] Bloco III (Tributos) aulas em ULTIMATE

### Próximas Fases

**Fase 2 - Upgrade ULTIMATE Bloco III**
```bash
# Rodar workflow para cada aula
/aula-ultimate upgrade AulaContabilidadeBasica.tsx
/aula-ultimate upgrade AulaDireitoTributario.tsx
/aula-ultimate upgrade AulaAdministracaoTributaria.tsx
```

**Fase 3 - Implementar Bloco I (Administração)**
- [ ] AulaAdministracaoGeral (10 módulos)
- [ ] AulaGestaoQualidade (10 módulos)
- [ ] AulaLogistica (10 módulos)
- [ ] AulaCompras (10 módulos)

---

## 🔍 Como Testar

### Acesso Direto
```
1. Abrir: http://localhost:3000/aulas
2. Fazer login com andrehugofernandes / sua-senha
3. Visualizar 3 blocos
4. Clicar em "BLOCO II - LEGISLAÇÃO"
5. Selecionar aula (Lei 13.303 ou RLCP)
6. Estudar módulos
```

### Verificar Cargo Configurado
```bash
# Execute o script de debug
node scripts/debug-user.js
```

### Atualizar Cargo (Se Necessário)
```bash
# Se mudar para outro usuário
node upgrade-cargo-profiles.js
```

---

## 🐛 Troubleshooting

### Problema: Blocos não aparecem
**Solução:**
1. Verificar se `user.cargo === 'suprimento-adm'`
2. Verificar localStorage/sessão
3. Fazer logout e login novamente
4. Limpar cache do navegador

### Problema: Aula não carrega
**Solução:**
1. Verificar se arquivo existe em `src/components/aulas/administracao/`
2. Verificar imports no arquivo
3. Rodar `pnpm dev` para rebuild
4. Abrir console (F12) para ver erros

### Problema: Quiz não valida
**Solução:**
1. Verificar arquivo de quizzes em `src/data/quizzes/`
2. Validar estrutura de questões
3. Verificar score minimum (70%)

---

## 📞 Contato & Suporte

**Responsável:** Equipe de Desenvolvimento Petrobras Quest
**Projeto:** MVP Dashboard Suprimento-ADM
**Data de Ativação:** 2026-03-25
**Versão:** 1.0.0 (MVP)

---

## ✅ Checklist de Ativação

- [x] Usuário criado e configurado
- [x] Cargo atualizado: `administracao` → `suprimento-adm`
- [x] Dashboard testada e funcional
- [x] Bloco II (Legislação) 100% operacional
- [x] Documentação MVP pronta
- [ ] Bloco I (Administração) aulas prontas
- [ ] Bloco III (Tributos) aulas em ULTIMATE
- [ ] Teste completo com todos os blocos

---

**Status Final:** 🟢 **MVP ATIVO**

