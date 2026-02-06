/* mobile nav */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a nav link is clicked for mobile
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* link highlight */
const sectionIds = ["home", "about", "skills", "projects", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setActiveLink() {
  const scrollY = window.scrollY + 140; 
  let current = "home";

  for (const sec of sections) {
    if (sec.offsetTop <= scrollY) current = sec.id;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* role typed in profile */
const typedEl = document.getElementById("typed");

if (typedEl) {
  const phrases = ["Web Developer Intern", "QA Intern", "Computer Science Student"];
  let p = 0;
  let i = 0;
  let deleting = false;

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
}

/* footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
