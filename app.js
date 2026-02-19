// =======================
// CONFIG
// =======================
const WA_NUMBER = "212782901677"; // بدّل الرقم ديالك

// ✅ بدّل الصور ديالك هنا (روابط أو مسارات محلية)
const PRODUCTS = [
  {
    id: "netflix",
    name: "NETFLIX",
    tag: "Accounts",
    desc: "Premium streaming account.",
    price: 3.50,
    image: "assets/netflix.jpg" // <-- بدلها
  },
  {
    id: "spotify",
    name: "SPOTIFY",
    tag: "Accounts",
    desc: "Premium music account.",
    price: 4.00,
    image: "assets/spotify.jpg" // <-- بدلها
  },
  {
    id: "followers",
    name: "FOLLOWERS",
    tag: "Followers",
    desc: "Boost followers fast.",
    price: 2.00,
    image: "assets/followers.jpg" // <-- بدلها
  }
];

// =======================
// HELPERS
// =======================
const $ = (s) => document.querySelector(s);

function showToast(msg){
  const t = $("#toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 1600);
}

function normalize(s){ return String(s||"").toLowerCase(); }

function money(v){
  const n = Number(v || 0);
  return `$${n.toFixed(2)}`;
}

function uid(){
  return "OD" + Date.now().toString(36).toUpperCase();
}

function saveOrder(order){
  const key = "sd_orders";
  const all = JSON.parse(localStorage.getItem(key) || "[]");
  all.unshift(order);
  localStorage.setItem(key, JSON.stringify(all));
}

// =======================
// INDEX PAGE
// =======================
function renderProducts(){
  const grid = $("#productGrid");
  if(!grid) return;

  grid.innerHTML = PRODUCTS.map((p, idx) => `
    <article class="card" style="animation-delay:${idx*70}ms">
      <img class="card__img" src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="card__body">
        <div class="card__row">
          <h3 class="card__title">${p.name}</h3>
          <span class="tag">${p.tag}</span>
        </div>
        <p class="card__desc">${p.desc}</p>
        <div class="card__row">
          <div class="price">${money(p.price)}</div>
          <button class="btn primary" data-open="${p.id}" type="button">Order</button>
        </div>
      </div>
    </article>
  `).join("");

  // open product
  grid.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-open");
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    });
  });
}

function applyFilter(){
  const q = normalize($("#searchInput")?.value);
  const active = document.querySelector(".chip-btn.active")?.getAttribute("data-filter") || "all";

  document.querySelectorAll("#productGrid .card").forEach(card=>{
    const title = normalize(card.querySelector(".card__title")?.textContent);
    const desc  = normalize(card.querySelector(".card__desc")?.textContent);
    const tag   = normalize(card.querySelector(".tag")?.textContent);

    const matchesSearch = !q || title.includes(q) || desc.includes(q) || tag.includes(q);

    let matchesFilter = true;
    if(active === "accounts") matchesFilter = tag.includes("accounts");
    if(active === "followers") matchesFilter = tag.includes("followers");

    card.style.display = (matchesSearch && matchesFilter) ? "" : "none";
  });
}

function initIndex(){
  if(!$("#productGrid")) return;

  // year
  const y = $("#year");
  if(y) y.textContent = new Date().getFullYear();

  renderProducts();

  // scroll buttons
  const scrollToProducts = () => $("#products")?.scrollIntoView({behavior:"smooth"});
  $("#shopBtn")?.addEventListener("click", scrollToProducts);
  $("#browseBtn")?.addEventListener("click", scrollToProducts);
  $("#footerProducts")?.addEventListener("click", (e)=>{ e.preventDefault(); scrollToProducts(); });
  $("#backTop")?.addEventListener("click", (e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); });

  // search
  $("#searchInput")?.addEventListener("input", applyFilter);

  // chips
  document.querySelectorAll(".chip-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".chip-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter();
    });
  });

  // WA float
  $("#waFloat")?.addEventListener("click", (e)=>{
    e.preventDefault();
    window.open(`https://wa.me/${WA_NUMBER}`, "_blank", "noopener,noreferrer");
  });

  // first apply
  setTimeout(applyFilter, 100);
}

// =======================
// PRODUCT PAGE
// =======================
function getProductIdFromURL(){
  const u = new URL(window.location.href);
  return u.searchParams.get("id");
}

function initQuantity(){
  const qtyInput = $("#qtyInput");
  const minusBtn = $("#qtyMinus");
  const plusBtn  = $("#qtyPlus");

  if(!qtyInput || !minusBtn || !plusBtn) return;

  const clampQty = () => {
    let v = parseInt(qtyInput.value || "1", 10);
    if (isNaN(v) || v < 1) v = 1;
    qtyInput.value = v;
    return v;
  };

  minusBtn.addEventListener("click", ()=>{
    const v = clampQty();
    qtyInput.value = Math.max(1, v - 1);
  });

  plusBtn.addEventListener("click", ()=>{
    const v = clampQty();
    qtyInput.value = v + 1;
  });

  qtyInput.addEventListener("input", clampQty);
}

function initProduct(){
  if(!$("#productPage")) return;

  const id = getProductIdFromURL();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  $("#pImg").src = p.image;
  $("#pImg").alt = p.name;
  $("#pName").textContent = p.name;
  $("#pDesc").textContent = p.desc;
  $("#pTag").textContent = p.tag;
  $("#pPrice").textContent = money(p.price);

  initQuantity();

  $("#orderBtn")?.addEventListener("click", ()=>{
    const fullName = ($("#fullName")?.value || "").trim();
    const phone = ($("#phone")?.value || "").trim();
    const email = ($("#email")?.value || "").trim();
    const note = ($("#note")?.value || "").trim();
    const qty = parseInt($("#qtyInput")?.value || "1", 10) || 1;

    if(!fullName || !phone){
      showToast("Please fill Name + Phone ❗");
      return;
    }

    const total = Number(p.price) * qty;
    const orderId = uid();

    // save local
    saveOrder({
      Date: new Date().toISOString(),
      OrderId: orderId,
      ProductId: p.id,
      ProductName: p.name,
      Qty: qty,
      Total: total.toFixed(2),
      FullName: fullName,
      Email: email,
      Phone: phone,
      Note: note,
      Status: "NEW"
    });

    // WhatsApp message
    const msg =
`🛒 New Order: ${orderId}
📦 Product: ${p.name} (${p.id})
🔢 Qty: ${qty}
💰 Total: ${money(total)}
👤 Name: ${fullName}
📞 Phone: ${phone}
📧 Email: ${email || "-"}
📝 Note: ${note || "-"}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("Order created ✅");
  });
}

// =======================
// BOOT
// =======================
document.addEventListener("DOMContentLoaded", ()=>{
  initIndex();
  initProduct();
});
