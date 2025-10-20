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

let words = ["banana", "maçarico", "feijoada", "sopranos", "dougzinho"];

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