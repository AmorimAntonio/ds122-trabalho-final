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

const displayText = document.getElementById('displayText'); // área onde as palavras são mostradas
const playerInput = document.getElementById('playerInput'); // input do jogador
const feedback = document.getElementById('feedback'); // feedback de acerto/erro
const scoreValue = document.getElementById('scoreValue'); // pontuação
const timerDisp = document.getElementById('timer'); // display do timer
const btnPause = document.getElementById('btnPause'); // botão de pausar

// ------------------ Funções --------------------- //



// função para iniciar o timer
function startTimer() {
    clearInterval(timerInterval); // limpa qualquer timer existente
    timerDisp.textContent = String(timeLeft).padStart(2, '0');  // inicializa display, padstart para sempre ter 2 digitos pelo menos
    
    // inicia o timer
    timerInterval = setInterval(() => {
        timeLeft--; // decrementa 1 segundo
        timerDisp.textContent = String(timeLeft).padStart(2, '0'); // atualiza display
        if (timeLeft <= 0) { // se o tempo acabar
            clearInterval(timerInterval);
            // feedback.textContent = '⏰ Tempo esgotado';
              flashFeedback('⏰ Tempo esgotado'); // 0 mantém o texto
            playerInput.disabled = true;
        }
    }, 1000);
}

// função para parar o timer
function stopTimer() {
    clearInterval(timerInterval);
}

// função para pausar o timer
btnPause.addEventListener("click", function(){
    if (btnClick){
        startTimer();
        btnClick = 0;
        playerInput.disabled = false;
    }
    else{
        stopTimer();
        btnClick = 1;
        playerInput.disabled = true;
    }
}) 

// função para resetar o timer
function resetTimer(seconds = timeLeft) {
    stopTimer();
    timeLeft = seconds;
    timerDisp.textContent = String(timeLeft).padStart(2, '0');
}

// função para dar feedback visual
function flashFeedback(txt) {
    feedback.textContent = '';               // torna vazio para quebrar o estado :not(:empty)
    requestAnimationFrame(() => {            // na próxima frame recria o conteúdo
        feedback.textContent = txt;
    });
}


// função que gera 4 palavras aleatórias
function genBlock(n) {
    if (wList.length < n) {
        wList = [...words].sort(() => Math.random() - 0.5); // reembaralha se acabar as palavras
    }
    //splice modifica o array original, removendo os primeiros n elementos e retorna os novos
    return wList.splice(0, n);
}

// renderiza todas as linhas (cada linha é um bloco)
function renderLines(lines) {
    displayText.innerHTML = 
    lines.map(block => `<div class="line">${block.map(w => `<span>${w}</span>`).join(' ')}</div>`).join('');
    // faz cada linha ser uma div, e cada palavra um span, unidas por espaços
}

// ---------------------------------------- // 


// embaralhar palavras
let wList = [...words].sort(() => Math.random() - 0.5); //[...words] cria cópia
let indexWord = 0;  // controla qual palavra o jogador deve digitar
let score = 0;

// variáveis do timer
let timeLeft = 60; // tempo inicial em segundos do timer
let timerInterval = null; //setinterval
let btnClick = 0; // boolean para pausar/despausar

// inicializa 4 linhas
let lines = [genBlock(10), genBlock(10), genBlock(10), genBlock(10)];
let currentBlock = lines[0];
renderLines(lines);

// inicia o timer ao começar o jogo
startTimer();

// detecta quando o jogador aperta uma tecla (no caso, olhamos para o espaço)
playerInput.addEventListener('keyup', function(event) {

    //Se o player apertar espaço
    if (event.code === 'Space') {
        // input do usuario
        const input = playerInput.value.trim();
        // palavra que o usuario deve digitar
        const expecWord = currentBlock[indexWord].trim();
        // pega os spans da primeira linha
        const firstline = displayText.querySelector('.line');
        const spans = firstline.querySelectorAll('span');
        // span alvo
        const targetSpan = spans[indexWord];


        if (input === expecWord) {
            targetSpan.style.color = "rgba(117, 150, 0, 1)";
            flashFeedback('✅');;
            score+=10;
            scoreValue.textContent = score;
        } else {
            targetSpan.style.color = "rgba(191, 38, 0, 1)";
            flashFeedback('❌');;
        }

        // avança para a próxima palavra
        indexWord++;
        // limpa o input
        playerInput.value = '';

        
        if (indexWord >= currentBlock.length) {
            lines.shift(); // remove a linha atual
            lines.push(genBlock(10)); // adiciona uma nova linha
            currentBlock = lines[0]; // aponta qual é a linha atual
            indexWord = 0;
            renderLines(lines); // atualizando o dom
        }
  }
});


