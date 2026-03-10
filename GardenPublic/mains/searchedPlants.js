document.addEventListener("DOMContentLoaded", async () => {
    const searchedPlantContainer = document.getElementById("searchedPlant-container")

    const response = await fetch(`/api/plantfinder${window.location.search}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    const searchedPlant = await response.json()
    searchedPlantContainer.innerHTML = '';
    
    if (!searchedPlant || searchedPlant.length === 0) {
        searchedPlantContainer.innerHTML = '<p>No plants found.</p>';
        return;
    }
    
    searchedPlant.forEach(p => {
        const box = document.createElement("div"), row = (l, v) => `<div class="info-line"><strong>${l}</strong><span>${v || ''}</span></div>`;
        box.className = 'plain-info-box';
        box.innerHTML = row('commonName', p.commonName) + row('botanicalName', p.botanicalName) + row('type', p.type) + 
            row('water', p.water || p.Watering) + row('sunlight', p.sunlight || p.Sunlight) + row('soil', p.soil || p.Soil) + 
            row('planting', p.planting || p['Planting season']) + row('harvesting', p.harvesting || p['Harvesting season']) + 
            row('seeds', p.seeds) + row('growth_rate', p.growth_rate) + row('medicinal', p.medicinal) + row('indoor', p.indoor) + row('description', p.description);
        searchedPlantContainer.appendChild(box)
    })
})