# 🤖 Petrobras Quest AI - Next.js 15

Sistema de estudos gamificado com geração de questões por IA para o concurso da Petrobras 2026.

## 🚀 Deploy Rápido na Vercel (RECOMENDADO)

### Opção 1: Deploy Automático via GitHub

1. **Crie uma conta no GitHub** (se não tiver): https://github.com
2. **Crie um novo repositório**:
   - Acesse: https://github.com/new
   - Nome: `petrobras-quest-ai`
   - Marque como "Private" (ou "Public" se preferir)
   - Clique em "Create repository"

3. **Faça upload do código**:
   ```bash
   # Na pasta do projeto
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/petrobras-quest-ai.git
   git push -u origin main
   ```

4. **Deploy na Vercel**:
   - Acesse: https://vercel.com
   - Clique em "Sign up with GitHub"
   - Clique em "Import Project"
   - Selecione o repositório `petrobras-quest-ai`
   - Em "Environment Variables", adicione:
     - Nome: `ANTHROPIC_API_KEY`
     - Valor: Sua chave da API Anthropic (https://console.anthropic.com/settings/keys)
   - Clique em "Deploy"
   - Aguarde 2-3 minutos ✅
   - SEU APP ESTÁ NO AR! 🎉

### Opção 2: Deploy Manual via Vercel CLI

```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Entre na pasta do projeto
cd petrobras-quest-next

# 3. Faça login na Vercel
vercel login

# 4. Deploy
vercel

# 5. Adicione a API KEY no painel da Vercel
# Acesse vercel.com/dashboard
# Selecione seu projeto > Settings > Environment Variables
# Adicione: ANTHROPIC_API_KEY = sua_chave
```

## 🔑 Obtendo a API Key da Anthropic

1. Acesse: https://console.anthropic.com
2. Faça login (ou crie uma conta)
3. Vá em "API Keys" no menu lateral
4. Clique em "Create Key"
5. Copie a chave gerada
6. Adicione como variável de ambiente no Vercel

**IMPORTANTE**: A Anthropic oferece $5 de crédito gratuito para novos usuários!

## 💻 Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo .env.local na raiz do projeto
echo "ANTHROPIC_API_KEY=sua_chave_aqui" > .env.local

# 3. Rodar em desenvolvimento
npm run dev

# 4. Abrir no navegador
# http://localhost:3000
```

## 📁 Estrutura do Projeto

```
petrobras-quest-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── gerar-questao/
│   │   │       └── route.ts          # API route para gerar questões
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Página principal
│   │   └── globals.css               # Estilos globais
│   ├── components/
│   │   ├── HomeScreen.tsx            # Tela inicial
│   │   ├── LoadingScreen.tsx         # Tela de carregamento
│   │   ├── SimuladoScreen.tsx        # Tela do simulado
│   │   └── ResultadoScreen.tsx       # Tela de resultado
│   └── lib/
│       ├── types.ts                  # TypeScript types
│       └── utils.ts                  # Funções utilitárias
├── public/                           # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🛠️ Como Editar e Dar Manutenção

### Adicionar Nova Matéria

Edite `src/app/api/gerar-questao/route.ts`:

```typescript
const promptsMateria: Record<string, string> = {
  // ... matérias existentes
  
  nova_materia: `Você é um especialista...
  
  INSTRUÇÕES CRÍTICAS:
  1. Crie UMA questão de [NOME DA MATÉRIA]
  2. ...
  
  Retorne APENAS um JSON válido:
  {
    "enunciado": "...",
    "alternativas": [...],
    "correta": 0,
    "explicacao": "...",
    "assunto": "...",
    "dificuldade": "Média"
  }`
};
```

### Alterar Cores/Temas

Edite `src/app/globals.css`:

```css
.gradient-bg {
  background: linear-gradient(135deg, #SUA_COR_1, #SUA_COR_2);
}
```

### Modificar Sistema de XP

Edite `src/app/page.tsx` na função `confirmarResposta()`:

```typescript
if (acertou) {
  novoXP += 10;  // Altere este valor
  // ...
}
```

### Adicionar Novas Conquistas

Edite `src/app/page.tsx` na função `confirmarResposta()`:

```typescript
if (novaSequencia === 30 && !novasConquistas.includes('combo30')) {
  novoXP += 200;
  novasConquistas.push('combo30');
  alert('🏆 LENDÁRIO! +200 XP por 30 acertos seguidos!');
}
```

## 🔄 Atualizar Deploy

### Via Git + Vercel (Automático)

```bash
# Faça suas alterações e depois:
git add .
git commit -m "Descrição das mudanças"
git push origin main

# A Vercel fará deploy automático em 1-2 minutos!
```

### Via Vercel CLI

```bash
vercel --prod
```

## 🎨 Personalização Avançada

### Mudar Fontes

Edite `src/app/layout.tsx`:

```typescript
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
})
```

### Adicionar Analytics

1. Instale: `npm install @vercel/analytics`
2. Edite `src/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Adicionar SEO

Edite `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Seu Título Customizado',
  description: 'Sua descrição customizada',
  keywords: 'palavras, chave, customizadas',
  openGraph: {
    title: 'Título para redes sociais',
    description: 'Descrição para redes sociais',
    images: ['/og-image.png'],
  },
}
```

## 📊 Monitoramento

### Ver Logs de Erro (Vercel)

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em "Logs"
4. Veja erros em tempo real

### Ver Uso da API Anthropic

1. Acesse: https://console.anthropic.com
2. Vá em "Usage"
3. Veja quantas questões foram geradas

## 🐛 Troubleshooting

### Erro: "API Key inválida"
- Verifique se adicionou `ANTHROPIC_API_KEY` nas variáveis de ambiente da Vercel
- Confirme se a chave está correta no console da Anthropic

### Erro: "Questões não são geradas"
- Verifique os logs na Vercel
- Confirme se tem créditos na sua conta Anthropic
- Teste a API localmente primeiro

### Erro de Build
```bash
# Limpe o cache e tente novamente
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Dados não são salvos
- O localStorage só funciona no cliente
- Verifique se está em modo 'use client'
- Teste em navegação anônima

## 🚀 Performance

### Otimizações Aplicadas

- ✅ Next.js 15 com App Router
- ✅ Server Components onde possível
- ✅ API Routes para geração de questões
- ✅ Client Components apenas onde necessário
- ✅ Tailwind CSS para CSS otimizado
- ✅ TypeScript para type safety

### Melhorias Futuras

- [ ] Cache de questões geradas
- [ ] Service Worker para offline
- [ ] Lazy loading de componentes
- [ ] Image optimization
- [ ] Database para sincronizar entre dispositivos

## 📱 PWA (Progressive Web App)

Para transformar em PWA:

```bash
npm install next-pwa
```

Edite `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
})
```

## 🎯 Próximos Passos

1. ✅ Deploy na Vercel
2. ✅ Testar geração de questões
3. ✅ Compartilhar link com amigos
4. ✅ Coletar feedback
5. ✅ Iterar e melhorar

## 💡 Dicas

- **Backup**: Sempre faça commit no Git antes de mudanças grandes
- **Teste Local**: Teste mudanças localmente antes de fazer deploy
- **Monitore**: Acompanhe o uso da API para não extrapolar créditos
- **Otimize**: Use cache quando possível para reduzir chamadas à API

## 📞 Suporte

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Anthropic Docs**: https://docs.anthropic.com
- **Tailwind Docs**: https://tailwindcss.com/docs

## 🎓 Recursos de Aprendizado

- **Next.js Tutorial**: https://nextjs.org/learn
- **TypeScript Tutorial**: https://www.typescriptlang.org/docs
- **Tailwind Tutorial**: https://tailwindcss.com/docs/utility-first
- **React Docs**: https://react.dev

---

**Desenvolvido para o Concurso Petrobras 2026** 🛢️
**Powered by Claude AI (Anthropic)** 🤖

**BOA SORTE NA SUA APROVAÇÃO!** 🚀
