import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';

const handler = document.getElementById("handler");


document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/sites/login.html";
        return;
    }

    // ####### GET GARDEN ID FROM URL #######
    const urlparams = new URLSearchParams(window.location.search)
    const gardenId = urlparams.get("id");
    if (!gardenId) {
        alert("No garden ID provided!");
        window.location.href = "/gardens.html";
        return;
    }

    // ####### FETCH DATA #######
    const gardenResp = await fetch(`/api/gardens/${gardenId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const gardenArray = await gardenResp.json();
    const garden = gardenArray[0]; // The API returns an array
    //console.log(garden)

    if (!gardenArray) {
        alert("Garden not found!");
        console.log(gardenArray)
        console.log(garden)
        //window.location.href = "/gardens.html";
        return;
    }

    const plantsResp = await fetch(`/api/plants`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const plants = await plantsResp.json();

    // ####### SETUP UI #######
    const controls = loadContents(plants);
    const editGardenContainer = document.getElementById("editGardenContainer");
    
    // ####### INITIAL RENDER #######
    EditGarden(gardenArray, plants, editGardenContainer, controls);
    editGardenContainer.appendChild(controls.container);

});

//#########################################################

// ####### LOAD CONTENTS #######
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
            <p><strong>${plant.common_name}</strong></p>
            <p><em>${plant.botanical_name}</em></p>
            <p>${plant.id}</p>
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

// ####### CREATE TABLE #######
function CreateTable(splittedContent, plants) {
    const table = document.createElement("table");
    table.className = "garden-table";
    
    // ####### RENDER TABLE #######
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
                    table.textContent += plant.type;
                    break;
            }
            tableRow.appendChild(tableColumn);
        });
        table.appendChild(tableRow);
    });
    return table;
}

// ####### EDIT GARDEN #######
function EditGarden(garden, plants, parentContainer, controls) {
    const gardenCard = document.createElement("div");
    gardenCard.className = "garden-card";
    gardenCard.id = "garden" + garden.id;

    const gardenTitle = document.createElement("h2");
    gardenTitle.className = "garden-name";
    gardenTitle.textContent = garden.garden_name;
    gardenTitle.contentEditable = "true";
    gardenCard.appendChild(gardenTitle);

    // const gardcontent = document.createElement('p')
    // gardcontent.textContent = garden.garden_content
    // gardenCard.appendChild(gardcontent)

    // ####### RENDER TABLE #######
    const splittedContent = garden.garden_content.split(";");
    const table = CreateTable(splittedContent, plants);
    gardenCard.appendChild(table);

    // ####### FOOTER BUTTONS #######
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
    deleteBtn.onclick = async () => {
        if (confirm("Are you sure you want to delete this garden?")) {
            await DeleteGarden(garden.id);
            window.location.href = "/sites/gardens.html";
        }
    };

    const manageRowsColumnsBtn = document.createElement("button");
    manageRowsColumnsBtn.textContent = "Manage Rows/Columns";
    manageRowsColumnsBtn.className = "manage_rows_columns_btn";
    manageRowsColumnsBtn.onclick = () => ManageRowsColumns(garden, plants, parentContainer, controls);

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Garden";
    resetBtn.className = "reset_btn";
    resetBtn.onclick = () => {
        if (confirm("Are you sure you want to reset this garden? Any unsaved changes will be lost.")) {
            window.location.reload();
        }
    };

    footer.appendChild(saveBtn);
    footer.appendChild(backBtn);
    footer.appendChild(deleteBtn);
    footer.appendChild(manageRowsColumnsBtn);
    footer.appendChild(resetBtn);
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
    const token = localStorage.getItem('token');
    const resp = await fetch(`/api/gardens/${garden.id}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(garden)
    });
    return resp.json();
}

async function DeleteGarden(id) {
    const token = localStorage.getItem('token');
    const resp = await fetch(`/api/gardens/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

function ManageRowsColumns(garden, plants, parentContainer, controls) {
    handler.innerHTML = "";
    const ManageRowsColumnContainer = document.createElement("div");
    ManageRowsColumnContainer.id = "manage-rows-columns-container";
    handler.appendChild(ManageRowsColumnContainer);

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
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel_btn";
    cancelBtn.onclick = () => {
        ManageRowsColumnContainer.style.display = "none";
    }

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
        console.log(garden.garden_content);
        // Re-render the garden
        parentContainer.innerHTML = "";
        EditGarden(garden, plants, parentContainer, controls);
        parentContainer.appendChild(controls.container);
    }
    addRowsColumnsForm.appendChild(addRowsColumnsBtn);



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
            parentContainer.appendChild(controls.container);
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
            parentContainer.appendChild(controls.container);
        }
    }
    removeRowsColumnsForm.appendChild(removeLastColumnBtn);

    ManageRowsColumnContainer.appendChild(cancelBtn);
}
    
