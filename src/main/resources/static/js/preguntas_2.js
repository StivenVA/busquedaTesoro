let cardsOpen = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let successes = 0;
let timer = false;
let time = 60;
let startTime = time;
let regressiveTimeId = null;

let showMovements = document.getElementById('movements');
let showSuccesses = document.getElementById('successes');
let showTime = document.getElementById('time');

let winAudio = new Audio('../sounds/win.wav');
let loseAudio = new Audio('../sounds/lose.wav');
let clickAudio = new Audio('../sounds/click.wav');
let rightAudio = new Audio('../sounds/right.wav');
let wrongAudio = new Audio('../sounds/wrong.wav');

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() -0.5});
console.log(numbers);

function countTime(){
    regressiveTimeId = setInterval(()=>{
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;

        if (time == 0){
            clearInterval(regressiveTimeId);
            blockCards();
            loseAudio.play();
            showTime.innerHTML = `¡Perdiste! Se ha terminado el tiempo`;
        }
    }, 1000)
}

function blockCards(){
    for (let i=0; i<=15; i++){
        let blockCard = document.getElementById(i);
        blockCard.innerHTML = `<img src="../img/${numbers[i]}.png">`;
        blockCard.disabled = true;
    }
}
function uncover(id){
    if (timer == false){
        countTime();
        timer = true;
    }

    cardsOpen++;

    if (cardsOpen == 1){
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="../img/${firstResult}.png">`;
        clickAudio.play();

        card1.disabled = true;
    }else if (cardsOpen == 2){
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="../img/${secondResult}.png">`;

        card2.disabled = true;
        movements++;

        showMovements.innerHTML = `Movimientos: ${movements}`;

        if (firstResult == secondResult){
            cardsOpen = 0;
            successes++;
            showSuccesses.innerHTML = `Aciertos: ${successes}`;
            rightAudio.play();

            if (successes == 8){
                winAudio.play();
                clearInterval(regressiveTimeId);
                showSuccesses.innerHTML  = `Aciertos: ${successes} :o!!`;
                showTime.innerHTML = `Fantástico!! solo demoraste ${startTime - time} segundos`;
                showMovements.innerHTML = `Movimientos: ${movements} :)`;
            }
        }else{
            wrongAudio.play();
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                cardsOpen = 0;

            },800)
        }
    }
}