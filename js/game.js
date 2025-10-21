<<<<<<< HEAD
// words.js
const palavras = [
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
let lista = [...palavras].sort(() => Math.random() - 0.5); //[...palavra] cria cópia
let indicePalavra = 0;  // controla qual palavra o jogador deve digitar
let score = 0;

// função que gera 4 palavras aleatórias
function gerarBloco() {
  if (lista.length < 4) {
    // reembaralha se acabar
    lista = [...palavras].sort(() => Math.random() - 0.5);
  }
  const bloco = lista.splice(0, 4);
  displayText.textContent = bloco.join(' ');
  return bloco;
}

// primeiro bloco
let blocoAtual = gerarBloco();

// evento de digitação
playerInput.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    const entrada = playerInput.value.trim();
    const palavraEsperada = blocoAtual[indicePalavra].trim();

    if (entrada === palavraEsperada) {
      feedback.textContent = "✅";
      score++;
      scoreValue.textContent = score;
    } else {
      feedback.textContent = "❌";
    }

    indicePalavra++;
    playerInput.value = ''; // limpa o campo

    // se terminou as 4 palavras, gera novas
    if (indicePalavra >= blocoAtual.length) {
      blocoAtual = gerarBloco();
      indicePalavra = 0;
    }
  }
});
=======
// Cabeçalho
const scoreBoard = document.getElementById('scoreBoard');
const scoreValue = document.getElementById('scoreValue');
const btnPause = document.getElementById('btnPause');

// Área principal do jogo
const gameArea = document.getElementById('gameArea');
const textContainer = document.getElementById('textContainer');
const displayText = document.getElementById('displayText');
const inputForm = document.getElementById('inputForm');
const playerInput = document.getElementById('playerInput');
const feedback = document.getElementById('feedback');

let score = 0;

let words = ["banana", "maçarico", "labubu", "bicicleta", "alexkutzke"];

randWord();

// Evento principal
inputForm.addEventListener("keyup", function(event) {
  

    // verifica se apertou espaço
    if (event.code === 'Space') {

        event.preventDefault(); // evita o espaço ser digitado no input

        // Captura os valores no momento da tecla
        const playerText = playerInput.value.trim();
        const targetText = displayText.textContent.trim();


        // Verifica se o texto está correto

        if (playerText === targetText) {
            score += 10;
            scoreValue.textContent = score;
            feedback.textContent = "✅";
        } else {
            feedback.textContent = "❌";
        }

    // Limpa o campo de entrada
    playerInput.value = "";
    randWord();


  }

});

function randWord(){
    random = Math.floor(Math.random()*5);
    displayText.textContent = words[random];
}
>>>>>>> 0d09bfee08fe825e8e8d8ad5ee60e4a59a7199c9
