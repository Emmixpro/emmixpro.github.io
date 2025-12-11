/* script.js
   - Handles animated facts/tips rotation (smooth transition)
   - Normalizes phone number for WhatsApp links
   - Wires WhatsApp/Telegram links
   - Adds 3D hover + scroll reveal animations
   - Neon button pulse & interactive glow effects
   - Author: Emanuel O.B.I (Emanuel’s Tech World)
*/

/* ====== EDIT HERE: phone and telegram ====== */
const RAW_WH_NUMBER = "091-18-24-47-94"; // <-- EDIT HERE if number changes
const TELEGRAM_USERNAME = "your_telegram_username"; // <-- EDIT HERE when ready (no @)

/* ====== Normalize WhatsApp Number ====== */
function normalizePhone(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length >= 10 && digits.startsWith('0')) return '234' + digits.slice(1);
  if (digits.length <= 10) return '234' + digits;
  return digits;
}
const WH_NUMBER = normalizePhone(RAW_WH_NUMBER);
const DISPLAY_PHONE = '+' + WH_NUMBER;

/* ====== Editable facts and tips ====== */
const FACTS = [
  "Did you know? The first computer bug was an actual moth.",
  "Did you know? Python was named after Monty Python, not the snake.",
  "Fact: Real projects on your portfolio beat certificates for many entry jobs.",
  "Did you know? This website was single handedly made and designed by Obi Emmanuel C.",
  "Tip: Learning consistency beats learning speed — daily practice wins.",
  "Fact: 90% of digital jobs require at least basic coding knowledge."
];
const TIPS = [
  "Tip: Finish tiny projects — completion matters more than size.",
  "Tip: Readability over cleverness when writing code.",
  "Tip: Practice debugging; it's the job.",
  "Tip: Version control (Git) is your best friend.",
  "Tip: Learn how to Google smart — it’s an actual skill."
];

/* ====== FACTS/TIPS ROTATOR with smooth transitions ====== */
let fIndex = 0, tIndex = 0;

function rotate() {
  const fEl = document.getElementById('rotator-fact');
  const tEl = document.getElementById('rotator-tip');

  const fadeTime = 700; // ms

  if (fEl) {
    fEl.style.transition = `opacity ${fadeTime}ms ease, transform ${fadeTime}ms ease`;
    fEl.style.opacity = 0;
    fEl.style.transform = 'translateY(-8px) scale(0.98)';
    setTimeout(() => {
      fEl.textContent = FACTS[fIndex];
      fEl.style.opacity = 1;
      fEl.style.transform = 'translateY(0) scale(1)';
    }, fadeTime);
    fIndex = (fIndex + 1) % FACTS.length;
  }

  if (tEl) {
    tEl.style.transition = `opacity ${fadeTime}ms ease, transform ${fadeTime}ms ease`;
    tEl.style.opacity = 0;
    tEl.style.transform = 'translateY(-8px) scale(0.98)';
    setTimeout(() => {
      tEl.textContent = TIPS[tIndex];
      tEl.style.opacity = 1;
      tEl.style.transform = 'translateY(0) scale(1)';
    }, fadeTime);
    tIndex = (tIndex + 1) % TIPS.length;
  }
}

/* ====== Auto-link Generator ====== */
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll(".whatsapp-link");
  const telegramLinks = document.querySelectorAll(".telegram-link");

  const cleanNum = WH_NUMBER;
  const waURL = `https://wa.me/${cleanNum}?text=${encodeURIComponent(
    "Hello Emanuel, I’m interested in one of your courses!"
  )}`;
  const tgURL = TELEGRAM_USERNAME ? `https://t.me/${TELEGRAM_USERNAME}` : "#";

  whatsappLinks.forEach(link => link.setAttribute("href", waURL));
  telegramLinks.forEach(link => link.setAttribute("href", tgURL));
});

/* ====== WhatsApp link generator ====== */
function whatsappLink(message) {
  return `https://wa.me/${WH_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ====== Telegram helper ====== */
function telegramLink() {
  return (TELEGRAM_USERNAME && TELEGRAM_USERNAME !== 'your_telegram_username')
    ? `https://t.me/${TELEGRAM_USERNAME}`
    : 'https://t.me';
}

/* ====== Neon Hover Animation ====== */
function neonHoverEffects() {
  document.querySelectorAll('.btn-neon').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.classList.add('glow'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('glow'));
  });
}

/* ====== Scroll Reveal Animation ====== */
function scrollReveal() {
  const revealEls = document.querySelectorAll('.course-card, .fade-in');
  const reveal = () => {
    const trigger = window.innerHeight * 0.9;
    revealEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', reveal);
  reveal(); // Initial check
}

/* ====== 3D Hover Card Tilt ====== */
function cardTiltEffect() {
  const cards = document.querySelectorAll('.course-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / 20) * -1;
      const rotateY = ((x - centerX) / 20);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* ====== On Window Load ====== */
window.addEventListener('load', () => {
  // Initialize rotator
  rotate();
  setInterval(rotate, 5200);

  // Wire up buttons
  document.querySelectorAll('.display-phone').forEach(el => el.textContent = DISPLAY_PHONE);
  const whHome = document.getElementById('wh-home');
  if (whHome) whHome.href = whatsappLink("Hello, I am interested in courses at Emanuel's Tech World.");

  const tgHome = document.getElementById('tg-home');
  if (tgHome) tgHome.href = telegramLink();

  // Map for course-specific WhatsApp buttons
  const map = {
    'wh-webdesign': "Web Design",
    'wh-python': "Python Programming",
    'wh-cyber': "Cyber Security",
    'wh-blockchain': "Blockchain Technology",
    'wh-uiux': "UI/UX Design",
    'wh-marketing': "Digital Marketing",
    'wh-gamedev': "Game Development",
    'wh-hacking': "Ethical Hacking & Pen Testing",
    'wh-robotics': "Robotics & IoT",
    'wh-cloud': "Cloud DevOps Engineering",
    'wh-db': "Database Administration",
    'wh-vrar': "Virtual & Augmented Reality"
  };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = whatsappLink(`Hello, I am interested in the ${map[id]} course at Emanuel's Tech World.`);
  });

  document.querySelectorAll('.telegram-link').forEach(a => a.href = telegramLink());

  // Animation handlers
  neonHoverEffects();
  scrollReveal();
  cardTiltEffect();
});

/* ====== Small Dev Helper: open string in new tab ====== */
function openHtmlInTab(html, title) {
  const w = window.open('', '_blank');
  if (!w) { alert('Popup blocked — allow popups.'); return; }
  w.document.write('<!doctype html><html><head><title>' + (title || '') + '</title></head><body>' + html + '</body></html>');
  w.document.close();
}
const darkSwitch = document.getElementById("darkSwitch");
if (darkSwitch) darkSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});



/* ====== End of script.js ====== */
