// Factory function for players and initialize two players
const createPlayer = (name, symbol, points) => {
    return { name, symbol, points };
};

let player1 = createPlayer("Player 1", "X", 0);
let player2 = createPlayer("Player 2", "O", 0);


// Global variables and DOM manipulation
const numberOfWins = 3;
const player1Element = document.querySelector("#player1");
const player2Element = document.querySelector("#player2");

player1Element.addEventListener("click", () => {
    const input = document.querySelector(".hidden-content input");
    input.style.display = "block";
    input.focus();
});

player2Element.addEventListener("click", () => {
    const input = document.querySelector("#hidden-input2");
    input.style.display = "block";
    input.focus();
    console.log(input);
});




// Module Pattern for gameBoard
const gameBoard = (() => {
    const _cells = [null, null, null, null, null, null, null, null, null];

    const _winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const _checkWinner = (symbol) => {
        return _winningCombinations.some(combination => {
            return combination.every(index => _cells[index] === symbol);
        });
    };

    const _ultimateVictoryCondition = (player) => {
        if (player.points === numberOfWins) {
            console.log(`${player.name} has !!Ultimate Victory!!`);
        }
    };

    // Checks if every cell does not hold the value null
    const _checkForTie = () => {
        if (_cells.every(cell => cell !== null )) {
            return true;
        } else {
            return false;
        }
    }; 

    const setCells = (index, player) => {
        if (_cells[index] === null) {
            _cells[index] = player.symbol;
        } else {
            console.log("Square already marked! Choose another cell bub");
        }

        // Set win condition
        if (_checkWinner(player.symbol)) {
            player.points++;
            console.log(`${player.name} wins this round!`);
            console.log(`${player.name} won ${player.points} times.`);
            _ultimateVictoryCondition(player);
        }
        if (_checkForTie()) {
            console.log("It's a tie!");
        }
    };

    const showCells = () => {
        console.log(_cells);
    };

    const reset = () => {
        _cells.forEach((element, index, array) => {
            array[index] = null;
        });
        console.log("Resetting game.....................");
        console.log("....taking longer than expected....");
        console.log(_cells);
    };

    return { showCells, setCells, reset };
})();



// Module pattern for gameController
const gameController = ((p1, p2) => {
    let _currentPlayer = null;

    const startGame = () => {
        _currentPlayer = p1;
        console.log(`Game start. ${p1.name} goes first.`);
    };

    const setPlayerMove = (index) => {
        console.log(`${_currentPlayer.name} marking his square...`)
        gameBoard.setCells(index, _currentPlayer);
    };

    const switchPlayer = () => {
        _currentPlayer = (_currentPlayer == p1) ? p2 : p1;
        console.log(`Switched to ${_currentPlayer.name}'s turn.`)
    };

    const getCurrentPlayer = () => _currentPlayer;
    
    return { startGame, switchPlayer, getCurrentPlayer, setPlayerMove };
})(player1, player2);

// gameController.startGame();
// gameController.setPlayerMove(0);
// gameBoard.showCells();
// gameController.switchPlayer();
// gameController.setPlayerMove(2);
// gameBoard.showCells();
// gameController.switchPlayer();
// gameController.setPlayerMove(1);
// gameBoard.showCells();
// gameController.switchPlayer();
// gameController.setPlayerMove(4);
// gameBoard.showCells();
// gameController.switchPlayer();
// gameController.setPlayerMove(7);
// gameBoard.showCells();
// gameController.switchPlayer();
// gameController.setPlayerMove(6);
// gameBoard.showCells();

// gameBoard.reset();