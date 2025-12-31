async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errEl = document.getElementById("error");

  errEl.innerText = "";

  if (!email || !password) {
    errEl.innerText = "Email and password required";
    return;
  }

  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) {
    errEl.innerText = data?.msg || "Login failed";
    return;
  }

  const access = data.data?.access_token || data.data?.accessToken;
  const refresh = data.data?.refresh_token || data.data?.refreshToken;

  if (!access || !refresh) {
    errEl.innerText = "Invalid login response";
    return;
  }

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  window.location.href = "/dashboard.html";
}

async function refreshToken() {
  return await tryRefreshToken();
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/";
}
