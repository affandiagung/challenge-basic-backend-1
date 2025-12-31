const API_BASE = "/api";

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  if (token) options.headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(API_BASE + path, options);

  if (res.status === 401 && localStorage.getItem("refresh_token")) {
    const ok = await tryRefreshToken();
    if (ok) {
      const newToken = localStorage.getItem("access_token");
      options.headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(API_BASE + path, options);
    }
  }

  let body = null;
  try { body = await res.json(); } catch (e) { body = null; }

  return { status: res.status, body };
}

async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return false;

  const res = await fetch(API_BASE + "/session", {
    method: "PUT",
    headers: { "Authorization": `Bearer ${refreshToken}` }
  });

  if (res.ok) {
    const data = await res.json();
    const access = data?.data?.access_token || data?.data?.accessToken;
    if (access) {
      localStorage.setItem("access_token", access);
      return true;
    }
  }

  logout();
  return false;
}

function toUnixFromInput(value) {
  if (!value) return null;
  return Math.floor(new Date(value).getTime() / 1000);
}
