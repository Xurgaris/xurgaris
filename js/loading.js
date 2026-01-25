
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  // Mantém o loader por pelo menos 1.5s para efeito visual
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500); // transição de fade-out
  }, 1900); // tempo mínimo que o loader fica visível
});
