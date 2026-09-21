import { criarCandidato } from "./motor.js";
import { obterVagas, recuperarPerfil, salvarPerfil } from "./dados.js";
import {
  exibirErrosDoFormulario,
  limparErrosDoFormulario,
  obterDadosDoFormulario,
  preencherFormularioComPerfil,
  validarDadosDoPerfil,
} from "./ui.js";

const formulario = document.getElementById("perfil-form");

let estadoAplicacao = {
  status: "carregando",
  vagas: [],
  erro: null,
  candidato: null,
};

async function inicializar() {
  const perfilSalvo = recuperarPerfil();

  if (perfilSalvo) {
    preencherFormularioComPerfil(perfilSalvo);
    estadoAplicacao = {
      ...estadoAplicacao,
      candidato: perfilSalvo,
    };
  }

  estadoAplicacao = {
    ...estadoAplicacao,
    status: "carregando",
    vagas: [],
    erro: null,
  };

  const resultadoVagas = await obterVagas();

  estadoAplicacao = {
    ...estadoAplicacao,
    ...resultadoVagas,
  };
}

function tratarEnvioDoPerfil(event) {
  event.preventDefault();

  const dados = obterDadosDoFormulario(formulario);
  const validacao = validarDadosDoPerfil(dados);

  if (!validacao.valido) {
    exibirErrosDoFormulario(validacao.erros);
    return;
  }

  limparErrosDoFormulario();

  const candidato = criarCandidato(
    dados.nome,
    dados.areaInteresse,
    dados.habilidades,
    dados.tempoExperiencia,
  );

  salvarPerfil(candidato);
  estadoAplicacao = {
    ...estadoAplicacao,
    candidato,
  };
}

formulario.addEventListener("submit", tratarEnvioDoPerfil);
inicializar();
