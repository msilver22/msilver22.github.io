// Decorative execution paths. No requests, inference, or simulated live data.
(() => {
  const scene = document.querySelector('[data-agent-scene]');
  if (!scene) return;
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;

  const update = () => {
    root.dataset.motion = preference.matches ? 'paused' : 'running';
    if (preference.matches) {
      cancelAnimationFrame(frame);
      scene.style.setProperty('--pointer-x', '0px');
      scene.style.setProperty('--pointer-y', '0px');
    }
  };
  update();
  preference.addEventListener('change', update);
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
    if (preference.matches || !pointer.matches || scene.dataset.visible === 'false') return;
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
