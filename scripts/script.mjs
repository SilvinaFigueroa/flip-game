
let form = document.getElementById("userForm")
let container = document.getElementById("container")
let gridSize = 5;

console.log(gridSize)

form.addEventListener('submit', function(event) {
    event.preventDefault()
    playGame()
})

function playGame() {
    let table = document.createElement("table")
    console.log(`Table created`)
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("tr")
        console.log(`row ${i} created`)
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("td")
            cell.classList.add("card")
            cellText = document.createTextNode(`TEXT HERE`);
            console.log(`cell ${j} created`)
            row.appendChild(cell)
        }
        table.appendChild(row)
    }

    form.remove()
    container.appendChild(table)

}
