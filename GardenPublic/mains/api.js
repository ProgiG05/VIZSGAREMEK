// Shared authentication helpers

export function getToken() {
    return localStorage.getItem('token');
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        localStorage.removeItem('user');
        return null;
    }
}

// Shared fetch wrapper -> auto-attaches token to session, redirects to login page if status 401, JSON parse

export async function apiFetch(url, options = {}) {
    const token = getToken();

    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/sites/login.html';
        return;
    }

    return res;
}
