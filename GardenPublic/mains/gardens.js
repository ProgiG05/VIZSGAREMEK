import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
// import { showPopup } from './popup.js';


const gardensContainer = document.getElementById("gardens-container");
const token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();

    const user = JSON.parse(localStorage.getItem("user"));

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
        return;
    }

    // 1. Fetch data

    const gardensResponse = await fetch("/api/gardens", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const gardens = await gardensResponse.json();
    console.log("Gardens:", gardens)

    const plantsResponse = await fetch("/api/plants", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResponse.json();
    console.log("Plants:", plants)

    // 2. Create Global UI Elements (Buttons & Selection Area)
    document.getElementById("newgarden_btn").addEventListener("click", () => {
        window.location.href = "/sites/newgarden.html";
    })
    document.getElementById("checkout_btn").addEventListener("click", () => {
        document.getElementById("gardens-container").scrollIntoView({ behavior: "smooth" })
    })

    // Insert controls before the gardens container

    // 3. Render Gardens
    gardens.forEach(garden => {
        const splittedContent = garden.garden_content.split(";");

        // 1. Calculate stats
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

        // --- CREATE CARD BODY ---
        const cardBody = document.createElement("div");
        cardBody.className = "garden-card-body";

        // Left Side: Plant List
        const plantListCont = document.createElement("div");
        plantListCont.className = "plant-list-cont";
        const plantListTitle = document.createElement("h3");
        plantListTitle.textContent = "Planted List";
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
            { label: "Plant cell", value: plantCellsCount },
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

        // Assemble Card Body
        cardBody.appendChild(plantListCont);
        cardBody.appendChild(tableContainer);
        cardBody.appendChild(chartCont);
        gardenCard.appendChild(cardBody);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "✖";
        deleteBtn.className = "delete_btn";
        deleteBtn.addEventListener("click", () => {
            // showPopup("Are you sure you want to delete this garden? You will not be able to access this garden after deletion.");
            if (confirm("Are you sure you want to delete this garden? You will not be able to access this garden after deletion.")) {
                DeleteGarden(garden.id);
            }
        });
        gardenCard.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.className = "edit_btn";
        editBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to edit this garden?")) {
                window.location.href = "/sites/editgarden.html?id=" + garden.id;
            }
        });
        gardenCard.appendChild(editBtn);


        gardensContainer.appendChild(gardenCard);
    });
});

async function DeleteGarden(id) {
    const resp = await fetch(`/api/gardens/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await resp.json();
    window.location.reload();
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
                    switch (plant.type) {
                        case "fruits" || "vegetables":
                            insidePicture.src = ""
                            insidePicture.src = paths.fv;
                            insidePicture.alt = `${plant ? plant.common_name : "Unknown"}`
                            break;
                        case "herbs":
                            insidePicture.src = ""
                            insidePicture.src = paths.herbs;
                            insidePicture.alt = `${plant ? plant.common_name : "Unknown"}`
                            break;
                        case "succulents" || "grass" || "ferns":
                            insidePicture.src = ""
                            insidePicture.src = paths.sgf;
                            insidePicture.alt = `${plant ? plant.common_name : "Unknown"}`
                            break;
                        case "flowers":
                            insidePicture.src = ""
                            insidePicture.src = paths.flowers;
                            insidePicture.alt = plant ? plant.common_name : "Unknown"
                            break;
                        case "trees":
                            insidePicture.src = ""
                            insidePicture.src = paths.trees;
                            insidePicture.alt = plant ? plant.common_name : "Unknown"
                            break;
                        default:
                            break;
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