document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById("gamebord");
    const statusBtn = document.getElementById("statusbtn");
    const restartBtn = document.getElementById("resatrtbtn");
    const boxes = document.querySelectorAll(".box");

    const winningBoxes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = true;

    function initializeGame() {
        boxes.forEach(box => box.addEventListener("click", boxClicked));
        restartBtn.addEventListener("click", restartGame);
        statusBtn.textContent = `${currentPlayer}'s turn`;
    }

    function boxClicked() {
        const id = this.getAttribute("id");
        if (options[id] !== "" || !running) {
            return;
        }
        updateBox(this, id);
        checkWinner();
    }

    function updateBox(box, index) {
        options[index] = currentPlayer;
        box.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusBtn.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner() {
        for (let i = 0; i < winningBoxes.length; i++) {
            const [a, b, c] = winningBoxes[i];
            if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
                statusBtn.textContent = `${options[a]} wins!`;
                running = false;
                return;
            }
        }
        if (options.every(option => option !== "")) {
            statusBtn.textContent = "It's a draw!";
            running = false;
        }
    }

    function restartGame() {
        options = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        running = true;
        statusBtn.textContent = `${currentPlayer}'s turn`;
        boxes.forEach(box => {
            box.textContent = "";
        });
    }

    initializeGame();
});

 