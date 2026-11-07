# Working on this website

This is Matteo Silvestri's custom academic website. It uses Python 3.10+, Jinja,
Markdown, PyYAML, and bibtexparser to build static HTML for GitHub Pages.

- Run `pip install -r requirements.txt`, then `python scripts/serve.py` to preview
  on port 8080. Changes rebuild; refresh the browser. Docker is also supported.
- Build with `python scripts/build.py`; verify with
  `python -m unittest discover -s tests -v`.
- Keep content in `_pages/about.md`, `_news/*.md`, `_bibliography/papers.bib`,
  `_data/cv.yml`, `_data/socials.yml`, and `site.yml`. Preserve existing content,
  outbound links, assets, and public URLs when changing layouts.
- News entries use a `date: YYYY-MM-DD` in YAML front matter and a Markdown body.
  Their existing `announcement_N` filenames determine permanent URLs.
- Publications use BibTeX, including `abbr`, `abstract`, `pdf`, and `code` fields.
  All authors render; Matteo's name is emphasized. Keep full citations available.
- Edit `templates/`, `assets/css/site.css`, and `assets/js/` for presentation.
  Do not edit generated `dist/` files or reintroduce al-folio/Jekyll dependencies.
- Support keyboard navigation, narrow screens, dark mode, reduced motion, and
  readable content without JavaScript. Use real content; don't invent biography.
- GitHub Actions builds on pushes and PRs; only main/manual builds publish to
  `gh-pages`. Preserve this deployment contract unless explicitly changing it.
- Before pushing, preview all four main pages and run the content/link checks.
  If browser tools are unavailable, report that limitation.

## Writing style

Use simple, factual labels and prose. Avoid decorative slogans, marketing copy,
and invented research summaries. The homepage headline is the author's wording:
"Driven by a love for mathematics, passionate about AI technologies."
Keep the homepage news heading as "News" and do not add topic cards.
