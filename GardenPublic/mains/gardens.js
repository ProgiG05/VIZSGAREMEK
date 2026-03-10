const gardensContainer = document.getElementById("gardens-container");

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Fetch data
    const gardensResponse = await fetch("/api/gardens", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const gardens = await gardensResponse.json();

    const plantsResponse = await fetch("/api/plants", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResponse.json();

    // 2. Create Global UI Elements (Buttons & Selection Area)
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-container";
    controlsContainer.style.margin = "20px 0";

    const disablecellbtn = document.createElement("button");
    disablecellbtn.textContent = "Disable Cell";
    disablecellbtn.className = "disablecellbtn";
    disablecellbtn.style.display = "none";

    const emptycellbtn = document.createElement("button");
    emptycellbtn.textContent = "Empty Cell";
    emptycellbtn.className = "emptycellbtn";
    emptycellbtn.style.display = "none";

    const plantcellbtn = document.createElement("button");
    plantcellbtn.textContent = "Plant Cell";
    plantcellbtn.className = "plantcellbtn";
    plantcellbtn.style.display = "none";

    const plantselection = document.createElement("div");
    plantselection.id = "plantselection";
    plantselection.style.display = "none";
    plantselection.style.marginTop = "10px";

    controlsContainer.appendChild(disablecellbtn);
    controlsContainer.appendChild(emptycellbtn);
    controlsContainer.appendChild(plantcellbtn);
    controlsContainer.appendChild(plantselection);
    
    // Insert controls before the gardens container
    gardensContainer.parentNode.insertBefore(controlsContainer, gardensContainer);

    // 3. Render Gardens
    gardens.forEach(garden => {
        const splittedContent = garden.gardencontent.split(";");
        const gardenCard = document.createElement("div");
        gardenCard.className = "garden-card";
        gardenCard.id = "garden" + garden.id
        gardenCard.innerHTML = `
            <h2>${garden.gardenname}</h2>
            <p>${garden.gardencontent}</p>
        `;

        gardenCard.appendChild(CreateTable(splittedContent, plants));
        const deleteBtn = document.createElement("button");
        deleteBtn.style.display = "block"
        deleteBtn.textContent = "Delete Garden";
        deleteBtn.className = "delete_btn";
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this garden?")) {
                DeleteGarden(garden.id);
            }
        });

        const editBtn = document.createElement("button");
        editBtn.style.display = "block"
        editBtn.textContent = "Edit Garden";
        editBtn.className = "edit_btn";
        editBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to edit this garden?")) {
                EditGarden(garden.id);
            }
        });

        gardenCard.appendChild(deleteBtn);
        gardenCard.appendChild(editBtn);
        gardensContainer.appendChild(gardenCard);
    });

    // 4. Helper Functions for UI State
    const getActiveCell = () => gardensContainer.querySelector('td.active');

    const showControls = () => {
        disablecellbtn.style.display = "inline-block";
        emptycellbtn.style.display = "inline-block";
        plantcellbtn.style.display = "inline-block";
    };

    const hideControls = () => {
        disablecellbtn.style.display = "none";
        emptycellbtn.style.display = "none";
        plantcellbtn.style.display = "none";
        plantselection.style.display = "none";
        plantselection.innerHTML = "";
    };

    const deactivateCell = (cell) => {
        if (cell) cell.classList.remove('active');
    };

    // 5. Event Listeners for Controls
    disablecellbtn.addEventListener("click", () => {
        const target = getActiveCell();
        if (target) {
            target.className = 'tobecollected-cell';
            target.textContent = "+";
            deactivateCell(target);
            hideControls();
        }
    });

    emptycellbtn.addEventListener('click', () => {
        const target = getActiveCell();
        if (target) {
            target.className = 'empty-cell';
            target.textContent = "";
            deactivateCell(target);
            hideControls();
        }
    });

    plantcellbtn.addEventListener("click", () => {
        plantselection.innerHTML = "";
        plantselection.style.display = "flex";
        plantselection.style.flexWrap = "wrap";
        plantselection.style.gap = "10px";

        plants.forEach(plant => {
            const card = document.createElement("div");
            card.className = "plant-card";
            card.dataset.id = plant.id; // Use dataset instead of raw ID for better delegation
            card.innerHTML = `
                <p><strong>${plant.commonName}</strong></p>
                <p>Alias: ${plant.botanicalName}</p>
                <p>Planting: ${plant.planting}</p>
                <p>Harvesting: ${plant.harvesting}</p>
            `;
            plantselection.appendChild(card);
        });
    });

    // Delegated listener for plant selection
    plantselection.addEventListener("click", (e) => {
        const clickedCard = e.target.closest('.plant-card');
        if (clickedCard) {
            const plantId = parseInt(clickedCard.dataset.id);
            const plant = plants.find(p => p.id === plantId);
            const target = getActiveCell();
            
            if (target && plant) {
                target.className = 'plant-cell';
                target.textContent = plant.commonName;
                deactivateCell(target);
                hideControls();
            }
        }
    });

    // 6. Global Click Listener for Table Cells
    document.addEventListener('click', (event) => {
        const clickedCell = event.target.closest('td');

        if (clickedCell && gardensContainer.contains(clickedCell)) {
            const currentActive = getActiveCell();
            if (currentActive && currentActive !== clickedCell) {
                deactivateCell(currentActive);
            }
            clickedCell.classList.add('active');
            showControls();
        } else {
            // If clicking outside cell & controls, hide everything
            if (!event.target.closest('#controls-container')) {
                const currentActive = getActiveCell();
                if (currentActive) {
                    deactivateCell(currentActive);
                    hideControls();
                }
            }
        }
    });
});

async function DeleteGarden(id) {
    const resp = await fetch(`/api/gardens/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await resp.json();
    console.log(data);
    window.location.reload();
}

function CreateTable(splittedContent, plants) {
    const table = document.createElement("table");
    table.className = "garden-table";
    table.style.display = "inline-table"; // Better layout for multiple tables
    
    splittedContent.forEach(row => {
        const columns = row.split(",");
        const tableRow = document.createElement("tr");

        columns.forEach(column => {
            const tableColumn = document.createElement("td");
            const plantId = parseInt(column);
            
            switch (column) {
                case "-":
                    tableColumn.className = "empty-cell";
                    break;
                case "":
                    tableColumn.className = "tobecollected-cell";
                    tableColumn.textContent = "+";
                    break;
                default:
                    const plant = plants.find(p => p.id === plantId);
                    tableColumn.className = "plant-cell";
                    tableColumn.textContent = plant ? plant.commonName : "Unknown";
                    break;
            }
            tableRow.appendChild(tableColumn);
        });
        table.appendChild(tableRow);
    });
    return table;
}

function EditGarden(gardenid) {
    const allCards = document.querySelectorAll(".garden-card");
    const targetId = "garden" + gardenid;
    
    allCards.forEach(card => {
        if (card.id === targetId) {
            card.style.display = "block";
            // Add a Back button if not already present
            if (!card.querySelector(".back_btn")) {
                const backBtn = document.createElement("button");
                backBtn.textContent = "Back to List";
                backBtn.className = "back_btn";
                backBtn.style.display = "block";
                backBtn.style.marginTop = "10px";
                backBtn.addEventListener("click", () => {
                    window.location.reload(); // Simple way to reset view
                });
                card.appendChild(backBtn);
            }
            // Hide the Edit button while editing
            const editBtn = card.querySelector(".edit_btn");
            if (editBtn) editBtn.style.display = "none";
        } else {
            card.style.display = "none";
        }
    });

    // Hide control buttons container unless a cell is active (handled by showControls)
    // The existing showControls logic will still work when cells are clicked.
}