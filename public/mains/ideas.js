import { setupNavbar, setupSidePanel, setupLoginState } from "./navbar.js";
import { showAlert } from "./popup.js";
import { getUser, apiFetch } from "./api.js";

let savedIdeaIds = new Set();

// --- Setup ---

document.addEventListener("DOMContentLoaded", async () => {
  // Setup
  setupNavbar();
  setupSidePanel();
  setupLoginState();

  // Fetch saved ideas
  const user = getUser();
  if (user) {
    try {
      const response = await apiFetch("/api/savedideas", { method: "GET" });
      if (response && response.ok) {
        const saved = await response.json();
        saved.forEach((idea) => savedIdeaIds.add(idea.id));
      }
    } catch (e) {
      console.warn("Could not load initial saved ideas", e);
    }
  }

  await loadIdeas();
  setupTopButton();
  setupShowSearchButton();
  setupSearchButton();
});

// --- Load ideas ---

async function loadIdeas() {
  // Containers
  const IdeasCardContainer = document.getElementById("gardenIdeas-container");
  const OneIdeaShowcasecont = document.getElementById("oneCardShowcase_cont");

  if (!IdeasCardContainer || !OneIdeaShowcasecont) return;

  // Request
  try {
    const responseIdeas = await fetch("/api/ideas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });

    if (!responseIdeas.ok) {
      throw new Error("Failed to load ideas");
    }

    const ListOfIdeas = await responseIdeas.json();

    // Showcase card and remove it from the main list
    if (ListOfIdeas.length > 0) {
      const randomIndex = Math.floor(Math.random() * ListOfIdeas.length);
      const [showcaseIdea] = ListOfIdeas.splice(randomIndex, 1); // remove from array
      OneIdeaShowcasecont.appendChild(createIdeaCard(showcaseIdea));
    }

    // Idea cards (remaining ideas)
    ListOfIdeas.forEach((idea) => {
      IdeasCardContainer.appendChild(createIdeaCard(idea));
    });
  } catch (error) {
    console.error("Failed to load ideas:", error.message);
    showAlert("Could not load garden ideas: " + error.message, "Error!");
  }
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
  imgPlace.setAttribute("alt", idea.title);
  imgWrapper.appendChild(imgPlace);
  OneIdeaCard.appendChild(imgWrapper);

  // Title and description
  const OneIdeaTitle = document.createElement("h2");
  OneIdeaTitle.textContent = idea.title;
  OneIdeaTitle.setAttribute("class", "card-title");
  OneIdeaTitle.addEventListener("click", () =>
    ConvertToReadingMode(OneIdeaCard),
  );
  OneIdeaCard.appendChild(OneIdeaTitle);

  const OneIdeaDescription = document.createElement("p");
  OneIdeaDescription.textContent = idea.description;
  OneIdeaDescription.setAttribute("class", "card-description");
  OneIdeaCard.appendChild(OneIdeaDescription);

  OneIdeaCard.appendChild(document.createElement("hr"));

  // Plant list
  // const plantList = document.createElement("p");
  // plantList.setAttribute("class", "plant-list");
  // idea.plants.split(",").forEach((plantName) => {
  //   const link = document.createElement("a");
  //   link.setAttribute("class", "plantListItem");
  //   link.setAttribute("href", "#");
  //   link.textContent = plantName.trim() + " ";
  //   plantList.appendChild(link);
  // });
  // OneIdeaCard.appendChild(plantList);

  // Footer stats
  const cardFooter = document.createElement("div");
  cardFooter.setAttribute("class", "card-footer");
  const statsContainer = document.createElement("div");
  statsContainer.setAttribute("class", "stats-container");

  const createStatBox = (label, value) => {
    const statBox = document.createElement("div");
    statBox.setAttribute("class", "stat-box");

    const badge = document.createElement("div");
    badge.setAttribute("class", "stat-badge");
    badge.textContent = value;

    const statLabel = document.createElement("div");
    statLabel.setAttribute("class", "stat-label");
    statLabel.textContent = label;

    statBox.appendChild(badge);
    statBox.appendChild(statLabel);
    return statBox;
  };

  statsContainer.appendChild(createStatBox("Sunlight", idea.sunlight));
  statsContainer.appendChild(createStatBox("Water", idea.water));
  statsContainer.appendChild(createStatBox("Hardiness", idea.maintenance));
  cardFooter.appendChild(statsContainer);

  // Save button
  const potButton = document.createElement("button");
  potButton.setAttribute("class", "pot-button");
  potButton.setAttribute("type", "button");
  potButton.setAttribute("aria-label", "Toggle saved state");
  if (savedIdeaIds.has(idea.id)) {
    potButton.classList.add("saved");
  }
  potButton.addEventListener("click", () =>
    toggleSaveState(potButton, idea.id),
  );

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

// --- Save idea logic ---

async function toggleSaveState(buttonElement, ideaId) {
  const user = getUser();
  if (!user) {
    showAlert("Please log in to save ideas.", "Not logged in!");
    return;
  }

  // Toggle state
  buttonElement.classList.toggle("saved");
  if (buttonElement.classList.contains("saved")) {
    savedIdeaIds.add(ideaId);
  } else {
    savedIdeaIds.delete(ideaId);
  }

  // Database request
  try {
    const isSaved = savedIdeaIds.has(ideaId);
    const response = await apiFetch(`/api/savedideas/${ideaId}`, {
      method: isSaved ? "DELETE" : "POST",
    });

    if (!response || !response.ok) {
      throw new Error("Save failed");
    }
  } catch (error) {
    console.error("Failed to save idea:", error.message);

    // Revert state
    buttonElement.classList.toggle("saved");
    if (buttonElement.classList.contains("saved")) {
      savedIdeaIds.add(ideaId);
    } else {
      savedIdeaIds.delete(ideaId);
    }
  }
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

function ConvertToReadingMode(card) {
  console.log("Reading mode clicked:", card);
}

// --- Search logic ---

function setupShowSearchButton() {
  const showSearchBtn = document.getElementById("showSearch");
  const searchCont = document.getElementById("search-cont");

  if (!showSearchBtn || !searchCont) return;

  // Scroll to ideas and refill container
  showSearchBtn.addEventListener("click", async () => {
    const container = document.getElementById("gardenIdeas-container");
    const container2 = document.getElementById("oneCardShowcase_cont");
    const searchCont = document.getElementById("searchBar");
    if (container) {
      container.innerHTML = ``; // clear previous cards
      container2.innerHTML = ``; // clear previous cards
      searchCont.value = ""; // clear previous search results
      await loadIdeas(); // reload all ideas
      searchCont.scrollIntoView({ behavior: "smooth" });
    }
  });
}

function setupSearchButton() {
  const searchBtn = document.getElementById("searchBtn");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Inputs
    const searchBar = document.getElementById("searchBar");
    const IdeasCardContainer = document.getElementById("gardenIdeas-container");

    if (!searchBar || !IdeasCardContainer) return;

    const searchValue = searchBar.value.toLowerCase().trim();

    // Validation
    if (searchValue === "") {
      showAlert("Searchbar is empty", "Error!");
      return;
    }

    IdeasCardContainer.innerHTML = ``;

    // Request
    try {
      const responseIdeas = await fetch("/api/ideas", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      if (!responseIdeas.ok) {
        throw new Error("Failed to load ideas");
      }

      const ListOfIdeas = await responseIdeas.json();
      let foundMatch = false;

      // Match results
      ListOfIdeas.forEach((idea) => {
        const ideaTitle = idea.title.toLowerCase();

        if (ideaTitle.includes(searchValue)) {
          const card = createIdeaCard(idea);
          IdeasCardContainer.appendChild(card);
          foundMatch = true;
        }
      });

      // Empty result
      if (!foundMatch) {
        const MessageContainer = document.createElement("div");
        MessageContainer.setAttribute("class", "message-cont");
        MessageContainer.textContent = "No matching garden ideas found.";
        IdeasCardContainer.appendChild(MessageContainer);
      }
    } catch (error) {
      console.error("Search failed:", error.message);
      showAlert("Could not search garden ideas.", "Error!");
    }
  });
}
