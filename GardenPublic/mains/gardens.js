document.addEventListener("DOMContentLoaded", async () => {
    const gardensContainer = document.getElementById("gardens-container")
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
            tableColumn.textContent = column
            tableRow.appendChild(tableColumn)
        })
        table.appendChild(tableRow)
    })
    return table
}