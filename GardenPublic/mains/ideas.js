document.addEventListener("DOMContentLoaded", async (e) => {
    const settingsBtn = document.getElementById('settings_Btn');
    const sidePanel = document.getElementById('settings-sidepanel');
    const closePanel = document.getElementById('closeSidePanel');

    settingsBtn.addEventListener('click', () => {
        sidePanel.style.transition = '0.4s all ease'
        sidePanel.style.left = 0
    });
    closePanel.addEventListener('click', () => {
        sidePanel.style.transition = '0.4s all ease'
        sidePanel.style.left = "-22.5rem"
    });

    e.preventDefault()
    const responseIdeas = await fetch('/api/ideas', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()

    const IdeasCardContainer = document.getElementById("gardenIdeas-container")
    const oneIdeaShowcasecont = document.getElementById("oneCardShowcase_cont")


    if (ListOfIdeas.length > 0) {
        const randomNum = Math.floor(Math.random() * ListOfIdeas.length)
        const randomFeaturedIdeaCard = ListOfIdeas[randomNum]
        oneIdeaShowcasecont.appendChild(createIdeaCard(randomFeaturedIdeaCard))
    }

    ListOfIdeas.forEach(idea => {
        const card = createIdeaCard(idea)
        IdeasCardContainer.appendChild(card)
    });

})
function createIdeaCard(idea) {
    // 1. Create the Main Card Container
    const OneIdeaCard = document.createElement("div");
    OneIdeaCard.setAttribute("class", "garden-card");

    // 2. Image Section
    const imgWrapper = document.createElement("div");
    imgWrapper.setAttribute("class", "image-placeholder-wrapper");
    const imgPlace = document.createElement("img");
    imgPlace.setAttribute("class", "insideImage");
    // Using the path logic from your initial loop
    imgPlace.setAttribute("src", "../pics/gardenideas/" + idea.picture + ".png");
    imgPlace.setAttribute("alt", idea.title);
    imgWrapper.appendChild(imgPlace);
    OneIdeaCard.appendChild(imgWrapper);

    // 3. Title & Description
    const OneIdeaTitle = document.createElement("h2");
    OneIdeaTitle.textContent = idea.title;
    OneIdeaTitle.setAttribute("class", "card-title");
    OneIdeaCard.appendChild(OneIdeaTitle);

    const OneIdeaDescription = document.createElement("p");
    OneIdeaDescription.textContent = idea.description;
    OneIdeaDescription.setAttribute("class", "card-description");
    OneIdeaCard.appendChild(OneIdeaDescription);

    OneIdeaCard.appendChild(document.createElement("hr"));

    // 4. Plant List
    const plantList = document.createElement("p");
    plantList.setAttribute("class", "plant-list");
    idea.plants.split(",").forEach(plantName => {
        const link = document.createElement("a");
        link.setAttribute("class", "plantListItem");
        link.setAttribute("href", "#");
        link.textContent = plantName.trim() + " ";
        plantList.appendChild(link);
    });
    OneIdeaCard.appendChild(plantList);

    // 5. Stats Footer
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

    // 6. Pot Button
    const potButton = document.createElement("button");
    potButton.setAttribute("class", "pot-button");
    potButton.setAttribute("onclick", "toggleSaveState(this)");
    
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
// --- Other stuff Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function toggleSaveState(buttonElement) {buttonElement.classList.toggle('saved');}
document.getElementById('toup').addEventListener('click', () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme')
        darkBtn.classList.add('dark-active')
    }
}
// --- Dark Mode Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const body = document.body;
const darkBtn = document.getElementById('darkmode');

darkBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    darkBtn.classList.toggle('dark-active');
    
    // Optional: Save preference to localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- Side Panel Toggle ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const settingsBtn = document.getElementById('settings_Btn');
const sidePanel = document.getElementById('settings-sidepanel');
const closePanel = document.getElementById('closeSidePanel');

settingsBtn.addEventListener('click', () => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = 0
});
closePanel.addEventListener('click', () => {
    sidePanel.style.transition = '0.4s all ease'
    sidePanel.style.left = "-22.5rem"
});

// --- Searchbar Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.getElementById("searchBar").addEventListener("input", async (e) => {
    e.preventDefault()
    const searchValue = document.getElementById("searchBar").value.toLowerCase();
    const IdeasCardContainer = document.getElementById("gardenIdeas-container")
    IdeasCardContainer.innerHTML = ``
    const responseIdeas = await fetch('/api/ideas', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()
    ListOfIdeas.forEach(idea => {
        let ideaTitle = idea.title.toLowerCase()
        if (ideaTitle.includes(searchValue)) {
            const card = createIdeaCard(idea)
            IdeasCardContainer.appendChild(card)
        }
        //handling no matching result
    });
})
