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

