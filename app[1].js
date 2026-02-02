const PHONE = "77010322021"; // WhatsApp номер без +
const STORAGE_KEY = "autograph_cart_final_full_v1";

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
function t(key){ return (I18N[currentLang] && I18N[currentLang][key]) || key; }

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
const MENU = [{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Бакетбитс","kz":"Бакетбитс","en":"Бакетбитс","price":3290,"id":"k_1"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Салат гарден фитнес","kz":"Гарден фитнес салаты","en":"Салат гарден фитнес","price":3990,"id":"k_2"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Итальянский сыр Буррата","kz":"Буррата Итальяндық ірімшігі","en":"Итальянский сыр Буррата","price":5990,"id":"k_3"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Салат страчателла","kz":"Страчателла салаты","en":"Салат страчателла","price":5190,"id":"k_4"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Цезарь с куриным филе","kz":"Тауық еті қосылған Цезарь","en":"Цезарь с куриным филе","price":3490,"id":"k_5"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Салат оберджин","kz":"Оберджин салаты","en":"Салат оберджин","price":3590,"id":"k_6"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Тунец қосылған руккола салаты","kz":"Тунец қосылған руккола салаты","en":"Тунец қосылған руккола салаты","price":4990,"id":"k_7"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Цезарь с креветками","kz":"Асшаяндар қосылған цезарь салаты","en":"Цезарь с креветками","price":3890,"id":"k_8"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Салат греческий","kz":"Грек салаты","en":"Салат греческий","price":2990,"id":"k_9"},{"type":"kitchen","catRu":"Салаты","catKz":"Салаттар","catEn":"Салаты","ru":"Легкий салат с креветками и апельсинами","kz":"Асшаяндар және апельсин қосылған жеңіл салат","en":"Легкий салат с креветками и апельсинами","price":4990,"id":"k_10"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Том ям","kz":"Том ям","en":"Том ям","price":2990,"id":"k_11"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Министроне","kz":"Министроне","en":"Министроне","price":3590,"id":"k_12"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Кукси","kz":"Кукси","en":"Кукси","price":2590,"id":"k_13"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Рамен с мясом","kz":"Рамен с мясом","en":"Рамен с мясом","price":3590,"id":"k_14"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Лапша по-домашнему","kz":"Лапша по-домашнему","en":"Лапша по-домашнему","price":2990,"id":"k_15"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Солянка","kz":"Солянка","en":"Солянка","price":3390,"id":"k_16"},{"type":"kitchen","catRu":"Супы","catKz":"Сорпалар","catEn":"Супы","ru":"Чечевичный крем-суп","kz":"Чечевичный крем-суп","en":"Чечевичный крем-суп","price":2590,"id":"k_17"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Запечённый сибас по-британски","kz":"Британша көмбештелген теңіз алабұғасы","en":"Запечённый сибас по-британски","price":5990,"id":"k_18"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Перепелка в сливочном соусе","kz":"Кілегей соусындағы бөдене","en":"Перепелка в сливочном соусе","price":3890,"id":"k_19"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Дуэт семги и судака","kz":"Ақсерке мен көксерке дуэті","en":"Дуэт семги и судака","price":7290,"id":"k_20"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Авторлық соуспен моцаррело ірімшігі қосылған тауық орамасы","kz":"Тәтті қышқыл соустағы тауық еті","en":"Авторлық соуспен моцаррело ірімшігі қосылған тауық орамасы","price":4990,"id":"k_21"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Іріміші қосылған тауық орамасы","kz":"Курица в кисло-сладком соусе","en":"Іріміші қосылған тауық орамасы","price":4590,"id":"k_22"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Лосось в английском стиле","kz":"Ағылшынша албырты","en":"Лосось в английском стиле","price":7990,"id":"k_23"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Ағылшынша қуырылған бақтақ","kz":"Ағылшынша қуырылған бақтақ","en":"Ағылшынша қуырылған бақтақ","price":6990,"id":"k_24"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Дорадо","kz":"Форель жареная по-английски","en":"Дорадо","price":6890,"id":"k_25"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Брокколиден крем қосылған тауық сүбесі","kz":"Брокколи креммен тауық сүбесі","en":"Брокколиден крем қосылған тауық сүбесі","price":7990,"id":"k_26"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Филе миньон на подушке из шпината в ягодном соусе","kz":"Саумалдық жастықшасындағы жеміс соусымен миньон сүбесі","en":"Филе миньон на подушке из шпината в ягодном соусе","price":8990,"id":"k_27"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Пісте панировкадағы бағлан қабырғасы","kz":"Пісте панировкадағы бағлан қабырғасы","en":"Пісте панировкадағы бағлан қабырғасы","price":8790,"id":"k_28"},{"type":"kitchen","catRu":"Горячие блюда","catKz":"Ыстық тағамдар","catEn":"Горячие блюда","ru":"Саумалдық қосылған көмбештелген көксерке","kz":"Нежнейшее каре ягненка с гранатовым соусом и","en":"Саумалдық қосылған көмбештелген көксерке","price":8590,"id":"k_29"},{"type":"kitchen","catRu":"Пасты","catKz":"Пасталар","catEn":"Пасты","ru":"Фетучини Альфредо","kz":"Фетучини Альфредо","en":"Фетучини Альфредо","price":3990,"id":"k_30"},{"type":"kitchen","catRu":"Пасты","catKz":"Пасталар","catEn":"Пасты","ru":"Фетучини с песто и семгой","kz":"Фетучини с песто и семгой","en":"Фетучини с песто и семгой","price":3990,"id":"k_31"},{"type":"kitchen","catRu":"Блюда на гриле","catKz":"Грильдегі тағамдар","catEn":"Блюда на гриле","ru":"Стейк рибай","kz":"Стейк рибай","en":"Стейк рибай","price":9590,"id":"k_32"},{"type":"kitchen","catRu":"Блюда на гриле","catKz":"Грильдегі тағамдар","catEn":"Блюда на гриле","ru":"Стейк T-Bone","kz":"Стейк Томагавк","en":"Стейк T-Bone","price":8990,"id":"k_33"},{"type":"kitchen","catRu":"Блюда на гриле","catKz":"Грильдегі тағамдар","catEn":"Блюда на гриле","ru":"Пеппер стейк в сливочном соусе","kz":"Пеппер стейк в сливочном соусе","en":"Пеппер стейк в сливочном соусе","price":7890,"id":"k_34"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Гай ричи","kz":"Гай ричи","en":"Гай ричи","price":32990,"id":"k_35"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Гриль микс","kz":"Гай ричи","en":"Гриль микс","price":42990,"id":"k_36"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Роял ростер","kz":"Гриль микс","en":"Роял ростер","price":32990,"id":"k_37"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Мясная лавка","kz":"Роял ростер","en":"Мясная лавка","price":38990,"id":"k_38"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Пивные сеты","kz":"Пивные сеты","en":"Пивные сеты","price":5990,"id":"k_39"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Пивной сет VIP","kz":"Пивной сет VIP","en":"Пивной сет VIP","price":9990,"id":"k_40"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Суши и ролы","kz":"Суши және ролы","en":"Суши и ролы","price":3990,"id":"k_41"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"ЖА аренный ролл Америка","kz":"ЖА аренный ролл Америка","en":"ЖА аренный ролл Америка","price":2990,"id":"k_42"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"ЖА аренный ролл Кани хотто","kz":"ЖА аренный ролл Кани хотто","en":"ЖА аренный ролл Кани хотто","price":4290,"id":"k_43"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"ЖА аренный ролл Эби хотто","kz":"ЖА аренный ролл Эби хотто","en":"ЖА аренный ролл Эби хотто","price":2990,"id":"k_44"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"ЖА аренный ролл цезарь","kz":"ЖА аренный ролл цезарь","en":"ЖА аренный ролл цезарь","price":4390,"id":"k_45"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Запеченный ролл Банзай","kz":"Запеченный ролл Банзай","en":"Запеченный ролл Банзай","price":4990,"id":"k_46"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Ролл Аляска","kz":"Ролл Аляска","en":"Ролл Аляска","price":2990,"id":"k_47"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Ролл Саке маки","kz":"Ролл Саке маки","en":"Ролл Саке маки","price":3890,"id":"k_48"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Ролл Филадельфия","kz":"Ролл Филадельфия","en":"Ролл Филадельфия","price":1990,"id":"k_49"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Cуши Саке","kz":"Cуши Саке","en":"Cуши Саке","price":1890,"id":"k_50"},{"type":"kitchen","catRu":"Сеты на компанию","catKz":"Компаниядағы жинақтар","catEn":"Сеты на компанию","ru":"Суши Унаги","kz":"Суши Унаги","en":"Суши Унаги","price":1790,"id":"k_51"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Балық ассорти","kz":"Балық ассорти","en":"Балық ассорти","price":10990,"id":"k_52"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Ірімшік ассорти","kz":"Рыбное ассорти","en":"Ірімшік ассорти","price":9990,"id":"k_53"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Капрезе дәмтағамы","kz":"Сырное ассорти","en":"Капрезе дәмтағамы","price":2990,"id":"k_54"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Жаңғақ қосылған баклажан орамшалар","kz":"Жаңғақ қосылған баклажан орамшалар","en":"Жаңғақ қосылған баклажан орамшалар","price":2990,"id":"k_55"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Жылқы ассорти","kz":"Рулетики из баклажан с грецкими орехами","en":"Жылқы ассорти","price":9990,"id":"k_56"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Тұздамалар","kz":"Конское ассорти","en":"Тұздамалар","price":3590,"id":"k_57"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Кавказ ассорти","kz":"Разносолы","en":"Кавказ ассорти","price":3590,"id":"k_58"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Орыс дәмтағамы","kz":"Кавказское ассорти","en":"Орыс дәмтағамы","price":3590,"id":"k_59"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Жаңғақ қосылған піскен сиыр тілінен орамшалар","kz":"Эна","en":"Жаңғақ қосылған піскен сиыр тілінен орамшалар","price":3990,"id":"k_60"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Чесночные гренки","kz":"Сарымсақпен қуырылған нан кесектері Кости мозговые говяжьи","en":"Чесночные гренки","price":4990,"id":"k_61"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Ассорти колбасок","kz":"Шұжықтар ассорти","en":"Ассорти колбасок","price":8990,"id":"k_62"},{"type":"kitchen","catRu":"Холодные закуски","catKz":"Суық тіскебасар","catEn":"Холодные закуски","ru":"Қуырылған жолбарыс асшаяндары","kz":"Қуырылған жолбарыс асшаяндары","en":"Қуырылған жолбарыс асшаяндары","price":6990,"id":"k_63"},{"type":"kitchen","catRu":"Гарниры","catKz":"Гарнирлер","catEn":"Гарниры","ru":"Спаржа","kz":"Спаржа","en":"Спаржа","price":2190,"id":"k_64"},{"type":"kitchen","catRu":"Гарниры","catKz":"Гарнирлер","catEn":"Гарниры","ru":"Картофель фри","kz":"Картофель фри","en":"Картофель фри","price":1490,"id":"k_65"},{"type":"kitchen","catRu":"Гарниры","catKz":"Гарнирлер","catEn":"Гарниры","ru":"Картофельные Дольки","kz":"Брокколи с чесноком","en":"Картофельные Дольки","price":1490,"id":"k_66"},{"type":"kitchen","catRu":"Гарниры","catKz":"Гарнирлер","catEn":"Гарниры","ru":"Рис","kz":"Рататуй","en":"Рис","price":1890,"id":"k_67"},{"type":"kitchen","catRu":"Гарниры","catKz":"Гарнирлер","catEn":"Гарниры","ru":"Овощи на гриле","kz":"Овощи на гриле","en":"Овощи на гриле","price":2590,"id":"k_68"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Жеміс ассорти","kz":"Жеміс ассорти","en":"Жеміс ассорти","price":9990,"id":"k_69"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Нан ассорти","kz":"Десерты","en":"Нан ассорти","price":990,"id":"k_70"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Хлебное ассорти Сердце","kz":"Хлебное ассорти Сердце","en":"Хлебное ассорти Сердце","price":3390,"id":"k_71"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Фисташка»","kz":"Фисташка»","en":"Фисташка»","price":3300,"id":"k_72"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Banoffee","kz":"Banoffee","en":"Banoffee","price":4300,"id":"k_73"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Кекс Финансье","kz":"Кекс Финансье","en":"Кекс Финансье","price":2090,"id":"k_74"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Оригами»","kz":"Оригами»","en":"Оригами»","price":2690,"id":"k_75"},{"type":"kitchen","catRu":"ассорти","catKz":"Ассортилер","catEn":"ассорти","ru":"Полусфера»","kz":"Полусфера»","en":"Полусфера»","price":2990,"id":"k_76"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Red Bull","kz":"Red Bull","en":"Red Bull","price":1800,"id":"b_1"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Borjomi 0,5","kz":"Borjomi 0,5","en":"Borjomi 0,5","price":1600,"id":"b_2"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Vittel 0,5","kz":"Vittel 0,5","en":"Vittel 0,5","price":1500,"id":"b_3"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25","kz":"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25","en":"Coca Cola/ Sprite / Fanta / Coca Cola Zero 0,25","price":1300,"id":"b_4"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Perrier Naturel 0,33","kz":"Perrier Naturel 0,33","en":"Perrier Naturel 0,33","price":2000,"id":"b_5"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Swell 0,25","kz":"Swell 0,25","en":"Swell 0,25","price":2000,"id":"b_6"},{"type":"bar","catRu":"безалкогольные напитки","catKz":"Алкогольсіз сусындар","catEn":"безалкогольные напитки","ru":"Swell 0,75","kz":"Swell 0,75","en":"Swell 0,75","price":4000,"id":"b_7"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Espresso","kz":"Espresso","en":"Espresso","price":1100,"id":"b_8"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Latte","kz":"Latte","en":"Latte","price":1800,"id":"b_9"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Cappuccino","kz":"Cappuccino","en":"Cappuccino","price":1800,"id":"b_10"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Glasse","kz":"Glasse","en":"Glasse","price":1300,"id":"b_11"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Raf","kz":"Raf","en":"Raf","price":1400,"id":"b_12"},{"type":"bar","catRu":"Кофе","catKz":"Кофе","catEn":"Кофе","ru":"Irish coffee","kz":"Irish coffee","en":"Irish coffee","price":2100,"id":"b_13"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Black tea","kz":"Black tea","en":"Black tea","price":2000,"id":"b_14"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Green tea","kz":"Green tea","en":"Green tea","price":2000,"id":"b_15"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Shu puer","kz":"Shu puer","en":"Shu puer","price":2100,"id":"b_16"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Milk oolong","kz":"Milk oolong","en":"Milk oolong","price":2200,"id":"b_17"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Tashkent's Tea","kz":"Tashkent's Tea","en":"Tashkent's Tea","price":2700,"id":"b_18"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Marroccan Tea","kz":"Marroccan Tea","en":"Marroccan Tea","price":2600,"id":"b_19"},{"type":"bar","catRu":"Чай","catKz":"Чай","catEn":"Чай","ru":"Tea Of Wild Berryes","kz":"Tea Of Wild Berryes","en":"Tea Of Wild Berryes","price":2800,"id":"b_20"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Mango-Passion Fruit 1l","kz":"Mango-Passion Fruit 1l","en":"Mango-Passion Fruit 1l","price":3200,"id":"b_21"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Rasberry- Lychee 1l","kz":"Rasberry- Lychee 1l","en":"Rasberry- Lychee 1l","price":3200,"id":"b_22"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Kiwi- Green Apple 1l","kz":"Kiwi- Green Apple 1l","en":"Kiwi- Green Apple 1l","price":3200,"id":"b_23"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Pineapple-Grapefruit 1l","kz":"Pineapple-Grapefruit 1l","en":"Pineapple-Grapefruit 1l","price":3200,"id":"b_24"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Wild Berry 1l","kz":"Wild Berry 1l","en":"Wild Berry 1l","price":3200,"id":"b_25"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Homemade Limonade 1l","kz":"Homemade Limonade 1l","en":"Homemade Limonade 1l","price":3200,"id":"b_26"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Pomegranate- Lime 1l","kz":"Pomegranate- Lime 1l","en":"Pomegranate- Lime 1l","price":3200,"id":"b_27"},{"type":"bar","catRu":"Лимонады","catKz":"Лимонадтар","catEn":"Лимонады","ru":"Elderflower-Lychee 1l","kz":"Elderflower-Lychee 1l","en":"Elderflower-Lychee 1l","price":3200,"id":"b_28"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Long Island Ice Tea","kz":"Long Island Ice Tea","en":"Long Island Ice Tea","price":3850,"id":"b_29"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Aperol Spritz","kz":"Aperol Spritz","en":"Aperol Spritz","price":3500,"id":"b_30"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Virgin Blood","kz":"Virgin Blood","en":"Virgin Blood","price":3500,"id":"b_31"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Pandora","kz":"Pandora","en":"Pandora","price":3500,"id":"b_32"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Stirling","kz":"Stirling","en":"Stirling","price":3500,"id":"b_33"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Clover Club","kz":"Clover Club","en":"Clover Club","price":3500,"id":"b_34"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Stuart","kz":"Stuart","en":"Stuart","price":3500,"id":"b_35"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Kirke","kz":"Kirke","en":"Kirke","price":3500,"id":"b_36"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Bloody Mary","kz":"Bloody Mary","en":"Bloody Mary","price":3500,"id":"b_37"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"New York Sour","kz":"New York Sour","en":"New York Sour","price":3500,"id":"b_38"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Boulevardier","kz":"Boulevardier","en":"Boulevardier","price":3500,"id":"b_39"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Margarita","kz":"Margarita","en":"Margarita","price":3500,"id":"b_40"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Old Fashioned","kz":"Old Fashioned","en":"Old Fashioned","price":3500,"id":"b_41"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"French 75","kz":"French 75","en":"French 75","price":3500,"id":"b_42"},{"type":"bar","catRu":"Коктейли","catKz":"Коктейльдер","catEn":"Коктейли","ru":"Manhattan","kz":"Manhattan","en":"Manhattan","price":3500,"id":"b_43"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Blue","kz":"Absolut Blue","en":"Absolut Blue","price":2200,"id":"b_44"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Citron","kz":"Absolut Citron","en":"Absolut Citron","price":2200,"id":"b_45"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Kurant","kz":"Absolut Kurant","en":"Absolut Kurant","price":2200,"id":"b_46"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Vanilia","kz":"Absolut Vanilia","en":"Absolut Vanilia","price":2200,"id":"b_47"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Grapefruit","kz":"Absolut Grapefruit","en":"Absolut Grapefruit","price":2200,"id":"b_48"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Lime","kz":"Absolut Lime","en":"Absolut Lime","price":2200,"id":"b_49"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Mango","kz":"Absolut Mango","en":"Absolut Mango","price":2200,"id":"b_50"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Pears","kz":"Absolut Pears","en":"Absolut Pears","price":2200,"id":"b_51"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Passionfruit","kz":"Absolut Passionfruit","en":"Absolut Passionfruit","price":2200,"id":"b_52"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Absolut Elyx","kz":"Absolut Elyx","en":"Absolut Elyx","price":2600,"id":"b_53"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Wyborowa","kz":"Wyborowa","en":"Wyborowa","price":2000,"id":"b_54"},{"type":"bar","catRu":"Bодка","catKz":"Арақ","catEn":"Bодка","ru":"Jägermeister","kz":"Jägermeister","en":"Jägermeister","price":2100,"id":"b_55"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Malibu 2 0 00 Havana Club 3yo","kz":"Malibu 2 0 00 Havana Club 3yo","en":"Malibu 2 0 00 Havana Club 3yo","price":2100,"id":"b_56"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Havana Club 7yo","kz":"Havana Club 7yo","en":"Havana Club 7yo","price":2400,"id":"b_57"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Havana Club Especial Plus","kz":"Havana Club Especial Plus","en":"Havana Club Especial Plus","price":2100,"id":"b_58"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Baileys 2","kz":"Baileys 2","en":"Baileys 2","price":300,"id":"b_59"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Havana Club Cuban Spiced","kz":"Havana Club Cuban Spiced","en":"Havana Club Cuban Spiced","price":2300,"id":"b_60"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Beefeater","kz":"Beefeater","en":"Beefeater","price":2100,"id":"b_61"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Ararat 5yo 1600 Beefeater Blood Orange","kz":"Ararat 5yo 1600 Beefeater Blood Orange","en":"Ararat 5yo 1600 Beefeater Blood Orange","price":1800,"id":"b_62"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Ararat АНИ 7yo 2900 Beefeater Pink Blackberry","kz":"Ararat АНИ 7yo 2900 Beefeater Pink Blackberry","en":"Ararat АНИ 7yo 2900 Beefeater Pink Blackberry","price":1800,"id":"b_63"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Ararat Akhtamar 10yo 3500 Monkey 47","kz":"Ararat Akhtamar 10yo 3500 Monkey 47","en":"Ararat Akhtamar 10yo 3500 Monkey 47","price":3500,"id":"b_64"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Martell Vs","kz":"Martell Vs","en":"Martell Vs","price":3500,"id":"b_65"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Martell Vsop","kz":"Martell Vsop","en":"Martell Vsop","price":5500,"id":"b_66"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Martell Xo","kz":"Martell Xo","en":"Martell Xo","price":10500,"id":"b_67"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Olmeca Blanco","kz":"Olmeca Blanco","en":"Olmeca Blanco","price":2100,"id":"b_68"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Olmeca Gold","kz":"Olmeca Gold","en":"Olmeca Gold","price":2300,"id":"b_69"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Avion Silver","kz":"Avion Silver","en":"Avion Silver","price":4000,"id":"b_70"},{"type":"bar","catRu":"Ликеры","catKz":"Ликеры","catEn":"Ликеры","ru":"Avion Reposado","kz":"Avion Reposado","en":"Avion Reposado","price":4300,"id":"b_71"},{"type":"bar","catRu":"пиво","catKz":"Сыра","catEn":"пиво","ru":"Bud Guiness Can`d Draught","kz":"Bud Guiness Can`d Draught","en":"Bud Guiness Can`d Draught","price":2800,"id":"b_72"},{"type":"bar","catRu":"пиво","catKz":"Сыра","catEn":"пиво","ru":"Praga Corona Extra","kz":"Praga Corona Extra","en":"Praga Corona Extra","price":2200,"id":"b_73"},{"type":"bar","catRu":"пиво","catKz":"Сыра","catEn":"пиво","ru":"Miller","kz":"Miller","en":"Miller","price":2100,"id":"b_74"},{"type":"bar","catRu":"пиво","catKz":"Сыра","catEn":"пиво","ru":"Heineken","kz":"Heineken","en":"Heineken","price":2600,"id":"b_75"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Виски Односолодовые","kz":"Виски Односолодовые","en":"Виски Односолодовые","price":4000,"id":"b_76"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson Original 2 2 00 Method and Madness Single Grain","kz":"Jameson Original 2 2 00 Method and Madness Single Grain","en":"Jameson Original 2 2 00 Method and Madness Single Grain","price":2400,"id":"b_77"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson Black Barrel 2300 Four Roses","kz":"Jameson Black Barrel 2300 Four Roses","en":"Jameson Black Barrel 2300 Four Roses","price":2000,"id":"b_78"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson Crested","kz":"Jameson Crested","en":"Jameson Crested","price":2300,"id":"b_79"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson IPA","kz":"Jameson IPA","en":"Jameson IPA","price":2300,"id":"b_80"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson Cold Brew","kz":"Jameson Cold Brew","en":"Jameson Cold Brew","price":2300,"id":"b_81"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jameson Orange","kz":"Jameson Orange","en":"Jameson Orange","price":2300,"id":"b_82"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Вермуты","kz":"Вермуты","en":"Вермуты","price":2000,"id":"b_83"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Martini Bianco","kz":"Martini Bianco","en":"Martini Bianco","price":2000,"id":"b_84"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Martini Rosso","kz":"Martini Rosso","en":"Martini Rosso","price":2000,"id":"b_85"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Martini Extra dry","kz":"Martini Extra dry","en":"Martini Extra dry","price":2000,"id":"b_86"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Martini Reserva Bitter","kz":"Martini Reserva Bitter","en":"Martini Reserva Bitter","price":2000,"id":"b_87"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Campo Viejo Tempranillo","kz":"Campo Viejo Tempranillo","en":"Campo Viejo Tempranillo","price":12000,"id":"b_88"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Campo Viejo Blanco","kz":"Campo Viejo Blanco","en":"Campo Viejo Blanco","price":12000,"id":"b_89"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Campo Viejo Reserva","kz":"Campo Viejo Reserva","en":"Campo Viejo Reserva","price":16500,"id":"b_90"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Campo Viejo Gran Reserva","kz":"Campo Viejo Gran Reserva","en":"Campo Viejo Gran Reserva","price":22000,"id":"b_91"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"770 Miles Chardonnay Бел.Сух","kz":"770 Miles Chardonnay Бел.Сух","en":"770 Miles Chardonnay Бел.Сух","price":16000,"id":"b_92"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"770 Miles Cabernet Sauvignon Крас.Сух.","kz":"770 Miles Cabernet Sauvignon Крас.Сух.","en":"770 Miles Cabernet Sauvignon Крас.Сух.","price":16000,"id":"b_93"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Bistrot Chic (Merlot Cabernet Syrah) Красное Полусухое","kz":"Bistrot Chic (Merlot Cabernet Syrah) Красное Полусухое","en":"Bistrot Chic (Merlot Cabernet Syrah) Красное Полусухое","price":21000,"id":"b_94"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Zenato Lugana Doc \"San Benedetto\" Белое Полусухое","kz":"Zenato Lugana Doc \"San Benedetto\" Белое Полусухое","en":"Zenato Lugana Doc \"San Benedetto\" Белое Полусухое","price":42000,"id":"b_95"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Viajero Sauvingnon Blanc Semi Sweet","kz":"Viajero Sauvingnon Blanc Semi Sweet","en":"Viajero Sauvingnon Blanc Semi Sweet","price":12000,"id":"b_96"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Viajero Cabernet Sauvingnon Semi Sweet","kz":"Viajero Cabernet Sauvingnon Semi Sweet","en":"Viajero Cabernet Sauvingnon Semi Sweet","price":12000,"id":"b_97"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"I Balzi Shiraz Terre Siciliane Igt Красное Сухое","kz":"I Balzi Shiraz Terre Siciliane Igt Красное Сухое","en":"I Balzi Shiraz Terre Siciliane Igt Красное Сухое","price":24000,"id":"b_98"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Cune Rioja Blanco Semidulce Белое Полусладкое","kz":"Cune Rioja Blanco Semidulce Белое Полусладкое","en":"Cune Rioja Blanco Semidulce Белое Полусладкое","price":18000,"id":"b_99"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Poggio Alla Guardia Maremma Toscana Красное Сухое","kz":"Poggio Alla Guardia Maremma Toscana Красное Сухое","en":"Poggio Alla Guardia Maremma Toscana Красное Сухое","price":36000,"id":"b_100"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Marlborough Sun Sauvignon Blanc Белое Сухое","kz":"Marlborough Sun Sauvignon Blanc Белое Сухое","en":"Marlborough Sun Sauvignon Blanc Белое Сухое","price":21000,"id":"b_101"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Sirius Bordeaux Blc Белое Сухое","kz":"Sirius Bordeaux Blc Белое Сухое","en":"Sirius Bordeaux Blc Белое Сухое","price":18000,"id":"b_102"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Château Haut-Mondain Moelleux Белое Полусладкое","kz":"Château Haut-Mondain Moelleux Белое Полусладкое","en":"Château Haut-Mondain Moelleux Белое Полусладкое","price":18000,"id":"b_103"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Lamblin Muscat Вино Белое Сухое","kz":"Lamblin Muscat Вино Белое Сухое","en":"Lamblin Muscat Вино Белое Сухое","price":27000,"id":"b_104"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Marlborough Sun Pinot Noir Красное Сухое","kz":"Marlborough Sun Pinot Noir Красное Сухое","en":"Marlborough Sun Pinot Noir Красное Сухое","price":22000,"id":"b_105"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Villa Cardini Chianti Красное, Сухое","kz":"Villa Cardini Chianti Красное, Сухое","en":"Villa Cardini Chianti Красное, Сухое","price":31000,"id":"b_106"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Montelvini Asolo Prosecco Brut","kz":"Montelvini Asolo Prosecco Brut","en":"Montelvini Asolo Prosecco Brut","price":26000,"id":"b_107"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Signore Giuseppe Prosecco Spumante Extra Dry","kz":"Signore Giuseppe Prosecco Spumante Extra Dry","en":"Signore Giuseppe Prosecco Spumante Extra Dry","price":20000,"id":"b_108"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Jacob’s Creek Sparkling Moscato","kz":"Jacob’s Creek Sparkling Moscato","en":"Jacob’s Creek Sparkling Moscato","price":21000,"id":"b_109"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Santo Stefano","kz":"Santo Stefano","en":"Santo Stefano","price":10000,"id":"b_110"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Cаfe De Paris Rose","kz":"Cаfe De Paris Rose","en":"Cаfe De Paris Rose","price":17000,"id":"b_111"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"G.H.Mumm Cordon Rouge Brut","kz":"G.H.Mumm Cordon Rouge Brut","en":"G.H.Mumm Cordon Rouge Brut","price":41000,"id":"b_112"},{"type":"bar","catRu":"виски","catKz":"Виски","catEn":"виски","ru":"Martini ASTI DOCG","kz":"Martini ASTI DOCG","en":"Martini ASTI DOCG","price":16200,"id":"b_113"}];

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
