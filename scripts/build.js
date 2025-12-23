#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple build script that generates CSS and Tailwind preset from tokens.json
// This is a minimal implementation - we'll enhance with Style-Dictionary later

const tokensPath = path.join(__dirname, '../tokens/tokens.json');
const buildDir = path.join(__dirname, '../build');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Helper to convert DTCG token to CSS variable name
function tokenToCSSVar(path) {
  return '--' + path.join('-').replace(/([A-Z])/g, '-$1').toLowerCase();
}

// Helper to extract value from DTCG token
function getTokenValue(token) {
  if (typeof token === 'object' && token.$value !== undefined) {
    return token.$value;
  }
  return token;
}

// Recursively process tokens
function processTokens(obj, path = [], cssVars = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // Skip metadata
    
    const currentPath = [...path, key];
    
    if (typeof value === 'object' && value.$value !== undefined) {
      // This is a token
      const varName = tokenToCSSVar(currentPath);
      const varValue = getTokenValue(value);
      
      // Handle different value types
      if (Array.isArray(varValue)) {
        cssVars[varName] = varValue.join(', ');
      } else if (typeof varValue === 'object' && varValue.offsetX) {
        // Shadow object
        cssVars[varName] = `${varValue.offsetX} ${varValue.offsetY} ${varValue.blur} ${varValue.spread} ${varValue.color}`;
      } else {
        cssVars[varName] = varValue;
      }
    } else if (typeof value === 'object') {
      // Recurse
      processTokens(value, currentPath, cssVars);
    }
  }
  
  return cssVars;
}

// Generate CSS
function generateCSS() {
  const lightVars = {};
  const darkVars = {};
  
  // Process light mode tokens
  for (const [category, categoryTokens] of Object.entries(tokens)) {
    if (category === 'colorDark' || category === 'elevationDark') continue;
    processTokens({ [category]: categoryTokens }, [], lightVars);
  }
  
  // Process dark mode tokens
  if (tokens.colorDark) {
    processTokens({ color: tokens.colorDark }, [], darkVars);
  }
  if (tokens.elevationDark) {
    processTokens({ elevation: tokens.elevationDark }, [], darkVars);
  }
  
  // Build CSS
  let css = `/* 8825 Design Tokens - Generated from tokens.json */\n\n`;
  css += `:root {\n`;
  
  for (const [varName, value] of Object.entries(lightVars)) {
    css += `  ${varName}: ${value};\n`;
  }
  
  css += `}\n\n`;
  css += `.dark {\n`;
  
  for (const [varName, value] of Object.entries(darkVars)) {
    css += `  ${varName}: ${value};\n`;
  }
  
  css += `}\n`;
  
  return css;
}

// Generate Tailwind preset
function generateTailwindPreset() {
  const preset = {
    darkMode: ['class'],
    theme: {
      extend: {
        colors: {},
        spacing: {},
        borderRadius: {},
        fontFamily: {},
        fontSize: {},
        lineHeight: {},
        letterSpacing: {},
        transitionDuration: {},
        transitionTimingFunction: {},
        zIndex: {}
      }
    }
  };
  
  // Map color tokens
  if (tokens.color) {
    const mapColors = (obj, path = []) => {
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('$')) continue;
        
        if (value.$value) {
          const colorPath = [...path, key].join('-');
          preset.theme.extend.colors[colorPath] = `hsl(var(${tokenToCSSVar([...path, key])}) / <alpha-value>)`;
        } else if (typeof value === 'object') {
          mapColors(value, [...path, key]);
        }
      }
    };
    
    mapColors(tokens.color);
  }
  
  // Map spacing
  if (tokens.spacing) {
    for (const [key, value] of Object.entries(tokens.spacing)) {
      preset.theme.extend.spacing[key] = `var(${tokenToCSSVar(['spacing', key])})`;
    }
  }
  
  // Map border radius
  if (tokens.radius) {
    for (const [key, value] of Object.entries(tokens.radius)) {
      preset.theme.extend.borderRadius[key] = `var(${tokenToCSSVar(['radius', key])})`;
    }
  }
  
  // Map font families
  if (tokens.typography?.fontFamily) {
    for (const [key, value] of Object.entries(tokens.typography.fontFamily)) {
      preset.theme.extend.fontFamily[key] = `var(${tokenToCSSVar(['typography', 'font-family', key])})`;
    }
  }
  
  // Map font sizes
  if (tokens.typography?.fontSize) {
    for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
      preset.theme.extend.fontSize[key] = `var(${tokenToCSSVar(['typography', 'font-size', key])})`;
    }
  }
  
  // Map z-index
  if (tokens.layer) {
    for (const [key, value] of Object.entries(tokens.layer)) {
      preset.theme.extend.zIndex[key] = value.$value;
    }
  }
  
  return preset;
}

// Write files
try {
  console.log('Building design tokens...');
  
  const css = generateCSS();
  fs.writeFileSync(path.join(buildDir, 'tokens.css'), css);
  console.log('✓ Generated tokens.css');
  
  const preset = generateTailwindPreset();
  const presetJS = `module.exports = ${JSON.stringify(preset, null, 2)};\n`;
  fs.writeFileSync(path.join(buildDir, 'tailwind-preset.js'), presetJS);
  console.log('✓ Generated tailwind-preset.js');
  
  // Create index.js for package entry point
  const indexJS = `module.exports = {
  preset: require('./tailwind-preset.js')
};
`;
  fs.writeFileSync(path.join(buildDir, 'index.js'), indexJS);
  console.log('✓ Generated index.js');
  
  console.log('\n✓ Build complete!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
