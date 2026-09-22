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

const formatadorDeMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function criarParagrafo(rotulo, valor, classe = "") {
  const paragrafo = document.createElement("p");

  if (classe) {
    paragrafo.className = classe;
  }

  const destaque = document.createElement("strong");
  destaque.textContent = `${rotulo}: `;
  paragrafo.append(destaque, document.createTextNode(valor));

  return paragrafo;
}

function formatarListaDeHabilidades(habilidades, alternativa) {
  return Array.isArray(habilidades) && habilidades.length > 0
    ? habilidades.join(", ")
    : alternativa;
}

function criarCardVaga(analise, melhorVaga) {
  const { vaga } = analise;
  const card = document.createElement("article");
  const classificacaoNormalizada = String(analise.classificacao)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const ehMelhorVaga = vaga.id === melhorVaga?.vaga?.id;

  card.className = `job-card job-card--${classificacaoNormalizada}`;

  if (ehMelhorVaga) {
    card.classList.add("job-card--best");
    const selo = document.createElement("p");
    selo.className = "job-card__best-label";
    selo.textContent = "Melhor compatibilidade";
    card.append(selo);
  }

  const titulo = document.createElement("h3");
  titulo.textContent = vaga.cargo;

  const empresa = document.createElement("p");
  empresa.className = "job-card__company";
  empresa.textContent = vaga.empresa;

  const percentual = criarParagrafo(
    "Compatibilidade",
    `${analise.percentual}%`,
    "job-card__percentage",
  );

  const classificacao = criarParagrafo(
    "Classificação",
    analise.classificacao,
  );

  card.append(
    titulo,
    empresa,
    criarParagrafo("Modalidade", vaga.modalidade),
    criarParagrafo("Salário", formatadorDeMoeda.format(vaga.salario)),
    percentual,
    classificacao,
    criarParagrafo(
      "Habilidades encontradas",
      formatarListaDeHabilidades(
        analise.habilidadesCompativeis,
        "Nenhuma",
      ),
    ),
    criarParagrafo(
      "Habilidades faltantes",
      formatarListaDeHabilidades(analise.habilidadesFaltantes, "Nenhuma"),
    ),
  );

  return card;
}

function renderizarResultados(
  analises,
  melhorVaga,
  recomendacao,
  candidato = null,
) {
  const secao = document.getElementById("resultados");
  const resumo = document.getElementById("resumo-resultados");
  const lista = document.getElementById("lista-vagas");

  if (!secao || !resumo || !lista) {
    return;
  }

  resumo.replaceChildren();
  lista.replaceChildren();

  if (!Array.isArray(analises) || analises.length === 0 || !melhorVaga) {
    resumo.append(
      criarParagrafo(
        "Resultado",
        "Não há vagas disponíveis para analisar.",
      ),
    );
    secao.hidden = false;
    return;
  }

  const tituloResumo = document.createElement("h3");
  tituloResumo.textContent = "Resumo da análise";
  resumo.append(
    tituloResumo,
    criarParagrafo("Melhor vaga", melhorVaga.vaga.cargo),
    criarParagrafo("Melhor compatibilidade", `${melhorVaga.percentual}%`),
    criarParagrafo("Recomendação de estudo", recomendacao),
  );

  if (candidato && Number.isFinite(candidato.tempoExperiencia)) {
    resumo.append(
      criarParagrafo(
        "Tempo de experiência informado",
        `${candidato.tempoExperiencia} ano(s)`,
      ),
    );
  }

  analises.forEach((analise) => {
    lista.append(criarCardVaga(analise, melhorVaga));
  });

  secao.hidden = false;
}

function limparResultados() {
  const secao = document.getElementById("resultados");
  const resumo = document.getElementById("resumo-resultados");
  const lista = document.getElementById("lista-vagas");

  resumo?.replaceChildren();
  lista?.replaceChildren();

  if (secao) {
    secao.hidden = true;
  }
}

function renderizarEstadoDasVagas(status, erro = null) {
  const mensagem = document.getElementById("estado-vagas");

  if (!mensagem) {
    return;
  }

  const mensagens = {
    carregando: "Carregando vagas...",
    vazio: "Não há vagas disponíveis no momento.",
    erro: erro
      ? `Não foi possível carregar as vagas. ${erro}`
      : "Não foi possível carregar as vagas.",
    sucesso: "",
  };

  mensagem.textContent = mensagens[status] ?? "";
  mensagem.hidden = status === "sucesso";
  mensagem.classList.toggle("jobs-status--error", status === "erro");
}

export {
  criarCardVaga,
  exibirErrosDoFormulario,
  limparResultados,
  limparErrosDoFormulario,
  obterDadosDoFormulario,
  preencherFormularioComPerfil,
  renderizarEstadoDasVagas,
  renderizarResultados,
  validarDadosDoPerfil,
};
