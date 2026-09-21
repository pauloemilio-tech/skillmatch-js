const CAMPOS_PERFIL = [
  "nome",
  "areaInteresse",
  "habilidades",
  "tempoExperiencia",
];

function obterDadosDoFormulario(formulario) {
  const formData = new FormData(formulario);
  const habilidades = String(formData.get("habilidades") ?? "")
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter((habilidade) => habilidade !== "");
  const tempoExperiencia = String(
    formData.get("tempoExperiencia") ?? "",
  ).trim();

  return {
    nome: String(formData.get("nome") ?? "").trim(),
    areaInteresse: String(formData.get("areaInteresse") ?? "").trim(),
    habilidades,
    tempoExperiencia:
      tempoExperiencia === "" ? Number.NaN : Number(tempoExperiencia),
  };
}

function validarDadosDoPerfil(dados) {
  const erros = {};

  if (dados.nome === "") {
    erros.nome = "Informe seu nome.";
  }

  if (dados.areaInteresse === "") {
    erros.areaInteresse = "Informe sua área de interesse.";
  }

  if (dados.habilidades.length === 0) {
    erros.habilidades = "Informe pelo menos uma habilidade.";
  }

  if (
    !Number.isFinite(dados.tempoExperiencia) ||
    dados.tempoExperiencia < 0
  ) {
    erros.tempoExperiencia = "Informe um tempo de experiência válido.";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}

function limparErrosDoFormulario() {
  CAMPOS_PERFIL.forEach((campo) => {
    const controle = document.getElementById(campo);
    const mensagem = document.getElementById(`erro-${campo}`);

    controle?.removeAttribute("aria-invalid");

    if (mensagem) {
      mensagem.textContent = "";
    }
  });

  const mensagemGeral = document.getElementById("mensagem-formulario");

  if (mensagemGeral) {
    mensagemGeral.textContent = "";
  }
}

function exibirErrosDoFormulario(erros) {
  limparErrosDoFormulario();

  Object.entries(erros).forEach(([campo, erro]) => {
    const controle = document.getElementById(campo);
    const mensagem = document.getElementById(`erro-${campo}`);

    controle?.setAttribute("aria-invalid", "true");

    if (mensagem) {
      mensagem.textContent = erro;
    }
  });

  const mensagemGeral = document.getElementById("mensagem-formulario");

  if (mensagemGeral && Object.keys(erros).length > 0) {
    mensagemGeral.textContent = "Revise os campos indicados.";
  }
}

function preencherFormularioComPerfil(perfil) {
  if (!perfil || typeof perfil !== "object") {
    return;
  }

  const nome = document.getElementById("nome");
  const areaInteresse = document.getElementById("areaInteresse");
  const habilidades = document.getElementById("habilidades");
  const tempoExperiencia = document.getElementById("tempoExperiencia");

  if (nome) {
    nome.value = perfil.nome ?? "";
  }

  if (areaInteresse) {
    areaInteresse.value = perfil.areaInteresse ?? "";
  }

  if (habilidades) {
    habilidades.value = Array.isArray(perfil.habilidades)
      ? perfil.habilidades.join(", ")
      : "";
  }

  if (tempoExperiencia) {
    tempoExperiencia.value = perfil.tempoExperiencia ?? "";
  }
}

export {
  exibirErrosDoFormulario,
  limparErrosDoFormulario,
  obterDadosDoFormulario,
  preencherFormularioComPerfil,
  validarDadosDoPerfil,
};
