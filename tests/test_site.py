"""Regression checks for content migration, routes, feeds, and local links."""
from html.parser import HTMLParser
from pathlib import Path
import sys
import unittest
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from build import OUT, load_content, md


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ['href', 'src']:
            if attrs.get(key):
                self.links.append(attrs[key])


class WebsiteTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.content = load_content()

    def test_content_migration(self):
        self.assertEqual(len(self.content['news']), len(list((ROOT / '_news').glob('*.md'))))
        self.assertTrue(self.content['publications'])
        self.assertTrue(self.content['social_links'])
        self.assertTrue(self.content['cv'])
        publications = (OUT / 'publications/index.html').read_text()
        self.assertEqual(publications.count('data-paper data-year='), len(self.content['publications']))
        for paper in self.content['publications']:
            self.assertIn('id="%s"' % paper['ID'], publications)
            for link in paper['links']:
                self.assertIn(link['url'].replace('&', '&amp;'), publications)
            self.assertIn('Matteo Silvestri', paper['authors'])
        news = (OUT / 'news/index.html').read_text()
        for item in self.content['news']:
            self.assertIn(item['date'].isoformat(), news)
            self.assertTrue((OUT / item['url'].strip('/') / 'index.html').exists())

    def test_all_internal_links_and_fragments(self):
        for file in OUT.rglob('*.html'):
            for link in Page(file.read_text()).links:
                url = urlsplit(link)
                if url.scheme or url.netloc:
                    continue
                target = OUT / unquote(url.path).lstrip('/') if url.path.startswith('/') else file.parent / unquote(url.path)
                if not url.path:
                    target = file
                if target.is_dir():
                    target = target / 'index.html'
                self.assertTrue(target.exists(), '%s → %s' % (file.relative_to(OUT), link))
                if url.fragment and target.suffix == '.html':
                    self.assertIn(unquote(url.fragment), Page(target.read_text()).ids, str(target))

    def test_feed_and_sitemap(self):
        rss = ET.parse(OUT / 'feed.xml')
        self.assertEqual(len(rss.findall('./channel/item')), len(self.content['news']))
        sitemap = ET.parse(OUT / 'sitemap.xml')
        self.assertEqual(len(sitemap.getroot()), 4 + len(self.content['news']))

    def test_math_delimiters_survive_markdown(self):
        self.assertIn(r'$\nabla$-CMH', md(r'Our [$\nabla$-CMH](https://example.org) method.'))

    def test_no_template_dependencies_in_output(self):
        for file in OUT.rglob('*.html'):
            self.assertNotRegex(file.read_text(), r'\{%|\{\{|bootstrap|jquery|mdb\.min')


if __name__ == '__main__':
    unittest.main()
