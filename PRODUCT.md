# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally (confirmed 2026-11-15):

- Researchers and possible collaborators who arrive from a paper, a conference, or Google Scholar and want to see what Matteo works on and read the work.
- People evaluating a profile (industry labs, recruiters, PIs) who want trajectory, results, and the CV.

## Product Purpose

The personal academic website of Matteo Silvestri, PhD student in Computer Science at Sapienza University of Rome (HERCOLE Lab) and research trainee at EMBL (Petroni Group). It says who he is, lists his publications with abstracts, links and BibTeX, shows the CV, and keeps a dated news log. Success: a visitor leaves knowing what he works on and can reach a paper, the CV, or his email in one step.

## Positioning

A mathematician by training (B.Sc. Mathematics, M.Sc. Applied Mathematics for Data Science) who now works on language models: XAI Narratives, and AI agents that use context to be efficient, autonomous, and reliable. The author's own headline states it: "Driven by a love for mathematics, passionate about AI technologies."

## Operating Context

- Static site on GitHub Pages at https://msilver22.github.io, built by Python (Jinja, Markdown, PyYAML, bibtexparser). No frontend framework and no JavaScript build chain.
- Four main pages with permanent URLs: `/`, `/publications/`, `/cv/`, `/news/`, plus `/news/announcement_N/` permalinks, RSS and sitemap.
- Content lives in `_pages/about.md`, `_news/*.md`, `_bibliography/papers.bib`, `_data/cv.yml`, `_data/socials.yml`, `site.yml`.

## Capabilities and Constraints

- Preserve existing content, outbound links, assets, and public URLs when changing layouts.
- Text is binding (confirmed 2026-11-15): the homepage headline is the author's wording above, the homepage news heading stays "News", no topic cards, no slogans, no invented biography or research summaries. A redesign changes presentation only.
- Publications: all authors render, Matteo's name is emphasized, full citations stay available.
- Content must be readable without JavaScript; search, filters, theme selection and motion are progressive enhancement.
- Deployment contract: GitHub Actions builds on push and PR; only `main` publishes to `gh-pages`.

## Brand Commitments

- Name: Matteo Silvestri. Header wordmark: `ms`.
- Voice: simple, factual labels and prose in the first person.
- A polished result is wrong if it reads as an academic template (al-folio, department page), as cold and impersonal, or as a creative-agency showpiece where effects outrank the science (confirmed 2026-11-15).
- Personal sites stay minimal (the author's stated preference).

## Evidence on Hand

- Portrait: `assets/img/prof_pic_new.jpg` (955×1280).
- Eight publications in `_bibliography/papers.bib`; two featured on the homepage via `site.yml` with preview images in `assets/img/publications/`.
- Twelve news entries (2024-11 to 2026-09), CV data in `_data/cv.yml`, downloadable CV at `assets/pdf/cv.pdf`.
- Best Paper Award, HCAI Workshop at ACM CIKM 2025.
- No testimonials, metrics, or project case studies exist; none may be fabricated.

## Product Principles

1. The science leads: papers, venues and dates are the proof, and they are never further than one step away.
2. A person, not a profile: the portrait, the first-person bio and the news log keep a human voice.
3. Nothing invented: every word and number on the site comes from the content files.
4. Minimal by subtraction: each element earns its place; enhancement never blocks reading.

## Accessibility & Inclusion

Keyboard navigation, narrow screens, dark mode, reduced motion, and readable content without JavaScript.
