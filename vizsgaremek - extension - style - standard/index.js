// --- Initialize State ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
};

// --- Navbar scrolling actions logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const ideasBtn = document.getElementById("goto_Ideas")
ideasBtn.addEventListener("click", () => {
    window.scrollTo({top:900,behavior:"smooth"})
})
const plantfinderBtn = document.getElementById("goto_PlantFinder")
plantfinderBtn.addEventListener("click", () => {
    window.scrollTo({top:1950,behavior:"smooth"})
})
const knowledgesBtn = document.getElementById("goto_Knowledge")
knowledgesBtn.addEventListener("click"  , () => {
    window.scrollTo({top:2940,behavior:"smooth"})
})

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
        console.log(entry)
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

