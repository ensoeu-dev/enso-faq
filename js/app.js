/* ENSŌ Support page behaviour: theme switch, quick-start tabs,
   troubleshooting accordion, and search + category filtering. */

// ── Theme switch (persisted in localStorage as 'enso-guide-theme') ──────
document.querySelectorAll('.theme-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var mode = btn.dataset.setTheme;
    document.documentElement.dataset.theme = mode;
    try { localStorage.setItem('enso-guide-theme', mode); } catch (e) {}
  });
});

// ── Quick start: hover or click a tab to activate its step ──────────────
var STEPS = [
  { title: 'Charge', copy: 'Make sure the battery is charged before you begin. A full charge takes about 1.5 hours over USB-C — use a 30W+ brick for the fastest top-up, and watch the four LEDs climb to full.' },
  { title: 'Fill', copy: 'Twist off the glass water tank and fill it with cold water up to the level indicator. Cold water cools the vapor for a smoother, cleaner draw.' },
  { title: 'Pack', copy: 'Pack your cup lightly with your tobacco, then open an airpath straight down the middle with the poking tool. Even, gentle packing keeps the draw open.' },
  { title: 'Tune', copy: 'Set the thermodial to its lowest setting, 180°, and let it heat for 5–8 minutes. If the vapor is light, raise the temperature 15–30° at a time, allowing 30–60 seconds for each change.' },
  { title: 'Enjoy', copy: 'Draw slowly and steadily. With clean electric heat there is no charcoal, ash or open flame — just consistent, flavourful clouds.' },
];

var stepTabs = document.querySelectorAll('.step-tab');
var stepImgs = document.querySelectorAll('.step-figure img');
var stepEyebrow = document.getElementById('step-eyebrow');
var stepTitle = document.getElementById('step-title');
var stepCopy = document.getElementById('step-copy');

function activateStep(i) {
  stepTabs.forEach(function (tab, j) {
    tab.setAttribute('aria-selected', j === i ? 'true' : 'false');
  });
  stepImgs.forEach(function (img) {
    img.classList.toggle('active', +img.dataset.step === i);
  });
  stepEyebrow.textContent = 'Step 0' + (i + 1);
  stepTitle.textContent = STEPS[i].title;
  stepCopy.textContent = STEPS[i].copy;
}

stepTabs.forEach(function (tab, i) {
  tab.addEventListener('mouseenter', function () { activateStep(i); });
  tab.addEventListener('click', function () { activateStep(i); });
  tab.addEventListener('focus', function () { activateStep(i); });
});

activateStep(0);

// ── Troubleshooting accordion (single open) ─────────────────────────────
var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));

faqItems.forEach(function (item) {
  item.querySelector('.faq-q').addEventListener('click', function () {
    var wasOpen = item.classList.contains('open');
    faqItems.forEach(function (other) { setOpen(other, false); });
    setOpen(item, !wasOpen);
  });
});

function setOpen(item, open) {
  item.classList.toggle('open', open);
  item.querySelector('.faq-q').setAttribute('aria-expanded', open ? 'true' : 'false');
  item.querySelector('.faq-marker').textContent = open ? '−' : '+';
}

// ── Search + category chips filter the FAQ list ─────────────────────────
var searchInput = document.getElementById('faq-search');
var chips = document.querySelectorAll('.chip');
var noResults = document.querySelector('.no-results');
var activeCat = null;

function applyFilter() {
  var q = searchInput.value.trim().toLowerCase();
  var visible = 0;
  faqItems.forEach(function (item) {
    var text = item.textContent.toLowerCase();
    var cats = (item.dataset.cats || '').split(' ');
    var match = (!q || text.indexOf(q) !== -1) && (!activeCat || cats.indexOf(activeCat) !== -1);
    item.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible > 0;
}

searchInput.addEventListener('input', applyFilter);

chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    // Clicking the active chip clears the filter
    activeCat = activeCat === chip.dataset.cat ? null : chip.dataset.cat;
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', c.dataset.cat === activeCat ? 'true' : 'false');
    });
    applyFilter();
  });
});
