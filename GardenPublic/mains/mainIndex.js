// --- Initialize State ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.addEventListener('DOMContentLoaded', async () => {
    await sampleIdeas()
})

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
};

// --- Navbar scrolling actions logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('top-navbar').style.top = "0";
  } else {
    document.getElementById('top-navbar').style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
} 

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
    }
};

// --- Language switch logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const langSelect = document.getElementById('lang-selection');
langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    updateLanguage(lang);
    // localStorage.setItem('lang', lang ? 'hu' : 'en')
});

function updateLanguage(lang) {
    document.getElementById('settings_Btn').innerText = translations[lang].settings;
    document.getElementById('goto_Ideas').innerText = translations[lang].ideas;
    document.getElementById('goto_PlantFinder').innerText = translations[lang].plantFinder;
    document.getElementById('goto_Knowledge').innerText = translations[lang].knowledge
    document.getElementById('gardenMakerPage_Btn').innerText = translations[lang].designNow;
    document.getElementById('smalldescription1').innerText = translations[lang].smalldescription1
    document.getElementById('smalldescription2').innerText = translations[lang].smalldescription2
    document.getElementById('sidepanel-title').innerText = translations[lang].sidepaneltitle
    document.getElementById('savedP_Btn').innerText = translations[lang].savedP
    document.getElementById('savedWT_Btn').innerText = translations[lang].savedWT
    document.getElementById('savedGL_Btn').innerText = translations[lang].savedGL
    document.getElementById('ideas-title').innerText = translations[lang].ideastitle
    document.getElementById('ideasPage_Btn').innerText = translations[lang].ideaspage
}

// --- Garden Idea cards samples fetch logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// --- Plant search logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



document.getElementById('searchPlant_Btn').addEventListener('click', async (e) => {
    e.preventDefault()

    const resultsContainer = document.getElementById('searchResult');
    
    //Search data:
    //------------------------------------------------------------------------------------------------------------------
    const commonNameSearch = document.getElementById('commonplant-search-inp').value
    const botanicalNameSearch = document.getElementById('botanicalplant-search-inp').value

    const waterCheckboxes = document.querySelectorAll('.water-checkbox')
    const ActiveWaterCheckboxes = Array.from(waterCheckboxes).filter(x => x.checked).map(y => y.value) // gets an array of the value of the checkboxes

    const sunlightCheckboxes = document.querySelectorAll('.sunlight-checkbox')
    const ActiveSunlightCheckboxes = Array.from(sunlightCheckboxes).filter(x => x.checked).map(y => y.value)

    const soilCheckboxes = document.querySelectorAll('.soil-checkbox')
    const ActiveSoilCheckboxes = Array.from(soilCheckboxes).filter(x => x.checked).map(y => y.value)
    //------------------------------------------------------------------------------------------------------------------
    try {
        const response = await fetch(`/api/plants`,{method: "GET", headers: {'Content-Type' : 'application/json'}});
        console.log(response)
        if (!response.ok) throw new Error('Network response was not ok');
        const plants = await response.json();
        console.log(plants)
        resultsContainer.innerHTML = '';
        if (!plants || plants.length === 0) {resultsContainer.innerHTML = '<p class="extraMSG">No plants found matching your criteria.</p>';return;}
        
        plants.forEach(p => {
            let cmn = p.commonName.toLowerCase()
            let bmn = p.botanicalName.toLowerCase()
            let criteria1 = cmn.includes(commonNameSearch.toLowerCase()) || bmn.includes(botanicalNameSearch.toLowerCase())
            if (cmn === commonNameSearch.toLowerCase()) {
                const resultDetailsCont = document.createElement('div')
                resultDetailsCont.setAttribute('class','result-details-cont')

                const imgCont = document.createElement('div')
                imgCont.setAttribute('class', 'resultimage-cont')

                const imgInner = document.createElement('img')
                imgInner.setAttribute('class','result-imgInner')
                imgInner.setAttribute('alt',`${p.commonName}`)
                imgInner.setAttribute('src','../pics/others/searchedplant_placeholder.png')
                imgCont.appendChild(imgInner)
                resultDetailsCont.appendChild(imgCont)

                const plantResultTitle = document.createElement('h2')
                plantResultTitle.setAttribute('class','plantdetails-title')
                plantResultTitle.textContent = "Plant Details"
                resultDetailsCont.appendChild(plantResultTitle)

                const plantResultTable = document.createElement('table') 
                plantResultTable.setAttribute('class','result-details-cont-table')

                function makeRow(key, value) {
                    const plantResultTableRow = document.createElement('tr')

                    const plantResultTableData1 = document.createElement('td')
                    plantResultTableData1.setAttribute('class','resultKey')
                    plantResultTableData1.textContent = `${key}`

                    const plantResultTableData2 = document.createElement('td')
                    plantResultTableData2.setAttribute('class','resultValue')
                    plantResultTableData2.textContent = `${value}`

                    plantResultTableRow.appendChild(plantResultTableData1)
                    plantResultTableRow.appendChild(plantResultTableData2)

                    plantResultTable.appendChild(plantResultTableRow)
                }

                makeRow('Common name:', p.commonName) 
                makeRow('Botanical name:', p.botanicalName)
                makeRow('Type', p.type)
                makeRow('Watering:', p.water)
                makeRow('Sunlight:', p.sunlight)
                makeRow('Soil:', p.soil)
                makeRow('Planting:', p.planting)
                makeRow('Harvesting:', p.harvesting)
                
                resultDetailsCont.appendChild(plantResultTable);

                const plantSearchPageBtn = document.createElement('a')
                plantSearchPageBtn.setAttribute('class','plantsearchPage_Btn')
                plantSearchPageBtn.setAttribute('id','plantsearchPage_Btn')
                plantSearchPageBtn.setAttribute('href','../sites/plants.html')
                plantSearchPageBtn.textContent = 'Get more info'
                resultDetailsCont.appendChild(plantSearchPageBtn)

                resultsContainer.appendChild(resultDetailsCont)
            }
            else{
                resultsContainer.innerHTML = '<p class="extraMSG">No plants found matching your criteria.</p>';
            }
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
        resultsContainer.innerHTML = '<p class="extraMSG">Error executing search. Please try again.</p>';
    }
})

async function sampleIdeas() {
    const idasPlace = document.getElementById('showcase-container')
    const response = await fetch(`/api/ideas`,{method: "GET"    , headers: {'Content-Type' : 'application/json'}});
    const ideas = await response.json();

    const returnIdeas = [ideas[0], ideas[1], ideas[2]]

    console.log(returnIdeas)
    
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
    })
}