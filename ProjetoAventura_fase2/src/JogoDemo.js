import SalaEntrada from './SalaEntrada.js';
import SalaCozinha from './SalaCozinha.js';
import SalaBiblioteca from './SalaBiblioteca.js';
import SalaTesouro from './SalaTesouro.js';
import Livro from './Livro.js';
import Chave from './Chave.js';
import Lanterna from './Lanterna.js';

export default class JogoDemo {
    constructor() {
        this.salas = new Map();
        this.inventario = new Map();
        this.salaAtual = null;
    }

    criaCenario() {
        // Instanciar as salas
        const entrada = new SalaEntrada();
        const cozinha = new SalaCozinha();
        const biblioteca = new SalaBiblioteca();
        const tesouro = new SalaTesouro();

        // Conectar salas
        entrada.adicionarPorta("leste", biblioteca);
        biblioteca.adicionarPorta("oeste", entrada);
        biblioteca.adicionarPorta("leste", cozinha);
        cozinha.adicionarPorta("oeste", biblioteca);
        cozinha.adicionarPorta("leste", tesouro);
        tesouro.adicionarPorta("oeste", cozinha);

        // Adicionar ferramentas e objetos
        entrada.adicionarFerramenta("Lanterna", new Lanterna());
        biblioteca.adicionarFerramenta("Chave", new Chave());
        cozinha.adicionarObjeto("Livro Antigo", new Livro());

        // Adicionar salas ao mapa
        this.salas.set("Entrada", entrada);
        this.salas.set("Biblioteca", biblioteca);
        this.salas.set("Cozinha", cozinha);
        this.salas.set("Tesouro", tesouro);

        // Definir a sala inicial
        this.salaAtual = entrada;
    }

    moverPara(direcao) {
        const novaSala = this.salaAtual.portas.get(direcao);
        if (novaSala) {
            this.salaAtual = novaSala;
            return `Você se moveu para a ${novaSala.nome}.`;
        }
        return "Você não pode ir nessa direção.";
    }

    pegarItem(nome) {
        const item = this.salaAtual.ferramentas.get(nome);
        if (item) {
            this.inventario.set(nome, item);
            this.salaAtual.ferramentas.delete(nome);
            return `Você pegou o item: ${nome}.`;
        }
        return "Item não encontrado nesta sala.";
    }

    jogar() {
        console.log("Bem-vindo ao jogo de aventura! Use 'mover <direção>' ou 'pegar <item>' para interagir.");
        this.criaCenario();
    }
}
