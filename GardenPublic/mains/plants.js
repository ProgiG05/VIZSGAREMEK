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

    // const searchedPlantsContainer = document.getElementById('first-searched-result')
    // searchedPlantsContainer.appendChild(createPlantCards(response[0]))

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
    PlantCard.style.zIndex = `${plant.id}`

    // Title
    const PlantTitle = document.createElement("h1");
    PlantTitle.setAttribute("class", "plant-title");
    PlantTitle.textContent = `${plant.common_name}`;

    // SubTitle
    const PlantSubTitle = document.createElement("h3");
    PlantSubTitle.setAttribute("class", "plant-subtitle");
    PlantSubTitle.textContent = `${plant.botanical_name}`;

    // Save button
    const SavePlantButton = document.createElement("button")
    SavePlantButton.setAttribute("class","savePlant_Btn")
    SavePlantButton.setAttribute("id","savePlant_Btn")
    const savePic = document.createElement("img")
    savePic.setAttribute("src","../pics/icons/book_2_25dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")
    savePic.setAttribute("alt","Save")
    SavePlantButton.appendChild(savePic)

    // Container for the titles
    const TitleContainer = document.createElement("div")
    TitleContainer.setAttribute("class","plant-card-title-cont")
    TitleContainer.appendChild(PlantTitle)
    TitleContainer.appendChild(PlantSubTitle)

    // Container of the titles and the savebutton
    const HeaderContainer = document.createElement("div")
    HeaderContainer.setAttribute("class","plant-card-header-cont")
    HeaderContainer.appendChild(TitleContainer)
    HeaderContainer.appendChild(SavePlantButton)
    
    PlantCard.appendChild(HeaderContainer)

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
    addTableRow("Common name:", capitalizeFirstLetter(plant.common_name));
    addTableRow("Botanical name:", capitalizeFirstLetter(plant.botanical_name));
    addTableRow("Place of Origin:", capitalizeFirstLetter(plant.origin));
    addTableRow("Plant type:", capitalizeFirstLetter(plant.type));
    addTableRow("Planting season:", capitalizeFirstLetter(plant.planting));
    
    const pruningText = plant.pruning.toLowerCase() === "none" ? "No need for pruning" : plant.pruning;
    addTableRow("Pruning season:", pruningText);
    addTableRow("Harvesting season:", capitalizeFirstLetter(plant.harvesting));
    addTableRow("Soil type:", capitalizeFirstLetter(plant.soil));
    addTableRow("Water quantity:", capitalizeFirstLetter(plant.water));
    addTableRow("Sunlight intensity:", capitalizeFirstLetter(plant.sunlight));
    addTableRow("Is it Indoor:", plant.indoor ? "Yes, it can stay inside also" : "No, it can't be kept inside");
    addTableRow("Has Seeds:", plant.seeds ? "Yes, can be propagated by seed" : "No, can't be propagated by seed");

    // Append table to the card
    PlantCard.appendChild(Table);

    return PlantCard;
}

function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1)
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
    document.getElementById("browse-title").scrollIntoView({behavior:"smooth"})
})