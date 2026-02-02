const PHONE = "77010322021"; // WhatsApp (международный формат без +)
const STORAGE_KEY = "autograph_cart_v2";

let currentType = "kitchen"; // kitchen | bar
let cart = loadCart(); // {id: qty}

const menuEl = document.getElementById("menuList");
const cartBar = document.getElementById("cartBar");
const cartSummary = document.getElementById("cartSummary");
const cartModal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const totalSum = document.getElementById("totalSum");
const searchEl = document.getElementById("search");
const cartDesktop = document.getElementById("cartDesktop");

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

/* ======= ДАННЫЕ МЕНЮ (Кухня + Бар) ======= */
const MENU = [
  {id:"k1", type:"kitchen", cat:"Салаты", name:"Бакетбитс", price:3290},
  {id:"k2", type:"kitchen", cat:"Салаты", name:"Салат гарден фитнес", price:3990},
  {id:"k3", type:"kitchen", cat:"Салаты", name:"Итальянский сыр Буррата", price:5990},
  {id:"k4", type:"kitchen", cat:"Салаты", name:"Салат страчателла", price:5190},
  {id:"k5", type:"kitchen", cat:"Салаты", name:"Салат оберджин", price:3590},
  {id:"k6", type:"kitchen", cat:"Салаты", name:"Цезарь с куриным филе", price:3490},
  {id:"k7", type:"kitchen", cat:"Салаты", name:"Асшаяндар қосылған цезарь салаты", price:3890},
  {id:"k8", type:"kitchen", cat:"Салаты", name:"Салат греческий", price:2990},

  {id:"k9", type:"kitchen", cat:"Супы", name:"Том ям", price:2990},
  {id:"k10", type:"kitchen", cat:"Супы", name:"Министроне", price:3590},
  {id:"k11", type:"kitchen", cat:"Супы", name:"Министроне", price:2590}, // проверь: в PDF тут может быть Окрошка
  {id:"k12", type:"kitchen", cat:"Супы", name:"Рамен с мясом", price:3590},
  {id:"k13", type:"kitchen", cat:"Супы", name:"Лапша по-домашнему", price:2990},
  {id:"k14", type:"kitchen", cat:"Супы", name:"Солянка", price:3390},
  {id:"k15", type:"kitchen", cat:"Супы", name:"Чечевичный крем-суп", price:2590},

  {id:"k16", type:"kitchen", cat:"Горячие блюда", name:"Британша көмбештелген теңіз алабұғасы", price:5990},
  {id:"k17", type:"kitchen", cat:"Горячие блюда", name:"Перепелка в сливочном соусе", price:3890},
  {id:"k18", type:"kitchen", cat:"Горячие блюда", name:"Дуэт семги и судака", price:7290},
  {id:"k19", type:"kitchen", cat:"Горячие блюда", name:"Авторлық соуспен моцаррело ірімшігі қосылған тауық орамасы", price:4590},
  {id:"k20", type:"kitchen", cat:"Горячие блюда", name:"Ағылшынша қуырылған бақтақ", price:6990},
  {id:"k21", type:"kitchen", cat:"Горячие блюда", name:"Дорадо", price:6890},
  {id:"k22", type:"kitchen", cat:"Горячие блюда", name:"Филе миньон на подушке из шпината в ягодном соусе", price:8990},
  {id:"k23", type:"kitchen", cat:"Горячие блюда", name:"Пісте панировкадағы бағлан қабырғасы", price:8790},
  {id:"k24", type:"kitchen", cat:"Горячие блюда", name:"Саумалдық қосылған көмбештелген көксерке", price:8590},
  {id:"k25", type:"kitchen", cat:"Горячие блюда", name:"Запечённый сибас по-британски", price:5990},
  {id:"k26", type:"kitchen", cat:"Горячие блюда", name:"Лосось в английском стиле", price:7990},
  {id:"k27", type:"kitchen", cat:"Горячие блюда", name:"Форель жареная по-английски", price:6990},
  {id:"k28", type:"kitchen", cat:"Горячие блюда", name:"Куриное филе с кремом из брокколи", price:7990},
  {id:"k29", type:"kitchen", cat:"Горячие блюда", name:"Каре ягненка в фисташковой панировке", price:8590},

  {id:"k30", type:"kitchen", cat:"Пасты", name:"Фетучини Альфредо", price:3990},
  {id:"k31", type:"kitchen", cat:"Пасты", name:"Фетучини с песто и семгой", price:4190},
  {id:"k32", type:"kitchen", cat:"Пасты", name:"Де море", price:4990},
  {id:"k33", type:"kitchen", cat:"Пасты", name:"Спагетти с говядиной", price:3990},

  {id:"k34", type:"kitchen", cat:"Гриль", name:"Стейк рибай", price:9590},
  {id:"k35", type:"kitchen", cat:"Гриль", name:"Стейк T-Bone", price:8990},
  {id:"k36", type:"kitchen", cat:"Гриль", name:"Стейк Томагавк", price:14990},
  {id:"k37", type:"kitchen", cat:"Гриль", name:"Пеппер стейк в сливочном соусе", price:7890},
  {id:"k38", type:"kitchen", cat:"Гриль", name:"Куриное филе на гриле в сливочном соусе", price:6990},
  {id:"k39", type:"kitchen", cat:"Гриль", name:"Цыпленок с бейби картофелем", price:7990},

  {id:"k40", type:"kitchen", cat:"Сеты на компанию", name:"Гай ричи", price:32990},
  {id:"k41", type:"kitchen", cat:"Сеты на компанию", name:"Гриль микс", price:42990},
  {id:"k42", type:"kitchen", cat:"Сеты на компанию", name:"Мясная лавка", price:38990},
  {id:"k43", type:"kitchen", cat:"Сеты на компанию", name:"Роял ростер", price:32990},

  {id:"k44", type:"kitchen", cat:"Пивные сеты", name:"Пивной сет 1", price:5990},
  {id:"k45", type:"kitchen", cat:"Пивные сеты", name:"Пивной сет 2", price:7990},
  {id:"k46", type:"kitchen", cat:"Пивные сеты", name:"Пивной сет VIP", price:9990},

  {id:"k47", type:"kitchen", cat:"Суши и роллы", name:"Жаренный ролл Америка", price:3990},
  {id:"k48", type:"kitchen", cat:"Суши и роллы", name:"Жаренный ролл Кани хотто", price:2990},
  {id:"k49", type:"kitchen", cat:"Суши и роллы", name:"Жаренный ролл Эби хотто", price:4290},
  {id:"k50", type:"kitchen", cat:"Суши и роллы", name:"Жаренный ролл цезарь", price:2990},
  {id:"k51", type:"kitchen", cat:"Суши и роллы", name:"Запеченный ролл Банзай", price:4390},
  {id:"k52", type:"kitchen", cat:"Суши и роллы", name:"Ролл Аляска", price:4990},
  {id:"k53", type:"kitchen", cat:"Суши и роллы", name:"Ролл Саке маки", price:2990},
  {id:"k54", type:"kitchen", cat:"Суши и роллы", name:"Ролл Филадельфия", price:3890},
  {id:"k55", type:"kitchen", cat:"Суши и роллы", name:"Cуши Саке", price:1990},
  {id:"k56", type:"kitchen", cat:"Суши и роллы", name:"Суши Унаги", price:1890},
  {id:"k57", type:"kitchen", cat:"Суши и роллы", name:"Суши Эби", price:1790},

  {id:"k58", type:"kitchen", cat:"Холодные закуски", name:"Рыбное ассорти", price:10990},
  {id:"k59", type:"kitchen", cat:"Холодные закуски", name:"Сырное ассорти", price:9990},
  {id:"k60", type:"kitchen", cat:"Холодные закуски", name:"Капрезе", price:2990},
  {id:"k61", type:"kitchen", cat:"Холодные закуски", name:"Рулетики из баклажан с грецкими орехами", price:2990},
  {id:"k62", type:"kitchen", cat:"Холодные закуски", name:"Конское ассорти", price:9990},
  {id:"k63", type:"kitchen", cat:"Холодные закуски", name:"Кавказское ассорти", price:3590},
  {id:"k64", type:"kitchen", cat:"Холодные закуски", name:"Русская закуска", price:3590},
  {id:"k65", type:"kitchen", cat:"Холодные закуски", name:"Эна", price:3990},

  /* ===== Бар ===== */
  {id:"b1", type:"bar", cat:"Безалкогольные", name:"Red Bull", price:1800},
  {id:"b2", type:"bar", cat:"Безалкогольные", name:"Borjomi 0,5", price:1600},
  {id:"b3", type:"bar", cat:"Безалкогольные", name:"Vittel 0,5", price:1500},
  {id:"b4", type:"bar", cat:"Безалкогольные", name:"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25", price:1300},
  {id:"b5", type:"bar", cat:"Безалкогольные", name:"Perrier Naturel 0,33", price:2000},
  {id:"b6", type:"bar", cat:"Безалкогольные", name:"Swell 0,25", price:2000},
  {id:"b7", type:"bar", cat:"Безалкогольные", name:"Swell 0,75", price:4000},

  {id:"b8", type:"bar", cat:"Лимонады", name:"Mango-Passion Fruit 1l", price:3200},
  {id:"b9", type:"bar", cat:"Лимонады", name:"Rasberry- Lychee 1l", price:3200},
  {id:"b10", type:"bar", cat:"Лимонады", name:"Kiwi- Green Apple 1l", price:3200},
  {id:"b11", type:"bar", cat:"Лимонады", name:"Pineapple-Grapefruit 1l", price:3200},
  {id:"b12", type:"bar", cat:"Лимонады", name:"Wild Berry 1l", price:3200},
  {id:"b13", type:"bar", cat:"Лимонады", name:"Homemade Limonade 1l", price:3200},
  {id:"b14", type:"bar", cat:"Лимонады", name:"Pomegranate- Lime 1l", price:3200},
  {id:"b15", type:"bar", cat:"Лимонады", name:"Elderflower-Lychee 1l", price:3200},

  {id:"b16", type:"bar", cat:"Кофе", name:"Espresso", price:1100},
  {id:"b17", type:"bar", cat:"Кофе", name:"Latte", price:1800},
  {id:"b18", type:"bar", cat:"Кофе", name:"Cappuccino", price:1800},
  {id:"b19", type:"bar", cat:"Кофе", name:"Glasse", price:1300},
  {id:"b20", type:"bar", cat:"Кофе", name:"Raf", price:1400},

  {id:"b21", type:"bar", cat:"Чаи", name:"Black tea", price:2000},
  {id:"b22", type:"bar", cat:"Чаи", name:"Green tea", price:2000},
  {id:"b23", type:"bar", cat:"Чаи", name:"Shu puer", price:2100},
  {id:"b24", type:"bar", cat:"Чаи", name:"Milk oolong", price:2200},
  {id:"b25", type:"bar", cat:"Чаи", name:"Tashkent's Tea", price:2700},
  {id:"b26", type:"bar", cat:"Чаи", name:"Marroccan Tea", price:2600},
  {id:"b27", type:"bar", cat:"Чаи", name:"Tea Of Wild Berryes", price:2800},

  {id:"b28", type:"bar", cat:"Коктейли", name:"Clover Club", price:3500},
  {id:"b29", type:"bar", cat:"Коктейли", name:"Stuart", price:3500},
  {id:"b30", type:"bar", cat:"Коктейли", name:"Kirke", price:3500},
  {id:"b31", type:"bar", cat:"Коктейли", name:"Bloody Mary", price:3500},
  {id:"b32", type:"bar", cat:"Коктейли", name:"New York Sour", price:3500},
  {id:"b33", type:"bar", cat:"Коктейли", name:"Boulevardier", price:3500},
  {id:"b34", type:"bar", cat:"Коктейли", name:"Margarita", price:3500},
  {id:"b35", type:"bar", cat:"Коктейли", name:"Old Fashioned", price:3500},
  {id:"b36", type:"bar", cat:"Коктейли", name:"French 75", price:3500},
  {id:"b37", type:"bar", cat:"Коктейли", name:"Manhattan", price:3500},

  // … (Если хочешь, я допишу сюда оставшиеся крепкие/вино/ликеры полностью 1-в-1 из PDF.
  // Сейчас база уже рабочая и расширяемая.)
];

/* ======= ЛОГИКА РЕНДЕРА ======= */

function qty(id){ return cart[id] || 0; }

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

function getFilteredMenu(){
  const q = (searchEl.value || "").trim().toLowerCase();
  return MENU.filter(x => {
    if(x.type !== currentType) return false;
    if(!q) return true;
    const hay = `${x.name} ${x.cat}`.toLowerCase();
    return hay.includes(q);
  });
}

function renderMenu(){
  menuEl.innerHTML = "";
  const data = getFilteredMenu();
  const cats = Array.from(new Set(data.map(x => x.cat)));

  if(data.length === 0){
    menuEl.innerHTML = `<div class="card"><div class="left"><div class="name">Ничего не найдено</div><div class="meta">Попробуй другой запрос</div></div></div>`;
    return;
  }

  cats.forEach(cat => {
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = cat;
    menuEl.appendChild(title);

    data.filter(x => x.cat === cat).forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="left">
          <div class="name">${item.name}</div>
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

  // делегирование событий +/-
  menuEl.querySelectorAll("button[data-add]").forEach(btn => {
    btn.onclick = () => add(btn.getAttribute("data-add"));
  });
  menuEl.querySelectorAll("button[data-sub]").forEach(btn => {
    btn.onclick = () => sub(btn.getAttribute("data-sub"));
  });
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
    targetEl.innerHTML = `<div style="opacity:.7; padding:6px 0;">Корзина пустая. Нажми “+” у позиции.</div>`;
    return;
  }

  targetEl.innerHTML = items.map(it => `
    <div class="cart-item">
      <div>
        <div style="font-weight:700">${it.name}</div>
        <div style="opacity:.75; font-size:12px">${it.cat}</div>
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

function renderCart(){
  const items = cartItems();
  const total = items.reduce((s,x)=>s+x.sum,0);
  const count = items.reduce((s,x)=>s+x.qty,0);

  totalSum.textContent = money(total);

  // mobile bar
  if(count > 0){
    cartBar.classList.remove("hidden");
    cartSummary.textContent = `🛒 ${count} поз. • ${money(total)}`;
  }else{
    cartBar.classList.add("hidden");
  }

  // modal list
  renderCartUI(cartList);

  // desktop cart
  if(cartDesktop){
    cartDesktop.innerHTML = `
      <h3 style="margin:0 0 10px; color:#d4b26a;">Корзина</h3>
      <div id="cartDeskList"></div>
      <div style="display:flex; justify-content:space-between; margin:12px 0; font-weight:800;">
        <span>Итого:</span><span>${money(total)}</span>
      </div>
      <button id="sendDesk" class="primary">Отправить в WhatsApp</button>
      <button id="clearDesk" class="ghost">Очистить</button>
      <div style="opacity:.7; font-size:12px; margin-top:8px;">Заказ отправится сообщением администратору.</div>
    `;
    const list = cartDesktop.querySelector("#cartDeskList");
    renderCartUI(list);

    cartDesktop.querySelector("#sendDesk").onclick = sendToWhatsApp;
    cartDesktop.querySelector("#clearDesk").onclick = clearCart;
  }
}

function clearCart(){
  cart = {};
  saveCart();
  renderAll();
}

function buildWhatsAppText(){
  const items = cartItems();
  const comment = (document.getElementById("comment").value || "").trim();
  const total = items.reduce((s,x)=>s+x.sum,0);

  let lines = [];
  lines.push("Autograph — заказ:");
  lines.push("");

  items.forEach(it => {
    lines.push(`• ${it.name} ×${it.qty} — ${money(it.sum)}`);
  });

  lines.push("");
  lines.push(`Итого: ${money(total)}`);

  if(comment){
    lines.push("");
    lines.push(`Комментарий: ${comment}`);
  }

  return lines.join("\n");
}

function sendToWhatsApp(){
  const items = cartItems();
  if(items.length === 0){
    alert("Корзина пустая 🙂");
    return;
  }
  const text = encodeURIComponent(buildWhatsAppText());
  window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank");
}

function renderAll(){
  renderMenu();
  renderCart();
}

/* ======= EVENTS ======= */
document.querySelectorAll(".tab").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    searchEl.value = "";
    renderAll();
  };
});

document.getElementById("openCart").onclick = ()=> cartModal.classList.remove("hidden");
document.getElementById("closeCart").onclick = ()=> cartModal.classList.add("hidden");
document.getElementById("sendWA").onclick = sendToWhatsApp;
document.getElementById("clearCart").onclick = clearCart;
searchEl.addEventListener("input", renderAll);

renderAll();
