// Decorative execution paths. No requests, inference, or simulated live data.
(() => {
  const scene = document.querySelector('[data-agent-scene]');
  if (!scene) return;
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  let frame = 0;
  try { paused = localStorage.getItem('motion') === 'paused'; } catch (_) { /* Optional preference. */ }

  const update = () => {
    root.dataset.motion = paused || preference.matches ? 'paused' : 'running';
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume animation' : 'Pause animation');
    toggle.querySelector('[data-motion-label]').textContent = paused ? 'Resume motion' : 'Pause motion';
    if (paused || preference.matches) {
      cancelAnimationFrame(frame);
      scene.style.setProperty('--pointer-x', '0px');
      scene.style.setProperty('--pointer-y', '0px');
    }
  };
  update();
  preference.addEventListener('change', update);
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('motion', paused ? 'paused' : 'running'); } catch (_) { /* Page-local fallback. */ }
    update();
  });
  const visibility = () => { root.dataset.pageHidden = String(document.hidden); };
  document.addEventListener('visibilitychange', visibility);
  visibility();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      scene.dataset.visible = String(entry.isIntersecting);
    }).observe(scene);
  }
  const heading = scene.closest('.hero-heading');
  heading.addEventListener('pointermove', event => {
    if (paused || preference.matches || !pointer.matches || scene.dataset.visible === 'false') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = heading.getBoundingClientRect();
      scene.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 9}px`);
      scene.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * 7}px`);
    });
  });
  heading.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    scene.style.setProperty('--pointer-x', '0px');
    scene.style.setProperty('--pointer-y', '0px');
  });
})();
