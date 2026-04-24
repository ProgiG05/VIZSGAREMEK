import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
import { getToken, apiFetch } from './api.js';

const handler = document.getElementById("handler");
const RowColumnManageSidePanel = document.getElementById("RowColumnManageSidePanel")

document.addEventListener("DOMContentLoaded", async () => {

    setupNavbar();
    const token = getToken();

    if (!token) {
        window.location.href = "/sites/login.html";
        return;
    }

    // ------------- GET GARDEN ID FROM URL --------------------------------------------------
    const urlparams = new URLSearchParams(window.location.search)
    const gardenId = urlparams.get("id");
    if (!gardenId) {
        alert("No garden ID provided!");
        window.location.href = "/gardens.html";
        return;
    }
    // ---------------------------------------------------------------------------------------


    // ------------- FETCH DATA --------------------------------------------------
    const gardenResp = await apiFetch(`/api/gardens/${gardenId}`, { method: "GET"});
    if (!gardenResp) return;
    // Handle err403 or err404 
    if (!gardenResp.ok) {
        const errorData = await gardenResp.json();
        alert(errorData.message || "Garden not found or access denied.");
        window.location.href = "/gardens.html";
        return;
    }
    
    const gardenArray = await gardenResp.json();
    if (!gardenArray || (Array.isArray(gardenArray) && gardenArray.length === 0)) {
        alert("Garden not found!");
        window.location.href = "/gardens.html";
        return;
    }
    const plantsResp = await fetch(`/api/plants`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    // ---------------------------------------------------------------------------------------


    // ------------- SETUP UI & INITIAL RENDER --------------------------------------------------
    const plants = await plantsResp.json();
    const editGardenContainer = document.getElementById("editGardenContainer");
    const controls = loadContents(plants);
    // ------------------------------------------------------------------------
    EditGarden(gardenArray, plants, editGardenContainer, controls);
    // ---------------------------------------------------------------------------------------

});



//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



// ------------- LOAD CONTENTS --------------------------------------------------
function loadContents(plants) {
    // Containers
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-container";
    controlsContainer.className = "controls-container";
    controlsContainer.style.display = "none"; // Hidden until a cell is selected

    // Disabled button
    const disablecellbtn = document.createElement("button");
    disablecellbtn.textContent = "Empty Cell";
    disablecellbtn.className = "disablecellbtn";
    controlsContainer.appendChild(disablecellbtn);

    // Empty button
    const emptycellbtn = document.createElement("button");
    emptycellbtn.textContent = "Disable Cell";
    emptycellbtn.className = "emptycellbtn";
    controlsContainer.appendChild(emptycellbtn);

    // Plant button
    const plantcellbtn = document.createElement("button");
    plantcellbtn.textContent = "Plant Cell";
    plantcellbtn.className = "plantcellbtn";
    controlsContainer.appendChild(plantcellbtn);

    // Plant selection area
    const plantselection = document.createElement("div");
    plantselection.id = "plantselection";

    // Search bar
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.className = "plant-search-bar";
    searchBar.placeholder = "Search by common name...";
    plantselection.appendChild(searchBar);

    // Columns container
    const columnsContainer = document.createElement("div");
    columnsContainer.className = "plant-columns-container";
    plantselection.appendChild(columnsContainer);

    // Group plants by type
    const plantsByType = {};
    plants.forEach(plant => {
        const type = plant.type || "Other";
        if (!plantsByType[type]) {
            plantsByType[type] = [];
        }
        plantsByType[type].push(plant);
    });

    const allCards = [];
    Object.keys(plantsByType).forEach(type => {
        const typeColumn = document.createElement("div");
        typeColumn.className = "plant-type-column";

        const typeTitle = document.createElement("h3");
        typeTitle.className = "plant-type-title";
        typeTitle.textContent = type;
        typeColumn.appendChild(typeTitle);

        plantsByType[type].forEach(plant => {
            const card = document.createElement("div");
            card.className = "plant-card";
            card.dataset.id = plant.id;
            
            const pCommonName = document.createElement("p")
            pCommonName.setAttribute("class","plant-selection-card-text")
            pCommonName.textContent = `${plant.common_name}`
            card.appendChild(pCommonName)

            const pBotamicalName = document.createElement("p")
            pBotamicalName.setAttribute("class","plant-selection-card-text")
            pBotamicalName.textContent = `${plant.botanical_name}`
            card.appendChild(pBotamicalName)

            allCards.push({card, commonName: plant.common_name.toLowerCase()});
            typeColumn.appendChild(card);
        });
        
        columnsContainer.appendChild(typeColumn);
    });

    // Search functionality
    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        allCards.forEach(item => {
            if (item.commonName.includes(searchTerm)) {
                item.card.style.display = "block";
            } else {
                item.card.style.display = "none";
            }
        });
    });

    controlsContainer.appendChild(plantselection);

    return {
        container: controlsContainer,
        disableBtn: disablecellbtn,
        emptyBtn: emptycellbtn,
        plantBtn: plantcellbtn,
        selection: plantselection
    };
}



//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



// ------------- CREATE TABLE --------------------------------------------------
function CreateTable(splittedContent, plants) {
    const table = document.createElement("table");
    table.className = "garden-table";
    
    // ------------- RENDER TABLE --------------------------------------------------
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
                    tableColumn.className = "disabled-cell";
                    tableColumn.textContent = "+";
                    break;
                default:
                    const plant = plants.find(p => p.id === plantId);
                    tableColumn.className = "plant-cell";
                    tableColumn.textContent = plant ? plant.common_name : "Unknown";
                    break;
            }
            tableRow.appendChild(tableColumn);
        });
        table.appendChild(tableRow);
    });
    return table;
}



//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



// ------------- EDIT GARDEN --------------------------------------------------
function EditGarden(garden, plants, parentContainer, controls) {
    const gardenCard = document.createElement("div");
    gardenCard.className = "garden-card";
    gardenCard.id = "garden" + garden.id;

    const gardenTitle = document.createElement("h2");
    gardenTitle.className = "garden-name";
    gardenTitle.textContent = garden.garden_name;
    gardenTitle.contentEditable = "true";
    gardenCard.appendChild(gardenTitle);


    // ------------- RENDER TABLE --------------------------------------------------
    const splittedContent = garden.garden_content.split(";");
    const table = CreateTable(splittedContent, plants);

    const tableAndControlsWrapper = document.createElement("div");
    tableAndControlsWrapper.className = "table-and-controls-wrapper";
    tableAndControlsWrapper.appendChild(table);
    tableAndControlsWrapper.appendChild(controls.container);
    
    // ------------- ACTION BUTTONS (Above Table) --------------------------------------------------
    const actionButtonsContainer = document.createElement("div");
    actionButtonsContainer.className = "action-buttons";
    actionButtonsContainer.style.display = "flex";
    actionButtonsContainer.style.gap = "1rem";
    actionButtonsContainer.style.justifyContent = "center";
    actionButtonsContainer.style.width = "100%";
    actionButtonsContainer.style.marginBottom = "1rem";

    const backBtn = document.createElement("button");
    backBtn.textContent = "Back to List";
    backBtn.className = "back_btn";
    backBtn.onclick = () => {if (confirm("Are you sure you want to go back? Any unsaved changes will be lost.")) {window.location.href = "/gardens.html";}}
    actionButtonsContainer.appendChild(backBtn);

    const manageRowsColumnsBtn = document.createElement("button");
    manageRowsColumnsBtn.textContent = "Manage Rows/Columns";
    manageRowsColumnsBtn.className = "manage_rows_columns_btn";
    manageRowsColumnsBtn.onclick = () => ManageRowsColumns(garden, plants, parentContainer, controls);
    actionButtonsContainer.appendChild(manageRowsColumnsBtn);

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Garden";
    resetBtn.className = "reset_btn";
    resetBtn.onclick = () => {
        if (confirm("Are you sure you want to reset this garden? Any unsaved changes will be lost.")) {
            window.location.reload();
        }
    };
    actionButtonsContainer.appendChild(resetBtn);

    gardenCard.appendChild(actionButtonsContainer);
    gardenCard.appendChild(tableAndControlsWrapper);

    // ------------- TOP RIGHT BUTTONS --------------------------------------------------
    const topRightActions = document.createElement("div");
    topRightActions.className = "top-right-actions";

    const saveBtn = document.createElement("button");
    saveBtn.title = "Save Changes";
    saveBtn.className = "save_btn";
    saveBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
    topRightActions.appendChild(saveBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.title = "Delete Garden";
    deleteBtn.className = "delete_btn";
    deleteBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
    deleteBtn.onclick = async () => {
        if (confirm("Are you sure you want to delete this garden?")) {
            await DeleteGarden(garden.id);
            window.location.href = "/sites/gardens.html";
        }
    };
    topRightActions.appendChild(deleteBtn);
    
    gardenCard.appendChild(topRightActions);

    parentContainer.appendChild(gardenCard);

    // ------------- INTERACTIVE LOGIC --------------------------------------------------
    const getActiveCell = () => table.querySelector('td.active');

    table.addEventListener('click', (e) => {
        const cell = e.target.closest('td');
        if (cell) {
            const currentActive = getActiveCell();
            if (currentActive) {currentActive.classList.remove('active');}
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
            cell.className = "disabled-cell";
            cell.textContent = "+";
            cell.classList.remove('active');
            controls.container.style.display = "none";
            garden.garden_content = tempSaveGardenData();
        }
    };

    controls.emptyBtn.onclick = () => {
        const cell = getActiveCell();
        if (cell) {
            cell.className = "empty-cell";
            cell.textContent = "";
            cell.classList.remove('active');
            controls.container.style.display = "none";
            garden.garden_content = tempSaveGardenData();
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
                cell.textContent = plant.common_name;
                cell.classList.remove('active');
                controls.container.style.display = "none";
                controls.selection.classList.remove('show');
            }
        }
        
        garden.garden_content = tempSaveGardenData();
    };

    function tempSaveGardenData() {
        const gardenTableData = Array.from(table.querySelectorAll("tr")).map(row => {
            return Array.from(row.querySelectorAll("td")).map(cell => {
                if (cell.classList.contains("empty-cell")) return "";
                if (cell.classList.contains("disabled-cell")) return "+";
                const plant = plants.find(p => p.common_name === cell.textContent);
                return plant ? plant.id : "";
            }).join(",");
        }).join(";");

        return gardenTableData;
    }

    saveBtn.onclick = async () => {
        const gardenName = gardenCard.querySelector(".garden-name").textContent;
        const gardenTableData = tempSaveGardenData();

        const updatedGarden = {
            id: garden.id,
            user_id: garden.user_id,
            name: gardenName,
            content: gardenTableData,
        };

        const result = await SaveGarden(updatedGarden);
        if (result) {
            alert("Garden saved successfully!");
            window.location.reload();
        }
    };
}

async function SaveGarden(garden) {
    const resp = await apiFetch(`/api/gardens/${garden.id}`, {
        method: "POST",
        body: JSON.stringify(garden)
    });
    return resp ? resp.json() : null;
}

async function DeleteGarden(id) {
    const resp = await apiFetch(`/api/gardens/${id}`, {method: "DELETE"});
    if (resp) {return resp.json();}
    return null;
}



//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



function ManageRowsColumns(garden, plants, parentContainer, controls) {
    const sidePanel = document.getElementById("RowColumnManageSidePanel");
    sidePanel.innerHTML = "";
    sidePanel.classList.add("open");

    const ManageRowsColumnContainer = document.createElement("div");
    ManageRowsColumnContainer.id = "manage-rows-columns-container";
    sidePanel.appendChild(ManageRowsColumnContainer);

    // ---------- Adding Rows and Columns ----------

    const addRowsColumnsForm = document.createElement("div");
    addRowsColumnsForm.id = "addrowscolumns-form";
    addRowsColumnsForm.style.display = "flex";
    ManageRowsColumnContainer.appendChild(addRowsColumnsForm);

    const addRowsLabel = document.createElement("label");
    addRowsLabel.textContent = "Add Rows: ";
    const addRowsInput = document.createElement("input");
    addRowsInput.type = "number";
    addRowsInput.min = "0";
    addRowsInput.max = "20";
    addRowsInput.value = "0";
    addRowsInput.id = "addrows-input";
    addRowsColumnsForm.appendChild(addRowsLabel);
    addRowsColumnsForm.appendChild(addRowsInput);

    const addColumnsLabel = document.createElement("label");
    addColumnsLabel.textContent = "Add Columns: ";
    const addColumnsInput = document.createElement("input");
    addColumnsInput.type = "number";
    addColumnsInput.min = "0";
    addColumnsInput.max = "20";
    addColumnsInput.value = "0";
    addColumnsInput.id = "addcolumns-input";
    addRowsColumnsForm.appendChild(addColumnsLabel);
    addRowsColumnsForm.appendChild(addColumnsInput);

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Close";
    cancelBtn.className = "cancel_btn";
    cancelBtn.onclick = () => { sidePanel.classList.remove("open"); }

    const addRowsColumnsBtn = document.createElement("button");
    addRowsColumnsBtn.textContent = "Add Rows/Columns";
    addRowsColumnsBtn.className = "addrowscolumns_btn";
    addRowsColumnsBtn.type = "button";
    addRowsColumnsBtn.onclick = () => {
        
        const addRows = parseInt(addRowsInput.value) || 0;
        const addColumns = parseInt(addColumnsInput.value) || 0;
        
        let rows = garden.garden_content.split(";");
        
        // Add columns to existing rows
        if (addColumns > 0) {
            rows = rows.map(row => {
                let cols = row.split(",");
                for (let i = 0; i < addColumns; i++) {
                    cols.push("");
                }
                return cols.join(",");
            });
        }

        // Add new rows
        if (addRows > 0) {
            const currentColumnCount = rows[0].split(",").length;
            for (let i = 0; i < addRows; i++) {
                const newRow = Array(currentColumnCount).fill("").join(",");
                rows.push(newRow);
            }
        }

        garden.garden_content = rows.join(";");

        // Re-render the garden
        parentContainer.innerHTML = "";
        EditGarden(garden, plants, parentContainer, controls);
    }
    addRowsColumnsForm.appendChild(addRowsColumnsBtn);

    // ---------- Removing Rows and Columns ----------

    const removeRowsColumnsForm = document.createElement("div");
    removeRowsColumnsForm.id = "removerowscolumns-form";
    ManageRowsColumnContainer.appendChild(removeRowsColumnsForm);

    const removeLastRowBtn = document.createElement("button");
    removeLastRowBtn.textContent = "Remove Last Row";
    removeLastRowBtn.className = "removelastrow_btn";
    removeLastRowBtn.type = "button";
    removeLastRowBtn.onclick = () => {
        if (confirm("Are you sure you want to remove the last row from this garden? Any unsaved changes will be lost.")) {
            let rows = garden.garden_content.split(";");

            if (!rows[rows.length - 1].split(",").map(val => val === "").includes(false)) {
                rows.pop();
            }
            else {
                alert("Last row is not empty, it cannot be removed.")
                return;
            }
            garden.garden_content = rows.join(";");
            console.log(garden.garden_content);
            // Re-render the garden
            parentContainer.innerHTML = "";
            EditGarden(garden, plants, parentContainer, controls);
        }
    }
    removeRowsColumnsForm.appendChild(removeLastRowBtn);

    const removeLastColumnBtn = document.createElement("button");
    removeLastColumnBtn.textContent = "Remove Last Column";
    removeLastColumnBtn.className = "removelastcolumn_btn";
    removeLastColumnBtn.type = "button";
    removeLastColumnBtn.onclick = () => {
        if (confirm("Are you sure you want to remove the last column from this garden? Any unsaved changes will be lost.")) {
            let rows = garden.garden_content.split(";");
            let canRemove = true;
            rows = rows.map(row => {
                let cols = row.split(",");
                if (cols[cols.length - 1] != "") {
                    canRemove = false;
                    return row
                }
                return cols.join(",");
            });
            if (canRemove) {
                rows = rows.map(row => {
                    let cols = row.split(",");
                    cols.pop();
                    return cols.join(",");
                });
            }
            else {
                alert("Last column is not empty, it cannot be removed.")
                return;
            }
            garden.garden_content = rows.join(";");
            // Re-render the garden
            parentContainer.innerHTML = "";
            EditGarden(garden, plants, parentContainer, controls);
        }
    }
    removeRowsColumnsForm.appendChild(removeLastColumnBtn);

    ManageRowsColumnContainer.appendChild(cancelBtn);
}