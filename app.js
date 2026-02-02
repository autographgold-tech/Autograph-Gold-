const PHONE = "77010322021";
const STORAGE_KEY = "autograph_cart_v3";

let currentType = "kitchen"; // kitchen | bar
let currentLang = "ru";      // ru | kz
let cart = loadCart();

const menuEl = document.getElementById("menuList");
const cartBar = document.getElementById("cartBar");
const cartSummary = document.getElementById("cartSummary");
const cartModal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const totalSum = document.getElementById("totalSum");
const searchEl = document.getElementById("search");
const cartDesktop = document.getElementById("cartDesktop");
const commentEl = document.getElementById("comment");

/* ===== i18n UI ===== */
const I18N = {
  ru: {
    kitchen: "Кухня",
    bar: "Бар",
    search: "Поиск по меню...",
    cart: "Корзина",
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

/* ===== MENU (Кухня + Бар) ===== */
/**
 * Поля:
 *  - id, type: kitchen|bar, catRu, catKz, ru, kz, price, note(optional)
 */
const MENU = [
  /* ===== КУХНЯ ===== */
  // Салаты
  {id:"k_sal_1", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Бакетбитс", kz:"Бакетбитс", price:3290},
  {id:"k_sal_2", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Салат гарден фитнес", kz:"Гарден фитнес салаты", price:3990},
  {id:"k_sal_3", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Салат страчателла", kz:"Страчателла салаты", price:5190},
  {id:"k_sal_4", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Итальянский сыр Буррата", kz:"Буррата Итальяндық ірімшігі", price:5990},
  {id:"k_sal_5", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Салат оберджин", kz:"Оберджин салаты", price:3890},
  {id:"k_sal_6", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Салат руккола с тунцом", kz:"Тунец қосылған руккола салаты", price:3590},
  {id:"k_sal_7", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Цезарь с креветками", kz:"Асшаяндар қосылған цезарь салаты", price:4990},
  {id:"k_sal_8", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Цезарь с куриным филе", kz:"Тауық еті қосылған Цезарь", price:3490},
  {id:"k_sal_9", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Салат греческий", kz:"Грек салаты", price:2990},
  {id:"k_sal_10", type:"kitchen", catRu:"Салаты", catKz:"Салаттар", ru:"Легкий салат с креветками и апельсинами", kz:"Асшаяндар және апельсин қосылған жеңіл салат", price:4990},

  // Супы (страницы 4–5)
  {id:"k_soup_1", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Министроне", kz:"Министроне", price:2990},
  {id:"k_soup_2", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Том ям", kz:"Том ям", price:3990},
  {id:"k_soup_3", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Кукси", kz:"Кукси", price:3590},
  {id:"k_soup_4", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Окрошка", kz:"Окрошка", price:2590},
  {id:"k_soup_5", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Рамен с мясом", kz:"Ет қосылған рамен", price:2990},
  {id:"k_soup_6", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Лапша по-домашнему", kz:"Үй кеспесі", price:3590},
  {id:"k_soup_7", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Солянка", kz:"Солянка", price:3390},
  {id:"k_soup_8", type:"kitchen", catRu:"Супы", catKz:"Сорпалар", ru:"Чечевичный крем-суп", kz:"Жасымық крем-сорпа", price:2590},

  // Горячие блюда (страницы 6–8)
  {id:"k_hot_1", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Запечённый сибас по-британски", kz:"Британша көмбештелген теңіз алабұғасы", price:3890},
  {id:"k_hot_2", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Куриный рулет с сыром", kz:"Іріміші қосылған тауық орамасы", price:4990},
  {id:"k_hot_3", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Курица в кисло-сладком соусе", kz:"Тәтті қышқыл соустағы тауық еті", price:5990},
  {id:"k_hot_4", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Дуэт семги и судака", kz:"Ақсерке мен көксерке дуэті", price:7290},
  {id:"k_hot_5", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Перепелка в сливочном соусе", kz:"Кілегей соусындағы бөдене", price:4590},
  {id:"k_hot_6", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Лосось в английском стиле", kz:"Ағылшынша албырты", price:7990},
  {id:"k_hot_7", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Форель жареная по-английски", kz:"Ағылшынша қуырылған бақтақ", price:6890},
  {id:"k_hot_8", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Дорадо", kz:"Дорадо", price:6990},
  {id:"k_hot_9", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Куриное филе с кремом из брокколи", kz:"Брокколи креммен тауық сүбесі", price:7990},
  {id:"k_hot_10", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Филе миньон на подушке из шпината в ягодном соусе", kz:"Саумалдық жастықшасындағы жеміс соусымен миньон сүбесі", price:8990},
  {id:"k_hot_11", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Каре ягненка в фисташковой панировке", kz:"Пісте панировкадағы бағлан қабырғасы", price:8590},
  {id:"k_hot_12", type:"kitchen", catRu:"Горячие блюда", catKz:"Ыстық тағамдар", ru:"Судак запеченый со шпинатом", kz:"Саумалдық қосылған көмбештелген көксерке", price:8790},

  // Пасты (стр. 9)
  {id:"k_pasta_1", type:"kitchen", catRu:"Пасты", catKz:"Пасталар", ru:"Фетучини Альфредо", kz:"Фетучини Альфредо", price:3990},
  {id:"k_pasta_2", type:"kitchen", catRu:"Пасты", catKz:"Пасталар", ru:"Фетучини с песто и семгой", kz:"Фетучини (песто және албырт)", price:4990},
  {id:"k_pasta_3", type:"kitchen", catRu:"Пасты", catKz:"Пасталар", ru:"Де море", kz:"Де море", price:3990},
  {id:"k_pasta_4", type:"kitchen", catRu:"Пасты", catKz:"Пасталар", ru:"Спагетти с говядиной", kz:"Сиыр еті бар спагетти", price:4190},

  // Гриль (стр. 10)
  {id:"k_grill_1", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Стейк рибай", kz:"Рибай стейк", price:7990},
  {id:"k_grill_2", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Стейк T-Bone", kz:"T-Bone стейк", price:9590},
  {id:"k_grill_3", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Стейк Томагавк", kz:"Томагавк стейк", price:14990},
  {id:"k_grill_4", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Пеппер стейк в сливочном соусе", kz:"Кілегей соусындағы пеппер стейк", price:7890},
  {id:"k_grill_5", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Куриное филе на гриле в сливочном соусе", kz:"Гриль тауық сүбесі (кілегей соус)", price:6990},
  {id:"k_grill_6", type:"kitchen", catRu:"Блюда на гриле", catKz:"Грильдегі тағамдар", ru:"Цыпленок с бейби картофелем", kz:"Бейби картоппен цыпленок", price:6990},

  // Сеты (стр. 11–12)
  {id:"k_set_1", type:"kitchen", catRu:"Сеты на компанию", catKz:"Компаниядағы жинақтар", ru:"Гай ричи (на 6 персон)", kz:"Гай ричи (6 адамға)", price:32990},
  {id:"k_set_2", type:"kitchen", catRu:"Сеты на компанию", catKz:"Компаниядағы жинақтар", ru:"Гриль микс (на 8 персон)", kz:"Гриль микс (8 адамға)", price:42990},
  {id:"k_set_3", type:"kitchen", catRu:"Сеты на компанию", catKz:"Компаниядағы жинақтар", ru:"Мясная лавка (на 8 персон)", kz:"Мясная лавка (8 адамға)", price:38990},
  {id:"k_set_4", type:"kitchen", catRu:"Сеты на компанию", catKz:"Компаниядағы жинақтар", ru:"Роял ростер", kz:"Роял ростер", price:32990},

  // Пивные сеты (стр. 12)
  {id:"k_beer_1", type:"kitchen", catRu:"Пивные сеты", catKz:"Пивные сеты", ru:"Пивной сет 1", kz:"Сыра сет 1", price:5990},
  {id:"k_beer_2", type:"kitchen", catRu:"Пивные сеты", catKz:"Пивные сеты", ru:"Пивной сет 2", kz:"Сыра сет 2", price:7990},
  {id:"k_beer_3", type:"kitchen", catRu:"Пивные сеты", catKz:"Пивные сеты", ru:"Пивной сет VIP", kz:"Пивной сет VIP", price:9990},

  // Суши и роллы (стр. 13)
  {id:"k_sushi_1", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Жаренный ролл Америка", kz:"Жарылған ролл Америка", price:3990},
  {id:"k_sushi_2", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Жаренный ролл Кани хотто", kz:"Жарылған ролл Кани хотто", price:2990},
  {id:"k_sushi_3", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Жаренный ролл Эби хотто", kz:"Жарылған ролл Эби хотто", price:4290},
  {id:"k_sushi_4", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Жаренный ролл Цезарь", kz:"Жарылған ролл Цезарь", price:2990},
  {id:"k_sushi_5", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Запеченный ролл Банзай", kz:"Пісірілген ролл Банзай", price:4390},
  {id:"k_sushi_6", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Ролл Аляска", kz:"Аляска роллы", price:4990},
  {id:"k_sushi_7", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Ролл Саке маки", kz:"Саке маки роллы", price:2990},
  {id:"k_sushi_8", type:"kitchen", catRu:"Суши и роллы", catKz:"Суши және ролы", ru:"Ролл Филадельфия", kz:"Филадельфия роллы", price:3890},
  {id:"k_sushi_9", type:"kitchen", catRu:"Суши", catKz:"Суши", ru:"Суши Саке", kz:"Саке суши", price:1990},
  {id:"k_sushi_10", type:"kitchen", catRu:"Суши", catKz:"Суши", ru:"Суши Унаги", kz:"Унаги суши", price:1890},
  {id:"k_sushi_11", type:"kitchen", catRu:"Суши", catKz:"Суши", ru:"Суши Эби", kz:"Эби суши", price:1790},

  // Холодные закуски (стр. 14–15)
  {id:"k_cold_1", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Рыбное ассорти", kz:"Балық ассорти", price:10990},
  {id:"k_cold_2", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Сырное ассорти", kz:"Ірімшік ассорти", price:9990},
  {id:"k_cold_3", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Капрезе", kz:"Капрезе", price:2990},
  {id:"k_cold_4", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Рулетики из баклажан с грецкими орехами", kz:"Жаңғақ қосылған баклажан орамшалар", price:2990},
  {id:"k_cold_5", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Разносолы", kz:"Тұздамалар", price:3590},
  {id:"k_cold_6", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Конское ассорти", kz:"Жылқы ассорти", price:3590},
  {id:"k_cold_7", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Кавказское ассорти", kz:"Кавказ ассорти", price:3590},
  {id:"k_cold_8", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Русская закуска", kz:"Орыс дәмтағамы", price:3590},
  {id:"k_cold_9", type:"kitchen", catRu:"Холодные закуски", catKz:"Суық тіскебасар", ru:"Эна (язык с ореховой начинкой)", kz:"Эна", price:3990},

  // Горячие закуски (стр. 16) — порядок по PDF может отличаться, но цены совпадают
  {id:"k_hotapp_1", type:"kitchen", catRu:"Горячие закуски", catKz:"Ыстық тәбестер", ru:"Кости мозговые говяжьи", kz:"Сиырдың ми сүйектері", price:1990},
  {id:"k_hotapp_2", type:"kitchen", catRu:"Горячие закуски", catKz:"Ыстық тәбестер", ru:"Чесночные гренки", kz:"Сарымсақпен қуырылған нан кесектері", price:1990},
  {id:"k_hotapp_3", type:"kitchen", catRu:"Горячие закуски", catKz:"Ыстық тәбестер", ru:"Ассорти колбасок", kz:"Шұжықтар ассорти", price:8990},
  {id:"k_hotapp_4", type:"kitchen", catRu:"Горячие закуски", catKz:"Ыстық тәбестер", ru:"Жареные тигровые креветки", kz:"Қуырылған жолбарыс асшаяндары", price:4990},

  // Гарниры (стр. 17)
  {id:"k_garn_1", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Спаржа", kz:"Спаржа", price:1990},
  {id:"k_garn_2", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Брокколи с чесноком", kz:"Сарымсақ қосылған брокколи", price:1490},
  {id:"k_garn_3", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Картофель фри", kz:"Фри картоп", price:1490},
  {id:"k_garn_4", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Картофельные дольки", kz:"Картоп тілімдері", price:1890},
  {id:"k_garn_5", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Рис", kz:"Күріш", price:1590},
  {id:"k_garn_6", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Рататуй", kz:"Рататуй", price:2590},
  {id:"k_garn_7", type:"kitchen", catRu:"Гарниры", catKz:"Гарнирлер", ru:"Овощи на гриле", kz:"Гриль көкөністер", price:2190},

  // Ассорти + Десерты (стр. 18)
  {id:"k_ass_1", type:"kitchen", catRu:"Ассорти", catKz:"Ассортилер", ru:"Фруктовое ассорти", kz:"Жеміс ассорти", price:9990},
  {id:"k_ass_2", type:"kitchen", catRu:"Ассорти", catKz:"Ассортилер", ru:"Хлебное ассорти", kz:"Нан ассорти", price:990},

  {id:"k_des_1", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Сердце", kz:"Жүрек", price:3390},
  {id:"k_des_2", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Фисташка", kz:"Пісте", price:3300},
  {id:"k_des_3", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Banoffee", kz:"Banoffee", price:4300},
  {id:"k_des_4", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Кекс Финансье", kz:"Финансье кексі", price:2090},
  {id:"k_des_5", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Оригами", kz:"Оригами", price:2690},
  {id:"k_des_6", type:"kitchen", catRu:"Десерты", catKz:"Десерттер", ru:"Полусфера", kz:"Жарты сфера", price:2990},

  /* ===== БАР ===== */
  // Безалкогольные (стр. 2)
  {id:"b_soft_1", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Red Bull", kz:"Red Bull", price:1800},
  {id:"b_soft_2", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Borjomi 0,5", kz:"Borjomi 0,5", price:1600},
  {id:"b_soft_3", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Vittel 0,5", kz:"Vittel 0,5", price:1500},
  {id:"b_soft_4", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Coca Cola / Sprite / Fanta / Coca Cola Zero 0,25", kz:"Coca Cola / Sprite / Fanta / Zero 0,25", price:1300},
  {id:"b_soft_5", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Perrier Naturel 0,33", kz:"Perrier Naturel 0,33", price:2000},
  {id:"b_soft_6", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Swell 0,25", kz:"Swell 0,25", price:2000},
  {id:"b_soft_7", type:"bar", catRu:"Безалкогольные напитки", catKz:"Алкогольсіз сусындар", ru:"Swell 0,75", kz:"Swell 0,75", price:4000},

  // Лимонады 1L (стр. 2)
  {id:"b_limo_1", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Mango-Passion Fruit 1l", kz:"Mango-Passion Fruit 1l", price:3200},
  {id:"b_limo_2", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Rasberry-Lychee 1l", kz:"Rasberry-Lychee 1l", price:3200},
  {id:"b_limo_3", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Kiwi-Green Apple 1l", kz:"Kiwi-Green Apple 1l", price:3200},
  {id:"b_limo_4", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Pineapple-Grapefruit 1l", kz:"Pineapple-Grapefruit 1l", price:3200},
  {id:"b_limo_5", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Wild Berry 1l", kz:"Wild Berry 1l", price:3200},
  {id:"b_limo_6", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Homemade Limonade 1l", kz:"Homemade Limonade 1l", price:3200},
  {id:"b_limo_7", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Pomegranate-Lime 1l", kz:"Pomegranate-Lime 1l", price:3200},
  {id:"b_limo_8", type:"bar", catRu:"Лимонады", catKz:"Лимонадтар", ru:"Elderflower-Lychee 1l", kz:"Elderflower-Lychee 1l", price:3200},

  // Кофе/Чай (стр. 2)
  {id:"b_cof_1", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Latte", kz:"Latte", price:1100},
  {id:"b_cof_2", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Cappuccino", kz:"Cappuccino", price:1800},
  {id:"b_cof_3", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Espresso", kz:"Espresso", price:1800},
  {id:"b_cof_4", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Glasse", kz:"Glasse", price:1300},
  {id:"b_cof_5", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Irish coffee", kz:"Irish coffee", price:1400},
  {id:"b_cof_6", type:"bar", catRu:"Кофе", catKz:"Кофе", ru:"Raf", kz:"Raf", price:2100},

  {id:"b_tea_1", type:"bar", catRu:"Чай", catKz:"Шай", ru:"Black tea", kz:"Қара шай", price:2000},
  {id:"b_tea_2", type:"bar", catRu:"Чай", catKz:"Шай", ru:"Green tea", kz:"Жасыл шай", price:2000},
  {id:"b_tea_3", type:"bar", catRu:"Авторские чаи", catKz:"Авторлық шайлар", ru:"Shu puer", kz:"Шу пуэр", price:2100},
  {id:"b_tea_4", type:"bar", catRu:"Авторские чаи", catKz:"Авторлық шайлар", ru:"Milk oolong", kz:"Milk oolong", price:2200},
  {id:"b_tea_5", type:"bar", catRu:"Авторские чаи", catKz:"Авторлық шайлар", ru:"Tashkent's Tea", kz:"Ташкент шайы", price:2700},
  {id:"b_tea_6", type:"bar", catRu:"Авторские чаи", catKz:"Авторлық шайлар", ru:"Marroccan Tea", kz:"Марокко шайы", price:2600},
  {id:"b_tea_7", type:"bar", catRu:"Авторские чаи", catKz:"Авторлық шайлар", ru:"Tea Of Wild Berryes", kz:"Жабайы жидек шайы", price:2800},

  // Коктейли (стр. 3)
  {id:"b_cock_1", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Long Island Ice Tea", kz:"Long Island Ice Tea", price:3850},
  {id:"b_cock_2", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Aperol Spritz Virgin Blood", kz:"Aperol Spritz Virgin Blood", price:3500},
  {id:"b_cock_3", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Pandora", kz:"Pandora", price:3500},
  {id:"b_cock_4", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Stirling", kz:"Stirling", price:3500},
  {id:"b_cock_5", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Clover Club", kz:"Clover Club", price:3500},
  {id:"b_cock_6", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Stuart", kz:"Stuart", price:3500},
  {id:"b_cock_7", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Kirke", kz:"Kirke", price:3500},
  {id:"b_cock_8", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Bloody Mary", kz:"Bloody Mary", price:3500},
  {id:"b_cock_9", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"New York Sour", kz:"New York Sour", price:3500},
  {id:"b_cock_10", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Boulevardier", kz:"Boulevardier", price:3500},
  {id:"b_cock_11", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Margarita", kz:"Margarita", price:3500},
  {id:"b_cock_12", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Old Fashioned", kz:"Old Fashioned", price:3500},
  {id:"b_cock_13", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"French 75", kz:"French 75", price:3500},
  {id:"b_cock_14", type:"bar", catRu:"Коктейли", catKz:"Коктейльдер", ru:"Manhattan", kz:"Manhattan", price:3500},

  // Водка (стр. 3) — за 50 мл
  {id:"b_vod_1", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Blue", kz:"Absolut Blue", price:2200},
  {id:"b_vod_2", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Citron", kz:"Absolut Citron", price:2200},
  {id:"b_vod_3", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Kurant", kz:"Absolut Kurant", price:2200},
  {id:"b_vod_4", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Vanilla", kz:"Absolut Vanilla", price:2200},
  {id:"b_vod_5", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Grapefruit", kz:"Absolut Grapefruit", price:2200},
  {id:"b_vod_6", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Lime", kz:"Absolut Lime", price:2200},
  {id:"b_vod_7", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Mango", kz:"Absolut Mango", price:2200},
  {id:"b_vod_8", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Pears", kz:"Absolut Pears", price:2200},
  {id:"b_vod_9", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Passionfruit", kz:"Absolut Passionfruit", price:2200},
  {id:"b_vod_10", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Absolut Elyx", kz:"Absolut Elyx", price:2600},
  {id:"b_vod_11", type:"bar", catRu:"Водка (50 мл)", catKz:"Арақ (50 мл)", ru:"Wyborowa", kz:"Wyborowa", price:2000},
  {id:"b_vod_12", type:"bar", catRu:"Шоты", catKz:"Шоттар", ru:"Ice Cold Shot -18°C: Jägermeister", kz:"Ice Cold Shot -18°C: Jägermeister", price:2100},

  // Ром (стр. 4) — за 50 мл
  {id:"b_rum_1", type:"bar", catRu:"Ром (50 мл)", catKz:"Ром (50 мл)", ru:"Havana Club 3yo", kz:"Havana Club 3yo", price:2000},
  {id:"b_rum_2", type:"bar", catRu:"Ром (50 мл)", catKz:"Ром (50 мл)", ru:"Havana Club 7yo", kz:"Havana Club 7yo", price:1800},
  {id:"b_rum_3", type:"bar", catRu:"Ром (50 мл)", catKz:"Ром (50 мл)", ru:"Havana Club Especial", kz:"Havana Club Especial", price:2000},
  {id:"b_rum_4", type:"bar", catRu:"Ром (50 мл)", catKz:"Ром (50 мл)", ru:"Havana Club Cuban Spiced", kz:"Havana Club Cuban Spiced", price:2300},

  // Ликеры (стр. 4) — за 50 мл
  {id:"b_lik_1", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Malibu", kz:"Malibu", price:2000},
  {id:"b_lik_2", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Becherovka", kz:"Becherovka", price:2300},
  {id:"b_lik_3", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Kahlua", kz:"Kahlua", price:2500},
  {id:"b_lik_4", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Baileys", kz:"Baileys", price:2100},
  {id:"b_lik_5", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Absinthe Tunel Black", kz:"Absinthe Tunel Black", price:2200},
  {id:"b_lik_6", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Sambuca Extra Molinari", kz:"Sambuca Extra Molinari", price:1600},
  {id:"b_lik_7", type:"bar", catRu:"Ликеры (50 мл)", catKz:"Ликерлер (50 мл)", ru:"Limoncello", kz:"Limoncello", price:2900},

  // Пиво (стр. 4)
  {id:"b_beer_1", type:"bar", catRu:"Пиво разливное", catKz:"Құйма сыра", ru:"Bud", kz:"Bud", price:1400},
  {id:"b_beer_2", type:"bar", catRu:"Пиво разливное", catKz:"Құйма сыра", ru:"Praga", kz:"Praga", price:2800},
  {id:"b_beer_3", type:"bar", catRu:"Пиво бутылочное", catKz:"Бөтелкедегі сыра", ru:"Guinness Can’d Draught", kz:"Guinness Can’d Draught", price:2200},
  {id:"b_beer_4", type:"bar", catRu:"Пиво бутылочное", catKz:"Бөтелкедегі сыра", ru:"Corona Extra", kz:"Corona Extra", price:2100},
  {id:"b_beer_5", type:"bar", catRu:"Пиво бутылочное", catKz:"Бөтелкедегі сыра", ru:"Miller", kz:"Miller", price:2600},
  {id:"b_beer_6", type:"bar", catRu:"Пиво бутылочное", catKz:"Бөтелкедегі сыра", ru:"Heineken", kz:"Heineken", price:2600},

  // Коньяк (стр. 4) — за 50 мл
  {id:"b_cog_1", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Ararat 5yo", kz:"Ararat 5yo", price:3500},
  {id:"b_cog_2", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Ararat ANI 7yo", kz:"Ararat ANI 7yo", price:5500},
  {id:"b_cog_3", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Ararat Akhtamar 10yo", kz:"Ararat Akhtamar 10yo", price:10500},
  {id:"b_cog_4", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Martell VS", kz:"Martell VS", price:2100},
  {id:"b_cog_5", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Martell VSOP", kz:"Martell VSOP", price:2300},
  {id:"b_cog_6", type:"bar", catRu:"Коньяк (50 мл)", catKz:"Коньяк (50 мл)", ru:"Martell XO", kz:"Martell XO", price:4000},

  // Джин (стр. 4) — за 50 мл
  {id:"b_gin_1", type:"bar", catRu:"Джин (50 мл)", catKz:"Джин (50 мл)", ru:"Beefeater", kz:"Beefeater", price:4300},
  {id:"b_gin_2", type:"bar", catRu:"Джин (50 мл)", catKz:"Джин (50 мл)", ru:"Beefeater Blackberry", kz:"Beefeater Blackberry", price:2100},
  {id:"b_gin_3", type:"bar", catRu:"Джин (50 мл)", catKz:"Джин (50 мл)", ru:"Beefeater Blood Orange", kz:"Beefeater Blood Orange", price:2400},
  {id:"b_gin_4", type:"bar", catRu:"Джин (50 мл)", catKz:"Джин (50 мл)", ru:"Beefeater Pink Blackberry", kz:"Beefeater Pink Blackberry", price:2100},
  {id:"b_gin_5", type:"bar", catRu:"Джин (50 мл)", catKz:"Джин (50 мл)", ru:"Monkey 47", kz:"Monkey 47", price:2300},

  // Текила (стр. 4) — за 50 мл
  {id:"b_teq_1", type:"bar", catRu:"Текила (50 мл)", catKz:"Текила (50 мл)", ru:"Olmeca Blanco", kz:"Olmeca Blanco", price:1800},
  {id:"b_teq_2", type:"bar", catRu:"Текила (50 мл)", catKz:"Текила (50 мл)", ru:"Olmeca Gold", kz:"Olmeca Gold", price:1800},
  {id:"b_teq_3", type:"bar", catRu:"Текила (50 мл)", catKz:"Текила (50 мл)", ru:"Avion Silver", kz:"Avion Silver", price:1800},
  {id:"b_teq_4", type:"bar", catRu:"Текила (50 мл)", catKz:"Текила (50 мл)", ru:"Avion Reposado", kz:"Avion Reposado", price:3500},

  // Виски + вермут + вино (стр. 5–6)
  {id:"b_wh_1", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"The Glenlivet Found Reserve", kz:"The Glenlivet Found Reserve", price:3000},
  {id:"b_wh_2", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"The Glenlivet 12yo Excellence", kz:"The Glenlivet 12yo Excellence", price:5000},
  {id:"b_wh_3", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"The Glenlivet French 15YO", kz:"The Glenlivet French 15YO", price:7100},
  {id:"b_wh_4", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"The Glenlivet 18YO", kz:"The Glenlivet 18YO", price:10000},
  {id:"b_wh_5", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson Original", kz:"Jameson Original", price:5300},
  {id:"b_wh_6", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson Black Barrel", kz:"Jameson Black Barrel", price:8000},
  {id:"b_wh_7", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson Crested", kz:"Jameson Crested", price:3000},
  {id:"b_wh_8", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson IPA", kz:"Jameson IPA", price:5000},
  {id:"b_wh_9", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson Cold Brew", kz:"Jameson Cold Brew", price:4000},
  {id:"b_wh_10", type:"bar", catRu:"Виски (ирландский)", catKz:"Виски (ирланд)", ru:"Jameson Orange", kz:"Jameson Orange", price:2000},

  {id:"b_sc_1", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Chivas Regal 12YO", kz:"Chivas Regal 12YO", price:1900},
  {id:"b_sc_2", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Chivas Regal 18YO", kz:"Chivas Regal 18YO", price:2200},
  {id:"b_sc_3", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Chivas Regal Extra", kz:"Chivas Regal Extra", price:2200},
  {id:"b_sc_4", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Ballantine's Finest", kz:"Ballantine's Finest", price:2300},
  {id:"b_sc_5", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Ballantine's Passion", kz:"Ballantine's Passion", price:2300},
  {id:"b_sc_6", type:"bar", catRu:"Виски (шотландский)", catKz:"Виски (шотланд)", ru:"Ballantine’s 7yo", kz:"Ballantine’s 7yo", price:2300},

  {id:"b_us_1", type:"bar", catRu:"Виски (американский)", catKz:"Виски (америка)", ru:"Method and Madness Single Grain", kz:"Method and Madness Single Grain", price:2300},
  {id:"b_us_2", type:"bar", catRu:"Виски (американский)", catKz:"Виски (америка)", ru:"Four Roses", kz:"Four Roses", price:2400},

  {id:"b_malt_1", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"Aberlour 12YO", kz:"Aberlour 12YO", price:2000},
  {id:"b_malt_2", type:"bar", catRu:"Виски (односолодовый)", catKz:"Виски (бір уытты)", ru:"Aberlour 14YO", kz:"Aberlour 14YO", price:2000},

  // Вермуты (стр. 5) — за 50 мл
  {id:"b_ver_1", type:"bar", catRu:"Вермуты (50 мл)", catKz:"Вермут (50 мл)", ru:"Martini Bianco", kz:"Martini Bianco", price:2000},
  {id:"b_ver_2", type:"bar", catRu:"Вермуты (50 мл)", catKz:"Вермут (50 мл)", ru:"Martini Rosso", kz:"Martini Rosso", price:2000},
  {id:"b_ver_3", type:"bar", catRu:"Вермуты (50 мл)", catKz:"Вермут (50 мл)", ru:"Martini Extra Dry", kz:"Martini Extra Dry", price:2000},
  {id:"b_ver_4", type:"bar", catRu:"Вермуты (50 мл)", catKz:"Вермут (50 мл)", ru:"Martini Reserva Bitter", kz:"Martini Reserva Bitter", price:2000},

  // Игристое (стр. 6)
  {id:"b_sp_1", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Montelvini Asolo Prosecco Brut", kz:"Montelvini Asolo Prosecco Brut", price:26000},
  {id:"b_sp_2", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Signore Giuseppe Prosecco Spumante Extra Dry", kz:"Signore Giuseppe Prosecco Spumante Extra Dry", price:20000},
  {id:"b_sp_3", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Jacob’s Creek Sparkling Moscato", kz:"Jacob’s Creek Sparkling Moscato", price:21000},
  {id:"b_sp_4", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Santo Stefano", kz:"Santo Stefano", price:10000},
  {id:"b_sp_5", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Cafe De Paris Rose", kz:"Cafe De Paris Rose", price:17000},
  {id:"b_sp_6", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"G.H.Mumm Cordon Rouge Brut", kz:"G.H.Mumm Cordon Rouge Brut", price:41000},
  {id:"b_sp_7", type:"bar", catRu:"Игристое вино", catKz:"Жарқыраған шарап", ru:"Martini ASTI DOCG", kz:"Martini ASTI DOCG", price:16200},

  // Вино (стр. 6)
  {id:"b_w_1", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Campo Viejo Tempranillo", kz:"Campo Viejo Tempranillo", price:12000},
  {id:"b_w_2", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Campo Viejo Blanco", kz:"Campo Viejo Blanco", price:12000},
  {id:"b_w_3", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Campo Viejo Reserva", kz:"Campo Viejo Reserva", price:16500},
  {id:"b_w_4", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Campo Viejo Gran Reserva", kz:"Campo Viejo Gran Reserva", price:22000},
  {id:"b_w_5", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"770 Miles Chardonnay (бел. сух.)", kz:"770 Miles Chardonnay", price:16000},
  {id:"b_w_6", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"770 Miles Cabernet Sauvignon (крас. сух.)", kz:"770 Miles Cabernet Sauvignon", price:16000},
  {id:"b_w_7", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Bistrot Chic (Merlot Cabernet Syrah) полусух.", kz:"Bistrot Chic", price:21000},
  {id:"b_w_8", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Zenato Lugana Doc 'San Benedetto' полусух.", kz:"Zenato Lugana Doc 'San Benedetto'", price:42000},
  {id:"b_w_9", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Viajero Sauvignon Blanc semi sweet", kz:"Viajero Sauvignon Blanc", price:12000},
  {id:"b_w_10", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Viajero Cabernet Sauvignon semi sweet", kz:"Viajero Cabernet Sauvignon", price:12000},
  {id:"b_w_11", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"I Balzi Shiraz Terre Siciliane IGT (сух.)", kz:"I Balzi Shiraz", price:24000},
  {id:"b_w_12", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Cune Rioja Blanco Semidulce", kz:"Cune Rioja Blanco", price:18000},
  {id:"b_w_13", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Poggio Alla Guardia Maremma Toscana (сух.)", kz:"Poggio Alla Guardia", price:36000},
  {id:"b_w_14", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Marlborough Sun Sauvignon Blanc (сух.)", kz:"Marlborough Sun Sauvignon Blanc", price:21000},
  {id:"b_w_15", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Sirius Bordeaux Blanc (сух.)", kz:"Sirius Bordeaux Blanc", price:21000},
  {id:"b_w_16", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Château Haut-Mondain Moelleux (полуслад.)", kz:"Château Haut-Mondain", price:18000},
  {id:"b_w_17", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Lamblin Muscat (бел. сух.)", kz:"Lamblin Muscat", price:18000},
  {id:"b_w_18", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Marlborough Sun Pinot Noir (крас. сух.)", kz:"Marlborough Sun Pinot Noir", price:27000},
  {id:"b_w_19", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Villa Cardini Chianti (крас. сух.)", kz:"Villa Cardini Chianti", price:22000},
  {id:"b_w_20", type:"bar", catRu:"Вино", catKz:"Шарап", ru:"Chateau Terrebonne Cotes de Provence (роз. сух.)", kz:"Chateau Terrebonne (rose)", price:31000},
];

/* ===== modal open/close FIX ===== */
function openModal(){
  cartModal.classList.remove("hidden");
  cartModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}
function closeModal(){
  cartModal.classList.add("hidden");
  cartModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

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
  const cats = Array.from(new Set(data.map(x => categoryLabel(x))));

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

function renderCart(){
  const items = cartItems();
  const total = items.reduce((s,x)=>s+x.sum,0);
  const count = items.reduce((s,x)=>s+x.qty,0);

  totalSum.textContent = money(total);

  if(count > 0){
    cartBar.classList.remove("hidden");
    cartSummary.textContent = `🛒 ${count} • ${money(total)}`;
  }else{
    cartBar.classList.add("hidden");
  }

  renderCartUI(cartList);

  if(cartDesktop){
    cartDesktop.innerHTML = `
      <h3 style="margin:0 0 10px; color:#d4b26a;">${t("cart")}</h3>
      <div id="cartDeskList"></div>
      <div style="display:flex; justify-content:space-between; margin:12px 0; font-weight:900;">
        <span>${t("total")}</span><span>${money(total)}</span>
      </div>
      <button id="sendDesk" class="primary">${t("send")}</button>
      <button id="clearDesk" class="ghost">${t("clear")}</button>
      <div style="opacity:.7; font-size:12px; margin-top:8px;">WhatsApp: ${PHONE}</div>
    `;
    const list = cartDesktop.querySelector("#cartDeskList");
    renderCartUI(list);
    cartDesktop.querySelector("#sendDesk").onclick = sendToWhatsApp;
    cartDesktop.querySelector("#clearDesk").onclick = clearCart;
  }
}

function buildWhatsAppText(){
  const items = cartItems();
  const comment = (commentEl.value || "").trim();
  const total = items.reduce((s,x)=>s+x.sum,0);

  let lines = [];
  lines.push(t("orderTitle"));
  lines.push("");

  items.forEach(it => {
    lines.push(`• ${nameOf(it)} ×${it.qty} — ${money(it.sum)}`);
  });

  lines.push("");
  lines.push(`${t("total")} ${money(total)}`);

  if(comment){
    lines.push("");
    lines.push(`${t("comment")}: ${comment}`);
  }

  return lines.join("\n");
}

function sendToWhatsApp(){
  const items = cartItems();
  if(items.length === 0){
    alert(t("empty"));
    return;
  }
  const text = encodeURIComponent(buildWhatsAppText());
  window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank");
}

/* ===== Apply i18n to static labels ===== */
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
document.getElementById("closeCart").onclick = closeModal;
document.getElementById("sendWA").onclick = sendToWhatsApp;
document.getElementById("clearCart").onclick = clearCart;
searchEl.addEventListener("input", renderAll);

// Клик по фону закрывает модалку
cartModal.addEventListener("click", (e)=>{
  if(e.target === cartModal) closeModal();
});
// Не закрывать при клике внутри окна
cartModal.querySelector(".cart-window").addEventListener("click", (e)=>e.stopPropagation());

// ESC закрывает
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && !cartModal.classList.contains("hidden")) closeModal();
});

function renderAll(){
  renderMenu();
  renderCart();
}

/* init */
applyI18n();
renderAll();
