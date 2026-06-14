# AGENTS.md

Guidance for coding agents (and humans) working on **msilver22.github.io**, the
personal academic site of Matteo Silvestri.

It is a [Jekyll](https://jekyllrb.com/) site, a slimmed-down fork of the
[al-folio](https://github.com/alshedivat/al-folio) theme. Almost every change
you'll be asked for is **content** — editing Markdown / YAML / BibTeX. You rarely
need to touch the templating engine.

---

## 1. Where things live

```
_pages/            The site's pages (one Markdown file each)
  about.md           Home page: bio + news feed
  cv.md              CV page (renders _data/cv.yml)
  publications.md    Publications page (renders _bibliography/papers.bib)
  news.md            Full news listing
  404.md             Not-found page
_news/             One Markdown file per news/announcement item
_bibliography/
  papers.bib         All publications, in BibTeX
_data/
  cv.yml             CV content (education, experience, awards)
  socials.yml        Social links (GitHub, email, Scholar, LinkedIn, …)
assets/
  img/               Images — currently the profile pic + HERCOLE logo
  pdf/cv.pdf         The downloadable CV linked from the CV page
_config.yml        Site-wide settings (title, name, features, plugins)

# --- Engine (the al-folio framework — usually leave alone) ---
_layouts/          Page templates (.liquid)
_includes/         Reusable template fragments (.liquid)
_sass/             Styles
_plugins/          Custom Ruby build plugins
assets/css, assets/js, assets/fonts, assets/webfonts
```

If a task only involves "update my bio / news / papers / CV / links", you only
need the files in the top block.

---

## 2. Common edits (recipes)

### Add a news item
Create `_news/announcement_9.md` (next free number). Keep the front matter,
write one short sentence. Markdown links and `$math$` work.

```markdown
---
layout: post
date: 2026-07-01
inline: true
related_posts: false
---

Short announcement text with a [link](https://example.com).
```

News items show newest-first on the home page (limited to 5, see
`_pages/about.md`) and in full on `/news/`.

### Add a publication
Append a BibTeX entry to `_bibliography/papers.bib`. Follow the existing style.
al-folio-specific fields:

- `abbr` → the little venue badge (e.g. `Preprint`, `XAI '26`).
- `selected={true}` → marks a paper as "selected" (not currently surfaced).
- `pdf`, `html`, `code`, `website`, `arxiv` → buttons on the entry.
- `preview={filename}` → thumbnail; the image must exist in
  `assets/img/publication_preview/` (that folder was emptied, so omit `preview`
  unless you add the image too).
- `abstract={...}` → expandable abstract.

```bibtex
@article{silvestriYYYYkeyword,
  abbr={Preprint},
  title={Paper Title},
  author={Silvestri, Matteo and Tolomei, Gabriele},
  year={2026},
  url={https://arxiv.org/abs/XXXX.XXXXX},
  pdf={https://arxiv.org/pdf/XXXX.XXXXX},
  abstract={...},
}
```

Publications are grouped by year, newest first (configured under `scholar:` in
`_config.yml`).

### Edit the home bio
Edit the prose at the bottom of `_pages/about.md` (below the `---` front matter).

### Edit the CV
Edit `_data/cv.yml` (structured: each block has a `type` of `map` or
`time_table`). To replace the downloadable PDF, overwrite `assets/pdf/cv.pdf`.

### Change social links
Edit `_data/socials.yml`. Uncomment a line and fill in the value, or change an
existing one. The custom `HERCOLELab` link is at the bottom of that file.

### Change the profile picture
Drop the new file in `assets/img/` and update `profile.image` in
`_pages/about.md`.

---

## 3. Run & preview locally  ← do this before pushing

The full toolchain (Ruby, Jekyll, ImageMagick, the right locale) is baked into a
Docker image, so Docker is the recommended way:

```bash
docker compose up          # builds, then serves with live-reload
# open http://localhost:8080
# Ctrl+C to stop, or:  docker compose down
```

The repo is mounted into the container, so edits on disk trigger a rebuild.
Watch the container logs — a successful build ends with
`done in N seconds. ... Server running...`. A real problem shows up as a
`Liquid Exception` or `Conversion error` in the logs.

**Verify a change worked** by loading the affected page (`/`, `/cv/`,
`/publications/`, `/news/`) and checking it renders as expected before pushing.

### Fallback: build without Docker
Only if Docker isn't available. Requires Ruby + `bundle install`, and two
gotchas this project hit:

```bash
# 1) Ruby must use a UTF-8 locale, or the BibTeX parser dies with
#    "invalid byte sequence in US-ASCII in _pages/publications.md"
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

bundle exec jekyll serve        # or: jekyll build
```

2. ImageMagick (`convert`) is optional locally. If it's missing you'll see
   `convert: command not found` warnings and `.webp` variants are skipped — the
   site still builds fine. Production (GitHub Actions) installs ImageMagick, so
   webp images are generated there.

---

## 4. Deploy

Push to `main`. `.github/workflows/deploy.yml` builds the site and pushes the
result to the `gh-pages` branch (served at https://msilver22.github.io). There
is no manual deploy step.

---

## 5. Things to know before touching the engine

- **Plugins are pinned.** `_config.yml`'s `plugins:` list mirrors the `Gemfile`,
  and the Docker image is built from that `Gemfile`. Don't add/remove plugins
  without updating the `Gemfile` too — otherwise local Docker and CI diverge.
- **`third_party_libraries:` in `_config.yml` must stay complete.** Every entry
  is referenced by `_includes/scripts.liquid` / `head.liquid`; a missing key
  produces broken `<script>` tags. Leave that block intact.
- **A `{% include %}` of a missing file only errors when actually reached.** Some
  includes sit behind `{% if %}` guards that are false here, so the build passes
  even though the file is referenced. If you remove an include, also remove the
  (possibly guarded) statements that reference it.
- This site has **no blog, no projects, no comments** (disqus/giscus), **no
  newsletter** — those al-folio features were stripped out. Don't reintroduce
  references to them.
- `_config.yml` changes are **not** picked up by live-reload — restart
  (`docker compose restart`, or restart `jekyll serve`).
