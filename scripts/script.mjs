
let form = document.getElementById("userForm")
let formContainer = document.getElementById("form-container")

let gridSize , difficulty

//Internal validati ons
let gameLog = [];
let move = 0;

// Create container for the game grid
let gridContainer = document.createElement("div")
gridContainer.classList.add('grid-container')


// When form submited, initialize the game
form.addEventListener('submit', (event) => {
    event.preventDefault()
    playGame()
})

// create table
let table = document.createElement("table")
console.log(`Table created`)

function playGame() {
    gridSize = document.querySelector("input[type='radio'][name=gridSize]:checked").value;
    difficulty = document.getElementById("difficulty").value

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

    // User random clicks to create a solvable game 
    for(let i = 0 ; i < difficulty; i++){
        let y = Math.random() * gridSize | 0;
        let x = Math.random() * gridSize | 0;
        console.log(`Random click ${y}, ${x}`)

        let randomCell = table.rows[y].cells[x]
        flipCard({target: randomCell})
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
    move ++
    gameLog += `Flip # ${move} | cell ${cellIndex} row ${rowIndex} \n`;
    console.log(gameLog)

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

    checkWinner()

}

function transform(card) {
    if(card.style.backgroundColor == "green")
    card.style.backgroundColor = "red"
    else{
        card.style.backgroundColor = "green"
    }
}

function checkWinner(){
    
    let allCells = table.querySelectorAll('td')
    let tableSize = allCells.length

    for(const cell of allCells){
        

    }    



}
