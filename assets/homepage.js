(() => {
  const rail = document.querySelector('.crew-rail');
  if (!rail) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...document.querySelectorAll('[data-crew-direction]')];
  const holdThreshold = 250;
  const continuousSpeed = 840;
  const reducedMotionStepDelay = 720; // Discrete, user-held steps avoid a long smooth tween.
  let activePress = null;
  let suppressedClick = null;

  function cardStep() {
    const card = rail.querySelector('.crew-card');
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(rail).gap) || 0;
    return card.offsetWidth + gap;
  }

  function clampScroll(value) {
    return Math.max(0, Math.min(value, rail.scrollWidth - rail.clientWidth));
  }


  function stopAnimation(press) {
    if (press.frame !== null) {
      window.cancelAnimationFrame(press.frame);
      press.frame = null;
    }
  }

  function stopPress(reason, event) {
    const press = activePress;
    if (!press) return;
    activePress = null;
    window.clearTimeout(press.timer);
    stopAnimation(press);
    if (press.held) {
      rail.style.scrollSnapType = press.previousSnap;
      rail.style.scrollBehavior = press.previousScrollBehavior;
      if (reason === 'pointerup') {
        suppressedClick = {
          button: press.button,
          pointerId: press.pointerId,
          releaseTime: event && event.timeStamp !== undefined ? event.timeStamp : performance.now()
        };
      }
    }
  }

  function scrollFrame(press, time) {
    if (activePress !== press || !press.held) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    if (reducedMotion.matches) {
      if (time - press.lastStep >= reducedMotionStepDelay) {
        const next = clampScroll(rail.scrollLeft + press.direction * cardStep());
        if (next === rail.scrollLeft) return;
        rail.scrollLeft = next;
        press.lastStep = time;
      }
    } else {
      const elapsed = press.lastFrame ? Math.min(50, time - press.lastFrame) : 0;
      const next = clampScroll(rail.scrollLeft + press.direction * continuousSpeed * elapsed / 1000);
      const atDirectionBoundary = (press.direction < 0 && rail.scrollLeft <= 0) || (press.direction > 0 && rail.scrollLeft >= max);
      if (next === rail.scrollLeft && atDirectionBoundary) return;
      rail.scrollLeft = next;
      press.lastFrame = time;
    }
    press.frame = window.requestAnimationFrame(nextTime => scrollFrame(press, nextTime));
  }

  function beginHold(press) {
    if (activePress !== press) return;
    press.held = true;
    press.previousSnap = rail.style.scrollSnapType;
    press.previousScrollBehavior = rail.style.scrollBehavior;
    rail.style.scrollSnapType = 'none';
    rail.style.scrollBehavior = 'auto';
    press.lastFrame = 0;
    press.lastStep = performance.now();
    press.frame = window.requestAnimationFrame(time => scrollFrame(press, time));
  }

  buttons.forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (!event.isPrimary || (event.button !== undefined && event.button !== 0)) return;
      if (activePress) stopPress('interrupted');
      suppressedClick = null;
      const press = {
        button,
        pointerId: event.pointerId,
        direction: Math.sign(Number(button.dataset.crewDirection)) || 1,
        held: false,
        frame: null,
        timer: null,
        lastFrame: 0,
        lastStep: 0,
        previousSnap: '',
        previousScrollBehavior: ''
      };
      activePress = press;
      press.timer = window.setTimeout(() => beginHold(press), holdThreshold);
      try { button.setPointerCapture(event.pointerId); } catch (_) { /* window listeners still stop the hold */ }
    });
    button.addEventListener('lostpointercapture', event => {
      if (activePress && activePress.pointerId === event.pointerId) stopPress('capture-lost');
    });
    button.addEventListener('click', event => {
      if (event.detail > 0 && suppressedClick && suppressedClick.button === button) {
        const hasPointerId = event.pointerId !== undefined && event.pointerId !== null;
        const samePointer = hasPointerId && event.pointerId === suppressedClick.pointerId;
        const elapsed = event.timeStamp - suppressedClick.releaseTime;
        const nearbyLegacyClick = !hasPointerId && elapsed >= 0 && elapsed <= 120;
        if (samePointer || nearbyLegacyClick) {
          suppressedClick = null;
          event.preventDefault();
          return;
        }
        if (hasPointerId || elapsed > 120) suppressedClick = null;
      }
      const step = cardStep();
      if (!step) return;
      rail.scrollBy({
        left: step * (Number(button.dataset.crewDirection) || 1),
        behavior: reducedMotion.matches ? 'instant' : 'smooth'
      });
    });
  });

  window.addEventListener('pointerup', event => {
    if (activePress && activePress.pointerId === event.pointerId) stopPress('pointerup', event);
  });
  window.addEventListener('pointercancel', event => {
    if (activePress && activePress.pointerId === event.pointerId) stopPress('pointercancel');
  });
  window.addEventListener('blur', () => stopPress('blur'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopPress('hidden');
  });
})();
