const questions = [
    {
        //1
        question: '¿Quién es el protagonista principal en la leyenda del Silbón?',
        image: '../img/silbon.png',
        answers: [
            { text: 'Un campesino', correct: false },
            { text: 'Un cazador', correct: false },
            { text: 'Un fantasma errante', correct: true },
            { text: 'Un jinete misterioso', correct: false }
        ]
    },
    {
        question: '¿Cuál es el principal atractivo del Mohán según la leyenda?',
        image: '../img/mohan.png',
        answers: [
            { text: 'Su canto melodioso', correct: false },
            { text: 'Su habilidad para transformarse', correct: false },
            { text: 'Su gran riqueza', correct: false },
            { text: 'Sus poderes mágicos', correct: true }
        ]
    },
    {
        question: '¿Cuál es el propósito del Chullachaqui al engañar a los viajeros?',
        image: '../img/mitoChullachaqui.png',
        answers: [
            { text: 'Proteger la selva', correct: false },
            { text: 'Castigar a los curiosos', correct: true },
            { text: 'Robar sus pertenencias', correct: false },
            { text: 'Jugar bromas inofensivas', correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let allQuestionsCorrect = false;

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    allQuestionsCorrect = false;
    showQuestion(questions[currentQuestionIndex]);
}
function goBack() {
    // Cambia la URL según tu estructura de carpetas y archivos
    window.location.href = '../html/mapa.html';
}
function showQuestion(question) {
    questionText.innerText = question.question;
    const imageElement = document.getElementById('question-image');
    imageElement.src = question.image;
    imageElement.alt = `Imagen de la pregunta: ${question.question}`;

    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    const correct = answer.correct;
    if (correct) {
        // Incrementa el contador de respuestas correctas
        correctAnswers++;
    }

    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = 'block';
    } else {
        checkAllQuestionsCorrect()
    }
}
function checkAllQuestionsCorrect() {
    if (correctAnswers === questions.length) {
        allQuestionsCorrect = true;
    }
    showResultMessage();
}
function showResultMessage() {
    nextButton.style.display = 'none';
    let resultMessage;
    if (allQuestionsCorrect) {
        resultMessage = `¡Aprobado! Puntaje final: ${correctAnswers}/${questions.length}`;
    } else {
        resultMessage = `Reprobado. Puntaje final: ${correctAnswers}/${questions.length}`;
    }
    Swal.fire({
        title: 'Resultado',
        text: resultMessage,
        icon: (correctAnswers === questions.length) ? 'success' : 'error',
        confirmButtonText: 'Cerrar',
        showCancelButton: true,
        cancelButtonText: 'Reintentar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El botón "Cerrar" fue clicado
            window.location.href = '../html/mapa.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // El botón "Reintentar" fue clicado
            startGame();
        }
    });
}
// Inicia el juego al cargar la página
startGame();