
// WhatsApp номер администратора (международный формат без "+")
const WHATSAPP_PHONE = "77010322021";

// Меню (добавляй позиции сюда). Примеры взяты из твоих PDF.
const MENU = [
  // КУХНЯ
  { id:"k1", cat:"Салаты", name:"Бакетбитс", price:3290, desc:"Запеченная свекла, Stracciatella, микс зелени, кедровые орехи, черри, авторский соус" },
  { id:"k2", cat:"Салаты", name:"Гарден фитнес", price:3990, desc:"Хумус, авокадо, микс зелени, черри, ростбиф, апельсины, авторский соус" },
  { id:"k3", cat:"Супы", name:"Том ям", price:3990, desc:"" },
  { id:"k4", cat:"Супы", name:"Минестроне", price:2990, desc:"" },
  { id:"k5", cat:"Гриль", name:"Стейк Томагавк", price:14990, desc:"" },
  { id:"k6", cat:"Суши и роллы", name:"Ролл Филадельфия", price:3890, desc:"" },

  // БАР
  { id:"b1", cat:"Безалкогольные", name:"Coca-Cola / Sprite / Fanta (0.25)", price:1300, desc:"" },
  { id:"b2", cat:"Безалкогольные", name:"Red Bull", price:1800, desc:"" },
  { id:"b3", cat:"Лимонады", name:"Homemade Limonade (1л)", price:3200, desc:"" },
  { id:"b4", cat:"Коктейли", name:"Boulevardier", price:3500, desc:"" },
  { id:"b5", cat:"Кофе", name:"Latte", price:1100, desc:"" },
];

const elMenu = document.getElementById("menuList");
const elCart = document.getElementById("cartList");
const elTotal = document.getElementById("totalSum");
const elSearch = document.getElementById("search");
const elChips = document.getElementById("chips");

const STORAGE_KEY = "autograph_cart_v1";
let cart = loadCart(); // {id: qty}
let activeCat = "Все";

function loadCart(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  }catch(_){
    return {};
  }
}
function saveCart(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function money(n){
  // 14,990 ₸
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₸";
}

function uniqueCats(){
  const set = new Set(MENU.map(x => x.cat));
  return ["Все", ...Array.from(set)];
}

function qtyOf(id){ return cart[id] || 0; }

function add(id){
  cart[id] = qtyOf(id) + 1;
  saveCart();
  renderAll();
}
function sub(id){
  const q = qtyOf(id) - 1;
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

function filteredMenu(){
  const q = (elSearch.value || "").trim().toLowerCase();
  return MENU.filter(item => {
    const inCat = (activeCat === "Все") || (item.cat === activeCat);
    if(!inCat) return false;
    if(!q) return true;
    const hay = `${item.name} ${item.desc} ${item.cat}`.toLowerCase();
    return hay.includes(q);
  });
}

function renderChips(){
  elChips.innerHTML = "";
  uniqueCats().forEach(cat => {
    const chip = document.createElement("div");
    chip.className = "chip" + (cat === activeCat ? " active" : "");
    chip.textContent = cat;
    chip.onclick = () => { activeCat = cat; renderAll(); };
    elChips.appendChild(chip);
  });
}

function renderMenu(){
  elMenu.innerHTML = "";

  // группировка по категориям
  const items = filteredMenu();
  const cats = Array.from(new Set(items.map(x => x.cat)));

  cats.forEach(cat => {
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = cat;
    elMenu.appendChild(title);

    items.filter(x => x.cat === cat).forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      const row = document.createElement("div");
      row.className = "row";

      const left = document.createElement("div");
      const nm = document.createElement("div");
      nm.className = "name";
      nm.textContent = item.name;
      left.appendChild(nm);

      if(item.desc){
        const ds = document.createElement("div");
        ds.className = "desc";
        ds.textContent = item.desc;
        left.appendChild(ds);
      }

      const pr = document.createElement("div");
      pr.className = "price";
      pr.textContent = money(item.price);

      row.appendChild(left);
      row.appendChild(pr);

      const controls = document.createElement("div");
      controls.className = "controls";

      const btnMinus = document.createElement("button");
      btnMinus.className = "btn small";
      btnMinus.textContent = "−";
      btnMinus.onclick = () => sub(item.id);

      const qty = document.createElement("div");
      qty.className = "qty";
      qty.textContent = qtyOf(item.id);

      const btnPlus = document.createElement("button");
      btnPlus.className = "btn small";
      btnPlus.textContent = "+";
      btnPlus.onclick = () => add(item.id);

      controls.appendChild(btnMinus);
      controls.appendChild(qty);
      controls.appendChild(btnPlus);

      card.appendChild(row);
      card.appendChild(controls);

      elMenu.appendChild(card);
    });
  });

  if(items.length === 0){
    const empty = document.createElement("div");
    empty.className = "card";
    empty.textContent = "Ничего не найдено. Попробуй другой запрос или категорию.";
    elMenu.appendChild(empty);
  }
}

function cartItems(){
  const ids = Object.keys(cart);
  return ids
    .map(id => {
      const item = MENU.find(x => x.id === id);
      if(!item) return null;
      return { ...item, qty: cart[id], sum: cart[id]*item.price };
    })
    .filter(Boolean);
}

function renderCart(){
  elCart.innerHTML = "";

  const items = cartItems();
  if(items.length === 0){
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "Корзина пустая. Нажми + у блюда, чтобы добавить.";
    elCart.appendChild(empty);
    elTotal.textContent = money(0);
    return;
  }

  let total = 0;
  items.forEach(it => {
    total += it.sum;

    const box = document.createElement("div");
    box.className = "cart-item";

    const row = document.createElement("div");
    row.className = "row";

    const left = document.createElement("div");
    left.innerHTML = `<div class="name">${it.name}</div><div class="desc">${it.cat}</div>`;

    const right = document.createElement("div");
    right.innerHTML = `<div class="price">${money(it.sum)}</div>`;

    row.appendChild(left);
    row.appendChild(right);

    const controls = document.createElement("div");
    controls.className = "controls";

    const btnMinus = document.createElement("button");
    btnMinus.className = "btn small";
    btnMinus.textContent = "−";
    btnMinus.onclick = () => sub(it.id);

    const qty = document.createElement("div");
    qty.className = "qty";
    qty.textContent = it.qty;

    const btnPlus = document.createElement("button");
    btnPlus.className = "btn small";
    btnPlus.textContent = "+";
    btnPlus.onclick = () => add(it.id);

    controls.appendChild(btnMinus);
    controls.appendChild(qty);
    controls.appendChild(btnPlus);

    box.appendChild(row);
    box.appendChild(controls);
    elCart.appendChild(box);
  });

  elTotal.textContent = money(total);
}

function buildWhatsAppText(){
  const items = cartItems();
  const comment = (document.getElementById("comment").value || "").trim();
  let total = items.reduce((s,x)=>s+x.sum,0);

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
    alert("Корзина пустая 🙂 Добавь позиции, потом отправляй.");
    return;
  }
  const text = encodeURIComponent(buildWhatsAppText());
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  window.open(url, "_blank");
}

function renderAll(){
  renderChips();
  renderMenu();
  renderCart();
}

document.getElementById("clearCart").addEventListener("click", clearCart);
document.getElementById("sendWA").addEventListener("click", sendToWhatsApp);
elSearch.addEventListener("input", renderAll);

renderAll();

