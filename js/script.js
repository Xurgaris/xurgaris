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
// ===============================
// ANIMAÇÕES (IntersectionObserver)
// ===============================
const animatedElements = document.querySelectorAll("[data-animate]");
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

// ===============================
// FORM VALIDATION + NETLIFY SUBMISSION
// ===============================
// ===============================
// ANIMAÇÕES (IntersectionObserver)
// ===============================
const animatedElements = document.querySelectorAll("[data-animate], .services article, .process-steps div, .stats-grid div");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
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

// ===============================
// FORM VALIDATION + NETLIFY AJAX SUBMISSION
// ===============================
const form = document.querySelector(".contact-form");

if (form) {
  const fields = form.querySelectorAll("input, textarea");
  const responseDiv = form.querySelector(".form-response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Bloqueia envio padrão

    let isValid = true;
    responseDiv.textContent = "";
    responseDiv.style.opacity = "0";

    // Validação dos campos
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

    if (!isValid) return;

    // Prepara os dados para Netlify
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: new URLSearchParams(formData).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.ok) {
        responseDiv.textContent = "Mensagem enviada com sucesso! 🚀";
        responseDiv.style.color = "#0b0d12";
        responseDiv.style.opacity = "1";
        form.reset();
      } else {
        throw new Error("Erro ao enviar a mensagem.");
      }
    } catch (error) {
      responseDiv.textContent = "Ocorreu um erro. Tente novamente mais tarde.";
      responseDiv.style.color = "red";
      responseDiv.style.opacity = "1";
      console.error(error);
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
