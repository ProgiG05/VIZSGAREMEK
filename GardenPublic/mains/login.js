document.querySelector('.login-card').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('email').value
    const password = document.getElementById('password').value

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        window.location.href = '/index.html'
    } else {
        alert(data.message)
    }
})