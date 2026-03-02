document.addEventListener("DOMContentLoaded", async () => {
    const gardensContainer = document.getElementById("gardens-container")
    const response = await fetch("/api/gardens", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    const gardens = await response.json()
    console.log(gardens)
    gardens.forEach(garden => {
        const gardenCard = document.createElement("div")
        gardenCard.innerHTML = `
            <h2>${garden.name}</h2>
            <p>${garden.size}</p>
        `
        gardensContainer.appendChild(gardenCard)
    })
})