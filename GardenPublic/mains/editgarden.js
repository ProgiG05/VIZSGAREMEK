document.addEventListener("DOMContentLoaded", async () => {
    const gardenId = window.location.search.split("=")[1];
    if (!gardenId) {
        alert("No garden ID provided!");
        window.location.href = "/gardens.html";
        return;
    }

    // 1. Fetch data
    const gardenResp = await fetch(`/api/gardens/${gardenId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const gardenArray = await gardenResp.json();
    const garden = gardenArray[0]; // The API returns an array

    if (!garden) {
        alert("Garden not found!");
        window.location.href = "/gardens.html";
        return;
    }

    const plantsResp = await fetch(`/api/plants`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResp.json();

    // 2. Setup UI
    const controls = loadContents(plants);
    const editGardenContainer = document.getElementById("editGardenContainer");
    
    // Add controls to the top
    editGardenContainer.appendChild(controls.container);

    // Initial Render
    EditGarden(garden, plants, editGardenContainer, controls);
});

//#########################################################

function loadContents(plants) {
    // Containers
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-container";
    controlsContainer.style.display = "none"; // Hidden until a cell is selected

    // Disabled button
    const disablecellbtn = document.createElement("button");
    disablecellbtn.textContent = "Disable Cell";
    disablecellbtn.className = "disablecellbtn";

    // Empty button
    const emptycellbtn = document.createElement("button");
    emptycellbtn.textContent = "Empty Cell";
    emptycellbtn.className = "emptycellbtn";

    // Plant button
    const plantcellbtn = document.createElement("button");
    plantcellbtn.textContent = "Plant Cell";
    plantcellbtn.className = "plantcellbtn";

    // Plant selection area
    const plantselection = document.createElement("div");
    plantselection.id = "plantselection";
    plantselection.style.display = "none";

    // Populate plants for selection
    plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "plant-card";
        card.dataset.id = plant.id;
        card.innerHTML = `
            <p><strong>${plant.commonName}</strong></p>
            <p><em>${plant.botanicalName}</em></p>
        `;
        plantselection.appendChild(card);
    });

    controlsContainer.appendChild(disablecellbtn);
    controlsContainer.appendChild(emptycellbtn);
    controlsContainer.appendChild(plantcellbtn);
    controlsContainer.appendChild(plantselection);

    return {
        container: controlsContainer,
        disableBtn: disablecellbtn,
        emptyBtn: emptycellbtn,
        plantBtn: plantcellbtn,
        selection: plantselection
    };
}

function CreateTable(splittedContent, plants) {
    const table = document.createElement("table");
    table.className = "garden-table";
    
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

function EditGarden(garden, plants, parentContainer, controls) {
    const gardenCard = document.createElement("div");
    gardenCard.className = "garden-card";
    gardenCard.id = "garden" + garden.id;
    gardenCard.innerHTML = `
        <h2 class="garden-name" contenteditable="true">${garden.gardenname}</h2>
    `;

    const splittedContent = garden.gardencontent.split(";");
    const table = CreateTable(splittedContent, plants);
    gardenCard.appendChild(table);

    // Footer buttons
    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.style.marginTop = "1rem";
    footer.style.display = "flex";
    footer.style.gap = "1rem";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Changes";
    saveBtn.className = "save_btn";
    
    const backBtn = document.createElement("button");
    backBtn.textContent = "Back to List";
    backBtn.className = "back_btn";
    backBtn.onclick = () => window.location.href = "/gardens.html";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Garden";
    deleteBtn.className = "delete_btn";
    deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this garden?")) {
            DeleteGarden(garden.id);
            window.location.href = "/gardens.html";
        }
    };

    footer.appendChild(saveBtn);
    footer.appendChild(backBtn);
    footer.appendChild(deleteBtn);
    gardenCard.appendChild(footer);

    parentContainer.appendChild(gardenCard);

    // Interactive Logic
    const getActiveCell = () => table.querySelector('td.active');

    table.addEventListener('click', (e) => {
        const cell = e.target.closest('td');
        if (cell) {
            const currentActive = getActiveCell();
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            cell.classList.add('active');
            showControls();
        }
    });

    document.addEventListener('click', (e) => {
        const clickedCell = e.target.closest('td');
        const clickedControls = e.target.closest('#controls-container');
        
        if (!clickedCell && !clickedControls) {
            const currentActive = getActiveCell();
            if (currentActive) {
                currentActive.classList.remove('active');
                hideControls();
            }
        }
    });

    const showControls = () => {
        controls.container.style.display = "flex";
        controls.selection.style.display = "none";

    };

    const hideControls = () => {
        controls.container.style.display = "none";
    };

    controls.disableBtn.onclick = () => {
        const cell = getActiveCell();
        if (cell) {
            cell.className = "tobecollected-cell";
            cell.textContent = "+";
            cell.classList.remove('active');
            controls.container.style.display = "none";
        }
    };

    controls.emptyBtn.onclick = () => {
        const cell = getActiveCell();
        if (cell) {
            cell.className = "empty-cell";
            cell.textContent = "";
            cell.classList.remove('active');
            controls.container.style.display = "none";
        }
    };

    controls.plantBtn.onclick = () => {
        controls.selection.style.display = "grid";
    };

    controls.selection.onclick = (e) => {
        const card = e.target.closest('.plant-card');
        if (card) {
            const plantId = parseInt(card.dataset.id);
            const plant = plants.find(p => p.id === plantId);
            const cell = getActiveCell();
            if (cell && plant) {
                cell.className = "plant-cell";
                cell.textContent = plant.commonName;
                cell.classList.remove('active');
                controls.container.style.display = "none";
                controls.selection.style.display = "none";
            }
        }
    };

    saveBtn.onclick = async () => {
        const gardenName = gardenCard.querySelector(".garden-name").textContent;
        const gardenTableData = Array.from(table.querySelectorAll("tr")).map(row => {
            return Array.from(row.querySelectorAll("td")).map(cell => {
                if (cell.classList.contains("empty-cell")) return "";
                if (cell.classList.contains("tobecollected-cell")) return "+";
                const plant = plants.find(p => p.commonName === cell.textContent);
                return plant ? plant.id : "";
            }).join(",");
        }).join(";");

        const updatedGarden = {
            id: garden.id,
            user_id: garden.user_id,
            name: gardenName,
            content: gardenTableData,
        };

        const result = await SaveGarden(updatedGarden);
        if (result) {
            alert("Garden saved successfully!");
            window.location.href = "/gardens.html";
        }
    };
}

async function SaveGarden(garden) {
    const resp = await fetch(`/api/gardens/${garden.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(garden)
    });
    return resp.json();
}

async function DeleteGarden(id) {
    const resp = await fetch(`/api/gardens/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return resp.json();
}