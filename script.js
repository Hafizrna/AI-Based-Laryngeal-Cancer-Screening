const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const floatingTop = document.getElementById("floatingTop");
const header = document.querySelector(".site-header");

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

if (floatingTop) {
  floatingTop.addEventListener("click", scrollToTop);
}

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;

    if (header) {
      header.style.boxShadow =
        y > 8 ? "0 8px 24px rgba(140, 20, 23, 0.06)" : "none";
    }

    if (floatingTop) {
      floatingTop.classList.toggle("visible", y > 420);
    }
  },
  { passive: true },
);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    if (href === "#top") {
      event.preventDefault();
      scrollToTop();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const headerOffset = header ? header.offsetHeight + 8 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
