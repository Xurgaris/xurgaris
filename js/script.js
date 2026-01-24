// ===============================
// SCROLL ANIMATION (IntersectionObserver)
// ===============================
const animatedElements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

animatedElements.forEach((el) => observer.observe(el));

// ===============================
// FORM VALIDATION
// ===============================
const form = document.querySelector(".contact-form");

if (form) {
  const fields = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      const error = field.nextElementSibling;

      if (!field.value.trim()) {
        error.style.display = "block";
        isValid = false;
      } else {
        error.style.display = "none";
      }

      if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          error.style.display = "block";
          isValid = false;
        }
      }
    });

    if (isValid) {
      form.reset();
      alert("Mensagem enviada com sucesso! 🚀");
    }
  });
}




//ANIMAÇÃO LAYOUT
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
const serviceCards = document.querySelectorAll(".services article");

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

serviceCards.forEach((card) => {
  serviceObserver.observe(card);
});
const processSteps = document.querySelectorAll(".process-steps div");

const processObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.3 }
);

processSteps.forEach((step) => {
  processObserver.observe(step);
});
document.querySelectorAll('.stats-grid div').forEach(el => {
  observer.observe(el);
});
