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

  // Envia via fetch
  const formData = new FormData(form);

  try {
    const res = await fetch('send-mail.php', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.status === 'success') {
      responseDiv.textContent = data.message;
      responseDiv.style.color = 'green';
      form.reset();
    } else {
      responseDiv.textContent = data.message;
      responseDiv.style.color = 'red';
    }
  } catch (err) {
    responseDiv.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
    responseDiv.style.color = 'red';
  }
});
