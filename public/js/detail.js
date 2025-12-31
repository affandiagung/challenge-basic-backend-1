const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("Invalid reminder id");
    window.location.href = "dashboard.html";
}

document.getElementById("detailForm").addEventListener("submit", updateReminder);

loadDetail();

async function loadDetail() {
    const { status, body } = await apiFetch(`/reminders/${id}`);

    if (status === 401) return logout();
    if (!body || !body.ok) {
        alert("Failed to load reminder");
        window.location.href = "dashboard.html";
    }

    const r = body.data;

    document.getElementById("title").value = r.title || "";
    document.getElementById("description").value = r.description || "";
    document.getElementById("remind_at").value =
        toInputFromUnix(r.remind_at);

    document.getElementById("event_at").value =
        toInputFromUnix(r.event_at);
}

async function updateReminder(e) {
    e.preventDefault();

    const payload = {
        title: title.value.trim(),
        description: description.value.trim(),
        remind_at: toUnixFromInput(remind_at.value),
        event_at: toUnixFromInput(event_at.value)
    };

    const { status, body } = await apiFetch(`/reminders/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

    if (status === 401) return logout();
    if (!body || !body.ok) {
        alert(body?.msg || "Update failed");
        return;
    }

    alert("Reminder updated");
    window.location.href = "dashboard.html";
}

function toInputFromUnix(unixSeconds) {
    if (!unixSeconds) return "";

    const date = new Date(unixSeconds * 1000);

    const pad = (n) => String(n).padStart(2, "0");

    return (
        date.getFullYear() + "-" +
        pad(date.getMonth() + 1) + "-" +
        pad(date.getDate()) + "T" +
        pad(date.getHours()) + ":" +
        pad(date.getMinutes())
    );
}
