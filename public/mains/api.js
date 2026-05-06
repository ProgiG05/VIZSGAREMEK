// --- Authentication helpers ---

export function getUser() {
  // Read user cookie
  const match = document.cookie.match(/(?:^|; )user=([^;]*)/);
  if (!match) return null;

  // Parse user data
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

// --- Fetch wrapper ---

let isRefreshing = false;
let refreshQueue = [];

// Refresh token request
async function doRefresh() {
  try {
    const res = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiFetch(url, options = {}) {
  // Request headers
  const headers = { "Content-Type": "application/json", ...options.headers };

  // Initial request
  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // Return non-auth errors directly
  if (res.status !== 401) {
    return res;
  }

  // Wait for active refresh
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(() => resolve(apiFetch(url, options)));
    });
  }

  // Refresh session
  isRefreshing = true;
  const refreshed = await doRefresh();
  isRefreshing = false;

  // Retry queued requests
  if (refreshed) {
    refreshQueue.forEach((cb) => cb());
    refreshQueue = [];
    return apiFetch(url, options);
  }

  // Logout on refresh failure
  refreshQueue = [];
  await fetch("/api/logout", { method: "POST", credentials: "include" });
  window.location.href = "/sites/login.html";
}
