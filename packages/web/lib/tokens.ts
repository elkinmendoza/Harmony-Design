/**
 * Harmony Design System — Typed token references for web.
 *
 * On web, tokens resolve via CSS custom properties in theme.css.
 * This file provides typed helpers for inline styles where Tailwind
 * utilities don't cover the full typography scale.
 */

export const heading = {
  "9xl": {
    fontSize: "var(--heading-9xl-size)",
    lineHeight: "var(--heading-9xl-line-height)",
    letterSpacing: "var(--heading-9xl-letter-spacing)",
  },
  "display-2xl": {
    fontSize: "var(--heading-display-2xl-size)",
    lineHeight: "var(--heading-display-2xl-line-height)",
    letterSpacing: "var(--heading-display-2xl-letter-spacing)",
  },
  "display-xl": {
    fontSize: "var(--heading-display-xl-size)",
    lineHeight: "var(--heading-display-xl-line-height)",
    letterSpacing: "var(--heading-display-xl-letter-spacing)",
  },
  "display-lg": {
    fontSize: "var(--heading-display-lg-size)",
    lineHeight: "var(--heading-display-lg-line-height)",
    letterSpacing: "var(--heading-display-lg-letter-spacing)",
  },
  xl: {
    fontSize: "var(--heading-xl-size)",
    lineHeight: "var(--heading-xl-line-height)",
    letterSpacing: "var(--heading-xl-letter-spacing)",
  },
  lg: {
    fontSize: "var(--heading-lg-size)",
    lineHeight: "var(--heading-lg-line-height)",
    letterSpacing: "var(--heading-lg-letter-spacing)",
  },
  md: {
    fontSize: "var(--heading-md-size)",
    lineHeight: "var(--heading-md-line-height)",
    letterSpacing: "var(--heading-md-letter-spacing)",
  },
  sm: {
    fontSize: "var(--heading-sm-size)",
    lineHeight: "var(--heading-sm-line-height)",
    letterSpacing: "var(--heading-sm-letter-spacing)",
  },
  xs: {
    fontSize: "var(--heading-xs-size)",
    lineHeight: "var(--heading-xs-line-height)",
    letterSpacing: "var(--heading-xs-letter-spacing)",
  },
} as const;

export const text = {
  xl: {
    fontSize: "var(--text-xl-size)",
    lineHeight: "var(--text-xl-line-height)",
    letterSpacing: "var(--text-xl-letter-spacing)",
  },
  lg: {
    fontSize: "var(--text-lg-size)",
    lineHeight: "var(--text-lg-line-height)",
    letterSpacing: "var(--text-lg-letter-spacing)",
  },
  md: {
    fontSize: "var(--text-md-size)",
    lineHeight: "var(--text-md-line-height)",
    letterSpacing: "var(--text-md-letter-spacing)",
  },
  sm: {
    fontSize: "var(--text-sm-size)",
    lineHeight: "var(--text-sm-line-height)",
    letterSpacing: "var(--text-sm-letter-spacing)",
  },
  xs: {
    fontSize: "var(--text-xs-size)",
    lineHeight: "var(--text-xs-line-height)",
    letterSpacing: "var(--text-xs-letter-spacing)",
  },
} as const;
