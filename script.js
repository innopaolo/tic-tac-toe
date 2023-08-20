// Factory function for players
const createPlayer = (name, symbol, points) => {
    return { name, symbol, points };
};

const player1 = createPlayer("Player 1", "X", 0);
const player2 = createPlayer("Player 2", "O", 0);



// Module Pattern for gameBoard
const gameBoard = (() => {
    const _cells = [null, null, null, null, null, null, null, null, null];

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const showCells = () => {
        console.log(_cells);
    };
    const _checkWinner = (symbol) => {
        return winningCombinations.some(combination => {
            return combination.every(index => _cells[index] === symbol);
        });
    };
    const _ultimateVictoryCondition = (player) => {
        if (player.points === 3) {
            console.log(`${player.name} has !!Ultimate Victory!!`);
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

gameController.startGame();
gameController.setPlayerMove(0);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(2);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(1);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(4);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(7);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(6);
gameBoard.showCells();

gameBoard.reset();

gameController.startGame();
gameController.setPlayerMove(0);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(2);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(1);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(4);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(7);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(6);
gameBoard.showCells();

gameBoard.reset();

gameController.startGame();
gameController.setPlayerMove(0);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(2);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(1);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(4);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(7);
gameBoard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(6);
gameBoard.showCells();

