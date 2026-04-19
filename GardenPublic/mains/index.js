import { setupNavbar } from './navbar.js';

// --- Initialize State ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const token = localStorage.getItem("token");

document.addEventListener('DOMContentLoaded', async (e) => {
    setupNavbar();
    
    // e.preventDefault() // Removed because it might interfere with normal clicks on children
    
    const user = JSON.parse(localStorage.getItem("user"));

    const responseIdeas = await fetch('/api/ideas', { method: "GET", headers : {"Content-Type" : "application/json"}})
    const ListOfIdeas = await responseIdeas.json()
    const IdeasCardContainer = document.getElementById("showcase-container")

    const randoms = Math.floor(Math.random() * ListOfIdeas.length)
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

function clearFilters(type) {
    const checks = document.querySelectorAll(`.${type}-radioBtn`)
    checks.forEach(check => check.checked = false)
}

document.getElementById('clear-water-btn').addEventListener('click', () => clearFilters('water'))
document.getElementById('clear-sunlight-btn').addEventListener('click', () => clearFilters('sunlight'))
document.getElementById('clear-soil-btn').addEventListener('click', () => clearFilters('soil'))

document.getElementById('searchPlant_Btn').addEventListener("click", async (e) => {
    e.preventDefault();

    const commonNameSearch = document.getElementById('commonplant-search-inp').value.toLowerCase();

    const waterCheckboxes = document.querySelectorAll('.water-radioBtn');
    const ActiveWaterCheckboxes = Array.from(waterCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const sunlightCheckboxes = document.querySelectorAll('.sunlight-radioBtn');
    const ActiveSunlightCheckboxes = Array.from(sunlightCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const soilCheckboxes = document.querySelectorAll('.soil-radioBtn');
    const ActiveSoilCheckboxes = Array.from(soilCheckboxes).filter(x => x.checked).map(y => y.value.toLowerCase());

    const plantingSeasonSelect = document.querySelector('#plantingSelection').value.toLowerCase();

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
            console.log(`Planting: ${criteriaPlanting}`)

            // Use && to ensure ALL checked criteria must be met
            return criteriacommonName && criteriaWater && criteriaSunlight && criteriaSoil && criteriaPlanting;
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
    const resultBtn = document.getElementById('plantsearchPage_Btn');
    const resultPic = document.getElementById('resultimage')

    resultContainer.classList.remove('hidden2');

    if (!results || results.length === 0) { 
        resultTitle.innerText = 'No plants found matching your criteria.';
        resultTitle.style.textAlign = "left"
        resultTable.innerHTML = ""; 
        resultBtn.style.display = "none"
        resultPic.style.display = "none"
        return;
    }
    resultTitle.style.textAlign = "center"
    resultTitle.innerText = "Plant Details";
    resultTable.innerHTML = ""; 
    resultPic.style.display = "block"
    resultBtn.style.display = "block"
    
    const p = results[0]; //first and best matching result

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
}