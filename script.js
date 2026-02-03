const phone = "87010322021"

const menuData = [
  {name:{ru:"Пиво", kz:"Сыра", en:"Beer"}, price:1500},
  {name:{ru:"Кальян", kz:"Кальян", en:"Hookah"}, price:8000},
  {name:{ru:"Стейк", kz:"Стейк", en:"Steak"}, price:12000},
  {name:{ru:"Салат Цезарь", kz:"Цезарь салаты", en:"Caesar Salad"}, price:4500}
]

let cart = []
let lang = "ru"


function renderMenu(){
  const el = document.getElementById("menu")
  el.innerHTML=""

  menuData.forEach((item,i)=>{
    el.innerHTML+=`
      <div class="item">
        <span>${item.name[lang]}</span>
        <span>${item.price} ₸</span>
        <button onclick="add(${i})">+</button>
      </div>
    `
  })
}


function add(i){
  cart.push(menuData[i])
  updateCart()
}


function toggleCart(){
  document.getElementById("cart").classList.toggle("open")
}


function updateCart(){
  const box = document.getElementById("cartItems")
  box.innerHTML=""

  let sum=0

  cart.forEach(item=>{
    sum+=item.price
    box.innerHTML+=`<p>${item.name[lang]} - ${item.price} ₸</p>`
  })

  const service = Math.round(sum*0.1)
  const total = sum + service

  document.getElementById("sum").innerText=sum
  document.getElementById("service").innerText=service
  document.getElementById("total").innerText=total
  document.getElementById("cartCount").innerText=cart.length
}


function sendOrder(){
  let text="Заказ:%0A"

  cart.forEach(i=>{
    text+=`${i.name[lang]} - ${i.price} ₸%0A`
  })

  window.open(`https://wa.me/${phone}?text=${text}`)
}


function setLang(l){
  lang=l
  renderMenu()
  updateCart()
}


renderMenu()