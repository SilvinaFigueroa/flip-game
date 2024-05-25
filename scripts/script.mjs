
let form = document.getElementById("userForm")
let formContainer = document.getElementById("form-container")
// let menu = document.
let gridSize, difficulty, userName

let starOver = document.createElement("button")
let reset = document.createElement("button")
let close = document.createElement("button")


//Internal validations - Game Status
let gameLog = [];
let allMoves = 0
let userMove

// Create container for the game grid
let gridContainer = document.createElement("div")
gridContainer.classList.add('grid-container')

let gameStats = document.createElement("div")

// create table
let table = document.createElement("table")
console.log(`Table created`)

// Add Title and user infor to GameStats
let userStats = document.createElement("div")
userStats.classList.add("userStats")
let statsTitle = document.createElement('h1')
let gameInfo = document.createElement("h3")
let numMoves = document.createElement("p")


// When form submited, initialize the game
form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    userName = document.getElementById("userName").value
    difficulty = document.getElementById("difficulty").value
    if (difficulty === "") {
        window.alert("Please select an option for game difficulty")
        return
    }

    userMove = - difficulty;
    try {
        gridSize = document.querySelector("input[type='radio'][name=gridSize]:checked").value;
    } catch (event) {
        window.alert("Please select your game size")
        return
    }
    playGame()
})

function playGame() {

    for (let i = 0; i < gridSize; i++) {
        // create each row
        const row = document.createElement("tr")
        console.log(`row ${i} created`)
        // create and attach cells to row
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("td")
            cell.classList.add("card")
            cellText = document.createTextNode(`TEXT HERE`);
            console.log(`cell ${j} created`)
            row.appendChild(cell)
        }
        // attach row with all the cells to the table
        table.appendChild(row)
    }
    // Remove the form container to replace it with the gridContainer (game)
    formContainer.remove()
    gridContainer.appendChild(table)
    document.body.append(gridContainer)


    statsTitle.innerText = `Player ${userName}`
    gameInfo.innerText = `Game Size: ${gridSize} | Difficulty: ${difficulty}`
    userStats.appendChild(statsTitle)
    userStats.appendChild(gameInfo)
    userStats.appendChild(numMoves)
    document.body.appendChild(userStats)

    gameStats.classList.add("game-stats")
    document.body.appendChild(gameStats)

    // User random clicks to create a solvable game 
    for (let i = 0; i < difficulty; i++) {
        let y = Math.random() * gridSize | 0;
        let x = Math.random() * gridSize | 0;
        console.log(`Random click ${y}, ${x}`)

        let randomCell = table.rows[y].cells[x]
        flipCard({ target: randomCell })
    }
}

table.addEventListener('click', (cardClicked) => {
    cardClicked.preventDefault()
    console.log(cardClicked.target)
    if (cardClicked.target instanceof HTMLTableCellElement) {
        flipCard(cardClicked)
    }
})

function flipCard(clickedCell) {
    // Read indexes of table: (cell, row)
    let cellIndex = clickedCell.target.cellIndex;
    let rowIndex = clickedCell.target.parentNode.rowIndex;
    let cellClicked = clickedCell.target

    // console.log(cellIndex, rowIndex)
    let top, down, left, right;

    transform(cellClicked)
    userMove++
    allMoves++
    console.log(allMoves)
    if (userMove > 0) {
        numMoves.innerText = `Numbers of total flips ${userMove}`
        gameLog += `Flip # ${userMove} | row ${rowIndex + 1} cell ${cellIndex + 1}  <br>`;
    }

    if (cellIndex - 1 >= 0 && cellIndex - 1 < gridSize) {
        left = table.rows[rowIndex].cells[cellIndex - 1]
        transform(left)
    }
    if (rowIndex - 1 >= 0 && rowIndex - 1 < gridSize) {
        down = table.rows[rowIndex - 1].cells[cellIndex]
        transform(down)
    }
    if (cellIndex + 1 >= 0 && cellIndex + 1 < gridSize) {
        right = table.rows[rowIndex].cells[cellIndex + 1]
        transform(right)
    }
    if (rowIndex + 1 >= 0 && rowIndex + 1 < gridSize) {
        top = table.rows[rowIndex + 1].cells[cellIndex]
        transform(top)
    }

    // Adding time out to prevent the alert to appears before the card flips
    setTimeout(function() {
        checkWinner()
    },  10);

    
}

function transform(card) {
    card.classList.toggle("card-back")
}

function checkWinner() {

    let getCells = table.querySelectorAll('td')
    let tableSize = getCells.length
    let front = 0;
    let back = 0;

    for (const cell of getCells) {
        if (cell.classList.contains("card-back")) {
            back++  
        }
        else { front++ }
    }

    console.log(`Front ${front} and Back ${back}`)
    if (front === tableSize || back === tableSize) {
        window.alert("We have a winner!");
    } else {
        console.log("Keep playing!");
    }

    let log = gameStats.innerHTML = gameLog

    let statsFragment = document.createDocumentFragment()
    statsFragment.appendChild(log)
    gameStats.parentElement.append(statsFragment);
}

// Button to reset the game with the same user options (grid - difficulty) 
starOver.addEventListener('click', () => {
    playGame()
})

// Button to reload page and go to initial configurations
reset.addEventListener('click', () => {
    window.location.reload()
})

// close window
close.addEventListener('click', () => {
    window.close()
    
})


