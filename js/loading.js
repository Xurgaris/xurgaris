   (function() {
      const loader = document.getElementById('loading-screen');

      // Função para remover loader
      function hideLoader() {
        if (!loader) return;
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }

      // Espera até que tudo da página carregue (imagens, CSS, fonts)
      if (document.readyState === 'complete') {
        hideLoader();
      } else {
        window.addEventListener('load', hideLoader);
      }

      // Timeout fallback (caso algum recurso trave)
      setTimeout(hideLoader, 5000);
    })();