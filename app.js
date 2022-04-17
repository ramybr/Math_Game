// GLOBAL VARIABLES
const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const userAnswer = document.querySelector(".our-input");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");

let state = {
    score: 0,
    wrongAnswers: 0
}

// EVENT LISTENERS
ourForm.addEventListener("submit", handleSubmit)


// FUNCTIONS
function problemUpdate() {
    state.currentProblem = problemGenerator();
    problemElement.innerHTML = `
    ${state.currentProblem.firstNumber} ${state.currentProblem.operator} ${state.currentProblem.secondtNumber} 
    `
    userAnswer.value = "";
    userAnswer.focus();
}

problemUpdate();

// generate random numbers
function numberGenerator(max) {
    return Math.floor(Math.random() * (max + 1));
}

// generate math problem
function problemGenerator() {
    return {
        firstNumber: numberGenerator(10),
        secondtNumber: numberGenerator(10),
        operator: ['+', '-', 'x'][numberGenerator(2)]
    }
}
// submit answer
function handleSubmit(e) {
    e.preventDefault()

    let correctAnswer
    const p = state.currentProblem;
    if (p.operator == '+') {
        correctAnswer = p.firstNumber + p.secondtNumber;
    } else if (p.operator == '-') {
        correctAnswer = p.firstNumber - p.secondtNumber;
    } else if (p.operator == 'x') {
        correctAnswer = p.firstNumber * p.secondtNumber;
    }
    if (parseInt(userAnswer.value, 10) === correctAnswer) {
        state.score++
            pointsNeeded.textContent = 10 - state.score;
        problemUpdate();
        renderProgressBar();

    } else {
        state.wrongAnswers++;
        mistakesAllowed.textContent = 2 - state.wrongAnswers;
    }
    checkLogic()
}
// won or lost
function checkLogic() {
    if (state.score === 10) {
        endMessage.textContent = "Congrats, You Won !"
        resetGame()
    }
    if (state.wrongAnswers === 2) {
        endMessage.textContent = "Sorry, You lost !"

        resetGame()
        renderProgressBar();
    }
}
// reset the game
function resetGame() {
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`;
}