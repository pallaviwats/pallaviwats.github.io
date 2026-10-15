---
layout: academic
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
  - /home/
twitter-color: "#55acee"
github-color: "#171516"
blogger-color: "#F37100"
---
<div class="academic-intro">
  <div class="academic-profile">
    <img class="academic-portrait" src="{{ '/images/' | append: site.author.avatar | relative_url }}?v={{ site.time | date: '%s' }}" alt="{{ site.author.name }}" width="240" height="320">
    <div class="academic-social" aria-label="Contact links">
      <a class="academic-icon-button" href="mailto:{{ site.author.email }}" aria-label="Email" title="Email">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="m4 6 8 7 8-7"></path>
        </svg>
      </a>
      <a class="academic-icon-button academic-cv-button" href="{{ '/files/pallaviwats_cv.pdf' | relative_url }}" aria-label="CV" title="CV">CV</a>
      <a class="academic-icon-button" href="{{ site.author.linkedin }}" aria-label="LinkedIn profile" title="LinkedIn" target="_blank" rel="me noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"></rect>
          <circle cx="7" cy="7" r="1.35" fill="#ffffff"></circle>
          <path d="M7 10v8M11 18v-8m0 4a3 3 0 0 1 6 0v4" fill="none" stroke="#ffffff" stroke-width="2"></path>
        </svg>
      </a>
    </div>
  </div>
  <div>
    <p class="academic-bio">I am a PhD candidate in Economics at the <a href="https://economics.virginia.edu/">University of Virginia</a>. My research interests are in labor economics and empirical industrial organization.</p>
    <p class="academic-bio">My research focuses on high-skilled immigration. I study how outsourcing intermediaries and employer market power in the H-1B program shape wages and the allocation of workers across firms, and what this implies for the design of immigration policy.</p>
  </div>
</div>
