import Objeto from './Objeto.js';

export default class Livro extends Objeto {
    constructor() {
        super("Livro", "Um livro de mistérios.");
    }

    ler() {
        return "O livro contém uma pista!";
    }
}
