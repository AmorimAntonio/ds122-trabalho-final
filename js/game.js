// ------------------ Elementos DOM --------------------- //

const displayText = document.getElementById('displayText'); // área onde as palavras são mostradas
const playerInput = document.getElementById('playerInput'); // input do jogador
const feedback = document.getElementById('feedback'); // feedback de acerto/erro
const scoreValue = document.getElementById('scoreValue'); // pontuação
const timerDisp = document.getElementById('timer'); // display do timer
const btnPause = document.getElementById('btnPause'); // botão de pausar
const pauseMenu = document.getElementById('pauseMenu'); // menu de pausa
const btnResume = document.getElementById('btnResume'); // botão de voltar
const btnRestart = document.getElementById('btnRestartFromPause'); // botão de reiniciar
const btnLangPt = document.getElementById('btnLangPt'); // botão de idioma português
const btnLangEn = document.getElementById('btnLangEn'); // botão de idioma inglês
const btnLangFr = document.getElementById('btnLangFr'); // botão de idioma francês



// ------------------ Funções --------------------- //

// função para iniciar o timer
function startTimer() {
    clearInterval(timerInterval); // limpa qualquer timer existente
    timerDisp.textContent = String(timeLeft).padStart(2, '0');   
    // inicializa display, padstart para sempre ter 2 digitos pelo menos 
    
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


// função para resetar o timer
function resetTimer(seconds = timeLeft) {
    stopTimer();
    timeLeft = seconds;
    timerDisp.textContent = String(timeLeft).padStart(2, '0');
}

// função para parar o timer
function stopTimer() {
    clearInterval(timerInterval);
}

// mostra o menu de pausa
function showPauseMenu() {
    pauseMenu.hidden = false;
    stopTimer();
    playerInput.disabled = true;
}

// sai  do menu de pausa
function hidePauseMenu() {
    pauseMenu.hidden = true;
    startTimer();
    playerInput.disabled = false;
}

// reinicia o jogo
function restartGame() {
    stopTimer();
    resetTimer(60); // tempo inicial
    score = 0;
    scoreValue.textContent = score;
    indexWord = 0;
    playerInput.value = '';
    playerInput.disabled = false;
    wList = [...words].sort(() => Math.random() - 0.5);
    lines = [genLine(10), genLine(10), genLine(10), genLine(10)];
    currentLine = lines[0];
    renderLines(lines);
    startTimer();
    feedback.textContent = '';
}


// função para alternar o idioma
function setLanguage(lang) {
    if (lang === 'en') {
        words = wordsEn; 
    }
    else if (lang === 'fr') {
        words = wordsFR;
    
    } else {
        words = wordsPT;
    }

    // reinicia linhas/estado com as palavras do respectivo idioma
    wList = [...words].sort(() => Math.random() - 0.5);
    indexWord = 0;
    lines = [genLine(10), genLine(10), genLine(10), genLine(10)];
    currentLine = lines[0];
    renderLines(lines);
    playerInput.value = '';
}


// função para dar feedback visual
function flashFeedback(txt) {
    feedback.textContent = '';               
    // torna vazio para quebrar o estado :not(:empty) no CSS
    requestAnimationFrame(() => {            
        // recria o text para reiniciar a animação
        feedback.textContent = txt;
    });
}


// função que gera palavras aleatórias
function genLine(n) {
    if (wList.length < n) {
        // reembaralha se acabar as palavras
        wList = [...words].sort(() => Math.random() - 0.5); 
    }
    //splice modifica o array original, removendo 
    // os primeiros n elementos e retorna os novos
    return wList.splice(0, n);
}

// renderiza todas as linhas (cada linha é um bloco)
function renderLines(lines) {
    displayText.innerHTML = 
    lines.map(block => `<div class="line">${block.map(w => `<span>${w}</span>`)
    .join(' ')}</div>`).join('');
    // faz cada linha ser uma div, e cada palavra um span, unidas por espaços
}

// função que retorna a linha
function getCurrentLine() {
    return displayText.querySelector('.line');
}

// função que retorna a lista de spans da linha atual
function getCurrentLineSpans() {
    const line = getCurrentLine();
    return line.querySelectorAll('span');
}

// função que marca o span como correto ou incorreto
function markTargetSpan(isCorrect) {
    const spans = getCurrentLineSpans();
    if (isCorrect) {
        spans[indexWord].style.color = "rgba(117, 150, 0, 1)";
    } else {
        spans[indexWord].style.color = "rgba(191, 38, 0, 1)";
    }
}

// função que lida com o tratamento de um bloco quando o jogador 
// completa todas as palavras da linha
function nextLine() {
    lines.shift(); // remove a linha atual
    lines.push(genLine(10)); // adiciona uma nova linha
    currentLine = lines[0]; // aponta qual é a linha atual
    indexWord = 0; // reseta o índice da palavra
    renderLines(lines); // atualiza o dom
}

// processa o input quando o jogador aperta espaço
function processSpaceInput() {
    // input do usuario
    const input = playerInput.value.trim();
    // palavra que o usuario deve digitar
    const expecWord = currentLine[indexWord].trim();
    let isCorrect;
    // verifica se a palavra tá correta
    if (input === expecWord)  isCorrect = true;
    else isCorrect = false;
    
    // marca o span alvo como verde ou vermelho
    markTargetSpan(isCorrect);

    if (isCorrect) {
        flashFeedback('✅');
        score += 10;
        scoreValue.textContent = score;
    } else {
        flashFeedback('❌');
    }

    // avança para a próxima palavra
    indexWord++;
    // limpa o input
    playerInput.value = '';

    // checa se o bloco foi completado
    if (indexWord >= currentLine.length) {
        nextLine();
    }
}


// ------------------ Variáveis --------------------- //

// embaralhar palavras
let wList = [...wordsPT].sort(() => Math.random() - 0.5); //[...wordsPT] cria cópia
let indexWord = 0;  // controla qual palavra o jogador deve digitar
let score = 0;

// variáveis do timer
let timeLeft = 60; // tempo inicial em segundos do timer
let timerInterval = null; //setinterval

// inicializa 4 linhas
let lines = [genLine(10), genLine(10), genLine(10), genLine(10)];
let currentLine = lines[0];
renderLines(lines);

// inicia o timer ao começar o jogo
startTimer();



// ------------------ Eventos --------------------- //

// liga os botões do pause menu
btnResume.addEventListener('click', function() {
    hidePauseMenu();
});


btnRestart.addEventListener('click', function() {
    restartGame();
    hidePauseMenu();
});

// exibindo menu de pausa ao clicar no botão
btnPause.addEventListener('click', showPauseMenu);


// permitir Esc para alternar menu de pausa
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!pauseMenu.hidden) {
            hidePauseMenu();
        } else {
            showPauseMenu();
        }
    }
});

// alterna os idiomas
btnLangPt.addEventListener('click', function () { setLanguage('pt'); });
btnLangEn.addEventListener('click', function () { setLanguage('en'); });
btnLangFr.addEventListener('click', function () { setLanguage('fr'); });



// detecta quando o jogador aperta o espaço (ou enter) 
playerInput.addEventListener('keyup', function(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        processSpaceInput();
    }

});

