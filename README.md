# Matteo Silvestri

A custom, minimal academic website. No theme, frontend framework, or JavaScript
build chain. Python builds plain HTML from Jinja templates and the original
Markdown, YAML, and BibTeX content. Hosted at <https://msilver22.github.io>.

## Preview

Requires Python 3.10 or newer:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python scripts/serve.py
```

Open <http://localhost:8080>. Source changes rebuild automatically; refresh the
browser to see them. Alternatively, `docker compose up --build` runs the same
preview on port 8080.

## Content

| What | Where |
| --- | --- |
| Bio | `_pages/about.md` |
| News | `_news/*.md` — date in front matter, Markdown body |
| Publications | `_bibliography/papers.bib` |
| CV | `_data/cv.yml` |
| Social links | `_data/socials.yml` |
| Site metadata and research interests | `site.yml` |
| Portrait and lab logo | `assets/img/` |
| Downloadable CV | `assets/pdf/cv.pdf` |
| Page layouts | `templates/*.html` |
| Design and interactions | `assets/css/site.css`, `assets/js/` |

News keeps the existing `/news/announcement_N/` routes. Publications are grouped
by year and ordered by month, with abstracts, resource links, and BibTeX. Search,
filters, theme selection, portrait zoom, and scroll effects progressively enhance
the HTML. Content, links, and native disclosure controls work without JavaScript.
Motion respects the operating system's reduced-motion preference. MathJax is
loaded from jsDelivr only when a page contains TeX; other assets are local.

## Build and verify

```sh
python scripts/build.py
python -m unittest discover -s tests -v
```

The `dist/` directory contains the entire site, including RSS and a sitemap.
It is generated and ignored by Git. Do not edit it directly.

## Deploy

Push to `main`: GitHub Actions installs the Python dependencies, builds and
checks the site, and publishes `dist/` to the existing `gh-pages` branch.
The GitHub Pages source remains **Deploy from a branch → gh-pages → / (root)**.
Pull requests build and validate without publishing; their generated website is
available as the `website` workflow artifact. No hosting migration is required.

## Attribution

The previous site used al-folio. Its MIT license is retained in `LICENSE`.
Original site content and assets are preserved in this custom implementation.

## Homepage design

`site.yml` lists the two `featured_publications` by BibTeX ID. Only entries still
present in the bibliography render. Their preview images live in
`assets/img/publications/<BibTeX-ID>.png` and combine crops of the title and
abstract from the original PDFs, omitting intervening figures. Keep the source PDF links in the bibliography.
The SVG in `templates/graphics/agent-flow.svg` is a decorative illustration of
agent execution. It respects system reduced motion and pauses when off-screen or when the tab
is hidden. No AI service is called by the illustration.

To regenerate the paper previews, install the optional `PyMuPDF` package and run
`python scripts/render_publication_previews.py`. PDF versions and crop coordinates
are recorded in that script; preview generation is not part of the site build.
