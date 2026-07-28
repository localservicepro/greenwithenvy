# Green With Envy Lawn & Property Maintenance — Website

Static 3-page website for Green With Envy Lawn & Property Maintenance, a lawn
mowing and property maintenance business based in Kellyville Ridge, NSW,
servicing Sydney's Hills District.

## Pages

| Page | Path | Target |
|------|------|--------|
| Home / Kellyville | `index.html` | Lawn mowing Kellyville & The Hills District |
| Castle Hill | `castle-hill/index.html` | Lawn mowing Castle Hill NSW 2154 |
| Baulkham Hills | `baulkham-hills/index.html` | Lawn mowing Baulkham Hills NSW 2153 |

## Stack

Plain HTML/CSS/JS — no build step, no framework. Deploy by serving the repo
root from any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).

- `assets/css/styles.css` — shared stylesheet (dark theme, Archivo variable font)
- `assets/js/main.js` — mobile menu, quote modal, FAQ accordion, form handling
- `assets/img/` — optimized photos with SEO-friendly filenames
- `assets/fonts/` — self-hosted Archivo woff2 subsets

## SEO / AEO / GEO

- Unique title, meta description and canonical URL per page (canonical base:
  `https://greenwithenvylawns.au`)
- JSON-LD structured data: `LocalBusiness` (all pages), `FAQPage` (per page),
  `Service` + `BreadcrumbList` (suburb pages), `WebSite` (home)
- Open Graph + Twitter Card tags, `geo.region` / `geo.placename` metadata
- FAQ answers rendered in the DOM (crawlable), semantic headings and landmarks
- `sitemap.xml` and `robots.txt` at the repo root

The quote forms are front-end only (they show a confirmation toast). Wire them
to a form backend (e.g. Formspree, Netlify Forms, or an email endpoint) before
go-live if submissions should be delivered.
