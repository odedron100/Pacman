'use strict'
const WALL = '❌'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🍔';
const BANANA = '🍌';


var isPowerFood;
var gBananaInterval;
var gBoard;
var gNumberOfFood;
var gFoodEat;
var gGame = {
    score: 0,
    isOn: false
}

// document.addEventListener("onkeydown", movePacman);
// function startGame() {
//     var elStartGameModal = document.querySelector('.start-game');
//     elStartGameModal.style.display = 'none';
//     init();
// }

function init() {
    var audio = new Audio('sounds/intro.mp3');
    audio.play();
    gGame.isOn = true
    gBananaInterval = setInterval(createNewBanana, 2000)
    isPowerFood = false;
    gNumberOfFood = 0;
    gFoodEat = 0;
    var elPlayAgainModalContainer = document.querySelector('.modal-container');
    elPlayAgainModalContainer.style.display = 'none';
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.score = 0;
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gNumberOfFood++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gNumberOfFood--;
            }
            if (i === 1 && j === 1 || i === 1 && j === 8
                || i === 8 && j === 8 || i === 8 && j === 1) {
                board[i][j] = POWER_FOOD;
                gNumberOfFood--;
            }
        }
    }
    console.log('gNumberOfFood', gNumberOfFood);
    return board;
}



// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

function createNewBanana() {
    var emptyCells = foundEmptyPlace();
    if (emptyCells.length === 0) return;
    var randomNumInArray = getRandomIntInclusive(0, emptyCells.length);
    var locationBanana = emptyCells[randomNumInArray]
    gBoard[locationBanana.i][locationBanana.j] = BANANA;
    // TODO: update the DOM
    renderCell(locationBanana, BANANA)
    gNumberOfFood = gNumberOfFood + 10;
}

function foundEmptyPlace() {
    var emptyPlacesInBoard = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyPlacesInBoard.push({ i: i, j: j });
            }
        }
    }
    return emptyPlacesInBoard;
}

// TODO
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gBananaInterval);
    gBananaInterval = null;
    gIntervalGhosts = null;
    var elPlayAgainModalContainer = document.querySelector('.modal-container');
    var elScoreMsg = document.querySelector('.score-msg');
    var elPlayAgainModal = document.querySelector('.game-over-modal');

    elPlayAgainModalContainer.style.display = 'block';
    elPlayAgainModal.style.display = 'block';
    elScoreMsg.innerText = `Your score is: ${gGame.score}`
}

function gameDone() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    clearInterval(gBananaInterval);
    gBananaInterval = null;
    var elPlayAgainModalContainer = document.querySelector('.modal-container');
    var elScoreMsg = document.querySelector('.score-msg');
    var gameDoneModal = document.querySelector('.game-over-modal');

    elPlayAgainModalContainer.style.display = 'block';
    gameDoneModal.style.display = 'block';
    elScoreMsg.innerHTML = `WELL DONE!! <br> your score is ${gGame.score}`
}

function restart() {
    init();
}
