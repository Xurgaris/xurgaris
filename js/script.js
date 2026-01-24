// ===============================
// ANIMAÇÕES (IntersectionObserver)
// ===============================
const animatedElements = document.querySelectorAll(
  "[data-animate], .services article, .process-steps div, .stats-grid div"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((el) => observer.observe(el));

// ===============================
// MENU TOGGLE
// ===============================
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
;
