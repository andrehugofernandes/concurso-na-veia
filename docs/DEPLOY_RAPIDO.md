# 🚀 GUIA DE DEPLOY ULTRA-RÁPIDO

## ⏱️ Tempo Estimado: 10 minutos

### PASSO 1: Preparar o Código (2 minutos)

```bash
# Baixe e extraia o código
cd petrobras-quest-next

# Instale dependências
npm install
```

### PASSO 2: Criar Conta Anthropic (3 minutos)

1. Acesse: **https://console.anthropic.com**
2. Clique em "Sign Up"
3. Confirme seu email
4. Vá em "API Keys" no menu
5. Clique em "Create Key"
6. **COPIE A CHAVE** (você vai precisar!)

💰 **Você ganha $5 de crédito grátis!** (suficiente para ~5.000 questões)

### PASSO 3: Deploy na Vercel (5 minutos)

#### Opção A: Via Site (MAIS FÁCIL) ✨

1. Acesse: **https://vercel.com**
2. Clique em "Sign Up" (use sua conta do GitHub)
3. Authorize o GitHub quando solicitado
4. Na dashboard, clique em "Add New..." > "Project"
5. Clique em "Import Git Repository"
6. **Selecione ou faça upload** da pasta `petrobras-quest-next`
7. Em "Environment Variables", adicione:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Cole a chave que você copiou
8. Clique em "Deploy"
9. Aguarde 2-3 minutos... ⏳
10. **PRONTO!** 🎉 Seu link estará disponível!

#### Opção B: Via CLI (PARA DESENVOLVEDORES)

```bash
# 1. Instale o Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel

# 4. Adicione a API key no dashboard
# Vercel te dará o link do projeto
# Vá em Settings > Environment Variables
# Adicione ANTHROPIC_API_KEY
```

### PASSO 4: Testar (1 minuto)

1. Acesse o link que a Vercel te deu (tipo: `petrobras-quest-ai.vercel.app`)
2. Digite seu nome
3. Clique em "Gerar Simulado"
4. **FUNCIONA!** ✅

---

## 🎯 Seu App Estará Disponível Em:

```
https://SEU-PROJETO.vercel.app
```

**Exemplos de URL:**
- `petrobras-quest-ai.vercel.app`
- `meu-simulado-petrobras.vercel.app`
- `estudos-petrobras-2026.vercel.app`

---

## 🔄 Como Atualizar Depois

### Via GitHub (Automático):

```bash
git add .
git commit -m "Minhas alterações"
git push
```

**A Vercel faz deploy automático!** 🚀

### Via Vercel CLI:

```bash
vercel --prod
```

---

## ⚠️ IMPORTANTE

- ✅ A Vercel é **100% GRATUITA** para projetos pessoais
- ✅ Seu app ficará **online 24/7**
- ✅ Você terá um **domínio próprio** (pode customizar)
- ✅ **HTTPS automático** (seguro)
- ✅ **Deploy automático** quando você fizer alterações

---

## 💡 DICAS RÁPIDAS

### Mudar o nome do domínio:

1. No dashboard da Vercel
2. Clique no seu projeto
3. Settings > Domains
4. Adicione um nome customizado

### Ver quantas questões foram geradas:

1. Console Anthropic > Usage
2. Veja o consumo em tempo real

### Adicionar mais funcionalidades:

1. Edite os arquivos em `src/`
2. Faça commit no Git
3. Deploy automático! ✨

---

## 🆘 PROBLEMAS COMUNS

### "API Key inválida"
➡️ Adicione a variável `ANTHROPIC_API_KEY` nas configurações da Vercel

### "Erro ao gerar questões"
➡️ Verifique se tem créditos na sua conta Anthropic

### "Build falhou"
➡️ Execute `npm run build` localmente para ver o erro

---

## 🎉 PARABÉNS!

**Seu sistema de estudos com IA está NO AR!** 🚀

Agora é só estudar e ARRASAR no concurso da Petrobras! 💪🛢️

---

**Dúvidas?** Consulte o README.md completo!
