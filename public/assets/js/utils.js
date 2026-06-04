// ================================================
// XURGARIS — JAVASCRIPT UTILITIES
// ================================================

/**
 * Utility functions para o site Xurgaris
 */

// ========== DOM UTILITIES ==========
export const $$ = (selector) => document.querySelectorAll(selector);
export const $ = (selector) => document.querySelector(selector);
export const $id = (id) => document.getElementById(id);

/**
 * Adiciona classe aos elementos com delay opcional
 */
export function addClass(selector, className, delay = 0) {
  const elements = $$(selector);
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add(className);
    }, delay * index);
  });
}

/**
 * Remove classe dos elementos
 */
export function removeClass(selector, className) {
  $$(selector).forEach(el => el.classList.remove(className));
}

/**
 * Toggle classe
 */
export function toggleClass(selector, className) {
  $$(selector).forEach(el => el.classList.toggle(className));
}

/**
 * Verifica se elemento tem classe
 */
export function hasClass(element, className) {
  return element.classList.contains(className);
}

// ========== EVENT UTILITIES ==========
/**
 * Adiciona event listener com opção de delegação
 */
export function on(element, event, callback, useCapture = false) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.addEventListener(event, callback, useCapture);
  }
}

/**
 * Remove event listener
 */
export function off(element, event, callback, useCapture = false) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.removeEventListener(event, callback, useCapture);
  }
}

// ========== ANIMATION UTILITIES ==========
/**
 * Intersection Observer para animações ao scroll
 */
export function observeElements(selector, onObserve, threshold = 0.2) {
  const elements = $$(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onObserve(entry.target);
      }
    });
  }, { threshold });

  elements.forEach(el => observer.observe(el));
  return observer;
}

/**
 * Smooth scroll para elemento
 */
export function smoothScroll(target, offset = 90) {
  const element = typeof target === 'string' ? $(target) : target;
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// ========== FORM UTILITIES ==========
/**
 * Valida email
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valida campo obrigatório
 */
export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : !!value;
}

/**
 * Valida telefone
 */
export function isValidPhone(phone) {
  const re = /^(\d{2})\s?9?\d{4}-?\d{4}$/;
  return re.test(phone.replace(/\s/g, ''));
}

/**
 * Obtém dados do formulário em objeto
 */
export function getFormData(formSelector) {
  const form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
  if (!form) return {};

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  return data;
}

// ========== STRING UTILITIES ==========
/**
 * Debounce para funções
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle para funções
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Cria slug a partir de texto
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

// ========== API UTILITIES ==========
/**
 * Fetch com timeout
 */
export async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Parse JSON de forma segura
 */
export function parseJSON(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON Parse Error:', e);
    return defaultValue;
  }
}

// ========== STORAGE UTILITIES ==========
/**
 * LocalStorage com expiração
 */
export const storage = {
  set: (key, value, expirationMinutes = null) => {
    const data = {
      value,
      timestamp: Date.now(),
      expiration: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  get: (key) => {
    const data = parseJSON(localStorage.getItem(key));
    if (!data) return null;

    if (data.expiration && Date.now() > data.expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return data.value;
  },

  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};

// ========== CONSOLE UTILITIES ==========
/**
 * Log formatado
 */
export function log(message, type = 'info', data = null) {
  const styles = {
    info: 'color: #6cf2c2; font-weight: bold;',
    error: 'color: #ff6b6b; font-weight: bold;',
    warning: 'color: #ffd93d; font-weight: bold;',
    success: 'color: #10b981; font-weight: bold;'
  };

  console.log(`%c[Xurgaris] ${message}`, styles[type] || styles.info);
  if (data) console.log(data);
}

// ========== DEVICE UTILITIES ==========
/**
 * Detecta dispositivo
 */
export const device = {
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent),
  isDesktop: () => !device.isMobile() && !device.isTablet(),
  isTouchDevice: () => (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
};

// ========== COLOR UTILITIES ==========
/**
 * Converte hex para RGB
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Converte RGB para Hex
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export default {
  $$, $, $id,
  addClass, removeClass, toggleClass, hasClass,
  on, off,
  observeElements, smoothScroll,
  isValidEmail, isRequired, isValidPhone, getFormData,
  debounce, throttle, createSlug,
  fetchWithTimeout, parseJSON,
  storage,
  log,
  device,
  hexToRgb, rgbToHex
};
