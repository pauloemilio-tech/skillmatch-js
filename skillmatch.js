const candidato = {
  nome: "Paulo Emilio",
  areaInteresse: "Desenvolvimento Front-End",
  habilidades: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Git"],
  tempoExperiencia: 2,
  disponivelParaRemoto: true,
};

console.log(candidato.nome);
console.log(candidato.areaInteresse);
console.log(candidato.tempoExperiencia);

for (let i = 0; i < candidato.habilidades.length; i++) {
  console.log(candidato.habilidades[i]);
}

class Vaga {
  constructor(empresa, cargo, requisitos) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaRemota extends Vaga {
  constructor(empresa, cargo, requisitos, beneficioRemoto) {
    super(empresa, cargo, requisitos);
    this.beneficioRemoto = beneficioRemoto;
  }

  exibirResumo() {
    return `${super.exibirResumo()} - Vaga remota. Benefício remoto: ${this.beneficioRemoto}`;
  }
}

const vagas = [
  new Vaga(
    "TechNova",
    "Desenvolvedor Front-End Júnior",
    ["HTML", "CSS", "JavaScript", "React", "Git"],
  ),
  new VagaRemota(
    "CodeFlow",
    "Desenvolvedor React Júnior",
    ["JavaScript", "React", "TypeScript", "Git", "Jest"],
    "Auxílio home office",
  ),
  new Vaga(
    "WebStart",
    "Desenvolvedor Web Júnior",
    ["HTML", "CSS", "JavaScript", "Vue", "Figma"],
  ),
];

for (let i = 0; i < vagas.length; i++) {
  console.log(vagas[i].exibirResumo());
}

function encontrarHabilidadesCompativeis(candidato, vaga) {
  return vaga.requisitos.filter((habilidade) =>
    candidato.habilidades.includes(habilidade),
  );
}

function encontrarHabilidadesFaltantes(candidato, vaga) {
  return vaga.requisitos.filter(
    (habilidade) => !candidato.habilidades.includes(habilidade),
  );
}

function calcularCompatibilidade(candidato, vaga) {
  if (vaga.requisitos.length === 0) {
    return 0;
  }

  const habilidadesCompativeis = encontrarHabilidadesCompativeis(
    candidato,
    vaga,
  );

  return Math.round(
    (habilidadesCompativeis.length / vaga.requisitos.length) * 100,
  );
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => {
    const habilidadesCompativeis = encontrarHabilidadesCompativeis(
      candidato,
      vaga,
    );
    const habilidadesFaltantes = encontrarHabilidadesFaltantes(candidato, vaga);
    const percentual = calcularCompatibilidade(candidato, vaga);
    const classificacao = classificarCompatibilidade(percentual);

    return {
      vaga,
      habilidadesCompativeis,
      habilidadesFaltantes,
      percentual,
      classificacao,
    };
  });
}

function encontrarMelhorVaga(analises) {
  return analises.reduce((melhorAnalise, analiseAtual) => {
    if (analiseAtual.percentual > melhorAnalise.percentual) {
      return analiseAtual;
    }

    return melhorAnalise;
  });
}

function gerarRecomendacaoDeEstudo(analises) {
  const habilidadesFaltantes = [];

  for (let i = 0; i < analises.length; i++) {
    for (let j = 0; j < analises[i].habilidadesFaltantes.length; j++) {
      habilidadesFaltantes.push(analises[i].habilidadesFaltantes[j]);
    }
  }

  if (habilidadesFaltantes.length === 0) {
    return "Seu perfil atende a todos os requisitos das vagas analisadas.";
  }

  const contagemHabilidades = habilidadesFaltantes.reduce(
    (contagem, habilidade) => {
      if (contagem[habilidade]) {
        contagem[habilidade]++;
      } else {
        contagem[habilidade] = 1;
      }

      return contagem;
    },
    {},
  );

  let habilidadePrioritaria = habilidadesFaltantes[0];

  for (let i = 1; i < habilidadesFaltantes.length; i++) {
    const habilidadeAtual = habilidadesFaltantes[i];

    if (
      contagemHabilidades[habilidadeAtual] >
      contagemHabilidades[habilidadePrioritaria]
    ) {
      habilidadePrioritaria = habilidadeAtual;
    }
  }

  return `Priorize o estudo de ${habilidadePrioritaria}, pois essa habilidade aparece como requisito faltante em ${contagemHabilidades[habilidadePrioritaria]} vaga(s).`;
}

function processarAnalises(analises, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("O callback informado não é uma função.");
  }

  for (let i = 0; i < analises.length; i++) {
    callback(analises[i]);
  }
}

function exibirAnalise(analise) {
  const habilidadesFaltantes =
    analise.habilidadesFaltantes.length > 0
      ? analise.habilidadesFaltantes.join(", ")
      : "Nenhuma";

  console.log(`Empresa: ${analise.vaga.empresa}`);
  console.log(`Cargo: ${analise.vaga.cargo}`);
  console.log(`Requisitos: ${analise.vaga.requisitos.join(", ")}`);
  console.log(`Percentual: ${analise.percentual}%`);
  console.log(`Classificação: ${analise.classificacao}`);
  console.log(
    `Habilidades compatíveis: ${analise.habilidadesCompativeis.join(", ")}`,
  );
  console.log(`Habilidades faltantes: ${habilidadesFaltantes}`);
}

function carregarVagas() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (vagas.length > 0) {
        resolve(vagas);
      } else {
        reject(new Error("Nenhuma vaga foi encontrada."));
      }
    }, 1000);
  });
}

async function executarSkillMatch() {
  console.log("Carregando vagas...");

  try {
    const vagasCarregadas = await carregarVagas();

    console.log(`Vagas carregadas: ${vagasCarregadas.length}`);
  } catch (erro) {
    console.error(`Erro ao carregar vagas: ${erro.message}`);
  }
}

const analises = analisarVagas(candidato, vagas);

console.log(analises);

processarAnalises(analises, exibirAnalise);

const melhorVaga = encontrarMelhorVaga(analises);

console.log(melhorVaga.vaga.empresa);
console.log(melhorVaga.vaga.cargo);
console.log(melhorVaga.percentual);
console.log(melhorVaga.classificacao);

const recomendacao = gerarRecomendacaoDeEstudo(analises);

console.log(recomendacao);

executarSkillMatch();
