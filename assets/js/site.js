(() => {
  const root = document.documentElement;

  // Theme: follows the system until the visitor chooses.
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const updateTheme = () => {
    const dark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeColor.content = dark ? '#11141b' : '#e9eef2';
  };
  themeToggle.hidden = false;
  updateTheme();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) { /* Still works for this page. */ }
    updateTheme();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('theme'); } catch (_) { /* Follow the system. */ }
    if (!['light', 'dark'].includes(saved)) {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      updateTheme();
    }
  });

  // Publications: search and year filter over the rendered list.
  const search = document.querySelector('#publication-search');
  if (search) {
    document.querySelector('.tools').hidden = false;
    const year = document.querySelector('#publication-year');
    const papers = [...document.querySelectorAll('[data-paper]')];
    const normalize = value => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const index = papers.map(paper => ({ paper, text: normalize([
      paper.querySelector('h3').textContent, paper.querySelector('.paper-authors').textContent,
      paper.querySelector('.paper-venue').textContent, paper.querySelector('.abstract')?.textContent || ''
    ].join(' ')) }));
    const filter = () => {
      const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
      let count = 0;
      index.forEach(({ paper, text }) => {
        paper.hidden = !terms.every(term => text.includes(term)) || (!!year.value && paper.dataset.year !== year.value);
        if (!paper.hidden) count++;
      });
      document.querySelectorAll('[data-year-group]').forEach(group => {
        group.hidden = ![...group.querySelectorAll('[data-paper]')].some(paper => !paper.hidden);
      });
      document.querySelector('#result-count').textContent = `${count} publication${count === 1 ? '' : 's'}`;
      document.querySelector('#no-results').hidden = count !== 0;
    };
    search.addEventListener('input', filter);
    year.addEventListener('change', filter);
  }

  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('.copy-citation').forEach(button => {
      let timer;
      button.hidden = false;
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent);
          button.textContent = 'Copied';
        } catch (_) { button.textContent = 'Select and copy the text below'; }
        clearTimeout(timer);
        timer = setTimeout(() => { button.textContent = 'Copy citation'; }, 2200);
      });
    });
  }

  // Opening a publication directly makes its abstract available immediately.
  const revealLinkedPaper = () => {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const paper = document.getElementById(id);
    if (!paper?.matches('[data-paper]')) return;
    const abstract = paper.querySelector('.paper-details:not(.citation)');
    if (abstract) abstract.open = true;
  };
  revealLinkedPaper();
  addEventListener('hashchange', revealLinkedPaper);

  // Load mathematics only on pages that contain TeX; no rendering dependency otherwise.
  if (/\$[^$]+\$/.test(document.querySelector('main').textContent)) {
    window.MathJax = {
      tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']] },
      options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }
    };
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.append(script);
  }
})();
