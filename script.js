document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const gameModeSelect = document.getElementById("game-mode");
    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");
    const restartButton = document.querySelector(".restart");

    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameActive = true;
    let mode = "pvp";
    let score = { X: 0, O: 0 };
    const maxWins = 5; // Set the maximum number of wins

    // Winning combinations
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Check for winner
    function checkWinner() {
        for (let combo of winCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                return board[a];
            }
        }
        return board.includes("") ? null : "Tie";
    }

    // Update score
    function updateScore(winner) {
        if (winner !== "Tie") {
            score[winner]++;
            scoreX.textContent = `Player X: ${score.X}`;
            scoreO.textContent = `Player O: ${score.O}`;
        }

        // Check if a player has reached the maximum wins
        if (score[winner] >= maxWins) {
            alert(`${winner} has won the game by reaching ${maxWins} wins!`);
            gameActive = false; // Stop the game
        }
    }

    // Set the maximum number of wins
    function setMaxWins(maxWins) {
        return maxWins;
    }

    // Set the maximum number of wins
    setMaxWins(maxWins);

    // Reset the board and scores
    function resetGame() {
        board.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        gameActive = true;
        score = { X: 0, O: 0 };
        scoreX.textContent = `Player X: ${score.X}`;
        scoreO.textContent = `Player O: ${score.O}`;
    }

    // Handle AI move
    function aiMove() {
        let availableMoves = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
        if (availableMoves.length > 0) {
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove] = "O";
            cells[randomMove].textContent = "O";
            currentPlayer = "X";
        }
    }

    // Handle cell click
    function handleCellClick(e) {
        const index = Array.from(cells).indexOf(e.target);

        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        let winner = checkWinner();
        if (winner) {
            updateScore(winner);
            if (winner !== "Tie") {
                setTimeout(() => alert(`${winner} wins!`), 100);
            } else {
                setTimeout(() => alert("It's a tie!"), 100);
            }
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (mode === "pve" && currentPlayer === "O") {
            setTimeout(aiMove, 300); // AI move after short delay
        }
    }

    // Event listeners
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));

    // Restart game
    restartButton.addEventListener("click", resetGame);

    // Change game mode
    gameModeSelect.addEventListener("change", (e) => {
        mode = e.target.value;
        resetGame();
    });
});
