const gardensContainer = document.getElementById("gardens-container")
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/gardens", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const gardens = await response.json()
    console.log(gardens)
    gardens.forEach(garden => {
        const splittedContent = garden.gardencontent.split(";")
        const gardenCard = document.createElement("div")
        gardenCard.innerHTML = `
            <h2>${garden.gardenname}</h2>
            <p>${garden.gardencontent}</p>
        `
        gardenCard.appendChild(CreateTable(splittedContent))
        gardensContainer.appendChild(gardenCard)
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete Garden"
        deleteBtn.className = "delete_btn"
        gardensContainer.appendChild(deleteBtn)
    })
})

function CreateTable(splittedContent) {
    const table = document.createElement("table")
    table.className = "garden-table"
    splittedContent.forEach(row => {
        const columns = row.split(",")
        const tableRow = document.createElement("tr")

        columns.forEach(column => {
            const tableColumn = document.createElement("td")
            switch (column) {
                case "-":
                    tableColumn.className = "empty-cell"
                    tableColumn.textContent = "Disabled Cell"
                    break;
                case "":
                    tableColumn.className = "tobecollected-cell"
                    break;
                default:
                    tableColumn.className = "plant-cell"
                    tableColumn.textContent = column
                    break;
            }

            tableRow.appendChild(tableColumn)
        })
        table.appendChild(tableRow)
    })
    return table
}