---
layout: academic
title: "Books"
permalink: /books/
---

<section class="books-library" aria-label="My bookshelf">
  <p class="books-intro">Books I’ve read, collected over the years.</p>
  <div class="books-toolbar" data-books-controls hidden>
    <label class="books-search-label" for="books-search">Search the shelf</label>
    <input id="books-search" class="books-search" type="search" placeholder="Title or author" autocomplete="off" aria-controls="books-grid">
    <span class="books-count" data-books-count aria-live="polite">{{ site.data.books.size }} books</span>
  </div>
  <div class="books-grid" id="books-grid">
    {% for book in site.data.books %}
    <article class="book-card" data-book-title="{{ book.title | escape }}" data-book-author="{{ book.author | escape }}">
      <a class="book-cover-link" href="{{ book.metadata_url | escape }}" target="_blank" rel="noopener noreferrer" aria-label="{{ book.title | escape }} by {{ book.author | escape }} — book information">
        <img class="book-cover" src="{{ book.cover_url | escape }}" alt="" width="170" height="255" loading="lazy" decoding="async">
      </a>
      <h2 class="book-title"><a href="{{ book.metadata_url | escape }}" target="_blank" rel="noopener noreferrer">{{ book.title }}</a></h2>
      <p class="book-author">{{ book.author }}</p>
    </article>
    {% endfor %}
  </div>
  <p class="books-no-results" data-books-empty hidden>No books found. Try another title or author.</p>
</section>
<script src="{{ '/assets/js/books.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
