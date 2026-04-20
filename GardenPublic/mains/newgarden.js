import { setupNavbar } from './navbar.js';
import { setupSidePanel} from './navbar.js';

document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();
    setupSidePanel();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/sites/login.html";
        return;
    }
    
    ShowAddGardenForm();
});

function ShowAddGardenForm() {
    const maincontainer = document.getElementById("add-garden-cont");

    const form = document.createElement('form');
    form.setAttribute('id', 'add-garden-form');
    form.setAttribute('class', 'add-garden-form');

    // --- Garden Name Section ---
    const labelName = document.createElement('label');
    labelName.setAttribute('for', 'gardenName');
    labelName.textContent = 'Garden Name:'; 

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'gardenName');
    inputName.setAttribute('name', 'gardenName');
    inputName.required = true; 

    // --- Garden Rows Section ---
    const labelRows = document.createElement('label');
    labelRows.setAttribute('for', 'gardenRows');
    labelRows.textContent = 'Rows:';

    const inputRows = document.createElement('input');
    inputRows.setAttribute('type', 'number');
    inputRows.setAttribute('id', 'gardenRows');
    inputRows.setAttribute('name', 'gardenRows');
    inputRows.setAttribute('max', '20');
    inputRows.setAttribute('min', '1');
    inputRows.required = true;

    // --- Garden Columns Section ---
    const labelCols = document.createElement('label');
    labelCols.setAttribute('for', 'gardenColumns');
    labelCols.textContent = 'Columns:';

    const inputCols = document.createElement('input');
    inputCols.setAttribute('type', 'number');
    inputCols.setAttribute('id', 'gardenColumns');
    inputCols.setAttribute('name', 'gardenColumns');
    inputCols.setAttribute('max', '20');
    inputCols.setAttribute('min', '1');
    inputCols.required = true;

    // --- Submit Button ---
    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Add Garden';

    // Assemble the Form
    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelRows);
    form.appendChild(inputRows);
    form.appendChild(labelCols);
    form.appendChild(inputCols);
    form.appendChild(submitBtn);

    maincontainer.appendChild(form)

    // 2. Create the External Buttons and Container

    const buttoncont = document.createElement("div")
    buttoncont.setAttribute("class","button-cont")

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('class', 'back_btn');
    cancelBtn.setAttribute('onclick', "window.location.href = '/gardens.html'");
    cancelBtn.textContent = 'Cancel';
    buttoncont.appendChild(cancelBtn)

    const previewBtn = document.createElement('button');
    previewBtn.setAttribute('class', 'preview_btn');
    previewBtn.setAttribute('id', 'preview_btn');
    previewBtn.textContent = 'Preview';
    buttoncont.appendChild(previewBtn)

    maincontainer.appendChild(buttoncont)

    const previewContainer = document.createElement('div');
    previewContainer.setAttribute('id', 'previewContainer');

    maincontainer.appendChild(previewContainer);

    document.getElementById("preview_btn").addEventListener("click", () => {
        const gardenRows = document.getElementById("gardenRows").value; 
        const gardenColumns = document.getElementById("gardenColumns").value;
        const previewContainer = document.getElementById("previewContainer");
        previewContainer.innerHTML = "";
        previewContainer.appendChild(previewGarden(gardenRows, gardenColumns));
    });
    document.getElementById("add-garden-form").addEventListener("submit", async (e) => {
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
    document.body.appendChild(document.getElementById("add-garden-form"));
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