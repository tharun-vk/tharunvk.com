# Design System — tharunvk.com

The visual language of this site, written down so it stays consistent as the site grows. If you're extending the site, read this first.

## Tone

"Clear and considered." Plain prose, specifics over adjectives, confident without being salesy. The visual equivalent: deep navy ink, cream typography, structural details that reward looking, restrained motion. Late-night control room rather than spaceship bridge. Closer to *Linear's documentation* and *editorial journals* than to startup landing pages.

The tagline expresses the whole design in one sentence: **simple on the surface, complex underneath**. The first impression is calm. The detail rewards a second look.

## Colors

All colors live as CSS custom properties in `styles/tokens.css`. Use the variable names below, never the raw hex values.

### Backgrounds
| Token         | Value     | Use                                        |
| ------------- | --------- | ------------------------------------------ |
| `--abyss`     | `#0b1018` | Page background.                           |
| `--abyss-2`   | `#131923` | Surfaces (ticker, card backgrounds).       |
| `--abyss-3`   | `#1a2030` | Elevated surfaces. Rarely needed.          |

### Foreground / text
| Token          | Value     | Use                                       |
| -------------- | --------- | ----------------------------------------- |
| `--paper`      | `#e8e4d6` | Primary text, headlines.                  |
| `--paper-dim`  | `#a8a59a` | Secondary text, descriptive prose.        |
| `--paper-mute` | `#6c6a63` | Labels, metadata, tertiary text.          |

### Accents
| Token            | Value     | Use                                                        |
| ---------------- | --------- | ---------------------------------------------------------- |
| `--waterline`    | `#4ea3c4` | **Primary accent.** Structural details, italic emphasis, hover states. Used liberally. |
| `--waterline-d`  | `#296a83` | Glow / shadow base for waterline. |
| `--signal`       | `#d8a85a` | **Secondary accent.** "Live" / current-state only — the breathing pip, current row, "in flight" indicators. Used sparingly. |

### Borders
| Token        | Value     | Use                              |
| ------------ | --------- | -------------------------------- |
| `--rivet`    | `#262d3b` | Primary hairline / border.       |
| `--rivet-h`  | `#323a4a` | Hover state for borders.         |

**Rule of thumb:** if you're reaching for a color outside this set, stop and check whether one of these works. The whole point is restraint.

## Typography

Two font families. **Fraunces** (serif) for headlines and prose. **JetBrains Mono** for labels, metadata, and operator-style annotations. Both loaded from Google Fonts.

### Pairing principle

Serif carries *what is being said*. Mono carries *the structure around it*. The contrast between them is the tonal trick of the whole site — don't break it. If something feels off, check which font it's in.

### Italic is meaningful

In Fraunces, italics are used semantically, not decoratively. Italic = emphasis, an idea being highlighted, or a turn in the sentence. The hero headline uses italic for the second half ("*Complex underneath*"). Section titles use italic for the noun ("The *arc*", "Selected *work*"). Don't italicize randomly.

### Type scale

| Token         | Use                                | Approx size           |
| ------------- | ---------------------------------- | --------------------- |
| `--t-eyebrow` | Mono labels, nav items             | 11px                  |
| `--t-body-mono` | Mono body / metadata             | 12px                  |
| `--t-body`    | Serif body                          | 16px                  |
| `--t-prose`   | Larger body prose                   | 16–18px (fluid)       |
| `--t-tagline` | Hero subtitle, section intros       | 22–30px (fluid)       |
| `--t-h3`      | Row titles (Experience, Work)       | 26px                  |
| `--t-h2`      | Section titles                      | 40–64px (fluid)       |
| `--t-h1`      | Hero headline                       | 56–116px (fluid)      |

### Weight scale

Fraunces ships at 300, 400, 500. JetBrains Mono ships at 300, 400, 500. Use 400 as the default; 300 for italic emphasis (it has a delicate weight that pairs well with the colored italics); 500 sparingly for the brand mark and "live" labels.

### Letter spacing for mono uppercase

| Token            | Value    | Use                         |
| ---------------- | -------- | --------------------------- |
| `--ls-mono-sm`   | `0.18em` | Small labels                |
| `--ls-mono-md`   | `0.22em` | Standard nav, eyebrow text  |
| `--ls-mono-lg`   | `0.28em` | Ticker, section meta        |

Wide letter spacing on mono uppercase is what gives it the "operator manual" feel. Don't reduce below `0.15em` or it becomes unreadable.

## Spacing

A single scale, applied everywhere. Never improvise pixel values; if it doesn't fit one of these, the design is asking the wrong question.

| Token     | Value     |
| --------- | --------- |
| `--s-1`   | 4px       |
| `--s-2`   | 8px       |
| `--s-3`   | 12px      |
| `--s-4`   | 16px      |
| `--s-5`   | 24px      |
| `--s-6`   | 32px      |
| `--s-7`   | 40px      |
| `--s-8`   | 56px      |
| `--s-9`   | 80px      |
| `--s-10`  | 120px     |
| `--s-11`  | 140px     |

Gutters default to `--s-7` (40px) on desktop and `--s-5` (24px) on mobile.

## Layout

Single column, max-width `1240px`, centred. The hero is a two-column grid (text + meta-card). Most other sections are single-column. The Experience list uses a four-column row grid (year / body / marker / status) that collapses to one column on mobile.

## Components

The components below have implementations in `styles/components.css`. Use the existing classes when adding new content; only add new components if you can't compose what you need from these.

### Status bar (`.statusbar`)
Three-column thin strip at the top of every page. Left: live status + role. Center: page identifier. Right: time/location. Communicates "this site is alive and updated" without being noisy.

### Domain ticker (`.ticker`)
Horizontally scrolling track of the four domains and tagline. Slow (~60s loop). Pure decoration; communicates "alive and considered." Only on the home page.

### Corner frame (`.frame`)
Fixed corner brackets framing the viewport. Inset 12px. Adds the operator-manual border without dominating. Used on every page.

### Primary nav (`nav.primary`)
Three-column header: brand glyph + name / centered nav links / CTA. Active link marked with the waterline accent.

### Hero (`.hero`)
Two-column composition. Left: eyebrow → headline (Fraunces) → tagline (italic) → lede (mono). Right: meta-card (file-style key/value summary). Only on the home page.

### Meta-card (`.meta-card`)
File-card pattern: top accent line, file ID + breathing pip, dashed row separators, key/value pairs. Generic enough to reuse anywhere you want to display structured metadata.

### Section header (`.sec-head`)
Three-column band introducing each major section. Numbered (§ 02, § 03), titled with italic accent on the noun, right-aligned metadata. Sits on a hairline border above and below.

### Placeholder ribbon (`.placeholder-ribbon`)
Honest signposting for sections that aren't fully written. Amber dashed-border tag, right-aligned. Remove the markup when content lands. Better than silently shipping placeholder content with no signal.

### Experience row (`.exp-row`)
The Arc list pattern. Four-column row: year / body (title, role, prose, promo block) / marker (badges + notes) / status. Hover reveals a left-edge accent line. Current row is permanently marked with the warm signal accent. Used to render any time-series of professional milestones.

### Promo block (`.exp-row .promo`)
The "Time to promotion · X / Typical timing · Y" pair inside experience rows. Two-column dashed-separated metric pair. Use for any "your number vs. norm" comparison.

### Work card (`.work-card`)
2×2 grid item for case studies. Meta header (ID + year) → title → role → description → metrics grid (three values) OR scope grid (six items, for live projects). Hover: subtle background lift + accent line animating across the bottom edge.

### Writing teaser (`.writing-teaser`)
Empty-state pattern. Dashed border, centered "Section · standing by" label, italic Fraunces tagline. Used when a section is intentionally empty rather than placeholder.

### Footer (`footer`)
Two-column strip. Left: copyright + email. Right: LinkedIn + version. Bare and quiet.

## Motion

Restraint is the rule. Motion exists to indicate state, not to entertain.

| Token        | Duration | Use                                            |
| ------------ | -------- | ---------------------------------------------- |
| `--d-fast`   | 200ms    | Tiny micro-interactions (rarely used).         |
| `--d-base`   | 350ms    | Standard hover / state transitions.            |
| `--d-slow`   | 600ms    | Background fades, hover-reveal accent lines.   |
| `--d-breathe`| 3s       | Live status pip — slow opacity oscillation.    |
| `--d-marquee`| 60s      | Ticker scroll. One full pass per minute.       |

Easing: use `--ease-out` (`cubic-bezier(0.2, 0.6, 0.2, 1)`) for hover reveals. CSS default `ease-in-out` is fine for opacity and color fades.

Respect `prefers-reduced-motion` — handled globally in `base.css`.

## Adding content

When you add real content (case studies, About copy, posts), the priorities are:

1. **Use existing component classes.** Don't reinvent. The visual language should remain coherent.
2. **Mono uppercase for labels.** Serif (with italic) for prose and headlines. Don't mix.
3. **One concrete thing per section.** Tighter is stronger.
4. **Italicize for semantic emphasis only.** Not decoration.
5. **Remove placeholder ribbons** when the section is fully written.

## File structure

```
site/
├── index.html              # Home — fully populated
├── about.html              # Stub
├── experience.html         # Stub (Index has the condensed version)
├── work.html               # Stub
├── writing.html            # Stub
├── _redirects              # Cloudflare Pages clean URLs
├── styles/
│   ├── tokens.css          # Design tokens. Edit values here.
│   ├── base.css            # Reset, typography defaults, page texture.
│   └── components.css      # All component patterns.
└── assets/
    └── favicon.svg
```

## Drift prevention

When extending the site, periodically:

1. **Scan for raw hex values.** If you see `#xxxxxx` outside of `tokens.css`, that's drift. Fix it by either using an existing token or adding a new one.
2. **Scan for raw pixel values for spacing.** Same rule.
3. **Scan for `font-family` declarations outside of components.** All fonts should come from the two tokens (`--serif`, `--mono`).

Drift is what kills design systems. A small amount is fine; let it accumulate and the site loses coherence.
