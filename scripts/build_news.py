"""Gera páginas estáticas e o índice de listagem a partir de news/*/news.json.

Uso: python scripts/build_news.py
"""
from __future__ import annotations

import html
import json
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NEWS_SOURCE = ROOT / "news" / "content"
OUTPUT_ROOT = ROOT / "noticias"
GENERATED_INDEX = ROOT / "news" / "generated" / "index.js"
PAGE_SIZE = 24


def external_or_local(source: str, slug: str) -> str:
    """Aceita somente imagens locais armazenadas no repositório."""
    if source.startswith(("https://", "http://")):
        raise ValueError(
            f"Imagem externa não permitida em '{slug}': {source}. "
            "Envie a imagem para news/media pelo Pages CMS."
        )
    if source.startswith("news/"):
        return source
    if source.startswith("/"):
        return source.lstrip("/")
    return f"news/media/{source}"


def read_articles() -> list[dict]:
    """Lê cada news.json; pastas sem esse arquivo são ignoradas."""
    articles = []
    for data_file in NEWS_SOURCE.glob("*.json"):
        article = json.loads(data_file.read_text(encoding="utf-8"))
        article["_folder"] = data_file.parent
        articles.append(article)
    return sorted(articles, key=lambda item: item["date"], reverse=True)


def render_gallery(article: dict) -> str:
    """Gera uma imagem única ou a estrutura de carrossel para várias imagens."""
    images = article.get("images", [])
    if not images:
        return ""

    slides = []
    for image in images:
        src = external_or_local(image["src"], article["slug"])
        slides.append(
            "<figure class=\"carousel-slide\">"
            f"<img src=\"{html.escape(src, quote=True)}\" alt=\"{html.escape(image.get('alt', article['title']), quote=True)}\" loading=\"lazy\" decoding=\"async\" referrerpolicy=\"no-referrer\">"
            f"<figcaption>{html.escape(image.get('caption', ''))}</figcaption>"
            "</figure>"
        )
    return """
        <section class="article-gallery" data-carousel aria-label="Galeria da notícia">
          <div class="carousel-track">
            %s
          </div>
          <div class="carousel-controls" hidden>
            <button class="carousel-button" type="button" data-carousel-prev aria-label="Imagem anterior">←</button>
            <div class="carousel-dots" data-carousel-dots aria-label="Selecionar imagem"></div>
            <button class="carousel-button" type="button" data-carousel-next aria-label="Próxima imagem">→</button>
          </div>
        </section>""" % "\n            ".join(slides)


def render_content(article: dict) -> str:
    """Renderiza blocos ordenáveis do CMS; mantém compatibilidade com notícias antigas."""
    rendered = []
    for block in article.get("content", []):
        # Compatibilidade com registros criados antes dos blocos de conteúdo.
        if isinstance(block, str):
            rendered.append(f"<p>{html.escape(block)}</p>")
            continue

        if block.get("type") == "image" and block.get("image"):
            src = external_or_local(block["image"], article["slug"])
            rendered.append(
                '<figure class="article-inline-image">'
                f'<img src="{html.escape(src, quote=True)}" alt="{html.escape(block.get("alt", article["title"]), quote=True)}" loading="lazy" decoding="async">'
                f'<figcaption>{html.escape(block.get("caption", ""))}</figcaption>'
                '</figure>'
            )
            continue

        text = block.get("text", "")
        link_label = block.get("linkLabel", "")
        link_url = block.get("linkUrl", "")
        escaped_text = html.escape(text)
        if link_label and link_url and link_label in text:
            escaped_label = html.escape(link_label)
            anchor = (
                f'<a href="{html.escape(link_url, quote=True)}" target="_blank" rel="noopener noreferrer">'
                f'{escaped_label}</a>'
            )
            escaped_text = escaped_text.replace(escaped_label, anchor, 1)
        if escaped_text:
            rendered.append(f"<p>{escaped_text}</p>")
    return "\n        ".join(rendered)


def render_article(article: dict) -> str:
    """Monta uma página completa usando o mesmo cabeçalho, rodapé e CSS do site."""
    paragraphs = render_content(article)
    # Fonte é opcional: notícias próprias do NEFIP não precisam exibir este bloco.
    source = article.get("source") or {}
    source_block = ""
    source_note = ""
    if source.get("url"):
        source_block = (
            '<div class="article-source"><span>Fonte</span>'
            f'<a href="{html.escape(source["url"], quote=True)}" target="_blank" rel="noopener noreferrer">'
            f'{html.escape(source.get("label", "Notícia original"))} ↗</a></div>'
        )
        source_note = '<p class="article-note">Esta é uma síntese editorial do NEFIP. Para informações completas, consulte a fonte original.</p>'
    date = datetime.fromisoformat(article["date"]).strftime("%d de %B de %Y")
    months = {"January":"janeiro", "February":"fevereiro", "March":"março", "April":"abril", "May":"maio", "June":"junho", "July":"julho", "August":"agosto", "September":"setembro", "October":"outubro", "November":"novembro", "December":"dezembro"}
    for english, portuguese in months.items():
        date = date.replace(english, portuguese)

    return f"""<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="../../">
    <title>{html.escape(article['title'])} | NEFIP</title>
    <meta name="description" content="{html.escape(article['summary'], quote=True)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/style.css">
  </head>
  <body data-page="news-article">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div id="site-header"></div>
    <main id="conteudo" class="page-main">
      <article class="wrap prose news-article">
        <header class="news-article-header">
          <p class="eyebrow">{html.escape(article['category']).upper()}</p>
          <h1>{html.escape(article['title'])}</h1>
          <p class="lead">{html.escape(article['summary'])}</p>
          <p class="article-byline">Por {html.escape(article['author'])}</p>
          <p class="article-date">{date}</p>
        </header>
        {render_gallery(article)}
        {paragraphs}
        {source_block}
        {source_note}
        <a class="text-link" href="noticias.html">← Voltar para notícias</a>
      </article>
    </main>
    <div id="site-footer"></div>
    <button class="to-top" aria-label="Voltar ao topo">↑</button>
    <script src="assets/app.js"></script>
  </body>
</html>
"""


def build() -> None:
    articles = read_articles()
    index_entries = []
    for position, article in enumerate(articles, start=1):
        article.setdefault("id", position)
        english_fields = {
            "title": article.get("titleEn"),
            "summary": article.get("summaryEn"),
            "category": article.get("categoryEn"),
            "author": article.get("authorEn"),
        }
        english_fields = {key: value for key, value in english_fields.items() if value}
        output_file = OUTPUT_ROOT / article["slug"] / "index.html"
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(render_article(article), encoding="utf-8")
        images = article.get("images", [])
        cover = external_or_local(images[0]["src"], article["slug"]) if images else ""
        index_entries.append({
            "id": article["id"], "slug": article["slug"], "title": article["title"],
            "category": article["category"], "date": article["date"], "summary": article["summary"],
            "pageUrl": f"noticias/{article['slug']}/", "coverImage": cover,
            "coverAlt": images[0].get("alt", article["title"]) if images else article["title"],
            "featured": article.get("featured", False),
            # Campos em inglês são opcionais e usados pelo site quando a URL tem ?lang=en.
            "en": english_fields,
        })
    GENERATED_INDEX.parent.mkdir(parents=True, exist_ok=True)
    pages_dir = GENERATED_INDEX.parent / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    chunks = [index_entries[position:position + PAGE_SIZE] for position in range(0, len(index_entries), PAGE_SIZE)] or [[]]
    extra_pages = []
    for number, chunk in enumerate(chunks[1:], start=2):
        page_path = pages_dir / f"page-{number}.js"
        page_path.write_text("window.NEFIP_NEWS_PAGE = " + json.dumps(chunk, ensure_ascii=False) + ";\n", encoding="utf-8")
        extra_pages.append(f"news/generated/pages/page-{number}.js")
    config = {"total": len(index_entries), "pages": extra_pages, "categories": sorted({item["category"] for item in index_entries}), "years": sorted({item["date"][:4] for item in index_entries}, reverse=True)}
    GENERATED_INDEX.write_text("/* ARQUIVO GERADO: execute scripts/build_news.py após editar notícias. */\nwindow.NEFIP_NEWS = " + json.dumps(chunks[0], ensure_ascii=False) + ";\nwindow.NEFIP_NEWS_CONFIG = " + json.dumps(config, ensure_ascii=False) + ";\n", encoding="utf-8")
    print(f"Geradas {len(articles)} notícia(s).")


if __name__ == "__main__":
    build()
