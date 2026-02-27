document.addEventListener('DOMContentLoaded', async () => {
    const plantsData = await fetch('/api/getplants',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
            }
        )
    const resp = await plantsData.json()

    document.getElementById('plant-container').innerHTML = resp.map(plant => {
        return `
            <div class="plant-card">
                <img src="${plant.image}" alt="${plant.name}">
                <h2>${plant.name}</h2>
                <p>${plant.description}</p>
            </div>
        `
    }).join('')
})