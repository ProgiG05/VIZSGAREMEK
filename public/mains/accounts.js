import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
import { getUser, apiFetch } from './api.js';


document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();

    const user = getUser();
    if (!user) {
        window.location.href = "/sites/login.html";
        return;
    }

    const accountheader = document.getElementById("account-header");
    if (accountheader) {
        const accountHeaderTitle = document.createElement("h1");
        accountHeaderTitle.textContent = `${user.username}`;
        accountheader.appendChild(accountHeaderTitle);
    }

    const logoutBtn = document.getElementById("logout_btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await apiFetch('/api/logout', { method: 'POST' });
            } catch (error) {
                console.error('Logout request failed:', error.message);
            }

            document.cookie = 'user=; Max-Age=0; path=/; SameSite=Strict';
            window.location.href = "/index.html";
        });
    }
});