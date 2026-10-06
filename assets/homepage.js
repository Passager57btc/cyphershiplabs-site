(() => {
  const rail = document.querySelector('.crew-rail');
  if (!rail) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-crew-direction]').forEach(button => {
    button.addEventListener('click', () => {
      const card = rail.querySelector('.crew-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(rail).gap) || 0;
      rail.scrollBy({ left: (card.offsetWidth + gap) * Number(button.dataset.crewDirection), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
  });
})();
