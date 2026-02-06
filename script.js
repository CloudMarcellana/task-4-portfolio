/* ===== Mobile nav ===== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

/* Close menu on click */
document.querySelectorAll(".nav-link").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* ===== Active link highlight on scroll ===== */
const sections = ["home", "about", "skills", "projects", "contact"].map(id => document.getElementById(id));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setActiveLink() {
  const scrollY = window.scrollY + 120;
  let current = "home";

  for (const sec of sections) {
    if (!sec) continue;
    if (sec.offsetTop <= scrollY) current = sec.id;
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === `#${current}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* ===== Theme toggle (saved) ===== */
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

function syncThemeIcon() {
  themeBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
}
syncThemeIcon();

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  syncThemeIcon();
});

/* ===== Typed role text ===== */
const typedEl = document.getElementById("typed");
const phrases = ["Frontend Developer", "Web Developer", "UI/UX Enthusiast", "Student Developer"];
let p = 0, i = 0, deleting = false;

function typeLoop() {
  const current = phrases[p];

  if (!deleting) {
    i++;
    typedEl.textContent = current.slice(0, i);
    if (i === current.length) {
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    i--;
    typedEl.textContent = current.slice(0, i);
    if (i === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 70);
}
typeLoop();

/* ===== Contact form (mailto) ===== */
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const msg = document.getElementById("cMsg").value.trim();

  const subject = encodeURIComponent(`Portfolio Message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

  // Change this to your real email:
  const to = "yourname@email.com";
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

/* ===== Footer year ===== */
document.getElementById("year").textContent = new Date().getFullYear();
