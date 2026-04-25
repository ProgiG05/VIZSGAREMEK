import { getUser } from './api.js';

const user = getUser();

const accountHandler = (e) => {
    e.preventDefault();
    window.location.href = "/sites/accounts.html";
};

export function setupNavbar() {
    const header = document.getElementById('top-navbar');
    if (!header || header.children.length > 1) return;

    header.innerHTML = '';

    const settingsBtn = document.createElement("a");
    settingsBtn.setAttribute("id", "settings_Btn");
    settingsBtn.textContent = "Settings";
    header.appendChild(settingsBtn);

    const homeBtn = document.createElement("a");
    homeBtn.setAttribute("id", "home_Btn");
    homeBtn.setAttribute("href", "../sites/index.html");
    homeBtn.textContent = "Home";
    header.appendChild(homeBtn);

    const ideasBtn = document.createElement("a");
    ideasBtn.setAttribute("id", "goto_Ideas");
    ideasBtn.setAttribute("href", "../sites/ideas.html");
    ideasBtn.textContent = "Ideas";
    header.appendChild(ideasBtn);

    const plantfinderBtn = document.createElement("a");
    plantfinderBtn.setAttribute("id", "goto_PlantFinder");
    plantfinderBtn.setAttribute("href", "../sites/plants.html");
    plantfinderBtn.textContent = "Plants";
    header.appendChild(plantfinderBtn);

    const knowledgesBtn = document.createElement("a");
    knowledgesBtn.setAttribute("id", "goto_Knowledge");
    knowledgesBtn.setAttribute("href", "../sites/knowledges.html");
    knowledgesBtn.textContent = "Knowledges";
    header.appendChild(knowledgesBtn);

    const gardensBtn = document.createElement("a");
    gardensBtn.setAttribute("id", "goto_Gardens");
    gardensBtn.setAttribute("href", "../sites/gardens.html");
    gardensBtn.textContent = "Gardens";
    header.appendChild(gardensBtn);

    const loginBtn = document.createElement("a");
    loginBtn.setAttribute("id", "logIn_Btn");
    loginBtn.setAttribute("href", "../sites/login.html");
    loginBtn.textContent = "Login / Register";
    header.appendChild(loginBtn);

    // Only override login button text if user is logged in
    if (user) {
        loginBtn.textContent = user.username;
        loginBtn.onclick = accountHandler;
        loginBtn.setAttribute('href', '/sites/accounts.html');
    }
}

export function setupSidePanel() {
    let sidePanel = document.getElementById('settings-sidepanel');
    if (!sidePanel) {
        sidePanel = document.createElement('div');
        sidePanel.setAttribute('id', 'settings-sidepanel');
        sidePanel.setAttribute('class', 'settings-sidepanel');
        
        const h2 = document.createElement('h2');
        h2.setAttribute('id', 'sidepanel-title');
        h2.textContent = 'Personal Oasis';
        sidePanel.appendChild(h2);

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('class', 'closeSidePanel');
        closeBtn.setAttribute('id', 'closeSidePanel');

        const closeImg = document.createElement('img');
        closeImg.setAttribute('src', '../pics/icons/close_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png');
        closeImg.setAttribute('alt', 'Close');

        closeBtn.appendChild(closeImg);
        sidePanel.appendChild(closeBtn);

        const select = document.createElement('select');
        select.setAttribute('class', 'lang-selection');
        select.setAttribute('id', 'lang-selection');

        const optEn = document.createElement('option');
        optEn.setAttribute('value', 'en');
        optEn.textContent = 'English';

        const optHu = document.createElement('option');
        optHu.setAttribute('value', 'hu');
        optHu.textContent = 'Hungarian';

        select.appendChild(optEn);
        select.appendChild(optHu);
        sidePanel.appendChild(select);

        const links = [
            { id: 'savedI_Btn', href: '../sites/ideas.html', text: 'Ideas' },
            { id: 'savedP_Btn', href: '../sites/plants.html', text: 'Plants' },
            { id: 'savedGL_Btn', href: '../sites/gardens.html', text: 'Gardens' },
            { id: 'login_Btn', href: '../sites/login.html', text: 'Login / Register' }
        ];

        links.forEach(linkData => {
            const a = document.createElement('a');
            a.setAttribute('id', linkData.id);
            a.setAttribute('href', linkData.href);
            a.textContent = linkData.text;
            sidePanel.appendChild(a);
        });

        const darkModeBtn = document.createElement('button');
        darkModeBtn.setAttribute('class', 'darkmode');
        darkModeBtn.setAttribute('id', 'darkmode');

        const lightIcon = document.createElement('img');
        lightIcon.setAttribute('id', 'light-icon');
        lightIcon.setAttribute('class', 'theme-icon');
        lightIcon.setAttribute('src', '../pics/icons/dark_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png');
        lightIcon.setAttribute('alt', 'Light mode');

        const darkIcon = document.createElement('img');
        darkIcon.setAttribute('id', 'dark-icon');
        darkIcon.setAttribute('class', 'theme-icon');
        darkIcon.setAttribute('src', '../pics/icons/light_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png');
        darkIcon.setAttribute('alt', 'Dark mode');

        darkModeBtn.appendChild(lightIcon);
        darkModeBtn.appendChild(darkIcon);
        sidePanel.appendChild(darkModeBtn);

        document.body.appendChild(sidePanel);
    }

    // --- Side Panel Toggle Logic ---
    const settingsBtn = document.getElementById('settings_Btn');
    const closePanel = document.getElementById('closeSidePanel');

    if (settingsBtn && sidePanel && closePanel) {
        settingsBtn.onclick = (e) => {
            e.preventDefault();
            sidePanel.style.transition = '0.4s all ease';
            sidePanel.style.left = '0';
        };
        closePanel.onclick = (e) => {
            e.preventDefault();
            sidePanel.style.transition = '0.4s all ease';
            sidePanel.style.left = "-22.5rem";
        };
    }

    // --- Dark Mode Logic ---
    const darkBtn = document.getElementById('darkmode');
    if (darkBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            darkBtn.classList.add('dark-active');
        }

        darkBtn.onclick = () => {
            document.body.classList.toggle('dark-theme');
            darkBtn.classList.toggle('dark-active');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
    }
}

export function setupLoginState() {
    if (!user) return;

    const topLoginBtn = document.getElementById("logIn_Btn");
    const sideLoginBtn = document.getElementById("login_Btn");

    if (topLoginBtn) {
        topLoginBtn.textContent = user.username;
        topLoginBtn.onclick = accountHandler;
        topLoginBtn.setAttribute('href', '/sites/accounts.html');
    }
    if (sideLoginBtn) {
        sideLoginBtn.textContent = user.username;
        sideLoginBtn.onclick = accountHandler;
        sideLoginBtn.setAttribute('href', '/sites/accounts.html');
    }
}