import { VagaFrontEnd } from "./motor.js";

const CAMINHO_VAGAS = "assets/data/vagas.json";
const CHAVE_PERFIL = "skillmatch-perfil";

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

function salvarPerfil(perfil) {
  localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
}

function recuperarPerfil() {
  try {
    const perfil = localStorage.getItem(CHAVE_PERFIL);

    return perfil === null ? null : JSON.parse(perfil);
  } catch {
    return null;
  }
}

export {
  carregarVagas,
  criarInstanciasDeVagas,
  obterVagas,
  recuperarPerfil,
  salvarPerfil,
};
