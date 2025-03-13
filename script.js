
const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
}

// Check for winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            status.textContent = `🎉 Player ${boardState[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!boardState.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Handle cell click
board.addEventListener("click", (e) => {
    if (!gameActive) return;

    const clickedCell = e.target;
    const index = clickedCell.dataset.index;

    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
});

// Reset game
resetButton.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    gameActive = true;
});
