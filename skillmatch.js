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

for (let i = 0; i < vagas.length; i++) {
  const percentual = calcularCompatibilidade(candidato, vagas[i]);

  console.log(vagas[i].cargo);
  console.log(percentual);
  console.log(classificarCompatibilidade(percentual));
}
