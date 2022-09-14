const cellElements = document.querySelectorAll("[data-cell]");
/*serve para selecionarmos as divs do HTML */
const board = document.querySelector("[data-board]")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]")

let isCircleTurn;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,8]
]

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click" , handleClick, { once: true });
    }
    /*serve para aparecer o circulo ou x no primeiro click */    

    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
    }

winningMessage.classList.add("show-winning-message");
};
/*Lembrando que os : serve como senão */

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });        
    });

};
/*29 until 36 serve para fazer a correção, se está fazendo a combinação de vitória */

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');
/*serve para remover ambos para não repetir mais de uma vez */

if(isCircleTurn) {
    board.classList.add("circle");
} else {
    board.classList.add("x");
}
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass()
};
/*usamos para alternarmos os jogadores */

const handleClick = (e) => {
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //verificar por vitória
    const isWin = checkForWin(classToAdd);

    // verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false)
    } else if(isDraw) {
        endGame(true)
    } else {
    //mudar o simbolo
    swapTurns();
    }  
};

startGame();

restartButton.addEventListener("click", startGame);


