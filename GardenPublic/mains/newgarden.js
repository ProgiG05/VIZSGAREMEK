import { setupNavbar } from './navbar.js';

document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/sites/login.html";
        return;
    }
    const container = document.getElementById("addGardenForm");
    ShowAddGardenForm(container);
});

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
        <button class="back_btn" onclick="window.location.href = '/gardens.html'">Cancel</button>
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
        const content = Array(parseInt(gardenRows)).fill(Array(parseInt(gardenColumns)).fill("+").join(",")).join(";");
        const garden = {
            user_id: null,
            garden_name: gardenName,
            garden_content: content,
        };
        await newGarden(garden);
        window.location.href = "/gardens.html";
    });
    document.body.appendChild(document.getElementById("addGardenForm"));
}

async function newGarden(garden) {
    const token = localStorage.getItem('token');
    const resp = await fetch(`/api/gardens/newgarden`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
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