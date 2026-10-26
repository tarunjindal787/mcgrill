/* ---------- Course data ----------
   Single source of truth, shared by index.html (the "Download Prospectus" quick-ribbon
   button, which needs every course for the full-catalogue PDF) and courses.html (the
   full catalogue: search, filters, cards, modal, per-course PDF). Do not duplicate this
   array elsewhere -- both pages load this one file. */
var COURSES = [
  { id: 'mem31922', code: 'MEM31922', name: 'Certificate III in Engineering (Fabrication Trade)', stream: 'engineering', tagLabel: 'Engineering', desc: 'Hands-on trade training in metal fabrication, welding, and workshop safety.', img: 'photos/course-engineering.jpg', imgAlt: 'A welder working on a metal fabrication project in a workshop' },
  { id: 'sit40521', code: 'SIT40521', name: 'Certificate IV in Kitchen Management', stream: 'hospitality', tagLabel: 'Hospitality', desc: 'Kitchen operations and supervision training covering food safety, menu planning, and team leadership.', img: 'photos/course-hospitality-kitchen.jpg', imgAlt: 'A chef preparing food in a commercial kitchen' },
  { id: 'sit50422', code: 'SIT50422', name: 'Diploma of Hospitality Management', stream: 'hospitality', tagLabel: 'Hospitality', desc: 'Hospitality leadership training across food and beverage, accommodation, and guest service operations.', img: 'photos/course-hospitality-service.jpg', imgAlt: 'A waiter serving a plate of food at an outdoor café' },
  { id: 'bsb40120', code: 'BSB40120', name: 'Certificate IV in Business', stream: 'business', tagLabel: 'Business', desc: 'Core business skills in communication, administration, and workplace operations.', img: 'photos/course-business-notes.jpg', imgAlt: 'Colleagues taking notes during a business meeting' },
  { id: 'bsb50120', code: 'BSB50120', name: 'Diploma of Business', stream: 'business', tagLabel: 'Business', desc: 'Advanced training in business planning, operations, and leadership.', img: 'photos/course-business-diploma.jpg', imgAlt: 'A presenter discussing a sales chart to colleagues in an office' },
  { id: 'bsb80120', code: 'BSB80120', name: 'Graduate Diploma of Management (Learning)', stream: 'management', tagLabel: 'Management', desc: 'Postgraduate management training focused on leading learning and development.', img: 'photos/course-management.jpg', imgAlt: 'A group of colleagues in a discussion around a meeting table' },
  { id: 'english', code: 'Code to be confirmed', name: 'General English Programs', stream: 'english', tagLabel: 'English', desc: 'English language training for further study or daily life in Australia.', img: 'photos/course-english.jpg', imgAlt: 'A student smiling in a lecture hall' }
];
