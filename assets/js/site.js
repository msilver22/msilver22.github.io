(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeToggle = document.querySelector('.theme-toggle');
  const updateThemeLabel = () => {
    const dark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeToggle.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#19191d' : '#f8f7f4';
  };
  themeToggle.hidden = false;
  updateThemeLabel();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) { /* Still works for this page. */ }
    updateThemeLabel();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('theme'); } catch (_) { /* Follow the system. */ }
    if (!['light', 'dark'].includes(saved)) {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      updateThemeLabel();
    }
  });

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!reducedMotion.matches) {
            entry.target.animate([
              { opacity: 0, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(section => {
      observer.observe(section);
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        observer.disconnect();
        document.querySelectorAll('.reveal').forEach(el => el.getAnimations().forEach(animation => animation.cancel()));
      }
    });
  }

  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  const updateProgress = () => {
    const distance = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    scheduled = false;
  };
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();
  document.querySelectorAll('.paper-details').forEach(details => {
    details.addEventListener('toggle', updateProgress);
  });

  const search = document.querySelector('#publication-search');
  if (search) {
    document.querySelector('.publication-tools').hidden = false;
    const year = document.querySelector('#publication-year');
    const papers = [...document.querySelectorAll('[data-paper]')];
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
      updateProgress();
    };
    search.addEventListener('input', filter);
    year.addEventListener('change', filter);
  }

  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('.copy-citation').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent);
          button.textContent = 'Copied ✓';
        } catch (_) { button.textContent = 'Select and copy the text below'; }
        setTimeout(() => { button.textContent = 'Copy citation'; }, 2200);
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

  const dialog = document.querySelector('.portrait-dialog');
  if (typeof dialog.showModal === 'function') {
    document.querySelector('[data-portrait]').addEventListener('click', () => dialog.showModal());
    document.querySelector('[data-close-portrait]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }

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
