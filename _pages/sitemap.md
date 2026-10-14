---
layout: academic
title: Sitemap
permalink: /sitemap/
---

<ul>
  <li><a href="{{ '/' | relative_url }}">Home</a></li>
  {% for link in site.data.navigation.main %}
  <li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>

{% if site.posts.size > 0 %}
<h2>Blog posts</h2>
<ul>
  {% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}
