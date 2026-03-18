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

    // Initial Render
    EditGarden(garden, plants, editGardenContainer, controls);
    editGardenContainer.appendChild(controls.container);

});

//#########################################################

function loadContents(plants) {
    // Containers
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-container";
    controlsContainer.style.display = "none"; // Hidden until a cell is selected

    // Disabled button
    const disablecellbtn = document.createElement("button");
    disablecellbtn.textContent = "Empty Cell";
    disablecellbtn.className = "disablecellbtn";

    // Empty button
    const emptycellbtn = document.createElement("button");
    emptycellbtn.textContent = "Disable Cell";
    emptycellbtn.className = "emptycellbtn";

    // Plant button
    const plantcellbtn = document.createElement("button");
    plantcellbtn.textContent = "Plant Cell";
    plantcellbtn.className = "plantcellbtn";

    // Plant selection area
    const plantselection = document.createElement("div");
    plantselection.id = "plantselection";
    // plantselection.style.display = "none"; // Handled by CSS positioning now

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

    controlsContainer.appendChild(emptycellbtn);
    controlsContainer.appendChild(disablecellbtn);
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
    backBtn.onclick = () => {if (confirm("Are you sure you want to go back? Any unsaved changes will be lost.")) {window.location.href = "/gardens.html";}}

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Garden";
    deleteBtn.className = "delete_btn";
    deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this garden?")) {
            DeleteGarden(garden.id);
            window.location.href = "/gardens.html";
        }
    };

    const addRowsColumnsBtn = document.createElement("button");
    addRowsColumnsBtn.textContent = "Add Rows/Columns";
    addRowsColumnsBtn.className = "addrowscolumns_btn";
    addRowsColumnsBtn.onclick = () => {
        if (confirm("Are you sure you want to add rows/columns to this garden? Any unsaved changes will be lost.")) {
            AddRowsColumns(garden, plants, editGardenContainer);
        }
    }

    footer.appendChild(saveBtn);
    footer.appendChild(backBtn);
    footer.appendChild(deleteBtn);
    footer.appendChild(addRowsColumnsBtn);
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
    };

    const hideControls = () => {
        controls.container.style.display = "none";
        controls.selection.classList.remove('show');
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
        controls.selection.classList.add('show');
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
                controls.selection.classList.remove('show');
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

function AddRowsColumns(garden, plants, parentContainer) {
    const addRowsColumnsForm = document.createElement("form");
    addRowsColumnsForm.id = "addrowscolumns-form";
    addRowsColumnsForm.style.display = "flex";
    parentContainer.appendChild(addRowsColumnsForm);

    const addRowsLabel = document.createElement("label");
    addRowsLabel.textContent = "Add Rows: ";
    const addRowsInput = document.createElement("input");
    addRowsInput.type = "number";
    addRowsInput.min = "1";
    addRowsInput.max = "20";
    addRowsInput.value = "1";
    addRowsInput.id = "addrows-input";
    addRowsColumnsForm.appendChild(addRowsLabel);
    addRowsColumnsForm.appendChild(addRowsInput);

    const addColumnsLabel = document.createElement("label");
    addColumnsLabel.textContent = "Add Columns: ";
    const addColumnsInput = document.createElement("input");
    addColumnsInput.type = "number";
    addColumnsInput.min = "1";
    addColumnsInput.max = "20";
    addColumnsInput.value = "1";
    addColumnsInput.id = "addcolumns-input";
    addRowsColumnsForm.appendChild(addColumnsLabel);
    addRowsColumnsForm.appendChild(addColumnsInput);

    const addRowsColumnsBtn = document.createElement("button");
    addRowsColumnsBtn.textContent = "Add Rows/Columns";
    addRowsColumnsBtn.className = "addrowscolumns_btn";
    addRowsColumnsBtn.onclick = () => {
        if (confirm("Are you sure you want to add rows/columns to this garden? Any unsaved changes will be lost.")) {
            const addRows = addRowsInput.value;
            const addColumns = addColumnsInput.value;
            const splittedContent = garden.gardencontent.split(";");
            for (let j = 0; j < addColumns; j++) {
                for (let i = 0; i < addRows; i++) {
                    splittedContent[i] += ",";
                }
                splittedContent.push("+".repeat(addColumns));
            }
            
            console.log(splittedContent);
            //CreateTable(splittedContent, plants);
        }
    }
    addRowsColumnsForm.appendChild(addRowsColumnsBtn);
    
    
}
    
