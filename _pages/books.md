---
layout: academic
title: "Bookshelf"
permalink: /books/
hide_title: true
main_class: academic-library
---

<link rel="stylesheet" href="{{ '/assets/css/books.css' | relative_url }}?v={{ site.time | date: '%s' }}">
<div id="pw-white-bookcase" aria-label="My bookshelf">
  <div id="pw-white-library" class="pw-refined-library finish-white" data-finish="white">
    <header class="sl-intro"><h1>A few books from different seasons of my life</h1></header>
    {% assign current_book = site.data.books | where: 'id', 'a-little-life' | first %}
    <div id="pw-current-reading-panel" class="sl-detail sl-current-panel" role="region" aria-label="Currently reading" hidden>
      <button type="button" class="sl-close sl-current-close" aria-label="Close currently reading">×</button>
      <a class="sl-cover-link" href="{{ current_book.cover_url | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size cover of {{ current_book.title | escape }}">
        <img src="{{ current_book.cover_url | relative_url }}" alt="{{ current_book.title | escape }} front cover" width="116" height="179" decoding="async">
      </a>
      <div>
        <h2><a class="sl-title-link" href="{{ current_book.metadata_url | escape }}" target="_blank" rel="noopener noreferrer">{{ current_book.title }}</a></h2>
        <p>{{ current_book.author }}</p>
        <p class="reading-status">Currently reading</p>
      </div>
    </div>
    <div class="sl-bookcase-wrap">
      <button type="button" class="sl-reading-cat" aria-label="Currently reading: A Little Life" aria-expanded="false" aria-controls="pw-current-reading-panel" hidden>
        <img src="{{ '/assets/images/reading-cat.png' | relative_url }}" alt="" width="112" height="56" draggable="false">
      </button>
      <div class="sl-shelves" aria-label="Book shelves"></div>
    </div>
    <noscript>
      <ol>{% for book in site.data.books %}<li><a href="{{ book.metadata_url | escape }}">{{ book.title }}</a> — {{ book.author }}</li>{% endfor %}</ol>
    </noscript>
  </div>
</div>
<script id="pw-white-book-data" type="application/json">{{ site.data.books | jsonify }}</script>
<script src="{{ '/assets/js/books.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

