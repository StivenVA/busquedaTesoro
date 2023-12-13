import showClue from "../js/showClue.js";
const code = "665-WRK-992";

const questions = [

    {
        question: '¿Cuál es el nombre de la mujer que protagoniza la leyenda de la Llorona en los Llanos Orientales?',
        image: '../img/llorona2.jpeg',
        answers: [
            { text: 'Esperanza', correct: false },
            { text: 'María', correct: true },
            { text: 'Carmen', correct: false },
            { text: 'Isabella', correct: false }
        ]
    },
    {
        question: '¿Qué se dice que hace el Mohán si alguien intenta atraparlo?',
        image: '../img/mohan.png',
        answers: [
            { text: 'Convierte al perseguidor en piedra', correct: false },
            { text: 'Le concede un deseo', correct: false },
            { text: 'Desaparece en el río', correct: true },
            { text: 'Lanza una maldición', correct: false }
        ]
    },
    {
        //3
        question: '¿Cuál es el castigo que lleva el Silbón según la leyenda?',
        image: '../img/silbon2.jpg',
        answers: [
            { text: 'Cargar con cadenas eternamente', correct: false },
            { text: 'Vagar sin rumbo fijo', correct: false },
            { text: 'Ser perseguido por perros salvajes', correct: true },
            { text: 'Ser condenado a la soledad eterna', correct: false }
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
        confirmButtonText: allQuestionsCorrect?"Seguir":'Cerrar',
        showCancelButton: true,
        cancelButtonText: 'Reintentar'
    }).then((result) => {
        if (result.isConfirmed) {
            if (allQuestionsCorrect){
                showClue.showClue(code);
            }
            else window.location.href = '../html/mapa.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // El botón "Reintentar" fue clicado
            startGame();
        }
    });
}
// Inicia el juego al cargar la página
startGame();
window.nextQuestion = nextQuestion;