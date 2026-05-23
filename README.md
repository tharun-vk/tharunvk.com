# tharunvk.com

Personal site for Tharun VK, Senior Product Manager.

## What this is

A static, no-build personal site. Plain HTML and CSS. No framework, no JavaScript bundler, no Node.js dependencies. Open `index.html` in a browser and it works.

The site has five pages:

- `index.html` — the home page (fully populated)
- `about.html`, `experience.html`, `work.html`, `writing.html` — stub pages, to be written

## Local development

There's no build step. You can:

**Option 1 — Open in browser.** Open `index.html` directly. Most things work; some browsers restrict relative file paths slightly, which can break the favicon and the redirects. Fine for casual editing.

**Option 2 — Run a local server.** From the `site/` directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Cleaner; matches production behaviour.

## File structure

```
site/
├── index.html              # Home page
├── about.html              # Stub
├── experience.html         # Stub
├── work.html               # Stub
├── writing.html            # Stub
├── _redirects              # Cloudflare Pages config for clean URLs
├── styles/
│   ├── tokens.css          # Design tokens (colors, type, spacing)
│   ├── base.css            # Reset, typography defaults
│   └── components.css      # All component patterns
├── assets/
│   └── favicon.svg         # Site icon
└── design-system.md        # Read this before editing the design
```

## Editing content

Most edits will live in `index.html` — that's the only page with real content right now. The patterns to use are documented in `design-system.md`.

When you write About, Experience detail, Work case studies, or Writing posts, replace the corresponding stub page. Use the existing components in `components.css` rather than inventing new patterns.

## Deployment

The site is deployed via **Cloudflare Pages**, connected to this GitHub repository. Every push to the `main` branch triggers an automatic build and deploy.

To deploy a change:

1. Edit the files locally (or directly on GitHub)
2. Commit the change
3. Push to `main`
4. Wait ~1 minute. The change is live at https://tharunvk.com

The domain (tharunvk.com) is registered through Cloudflare Registrar and managed by Cloudflare's DNS.

## Browser support

Modern browsers only. Uses CSS custom properties, CSS Grid, `backdrop-filter`, and CSS clamp() — all widely supported but not in IE11.

## Accessibility

- Respects `prefers-reduced-motion` (animations disabled if user prefers)
- Sufficient color contrast for primary text (cream on navy)
- Semantic HTML throughout
- Keyboard-navigable (no JavaScript-trapped focus)

## License

All content (text, structure, design choices) © 2026 Tharun VK. Site code may be referenced and learned from; please don't directly clone it for your own personal site.
