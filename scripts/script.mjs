let form = document.getElementById("userForm")
let formContainer = document.getElementById("form-container")
let menu = document.createElement('nav')
let gridSize, difficulty, userName


// Create container for the game grid
let gridContainer = document.createElement("div")
gridContainer.classList.add('grid-container')
let gameStats = document.createElement("div")

// navigation buttons 
let starOver = document.createElement("button")
starOver.innerText = "Start New Game";
let reset = document.createElement("button")
reset.innerText = "Reset Current Game";

menu.append(starOver, reset)
starOver.classList.add("nav-button")
reset.classList.add("nav-button")
menu.classList.add("nav")


// Button to reset the game with the same user options (grid - difficulty) 
starOver.addEventListener('click', () => {
    window.location.reload()
})

// Button to reload page and go to initial configurations
reset.addEventListener('click', () => {
    playGame()
})

//Internal validations - Game Status
let allMoves = 0
let userMove
let lastUserMove = 0;


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

    // Form validation     
    userName = document.getElementById("userName").value
    difficulty = document.getElementById("difficulty").value
    if (difficulty === "") {
        window.alert("Please select an option for game difficulty")
        return
    }

    try {
        gridSize = document.querySelector("input[type='radio'][name=gridSize]:checked").value;
    } catch (event) {
        window.alert("Please select your game size")
        return
    }
    playGame()
})

table.addEventListener('click', (cardClicked) => {
    cardClicked.preventDefault()
    console.log(cardClicked.target)
    if (cardClicked.target instanceof HTMLTableCellElement) {
        flipCard(cardClicked)
    }
})


// ______________________FUNCTIONS

function playGame() {
    // Clear table content and log
    table.innerHTML = ''
    allMoves = 0

    userMove = - difficulty; // Dificulty are flips done before the users start playing

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
        // Attach row with all the cells to the table
        table.appendChild(row)
    }
    // Remove the form container to replace it with the gridContainer (game)
    formContainer.remove()
    gridContainer.appendChild(table)
    document.body.append(gridContainer)

    // Add information to UserStats 
    statsTitle.innerText = `Player ${userName}`
    gameInfo.innerText = `Game Size: ${gridSize} | Difficulty: ${difficulty}`
    userStats.appendChild(statsTitle)
    userStats.appendChild(gameInfo)
    userStats.appendChild(numMoves)
    document.body.appendChild(userStats)

    gameStats.classList.add("game-stats")
    document.body.appendChild(gameStats)

    // Attach menu to body before the first child
    document.body.insertBefore(menu, document.body.firstChild);

    // Dificulty = Random clicks to create a solvable game 
    for (let i = 0; i < difficulty; i++) {
        let y = Math.random() * gridSize | 0;
        let x = Math.random() * gridSize | 0;
        console.log(`Random click ${y}, ${x}`)

        let randomCell = table.rows[y].cells[x]
        flipCard({ target: randomCell })
    }
}


function flipCard(clickedCell) {
    // Read indexes of table: (cell, row)
    let cellIndex = clickedCell.target.cellIndex;
    let rowIndex = clickedCell.target.parentNode.rowIndex;
    let cellClicked = clickedCell.target

    // console.log(cellIndex, rowIndex)
    let top, down, left, right;

    transform(cellClicked)
    updateLog(rowIndex, cellIndex);


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
    setTimeout(function () {
        checkWinner()
    }, 10);
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
        window.showCustomAlert(`We have a winner! <br>
        <b>${userName}</b> solved the game in <b>${userMove}</b> moves\n 
        <hr>
        \n Game Size: ${gridSize} | Difficulty: ${difficulty}`
        );
    } else {
        console.log("Keep playing!");
    }

}

function updateLog(row, cell) {
    userMove++ // Player clicks 
    allMoves++
    lastUserMove++

    // create a fragment for the logs 
    let statsFragment = document.createDocumentFragment()
    let logLine = document.createElement("p") // Create a paragraph element to add to the fragment with the log

    console.log(`Flip # ${allMoves} | row ${row + 1} cell ${cell + 1}`) // Check all the moves from the beggining 

    if (userMove > 0) { // all moves minus dificulty (flips done before the user start playing)

        numMoves.innerText = `Numbers of total flips ${userMove}`
        logLine.innerHTML = `Flip # ${userMove} | row ${row + 1} cell ${cell + 1}`;

        // Clear the gameStats after log the last 3 movements 
        if(lastUserMove >= 3){
            gameStats.innerHTML = "";
            lastUserMove = 0;
        }

        statsFragment.appendChild(logLine)
        gameStats.appendChild(statsFragment)

    }
}


// --------------extra
function showCustomAlert(message) {
    let customAlert = document.getElementById("customAlert");
    let customAlertMessage = document.getElementById("customAlertMessage");
    customAlertMessage.innerHTML = message;
    customAlert.style.display = "block";

    let closeBtn = document.querySelector(".custom-alert-close");
    let okBtn = document.getElementById("customAlertButton");

    closeBtn.onclick = function() {
        customAlert.style.display = "none";
    };

    okBtn.onclick = function() {
        customAlert.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === customAlert) {
            customAlert.style.display = "none";
        }
    };
}
