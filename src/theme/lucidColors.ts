// Electric Luminary Design System — Color Tokens
// Based on the Lucid Narrative design system

export const LucidColors = {
  // ─── Surface Hierarchy (Base → Elevated) ──────────────────────────────────
  surface:                  '#0e0c20',   // Base layer
  surfaceDim:               '#0e0c20',
  surfaceContainerLowest:   '#000000',   // Search bar bg
  surfaceContainerLow:      '#131027',   // Main body / unread chat bg
  surfaceContainer:         '#19162f',
  surfaceContainerHigh:     '#1f1c37',   // Hover / interactive elevated
  surfaceContainerHighest:  '#25223f',   // Recipient bubble / group avatar bg
  surfaceBright:            '#2b2848',   // Header bg (solid fallback)
  surfaceVariant:           '#25223f',   // Glass bg base color (#25223f @ 60%)
  surfaceTint:              '#b6a0ff',

  // ─── Background ───────────────────────────────────────────────────────────
  background:     '#0e0c20',
  onBackground:   '#e7e2ff',

  // ─── Primary (violet) ─────────────────────────────────────────────────────
  primary:                '#b6a0ff',
  primaryDim:             '#7e51ff',
  primaryContainer:       '#a98fff',
  primaryFixed:           '#a98fff',
  primaryFixedDim:        '#9c7eff',
  onPrimary:              '#340090',
  onPrimaryFixed:         '#000000',
  onPrimaryFixedVariant:  '#32008a',
  onPrimaryContainer:     '#280072',
  inversePrimary:         '#6834eb',

  // ─── Secondary (blue) ─────────────────────────────────────────────────────
  secondary:                '#6e9bff',
  secondaryDim:             '#0f6df3',
  secondaryContainer:       '#0058ca',   // FAB / New-Chat button bg
  secondaryFixed:           '#c0d1ff',
  secondaryFixedDim:        '#acc3ff',
  onSecondary:              '#001d4e',
  onSecondaryContainer:     '#f7f7ff',
  onSecondaryFixed:         '#003076',
  onSecondaryFixedVariant:  '#004baf',

  // ─── Tertiary (cyan) ──────────────────────────────────────────────────────
  tertiary:               '#81ecff',    // Online halo, unread accent
  tertiaryDim:            '#00d4ec',
  tertiaryContainer:      '#00e3fd',
  tertiaryFixed:          '#00e3fd',
  tertiaryFixedDim:       '#00d4ec',
  onTertiary:             '#005762',
  onTertiaryContainer:    '#004d57',
  onTertiaryFixed:        '#003840',
  onTertiaryFixedVariant: '#005762',

  // ─── On-Surface ───────────────────────────────────────────────────────────
  onSurface:        '#e7e2ff',   // Primary text — NOT pure white
  onSurfaceVariant: '#aca8c3',   // Placeholder / secondary text
  outline:          '#76738c',
  outlineVariant:   '#48455c',   // Ghost border at 15% opacity
  inverseOnSurface: '#55526a',
  inverseSurface:   '#fcf8ff',

  // ─── Error ────────────────────────────────────────────────────────────────
  error:           '#ff6e84',
  errorDim:        '#d73357',
  errorContainer:  '#a70138',
  onError:         '#490013',
  onErrorContainer: '#ffb2b9',
};

export default LucidColors;
