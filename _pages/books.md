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
    <div class="sl-shelves" aria-label="Book shelves"></div>
    <noscript>
      <ol>{% for book in site.data.books %}<li><a href="{{ book.metadata_url | escape }}">{{ book.title }}</a> — {{ book.author }}</li>{% endfor %}</ol>
    </noscript>
  </div>
</div>
<script id="pw-white-book-data" type="application/json">{{ site.data.books | jsonify }}</script>
<script src="{{ '/assets/js/books.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
