# Documento de Requisitos do Produto (PDR) - Meet.AI

## 1. Introdução

Este Documento de Requisitos do Produto (PDR) detalha as especificações para a recriação do tutorial "Build and Deploy a SaaS AI Agent Platform | Next.js 15, React, Better Auth, Polar | Full Course 2025" apresentado no YouTube [1]. O objetivo é fornecer um guia completo para a construção de uma aplicação de videochamada com agentes de IA, Meet.AI, incluindo a configuração de todas as variáveis de ambiente necessárias para os serviços integrados.

A aplicação Meet.AI é uma plataforma de videochamada que utiliza agentes de IA para participar ativamente das chamadas, oferecendo assistência em tempo real. As funcionalidades incluem a criação de reuniões, personalização de agentes de IA, lobby de espera, interação em tempo real com agentes de IA, processamento pós-chamada para transcrição e resumo, e um portal de assinaturas SaaS.

## 2. Tecnologias e Serviços Utilizados

A plataforma Meet.AI é construída sobre uma pilha de tecnologia moderna, incluindo:

*   **Frontend**: Next.js 15, React
*   **Autenticação**: Better Auth
*   **Banco de Dados/ORM**: Drizzle ORM
*   **Pagamentos/Assinaturas**: Polar.sh
*   **Videochamada**: Stream Video SDK
*   **Agentes de IA/Processamento de Linguagem Natural**: OpenAI Realtime API
*   **Processamento em Background/Fluxos de Trabalho**: Inngest

## 3. Configuração do Ambiente (.env)

Para a correta operação da aplicação, é fundamental configurar o arquivo `.env` com as variáveis de ambiente apropriadas para cada serviço. Abaixo estão as variáveis identificadas e suas descrições.

### 3.1. Next.js

As variáveis de ambiente no Next.js são carregadas a partir de arquivos `.env` e podem ser acessadas no lado do servidor ou do cliente, dependendo do prefixo `NEXT_PUBLIC_` [2].

*   `NEXT_PUBLIC_APP_URL`: URL base da aplicação (ex: `http://localhost:3000`)

### 3.2. Better Auth

O Better Auth requer uma chave secreta para criptografia e hashing, além da URL base da aplicação [3].

*   `BETTER_AUTH_SECRET`: Uma chave secreta de pelo menos 32 caracteres, gerada com alta entropia. Pode ser gerada via `openssl rand -base64 32`.
*   `BETTER_AUTH_URL`: URL base da aplicação, utilizada pelo Better Auth para callbacks e redirecionamentos (ex: `http://localhost:3000`).
*   `GITHUB_CLIENT_ID`: ID do cliente OAuth para integração com GitHub (se utilizado).
*   `GITHUB_CLIENT_SECRET`: Segredo do cliente OAuth para integração com GitHub (se utilizado).

### 3.3. Polar.sh

Para integrar o Polar.sh para pagamentos e assinaturas, são necessárias as seguintes variáveis [4]:

*   `POLAR_ACCESS_TOKEN`: Token de acesso para autenticação com a API do Polar.sh.
*   `POLAR_WEBHOOK_SECRET`: Segredo do webhook para verificar a autenticidade dos eventos recebidos do Polar.sh.
*   `SUCCESS_URL`: URL para a qual o usuário será redirecionado após um checkout bem-sucedido.

### 3.4. Inngest

O Inngest é utilizado para gerenciar jobs em background, como a busca de transcrições e a geração de resumos. As variáveis de ambiente configuram a comunicação com o serviço Inngest [5].

*   `INNGEST_BASE_URL`: URL base para comunicação com o Inngest (geralmente não é necessário definir, a menos que esteja usando um servidor de desenvolvimento local ou proxy).
*   `INNGEST_DEV`: Define o modo de desenvolvimento (ex: `1` para dev, `0` para produção). Pode incluir a URL do servidor de desenvolvimento (ex: `http://localhost:8288`).
*   `INNGEST_ENV`: Define o ambiente Inngest (ex: `production`, `development`).
*   `INNGEST_EVENT_KEY`: Chave de evento para enviar eventos ao Inngest.
*   `INNGEST_LOG_LEVEL`: Nível de log para o SDK do Inngest (ex: `info`, `debug`, `warn`, `error`).
*   `INNGEST_SERVE_HOST`: Host usado para acessar a aplicação a partir do Inngest Cloud.
*   `INNGEST_SERVE_PATH`: Caminho usado para acessar a aplicação a partir do Inngest Cloud (ex: `/api/inngest`).
*   `INNGEST_SIGNING_KEY`: Chave de assinatura para garantir a comunicação segura com o Inngest.
*   `INNGEST_SIGNING_KEY_FALLBACK`: Chave de assinatura de fallback, usada durante a rotação de chaves.
*   `INNGEST_STREAMING`: Habilita ou desabilita o suporte a streaming (ex: `allow`, `force`, `false`).

### 3.5. Stream Video SDK

O Stream Video SDK é utilizado para as funcionalidades de videochamada. A autenticação é feita através de uma chave de API e um token de usuário [6].

*   `STREAM_API_KEY`: Chave de API obtida no dashboard do Stream.io.
*   `STREAM_USER_ID`: ID do usuário para autenticação no Stream Video SDK.
*   `STREAM_TOKEN_PROVIDER_URL`: URL do endpoint do servidor que gera o token de autenticação para o Stream Video SDK (recomendado para produção).
*   `STREAM_TOKEN`: Token de autenticação estático (para desenvolvimento ou testes, menos seguro para produção).

### 3.6. OpenAI Realtime API

A OpenAI Realtime API é utilizada para a interação com agentes de IA. Embora a documentação específica para Next.js 15 e a API em tempo real não tenha sido encontrada diretamente, as variáveis de ambiente geralmente seguem o padrão da API da OpenAI [7].

*   `OPENAI_API_KEY`: Sua chave de API da OpenAI.
*   `OPENAI_ORGANIZATION`: (Opcional) ID da sua organização OpenAI.

### 3.7. Drizzle ORM

O Drizzle ORM é utilizado para interação com o banco de dados. As variáveis de ambiente dependerão do tipo de banco de dados utilizado (PostgreSQL, MySQL, SQLite, etc.). Para um banco de dados PostgreSQL, por exemplo, as variáveis podem ser:

*   `DATABASE_URL`: URL de conexão com o banco de dados (ex: `postgresql://user:password@host:port/database`).

## 4. Fluxo do Usuário (User Flow)

1.  **Acesso à Plataforma**: O usuário acessa a aplicação Meet.AI.
2.  **Criação de Reunião**: O usuário clica em "New Meeting", define um título e, opcionalmente, cria um novo agente de IA personalizado (ex: "Hustle Coach").
3.  **Lobby de Espera**: O usuário é direcionado para um lobby, onde pode verificar câmera e microfone antes de entrar na chamada.
4.  **Chamada em Tempo Real**: Durante a chamada, o agente de IA interage e responde às perguntas do usuário.
5.  **Pós-Chamada**: Após o término da chamada, o status muda para "Processing". Jobs em background (Inngest e AgentKit) buscam a transcrição e geram um resumo.
6.  **Acesso a Conteúdo Pós-Chamada**: O usuário pode acessar um resumo detalhado com timestamp, transcrição pesquisável e gravação completa da chamada. Uma interface similar ao ChatGPT permite fazer perguntas sobre o conteúdo da reunião.
7.  **Gerenciamento de Assinatura**: A plataforma opera com um modelo de assinatura SaaS. Ao atingir os limites de uso, o usuário é solicitado a fazer um upgrade via Polar.sh.

## 5. Funcionalidades Principais

*   **Videochamadas com Agentes de IA**: Agentes de IA treinados para funções específicas participam ativamente das chamadas.
*   **Personalização de Agentes**: Capacidade de criar e personalizar agentes de IA com instruções específicas de personalidade.
*   **Transcrição e Resumo Automáticos**: Geração automática de transcrições e resumos detalhados das chamadas.
*   **Gravação de Chamadas**: Gravação completa das sessões de videochamada.
*   **Interface de Consulta de Conteúdo**: Interface estilo ChatGPT para interagir com o conteúdo das reuniões.
*   **Modelo de Assinatura SaaS**: Gerenciamento de planos de assinatura e limites de uso via Polar.sh.
*   **Design Responsivo**: Aplicação totalmente responsiva para dispositivos móveis.

## 6. Referências

[1] Build and Deploy a SaaS AI Agent Platform | Next.js 15, React, Better Auth, Polar | Full Course 2025. YouTube. Disponível em: [https://www.youtube.com/watch?v=xEDCEmqyvC8&t=11s](https://www.youtube.com/watch?v=xEDCEmqyvC8&t=11s)
[2] Environment Variables - Next.js. Disponível em: [https://nextjs.org/docs/pages/guides/environment-variables](https://nextjs.org/docs/pages/guides/environment-variables)
[3] Installation | Better Auth. Disponível em: [https://www.better-auth.com/docs/installation#environment-variables](https://www.better-auth.com/docs/installation#environment-variables)
[4] Next.js - Polar. Disponível em: [https://polar.sh/docs/integrate/sdk/adapters/nextjs](https://polar.sh/docs/integrate/sdk/adapters/nextjs)
[5] Environment Variables - Inngest Documentation. Disponível em: [https://www.inngest.com/docs/sdk/environment-variables](https://www.inngest.com/docs/sdk/environment-variables)
[6] Client & Authentication - React Video and Audio Docs. Disponível em: [https://getstream.io/video/docs/react/guides/client-auth/](https://getstream.io/video/docs/react/guides/client-auth/)
[7] OpenAI API Documentation. Disponível em: [https://platform.openai.com/docs/api-reference/introduction](https://platform.openai.com/docs/api-reference/introduction)
