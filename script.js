const createPlayer = (name, symbol) => {
    return { name, symbol };
};

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

console.log(player2);