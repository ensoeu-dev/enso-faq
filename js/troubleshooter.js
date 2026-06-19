/* ENSŌ guided troubleshooter.
   Reads window.ENSO_TROUBLESHOOTING (generated from the master spreadsheet)
   and drives the "When something's off." section: browse/search known issues,
   then walk a guided flow to a fix, a "this is normal", or a support hand-off. */
(function () {
  var DATA = window.ENSO_TROUBLESHOOTING;
  var SUPPORT_EMAIL = 'support@ensoshisha.eu';

  var browseEl = document.getElementById('ts-browse');
  var catsEl = document.getElementById('ts-categories');
  var listEl = document.getElementById('ts-issue-list');
  var noResultsEl = document.getElementById('ts-no-results');
  var searchEl = document.getElementById('ts-search');
  var flowEl = document.getElementById('ts-flow');

  if (!DATA || !browseEl || !flowEl) return;

  // ── Browse state ──────────────────────────────────────────────────────
  var activeCategory = null; // null = All
  var query = '';

  // ── Flow state ────────────────────────────────────────────────────────
  var currentIssue = null;
  var currentCheckIndex = 0;
  var currentCheck = null;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ── Browse view ───────────────────────────────────────────────────────
  function renderCategories() {
    var html = '<button type="button" class="chip" data-cat="" aria-pressed="' +
      (activeCategory === null) + '">All</button>';
    DATA.categories.forEach(function (cat) {
      html += '<button type="button" class="chip" data-cat="' + esc(cat) + '" aria-pressed="' +
        (activeCategory === cat) + '">' + esc(cat) + '</button>';
    });
    catsEl.innerHTML = html;
  }

  function matchingIssues() {
    var q = query.trim().toLowerCase();
    return DATA.issues.filter(function (iss) {
      if (activeCategory && iss.category !== activeCategory) return false;
      if (!q) return true;
      // Search the issue name, category, and the wording of its checks/options
      var hay = iss.issue + ' ' + iss.category;
      iss.checks.forEach(function (c) {
        hay += ' ' + c.question;
        c.options.forEach(function (o) { hay += ' ' + o.label + ' ' + o.guidance; });
      });
      return hay.toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderIssueList() {
    var issues = matchingIssues();
    if (!issues.length) {
      listEl.innerHTML = '';
      noResultsEl.hidden = false;
      return;
    }
    noResultsEl.hidden = true;
    listEl.innerHTML = issues.map(function (iss) {
      return '<li><button type="button" class="ts-issue" data-action="open" data-id="' + esc(iss.id) + '">' +
        '<span class="ts-issue-name">' + esc(iss.issue) + '</span>' +
        '<span class="ts-issue-cat">' + esc(iss.category) + '</span>' +
        '<span class="ts-issue-arrow" aria-hidden="true">→</span>' +
        '</button></li>';
    }).join('');
  }

  function showBrowse() {
    currentIssue = null;
    flowEl.hidden = true;
    flowEl.innerHTML = '';
    browseEl.hidden = false;
  }

  // ── Guided flow ───────────────────────────────────────────────────────
  function findIssue(id) {
    for (var i = 0; i < DATA.issues.length; i++) {
      if (DATA.issues[i].id === id) return DATA.issues[i];
    }
    return null;
  }

  function startFlow(id) {
    currentIssue = findIssue(id);
    if (!currentIssue) return;
    currentCheckIndex = 0;
    browseEl.hidden = true;
    flowEl.hidden = false;
    renderCheck();
    flowEl.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
  }

  function prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function flowHeader() {
    return '<button type="button" class="ts-flow-back" data-action="back">' +
      '<span aria-hidden="true">←</span> All issues</button>' +
      '<div class="ts-flow-issue">' + esc(currentIssue.issue) + '</div>';
  }

  function renderCheck() {
    if (currentCheckIndex >= currentIssue.checks.length) {
      return renderSupportFallback();
    }
    currentCheck = currentIssue.checks[currentCheckIndex];
    var html = flowHeader();
    html += '<p class="ts-question">' + esc(currentCheck.question) + '</p>';
    html += '<div class="ts-options">';
    currentCheck.options.forEach(function (o, i) {
      html += '<button type="button" class="ts-option" data-action="option" data-opt="' + i + '">' +
        esc(o.label) + '</button>';
    });
    html += '</div>';
    html += '<button type="button" class="ts-advance" data-action="advance">None of these / still not sorted →</button>';
    flowEl.innerHTML = html;
  }

  function resultActions(extra) {
    return '<div class="ts-result-actions">' + (extra || '') +
      '<button type="button" class="ts-btn-secondary" data-action="restart">Start this over</button>' +
      '<button type="button" class="ts-btn-secondary" data-action="back">Back to all issues</button>' +
      '</div>';
  }

  function renderSolved(text) {
    var html = flowHeader();
    html += '<div class="ts-result is-solved">' +
      '<div class="ts-result-title">Sorted.</div>' +
      '<p class="ts-result-text">' + esc(text) + '</p>' +
      resultActions() + '</div>';
    flowEl.innerHTML = html;
  }

  function renderTryThis(text) {
    var html = flowHeader();
    html += '<div class="ts-result">' +
      '<div class="ts-result-title">Try this</div>' +
      '<p class="ts-result-text">' + esc(text) + '</p>' +
      '<div class="ts-result-actions">' +
      '<button type="button" class="ts-option" data-action="fixed">That fixed it</button>' +
      '<button type="button" class="ts-btn-secondary" data-action="advance">Didn’t help</button>' +
      '</div></div>';
    flowEl.innerHTML = html;
  }

  function supportButton() {
    var subject = 'ENSŌ support — ' + currentIssue.issue;
    var href = 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent(subject);
    return '<a class="btn-primary" href="' + href + '">Contact support ' +
      '<span class="btn-arrow" aria-hidden="true">→</span></a>';
  }

  function renderSupport(text, evidence) {
    var html = flowHeader();
    html += '<div class="ts-result is-support">' +
      '<div class="ts-result-title">Let’s get you to support.</div>' +
      '<p class="ts-result-text">' + esc(text) + '</p>';
    if (evidence) {
      html += '<div class="ts-evidence"><span class="ts-evidence-label">Please include</span>' +
        '<p class="ts-evidence-text">' + esc(evidence) + '</p></div>';
    }
    html += resultActions(supportButton()) + '</div>';
    flowEl.innerHTML = html;
  }

  function renderSupportFallback() {
    var html = flowHeader();
    html += '<div class="ts-result is-support">' +
      '<div class="ts-result-title">Let’s get you to support.</div>' +
      '<p class="ts-result-text">We couldn’t pin this one down from the steps here. ' +
      'Our team will help you sort it out.</p>' +
      resultActions(supportButton()) + '</div>';
    flowEl.innerHTML = html;
  }

  function chooseOption(i) {
    var o = currentCheck.options[i];
    if (!o) return;
    if (o.outcome === 'solved') return renderSolved(o.guidance);
    if (o.outcome === 'support') return renderSupport(o.guidance, o.evidence);
    if (o.outcome === 'next') return renderTryThis(o.guidance);
  }

  function advance() {
    currentCheckIndex += 1;
    renderCheck();
  }

  // ── Events ────────────────────────────────────────────────────────────
  searchEl.addEventListener('input', function () {
    query = searchEl.value;
    renderIssueList();
  });

  catsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    var cat = btn.dataset.cat;
    activeCategory = cat === '' ? null : cat;
    renderCategories();
    renderIssueList();
  });

  listEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action="open"]');
    if (btn) startFlow(btn.dataset.id);
  });

  flowEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.dataset.action;
    if (action === 'back') return showBrowse();
    if (action === 'restart') { currentCheckIndex = 0; return renderCheck(); }
    if (action === 'advance') return advance();
    if (action === 'fixed') return renderSolved('Glad that sorted it.');
    if (action === 'option') return chooseOption(+btn.dataset.opt);
  });

  // ── Init ──────────────────────────────────────────────────────────────
  renderCategories();
  renderIssueList();
})();
