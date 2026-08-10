# SkillMatch JS

## Sobre o projeto

O SkillMatch JS é um simulador de compatibilidade entre o perfil de uma pessoa candidata e três vagas fictícias de Front-End Júnior. O programa analisa os dados em JavaScript e apresenta um relatório no console.

## Objetivo

O projeto ajuda a identificar quais oportunidades combinam melhor com o perfil informado. Para isso, compara as habilidades da pessoa candidata com os requisitos de cada vaga, calcula o percentual de compatibilidade, aponta conhecimentos já dominados e faltantes, classifica os resultados e recomenda uma prioridade de estudo.

## Funcionalidades

- Cadastro de um perfil de candidato com nome, área de interesse, habilidades, tempo de experiência e disponibilidade para trabalho remoto;
- três vagas fictícias de Front-End Júnior;
- comparação entre as habilidades do candidato e os requisitos das vagas;
- identificação das habilidades compatíveis e faltantes;
- cálculo do percentual de compatibilidade;
- classificação da compatibilidade como Alta, Média ou Baixa;
- identificação da melhor vaga;
- recomendação de uma habilidade para estudo;
- carregamento simulado das vagas;
- tratamento de erros no carregamento e validação do callback;
- relatório completo no console.

## Estrutura do projeto

```text
skillmatch-js/
├── skillmatch.js
└── README.md
```

## Como executar

1. Tenha o [Git](https://git-scm.com/) instalado.
2. Tenha o [Node.js](https://nodejs.org/) instalado.
3. Clone o repositório:

   ```bash
   git clone https://github.com/pauloemilio-tech/skillmatch-js.git
   ```

4. Entre na pasta do projeto:

   ```bash
   cd skillmatch-js
   ```

5. Execute o programa:

   ```bash
   node skillmatch.js
   ```

O projeto não possui dependências externas e, por isso, não exige instalação de pacotes.

## Regra de compatibilidade

Para cada vaga, o percentual é calculado pela fórmula:

```text
quantidade de habilidades compatíveis / quantidade total de requisitos * 100
```

O resultado é arredondado para o número inteiro mais próximo com `Math.round()`. Caso uma vaga não possua requisitos, o percentual retornado é `0`.

## Classificação

- De 80% a 100%: Alta compatibilidade;
- de 50% a 79%: Média compatibilidade;
- de 0% a 49%: Baixa compatibilidade.

## Critério da recomendação de estudo

A função `gerarRecomendacaoDeEstudo()` percorre todas as análises e reúne, em um único array, as habilidades faltantes de cada vaga. Em seguida, utiliza `reduce()` para criar um objeto no qual cada habilidade é associada à sua quantidade de ocorrências.

A habilidade que aparece mais vezes entre os requisitos faltantes é priorizada. A comparação somente troca a prioridade quando encontra uma contagem estritamente maior; portanto, em caso de empate, permanece a primeira habilidade encontrada na ordem das análises. Se nenhuma habilidade estiver faltando, o programa informa que o perfil atende a todos os requisitos das vagas analisadas.

## Conceitos de JavaScript aplicados

- **Strings:** representam nomes, cargos, empresas, habilidades e mensagens; template literals montam os textos do relatório.
- **Números:** armazenam o tempo de experiência, percentuais, índices, contagens e o atraso do carregamento simulado.
- **Booleanos:** são utilizados no perfil do candidato, como em `disponivelParaRemoto`, para representar informações de verdadeiro ou falso.
- **Arrays:** guardam as habilidades, as vagas, os requisitos e os resultados das análises.
- **Objetos:** representam o candidato, cada resultado de análise e a contagem das habilidades faltantes.
- **`const` e `let`:** `const` mantém referências que não são reatribuídas; `let` controla índices dos laços e valores mutáveis, como o contador e a habilidade prioritária.
- **Operadores matemáticos e lógicos:** divisão e multiplicação calculam o percentual; incremento atualiza contagens; comparações, negação e testes condicionais verificam requisitos e resultados.
- **`if-else`:** trata vagas sem requisitos, define a classificação, atualiza contagens e escolhe a recomendação.
- **Laço `for`:** percorre análises e habilidades faltantes, executa o callback e procura a habilidade prioritária.
- **Funções tradicionais:** organizam cálculos, análises, exibição, carregamento e execução do programa.
- **Arrow functions:** são usadas em `filter()`, `map()`, `reduce()`, na criação da `Promise` e no `setTimeout()`.
- **`filter()`:** separa requisitos compatíveis e faltantes.
- **`map()`:** transforma cada vaga em um objeto de análise.
- **`reduce()`:** escolhe a melhor análise e conta as ocorrências das habilidades faltantes.
- **Classes:** modelam vagas comuns e remotas.
- **`constructor`:** inicializa as propriedades de cada vaga criada.
- **Herança:** permite que `VagaRemota` reutilize e especialize `Vaga`.
- **`this`:** acessa as propriedades da instância atual dentro das classes.
- **`super`:** chama o construtor e o resumo da classe base em `VagaRemota`.
- **Callback:** `processarAnalises()` recebe e chama uma função para cada análise.
- **Closure:** o contador preserva a quantidade de análises entre chamadas.
- **`Promise`:** representa o carregamento futuro das vagas e pode ser resolvida ou rejeitada.
- **`async/await`:** permite aguardar o carregamento antes de realizar as análises.
- **`try-catch`:** captura e exibe erros ocorridos durante o carregamento e o fluxo de execução.

## Programação Orientada a Objetos

A classe `Vaga` reúne as propriedades `empresa`, `cargo` e `requisitos`, inicializadas pelo `constructor`, e fornece o método `exibirResumo()`. A classe `VagaRemota` herda de `Vaga`, chama `super()` para inicializar os dados comuns e adiciona o benefício específico do trabalho remoto.

`VagaRemota` sobrescreve `exibirResumo()`: aproveita o texto da classe base com `super.exibirResumo()` e acrescenta as informações de modalidade e benefício. O uso de `this` permite acessar os dados da própria instância. Essa especialização é coerente porque uma vaga remota continua sendo uma vaga, mas possui uma característica adicional.

## Callback

A função `processarAnalises()` recebe as análises e uma função como parâmetros. Depois de verificar se o callback é realmente uma função, percorre o array e executa a função recebida para cada análise. No fluxo atual, `exibirAnalise` é passada como esse callback e apresenta cada resultado no console.

## Closure

`criarContadorDeAnalises()` declara internamente a variável `quantidade` e retorna outra função. A função retornada mantém acesso a essa variável, incrementando-a a cada análise sem depender de uma variável global. Esse comportamento é uma closure.

## Promise e async/await

`carregarVagas()` simula a consulta de informações a um servidor. Ela cria uma `Promise` e usa `setTimeout()` para aguardar um segundo: se existirem vagas, chama `resolve()` com o array; caso contrário, chama `reject()` com um erro.

A função assíncrona `executarSkillMatch()` usa `await` para esperar essa operação antes de analisar os dados. O bloco `try-catch` trata uma eventual falha e apresenta a mensagem de erro no console.

## Arquitetura cliente-servidor

Em uma arquitetura cliente-servidor, o cliente solicita uma informação, o servidor recebe e processa a solicitação e, depois, devolve uma resposta. Este projeto não possui um servidor real: `carregarVagas()` apenas simula a espera e uma resposta que poderia ocorrer nesse tipo de comunicação.

## Como a internet funciona

De forma introdutória, um **cliente** — como um navegador ou aplicativo — envia uma **requisição** pela internet. Um **servidor** recebe essa solicitação, realiza o processamento necessário e envia uma **resposta** com dados ou uma indicação de erro. A internet permite essa comunicação entre dispositivos por meio de redes e protocolos padronizados.

## Organização do projeto

O desenvolvimento foi organizado em um quadro Kanban com as colunas **Backlog**, **A Fazer**, **Em Andamento** e **Concluído**, facilitando o acompanhamento das atividades.

[Quadro Kanban](https://trello.com/b/cVuIqiuE/skillmatch-js-mini-projeto-sctec)

## Versionamento

O desenvolvimento utilizou Git e GitHub, com branches separadas e commits incrementais. As branches utilizadas foram:

- `feature/modelagem`: perfil, classes, herança e vagas;
- `feature/compatibilidade`: regras de análise, compatibilidade, métodos de array, recomendação, Promise, async/await, callback, closure, testes e fluxo final;
- `docs/readme`: documentação final.

## Extensões do VS Code

As extensões abaixo são recomendações opcionais para facilitar o desenvolvimento:

- **Prettier - Code formatter:** formatação e padronização;
- **JavaScript (ES6) code snippets:** atalhos para JavaScript;
- **GitLens:** apoio na visualização do histórico Git.

Nenhuma extensão é necessária para executar o projeto.

## Uso de inteligência artificial

Ferramentas de inteligência artificial foram utilizadas como apoio para organizar etapas, gerar sugestões de implementação, revisar o código, validar requisitos e apoiar a documentação. A inteligência artificial não desenvolveu o projeto sozinha: cada alteração foi executada, o funcionamento foi testado, o código foi revisado e os commits foram realizados de forma incremental.

Todo o conteúdo entregue foi revisado e testado, e compreendo as implementações e decisões utilizadas no projeto.

## Melhorias futuras

- Criar uma interface gráfica;
- integrar o sistema a uma API real de vagas;
- adicionar persistência de candidatos e análises.

## Vídeo de apresentação

[Vídeo de apresentação](https://drive.google.com/file/d/1SmRZB0c_eMjM_OOqyp14-hOXIBuxB3D2/view?usp=sharing)

## Autor

Paulo Emilio
