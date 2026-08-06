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
