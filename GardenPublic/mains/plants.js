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
    const plantcontainer = document.getElementById('plant-container')
    resp.forEach(plant => {
        plantcontainer.appendChild(document.createElement('div')).innerHTML = `
            <div class="plant-card">
                <h2>${plant.commonName}</h2>
                <h3>Alias: ${plant.botanicalName}</h3>
                <p>Planting: ${plant.planting}</p>
                <p>Harvesting: ${plant.harvesting}</p>
            </div>
        `
    })
    searchPlant(plantcontainer)
    document.getElementById('clear-water-btn').addEventListener('click', () => clearFilters('water'))
    document.getElementById('clear-sunlight-btn').addEventListener('click', () => clearFilters('sunlight'))
    document.getElementById('clear-soil-btn').addEventListener('click', () => clearFilters('soil'))
})

function searchPlant(container) {
    const form = document.getElementById('search-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const waterchecks = document.querySelectorAll('.water-checkbox')
        const sunlightchecks = document.querySelectorAll('.sunlight-checkbox')
        const soilchecks = document.querySelectorAll('.soil-checkbox')
        const data = {
            name: document.getElementById('commonplant-search-inp').value || "none",
            water: Array.from(waterchecks).filter(x => x.checked).map(y => y.value)[0] || "none",
            sunlight: Array.from(sunlightchecks).filter(x => x.checked).map(y => y.value)[0] || "none",
            soil: Array.from(soilchecks).filter(x => x.checked).map(y => y.value)[0] || "none",
            plantingMonth: document.getElementById('plantingSelection').value || "none",
            harvestingMonth: document.getElementById('harvestingSelection').value || "none"
        }
        

        const plantsData = await fetch('/api/plantfinder?commonName=' + data.name + '&water=' + data.water + '&sunlight=' + data.sunlight + '&soil=' + data.soil + '&plantingMonth=' + data.plantingMonth + '&harvestingMonth=' + data.harvestingMonth,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const resp = await plantsData.json()
        SearchPlantDetails(resp, container)
        clearForm()
    })
}

function SearchPlantDetails(details, container) {
    const searchedPlantContainer = document.getElementById('searched-plant-container')
    searchedPlantContainer.innerHTML = "Searched Plants:"
    container.innerHTML = ""
    details.forEach(plant => {
        container.appendChild(document.createElement('div')).innerHTML = `
            <div class="plant-card">
                <h2>${plant.commonName}</h2>
                <h3>Alias: ${plant.botanicalName}</h3>
                <p>Planting: ${plant.planting}</p>
                <p>Harvesting: ${plant.harvesting}</p>
                <p>Soil: ${plant.soil}</p>
                <p>Water: ${plant.water}</p>
                <p>Sunlight: ${plant.sunlight}</p>
            </div>
        `
    })
}

function clearFilters(type) {
    const checks = document.querySelectorAll(`.${type}-checkbox`)
    checks.forEach(check => check.checked = false)
}

function clearForm() {
    document.getElementById('commonplant-search-inp').value = ""
    document.getElementById('plantingSelection').value = ""
    document.getElementById('harvestingSelection').value = ""
    clearFilters('water')
    clearFilters('sunlight')
    clearFilters('soil')
}