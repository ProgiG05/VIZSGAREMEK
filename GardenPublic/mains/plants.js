const token = localStorage.getItem("token");

document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
        const loginBtn = document.getElementById("logIn_Btn");
        const accountHandler = (e) => {
            e.preventDefault();
            window.location.href = "/sites/accounts.html";
        };

        if (loginBtn) {
            loginBtn.innerHTML = `${user.username}`;
            loginBtn.addEventListener("click", accountHandler);
        }
    }

    const plantsData = await fetch('/api/plants', {method: 'GET',headers: {'Content-Type': 'application/json'}})
    const response = await plantsData.json()

    const PlantsContainer = document.getElementById('other-searched-results')

    const TypesGroupingContainer = document.getElementById("plant-type-grouping-cont")
    const AllPlantTypes = []
    response.forEach(onetype => {
        if (!AllPlantTypes.includes(onetype.type)) {AllPlantTypes.push(onetype.type)}
    })

    AllPlantTypes.forEach(onetype => {
        const TypeButton = document.createElement("button")
        TypeButton.classList.add("typeGroup_Btn")
        TypeButton.textContent = `${onetype.trim()}`
        TypesGroupingContainer.appendChild(TypeButton)
    })

    const AllOrigins = []
    response.forEach(oneorigin => {
        if (!AllOrigins.includes(oneorigin.origin)) {AllOrigins.push(oneorigin.origin)}
    } )
    console.log(AllOrigins)


    response.forEach(plant => {PlantsContainer.appendChild(createPlantCards(plant))})

    searchPlant(PlantsContainer)
    document.getElementById('clear-water-btn').addEventListener('click', () => clearFilters('water'))
    document.getElementById('clear-sunlight-btn').addEventListener('click', () => clearFilters('sunlight'))
    document.getElementById('clear-soil-btn').addEventListener('click', () => clearFilters('soil'))
})

// --- Creating the cards Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function createPlantCards(plant) {
    // Plantcard wrapper
    const PlantCard = document.createElement("div");
    PlantCard.setAttribute("class", "plant-card");

    // Title
    const PlantTitle = document.createElement("h1");
    PlantTitle.setAttribute("class", "plant-title");
    PlantTitle.textContent = `${plant.common_name} - ${plant.botanical_name}`;
    PlantCard.appendChild(PlantTitle);

    // Create the Table
    const Table = document.createElement("table");
    Table.setAttribute("class", "plant-details-table");

    // Helper function to create rows quickly
    const addTableRow = (label, value) => {
        const row = document.createElement("tr");
        
        const labelCell = document.createElement("td");
        labelCell.setAttribute("class", "detail-label");
        labelCell.textContent = label;
        
        const valueCell = document.createElement("td");
        valueCell.setAttribute("class", "detail-value");
        valueCell.textContent = value;
        
        row.appendChild(labelCell);
        row.appendChild(valueCell);
        Table.appendChild(row);
    };

    // Populate Table Rows
    addTableRow("Common name:", plant.common_name);
    addTableRow("Botanical name:", plant.botanical_name);
    addTableRow("Origin:", plant.origin);
    addTableRow("Type:", plant.type);
    addTableRow("Planting:", plant.planting);
    
    const pruningText = plant.pruning.toLowerCase() === "none" ? "no need for pruning" : plant.pruning;
    addTableRow("Pruning:", pruningText);
    addTableRow("Harvesting:", plant.harvesting);
    addTableRow("Soil:", plant.soil);
    addTableRow("Water:", plant.water);
    addTableRow("Sunlight:", plant.sunlight);
    addTableRow("Indoor:", plant.indoor ? "Yes" : "No");
    addTableRow("Seeds:", plant.seeds ? "Yes" : "No");

    // Append table to the card
    PlantCard.appendChild(Table);

    return PlantCard;
}

function searchPlant(container) {
    const form = document.getElementById('search-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        document.getElementById("other-searched-results").scrollIntoView({behavior:"smooth"})

        const waterchecks = document.querySelectorAll('.water-checkbox')
        const sunlightchecks = document.querySelectorAll('.sunlight-checkbox')
        const soilchecks = document.querySelectorAll('.soil-checkbox')

        const data = {
            commonName: document.getElementById('commonplant-search-inp').value.trim() || "none",
            botanicalName: document.getElementById('botanicalplant-search-inp').value.trim() || "none",
            water: Array.from(waterchecks).find(x => x.checked)?.value || "none",
            sunlight: Array.from(sunlightchecks).find(x => x.checked)?.value || "none",
            soil: Array.from(soilchecks).find(x => x.checked)?.value || "none",
            plantingMonth: document.getElementById('plantingSelection').value || "none",
            harvestingMonth: document.getElementById('harvestingSelection').value || "none",
            origin: document.getElementById('originSelection').value || "none",
            indoor: document.getElementById('indoorCheckbox').checked ? "yes" : "none",
            seeds: document.getElementById('seedsCheckbox').checked ? "yes" : "none"
        }

        const queryParams = new URLSearchParams({
            common_name: data.commonName,
            botanical_name: data.botanicalName,
            water: data.water,
            sunlight: data.sunlight,
            soil: data.soil,
            plantingMonth: data.plantingMonth,
            harvestingMonth: data.harvestingMonth,
            origin: data.origin,
            indoor: data.indoor,
            seeds: data.seeds
        })

        const plantsData = await fetch(`/api/plantfinder?${queryParams.toString()}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const response = await plantsData.json()
        SearchPlantDetails(response, container)
        clearForm()
    })
}

function SearchPlantDetails(details, container) {
    const searchedPlantsContainer = document.getElementById('first-searched-result')
    searchedPlantsContainer.textContent = `Searched Plants:`

    container.innerHTML = ''
    details.forEach(plant => { container.appendChild(createPlantCards(plant)) })
}

function clearFilters(type) {
    const checks = document.querySelectorAll(`.${type}-radioBtn`)
    checks.forEach(check => check.checked = false)
}

function clearForm() {
    document.getElementById('commonplant-search-inp').value = ""
    document.getElementById('botanicalplant-search-inp').value = ""
    document.getElementById('plantingSelection').value = "none"
    document.getElementById('harvestingSelection').value = "none"
    document.getElementById('originSelection').value = "none"
    document.getElementById('indoorCheckbox').checked = false
    document.getElementById('seedsCheckbox').checked = false
    clearFilters('water')
    clearFilters('sunlight')
    clearFilters('soil')
}

// --- Localstorage Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
};
// --- Side Panel Toggle ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

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

// --- Dark Mode Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const body = document.body;
const darkBtn = document.getElementById('darkmode');

darkBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    darkBtn.classList.toggle('dark-active');
    
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
// --- Scroll up btn & scroll to seaerch btn & scrool to browse btn Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.getElementById("showSearch_Btn").addEventListener("click", () => {
    document.getElementById("search-form").scrollIntoView({behavior:"smooth"})
})
document.getElementById("showBroswe_Btn").addEventListener("click", () => {
    document.getElementById("plant-type-grouping-cont").scrollIntoView({behavior:"smooth"})
})