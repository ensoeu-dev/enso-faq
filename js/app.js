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

// ── Smooth-scroll helpers (respect prefers-reduced-motion) ──────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function smoothScrollToEl(el, offset) {
  if (!el) return;
  var y = el.getBoundingClientRect().top + window.pageYOffset - (offset || 0);
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// In-page jump links: header "Troubleshoot" and the step-05 pro tip link
document.querySelectorAll('[data-scroll-to]').forEach(function (el) {
  el.addEventListener('click', function () {
    var target = document.getElementById(el.dataset.scrollTo);
    var offset = el.dataset.scrollOffset ? parseInt(el.dataset.scrollOffset, 10) : 24;
    smoothScrollToEl(target, offset);
  });
});

// ── Quick start: hover/focus activates a step; tap also reveals the panel ──
var STEPS = [
  { title: 'Charge', copy: 'Make sure the battery is fully charged before you begin. A full charge takes about 1 hour 45 minutes over USB-C — use a 30W PD charger (minimum) for a steady top-up, and watch the four LEDs climb to full.', tip: 'For a complete charge, leave the battery on for at least 1 hour 45 minutes even once the LEDs read full.' },
  { title: 'Fill', copy: 'Twist off the glass water tank and fill it with cold water up to the level indicator. Cold water cools the vapor for a smoother, cleaner draw.', tip: 'Add a few ice cubes for an even cooler draw — just remember they raise the water level, so fill a little below the indicator to leave room.' },
  { title: 'Pack', copy: 'Pack your cup lightly with your tobacco, then open an airpath straight down the middle with the poking tool. Even, gentle packing keeps the draw open.', tip: 'Place a screen from the included screen pack at the bottom of the ceramic cup before packing to keep the flavour in there longer. Mid-session, use the poking tool to loosen the tobacco lightly around the edges of the cup for even bigger clouds.' },
  { title: 'Tune', copy: 'Set the thermodial to its lowest setting, 180°, then switch the device on by pressing the thermodial in for 2–3 seconds until the orange light appears. Wait out the preset 5-minute pre-heat — you will see the light in the middle climb slowly as it warms.', tip: 'If the vapor is light at the start, raise the temperature slowly — 15–30° at a time, allowing 30–60 seconds for each change to take effect.' },
  { title: 'Enjoy', copy: 'Draw slowly and steadily. With clean electric heat there is no charcoal, ash or open flame — just consistent, flavourful clouds.', tip: 'Every tobacco is different, and each one likes a different heat. See Temperature control and the three modes for more.', tipLink: 'Temperature control' },
];

var stepTabs = document.querySelectorAll('.step-tab');
var stepImgs = document.querySelectorAll('.step-figure img');
var stepEyebrow = document.getElementById('step-eyebrow');
var stepTitle = document.getElementById('step-title');
var stepCopy = document.getElementById('step-copy');
var stepTip = document.getElementById('step-tip');
var stepTipText = document.getElementById('step-tip-text');
var stepTipLink = document.getElementById('step-tip-link');
var stepTipLinkText = document.getElementById('step-tip-link-text');
var quickstartSection = document.getElementById('quickstart');
var stepPanel = document.querySelector('.step-panel');

function activateStep(i) {
  var step = STEPS[i];
  stepTabs.forEach(function (tab, j) {
    tab.setAttribute('aria-selected', j === i ? 'true' : 'false');
  });
  stepImgs.forEach(function (img) {
    img.classList.toggle('active', +img.dataset.step === i);
  });
  stepEyebrow.textContent = 'Step 0' + (i + 1);
  stepTitle.textContent = step.title;
  stepCopy.textContent = step.copy;

  // Pro tip — shown only on steps that have one; link only on step 05
  if (step.tip) {
    stepTipText.textContent = step.tip;
    stepTip.hidden = false;
    if (step.tipLink) {
      stepTipLinkText.textContent = step.tipLink;
      stepTipLink.hidden = false;
    } else {
      stepTipLink.hidden = true;
    }
  } else {
    stepTip.hidden = true;
  }
}

// On tap (not hover), bring the panel into view only when it's below the fold
function revealStepPanel() {
  requestAnimationFrame(function () {
    if (!stepPanel || !quickstartSection) return;
    var pr = stepPanel.getBoundingClientRect();
    var vh = window.innerHeight;
    if (pr.bottom > vh - 8 || pr.top > vh * 0.6) {
      smoothScrollToEl(quickstartSection, 16);
    }
  });
}

stepTabs.forEach(function (tab, i) {
  tab.addEventListener('mouseenter', function () { activateStep(i); });
  tab.addEventListener('focus', function () { activateStep(i); });
  tab.addEventListener('click', function () { activateStep(i); revealStepPanel(); });
});

activateStep(0);

// The troubleshooting section is handled in js/troubleshooter.js.
