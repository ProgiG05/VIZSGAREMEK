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

    ListOfIdeas.forEach(idea => {
        //console.log("Title: " + idea.title + "\nDescription: " + idea.description + "\nPicture: " + idea.picture + "\nPlants: " + idea.plants + "\nSunlight: " + idea.sunlight + "\nWater: " + idea.water + "\nMaintenance: " + idea.maintenance)
        
        // 1. Create the Main Card Container
        const OneIdeaCard = document.createElement("div");
        OneIdeaCard.setAttribute("class", "garden-card");

        // 2. Create the Image Placeholder Section
        const imgWrapper = document.createElement("div");
        imgWrapper.setAttribute("class", "image-placeholder-wrapper");
        const imgPlace = document.createElement("img");
        imgPlace.setAttribute("class", "insideImage");
        imgPlace.setAttribute("id", "insideImage");
        imgPlace.setAttribute("src","../pics/gardenideas/"+ idea.picture + ".png")
        imgPlace.setAttribute("alt",`${idea.title}`)
        imgWrapper.appendChild(imgPlace);
        OneIdeaCard.appendChild(imgWrapper);

        // 3. Create the Title
        const OneIdeaTitle = document.createElement("h2");
        OneIdeaTitle.textContent = idea.title; 
        OneIdeaTitle.setAttribute("class", "card-title");
        OneIdeaCard.appendChild(OneIdeaTitle);

        // 4. Create the section of the description
        const OneIdeaDescription = document.createElement("p");
        OneIdeaDescription.textContent = idea.description; 
        OneIdeaDescription.setAttribute("class", "card-description");
        OneIdeaCard.appendChild(OneIdeaDescription);

        OneIdeaCard.appendChild(document.createElement("hr"))

        const plantList = document.createElement("p");
        plantList.setAttribute("class", "plant-list");

        idea.plants.split(",").forEach(plantName => {
            const link = document.createElement("a");
            link.setAttribute("class","plantListItem")
            link.setAttribute("href", "#");
            link.textContent = plantName + " ";
            plantList.appendChild(link);
        });
        OneIdeaCard.appendChild(plantList);

        // 5. Create the Footer & Stats Container
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

            if (label === 'Sunlight') {
                if (value === 'Low') {
                    badge.setAttribute("title","Shady place")
                }
                if (value === 'Moderate') {
                    badge.setAttribute("title","Near a window")
                }
                if (value === 'High') {
                    badge.setAttribute("title","Mostly outside")
                }
            }
            if (label === 'Water') {
                if (value === 'Low') {
                    badge.setAttribute("title","Once every two weeks")
                }
                if (value === 'Medium') {
                    badge.setAttribute("title","1-2 times a week")
                }
                if (value === 'High') {
                    badge.setAttribute("title","Every 3 days")
                }
            }
            if (label === 'Hardiness') {
                if (value === 'Easy' || value === 'Low') {
                    badge.setAttribute("title","Low effort")
                }
                if (value === 'Average') {
                    badge.setAttribute("title","Needs time and care")
                }
                if (value === 'High') {
                    badge.setAttribute("title","Requires planning")
                }
            }
            
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
        potButton.setAttribute("class", "pot-button");
        potButton.setAttribute("title", "save this garden idea");
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

        const cardbottomCont = document.createElement("div")
        cardbottomCont.setAttribute("class","cardbottom-cont")
        cardbottomCont.appendChild(cardFooter)
        cardbottomCont.appendChild(potButton)

        OneIdeaCard.appendChild(cardbottomCont);
        // 7. Final Assembly
        IdeasCardContainer.appendChild(OneIdeaCard);
    });
})

function toggleSaveState(buttonElement) {buttonElement.classList.toggle('saved');}

document.getElementById('toup').addEventListener('click', () => {
    window.scrollTo({top:0, behavior: 'smooth'})
})

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         // console.log(entry)
//         if (entry.isIntersecting) {entry.target.classList.add('show')} 
//         else {entry.target.classList.remove('show')}
//     })
// })
// const hiddenElements = document.querySelectorAll(".hidden")
// hiddenElements.forEach((e) => observer.observe(e))

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
            // 1. Create the Main Card Container
            const OneIdeaCard = document.createElement("div");
            OneIdeaCard.setAttribute("class", "garden-card hidden");

            // 2. Create the Image Placeholder Section
            const imgWrapper = document.createElement("div");
            imgWrapper.setAttribute("class", "image-placeholder-wrapper");
            const imgPlace = document.createElement("img");
            imgPlace.setAttribute("class", "insideImage");
            imgPlace.setAttribute("src","../pics/gardenideas/"+ idea.picture)
            imgPlace.setAttribute("alt",`${idea.title}`)
            imgWrapper.appendChild(imgPlace);
            OneIdeaCard.appendChild(imgWrapper);

            // 3. Create the Title
            const OneIdeaTitle = document.createElement("h2");
            OneIdeaTitle.textContent = idea.title; 
            OneIdeaTitle.setAttribute("class", "card-title");
            OneIdeaCard.appendChild(OneIdeaTitle);

            // 4. Create the section of the description
            const OneIdeaDescription = document.createElement("p");
            OneIdeaDescription.textContent = idea.description; 
            OneIdeaDescription.setAttribute("class", "card-description");
            OneIdeaCard.appendChild(OneIdeaDescription);

            OneIdeaCard.appendChild(document.createElement("hr"))

            const plantList = document.createElement("p");
            plantList.setAttribute("class", "plant-list");

            idea.plants.split(",").forEach(plantName => {
                const link = document.createElement("a");
                link.setAttribute("class","plantListItem")
                link.setAttribute("href", "#");
                link.textContent = plantName + " ";
                plantList.appendChild(link);
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

            const cardbottomCont = document.createElement("div")
            cardbottomCont.setAttribute("class","cardbottom-cont")
            cardbottomCont.appendChild(cardFooter)
            cardbottomCont.appendChild(potButton)

            OneIdeaCard.appendChild(cardbottomCont);
            // 7. Final Assembly
            IdeasCardContainer.appendChild(OneIdeaCard);
        }
    });
})
