class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  encontrarHabilidadesCompativeis(habilidadesCandidato) {
    return this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(requisito),
    );
  }

  encontrarHabilidadesFaltantes(habilidadesCandidato) {
    return this.requisitos.filter(
      (requisito) => !habilidadesCandidato.includes(requisito),
    );
  }

  calcularCompatibilidade(habilidadesCandidato) {
    if (this.requisitos.length === 0) {
      return 0;
    }

    const habilidadesCompativeis =
      this.encontrarHabilidadesCompativeis(habilidadesCandidato);

    return Math.round(
      (habilidadesCompativeis.length / this.requisitos.length) * 100,
    );
  }

  classificarCompatibilidade(percentual) {
    if (percentual >= 80) {
      return "Alta";
    }

    if (percentual >= 50) {
      return "Média";
    }

    return "Baixa";
  }

  analisarCompatibilidade(habilidadesCandidato) {
    const habilidadesCompativeis =
      this.encontrarHabilidadesCompativeis(habilidadesCandidato);
    const habilidadesFaltantes =
      this.encontrarHabilidadesFaltantes(habilidadesCandidato);
    const percentual =
      this.requisitos.length === 0
        ? 0
        : Math.round(
            (habilidadesCompativeis.length / this.requisitos.length) * 100,
          );
    const classificacao = this.classificarCompatibilidade(percentual);

    return {
      habilidadesCompativeis,
      habilidadesFaltantes,
      percentual,
      classificacao,
    };
  }

  obterResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(
    id,
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    stack = [],
  ) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.stack = stack;
  }

  obterResumo() {
    const tecnologias =
      this.stack.length > 0 ? this.stack.join(", ") : "não informada";

    return `${super.obterResumo()} — stack: ${tecnologias}`;
  }
}

function criarCandidato(nome, areaInteresse, habilidades, tempoExperiencia) {
  return {
    nome,
    areaInteresse,
    habilidades,
    tempoExperiencia,
  };
}

function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => ({
    vaga,
    ...vaga.analisarCompatibilidade(candidato.habilidades),
  }));
}

function encontrarMelhorVaga(analises) {
  if (analises.length === 0) {
    return null;
  }

  return analises.reduce((melhorAnalise, analiseAtual) =>
    analiseAtual.percentual > melhorAnalise.percentual
      ? analiseAtual
      : melhorAnalise,
  );
}

function gerarRecomendacaoDeEstudo(analises) {
  const habilidadesFaltantes = analises.reduce(
    (habilidades, analise) => [
      ...habilidades,
      ...analise.habilidadesFaltantes,
    ],
    [],
  );

  if (habilidadesFaltantes.length === 0) {
    return "O candidato já atende aos requisitos analisados.";
  }

  const frequencias = habilidadesFaltantes.reduce((contagem, habilidade) => {
    contagem.set(habilidade, (contagem.get(habilidade) ?? 0) + 1);
    return contagem;
  }, new Map());

  const habilidadePrioritaria = habilidadesFaltantes.reduce(
    (prioritaria, habilidade) =>
      frequencias.get(habilidade) > frequencias.get(prioritaria)
        ? habilidade
        : prioritaria,
  );

  return `Priorize o estudo de ${habilidadePrioritaria}.`;
}

function processarAnalises(analises, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("O callback informado deve ser uma função.");
  }

  analises.forEach(callback);
}

function criarContadorDeAnalises() {
  let quantidade = 0;

  return () => {
    quantidade += 1;
    return quantidade;
  };
}

export {
  Vaga,
  VagaFrontEnd,
  analisarVagas,
  criarCandidato,
  criarContadorDeAnalises,
  encontrarMelhorVaga,
  gerarRecomendacaoDeEstudo,
  processarAnalises,
};
