document.querySelector('.signup-card').addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
    })

    const data = await res.json()

    if (data.success) {
        window.location.href = '../sites/login.html'
    } else {
        alert(data.message)
    }
})
