(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const steps = form.querySelectorAll('.steps .step');
    const panels = form.querySelectorAll('.panel');
    const bar = document.getElementById('contactBar');
    const prevBtn = document.getElementById('contactPrev');
    const nextBtn = document.getElementById('contactNext');
    const submitBtn = document.getElementById('contactSubmit');
    const success = document.getElementById('contactSuccess');

    let current = 1;
    const total = panels.length;

    function setError(field, msg) {
      const small = field.parentElement.querySelector('.err') || field.closest('.field')?.querySelector('.err');
      if (small) small.textContent = msg || '';
    }

    function validatePanel(n) {
      let valid = true;
      const panel = form.querySelector(`.panel[data-panel="${n}"]`);

      panel.querySelectorAll('[required]').forEach((el) => {
        if (el.type === 'checkbox') {
          if (!el.checked) {
            valid = false;
          }
          return;
        }
        const errEl = el.closest('.field')?.querySelector('.err');
        if (!el.value.trim()) {
          valid = false;
          if (errEl) errEl.textContent = 'Campo obrigatório.';
        } else if (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value)) {
          valid = false;
          if (errEl) errEl.textContent = 'E-mail inválido.';
        } else if (errEl) {
          errEl.textContent = '';
        }
      });

      if (n === 2) {
        const chipsWrap = panel.querySelector('.chips');
        const errChips = panel.querySelector('.err--chips');
        if (chipsWrap && !chipsWrap.querySelector('.chip.is-selected')) {
          valid = false;
          if (errChips) errChips.textContent = 'Selecione o tipo de projeto.';
        } else if (errChips) {
          errChips.textContent = '';
        }
      }

      return valid;
    }

    function goTo(n) {
      panels.forEach((p) => p.classList.toggle('is-active', Number(p.dataset.panel) === n));

      steps.forEach((s) => {
        const stepNum = Number(s.dataset.step);
        s.classList.toggle('is-active', stepNum === n);
        s.classList.toggle('is-done', stepNum < n);
      });

      bar.style.width = `${(n / total) * 100}%`;

      prevBtn.disabled = n === 1;
      nextBtn.hidden = n === total;
      submitBtn.hidden = n !== total;

      current = n;
    }

    nextBtn.addEventListener('click', () => {
      if (!validatePanel(current)) return;
      if (current < total) goTo(current + 1);
    });

    prevBtn.addEventListener('click', () => {
      if (current > 1) goTo(current - 1);
    });

    form.querySelectorAll('.chips .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const group = chip.closest('.chips');
        group.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        const errChips = group.parentElement.querySelector('.err--chips');
        if (errChips) errChips.textContent = '';
      });
    });

    const textarea = form.querySelector('textarea[name="message"]');
    const counter = document.getElementById('contactCount');
    if (textarea && counter) {
      textarea.addEventListener('input', () => {
        counter.textContent = textarea.value.length;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validatePanel(current)) return;

      form.querySelectorAll('.panel, .card__head, .card__foot').forEach((el) => {
        el.hidden = true;
      });
      success.hidden = false;
    });
  })();


  document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.querySelector('.timeline');
    const lineFill = document.querySelector('.timeline-line-fill');
    const lineGlow = document.querySelector('.timeline-line-glow');
    const items = document.querySelectorAll('.timeline-item');

    if (!timeline || !lineFill || !items.length) return;

    items.forEach(function (item, index) {
      item.style.transitionDelay = `${index * 100}ms`;

      const card = item.querySelector('.timeline-content');

      if (card) {
        card.addEventListener('mousemove', function (event) {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;

          card.style.setProperty('--mouse-x', `${x}%`);
          card.style.setProperty('--mouse-y', `${y}%`);
        });

        card.addEventListener('mouseleave', function () {
          card.style.setProperty('--mouse-x', '50%');
          card.style.setProperty('--mouse-y', '50%');
        });
      }
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.22
      }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function updateTimeline() {
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.72;
      const end = windowHeight * 0.22;

      const distance = timelineRect.height - windowHeight * 0.42;
      const current = start - timelineRect.top;

      let progress = current / distance;
      progress = clamp(progress, 0, 1);

      lineFill.style.height = `${progress * 100}%`;

      if (lineGlow) {
        lineGlow.style.top = `${progress * 100}%`;
        lineGlow.style.opacity = progress > 0.02 && progress < 0.98 ? '1' : '0';
      }

      let activeItem = null;
      let closestDistance = Infinity;
      const focusPoint = windowHeight * 0.48;

      items.forEach(function (item) {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromFocus = Math.abs(itemCenter - focusPoint);

        if (distanceFromFocus < closestDistance) {
          closestDistance = distanceFromFocus;
          activeItem = item;
        }
      });

      items.forEach(function (item) {
        item.classList.remove('is-active');
      });

      if (activeItem) {
        activeItem.classList.add('is-active');
      }
    }

    let ticking = false;

    function requestUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateTimeline();
          ticking = false;
        });

        ticking = true;
      }
    }

    updateTimeline();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  });
