/* ---------- Course data ----------
   Single source of truth, shared by index.html (the "Download Prospectus" quick-ribbon
   button, which needs every course for the full-catalogue PDF) and courses.html (the
   full catalogue: search, filters, cards, modal, per-course PDF). Do not duplicate this
   array elsewhere -- both pages load this one file.

   `level` (2026-10-27): the AQF qualification level, parsed from each course's own real
   name (e.g. "Certificate III in Engineering..." -> "Certificate III") -- not a new fact,
   just the existing name's level restated as its own field so cards/filters don't have to
   re-parse it. `null` for General English, which isn't an AQF-leveled qualification; UI
   code must treat null as "no level badge / not matched by any level filter", never as
   "Certificate" or any other invented default. */
var COURSES = [
  { id: 'mem31922', code: 'MEM31922', name: 'Certificate III in Engineering (Fabrication Trade)', level: 'Certificate III', stream: 'engineering', tagLabel: 'Engineering', desc: 'Hands-on trade training in metal fabrication, welding, and workshop safety.', img: 'photos/course-engineering.jpg', imgAlt: 'A welder working on a metal fabrication project in a workshop' },
  { id: 'sit40521', code: 'SIT40521', name: 'Certificate IV in Kitchen Management', level: 'Certificate IV', stream: 'hospitality', tagLabel: 'Hospitality', desc: 'Kitchen operations and supervision training covering food safety, menu planning, and team leadership.', img: 'photos/course-hospitality-kitchen.jpg', imgAlt: 'A chef preparing food in a commercial kitchen' },
  { id: 'sit50422', code: 'SIT50422', name: 'Diploma of Hospitality Management', level: 'Diploma', stream: 'hospitality', tagLabel: 'Hospitality', desc: 'Hospitality leadership training across food and beverage, accommodation, and guest service operations.', img: 'photos/course-hospitality-service.jpg', imgAlt: 'A waiter serving a plate of food at an outdoor café' },
  { id: 'bsb40120', code: 'BSB40120', name: 'Certificate IV in Business', level: 'Certificate IV', stream: 'business', tagLabel: 'Business', desc: 'Core business skills in communication, administration, and workplace operations.', img: 'photos/course-business-notes.jpg', imgAlt: 'Colleagues taking notes during a business meeting' },
  { id: 'bsb50120', code: 'BSB50120', name: 'Diploma of Business', level: 'Diploma', stream: 'business', tagLabel: 'Business', desc: 'Advanced training in business planning, operations, and leadership.', img: 'photos/course-business-diploma.jpg', imgAlt: 'A presenter discussing a sales chart to colleagues in an office' },
  { id: 'bsb80120', code: 'BSB80120', name: 'Graduate Diploma of Management (Learning)', level: 'Graduate Diploma', stream: 'management', tagLabel: 'Management', desc: 'Postgraduate management training focused on leading learning and development.', img: 'photos/course-management.jpg', imgAlt: 'A group of colleagues in a discussion around a meeting table' },
  { id: 'english', code: 'Code to be confirmed', name: 'General English Programs', level: null, stream: 'english', tagLabel: 'English', desc: 'English language training for further study or daily life in Australia.', img: 'photos/course-english.jpg', imgAlt: 'A student smiling in a lecture hall' }
];
