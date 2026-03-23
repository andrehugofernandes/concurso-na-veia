import { QuizQuestion } from "../../shared";

// MÓDULO 1: ECOSSISTEMA MOBILE
export const quizM1: QuizQuestion[] = [
  {
    id: "m1q1",
    pergunta: "Sobre o desenvolvimento nativo em Android e iOS, qual alternativa descreve corretamente a principal diferença entre eles?",
    opcoes: [
      { label: "A", valor: "Android usa primariamente Swift e o iOS usa Kotlin." },
      { label: "B", valor: "Android roda sobre o kernel Linux e usa o ART (Android Runtime); iOS roda sobre o kernel XNU." },
      { label: "C", valor: "O iOS é um sistema de código aberto baseado no projeto AOSP." },
      { label: "D", valor: "A fragmentação de dispositivos é um problema exclusivo do ecossistema Apple." },
      { label: "E", valor: "Ambos utilizam a mesma ferramenta oficial de desenvolvimento: o VS Code." }
    ],
    correta: "B",
    explicacao: "Android é baseado em Linux e usa o ART para execução. iOS é baseado em XNU (BSD-based). São arquiteturas de kernel e runtime distintas."
  },
  {
    id: "m1q2",
    pergunta: "O conceito de 'fragmentação' no contexto Android refere-se a:",
    opcoes: [
      { label: "A", valor: "A divisão do aplicativo em módulos menores para economia de memória." },
      { label: "B", valor: "A existência de milhares de modelos de aparelhos com diferentes versões do SO e tamanhos de tela." },
      { label: "C", valor: "A quebra de compatibilidade entre Java e Kotlin no Android Studio." },
      { label: "D", valor: "O processo de compressão de arquivos .APK para .AAB." },
      { label: "E", valor: "A separação obrigatória entre o banco de dados SQLite e o sistema de arquivos." }
    ],
    correta: "B",
    explicacao: "Fragmentação é o grande desafio do Android em lidar com a vasta gama de hardwares e versões de software coexistentes no mercado."
  },
  {
    id: "m1q3",
    pergunta: "Qual das seguintes ferramentas é a IDE OFICIAL para o desenvolvimento Android?",
    opcoes: [
      { label: "A", valor: "Xcode" },
      { label: "B", valor: "Android Studio (baseado no IntelliJ)" },
      { label: "C", valor: "Eclipse ADT" },
      { label: "D", valor: "Visual Studio Community" },
      { label: "E", valor: "Neovim" }
    ],
    correta: "B",
    explicacao: "Desde 2014, o Android Studio é a única IDE oficial suportada pelo Google para o desenvolvimento Android."
  },
  {
    id: "m1q4",
    pergunta: "No ecossistema Apple, qual sistema é responsável pela distribuição e controle de aplicativos?",
    opcoes: [
      { label: "A", valor: "Google Play Console" },
      { label: "B", valor: "App Store Connect" },
      { label: "C", valor: "Apple Application Manager" },
      { label: "D", valor: "iTunes Store Lib" },
      { label: "E", valor: "Swift Package Manager" }
    ],
    correta: "B",
    explicacao: "O App Store Connect é a plataforma onde desenvolvedores gerenciam metadados, versões e enviam apps para a App Store."
  },
  {
    id: "m1q5",
    pergunta: "A Petrobras utiliza dispositivos móveis para operações em campo (Offshore). Qual característica do ecossistema mobile é CRÍTICA nesse cenário?",
    opcoes: [
      { label: "A", valor: "Suporte a Realidade Virtual (VR)." },
      { label: "B", valor: "Consumo de mídia em alta definição (8K)." },
      { label: "C", valor: "Conectividade e resiliência (Offline-first) devido à instabilidade de rede em alto mar." },
      { label: "D", valor: "Uso de jogos em 3D de alta performance." },
      { label: "E", valor: "Sincronização obrigatória com mídias sociais." }
    ],
    correta: "C",
    explicacao: "Para operações offshore, onde a rede é instável, o app deve ser 'Offline-first', garantindo o registro de dados mesmo sem conexão imediata."
  }
];

// MÓDULO 2: DESENVOLVIMENTO NATIVO (KOTLIN/SWIFT)
export const quizM2: QuizQuestion[] = [
  {
    id: "m2q1",
    pergunta: "No ciclo de vida de uma Activity no Android, qual método é chamado quando a Activity não está mais visível para o usuário?",
    opcoes: [
      { label: "A", valor: "onStop()" },
      { label: "B", valor: "onPause()" },
      { label: "C", valor: "onDestroy()" },
      { label: "D", valor: "onRestart()" },
      { label: "E", valor: "onFinish()" }
    ],
    correta: "A",
    explicacao: "onPause() é quando ela perde o foco (ex: sobreposição parcial). onStop() é quando ela fica totalmente oculta."
  },
  {
    id: "m2q2",
    pergunta: "Kotlin oferece 'Null Safety' (Segurança contra Nulos). Como declaramos uma variável que PODE receber valor nulo?",
    opcoes: [
      { label: "A", valor: "var nome: String" },
      { label: "B", valor: "var nome: String?" },
      { label: "C", valor: "var nome: Nullable<String>" },
      { label: "D", valor: "var nome: Optional<String>" },
      { label: "E", valor: "var nome: String = null" }
    ],
    correta: "B",
    explicacao: "Em Kotlin, o ponto de interrogação (?) após o tipo indica que a variável é 'nullable'."
  },
  {
    id: "m2q3",
    pergunta: "No iOS, qual o nome do framework moderno e declarativo para construção de interfaces?",
    opcoes: [
      { label: "A", valor: "UIKit" },
      { label: "B", valor: "SwiftUI" },
      { label: "C", valor: "CocoaPad" },
      { label: "D", valor: "AppKit" },
      { label: "E", valor: "Storyboard Pro" }
    ],
    correta: "B",
    explicacao: "SwiftUI é o framework da Apple (lançado em 2019) que permite criar interfaces de forma declarativa e reativa."
  },
  {
    id: "m2q4",
    pergunta: "O que é o ProGuard / R8 no desenvolvimento Android?",
    opcoes: [
      { label: "A", valor: "Um emulador de alta performance." },
      { label: "B", valor: "Uma ferramenta de ofuscação e otimização de código que reduz o tamanho do APK/AAB." },
      { label: "C", valor: "O gerenciador de dependências padrão." },
      { label: "D", valor: "Um scanner de vulnerabilidades em tempo real." },
      { label: "E", valor: "A engine de renderização de telas 2D." }
    ],
    correta: "B",
    explicacao: "R8 (sucessor do ProGuard) reduz o código não utilizado e ofusca as classes para dificultar engenharia reversa e economizar espaço."
  },
  {
    id: "m2q2_5",
    pergunta: "Em Swift, 'Optional Binding' é uma técnica para:",
    opcoes: [
      { label: "A", valor: "Conectar o app ao servidor via REST." },
      { label: "B", valor: "Extrair o valor de um opcional de forma segura usando 'if let' ou 'guard let'." },
      { label: "C", valor: "Criar variáveis globais acessíveis de qualquer tela." },
      { label: "D", valor: "Compilar o app para múltiplas arquiteturas de CPU." },
      { label: "E", valor: "Criptografar logs do sistema." }
    ],
    correta: "B",
    explicacao: "O binding (if let / guard let) verifica se o opcional contém um valor e o atribui a uma constante temporária se não for nulo."
  }
];

// MÓDULO 3: APPS HÍBRIDOS E PWAS
export const quizM3: QuizQuestion[] = [
  {
    id: "m3q1",
    pergunta: "Aplicativos Híbridos tradicionais (Cordova/Ionic 5-) utilizam qual tecnologia para renderizar a interface?",
    opcoes: [
      { label: "A", valor: "Compilação Nativa AOT" },
      { label: "B", valor: "Canvas 2D" },
      { label: "C", valor: "WebViews (navegador interno)" },
      { label: "D", valor: "DirectX" },
      { label: "E", valor: "OpenGL" }
    ],
    correta: "C",
    explicacao: "Apps híbridos rodam código HTML/CSS/JS dentro de uma WebView, que é essencialmente uma instância de navegador no app."
  },
  {
    id: "m3q2",
    pergunta: "Qual o principal arquivo que define as capacidades de um PWA (Progressive Web App)?",
    opcoes: [
      { label: "A", valor: "package.json" },
      { label: "B", valor: "manifest.json" },
      { label: "C", valor: "styles.css" },
      { label: "D", valor: "main.js" },
      { label: "E", valor: "setup.php" }
    ],
    correta: "B",
    explicacao: "O Manifest (manifest.json) define ícones, cores de tema, nome e comportamento de 'instalação' (Add to Home Screen) do PWA."
  },
  {
    id: "m3q3",
    pergunta: "Service Workers em um PWA são responsáveis por:",
    opcoes: [
      { label: "A", valor: "Desenhar a interface gráfica." },
      { label: "B", valor: "Acesso ao hardware via Bluetooth." },
      { label: "C", valor: "Gerenciar o cache de recursos, requisições de rede e suporte a modo Offline." },
      { label: "D", valor: "Sincronizar contatos do telefone com a nuvem." },
      { label: "E", valor: "Apostar em performance nativa via C++." }
    ],
    correta: "C",
    explicacao: "Service Workers rodam em background e interceptam chamadas de rede para servir cache, essencial para o funcionamento offline."
  },
  {
    id: "m3q4",
    pergunta: "Uma desvantagem CRÍTICA de apps baseados em WebView em relação aos Nativo/Multipataforma é:",
    opcoes: [
      { label: "A", valor: "Não podem ser instalados via APK." },
      { label: "B", valor: "Performance inferior em animações e listas muito longas." },
      { label: "C", valor: "Não suportam CSS3." },
      { label: "D", valor: "São incompatíveis com JavaScript moderno (ES6)." },
      { label: "E", valor: "Não permitem uso de cores hexadecimais." }
    ],
    correta: "B",
    explicacao: "A camada da WebView adiciona overhead de processamento, tornando animações complexas menos fluídas que as nativas."
  },
  {
    id: "m3q5",
    pergunta: "O que caracteriza um framework 'Multiplataforma' (ex: Flutter/RN) em comparação ao 'Híbrido' (ex: Cordova)?",
    opcoes: [
      { label: "A", valor: "O código é interpretado no servidor do framework." },
      { label: "B", valor: "Multiplataforma gera componentes reais de interface (nativos ou desenhados na tela), enquanto Híbrido gera apenas HTML." },
      { label: "C", valor: "Híbridos são obrigatoriamente feitos em Python." },
      { label: "D", valor: "Multiplataforma só funciona em iPhones." },
      { label: "E", valor: "Não há diferença, são sinônimos perfeitos." }
    ],
    correta: "B",
    explicacao: "Frameworks modernos evitam WebViews para renderizar componentes que conversam diretamente com o sistema operacional."
  }
];

// MÓDULO 4: REACT NATIVE CORE
export const quizM4: QuizQuestion[] = [
  {
    id: "m4q1",
    pergunta: "No React Native, como o layout é gerenciado por padrão?",
    opcoes: [
      { label: "A", valor: "CSS Grid" },
      { label: "B", valor: "Floats e Positioning" },
      { label: "C", valor: "Flexbox (via Yoga Engine)" },
      { label: "D", valor: "Bootstrap Grid" },
      { label: "E", valor: "Manual pixels (X, Y)" }
    ],
    correta: "C",
    explicacao: "O React Native usa uma implementação de Flexbox via motor Yoga, focada em layouts móveis responsivos."
  },
  {
    id: "m4q2",
    pergunta: "Qual componente é o equivalente à 'div' do Web no React Native?",
    opcoes: [
      { label: "A", valor: "<Container>" },
      { label: "B", valor: "<Box>" },
      { label: "C", valor: "<View>" },
      { label: "D", valor: "<Section>" },
      { label: "E", valor: "<Block>" }
    ],
    correta: "C",
    explicacao: "A <View> é o bloco de construção fundamental de interface de usuário no RN."
  },
  {
    id: "m4q3",
    pergunta: "Em relação ao texto no React Native, qual afirmação é VERDADEIRA?",
    opcoes: [
      { label: "A", valor: "Pode-se escrever texto puro dentro de uma <View>." },
      { label: "B", valor: "Todo texto deve estar obrigatoriamente dentro de um componente <Text>." },
      { label: "C", valor: "React Native suporta tags de parágrafo <p> nativamente." },
      { label: "D", valor: "O texto herda estilos de fontes definidos na <View> pai." },
      { label: "E", valor: "Não é possível estilizar textos no React Native." }
    ],
    correta: "B",
    explicacao: "Ao contrário da Web, o RN lança erro se houver texto fora do componente <Text>, e não há herança de estilos de texto no nível do layout."
  },
  {
    id: "m4q4",
    pergunta: "O que é o 'Metro' no contexto do desenvolvimento React Native?",
    opcoes: [
      { label: "A", valor: "O sistema de transporte de dados via API." },
      { label: "B", valor: "O Bundler (empacotador) de JavaScript para ambientes de desenvolvimento." },
      { label: "C", valor: "Um framework de animações ultrarrápidas." },
      { label: "D", valor: "A ferramenta de publicação automática." },
      { label: "E", valor: "O motor de banco de dados offline." }
    ],
    correta: "B",
    explicacao: "Metro é o bundler oficial que transforma o código JS em bundles consumíveis pelo app em tempo de execução."
  },
  {
    id: "m4q5",
    pergunta: "O componente 'FlatList' é preferido em relação ao 'ScrollView' para listas longas porque:",
    opcoes: [
      { label: "A", valor: "Ele é mais bonito visualmente." },
      { label: "B", valor: "Ele implementa 'Virtualização', renderizando apenas o que está visível na tela e poupando memória." },
      { label: "C", valor: "Ele permite scroll infinito de forma nativa sem JS." },
      { label: "D", valor: "Ele não suporta imagens, sendo mais rápido por isso." },
      { label: "E", valor: "Ele funciona apenas com dados vindos do Firebase." }
    ],
    correta: "B",
    explicacao: "A FlatList gerencia a memória de forma inteligente, destruindo e recriando itens que entram e saem da tela."
  }
];

// MÓDULO 5: RN NAVEGAÇÃO E ESTADO
export const quizM5: QuizQuestion[] = [
  {
    id: "m5q1",
    pergunta: "Qual biblioteca é considerada o padrão de ouro para navegação em React Native?",
    opcoes: [
      { label: "A", valor: "React Router Dom" },
      { label: "B", valor: "Native Navigation" },
      { label: "C", valor: "React Navigation" },
      { label: "D", valor: "GoRouter" },
      { label: "E", valor: "RN Navigator 2.0" }
    ],
    correta: "C",
    explicacao: "React Navigation é a mais documentada e flexível para Pilhas, Abas e Menus no ecossistema RN."
  },
  {
    id: "m5q2",
    pergunta: "O hook 'useEffect' no React Native é frequentemente usado para:",
    opcoes: [
      { label: "A", valor: "Mudar o estilo CSS dinamicamente." },
      { label: "B", valor: "Executar efeitos colaterais como chamadas de API ou subscrições após a montagem do componente." },
      { label: "C", valor: "Criar variáveis de estado globais." },
      { label: "D", valor: "Definir a cor de fundo da Status Bar." },
      { label: "E", valor: "Navegar entre telas via parâmetros." }
    ],
    correta: "B",
    explicacao: "useEffect é o centro da lógica reativa para disparar requisições ou listeners assim que o componente 'nasce' ou muda de parâmetros."
  },
  {
    id: "m5q3",
    pergunta: "Sobre o Context API do React, no desenvolvimento mobile ele serve para:",
    opcoes: [
      { label: "A", valor: "Aumentar o brilho da tela do celular." },
      { label: "B", valor: "Compartilhar estados entre componentes distantes na árvore sem o uso de 'prop drilling'." },
      { label: "C", valor: "Apenas armazenar tokens de autenticação." },
      { label: "D", valor: "Substituir o banco de dados SQLite." },
      { label: "E", valor: "Gerar IDs únicos para cada componente." }
    ],
    correta: "B",
    explicacao: "Context permite que dados fluam da raiz para qualquer nível da árvore sem passar manualmente por todos os pais intermédios."
  },
  {
    id: "m5q4",
    pergunta: "Na navegação do tipo 'Stack' (Pilha), o que acontece quando chamamos 'navigation.push()'?",
    opcoes: [
      { label: "A", valor: "A tela atual é encerrada e a nova aberta." },
      { label: "B", valor: "Uma nova cópia da tela é empilhada sobre a anterior." },
      { label: "C", valor: "O usuário volta para a tela raiz do app." },
      { label: "D", valor: "O app é minimizado." },
      { label: "E", valor: "O cache de dados é limpo." }
    ],
    correta: "B",
    explicacao: "Diferente de 'navigate', o 'push' sempre adiciona uma nova instância no topo da pilha, mesmo se a tela já existir abaixo."
  },
  {
    id: "m5q5",
    pergunta: "O 'AsyncStorage' do React Native é ideal para armazenar quais tipos de dados?",
    opcoes: [
      { label: "A", valor: "Vídeos em alta resolução." },
      { label: "B", valor: "Tabelas com milhões de linhas indexadas." },
      { label: "C", valor: "Pequenas chaves de configuração, tokens JWT e estados de UI simples." },
      { label: "D", valor: "Logs detalhados de rede de 1 ano." },
      { label: "E", valor: "Arquivos temporários binários de câmera." }
    ],
    correta: "C",
    explicacao: "AsyncStorage é um sistema simples de chave/valor não estruturado, equivalente ao LocalStorage da Web. Não deve ser usado para dados massivos."
  }
];

// MÓDULO 6: FLUTTER & DART CORE
export const quizM6: QuizQuestion[] = [
  {
    id: "m6q1",
    pergunta: "Qual é o mantra do desenvolvimento Flutter?",
    opcoes: [
      { label: "A", valor: "Tudo é uma função." },
      { label: "B", valor: "Tudo é um componente HTML." },
      { label: "C", valor: "Tudo é um Widget." },
      { label: "D", valor: "Tudo é uma API." },
      { label: "E", valor: "Tudo é Reactivo." }
    ],
    correta: "C",
    explicacao: "No Flutter, da página inteira ao ícone, cada elemento de UI e lógica estrutural é um Widget."
  },
  {
    id: "m6q2",
    pergunta: "O termo 'Hot Reload' no Flutter significa:",
    opcoes: [
      { label: "A", valor: "Reiniciar o hardware do celular em caso de erro." },
      { label: "B", valor: "Atualizar o código no dispositivo mantendo o estado atual do app, quase instantaneamente." },
      { label: "C", valor: "Apagar o cache das fontes e recarregar imagens." },
      { label: "D", valor: "Enviar a versão para a loja de apps em background." },
      { label: "E", valor: "O aquecimento do processador durante compilação pesada." }
    ],
    correta: "B",
    explicacao: "Hot Reload injeta mudanças de código na Dart VM em execução, permitindo ver resultados sem perder onde o usuário estava no app."
  },
  {
    id: "m6q3",
    pergunta: "Dart utiliza compilação JIT e AOT. Qual das duas é usada para versões de RELEASE (Produção)?",
    opcoes: [
      { label: "A", valor: "JIT (Just-in-Time)" },
      { label: "B", valor: "AOT (Ahead-of-Time)" },
      { label: "C", valor: "Ambas simultaneamente" },
      { label: "D", valor: "Nenhuma, Dart é interpretado" },
      { label: "E", valor: "Compilação binária via server." }
    ],
    correta: "B",
    explicacao: "AOT compila o código Dart para binário ARM/x86 antes da execução, garantindo performance máxima para o usuário final."
  },
  {
    id: "m6q4",
    pergunta: "A engine de renderização padrão do Flutter (até a versão 3.10) que desenha a UI tela é:",
    opcoes: [
      { label: "A", valor: "WebKit" },
      { label: "B", valor: "Gecko" },
      { label: "C", valor: "Skia" },
      { label: "D", valor: "Blink" },
      { label: "E", valor: "CanvasEngine X" }
    ],
    correta: "C",
    explicacao: "Skia é a biblioteca 2D usada pelo Chrome e Android, e é o coração gráfico do Flutter. (Nota: Impeller está substituindo nas versões novas)."
  },
  {
    id: "m6q5",
    pergunta: "Em Flutter, o Widget que provê uma estrutura visual básica (como AppBar, Floating Action Button e Drawer) é o:",
    opcoes: [
      { label: "A", valor: "ViewContainer" },
      { label: "B", valor: "MainFrame" },
      { label: "C", valor: "Scaffold" },
      { label: "D", valor: "Skeleton" },
      { label: "E", valor: "BodyBuilder" }
    ],
    correta: "C",
    explicacao: "O Scaffold implementa os padrões visuais baiscos do Material Design em uma tela."
  }
];

// MÓDULO 7: FLUTTER STATE MANAGEMENT
export const quizM7: QuizQuestion[] = [
  {
    id: "m7q1",
    pergunta: "Qual a principal diferença entre um StatelessWidget e um StatefulWidget?",
    opcoes: [
      { label: "A", valor: "StatelessWidget gasta mais bateria." },
      { label: "B", valor: "StatefulWidget possui um objeto de estado interno que permite reconstruir a UI quando os dados mudam." },
      { label: "C", valor: "StatelessWidget só funciona em Android." },
      { label: "D", valor: "StatefulWidget não suporta animações." },
      { label: "E", valor: "StatelessWidget é feito em Java." }
    ],
    correta: "B",
    explicacao: "StatefulWidgets gerenciam estados mutáveis ao longo do tempo de vida do widget."
  },
  {
    id: "m7q2",
    pergunta: "O padrão BLoC (Business Logic Component) no Flutter baseia-se em:",
    opcoes: [
      { label: "A", valor: "Variáveis globais e condicionais." },
      { label: "B", valor: "Promessas e Callbacks." },
      { label: "C", valor: "Streams (Sincronia baseada em fluxo de dados e eventos)." },
      { label: "D", valor: "Reduções de matrizes bidimensionais." },
      { label: "E", valor: "Apenas manipulação de JSON." }
    ],
    correta: "C",
    explicacao: "BLoC separa lógica de UI usando Sinks (entrada) e Streams (saída) para fluxo de dados assíncrono."
  },
  {
    id: "m7q3",
    pergunta: "No contexto de gerenciamento de estado, o pacote 'Provider' é conhecido por sua:",
    opcoes: [
      { label: "A", valor: "Complexidade extrema para grandes apps." },
      { label: "B", valor: "Dependência de códigos em C++." },
      { label: "C", valor: "Simplicidade e uso eficiente do 'InheritedWidget' do Flutter." },
      { label: "D", valor: "Incompatibilidade com o sistema iOS." },
      { label: "E", valor: "Incapacidade de rodar no modo Hot Reload." }
    ],
    correta: "C",
    explicacao: "Provider é o 'wrapper' (embrulho) recomendado pelo Google para gerenciamento de estado simples e eficiente."
  },
  {
    id: "m7q4",
    pergunta: "Para monitorar mudanças em uma variável reativa de forma performática em bibliotecas como GetX ou MobX, usamos:",
    opcoes: [
      { label: "A", valor: "Loops de repetição infinitos." },
      { label: "B", valor: "Obx ou Observables." },
      { label: "C", valor: "Requisições HTTP a cada 1 segundo." },
      { label: "D", valor: "Mudanças manuais no arquivo XML." },
      { label: "E", valor: "Persistência em disco imediata." }
    ],
    correta: "B",
    explicacao: "Observables automatizam a atualização da UI apenas quando o valor observado realmente sofre alteração."
  },
  {
    id: "m7q5",
    pergunta: "Em uma prova do TCU ou Petrobras, qual termo descreve o fluxo de dados em um app Flutter robusto?",
    opcoes: [
      { label: "A", valor: "Fluxo Circular (Circular Flow)." },
      { label: "B", valor: "Fluxo Unidirecional de Dados (Unidirectional Data Flow)." },
      { label: "C", valor: "Fluxo Aleatório (Random Access)." },
      { label: "D", valor: "Fluxo Bidirecional Dinâmico." },
      { label: "E", valor: "Fluxo em Árvore Invertida." }
    ],
    correta: "B",
    explicacao: "A maioria dos padrões modernos (BLoC, Provider) prega o fluxo unidirecional para facilitar testes e manutenção."
  }
];

// MÓDULO 8: HARDWARE E NATIVE FEATURES
export const quizM8: QuizQuestion[] = [
  {
    id: "m8q1",
    pergunta: "Tanto Android quanto iOS exigem 'Runtime Permissions' (Permissões em tempo de execução). Isso significa que:",
    opcoes: [
      { label: "A", valor: "O app só pede permissão se o Wi-Fi estiver ligado." },
      { label: "B", valor: "A permissão é pedida apenas na instalação do app na loja." },
      { label: "C", valor: "O usuário deve aceitar o uso da câmera/GPS no EXATO MOMENTO em que o recurso é solicitado no app." },
      { label: "D", valor: "O app nunca pede permissão, o sistema operacional gerencia tudo sozinho." },
      { label: "E", valor: "As permissões só valem para celulares com biometria." }
    ],
    correta: "C",
    explicacao: "Permissões sensíveis não são mais 'no pacote' da instalação; devem ser solicitadas contextualmente para segurança do usuário."
  },
  {
    id: "m8q2",
    pergunta: "O 'Push Notification' (Notificações fora do app) é enviado primariamente através de quais serviços oficiais para Android e iOS?",
    opcoes: [
      { label: "A", valor: "Direct SMS e iMessage." },
      { label: "B", valor: "FCM (Firebase Cloud Messaging) e APNs (Apple Push Notification service)." },
      { label: "C", valor: "Google Cloud Drive e iCloud Drive." },
      { label: "D", valor: "WhatsApp Business API." },
      { label: "E", valor: "TCP/IP Sockets manuais." }
    ],
    correta: "B",
    explicacao: "FCM e APNs são as 'pontes' obrigatórias para enviar mensagens remotas para as plataformas."
  },
  {
    id: "m8q3",
    pergunta: "Em React Native, como é chamado o mecanismo de comunicação com módulos nativos escritos em Java/Swift?",
    opcoes: [
      { label: "A", valor: "Hyperlink" },
      { label: "B", valor: "Native Bridge (ou Turbo Modules)" },
      { label: "C", valor: "Web Tunnel" },
      { label: "D", valor: "Direct Injunction" },
      { label: "E", valor: "Native Socket" }
    ],
    correta: "B",
    explicacao: "A Bridge é a camada de comunicação assíncrona que serializa dados JS para o lado nativo."
  },
  {
    id: "m8q4",
    pergunta: "Qual dessas tecnologias é tipicamente usada para biometria (Login com Digital/Face) em apps nativos e multiplataforma?",
    opcoes: [
      { label: "A", valor: "Local Authentication API" },
      { label: "B", valor: "Biometric Storage DB" },
      { label: "C", valor: "Fingerprint Scanner V4" },
      { label: "D", valor: "Keymaster Lib" },
      { label: "E", valor: "Auth0 Protocol Only" }
    ],
    correta: "A",
    explicacao: "Bibliotecas de 'Local Authentication' abstraem o FaceID (iOS) e BiometricPrompt (Android) para o desenvolvedor."
  },
  {
    id: "m8q5",
    pergunta: "O 'Deep Linking' permite que um app móvel seja aberto através de:",
    opcoes: [
      { label: "A", valor: "Um comando de voz oculto." },
      { label: "B", valor: "Uma URL específica no navegador ou outro aplicativo." },
      { label: "C", valor: "Um movimento brusco do giroscópio." },
      { label: "D", valor: "Uma atualização silenciosa da loja." },
      { label: "E", valor: "Um sensor de proximidade infravermelho." }
    ],
    correta: "B",
    explicacao: "Deep links direcionam o usuário de um link web (ex: petrobras://vagas/123) diretamente para a tela correspondente dentro do app."
  }
];

// MÓDULO 9: UX/UI E DESIGN PATTERNS
export const quizM9: QuizQuestion[] = [
  {
    id: "m9q1",
    pergunta: "As 'Human Interface Guidelines' (HIG) referem-se aos padrões de design de qual empresa?",
    opcoes: [
      { label: "A", valor: "Google (Android)" },
      { label: "B", valor: "Apple (iOS/macOS)" },
      { label: "C", valor: "Microsoft (Windows)" },
      { label: "D", valor: "Huawei (Harmony)" },
      { label: "E", valor: "Facebook (Meta)" }
    ],
    correta: "B",
    explicacao: "HIG é o guia oficial da Apple que define regras de tipagem, menus e comportamentos táteis."
  },
  {
    id: "m9q2",
    pergunta: "O 'Material Design' foca em quais conceitos visuais principais?",
    opcoes: [
      { label: "A", valor: "Simular texturas de couro e papel fisicamente." },
      { label: "B", valor: "Flat design 100% sem sombras." },
      { label: "C", valor: "Uso de superfícies, sombras realistas, cores vibrantes e animações significativas." },
      { label: "D", valor: "Apenas o uso de preto e branco." },
      { label: "E", valor: "Interfaces baseadas em terminal (CLI)." }
    ],
    correta: "C",
    explicacao: "O Material Design (Google) usa o conceito de 'papel e tinta digital' com profundidade e hierarquia visual."
  },
  {
    id: "m9q3",
    pergunta: "A regra do 'Polegar' em UX Mobile sugere que:",
    opcoes: [
      { label: "A", valor: "O celular deve ser segurado com as duas mãos sempre." },
      { label: "B", valor: "Botões importantes devem ficar na parte superior esquerda para difícil acesso." },
      { label: "C", valor: "Áreas de ação principal devem estar ao alcance fácil do polegar (geralmente área do centro para baixo)." },
      { label: "D", valor: "Apps não devem ter botões, apenas gestos." },
      { label: "E", valor: "O polegar serve apenas para o leitor biométrico." }
    ],
    correta: "C",
    explicacao: "A 'Thumb Zone' é a área onde o usuário tem maior conforto para interagir com uma mão, ditando onde colocar ações cruciais."
  },
  {
    id: "m9q4",
    pergunta: "Acessibilidade mobile envolve suporte a:",
    opcoes: [
      { label: "A", valor: "Leitores de tela (TalkBack no Android, VoiceOver no iOS)." },
      { label: "B", valor: "Contraste de cores adequado e tamanhos de fonte ajustáveis." },
      { label: "C", valor: "Legendas em vídeos e feedback tátil." },
      { label: "D", valor: "Todas as alternativas anteriores." },
      { label: "E", valor: "Apenas suporte a fones de ouvido Bluetooth." }
    ],
    correta: "D",
    explicacao: "Um app de alta qualidade corporativa (Petrobras) deve ser inclusivo em todas essas frentes."
  },
  {
    id: "m9q5",
    pergunta: "O 'Glassmorphism' é uma tendência visual comum no iOS que se caracteriza por:",
    opcoes: [
      { label: "A", valor: "Interfaces pesadas que parecem ferro." },
      { label: "B", valor: "Uso de fundos semitransparentes com efeitos de desfoque (blur) que parecem vidro fosco." },
      { label: "C", valor: "Menus que somem ao tocar a tela." },
      { label: "D", valor: "Ausência total de ícones." },
      { label: "E", valor: "Simular o efeito de água sobre a tela." }
    ],
    correta: "B",
    explicacao: "O efeito de 'Blurred background'/vibrancy é marca registrada da UI moderna da Apple."
  }
];

// MÓDULO 10: PUBLICAÇÃO E CI/CD
export const quizM10: QuizQuestion[] = [
  {
    id: "m10q1",
    pergunta: "O arquivo .AAB (Android App Bundle) é superior ao .APK porque:",
    opcoes: [
      { label: "A", valor: "Ele é criptografado pelo FBI." },
      { label: "B", valor: "Ele permite que a Play Store gere APKs otimizados para a arquitetura de cada dispositivo, reduzindo o download." },
      { label: "C", valor: "Ele não exige assinatura digital." },
      { label: "D", valor: "Ele roda em iPhones via emulador." },
      { label: "E", valor: "Ele transforma o app em um site automaticamente." }
    ],
    correta: "B",
    explicacao: "O .AAB é o formato de publicação atual que permite que a loja envie apenas as bibliotecas e recursos necessários para o celular do usuário."
  },
  {
    id: "m10q2",
    pergunta: "Para publicar na Apple App Store, é OBRIGATÓRIO o uso de:",
    opcoes: [
      { label: "A", valor: "Um PC com Windows 11." },
      { label: "B", valor: "Um computador Mac (ou serviço de cloud macOS) para rodar o Xcode e assinar o app." },
      { label: "C", valor: "Apenas o VS Code." },
      { label: "D", valor: "Uma conta de desenvolvedor gratuita vitalícia." },
      { label: "E", valor: "Unidade de processamento gráfico NVIDIA local." }
    ],
    correta: "B",
    explicacao: "Apple exige hardware/software proprietário (Mac/Xcode) para build e assinatura final de apps iOS."
  },
  {
    id: "m10q3",
    pergunta: "O 'TestFlight' é a ferramenta oficial da Apple para:",
    opcoes: [
      { label: "A", valor: "Pagar faturas de anúncios." },
      { label: "B", valor: "Distribuição de versões beta/teste para usuários internos e externos." },
      { label: "C", valor: "Testar a velocidade de download de rede." },
      { label: "D", valor: "Comprar e vender iPhones usados." },
      { label: "E", valor: "Simular quedas de sinal GPS." }
    ],
    correta: "B",
    explicacao: "TestFlight permite que beta testers instalem versões experimentais do app antes de chegarem ao grande público."
  },
  {
    id: "m10q4",
    pergunta: "O que é o 'CI/CD' aplicado ao mobile (ex: Fastlane, GitHub Actions)?",
    opcoes: [
      { label: "A", valor: "Criptografia Integral / Dados Codificados." },
      { label: "B", valor: "Corte de Custos / Desempenho Contínuo." },
      { label: "C", valor: "Integração Contínua e Entrega Contínua (Automação de builds, testes e deploys)." },
      { label: "D", valor: "Controle de Interface / Design Coeso." },
      { label: "E", valor: "Comunicação Interna / Diálogos Constantes." }
    ],
    correta: "C",
    explicacao: "Pipelines de CI/CD automatizam o processo de gerar builds e subir para as lojas, evitando erro humano e lentidão."
  },
  {
    id: "m10q5",
    pergunta: "A revisão de aplicativos na Apple versus Google Play costuma ser:",
    opcoes: [
      { label: "A", valor: "Ambas são instantâneas." },
      { label: "B", valor: "Historicamente mais criteriosa e lenta na Apple (pode levar dias) do que na Play Store." },
      { label: "C", valor: "O Google não faz revisão, tudo é liberado na hora." },
      { label: "D", valor: "A Apple aprova tudo em 5 minutos." },
      { label: "E", valor: "Não há revisão para empresas federadas como a Petrobras." }
    ],
    correta: "B",
    explicacao: "A Apple possui uma inspeção rigorosa (humana e automatizada) que garante a qualidade e segurança da App Store."
  }
];
