const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const accountHandler = (e) => {
    e.preventDefault();
    window.location.href = "/sites/accounts.html";
};

export function setupNavbar() {
    const body = document.body;
    const header = document.getElementById('top-navbar');

    // --- Generate Top Navbar if empty ---
    if (header && header.children.length <= 1) {
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

        if (loginBtn) {
            loginBtn.innerHTML = `${user.username}`;
            loginBtn.onclick = accountHandler;
            loginBtn.setAttribute('href', '/sites/accounts.html');
        }
    }
}

export function setupSidePanel() {
    let sidePanel = document.getElementById('settings-sidepanel');
    if (!sidePanel) {
        sidePanel = document.createElement('div');
        sidePanel.setAttribute('id', 'settings-sidepanel');
        sidePanel.setAttribute('class', 'settings-sidepanel');
        
        sidePanel.innerHTML = `
            <h2 id="sidepanel-title">Personal Oasis</h2>
            <button class="closeSidePanel" id="closeSidePanel">
                <img src="../pics/icons/close_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Close">
            </button>
            <select class="lang-selection" id="lang-selection">
                <option value="en">English</option>
                <option value="hu">Hungarian</option>
            </select>
            <a id="savedI_Btn" href="../sites/ideas.html">Ideas</a>
            <a id="savedP_Btn" href="../sites/plants.html">Plants</a>
            <a id="savedGL_Btn" href="../sites/gardens.html">Gardens</a>
            <a id="login_Btn" href="../sites/login.html">Login / Register</a>
            <button class="darkmode" id="darkmode">
                <img id="light-icon" class="theme-icon" src="../pics/icons/dark_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Light mode" >
                <img id="dark-icon" class="theme-icon" src="../pics/icons/light_mode_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Dark mode" >
            </button>
        `;
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
        // Apply initial theme
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
            darkBtn.classList.add('dark-active');
        }

        darkBtn.onclick = () => {
            body.classList.toggle('dark-theme');
            darkBtn.classList.toggle('dark-active');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
    }
}

export function setupLoginState() {
    if (token && user) {
        const topLoginBtn = document.getElementById("logIn_Btn");
        const sideLoginBtn = document.getElementById("login_Btn");

        if (topLoginBtn) {
            topLoginBtn.innerHTML = `${user.username[0].toUpperCase()}`;
            topLoginBtn.onclick = accountHandler;
            topLoginBtn.setAttribute('href', '/sites/accounts.html');
        }
        if (sideLoginBtn) {
            sideLoginBtn.innerHTML = `${user.username[0].toUpperCase()}`;
            sideLoginBtn.onclick = accountHandler;
            sideLoginBtn.setAttribute('href', '/sites/accounts.html');
        }
    }
}