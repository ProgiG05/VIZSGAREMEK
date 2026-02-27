document.addEventListener("DOMContentLoaded", async () => {
    const searchedPlantContainer = document.getElementById("searchedPlant-container")

    const response = await fetch("/api/plantfinder", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    const searchedPlant = await response.json()
    searchedPlant.forEach(plantDetail => {
        const plantCommonName = document.createElement("p")
        plantCommonName.textContent = `Common name: ${plantDetail.id}`
        searchedPlantContainer.appendChild(plantCommonName)
    })
})