const PHONE = "77010322021";

let currentType = "kitchen";

const MENU = [
  {type:"kitchen", name:"Том ям", price:3990},
  {type:"kitchen", name:"Цезарь с курицей", price:3490},
  {type:"kitchen", name:"Рибай", price:9590},

  {type:"bar", name:"Coca-Cola", price:1300},
  {type:"bar", name:"Red Bull", price:1800},
  {type:"bar", name:"Boulevardier", price:3500}
];

let cart = {};

const menuEl = document.getElementById("menuList");
const cartBar = document.getElementById("cartBar");
const cartSummary = document.getElementById("cartSummary");
const cartModal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const totalSum = document.getElementById("totalSum");

function money(n){return n+" ₸"}

function renderMenu(){
  menuEl.innerHTML="";
  MENU.filter(x=>x.type===currentType).forEach(item=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <span>${item.name} — ${money(item.price)}</span>
      <div class="controls">
        <button onclick="sub('${item.name}')">-</button>
        <span>${cart[item.name]||0}</span>
        <button onclick="add('${item.name}')">+</button>
      </div>`;
    menuEl.appendChild(div);
  });
}

function add(name){
  cart[name]=(cart[name]||0)+1;
  renderCart();
  renderMenu();
}

function sub(name){
  if(!cart[name])return;
  cart[name]--;
  if(cart[name]<=0)delete cart[name];
  renderCart();
  renderMenu();
}

function renderCart(){
  cartList.innerHTML="";
  let total=0,count=0;

  Object.entries(cart).forEach(([name,qty])=>{
    const price=MENU.find(x=>x.name===name).price;
    total+=price*qty;
    count+=qty;

    const d=document.createElement("div");
    d.textContent=`${name} x${qty}`;
    cartList.appendChild(d);
  });

  totalSum.textContent=money(total);

  if(count>0){
    cartBar.classList.remove("hidden");
    cartSummary.textContent=`🛒 ${count} поз. • ${money(total)}`;
  }else{
    cartBar.classList.add("hidden");
  }
}

document.querySelectorAll(".tab").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    currentType=btn.dataset.type;
    renderMenu();
  }
});

document.getElementById("openCart").onclick=()=>cartModal.classList.remove("hidden");
document.getElementById("closeCart").onclick=()=>cartModal.classList.add("hidden");

document.getElementById("sendWA").onclick=()=>{
  let text="Autograph заказ:%0A";
  let total=0;
  Object.entries(cart).forEach(([name,qty])=>{
    const price=MENU.find(x=>x.name===name).price;
    total+=price*qty;
    text+=`${name} x${qty}%0A`;
  });
  text+=`Итого: ${total}`;
  window.open(`https://wa.me/${PHONE}?text=${text}`);
};

renderMenu();
renderCart();
