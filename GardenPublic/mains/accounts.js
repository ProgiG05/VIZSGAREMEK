import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';
import { getToken, getUser } from './api.js';

const token = getToken();
document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();
    const user = getUser();
    if (!token) {
        window.location.href = "/sites/login.html";
        return;
    }   
    const accountheader = document.getElementById("account-header");
    const accountHeaderTitle = document.createElement("h1");
    accountHeaderTitle.textContent = `${user.username}`;
    accountheader.appendChild(accountHeaderTitle);

    const logoutBtn = document.getElementById("logout_btn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/index.html";
    });

    console.log(user.username)
});