// Factory function for players
const createPlayer = (name, symbol) => {
    return { name, symbol };
};

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");


// Module Pattern for gameboard
const gameboard = (() => {
    const _cells = [null, null, null, null, null, null, null, null, null ];

    const showCells = () => {
        console.log(_cells);
    }
    const setCells = (index, symbol) => {
        _cells[index] = symbol;
    };
    const reset = () => {
        _cells.forEach((element, index, array) => {
            array[index] = null;
        });
        console.log("Resetting game....");
        console.log("....");
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
        gameboard.setCells(index, _currentPlayer.symbol);
    };
    const switchPlayer = () => {
        _currentPlayer = (_currentPlayer == p1) ? p2 : p1;
        console.log(`Switched to ${p2.name}'s turn.`)
    };
    const  getCurrentPlayer = () => _currentPlayer;
    
    return { startGame, switchPlayer, getCurrentPlayer, setPlayerMove };
})(player1, player2);

gameController.startGame();
gameController.setPlayerMove(2);
gameboard.showCells();
gameController.switchPlayer();
gameController.setPlayerMove(0);
gameboard.showCells();
gameboard.reset();