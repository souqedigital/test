const $ = (s) => document.querySelector(s);
const ORDERS_KEY = "SD_ORDERS_V1";

let allRows = [];
let soundEnabled = false;
let notifEnabled = false;
let lastCount = 0;

function showToast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1400);
}

function safe(v) {
  if (v === null || v === undefined) return "";
  return String(v);
}

function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); }
  catch (_) { return []; }
}
function saveOrders(list) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}

// ===== SOUND (MP3) =====
async function enableSong() {
  const a = document.getElementById("notifyAudio");
  if (!a) { showToast("Audio tag missing ❌"); return false; }

  a.volume = 1.0;
  try {
    a.currentTime = 0;
    await a.play();               // unlock
    setTimeout(() => { a.pause(); a.currentTime = 0; }, 200);
    soundEnabled = true;
    $("#soundState").textContent = "Sound: ON";
    return true;
  } catch (e) {
    console.error(e);
    showToast("Sound blocked ❌ (click again)");
    return false;
  }
}
function playSong() {
  if (!soundEnabled) return;
  const a = document.getElementById("notifyAudio");
  if (!a) return;
  a.pause();
  a.currentTime = 0;
  const p = a.play();
  if (p && p.catch) p.catch(()=>{});
}

// ===== BROWSER NOTIFICATION =====
async function enableNotif() {
  if (!("Notification" in window)) {
    showToast("Notifications not supported ❌");
    return false;
  }
  if (Notification.permission === "granted") {
    notifEnabled = true;
    $("#notifState").textContent = "Notif: ON";
    return true;
  }
  const perm = await Notification.requestPermission();
  if (perm === "granted") {
    notifEnabled = true;
    $("#notifState").textContent = "Notif: ON";
    return true;
  }
  showToast("Notif permission denied ❌");
  return false;
}

function showNotif(order) {
  if (!notifEnabled) return;
  try{
    new Notification("🛒 New Order!", {
      body: `${order.ProductName} — ${order.FullName} — ${order.Phone}`,
    });
  }catch(_){}
}

function render(rows) {
  const tbody = $("#rows");
  if (!tbody) return;

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${safe(r.Date)}</td>
      <td><b>${safe(r.OrderId)}</b></td>
      <td>${safe(r.ProductName)}<br><span class="pill">${safe(r.ProductId)}</span></td>
      <td>${safe(r.Qty)}</td>
      <td>${safe(r.Total)}</td>
      <td>${safe(r.FullName)}</td>
      <td>${safe(r.Email)}</td>
      <td>${safe(r.Phone)}</td>
      <td>${safe(r.Note)}</td>
      <td><span class="pill">${safe(r.Status)}</span></td>
    </tr>
  `).join("");

  $("#meta").textContent = `Showing ${rows.length} orders`;
}

function load({ silent = false } = {}) {
  const rows = readOrders();
  allRows = rows;
  render(allRows);

  if (silent) return;

  if (lastCount === 0) { lastCount = rows.length; return; }

  if (rows.length > lastCount) {
    const diff = rows.length - lastCount;
    lastCount = rows.length;

    // newest order is rows[0] because we unshift in app.js
    const newest = rows[0];

    playSong();
    showNotif(newest);
    showToast(`New order (+${diff}) ✅`);
  }
}

// ===== UI =====
$("#enableAllBtn")?.addEventListener("click", async () => {
  const a = await enableSong();
  const b = await enableNotif();
  if (a && b) showToast("Sound + Notif enabled ✅");
});

$("#testSoundBtn")?.addEventListener("click", () => {
  if (!soundEnabled) return showToast("Click Enable first 🔊");
  playSong();
});

$("#refreshBtn")?.addEventListener("click", () => load());

$("#search")?.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return render(allRows);

  const filtered = allRows.filter(r =>
    safe(r.OrderId).toLowerCase().includes(q) ||
    safe(r.Phone).toLowerCase().includes(q) ||
    safe(r.FullName).toLowerCase().includes(q) ||
    safe(r.ProductName).toLowerCase().includes(q)
  );
  render(filtered);
});

$("#clearBtn")?.addEventListener("click", () => {
  if (!confirm("Delete ALL orders from this browser?")) return;
  saveOrders([]);
  lastCount = 0;
  load({ silent: true });
  showToast("Cleared ✅");
});

$("#exportBtn")?.addEventListener("click", () => {
  const data = JSON.stringify(readOrders(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "orders-export.json";
  a.click();
  URL.revokeObjectURL(url);
});

$("#importFile")?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  try {
    const arr = JSON.parse(text);
    if (!Array.isArray(arr)) throw new Error("Invalid file");
    saveOrders(arr);
    lastCount = 0;
    load({ silent: true });
    showToast("Imported ✅");
  } catch (err) {
    console.error(err);
    showToast("Import error ❌");
  }
});

// start
load({ silent: true });
setInterval(() => load(), 2500);
