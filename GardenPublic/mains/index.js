// --- Initialize State ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const token = localStorage.getItem("token");

document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
        const loginBtn = document.getElementById("logIn_Btn");
        const sideLoginBtn = document.getElementById("login_Btn");
        
        const accountHandler = (e) => {
            e.preventDefault();
            window.location.href = "/sites/accounts.html";
        };

        if (loginBtn) {
            loginBtn.innerHTML = `${user.username}`;
            loginBtn.addEventListener("click", accountHandler);
        }
        if (sideLoginBtn) {
            sideLoginBtn.innerHTML = `${user.username}`;
            sideLoginBtn.addEventListener("click", accountHandler);
        }
    }
    const responseIdeas = await fetch('/api/ideas', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("showcase-container")

    const returnIdeas = [ListOfIdeas[0],ListOfIdeas[1],ListOfIdeas[2]]

    returnIdeas.forEach(idea => {
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
        imgPlace.setAttribute("src","../pics/gardenideas/" + idea.picture + ".png")
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
    })
})

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
    const savedLang = localStorage.getItem('lang') || 'en'
    if (langSelect) {langSelect.value = savedLang}
    updateLanguage(savedLang)
};

// --- Navbar scrolling actions logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// document.getElementById('goto_Ideas').addEventListener('click', () => {
//     document.getElementById('ideas-title').scrollIntoView({behavior:'smooth'})
// })
// document.getElementById('goto_PlantFinder').addEventListener('click', () => {
//     document.getElementById('plant-finder-section').scrollIntoView({behavior:'smooth'})
// })
// document.getElementById('goto_Knowledge').addEventListener('click', () => {
//     document.getElementById('knowledges-showcase-section').scrollIntoView({behavior:'smooth'})
// })
// document.getElementById('toup').addEventListener('click', () => {
//     window.scrollTo({top:0,behavior:'smooth'})
// })

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

// --- Garden maker 3D art animation logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const cube = document.getElementById('cube');
document.getElementById("gardenMakerPage_Btn").addEventListener("mouseover", () => {
    cube.style.animation = 'rotate 30s linear infinite'
})
document.getElementById("gardenMakerPage_Btn").addEventListener("mouseleave", () => {
    cube.style.animation = ''
})

// --- Scrolling animations logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if (entry.isIntersecting) {entry.target.classList.add('show')} 
        else {entry.target.classList.remove('show')}
    })
})
const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach((e) => observer.observe(e))
const hidden2Elements = document.querySelectorAll(".hidden2")
hidden2Elements.forEach((e) => observer.observe(e))

// --- Save garden ideas button logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.querySelectorAll(".detailsListItem").forEach(item => {
    item.addEventListener("click", () => {item.classList.toggle("active")})
})
function toggleSaveState(buttonElement) {buttonElement.classList.toggle('saved');}

// --- Language Dictionary ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const translations = {
    en: {
        settings: "Settings",
        ideas: "Ideas",
        plantFinder: "Plant finder",
        knowledge: "Knowledge",
        sidepaneltitle: "Personal Oasis",
        savedP: "Saved Plants",
        savedWT: "Saved Works & Tools",
        savedGL: "Saved garden layouts",
        smalldescription1: "Whether you’re staring at a blank patch of dirt or looking to refresh a seasoned landscape, we provide the botanical blueprints to bring your vision to life.",
        smalldescription2: "Our platform blends art and science, offering custom garden layouts, a comprehensive plant-finding database, and a gallery of curated design inspiration to spark your creativity.",
        designNow: "Design now",
        ideastitle: "Discover Garden ideas",
        ideaspage: "See more ideas",
        plantfindertitle: "Find your ideal plant",
        plantsearchtitle:"Search for a plant",
        knowledgestitle: "Learn something interesting about the world of gardens",
        knowledgessubtitle1: "Discover Tips & Tricks for gardening",
        knowledgessubtitle2: "Explore gardens from around the world",
        knowledges: "Learn more",
        // New keys for the search section
        commonName: "Common name:",
        botanical_name: "Botanical name:",
        wateringNeed: "Watering need",
        sunlightNeed: "Sunlight need",
        soilType: "Soil type",
        low: "Low",
        medium: "Medium",
        high: "High",
        moderate: "Moderate",
        plantingMonth: "Planting month:",
        harvestingMonth: "Harvesting month:",
        searchBtn: "Search",
        choose: "Choose...",
        // New keys for results
        plantDetails: "Plant Details",
        resCommon: "Common:",
        resScientific: "Scientific:",
        // resType: "Type:",
        resWatering: "Watering:",
        resSunlight: "Sunlight:",
        resSoil: "Soil:",
        resPlanting: "Planting:",
        resHarvesting: "Harvesting:",
        moreInfo: "Get more info"
    },
    hu: {
        settings: "Beállítások",
        ideas: "Ötletek",
        plantFinder: "Növénykereső",
        knowledge: "Tudásbázis",
        sidepaneltitle: "Személyes oázis",
        savedP: "Mentett növények",
        savedWT: "Mentett kerti munkák és eszközök",
        savedGL: "Mentett kert tervek",
        smalldescription1: "Akár egy üres földfoltot bámulsz, akár egy régi kertet szeretnél felfrissíteni, mi biztosítjuk a botanikai terveket, hogy életre keltsük elképzelésed.",
        smalldescription2: "Platformunk ötvözi a művészetet és a tudományt, az egyedi kerttervezési ötleteket, átfogó növénykereső adatbázist és válogatott tervezési inspirációk galériáját kínálva, hogy a kreativitásod szikrájára új láng lobbanjon.",
        designNow: "Tervezés",
        ideastitle: "Fedezz fel kertötleteket",
        ideaspage: "Több kertötlet",
        plantfindertitle: "Találd meg az ideális növényed",
        plantsearchtitle:"Keress növényeket",
        knowledgestitle: "Tudj meg valami érdekeset a kertek világáról",
        knowledgessubtitle1: "Fedezz fel kertészeti tippeket és trükköket",
        knowledgessubtitle2: "Fedezz fel kerteket a világ minden tájáról",
        knowledges: "Tudj meg többet",
        // New keys for the search section
        commonName: "Gyakori név:",
        botanical_name: "Botanikai név:",
        wateringNeed: "Öntözési igény",
        sunlightNeed: "Fényigény",
        soilType: "Talajtípus",
        low: "Alacsony",
        medium: "Közepes",
        high: "Magas",
        moderate: "Mérsékelt",
        plantingMonth: "Ültetési hónap:",
        harvestingMonth: "Betakarítási hónap:",
        searchBtn: "Keresés",
        choose: "Válassz...",
        // New keys for results
        plantDetails: "Növény részletei",
        resCommon: "Gyakori név:",
        resScientific: "Tudományos név:",
        // resType: "Típus:",
        resWatering: "Öntözés:",
        resSunlight: "Fényigény:",
        resSoil: "Talaj:",
        resPlanting: "Ültetés:",
        resHarvesting: "Betakarítás:",
        moreInfo: "További információ"
    }
};

// --- Language switch logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const langSelect = document.getElementById('lang-selection');
langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    updateLanguage(lang);
    localStorage.setItem('lang', lang)
});

function updateLanguage(lang) {
    const t = translations[lang];

    // Original elements
    document.getElementById('settings_Btn').innerText = t.settings;
    document.getElementById('goto_Ideas').innerText = t.ideas;
    document.getElementById('goto_PlantFinder').innerText = t.plantFinder;
    document.getElementById('goto_Knowledge').innerText = t.knowledge;
    document.getElementById('gardenMakerPage_Btn').innerText = t.designNow;
    document.getElementById('smalldescription1').innerText = t.smalldescription1;
    document.getElementById('smalldescription2').innerText = t.smalldescription2;
    document.getElementById('sidepanel-title').innerText = t.sidepaneltitle;
    document.getElementById('savedP_Btn').innerText = t.savedP;
    document.getElementById('savedWT_Btn').innerText = t.savedWT;
    document.getElementById('savedGL_Btn').innerText = t.savedGL;
    document.getElementById('ideas-title').innerText = t.ideastitle;
    document.getElementById('ideasPage_Btn').innerText = t.ideaspage;
    document.getElementById('plant-finder-title').innerText = t.plantfindertitle;
    document.getElementById('search-title').innerText = t.plantsearchtitle;
    document.getElementById('knowledges-title').innerText = t.knowledgestitle;
    document.getElementById('knowledges-subtitle1').innerText = t.knowledgessubtitle1
    document.getElementById('knowledges-subtitle2').innerText = t.knowledgessubtitle2

    // Search Form Labels & Placeholders
    //document.querySelector('label[for="commonplant-search-inp"]').innerText = t.common_name;
    // document.querySelector('label[for="botanicalplant-search-inp"]').innerText = t.botanical_name;
    document.getElementById('commonplant-search-inp').placeholder = lang === 'en' ? "Search..." : "Keresés...";
    
    // Checkbox Group Headers
    const h3s = document.querySelectorAll('.check-cont h3 u');
    h3s[0].innerText = t.wateringNeed;
    h3s[1].innerText = t.sunlightNeed;
    h3s[2].innerText = t.soilType;

    // Checkbox Labels (Low, Medium, High)
    document.querySelectorAll('label[for*="-low"]').forEach(el => el.innerText = t.low);
    document.querySelectorAll('label[for*="-medium"]').forEach(el => el.innerText = t.medium);
    document.querySelectorAll('label[for*="-moderate"]').forEach(el => el.innerText = t.moderate);
    document.querySelectorAll('label[for*="-high"]').forEach(el => el.innerText = t.high);

    // Dropdown Labels
    document.querySelector('label[for="plantingSelection"]').innerText = t.plantingMonth;
    document.querySelector('label[for="harvestingSelection"]').innerText = t.harvestingMonth;
    document.getElementById('searchPlant_Btn').innerText = t.searchBtn;

    // Results Table
    document.querySelector('.plantdetails-title').innerText = t.plantDetails;
    const tableKeys = document.querySelectorAll('.resultKey');
    tableKeys[0].innerText = t.resCommon;
    tableKeys[1].innerText = t.resScientific;
    tableKeys[2].innerText = t.resWatering;
    tableKeys[3].innerText = t.resSunlight;
    tableKeys[4].innerText = t.resSoil;
    tableKeys[5].innerText = t.resPlanting;
    tableKeys[6].innerText = t.resHarvesting;
    
    document.getElementById('plantsearchPage_Btn').innerText = t.moreInfo;
    
}

// --- Plant search logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const plantSpecs = {
    watering: {
        low: "Allow soil to dry completely before giving a thorough soak.",
        medium: "Apply water when the top inch of soil feels dry.",
        high: "Keep soil consistently moist without allowing it to become waterlogged."
    },
    sunlight: {
        low: "Shady indoor corners or full shade under outdoor tree canopies.",
        moderate: "Bright filtered light indoors or dappled shade in outdoor spaces.",
        high: "Direct window sun indoors or full sun in outdoor gardens."
    },
    soil: {
        low: "Lean, well-draining substrate with very minimal organic matter or nutrients.",
        moderate: "Balanced medium with a steady, moderate supply of essential nutrients.",
        high: "Dense, fertile medium packed with high concentrations of organic matter."
    }
};

document.getElementById('searchPlant_Btn').addEventListener("click", async (e) => {
    e.preventDefault();

    const commonNameSearch = document.getElementById('commonplant-search-inp').value.toLowerCase();

    const waterCheckboxes = document.querySelectorAll('.water-checkbox');
    const ActiveWaterCheckboxes = Array.from(waterCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const sunlightCheckboxes = document.querySelectorAll('.sunlight-checkbox');
    const ActiveSunlightCheckboxes = Array.from(sunlightCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const soilCheckboxes = document.querySelectorAll('.soil-checkbox');
    const ActiveSoilCheckboxes = Array.from(soilCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const plantingSeasonSelect = document.querySelector('#plantingSelection').value.toLowerCase();
    const harvestingSeasonSelect = document.querySelector('#harvestingSelection').value.toLowerCase();

    const resultTitle = document.getElementById('plantdetails-title');

    try {
        const response = await fetch(`/api/plants`, {method: "GET", headers: {'Content-Type' : 'application/json'}});
        if (!response.ok) throw new Error('Network response was not ok');
        const plants = await response.json();

        const filteredPlants = plants.filter(p => {
            const criteriacommonName = !commonNameSearch || p.common_name.toLowerCase().includes(commonNameSearch);
            console.log(`Name: ${criteriacommonName}`)
            
            const criteriaWater = ActiveWaterCheckboxes.length === 0 || ActiveWaterCheckboxes.includes(p.water.toLowerCase());
            const criteriaSunlight = ActiveSunlightCheckboxes.length === 0 || ActiveSunlightCheckboxes.includes(p.sunlight.toLowerCase());
            const criteriaSoil = ActiveSoilCheckboxes.length === 0 || ActiveSoilCheckboxes.includes(p.soil.toLowerCase());
            console.log(`Water: ${criteriaWater}`)
            console.log(`Sunlight: ${criteriaSunlight}`)
            console.log(`Soil: ${criteriaSoil}`)

            const criteriaPlanting = !plantingSeasonSelect || plantingSeasonSelect === "none" || p.planting.toLowerCase().includes(plantingSeasonSelect);
            const criteriaHarvesting = !harvestingSeasonSelect || harvestingSeasonSelect === "none" || p.harvesting.toLowerCase().includes(harvestingSeasonSelect);
            console.log(`Planting: ${criteriaPlanting}`)
            console.log(`Harvesting: ${criteriaHarvesting}`)

            // Use && to ensure ALL checked criteria must be met
            return criteriacommonName && criteriaWater && criteriaSunlight && criteriaSoil && criteriaPlanting && criteriaHarvesting;
        });

        //Send to display function (passing the array)
        displayResults(filteredPlants);

    } catch (error) {
        console.error('Error:', error);
        if (resultTitle) resultTitle.innerText = 'Error executing search';
    }
});

function displayResults(results) {
    const resultContainer = document.getElementById('plant-search-result-cont');
    const resultTable = document.getElementById('result-details-cont-table');
    const resultTitle = document.getElementById('plantdetails-title');
    const resultBtn = document.getElementById('plantsearchPage_Btn')

    resultContainer.classList.remove('hidden2');

    if (!results || results.length === 0) { 
        resultTitle.innerText = 'No plants found matching your criteria.';
        resultTitle.style.width = "50%"
        resultTitle.style.textAlign = "left"
        resultTable.innerHTML = ""; 
        resultBtn.style.display = "none"
        return;
    }

    resultBtn.style.display = "block"

    const p = results[0]; //first and best matching result

    resultTitle.innerText = "Plant Details";
    resultTable.innerHTML = ""; 

    function makeRow(key, value, category = null) {
        if (!value) return; // Skip if there's no data for this field

        const tr = document.createElement('tr');
        
        const tdKey = document.createElement('td');
        tdKey.className = 'resultKey';
        tdKey.textContent = key;

        const tdVal = document.createElement('td');
        tdVal.className = 'resultValue';

        // Check if this needs a long description from plantSpecs
        if (category && plantSpecs[category] && plantSpecs[category][value.toLowerCase()]) {
            tdVal.textContent = `${value}: ${plantSpecs[category][value.toLowerCase()]}`;
        } else {
            tdVal.textContent = value; 
        }

        tr.appendChild(tdKey);
        tr.appendChild(tdVal);
        resultTable.appendChild(tr);
    }

    makeRow('Common:', p.common_name);
    makeRow('Scientific:', p.botanical_name);
    makeRow('Watering:', p.water, 'watering');
    makeRow('Sunlight:', p.sunlight, 'sunlight');
    makeRow('Soil:', p.soil, 'soil');
    makeRow('Planting:', p.planting);
    makeRow('Harvesting:', p.harvesting);
}