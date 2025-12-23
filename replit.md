# 8825 Design Tokens

## Overview
This is a design tokens library that provides a single source of truth for all 8825.systems applications. It generates CSS custom properties and Tailwind CSS presets from a JSON token definition file.

## Project Structure
- `tokens/tokens.json` - Source design tokens in DTCG format
- `scripts/build.js` - Build script that generates output files
- `build/` - Generated output (tokens.css, tailwind-preset.js, index.js)
- `package.json` - NPM package configuration

## Commands
- `npm run build` - Generate CSS and Tailwind preset from tokens
- `npm run validate` - Validate tokens (when scripts exist)

## Usage
After building, the package exports:
- `build/tokens.css` - CSS custom properties for light/dark modes
- `build/tailwind-preset.js` - Tailwind CSS theme preset
- `build/index.js` - Package entry point

## Development
1. Edit tokens in `tokens/tokens.json`
2. Run `npm run build` to regenerate output files
3. Import the generated files in consuming applications

## Token Categories
- Colors (light/dark mode)
- Spacing
- Border radius
- Typography (fonts, sizes, line heights)
- Motion (durations, easing)
- Layers (z-index)
- Shadows
- Form-specific tokens
