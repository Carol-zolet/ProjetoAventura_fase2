import Ferramenta from './Ferramenta.js';

export default class Chave extends Ferramenta {
    constructor() {
        super("Chave", "Uma chave dourada que pode abrir portas.");
    }

    usar(objetivo) {
        if (objetivo === "porta") {
            return "Você usou a chave para abrir a porta!";
        }
        return "A chave não pode ser usada aqui.";
    }
}
