document.addEventListener("DOMContentLoaded", () => {
    const body = document.body

    // Create Side Panel Container
    const SidePanel = document.createElement("div")
    SidePanel.setAttribute("id", "settings-sidepanel")
    SidePanel.setAttribute("class", "settings-sidepanel")

    // Title
    const SidePanleTitle = document.createElement("h2")
    SidePanleTitle.setAttribute("id", "sidepanel-title")
    SidePanleTitle.textContent = "Personal Oasis"
    SidePanel.appendChild(SidePanleTitle)

    // Close Button
    const CloseSidePanelBtn = document.createElement("button")
    CloseSidePanelBtn.setAttribute("id", "closeSidePanel")
    CloseSidePanelBtn.setAttribute("class", "closeSidePanel")
    const closeImg = document.createElement("img")
    closeImg.setAttribute("src", "../pics/icons/close_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")
    closeImg.setAttribute("alt", "Close")
    CloseSidePanelBtn.appendChild(closeImg)
    SidePanel.appendChild(CloseSidePanelBtn)

    // Language Selection
    const LangSelection = document.createElement("select")
    LangSelection.setAttribute("class", "lang-selection")
    LangSelection.setAttribute("id", "lang-selection")

    const options = [
        { value: "en", text: "English" },
        { value: "hu", text: "Hungarian" }
    ]

    options.forEach(opt => {
        const option = document.createElement("option")
        option.setAttribute("value", opt.value)
        option.textContent = opt.text
        LangSelection.appendChild(option)
    })
    SidePanel.appendChild(LangSelection)

    // Navigation Links
    const links = [
        { id: "savedIdeas_Btn", href: "../sites/savedIdeas.html", text: "Saved Ideas" },
        { id: "savedPlants_Btn", href: "../sites/savedPlants.html", text: "Saved Plants" },
        { id: "savedGL_Btn", href: "../sites/savedGardens.html", text: "Saved Gardens" },
        { id: "login_Btn", href: "../sites/login.html", text: "Login / Register" }
    ]

    links.forEach(linkData => {
        const link = document.createElement("a")
        link.setAttribute("id", linkData.id)
        link.setAttribute("href", linkData.href)
        link.textContent = linkData.text
        SidePanel.appendChild(link)
    })

    // Dark Mode Toggle Button
    const DarkModeBtn = document.createElement("button")
    DarkModeBtn.setAttribute("class", "darkmode")
    DarkModeBtn.setAttribute("id", "darkmode")

    const lightIcon = document.createElement("img")
    lightIcon.setAttribute("id", "light-icon")
    lightIcon.setAttribute("class", "theme-icon")
    lightIcon.setAttribute("src", "../pics/icons/dark_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")
    lightIcon.setAttribute("alt", "Light mode")

    const darkIcon = document.createElement("img")
    darkIcon.setAttribute("id", "dark-icon")
    darkIcon.setAttribute("class", "theme-icon")
    darkIcon.setAttribute("src", "../pics/icons/light_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")
    darkIcon.setAttribute("alt", "Dark mode")

    DarkModeBtn.appendChild(lightIcon)
    DarkModeBtn.appendChild(darkIcon)
    SidePanel.appendChild(DarkModeBtn)

    // Finally, append the panel to the body
    body.appendChild(SidePanel)
})
// --- Localstorage Logic ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        darkBtn.classList.add('dark-active');
    }
};
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
    
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});