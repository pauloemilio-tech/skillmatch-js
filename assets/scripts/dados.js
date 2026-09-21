import { VagaFrontEnd } from "./motor.js";

const CAMINHO_VAGAS = "assets/data/vagas.json";

async function carregarVagas() {
  const response = await fetch(CAMINHO_VAGAS);

  if (!response.ok) {
    throw new Error(`Não foi possível carregar as vagas (${response.status}).`);
  }

  const dados = await response.json();

  if (!Array.isArray(dados)) {
    throw new TypeError("Os dados de vagas devem ser um array.");
  }

  return dados;
}

function criarInstanciasDeVagas(dados) {
  return dados.map(
    ({ id, empresa, cargo, requisitos, salario, modalidade, stack }) =>
      new VagaFrontEnd(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        stack,
      ),
  );
}

async function obterVagas() {
  try {
    const dados = await carregarVagas();

    if (dados.length === 0) {
      return {
        status: "vazio",
        vagas: [],
        erro: null,
      };
    }

    return {
      status: "sucesso",
      vagas: criarInstanciasDeVagas(dados),
      erro: null,
    };
  } catch (erro) {
    return {
      status: "erro",
      vagas: [],
      erro: erro instanceof Error ? erro.message : "Erro desconhecido.",
    };
  }
}

export { carregarVagas, criarInstanciasDeVagas, obterVagas };
