// =======================
// واتساب ديال المحل
// =======================
const STORE_WHATSAPP = "212782901677";

// =======================
// الترجمة (عربي / إنجليزي)
// =======================
const translations = {
  ar: {
    brand: "Signature Perfume",
    navHome: "الرئيسية",
    navProducts: "العطور",
    sectionTitle: "عطور فاخرة",
    sectionDesc: "اختر العطر → اختر الحجم → املأ المعلومات → أرسل الطلب على واتساب",
    catAll: "الكل",
    catMost: "نشاط",
    catMen: "عطر",
    catWomen: "نسائية",
    catUnisex: "للجنسين",
    searchPlaceholder: "ابحث عن عطر...",
    footerText: "Signature Perfume | جميع الحقوق محفوظة",
    backLink: "← رجوع",
    orderBtn: "اطلب الآن",
    unavailable: "غير متوفر",
    chooseOffer: "اختر الحجم",
    sendOrder: "إرسال الطلب عبر واتساب",
    fillName: "الاسم الكامل",
    fillPhone: "رقم الهاتف",
    fillNote: "ملاحظة (اختياري)",
    quantity: "عدد الزجاجات",
    toastSelectOffer: "يجب عليك اختيار الحجم ✅",
    toastFillFields: "يرجى ملء جميع الحقول المطلوبة",
    toastOpening: "جاري فتح الواتساب… ✅",
    productNotFound: "العطر غير موجود",
    digital: "عطر",
    size: "الحجم",
    ml: "مل"
  },
  en: {
    brand: "Signature Perfume",
    navHome: "Home",
    navProducts: "Perfumes",
    sectionTitle: "Luxury Perfumes",
    sectionDesc: "Choose perfume → select size → fill info → send order on WhatsApp",
    catAll: "All",
    catMost: "Activity",
    catMen: "Perfume",
    catWomen: "Women",
    catUnisex: "Unisex",
    searchPlaceholder: "Search perfume...",
    footerText: "Signature Perfume | All rights reserved",
    backLink: "← Back",
    orderBtn: "Order Now",
    unavailable: "Unavailable",
    chooseOffer: "Choose Size",
    sendOrder: "Send Order on WhatsApp",
    fillName: "Full Name",
    fillPhone: "Phone Number",
    fillNote: "Note (optional)",
    quantity: "Number of Bottles",
    toastSelectOffer: "You must select a size ✅",
    toastFillFields: "Please fill all required fields",
    toastOpening: "Opening WhatsApp… ✅",
    productNotFound: "Perfume not found",
    digital: "Perfume",
    size: "Size",
    ml: "ml"
  }
};

let currentLang = "ar"; // اللغة الافتراضية

// =======================
// المنتجات (عطور)
// =======================
const products = [
  {
    id:"dior-sauvage",
    name:"DIOR SAUVAGE",
    price:850,
    tag:"عطر",
    category:"men",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر ديور سافاج - انتعاشة قوية تدوم طويلاً",
    offers:[
      { title:"50 مل", sub:"حجم صغير • مناسب للسفر", price:550 },
      { title:"100 مل", sub:"حجم متوسط • الأكثر طلباً", price:850 },
      { title:"200 مل", sub:"حجم كبير • اقتصادي", price:1450 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.63180.jpg"
  },
  {
    id:"chanel-bleu",
    name:"CHANEL BLEU",
    price:950,
    tag:"عطر",
    category:"men",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر شانيل بلو - كلاسيكي فاخر",
    offers:[
      { title:"50 مل", sub:"حجم صغير", price:650 },
      { title:"100 مل", sub:"حجم متوسط", price:950 },
      { title:"150 مل", sub:"حجم كبير", price:1350 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.61785.jpg"
  },
  {
    id:"la-vie-est-belle",
    name:"LA VIE EST BELLE",
    price:890,
    tag:"نسائي",
    category:"women",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر لافي إي بيل - أنوثة و جاذبية",
    offers:[
      { title:"30 مل", sub:"حجم صغير", price:490 },
      { title:"50 مل", sub:"حجم متوسط", price:690 },
      { title:"100 مل", sub:"حجم كبير", price:890 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.34020.jpg"
  },
  {
    id:"black-opium",
    name:"BLACK OPIUM",
    price:920,
    tag:"نسائي",
    category:"women",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر بلاك أوبيوم - جريء و جذاب",
    offers:[
      { title:"30 مل", sub:"حجم صغير", price:520 },
      { title:"50 مل", sub:"حجم متوسط", price:720 },
      { title:"90 مل", sub:"حجم كبير", price:920 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.53053.jpg"
  },
  {
    id:"creed-aventus",
    name:"CREED AVENTUS",
    price:1850,
    tag:"عطر",
    category:"men",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر كريد أفينتوس - فخامة ملكية",
    offers:[
      { title:"50 مل", sub:"حجم صغير", price:1250 },
      { title:"100 مل", sub:"حجم متوسط", price:1850 },
      { title:"250 مل", sub:"حجم كبير", price:2950 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.20284.jpg"
  },
  {
    id:"tom-ford-tobacco",
    name:"TOM FORD TOBACCO",
    price:1350,
    tag:"عطر",
    category:"men",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر توم فورد توباكو - دفء و فخامة",
    offers:[
      { title:"30 مل", sub:"حجم صغير", price:850 },
      { title:"50 مل", sub:"حجم متوسط", price:1150 },
      { title:"100 مل", sub:"حجم كبير", price:1350 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.37032.jpg"
  },
  {
    id:"ysl-lhomme",
    name:"YSL L'HOMME",
    price:780,
    tag:"عطر",
    category:"men",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر واي إس إل - انتعاش و أناقة",
    offers:[
      { title:"40 مل", sub:"حجم صغير", price:480 },
      { title:"60 مل", sub:"حجم متوسط", price:630 },
      { title:"100 مل", sub:"حجم كبير", price:780 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.2466.jpg"
  },
  {
    id:"carolina-herrera",
    name:"CAROLINA HERRERA",
    price:820,
    tag:"نسائي",
    category:"women",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر كارولينا هيريرا - أنوثة عصرية",
    offers:[
      { title:"30 مل", sub:"حجم صغير", price:520 },
      { title:"50 مل", sub:"حجم متوسط", price:720 },
      { title:"80 مل", sub:"حجم كبير", price:820 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.55793.jpg"
  },
  {
    id:"juliette-has-gun",
    name:"JULIETTE HAS A GUN",
    price:790,
    tag:"للجنسين",
    category:"unisex",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر جولييت هاز آ غان - فريد و مميز",
    offers:[
      { title:"30 مل", sub:"حجم صغير", price:490 },
      { title:"50 مل", sub:"حجم متوسط", price:690 },
      { title:"100 مل", sub:"حجم كبير", price:790 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.59670.jpg"
  },
  {
    id:"bvlgari",
    name:"BVLGARI",
    price:720,
    tag:"للجنسين",
    category:"unisex",
    desc:"Available",
    color:"#d4af37",
    details:"👈 عطر بولغاري - انتعاش راقي",
    offers:[
      { title:"40 مل", sub:"حجم صغير", price:420 },
      { title:"60 مل", sub:"حجم متوسط", price:570 },
      { title:"100 مل", sub:"حجم كبير", price:720 },
    ],
    img:"https://fimgs.net/mdimg/perfume/375x500.22829.jpg"
  }
];

// =======================
// دوال مساعدة
// =======================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const money = (n) => {
  const price = Number(n).toFixed(2);
  return `${price} درهم`;
};

let toastTimer = null;

function showToast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1500);
}

function generateOrderId() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PRF-${yyyy}${mm}${dd}-${rand}`;
}

function openWhatsApp(message) {
  const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// =======================
// رسالة واتساب احترافية ✨
// =======================
function buildWhatsAppMessage({ orderId, product, offer, qty, fullName, phone, note }) {
  const unit = offer?.price ?? product.price;
  const total = unit * qty;

  const now = new Date();
  const formattedDate = now.toLocaleString('ar-MA');

  return [
    "✨━━━━━━━━━━━━━━━━━━✨",
    "🛍️  *SIGNATURE PERFUME*",
    "✨━━━━━━━━━━━━━━━━━━✨",
    "",
    "📋 *معلومات الطلب*",
    "━━━━━━━━━━━━━━━━━━",
    `🆔 رقم الطلب: *${orderId}*`,
    `👤 الاسم الكامل: ${fullName}`,
    `📞 رقم الهاتف: ${phone}`,
    `📅 التاريخ: ${formattedDate}`,
    "",
    "🧴 *تفاصيل المنتج*",
    "━━━━━━━━━━━━━━━━━━",
    `✨ اسم العطر: *${product.name}*`,
    `📦 الحجم المختار: ${offer ? offer.title : "-"}`,
    `🔢 الكمية: ${qty}`,
    `💰 سعر الوحدة: ${money(unit)}`,
    "",
    "━━━━━━━━━━━━━━━━━━",
    `💵 *الإجمالي الكلي: ${money(total)}*`,
    "━━━━━━━━━━━━━━━━━━",
    "",
    `📝 ملاحظات إضافية: ${note ? note : "لا توجد"}`,
    "",
    "━━━━━━━━━━━━━━━━━━",
    "🙏 شكراً لثقتكم بنا",
    "📦 سيتم تأكيد طلبكم في أقرب وقت",
    "✨ Signature Perfume ✨",
    "━━━━━━━━━━━━━━━━━━"
  ].join("\n");
}

function norm(s) {
  return String(s ?? "").toLowerCase().trim();
}

// =======================
// نظام الترجمة
// =======================
function updateLanguage(lang) {
  currentLang = lang;
  
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  $$('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  const t = translations[lang];
  
  if ($('#brandName')) $('#brandName').textContent = t.brand;
  if ($('#navHome')) $('#navHome').textContent = t.navHome;
  if ($('#navProducts')) $('#navProducts').textContent = t.navProducts;
  if ($('#sectionTitle')) $('#sectionTitle').textContent = t.sectionTitle;
  if ($('#sectionDesc')) $('#sectionDesc').textContent = t.sectionDesc;
  if ($('#searchInput')) $('#searchInput').placeholder = t.searchPlaceholder;
  if ($('#catAll')) $('#catAll').textContent = t.catAll;
  if ($('#catMost')) $('#catMost').textContent = t.catMost;
  if ($('#catMen')) $('#catMen').textContent = t.catMen;
  if ($('#catWomen')) $('#catWomen').textContent = t.catWomen;
  if ($('#catUnisex')) $('#catUnisex').textContent = t.catUnisex;
  if ($('#footerText')) $('#footerText').textContent = t.footerText;
  if ($('#backLink')) $('#backLink').textContent = t.backLink;
  
  if ($("#productGrid")) {
    renderProducts(filteredProducts());
  }
  
  if ($("#productPage") && !$("#productGrid")) {
    initProductPage();
  }
}

// =======================
// دوال المنتجات
// =======================
function filteredProducts() {
  const activeCat = document.querySelector('.cat-btn.active')?.dataset.cat || 'all';
  const searchTerm = $("#searchInput")?.value || '';
  
  return products.filter(p => {
    const pCat = norm(p.category);
    const byCat = activeCat === 'all' || pCat === norm(activeCat);
    const bySearch = !searchTerm || norm(p.name).includes(norm(searchTerm));
    return byCat && bySearch;
  });
}

function renderProducts(list) {
  const gridEl = $("#productGrid");
  if (!gridEl) return;

  const t = translations[currentLang];

  if (!list.length) {
    gridEl.innerHTML = `
      <div class="muted" style="padding:14px;border:1px solid rgba(212, 175, 55, .14);border-radius:16px;background:rgba(255,255,255,.03);">
        ${currentLang === 'ar' ? 'لا توجد عطور' : 'No perfumes found'}
      </div>
    `;
    return;
  }

  gridEl.innerHTML = list.map(p => {
    const isUnavailable = norm(p.desc).includes("unavailable");
    const btnClass = isUnavailable ? "btn primary disabled" : "btn primary";
    const btnText = isUnavailable ? t.unavailable : t.orderBtn;
    const btnHref = isUnavailable ? "#" : `product.html?id=${encodeURIComponent(p.id)}`;

    return `
      <article class="card" style="border:2px solid ${p.color}">
        <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="card__body">
          <div class="card__row">
            <h4 class="card__title">${p.name}</h4>
            <span class="tag">${p.tag || ""}</span>
          </div>
          <p class="card__desc" style="color:${p.color}">${p.desc || ""}</p>
          <div class="card__row">
            <div class="price">${money(p.price)}</div>
            <div class="card__actions">
              <a class="${btnClass}" href="${btnHref}">${btnText}</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  gridEl.querySelectorAll("a.disabled").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(currentLang === 'ar' ? 'هذا العطر غير متوفر' : 'This perfume is unavailable');
    });
  });
}

// =======================
// الصفحة الرئيسية
// =======================
function initHome() {
  if (!$("#productGrid")) return;
  renderProducts(filteredProducts());

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// =======================
// الفلاتر
// =======================
function initFilters() {
  const searchInput = $("#searchInput");
  const catButtons = document.querySelectorAll(".cat-btn");
  
  if (!searchInput || !catButtons.length) return;

  searchInput.addEventListener("input", () => {
    renderProducts(filteredProducts());
  });

  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(filteredProducts());
    });
  });
}

// =======================
// صفحة المنتج
// =======================
function initProductPage() {
  const holder = $("#productPage");
  if (!holder) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = products.find(x => x.id === id);
  const t = translations[currentLang];

  if (!p) {
    holder.innerHTML = `<div class="product-info"><h2>${t.productNotFound}</h2></div>`;
    return;
  }

  holder.innerHTML = `
    <div class="product-media">
      <img src="${p.img}" alt="${p.name}">
    </div>

    <div class="product-info">
      <h2 class="product-title">${p.name}</h2>
      <div class="product-price">${money(p.price)}</div>

      <div class="product-meta">
        <span>${p.tag || ""}</span>
        <span>${t.digital}</span>
        <span>${p.category === 'men' ? t.catMen : p.category === 'women' ? t.catWomen : t.catUnisex}</span>
      </div>

      <p class="muted">${p.details || ""}</p>

      <form class="form" id="orderForm">
        <div>
          <div class="label">${t.fillName}</div>
          <input class="input" id="fullName" required placeholder="${t.fillName}" />
        </div>

        <div>
          <div class="label">${t.fillPhone}</div>
          <input class="input" id="phone" required placeholder="06xxxxxxxx" />
        </div>

        <div>
          <div class="label">${t.chooseOffer}</div>
          <button type="button" class="btn primary" id="offerBtn">${t.chooseOffer}</button>
          <div class="offer-collapse" id="offersBox"></div>
        </div>

        <div>
          <div class="label">${t.quantity}</div>
          <div class="qty-controls">
            <button class="qty-btn" type="button" id="decQty">-</button>
            <input class="input qty-input" id="qtyInput" type="number" min="1" value="1" />
            <button class="qty-btn" type="button" id="incQty">+</button>
          </div>
        </div>

        <div>
          <div class="label">${t.fillNote}</div>
          <textarea class="textarea" id="note" placeholder="${t.fillNote}"></textarea>
        </div>

        <button class="btn primary" type="submit">${t.sendOrder}</button>
      </form>
    </div>
  `;

  const qtyInput = $("#qtyInput");
  $("#incQty").addEventListener("click", () => qtyInput.value = String((parseInt(qtyInput.value, 10) || 1) + 1));
  $("#decQty").addEventListener("click", () => qtyInput.value = String(Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1)));

  const offerBtn = $("#offerBtn");
  const offersBox = $("#offersBox");
  let selectedOfferIndex = null;

  function openOffers() {
    offersBox.classList.add("open");
    offerBtn.classList.add("open");
  }

  function closeOffers() {
    offersBox.classList.remove("open");
    offerBtn.classList.remove("open");
  }

  offerBtn.addEventListener("click", () => {
    if (offersBox.classList.contains("open")) closeOffers();
    else openOffers();
  });

  function renderOffers() {
    offersBox.innerHTML = (p.offers || []).map((o, i) => `
      <button type="button" class="offer-row ${selectedOfferIndex === i ? "selected" : ""}" data-idx="${i}">
        <div class="offer-left">
          <div class="offer-title">${o.title}</div>
          <div class="offer-sub">${o.sub || ""}</div>
        </div>
        <div class="offer-price">${money(o.price)}</div>
      </button>
    `).join("");

    offersBox.querySelectorAll("[data-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedOfferIndex = parseInt(btn.getAttribute("data-idx"), 10);
        const chosen = p.offers[selectedOfferIndex];
        offerBtn.textContent = `${chosen.title} — ${money(chosen.price)}`;
        closeOffers();
        renderOffers();
      });
    });
  }

  renderOffers();

  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (selectedOfferIndex === null) {
      showToast(t.toastSelectOffer);
      openOffers();
      return;
    }

    const fullName = $("#fullName").value.trim();
    const phone = $("#phone").value.trim();
    const note = $("#note").value.trim();
    const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);

    if (!fullName || !phone) {
      showToast(t.toastFillFields);
      return;
    }

    const offer = p.offers[selectedOfferIndex];
    const orderId = generateOrderId();
    const msg = buildWhatsAppMessage({ orderId, product: p, offer, qty, fullName, phone, note });

    showToast(t.toastOpening);
    openWhatsApp(msg);
  });
}

// =======================
// بدء التطبيق
// =======================
document.addEventListener("DOMContentLoaded", () => {
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
    });
  });

  initHome();
  initFilters();
  initProductPage();
});