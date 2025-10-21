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
