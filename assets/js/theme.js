// Run before paint, including when storage is unavailable (e.g. private browsing).
(() => {
  let theme;
  try { theme = localStorage.getItem('theme'); } catch (_) { /* System preference is enough. */ }
  document.documentElement.dataset.theme = ['light', 'dark'].includes(theme)
    ? theme : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
