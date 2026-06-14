# msilver22.github.io

Personal academic website of **Matteo Silvestri** — PhD student at
[Sapienza University of Rome](https://phd.uniroma1.it/web/MATTEO-SILVESTRI_nP1872908_EN.aspx),
member of the [HERCOLE Lab](https://hercolelab.netlify.app/).

Built with [Jekyll](https://jekyllrb.com/) on a trimmed-down version of the
[al-folio](https://github.com/alshedivat/al-folio) theme. Live at
**https://msilver22.github.io**.

## Pages

| Page         | Source                                                | What it shows                  |
| ------------ | ----------------------------------------------------- | ------------------------------ |
| Home         | `_pages/about.md`                                     | Bio + latest news              |
| CV           | `_pages/cv.md` + `_data/cv.yml`                       | Education, experience, awards  |
| Publications | `_pages/publications.md` + `_bibliography/papers.bib` | Paper list (auto-formatted)    |
| News         | `_news/*.md`                                          | Short dated announcements      |

## Run it locally

The whole toolchain (Ruby, Jekyll, ImageMagick, UTF-8 locale) ships inside a
Docker image, so this is all you need:

```bash
docker compose up
```

Then open **http://localhost:8080**. The site rebuilds automatically when you
edit a file. Stop with `Ctrl+C`, or `docker compose down`.

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds the site
and publishes it to the `gh-pages` branch automatically — no manual steps.

## Making changes

See **[AGENTS.md](AGENTS.md)** for the repository layout and copy-paste recipes
(add a news item, add a publication, edit the CV, update social links, …).
