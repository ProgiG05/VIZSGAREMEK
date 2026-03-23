document.addEventListener('DOMContentLoaded', async () => {

    const settingsBtn = document.getElementById('settings_Btn');
    const sidePanel = document.getElementById('settings-sidepanel');
    const closePanel = document.getElementById('closeSidePanel');

    settingsBtn.addEventListener('click', () => {
        sidePanel.style.transition = '0.4s all ease'
        sidePanel.style.left = 0
    });
    closePanel.addEventListener('click', () => {
        sidePanel.style.transition = '0.4s all ease'
        sidePanel.style.left = "-22.5rem"
    });

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