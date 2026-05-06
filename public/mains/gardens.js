import { setupNavbar, setupSidePanel, setupLoginState } from "./navbar.js";
import { getUser, apiFetch } from "./api.js";
import { showConfirm } from "./popup.js";

// --- Setup ---

document.addEventListener("DOMContentLoaded", async () => {
  // Setup
  setupNavbar();
  setupSidePanel();
  setupLoginState();
  setupTopButton();

  const gardensContainer = document.getElementById("gardens-container");
  const user = getUser();

  // Fetch plants
  const plantsResponse = await fetch("/api/plants", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const plants = await plantsResponse.json();

  // Guest view
  if (!user) {
    const infoCont = document.getElementById("information-cont");

    const newGardenBtn = document.getElementById("newgarden_btn");
    const checkoutBtn = document.getElementById("checkout_btn");

    if (newGardenBtn) newGardenBtn.style.display = "none";
    if (checkoutBtn) checkoutBtn.style.display = "none";

    const loginText = document.createElement("h1");
    loginText.textContent =
      "You need to be logged in to view and create gardens.";
    loginText.className = "loginText";
    loginText.style.display = "block";
    infoCont.appendChild(loginText);

    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Login / Register";
    loginBtn.className = "login_btn";
    loginBtn.style.display = "block";
    loginBtn.addEventListener("click", () => {
      window.location.href = "/sites/login.html";
    });
    infoCont.appendChild(loginBtn);

    const exText = document.createElement("h2");
    exText.textContent =
      "This is how a garden layout would look like. You can see an example garden below.";
    exText.className = "exampleText";

    if (gardensContainer) gardensContainer.appendChild(exText);

    // Example garden
    const exGarden = {
      id: 0,
      garden_name: "BetterStay",
      garden_content:
        "+,+,+,+,0,0,0,0,0,+,+,+,+;+,+,+,+,0,+,+,+,0,+,+,+,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,0,0,0,0,0,0,0,0,0,0,0,+;+,+,+,+,+,+,+,+,+,+,+,+,+",
    };

    renderGarden(exGarden, plants, true);
    return;
  }

  // Logged in gardens
  const gardensResponse = await apiFetch("/api/gardens", {
    method: "GET",
  });
  if (!gardensResponse || !gardensResponse.ok) return;
  const gardens = await gardensResponse.json();

  const newGardenBtn = document.getElementById("newgarden_btn");
  const checkoutBtn = document.getElementById("checkout_btn");

  if (newGardenBtn) {
    newGardenBtn.addEventListener("click", () => {
      window.location.href = "/sites/newgarden.html";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (gardensContainer) {
        gardensContainer.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (gardensContainer) {
    gardens.forEach((garden) => {
      renderGarden(garden, plants, false);
    });
  }
});

// --- Delete garden logic ---

async function DeleteGarden(id) {
  const confirmed = await showConfirm(
    "Are you sure you want to delete this garden? You will not be able to access this garden after deletion.",
    "Delete",
  );
  if (confirmed) {
    const resp = await apiFetch(`/api/gardens/${id}`, {
      method: "DELETE",
    });
    if (resp && resp.ok) {
      window.location.reload();
    }
  }
}

// --- Render garden logic ---

function renderGarden(garden, plants, isExample = false) {
  const gardensContainer = document.getElementById("gardens-container");
  if (!gardensContainer) return;

  const splittedContent = garden.garden_content.split(";");

  // Plant metrics
  let plantCellsCount = 0;
  let disabledCellsCount = 0;
  let emptyCellsCount = 0;
  const usedPlants = new Set();

  const soilCounts = {};
  const waterCounts = {};
  const sunlightCounts = {};

  splittedContent.forEach((row) => {
    if (row === "") return;
    row.split(",").forEach((col) => {
      if (col === "") {
        emptyCellsCount++;
      } else if (col === "+") {
        disabledCellsCount++;
      } else {
        plantCellsCount++;
        const plantId = parseInt(col);
        const plant = plants.find((p) => p.id === plantId);
        if (plant) {
          usedPlants.add(plant.common_name);

          const s = plant.soil || plant.Soil;
          const w = plant.water || plant.Watering;
          const sl = plant.sunlight || plant.Sunlight;

          if (s) soilCounts[s] = (soilCounts[s] || 0) + 1;
          if (w) waterCounts[w] = (waterCounts[w] || 0) + 1;
          if (sl) sunlightCounts[sl] = (sunlightCounts[sl] || 0) + 1;
        }
      }
    });
  });

  // Average values
  const getMostFrequent = (counts) => {
    let max = 0;
    let mostFrequent = "N/A";
    for (const key in counts) {
      if (counts[key] > max) {
        max = counts[key];
        mostFrequent = key;
      }
    }
    return mostFrequent;
  };

  const avgSoil = getMostFrequent(soilCounts);
  const avgWater = getMostFrequent(waterCounts);
  const avgSunlight = getMostFrequent(sunlightCounts);

  const maxCells = plantCellsCount + disabledCellsCount + emptyCellsCount;

  // Garden card
  const gardenCard = document.createElement("div");
  gardenCard.className = "garden-card";
  gardenCard.id = "garden" + garden.id;

  const gardenTitle = document.createElement("h2");
  gardenTitle.className = "garden-name";
  gardenTitle.textContent = garden.garden_name;
  gardenCard.appendChild(gardenTitle);

  const cardBody = document.createElement("div");
  cardBody.className = "garden-card-body";

  // Plant list
  const plantListCont = document.createElement("div");
  plantListCont.className = "plant-list-cont";
  const plantListTitle = document.createElement("h3");
  plantListTitle.textContent = "Plant List";
  plantListCont.appendChild(plantListTitle);

  if (usedPlants.size > 0) {
    const ul = document.createElement("ul");
    usedPlants.forEach((plantName) => {
      const li = document.createElement("li");
      li.textContent = plantName;
      ul.appendChild(li);
    });
    plantListCont.appendChild(ul);
  } else {
    const emptyText = document.createElement("span");
    emptyText.textContent = "No plants.";
    plantListCont.appendChild(emptyText);
  }

  // Table container
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-cont";

  // Garden layout
  const activeRows = splittedContent.filter((r) => r.trim() !== "");
  const rowsCount = activeRows.length;
  let colsCount = 0;
  if (rowsCount > 0) {
    colsCount = activeRows[0].split(",").length;
  }

  const genericDetails = document.createElement("div");
  genericDetails.className = "generic-details";
  const detailsTitle = document.createElement("h3");
  detailsTitle.textContent = "Garden Layout";
  const detailsText = document.createElement("p");
  detailsText.textContent = `${rowsCount} x ${colsCount} Grid`;
  genericDetails.appendChild(detailsTitle);
  genericDetails.appendChild(detailsText);

  tableContainer.appendChild(genericDetails);

  // Garden table
  tableContainer.appendChild(CreateTable(splittedContent, plants));

  // Right side
  const rightSideCont = document.createElement("div");
  rightSideCont.className = "right-side-cont";

  // Chart
  const chartCont = document.createElement("div");
  chartCont.className = "chart-cont";

  const stats = [
    { label: "Planted cell", value: plantCellsCount },
    { label: "Disabled cell", value: disabledCellsCount },
    { label: "Empty cell", value: emptyCellsCount },
  ];

  stats.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("div");
    label.className = "chart-label";
    label.textContent = stat.label;

    const barCont = document.createElement("div");
    barCont.className = "chart-bar-cont";

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.width = maxCells > 0 ? `${(stat.value / maxCells) * 100}%` : "0%";

    const value = document.createElement("div");
    value.className = "chart-value";
    value.textContent = stat.value;

    barCont.appendChild(bar);
    row.appendChild(label);
    row.appendChild(barCont);
    row.appendChild(value);
    chartCont.appendChild(row);
  });

  // Extra stats
  const extraStatsCont = document.createElement("div");
  extraStatsCont.className = "extra-stats-cont";

  const extraStatsTitle = document.createElement("h3");
  extraStatsTitle.textContent = "Garden Averages";
  extraStatsCont.appendChild(extraStatsTitle);

  const extraStats = [
    { label: "Soil", value: avgSoil },
    { label: "Watering", value: avgWater },
    { label: "Sunlight", value: avgSunlight },
  ];

  extraStats.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "extra-stat-row";

    const label = document.createElement("span");
    label.className = "extra-stat-label";
    label.textContent = stat.label + ":";

    const value = document.createElement("span");
    value.className = "extra-stat-value";
    value.textContent =
      stat.value !== "N/A"
        ? stat.value.charAt(0).toUpperCase() + stat.value.slice(1)
        : stat.value;

    row.appendChild(label);
    row.appendChild(value);
    extraStatsCont.appendChild(row);
  });

  rightSideCont.appendChild(chartCont);
  rightSideCont.appendChild(extraStatsCont);

  cardBody.appendChild(plantListCont);
  cardBody.appendChild(tableContainer);
  cardBody.appendChild(rightSideCont);
  gardenCard.appendChild(cardBody);

  // Action buttons
  if (!isExample) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.className = "delete_btn";
    deleteBtn.addEventListener("click", () => DeleteGarden(garden.id));
    gardenCard.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.className = "edit_btn";
    editBtn.addEventListener("click", async () => {
      if (await showConfirm("Are you sure you want to edit this garden?")) {
        window.location.href = "/sites/editgarden.html?id=" + garden.id;
      }
    });
    gardenCard.appendChild(editBtn);
  }

  gardensContainer.appendChild(gardenCard);
}

// --- Create table ---

function CreateTable(splittedContent, plants) {
  const table = document.createElement("table");
  table.className = "garden-table";
  table.style.display = "inline-table";

  // Plant icons
  const paths = {
    fruits:
      "../pics/icons/nutrition_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    vegetables:
      "../pics/icons/potted_plant_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    herbs: "../pics/icons/cannabis_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    flowers:
      "../pics/icons/local_florist_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    trees: "../pics/icons/forest_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    succulents:
      "../pics/icons/psychiatry_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
    grass_ferns:
      "../pics/icons/grass_25dp_000000_FILL0_wght400_GRAD0_opsz24.png",
  };

  // Rows and cells
  splittedContent.forEach((row) => {
    const columns = row.split(",");
    const tableRow = document.createElement("tr");

    columns.forEach((column) => {
      const tableColumn = document.createElement("td");
      const plantId = parseInt(column);

      switch (column) {
        case "":
          tableColumn.className = "empty-cell";
          break;
        case "+":
          tableColumn.className = "tobecollected-cell";
          break;
        default:
          const plant = plants.find((p) => p.id === plantId);
          tableColumn.className = "plant-cell";
          const insidePicture = document.createElement("img");
          if (plant) {
            switch (plant.type) {
              case "fruits":
                insidePicture.src = paths.fruits;
                break;
              case "vegetables":
                insidePicture.src = paths.vegetables;
                break;
              case "herbs":
                insidePicture.src = paths.herbs;
                break;
              case "succulents":
                insidePicture.src = paths.succulents;
                break;
              case "grass":
                insidePicture.src = paths.grass_ferns;
                break;
              case "ornamental":
                insidePicture.src = paths.grass_ferns;
                break;
              case "mosses":
                insidePicture.src = paths.grass_ferns;
                break;
              case "ferns":
                insidePicture.src = paths.grass_ferns;
                break;
              case "flowers":
                insidePicture.src = paths.flowers;
                break;
              case "trees":
                insidePicture.src = paths.trees;
                break;
              default:
                break;
            }
            insidePicture.alt = plant.common_name;
          } else {
            insidePicture.alt = "";
          }
          tableColumn.appendChild(insidePicture);
          break;
      }
      tableRow.appendChild(tableColumn);
    });
    table.appendChild(tableRow);
  });
  return table;
}

// --- Utility ---

function setupTopButton() {
  const topBtn = document.getElementById("toup");
  if (!topBtn) return;

  // Scroll to top
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
