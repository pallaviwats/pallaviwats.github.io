---
layout: academic
permalink: /blog/
title: "Blog"
---

{% if site.posts.size > 0 %}
<div class="blog-list">
  {% for post in site.posts %}
  <article class="blog-entry">
    <time class="academic-post-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%B %-d, %Y' }}</time>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.excerpt %}<div>{{ post.excerpt }}</div>{% endif %}
  </article>
  {% endfor %}
</div>
{% else %}
<p class="blog-empty">No posts yet.</p>
{% endif %}
