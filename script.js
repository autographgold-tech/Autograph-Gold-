// ====== SETTINGS ======
const WHATSAPP_PHONE = "87010322021"; // если другой номер — поменяй здесь
const SERVICE_RATE = 0.10;

// ====== I18N ======
let lang = "ru";
let category = "kitchen";
let searchQuery = "";

// Тексты интерфейса
const UI = {
  ru: {
    brandSub: "KARAOKE",
    tabKitchen: "🍽 Кухня",
    tabBar: "🍸 Бар",
    tabHookah: "💨 Кальяны",
    searchPh: "Поиск…",
    cartTitle: "Корзина",
    lblSum: "Сумма",
    lblService: "Обслуживание 10%",
    lblTotal: "Итого",
    send: "Отправить в WhatsApp",
    clear: "Очистить",
    calcTitle: "Калькулятор",
    calcInputLabel: "Сумма счёта (₸)",
    calcServiceLabel: "Обслуживание 10%",
    calcTotalLabel: "Итого",
    calcUseCart: "Добавить сумму в корзину",
    empty: "Корзина пустая"
  },
  kz: {
    brandSub: "KARAOKE",
    tabKitchen: "🍽 Асхана",
    tabBar: "🍸 Бар",
    tabHookah: "💨 Кальян",
    searchPh: "Іздеу…",
    cartTitle: "Себет",
    lblSum: "Сома",
    lblService: "Қызмет 10%",
    lblTotal: "Жалпы",
    send: "WhatsApp-қа жіберу",
    clear: "Тазалау",
    calcTitle: "Калькулятор",
    calcInputLabel: "Шот сомасы (₸)",
    calcServiceLabel: "Қызмет 10%",
    calcTotalLabel: "Жалпы",
    calcUseCart: "Соманы себетке қосу",
    empty: "Себет бос"
  },
  en: {
    brandSub: "KARAOKE",
    tabKitchen: "🍽 Kitchen",
    tabBar: "🍸 Bar",
    tabHookah: "💨 Hookah",
    searchPh: "Search…",
    cartTitle: "Cart",
    lblSum: "Subtotal",
    lblService: "Service 10%",
    lblTotal: "Total",
    send: "Send to WhatsApp",
    clear: "Clear",
    calcTitle: "Calculator",
    calcInputLabel: "Bill amount (₸)",
    calcServiceLabel: "Service 10%",
    calcTotalLabel: "Total",
    calcUseCart: "Add amount to cart",
    empty: "Cart is empty"
  }
};

// ====== MENU DATA ======
// Меню собрано по твоим PDF: Бар  [oai_citation:2‡МЕНЮ БАР Автограф.pdf](sediment://file_0000000042c07209a5b7103eb0c9faf7) и Кухня  [oai_citation:3‡МЕНЮ СИНИЙ итог надеюсь.pdf](sediment://file_00000000d1d472068ce0604d2e309925)

const MENU = {
  kitchen: [
    section("salads",
      {ru:"Салаты", kz:"Салаттар", en:"Salads"},
      [
        item({ru:"Бакетбитс", kz:"Бакетбитс", en:"Baked beet salad"}, 3290),
        item({ru:"Салат гарден фитнес", kz:"Гарден фитнес салаты", en:"Garden fitness salad"}, 3990),
        item({ru:"Салат Страчателла", kz:"Страчателла салаты", en:"Stracciatella salad"}, 5190),
        item({ru:"Итальянский сыр Буррата", kz:"Буррата Итальяндық ірімшігі", en:"Burrata (Italian cheese)"}, 5990),
        item({ru:"Салат оберджин", kz:"Оберджин салаты", en:"Aubergine salad"}, 3590),
        item({ru:"Салат руккола с тунцом", kz:"Тунец қосылған руккола салаты", en:"Arugula salad with tuna"}, 4990),
        item({ru:"Цезарь с креветками", kz:"Асшаяндар қосылған цезарь салаты", en:"Caesar with shrimp"}, 3890),
        item({ru:"Цезарь с куриным филе", kz:"Тауық еті қосылған Цезарь", en:"Caesar with chicken"}, 3490),
        item({ru:"Салат греческий", kz:"Грек салаты", en:"Greek salad"}, 2990),
        item({ru:"Легкий салат с креветками и апельсинами", kz:"Асшаяндар және апельсин қосылған жеңіл салат", en:"Light shrimp & orange salad"}, 4990),
      ]
    ),

    section("soups",
      {ru:"Супы", kz:"Сорпалар", en:"Soups"},
      [
        item({ru:"Минестроне", kz:"Министроне", en:"Minestrone"}, 2990),
        item({ru:"Том ям", kz:"Том ям", en:"Tom Yum"}, 3990),
        item({ru:"Кукси", kz:"Кукси", en:"Kuksi"}, 3590),
        item({ru:"Окрошка", kz:"Окрошка", en:"Okroshka"}, 2590),
        item({ru:"Рамен с мясом", kz:"Рамен с мясом", en:"Meat ramen"}, 3590),
        item({ru:"Лапша по-домашнему", kz:"Лапша по-домашнему", en:"Homemade noodle soup"}, 2990),
        item({ru:"Солянка", kz:"Солянка", en:"Solyanka"}, 3390),
        item({ru:"Чечевичный крем-суп", kz:"Чечевичный крем-суп", en:"Lentil cream soup"}, 2590),
      ]
    ),

    section("hot",
      {ru:"Горячие блюда", kz:"Ыстық тағамдар", en:"Hot dishes"},
      [
        item({ru:"Запечённый сибас по-британски", kz:"Британша көмбештелген теңіз алабұғасы", en:"British-style baked seabass"}, 3890),
        item({ru:"Куриный рулет с сыром", kz:"Іріміші қосылған тауық орамасы", en:"Chicken рулет with cheese"}, 4990),
        item({ru:"Курица в кисло-сладком соусе", kz:"Тәтті қышқыл соустағы тауық еті", en:"Sweet & sour chicken"}, 5990),
        item({ru:"Дуэт семги и судака", kz:"Ақсерке мен көксерке дуэті", en:"Salmon & zander duo"}, 7290),
        item({ru:"Перепелка в сливочном соусе", kz:"Кілегей соусындағы бөдене", en:"Quail in creamy sauce"}, 4590),

        item({ru:"Лосось в английском стиле", kz:"Ағылшынша албырты", en:"English-style salmon"}, 7990),
        item({ru:"Форель жареная по-английски", kz:"Ағылшынша қуырылған бақтақ", en:"English-style fried trout"}, 6990),
        item({ru:"Дорадо", kz:"Дорадо", en:"Dorado"}, 6890),

        item({ru:"Куриное филе с кремом из брокколи", kz:"Брокколи креммен тауық сүбесі", en:"Chicken fillet with broccoli cream"}, 7990),
        item({ru:"Филе миньон на подушке из шпината в ягодном соусе", kz:"Саумалдық жастықшасындағы жеміс соусымен миньон сүбесі", en:"Filet mignon w/ spinach & berry sauce"}, 8990),
        item({ru:"Каре ягненка в фисташковой панировке", kz:"Пісте панировкадағы бағлан қабырғасы", en:"Lamb rack in pistachio crust"}, 8790),
        item({ru:"Судак запеченый со шпинатом", kz:"Саумалдық қосылған көмбештелген көксерке", en:"Baked zander with spinach"}, 8590),
      ]
    ),

    section("pasta",
      {ru:"Пасты", kz:"Пасталар", en:"Pasta"},
      [
        item({ru:"Фетучини Альфредо", kz:"Фетучини Альфредо", en:"Fettuccine Alfredo"}, 3990),
        item({ru:"Фетучини с песто и семгой", kz:"Фетучини с песто и семгой", en:"Fettuccine pesto & salmon"}, 4190),
        item({ru:"Де море", kz:"Де море", en:"De Mare"}, 4990),
        item({ru:"Спагетти с говядиной", kz:"Спагетти с говядиной", en:"Spaghetti with beef"}, 3990),
      ]
    ),

    section("grill",
      {ru:"Блюда на гриле", kz:"Грильдегі тағамдар", en:"Grill"},
      [
        item({ru:"Стейк рибай", kz:"Стейк рибай", en:"Ribeye steak"}, 9590),
        item({ru:"Стейк T-Bone", kz:"Стейк T-Bone", en:"T-Bone steak"}, 8990),
        item({ru:"Стейк Томагавк", kz:"Стейк Томагавк", en:"Tomahawk steak"}, 14990),
        item({ru:"Пеппер стейк в сливочном соусе", kz:"Пеппер стейк в сливочном соусе", en:"Pepper steak in creamy sauce"}, 7890),
        item({ru:"Куриное филе на гриле в сливочном соусе", kz:"Куриное филе на гриле в сливочном соусе", en:"Grilled chicken fillet (creamy sauce)"}, 6990),
        item({ru:"Цыпленок с бейби картофелем", kz:"Цыпленок с бейби картофелем", en:"Chicken with baby potatoes"}, 7990),
      ]
    ),

    section("sets",
      {ru:"Сеты на компанию", kz:"Компаниядағы жинақтар", en:"Sharing sets"},
      [
        item({ru:"Гай ричи (на 6 персон)", kz:"Гай ричи (6 адамға)", en:"Guy Ritchie (for 6)"}, 32990),
        item({ru:"Гриль микс (на 8 персон)", kz:"Гриль микс (8 адамға)", en:"Grill mix (for 8)"}, 42990),
        item({ru:"Мясная лавка (на 8 персон)", kz:"Мясная лавка (8 адамға)", en:"Meat shop (for 8)"}, 38990),
        item({ru:"Роял ростер", kz:"Роял ростер", en:"Royal roaster"}, 32990),
      ]
    ),

    section("beer_sets",
      {ru:"Пивные сеты", kz:"Сыра сеттері", en:"Beer sets"},
      [
        item({ru:"Пивной сет 1", kz:"Сыра сет 1", en:"Beer set 1"}, 5990),
        item({ru:"Пивной сет 2", kz:"Сыра сет 2", en:"Beer set 2"}, 7990),
        item({ru:"Пивной сет VIP", kz:"VIP сыра сет", en:"Beer set VIP"}, 9990),
      ]
    ),

    section("sushi",
      {ru:"Суши и роллы", kz:"Суши және ролы", en:"Sushi & rolls"},
      [
        item({ru:"Жаренный ролл Америка", kz:"Жаренный ролл Америка", en:"Fried roll America"}, 3990),
        item({ru:"Жаренный ролл Кани хотто", kz:"Жаренный ролл Кани хотто", en:"Fried roll Kani Hotto"}, 2990),
        item({ru:"Жаренный ролл Эби хотто", kz:"Жаренный ролл Эби хотто", en:"Fried roll Ebi Hotto"}, 4290),
        item({ru:"Жаренный ролл Цезарь", kz:"Жаренный ролл цезарь", en:"Fried roll Caesar"}, 2990),
        item({ru:"Запеченный ролл Банзай", kz:"Запеченный ролл Банзай", en:"Baked roll Banzai"}, 4390),
        item({ru:"Ролл Аляска", kz:"Ролл Аляска", en:"Alaska roll"}, 4990),
        item({ru:"Ролл Саке маки", kz:"Ролл Саке маки", en:"Sake maki roll"}, 2990),
        item({ru:"Ролл Филадельфия", kz:"Ролл Филадельфия", en:"Philadelphia roll"}, 3890),
        item({ru:"Суши Саке", kz:"Cуши Саке", en:"Sake sushi"}, 1990),
        item({ru:"Суши Унаги", kz:"Суши Унаги", en:"Unagi sushi"}, 1890),
        item({ru:"Суши Эби", kz:"Суши Эби", en:"Ebi sushi"}, 1790),
      ]
    ),

    section("cold_snacks",
      {ru:"Холодные закуски", kz:"Суық тіскебасар", en:"Cold snacks"},
      [
        item({ru:"Рыбное ассорти", kz:"Балық ассорти", en:"Fish platter"}, 10990),
        item({ru:"Сырное ассорти", kz:"Ірімшік ассорти", en:"Cheese platter"}, 9990),
        item({ru:"Капрезе", kz:"Капрезе", en:"Caprese"}, 2990),
        item({ru:"Рулетики из баклажан с грецкими орехами", kz:"Жаңғақ қосылған баклажан орамшалар", en:"Eggplant rolls with walnuts"}, 2990),
        item({ru:"Разносолы", kz:"Тұздамалар", en:"Pickles selection"}, 3590),
        item({ru:"Конское ассорти", kz:"Жылқы ассорти", en:"Horse meat platter"}, 9990),
        item({ru:"Кавказское ассорти", kz:"Кавказ ассорти", en:"Caucasian platter"}, 3590),
        item({ru:"Русская закуска", kz:"Орыс дәмтағамы", en:"Russian snack"}, 3590),
        item({ru:"Рулетики из отварного говяжьего языка с ореховой начинкой", kz:"Піскен сиыр тілінен орамшалар", en:"Beef tongue rolls with nuts"}, 3990),
      ]
    ),

    section("hot_snacks",
      {ru:"Горячие закуски", kz:"Ыстық тәбестер", en:"Hot snacks"},
      [
        item({ru:"Кости мозговые говяжьи", kz:"Сиырдың ми сүйектері", en:"Beef marrow bones"}, 4990),
        item({ru:"Чесночные гренки", kz:"Сарымсақпен қуырылған нан кесектері", en:"Garlic croutons"}, 1990),
        item({ru:"Ассорти колбасок", kz:"Шұжықтар ассорти", en:"Sausage assortment"}, 8990),
        item({ru:"Жареные тигровые креветки", kz:"Қуырылған жолбарыс асшаяндары", en:"Fried tiger shrimp"}, 6990),
      ]
    ),

    section("sides",
      {ru:"Гарниры", kz:"Гарнирлер", en:"Sides"},
      [
        item({ru:"Спаржа", kz:"Спаржа", en:"Asparagus"}, 2190),
        item({ru:"Брокколи с чесноком", kz:"Брокколи с чесноком", en:"Garlic broccoli"}, 1990),
        item({ru:"Картофель фри", kz:"Картофель фри", en:"French fries"}, 1490),
        item({ru:"Картофельные дольки", kz:"Картофельные дольки", en:"Potato wedges"}, 1490),
        item({ru:"Рис", kz:"Рис", en:"Rice"}, 1890),
        item({ru:"Рататуй", kz:"Рататуй", en:"Ratatouille"}, 1590),
        item({ru:"Овощи на гриле", kz:"Овощи на гриле", en:"Grilled vegetables"}, 2590),
      ]
    ),

    section("desserts",
      {ru:"Десерты", kz:"Десерттер", en:"Desserts"},
      [
        item({ru:"Сердце", kz:"Сердце", en:"Heart cake"}, 3390),
        item({ru:"Фисташка", kz:"Фисташка", en:"Pistachio"}, 3300),
        item({ru:"Banoffee", kz:"Banoffee", en:"Banoffee"}, 4300),
        item({ru:"Кекс Финансье", kz:"Кекс Финансье", en:"Financier"}, 2090),
        item({ru:"Оригами", kz:"Оригами", en:"Origami"}, 2690),
        item({ru:"Полусфера", kz:"Полусфера", en:"Hemisphere"}, 2990),
      ]
    ),

    section("assorti",
      {ru:"Ассорти", kz:"Ассортилер", en:"Platters"},
      [
        item({ru:"Фруктовое ассорти", kz:"Жеміс ассорти", en:"Fruit platter"}, 9990),
        item({ru:"Хлебное ассорти", kz:"Нан ассорти", en:"Bread basket"}, 990),
      ]
    ),
  ],

  bar: [
    section("soft",
      {ru:"Безалкогольные напитки", kz:"Алкогольсіз сусындар", en:"Soft drinks"},
      [
        item({ru:"Red Bull", kz:"Red Bull", en:"Red Bull"}, 1800),
        item({ru:"Borjomi 0,5", kz:"Borjomi 0,5", en:"Borjomi 0.5"}, 1600),
        item({ru:"Vittel 0,5", kz:"Vittel 0,5", en:"Vittel 0.5"}, 1500),
        item({ru:"Coca Cola / Sprite / Fanta / Zero 0,25", kz:"Coca Cola / Sprite / Fanta / Zero 0,25", en:"Coke / Sprite / Fanta / Zero 0.25"}, 1300),
        item({ru:"Perrier Naturel 0,33", kz:"Perrier Naturel 0,33", en:"Perrier 0.33"}, 2000),
        item({ru:"Swell 0,25", kz:"Swell 0,25", en:"Swell 0.25"}, 2000),
        item({ru:"Swell 0,75", kz:"Swell 0,75", en:"Swell 0.75"}, 4000),
      ]
    ),

    section("lemonades",
      {ru:"Лимонады (1л)", kz:"Лимонадтар (1л)", en:"Homemade lemonades (1L)"},
      [
        item({ru:"Mango–Passion Fruit", kz:"Манго–Маракуйя", en:"Mango–Passion Fruit"}, 3200),
        item({ru:"Raspberry–Lychee", kz:"Таңқурай–Личи", en:"Raspberry–Lychee"}, 3200),
        item({ru:"Kiwi–Green Apple", kz:"Киви–Жасыл алма", en:"Kiwi–Green Apple"}, 3200),
        item({ru:"Pineapple–Grapefruit", kz:"Ананас–Грейпфрут", en:"Pineapple–Grapefruit"}, 3200),
        item({ru:"Wild Berry", kz:"Жидек микс", en:"Wild Berry"}, 3200),
        item({ru:"Pomegranate–Lime", kz:"Анар–Лайм", en:"Pomegranate–Lime"}, 3200),
        item({ru:"Elderflower–Lychee", kz:"Бузина–Личи", en:"Elderflower–Lychee"}, 3200),
      ]
    ),

    section("coffee_tea",
      {ru:"Кофе и чай", kz:"Кофе және шай", en:"Coffee & Tea"},
      [
        item({ru:"Latte", kz:"Latte", en:"Latte"}, 1100),
        item({ru:"Cappuccino", kz:"Cappuccino", en:"Cappuccino"}, 1800),
        item({ru:"Espresso", kz:"Espresso", en:"Espresso"}, 1800),
        item({ru:"Glasse", kz:"Glasse", en:"Glace"}, 1300),
        item({ru:"Irish coffee", kz:"Irish coffee", en:"Irish coffee"}, 1400),
        item({ru:"Raf", kz:"Raf", en:"Raf"}, 2100),
        item({ru:"Black tea", kz:"Қара шай", en:"Black tea"}, 2000),
        item({ru:"Green tea", kz:"Жасыл шай", en:"Green tea"}, 2000),
        item({ru:"Shu puer", kz:"Shu puer", en:"Shu puer"}, 2100),
        item({ru:"Milk oolong", kz:"Milk oolong", en:"Milk oolong"}, 2200),
        item({ru:"Tashkent's Tea", kz:"Tashkent's Tea", en:"Tashkent's Tea"}, 2700),
        item({ru:"Marroccan Tea", kz:"Marroccan Tea", en:"Moroccan Tea"}, 2600),
        item({ru:"Tea Of Wild Berryes", kz:"Tea Of Wild Berryes", en:"Wild berries tea"}, 2800),
      ]
    ),

    section("cocktails",
      {ru:"Коктейли", kz:"Коктейльдер", en:"Cocktails"},
      [
        item({ru:"Long Island Ice Tea", kz:"Long Island Ice Tea", en:"Long Island Iced Tea"}, 3850),
        item({ru:"Aperol Spritz Virgin Blood", kz:"Aperol Spritz Virgin Blood", en:"Aperol Spritz (Virgin Blood)"}, 3500),
        item({ru:"Pandora", kz:"Pandora", en:"Pandora"}, 3500),
        item({ru:"Stirling", kz:"Stirling", en:"Stirling"}, 3500),
        item({ru:"Clover Club", kz:"Clover Club", en:"Clover Club"}, 3500),
        item({ru:"Stuart", kz:"Stuart", en:"Stuart"}, 3500),
        item({ru:"Kirke", kz:"Kirke", en:"Kirke"}, 3500),
        item({ru:"Bloody Mary", kz:"Bloody Mary", en:"Bloody Mary"}, 3500),
        item({ru:"New York Sour", kz:"New York Sour", en:"New York Sour"}, 3500),
        item({ru:"Boulevardier", kz:"Boulevardier", en:"Boulevardier"}, 3500),
        item({ru:"Margarita", kz:"Margarita", en:"Margarita"}, 3500),
        item({ru:"Old Fashioned", kz:"Old Fashioned", en:"Old Fashioned"}, 3500),
        item({ru:"French 75", kz:"French 75", en:"French 75"}, 3500),
        item({ru:"Manhattan", kz:"Manhattan", en:"Manhattan"}, 3500),
      ]
    ),

    section("beer",
      {ru:"Пиво", kz:"Сыра", en:"Beer"},
      [
        item({ru:"Guinness (can)", kz:"Guinness (can)", en:"Guinness (can)"}, 3500),
        item({ru:"Corona Extra", kz:"Corona Extra", en:"Corona Extra"}, 2600),
        item({ru:"Miller", kz:"Miller", en:"Miller"}, 1400),
        item({ru:"Heineken", kz:"Heineken", en:"Heineken"}, 2800),
      ]
    ),

    section("wine_sparkling",
      {ru:"Игристое / Вино", kz:"Жарқыраған шарап / Вино", en:"Sparkling / Wine"},
      [
        item({ru:"Montelvini Asolo Prosecco Brut", kz:"Prosecco Brut", en:"Prosecco Brut"}, 26000),
        item({ru:"Signore Giuseppe Prosecco Extra Dry", kz:"Prosecco Extra Dry", en:"Prosecco Extra Dry"}, 20000),
        item({ru:"Jacob’s Creek Sparkling Moscato", kz:"Sparkling Moscato", en:"Sparkling Moscato"}, 21000),
        item({ru:"Santo Stefano", kz:"Santo Stefano", en:"Santo Stefano"}, 10000),
        item({ru:"Cafe De Paris Rose", kz:"Cafe De Paris Rose", en:"Cafe De Paris Rose"}, 17000),
        item({ru:"G.H. Mumm Cordon Rouge Brut", kz:"G.H. Mumm Brut", en:"G.H. Mumm Brut"}, 41000),
        item({ru:"Martini ASTI DOCG", kz:"Martini ASTI", en:"Martini ASTI"}, 16200),

        item({ru:"Campo Viejo Tempranillo", kz:"Campo Viejo Tempranillo", en:"Campo Viejo Tempranillo"}, 12000),
        item({ru:"Campo Viejo Blanco", kz:"Campo Viejo Blanco", en:"Campo Viejo Blanco"}, 12000),
        item({ru:"Campo Viejo Reserva", kz:"Campo Viejo Reserva", en:"Campo Viejo Reserva"}, 16500),
        item({ru:"Campo Viejo Gran Reserva", kz:"Campo Viejo Gran Reserva", en:"Campo Viejo Gran Reserva"}, 22000),
        item({ru:"770 Miles Chardonnay (white dry)", kz:"770 Miles Chardonnay", en:"770 Miles Chardonnay"}, 16000),
        item({ru:"770 Miles Cabernet Sauvignon (red dry)", kz:"770 Miles Cabernet Sauvignon", en:"770 Miles Cabernet Sauvignon"}, 16000),
      ]
    ),
  ],

  hookah: [
    section("hookah_main",
      {ru:"Кальяны", kz:"Кальяндар", en:"Hookah"},
      [
        item({ru:"Кальян Classic", kz:"Кальян Classic", en:"Hookah Classic"}, 8000, {ru:"(база/классика)", kz:"(база)", en:"(basic)"}),
        item({ru:"Кальян Premium", kz:"Кальян Premium", en:"Hookah Premium"}, 12000, {ru:"(премиум табак)", kz:"(премиум)", en:"(premium tobacco)"}),
      ]
    )
  ]
};

// ====== HELPERS ======
function section(id, title, items){
  return { id, title, items };
}
function item(name, price, note = null){
  return { id: uid(), name, price, note };
}
function uid(){
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
function fmt(n){
  return (n || 0).toLocaleString("ru-RU");
}
function getTitle(obj){ return obj?.[lang] ?? obj?.ru ?? ""; }

// ====== STATE: CART ======
const cart = new Map(); // itemId -> {item, qty}

// ====== DOM ======
const menuEl = document.getElementById("menu");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const sumEl = document.getElementById("sum");
const serviceEl = document.getElementById("service");
const totalEl = document.getElementById("total");

const searchEl = document.getElementById("search");

// Calc
const calcModal = document.getElementById("calcModal");
const calcInput = document.getElementById("calcInput");
const calcService = document.getElementById("calcService");
const calcTotal = document.getElementById("calcTotal");

// ====== UI WIRING ======
document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    lang = btn.dataset.lang;
    applyUI();
    renderMenu();
    renderCart();
    renderCalc();
  });
});

document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    category = btn.dataset.cat;
    renderMenu();
  });
});

searchEl.addEventListener("input", ()=>{
  searchQuery = (searchEl.value || "").trim().toLowerCase();
  renderMenu();
});

// Cart open/close
document.getElementById("openCart").addEventListener("click", ()=>openDrawer(true));
document.getElementById("closeCart").addEventListener("click", ()=>openDrawer(false));
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    openDrawer(false);
    openCalc(false);
  }
});

document.getElementById("sendOrder").addEventListener("click", sendOrder);
document.getElementById("clearCart").addEventListener("click", ()=>{
  cart.clear();
  renderCart();
});

// Calc open/close
document.getElementById("openCalc").addEventListener("click", ()=>openCalc(true));
document.getElementById("closeCalc").addEventListener("click", ()=>openCalc(false));
calcInput.addEventListener("input", renderCalc);

document.getElementById("calcUseCart").addEventListener("click", ()=>{
  const v = Math.max(0, parseInt(calcInput.value || "0", 10) || 0);
  if(!v) return;
  // Добавляем "позицию" как сумму чека (если нужно)
  const pseudo = item({ru:"Счёт (вручную)", kz:"Шот (қолмен)", en:"Bill (manual)"}, v);
  cart.set(pseudo.id, { item: pseudo, qty: 1 });
  openCalc(false);
  renderCart();
  openDrawer(true);
});

// ====== RENDER ======
function applyUI(){
  const t = UI[lang];

  document.getElementById("brandSub").textContent = t.brandSub;
  document.getElementById("tabKitchen").textContent = t.tabKitchen;
  document.getElementById("tabBar").textContent = t.tabBar;
  document.getElementById("tabHookah").textContent = t.tabHookah;

  searchEl.placeholder = t.searchPh;

  document.getElementById("cartTitle").textContent = t.cartTitle;
  document.getElementById("lblSum").textContent = t.lblSum;
  document.getElementById("lblService").textContent = t.lblService;
  document.getElementById("lblTotal").textContent = t.lblTotal;
  document.getElementById("sendOrder").textContent = t.send;
  document.getElementById("clearCart").textContent = t.clear;

  document.getElementById("calcTitle").textContent = t.calcTitle;
  document.getElementById("calcInputLabel").textContent = t.calcInputLabel;
  document.getElementById("calcServiceLabel").textContent = t.calcServiceLabel;
  document.getElementById("calcTotalLabel").textContent = t.calcTotalLabel;
  document.getElementById("calcUseCart").textContent = t.calcUseCart;
}

function renderMenu(){
  const sections = MENU[category] || [];
  menuEl.innerHTML = "";

  sections.forEach(sec=>{
    const secTitle = getTitle(sec.title);

    const itemsFiltered = sec.items.filter(it=>{
      if(!searchQuery) return true;
      const nm = (getTitle(it.name) || "").toLowerCase();
      const nt = (getTitle(it.note) || "").toLowerCase();
      return nm.includes(searchQuery) || nt.includes(searchQuery);
    });

    if(itemsFiltered.length === 0) return;

    const card = document.createElement("section");
    card.className = "section";

    card.innerHTML = `
      <div class="section-head">
        <div>
          <div class="section-title">${secTitle}</div>
          <div class="section-sub">${itemsFiltered.length} ${lang==="ru" ? "позиций" : lang==="kz" ? "позиция" : "items"}</div>
        </div>
      </div>
      <div class="section-body"></div>
    `;

    const body = card.querySelector(".section-body");

    itemsFiltered.forEach(it=>{
      const row = document.createElement("div");
      row.className = "item";

      const count = cart.get(it.id)?.qty || 0;
      const note = getTitle(it.note);

      row.innerHTML = `
        <div>
          <div class="item-name">${getTitle(it.name)}</div>
          ${note ? `<div class="item-note">${note}</div>` : ``}
        </div>
        <div class="price">${fmt(it.price)} ₸</div>
        <div class="qty">
          <button aria-label="minus">−</button>
          <div class="count">${count}</div>
          <button aria-label="plus">+</button>
        </div>
      `;

      const [minusBtn, plusBtn] = row.querySelectorAll("button");

      minusBtn.addEventListener("click", ()=>changeQty(it, -1));
      plusBtn.addEventListener("click", ()=>changeQty(it, +1));

      body.appendChild(row);
    });

    menuEl.appendChild(card);
  });
}

function changeQty(it, delta){
  const cur = cart.get(it.id);
  const next = (cur?.qty || 0) + delta;

  if(next <= 0){
    cart.delete(it.id);
  } else {
    cart.set(it.id, { item: it, qty: next });
  }
  renderMenu();   // обновляем счетчики рядом с блюдами
  renderCart();
}

function renderCart(){
  const t = UI[lang];
  cartItemsEl.innerHTML = "";

  let totalQty = 0;
  let sum = 0;

  if(cart.size === 0){
    cartItemsEl.innerHTML = `<div style="color:#9fb0c7;padding:10px 0;">${t.empty}</div>`;
  } else {
    for(const [id, entry] of cart){
      const { item: it, qty } = entry;
      totalQty += qty;
      sum += (it.price * qty);

      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <div class="left">
          <div class="name">${getTitle(it.name)}</div>
          <div class="meta">${fmt(it.price)} ₸ × ${qty}</div>
        </div>
        <div class="right">
          <b>${fmt(it.price * qty)} ₸</b>
          <button class="rm" title="remove">−</button>
        </div>
      `;
      row.querySelector(".rm").addEventListener("click", ()=>{
        changeQty(it, -1);
      });
      cartItemsEl.appendChild(row);
    }
  }

  const service = Math.round(sum * SERVICE_RATE);
  const total = sum + service;

  cartCountEl.textContent = totalQty;
  sumEl.textContent = fmt(sum);
  serviceEl.textContent = fmt(service);
  totalEl.textContent = fmt(total);
}

function openDrawer(open){
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", open ? "false" : "true");
}

function openCalc(open){
  calcModal.classList.toggle("open", open);
  calcModal.setAttribute("aria-hidden", open ? "false" : "true");
  if(open) {
    calcInput.focus();
    renderCalc();
  }
}

function renderCalc(){
  const v = Math.max(0, parseInt(calcInput.value || "0", 10) || 0);
  const s = Math.round(v * SERVICE_RATE);
  const t = v + s;
  calcService.textContent = fmt(s);
  calcTotal.textContent = fmt(t);
}

function sendOrder(){
  // Собираем текст заказа
  let lines = [];
  let sum = 0;
  let qtyTotal = 0;

  for(const [, entry] of cart){
    const { item: it, qty } = entry;
    qtyTotal += qty;
    sum += it.price * qty;
    lines.push(`${getTitle(it.name)} × ${qty} — ${fmt(it.price * qty)} ₸`);
  }

  const service = Math.round(sum * SERVICE_RATE);
  const total = sum + service;

  const header =
    lang === "kz" ? "Тапсырыс:" :
    lang === "en" ? "Order:" :
    "Заказ:";

  const footer =
    lang === "kz"
      ? `\nСома: ${fmt(sum)} ₸\nҚызмет 10%: ${fmt(service)} ₸\nЖалпы: ${fmt(total)} ₸`
      : lang === "en"
        ? `\nSubtotal: ${fmt(sum)} ₸\nService 10%: ${fmt(service)} ₸\nTotal: ${fmt(total)} ₸`
        : `\nСумма: ${fmt(sum)} ₸\nОбслуживание 10%: ${fmt(service)} ₸\nИтого: ${fmt(total)} ₸`;

  const text = [header, ...lines, footer].join("\n");

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

// Клик по фону модалки закрывает
calcModal.addEventListener("click", (e)=>{
  if(e.target === calcModal) openCalc(false);
});

// ====== INIT ======
applyUI();
renderMenu();
renderCart();
renderCalc();
