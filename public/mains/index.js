import { setupNavbar, setupSidePanel, setupLoginState } from "./navbar.js";

// --- Plant search helper text ---

const plantSpecs = {
  watering: {
    low: "Allow soil to dry completely before giving a thorough soak.",
    medium: "Apply water when the top inch of soil feels dry.",
    high: "Keep soil consistently moist without allowing it to become waterlogged.",
  },
  sunlight: {
    low: "Shady indoor corners or full shade under outdoor tree canopies.",
    moderate:
      "Bright filtered light indoors or dappled shade in outdoor spaces.",
    high: "Direct window sun indoors or full sun in outdoor gardens.",
  },
  soil: {
    low: "Lean, well-draining substrate with very minimal organic matter or nutrients.",
    moderate:
      "Balanced medium with a steady, moderate supply of essential nutrients.",
    high: "Dense, fertile medium packed with high concentrations of organic matter.",
  },
};

// --- Setup ---

document.addEventListener("DOMContentLoaded", async () => {
  // Setup
  setupNavbar();
  setupSidePanel();
  setupLoginState();

  loadPreviewGarden();
  setupGardenMakerAnimation();
  setupScrollAnimations();
  setupDetailsToggle();
  setupClearFilterButtons();
  setupPlantSearch();

  await loadIdeas();
});

// --- Load showcase ideas ---

async function loadIdeas() {
  const IdeasCardContainer = document.getElementById("showcase-container");
  if (!IdeasCardContainer) return;

  // Request
  try {
    const responseIdeas = await fetch("/api/ideas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });

    if (!responseIdeas.ok) {
      throw new Error("Failed to fetch ideas.");
    }

    const ListOfIdeas = await responseIdeas.json();
    const returnIdeas = ListOfIdeas.slice(0, 3);

    // Cards
    returnIdeas.forEach((idea) => {
      const card = createIdeaCard(idea);
      IdeasCardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load ideas:", error.message);
  }
}

function loadPreviewGarden(){
  const previewGarden = document.getElementById("garden-preview");
  const table = document.createElement("table");
  for (let i = 0; i < 9; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);   
    }
    table.appendChild(tr);  
  }
  previewGarden.appendChild(table);
}

// --- Create idea card ---

function createIdeaCard(idea) {
  // Card container
  const OneIdeaCard = document.createElement("div");
  OneIdeaCard.setAttribute("class", "garden-card");

  // Image
  const imgWrapper = document.createElement("div");
  imgWrapper.setAttribute("class", "image-placeholder-wrapper");

  const imgPlace = document.createElement("img");
  imgPlace.setAttribute("class", "insideImage");
  imgPlace.setAttribute("id", "insideImage");
  imgPlace.setAttribute("src", "../pics/gardenideas/" + idea.picture + ".png");
  imgPlace.setAttribute("alt", `${idea.title}`);

  imgWrapper.appendChild(imgPlace);
  OneIdeaCard.appendChild(imgWrapper);

  // Title
  const OneIdeaTitle = document.createElement("h2");
  OneIdeaTitle.textContent = idea.title;
  OneIdeaTitle.setAttribute("class", "card-title");
  OneIdeaCard.appendChild(OneIdeaTitle);

  // Description
  const OneIdeaDescription = document.createElement("p");
  OneIdeaDescription.textContent = idea.description;
  OneIdeaDescription.setAttribute("class", "card-description");
  OneIdeaCard.appendChild(OneIdeaDescription);

  // Plant list
  OneIdeaCard.appendChild(document.createElement("hr"));

  const plantList = document.createElement("p");
  plantList.setAttribute("class", "plant-list");

  idea.plants.split(",").forEach((plantName) => {
    const link = document.createElement("a");
    link.setAttribute("class", "plantListItem");
    link.setAttribute("href", "#");
    link.textContent = plantName.trim() + " ";
    plantList.appendChild(link);
  });

  OneIdeaCard.appendChild(plantList);

  // Footer stats
  const cardFooter = document.createElement("div");
  cardFooter.setAttribute("class", "card-footer");

  const statsContainer = document.createElement("div");
  statsContainer.setAttribute("class", "stats-container");

  statsContainer.appendChild(createStatBox("Sunlight", idea.sunlight));
  statsContainer.appendChild(createStatBox("Water", idea.water));
  statsContainer.appendChild(createStatBox("Hardiness", idea.maintenance));

  cardFooter.appendChild(statsContainer);

  // Save button
  const potButton = document.createElement("button");
  potButton.setAttribute("class", "pot-button");
  potButton.setAttribute("title", "save this garden idea");
  potButton.setAttribute("aria-label", "Toggle Save");
  potButton.addEventListener("click", () => toggleSaveState(potButton));

  const flowerAssembly = document.createElement("div");
  flowerAssembly.setAttribute("class", "flower-assembly");

  const flowerHead = document.createElement("div");
  flowerHead.setAttribute("class", "flower-head");

  for (let i = 1; i <= 4; i++) {
    const petal = document.createElement("div");
    petal.setAttribute("class", `petal p${i}`);
    flowerHead.appendChild(petal);
  }

  const center = document.createElement("div");
  center.setAttribute("class", "center");
  flowerHead.appendChild(center);

  const stem = document.createElement("div");
  stem.setAttribute("class", "stem");

  flowerAssembly.appendChild(flowerHead);
  flowerAssembly.appendChild(stem);

  const potBase = document.createElement("div");
  potBase.setAttribute("class", "pot-base");

  const potRim = document.createElement("div");
  potRim.setAttribute("class", "pot-rim");

  potButton.appendChild(flowerAssembly);
  potButton.appendChild(potBase);
  potButton.appendChild(potRim);

  const cardbottomCont = document.createElement("div");
  cardbottomCont.setAttribute("class", "cardbottom-cont");
  cardbottomCont.appendChild(cardFooter);
  cardbottomCont.appendChild(potButton);

  OneIdeaCard.appendChild(cardbottomCont);

  return OneIdeaCard;
}

// --- Create stat box ---

function createStatBox(label, value) {
  const statBox = document.createElement("div");
  statBox.setAttribute("class", "stat-box");

  const badge = document.createElement("div");
  badge.setAttribute("class", "stat-badge");
  badge.textContent = value;

  const statLabel = document.createElement("div");
  statLabel.setAttribute("class", "stat-label");
  statLabel.textContent = label;

  // Tooltip text
  if (label === "Sunlight") {
    if (value === "Low") badge.setAttribute("title", "Shady place");
    if (value === "Moderate") badge.setAttribute("title", "Near a window");
    if (value === "High") badge.setAttribute("title", "Mostly outside");
  }

  if (label === "Water") {
    if (value === "Low") badge.setAttribute("title", "Once every two weeks");
    if (value === "Medium") badge.setAttribute("title", "1-2 times a week");
    if (value === "High") badge.setAttribute("title", "Every 3 days");
  }

  if (label === "Hardiness") {
    if (value === "Easy" || value === "Low")
      badge.setAttribute("title", "Low effort");
    if (value === "Average") badge.setAttribute("title", "Needs time and care");
    if (value === "High") badge.setAttribute("title", "Requires planning");
  }

  statBox.appendChild(badge);
  statBox.appendChild(statLabel);

  return statBox;
}

function toggleSaveState(buttonElement) {
  buttonElement.classList.toggle("saved");
}

// --- Garden maker animation ---

function setupGardenMakerAnimation() {
  const cube = document.getElementById("cube");
  const gardenMakerBtn = document.getElementById("gardenMakerPage_Btn");

  if (!cube || !gardenMakerBtn) return;

  gardenMakerBtn.addEventListener("mouseover", () => {
    cube.style.animation = "rotate 30s linear infinite";
  });

  gardenMakerBtn.addEventListener("mouseleave", () => {
    cube.style.animation = "";
  });
}

// --- Scroll animations ---

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((e) => observer.observe(e));

  const hidden2Elements = document.querySelectorAll(".hidden2");
  hidden2Elements.forEach((e) => observer.observe(e));
}

// --- Details toggle ---

function setupDetailsToggle() {
  document.querySelectorAll(".detailsListItem").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

// --- Plant search logic ---

function clearFilters(type) {
  const checks = document.querySelectorAll(`.${type}-radioBtn`);
  checks.forEach((check) => {
    check.checked = false;
  });
}

function setupClearFilterButtons() {
  const clearWaterBtn = document.getElementById("clear-water-btn");
  const clearSunlightBtn = document.getElementById("clear-sunlight-btn");
  const clearSoilBtn = document.getElementById("clear-soil-btn");

  if (clearWaterBtn) {
    clearWaterBtn.addEventListener("click", () => clearFilters("water"));
  }

  if (clearSunlightBtn) {
    clearSunlightBtn.addEventListener("click", () => clearFilters("sunlight"));
  }

  if (clearSoilBtn) {
    clearSoilBtn.addEventListener("click", () => clearFilters("soil"));
  }
}

function setupPlantSearch() {
  const searchPlantBtn = document.getElementById("searchPlant_Btn");
  if (!searchPlantBtn) return;

  searchPlantBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Search values
    const commonNameSearch =
      document.getElementById("commonplant-search-inp")?.value.toLowerCase() ||
      "";

    const waterCheckboxes = document.querySelectorAll(".water-radioBtn");
    const ActiveWaterCheckboxes = Array.from(waterCheckboxes)
      .filter((x) => x.checked)
      .map((y) => y.value.toLowerCase());

    const sunlightCheckboxes = document.querySelectorAll(".sunlight-radioBtn");
    const ActiveSunlightCheckboxes = Array.from(sunlightCheckboxes)
      .filter((x) => x.checked)
      .map((y) => y.value.toLowerCase());

    const soilCheckboxes = document.querySelectorAll(".soil-radioBtn");
    const ActiveSoilCheckboxes = Array.from(soilCheckboxes)
      .filter((x) => x.checked)
      .map((y) => y.value.toLowerCase());

    const plantingSeasonSelect =
      document.querySelector("#plantingSelection")?.value.toLowerCase() || "";
    const resultTitle = document.getElementById("plantdetails-title");

    // Default result
    if (
      !commonNameSearch &&
      ActiveWaterCheckboxes.length === 0 &&
      ActiveSunlightCheckboxes.length === 0 &&
      ActiveSoilCheckboxes.length === 0 &&
      (!plantingSeasonSelect || plantingSeasonSelect === "none")
    ) {
      displayDefaultResult();
      return;
    }

    try {
      const response = await fetch("/api/plants", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const plants = await response.json();

      // Filter results
      const filteredPlants = plants.filter((p) => {
        const criteriacommonName =
          !commonNameSearch ||
          p.common_name.toLowerCase().includes(commonNameSearch);
        const criteriaWater =
          ActiveWaterCheckboxes.length === 0 ||
          ActiveWaterCheckboxes.includes(p.water.toLowerCase());
        const criteriaSunlight =
          ActiveSunlightCheckboxes.length === 0 ||
          ActiveSunlightCheckboxes.includes(p.sunlight.toLowerCase());
        const criteriaSoil =
          ActiveSoilCheckboxes.length === 0 ||
          ActiveSoilCheckboxes.includes(p.soil.toLowerCase());
        const criteriaPlanting =
          !plantingSeasonSelect ||
          plantingSeasonSelect === "none" ||
          p.planting.toLowerCase().includes(plantingSeasonSelect);

        return (
          criteriacommonName &&
          criteriaWater &&
          criteriaSunlight &&
          criteriaSoil &&
          criteriaPlanting
        );
      });

      // Display results
      displayResults(filteredPlants);
    } catch (error) {
      console.error("Error:", error.message);
      if (resultTitle) resultTitle.innerText = "Error executing search";
    }
  });
}

function displayResults(results) {
  const resultContainer = document.getElementById("plant-search-result-cont");
  const resultTable = document.getElementById("result-details-cont-table");
  const resultTitle = document.getElementById("plantdetails-title");
  const resultBtn = document.getElementById("plantsearchPage_Btn");
  const resultPic = document.getElementById("resultimage");

  if (
    !resultContainer ||
    !resultTable ||
    !resultTitle ||
    !resultBtn ||
    !resultPic
  )
    return;

  resultContainer.classList.remove("hidden2");

  // Empty result
  if (!results || results.length === 0) {
    resultTitle.innerText = "No plants found matching your criteria.";
    resultTitle.style.textAlign = "left";
    resultTitle.style.backgroundColor =
      "var(--plant-search-result-subtitle-bg)";
    resultTable.innerHTML = "";
    resultBtn.style.display = "none";
    resultPic.style.display = "none";
    return;
  }

  // First result
  resultTitle.style.textAlign = "center";
  resultTitle.innerText = "Plant Details";
  resultTitle.style.backgroundColor = "var(--plant-search-result-title-bg)";
  resultTable.innerHTML = "";
  resultPic.style.display = "none";
  resultBtn.style.display = "block";

  const p = results[0];

  makeRow(resultTable, "Common:", p.common_name);
  makeRow(resultTable, "Scientific:", p.botanical_name);
  makeRow(resultTable, "Watering:", p.water, "watering");
  makeRow(resultTable, "Sunlight:", p.sunlight, "sunlight");
  makeRow(resultTable, "Soil:", p.soil, "soil");
  makeRow(resultTable, "Planting:", p.planting);
}

// --- Result helpers ---

function makeRow(resultTable, key, value, category = null) {
  if (!value) return;

  const tr = document.createElement("tr");

  const tdKey = document.createElement("td");
  tdKey.className = "resultKey";
  tdKey.textContent = key;

  const tdVal = document.createElement("td");
  tdVal.className = "resultValue";

  if (
    category &&
    plantSpecs[category] &&
    plantSpecs[category][value.toLowerCase()]
  ) {
    tdVal.textContent = `${value}: ${plantSpecs[category][value.toLowerCase()]}`;
  } else {
    tdVal.textContent = value;
  }

  tr.appendChild(tdKey);
  tr.appendChild(tdVal);
  resultTable.appendChild(tr);
}

function displayDefaultResult() {
  const resultContainer = document.getElementById("plant-search-result-cont");
  const resultTable = document.getElementById("result-details-cont-table");
  const resultTitle = document.getElementById("plantdetails-title");
  const resultBtn = document.getElementById("plantsearchPage_Btn");
  const resultPic = document.getElementById("resultimage");

  if (
    !resultContainer ||
    !resultTable ||
    !resultTitle ||
    !resultBtn ||
    !resultPic
  )
    return;

  resultContainer.classList.remove("hidden2");

  // Default title
  resultTitle.style.textAlign = "center";
  resultTitle.innerText = "Plant Details";
  resultTitle.style.backgroundColor = "var(--plant-search-result-title-bg)";

  // Default rows
  while (resultTable.firstChild) {
    resultTable.removeChild(resultTable.firstChild);
  }

  makeRow(resultTable, "Common:", "Swiss Cheese Plant");
  makeRow(resultTable, "Scientific:", "Monstera deliciosa");
  makeRow(
    resultTable,
    "Watering:",
    "Allow soil to dry completely before giving a thorough soak.",
  );
  makeRow(
    resultTable,
    "Sunlight:",
    "Bright filtered light indoors or dappled shade in outdoor spaces.",
  );
  makeRow(
    resultTable,
    "Soil:",
    "Balanced medium with a steady, moderate supply of essential nutrients.",
  );
  makeRow(resultTable, "Planting:", "Year-round");

  // Default image
  while (resultPic.firstChild) {
    resultPic.removeChild(resultPic.firstChild);
  }

  const imgElement = document.createElement("img");
  imgElement.setAttribute("class", "result-imgInner");
  imgElement.setAttribute(
    "src",
    "../pics/others/searchedplant_placeholder.png",
  );
  imgElement.setAttribute("alt", "Swiss Cheese Plant");

  resultPic.appendChild(imgElement);

  resultPic.style.display = "";
  resultBtn.style.display = "block";
}
