const questions = [
//agregar pregunta llorona
    {
        question: '¿Cómo se describe físicamente al Mohán en la mitología de los Llanos Orientales?',
        image: '../img/mohan.png',
        answers: [
            { text: 'Un hombre atractivo con larga cabellera', correct: true },
            { text: 'Un hombre alto y delgado', correct: false },
            { text: 'Un ser peludo con cuernos', correct: false },
            { text: 'Un anciano de aspecto sabio', correct: false }
        ]
    },
    {
        //2
        question: '¿Qué se dice que anuncia la presencia del Silbón según la leyenda?',
        image: '../img/silbon.png',
        answers: [
            { text: 'Un lamento lastimero', correct: false },
            { text: 'Un silbido agudo', correct: true },
            { text: 'El aullido de un lobo', correct: false },
            { text: 'El sonido de campanas lejanas', correct: false }
        ]
    },
    {
        question: '¿Cuál es la supuesta razón por la cual la Llorona llora en la leyenda?',
        image: '../img/llorona.png',
        answers: [
            { text: 'Por la pérdida de su fortuna', correct: false },
            { text: 'Por la muerte de sus hijos', correct: true },
            { text: 'Por haber sido abandonada', correct: false },
            { text: 'Por la pérdida de su esposo', correct: false }
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