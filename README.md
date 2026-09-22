# SkillMatch Web

## Descrição

O SkillMatch Web é uma aplicação que analisa a compatibilidade entre o perfil de uma pessoa candidata e vagas fictícias de Front-End. A partir das habilidades informadas, o sistema calcula o percentual de compatibilidade, identifica habilidades encontradas e faltantes, destaca a melhor vaga e gera uma recomendação de estudo.

## Funcionalidades

- Cadastro de perfil com nome, área de interesse, habilidades e tempo de experiência;
- validação do formulário com mensagens de erro por campo;
- persistência e recuperação do perfil com `localStorage`;
- carregamento das vagas por meio da Fetch API;
- análise do perfil em relação a todas as vagas;
- classificação da compatibilidade como Alta, Média ou Baixa;
- identificação de habilidades compatíveis e faltantes;
- destaque da vaga com maior compatibilidade;
- recomendação de uma habilidade prioritária para estudo;
- criação dinâmica dos cards de resultados;
- tratamento dos estados de carregamento, sucesso, vazio e erro;
- layout responsivo para dispositivos móveis e telas maiores;
- recursos básicos de acessibilidade;
- metadados básicos de SEO.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- ES Modules
- Fetch API
- localStorage
- JSON
- Git
- GitHub

O projeto não utiliza frameworks ou bibliotecas externas.

## Estrutura do projeto

```text
skillmatch-js/
├── index.html
├── skillmatch.js
├── assets/
│   ├── data/
│   │   └── vagas.json
│   ├── scripts/
│   │   ├── main.js
│   │   ├── motor.js
│   │   ├── ui.js
│   │   └── dados.js
│   ├── styles/
│   │   └── index.style.css
│   └── img/
└── README.md
```

`skillmatch.js` corresponde à versão anterior executada no console. O arquivo foi preservado como histórico da evolução para o SkillMatch Web e não é carregado pela aplicação web atual.

Responsabilidades dos módulos:

- `motor.js`: contém as classes e a lógica de domínio, incluindo análise, classificação, melhor vaga e recomendação;
- `ui.js`: lê e valida o formulário, apresenta mensagens e cria os elementos da interface no DOM;
- `dados.js`: carrega as vagas e gerencia a persistência do perfil;
- `main.js`: mantém o estado da aplicação e coordena dados, domínio e interface.

## Como executar

Como o projeto utiliza ES Modules e Fetch API, ele deve ser executado por meio de um servidor local.

Uma opção simples é utilizar o Visual Studio Code com a extensão Live Server:

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão Live Server, caso ainda não esteja disponível.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

A aplicação será aberta no navegador usando um endereço de servidor local.

## Como utilizar

1. Preencha o nome da pessoa candidata.
2. Informe a área de interesse.
3. Digite as habilidades separadas por vírgulas, por exemplo: `HTML, CSS, JavaScript, Git`.
4. Informe o tempo de experiência em anos.
5. Clique em **Analisar perfil**.
6. Consulte os cards para verificar percentuais, classificações e habilidades encontradas ou faltantes.
7. Confira no resumo a melhor vaga e a recomendação de estudo.

## Conceitos de JavaScript aplicados

- Classes e construtores;
- herança com `extends` e `super`;
- uso de `this`;
- sobrescrita de método;
- métodos de array `map()`, `filter()` e `reduce()`;
- callback;
- closure;
- assincronismo com `async/await`;
- requisições com `fetch()`;
- módulos com `import` e `export`;
- manipulação dinâmica do DOM;
- eventos de formulário;
- persistência com `localStorage`.

## Arquitetura

A aplicação está organizada em quatro responsabilidades principais:

- **Domínio:** regras de compatibilidade, classes e análise das vagas em `motor.js`;
- **dados:** carregamento do arquivo JSON e persistência do perfil em `dados.js`;
- **interface:** formulário, validação, mensagens e renderização dos resultados em `ui.js`;
- **orquestração:** inicialização, estado e integração entre os módulos em `main.js`.

Essa separação evita que regras de negócio sejam misturadas com acesso a dados ou manipulação do DOM.

## Acessibilidade e responsividade

O formulário utiliza labels associadas aos campos, mensagens de erro específicas, `aria-invalid` e `aria-describedby`. As mensagens e os resultados dinâmicos possuem regiões apropriadas para tecnologias assistivas, e o foco é direcionado ao primeiro campo inválido após uma tentativa de envio.

O layout foi desenvolvido com abordagem mobile-first e Flexbox. Os cards são exibidos em uma coluna em telas pequenas e em duas colunas em telas maiores, sem depender de rolagem horizontal.

## Persistência

O perfil válido é salvo no navegador com `localStorage`. O objeto é convertido para texto com `JSON.stringify()` e recuperado com `JSON.parse()`. Quando um perfil salvo está disponível, seus dados são preenchidos novamente no formulário.

## Dados das vagas

As vagas são armazenadas em `assets/data/vagas.json` e carregadas pela Fetch API. Após o carregamento, cada registro é convertido em uma instância de `VagaFrontEnd` antes de ser enviado ao motor de compatibilidade.

A aplicação trata os estados de carregamento, sucesso, catálogo vazio e erro de leitura.

## Git e organização

O desenvolvimento utilizou a branch `develop`, feature branches, pull requests e commits descritivos para organizar e revisar as diferentes etapas da implementação.

## Uso de Inteligência Artificial

ChatGPT e Codex foram utilizados como ferramentas de apoio durante o planejamento, a revisão do código, a geração inicial de alguns trechos, a execução de testes e a elaboração da documentação.

O código produzido foi revisado, os testes foram executados e as decisões técnicas e validações foram realizadas pelo desenvolvedor. Ajustes manuais foram aplicados sempre que necessário para manter a implementação alinhada aos requisitos do projeto.

## Vídeo de apresentação

[Adicionar link do vídeo aqui]

## Autor

Paulo Emilio
