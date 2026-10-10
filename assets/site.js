(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  if (!toggle || !navigation) return;
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
})();

// Calypso easter eggs: a console transmission for those who open the tools,
// and typing « noos » anywhere outside a form field shows a short message.
// No tracking, no network, nothing stored.
(() => {
  const fr = document.documentElement.lang === 'fr';
  const message = fr
    ? 'Transmission reçue. Vous êtes à bord de Calypso.'
    : 'Transmission received. You are aboard Calypso.';
  try {
    console.log('%cCALYPSO · CypherShip Labs', 'font: 600 14px monospace; color: #5FC0D6; letter-spacing: 2px');
    console.log('%c' + message + '\nFinis coronat opus. — CypherShip\nThe crew: /humans.txt', 'font: 12px monospace; color: #E3B168');
  } catch (_) { /* console unavailable */ }

  const word = 'noos';
  let typed = '';
  let toast = null;
  let timer = null;

  function hide() {
    if (!toast) return;
    toast.classList.remove('is-on');
    clearTimeout(timer);
  }

  function show() {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'transmission';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<span class="transmission-eyebrow">Transmission</span><p></p><span class="transmission-sign">— CypherShip</span>';
      toast.querySelector('p').textContent = message;
      toast.addEventListener('click', hide);
      document.body.appendChild(toast);
    }
    void toast.offsetWidth; // commit the hidden state first so the fade-in runs
    toast.classList.add('is-on');
    clearTimeout(timer);
    timer = setTimeout(hide, 6000);
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { hide(); return; }
    const target = event.target;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    if (typeof event.key !== 'string' || event.key.length !== 1) return;
    typed = (typed + event.key.toLowerCase()).slice(-word.length);
    if (typed === word) { typed = ''; show(); }
  });
})();
