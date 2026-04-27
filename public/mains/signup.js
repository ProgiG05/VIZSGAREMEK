import { showAlert } from "./popup.js";
import { setupNavbar, setupSidePanel, setupLoginState } from './navbar.js';


document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
    setupSidePanel();
    setupLoginState();
});

document.querySelector('.signup-card').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;

    if (!username || !password || !terms) {
        showAlert('Please fill in all fields and accept the terms and conditions.', "Error!");
        return;
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            window.location.href = '../sites/login.html';
        } else {
            showAlert(data.message || 'Registration failed. Please try a different username.', "Error!");
        }
    } catch (error) {
        console.error('Registration request failed:', error.message);
        showAlert('Could not connect to the server. Please try again later.', "Error!");
    }
});