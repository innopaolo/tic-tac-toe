// Factory function for players
const createPlayer = (name, symbol) => {
    return { name, symbol };
};

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");


// Module Pattern for gameboard
const gameboard = (() => {
    const _cells = ["X", "X", "X", "X", "X", "X", "X", "X", "X" ];
    console.log(_cells);
})();

// Module pattern for gameController
const gameController = ((p1, p2) => {
    let currentPlayer = null;

    const startGame = () => {
        currentPlayer = p1;
        console.log(`Game start. ${p1.name} goes first.`);
    };
    const switchPlayer = () => {
        currentPlayer = (currentPlayer == p1) ? p2 : p1;
        console.log(`Switched to ${p2.name}'s turn.`)
    };
    const  getCurrentPlayer = () => currentPlayer;
    
    return { startGame, switchPlayer, getCurrentPlayer };
})(player1, player2);

gameController.startGame();
gameController.switchPlayer(player1, player2);
console.log(gameController.getCurrentPlayer());