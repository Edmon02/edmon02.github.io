# edmon02 — personal site

Minimal static portfolio and blog for **Edmon Sahakyan**, hosted on [GitHub Pages](https://edmon02.github.io).

Inspired by [t3.gg](https://t3.gg) — dark, monospace, no frameworks.

## Structure

```
index.html              # Homepage (name, tagline, links)
styles.css              # All styling
blog/
  index.html            # Blog post list
  posts/
    when-ai-builds-itself.html   # Published posts
    _template.html      # Copy this for new posts
404.html                # Not found page
privacy.html            # Privacy policy
sitemap.xml             # Search engine sitemap
robots.txt              # Crawler directives
blog.js                  # Scroll-to-top on blog pages
assets/
  favicon.png            # Site logo / favicon source
  favicon-32.png         # Browser tab icon
  apple-touch-icon.png   # iOS home screen icon
favicon.ico              # Legacy favicon
```

## Local Preview

```bash
git clone https://github.com/Edmon02/edmon02.github.io.git
cd edmon02.github.io
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Deployment

Push to `main` on the `edmon02.github.io` repo. GitHub Pages serves the root automatically.

## Adding a Blog Post

1. Copy `blog/posts/_template.html` to `blog/posts/your-slug.html`
2. Replace `{title}`, `{description}`, `{slug}`, `{date-iso}`, `{date-display}`, and `{content}`
3. Add a row to the list in `blog/index.html`
4. Add the URL to `sitemap.xml`

## Contact

- Email: [edmon.sahakyan@gmail.com](mailto:edmon.sahakyan@gmail.com)
- GitHub: https://github.com/Edmon02
- LinkedIn: https://www.linkedin.com/in/edmon-sahakyan-64798619a/
