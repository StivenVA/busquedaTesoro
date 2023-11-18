const questions = [
    {
        question: '¿Cómo se caracteriza el Chullachaqui en la mitología de los Llanos Orientales?',
        image: '../img/chullachaqui.png',
        answers: [
            { text: 'Un espíritu luminoso', correct: false },
            { text: 'Un ser con una pierna más corta que la otra', correct: true },
            { text: 'Un animal mitológico', correct: false },
            { text: 'Un gigante de la selva', correct: false }
        ]
    },

    {
        question: '¿Qué representa la bola de fuego en la leyenda de los Llanos Orientales?',
        image: '../img/bolaf.png',
        answers: [
            { text: 'Un fenómeno astronómico', correct: false },
            { text: 'El espíritu de un guerrero caído', correct: false },
            { text: 'Una manifestación de la naturaleza', correct: true },
            { text: 'El alma de un ser querido perdido', correct: false }
        ]
    },
    {
        question: '¿Qué se dice que hace la Llorona durante las noches según la leyenda?',
        image: '../img/llorona.png',
        answers: [
            { text: 'Llora buscando a sus hijos', correct: true },
            { text: 'Canta canciones tristes', correct: false },
            { text: 'Baila con los espíritus', correct: false },
            { text: 'Se esconde en las sombras', correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
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

    // Elimina la clase 'selected' de todos los botones
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Agrega la clase 'selected' solo al botón actualmente seleccionado
    button.classList.add('selected');

    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = 'block';
    } else {
        showResultMessage();
    }
}

function showResultMessage() {
    nextButton.style.display = 'none';
    let resultMessage;
    if (correctAnswers === questions.length) {
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
