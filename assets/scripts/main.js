import {
  analisarVagas,
  criarCandidato,
  encontrarMelhorVaga,
  gerarRecomendacaoDeEstudo,
} from "./motor.js";
import { obterVagas, recuperarPerfil, salvarPerfil } from "./dados.js";
import {
  exibirErrosDoFormulario,
  limparResultados,
  limparErrosDoFormulario,
  obterDadosDoFormulario,
  preencherFormularioComPerfil,
  renderizarEstadoDasVagas,
  renderizarResultados,
  validarDadosDoPerfil,
} from "./ui.js";

const formulario = document.getElementById("perfil-form");

let estadoAplicacao = {
  status: "carregando",
  vagas: [],
  erro: null,
  candidato: null,
  analises: [],
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
    analises: [],
  };

  renderizarEstadoDasVagas("carregando");

  const resultadoVagas = await obterVagas();

  estadoAplicacao = {
    ...estadoAplicacao,
    ...resultadoVagas,
  };

  renderizarEstadoDasVagas(
    estadoAplicacao.status,
    estadoAplicacao.erro,
  );
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

  limparResultados();

  if (estadoAplicacao.status !== "sucesso") {
    renderizarEstadoDasVagas(
      estadoAplicacao.status,
      estadoAplicacao.erro,
    );
    return;
  }

  const analises = analisarVagas(candidato, estadoAplicacao.vagas);
  const melhorVaga = encontrarMelhorVaga(analises);
  const recomendacao = gerarRecomendacaoDeEstudo(analises);

  estadoAplicacao = {
    ...estadoAplicacao,
    analises,
  };

  renderizarResultados(analises, melhorVaga, recomendacao, candidato);
}

formulario.addEventListener("submit", tratarEnvioDoPerfil);
inicializar();
