# Google APIs — Built-in AI do Chrome
LINK: https://developer.chrome.com/docs/ai/built-in-apis

Projeto de estudo e testes das **APIs de IA nativas do Google Chrome** (Built-in AI), que rodam **localmente no navegador** usando o modelo Gemini Nano — sem servidor, sem chave de API e sem enviar dados para a nuvem.

A aplicação traz uma página inicial com um menu e uma tela para cada API, onde é possível digitar um texto e ver a resposta do modelo.

## APIs disponíveis

| API | O que faz | Configuração usada no projeto |
| --- | --- | --- |
| **Prompt API** (`LanguageModel`) | Conversa livre com o modelo, como um chat | Modo de amostragem `balanced` e um histórico inicial de exemplo (system prompt de assistente amigável) |
| **Summarizer API** (`Summarizer`) | Resume textos | Tipo `key-points`, formato `markdown`, tamanho `medium`, entrada em inglês, contexto de notícias de esporte/futebol |
| **Language Detector API** (`LanguageDetector`) | Detecta o idioma de um texto | Retorna a lista de idiomas detectados com o nível de confiança de cada um |
| **Translator API** (`Translator`) | Traduz textos | Tradução fixa de **inglês (`en`) → português (`pt`)** |

## Pré-requisitos

- **Node.js** e **npm** (para compilar o TypeScript e subir o servidor local)
- **Google Chrome para desktop** em uma versão recente, com suporte às APIs de Built-in AI
- Um computador que atenda aos requisitos de hardware do Gemini Nano (espaço livre em disco, memória e GPU/CPU). Os requisitos atualizados estão na [documentação oficial do Chrome](https://developer.chrome.com/docs/ai/built-in)

> Na primeira vez, o Chrome pode precisar **baixar o modelo**. Enquanto isso, a disponibilidade da API aparece como `downloadable` ou `downloading`, e ela só funciona quando o status for `available`.
>
> Dependendo da versão do Chrome, algumas APIs (principalmente a Prompt API) podem precisar ser habilitadas em `chrome://flags`. Para conferir o status do modelo, acesse `chrome://on-device-internals`.

## Como rodar

```bash
# 1. Clonar o repositório
git clone https://github.com/BHAraujo/google-apis.git
cd google-apis

# 2. Instalar as dependências
npm install

# 3. Compilar e subir o servidor
npm start
```

Depois, abra no Chrome:

```
http://localhost:8080/src/index.html
```

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run build` | Compila o TypeScript de `src/` para `dist/` |
| `npm run watch` | Recompila automaticamente a cada alteração |
| `npm run serve` | Sobe um servidor estático (`http-server`) na raiz do projeto, sem cache |
| `npm run dev` | Roda `watch` e `serve` juntos (ideal durante o desenvolvimento) |
| `npm start` | Compila uma vez e sobe o servidor |

> O servidor precisa rodar a partir da **raiz do projeto**, porque as páginas em `src/templates/` carregam os scripts compilados de `dist/scripts/`.

## Estrutura do projeto

O código segue uma arquitetura no estilo **MVC**, separando a comunicação com as APIs, a manipulação da tela e a lógica que liga as duas.

```
google-apis/
├── src/
│   ├── index.html          # Página inicial com o menu das APIs
│   ├── index.ts            # Inicialização geral (Prompt, Summarizer e Language Detector)
│   ├── services/           # Comunicação com as APIs do Chrome (availability, create, prompt...)
│   ├── views/              # Leitura do formulário e escrita dos resultados no DOM
│   ├── controllers/        # Liga a view ao service e trata o envio do formulário
│   ├── scripts/            # Ponto de entrada de cada página
│   ├── templates/          # Páginas HTML de cada API
│   └── types/              # Tipos compartilhados (ex.: status de disponibilidade)
├── dist/                   # Arquivos JS gerados pelo build (não versionado)
├── package.json
└── tsconfig.json
```

### Fluxo de funcionamento

1. O **script** da página cria o service, a view e o controller.
2. O **service** executa um `healthCheck()`, que consulta `availability()` da API e verifica se o status é `available`.
3. O **controller** registra o evento de envio do formulário.
4. Ao clicar em **Send**, o service cria uma sessão (`create()`) e envia o texto para o modelo (`prompt()`, `summarize()`, `detect()` ou `translate()`).
5. A **view** mostra o status e o resultado na tela.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [@types/dom-chromium-ai](https://www.npmjs.com/package/@types/dom-chromium-ai) — tipagens das APIs de Built-in AI do Chrome
- [http-server](https://www.npmjs.com/package/http-server) — servidor estático local
- [concurrently](https://www.npmjs.com/package/concurrently) — execução paralela dos scripts de desenvolvimento

## Observações

- A **Summarizer API** só cria a sessão quando há uma interação do usuário (clique), por exigência do próprio Chrome.
- O tradutor está fixo em **inglês → português**; para outros idiomas, altere `sourceLanguage` e `targetLanguage` em `src/services/translatorApi.ts`.
- Todo o processamento acontece **no dispositivo**: os textos digitados não saem do navegador.

## Referências

- [Built-in AI — Chrome for Developers](https://developer.chrome.com/docs/ai/built-in)
- [Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
- [Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
- [Language Detector API](https://developer.chrome.com/docs/ai/language-detection)
- [Translator API](https://developer.chrome.com/docs/ai/translator-api)