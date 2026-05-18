import { QuizQuestion } from "../../shared";

// MÓDULO 1: ECOSSISTEMA E SEGURANÇA
export const quizM1: QuizQuestion[] = [
  {
    id: "m1q1",
    pergunta: "Considerando a arquitetura de sistemas operacionais móveis, qual alternativa descreve corretamente a distinção fundamental entre Android e iOS?",
    opcoes: [
      { label: "A", valor: "O Android utiliza o kernel Darwin, enquanto o iOS baseia-se no kernel Linux." },
      { label: "B", valor: "O Android opera sobre o Kernel Linux e utiliza o ART (Android Runtime); o iOS baseia-se no Kernel XNU (Darwin)." },
      { label: "C", valor: "O iOS é um sistema de código aberto derivado do projeto AOSP, permitindo customizações de hardware." },
      { label: "D", valor: "A fragmentação de dispositivos e versões do SO é um desafio mitigado pela Apple através do uso de múltiplas máquinas virtuais." },
      { label: "E", valor: "Ambas as plataformas utilizam o paradigma de compilação JIT exclusivamente para todas as camadas de aplicação." }
    ],
    correta: "B",
    explicacao: "O Android utiliza uma base Linux com o runtime ART (AOT compilation). O iOS utiliza o kernel XNU, parte do ecossistema Darwin da Apple, garantindo um controle mais verticalizado do hardware."
  },
  {
    id: "m1q2",
    pergunta: "No contexto do ecossistema Android, o fenômeno da 'fragmentação' implica em:",
    opcoes: [
      { label: "A", valor: "A decomposição modular de arquivos .DEX para otimização de memória em dispositivos de baixo custo." },
      { label: "B", valor: "A coexistência de uma vasta gama de versões do sistema operacional e especificações de hardware, exigindo estratégias complexas de compatibilidade retroativa." },
      { label: "C", valor: "A incompatibilidade intrínseca entre as linguagens Java e Kotlin dentro do ambiente Android Studio." },
      { label: "D", valor: "O processo técnico de conversão de pacotes .APK em .AAB para distribuição via Play Asset Delivery." },
      { label: "E", valor: "O isolamento obrigatório de processos de sistema através do mecanismo de permissões dinâmicas." }
    ],
    correta: "B",
    explicacao: "A fragmentação é o desafio de desenvolver aplicações que operem de forma consistente em milhares de variantes de hardware e múltiplas versões ativas do Android."
  },
  {
    id: "m1q3",
    pergunta: "Qual das seguintes ferramentas é consolidada como o Ambiente de Desenvolvimento Integrado (IDE) oficial para a plataforma Android?",
    opcoes: [
      { label: "A", valor: "Xcode, com suporte a emulação multi-device." },
      { label: "B", valor: "Android Studio, construído sobre a plataforma IntelliJ IDEA." },
      { label: "C", valor: "Eclipse ADT, mantido como padrão legado para sistemas críticos." },
      { label: "D", valor: "Visual Studio, integrando o ecossistema .NET MAUI." },
      { label: "E", valor: "Neovim, através de plugins de integração com o Gradle." }
    ],
    correta: "B",
    explicacao: "O Android Studio é a IDE oficial do Google, fornecendo ferramentas integradas para compilação, análise de performance e emulação."
  },
  {
    id: "m1q4",
    pergunta: "No fluxo de publicação de aplicações iOS, qual plataforma é utilizada para a gestão de metadados, versões e submissão à App Store?",
    opcoes: [
      { label: "A", valor: "Google Play Console (Enterprise Edition)." },
      { label: "B", valor: "App Store Connect." },
      { label: "C", valor: "Apple Developer Portal (Legacy Mode)." },
      { label: "D", valor: "Xcode Cloud Service Manager." },
      { label: "E", valor: "Swift Package Manager (SPM)." }
    ],
    correta: "B",
    explicacao: "O App Store Connect é o portal onde desenvolvedores gerenciam o ciclo de vida da aplicação, desde testes via TestFlight até o lançamento final."
  },
  {
    id: "m1q5",
    pergunta: "Em operações críticas de campo (ex: Offshore na Petrobras), qual requisito técnico é considerado primordial para a arquitetura mobile?",
    opcoes: [
      { label: "A", valor: "Implementação de recursos avançados de Realidade Aumentada (AR)." },
      { label: "B", valor: "Suporte a streaming de vídeo em ultra-resolução (8K)." },
      { label: "C", valor: "Arquitetura Offline-first com mecanismos de sincronização resilientes para ambientes de baixa conectividade." },
      { label: "D", valor: "Integração nativa com motores de jogos de alta performance (Unreal/Unity)." },
      { label: "E", valor: "Conectividade social obrigatória para autenticação via OAuth 2.0." }
    ],
    correta: "C",
    explicacao: "Em cenários com instabilidade de rede, a aplicação deve garantir a integridade dos dados localmente e sincronizá-los de forma assíncrona quando a conexão for restabelecida."
  }
];

// MÓDULO 2: DESENVOLVIMENTO NATIVO E PERFORMANCE
export const quizM2: QuizQuestion[] = [
  {
    id: "m2q1",
    pergunta: "No ciclo de vida de uma Activity no Android, qual estado indica que a instância ainda reside na memória, mas não está mais visível ao usuário?",
    opcoes: [
      { label: "A", valor: "onStop()" },
      { label: "B", valor: "onPause()" },
      { label: "C", valor: "onDestroy()" },
      { label: "D", valor: "onRestart()" },
      { label: "E", valor: "onStart()" }
    ],
    correta: "A",
    explicacao: "O método onStop() é invocado quando a Activity torna-se totalmente oculta. Diferente de onPause(), onde ela pode estar parcialmente visível mas sem foco."
  },
  {
    id: "m2q2",
    pergunta: "A linguagem Kotlin implementa 'Null Safety' nativamente. Qual a sintaxe correta para declarar uma variável que admite a atribuição de valores nulos?",
    opcoes: [
      { label: "A", valor: "var nome: String" },
      { label: "B", valor: "var nome: String?" },
      { label: "C", valor: "val nome: Nullable<String>" },
      { label: "D", valor: "var nome: Optional<String>" },
      { label: "E", valor: "var nome: String = null" }
    ],
    correta: "B",
    explicacao: "O sufixo '?' define o tipo como nullable, obrigando o desenvolvedor a tratar a possível ausência de valor através de safe calls (?.) ou elvis operator (?:)."
  },
  {
    id: "m2q3",
    pergunta: "Qual framework da Apple introduziu o paradigma de programação declarativa para a construção de interfaces no ecossistema iOS?",
    opcoes: [
      { label: "A", valor: "UIKit (baseado em MVC)." },
      { label: "B", valor: "SwiftUI." },
      { label: "C", valor: "Interface Builder com Storyboards." },
      { label: "D", valor: "AppKit para aplicações universais." },
      { label: "E", valor: "Objective-C Runtime UI." }
    ],
    correta: "B",
    explicacao: "O SwiftUI utiliza uma sintaxe declarativa e reativa, facilitando a sincronização entre o estado da aplicação e a interface visual."
  },
  {
    id: "m2q4",
    pergunta: "Qual a função primordial do compilador R8 (sucessor do ProGuard) no build de uma aplicação Android?",
    opcoes: [
      { label: "A", valor: "Emular o hardware do dispositivo para testes unitários." },
      { label: "B", valor: "Realizar a ofuscação de código, remoção de recursos não utilizados (Shrinking) e otimização do bytecode." },
      { label: "C", valor: "Gerenciar dependências através de repositórios Maven centrais." },
      { label: "D", valor: "Atuar como um firewall de aplicação em tempo de execução." },
      { label: "E", valor: "Renderizar vetores complexos em tempo real via GPU." }
    ],
    correta: "B",
    explicacao: "O R8 otimiza o pacote final (.APK/.AAB), dificultando a engenharia reversa através da ofuscação e reduzindo o tamanho do binário."
  },
  {
    id: "m2q2_5",
    pergunta: "Em Swift, o mecanismo 'Optional Binding' (if let / guard let) é utilizado para:",
    opcoes: [
      { label: "A", valor: "Estabelecer conexões síncronas com bancos de dados externos." },
      { label: "B", valor: "Extrair o valor de uma variável opcional de forma segura, evitando 'runtime crashes' por unwrap de nulos." },
      { label: "C", valor: "Definir variáveis globais protegidas por criptografia." },
      { label: "D", valor: "Compilar o código para arquiteturas de 32 bits." },
      { label: "E", valor: "Gerenciar logs de erros do sistema operacional." }
    ],
    correta: "B",
    explicacao: "O Optional Binding verifica a presença de valor em um opcional e, em caso positivo, o atribui a uma constante temporária para uso seguro dentro de um escopo determinado."
  }
];

// MÓDULO 3: ARQUITETURAS HÍBRIDAS E PWAS
export const quizM3: QuizQuestion[] = [
  {
    id: "m3q1",
    pergunta: "A arquitetura de aplicações híbridas tradicionais (ex: Apache Cordova) baseia-se em qual componente para a renderização da interface?",
    opcoes: [
      { label: "A", valor: "Compilação Nativa via LLVM." },
      { label: "B", valor: "Renderização direta via Canvas 2D/3D." },
      { label: "C", valor: "Instâncias de WebViews (navegadores embarcados)." },
      { label: "D", valor: "Abstração de componentes via JSI." },
      { label: "E", valor: "Motores de renderização proprietários escritos em C++." }
    ],
    correta: "C",
    explicacao: "Aplicações híbridas executam código Web em um contexto de 'WebView' (um container de navegador interno), utilizando 'plugins' ou 'bridges' para realizar a interoperabilidade com as APIs nativas do sistema operacional."
  },
  {
    id: "m3q2",
    pergunta: "Qual arquivo de configuração é essencial para definir os metadados e o comportamento de instalação de um Progressive Web App (PWA)?",
    opcoes: [
      { label: "A", valor: "package.json (Node.js configuration)." },
      { label: "B", valor: "Web App Manifest (manifest.json)." },
      { label: "C", valor: "service-worker.js." },
      { label: "D", valor: "index.html com meta-tags de SEO." },
      { label: "E", valor: "config.xml (padrão legante)." }
    ],
    correta: "B",
    explicacao: "O Manifest define propriedades como ícones, cores de tema, nome e modo de exibição (standalone), permitindo que o PWA seja 'instalado'."
  },
  {
    id: "m3q3",
    pergunta: "No contexto de um PWA, qual a responsabilidade técnica do Service Worker?",
    opcoes: [
      { label: "A", valor: "Definir a estrutura semântica da página HTML." },
      { label: "B", valor: "Prover acesso direto ao hardware via Bluetooth de baixo nível." },
      { label: "C", valor: "Atuar como um proxy de rede, gerenciando o Cache API e permitindo o funcionamento offline." },
      { label: "D", valor: "Sincronizar dados entre diferentes abas do navegador em tempo real." },
      { label: "E", valor: "Compilar scripts JavaScript para código de máquina ARM." }
    ],
    correta: "C",
    explicacao: "O Service Worker é um script que executa em um 'WorkerGlobalScope', atuando como um proxy programável entre a aplicação, o cache e a rede. Ele permite a interceptação de eventos 'fetch' para implementar estratégias de resiliência offline e pre-caching."
  },
  {
    id: "m3q4",
    pergunta: "Uma limitação técnica recorrente de aplicações baseadas em WebView frente às soluções Nativas é:",
    opcoes: [
      { label: "A", valor: "A impossibilidade de utilização de bibliotecas JavaScript modernas." },
      { label: "B", valor: "Performance inferior em animações complexas e manipulação de grandes volumes de dados na UI." },
      { label: "C", valor: "A ausência de suporte ao protocolo HTTPS." },
      { label: "D", valor: "A restrição ao uso de fontes customizadas (Web Fonts)." },
      { label: "E", valor: "A incompatibilidade com o sistema de arquivos do dispositivo móvel." }
    ],
    correta: "B",
    explicacao: "O overhead de comunicação entre a WebView e o sistema operacional pode gerar gargalos de performance, especialmente em interfaces com alta taxa de atualização."
  },
  {
    id: "m3q5",
    pergunta: "O que distingue fundamentalmente um framework 'Multiplataforma' (ex: Flutter/React Native) de uma solução 'Híbrida' (ex: Cordova)?",
    opcoes: [
      { label: "A", valor: "O uso obrigatório de linguagens de script interpretadas no servidor." },
      { label: "B", valor: "A geração de componentes de interface nativos ou renderizados diretamente por engines gráficas, evitando o uso de WebViews para a UI principal." },
      { label: "C", valor: "A exclusividade de suporte para sistemas operacionais baseados em Unix." },
      { label: "D", valor: "A necessidade de conexão constante à internet para o funcionamento da lógica de negócio." },
      { label: "E", valor: "A inexistência de acesso às APIs de hardware (Câmera/GPS)." }
    ],
    correta: "B",
    explicacao: "Frameworks multiplataforma modernos buscam performance nativa ao evitar a camada do navegador (WebView) para o desenho da interface do usuário."
  }
];

// MÓDULO 4: ARQUITETURA REACT NATIVE
export const quizM4: QuizQuestion[] = [
  {
    id: "m4q1",
    pergunta: "Como o React Native gerencia o posicionamento e layout de seus componentes por padrão?",
    opcoes: [
      { label: "A", valor: "CSS Grid Layout." },
      { label: "B", valor: "Sistema de Floats herdado do HTML4." },
      { label: "C", valor: "Implementação Flexbox através do motor Yoga (escrito em C++)." },
      { label: "D", valor: "Posicionamento absoluto baseado em coordenadas cartesianas (X, Y)." },
      { label: "E", valor: "Auto Layout proprietário da Apple." }
    ],
    correta: "C",
    explicacao: "O motor Yoga traduz as propriedades Flexbox para as APIs de layout nativas de cada plataforma (Android e iOS)."
  },
  {
    id: "m4q2",
    pergunta: "Qual componente do React Native é considerado a abstração fundamental para agrupamento de outros elementos, equivalente à 'div' no desenvolvimento Web?",
    opcoes: [
      { label: "A", valor: "<Container>" },
      { label: "B", valor: "<Box>" },
      { label: "C", valor: "<View>" },
      { label: "D", valor: "<Section>" },
      { label: "E", valor: "<Fragment>" }
    ],
    correta: "C",
    explicacao: "A <View> mapeia-se diretamente para uma 'android.view' no Android e 'UIView' no iOS, sendo a base estrutural da interface."
  },
  {
    id: "m4q3",
    pergunta: "Sobre o tratamento de strings e textos no React Native, qual premissa é VERDADEIRA?",
    opcoes: [
      { label: "A", valor: "É permitido inserir texto diretamente em componentes de layout como <View>." },
      { label: "B", valor: "Todo conteúdo textual deve ser obrigatoriamente encapsulado pelo componente <Text>." },
      { label: "C", valor: "O React Native herda estilos de fonte do componente pai automaticamente." },
      { label: "D", valor: "A tag <span> é utilizada para aplicar estilos parciais em um bloco de texto." },
      { label: "E", valor: "Não há suporte para estilização de fontes (weight, size) via JavaScript." }
    ],
    correta: "B",
    explicacao: "Ao contrário da Web, o React Native exige que strings residam em componentes <Text> para que possam ser processadas corretamente pelas engines nativas."
  },
  {
    id: "m4q4",
    pergunta: "Na 'New Architecture' do React Native, qual o papel da JSI (JavaScript Interface)?",
    opcoes: [
      { label: "A", valor: "Atuar como um Bundler para compactar arquivos JavaScript." },
      { label: "B", valor: "Permitir a comunicação síncrona e direta entre o JavaScript e o código nativo (Host Objects em C++), eliminando a necessidade da Bridge." },
      { label: "C", valor: "Gerenciar a navegação entre telas através de uma pilha de memória." },
      { label: "D", valor: "Criptografar as requisições HTTP feitas pela biblioteca Axios." },
      { label: "E", valor: "Prover uma interface gráfica para depuração de erros em tempo real." }
    ],
    correta: "B",
    explicacao: "A JSI (JavaScript Interface) permite que o motor JS mantenha referências diretas a objetos nativos (Host Objects) em C++. Isso possibilita a invocação de métodos nativos de forma síncrona, eliminando o overhead de serialização JSON característico da Bridge legada."
  },
  {
    id: "m4q5",
    pergunta: "Por que o componente 'FlatList' é tecnicamente superior ao 'ScrollView' para a exibição de grandes volumes de dados?",
    opcoes: [
      { label: "A", valor: "Pois oferece maior variedade de propriedades CSS para estilização." },
      { label: "B", valor: "Pelo uso da técnica de 'Virtualização', que mantém na memória apenas os elementos visíveis na tela, otimizando o consumo de recursos." },
      { label: "C", valor: "Devido ao suporte nativo a múltiplos bancos de dados relacionais." },
      { label: "D", valor: "Por permitir o scroll horizontal e vertical simultaneamente sem perda de FPS." },
      { label: "E", valor: "Porque é o único componente que suporta carregamento de imagens remotas." }
    ],
    correta: "B",
    explicacao: "A FlatList utiliza a técnica de 'Windowing' ou 'Virtualização', onde apenas os elementos visíveis (e um pequeno buffer) são mantidos na memória. Itens que saem do campo de visão são destruídos ou reciclados, evitando o estouro de memória (OOM) em listas massivas."
  }
];

// MÓDULO 5: RN NAVEGAÇÃO E ESTADO
export const quizM5: QuizQuestion[] = [
  {
    id: "m5q1",
    pergunta: "Dentro do ecossistema Redux Toolkit (RTK), qual a função primordial do 'RTK Query' no gerenciamento de estado assíncrono?",
    opcoes: [
      { label: "A", valor: "Substituir integralmente a Context API para estados globais síncronos." },
      { label: "B", valor: "Automatizar o ciclo de vida de requisições (Loading, Success, Error) e gerenciar o cache de dados do servidor via 'normalized caching'." },
      { label: "C", valor: "Criptografar os dados armazenados no AsyncStorage automaticamente." },
      { label: "D", valor: "Gerar interfaces gráficas baseadas em esquemas JSON de API." },
      { label: "E", valor: "Reduzir o tamanho do bundle final através de Tree Shaking agressivo." }
    ],
    correta: "B",
    explicacao: "O RTK Query abstrai a lógica de fetching, fornece hooks auto-gerados e implementa estratégias de cache e invalidação (tags), reduzindo drasticamente o 'boilerplate' de Thunks manuais."
  },
  {
    id: "m5q2",
    pergunta: "No contexto do ciclo de vida funcional do React Native, a finalidade precípua do hook 'useEffect' é:",
    opcoes: [
      { label: "A", valor: "Realizar a mutação direta de estilos CSS globais." },
      { label: "B", valor: "Orquestrar a execução de efeitos colaterais, como requisições assíncronas e subscrições, após a renderização." },
      { label: "C", valor: "Declarar variáveis de estado globais acessíveis via Context." },
      { label: "D", valor: "Configurar propriedades estáticas da Status Bar nativa." },
      { label: "E", valor: "Gerenciar a pilha de navegação de forma imperativa." }
    ],
    correta: "B",
    explicacao: "O hook useEffect permite que o desenvolvedor execute operações imperativas em resposta a mudanças de estado ou durante as fases de montagem e desmontagem do componente."
  },
  {
    id: "m5q3",
    pergunta: "A implementação de 'Context API' no ecossistema React Native visa, primordialmente:",
    opcoes: [
      { label: "A", valor: "Ajustar parâmetros de hardware como luminosidade e contraste." },
      { label: "B", valor: "Prover um mecanismo de injeção de dependências e compartilhamento de estado, mitigando o 'prop drilling'." },
      { label: "C", valor: "Armazenar credenciais de autenticação em nível de kernel." },
      { label: "D", valor: "Atuar como um banco de dados relacional local indexado." },
      { label: "E", valor: "Garantir a unicidade de chaves de indexação em listas virtualizadas." }
    ],
    correta: "B",
    explicacao: "O Context API permite a propagação de dados através da árvore de componentes sem a necessidade de passar propriedades manualmente por todos os níveis hierárquicos."
  },
  {
    id: "m5q4",
    pergunta: "A persistência de estado em aplicações Redux complexas é frequentemente delegada ao 'redux-persist'. Qual sua função técnica principal?",
    opcoes: [
      { label: "A", valor: "Aumentar a velocidade de renderização de componentes críticos." },
      { label: "B", valor: "Serializar o estado do store e salvá-lo em storage local (como AsyncStorage), permitindo o 'rehydration' do estado após o reinício do app." },
      { label: "C", valor: "Executar testes unitários automatizados em tempo de runtime." },
      { label: "D", valor: "Gerenciar a autorização de rotas em nível de middleware." },
      { label: "E", valor: "Otimizar imagens em cache para reduzir o consumo de banda." }
    ],
    correta: "B",
    explicacao: "O redux-persist garante que o estado da aplicação sobreviva ao fechamento do processo, utilizando 'persistReducers' e 'persistStore' para sincronizar o estado em memória com o armazenamento persistente."
  },
  {
    id: "m5q5",
    pergunta: "Considerando as bibliotecas de navegação, o 'React Navigation' utiliza um modelo de navegação declarativo. Qual a vantagem desta abordagem?",
    opcoes: [
      { label: "A", valor: "Permite o acesso direto às APIs de kernel do iOS/Android." },
      { label: "B", valor: "Facilita a composição de rotas como componentes React, integrando-se naturalmente ao fluxo de renderização e estado da aplicação." },
      { label: "C", valor: "Reduz o consumo de CPU ao evitar a interpolação de frames de animação." },
      { label: "D", valor: "Elimina a necessidade de configuração de 'Deeplinks' no projeto." },
      { label: "E", valor: "Garante que o app funcione exclusivamente em modo offline." }
    ],
    correta: "B",
    explicacao: "A navegação declarativa permite definir a estrutura de telas como parte da árvore de componentes, facilitando a passagem de parâmetros e a reação a mudanças de estado global."
  }
];

// MÓDULO 6: FLUTTER & DART CORE
export const quizM6: QuizQuestion[] = [
  {
    id: "m6q1",
    pergunta: "Como o framework Flutter lida com a concorrência e o paralelismo, considerando que a linguagem Dart é single-threaded por natureza?",
    opcoes: [
      { label: "A", valor: "Através da criação de Threads POSIX compartilhando o mesmo espaço de memória." },
      { label: "B", valor: "Utilizando 'Isolates', que possuem sua própria heap de memória e se comunicam exclusivamente via troca de mensagens (Ports), evitando race conditions." },
      { label: "C", valor: "Delegando todas as tarefas pesadas para o Web Worker do navegador subjacente." },
      { label: "D", valor: "Através de um modelo de 'Green Threads' gerenciado pelo kernel do Android." },
      { label: "E", valor: "O Flutter não suporta paralelismo, executando todas as tarefas de forma sequencial na main thread." }
    ],
    correta: "B",
    explicacao: "Isolates são instâncias separadas de execução. Diferente de threads tradicionais, eles não compartilham memória, o que elimina a necessidade de locks e previne corrupção de dados por acesso concorrente."
  },
  {
    id: "m6q2",
    pergunta: "O mecanismo de 'Hot Reload' no Flutter atua da seguinte forma:",
    opcoes: [
      { label: "A", valor: "Reinicia o ambiente de execução do sistema operacional para depuração." },
      { label: "B", valor: "Injeta as alterações de código na Dart VM, atualizando a UI e preservando o estado mutável da aplicação." },
      { label: "C", valor: "Realiza a limpeza de buffers de memória e recarregamento de assets externos." },
      { label: "D", valor: "Efetua o deploy automático de pacotes para servidores de teste em nuvem." },
      { label: "E", valor: "Otimiza a temperatura do processador via escalonamento de threads de compilação." }
    ],
    correta: "B",
    explicacao: "O Hot Reload permite ciclos de desenvolvimento rápidos ao aplicar patches de código sem a necessidade de reconstruir o estado interno do aplicativo."
  },
  {
    id: "m6q3",
    pergunta: "Considerando as estratégias de compilação da linguagem Dart, a modalidade 'Ahead-of-Time' (AOT) é empregada em versões de produção para:",
    opcoes: [
      { label: "A", valor: "Permitir a execução de scripts dinâmicos durante o runtime." },
      { label: "B", valor: "Compilar o código-fonte em binários de máquina nativos, otimizando o tempo de inicialização e performance." },
      { label: "C", valor: "Atuar como um interpretador híbrido entre JavaScript e código nativo." },
      { label: "D", valor: "Ignorar a verificação de tipos estáticos para acelerar o deploy." },
      { label: "E", valor: "Distribuir a carga de processamento via instâncias de micro-VMs." }
    ],
    correta: "B",
    explicacao: "Diferente do modo de desenvolvimento (JIT), o modo Release utiliza AOT para gerar código binário altamente otimizado para a arquitetura do processador (ARM/x86)."
  },
  {
    id: "m6q4",
    pergunta: "No pipeline de renderização do Flutter, qual é a hierarquia correta de árvores que geram o frame final na tela?",
    opcoes: [
      { label: "A", valor: "Widget Tree -> DOM Tree -> Native Tree" },
      { label: "B", valor: "Widget Tree (Configuração) -> Element Tree (Ciclo de Vida) -> Render Tree (Layout e Pintura)" },
      { label: "C", valor: "State Tree -> View Tree -> GPU Tree" },
      { label: "D", valor: "Object Tree -> Element Tree -> Canvas Tree" },
      { label: "E", valor: "Virtual Tree -> Real Tree -> Buffer Tree" }
    ],
    correta: "B",
    explicacao: "Widgets são imutáveis e definem a configuração; Elements gerenciam a hierarquia e o estado; RenderObjects realizam o cálculo de tamanho, posição e a rasterização final."
  },
  {
    id: "m6q5",
    pergunta: "A transição da engine Skia para a 'Impeller' no Flutter visa resolver primariamente qual problema de performance?",
    opcoes: [
      { label: "A", valor: "O alto consumo de dados em conexões 3G." },
      { label: "B", valor: "O 'Shader Compilation Junk', através do pré-aquecimento de shaders e uso de pipelines de renderização mais modernos." },
      { label: "C", valor: "A incompatibilidade com dispositivos de arquitetura 32 bits." },
      { label: "D", valor: "A falta de suporte a animações em 120Hz." },
      { label: "E", valor: "O tempo excessivo de instalação do APK/IPA." }
    ],
    correta: "B",
    explicacao: "Impeller reduz engasgos (jank) na primeira execução de animações ao evitar a compilação de shaders em tempo real durante a execução do frame (runtime compilation)."
  }
];

// MÓDULO 7: FLUTTER STATE MANAGEMENT
export const quizM7: QuizQuestion[] = [
  {
    id: "m7q1",
    pergunta: "No Flutter, qual é o papel técnico do 'InheritedWidget' no gerenciamento de estado?",
    opcoes: [
      { label: "A", valor: "Ele atua como um storage de banco de dados NoSQL persistente." },
      { label: "B", valor: "Provê uma forma eficiente de propagar informações pela árvore de widgets sem passá-las via construtor (O(1) lookup)." },
      { label: "C", valor: "Gerencia a destruição de isolates em segundo plano." },
      { label: "D", valor: "Converte widgets em componentes nativos do Android Jetpack Compose." },
      { label: "E", valor: "É um wrapper exclusivo para o gerenciamento de permissões de hardware." }
    ],
    correta: "B",
    explicacao: "InheritedWidget é a base de soluções como Provider e Riverpod. Ele permite que widgets descendentes acessem dados de um ancestral comum de forma otimizada."
  },
  {
    id: "m7q2",
    pergunta: "Considerando a arquitetura Flutter, qual a principal distinção operacional entre o padrão BLoC e o Cubit?",
    opcoes: [
      { label: "A", valor: "O Cubit é baseado em Streams, enquanto o BLoC utiliza Future e Async/Await exclusivamente." },
      { label: "B", valor: "O BLoC exige a definição explícita de Eventos para transição de estado, enquanto o Cubit utiliza métodos diretos." },
      { label: "C", valor: "O Cubit gerencia apenas estados efêmeros, enquanto o BLoC é restrito a estados globais da aplicação." },
      { label: "D", valor: "O BLoC depende do BuildContext para sua inicialização, ao passo que o Cubit é independente da árvore de widgets." },
      { label: "E", valor: "O BLoC é uma implementação do padrão Singleton, e o Cubit segue o padrão Factory." }
    ],
    correta: "B",
    explicacao: "O BLoC (Business Logic Component) é reativo e baseado em eventos (Sink de entrada), enquanto o Cubit simplifica o fluxo utilizando métodos para emitir novos estados."
  },
  {
    id: "m7q3",
    pergunta: "O pacote Riverpod é frequentemente preferido em relação ao Provider original por qual razão técnica fundamental?",
    opcoes: [
      { label: "A", valor: "O Riverpod é escrito em C++, garantindo maior performance em dispositivos Android." },
      { label: "B", valor: "Ele elimina a dependência do BuildContext para acessar providers, resolve problemas de 'ProviderNotFoundException' em tempo de compilação e suporta múltiplos providers do mesmo tipo." },
      { label: "C", valor: "O Riverpod é compatível apenas com aplicações desktop Linux." },
      { label: "D", valor: "Ele força o uso do padrão MVC puro em toda a aplicação." },
      { label: "E", valor: "O Riverpod reduz o consumo de bateria ao desativar o GPS do dispositivo." }
    ],
    correta: "B",
    explicacao: "Riverpod é uma reescrita do Provider que resolve limitações fundamentais do InheritedWidget, como a dependência do BuildContext e a dificuldade de testar providers isoladamente."
  },
  {
    id: "m7q4",
    pergunta: "A função do método 'notifyListeners()' em uma classe que estende 'ChangeNotifier' é:",
    opcoes: [
      { label: "A", valor: "Enviar uma notificação push para o Firebase." },
      { label: "B", valor: "Sinalizar a todos os widgets assinantes que o estado interno mudou, disparando o rebuild dos componentes dependentes." },
      { label: "C", valor: "Limpar o cache de imagens da aplicação." },
      { label: "D", valor: "Reiniciar a Main Isolate do Dart." },
      { label: "E", valor: "Validar campos de formulários em tempo real." }
    ],
    correta: "B",
    explicacao: "O padrão Observer é a base do ChangeNotifier. Quando os dados mudam, o notifyListeners() avisa aos ouvintes (geralmente via ListenableBuilder ou Consumer) que a UI precisa ser atualizada."
  },
  {
    id: "m7q5",
    pergunta: "No gerenciamento de estado reativo com 'Signals' (recentemente popularizado no ecossistema Dart), qual a principal vantagem?",
    opcoes: [
      { label: "A", valor: "Substituir o compilador AOT por um JIT em produção." },
      { label: "B", valor: "Granularidade fina de atualizações, onde apenas o widget exato que consome o sinal é reconstruído, sem afetar ancestrais ou vizinhos." },
      { label: "C", valor: "Permitir o uso de variáveis globais sem qualquer tipo de proteção." },
      { label: "D", valor: "Garantir que o app nunca ultrapasse 10MB de tamanho." },
      { label: "E", valor: "Eliminar a necessidade de escrever qualquer código em Dart." }
    ],
    correta: "B",
    explicacao: "Signals oferecem um modelo de reatividade 'push-pull' que otimiza as reconstruções de UI, garantindo que apenas os nós folha interessados no dado sejam atualizados."
  }
];

// MÓDULO 8: HARDWARE E NATIVE FEATURES
export const quizM8: QuizQuestion[] = [
  {
    id: "m8q1",
    pergunta: "No Android e iOS, o sistema de 'Runtime Permissions' exige que o desenvolvedor implemente uma 'Rationale' (Justificativa) quando:",
    opcoes: [
      { label: "A", valor: "O usuário desinstala o aplicativo da loja." },
      { label: "B", valor: "O sistema operacional entra em modo de economia de bateria (Doze Mode)." },
      { label: "C", valor: "O usuário nega a permissão inicialmente, mas o recurso é essencial para a continuidade da funcionalidade." },
      { label: "D", valor: "O app é distribuído fora das lojas oficiais (Sideloading)." },
      { label: "E", valor: "O dispositivo não possui hardware de biometria disponível." }
    ],
    correta: "C",
    explicacao: "A justificativa contextualmente relevante é uma boa prática de UX e exigência técnica para explicar por que um recurso negado anteriormente ainda é necessário."
  },
  {
    id: "m8q2",
    pergunta: "Sobre a autenticação biométrica (FaceID/TouchID) em aplicações mobile, qual afirmação é tecnicamente correta?",
    opcoes: [
      { label: "A", valor: "O aplicativo armazena uma cópia da imagem da digital no banco de dados SQLite local." },
      { label: "B", valor: "A verificação ocorre dentro de um ambiente seguro isolado (TEE ou Secure Enclave), e o app recebe apenas um token de validação." },
      { label: "C", valor: "A biometria só funciona se o aplicativo estiver conectado aos servidores da Apple ou Google em tempo real." },
      { label: "D", valor: "Qualquer aplicativo pode acessar o padrão vetorial da digital do usuário para fins de marketing." },
      { label: "E", valor: "O uso de biometria dispensa o uso de HTTPS em requisições de rede." }
    ],
    correta: "B",
    explicacao: "Por questões de privacidade e segurança, o dado biométrico bruto nunca sai do hardware seguro; o app interage apenas com o resultado da verificação via APIs de sistema."
  },
  {
    id: "m8q3",
    pergunta: "O que caracteriza o mecanismo de 'Platform Channels' (ou MethodChannels) no Flutter?",
    opcoes: [
      { label: "A", valor: "Um sistema de renderização que ignora o motor Skia para usar HTML5." },
      { label: "B", valor: "Um canal de comunicação bidirecional e assíncrono que permite ao Dart invocar APIs nativas de host (Java/Kotlin/Swift)." },
      { label: "C", valor: "Um protocolo de rede para sincronização de arquivos pesados via FTP." },
      { label: "D", valor: "Uma ferramenta de depuração para medir o consumo de CPU em tempo real." },
      { label: "E", valor: "Uma biblioteca exclusiva para integração com redes sociais de terceiros." }
    ],
    correta: "B",
    explicacao: "MethodChannels utilizam a serialização de mensagens para permitir que o código multiplataforma acesse recursos específicos do hardware nativo."
  },
  {
    id: "m8q4",
    pergunta: "Ao implementar processamento em segundo plano (Background Tasks) no iOS, qual o comportamento padrão do sistema?",
    opcoes: [
      { label: "A", valor: "O app tem permissão ilimitada para rodar qualquer processo enquanto o celular estiver ligado." },
      { label: "B", valor: "O sistema gerencia janelas de execução baseadas no padrão de uso do usuário, podendo suspender o app para economizar energia." },
      { label: "C", valor: "Tarefas de background são proibidas, a menos que o app seja um player de música." },
      { label: "D", valor: "O background do iOS funciona exatamente como o do Android, sem restrições de tempo." },
      { label: "E", valor: "O app precisa de root para rodar em segundo plano no iOS." }
    ],
    correta: "B",
    explicacao: "O iOS prioriza a autonomia da bateria e a performance do sistema, alocando recursos para background de forma oportunista e restrita."
  },
  {
    id: "m8q5",
    pergunta: "Para o armazenamento de segredos (Secrets) e chaves de API em um dispositivo móvel, qual a solução recomendada para garantir a segurança contra extração de dados?",
    opcoes: [
      { label: "A", valor: "SharedPreferences com modo privado ativado." },
      { label: "B", valor: "Arquivos de texto (.txt) ocultos na pasta de cache." },
      { label: "C", valor: "Uso do Android Keystore System e do iOS Keychain Services." },
      { label: "D", valor: "Criptografia Base64 em variáveis globais de código." },
      { label: "E", valor: "Armazenamento direto no banco de dados Realm sem senha." }
    ],
    correta: "C",
    explicacao: "Keystore e Keychain são abstrações para hardware de segurança que protegem chaves criptográficas mesmo que o sistema de arquivos seja acessado ilegalmente."
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
    pergunta: "Qual é o principal problema resolvido pela ferramenta 'Fastlane Match' no ciclo de vida de um app iOS?",
    opcoes: [
      { label: "A", valor: "Otimização automática de imagens PNG." },
      { label: "B", valor: "A gestão caótica de Certificados e Provisioning Profiles entre múltiplos desenvolvedores, centralizando-os de forma criptografada em um repositório Git." },
      { label: "C", valor: "A tradução automática da interface para 50 idiomas." },
      { label: "D", valor: "O monitoramento de bateria em dispositivos antigos." },
      { label: "E", valor: "A substituição total do Xcode pela linha de comando." }
    ],
    correta: "B",
    explicacao: "O Match implementa a filosofia 'Codesigning as Code', eliminando o erro humano e conflitos de certificados no time."
  },
  {
    id: "m10q2",
    pergunta: "O conceito de 'App Thinning' (Slicing + Bitcode) tem como objetivo primário:",
    opcoes: [
      { label: "A", valor: "Tornar o ícone do aplicativo mais fino e moderno." },
      { label: "B", valor: "Remover funcionalidades não utilizadas pelo usuário comum." },
      { label: "C", valor: "Entregar um binário otimizado onde o usuário baixa apenas os assets e bibliotecas compatíveis com a arquitetura específica do seu dispositivo." },
      { label: "D", valor: "Compactar o banco de dados SQL local em 90%." },
      { label: "E", valor: "Impedir que o app seja instalado em tablets." }
    ],
    correta: "C",
    explicacao: "Com o Slicing, a loja identifica o modelo do iPhone/Android e envia apenas o que é estritamente necessário (ex: imagens @3x apenas para telas Retina)."
  },
  {
    id: "m10q3",
    pergunta: "Segundo a Guideline 4.0 da Apple, qual é um motivo comum para a REJEIÇÃO de um aplicativo na App Store?",
    opcoes: [
      { label: "A", valor: "O aplicativo é gratuito demais." },
      { label: "B", valor: "O aplicativo é apenas uma 'web view' de um site existente sem fornecer funcionalidade nativa adicional significativa." },
      { label: "C", valor: "O aplicativo usa cores que a Apple não gosta." },
      { label: "D", valor: "O desenvolvedor não possui um Mac de última geração." },
      { label: "E", valor: "O aplicativo possui mais de 10 telas." }
    ],
    correta: "B",
    explicacao: "A Apple exige que aplicativos 'mereçam' estar na loja, oferecendo uma experiência superior a um simples marcador de navegador."
  },
  {
    id: "m10q4",
    pergunta: "Qual é a principal vantagem de utilizar a estratégia de 'Staged Rollout' (Lançamento Gradual)?",
    opcoes: [
      { label: "A", valor: "Enganar os concorrentes sobre a data real de lançamento." },
      { label: "B", valor: "Economizar custos de servidor ao não liberar para todos de uma vez." },
      { label: "C", valor: "Mitigar riscos operacionais, permitindo monitorar crashes e feedbacks em uma pequena porcentagem da base antes da liberação total." },
      { label: "D", valor: "Aumentar o hype e o desejo pelo aplicativo." },
      { label: "E", valor: "Garantir que usuários premium recebam a atualização primeiro." }
    ],
    correta: "C",
    explicacao: "Rollouts graduais permitem 'estancar a sangria' se um bug crítico for detectado logo nos primeiros 1% ou 5% de usuários."
  },
  {
    id: "m10q5",
    pergunta: "O que a 'Google Play Integrity API' garante para a segurança de uma operação corporativa?",
    opcoes: [
      { label: "A", valor: "Que o usuário é um funcionário da Petrobras." },
      { label: "B", valor: "Que o dispositivo não possui vírus conhecidos." },
      { label: "C", valor: "Que o binário instalado é o original da loja e que o dispositivo passou nos testes de compatibilidade e não foi comprometido (root/jailbreak)." },
      { label: "D", valor: "Que a senha do usuário é forte o suficiente." },
      { label: "E", valor: "Que o GPS do dispositivo nunca será desligado." }
    ],
    correta: "C",
    explicacao: "A Play Integrity substitui o antigo SafetyNet, sendo vital para garantir a integridade do ambiente onde o app corporativo roda."
  }
];
