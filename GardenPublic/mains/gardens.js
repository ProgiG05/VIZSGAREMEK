import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
import { getToken, getUser, apiFetch } from './api.js';
import { showAlert, showConfirm } from './popup.js';

const gardensContainer = document.getElementById("gardens-container");
const token = getToken();

document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();

    // Fetch plants first as they are needed for both real and example gardens
    const plantsResponse = await fetch("/api/plants", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResponse.json();

    if (!token) {
        const infoCont = document.getElementById("information-cont")
        
        document.getElementById("newgarden_btn").style.display = "none";
        document.getElementById("checkout_btn").style.display = "none";

        const loginText = document.createElement("h1")
        loginText.textContent = "You need to be logged in to view and create gardens."
        loginText.className = "loginText"
        loginText.style.display = "block"
        infoCont.appendChild(loginText);

        const loginBtn = document.createElement("button")
        loginBtn.textContent = "Login / Register"
        loginBtn.className = "login_btn"
        loginBtn.style.display = "block"
        loginBtn.addEventListener("click", () => { window.location.href = "/sites/login.html"; })
        infoCont.appendChild(loginBtn);

        const exText = document.createElement("h2")
        exText.textContent = "You can see an example garden below.";
        exText.style.textAlign = "center";
        exText.style.width = "100%";
        exText.style.marginTop = "2rem";

        gardensContainer.appendChild(exText);
        
        // Example garden data
        const exGarden = {
            id: 0,
            garden_name: "BetterStay",
            garden_content: "+,+,+,+,0,0,0,0,0,+,+,+,+;+,+,+,+,0,+,+,+,0,+,+,+,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,+,+,+,+,+,+,+,+,+,+,+,+"
        }
        
        renderGarden(exGarden, plants, true);
        return;
    }

    // --- LOGGED IN CASE ---

    const gardensResponse = await apiFetch("/api/gardens", {
        method: "GET"
    });
    if (!gardensResponse) return;
    const gardens = await gardensResponse.json();

    document.getElementById("newgarden_btn").addEventListener("click", () => {
        window.location.href = "/sites/newgarden.html";
    })
    document.getElementById("checkout_btn").addEventListener("click", () => {
        const gardensCont = document.getElementById("gardens-container");
        if (gardensCont) {
            gardensCont.scrollIntoView({ behavior: "smooth" });
        }
    })

    gardens.forEach(garden => {
        renderGarden(garden, plants, false);
    });
});

async function DeleteGarden(id) {
    const confirmed = await showConfirm("Are you sure you want to delete this garden? You will not be able to access this garden after deletion.", "Delete");
    if (confirmed) {
        const resp = await apiFetch(`/api/gardens/${id}`, {
            method: "DELETE"
        });
        if (resp && resp.ok) {
            window.location.reload();
        }
    }
}

function renderGarden(garden, plants, isExample = false) {
    const splittedContent = garden.garden_content.split(';');

    let plantCellsCount = 0;
    let disabledCellsCount = 0;
    let emptyCellsCount = 0;
    const usedPlants = new Set();

    splittedContent.forEach(row => {
        if (row === "") return;
        row.split(",").forEach(col => {
            if (col === "") { emptyCellsCount++; }
            else if (col === "+") { disabledCellsCount++; }
            else {
                plantCellsCount++;
                const plantId = parseInt(col);
                const plant = plants.find(p => p.id === plantId);
                if (plant) { usedPlants.add(plant.common_name); }
            }
        });
    });

    const maxCells = plantCellsCount + disabledCellsCount + emptyCellsCount;

    const gardenCard = document.createElement("div");
    gardenCard.className = "garden-card";
    gardenCard.id = "garden" + garden.id;

    const gardenTitle = document.createElement("h2");
    gardenTitle.className = "garden-name";
    gardenTitle.textContent = garden.garden_name;
    gardenCard.appendChild(gardenTitle);

    const cardBody = document.createElement("div");
    cardBody.className = "garden-card-body";

    // Left Side: Plant List
    const plantListCont = document.createElement("div");
    plantListCont.className = "plant-list-cont";
    const plantListTitle = document.createElement("h3");
    plantListTitle.textContent = "Plant List";
    plantListCont.appendChild(plantListTitle);

    if (usedPlants.size > 0) {
        const ul = document.createElement("ul");
        usedPlants.forEach(plantName => {
            const li = document.createElement("li");
            li.textContent = plantName;
            ul.appendChild(li);
        });
        plantListCont.appendChild(ul);
    } else {
        const emptyText = document.createElement("span");
        emptyText.textContent = "No plants.";
        plantListCont.appendChild(emptyText);
    }

    // Middle: Table Container
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-cont";
    tableContainer.appendChild(CreateTable(splittedContent, plants));

    // Right Side: Chart Container
    const chartCont = document.createElement("div");
    chartCont.className = "chart-cont";

    const stats = [
        { label: "Planted cell", value: plantCellsCount },
        { label: "Disabled cell", value: disabledCellsCount },
        { label: "Empty cell", value: emptyCellsCount }
    ];

    stats.forEach(stat => {
        const row = document.createElement("div");
        row.className = "chart-row";

        const label = document.createElement("div");
        label.className = "chart-label";
        label.textContent = stat.label;

        const barCont = document.createElement("div");
        barCont.className = "chart-bar-cont";

        const bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.width = maxCells > 0 ? `${(stat.value / maxCells) * 100}%` : "0%";

        const value = document.createElement("div");
        value.className = "chart-value";
        value.textContent = stat.value;

        barCont.appendChild(bar);
        row.appendChild(label);
        row.appendChild(barCont);
        row.appendChild(value);
        chartCont.appendChild(row);
    });

    cardBody.appendChild(plantListCont);
    cardBody.appendChild(tableContainer);
    cardBody.appendChild(chartCont);
    gardenCard.appendChild(cardBody);

    if (!isExample) {
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "✖";
        deleteBtn.className = "delete_btn";
        deleteBtn.addEventListener("click", () => DeleteGarden(garden.id));
        gardenCard.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.className = "edit_btn";
        editBtn.addEventListener("click", async () => {
            if (await showConfirm("Are you sure you want to edit this garden?")) {
                window.location.href = "/sites/editgarden.html?id=" + garden.id;
            }
        });
        gardenCard.appendChild(editBtn);
    }

    gardensContainer.appendChild(gardenCard);
}

function CreateTable(splittedContent, plants) {
    const table = document.createElement("table");
    table.className = "garden-table";
    table.style.display = "inline-table";

    const paths = {
        "fv": "../pics/icons/potted_plant_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
        "herbs": "../pics/icons/cannabis_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
        "flowers": "../pics/icons/local_florist_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
        "trees": "../pics/icons/forest_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
        "sgf": "../pics/icons/grass_25dp_000000_FILL0_wght400_GRAD0_opsz24.png"
    };

    splittedContent.forEach(row => {
        const columns = row.split(",");
        const tableRow = document.createElement("tr");

        columns.forEach(column => {
            const tableColumn = document.createElement("td");
            const plantId = parseInt(column);

            switch (column) {
                case "":
                    tableColumn.className = "empty-cell";
                    break;
                case "+":
                    tableColumn.className = "tobecollected-cell";
                    break;
                default:
                    const plant = plants.find(p => p.id === plantId);
                    tableColumn.className = "plant-cell";
                    const insidePicture = document.createElement("img")
                    if (plant) {
                        switch (plant.type) {
                            case "fruits":
                            case "vegetables":
                                insidePicture.src = paths.fv;
                                break;
                            case "herbs":
                                insidePicture.src = paths.herbs;
                                break;
                            case "succulents":
                            case "grass":
                            case "ferns":
                                insidePicture.src = paths.sgf;
                                break;
                            case "flowers":
                                insidePicture.src = paths.flowers;
                                break;
                            case "trees":
                                insidePicture.src = paths.trees;
                                break;
                            default:
                                break;
                        }
                        insidePicture.alt = plant.common_name;
                    } else {
                        insidePicture.alt = "";
                    }
                    tableColumn.appendChild(insidePicture)
                    break;
            }
            tableRow.appendChild(tableColumn);
        });
        table.appendChild(tableRow);
    });
    return table;
}