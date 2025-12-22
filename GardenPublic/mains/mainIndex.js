// mainIndex.js — UI behavior for index.ejs
// Key IDs referenced:
// - #sidebar, #sidebar.active: off-canvas settings pane
// - #lang-switch: language selector
// - #theme-toggle, #theme-icon, body.dark: theme control
// - #search-container, #execute-search and the search input IDs
// Lucide icons are initialized here.
lucide.createIcons();

function toggleSidebar() {
    // Toggle the sidebar `active` class (selector: #sidebar.active)
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSearch() {
    // Expand/collapse the search panel (selector: #search-container.active)
    document.getElementById('search-container').classList.toggle('active');
}

/* Theme handling */
function applyTheme(isDark) {
    // Adds/removes `dark` class on <body>, toggling CSS rules under `body.dark`
    document.body.classList.toggle('dark', isDark);
    // Update the theme icon (selector: #theme-icon)
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
}

/* Initialize theme from localStorage */
(function initTheme() {
    // Read saved theme from localStorage and initialize
    const saved = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; }})();
    applyTheme(saved === 'dark');
    // Attach click handler to `#theme-toggle` button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
})();

// Language switch: updates the visible hero title and subtitle
const langSwitch = document.getElementById('lang-switch');
if (langSwitch) {
    langSwitch.addEventListener('change', (e) => {
        const isHu = e.target.value === 'hu';
        document.querySelector('#hero-title h1').innerText = isHu ? "Kertészeti Műszerfal" : "Botanical Dashboard";
        document.querySelector('#hero-title p').innerText = isHu ? "Egyszerűsített kertészkedés a következő generációnak." : "Smart gardening simplified for the next generation.";
    });
}

// Execute search button: reads inputs such as `#commonName` and triggers search action
const execBtn = document.getElementById('execute-search');
if (execBtn) {
    execBtn.onclick = () => {
        const name = document.getElementById('commonName').value || "all results";
        console.log(`Filtering botanical data for: ${name}`);
        // Replace console.log with real filter logic or fetch as needed
    };
}

document.getElementById("execute-search").addEventListener("click", async () =>{
    const responsePlant = await fetch('/api/showPlantFinder', {
        method : "GET",
        headers : {"Content-Type" : "application/json"}
    })
    const ThePlant = await responsePlant.json()
    const searchedPlantPlace = document.getElementById("searchedPlant-container")
    ThePlant.forEach(plantDetail => {
        const plantCommonName = document.createElement("p")
        plantCommonName.textContent = `Common name: ${plantDetail.commonName}`
        searchedPlantPlace.appendChild(plantCommonName)
    });
})