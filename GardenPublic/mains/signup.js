
document.querySelector('.signup-card').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
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
            alert(data.message || 'Registration failed. Please try a different username.');
        }
    } catch (error) {
        console.error('Registration request failed:', error.message);
        alert('Could not connect to the server. Please try again later.');
    }
});
