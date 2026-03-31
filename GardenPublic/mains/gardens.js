const gardensContainer = document.getElementById("gardens-container");

document.addEventListener("DOMContentLoaded", async () => {
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
    document.getElementById("newgarden_btn").addEventListener("click", () => {window.location.href = "/sites/newgarden.html";})
    
    // Insert controls before the gardens container

    // 3. Render Gardens
    gardens.forEach(garden => {
        const splittedContent = garden.gardencontent.split(";");
        const gardenCard = document.createElement("div");
        gardenCard.className = "garden-card";
        gardenCard.id = "garden" + garden.id
        gardenCard.innerHTML = `
            <h2 class="garden-name">${garden.gardenname}</h2>
        `;

        gardenCard.appendChild(CreateTable(splittedContent, plants));
        const deleteBtn = document.createElement("button");
        deleteBtn.style.display = "block"
        deleteBtn.textContent = "Delete Garden";
        deleteBtn.className = "delete_btn";
        // deleteBtn.style.display = "none";
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
                window.location.href = "/sites/editgarden.html?id=" + garden.id;
            }
        });

        gardenCard.appendChild(editBtn);
        gardenCard.appendChild(deleteBtn);
        gardensContainer.appendChild(gardenCard);
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