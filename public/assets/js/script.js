// ================================================
// XURGARIS — MAIN SCRIPT
// ================================================

import {
  $, $$, $id, addClass, removeClass, on, observeElements,
  smoothScroll, debounce, log, device
} from './utils.js';

/**
 * Inicialização do site
 */
class Xurgaris {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    log('Inicializando aplicação...', 'info');
    
    this.hideLoadingScreen();
    this.setupHeader();
    this.setupNavigation();
    this.setupAnimations();
    this.setupSmoothScroll();
    this.setupFormHandling();
    this.setupObserver();
    
    this.initialized = true;
    log('Aplicação inicializada com sucesso!', 'success');
  }

  /**
   * Remove tela de loading
   */
  hideLoadingScreen() {
    const loadingScreen = $id('loading-screen');
    if (!loadingScreen) return;

    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  }

  /**
   * Setup do header
   */
  setupHeader() {
    const header = $('.header');
    if (!header) return;

    let lastScrollY = 0;
    window.addEventListener('scroll', debounce(() => {
      const currentScrollY = window.pageYOffset;

      // Detecta scroll down para esconder/mostrar header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    }, 10));

    // Adiciona espaço para o header fixo
    if (header) {
      header.style.transition = 'transform 0.3s ease';
    }
  }

  /**
   * Setup da navegação mobile
   */
  setupNavigation() {
    const menuToggle = $('.menu-toggle');
    const menu = $('.menu');

    if (!menuToggle || !menu) return;

    on(menuToggle, 'click', () => {
      menuToggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    $$('.menu a').forEach(link => {
      on(link, 'click', () => {
        menuToggle.classList.remove('active');
        menu.classList.remove('active');
      });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && menu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  }

  /**
   * Setup de animações ao scroll
   */
  setupAnimations() {
    observeElements('[data-animate]', (element) => {
      element.classList.add('active');
    });

    // Anima service cards
    observeElements('.service-card', (element) => {
      element.classList.add('active');
    });

    // Anima process steps
    observeElements('.process-step', (element) => {
      element.classList.add('active');
    });

    // Anima stats
    observeElements('.stat-card', (element) => {
      element.classList.add('active');
    });
  }

  /**
   * Setup de scroll suave
   */
  setupSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      on(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        smoothScroll(href);
      });
    });
  }

  /**
   * Setup dos formulários
   */
  setupFormHandling() {
    const contactForm = $('.contact-form');
    if (!contactForm) return;

    on(contactForm, 'submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(contactForm);
    });

    // Adiciona validação em tempo real
    $$('.contact-form input, .contact-form textarea').forEach(field => {
      on(field, 'blur', () => this.validateField(field));
      on(field, 'input', () => this.validateField(field));
    });
  }

  /**
   * Valida campo do formulário
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;

    if (!value) {
      isValid = false;
    } else if (type === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (name === 'telefone') {
      isValid = /^(\d{2})\s?9?\d{4}-?\d{4}$/.test(value.replace(/\s/g, ''));
    }

    if (isValid) {
      field.parentElement.classList.remove('error');
      field.parentElement.classList.add('success');
    } else {
      field.parentElement.classList.remove('success');
      field.parentElement.classList.add('error');
    }
  }

  /**
   * Envia formulário
   */
  async handleFormSubmit(form) {
    const submitBtn = $('button[type="submit"]', form);
    const originalText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      const formData = new FormData(form);
      const response = await fetch(form.action || '/api/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.showToast('Mensagem enviada com sucesso!', 'success');
        form.reset();
        $$('.form-group', form).forEach(group => {
          group.classList.remove('success', 'error');
        });
      } else {
        this.showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
      }
    } catch (error) {
      log('Erro ao enviar formulário:', 'error', error);
      this.showToast('Erro ao enviar. Verifique sua conexão.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  /**
   * Mostra toast (notificação)
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('active');
    }, 100);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /**
   * Setup do Intersection Observer
   */
  setupObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, options);

    $$('[data-animate], .service-card, .process-step, .stat-card').forEach(element => {
      observer.observe(element);
    });
  }
}

// Inicializa quando DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Xurgaris();
  });
} else {
  new Xurgaris();
}

export default Xurgaris;
