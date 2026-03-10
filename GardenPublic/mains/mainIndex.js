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
        document.querySelector('#account-hub h3').innerHTML = isHu ? `<i data-lucide="user"></i> Oázisom` : `<i data-lucide="user"></i> My Oasis`;
        document.getElementById('item-plants').innerHTML = isHu ? `<i data-lucide="leaf"></i> Mentett növények` : `<i data-lucide="leaf"></i> Saved Plants`;
        document.getElementById('item-works').innerHTML = isHu ? `<i data-lucide="check-square"></i> Kertészeti munkák & eszközök` : `<i data-lucide="check-square"></i> Gardening Works & Tools`;
        document.getElementById('item-layouts').innerHTML = isHu ? `<i data-lucide="layout"></i> Kerttervek` : `<i data-lucide="layout"></i> Garden Layouts`;
        document.getElementById('langTitle').innerHTML = isHu ? `<i data-lucide="languages"></i> Nyelv` : `<i data-lucide="languages"></i> Language`;
        lucide.createIcons();
    });
}
const searchForm = document.getElementById('search-container');
const resultsContainer = document.getElementById('searchedPlant-container');

if (searchForm && resultsContainer) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(searchForm);
        const params = new URLSearchParams(formData);
        
        try {
            resultsContainer.innerHTML = '<p>Searching...</p>';
            const response = await fetch(`/api/plantfinder?${params.toString()}`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const plants = await response.json();
            resultsContainer.innerHTML = '';
            
            if (!plants || plants.length === 0) {
                resultsContainer.innerHTML = '<p>No plants found matching your criteria.</p>';
                return;
            }
            
            plants.forEach(p => {
                const box = document.createElement('div'), row = (l, v) => `<div class="info-line"><strong>${l}</strong><span>${v || ''}</span></div>`;
                box.className = 'plain-info-box';
                box.innerHTML = row('commonName', p.commonName) + row('botanicalName', p.botanicalName) + row('type', p.type) + 
                    row('water', p.water || p.Watering) + row('sunlight', p.sunlight || p.Sunlight) + row('soil', p.soil || p.Soil) + 
                    row('planting', p.planting || p['Planting season']) + row('harvesting', p.harvesting || p['Harvesting season']) + 
                    `<div class="info-line" style="margin-top:10px;border-bottom:none;"><a href="/searchedPlants?botanicalName=${encodeURIComponent(p.botanicalName || '')}" style="text-decoration:underline;color:inherit;font-weight:bold;">More Info ></a></div>`;
                resultsContainer.appendChild(box);
            });
        } catch (error) {
            console.error('Error fetching plants:', error);
            resultsContainer.innerHTML = '<p>Error executing search. Please try again.</p>';
        }
    });
}
