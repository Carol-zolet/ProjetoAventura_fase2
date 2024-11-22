import Sala from './Sala.js';

export default class SalaBiblioteca extends Sala {
    constructor() {
        super("Biblioteca", "Você está na biblioteca, rodeado de livros antigos.");
        // Livros específicos da biblioteca
        this.livros = new Map([
            ["Livro Antigo", "Este livro contém uma pista sobre o tesouro."],
            ["Diário de Aventuras", "Há dicas de como usar a chave especial."]
        ]);
        // Configuração de ferramenta necessária e mensagem oculta
        this.ferramentaNecessaria = "lanterna"; 
        this.mensagemOculta = "A chave para o tesouro está escondida na Cozinha.";
    }

    // Retorna a descrição detalhada da sala
    getDescricao() {
        return `${this.descricao} Você vê várias prateleiras cheias de livros.`;
    }

    // Lista os livros disponíveis na biblioteca
    listarLivros() {
        if (this.livros.size > 0) {
            return `Livros disponíveis: ${Array.from(this.livros.keys()).join(", ")}`;
        }
        return "Nenhum livro disponível na biblioteca.";
    }

    // Busca um livro pelo título e retorna sua descrição
    buscarLivro(titulo) {
        if (this.livros.has(titulo)) {
            return `Você encontrou o livro '${titulo}': ${this.livros.get(titulo)}`;
        }
        return "Este livro não está na biblioteca.";
    }

    // Usa uma ferramenta na sala
    usarFerramenta(nomeFerramenta) {
        if (nomeFerramenta.toLowerCase() === this.ferramentaNecessaria.toLowerCase()) {
            return `Ao usar a ${nomeFerramenta}, você revela: "${this.mensagemOculta}"`;
        }
        return "Nada acontece. Talvez você precise de outra ferramenta.";
    }

    // Adiciona um novo livro à biblioteca
    adicionarLivro(nome, descricao) {
        this.livros.set(nome, descricao);
    }
}

