/* ---------- Course Pathway Explorer (index.html + courses.html) ----------
   Reads STREAMS and COURSES (courses-data.js) -- no new data is invented here. Renders two
   interactive components into whichever page includes the #pathway-explorer markup:

     StreamSelector -> #stream-selector  (drag source + click/tap target, one card per STREAMS entry)
     PathwayCanvas  -> #pathway-canvas   (drop target; toggles its empty/selected/opening states)

   Selecting a stream (drag-drop, click, or Enter/Space) briefly shows it in the canvas, then
   opens that stream's courses: on courses.html it fires the existing stream filter-chip
   (instant, no reload, reuses the filter bar's own logic) and scrolls up to the grid; on any
   other page (index.html) it navigates to courses.html?stream=<id>, which the same filter bar
   already reads as a deep link. There is deliberately no second "pick your experience level"
   step in between -- selecting a stream takes you straight to its courses. */

(function () {
  "use strict";

  var selectorEl = document.getElementById('stream-selector');
  var canvasEl = document.getElementById('pathway-canvas');
  var canvasEmptyEl = document.getElementById('pathway-canvas-empty');
  var canvasSelectedEl = document.getElementById('pathway-canvas-selected');
  var canvasImgEl = document.getElementById('pathway-canvas-img');
  var canvasEyebrowEl = document.getElementById('pathway-canvas-eyebrow');
  var canvasTitleEl = document.getElementById('pathway-canvas-title');
  var canvasDescEl = document.getElementById('pathway-canvas-desc');
  var canvasStatusEl = document.getElementById('pathway-canvas-status');

  if (!selectorEl || !canvasEl) return; /* explorer markup not on this page */

  var OPEN_DELAY_MS = 450; /* lets the "opening <stream>..." state register before navigating/filtering */
  var opening = false;

  function qualificationCountLabel(streamId) {
    if (streamId === 'english') return 'General English';
    var count = COURSES.filter(function (c) { return c.stream === streamId; }).length;
    return count + (count === 1 ? ' Qualification' : ' Qualifications');
  }

  /* ---------- StreamSelector ---------- */
  function renderStreamSelector() {
    selectorEl.innerHTML = STREAMS.map(function (s) {
      return (
        '<div class="pw-stream-card" data-stream="' + s.id + '" role="button" tabindex="0" ' +
          'draggable="true" aria-pressed="false" aria-label="Open ' + s.label + ' courses">' +
          '<span class="pw-drag-handle" aria-hidden="true" title="Drag into the canvas">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="6" r="1.6" fill="currentColor"/><circle cx="16" cy="6" r="1.6" fill="currentColor"/><circle cx="8" cy="12" r="1.6" fill="currentColor"/><circle cx="16" cy="12" r="1.6" fill="currentColor"/><circle cx="8" cy="18" r="1.6" fill="currentColor"/><circle cx="16" cy="18" r="1.6" fill="currentColor"/></svg>' +
          '</span>' +
          '<span class="pw-stream-photo"><img src="' + s.img + '" alt="" width="200" height="140" loading="lazy"></span>' +
          '<span class="pw-stream-body">' +
            '<span class="tag tag-' + s.id + '">' + qualificationCountLabel(s.id) + '</span>' +
            '<h4>' + s.label + '</h4>' +
            '<p>' + s.shortDesc + '</p>' +
          '</span>' +
        '</div>'
      );
    }).join('');
  }

  function markSelectedStreamCard(streamId) {
    selectorEl.querySelectorAll('.pw-stream-card').forEach(function (card) {
      var isSelected = card.getAttribute('data-stream') === streamId;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  /* ---------- PathwayCanvas ---------- */
  function selectStream(streamId) {
    if (opening) return; /* already mid-transition to that stream's courses */
    var stream = STREAMS.filter(function (s) { return s.id === streamId; })[0];
    if (!stream) return;
    opening = true;

    canvasEmptyEl.hidden = true;
    canvasSelectedEl.hidden = false;
    canvasImgEl.src = stream.img;
    canvasImgEl.alt = stream.imgAlt;
    canvasEyebrowEl.textContent = qualificationCountLabel(streamId);
    canvasTitleEl.textContent = stream.label;
    canvasDescEl.textContent = stream.shortDesc;
    canvasStatusEl.textContent = 'Opening ' + stream.label + ' courses…';
    markSelectedStreamCard(streamId);

    window.setTimeout(function () { openStreamCourses(streamId); }, prefersReducedMotion ? 0 : OPEN_DELAY_MS);
  }

  /* Reuses the existing stream filter-chip + its own click handler (courses.html only) instead
     of re-implementing filtering here; falls back to a real navigation with the same ?stream=
     deep link the filter bar already reads on load (index.html, or any other page). */
  function openStreamCourses(streamId) {
    var filterChip = document.querySelector('.filter-chip[data-filter="' + streamId + '"]');
    if (filterChip) {
      filterChip.click();
      var coursesSection = document.getElementById('courses');
      if (coursesSection) coursesSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      opening = false;
    } else {
      window.location.href = 'courses.html?stream=' + encodeURIComponent(streamId) + '#courses';
    }
  }

  /* ---------- Interaction wiring: click/tap (all devices) + native HTML5 drag (fine-pointer
       devices); touch devices fall back to tap-to-select, which already does the same thing
       drop would. ---------- */
  selectorEl.addEventListener('click', function (e) {
    var card = e.target.closest('.pw-stream-card');
    if (card) selectStream(card.getAttribute('data-stream'));
  });
  selectorEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.pw-stream-card');
    if (!card) return;
    e.preventDefault();
    selectStream(card.getAttribute('data-stream'));
  });
  selectorEl.addEventListener('dragstart', function (e) {
    var card = e.target.closest('.pw-stream-card');
    if (!card) return;
    e.dataTransfer.setData('text/plain', card.getAttribute('data-stream'));
    e.dataTransfer.effectAllowed = 'copy';
    card.classList.add('is-dragging');
  });
  selectorEl.addEventListener('dragend', function (e) {
    var card = e.target.closest('.pw-stream-card');
    if (card) card.classList.remove('is-dragging');
  });
  canvasEl.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    canvasEl.classList.add('is-drag-over');
  });
  canvasEl.addEventListener('dragleave', function (e) {
    if (e.target === canvasEl) canvasEl.classList.remove('is-drag-over');
  });
  canvasEl.addEventListener('drop', function (e) {
    e.preventDefault();
    canvasEl.classList.remove('is-drag-over');
    var streamId = e.dataTransfer.getData('text/plain');
    if (streamId) selectStream(streamId);
  });

  /* ---------- Init ---------- */
  renderStreamSelector();

})();
