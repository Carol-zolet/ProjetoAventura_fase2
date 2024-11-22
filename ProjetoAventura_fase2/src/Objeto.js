export default class Objeto {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    usar() {
        return `Você usou ${this.nome}.`;
    }
}
