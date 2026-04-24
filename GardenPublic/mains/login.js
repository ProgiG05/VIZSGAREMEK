import { showAlert } from "./popup.js";

document.querySelector('.login-card').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showAlert('Please fill in both fields.', "Error!");
        return;
    }

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            window.location.href = '/index.html';
        } else {
            showAlert(data.message || 'Login failed. Please check your credentials.', "Error!");
        }
    } catch (error) {
        console.error('Login request failed:', error.message);
        showAlert('Could not connect to the server. Please try again later.', "Error!");
    }
});