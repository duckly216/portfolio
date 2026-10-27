/*
  Class tokens used by every component. They point at the CSS variables in
  theme.css, so you normally edit colors there, not here.
  (Full class strings are written out so Tailwind can detect them.)
  You dont have to touch this file unless you want to add new tokens. 
  If you do, make sure to add the corresponding CSS variable in theme.css.
*/
export const t = {
  // Layout
  pageTop: "pt-12", // clears the fixed navbar (about 65px tall); raise or lower to taste
  anchorOffset: "scroll-mt-24", // keeps linked sections clear of the fixed navbar

  // Text
  text: "text-[color:var(--color-text)]",
  textMuted: "text-[color:var(--color-text-muted)]",
  textSubtle: "text-[color:var(--color-text-subtle)]",
  textBrand: "text-[color:var(--color-brand)]",
  textOnBrand: "text-[color:var(--color-on-brand)]",
  sectionTitle: "text-[color:var(--color-section-title)]",
  sectionText: "text-[color:var(--color-section-text)]",
  textAccent: "text-[color:var(--color-accent)]",
  heroText: "text-[color:var(--color-hero-text)]",

  // Backgrounds
  surface: "bg-[color:var(--color-surface)]",
  surfaceMuted: "bg-[color:var(--color-surface-muted)]",
  navSurface:
    "bg-[color:color-mix(in_srgb,var(--color-surface)_80%,transparent)]",
  sectionBg: "bg-[color:var(--color-section-bg)]",
  sectionBody: "bg-[color:var(--color-section-body-bg)]",
  heroFade: "from-[color:var(--color-hero-fade)]",
  mediaBg: "bg-[color:var(--color-media-bg)]",
  overlay: "bg-[color:var(--color-overlay)]",
  backdrop: "bg-[color:var(--color-backdrop)]",

  // Skeleton loaders
  skeleton: "bg-[color:var(--color-skeleton)]",
  skeletonDark: "bg-[color:var(--color-skeleton-dark)]",
  skeletonOnBrand: "bg-[color:var(--color-skeleton-on-brand)]",
  
  // Borders
  border: "border-[color:var(--color-border)]",

  // Interactive
  btnPrimary:
    "bg-[color:var(--color-brand)] text-[color:var(--color-on-brand)] hover:bg-[color:var(--color-brand-hover)]",
  btnSecondary:
  "border border-[color:var(--color-brand)] text-[color:var(--color-brand)] hover:bg-[color:var(--color-surface-hover)]",
    iconBtn:
    "text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface-hover)] hover:text-[color:var(--color-text-muted)]",
  textBtn:
    "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]",
  btnOnDark:
    "bg-[color:var(--color-accent)] text-[color:var(--color-brand)] hover:opacity-90",
  btnOnDarkOutline:
    "border border-[color:var(--color-hero-text)] text-[color:var(--color-hero-text)] hover:bg-white/10",
  // Small tag chip (colors only; add padding where used)
  chip: "border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)]",
} as const;
