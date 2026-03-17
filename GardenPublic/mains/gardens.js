const gardensContainer = document.getElementById("gardens-container");

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Fetch data
    const gardensResponse = await fetch("/api/gardens", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const gardens = await gardensResponse.json();
    console.log(gardens)

    const plantsResponse = await fetch("/api/plants", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResponse.json();
    console.log(plants)

    // 2. Create Global UI Elements (Buttons & Selection Area)

    //creating the add button on top
    const newGardenBtn = document.createElement("button");
    newGardenBtn.className = "newgarden_btn";
    newGardenBtn.textContent = "Add New Garden";
    newGardenBtn.addEventListener("click", async () => {
        await ShowAddGardenForm(gardensContainer);
    })




    //containers
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-container";
    controlsContainer.style.margin = "auto";
    controlsContainer.style.alignItems = "center";
    controlsContainer.style.display = "none";

    //disabled button
    const disablecellbtn = document.createElement("button");
    disablecellbtn.textContent = "Disable Cell";
    disablecellbtn.className = "disablecellbtn";
    disablecellbtn.style.display = "none";

    //empty button
    const emptycellbtn = document.createElement("button");
    emptycellbtn.textContent = "Empty Cell";
    emptycellbtn.className = "emptycellbtn";
    emptycellbtn.style.display = "none";

    //plant button
    const plantcellbtn = document.createElement("button");
    plantcellbtn.textContent = "Plant Cell";
    plantcellbtn.className = "plantcellbtn";
    plantcellbtn.style.display = "none";

    //plant selection
    const plantselection = document.createElement("div");
    plantselection.id = "plantselection";
    plantselection.style.display = "none";
    plantselection.style.marginTop = "10px";


    gardensContainer.appendChild(newGardenBtn);
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
            <h2 class="garden-name">${garden.gardenname}</h2>
            <p>${garden.gardencontent}</p>
        `;

        gardenCard.appendChild(CreateTable(splittedContent, plants));
        const deleteBtn = document.createElement("button");
        deleteBtn.style.display = "block"
        deleteBtn.textContent = "Delete Garden";
        deleteBtn.className = "delete_btn";
        deleteBtn.style.display = "none";
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this garden? You will not be able to access this garden after deletion.")) {
                DeleteGarden(garden.id);
            }
        });
        gardenCard.appendChild(document.createElement("br"));

        const editBtn = document.createElement("button");
        editBtn.style.display = "block"
        editBtn.textContent = "Edit Garden";
        editBtn.className = "edit_btn";
        editBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to edit this garden?")) {
                EditGarden(garden.id, plants, newGardenBtn);
                deleteBtn.style.display = "block";
            }
        });

        gardenCard.appendChild(deleteBtn);
        gardenCard.appendChild(editBtn);
        gardensContainer.appendChild(gardenCard);
    });

    // 4. Helper Functions for UI State
    const getActiveCell = () => gardensContainer.querySelector('td.active');

    const showControls = () => {
        controlsContainer.style.display = "flex";
        disablecellbtn.style.display = "inline-block";
        emptycellbtn.style.display = "inline-block";
        plantcellbtn.style.display = "inline-block";
    };

    const hideControls = () => {
        controlsContainer.style.display = "none";
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
            const gardenCard = clickedCell.closest('.garden-card');
            if (!gardenCard || !gardenCard.classList.contains('is-editing')) {
                return; // Only allow interaction if the garden is being edited
            }

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
    table.style.display = "inline-table";

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

function EditGarden(gardenid, plants, newgarden) {
    newgarden.style.display = "none";
    const allCards = document.querySelectorAll(".garden-card");
    const targetId = "garden" + gardenid;
    const gardenName = document.getElementById("garden" + gardenid).querySelector(".garden-name");
    gardenName.addEventListener("click", () => {
        gardenName.contentEditable = true;
        gardenName.focus();
    })

    allCards.forEach(card => {
        if (card.id === targetId) {
            card.style.display = "block";
            card.classList.add("is-editing");
            card.style.margin = "auto";
            // Add a Back button if not already present
            if (!card.querySelector(".back_btn")) {
                const backBtn = document.createElement("button");
                backBtn.textContent = "Back to List";
                backBtn.className = "back_btn";
                backBtn.style.display = "inline-block";
                backBtn.style.marginTop = "10px";
                backBtn.addEventListener("click", () => {
                    window.location.reload(); // Simple way to reset view
                });
                card.appendChild(backBtn);

                const saveBtn = document.createElement("button");
                saveBtn.textContent = "Save Changes";
                saveBtn.className = "save_btn";
                saveBtn.style.display = "inline-block";
                saveBtn.style.marginTop = "10px";
                saveBtn.addEventListener("click", async () => {
                    const gardenTable = card.querySelector("table");

                    const gardenTableData = Array.from(gardenTable.querySelectorAll("tr")).map(row => {
                        return Array.from(row.querySelectorAll("td")).map(cell => {
                            switch (cell.textContent) {
                                case "":
                                    return "";
                                case "+":
                                    return "+";
                                default:
                                    const plant = plants.find(p => p.commonName === cell.textContent);
                                    return plant ? plant.id : "";
                            }
                        }).join(",");
                    }).join(";");

                    console.log("Saving garden content:", gardenTableData);
                    const garden = {
                        id: gardenid,
                        user_id: null,
                        name: gardenName.textContent,
                        content: gardenTableData,
                    };
                    await SaveGarden(garden);
                    console.log("Garden saved:", garden);
                    window.location.reload();
                });
                card.appendChild(saveBtn);
            }
            // Hide the Edit button while editing
            const editBtn = card.querySelector(".edit_btn");
            if (editBtn) editBtn.style.display = "none";
        } else {
            card.style.display = "none";
        }
    });

}

async function SaveGarden(garden) {
    const resp = await fetch(`/api/gardens/${garden.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(garden)
    });
    return resp.json();
}

async function ShowAddGardenForm(container) {
    container.innerHTML = `
        <form id="addGardenForm">
        <label for="gardenName">Garden Name:</label>
        <input type="text" id="gardenName" name="gardenName" required>
        <label for="gardenRows">Rows:</label>
        <input type="number" id="gardenRows" name="gardenRows" max="20" min="1" required>
        <label for="gardenColumns">Columns:</label>
        <input type="number" id="gardenColumns" name="gardenColumns" max="20" min="1" required>
        <button type="submit">Add Garden</button>
        </form>
        <button class="back_btn" onclick="window.location.reload()">Cancel</button>
        <button class="preview_btn" id="preview_btn">Preview</button>
        <div id="previewContainer"></div>
    `;
    document.getElementById("preview_btn").addEventListener("click", () => {
        const gardenRows = document.getElementById("gardenRows").value;
        const gardenColumns = document.getElementById("gardenColumns").value;
        const previewContainer = document.getElementById("previewContainer");
        previewContainer.innerHTML = "";
        previewContainer.appendChild(previewGarden(gardenRows, gardenColumns));
    });
    document.getElementById("addGardenForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const gardenName = document.getElementById("gardenName").value;
        const gardenRows = document.getElementById("gardenRows").value;
        const gardenColumns = document.getElementById("gardenColumns").value;
        const content = Array(parseInt(gardenRows)).fill(
            Array(parseInt(gardenColumns)).fill("+").join(",")
        ).join(";");
        const garden = {
            user_id: null,
            gardenname: gardenName,
            gardencontent: content,
        };
        console.log(garden);
        await newGarden(garden);
        console.log("Garden added:", garden);
        window.location.reload();
    });
    document.body.appendChild(document.getElementById("addGardenForm"));
}

async function newGarden(garden) {
    const resp = await fetch(`/api/gardens/newgarden`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(garden)
    });
    return resp.json();
}

function previewGarden(rows, columns) {
    const gardenTable = document.createElement("table");
    gardenTable.className = "garden-table";
    gardenTable.style.display = "inline-table";
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("td");
            cell.textContent = "+";
            row.appendChild(cell);
        }
        gardenTable.appendChild(row);
    }
    return gardenTable;
}

