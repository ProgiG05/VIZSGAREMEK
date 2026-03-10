document.addEventListener("DOMContentLoaded", async () => {
    const searchedPlantContainer = document.getElementById("searchedPlant-container")

    const response = await fetch(`/api/plantfinder${window.location.search}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    const searchedPlant = await response.json()
    searchedPlant.forEach(plantDetail => {
        const plantInfo = document.createElement("pre")
        plantInfo.textContent = JSON.stringify(plantDetail, null, 2)
        // plantInfo.innerHTML = `
        // <div class="plant-card">
        //     <h2>${plantDetail.botanicalName}</h2>
        //     <h3>Alias: ${plantDetail.commonName}</h3>
        //     <p>Planting: ${plantDetail.planting}</p>
        //     <p>Harvesting: ${plantDetail.harvesting}</p>
        // </div>`
        searchedPlantContainer.appendChild(plantInfo)
    })
})