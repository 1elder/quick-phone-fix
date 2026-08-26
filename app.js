/* ================= APP ================= */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---- Year ---- */
$("#yr").textContent = new Date().getFullYear();

/* ---- Mobile menu ---- */
$("#menu-btn")?.addEventListener("click", () => $("#nav-links").classList.toggle("open"));
$$("#nav-links a").forEach(a => a.addEventListener("click", () => $("#nav-links").classList.remove("open")));

/* ---- FAQ accordion ---- */
$$(".faq-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("open")));

/* ---- Smoke shop categories ---- */
(function shop() {
  const grid = $("#cat-grid");
  if (!grid) return;
  grid.innerHTML = SHOP_CATEGORIES.map(c => `
    <div class="cat">
      <span class="cat-ic"><svg class="ic"><use href="#${c.icon}"/></svg></span>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </div>`).join("");
})();

/* ---- Reviews ---- */
(function reviews() {
  const grid = $("#rev-grid");
  if (!grid) return;
  const stars = '<span class="rev-stars">' + '<svg class="ic"><use href="#i-star"/></svg>'.repeat(5) + '</span>';
  grid.innerHTML = REVIEWS.map(r => {
    const named = r.name && r.name.trim();
    const initial = named ? r.name.trim()[0] : "G";
    const displayName = named ? r.name : "Google review";
    return `
    <div class="rev">
      ${stars}
      <p>"${r.text}"</p>
      <div class="rev-who">
        <span class="rev-av">${initial}</span>
        <div><div class="rev-name">${displayName}</div><div class="rev-src">${r.src}</div></div>
      </div>
    </div>`; }).join("");
})();

/* ---- Repair estimator ---- */
(function estimator() {
  const root = $("#estimator");
  if (!root) return;
  const state = { brand: null, issue: null };
  const step2 = $('.est-step[data-step="2"]');
  const empty = $("#er-empty"), card = $("#er-card");
  const elDevice = $("#er-device"), elPrice = $("#er-price"), elTime = $("#er-time"), elBook = $("#er-book");

  function pick(group, key, val) {
    $$(`#${group} .chip`).forEach(c => c.classList.toggle("sel", c.dataset[key] === val));
  }

  function render() {
    if (state.brand) step2.classList.remove("is-locked");
    if (state.brand && state.issue) {
      const [price, time] = (PRICING[state.brand]?.[state.issue]) || ["Quoted in store", "Bring it in"];
      elDevice.textContent = `${state.brand} · ${state.issue}`;
      elPrice.textContent = price;
      elTime.innerHTML = `<svg class="ic"><use href="#i-clock"/></svg> ${time}`;
      const body = encodeURIComponent(`Hi! I'd like a repair quote for my ${state.brand} — ${state.issue}.`);
      elBook.setAttribute("href", `sms:+13212367773?&body=${body}`);
      empty.hidden = true; card.hidden = false;
    }
  }

  $$("#opt-brand .chip").forEach(c => c.addEventListener("click", () => {
    state.brand = c.dataset.brand; pick("opt-brand", "brand", state.brand); render();
  }));
  $$("#opt-issue .chip").forEach(c => c.addEventListener("click", () => {
    if (!state.brand) return;
    state.issue = c.dataset.issue; pick("opt-issue", "issue", state.issue); render();
  }));
})();

/* ---- Scroll reveal (subtle) ---- */
(function reveal() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = $$(".svc, .cat, .rev, .strip-item, .hero-card, .art-card");
  els.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(14px)"; el.style.transition = "opacity .5s var(--ease, ease), transform .5s var(--ease, ease)"; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "none"; io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  els.forEach(el => io.observe(el));
})();
