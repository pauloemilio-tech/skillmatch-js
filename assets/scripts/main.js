import { obterVagas } from "./dados.js";

let estadoAplicacao = {
  status: "carregando",
  vagas: [],
  erro: null,
};

async function inicializar() {
  estadoAplicacao = {
    status: "carregando",
    vagas: [],
    erro: null,
  };

  estadoAplicacao = await obterVagas();
}

inicializar();
