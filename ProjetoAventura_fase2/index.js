import promptSync from 'prompt-sync';
import JogoDemo from './src/JogoDemo.js';

// Inicializar o prompt
const prompt = promptSync();
const jogo = new JogoDemo();
jogo.criaCenario();

console.log("Bem-vindo ao jogo de aventura!");
console.log("Comandos disponíveis:");
console.log("- mover <direção>: Move para uma sala na direção especificada.");
console.log("- pegar <item>: Pega um item na sala atual.");
console.log("- listar livros: Lista os livros disponíveis na biblioteca.");
console.log("- buscar livro <título>: Encontra informações sobre um livro.");
console.log("- usar ferramenta <nome>: Usa uma ferramenta na sala atual.");
console.log("- sair: Encerra o jogo.");

while (true) {
    const comando = prompt("Digite um comando: ");
    const [acao, ...resto] = comando.toLowerCase().split(" "); // Case insensitive
    const argumento = resto.join(" ");

    let resultado;
    switch (acao) {
        case "mover":
            resultado = jogo.moverPara(argumento);
            break;

        case "pegar":
            resultado = jogo.pegarItem(argumento);
            break;

        case "listar":
            if (argumento === "livros" && jogo.salaAtual.listarLivros) {
                resultado = jogo.salaAtual.listarLivros();
            } else {
                resultado = "Comando inválido ou você não está na biblioteca.";
            }
            break;

        case "buscar":
            if (argumento.startsWith("livro") && jogo.salaAtual.buscarLivro) {
                const titulo = argumento.replace("livro ", "");
                resultado = jogo.salaAtual.buscarLivro(titulo);
            } else {
                resultado = "Comando inválido ou você não está na biblioteca.";
            }
            break;

        case "usar":
            if (argumento.startsWith("ferramenta") && jogo.salaAtual.usarFerramenta) {
                const nomeFerramenta = argumento.replace("ferramenta ", "");
                resultado = jogo.salaAtual.usarFerramenta(nomeFerramenta);
            } else {
                resultado = "Comando inválido ou você não pode usar ferramentas nesta sala.";
            }
            break;

        case "sair":
            console.log("Encerrando o jogo. Até a próxima!");
            process.exit(0);

        default:
            resultado = "Comando inválido. Comandos válidos: mover <direção>, pegar <item>, listar livros, buscar livro <título>, usar ferramenta <nome>, sair.";
    }

    console.log(resultado);

    // Condição de vitória
    if (jogo.salaAtual.nome === "Tesouro") {
        console.log("Parabéns! Você encontrou o tesouro!");
        break;
    }
}
