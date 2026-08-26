/* ================= DATA ================= */
/* Placeholder content — swap real reviews + smoke-shop menu when they arrive. */

const SHOP_CATEGORIES = [
  { icon: "i-vape",  name: "Vapes & Disposables", desc: "Top brands, big flavor selection." },
  { icon: "i-cigar", name: "Cigars",              desc: "Singles and boxes, kept fresh." },
  { icon: "i-leaf",  name: "Delta-8 & Hemp",      desc: "Flower, edibles and more." },
  { icon: "i-glass", name: "Glass & Accessories", desc: "Pipes, grinders, wraps and gear." },
];

/* Real Google reviews (lightly cleaned, kept faithful). Add more as they come in. */
const REVIEWS = [
  { name: "Eli Swetnam", src: "Google · 5★", text: "Great repair store! I had trouble transferring everything from my broken phone to my new one, and Bash personally helped me get it all back. Fast and friendly." },
  { name: "Murl Cutting", src: "Google Local Guide · 5★", text: "This place is so clean and nice. The workers are very welcoming and helpful for anything you need. Amazing place with amazing people." },
  { name: "", src: "Google · 5★", text: "Great place, great workers. Fast to fix my phone, and great deals on everything else too." },
];

/* Estimator pricing matrix. Ranges are ballpark placeholders — owner confirms real numbers. */
const PRICING = {
  "iPhone":        { "Cracked screen": ["$79–$189","Usually same day · 30–60 min"], "Battery": ["$49–$89","Same day · about 30 min"], "Charging port": ["$59–$99","Same day · under an hour"], "Water damage": ["$25 diagnostic, repair quoted","Diagnostic first, then we advise"], "Back glass / camera": ["$69–$149","Often same day"], "Something else": ["Free diagnostic","Bring it in — we'll take a look"] },
  "Samsung":       { "Cracked screen": ["$99–$249","Same day on most models"], "Battery": ["$59–$99","Same day · about 45 min"], "Charging port": ["$59–$99","Same day · under an hour"], "Water damage": ["$25 diagnostic, repair quoted","Diagnostic first, then we advise"], "Back glass / camera": ["$79–$159","Often same day"], "Something else": ["Free diagnostic","Bring it in — we'll take a look"] },
  "Google Pixel":  { "Cracked screen": ["$89–$219","Same day on most models"], "Battery": ["$59–$99","Same day · about 45 min"], "Charging port": ["$59–$99","Same day · under an hour"], "Water damage": ["$25 diagnostic, repair quoted","Diagnostic first, then we advise"], "Back glass / camera": ["$69–$149","Often same day"], "Something else": ["Free diagnostic","Bring it in — we'll take a look"] },
  "iPad / Tablet": { "Cracked screen": ["$89–$229","1–2 days on some models"], "Battery": ["$69–$119","Usually 1 day"], "Charging port": ["$69–$109","Usually same day"], "Water damage": ["$25 diagnostic, repair quoted","Diagnostic first, then we advise"], "Back glass / camera": ["Quoted in store","Depends on model"], "Something else": ["Free diagnostic","Bring it in — we'll take a look"] },
  "Other":         { "Cracked screen": ["Quoted in store","Fast turnaround on most devices"], "Battery": ["Quoted in store","Most done same day"], "Charging port": ["Quoted in store","Most done same day"], "Water damage": ["$25 diagnostic, repair quoted","Diagnostic first, then we advise"], "Back glass / camera": ["Quoted in store","Depends on device"], "Something else": ["Free diagnostic","Bring it in — we'll take a look"] },
};
