import { setupNavbar } from './navbar.js';
import { setupSidePanel} from './navbar.js';

document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();
    setupSidePanel();

    const token = localStorage.getItem('token');
    if (!token) {  window.location.href = "/sites/login.html";  return;}
    
    ShowAddGardenForm();
});

function ShowAddGardenForm() {
    document.getElementById("preview_btn").addEventListener("click", () => {

        const gardenRows = document.getElementById("garden-rows").value; 
        const gardenColumns = document.getElementById("garden-columns").value;
        const previewContainer = document.getElementById("preview-container");

        previewContainer.innerHTML = "";
        previewContainer.appendChild(previewGarden(gardenRows, gardenColumns));
    });
    
    document.getElementById("add-garden-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const gardenName = document.getElementById("garden-name").value;
        const gardenRows = document.getElementById("garden-rows").value;
        const gardenColumns = document.getElementById("garden-columns").value;

        const content = Array(parseInt(gardenRows)).fill(Array(parseInt(gardenColumns)).fill("+").join(",")).join(";");
        const garden = {user_id: null,garden_name: gardenName,garden_content: content,};

        await newGarden(garden);
        window.location.href = "/gardens.html";
    });
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