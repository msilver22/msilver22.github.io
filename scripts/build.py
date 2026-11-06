"""Build the personal site. Content stays in Markdown, YAML, and BibTeX."""
from pathlib import Path
from datetime import date, datetime, timezone
from email.utils import format_datetime
import re
import shutil
import xml.etree.ElementTree as ET

import bibtexparser
from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape
from markupsafe import Markup, escape
import markdown
import yaml

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist"


def frontmatter(path):
    text = path.read_text(encoding="utf-8")
    _, header, body = text.split("---", 2)
    return yaml.safe_load(header) or {}, body.strip()


def md(text):
    # Preserve the TeX delimiters consumed by MathJax after Markdown renders.
    expressions = []
    def protect(match):
        expressions.append(match.group())
        return "MATHTOKEN%dEND" % (len(expressions) - 1)
    text = re.sub(r"\$\$[\s\S]+?\$\$|\$[^$\n]+?\$", protect, str(text))
    rendered = markdown.markdown(text, extensions=["extra", "sane_lists"])
    for index, expression in enumerate(expressions):
        rendered = rendered.replace("MATHTOKEN%dEND" % index, str(escape(expression)))
    return Markup(rendered)


def clean_tex(value):
    value = re.sub(r"\\(?:emph|textit|textbf)\{([^{}]*)\}", r"\1", value)
    return value.replace("{", "").replace("}", "").replace(r"\nabla", "∇")


def load_content():
    config = yaml.safe_load((ROOT / "site.yml").read_text())
    socials = yaml.safe_load((ROOT / "_data/socials.yml").read_text())
    patterns = {
        "email": ("Email", "mailto:{}"),
        "github_username": ("GitHub", "https://github.com/{}"),
        "scholar_userid": ("Google Scholar", "https://scholar.google.com/citations?user={}"),
        "linkedin_username": ("LinkedIn", "https://www.linkedin.com/in/{}/"),
        "x_username": ("X", "https://twitter.com/{}"),
        "discord_id": ("Discord", "https://discord.com/users/{}"),
    }
    links = [{"label": label, "url": pattern.format(socials[key])}
             for key, (label, pattern) in patterns.items() if socials.get(key)]
    if socials.get("custom_social"):
        item = socials["custom_social"]
        links.append({"label": item["title"], "url": item["url"], "logo": "/assets/img/hercolelab_logo.png"})
    news = []
    for path in (ROOT / "_news").glob("*.md"):
        meta, body = frontmatter(path)
        parts = str(meta["date"]).split("-")
        when = date(*map(int, parts))
        news.append({"date": when, "html": md(body), "body": body,
                     "url": "/news/%s/" % path.stem})
    news.sort(key=lambda item: item["date"], reverse=True)
    _, bio = frontmatter(ROOT / "_pages/about.md")
    bib_source = (ROOT / "_bibliography/papers.bib").read_text()
    _, _, bib_source = bib_source.split("---", 2) if bib_source.startswith("---") else ("", "", bib_source)
    db = bibtexparser.loads(bib_source)
    publications = []
    for raw in db.entries:
        entry = {key: clean_tex(value) for key, value in raw.items()}
        authors = []
        for name in re.split(r"\s+and\s+", entry.get("author", "")):
            if "," in name:
                last, first = name.split(",", 1)
                name = first.strip(" ,") + " " + last.strip()
            authors.append(name)
        entry["authors"] = authors
        entry["links"] = []
        for key, label in [("pdf", "Paper"), ("code", "Code"), ("html", "Article"),
                           ("website", "Website"), ("poster", "Poster"), ("slides", "Slides")]:
            if entry.get(key):
                url = entry[key]
                if "://" not in url:
                    url = "/assets/pdf/" + url
                entry["links"].append({"label": label, "url": url})
        if not entry["links"] and entry.get("url"):
            entry["links"].append({"label": "Article", "url": entry["url"]})
        single = bibtexparser.bibdatabase.BibDatabase()
        single.entries = [raw]
        entry["bibtex"] = bibtexparser.dumps(single).strip()
        entry["month_number"] = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5,
            "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12}.get(entry.get("month"), 0)
        publications.append(entry)
    publications.sort(key=lambda item: (int(item["year"]), item["month_number"]), reverse=True)
    return dict(site=config, social_links=links, email=socials["email"], bio=md(bio), news=news,
                publications=publications, cv=yaml.safe_load((ROOT / "_data/cv.yml").read_text()),
                year=date.today().year)


def build():
    context = load_content()
    env = Environment(loader=FileSystemLoader(ROOT / "templates"),
                      autoescape=select_autoescape(["html", "xml"]), undefined=StrictUndefined)
    env.filters["markdown"] = md
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(ROOT / "assets", OUT / "assets")
    bibliography = (ROOT / "_bibliography/papers.bib").read_text(encoding="utf-8")
    if bibliography.startswith("---"):
        bibliography = bibliography.split("---", 2)[2].lstrip()
    (OUT / "assets/papers.bib").write_text(bibliography, encoding="utf-8")
    (OUT / ".nojekyll").touch()
    if (ROOT / "CNAME").exists():
        shutil.copy(ROOT / "CNAME", OUT / "CNAME")
    routes = [("index.html", "home.html", "Home", "/"),
              ("publications/index.html", "publications.html", "Publications", "/publications/"),
              ("cv/index.html", "cv.html", "CV", "/cv/"),
              ("news/index.html", "news.html", "News", "/news/"),
              ("404.html", "404.html", "Page not found", "/404.html")]
    for item in context["news"]:
        routes.append((item["url"].strip("/") + "/index.html", "news-item.html",
                       item["date"].strftime("News · %d %B %Y"), item["url"]))
    for destination, template, title, url in routes:
        target = OUT / destination
        target.parent.mkdir(parents=True, exist_ok=True)
        item = next((item for item in context["news"] if item["url"] == url), None)
        target.write_text(env.get_template(template).render(**context, title=title, path=url, item=item), encoding="utf-8")
    base = context["site"]["url"].rstrip("/")
    sitemap = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for _, _, _, route in routes:
        if route != "/404.html":
            ET.SubElement(ET.SubElement(sitemap, "url"), "loc").text = base + route
    ET.ElementTree(sitemap).write(OUT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
    rss = ET.Element("rss", version="2.0")
    channel = ET.SubElement(rss, "channel")
    for key, value in [("title", context["site"]["name"]), ("link", base), ("description", context["site"]["description"])]:
        ET.SubElement(channel, key).text = value
    for news in context["news"]:
        item = ET.SubElement(channel, "item")
        for key, value in [("title", re.sub("<[^>]+>", "", str(news["html"]))),
                           ("link", base + news["url"]), ("guid", base + news["url"]),
                           ("description", str(news["html"])),
                           ("pubDate", format_datetime(datetime.combine(news["date"], datetime.min.time(), tzinfo=timezone.utc)))]:
            ET.SubElement(item, key).text = value
    ET.ElementTree(rss).write(OUT / "feed.xml", encoding="utf-8", xml_declaration=True)
    (OUT / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: " + base + "/sitemap.xml\n")
    print("Built %d pages, %d publications, %d news items → %s" % (len(routes), len(context["publications"]), len(context["news"]), OUT))


if __name__ == "__main__":
    build()
