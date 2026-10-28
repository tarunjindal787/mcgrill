/* ---------- Shared site chrome ----------
   Header scroll-state, mobile nav, magnetic buttons, the 3D-tilt helper, the legal
   content modal, and scroll-reveal. Loaded (unchanged) by both index.html and
   courses.html -- not wrapped in an IIFE so each page's own inline script can still
   reference prefersReducedMotion / fineHover / attachTilt afterward, exactly as the
   single-page script used to. Every selector here is generic (matches whichever of
   these elements exist on the current page), so nothing below needs to know which
   page it's running on. */

document.getElementById('year').textContent = new Date().getFullYear();

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Magnetic-pull CTA buttons with cursor light-flare (fine-pointer only) ---------- */
function attachMagnet(btn) {
  var bounds = null;
  btn.addEventListener('mouseenter', function () {
    bounds = btn.getBoundingClientRect();
    btn.classList.add('magnet-active');
  });
  btn.addEventListener('mousemove', function (e) {
    if (!bounds) bounds = btn.getBoundingClientRect();
    var relX = e.clientX - bounds.left;
    var relY = e.clientY - bounds.top;
    var pullX = (relX / bounds.width - 0.5) * 14;
    var pullY = (relY / bounds.height - 0.5) * 10;
    btn.style.setProperty('--mx', relX + 'px');
    btn.style.setProperty('--my', relY + 'px');
    btn.style.transform = 'translate(' + pullX.toFixed(1) + 'px, ' + pullY.toFixed(1) + 'px)';
  });
  btn.addEventListener('mouseleave', function () {
    btn.classList.remove('magnet-active');
    btn.style.transform = '';
    bounds = null;
  });
}
if (fineHover && !prefersReducedMotion) {
  document.querySelectorAll('.btn-primary').forEach(attachMagnet);
}

/* ---------- 3D-tilt hover for course cards (fine-pointer only) ----------
   Only the helper lives here -- courses.html attaches it to its own
   .course-card.tilt-card elements, built dynamically after this file runs. */
function attachTilt(card) {
  var bounds = null;
  card.addEventListener('mouseenter', function () {
    bounds = card.getBoundingClientRect();
    card.classList.add('tilt-active');
  });
  card.addEventListener('mousemove', function (e) {
    if (!bounds) bounds = card.getBoundingClientRect();
    var px = (e.clientX - bounds.left) / bounds.width;
    var py = (e.clientY - bounds.top) / bounds.height;
    var rotateX = (0.5 - py) * 8;
    var rotateY = (px - 0.5) * 8;
    card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', function () {
    card.classList.remove('tilt-active');
    card.style.transform = '';
    bounds = null;
  });
}

/* ---------- Header height sync (keeps page content clear of the fixed header) ---------- */
var siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  var syncHeaderHeight = function () {
    document.documentElement.style.setProperty('--header-h', siteHeader.offsetHeight + 'px');
  };
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);

  /* ---------- Header: solid background once scrolled past the page top ----------
       Padding/height are identical in both states (set once above, never touched
       here) so this never shifts page content or re-triggers syncHeaderHeight. ---------- */
  var SCROLL_THRESHOLD = 70;
  var updateHeaderScrolledState = function () {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  updateHeaderScrolledState();
  window.addEventListener('scroll', updateHeaderScrolledState, { passive: true });
}

/* ---------- Mobile nav ---------- */
var navToggle = document.getElementById('nav-toggle');
var mobileNav = document.getElementById('mobile-nav');
navToggle.addEventListener('click', function () {
  var isOpen = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
document.querySelectorAll('.mnav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Legal modal (Privacy / Terms / Disclaimer) ---------- */
var LEGAL_ENTITY = 'Higher Learning Australia Pty Ltd A/T for The Trustee for Higher Learning Unit Trust';
var LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    body:
      '<h4>Who we are</h4>' +
      '<p>McGill Institute Australia (RTO 45906, CRICOS 03678G) is operated by ' + LEGAL_ENTITY + '. This policy explains how we handle personal information submitted through this website.</p>' +
      '<h4>What we collect</h4>' +
      '<p>The enquiry form on this site collects your name, email address, phone number, course of interest, and any message you provide.</p>' +
      '<h4>How we use it</h4>' +
      '<p>Information submitted is used solely to respond to your enquiry about our courses and enrolment process. It is not sold, and is not used for unrelated marketing.</p>' +
      '<h4>Your rights</h4>' +
      '<p>Under the Australian Privacy Principles (Privacy Act 1988), you may request access to, or correction of, any personal information we hold about you by contacting <a href="mailto:info@mcgill.edu.au">info@mcgill.edu.au</a>.</p>' +
      '<h4>Cookies and tracking</h4>' +
      '<p>This website does not use tracking cookies or third-party analytics scripts.</p>'
  },
  terms: {
    title: 'Terms of Use',
    body:
      '<h4>Acceptance</h4>' +
      '<p>By using this website, you agree to these terms. This site is published by ' + LEGAL_ENTITY + '.</p>' +
      '<h4>Course information</h4>' +
      '<p>Course names, codes, and disciplines listed are accurate. Fees, intake dates, durations, and entry requirements are confirmed directly with our admissions team and may change. Figures are not published on this site to avoid publishing outdated information.</p>' +
      '<h4>Not immigration advice</h4>' +
      '<p>General information on this site about student visas or health cover is provided for convenience only and is not migration advice. Consult a registered migration agent or the Australian Department of Home Affairs for guidance specific to your situation.</p>' +
      '<h4>Intellectual property</h4>' +
      '<p>Content on this site belongs to ' + LEGAL_ENTITY + ' unless otherwise noted. Photography is licensed stock imagery used for illustration, not photographs of our actual campus, staff, or students.</p>' +
      '<h4>Governing law</h4>' +
      '<p>These terms are governed by the laws of New South Wales, Australia.</p>'
  },
  disclaimer: {
    title: 'Disclaimer',
    body:
      '<h4>Not McGill University (Canada)</h4>' +
      '<p>McGill Institute Australia is an independent registered training organisation in Parramatta, NSW, and is not affiliated with, or endorsed by, McGill University in Canada.</p>' +
      '<h4>Accuracy of information</h4>' +
      '<p>We take care to keep this site accurate, but fees, intake dates, durations, and entry requirements are confirmed directly with our admissions team, not published here, and may change without notice.</p>' +
      '<h4>Photography</h4>' +
      '<p>Photographs on this site are licensed stock imagery used to illustrate each discipline. They are not photographs of McGill Institute Australia’s own campus, staff, or students.</p>' +
      '<h4>Not immigration advice</h4>' +
      '<p>Visa and health cover information on this site is general in nature and is not a substitute for advice from a registered migration agent.</p>'
  }
};
var legalModalBackdrop = document.getElementById('legal-modal-backdrop');
var legalModalTitle = document.getElementById('legal-modal-title');
var legalModalBody = document.getElementById('legal-modal-body');
var legalModalClose = document.getElementById('legal-modal-close');
var legalLastFocused = null;
function openLegalModal(key) {
  var entry = LEGAL_CONTENT[key];
  if (!entry) return;
  legalModalTitle.textContent = entry.title;
  legalModalBody.innerHTML = entry.body;
  legalLastFocused = document.activeElement;
  legalModalBackdrop.classList.add('open');
  legalModalClose.focus();
  document.addEventListener('keydown', onLegalModalKeydown);
}
function closeLegalModal() {
  legalModalBackdrop.classList.remove('open');
  document.removeEventListener('keydown', onLegalModalKeydown);
  if (legalLastFocused) legalLastFocused.focus();
}
function onLegalModalKeydown(e) {
  if (e.key === 'Escape') { closeLegalModal(); return; }
  if (e.key === 'Tab') {
    var focusable = document.getElementById('legal-modal').querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}
document.querySelectorAll('[data-legal]').forEach(function (btn) {
  btn.addEventListener('click', function () { openLegalModal(btn.getAttribute('data-legal')); });
});
legalModalClose.addEventListener('click', closeLegalModal);
legalModalBackdrop.addEventListener('click', function (e) { if (e.target === legalModalBackdrop) closeLegalModal(); });

/* ---------- Scroll reveal ---------- */
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
}
