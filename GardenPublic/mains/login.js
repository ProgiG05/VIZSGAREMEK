
document.querySelector('.login-card').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
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
            alert(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login request failed:', error.message);
        alert('Could not connect to the server. Please try again later.');
    }
});