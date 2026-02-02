// src/data/menuData.js
export const LANGS = ["ru", "kz", "en"];

export const UI = {
  title: { ru: "QR МЕНЮ", kz: "QR МӘЗІР", en: "QR MENU" },
  search: { ru: "Поиск по блюдам и напиткам…", kz: "Тағам/сусын іздеу…", en: "Search dishes & drinks…" },
  categories: { ru: "Категории", kz: "Санаттар", en: "Categories" },
  cart: { ru: "Корзина", kz: "Себет", en: "Cart" },
  clear: { ru: "Очистить", kz: "Тазалау", en: "Clear" },
  empty: { ru: "Пока пусто. Добавь позиции из меню.", kz: "Әзірше бос. Мәзірден қосыңыз.", en: "Empty. Add items from the menu." },
  total: { ru: "Итого", kz: "Жалпы", en: "Total" },
  calc: { ru: "Калькулятор", kz: "Калькулятор", en: "Calculator" },
  split: { ru: "Разделить на гостей", kz: "Қонақтарға бөлу", en: "Split per guests" },
  guests: { ru: "Гостей", kz: "Қонақ", en: "Guests" },
  perGuest: { ru: "На 1 гостя", kz: "1 қонаққа", en: "Per guest" },
  currency: { ru: "₸", kz: "₸", en: "₸" },
  add: { ru: "Добавить", kz: "Қосу", en: "Add" },
  added: { ru: "Добавлено", kz: "Қосылды", en: "Added" },
  close: { ru: "Закрыть", kz: "Жабу", en: "Close" },
  whatsapp: { ru: "Написать в WhatsApp", kz: "WhatsApp-қа жазу", en: "Message on WhatsApp" },
  qty: { ru: "Кол-во", kz: "Саны", en: "Qty" }
};

export const CATEGORIES = [
  { id: "salads", name: { ru: "Салаты", kz: "Салаттар", en: "Salads" } },
  { id: "soups", name: { ru: "Супы", kz: "Сорпалар", en: "Soups" } },
  { id: "hot", name: { ru: "Горячие блюда", kz: "Ыстық тағамдар", en: "Hot Dishes" } },
  { id: "pasta", name: { ru: "Пасты", kz: "Пасталар", en: "Pasta" } },
  { id: "grill", name: { ru: "Блюда на гриле", kz: "Грильдегі тағамдар", en: "Grill" } },
  { id: "sets", name: { ru: "Сеты на компанию", kz: "Компаниядағы жинақтар", en: "Sharing Sets" } },
  { id: "beerSets", name: { ru: "Пивные сеты", kz: "Сыра сеттері", en: "Beer Sets" } },
  { id: "sushi", name: { ru: "Суши и роллы", kz: "Суши және роллдар", en: "Sushi & Rolls" } },
  { id: "cold", name: { ru: "Холодные закуски", kz: "Суық тіскебасар", en: "Cold Starters" } },
  { id: "pickles", name: { ru: "Разносолы", kz: "Тұздамалар", en: "Pickles & Snacks" } },
  { id: "hotSnacks", name: { ru: "Горячие закуски", kz: "Ыстық тәбестер", en: "Hot Snacks" } },
  { id: "sides", name: { ru: "Гарниры", kz: "Гарнирлер", en: "Sides" } },
  { id: "dessert", name: { ru: "Десерты", kz: "Десерттер", en: "Desserts" } },
  { id: "barNA", name: { ru: "Безалкогольные", kz: "Алкогольсіз", en: "Non-Alcoholic" } },
  { id: "barCoffeeTea", name: { ru: "Кофе и чай", kz: "Кофе және шай", en: "Coffee & Tea" } },
  { id: "barCocktails", name: { ru: "Коктейли", kz: "Коктейльдер", en: "Cocktails" } },
  { id: "barSpirits", name: { ru: "Крепкий алкоголь", kz: "Қатты алкоголь", en: "Spirits" } },
  { id: "barWine", name: { ru: "Вино и игристое", kz: "Шарап", en: "Wine & Sparkling" } }
];

const t = (ru, kz, en) => ({ ru, kz, en });

export const MENU = [
  // --- SALADS ---
  {
    id: "sal_baketbits",
    cat: "salads",
    title: t("Бакетбитс", "Бакетбитс", "Baked Beet & Stracciatella"),
    desc: t(
      "Запеченная свекла, сыр Страчателла, микс зелени, кедровые орехи, черри, авторский соус",
      "Пісірілген қызылша, Страчателла ірімшігі, көкшөп қоспасы, қарағай жаңғағы, черри, авторлық соусы",
      "Baked beetroot, stracciatella cheese, mixed greens, pine nuts, cherry tomatoes, house sauce"
    ),
    price: 3290
  },
  {
    id: "sal_garden",
    cat: "salads",
    title: t("Салат гарден фитнес", "Гарден фитнес салаты", "Garden Fitness Salad"),
    desc: t(
      "Хумус, авокадо, микс зелени, черри, ростбиф, апельсины, авторский соус",
      "Хумус, авокадо, көкшөп қоспасы, черри, ростбиф, апельсиндер, авторлық соусы",
      "Hummus, avocado, mixed greens, cherry tomatoes, roast beef, oranges, house sauce"
    ),
    price: 3990
  },
  {
    id: "sal_burrata",
    cat: "salads",
    title: t("Итальянский сыр Буррата", "Буррата Итальяндық ірімшігі", "Italian Burrata"),
    desc: t(
      "Буррата из фермерского молока. Подача: руккола, черри, инжир, бальзамический крем и соус песто",
      "Фермалық сиыр сүтінен жасалған. Ұсыну: руккола, черри, інжір, бальзамдық крем және песто",
      "Farm-milk burrata. Served with arugula, cherry tomatoes, figs, balsamic cream and pesto"
    ),
    price: 5990
  },
  {
    id: "sal_stracciatella",
    cat: "salads",
    title: t("Салат страчателла", "Страчателла салаты", "Stracciatella Salad"),
    desc: t(
      "Микс зелени, черри, сыр Страчателла, авторский соус, виноградный соус",
      "Көкшөп қоспасы, черри, Stracciatella ірімшігі, авторлық соусы, жүзім соусы",
      "Mixed greens, cherry tomatoes, stracciatella, house sauce, grape sauce"
    ),
    price: 5190
  },
  {
    id: "sal_oberdjin",
    cat: "salads",
    title: t("Салат оберджин", "Оберджин салаты", "Aubergine Salad"),
    desc: t(
      "Баклажаны, сыр моцарелла, помидоры, кисло-сладкий соус, руккола",
      "Баклажан, моцарелла, қызанақ, тәтті-қышқыл соус, руккола",
      "Eggplant, mozzarella, tomatoes, sweet & sour sauce, arugula"
    ),
    price: 3590
  },
  {
    id: "sal_tuna",
    cat: "salads",
    title: t("Руккола с тунцом", "Тунец қосылған руккола салаты", "Arugula Salad with Tuna"),
    desc: t(
      "Маринованный тунец, руккола, микс салата, черри, перепелиное яйцо, миндальные слайсы, соус",
      "Маринадталған тунец, руккола, көкшөп қоспасы, черри, бөдене жұмыртқасы, бадам, соус",
      "Marinated tuna, arugula, mixed greens, cherry tomatoes, quail egg, almond slices, dressing"
    ),
    price: 4990
  },
  {
    id: "sal_caesar_shrimp",
    cat: "salads",
    title: t("Цезарь с креветками", "Асшаяндар қосылған Цезарь", "Caesar with Shrimp"),
    desc: t(
      "Айсберг, креветки, черри, сухари, перепелиное яйцо, соус из анчоусов, пармезан",
      "Айсберг, асшаяндар, черри, кептірілген нан, бөдене жұмыртқасы, анчоус соусы, пармезан",
      "Iceberg lettuce, shrimp, cherry tomatoes, croutons, quail egg, anchovy sauce, parmesan"
    ),
    price: 3890
  },
  {
    id: "sal_caesar_chicken",
    cat: "salads",
    title: t("Цезарь с куриным филе", "Тауық еті қосылған Цезарь", "Caesar with Chicken"),
    desc: t(
      "Куриное филе, айсберг, черри, сухари, перепелиное яйцо, соус из анчоусов, пармезан",
      "Тауық еті, айсберг, черри, кептірілген нан, бөдене жұмыртқасы, анчоус соусы, пармезан",
      "Chicken fillet, iceberg lettuce, cherry tomatoes, croutons, quail egg, anchovy sauce, parmesan"
    ),
    price: 3490
  },
  {
    id: "sal_greek",
    cat: "salads",
    title: t("Салат греческий", "Грек салаты", "Greek Salad"),
    desc: t(
      "Помидоры, перец, огурцы, фета, шалот, маслины, оливковое масло, лимонный сок, орегано",
      "Қызанақ, бұрыш, қияр, фета, шалот, зәйтүн, зәйтүн майы, лимон шырыны, орегано",
      "Tomatoes, sweet pepper, cucumber, feta, shallot, olives, olive oil, lemon juice, oregano"
    ),
    price: 2990
  },
  {
    id: "sal_shrimp_orange",
    cat: "salads",
    title: t("Легкий салат с креветками и апельсинами", "Асшаяндар және апельсин қосылған жеңіл салат", "Light Shrimp & Orange Salad"),
    desc: t(
      "Руккола, тигровые креветки, черри, бальзамический крем, пармезан, прованс заправка",
      "Руккола, жолбарыс асшаяндары, черри, бальзамдық крем, пармезан, прованс тұздығы",
      "Arugula, tiger shrimp, cherry tomatoes, balsamic cream, parmesan, Provence dressing"
    ),
    price: 4990
  },

  // --- SOUPS ---
  { id: "s_ministrone", cat: "soups", title: t("Министроне", "Министроне", "Minestrone"), desc: t("", "", ""), price: 2990 },
  { id: "s_tomyam", cat: "soups", title: t("Том ям", "Том ям", "Tom Yum"), desc: t("", "", ""), price: 3990 },
  { id: "s_kuksi", cat: "soups", title: t("Кукси", "Кукси", "Kuksi"), desc: t("", "", ""), price: 3590 },
  { id: "s_okroshka", cat: "soups", title: t("Окрошка", "Окрошка", "Okroshka"), desc: t("", "", ""), price: 2590 },
  { id: "s_ramen_meat", cat: "soups", title: t("Рамен с мясом", "Ет қосылған рамен", "Ramen with Meat"), desc: t("", "", ""), price: 3590 },
  { id: "s_home_noodles", cat: "soups", title: t("Лапша по-домашнему", "Үй кеспесі", "Homemade Noodle Soup"), desc: t("", "", ""), price: 2990 },
  { id: "s_solyanka", cat: "soups", title: t("Солянка", "Солянка", "Solyanka"), desc: t("", "", ""), price: 3390 },
  { id: "s_lentil_cream", cat: "soups", title: t("Чечевичный крем-суп", "Жасымық крем-сорпасы", "Lentil Cream Soup"), desc: t("", "", ""), price: 2590 },

  // --- HOT DISHES ---
  {
    id: "h_seabass_uk",
    cat: "hot",
    title: t("Запечённый сибас по-британски", "Британша көмбештелген теңіз алабұғасы", "British-Style Baked Sea Bass"),
    desc: t("Подача: сливочный соус, микс зелени, черри, лимон, бальзамический соус", "Ұсыну: кілегей соусы, көкшөп қоспасы, черри, лимон, бальзам", "Served with creamy sauce, mixed greens, cherry tomatoes, lemon, balsamic sauce"),
    price: 5990
  },
  {
    id: "h_chicken_roll",
    cat: "hot",
    title: t("Куриный рулет с сыром", "Іріміші қосылған тауық орамасы", "Chicken Roulade with Cheese"),
    desc: t("Моцарелла, авторский соус. Подача: черри, рис, соус", "Моцарелла, авторлық соус. Ұсыну: черри, күріш, тұздық", "Mozzarella, house sauce. Served with cherry tomatoes, rice and sauce"),
    price: 4990
  },
  {
    id: "h_chicken_sweet_sour",
    cat: "hot",
    title: t("Курица в кисло-сладком соусе", "Тәтті қышқыл соустағы тауық еті", "Sweet & Sour Chicken"),
    desc: t("Хрустящее куриное филе, обжаренные овощи, черри, рис, кунжут, бальзамический соус", "Қытырлақ тауық, қуырылған көкөністер, черри, күріш, күнжіт, бальзам", "Crispy chicken fillet, stir-fried vegetables, cherry tomatoes, rice, sesame, balsamic sauce"),
    price: 4590
  },
  {
    id: "h_salmon_zander_duet",
    cat: "hot",
    title: t("Дуэт семги и судака", "Ақсерке мен көксерке дуэті", "Salmon & Zander Duet"),
    desc: t("Семга, судак, микс салата, сливочный соус, красная икра, черри", "Ақсерке, көксерке, көкшөп қоспасы, кілегей соус, қызыл уылдырық, черри", "Salmon, zander, mixed greens, creamy sauce, red caviar, cherry tomatoes"),
    price: 7290
  },
  {
    id: "h_quail_cream",
    cat: "hot",
    title: t("Перепелка в сливочном соусе", "Кілегей соусындағы бөдене", "Quail in Cream Sauce"),
    desc: t("С бейби-картофелем и спаржей. Подача: черри, бальзамический и сливочный соус", "Бейби картоп және спаржа. Ұсыну: черри, бальзам және кілегей соус", "With baby potatoes and asparagus. Served with cherry tomatoes, balsamic & cream sauce"),
    price: 3890
  },
  {
    id: "h_salmon_english",
    cat: "hot",
    title: t("Лосось в английском стиле", "Ағылшынша албырты", "English-Style Salmon"),
    desc: t("Норвежский лосось с брокколи, красной икрой, сливочным соусом, черри, лимоном и миксом зелени", "Брокколи, қызыл уылдырық, кілегей соус, черри, лимон және көкшөп қоспасы", "Norwegian salmon with broccoli, red caviar, creamy sauce, cherry tomatoes, lemon and mixed greens"),
    price: 7990
  },
  {
    id: "h_trout_english",
    cat: "hot",
    title: t("Форель жареная по-английски", "Ағылшынша қуырылған бақтақ", "English-Style Fried Trout"),
    desc: t("Подача: соус, черри, красная икра, микс зелени", "Ұсыну: тұздық, черри, қызыл уылдырық, көкшөп қоспасы", "Served with sauce, cherry tomatoes, red caviar and mixed greens"),
    price: 6990
  },
  {
    id: "h_dorado",
    cat: "hot",
    title: t("Дорадо", "Дорадо", "Dorado"),
    desc: t("Дорадо на гриле. Подача: соус и гарнир по подаче", "Грильде қуырылған дорадо", "Grilled dorado"),
    price: 6890
  },
  {
    id: "h_chicken_broccoli_cream",
    cat: "hot",
    title: t("Куриное филе с кремом из брокколи", "Брокколи креммен тауық сүбесі", "Chicken Fillet with Broccoli Cream"),
    desc: t("", "", ""),
    price: 7990
  },
  {
    id: "h_filet_mignon",
    cat: "hot",
    title: t("Филе миньон на подушке из шпината в ягодном соусе", "Саумалдық жастықшасындағы жидек соусымен миньон сүбесі", "Filet Mignon on Spinach with Berry Sauce"),
    desc: t("Ягодный соус на основе красного вина", "Қызыл шарап негізіндегі жидек соус", "Berry sauce based on red wine"),
    price: 8990
  },
  {
    id: "h_lamb_rack",
    cat: "hot",
    title: t("Каре ягненка в фисташковой панировке", "Пісте панировкадағы бағлан қабырғасы", "Pistachio-Crusted Lamb Rack"),
    desc: t("С гранатовым соусом и фисташками. Подача: черри, микс зелени, соус", "Анар соус және пісте. Ұсыну: черри, көкшөп қоспасы, соус", "With pomegranate sauce and pistachios. Served with cherry tomatoes, mixed greens and sauce"),
    price: 8790
  },
  {
    id: "h_zander_spinach",
    cat: "hot",
    title: t("Судак запеченый со шпинатом", "Саумалдық қосылған көмбештелген көксерке", "Baked Zander with Spinach"),
    desc: t("Сыр моцарелла на подушке из шпината. Подача: красная икра, микс зелени, черри, соус", "Моцарелла және саумалдық. Ұсыну: қызыл уылдырық, көкшөп, черри, соус", "Mozzarella on a spinach bed. Served with red caviar, mixed greens, cherry tomatoes, sauce"),
    price: 8590
  },

  // --- PASTA ---
  { id: "p_fettuccine_alfredo", cat: "pasta", title: t("Фетучини Альфредо", "Фетучини Альфредо", "Fettuccine Alfredo"), desc: t("", "", ""), price: 3990 },
  { id: "p_fettuccine_pesto_salmon", cat: "pasta", title: t("Фетучини с песто и семгой", "Песто және ақсеркелі фетучини", "Fettuccine with Pesto & Salmon"), desc: t("", "", ""), price: 4190 },
  { id: "p_spaghetti_beef", cat: "pasta", title: t("Спагетти с говядиной", "Сиыр етті спагетти", "Spaghetti with Beef"), desc: t("", "", ""), price: 3990 },
  { id: "p_de_mare", cat: "pasta", title: t("Де море", "Де море", "De Mare (Seafood Pasta)"), desc: t("", "", ""), price: 4990 },

  // --- GRILL ---
  { id: "g_ribeye", cat: "grill", title: t("Стейк рибай", "Рибай стейк", "Ribeye Steak"), desc: t("", "", ""), price: 9590 },
  { id: "g_tbone", cat: "grill", title: t("Стейк T-Bone", "T-Bone стейк", "T-Bone Steak"), desc: t("", "", ""), price: 8990 },
  { id: "g_tomahawk", cat: "grill", title: t("Стейк Томагавк", "Томагавк стейк", "Tomahawk Steak"), desc: t("", "", ""), price: 14990 },
  { id: "g_pepper_steak", cat: "grill", title: t("Пеппер стейк в сливочном соусе", "Кілегей соустағы пеппер стейк", "Pepper Steak in Cream Sauce"), desc: t("", "", ""), price: 7890 },
  { id: "g_chicken_grill_cream", cat: "grill", title: t("Куриное филе на гриле в сливочном соусе", "Кілегей соустағы гриль тауық сүбесі", "Grilled Chicken Fillet in Cream Sauce"), desc: t("", "", ""), price: 6990 },
  { id: "g_chicken_baby_potato", cat: "grill", title: t("Цыпленок с бейби картофелем", "Бейби картоппен тауық", "Chicken with Baby Potatoes"), desc: t("", "", ""), price: 7990 },

  // --- SETS ---
  {
    id: "set_guy_richie",
    cat: "sets",
    title: t("Гай Ричи (на 6 персон)", "Гай ричи (6 адамға)", "Guy Ritchie (for 6)"),
    desc: t(
      "Бон филе, стейк Томагавк, стейк T-Bon, микс салата, картофель фри",
      "Бон сүбесі, Томагавк, T-Bon, салат қоспасы, фри",
      "Bone fillet, Tomahawk steak, T-Bone steak, mixed salad, french fries"
    ),
    price: 32990
  },
  {
    id: "set_grill_mix",
    cat: "sets",
    title: t("Гриль микс (на 8 персон)", "Гриль микс (8 адамға)", "Grill Mix (for 8)"),
    desc: t(
      "Стейк семги, цыпленок табака, куриное филе, картофельные дольки, стейк T-Bon, овощи на гриле",
      "Ақсерке стейк, тауық, тауық сүбесі, картоп тілімдер, T-Bon, гриль көкөністер",
      "Salmon steak, chicken tabaka, chicken fillet, potato wedges, T-Bone steak, grilled vegetables"
    ),
    price: 42990
  },
  {
    id: "set_meat_shop",
    cat: "sets",
    title: t("Мясная лавка (на 8 персон)", "Мясная лавка (8 адамға)", "Meat Shop (for 8)"),
    desc: t(
      "Стейк T-Bon, стейк Рибай, куриное филе, микс салата, овощи гриль, утиное филе, соус, фри, картофельные дольки",
      "T-Bon, Рибай, тауық сүбесі, салат қоспасы, гриль көкөністер, үйрек сүбесі, соус, фри, картоп тілімдер",
      "T-Bone steak, ribeye steak, chicken fillet, mixed salad, grilled veggies, duck fillet, sauce, fries, potato wedges"
    ),
    price: 38990
  },
  {
    id: "set_royal_roaster",
    cat: "sets",
    title: t("Роял ростер", "Роял ростер", "Royal Roaster"),
    desc: t(
      "Куриное филе, цыпленок табака, куриные крылышки, куриные ножки, картофель фри, соус",
      "Тауық сүбесі, тауық, тауық қанатшалар, тауық бұлшықтар, фри, соус",
      "Chicken fillet, chicken tabaka, wings, drumsticks, fries, sauce"
    ),
    price: 32990
  },

  // --- BEER SETS ---
  {
    id: "beer_set_1",
    cat: "beerSets",
    title: t("Пивной сет 1", "Сыра сет 1", "Beer Set 1"),
    desc: t("Курт, чечил, чипсы, гренки, пивные креветки, соус", "Құрт, чечил, чипстер, қуырылған нан, сыра асшаяндар, соус", "Kurt, chechil cheese, chips, garlic croutons, beer shrimp, sauce"),
    price: 5990
  },
  {
    id: "beer_set_2",
    cat: "beerSets",
    title: t("Пивной сет 2", "Сыра сет 2", "Beer Set 2"),
    desc: t("Колбаски, гарлики, сырные шарики, чипсы, крылышки барбекю, соус", "Шұжықтар, қуырылған нан, ірімшік түйіршіктері, чипстер, барбекю қанатшалар, соус", "Sausages, garlic bread, cheese balls, chips, BBQ wings, sauce"),
    price: 7990
  },
  {
    id: "beer_set_vip",
    cat: "beerSets",
    title: t("Пивной сет VIP", "VIP сыра сеты", "Beer Set VIP"),
    desc: t(
      "Пивные креветки, сырные шарики, колбаски, картофельные дольки, гарлики, крылышки барбекю, сырные палочки, наггетсы, чечил, жареная мойва, курт, соус, арахис",
      "Асшаяндар, ірімшік түйіршіктері, шұжықтар, картоп тілімдері, гарлики, барбекю қанатшалар, ірімшік таяқшалар, наггетстер, чечил, қуырылған мойва, құрт, соус, жержаңғақ",
      "Beer shrimp, cheese balls, sausages, potato wedges, garlic bread, BBQ wings, cheese sticks, nuggets, chechil, fried smelt, kurt, sauce, peanuts"
    ),
    price: 9990
  },

  // --- SUSHI ---
  { id: "su_fried_america", cat: "sushi", title: t("Жаренный ролл Америка", "Америка қуырылған роллы", "Fried Roll America"), desc: t("", "", ""), price: 3990 },
  { id: "su_fried_kani_hotto", cat: "sushi", title: t("Жаренный ролл Кани хотто", "Кани хотто қуырылған роллы", "Fried Roll Kani Hotto"), desc: t("", "", ""), price: 2990 },
  { id: "su_fried_ebi_hotto", cat: "sushi", title: t("Жаренный ролл Эби хотто", "Эби хотто қуырылған роллы", "Fried Roll Ebi Hotto"), desc: t("", "", ""), price: 4290 },
  { id: "su_fried_caesar", cat: "sushi", title: t("Жаренный ролл Цезарь", "Цезарь қуырылған роллы", "Fried Roll Caesar"), desc: t("", "", ""), price: 2990 },
  { id: "su_banzai_baked", cat: "sushi", title: t("Запеченный ролл Банзай", "Банзай пеште ролл", "Baked Roll Banzai"), desc: t("", "", ""), price: 4390 },
  { id: "su_alaska", cat: "sushi", title: t("Ролл Аляска", "Аляска роллы", "Alaska Roll"), desc: t("", "", ""), price: 4990 },
  { id: "su_sake_maki", cat: "sushi", title: t("Ролл Саке маки", "Саке маки роллы", "Sake Maki Roll"), desc: t("", "", ""), price: 2990 },
  { id: "su_philadelphia", cat: "sushi", title: t("Ролл Филадельфия", "Филадельфия роллы", "Philadelphia Roll"), desc: t("", "", ""), price: 3890 },
  { id: "su_sake", cat: "sushi", title: t("Суши Саке", "Саке суши", "Sake Sushi"), desc: t("", "", ""), price: 1990 },
  { id: "su_unagi", cat: "sushi", title: t("Суши Унаги", "Унаги суши", "Unagi Sushi"), desc: t("", "", ""), price: 1890 },
  { id: "su_ebi", cat: "sushi", title: t("Суши Эби", "Эби суши", "Ebi Sushi"), desc: t("", "", ""), price: 1790 },

  // --- COLD STARTERS ---
  {
    id: "cold_fish_assorti",
    cat: "cold",
    title: t("Рыбное ассорти", "Балық ассорти", "Fish Platter"),
    desc: t("Копченая семга, эсколар, копчёный угорь, красная икра, креветки, каперсы, свежая зелень", "Ыстылған ақсерке, эсколар, ыстылған жыланбалық, қызыл уылдырық, асшаяндар, каперс, балғын көк", "Smoked salmon, escolar, smoked eel, red caviar, shrimp, capers, fresh herbs"),
    price: 10990
  },
  {
    id: "cold_cheese_assorti",
    cat: "cold",
    title: t("Сырное ассорти", "Ірімшік ассорти", "Cheese Platter"),
    desc: t("Пармезан, Эменталь, Бри, голубой сыр, виноград, орехи, мёд", "Пармезан, Эменталь, Бри, көк ірімшік, жүзім, жаңғақ, бал", "Parmesan, Emmental, Brie, blue cheese, grapes, nuts, honey"),
    price: 9990
  },
  { id: "cold_caprese", cat: "cold", title: t("Капрезе", "Капрезе", "Caprese"), desc: t("", "", ""), price: 2990 },

  // --- PICKLES / RAZNOSOLY ---
  { id: "pick_eggplant_rolls", cat: "pickles", title: t("Рулетики из баклажан с грецкими орехами", "Жаңғақ қосылған баклажан орамшалар", "Eggplant Rolls with Walnuts"), desc: t("", "", ""), price: 2990 },
  { id: "pick_horse_assorti", cat: "pickles", title: t("Конское ассорти", "Жылқы ассорти", "Horse Meat Platter"), desc: t("", "", ""), price: 9990 },
  { id: "pick_caucasus", cat: "pickles", title: t("Кавказское ассорти", "Кавказ ассорти", "Caucasus Platter"), desc: t("", "", ""), price: 3590 },
  { id: "pick_russian", cat: "pickles", title: t("Русская закуска", "Орыс дәмтағамы", "Russian Appetizer"), desc: t("", "", ""), price: 3590 },
  { id: "pick_ena_tongue", cat: "pickles", title: t("Эна (рулетики из говяжьего языка)", "Эна (сиыр тілі орамшалары)", "ENA (Beef Tongue Rolls)"), desc: t("Рулетики из отварного говяжьего языка с ореховой начинкой", "Піскен сиыр тілінен жаңғақ салындысымен", "Boiled beef tongue rolls with nut filling"), price: 3990 },

  // --- HOT SNACKS ---
  { id: "hs_bone_marrow", cat: "hotSnacks", title: t("Кости мозговые говяжьи", "Сиырдың ми сүйектері", "Beef Bone Marrow"), desc: t("", "", ""), price: 4990 },
  { id: "hs_garlic_croutons", cat: "hotSnacks", title: t("Чесночные гренки", "Сарымсақпен қуырылған нан кесектері", "Garlic Croutons"), desc: t("", "", ""), price: 1990 },
  {
    id: "hs_sausage_assorti",
    cat: "hotSnacks",
    title: t("Ассорти колбасок", "Шұжықтар ассорти", "Sausage Assortment"),
    desc: t(
      "Обжаренные колбаски: куриная, телятина, баранина, индейка с сыром. Подаётся с квашеной капустой и картофельными дольками",
      "Қуырылған шұжықтар: тауық, бұзау, қой, ірімшікпен күркетауық. Ашытқан қырыққабат және картоп тілімдерімен",
      "Fried sausages: chicken, veal, lamb, turkey with cheese. Served with sauerkraut and potato wedges"
    ),
    price: 8990
  },
  { id: "hs_fried_tiger_shrimp", cat: "hotSnacks", title: t("Жареные тигровые креветки", "Қуырылған жолбарыс асшаяндары", "Fried Tiger Shrimp"), desc: t("", "", ""), price: 6990 },

  // --- SIDES (поставил по значениям с картинки; если скажешь — поправлю за 30 сек) ---
  { id: "side_asparagus", cat: "sides", title: t("Спаржа", "Спаржа", "Asparagus"), desc: t("", "", ""), price: 2190 },
  { id: "side_broccoli", cat: "sides", title: t("Брокколи с чесноком", "Сарымсақ қосылған брокколи", "Broccoli with Garlic"), desc: t("", "", ""), price: 1990 },
  { id: "side_fries", cat: "sides", title: t("Картофель фри", "Фри картоп", "French Fries"), desc: t("", "", ""), price: 1490 },
  { id: "side_wedges", cat: "sides", title: t("Картофельные дольки", "Картоп тілімдері", "Potato Wedges"), desc: t("", "", ""), price: 1490 },
  { id: "side_rice", cat: "sides", title: t("Рис", "Күріш", "Rice"), desc: t("", "", ""), price: 1890 },
  { id: "side_ratatouille", cat: "sides", title: t("Рататуй", "Рататуй", "Ratatouille"), desc: t("", "", ""), price: 1590 },
  { id: "side_grilled_veg", cat: "sides", title: t("Овощи на гриле", "Гриль көкөністер", "Grilled Vegetables"), desc: t("", "", ""), price: 2590 },

  // --- DESSERT / ASSORTI ---
  { id: "ass_fruit", cat: "dessert", title: t("Фруктовое ассорти", "Жеміс ассорти", "Fruit Platter"), desc: t("", "", ""), price: 9990 },
  { id: "ass_bread", cat: "dessert", title: t("Хлебное ассорти", "Нан ассорти", "Bread Basket"), desc: t("", "", ""), price: 990 },

  { id: "d_heart", cat: "dessert", title: t("Сердце", "Жүрек", "Heart"), desc: t("", "", ""), price: 3390 },
  { id: "d_pistachio", cat: "dessert", title: t("Фисташка", "Пісте", "Pistachio"), desc: t("", "", ""), price: 3300 },
  { id: "d_banoffee", cat: "dessert", title: t("Banoffee", "Banoffee", "Banoffee"), desc: t("", "", ""), price: 4300 },
  { id: "d_financier", cat: "dessert", title: t("Кекс Финансье", "Финансье кексы", "Financier Cake"), desc: t("", "", ""), price: 2090 },
  { id: "d_origami", cat: "dessert", title: t("Оригами", "Оригами", "Origami"), desc: t("", "", ""), price: 2690 },
  { id: "d_hemisphere", cat: "dessert", title: t("Полусфера", "Жартысфера", "Hemisphere"), desc: t("", "", ""), price: 2990 },

  // ================= BAR MENU =================
  // --- NON-ALCOHOLIC ---
  { id: "na_redbull", cat: "barNA", title: t("Red Bull", "Red Bull", "Red Bull"), desc: t("1 шт", "1 дана", "1 can"), price: 1800 },
  { id: "na_borjomi_05", cat: "barNA", title: t("Borjomi 0,5", "Borjomi 0,5", "Borjomi 0.5L"), desc: t("", "", ""), price: 1600 },
  { id: "na_vittel_05", cat: "barNA", title: t("Vittel 0,5", "Vittel 0,5", "Vittel 0.5L"), desc: t("", "", ""), price: 1500 },
  { id: "na_cola_025", cat: "barNA", title: t("Coca Cola / Sprite / Fanta / Cola Zero 0,25", "Coca Cola / Sprite / Fanta / Cola Zero 0,25", "Coca Cola / Sprite / Fanta / Zero 0.25L"), desc: t("", "", ""), price: 1300 },
  { id: "na_perrier_033", cat: "barNA", title: t("Perrier Naturel 0,33", "Perrier Naturel 0,33", "Perrier 0.33L"), desc: t("", "", ""), price: 2000 },
  { id: "na_swell_025", cat: "barNA", title: t("Swell 0,25", "Swell 0,25", "Swell 0.25L"), desc: t("", "", ""), price: 2000 },
  { id: "na_swell_075", cat: "barNA", title: t("Swell 0,75", "Swell 0,75", "Swell 0.75L"), desc: t("", "", ""), price: 4000 },

  { id: "na_lemon_mango", cat: "barNA", title: t("Лимонад Манго-Маракуйя 1л", "Манго-маракуйя лимонады 1л", "Mango-Passion Fruit Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_raspberry", cat: "barNA", title: t("Лимонад Малина-Личи 1л", "Таңқурай-личи лимонады 1л", "Raspberry-Lychee Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_kiwi", cat: "barNA", title: t("Лимонад Киви-Зелёное яблоко 1л", "Киви-жасыл алма лимонады 1л", "Kiwi-Green Apple Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_pine", cat: "barNA", title: t("Лимонад Ананас-Грейпфрут 1л", "Ананас-грейпфрут лимонады 1л", "Pineapple-Grapefruit Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_wild", cat: "barNA", title: t("Лимонад Лесные ягоды 1л", "Жабайы жидек лимонады 1л", "Wild Berry Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_home", cat: "barNA", title: t("Домашний лимонад 1л", "Үй лимонады 1л", "Homemade Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_pom_lime", cat: "barNA", title: t("Лимонад Гранат-Лайм 1л", "Анар-лайм лимонады 1л", "Pomegranate-Lime Lemonade 1L"), desc: t("", "", ""), price: 3200 },
  { id: "na_lemon_elder", cat: "barNA", title: t("Лимонад Бузина-Личи 1л", "Бузина-личи лимонады 1л", "Elderflower-Lychee Lemonade 1L"), desc: t("", "", ""), price: 3200 },

  // --- COFFEE & TEA ---
  { id: "ct_latte", cat: "barCoffeeTea", title: t("Латте", "Латте", "Latte"), desc: t("", "", ""), price: 1100 },
  { id: "ct_capp", cat: "barCoffeeTea", title: t("Капучино", "Капучино", "Cappuccino"), desc: t("", "", ""), price: 1800 },
  { id: "ct_esp", cat: "barCoffeeTea", title: t("Эспрессо", "Эспрессо", "Espresso"), desc: t("", "", ""), price: 1800 },
  { id: "ct_glasse", cat: "barCoffeeTea", title: t("Глясе", "Глясе", "Glace"), desc: t("",_toggle: "n/a", ), price: 1300 },

  // (ПРОСТО: в JS нельзя так — исправил ниже)
];

// Быстро допишем “хвост” барного меню отдельным экспортом (чтобы не перегружать один массив в ответе)
export const BAR_EXTRA = [
  // Coffee/Tea continue
  { id: "ct_irish", cat: "barCoffeeTea", title: t("Irish coffee", "Irish coffee", "Irish Coffee"), desc: t("", "", ""), price: 1400 },
  { id: "ct_raf", cat: "barCoffeeTea", title: t("Raf", "Raf", "Raf"), desc: t("", "", ""), price: 2100 },
  { id: "ct_black_tea", cat: "barCoffeeTea", title: t("Чай черный", "Қара шай", "Black Tea"), desc: t("", "", ""), price: 2000 },
  { id: "ct_green_tea", cat: "barCoffeeTea", title: t("Чай зеленый", "Жасыл шай", "Green Tea"), desc: t("", "", ""), price: 2000 },
  { id: "ct_shu_puer", cat: "barCoffeeTea", title: t("Шу пуэр", "Шу пуэр", "Shu Pu-erh"), desc: t("", "", ""), price: 2100 },
  { id: "ct_milk_oolong", cat: "barCoffeeTea", title: t("Молочный улун", "Сүтті улун", "Milk Oolong"), desc: t("", "", ""), price: 2200 },
  { id: "ct_tashkent", cat: "barCoffeeTea", title: t("Ташкентский чай", "Ташкент шайы", "Tashkent Tea"), desc: t("", "", ""), price: 2700 },
  { id: "ct_moroccan", cat: "barCoffeeTea", title: t("Марокканский чай", "Марокко шайы", "Moroccan Tea"), desc: t("", "", ""), price: 2600 },
  { id: "ct_wildberry", cat: "barCoffeeTea", title: t("Чай лесные ягоды", "Жабайы жидек шайы", "Wild Berry Tea"), desc: t("", "", ""), price: 2800 },

  // Cocktails (по PDF идут списком — оставляю все позиции с одной ценой, как в документе)
  ...[
    "Long Island Ice Tea",
    "Aperol Spritz Virgin",
    "Blood Pandora",
    "Stirling",
    "Clover Club",
    "Stuart",
    "Kirke",
    "Bloody Mary",
    "New York Sour",
    "Boulevardier",
    "Margarita",
    "Old Fashioned",
    "French 75",
    "Manhattan"
  ].map((name, i) => ({
    id: `ck_${i}`,
    cat: "barCocktails",
    title: t(name, name, name),
    desc: t("Коктейль", "Коктейль", "Cocktail"),
    price: i === 0 ? 3850 : 3500 // Long Island в PDF выделен 3850, остальные 3500
  })),

  // Spirits — Vodka (50 ml)
  ...[
    ["Absolut Blue", 2200],
    ["Absolut Citron", 2200],
    ["Absolut Kurant", 2200],
    ["Absolut Vanilia", 2200],
    ["Absolut Grapefruit", 2200],
    ["Absolut Lime", 2200],
    ["Absolut Mango", 2200],
    ["Absolut Pears", 2200],
    ["Absolut Passionfruit", 2200],
    ["Absolut Elyx", 2600],
    ["Wyborowa", 2000],
    ["Ice Cold Shot -18°C: Jägermeister", 2100]
  ].map(([name, price], i) => ({
    id: `sp_vod_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Spirits — Rum
  ...[
    ["Havana Club 3yo", 2000],
    ["Havana Club 7yo", 2300],
    ["Havana Club Especial Plus", 0],
    ["Havana Club Cuban Spiced", 0]
  ].map(([name, price], i) => ({
    id: `sp_rum_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: price ? t("50 мл", "50 мл", "50 ml") : t("50 мл (цена уточняется)", "50 мл (бағасы нақтыланады)", "50 ml (price уточняется)"),
    price: price || 0
  })),

  // Liqueurs
  ...[
    ["Malibu", 2000],
    ["Becherovka", 1800],
    ["Kahlua", 2000],
    ["Baileys", 2300],
    ["Absinthe Tunel Black", 2500],
    ["Sambuca Extra Molinar", 2100],
    ["Limoncello", 2200]
  ].map(([name, price], i) => ({
    id: `sp_liq_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Beer (draft + bottle)
  ...[
    ["Bud (разливное)", 1600],
    ["Praga (разливное)", 2900],
    ["Guinness Can’d Draught", 3500],
    ["Corona Extra", 2600],
    ["Miller", 1400],
    ["Heineken", 2800]
  ].map(([name, price], i) => ({
    id: `beer_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("Пиво", "Сыра", "Beer"),
    price
  })),

  // Cognac
  ...[
    ["Ararat 5yo", 3500],
    ["Ararat ANI 7yo", 3500],
    ["Ararat Akhtamar 10yo", 5500],
    ["Martell VS", 10500],
    ["Martell VSOP", 2100],
    ["Martell XO", 2300]
  ].map(([name, price], i) => ({
    id: `cog_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Gin
  ...[
    ["Beefeater", 2100],
    ["Beefeater Blackberry", 2400],
    ["Beefeater Blood Orange", 2100],
    ["Beefeater Pink Blackberry", 2300],
    ["Monkey 47", 4000]
  ].map(([name, price], i) => ({
    id: `gin_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Tequila
  ...[
    ["Olmeca Blanco", 2100],
    ["Olmeca Gold", 1800],
    ["Avion Silver", 1800],
    ["Avion Reposado", 1800]
  ].map(([name, price], i) => ({
    id: `teq_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Whisky (как в PDF)
  ...[
    ["The Glenlivet Found Reserve", 3000],
    ["The Glenlivet 12yo Excellence", 5000],
    ["The Glenlivet French 15yo", 7100],
    ["The Glenlivet 18yo", 10000],
    ["Aberlour 12yo", 5300],
    ["Aberlour 14yo", 8000],
    ["Jameson Original", 3000],
    ["Jameson Black Barrel", 5000],
    ["Jameson Crested", 4000],
    ["Jameson IPA", 2000],
    ["Jameson Cold Brew", 1900],
    ["Jameson Orange", 2200],
    ["Chivas Regal 12yo", 2200],
    ["Chivas Regal 18yo", 2300],
    ["Chivas Regal Extra", 2300],
    ["Ballantine's Finest", 2300],
    ["Ballantine's Passion", 2300],
    ["Ballantine’s 7yo", 2300],
    ["Method and Madness Single Grain", 2400],
    ["Four Roses", 2000]
  ].map(([name, price], i) => ({
    id: `wh_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Vermouth
  ...[
    ["Martini Bianco", 2000],
    ["Martini Rosso", 2000],
    ["Martini Extra Dry", 2000],
    ["Martini Reserva Bitter", 2000]
  ].map(([name, price], i) => ({
    id: `ver_${i}`,
    cat: "barSpirits",
    title: t(name, name, name),
    desc: t("50 мл", "50 мл", "50 ml"),
    price
  })),

  // Wine & sparkling
  ...[
    ["Montelvini Asolo Prosecco Brut", 26000],
    ["Signore Giuseppe Prosecco Spumante Extra Dry", 20000],
    ["Jacob’s Creek Sparkling Moscato", 21000],
    ["Santo Stefano", 10000],
    ["Cafe De Paris Rose", 17000],
    ["G.H. Mumm Cordon Rouge Brut", 41000],
    ["Martini ASTI DOCG", 16200],
    ["Campo Viejo Tempranillo", 12000],
    ["Campo Viejo Blanco", 12000],
    ["Campo Viejo Reserva", 16500],
    ["Campo Viejo Gran Reserva", 22000],
    ["770 Miles Chardonnay (бел. сух.)", 16000],
    ["770 Miles Cabernet Sauvignon (крас. сух.)", 16000],
    ["Bistrot Chic (Merlot Cabernet Syrah) (красн. полусух.)", 21000],
    ["Zenato Lugana Doc \"San Benedetto\" (бел. полусух.)", 42000],
    ["Viajero Sauvignon Blanc (semi sweet)", 12000],
    ["Viajero Cabernet Sauvignon (semi sweet)", 12000],
    ["I Balzi Shiraz Terre Siciliane IGT (красн. сух.)", 24000],
    ["Cune Rioja Blanco Semidulce (бел. полуслад.)", 18000],
    ["Poggio Alla Guardia Maremma Toscana (красн. сух.)", 36000],
    ["Marlborough Sun Sauvignon Blanc (бел. сух.)", 21000],
    ["Sirius Bordeaux Blanc (бел. сух.)", 21000],
    ["Château Haut-Mondain Moelleux (бел. полуслад.)", 18000],
    ["Lamblin Muscat (бел. сух.)", 18000],
    ["Marlborough Sun Pinot Noir (красн. сух.)", 27000],
    ["Villa Cardini Chianti (красн. сух.)", 22000],
    ["Chateau Terrebonne Cotes De Provence (розовое сух.)", 31000]
  ].map(([name, price], i) => ({
    id: `wine_${i}`,
    cat: "barWine",
    title: t(name, name, name),
    desc: t("Бутылка", "Бөтелке", "Bottle"),
    price
  }))
];

// Объединим в одном месте (чтобы App использовал один массив)
export const ALL_ITEMS = [...MENU.filter(Boolean), ...BAR_EXTRA];
