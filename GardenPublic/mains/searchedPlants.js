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
        searchedPlantContainer.appendChild(plantInfo)
    })
})