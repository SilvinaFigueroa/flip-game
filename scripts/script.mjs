
let form = document.getElementById("userForm")
let formContainer = document.getElementById("form-container")
let gridSize = 3;

// Create container for the game grid
let gridContainer = document.createElement("div")
gridContainer.classList.add('grid-container')


console.log(gridSize)

// When form submited, initialize the game
form.addEventListener('submit', (event) => {
    event.preventDefault()
    playGame()
})

// create table
let table = document.createElement("table")
console.log(`Table created`)

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
}

table.addEventListener('click', (cardClicked) => {
    cardClicked.preventDefault()
    console.log(cardClicked.target)
    if (cardClicked.target instanceof HTMLTableCellElement) {
        flipCard(cardClicked)
    }
})

function flipCard(clickedCell) {
    // Read indexed of table: (cell, row)
    let cellIndex = clickedCell.target.cellIndex;
    let rowIndex = clickedCell.target.parentNode.rowIndex;

    clickedCell.target.style.backgroundColor = "green";
    clickedCell.target.classList.add('flip-card')

    console.log(cellIndex, rowIndex)

    // (rowIndex, cellIndex + 1).style.backgroundColor = "green"

    // Validation: The index of the row is-1 if the row is not part of a table.

    // let table = clickedCell.parentNode.parentNode; // This is the table element
    // if (table.rows[rowIndex] && table.rows[rowIndex].cells[cellIndex + 1]) {
    //     table.rows[rowIndex].cells[cellIndex + 1].style.backgroundColor = "green";
    }

