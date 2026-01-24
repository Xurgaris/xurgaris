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
 {
     const form = document.querySelector('.contact-form');
const responseDiv = form.querySelector('.form-response');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Limpa mensagens anteriores
  responseDiv.textContent = '';
  form.querySelectorAll('.error').forEach(el => el.style.display = 'none');

  // Validação básica
  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name) {
    form.querySelector('#name + small').style.display = 'block';
    valid = false;
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    form.querySelector('#email + small').style.display = 'block';
    valid = false;
  }

  if (!message) {
    form.querySelector('#message + small').style.display = 'block';
    valid = false;
  }

  if (!valid) return;

  // Cria objeto FormData para envio
  const formData = new FormData(form);

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    });

    if (res.ok) {
      responseDiv.textContent = "Mensagem enviada com sucesso!";
      responseDiv.style.color = "green";
      form.reset();
    } else {
      responseDiv.textContent = "Erro ao enviar a mensagem. Tente novamente.";
      responseDiv.style.color = "red";
    }
  } catch (err) {
    responseDiv.textContent = "Erro ao enviar a mensagem. Tente novamente.";
    responseDiv.style.color = "red";
  }
});

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
