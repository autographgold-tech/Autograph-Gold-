import React, { useMemo, useState } from "react";
import { ALL_ITEMS, CATEGORIES, LANGS, UI } from "./data/menuData";

const WHATSAPP = "87010322021";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Здравствуйте! Хочу уточнить по меню Autograph Karaoke.")}`;

const money = (n) => (Number.isFinite(n) ? n.toLocaleString("ru-RU") : "0");
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function Icon({ name, className = "w-5 h-5" }) {
  // Мини-иконки (без библиотек)
  if (name === "cart")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M6 6h15l-1.5 9h-12L6 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
        <path d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
      </svg>
    );
  if (name === "search")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" />
        <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (name === "x")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (name === "calc")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 10h2M12 10h2M16 10h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 14h2M12 14h2M8 18h2M12 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  return null;
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-full text-sm whitespace-nowrap transition",
        active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [lang, setLang] = useState("ru");
  const [cat, setCat] = useState("salads");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // cart: { [id]: qty }
  const [cart, setCart] = useState({});
  const [guests, setGuests] = useState(1);

  const tr = (obj) => obj?.[lang] ?? obj?.ru ?? "";

  const itemsByCat = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_ITEMS.filter((it) => {
      if (it.price === 0) return false; // скрыть позиции "цена уточняется" (можно включить при желании)
      const matchesCat = it.cat === cat;
      if (!matchesCat) return false;
      if (!q) return true;
      const hay = `${tr(it.title)} ${tr(it.desc)}`.toLowerCase();
      return hay.includes(q);
    });
  }, [cat, query, lang]);

  const cartItems = useMemo(() => {
    const ids = Object.keys(cart);
    return ids
      .map((id) => {
        const item = ALL_ITEMS.find((x) => x.id === id);
        if (!item) return null;
        return { ...item, qty: cart[id] };
      })
      .filter(Boolean);
  }, [cart]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [cartItems]);

  const totalCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const add = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const dec = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      const v = (next[id] ?? 0) - 1;
      if (v <= 0) delete next[id];
      else next[id] = v;
      return next;
    });
  };

  const clear = () => setCart({});

  const perGuest = guests > 0 ? Math.round(total / guests) : total;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/85 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.jpg"
              alt="Autograph Karaoke"
              className="w-12 h-12 rounded-xl object-cover shadow-soft border border-white/10"
            />
            <div className="min-w-0">
              <div className="text-lg font-semibold tracking-wide">Autograph Karaoke</div>
              <div className="text-xs text-white/60">{tr(UI.title)}</div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Lang switch */}
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/10">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition",
                    lang === l ? "bg-white text-black" : "text-white/80 hover:text-white"
                  ].join(" ")}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition shadow-soft"
            >
              <Icon name="cart" className="w-5 h-5" />
              <span className="text-sm font-semibold">{tr(UI.cart)}</span>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-2xl px-3 py-2">
            <Icon name="search" className="w-5 h-5 text-white/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr(UI.search)}
              className="w-full bg-transparent outline-none text-sm placeholder:text-white/50"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-white/70 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <Pill
                key={c.id}
                active={cat === c.id}
                onClick={() => {
                  setCat(c.id);
                  // сброс поиска не делаем — так удобнее
                }}
              >
                {tr(c.name)}
              </Pill>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-5">
        <div className="grid gap-3">
          {itemsByCat.map((it) => (
            <div
              key={it.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-base leading-tight">{tr(it.title)}</div>
                      {tr(it.desc) ? (
                        <div className="mt-1 text-sm text-white/70 leading-snug">{tr(it.desc)}</div>
                      ) : null}
                      {it.desc && it.desc[lang] === "" && it.desc.ru === "" ? null : null}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold">
                        {money(it.price)} {tr(UI.currency)}
                      </div>
                      <div className="text-xs text-white/60">{it.desc?.ru?.includes("50") ? " " : ""}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => add(it.id)}
                      className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-semibold"
                    >
                      {tr(UI.add)}
                    </button>

                    {cart[it.id] ? (
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-white/70">{tr(UI.qty)}:</span>
                        <button
                          onClick={() => dec(it.id)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                        >
                          −
                        </button>
                        <div className="w-10 text-center font-semibold">{cart[it.id]}</div>
                        <button
                          onClick={() => add(it.id)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="ml-auto text-xs text-white/50">{tr(UI.added)}: 0</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {itemsByCat.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
              Ничего не найдено.
            </div>
          )}
        </div>
      </main>

      {/* WhatsApp floating button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-green-500 text-white px-4 py-3 shadow-soft hover:brightness-110 transition"
      >
        {tr(UI.whatsapp)}
      </a>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 shadow-soft">
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
              <div className="font-semibold text-lg">{tr(UI.cart)}</div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={clear}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                >
                  {tr(UI.clear)}
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white text-black hover:bg-white/90"
                >
                  <Icon name="x" className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 overflow-auto h-[calc(100%-220px)]">
              {cartItems.length === 0 ? (
                <div className="text-white/70 text-sm">{tr(UI.empty)}</div>
              ) : (
                cartItems.map((it) => (
                  <div key={it.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold">{tr(it.title)}</div>
                        <div className="text-sm text-white/70">
                          {money(it.price)} {tr(UI.currency)} × {it.qty}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dec(it.id)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                        >
                          −
                        </button>
                        <div className="w-8 text-center font-semibold">{it.qty}</div>
                        <button
                          onClick={() => add(it.id)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculator */}
            <div className="p-4 border-t border-white/10 bg-black">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="calc" className="w-5 h-5 text-white/80" />
                <div className="font-semibold">{tr(UI.calc)}</div>
                <div className="ml-auto text-white/70 text-sm">
                  {tr(UI.total)}:{" "}
                  <span className="text-white font-bold">
                    {money(total)} {tr(UI.currency)}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm text-white/80">{tr(UI.guests)}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests((g) => clamp(g - 1, 1, 100))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                      −
                    </button>
                    <input
                      value={guests}
                      onChange={(e) => {
                        const v = parseInt(e.target.value || "1", 10);
                        setGuests(clamp(Number.isFinite(v) ? v : 1, 1, 100));
                      }}
                      className="w-16 text-center bg-white/10 border border-white/10 rounded-xl py-2 outline-none"
                    />
                    <button
                      onClick={() => setGuests((g) => clamp(g + 1, 1, 100))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="text-white/70">{tr(UI.perGuest)}</div>
                  <div className="font-bold">
                    {money(perGuest)} {tr(UI.currency)}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-white/50">
                * Корзина — для удобства подсчёта. Оплата не проводится онлайн.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


