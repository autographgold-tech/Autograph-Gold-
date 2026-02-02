const PHONE = "77010322021"; // WhatsApp номер без +
const STORAGE_KEY = "autograph_cart_final_v2";

let currentType = "kitchen"; // kitchen | bar
let currentLang = "ru";      // ru | kz | en
let cart = loadCart();

const menuEl = document.getElementById("menuList");
const cartSummary = document.getElementById("cartSummary");
const cartModal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const subTotalEl = document.getElementById("subTotal");
const serviceFeeEl = document.getElementById("serviceFee");
const totalSumEl = document.getElementById("totalSum");
const searchEl = document.getElementById("search");
const cartDesktop = document.getElementById("cartDesktop");
const commentEl = document.getElementById("comment");
const headerCartBtn = document.getElementById("headerCartBtn");
const headerCartText = document.getElementById("headerCartText");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const sendWABtn = document.getElementById("sendWA");
const clearBtn = document.getElementById("clearCart");

/* ===== i18n ===== */
const I18N = {
  ru: {
    kitchen: "Кухня",
    bar: "Бар",
    search: "Поиск по меню...",
    cart: "Корзина",
    subtotal: "Подытог:",
    service: "Обслуживание 10%:",
    total: "Итого:",
    send: "Отправить в WhatsApp",
    clear: "Очистить корзину",
    open: "Открыть",
    empty: "Корзина пустая. Нажми “+” у позиции.",
    nothing: "Ничего не найдено",
    tryOther: "Попробуй другой запрос",
    comment: "Комментарий / стол / VIP",
    orderTitle: "Autograph — заказ:"
  },
  kz: {
    kitchen: "Ас үй",
    bar: "Бар",
    search: "Мәзірден іздеу...",
    cart: "Себет",
    subtotal: "Аралық сома:",
    service: "Қызмет көрсету 10%:",
    total: "Жалпы:",
    send: "WhatsApp-қа жіберу",
    clear: "Себетті тазалау",
    open: "Ашу",
    empty: "Себет бос. Тағамнан “+” бас.",
    nothing: "Ештеңе табылмады",
    tryOther: "Басқа сұрауды енгізіп көр",
    comment: "Пікір / үстел / VIP",
    orderTitle: "Autograph — тапсырыс:"
  },
  en: {
    kitchen: "Kitchen",
    bar: "Bar",
    search: "Search menu...",
    cart: "Cart",
    subtotal: "Subtotal:",
    service: "Service 10%:",
    total: "Total:",
    send: "Send to WhatsApp",
    clear: "Clear cart",
    open: "Open",
    empty: "Your cart is empty. Tap “+” to add items.",
    nothing: "Nothing found",
    tryOther: "Try another query",
    comment: "Comment / table / VIP",
    orderTitle: "Autograph — order:"
  }
};
function t(key){ return I18N[currentLang][key] || key; }

/* ===== helpers ===== */
function loadCart(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveCart(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
function money(n){
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₸";
}
function qty(id){ return cart[id] || 0; }
function nameOf(item){
  if(currentLang === "kz") return item.kz || item.ru || item.en;
  if(currentLang === "en") return item.en || item.ru || item.kz;
  return item.ru || item.kz || item.en;
}
function categoryLabel(item){
  if(currentLang === "kz") return item.catKz || item.catRu || item.catEn;
  if(currentLang === "en") return item.catEn || item.catRu || item.catKz;
  return item.catRu || item.catKz || item.catEn;
}

/* ===== modal open/close ===== */
function openModal(){
  cartModal.classList.add("open");
  cartModal.setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}
function closeModal(){
  cartModal.classList.remove("open");
  cartModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}

/* ===== MENU ===== */
const MENU = [
  {id:"k_1",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Бакетбитс",kz:"Бакетбитс",en:"Бакетбитс",price:3290},
  {id:"k_2",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Салат гарден фитнес",kz:"Гарден фитнес салаты",en:"Салат гарден фитнес",price:3990},
  {id:"k_3",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Итальянский сыр Буррата",kz:"Буррата Итальяндық ірімшігі",en:"Итальянский сыр Буррата",price:5990},
  {id:"k_4",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Салат страчателла",kz:"Страчателла салаты",en:"Салат страчателла",price:5190},
  {id:"k_5",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Цезарь с куриным филе",kz:"Тауық еті қосылған Цезарь",en:"Цезарь с куриным филе",price:3490},
  {id:"k_6",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Оберджин салаты",kz:"Оберджин салаты",en:"Оберджин салаты",price:3590},
  {id:"k_7",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Тунец қосылған руккола салаты",kz:"Тунец қосылған руккола салаты",en:"Тунец қосылған руккола салаты",price:4990},
  {id:"k_8",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Цезарь с креветками",kz:"Асшаяндар қосылған цезарь салаты",en:"Цезарь с креветками",price:3890},
  {id:"k_9",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Салат греческий",kz:"Грек салаты",en:"Салат греческий",price:2990},
  {id:"k_10",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",catEn:"Салаты",ru:"Легкий салат с креветками и апельсинами",kz:"Асшаяндар және апельсин қосылған жеңіл салат",en:"Легкий салат с креветками и апельсинами",price:4990},

  /* ... (меню большое — продолжается) ... */

  {id:"b_1",type:"bar",catRu:"Безалкогольные напитки",catKz:"Безалкогольные напитки",catEn:"Безалкогольные напитки",ru:"Red Bull",kz:"Red Bull",en:"Red Bull",price:1800},
  {id:"b_2",type:"bar",catRu:"Безалкогольные напитки",catKz:"Безалкогольные напитки",catEn:"Безалкогольные напитки",ru:"Borjomi 0,5",kz:"Borjomi 0,5",en:"Borjomi 0,5",price:1600},
  {id:"b_3",type:"bar",catRu:"Безалкогольные напитки",catKz:"Безалкогольные напитки",catEn:"Безалкогольные напитки",ru:"Vittel 0,5",kz:"Vittel 0,5",en:"Vittel 0,5",price:1500},
  {id:"b_4",type:"bar",catRu:"Безалкогольные напитки",catKz:"Безалкогольные напитки",catEn:"Безалкогольные напитки",ru:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25",kz:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25",en:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25",price:1300},
  {id:"b_5",type:"bar",catRu:"Безалкогольные напитки",catKz:"Безалкогольные напитки",catEn:"Безалкогольные напитки",ru:"Perrier Naturel 0,33",kz:"Perrier Naturel 0,33",en:"Perrier Naturel 0,33",price:2000},

  /* ... бар продолжение (кофе/чай/лимонады/коктейли) ... */
];

/* ===== cart actions ===== */
function add(id){ cart[id] = qty(id) + 1; saveCart(); renderAll(); }
function sub(id){
  const q = qty(id) - 1;
  if(q <= 0) delete cart[id]; else cart[id] = q;
  saveCart(); renderAll();
}
function clearCart(){ cart = {}; saveCart(); renderAll(); }

/* ===== filtering ===== */
function getFilteredMenu(){
  const q = (searchEl.value || "").trim().toLowerCase();
  return MENU.filter(x => {
    if(x.type !== currentType) return false;
    if(!q) return true;
    const hay = `${x.ru||""} ${x.kz||""} ${x.en||""} ${x.catRu||""} ${x.catKz||""} ${x.catEn||""}`.toLowerCase();
    return hay.includes(q);
  });
}

/* ===== render menu ===== */
function renderMenu(){
  menuEl.innerHTML = "";
  const data = getFilteredMenu();

  if(data.length === 0){
    menuEl.innerHTML = `
      <div class="card">
        <div class="left">
          <div class="name">${t("nothing")}</div>
          <div class="meta">${t("tryOther")}</div>
        </div>
      </div>`;
    return;
  }

  const cats = Array.from(new Set(data.map(x => categoryLabel(x))));
  cats.forEach(cat => {
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = cat;
    menuEl.appendChild(title);

    data.filter(x => categoryLabel(x) === cat).forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="left">
          <div class="name">${nameOf(item)}</div>
          <div class="meta">${money(item.price)}</div>
        </div>
        <div class="controls">
          <button data-sub="${item.id}">−</button>
          <span>${qty(item.id)}</span>
          <button data-add="${item.id}">+</button>
        </div>
      `;
      menuEl.appendChild(div);
    });
  });

  menuEl.querySelectorAll("button[data-add]").forEach(btn => btn.onclick = () => add(btn.dataset.add));
  menuEl.querySelectorAll("button[data-sub]").forEach(btn => btn.onclick = () => sub(btn.dataset.sub));
}

/* ===== cart list ===== */
function cartItems(){
  return Object.keys(cart).map(id => {
    const item = MENU.find(x => x.id === id);
    if(!item) return null;
    const q = cart[id];
    return { ...item, qty: q, sum: q * item.price };
  }).filter(Boolean);
}

function renderCartUI(targetEl){
  const items = cartItems();
  if(items.length === 0){
    targetEl.innerHTML = `<div style="opacity:.75; padding:6px 0;">${t("empty")}</div>`;
    return;
  }

  targetEl.innerHTML = items.map(it => `
    <div class="cart-item">
      <div>
        <div style="font-weight:900">${nameOf(it)}</div>
        <div style="opacity:.75; font-size:12px">${categoryLabel(it)}</div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <button data-sub="${it.id}">−</button>
        <b>${it.qty}</b>
        <button data-add="${it.id}">+</button>
      </div>
    </div>
  `).join("");

  targetEl.querySelectorAll("button[data-add]").forEach(btn => btn.onclick = () => add(btn.dataset.add));
  targetEl.querySelectorAll("button[data-sub]").forEach(btn => btn.onclick = () => sub(btn.dataset.sub));
}

/* ===== totals with 10% service ===== */
function calcTotals(){
  const items = cartItems();
  const subtotal = items.reduce((s,x)=>s+x.sum,0);
  const service = Math.round(subtotal * 0.10);
  const total = subtotal + service;
  const count = items.reduce((s,x)=>s+x.qty,0);
  return {items, subtotal, service, total, count};
}

function renderCart(){
  const {subtotal, service, total, count} = calcTotals();

  subTotalEl.textContent = money(subtotal);
  serviceFeeEl.textContent = money(service);
  totalSumEl.textContent = money(total);

  headerCartText.textContent = `${count} • ${money(total)}`;
  cartSummary.textContent = `🛒 ${count} • ${money(total)}`;

  renderCartUI(cartList);

  if(cartDesktop){
    cartDesktop.innerHTML = `
      <h3 style="margin:0 0 10px; color:#d4b26a;">${t("cart")}</h3>
      <div id="cartDeskList"></div>

      <div style="margin:12px 0; display:flex; flex-direction:column; gap:8px; font-weight:900;">
        <div style="display:flex; justify-content:space-between;">
          <span>${t("subtotal")}</span><span>${money(subtotal)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>${t("service")}</span><span>${money(service)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid rgba(255,255,255,.12);">
          <span>${t("total")}</span><span>${money(total)}</span>
        </div>
      </div>

      <button id="sendDesk" class="primary">${t("send")}</button>
      <button id="clearDesk" class="ghost">${t("clear")}</button>
      <div style="opacity:.7; font-size:12px; margin-top:8px;">WhatsApp: ${PHONE}</div>
    `;

    renderCartUI(cartDesktop.querySelector("#cartDeskList"));
    cartDesktop.querySelector("#sendDesk").onclick = sendToWhatsApp;
    cartDesktop.querySelector("#clearDesk").onclick = clearCart;
  }
}

function buildWhatsAppText(){
  const {items, subtotal, service, total} = calcTotals();
  const comment = (commentEl.value || "").trim();

  let lines = [];
  lines.push(t("orderTitle"));
  lines.push("");

  if(items.length === 0){
    lines.push(t("empty"));
  } else {
    items.forEach(it => lines.push(`• ${nameOf(it)} ×${it.qty} — ${money(it.sum)}`));
    lines.push("");
    lines.push(`${t("subtotal")} ${money(subtotal)}`);
    lines.push(`${t("service")} ${money(service)}`);
    lines.push(`${t("total")} ${money(total)}`);
  }

  if(comment){
    lines.push("");
    lines.push(`${t("comment")}: ${comment}`);
  }

  return lines.join("\n");
}

function sendToWhatsApp(){
  const {items} = calcTotals();
  if(items.length === 0){
    alert(t("empty"));
    return;
  }
  const text = encodeURIComponent(buildWhatsAppText());
  window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank");
}

/* ===== i18n apply ===== */
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}

/* ===== events ===== */
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    searchEl.value = "";
    renderAll();
  });
});

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".lang-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    applyI18n();
    renderAll();
  });
});

searchEl.addEventListener("input", renderAll);

openCartBtn.addEventListener("click", openModal);
headerCartBtn.addEventListener("click", openModal);

closeCartBtn.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); closeModal(); });

cartModal.addEventListener("click", (e)=>{
  if(!e.target.closest(".cart-window")) closeModal();
});

document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeModal();
});

sendWABtn.addEventListener("click", sendToWhatsApp);
clearBtn.addEventListener("click", clearCart);

function renderAll(){
  renderMenu();
  renderCart();
}

applyI18n();
renderAll();
