async function loadReminders(limit = 20) {
  const { status, body } = await apiFetch(`/reminders?limit=${limit}`, { method: "GET" });
  if (status === 401) return logout();
  if (!body || !body.ok) {
    console.warn("Failed to load reminders", body);
    return;
  }

  const list = document.getElementById("list");
  list.innerHTML = "";

  const reminders = body.data?.reminders || [];
  if (reminders.length === 0) {
    list.innerHTML = '<li class="list-group-item">No reminders</li>';
    return;
  }

  reminders.forEach(r => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    const left = document.createElement("div");
    left.innerHTML = `<div><b>${escapeHtml(r.title)}</b></div>
                      <div class="text-muted small">${new Date(r.remind_at * 1000).toLocaleString()}</div>`;

    const btnGroup = document.createElement("div");
    const del = document.createElement("button");
    del.className = "btn btn-sm btn-danger";
    del.innerText = "Delete";
    del.onclick = () => {
      if (confirm("Delete reminder?")) deleteReminder(r.id);
    };

    btnGroup.appendChild(del);
    li.appendChild(left);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

async function createReminder() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const remindVal = document.getElementById("remind_at").value;
  const eventVal = document.getElementById("event_at").value;

  if (!title || !remindVal) {
    alert("Title and Remind At are required");
    return;
  }

  const payload = {
    title,
    description,
    remind_at: toUnixFromInput(remindVal),
    event_at: toUnixFromInput(eventVal) || toUnixFromInput(remindVal)
  };

  const { status, body } = await apiFetch("/reminders", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  if (status === 401) return logout();
  if (!body || !body.ok) {
    alert(body?.msg || "Create failed");
    return;
  }

  document.getElementById("createMsg").style.display = "block";
  setTimeout(() => document.getElementById("createMsg").style.display = "none", 1200);
  loadReminders();
}

async function deleteReminder(id) {
  const { status, body } = await apiFetch(`/reminders/${id}`, { method: "DELETE" });
  if (status === 401) return logout();
  if (!body || !body.ok) {
    alert(body?.msg || "Delete failed");
    return;
  }
  loadReminders();
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}
