import { setupNavbar, setupSidePanel, setupLoginState } from './navbar.js';
import { getToken, getUser, apiFetch } from './api.js';
import { showAlert, showConfirm } from './popup.js';

const token = getToken();

document.addEventListener('DOMContentLoaded', async () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();

    const user = getUser();

    // Fetch all plants
    let response;
    try {
        const plantsData = await fetch('/api/plants', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!plantsData.ok) {
            throw new Error(`Server returned ${plantsData.status}`);
        }

        response = await plantsData.json();
    } catch (error) {
        console.error("Failed to load plants:", error.message);
        const container = document.getElementById('other-searched-results');
        if (container) {
            container.innerHTML = '<p class="error-message">Could not load plants. Please try again later.</p>';
        }
        return;
    }

    const PlantsContainer = document.getElementById('other-searched-results');
    const TypesGroupingContainer = document.getElementById("plant-type-grouping-cont");
    const SavedPlantsGrouping = document.getElementById("saved-plants-grouping");

    // Only allow saved plants access when logged in
    if (SavedPlantsGrouping) {
        SavedPlantsGrouping.addEventListener('click', async () => {
            if (!token || !user) {
                showAlert("Please log in to view your saved plants.", "Not logged in!");
                return;
            }

            try {
                const savedPlants = await getSavedPlants();
                PlantsContainer.innerHTML = "";
                savedPlants.forEach(plant => PlantsContainer.appendChild(createPlantCards(plant.plant_id)));
            } catch (error) {
                console.error("Failed to load saved plants:", error.message);
                showAlert("Could not load saved plants. Please try again later.", "Error!");
            }
        });
    }

    // Build type filter buttons
    const AllPlantTypes = [];
    response.forEach(onetype => {
        if (!AllPlantTypes.includes(onetype.type)) { AllPlantTypes.push(onetype.type); }
    });

    AllPlantTypes.forEach(onetype => {
        const TypeButton = document.createElement("button");
        TypeButton.classList.add("typeGroup_Btn");
        TypeButton.textContent = capitalizeFirstLetter(onetype.trim());
        TypeButton.id = onetype.trim();
        TypeButton.addEventListener('click', async () => {
            await typeFilter(TypeButton.id, response);
        });
        TypesGroupingContainer.appendChild(TypeButton);
    });

    // Build origin select options
    const AllOrigins = [];
    response.forEach(oneorigin => {
        if (!AllOrigins.includes(oneorigin.origin)) { AllOrigins.push(oneorigin.origin); }
    });
    const OriginSelection = document.getElementById("originSelection");
    for (let i = 0; i < AllOrigins.length; i++) {
        const OriginOption = document.createElement("option");
        OriginOption.setAttribute("value", AllOrigins[i]);
        OriginOption.textContent = AllOrigins[i];
        OriginSelection.appendChild(OriginOption);
    }

    // Render all plant cards
    response.forEach(plant => { PlantsContainer.appendChild(createPlantCards(plant)); });

    document.getElementById('clear-water-btn').addEventListener('click', () => clearFilters('water'));
    document.getElementById('clear-sunlight-btn').addEventListener('click', () => clearFilters('sunlight'));
    document.getElementById('clear-soil-btn').addEventListener('click', () => clearFilters('soil'));
});

// --- Creating the cards ---

function createPlantCards(plant) {
    const PlantCard = document.createElement("div");
    PlantCard.setAttribute("class", "plant-card");
    PlantCard.style.zIndex = `${plant.id}`;

    const PlantTitle = document.createElement("h1");
    PlantTitle.setAttribute("class", "plant-title");
    PlantTitle.textContent = plant.common_name;

    const PlantSubTitle = document.createElement("h3");
    PlantSubTitle.setAttribute("class", "plant-subtitle");
    PlantSubTitle.textContent = plant.botanical_name;

    // Save button
    const potButton = document.createElement("button");
    potButton.setAttribute("class", "pot-button");
    potButton.addEventListener('click', () => {
        toggleSaveState(potButton, plant.id);
    });
    
    const flowerAssembly = document.createElement("div");
    flowerAssembly.setAttribute("class", "flower-assembly");
    const flowerHead = document.createElement("div");
    flowerHead.setAttribute("class", "flower-head");
    for (let i = 1; i <= 4; i++) {
        const petal = document.createElement("div");
        petal.setAttribute("class", `petal p${i}`);
        flowerHead.appendChild(petal);
    }
    const center = document.createElement("div");
    center.setAttribute("class", "center");
    flowerHead.appendChild(center);
    
    const stem = document.createElement("div");
    stem.setAttribute("class", "stem");
    flowerAssembly.appendChild(flowerHead);
    flowerAssembly.appendChild(stem);

    const potBase = document.createElement("div");
    potBase.setAttribute("class", "pot-base");
    const potRim = document.createElement("div");
    potRim.setAttribute("class", "pot-rim");

    potButton.appendChild(flowerAssembly);
    potButton.appendChild(potBase);
    potButton.appendChild(potRim);

    const TitleContainer = document.createElement("div");
    TitleContainer.setAttribute("class", "plant-card-title-cont");
    TitleContainer.appendChild(PlantTitle);
    TitleContainer.appendChild(PlantSubTitle);

    const HeaderContainer = document.createElement("div");
    HeaderContainer.setAttribute("class", "plant-card-header-cont");
    HeaderContainer.appendChild(TitleContainer);
    HeaderContainer.appendChild(potButton);
    
    PlantCard.appendChild(HeaderContainer);

    // Create the details table
    const Table = document.createElement("table");
    Table.setAttribute("class", "plant-details-table");

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
    addTableRow("Is it Indoor:", plant.indoor ? "Yes, can stay inside also" : "No, can't be kept inside");
    addTableRow("Has Seeds:", plant.seeds ? "Yes, can be propagated by seed" : "No, can't be propagated by seed");

    PlantCard.appendChild(Table);
    return PlantCard;
}

// --- Toggle save & API calls ---

async function toggleSaveState(buttonElement, plantId) {
    if (!token) {
        showAlert("Please log in to save plants.", "Not logged in!");
        return;
    }

    buttonElement.classList.toggle('saved');

    try {
        await SavePlant(plantId);
    } catch (error) {
        console.error("Failed to save plant:", error.message);
        buttonElement.classList.toggle('saved'); // Revert toggle on failure
        showAlert("Could not save plant. Please try again.", "Error!");
    }
}

async function SavePlant(plantId) {
    const user = getUser();
    if (!user || !user.id) {
        throw new Error("User not logged in.");
    }

    const response = await apiFetch('/api/saveplants', {
        method: 'POST',
        body: JSON.stringify({
            plant_id: plantId,
            user_id: user.id
        })
    });

    if (!response || !response.ok) {
        throw new Error(`Save failed`);
    }

    return await response.json();
}

async function getSavedPlants() {
    const response = await apiFetch('/api/savedplants', {
        method: 'GET'
    });

    if (!response || !response.ok) {
        throw new Error(`Failed to fetch saved plants`);
    }

    return await response.json();
}

function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

// --- Search display logic ---

const form = document.getElementById('search-form');

function SearchPlantDetails(details, container) {
    container.innerText = '';

    if (!details || details.length === 0) {
        container.innerHTML = '<p class="error-message">No plants matched your search.</p>';
        return;
    }

    container.appendChild(createPlantCards(details[0]));

    const ButtonCont = document.createElement("div");
    ButtonCont.setAttribute("id", "result-button-container");
    ButtonCont.setAttribute("class", "result-button-container");

    if (details.length > 1) {
        const LoadMoreBtn = document.createElement('button');
        LoadMoreBtn.setAttribute("id", "loadMore_Btn");
        LoadMoreBtn.setAttribute("class", "loadMore_Btn");
        LoadMoreBtn.textContent = "Load more";
        LoadMoreBtn.addEventListener("click", () => {
            container.removeChild(ButtonCont);
            ButtonCont.removeChild(LoadMoreBtn);
            for (let i = 1; i < details.length; i++) {
                container.appendChild(createPlantCards(details[i]));
            }
            container.appendChild(ButtonCont);
        });
        ButtonCont.appendChild(LoadMoreBtn);
    }

    const GoBackToSearchingBtn = document.createElement('button');
    GoBackToSearchingBtn.setAttribute("id", "GoBackSearch_Btn");
    GoBackToSearchingBtn.setAttribute("class", "GoBackSearch_Btn");
    GoBackToSearchingBtn.textContent = "Search another";
    GoBackToSearchingBtn.addEventListener("click", () => {
        form.scrollIntoView({ behavior: "smooth" });
        container.innerText = '';
    });
    ButtonCont.appendChild(GoBackToSearchingBtn);

    container.appendChild(ButtonCont);
}

// --- Filter helpers ---

function clearFilters(type) {
    const checks = document.querySelectorAll(`.${type}-radioBtn`);
    checks.forEach(check => check.checked = false);
}

function clearForm() {
    document.getElementById('commonplant-search-inp').value = "";
    document.getElementById('botanicalplant-search-inp').value = "";
    document.getElementById('plantingSelection').value = "none";
    document.getElementById('harvestingSelection').value = "none";
    document.getElementById('originSelection').value = "none";
    document.getElementById('indoorCheckbox').checked = false;
    document.getElementById('seedsCheckbox').checked = false;
    clearFilters('water');
    clearFilters('sunlight');
    clearFilters('soil');
}

// --- Scroll buttons ---

document.getElementById("showSearch_Btn").addEventListener("click", () => {
    document.getElementById("search-form").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("showBroswe_Btn").addEventListener("click", () => {
    document.getElementById("browse-title").scrollIntoView({ behavior: "smooth" });
});

async function typeFilter(type, plantsData) {
    const filteredPlants = plantsData.filter(plant => plant.type === type);
    const PlantsContainer = document.getElementById('other-searched-results');
    PlantsContainer.innerHTML = "";
    filteredPlants.forEach(plant => PlantsContainer.appendChild(createPlantCards(plant)));
}

// --- Search handler ---

document.getElementById('searchPlant_Btn').addEventListener('click', async (e) => {
    e.preventDefault();

    const commonNameSearch = document.getElementById('commonplant-search-inp').value.toLowerCase().trim();
    const botanicalNameSearch = document.getElementById('botanicalplant-search-inp').value.toLowerCase().trim();
    const water = document.querySelector('.water-radioBtn:checked')?.value.toLowerCase() || null;
    const sunlight = document.querySelector('.sunlight-radioBtn:checked')?.value.toLowerCase() || null;
    const soil = document.querySelector('.soil-radioBtn:checked')?.value.toLowerCase() || null;
    const plantingMonth = document.getElementById('plantingSelection').value.toLowerCase();
    const harvestingMonth = document.getElementById('harvestingSelection').value.toLowerCase();
    const origin = document.getElementById('originSelection').value.toLowerCase();
    const indoorChecked = document.getElementById('indoorCheckbox').checked;
    const seedsChecked = document.getElementById('seedsCheckbox').checked;

    try {
        const response = await fetch('/api/plants', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const plants = await response.json();

        const filteredPlants = plants.filter(p => {
            const criteriaCommon = !commonNameSearch || p.common_name.toLowerCase().includes(commonNameSearch);
            const criteriaBotanical = !botanicalNameSearch || p.botanical_name.toLowerCase().includes(botanicalNameSearch);
            const criteriaWater = !water || p.water.toLowerCase() === water;
            const criteriaSunlight = !sunlight || p.sunlight.toLowerCase() === sunlight;
            const criteriaSoil = !soil || p.soil.toLowerCase() === soil;
            const criteriaPlanting = plantingMonth === "none" || !plantingMonth || p.planting.toLowerCase().includes(plantingMonth);
            const criteriaHarvesting = harvestingMonth === "none" || !harvestingMonth || p.harvesting.toLowerCase().includes(harvestingMonth);
            const criteriaOrigin = origin === "none" || !origin || p.origin.toLowerCase() === origin;
            const criteriaIndoor = !indoorChecked || p.indoor;
            const criteriaSeeds = !seedsChecked || p.seeds;

            return criteriaCommon && criteriaBotanical && criteriaWater && criteriaSunlight && criteriaSoil && criteriaPlanting && criteriaHarvesting && criteriaOrigin && criteriaIndoor && criteriaSeeds;
        });

        const searchedPlantsContainer = document.getElementById('first-searched-result');
        searchedPlantsContainer.scrollIntoView({ behavior: "smooth" });
        SearchPlantDetails(filteredPlants, searchedPlantsContainer);
        clearForm();
    } catch (error) {
        console.error("Search failed:", error.message);
        showAlert("Search failed. Please try again later.", "Error!");
    }
});