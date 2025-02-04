import promptSync from 'prompt-sync'; // Importa o prompt-sync
import JogoDemo from './src/JogoDemo.js'; // Importa a classe principal do jogo

const prompt = promptSync(); // Inicializa o prompt

// Criação e inicialização do jogo
const jogo = new JogoDemo();
jogo.criaCenario();
console.log("Iniciando o jogo...");
console.log("Bem-vindo ao jogo de aventura!");
console.log("Comandos disponíveis:");
console.log("- mover <direção>: Move para uma sala na direção especificada.");
console.log("- pegar <item>: Pega um item na sala atual.");
console.log("- listar livros: Lista os livros disponíveis na biblioteca.");
console.log("- buscar livro <título>: Encontra informações sobre um livro.");
console.log("- usar <item> [objetivo]: Usa um item do inventário em algo específico (opcional).");
console.log("- inventario: Lista os itens no inventário.");
console.log("- sair: Encerra o jogo.");

// Loop principal do jogo
while (true) {
    const comando = prompt("Digite um comando: ").trim(); // Lê o comando do usuário
    const [acao, ...resto] = comando.toLowerCase().split(" "); // Divide o comando e argumentos
    const argumento = resto.join(" "); // Junta os argumentos restantes

    let resultado;

    try {
        switch (acao) {
            case "mover":
                if (!argumento) {
                    resultado = "Por favor, especifique uma direção (norte, sul, leste, oeste).";
                } else {
                    resultado = jogo.moverPara(argumento);
                }
                break;

            case "pegar":
                if (!argumento) {
                    resultado = "Por favor, especifique o item que deseja pegar.";
                } else {
                    resultado = jogo.pegarItem(argumento);
                }
                break;

            case "listar":
                if (argumento === "livros" && jogo.salaAtual.listarLivros) {
                    resultado = jogo.salaAtual.listarLivros();
                } else if (argumento === "inventario") {
                    resultado = jogo.listarInventario();
                } else {
                    resultado = "Comando inválido. Use 'listar livros' ou 'listar inventario'.";
                }
                break;

            case "buscar":
                if (argumento.startsWith("livro") && jogo.salaAtual.buscarLivro) {
                    const titulo = argumento.replace("livro ", "").trim();
                    resultado = jogo.salaAtual.buscarLivro(titulo);
                } else {
                    resultado = "Comando inválido ou você não está na biblioteca.";
                }
                break;

            case "usar":
                if (!argumento) {
                    resultado = "Por favor, especifique o item que deseja usar.";
                } else {
                    const [itemNome, objetivo] = argumento.split(" ");
                    if (!jogo.inventario.includes(itemNome)) {
                        resultado = `Você não tem o item '${itemNome}' no inventário.`;
                    } else {
                        resultado = jogo.usarItem(itemNome, objetivo || null);
                    }
                }
                break;

            case "inventario":
                resultado = jogo.listarInventario();
                break;

            case "sair":
                console.log("Encerrando o jogo. Até a próxima!");
                process.exit(0);

            default:
                resultado = `Comando inválido. Comandos válidos: 
                - mover <direção>
                - pegar <item>
                - listar livros
                - buscar livro <título>
                - usar <item> [objetivo]
                - inventario
                - sair`;
        }

        console.log(resultado);

        // Condição de vitória
        if (jogo.salaAtual && jogo.salaAtual.nome === "Tesouro") {
            console.log("Parabéns! Você encontrou o tesouro!");
            break;
        }
    } catch (error) {
        console.error("Ocorreu um erro: ", error.message);
    }
}
