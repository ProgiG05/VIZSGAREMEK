document.addEventListener('DOMContentLoaded', async () => {
    const plantsData = await fetch('/api/plants',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
            }
        )
    const resp = await plantsData.json()
    console.log(resp)
    resp.forEach(plant => {
        document.getElementById('plant-container').appendChild(document.createElement('div')).innerHTML = `
            <div class="plant-card">
                <h2>${plant.commonName}</h2>
                <h3>Alias: ${plant.botanicalName}</h3>
                <p>Planting: ${plant.planting}</p>
                <p>Harvesting: ${plant.harvesting}</p>
            </div>
        `
    })
})