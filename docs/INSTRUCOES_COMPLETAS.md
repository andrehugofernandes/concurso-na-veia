# 🚀 PETROBRAS QUEST AI - INSTRUÇÕES COMPLETAS

## ✅ O QUE VOCÊ TEM AGORA:

1. **App Web Standalone (HTML)** - Funciona direto no navegador
2. **App Next.js 15** - Para hospedar profissionalmente (RECOMENDADO)
3. **Documentação completa** de deploy e manutenção

---

## 📦 ARQUIVOS INCLUÍDOS:

### 1. Apps HTML (Funcionam Offline):
- `app_petrobras_quest.html` - Versão com questões fixas
- `app_petrobras_quest_ai.html` - Versão com IA (precisa de API)

### 2. Projeto Next.js (Para Deploy Profissional):
- Pasta `petrobras-quest-next/` - Projeto completo
- `README.md` - Documentação técnica
- `DEPLOY_RAPIDO.md` - Guia de deploy em 10 minutos

### 3. Documentação de Estudos:
- `plano_estudo_petrobras.md` - Plano completo de estudos

---

## 🎯 QUAL VERSÃO USAR?

### Opção A: HTML Simples (TESTE RÁPIDO)
**Quando usar:**
- ✅ Quer testar AGORA sem complicação
- ✅ Não precisa de muitas questões
- ✅ Vai usar offline

**Como usar:**
1. Abra `app_petrobras_quest.html` no navegador
2. Pronto! 20 questões disponíveis

---

### Opção B: Next.js + Vercel (RECOMENDADO) ⭐
**Quando usar:**
- ✅ Quer questões ILIMITADAS geradas por IA
- ✅ Quer app profissional online 24/7
- ✅ Quer fazer manutenção e adicionar funcionalidades
- ✅ Quer compartilhar com amigos

**Como usar:**
1. Siga o `DEPLOY_RAPIDO.md`
2. Em 10 minutos estará no ar!
3. Você conhece Next.js, será fácil! 🚀

---

## 🚀 DEPLOY NA VERCEL - PASSO A PASSO

### ANTES DE COMEÇAR:

Você vai precisar de:
1. Conta no GitHub (gratuita)
2. Conta na Vercel (gratuita)
3. Conta na Anthropic (gratuita - $5 de crédito)

Total de custo: **R$ 0,00** ✅

---

### PASSO 1: Preparar Projeto

```bash
# Extraia a pasta petrobras-quest-next
cd petrobras-quest-next

# Instale dependências
npm install

# Teste localmente (opcional)
npm run dev
# Abra http://localhost:3000
```

---

### PASSO 2: Obter API Key da Anthropic

1. Acesse: https://console.anthropic.com
2. Cadastre-se (use GitHub para facilitar)
3. Clique em "API Keys" no menu
4. Clique em "Create Key"
5. **COPIE e GUARDE a chave** (não perde!)

💰 Você ganha **$5 grátis** = ~5.000 questões geradas!

---

### PASSO 3: Criar Repositório GitHub

#### Via Interface Web (FÁCIL):

1. Acesse: https://github.com/new
2. Nome: `petrobras-quest-ai`
3. Descrição: "Sistema de estudos com IA para Petrobras 2026"
4. Marque: Private (ou Public, você escolhe)
5. Clique: "Create repository"
6. **NÃO FECHE** essa página!

#### Via Linha de Comando:

```bash
# Na pasta do projeto
cd petrobras-quest-next

# Inicialize o Git
git init
git add .
git commit -m "Projeto inicial Petrobras Quest AI"

# Conecte ao GitHub (use o link da página que você criou)
git remote add origin https://github.com/SEU-USUARIO/petrobras-quest-ai.git
git branch -M main
git push -u origin main
```

---

### PASSO 4: Deploy na Vercel

#### Método 1: Via Site (MAIS FÁCIL) ⭐

1. Acesse: https://vercel.com/signup
2. Clique em "Continue with GitHub"
3. Autorize a Vercel no GitHub
4. Na dashboard, clique em "Add New..." > "Project"
5. Você verá seu repositório `petrobras-quest-ai`
6. Clique em "Import"
7. **IMPORTANTE**: Em "Environment Variables":
   - Clique em "Add New"
   - Name: `ANTHROPIC_API_KEY`
   - Value: Cole sua API key da Anthropic
   - Clique em "Add"
8. Clique em "Deploy"
9. Aguarde 2-3 minutos... ⏳
10. **PRONTO!** 🎉

Você verá uma mensagem: 
```
🎉 Your project is ready!
```

Com um link tipo: `https://petrobras-quest-ai-xxx.vercel.app`

#### Método 2: Via CLI

```bash
# Instale Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Siga as instruções na tela
# Adicione a API key depois no dashboard
```

---

### PASSO 5: Adicionar Variável de Ambiente (se não fez antes)

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em "Settings" > "Environment Variables"
4. Clique em "Add New"
5. Key: `ANTHROPIC_API_KEY`
6. Value: Sua chave da Anthropic
7. Environment: Production, Preview, Development (marque todas)
8. Salvar
9. Vá em "Deployments" > clique nos 3 pontos > "Redeploy"

---

### PASSO 6: Testar! 🎉

1. Acesse o link do seu app
2. Digite seu nome
3. Clique em "Gerar Simulado"
4. Aguarde alguns segundos
5. **FUNCIONA!** ✅

---

## 🔄 COMO ATUALIZAR O APP

### Fazer Alterações:

1. Edite os arquivos em `src/`
2. Salve as mudanças
3. Commit e push:

```bash
git add .
git commit -m "Descrição do que mudou"
git push
```

4. A Vercel faz deploy **automático** em 1-2 minutos! 🚀

---

## 🎨 CUSTOMIZAÇÕES RÁPIDAS

### Mudar Cores do Tema:

Edite `src/app/globals.css`:

```css
.gradient-bg {
  background: linear-gradient(135deg, #SUA_COR_1, #SUA_COR_2);
}
```

### Alterar Pontos de XP:

Edite `src/app/page.tsx`, função `confirmarResposta`:

```typescript
if (acertou) {
  novoXP += 15; // Era 10, agora é 15
```

### Adicionar Nova Matéria:

Edite `src/app/api/gerar-questao/route.ts`:

```typescript
const promptsMateria: Record<string, string> = {
  // ... existentes
  
  ingles: `Você é um especialista em criar questões de Inglês...
  
  Retorne APENAS um JSON válido:
  {
    "enunciado": "Read the text...",
    "alternativas": [...],
    "correta": 0,
    "explicacao": "...",
    "assunto": "Reading Comprehension",
    "dificuldade": "Média"
  }`
};
```

---

## 📊 MONITORAMENTO

### Ver Uso da API:

1. Console Anthropic: https://console.anthropic.com
2. Clique em "Usage"
3. Veja quantas questões foram geradas
4. Monitore créditos restantes

### Ver Logs de Erro:

1. Dashboard Vercel: https://vercel.com/dashboard
2. Clique no projeto
3. Vá em "Logs"
4. Veja erros em tempo real

### Analytics (Opcional):

```bash
npm install @vercel/analytics
```

Edite `src/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// No return do layout:
<body>
  {children}
  <Analytics />
</body>
```

---

## 🆘 PROBLEMAS COMUNS

### ❌ "API Key inválida"

**Solução:**
1. Verifique se adicionou `ANTHROPIC_API_KEY` na Vercel
2. Confirme se a chave está correta
3. Redeploy o projeto

### ❌ "Erro ao gerar questões"

**Possíveis causas:**
1. Créditos esgotados na Anthropic
2. API Key não configurada
3. Erro de rede

**Solução:**
1. Verifique créditos no console Anthropic
2. Adicione créditos se necessário ($10 = ~10.000 questões)
3. Verifique variáveis de ambiente

### ❌ "Build falhou"

**Solução:**
```bash
# Limpe e rebuilde localmente
rm -rf .next node_modules
npm install
npm run build

# Se der erro, veja qual arquivo está com problema
# Corrija e faça commit novamente
```

### ❌ "Dados não salvam"

**Isso é normal!** Os dados são salvos no **localStorage do navegador**.

- Cada dispositivo/navegador tem seus próprios dados
- Se limpar cache, perde os dados
- Para sincronizar entre dispositivos, precisaria de banco de dados

**Solução futura:** Implementar Supabase ou Firebase

---

## 💡 MELHORIAS FUTURAS

### Fáceis (você pode fazer):

- [ ] Adicionar mais matérias
- [ ] Mudar cores e tema
- [ ] Adicionar mais conquistas
- [ ] Alterar sistema de XP
- [ ] Adicionar sons de feedback

### Médias (requer mais tempo):

- [ ] Implementar banco de dados (Supabase)
- [ ] Sistema de login
- [ ] Sincronização entre dispositivos
- [ ] Ranking de usuários
- [ ] Exportar relatórios PDF

### Avançadas (projetos maiores):

- [ ] App mobile (React Native)
- [ ] Modo offline com Service Worker
- [ ] Sistema de amigos
- [ ] Compartilhar resultados
- [ ] Integração com calendário

---

## 📞 RECURSOS E SUPORTE

### Documentação Oficial:

- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **Anthropic**: https://docs.anthropic.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

### Tutoriais:

- Next.js App Router: https://nextjs.org/docs/app
- Deploy na Vercel: https://vercel.com/docs/deployments
- API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

### Comunidades:

- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag `next.js`
- Reddit: r/nextjs

---

## 🎓 VOCÊ PODE MODIFICAR TUDO!

Como você tem conhecimento em Next.js 15, pode:

✅ Adicionar novas páginas  
✅ Criar novos componentes  
✅ Integrar com APIs externas  
✅ Adicionar autenticação  
✅ Implementar banco de dados  
✅ Criar dashboard de admin  
✅ E muito mais!

---

## 🎯 CHECKLIST FINAL

Antes de começar a estudar, confirme:

- [ ] Deploy feito na Vercel ✅
- [ ] API Key configurada ✅
- [ ] App funcionando (testou gerando questões) ✅
- [ ] Link salvo/favoritado ✅
- [ ] Leu o plano de estudos ✅

---

## 🎉 PARABÉNS!

**Você agora tem um sistema profissional de estudos com IA!**

### O que você conseguiu:

✅ App web profissional online 24/7  
✅ Questões ilimitadas geradas por IA  
✅ Domínio próprio (.vercel.app)  
✅ HTTPS automático  
✅ Deploy automático  
✅ Sistema gamificado motivador  
✅ Custo: R$ 0,00  

---

## 💪 AGORA É COM VOCÊ!

1. **Estude com disciplina** seguindo o cronograma
2. **Pratique diariamente** gerando novas questões
3. **Monitore seu progresso** no histórico
4. **Evolua de nível** conquistando XP
5. **PASSE NO CONCURSO!** 🎯

---

## 🛢️ SALÁRIO NA PETROBRAS:

Lembre-se do que te espera:

💰 **R$ 5.878,82** de salário inicial  
💰 **Até R$ 11.000** em regimes especiais  
🏥 Plano de saúde completo  
🍽️ Vale-refeição + alimentação  
👶 Auxílio-creche e educação  
📈 Plano de carreira  
🎯 Estabilidade  

**VALE A PENA ESTUDAR!** 🚀

---

**SUCESSO NA SUA JORNADA!** 💪🛢️🤖

---

*Criado especialmente para você que vai ARRASAR no concurso da Petrobras 2026!*
