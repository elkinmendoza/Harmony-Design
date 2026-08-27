/**
 * Harmony Design System — Resolved token objects for React Native.
 *
 * React Native cannot use CSS custom properties. This file provides
 * the same semantic tokens as foundations/theme.css but as resolved
 * TypeScript objects. Values are sourced from tokens/semantic.json
 * and tokens/primitives.json.
 *
 * When tokens change, regenerate this file to stay in sync.
 */

/* =========================================================
   PRIMITIVES
   ========================================================= */

export const primitives = {
  brand: {
    50: "#fff4e5", 100: "#ffeacc", 200: "#ffd599", 300: "#ffbf66",
    400: "#ffaa33", 500: "#ff9500", 600: "#cc7700", 700: "#995900",
    800: "#663c00", 900: "#331e00", 950: "#241500",
  },
  neutral: {
    50: "#f8f7f5", 100: "#f0efed", 200: "#e2e0db", 300: "#c7c4bc",
    400: "#a09c94", 500: "#787470", 600: "#545250", 700: "#3a3835",
    800: "#252420", 900: "#161512", 950: "#0d0c0a",
  },
  green: {
    50: "#edfaf3", 100: "#d4f3e4", 200: "#a5e6c6", 300: "#6dd4a3",
    400: "#3dbd82", 500: "#1a9e52", 600: "#157f41", 700: "#0f6033",
    800: "#0a4124", 900: "#052115", 950: "#02100a",
  },
  red: {
    50: "#fff0ee", 100: "#ffe0db", 200: "#ffbdb5", 300: "#ff9088",
    400: "#ff5e55", 500: "#e53e2a", 600: "#c42e1c", 700: "#9b1f11",
    800: "#6b1209", 900: "#3d0a05", 950: "#1f0803",
  },
  blue: {
    50: "#eef4ff", 100: "#dbe8ff", 200: "#b5cfff", 300: "#85afff",
    400: "#5588ff", 500: "#2d6bf4", 600: "#1a52d4", 700: "#103ca8",
    800: "#0a2878", 900: "#061549", 950: "#030a24",
  },
  yellow: {
    50: "#fffbea", 100: "#fff6c6", 200: "#ffec88", 300: "#ffdd4a",
    400: "#ffcc18", 500: "#f5c518", 600: "#d4a80e", 700: "#a88007",
    800: "#735403", 900: "#3d2c01", 950: "#1a1400",
  },
} as const;

/* =========================================================
   SEMANTIC — light + dark resolved values
   ========================================================= */

export const colors = {
  light: {
    background: {
      primary: primitives.neutral[50],
      secondary: primitives.neutral[100],
      tertiary: primitives.neutral[200],
      inverse: primitives.neutral[900],
      brand: primitives.brand[500],
    },
    surface: {
      default: primitives.neutral[50],
      raised: primitives.neutral[50],
      sunken: primitives.neutral[100],
    },
    content: {
      primary: primitives.neutral[900],
      secondary: primitives.neutral[600],
      tertiary: primitives.neutral[500],
      inverse: primitives.neutral[50],
      disabled: primitives.neutral[400],
      brand: primitives.brand[600],
      onBrand: primitives.neutral[950],
    },
    border: {
      subtle: primitives.neutral[200],
      default: primitives.neutral[300],
      strong: primitives.neutral[400],
      focus: primitives.brand[500],
      brand: primitives.brand[500],
    },
    status: {
      positive: primitives.green[500],
      negative: primitives.red[500],
      notice: primitives.yellow[500],
      info: primitives.blue[500],
    },
  },
  dark: {
    background: {
      primary: primitives.neutral[950],
      secondary: primitives.neutral[900],
      tertiary: primitives.neutral[800],
      inverse: primitives.neutral[50],
      brand: primitives.brand[500],
    },
    surface: {
      default: primitives.neutral[900],
      raised: primitives.neutral[800],
      sunken: primitives.neutral[950],
    },
    content: {
      primary: primitives.neutral[50],
      secondary: primitives.neutral[300],
      tertiary: primitives.neutral[400],
      inverse: primitives.neutral[900],
      disabled: primitives.neutral[600],
      brand: primitives.brand[400],
      onBrand: primitives.neutral[950],
    },
    border: {
      subtle: primitives.neutral[800],
      default: primitives.neutral[700],
      strong: primitives.neutral[600],
      focus: primitives.brand[400],
      brand: primitives.brand[500],
    },
    status: {
      positive: primitives.green[400],
      negative: primitives.red[400],
      notice: primitives.yellow[400],
      info: primitives.blue[400],
    },
  },
} as const;

/* =========================================================
   TYPOGRAPHY
   ========================================================= */

export const fontFamily = {
  display: "ClashGrotesk-Bold",
  sans: "SpaceGrotesk",
  body: "Roboto",
} as const;

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const heading = {
  "9xl":        { fontSize: 192, lineHeight: 142, letterSpacing: -5.76 },
  "display-2xl": { fontSize: 96, lineHeight: 96, letterSpacing: -2.88 },
  "display-xl": { fontSize: 72, lineHeight: 72, letterSpacing: -1.8 },
  "display-lg": { fontSize: 60, lineHeight: 64, letterSpacing: -1.2 },
  xl:           { fontSize: 48, lineHeight: 52, letterSpacing: -0.96 },
  lg:           { fontSize: 36, lineHeight: 40, letterSpacing: -0.54 },
  md:           { fontSize: 30, lineHeight: 36, letterSpacing: -0.3 },
  sm:           { fontSize: 24, lineHeight: 32, letterSpacing: -0.12 },
  xs:           { fontSize: 20, lineHeight: 28, letterSpacing: 0 },
} as const;

export const text = {
  xl: { fontSize: 20, lineHeight: 30, letterSpacing: 0 },
  lg: { fontSize: 18, lineHeight: 28, letterSpacing: 0 },
  md: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  sm: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  xs: { fontSize: 12, lineHeight: 16, letterSpacing: 0.12 },
} as const;

/* =========================================================
   SPACING / RADIUS
   ========================================================= */

export const space = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 72,
  "5xl": 96,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  "3xl": 48,
  full: 9999,
} as const;
