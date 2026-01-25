// Espera o site carregar totalmente
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  // Desaparece suavemente
  loader.style.opacity = '0';

  // Remove do DOM após a transição
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500); // 500ms = tempo do fade-out
});
