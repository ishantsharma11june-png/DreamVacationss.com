// Keep business hours in one place so the display is easy to update.
const BUSINESS_HOURS = {
  summary: 'Open during business hours · closes around 5 PM',
  days: [
    ['Current hours', 'Open during business hours']
  ]
};

const hoursSummary = document.querySelector('#hours-summary');
const hoursList = document.querySelector('#hours-list');
const currentYear = document.querySelector('#current-year');
const toast = document.querySelector('#toast');
const address = document.querySelector('#business-address');
const copyAddress = document.querySelector('#copy-address');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

hoursSummary.textContent = BUSINESS_HOURS.summary;
hoursList.innerHTML = BUSINESS_HOURS.days.map(([day, hours]) => `<div class="hours-row"><span>${day}</span><strong>${hours}</strong></div>`).join('');
currentYear.textContent = new Date().getFullYear();

copyAddress.addEventListener('click', async () => {
  const addressText = address.innerText.replace(/\n/g, ', ');
  try {
    await navigator.clipboard.writeText(addressText);
    toast.textContent = 'Address copied';
  } catch {
    toast.textContent = addressText;
  }
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
});

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('[data-google-reviews]').addEventListener('click', (event) => {
  event.preventDefault();
  window.open('https://www.google.com/search?q=Dream+Vacations+Sector+117+Punjab+reviews', '_blank', 'noopener');
});
