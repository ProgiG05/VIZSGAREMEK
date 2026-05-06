import { setupNavbar, setupSidePanel, setupLoginState } from "./navbar.js";
import { getUser } from "./api.js";

// --- Knowledges cards read logic ---

document.addEventListener("DOMContentLoaded", async () => {
  // Setup
  setupNavbar();
  setupSidePanel();
  setupLoginState();

  const user = getUser();

  // Optional login check
  if (!user) {
    console.error("User is not logged in.");
  }

  // Request
  try {
    const responseKnowledges = await fetch("/api/knowledge", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });

    if (!responseKnowledges.ok) {
      console.error("Failed to load knowledges");
      return;
    }

    const listOfKnowledges = await responseKnowledges.json();

    const knowledgesCardContainer = document.getElementById(
      "knowledges-container",
    );
    const oneKnowledgeShowcaseCont = document.getElementById(
      "oneCardShowcase_cont",
    );

    if (!knowledgesCardContainer || !oneKnowledgeShowcaseCont) return;

    // Showcase item
    if (listOfKnowledges.length > 0) {
      const randomNum = Math.floor(Math.random() * listOfKnowledges.length);
      oneKnowledgeShowcaseCont.appendChild(
        createKnowledgeCard(listOfKnowledges[randomNum]),
      );
    }

    // Generate list
    listOfKnowledges.forEach((knowledge) => {
      knowledgesCardContainer.appendChild(createKnowledgeSection(knowledge));
    });
  } catch (error) {
    console.error("Knowledge loading failed:", error);
  }
});

// --- Create knowledge section ---

function createKnowledgeSection(knowledge) {
  // Container
  const oneKnowledgeSet = document.createElement("div");
  oneKnowledgeSet.setAttribute("class", "OneKnowledgeSet");

  // Card container
  const oneKnowledgeCard = document.createElement("div");
  oneKnowledgeCard.setAttribute("class", "OneKnowledgeCard");

  // Content wrapper
  const cardContent = document.createElement("div");
  cardContent.setAttribute("class", "card-content");

  // Title and summary
  const oneKnowledgeTitle = document.createElement("h2");
  oneKnowledgeTitle.setAttribute("class", "OneKnowledgeTitle");
  oneKnowledgeTitle.textContent = knowledge.title;

  const oneKnowledgeSummary = document.createElement("p");
  oneKnowledgeSummary.setAttribute("class", "OneKnowledgeSummary");
  oneKnowledgeSummary.textContent = knowledge.summary;

  // Buttons
  const readMoreBtn = document.createElement("button");
  readMoreBtn.setAttribute("class", "readMoreBtn");
  readMoreBtn.textContent = ">";

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "closeBtn");
  closeBtn.textContent = "Close";

  // Expanding content
  const cardActions = document.createElement("div");
  cardActions.setAttribute("class", "card-actions");

  const oneKnowledgeDescription = document.createElement("div");
  oneKnowledgeDescription.setAttribute("class", "OneKnowledgeDescription");

  // Images
  const imageWrapper = document.createElement("div");
  imageWrapper.setAttribute("class", "OneKnowledgePictureWrapper");

  const imagePlace = document.createElement("img");
  imagePlace.setAttribute("class", "OneKnowledgePicture");
  imagePlace.setAttribute(
    "src",
    "../pics/gardenknowledges/" + knowledge.picture + ".png",
  );
  imagePlace.setAttribute("alt", knowledge.title);

  imageWrapper.appendChild(imagePlace);

  // Read more
  readMoreBtn.addEventListener("click", () => {
    oneKnowledgeSet.classList.add("expanded");

    const descriptionBuffer = knowledge.description
      .split(".")
      .map((part) => part.trim())
      .filter((part) => part !== "");

    oneKnowledgeDescription.innerHTML = "";

    for (let i = 0; i < descriptionBuffer.length; i += 2) {
      const paragraph = document.createElement("p");
      paragraph.setAttribute("class", "OneKnowledgeParagraph");

      if (descriptionBuffer[i + 1] !== undefined) {
        paragraph.textContent = `${descriptionBuffer[i]}. ${descriptionBuffer[i + 1]}.`;
      } else {
        paragraph.textContent = `${descriptionBuffer[i]}.`;
      }

      oneKnowledgeDescription.appendChild(paragraph);
    }

    if (!oneKnowledgeCard.contains(oneKnowledgeDescription)) {
      oneKnowledgeCard.appendChild(oneKnowledgeDescription);
    }

    cardActions.innerHTML = "";
    cardActions.appendChild(closeBtn);

    if (!oneKnowledgeCard.contains(cardActions)) {
      oneKnowledgeCard.appendChild(cardActions);
    }

    readMoreBtn.style.display = "none";

    if (oneKnowledgeSet.contains(imageWrapper)) {
      oneKnowledgeSet.removeChild(imageWrapper);
      oneKnowledgeCard.appendChild(imageWrapper);
    }
  });

  // Close
  closeBtn.addEventListener("click", () => {
    oneKnowledgeSet.classList.remove("expanded");

    oneKnowledgeDescription.innerHTML = "";
    cardActions.innerHTML = "";

    if (oneKnowledgeCard.contains(oneKnowledgeDescription)) {
      oneKnowledgeCard.removeChild(oneKnowledgeDescription);
    }

    if (oneKnowledgeCard.contains(cardActions)) {
      oneKnowledgeCard.removeChild(cardActions);
    }

    readMoreBtn.style.display = "";

    if (oneKnowledgeCard.contains(imageWrapper)) {
      oneKnowledgeCard.removeChild(imageWrapper);
      oneKnowledgeSet.appendChild(imageWrapper);
    }
  });

  // Assembly
  cardContent.appendChild(oneKnowledgeTitle);
  cardContent.appendChild(oneKnowledgeSummary);
  oneKnowledgeCard.appendChild(cardContent);

  oneKnowledgeSet.appendChild(oneKnowledgeCard);
  oneKnowledgeSet.appendChild(readMoreBtn);
  oneKnowledgeSet.appendChild(imageWrapper);

  return oneKnowledgeSet;
}

// --- Create knowledge card ---

function createKnowledgeCard(knowledge) {
  // Container
  const oneKnowledgeCard = document.createElement("div");
  oneKnowledgeCard.setAttribute("class", "ShowCaseOneKnowledgeCard");

  // Title and summary
  const oneKnowledgeTitle = document.createElement("h2");
  oneKnowledgeTitle.setAttribute("class", "ShowCaseOneKnowledgeTitle");
  oneKnowledgeTitle.textContent = knowledge.title;

  const oneKnowledgeSummary = document.createElement("p");
  oneKnowledgeSummary.setAttribute("class", "ShowCaseOneKnowledgeSummary");
  oneKnowledgeSummary.textContent = knowledge.summary;

  // Image
  const imageWrapper = document.createElement("div");
  imageWrapper.setAttribute("class", "ShowCaseOneKnowledgePictureWrapper");

  const imagePlace = document.createElement("img");
  imagePlace.setAttribute("class", "ShowCaseOneKnowledgePicture");
  imagePlace.setAttribute(
    "src",
    "../pics/gardenknowledges/" + knowledge.picture + ".png",
  );
  imagePlace.setAttribute("alt", knowledge.title);

  imageWrapper.appendChild(imagePlace);

  // Assembly
  oneKnowledgeCard.appendChild(oneKnowledgeTitle);
  oneKnowledgeCard.appendChild(oneKnowledgeSummary);
  oneKnowledgeCard.appendChild(imageWrapper);

  return oneKnowledgeCard;
}

// --- Scroll navigation ---

const toUpBtn = document.getElementById("toup");
if (toUpBtn) {
  toUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const showContainerBtn = document.getElementById("showContainer");
if (showContainerBtn) {
  showContainerBtn.addEventListener("click", () => {
    const knowledgesContainer = document.getElementById("knowledges-container");

    if (knowledgesContainer) {
      knowledgesContainer.scrollIntoView({ behavior: "smooth" });
    }
  });
}
