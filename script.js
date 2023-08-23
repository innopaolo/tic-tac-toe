// Factory function for players and initialize two players
const createPlayer = (name, symbol, points, container) => {
    const updateInfo = function() {
        container.textContent = this.name;

        const hrElement = document.createElement("hr");
        const pElement = document.createElement("p");

        pElement.textContent = this.points

        container.appendChild(hrElement);
        container.appendChild(pElement);
    };
    return { name, symbol, points, updateInfo };
};

const pb1 = document.querySelector(".pb1"); // Player info box 1 AKA container
const pb2 = document.querySelector(".pb2"); // Player info box 2 AKA container

let player1 = createPlayer("Player 1", "X", 0, pb1);
let player2 = createPlayer("Player 2", "O", 0, pb2);
let AIplayer = createPlayer("AI player", "O", 0, pb2);


// Global variables and DOM manipulation
const numberOfWins = 3;
const player1Element = document.querySelector("#player1");
const player2Element = document.querySelector("#player2");
const input1 = document.querySelector(".hidden-content input");
const input2 = document.querySelector("#hidden-input2");
const startGameBtn = document.querySelector("#start-game-btn");
const ticTacToe = document.querySelector("#tic-tac-toe-grid");
const returnToStartScreen = document.querySelector("#return-btn");
let isAISelected = false;

player1Element.addEventListener("click", () => {
    input1.style.display = "block";
    input1.focus();
});

player2Element.addEventListener("click", () => {
    AI.toggleAIplayerMode();
    input2.style.display = "block";
    input2.focus();
});

startGameBtn.addEventListener("click", () => {
    
    // Grab if available user inputted name 
    if (input1.value !== "") {
        player1.name = input1.value;
    }
    if (input2.value !== "") {
        player2.name = input2.value;
    } else if (input2.placeholder == "AI player ") {
        player2.name = "AI player";
    }

    // Animate images and start screen out of the way
    const laputaRobot = document.querySelector("#laputa-robot");
    const flowerSkate = document.querySelector("#flower-skate");
    const main = document.querySelector("main");

    laputaRobot.classList.add("move-left");
    flowerSkate.classList.add("move-right");
    setTimeout(() => { flowerSkate.style.display = "none"; }, 1500);
    // Add classList to each child of the main element
    const childElements = main.children;
    for (const child of childElements) {
        child.classList.add("move-down");
    }
    // Ensures start button to animate at the same time as other elements
    startGameBtn.classList.add("disable-hover"); 


    // Animate new images and grid to move to visible area
    const xSymbol = document.querySelector("#x-symbol");
    const oSymbol = document.querySelector("#o-symbol");
    const hiddenPlayArea = document.querySelector("#hidden-play-area");
    const upperXSymbol = document.querySelector("#X-symbol");
    const upperOSymbol = document.querySelector("#O-symbol");

    xSymbol.classList.add("move-bottom");
    oSymbol.classList.add("move-top");
    hiddenPlayArea.classList.add("opacity-visible");
    returnToStartScreen.classList.add("opacity-visible");
    setTimeout(() => { upperOSymbol.classList.add("move-bottom"); }, 1200);
    setTimeout(() => { upperXSymbol.classList.add("move-bottomPlus"); }, 1800);


    // Set player name and points in the player info box
    player1.updateInfo();
    player2.updateInfo();

    gameController.startGame();
});

ticTacToe.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".grid-item");
    if (clickedItem) {
        const dataIndex = clickedItem.dataset.index;
        const currentPlayer = gameController.getCurrentPlayer();

        if (clickedItem.textContent == "") {
            
            // This will update the _cells array
            gameController.setPlayerMove(dataIndex);
            // And this will mark the clicked grid-item
            clickedItem.textContent = currentPlayer.symbol; 

            gameController.switchPlayer();
        }
    }
});

returnToStartScreen.addEventListener( "click", () => location.reload() );


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

    const _getWinningCombination = (player) => {
        for (let combination of _winningCombinations) {
        if (combination.every(index => _cells[index] === player.symbol)) {
            return combination;
        }
    }};

    // Grabs grid items that form a line and adds class to animate
    const _animateWinningGridItems = (combination) => {
        document.querySelectorAll(".grid-item").forEach(item => {
            if (item.dataset.index == combination[0] ||
                item.dataset.index == combination[1] ||
                item.dataset.index == combination[2]) { // No strict equality as data-index is string
                    setTimeout(() => {
                        item.classList.add("winning-line");
                        item.innerHTML = `<div>${item.textContent}</div>`
                    }, 500);
                }
                    // Remove cosmetic changes to grid
                    setTimeout(() => {
                        item.classList.remove("winning-line");
                        item.innerHTML = item.textContent;
                    }, 4500);
        });
    };

    const _disableGridInteraction = (disable) => {
        document.querySelectorAll(".grid-item").forEach(item => {
            if (disable) {
                item.classList.add("disable-interaction");
            } else {
                item.classList.remove("disable-interaction");
            }
        });
    };

    const _ultimateVictoryCondition = (player) => {
        if (player.points === numberOfWins) {
            return true;
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
        }

        // Set win conditions
        if (_checkWinner(player.symbol)) {
            player.points++;
            player.updateInfo();

            const combination = _getWinningCombination(player);
            _animateWinningGridItems(combination);

            // Check if 3 wins has been made
            if (_ultimateVictoryCondition(player)) {
                _disableGridInteraction(true);
                let victoryMessage = document.createElement("h1");
                victoryMessage.textContent = `🏆\nVictory to ${player.name}!`
                victoryMessage.classList.add("resultMessageVictory");
                setTimeout(() => {
                    ticTacToe.appendChild(victoryMessage);
                }, 3500);
                setTimeout(() => {
                    ticTacToe.removeChild(victoryMessage);
                }, 6000);

                // Reset grid then ask if play again
                setTimeout(() => {
                    gameBoard.reset();
                    
                    let playAgain = document.createElement("h1");
                    playAgain.textContent = "Play again?"
                    playAgain.classList.add("resultMessage");
                    ticTacToe.appendChild(playAgain);

                    playAgain.addEventListener("click", () => {
                        _disableGridInteraction(false);
                        gameController.startGame();
                        player1.points = 0;
                        player2.points = 0;
                        player1.updateInfo();
                        player2.updateInfo();
                        ticTacToe.removeChild(playAgain);
                    });
                }, 6000);
            } else {
                _disableGridInteraction(true);
                // Add message for normal win
                let winMessage = document.createElement("h1");
                winMessage.textContent = `${player.name} gets a point!`
                winMessage.classList.add("resultMessageWin");
                setTimeout(() => {
                    ticTacToe.appendChild(winMessage);
                }, 3500);
                setTimeout(() => {
                    ticTacToe.removeChild(winMessage);
                }, 6000);

                // Reset grid then restart game
                setTimeout(() => {
                    gameBoard.reset();
                    gameController.startGame();
                    _disableGridInteraction(false);
                }, 6000);
            }

        } else if (_checkForTie()) {
            _disableGridInteraction(true);
            // Adds class that will animate grid and then remove after
            document.querySelectorAll(".grid-item").forEach(item => {
                setTimeout(() => {
                    item.classList.add("tie");
                    item.innerHTML = `<div>${item.textContent}</div>`
                }, 500);

                setTimeout(() => {
                    item.classList.remove("tie");
                    item.innerHTML = item.textContent;
                }, 4500);
            });

            // Add message to confirm game status before resetting
            let tieMessage = document.createElement("h1");
            tieMessage.textContent = "It's a tie!"
            tieMessage.classList.add("resultMessage");
            setTimeout(() => {
                ticTacToe.appendChild(tieMessage);
            }, 3500);
            setTimeout(() => {
                ticTacToe.removeChild(tieMessage);
            }, 5000);

            // Reset grid then restart game
            setTimeout(() => {
                gameBoard.reset();
                gameController.startGame();
                _disableGridInteraction(false);
            }, 6000);
        }
    };

    const showCells = () => {
        console.log(_cells);
    };

    const reset = () => {
        _cells.forEach((element, index, array) => {
            array[index] = null;
        });
        document.querySelectorAll(".grid-item").forEach(item => {
            item.textContent = "";
        });
    };

    return { showCells, setCells, reset };
})();



// Module pattern for gameController
const gameController = ((p1, p2) => {
    let _currentPlayer = null;

    const startGame = () => {
        _currentPlayer = p1;
        setTimeout( () => {
            pb2.style.boxShadow = "none" 
            pb1.style.boxShadow = "0 0 50px #FFC34C"; 
        }, 1000);
    };

    const setPlayerMove = (index) => {
        gameBoard.setCells(index, _currentPlayer);
    };

    const switchPlayer = () => {
        _currentPlayer = (_currentPlayer == p1) ? p2 : p1;

        // Switch the player info box glow effect depending on current player
        if (_currentPlayer === p2) {
            pb2.style.boxShadow = "0 0 50px #FFC34C";
            pb1.style.boxShadow = "none";
        } else {
            pb1.style.boxShadow = "0 0 50px #FFC34C";
            pb2.style.boxShadow = "none"
        }
    };

    const getCurrentPlayer = () => _currentPlayer;
    
    return { startGame, switchPlayer, getCurrentPlayer, setPlayerMove };
})(player1, player2);


// Module pattern for AI functionality
const AI = (() => {
    const minimax = (board, depth, isMaximizing) => {

    };

    const findBestMove = (board) => {

    };

    const toggleAIplayerMode = () => {
        isAISelected = !isAISelected;

        if (isAISelected) {
            input2.value = ""; // Erases any typed name to show placeholder
            input2.placeholder = "AI player "; // Extra space to add right padding 
            input2.readOnly = true; // Prevent edit so players can see if they chose AI
        } else {
            input2.placeholder = "Player 2 "; // Extra space to add right padding 
            input2.readOnly = false;
        }
    };

    return { findBestMove, toggleAIplayerMode };
})();