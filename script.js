/*
 * Lim Xin Yi Portfolio - vanilla JavaScript (no libraries).
 * Sections: settings and data, helpers, then one setup function per feature.
 */
'use strict';

const SETTINGS = {
  ownerName: 'Lim Xin Yi',
  contactEmail: 'xinyi260803@gmail.com',
  themeStorageKey: 'xinyi-portfolio-purple-theme'
};

const PROJECTS = [
  {
    id: 'sarawak-art-map',
    image: 'images/art-map.svg',
    imageAlt: 'Illustration of the Sarawak ART app: a map with three stations joined by a route line',
    group: 'project',
    number: '01',
    title: 'ART Mobile Application – Interactive Map Prototype',
    category: 'mobile',
    type: 'TMT2703 · UI/UX Design / Group project · 2026',
    status: 'High-fidelity prototype',
    summary: 'A high-fidelity mobile app prototype for Sarawak ART, designed to help users explore stations, routes, and nearby places of interest.',
    idea: 'Create a user-friendly public transportation experience that helps people discover ART stations, find nearby destinations, and plan how to reach a place of interest.',
    process: 'Collaborated with a five-member team on the overall UI/UX design and high-fidelity prototype using Lovable. The proposed experience includes an interactive map of ART stations, routes, and nearby points of interest; category filters; search; suggestions for the nearest station and ART route to a destination; and a redirect to ticket booking. Accessibility for visually impaired users was also considered. The assignment brief included usability testing with 10 users using the System Usability Scale (SUS) and qualitative feedback.',
    learning: 'Strengthened my understanding of user-centred design, collaborative prototyping, accessible navigation, and how usability feedback can help improve a mobile interface.',
    tools: ['Lovable', 'UI/UX Design', 'Mobile Prototyping', 'Interactive Map', 'Accessibility'],
    visual: 'art-map'
  },
  {
    id: 'auction-management',
    image: 'images/auction.svg',
    imageAlt: 'Illustration of an auction dashboard with a bar chart and a data table',
    group: 'project',
    number: '02',
    title: 'Auction Management System',
    category: 'web',
    type: 'TMF2034 · Database Concept and Design / Coursework · 2026',
    status: 'Coursework application',
    summary: 'A database-driven auction management application built with PHP and MySQL while learning web application development and relational database design.',
    idea: 'Organize auction activities and related information, including users, auction items, bids, orders, and payments, within one database-driven application.',
    process: 'Worked with PHP and MySQL while applying relational database concepts, converting an ERD into a relational database schema, and normalizing data to 1NF, 2NF, and 3NF. The application structure covers user, auction item, bid, order, payment, bank, and item-status-history management, as well as reports, search, data export, and dashboard charts.',
    learning: 'Gained practical experience connecting database design concepts with the structure and functions of a web application, and learned how relational schemas and normalization support organized data management.',
    tools: ['PHP', 'MySQL', 'ERD', 'Relational Database Design', '1NF · 2NF · 3NF'],
    visual: 'auction'
  },
  {
    id: 'portfolio-site',
    image: 'images/portfolio.svg',
    imageAlt: 'Illustration of this portfolio homepage with the heading Made to explore',
    group: 'project',
    number: '03',
    title: 'Personal Portfolio Website',
    category: 'web',
    type: 'Web Development / Personal project · 2026',
    status: 'Live website',
    summary: 'This responsive portfolio, built with only HTML, CSS and JavaScript, to present my education, skills, projects and interests.',
    idea: 'Create one accessible place where people can learn about me, browse my work and contact me, on any screen size.',
    process: 'Planned the sections, wrote semantic HTML, designed a light and dark purple theme in CSS, and added JavaScript features such as project filtering, search, sorting, project dialogs, accessible tabs, a validated contact form and a saved theme preference.',
    learning: 'Practised responsive layout, keyboard and screen-reader accessibility, organising JavaScript into small functions, and testing a website on different devices.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Accessibility', 'Responsive design'],
    visual: 'portfolio'
  },
  {
    id: 'campus360',
    image: 'images/campus360.svg',
    imageAlt: 'Illustration of the Campus360 student app with wellbeing, counselling and incident report buttons',
    group: 'competition',
    number: '01',
    title: 'Campus360 Student App',
    category: 'mobile',
    type: 'MOHE Hackathon 2026 / AppSheet project',
    status: 'In progress',
    summary: 'A student-services app project for the MOHE Hackathon 2026, exploring wellbeing activities, incident reporting, and counselling appointment workflows.',
    idea: 'Campus360 explores how useful student services could be brought together in one accessible place, making it easier for students to discover support and submit requests.',
    process: 'I explored the app structure and workflows in AppSheet, including student wellbeing activities, incident reporting, and counselling appointment booking. I also explored how Gemini AI could support the wider concept.',
    learning: 'This experience helped me understand how app data, form behavior, and clear user workflows affect the reliability of a no-code application. The project is still in progress.',
    tools: ['MOHE Hackathon 2026', 'AppSheet', 'Gemini AI'],
    visual: 'campus'
  },
  {
    id: 'time-machine',
    image: 'images/time-machine.svg',
    imageAlt: 'Illustration of campus buildings with an augmented reality label reading 2035',
    group: 'competition',
    number: '02',
    title: 'Campus Time Machine 5G',
    category: 'concept',
    type: 'Cyberview 5G Future Talent Innovation Challenge 2026 / Proposal',
    status: 'Proposal concept',
    summary: 'An innovation proposal imagining how students could explore their campus past, present, and future through augmented reality and 5G.',
    idea: 'The concept invites students to explore campus history, current spaces, and possible future developments through an interactive learning experience.',
    process: 'The proposal includes location-based AR experiences and Live Collaborative Time Tours, where lecturers can host synchronized sessions and students can explore the same shared environment together.',
    learning: 'I learned to shape a technology idea around a clear learning experience and explain how AR and 5G could support collaboration. This is a proposal concept, not a completed AR application.',
    tools: ['Cyberview Challenge 2026', 'AR concept', '5G innovation'],
    visual: 'time'
  }
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeFilter = 'all';
let searchTerm = '';
let sortOrder = 'featured';
let currentProjectId = null;
let toastTimer;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3300);
}

// 1. Theme toggle with a safe localStorage fallback.
function setupTheme() {
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem(SETTINGS.themeStorageKey); } catch { /* Storage may be blocked. */ }
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemPrefersDark ? 'dark' : 'light'), false);
  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
    showToast(next === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
  });
}

function setTheme(theme, remember) {
  document.documentElement.dataset.theme = theme;
  $('#theme-toggle').setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  $('.theme-icon').textContent = theme === 'dark' ? '☼' : '◐';
  $('meta[name="theme-color"]').content = theme === 'dark' ? '#161221' : '#faf8ff';
  if (remember) {
    try { window.localStorage.setItem(SETTINGS.themeStorageKey, theme); } catch { /* Site works without storage. */ }
  }
}

// 2. Collapsible mobile menu, including outside-click and Escape handling.
function setupNavigation() {
  const toggle = $('#menu-toggle');
  const links = $('#nav-links');
  const close = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  toggle.addEventListener('click', () => {
    const opening = !links.classList.contains('is-open');
    links.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  });
  $$('.nav-link', links).forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav') && links.classList.contains('is-open')) close();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
}

// 3. A scroll progress indicator and 4. back-to-top button.
function setupScrollTools() {
  let framePending = false;
  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const fraction = Math.min(1, Math.max(0, window.scrollY / scrollable));
    $('#scroll-progress').style.width = `${(fraction * 100).toFixed(2)}%`;
    $('#back-to-top').classList.toggle('is-visible', window.scrollY > 650);
    framePending = false;
  };
  window.addEventListener('scroll', () => {
    if (!framePending) { framePending = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth' }));
  update();
}

// 5. Active section indication in the persistent navigation.
function setupActiveSection() {
  const sections = $$('main section[id]');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    const inView = entries.filter(item => item.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    if (!inView.length) return;
    const activeId = inView[0].target.id;
    $$('.nav-link').forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, .15, .5] });
  sections.forEach(section => observer.observe(section));
}

// 6. Reduced-motion-aware scroll reveal, using one reusable observer.
function setupReveals() {
  const elements = $$('.reveal');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-revealed'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px 35px 0px' });
  elements.forEach(element => observer.observe(element));
}

// A small rotating introduction respects reduced-motion preferences.
function setupRoleRotator() {
  const label = $('#role-rotator');
  if (!label || reduceMotion.matches) return;
  const phrases = ['Multimedia Computing student', 'creative learner', 'future developer'];
  let index = 0;
  window.setInterval(() => {
    if (document.hidden) return;
    index = (index + 1) % phrases.length;
    label.textContent = phrases[index];
  }, 3400);
}

// Accessible tabs keep all of the original Interests, Goals, Hobbies, and Subjects content.
function setupWorldTabs() {
  const tabs = $$('.world-tab');
  if (!tabs.length) return;
  const activate = (tab, focus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let target = null;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activate(target, true); }
    });
  });
  $$('[data-open-tab]').forEach(link => link.addEventListener('click', event => {
    const target = tabs.find(tab => tab.id === `${link.dataset.openTab}-tab`);
    if (!target) return;
    event.preventDefault();
    activate(target);
    $('#my-world').scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    window.history.replaceState(null, '', '#my-world');
  }));
  const directPanel = document.getElementById(window.location.hash.slice(1));
  if (directPanel && directPanel.classList.contains('world-panel')) {
    const tab = tabs.find(item => item.getAttribute('aria-controls') === directPanel.id);
    if (tab) activate(tab);
  }
}

function visualFor(project) {
  return `<div class="project-visual has-image"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" width="800" height="500" loading="lazy" decoding="async"></div>`;
}

// 7. Data-driven project cards, 8. category filters, 9. live search, 10. sorting.
function renderProjectCards(projects) {
  return projects.map(project => `
    <article class="project-card">
      ${visualFor(project)}
      <div class="project-content">
        <div class="project-overline"><span>${project.group === 'competition' ? 'COMPETITION' : 'PROJECT'} / ${project.number}</span><span class="status">${escapeHTML(project.status.toUpperCase())}</span></div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.summary)}</p>
        <div class="tag-list">${project.tools.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>
        <div class="project-card-footer"><span>${escapeHTML(project.type.toUpperCase())}</span><button class="project-detail-button" type="button" data-project="${escapeHTML(project.id)}" aria-label="View details for ${escapeHTML(project.title)}">View details <span aria-hidden="true">↗</span></button></div>
      </div>
    </article>
  `).join('');
}

// 7. Data-driven cards, 8. group/category filters, 9. live search, 10. sorting.
function renderProjects() {
  const query = searchTerm.toLowerCase().trim();
  const matches = PROJECTS.filter(project => {
    const isGroupFilter = ['projects', 'competitions'].includes(activeFilter);
    const groupMatches = activeFilter === 'all'
      || !isGroupFilter
      || (activeFilter === 'projects' && project.group === 'project')
      || (activeFilter === 'competitions' && project.group === 'competition');
    const categoryMatches = activeFilter === 'all' || isGroupFilter || project.category === activeFilter;
    const searchMatches = [project.title, project.summary, project.type, ...project.tools].join(' ').toLowerCase().includes(query);
    return groupMatches && categoryMatches && searchMatches;
  });
  if (sortOrder !== 'featured') {
    matches.sort((a,b) => sortOrder === 'az' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  }
  const projectMatches = matches.filter(project => project.group === 'project');
  const competitionMatches = matches.filter(project => project.group === 'competition');
  $('#projects-grid').innerHTML = renderProjectCards(projectMatches);
  $('#competitions-grid').innerHTML = renderProjectCards(competitionMatches);
  $('#projects-group').hidden = projectMatches.length === 0;
  $('#competitions-group').hidden = competitionMatches.length === 0;
  $('#results-count').textContent = `Showing ${matches.length} ${matches.length === 1 ? 'work item' : 'work items'}${activeFilter === 'all' && !query ? ` · ${PROJECTS.filter(item => item.group === 'project').length} projects · ${PROJECTS.filter(item => item.group === 'competition').length} competition entries` : ''}`;
  $('#empty-state').hidden = matches.length > 0;
}

function setFilter(category) {
  activeFilter = category;
  $$('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  renderProjects();
}

function setupProjectTools() {
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  $('#project-search').addEventListener('input', event => { searchTerm = event.target.value; renderProjects(); });
  $('#project-sort').addEventListener('change', event => { sortOrder = event.target.value; renderProjects(); });
  $('#reset-filters').addEventListener('click', () => {
    searchTerm = '';
    sortOrder = 'featured';
    $('#project-search').value = '';
    $('#project-sort').value = 'featured';
    setFilter('all');
    $('#project-search').focus();
  });
  $('#project-results').addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (button) openProject(button.dataset.project);
  });
  renderProjects();
}

// 11. Native modal case studies, Escape/backdrop close, and 12. shareable deep links.
function projectURL(projectId) {
  const url = new URL(window.location.href);
  if (projectId) url.searchParams.set('project', projectId);
  else url.searchParams.delete('project');
  if (projectId) url.hash = 'work';
  return url;
}

function openProject(projectId, fromLink = false) {
  const project = PROJECTS.find(item => item.id === projectId);
  if (!project) return;
  currentProjectId = project.id;
  $('#dialog-cover').innerHTML = visualFor(project);
  $('#dialog-category').textContent = `${project.group === 'competition' ? 'COMPETITION ENTRY' : 'PROJECT'} / ${project.number}`;
  $('#dialog-title').textContent = project.title;
  $('#dialog-intro').textContent = project.summary;
  $('#dialog-type').textContent = project.type;
  $('#dialog-status').textContent = project.status;
  $('#dialog-idea').textContent = project.idea;
  $('#dialog-process').textContent = project.process;
  $('#dialog-learning').textContent = project.learning;
  $('#dialog-tags').innerHTML = project.tools.map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
  const dialog = $('#project-dialog');
  if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  else if (typeof dialog.showModal !== 'function') { showToast('Your browser does not support project dialogs.'); return; }
  if (!fromLink) window.history.replaceState(null, '', projectURL(projectId));
  $('#dialog-close').focus();
}

function setupDialog() {
  const dialog = $('#project-dialog');
  $('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    currentProjectId = null;
    const url = new URL(window.location.href);
    if (url.searchParams.has('project')) window.history.replaceState(null, '', projectURL(null));
  });
  const requested = new URLSearchParams(window.location.search).get('project');
  if (requested && PROJECTS.some(project => project.id === requested)) openProject(requested, true);
}

// Clipboard API has restrictions; the fallback still works in many older browsers.
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    const copied = document.execCommand('copy');
    temp.remove();
    return copied;
  } catch { return false; }
}

// 13. Live character counter and 14. accessible field validation.
function setupContactForm() {
  const form = $('#contact-form');
  const message = $('#contact-message');
  const fields = ['name', 'email', 'message'];
  const rules = {
    name: value => value.length < 2 ? 'Please enter at least 2 characters.' : '',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.',
    message: value => value.length < 10 ? 'Please write at least 10 characters.' : ''
  };
  const validate = key => {
    const input = $(`#contact-${key}`);
    const error = rules[key](input.value.trim());
    $(`#${key}-error`).textContent = error;
    if (error) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !error;
  };
  fields.forEach(key => {
    const input = $(`#contact-${key}`);
    input.setAttribute('aria-describedby', `${key}-error`);
    input.addEventListener('blur', () => validate(key));
    input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validate(key); });
  });
  message.addEventListener('input', () => { $('#message-count').textContent = `${message.value.length} / 600`; });

  // 15. Front-end-only contact workflow with mailto or safe copy fallback.
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const checks = fields.map(validate);
    if (checks.includes(false)) { $(`#contact-${fields[checks.indexOf(false)]}`).focus(); return; }
    const sender = $('#contact-name').value.trim();
    const email = $('#contact-email').value.trim();
    const subject = $('#contact-subject').value.trim() || 'Portfolio enquiry';
    const body = `Hi ${SETTINGS.ownerName},\n\n${message.value.trim()}\n\nFrom: ${sender}\nEmail: ${email}`;
    const feedback = $('#form-feedback');
    if (SETTINGS.contactEmail.trim()) {
      const mailto = `mailto:${encodeURIComponent(SETTINGS.contactEmail.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      feedback.textContent = 'Your email application should open with a prepared draft. Please press Send there.';
    } else {
      const copied = await copyText(`Subject: ${subject}\n\n${body}`);
      feedback.textContent = copied
        ? 'Message copied! Add the portfolio owner email in the code to enable direct email drafts.'
        : 'The portfolio email is not set yet. Add it in script.js before submitting the website.';
      showToast(copied ? 'Your draft was copied to clipboard' : 'Contact email needs to be configured');
    }
  });
}

// 16. Print-friendly résumé view and 17. automatic footer year.
function setupCopyEmail() {
  const button = $('#copy-email');
  if (!button) return;
  button.addEventListener('click', async () => {
    const copied = await copyText(SETTINGS.contactEmail);
    showToast(copied ? 'Email address copied' : 'Could not copy. Please select the email text instead.');
  });
}

function setupExtras() {
  $('#print-resume').addEventListener('click', () => window.print());
  $('#year').textContent = String(new Date().getFullYear());
}

function init() {
  const features = [setupTheme, setupNavigation, setupScrollTools, setupActiveSection, setupReveals,
    setupRoleRotator, setupWorldTabs, setupProjectTools, setupDialog, setupContactForm, setupCopyEmail, setupExtras];
  // One broken feature must not stop the others from running.
  features.forEach(feature => {
    try { feature(); } catch (error) { console.warn(`${feature.name} failed:`, error); }
  });
}

document.addEventListener('DOMContentLoaded', init);
