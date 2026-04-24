import { showAlert } from "./popup.js";

document.querySelector('.signup-card').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showAlert('Please fill in both fields.', "Error!");
        return;
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
