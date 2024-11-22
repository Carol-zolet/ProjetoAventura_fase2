export default class Sala {
    constructor(nome, descricao) {
        this.nome = nome; // Nome da sala
        this.descricao = descricao; // Descrição da sala
        this.portas = new Map(); // Conexões com outras salas
        this.ferramentas = new Map(); // Ferramentas presentes na sala
        this.objetos = new Map(); // Objetos presentes na sala
    }

    // Adicionar conexão para outra sala
    adicionarPorta(direcao, sala) {
        this.portas.set(direcao, sala);
    }

    // Adicionar ferramenta à sala
    adicionarFerramenta(nome, ferramenta) {
        this.ferramentas.set(nome, ferramenta);
    }

    // Adicionar objeto à sala
    adicionarObjeto(nome, objeto) {
        this.objetos.set(nome, objeto);
    }

    // Retornar descrição da sala
    getDescricao() {
        return `${this.descricao}\nPortas disponíveis: ${Array.from(this.portas.keys()).join(", ")}`;
    }

    // Usar uma ferramenta na sala
    usarFerramenta(nome) {
        const ferramenta = this.ferramentas.get(nome);
        if (ferramenta) {
            return ferramenta.usar("porta"); // Exemplo de uso
        }
        return "Ferramenta não encontrada nesta sala.";
    }

    // Listar ferramentas disponíveis na sala
    listarFerramentas() {
        if (this.ferramentas.size > 0) {
            return `Ferramentas disponíveis: ${Array.from(this.ferramentas.keys()).join(", ")}`;
        }
        return "Nenhuma ferramenta disponível nesta sala.";
    }

    // Listar objetos disponíveis na sala
    listarObjetos() {
        if (this.objetos.size > 0) {
            return `Objetos disponíveis: ${Array.from(this.objetos.keys()).join(", ")}`;
        }
        return "Nenhum objeto disponível nesta sala.";
    }

    // Pegar um objeto da sala
    pegarObjeto(nome) {
        if (this.objetos.has(nome)) {
            const objeto = this.objetos.get(nome);
            this.objetos.delete(nome);
            return `Você pegou o objeto: ${nome}.`;
        }
        return "Objeto não encontrado nesta sala.";
    }
}


