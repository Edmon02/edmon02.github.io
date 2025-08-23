# Edmon Sahakyan Portfolio

Static, performant, accessible portfolio website for **Edmon Sahakyan** (Full-Stack Developer & AI/ML Researcher). Hosted via **GitHub Pages** at: https://edmon02.github.io

## Features
- Single-page layout (semantic HTML5 sections with smooth scrolling)
- Responsive (mobile-first, CSS Grid / Flexbox)
- Dark / Light mode with persistence (localStorage)
- IntersectionObserver fade-in animations (reduced-motion friendly)
- SEO: meta tags, Open Graph, Twitter Card, sitemap.xml, robots.txt, JSON-LD schema
- Accessibility: skip link, ARIA labels, focus styles, color contrast, keyboard-friendly nav
- Lightweight (no frameworks) – vanilla HTML/CSS/JS
- Copy-to-clipboard email and active section highlighting
- Privacy policy placeholder & analytics placeholder

## Structure
```
index.html        # Main single-page portfolio
styles.css        # All styling (light/dark themes, responsive, animations)
script.js         # Interactivity (theme toggle, fade-ins, nav, copy email)
sitemap.xml       # Search engine crawling instructions
robots.txt        # Crawler directives
privacy.html      # Privacy policy placeholder
favicon.ico       # Site icon (placeholder)
README.md         # Project documentation
```

## Usage / Local Preview
Clone the repository and open `index.html` directly (no build needed):

```bash
git clone https://github.com/Edmon02/edmon02.github.io.git
cd edmon02.github.io
open index.html   # macOS (or double-click in Finder)
```
Optional: Run a tiny local server for better relative path testing:
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
- Sufficient contrast in both themes
- Focus indicators preserved
- Reduced motion support via media query

## Performance Tips
- Replace placeholder profile image & `og-image.png` with optimized (≤150KB, WebP/PNG)
- Serve images with width/height attributes (already included)
- Consider adding `<link rel="preload" as="image">` for hero image if needed

## Updating Content
Edit `index.html` sections: About, Skills, Experience, Projects, Education, Contact.
Add project cards within `#projects` (follow existing structure). Keep alt text and semantics.

## Dark Mode
Toggled via button (SVG sun/moon) – sets `.dark` class on `<html>`. Preference saved in `localStorage` key: `theme`.

## Analytics
Uncomment the Google Analytics gtag snippet in `index.html` and replace `GA_MEASUREMENT_ID` when ready.

## License
Content © 2025 Edmon Sahakyan. Code snippets may be reused with attribution.

## Contact
Email: [edmon.sahakyan@gmail.com](mailto:edmon.sahakyan@gmail.com)
GitHub: https://github.com/Edmon02
LinkedIn: https://www.linkedin.com/in/edmon-sahakyan-64798619a/
