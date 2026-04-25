// Shared authentication helpers


export function getUser() {
    const match = document.cookie.match(/(?:^|; )user=([^;]*)/);
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match[1]));
    } catch {
        return null;
    }
}


// Shared fetch wrapper -> sends cookies automatically, refreshes token on 401, redirects to login if refresh fails


let isRefreshing = false;
let refreshQueue = [];


async function doRefresh() {
    try {
        const res = await fetch('/api/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        return res.ok;
    } catch {
        return false;
    }
}


export async function apiFetch(url, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };


    const res = await fetch(url, {
        ...options,
        headers,
        credentials: 'include'
    });


    if (res.status !== 401) {
        return res;
    }


    // Token expired -> attempt silent refresh
    if (isRefreshing) {
        return new Promise((resolve) => {
            refreshQueue.push(() => resolve(apiFetch(url, options)));
        });
    }


    isRefreshing = true;
    const refreshed = await doRefresh();
    isRefreshing = false;


    if (refreshed) {
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];
        return apiFetch(url, options);
    }


    // Refresh failed -> clear state and redirect
    refreshQueue = [];
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/sites/login.html';
}