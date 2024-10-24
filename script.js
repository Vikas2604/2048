const boardSize = 4;
let board = [];
let score = 0;

const gameBoardDiv = document.getElementById('game-board');
const scoreDiv = document.getElementById('score');

// Initialize game
function initGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    addNewTile();
    addNewTile();
    renderBoard();
}

function addNewTile() {
    let emptyTiles = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push([row, col]);
            }
        }
    }

    if (emptyTiles.length > 0) {
        const [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderBoard() {
    gameBoardDiv.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${board[row][col]}`;
            tile.innerHTML = board[row][col] === 0 ? '' : board[row][col];
            gameBoardDiv.appendChild(tile);
        }
    }
    scoreDiv.innerHTML = `Score: ${score}`;
}

// Move tiles in a given direction
function move(direction) {
    let moved = false;
    switch (direction) {
        case 'up':
            for (let col = 0; col < boardSize; col++) {
                moved |= moveColumnUp(col);
            }
            break;
        case 'down':
            for (let col = 0; col < boardSize; col++) {
                moved |= moveColumnDown(col);
            }
            break;
        case 'left':
            for (let row = 0; row < boardSize; row++) {
                moved |= moveRowLeft(row);
            }
            break;
        case 'right':
            for (let row = 0; row < boardSize; row++) {
                moved |= moveRowRight(row);
            }
            break;
    }

    if (moved) {
        addNewTile();
        renderBoard();
        checkGameOver();
    }
}

function moveRowLeft(row) {
    let moved = false;
    for (let col = 1; col < boardSize; col++) {
        if (board[row][col] !== 0) {
            let targetCol = col;
            while (targetCol > 0 && board[row][targetCol - 1] === 0) {
                board[row][targetCol - 1] = board[row][targetCol];
                board[row][targetCol] = 0;
                targetCol--;
                moved = true;
            }
            if (targetCol > 0 && board[row][targetCol - 1] === board[row][targetCol]) {
                board[row][targetCol - 1] *= 2;
                score += board[row][targetCol - 1];
                board[row][targetCol] = 0;
                moved = true;
            }
        }
    }
    return moved;
}

function moveRowRight(row) {
    let moved = false;
    for (let col = boardSize - 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
            let targetCol = col;
            while (targetCol < boardSize - 1 && board[row][targetCol + 1] === 0) {
                board[row][targetCol + 1] = board[row][targetCol];
                board[row][targetCol] = 0;
                targetCol++;
                moved = true;
            }
            if (targetCol < boardSize - 1 && board[row][targetCol + 1] === board[row][targetCol]) {
                board[row][targetCol + 1] *= 2;
                score += board[row][targetCol + 1];
                board[row][targetCol] = 0;
                moved = true;
            }
        }
    }
    return moved;
}

function moveColumnUp(col) {
    let moved = false;
    for (let row = 1; row < boardSize; row++) {
        if (board[row][col] !== 0) {
            let targetRow = row;
            while (targetRow > 0 && board[targetRow - 1][col] === 0) {
                board[targetRow - 1][col] = board[targetRow][col];
                board[targetRow][col] = 0;
                targetRow--;
                moved = true;
            }
            if (targetRow > 0 && board[targetRow - 1][col] === board[targetRow][col]) {
                board[targetRow - 1][col] *= 2;
                score += board[targetRow - 1][col];
                board[targetRow][col] = 0;
                moved = true;
            }
        }
    }
    return moved;
}

function moveColumnDown(col) {
    let moved = false;
    for (let row = boardSize - 2; row >= 0; row--) {
        if (board[row][col] !== 0) {
            let targetRow = row;
            while (targetRow < boardSize - 1 && board[targetRow + 1][col] === 0) {
                board[targetRow + 1][col] = board[targetRow][col];
                board[targetRow][col] = 0;
                targetRow++;
                moved = true;
            }
            if (targetRow < boardSize - 1 && board[targetRow + 1][col] === board[targetRow][col]) {
                board[targetRow + 1][col] *= 2;
                score += board[targetRow + 1][col];
                board[targetRow][col] = 0;
                moved = true;
            }
        }
    }
    return moved;
}

function checkGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) return;
            if (col < boardSize - 1 && board[row][col] === board[row][col + 1]) return;
            if (row < boardSize - 1 && board[row][col] === board[row + 1][col]) return;
        }
    }
    alert('Game Over!');
}

function resetGame() {
    initGame();
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

initGame();
