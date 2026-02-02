const PHONE = "77010322021"; // WhatsApp номер
const STORAGE_KEY = "autograph_cart_v4";

let currentType = "kitchen"; // kitchen | bar
let currentLang = "ru";      // ru | kz
let cart = loadCart();

const menuEl = document.getElementById("menuList");
const cartBar = document.getElementById("cartBar");
const cartSummary = document.getElementById("cartSummary");
const cartModal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const subTotalEl = document.getElementById("subTotal");
const serviceFeeEl = document.getElementById("serviceFee");
const totalSumEl = document.getElementById("totalSum");
const searchEl = document.getElementById("search");
const cartDesktop = document.getElementById("cartDesktop");
const commentEl = document.getElementById("comment");

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
  }
};
function t(key){ return I18N[currentLang][key] || key; }

/* ===== helpers ===== */
function loadCart(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveCart(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}
function money(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₸";
}
function nameOf(item){
  return (currentLang === "kz" ? (item.kz || item.ru) : (item.ru || item.kz));
}
function qty(id){ return cart[id] || 0; }

/* ===== железный FIX: open/close корзины ===== */
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
  /* --- KITCHEN (из PDF) --- */
  {id:"k_1",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Бакетбитс",kz:"Бакетбитс",price:3290},
  {id:"k_2",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Салат гарден фитнес",kz:"Гарден фитнес салаты",price:3990},
  {id:"k_3",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Итальянский сыр Буррата",kz:"Буррата Итальяндық ірімшігі",price:5990},
  {id:"k_4",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Салат страчателла",kz:"Салат страчателла",price:5190},
  {id:"k_5",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Цезарь с куриным филе",kz:"Тауық еті қосылған Цезарь",price:3490},
  {id:"k_6",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Оберджин салаты",kz:"Оберджин салаты",price:3590},
  {id:"k_7",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Салат руккола с тунцом",kz:"Тунец қосылған руккола салаты",price:4990},
  {id:"k_8",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Цезарь с креветками",kz:"Асшаяндар қосылған цезарь салаты",price:3890},
  {id:"k_9",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Салат греческий",kz:"Салат греческий",price:2990},
  {id:"k_10",type:"kitchen",catRu:"Салаты",catKz:"Салаттар",ru:"Легкий салат с креветками и апельсинами",kz:"Асшаяндар және апельсин қосылған жеңіл салат",price:4990},

  {id:"k_11",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Министроне",kz:"Министроне",price:2990},
  {id:"k_12",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Том ям",kz:"Том ям",price:3990},
  {id:"k_13",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Кукси",kz:"Кукси",price:3590},
  {id:"k_14",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Окрошка",kz:"Окрошка",price:2590},
  {id:"k_15",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Рамен с мясом",kz:"Ет қосылған рамен",price:2990},
  {id:"k_16",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Лапша по-домашнему",kz:"Үй кеспесі",price:3590},
  {id:"k_17",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Солянка",kz:"Солянка",price:3390},
  {id:"k_18",type:"kitchen",catRu:"Супы",catKz:"Сорпалар",ru:"Чечевичный крем-суп",kz:"Жасымық крем-сорпа",price:2590},

  {id:"k_19",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Запечённый сибас по-британски",kz:"Британша көмбештелген теңіз алабұғасы",price:3890},
  {id:"k_20",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Куриный рулет с сыром",kz:"Іріміші қосылған тауық орамасы",price:4990},
  {id:"k_21",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Курица в кисло-сладком соусе",kz:"Тәтті қышқыл соустағы тауық еті",price:5990},
  {id:"k_22",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Дуэт семги и судака",kz:"Ақсерке мен көксерке дуэті",price:7290},
  {id:"k_23",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Перепелка в сливочном соусе",kz:"Кілегей соусындағы бөдене",price:4590},
  {id:"k_24",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Лосось в английском стиле",kz:"Ағылшынша албырты",price:7990},
  {id:"k_25",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Форель жареная по-английски",kz:"Ағылшынша қуырылған бақтақ",price:6890},
  {id:"k_26",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Дорадо",kz:"Дорадо",price:6990},
  {id:"k_27",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Куриное филе с кремом из брокколи",kz:"Брокколи креммен тауық сүбесі",price:7990},
  {id:"k_28",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Филе миньон на подушке из шпината в ягодном соусе",kz:"Саумалдық жастықшасындағы жеміс соусымен миньон",price:8990},
  {id:"k_29",type:"kitchen",catRu:"Горячие блюда",catKz:"Ыстық тағамдар",ru:"Каре ягненка в фисташковой панировке",kz:"Пісте панировкадағы бағлан қабырғасы",price:8590},

  {id:"k_30",type:"kitchen",catRu:"Пасты",catKz:"Пасталар",ru:"Фетучини Альфредо",kz:"Фетучини Альфредо",price:3990},
  {id:"k_31",type:"kitchen",catRu:"Пасты",catKz:"Пасталар",ru:"Фетучини с песто и семгой",kz:"Фетучини (песто және албырт)",price:4990},
  {id:"k_32",type:"kitchen",catRu:"Пасты",catKz:"Пасталар",ru:"Де море",kz:"Де море",price:3990},
  {id:"k_33",type:"kitchen",catRu:"Пасты",catKz:"Пасталар",ru:"Спагетти с говядиной",kz:"Сиыр еті бар спагетти",price:4190},

  {id:"k_34",type:"kitchen",catRu:"Блюда на гриле",catKz:"Грильдегі тағамдар",ru:"Стейк рибай",kz:"Рибай стейк",price:7990},
  {id:"k_35",type:"kitchen",catRu:"Блюда на гриле",catKz:"Грильдегі тағамдар",ru:"Стейк T-Bone",kz:"T-Bone стейк",price:9590},
  {id:"k_36",type:"kitchen",catRu:"Блюда на гриле",catKz:"Грильдегі тағамдар",ru:"Стейк Томагавк",kz:"Томагавк стейк",price:14990},
  {id:"k_37",type:"kitchen",catRu:"Блюда на гриле",catKz:"Грильдегі тағамдар",ru:"Пеппер стейк в сливочном соусе",kz:"Кілегей соусындағы пеппер стейк",price:7890},

  {id:"k_38",type:"kitchen",catRu:"Сеты на компанию",catKz:"Компаниядағы жинақтар",ru:"Гай ричи (на 6 персон)",kz:"Гай ричи (6 адамға)",price:32990},
  {id:"k_39",type:"kitchen",catRu:"Сеты на компанию",catKz:"Компаниядағы жинақтар",ru:"Гриль микс (на 8 персон)",kz:"Гриль микс (8 адамға)",price:42990},

  {id:"k_40",type:"kitchen",catRu:"Десерты",catKz:"Десерттер",ru:"Banoffee",kz:"Banoffee",price:4300},
  {id:"k_41",type:"kitchen",catRu:"Десерты",catKz:"Десерттер",ru:"Оригами",kz:"Оригами",price:2690},

  /* --- BAR (из PDF OCR) --- */
  {id:"b_1",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Red Bull",kz:"Red Bull",price:1800},
  {id:"b_2",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Borjomi 0,5",kz:"Borjomi 0,5",price:1600},
  {id:"b_3",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Vittel 0,5",kz:"Vittel 0,5",price:1500},
  {id:"b_4",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25",kz:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25",price:1300},
  {id:"b_5",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Perrier Naturel 0,33",kz:"Perrier Naturel 0,33",price:2000},
  {id:"b_6",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Swell 0,25",kz:"Swell 0,25",price:2000},
  {id:"b_7",type:"bar",catRu:"Безалкогольные напитки",catKz:"Алкогольсіз сусындар",ru:"Swell 0,75",kz:"Swell 0,75",price:4000},

  {id:"b_8",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Espresso",kz:"Espresso",price:1100},
  {id:"b_9",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Latte",kz:"Latte",price:1800},
  {id:"b_10",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Cappuccino",kz:"Cappuccino",price:1800},
  {id:"b_11",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Glasse",kz:"Glasse",price:1300},
  {id:"b_12",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Raf",kz:"Raf",price:1400},
  {id:"b_13",type:"bar",catRu:"Кофе",catKz:"Кофе",ru:"Irish coffee",kz:"Irish coffee",price:2100},

  {id:"b_14",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Black tea",kz:"Қара шай",price:2000},
  {id:"b_15",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Green tea",kz:"Жасыл шай",price:2000},
  {id:"b_16",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Shu puer",kz:"Shu puer",price:2100},
  {id:"b_17",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Milk oolong",kz:"Milk oolong",price:2200},
  {id:"b_18",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Tashkent's Tea",kz:"Tashkent's Tea",price:2700},
  {id:"b_19",type:"bar",catRu:"Чай",catKz:"Шай",ru:"Marroccan Tea",kz:"Marroccan Tea",price:2600},

  {id:"b_20",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Aperol Spritz",kz:"Aperol Spritz",price:3850},
  {id:"b_21",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Virgin Blood",kz:"Virgin Blood",price:3500},
  {id:"b_22",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Pandora",kz:"Pandora",price:3500},
  {id:"b_23",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Boulevardier",kz:"Boulevardier",price:3500},
  {id:"b_24",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Margarita",kz:"Margarita",price:3500},
  {id:"b_25",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Old Fashioned",kz:"Old Fashioned",price:3500},
  {id:"b_26",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"French 75",kz:"French 75",price:3500},
  {id:"b_27",type:"bar",catRu:"Коктейли",catKz:"Коктейльдер",ru:"Manhattan",kz:"Manhattan",price:3500},

  {id:"b_28",type:"bar",catRu:"Водка (50 мл)",catKz:"Арақ (50 мл)",ru:"Absolut Blue",kz:"Absolut Blue",price:2200},
  {id:"b_29",type:"bar",catRu:"Водка (50 мл)",catKz:"Арақ (50 мл)",ru:"Absolut Citron",kz:"Absolut Citron",price:2200},
  {id:"b_30",type:"bar",catRu:"Водка (50 мл)",catKz:"Арақ (50 мл)",ru:"Absolut Elyx",kz:"Absolut Elyx",price:2600},
  {id:"b_31",type:"bar",catRu:"Водка (50 мл)",catKz:"Арақ (50 мл)",ru:"Wyborowa",kz:"Wyborowa",price:2000},

  {id:"b_32",type:"bar",catRu:"Вино",catKz:"Шарап",ru:"Campo Viejo Tempranillo",kz:"Campo Viejo Tempranillo",price:12000},
  {id:"b_33",type:"bar",catRu:"Вино",catKz:"Шарап",ru:"Campo Viejo Blanco",kz:"Campo Viejo Blanco",price:12000},
  {id:"b_34",type:"bar",catRu:"Вино",catKz:"Шарап",ru:"Campo Viejo Reserva",kz:"Campo Viejo Reserva",price:16500},
  {id:"b_35",type:"bar",catRu:"Вино",catKz:"Шарап",ru:"Campo Viejo Gran Reserva",kz:"Campo Viejo Gran Reserva",price:22000},

  {id:"b_36",type:"bar",catRu:"Игристое вино",catKz:"Жарқыраған шарап",ru:"Montelvini Asolo Prosecco Brut",kz:"Montelvini Asolo Prosecco Brut",price:26000},
  {id:"b_37",type:"bar",catRu:"Игристое вино",catKz:"Жарқыраған шарап",ru:"Martini ASTI DOCG",kz:"Martini ASTI DOCG",price:16200}
];

/* ===== cart actions ===== */
function add(id){
  cart[id] = qty(id) + 1;
  saveCart();
  renderAll();
}
function sub(id){
  const q = qty(id) - 1;
  if(q <= 0) delete cart[id];
  else cart[id] = q;
  saveCart();
  renderAll();
}
function clearCart(){
  cart = {};
  saveCart();
  renderAll();
}

function getFilteredMenu(){
  const q = (searchEl.value || "").trim().toLowerCase();
  return MENU.filter(x => {
    if(x.type !== currentType) return false;
    if(!q) return true;
    const hay = `${x.ru} ${x.kz} ${x.catRu} ${x.catKz}`.toLowerCase();
    return hay.includes(q);
  });
}

function categoryLabel(item){
  return (currentLang === "kz" ? (item.catKz || item.catRu) : (item.catRu || item.catKz));
}

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
  cats.forEach(catLabel => {
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = catLabel;
    menuEl.appendChild(title);

    data.filter(x => categoryLabel(x) === catLabel).forEach(item => {
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

  menuEl.querySelectorAll("button[data-add]").forEach(btn => btn.onclick = () => add(btn.getAttribute("data-add")));
  menuEl.querySelectorAll("button[data-sub]").forEach(btn => btn.onclick = () => sub(btn.getAttribute("data-sub")));
}

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
    targetEl.innerHTML = `<div style="opacity:.7; padding:6px 0;">${t("empty")}</div>`;
    return;
  }

  targetEl.innerHTML = items.map(it => `
    <div class="cart-item">
      <div>
        <div style="font-weight:800">${nameOf(it)}</div>
        <div style="opacity:.75; font-size:12px">${categoryLabel(it)}</div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <button data-sub="${it.id}">−</button>
        <b>${it.qty}</b>
        <button data-add="${it.id}">+</button>
      </div>
    </div>
  `).join("");

  targetEl.querySelectorAll("button[data-add]").forEach(btn => btn.onclick = () => add(btn.getAttribute("data-add")));
  targetEl.querySelectorAll("button[data-sub]").forEach(btn => btn.onclick = () => sub(btn.getAttribute("data-sub")));
}

/* ===== 10% обслуживание ===== */
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

  if(count > 0){
    cartBar.classList.remove("hidden");
    cartSummary.textContent = `🛒 ${count} • ${money(total)}`;
  }else{
    cartBar.classList.add("hidden");
  }

  renderCartUI(cartList);

  // Desktop
  if(cartDesktop){
    cartDesktop.innerHTML = `
      <h3 style="margin:0 0 10px; color:#d4b26a;">${t("cart")}</h3>
      <div id="cartDeskList"></div>

      <div style="margin:12px 0; display:flex; flex-direction:column; gap:8px; font-weight:800;">
        <div style="display:flex; justify-content:space-between;">
          <span>${t("subtotal")}</span><span>${money(subtotal)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>${t("service")}</span><span>${money(service)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid rgba(255,255,255,.12); font-weight:900;">
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

  items.forEach(it => {
    lines.push(`• ${nameOf(it)} ×${it.qty} — ${money(it.sum)}`);
  });

  lines.push("");
  lines.push(`${t("subtotal")} ${money(subtotal)}`);
  lines.push(`${t("service")} ${money(service)}`);
  lines.push(`${t("total")} ${money(total)}`);

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

/* ===== Apply i18n ===== */
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
}

/* ===== events ===== */
document.querySelectorAll(".tab").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    searchEl.value = "";
    renderAll();
  };
});

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".lang-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    applyI18n();
    renderAll();
  };
});

document.getElementById("openCart").onclick = openModal;
document.getElementById("sendWA").onclick = sendToWhatsApp;
document.getElementById("clearCart").onclick = clearCart;
searchEl.addEventListener("input", renderAll);

/* ===== ВАЖНО: закрытие корзины (железно) ===== */
// 1) ✕ закрывает всегда
document.getElementById("closeCart").addEventListener("click", (e)=>{
  e.preventDefault();
  e.stopPropagation();
  closeModal();
});

// 2) Клик по фону (вне окна) закрывает
cartModal.addEventListener("click", (e)=>{
  // если клик не внутри .cart-window — закрыть
  if(!e.target.closest(".cart-window")) closeModal();
}, true);

// 3) ESC закрывает
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeModal();
});

function renderAll(){
  renderMenu();
  renderCart();
}

/* init */
applyI18n();
renderAll();
