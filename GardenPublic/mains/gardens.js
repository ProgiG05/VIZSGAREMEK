import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';

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

    // Insert controls before the gardens container

    // 3. Render Gardens
    gardens.forEach(garden => {
        const splittedContent = garden.garden_content.split(";");
        const gardenCard = document.createElement("div");
        gardenCard.className = "garden-card";
        gardenCard.id = "garden" + garden.id;

        const gardenTitle = document.createElement("h2");
        gardenTitle.className = "garden-name";
        gardenTitle.textContent = garden.garden_name;
        gardenCard.appendChild(gardenTitle);

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
                    tableColumn.textContent = plant ? plant.common_name : "Unknown";
                    break;
            }
            tableRow.appendChild(tableColumn);
        });
        table.appendChild(tableRow);
    });
    return table;
}