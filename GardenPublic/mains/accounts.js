import { setupNavbar } from './navbar.js';
import { setupSidePanel } from './navbar.js';
import { setupLoginState } from './navbar.js';

const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();
    const user = JSON.parse(localStorage.getItem("user"));
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