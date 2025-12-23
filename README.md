# @8825/design-tokens

Design tokens for all 8825.systems applications. Single source of truth for colors, typography, spacing, and more.

## Installation

```bash
npm install @8825/design-tokens
```

## Usage

### In CSS

```css
@import "@8825/design-tokens/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### In Tailwind Config

```typescript
import designTokensPreset from "@8825/design-tokens/tailwind-preset";

export default {
  presets: [designTokensPreset],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
};
```

## Token Categories

### Colors
- **Brand**: Primary brand colors (8825 Blue)
- **Semantic**: Background, foreground, border, input, ring
- **Surface**: App, subtle, elevated, overlay
- **Card**: Default, muted, emphasis
- **Status**: Positive, warning, danger, neutral
- **Chart**: 10 data visualization colors
- **Sidebar**: Sidebar-specific colors
- **Popover**: Popover/dropdown colors

### Typography
- **Font Family**: Sans, serif, mono
- **Font Size**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- **Line Height**: Tight, normal, relaxed
- **Tracking**: Tight, normal, wide

### Spacing
- xs, sm, md, lg, xl, 2xl

### Border Radius
- xs, sm, md, lg, xl, full, media

### Motion
- **Duration**: Fast (150ms), normal (250ms), slow (400ms)
- **Easing**: In, out, inOut (cubic-bezier curves)

### Layers (Z-Index)
- content (0), elevated (10), sticky (50), overlay (100), modal (200), toast (300)

### Form
- Field gap, input height, label gap

### Elevation
- Hover and active state overlays

### Shadows
- xs, sm, md, lg, xl

## Dark Mode

All color tokens have dark mode variants automatically applied when `.dark` class is present on the root element.

## Development

```bash
# Build tokens from source
npm run build

# Validate tokens
npm run validate

# Preview tokens
npm run preview
```

## Version History

### 0.1.0 (2025-12-22)
- Initial release
- DTCG-compliant token format
- Comprehensive color, typography, spacing, motion tokens
- Dark mode support
- Tailwind preset generation
