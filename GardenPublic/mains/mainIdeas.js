document.addEventListener("DOMContentLoaded", async () => {
    const responseIdeas = await fetch('/api/showIdeasData/all', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("idea-container")
    ListOfIdeas.forEach(idea => {

        // 1. Create the Main Card Container
        const OneIdeaCard = document.createElement("div");
        OneIdeaCard.setAttribute("class", "garden-card");

        // 2. Create the Image Placeholder Section
        const imgWrapper = document.createElement("div");
        imgWrapper.setAttribute("class", "image-placeholder-wrapper");
        const imgPlaceholder = document.createElement("div");
        imgPlaceholder.setAttribute("class", "image-placeholder");
        imgWrapper.appendChild(imgPlaceholder);
        OneIdeaCard.appendChild(imgWrapper);

        // 3. Create the Title
        const OneIdeaTitle = document.createElement("h2");
        OneIdeaTitle.textContent = `${idea.title}`; // e.g., "Balcony Berry Wall"
        OneIdeaTitle.setAttribute("class", "card-title");
        OneIdeaCard.appendChild(OneIdeaTitle);

        // 4. Create the Plant List Section
        const listTitle = document.createElement("h3");
        listTitle.textContent = "Plants for this garden idea:";
        listTitle.setAttribute("class", "list-title");
        OneIdeaCard.appendChild(listTitle);

        const plantList = document.createElement("ul");
        plantList.setAttribute("class", "plant-list");

        idea.plants.split(",").forEach(plantName => {
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.setAttribute("href", "#");
            anchor.textContent = plantName;
            li.appendChild(anchor);
            plantList.appendChild(li);
        });
        OneIdeaCard.appendChild(plantList);

        // 5. Create the Footer & Stats Container
        const cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");

        const statsContainer = document.createElement("div");
        statsContainer.setAttribute("class", "stats-container");

        // Helper function to create stat boxes (Sunlight, Water, Hardiness)
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

        // 6. Create the Complex "Pot Button"
        const potButton = document.createElement("button");
        potButton.setAttribute("class", "pot-button saved");
        potButton.setAttribute("onclick", "toggleSaveState(this)");
        potButton.setAttribute("aria-label", "Toggle Save");

        // Create the flower assembly inside the button
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

        cardFooter.appendChild(potButton);

        // 7. Final Assembly
        OneIdeaCard.appendChild(cardFooter);
        IdeasCardContainer.appendChild(OneIdeaCard);
    });
})
document.getElementById("goup-btn").addEventListener("click", () =>{
    window.scrollTo({top:0, behavior:"smooth"})
})
document.querySelectorAll(".detailsListItem").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active")
    })
})
function toggleSaveState(buttonElement) {
    buttonElement.classList.toggle('saved');
}
