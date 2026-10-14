# Pallavi Wats's academic website

Live website: https://pallaviwats.github.io/

This repository contains the website source and the assets it uses. GitHub Pages builds and publishes the `master` branch automatically.

## Editing the website

| Content | Source |
| --- | --- |
| Homepage and biography | `_pages/about.md` |
| Research papers and abstracts | `_pages/research.md` |
| Teaching | `_pages/teaching.md` |
| CV page | `_pages/cv.md` |
| CV PDF | `files/pallaviwats_cv.pdf` |
| Blog landing page | `_pages/blog.md` |
| Navigation | `_data/navigation.yml` |
| Design | `assets/css/academic.css` |
| Page layout | `_layouts/academic.html` |
| Site settings | `_config.yml` |

To add a blog post, create `_posts/YYYY-MM-DD-title.md` with YAML front matter containing `title` and `date`. Posts use the academic layout automatically and appear on the Blog page. Images and plots can go in `images/`; paper PDFs can go in `files/`.

## Local preview

Install Ruby and Bundler, then run `bundle install` followed by `bundle exec jekyll serve`. The preview appears at http://localhost:4000/.

## Attribution

The website was originally adapted from AcademicPages and the Minimal Mistakes theme. The retained compression layout and adapted theme code retain their notices. See `LICENSE` for the original MIT license.
