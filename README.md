# Edmon Sahakyan Link Hub

Static, performant, accessible link-hub portfolio for **Edmon Sahakyan**. The site combines a high-conversion link page with featured work, background, and direct contact. Hosted via **GitHub Pages** at: https://edmon02.github.io

## Features
- Linktree-inspired homepage with clear primary actions and large tap targets
- Featured project cards and concise proof-of-work sections
- Responsive layout for desktop and mobile
- Dark / light mode with persistence via `localStorage`
- Scroll-linked section highlighting and reveal animations
- Copy-to-clipboard email actions
- SEO support with meta tags, Open Graph, Twitter Card, sitemap, robots, and JSON-LD
- Accessible structure with skip link, landmarks, focus states, and reduced-motion support
- Lightweight vanilla HTML, CSS, and JavaScript

## Structure
```
index.html        # Main link-hub homepage
styles.css        # Visual system, layout, themes, and responsive styles
script.js         # Theme toggle, reveal effects, anchor nav, and copy actions
sitemap.xml       # Search engine crawling instructions
robots.txt        # Crawler directives
privacy.html      # Privacy policy page
404.html          # Not-found page
favicon.ico       # Site icon
README.md         # Project documentation
```

## Usage / Local Preview
Clone the repository and open `index.html` directly (no build needed):

```bash
git clone https://github.com/Edmon02/edmon02.github.io.git
cd edmon02.github.io
open index.html   # macOS (or double-click in Finder)
```
Optional: Run a tiny local server:
```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Deployment (GitHub Pages)
1. Push all files to the `main` branch of the repo named `edmon02.github.io` (exact match).
2. In GitHub: Settings → Pages → Ensure Source: `Deploy from a branch`, Branch: `main` (root).
3. Wait ~1–2 minutes for propagation. Visit https://edmon02.github.io

## SEO Checklist
- Canonical link: set to root
- Sitemap: `/sitemap.xml`
- Robots: `robots.txt` allows all
- Open Graph & Twitter meta tags configured
- JSON-LD Person schema embedded in `<head>`

## Accessibility Checklist
- Landmarks: header, main, footer
- Skip link to main content
- Keyboard-friendly anchor navigation and buttons
- Focus indicators preserved
- Reduced motion support via media query

## Performance Tips
- Replace placeholder profile image & `og-image.png` with optimized (≤150KB, WebP/PNG)
- Serve images with width/height attributes (already included)
- Consider adding `<link rel="preload" as="image">` for hero image if needed

## Updating Content
Edit these homepage areas in `index.html`:

- Hero: headline, summary, proof points, profile card
- Primary links: `#links`
- Featured projects: `#projects`
- Background and stack: `#about`
- Final call-to-action: `#contact`

Keep asset paths relative so the site works both on GitHub Pages and when opened locally.

## Dark Mode
The toggle sets a `.dark` class on `<html>`. Preference is saved in the `localStorage` key `theme`.

## Analytics
Uncomment the Google Analytics gtag snippet in `index.html` and replace `GA_MEASUREMENT_ID` when ready.

## License
Content © 2026 Edmon Sahakyan. Code snippets may be reused with attribution.

## Contact
Email: [edmon.sahakyan@gmail.com](mailto:edmon.sahakyan@gmail.com)
GitHub: https://github.com/Edmon02
LinkedIn: https://www.linkedin.com/in/edmon-sahakyan-64798619a/
