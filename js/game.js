const words = [
  "javascript","html","css","programar","teclado","computador","web","codigo","função","variavel",
  "constante","objeto","array","condicional","loop","estrutura","classe","interface","elemento","browser",
  "framework","react","vue","angular","backend","frontend","servidor","cliente","dados","api",
  "json","request","response","pacote","biblioteca","versao","terminal","comando","rede","pacote",
  "navegador","extensao","protocolo","dns","porta","endereco","cache","cookie","session","login",
  "usuario","senha","token","autenticacao","seguranca","criptografia","hash","banco","mysql","postgres",
  "sqlite","mongodb","armazenamento","tabela","coluna","linha","registro","campo","dom","evento","click",
  "input","output","mouse","tecla","espaço","digitar","tempo","pontos","erro","acerto","desafio",
  "pratica","rapido","velocidade","jogo","nivel","progresso","score","ranking","restart","pause",
  "reiniciar","tela","design","interface","ux","ui","script","logica","algoritmo","funcoes","metodo"
];

const displayText = document.getElementById('displayText');
const playerInput = document.getElementById('playerInput');
const feedback = document.getElementById('feedback');
const scoreValue = document.getElementById('scoreValue');

// embaralhar palavras
let wList = [...words].sort(() => Math.random() - 0.5); //[...palavra] cria cópia
let indexWord = 0;  // controla qual palavra o jogador deve digitar
let score = 0;

// função que gera 4 palavras aleatórias
function genBlock(n) {
    if (wList.length < n) {
        wList = [...words].sort(() => Math.random() - 0.5);
    }
    const blockWords = wList.splice(0, n);
    // renderiza cada palavra dentro de um <span> para poder estilizar individualmente
    displayText.innerHTML = blockWords.map(w => `<span>${w}</span>`).join(' ');
    return blockWords;
}

let currentBlock = genBlock(50); // gerando bloco com as palavras iniciais

playerInput.addEventListener('keyup', function(event) {

    //Se o player apertar espaço
    if (event.code === 'Space') {
        // input do usuario
        const input = playerInput.value.trim();
        // palavra que o usuario deve digitar
        const expecWord = currentBlock[indexWord].trim();
        // seleciona o span da palavra atual
        const spans = displayText.querySelectorAll('span');
        // span alvo
        const targetSpan = spans[indexWord];


        if (targetSpan) {
            if (input.toLowerCase() === expecWord.toLowerCase()) {
                targetSpan.style.color = "rgba(117, 150, 0, 1)";
                feedback.textContent = "✅";
                score+=10;
                scoreValue.textContent = score;
            } else {
                targetSpan.style.color = "rgba(191, 38, 0, 1)";
                feedback.textContent = "❌";
            }
        }

        // avança para a próxima palavra
        indexWord++;
        // limpa o input
        playerInput.value = '';

        if (indexWord >= currentBlock.length) {
            currentBlock = genBlock(50);
            indexWord = 0;
        }
  }
});
