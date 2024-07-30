document.addEventListener("DOMContentLoaded", () => {
    const board = Array.from(document.querySelectorAll(".cell"));
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameActive = true;
    const boardState = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = board.indexOf(cell);

        if (boardState[cellIndex] || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (boardState.every(cell => cell)) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (currentPlayer === "O") {
            aiMove();
        }
    }

    function aiMove() {
        const emptyCells = boardState
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        boardState[randomIndex] = "O";
        board[randomIndex].textContent = "O";

        if (checkWinner()) {
            alert("Player O wins!");
            gameActive = false;
            return;
        }

        if (boardState.every(cell => cell)) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = "X";
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function resetGame() {
        currentPlayer = "X";
        gameActive = true;
        boardState.fill(null);
        board.forEach(cell => (cell.textContent = ""));
    }

    board.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
