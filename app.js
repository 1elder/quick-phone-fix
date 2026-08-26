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

/* ---- Dynamic renderers (categories + reviews), language-aware ---- */
function renderCategories() {
  const grid = $("#cat-grid");
  if (!grid) return;
  grid.innerHTML = SHOP_CATEGORIES.map(c => {
    const name = (LANG === "es" && c.name_es) ? c.name_es : c.name;
    const desc = (LANG === "es" && c.desc_es) ? c.desc_es : c.desc;
    return `
    <div class="cat">
      <span class="cat-ic"><svg class="ic"><use href="#${c.icon}"/></svg></span>
      <h3>${name}</h3>
      <p>${desc}</p>
    </div>`;
  }).join("");
}
function renderReviews() {
  const grid = $("#rev-grid");
  if (!grid) return;
  const stars = '<span class="rev-stars">' + '<svg class="ic"><use href="#i-star"/></svg>'.repeat(5) + '</span>';
  const anon = LANG === "es" ? "Reseña de Google" : "Google review";
  grid.innerHTML = REVIEWS.map(r => {
    const named = r.name && r.name.trim();
    const initial = named ? r.name.trim()[0] : "G";
    const displayName = named ? r.name : anon;
    return `
    <div class="rev">
      ${stars}
      <p>"${r.text}"</p>
      <div class="rev-who">
        <span class="rev-av">${initial}</span>
        <div><div class="rev-name">${displayName}</div><div class="rev-src">${r.src}</div></div>
      </div>
    </div>`;
  }).join("");
}

/* ---- Repair estimator ---- */
const estState = { brand: null, issue: null };
function renderEstimate() {
  const step2 = $('.est-step[data-step="2"]');
  const empty = $("#er-empty"), card = $("#er-card");
  if (estState.brand) step2?.classList.remove("is-locked");
  if (!(estState.brand && estState.issue)) return;

  const [price, time] = (PRICING[estState.brand]?.[estState.issue]) || ["Quoted in store", "Bring it in — we'll take a look"];
  $("#er-device").textContent = `${tBrand(estState.brand)} · ${tIssue(estState.issue)}`;
  $("#er-price").textContent = tPhrase(price);
  $("#er-time").innerHTML = `<svg class="ic"><use href="#i-clock"/></svg> ${tPhrase(time)}`;
  const msg = LANG === "es"
    ? `Hola! Quisiera una cotización para mi ${estState.brand} — ${tIssue(estState.issue)}.`
    : `Hi! I'd like a repair quote for my ${estState.brand} — ${estState.issue}.`;
  $("#er-book").setAttribute("href", `sms:+13212367773?&body=${encodeURIComponent(msg)}`);
  if (empty) empty.hidden = true;
  if (card) card.hidden = false;
}
(function estimatorInit() {
  const root = $("#estimator");
  if (!root) return;
  const mark = (group, key, val) => $$(`#${group} .chip`).forEach(c => c.classList.toggle("sel", c.dataset[key] === val));
  $$("#opt-brand .chip").forEach(c => c.addEventListener("click", () => {
    estState.brand = c.dataset.brand; mark("opt-brand", "brand", estState.brand); renderEstimate();
  }));
  $$("#opt-issue .chip").forEach(c => c.addEventListener("click", () => {
    if (!estState.brand) return;
    estState.issue = c.dataset.issue; mark("opt-issue", "issue", estState.issue); renderEstimate();
  }));
})();

/* ---- Re-render everything language-dependent (called by applyI18n) ---- */
window.renderDynamic = function () {
  renderCategories();
  renderReviews();
  if (estState.brand && estState.issue) renderEstimate();
};

/* ---- Scroll reveal (subtle) ---- */
(function reveal() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = $$(".svc, .cat, .rev, .strip-item, .hero-card, .art-card");
  els.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(14px)"; el.style.transition = "opacity .5s var(--ease, ease), transform .5s var(--ease, ease)"; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "none"; io.unobserve(e.target); } });
  }, { threshold: .12 });
  els.forEach(el => io.observe(el));
})();

/* ---- Apply translations + initial dynamic render ---- */
applyI18n();
