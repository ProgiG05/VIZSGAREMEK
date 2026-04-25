import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
import { getUser } from './api.js';


// --- Knowledges cards read Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


document.addEventListener("DOMContentLoaded", async () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();
    const user = getUser();

    const responseKnowledges = await fetch('/api/knowledge', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin'
    });

    if (!responseKnowledges.ok) {
        console.error('Failed to load knowledges');
        return;
    }

    const ListOfKnowledges = await responseKnowledges.json();

    const KnowledgesCardContainer = document.getElementById("knowledges-container");
    const OneKnowledgeShowcasecont = document.getElementById("oneCardShowcase_cont");

    if (!KnowledgesCardContainer || !OneKnowledgeShowcasecont) return;

    if (ListOfKnowledges.length > 0) {
        const randomNum = Math.floor(Math.random() * ListOfKnowledges.length);
        OneKnowledgeShowcasecont.appendChild(createKnowledgeCard(ListOfKnowledges[randomNum]));
    }

    ListOfKnowledges.forEach(knowledge => {
        KnowledgesCardContainer.appendChild(createKnowledgeSection(knowledge));
    });
});


function createKnowledgeSection(knowledge) {
    // 1. Create the horizontal container
    const OneKnowledgeSet = document.createElement("div");
    OneKnowledgeSet.setAttribute("class", "OneKnowledgeSet");


    // 2. Create the Card Container
    const OneKnowledgeCard = document.createElement("div");
    OneKnowledgeCard.setAttribute("class", "OneKnowledgeCard");


    // 3. Create content wrapper
    const cardContent = document.createElement("div");
    cardContent.setAttribute("class", "card-content");


    // 4. Title & Summary creation
    const OneKnowledgeTitle = document.createElement("h2");
    OneKnowledgeTitle.setAttribute("class", "OneKnowledgeTitle");
    OneKnowledgeTitle.textContent = `${knowledge.title}`;


    const OneKnowledgeSummary = document.createElement('p');
    OneKnowledgeSummary.setAttribute('class', 'OneKnowledgeSummary');
    OneKnowledgeSummary.textContent = `${knowledge.summary}`;


    // 5. Readmore & Close button creation
    const readMoreBtn = document.createElement('button');
    readMoreBtn.setAttribute('class', 'readMoreBtn');
    readMoreBtn.textContent = `>`;


    const closeBtn = document.createElement("button");
    closeBtn.setAttribute('class', 'closeBtn');
    closeBtn.textContent = 'Close';


    const cardActions = document.createElement("div");
    cardActions.setAttribute("class", "card-actions");


    const OneKnowledgeDescription = document.createElement("div");
    OneKnowledgeDescription.setAttribute("class", "OneKnowledgeDescription");


    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "OneKnowledgePictureWrapper");


    const imagePlace = document.createElement("img");
    imagePlace.setAttribute("class", "OneKnowledgePicture");
    imagePlace.setAttribute("src", "../pics/gardenknowledges/" + knowledge.picture + ".png");
    imagePlace.setAttribute("alt", knowledge.title);


    imageWrapper.appendChild(imagePlace);


    // 6. Button functions
    readMoreBtn.addEventListener('click', () => {
        OneKnowledgeSet.classList.add('expanded');

        let descriptionBuffer = knowledge.description
            .split('.')
            .map(part => part.trim())
            .filter(part => part !== '');

        OneKnowledgeDescription.innerHTML = "";

        for (let i = 0; i < descriptionBuffer.length; i += 2) {
            const paragraph = document.createElement('p');
            paragraph.setAttribute('class', 'OneKnowledgeParagraph');

            if (descriptionBuffer[i + 1] !== undefined) {
                paragraph.textContent = `${descriptionBuffer[i]}. ${descriptionBuffer[i + 1]}.`;
            } else {
                paragraph.textContent = `${descriptionBuffer[i]}.`;
            }

            OneKnowledgeDescription.appendChild(paragraph);
        }

        if (!OneKnowledgeCard.contains(OneKnowledgeDescription)) {
            OneKnowledgeCard.appendChild(OneKnowledgeDescription);
        }

        cardActions.innerHTML = "";
        cardActions.appendChild(closeBtn);

        if (!OneKnowledgeCard.contains(cardActions)) {
            OneKnowledgeCard.appendChild(cardActions);
        }

        readMoreBtn.style.display = 'none';

        if (OneKnowledgeSet.contains(imageWrapper)) {
            OneKnowledgeSet.removeChild(imageWrapper);
            OneKnowledgeCard.appendChild(imageWrapper);
        }
    });

    closeBtn.addEventListener('click', () => {
        OneKnowledgeSet.classList.remove('expanded');

        OneKnowledgeDescription.innerHTML = "";
        cardActions.innerHTML = "";

        if (OneKnowledgeCard.contains(OneKnowledgeDescription)) {
            OneKnowledgeCard.removeChild(OneKnowledgeDescription);
        }

        if (OneKnowledgeCard.contains(cardActions)) {
            OneKnowledgeCard.removeChild(cardActions);
        }

        readMoreBtn.style.display = '';

        if (OneKnowledgeCard.contains(imageWrapper)) {
            OneKnowledgeCard.removeChild(imageWrapper);
            OneKnowledgeSet.appendChild(imageWrapper);
        }
    });


    // 7. Assembly
    cardContent.appendChild(OneKnowledgeTitle);
    cardContent.appendChild(OneKnowledgeSummary);
    OneKnowledgeCard.appendChild(cardContent);

    OneKnowledgeSet.appendChild(OneKnowledgeCard);
    OneKnowledgeSet.appendChild(readMoreBtn);
    OneKnowledgeSet.appendChild(imageWrapper);

    return OneKnowledgeSet;
}


function createKnowledgeCard(knowledge) {
    // 1. Create the Main Card Container
    const OneKnowledgeCard = document.createElement("div");
    OneKnowledgeCard.setAttribute("class", "ShowCaseOneKnowledgeCard");


    // 2. Title & Summary creation
    const OneKnowledgeTitle = document.createElement("h2");
    OneKnowledgeTitle.setAttribute("class", "ShowCaseOneKnowledgeTitle");
    OneKnowledgeTitle.textContent = `${knowledge.title}`;


    const OneKnowledgeSummary = document.createElement('p');
    OneKnowledgeSummary.setAttribute('class', 'ShowCaseOneKnowledgeSummary');
    OneKnowledgeSummary.textContent = `${knowledge.summary}`;


    //3. Assembly
    OneKnowledgeCard.appendChild(OneKnowledgeTitle);
    OneKnowledgeCard.appendChild(OneKnowledgeSummary);


    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "ShowCaseOneKnowledgePictureWrapper");


    const imagePlace = document.createElement("img");
    imagePlace.setAttribute("class", "ShowCaseOneKnowledgePicture");
    imagePlace.setAttribute("src", "../pics/gardenknowledges/" + knowledge.picture + ".png");
    imagePlace.setAttribute("alt", knowledge.title);


    imageWrapper.appendChild(imagePlace);

    OneKnowledgeCard.appendChild(imageWrapper);

    return OneKnowledgeCard;
}




// --- Localstorage Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
window.onload = () => {
};


// --- Scroll up btn & scroll down btn Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


const ToUpBtn = document.getElementById("toup");
if (ToUpBtn) {
    ToUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


const ShowContainerBtn = document.getElementById("showContainer");
if (ShowContainerBtn) {
    ShowContainerBtn.addEventListener("click", () => {
        const KnowledgesContainer = document.getElementById("knowledges-container");
        if (KnowledgesContainer) {
            KnowledgesContainer.scrollIntoView({ behavior: "smooth" });
        }
    });
}