// --- Imports ---
import { setupSidePanel, setupLoginState, setupNavbar } from "./navbar.js";
import { getUser, apiFetch } from "./api.js";

// --- Page load setup ---

document.addEventListener("DOMContentLoaded", async () => {
  setupNavbar();
  setupSidePanel();
  setupLoginState();

  // Verify user login
  const user = getUser();
  if (!user) {
    window.location.href = "/sites/login.html";
    return;
  }

  // Initialize form
  showAddGardenForm();
});

// --- Garden addition form logic ---

function showAddGardenForm() {
  // Generate preview
  document.getElementById("preview-btn").addEventListener("click", () => {
    // Preview inputs
    const gardenRows = document.getElementById("garden-rows").value;
    const gardenColumns = document.getElementById("garden-columns").value;
    const previewContainer = document.getElementById("preview-container");

    previewContainer.innerHTML = "";

    // Return button
    const goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back Up";
    goBackBtn.className = "go-back-btn";

    goBackBtn.addEventListener("click", () => {
      previewContainer.innerHTML = "";
      document.getElementById("garden-rows").value = "";
      document.getElementById("garden-columns").value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Render preview
    previewContainer.appendChild(previewGarden(gardenRows, gardenColumns));
    previewContainer.appendChild(goBackBtn);

    document
      .getElementById("preview-container")
      .scrollIntoView({ behavior: "smooth" });
  });

  // Cancel form
  document.getElementById("cancel-btn").addEventListener("click", () => {
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";
    window.location.href = "/gardens.html";
  });

  // Save garden
  document
    .getElementById("add-garden-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Inputs
      const gardenName = document.getElementById("garden-name").value;
      const gardenRows = document.getElementById("garden-rows").value;
      const gardenColumns = document.getElementById("garden-columns").value;

      // Content matrix
      const content = Array(parseInt(gardenRows))
        .fill(Array(parseInt(gardenColumns)).fill("+").join(","))
        .join(";");
      const garden = {
        user_id: null,
        garden_name: gardenName,
        garden_content: content,
      };

      // Request
      await newGarden(garden);
      window.location.href = "/gardens.html";
    });
}

// --- API request (create new garden) ---

async function newGarden(garden) {
  const resp = await apiFetch(`/api/gardens/newgarden`, {
    method: "POST",
    body: JSON.stringify(garden),
  });
  return resp ? resp.json() : null;
}

// --- Generate preview table ---

function previewGarden(rows, columns) {
  // Table element
  const gardenTable = document.createElement("table");
  gardenTable.className = "garden-table";
  gardenTable.style.display = "inline-table";

  // Cells
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
