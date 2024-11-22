export default class Ferramenta {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    usar(objeto) {
        return `Você usou a ${this.nome} no ${objeto}.`;
    }
}
