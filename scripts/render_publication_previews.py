"""Render title/abstract crops from the original PDFs. Optional: pip install PyMuPDF.

Run from the repository root: python scripts/render_publication_previews.py
The selected PDF versions and crop coordinates are fixed for reproducibility.
"""
from pathlib import Path
from urllib.request import urlopen
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
PREVIEWS = [
    ("sigillo2026emblailibrarian", "https://arxiv.org/pdf/2607.28229v1",
     [(102, 75, 512, 124), (102, 430, 512, 709)]),
    ("silvestri2025evaluating", "https://arxiv.org/pdf/2510.20351v4",
     [(102, 76, 512, 118), (102, 206, 512, 450)]),
]


def render(source, destination, clips):
    # Compose original PDF regions; no text is retyped or generated.
    width, height, gap = 420, 350, 12
    total = sum(y1 - y0 for x0, y0, x1, y1 in clips) + gap * (len(clips) - 1)
    y = (height - total) / 2
    with pymupdf.open(stream=source, filetype="pdf") as original:
        with pymupdf.open() as preview:
            page = preview.new_page(width=width, height=height)
            for x0, y0, x1, y1 in clips:
                bounds = pymupdf.Rect(x0, y0, x1, y1)
                target = pymupdf.Rect((width - bounds.width) / 2, y,
                                      (width + bounds.width) / 2, y + bounds.height)
                page.show_pdf_page(target, original, 0, clip=bounds)
                y += bounds.height + gap
            destination.parent.mkdir(parents=True, exist_ok=True)
            page.get_pixmap(matrix=pymupdf.Matrix(20 / 7, 20 / 7), alpha=False).save(destination)


if __name__ == "__main__":
    for key, url, clips in PREVIEWS:
        with urlopen(url, timeout=60) as response:
            source = response.read()
        destination = ROOT / "assets/img/publications" / (key + ".png")
        render(source, destination, clips)
        print("Rendered", destination.relative_to(ROOT))
