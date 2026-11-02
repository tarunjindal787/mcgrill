/* ---------- Course Pathway Explorer (courses.html only) ----------
   Reads STREAMS and COURSES (courses-data.js) -- no new data is invented here. Renders five
   interactive components into the #pathway-explorer markup already in courses.html:

     StreamSelector        -> #stream-selector   (drag source + click/tap target, one card per STREAMS entry)
     PathwayCanvas         -> #pathway-canvas     (drop target; toggles its empty/selected states)
     ExperienceSelector    -> #experience-selector (segmented control: new / some experience / qualified)
     QualificationTimeline -> #qualification-timeline (ordered nodes for the selected stream)
     QualificationCard     -> renderQualificationCard() (one card per course within the timeline)

   Everything here is client-side state (currentStream / currentExperience) -- selecting a
   stream or experience level re-renders the timeline in place, no page reload. Duration,
   fees and career outcomes aren't tracked anywhere in COURSES, so cards point to the site's
   existing "confirmed on enquiry" course modal (reused via its own View details button --
   see openCourseModal()) rather than inventing numbers or job titles. */

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
  var changeStreamBtn = document.getElementById('pathway-change-stream');
  var journeyEl = document.getElementById('pathway-journey');
  var journeyStreamNameEl = document.getElementById('pathway-journey-stream');
  var experienceSelectorEl = document.getElementById('experience-selector');
  var timelineEl = document.getElementById('qualification-timeline');

  if (!selectorEl || !canvasEl) return; /* explorer markup not on this page */

  /* AQF level ordering -- a student's starting point within a stream is read off this,
     not invented. General English has no AQF level (`level: null` in COURSES), so it
     always sorts first/alone. */
  var LEVEL_ORDER = { 'Certificate III': 1, 'Certificate IV': 2, 'Diploma': 3, 'Graduate Diploma': 4 };

  var currentStream = null;
  var currentExperience = 'new';

  function coursesForStream(streamId) {
    return COURSES.filter(function (c) { return c.stream === streamId; })
      .slice()
      .sort(function (a, b) { return (LEVEL_ORDER[a.level] || 0) - (LEVEL_ORDER[b.level] || 0); });
  }

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
          'draggable="true" aria-pressed="false" aria-label="Select ' + s.label + ' as your educational stream">' +
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
    var stream = STREAMS.filter(function (s) { return s.id === streamId; })[0];
    if (!stream) return;
    currentStream = streamId;
    currentExperience = 'new';

    canvasEmptyEl.hidden = true;
    canvasSelectedEl.hidden = false;
    canvasImgEl.src = stream.img;
    canvasImgEl.alt = stream.imgAlt;
    canvasEyebrowEl.textContent = qualificationCountLabel(streamId);
    canvasTitleEl.textContent = stream.label;
    canvasDescEl.textContent = stream.shortDesc;

    markSelectedStreamCard(streamId);

    journeyStreamNameEl.textContent = stream.label;
    journeyEl.hidden = false;
    experienceSelectorEl.querySelectorAll('.experience-chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-exp') === 'new' ? 'true' : 'false');
    });

    renderQualificationTimeline();
    if (!prefersReducedMotion) journeyEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function changeStream() {
    currentStream = null;
    canvasSelectedEl.hidden = true;
    canvasEmptyEl.hidden = false;
    journeyEl.hidden = true;
    markSelectedStreamCard(null);
  }

  /* ---------- ExperienceSelector ---------- */
  function setExperience(level) {
    currentExperience = level;
    experienceSelectorEl.querySelectorAll('.experience-chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-exp') === level ? 'true' : 'false');
    });
    renderQualificationTimeline();
  }

  function startIndexForExperience(count) {
    if (currentExperience === 'qualified') return count - 1;
    if (currentExperience === 'some') return Math.min(1, count - 1);
    return 0; /* 'new' */
  }

  /* ---------- QualificationCard ---------- */
  function renderQualificationCard(course, nodeNumber, isStart) {
    return (
      '<div class="qualification-item' + (isStart ? ' is-start' : '') + '">' +
        '<div class="qualification-node-row">' +
          '<span class="qualification-node">' + nodeNumber + '</span>' +
          '<span class="qualification-connector" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="qualification-card">' +
          (isStart ? '<span class="pw-start-badge">Your starting point</span>' : '') +
          '<div class="qualification-card-head">' +
            (course.level ? '<span class="course-level">' + course.level + '</span>' : '<span class="course-level">General English</span>') +
            '<h4>' + course.name + '</h4>' +
          '</div>' +
          '<p>' + course.desc + '</p>' +
          '<p class="qualification-card-meta">Duration &amp; fees confirmed on enquiry</p>' +
          '<button type="button" class="btn-ghost-small" data-view-course="' + course.id + '">' +
            'View full details' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---------- QualificationTimeline ---------- */
  function renderQualificationTimeline() {
    if (!currentStream) { timelineEl.innerHTML = ''; return; }
    var streamCourses = coursesForStream(currentStream);
    var startIndex = startIndexForExperience(streamCourses.length);
    timelineEl.innerHTML = streamCourses.map(function (course, i) {
      return renderQualificationCard(course, i + 1, i === startIndex);
    }).join('');
  }

  /* ---------- Reused course modal (courses.html's own inline script owns it; we just
       trigger its existing "View details" button for the matching course card instead of
       re-implementing the modal or re-typing duration/fees/entry-requirement copy). ---------- */
  function openCourseModal(courseId) {
    var trigger = document.querySelector('#course-grid [data-course-id="' + courseId + '"]');
    if (trigger) trigger.click();
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

  changeStreamBtn.addEventListener('click', changeStream);

  experienceSelectorEl.addEventListener('click', function (e) {
    var chip = e.target.closest('.experience-chip');
    if (chip) setExperience(chip.getAttribute('data-exp'));
  });

  timelineEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view-course]');
    if (btn) openCourseModal(btn.getAttribute('data-view-course'));
  });

  /* ---------- Init ---------- */
  renderStreamSelector();

  /* Same ?stream= deep link the existing filter bar reads, so arriving from the homepage's
     stream cards (or the filter bar above) pre-selects the explorer too. */
  var VALID_STREAMS = STREAMS.map(function (s) { return s.id; });
  var requestedStream = new URLSearchParams(window.location.search).get('stream');
  if (VALID_STREAMS.indexOf(requestedStream) !== -1) selectStream(requestedStream);

})();
