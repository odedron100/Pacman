'use strict'
const PACMAN = '😷';
const PACMAN_LEFT = '<img class="pacman-left" style="backgroundColor:none" src="img/left 2.png" />'
const PACMAN_RIGHT = '<img class="pacman-right" src="img/right.jpeg" />'

var gPacman;
var currPacman = PACMAN_RIGHT;
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = currPacman
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        var audio = new Audio('sounds/Chomp.mp3');
        audio.play();
        updateScore(1)
        gFoodEat++;
        if (gFoodEat === gNumberOfFood) gameDone();
    }

    if (nextCell === BANANA) {
        updateScore(10)
        var audio = new Audio('sounds/Chomp.mp3');
        audio.play();
        gFoodEat++;
        if (gFoodEat === gNumberOfFood) gameDone();
    }

    if (nextCell === POWER_FOOD && !isPowerFood) {
        isPowerFood = true;
        setTimeout(() => isPowerFood = false, 5000)
        updateScore(1)
        gFoodEat++;
    } else if (nextCell === POWER_FOOD && isPowerFood) {
        return;
    }

    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (isPowerFood) {
            removeGhost(nextLocation);
        } else {
            gameOver()
            return
        }
    }
    // TODO: update the model

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = currPacman
    // TODO: update the DOM
    renderCell(nextLocation, currPacman)
}


// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
    }
    return nextLocation;
}

function pacmanFaceSide(ev) {
    switch (ev.key) {
        case 'ArrowUp':
            break
        case 'ArrowDown':
            break
        case 'ArrowLeft':
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN_LEFT
            renderCell(gPacman.location, PACMAN_LEFT)
            currPacman = PACMAN_LEFT;
            break
        case 'ArrowRight':
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN_RIGHT
            renderCell(gPacman.location, PACMAN_RIGHT)
            currPacman = PACMAN_RIGHT;
            break
    }
}
