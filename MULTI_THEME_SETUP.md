# Multi-Theme Setup Guide: Figma to Material-UI & Tailwind CSS

This guide walks you through the complete process of setting up a multi-theme application powered by Figma design tokens, with support for both Material-UI and Tailwind CSS v4.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Export from Figma](#step-1-export-from-figma)
4. [Step 2: Prebuild - Flatten the Structure](#step-2-prebuild---flatten-the-structure)
5. [Step 3: Build Design Tokens](#step-3-build-design-tokens)
6. [Step 4: Create Material-UI Themes](#step-4-create-material-ui-themes)
7. [Step 5: Using Tailwind CSS Themes](#step-5-using-tailwind-css-themes)
8. [Step 6: Run the Application](#step-6-run-the-application)
9. [Project Structure](#project-structure)
10. [Customization](#customization)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This setup demonstrates how to:

- Export design variables from Figma
- Transform them into design tokens
- Generate multiple theme files (CSS, SCSS, JS, TS, Tailwind CSS v4)
- Create Material-UI themes for 3 different themes (Ocean, Sunset, Forest)
- Generate Tailwind CSS v4 theme files with inline CSS variables
- Support both light and dark modes for each theme

**Result**: 3 themes × 2 modes = 6 complete theme configurations for both Material-UI and Tailwind CSS

---

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Figma account with design variables/tokens

---

## Step 1: Export from Figma

### 1.1 Structure Your Figma Variables

In Figma, organize your variables into collections with modes:

```
Collection: theme-ocean
├── Mode: light
│   ├── primary: #0077be
│   ├── secondary: #00a896
│   ├── background-default: #f0f8ff
│   └── ...
└── Mode: dark
    ├── primary: #42a5f5
    ├── secondary: #26d4c1
    └── ...

Collection: theme-sunset
├── Mode: light
└── Mode: dark

Collection: theme-forest
├── Mode: light
└── Mode: dark
```

### 1.2 Export Format

Export your Figma variables to a JSON file with this structure:

```json
[
  {
    "theme-ocean": {
      "modes": {
        "light": {
          "primary": {
            "$scopes": ["ALL_SCOPES"],
            "$type": "color",
            "$value": "#0077be"
          },
          "secondary": { ... },
          "background-default": { ... }
        },
        "dark": {
          "primary": { ... }
        }
      }
    }
  },
  {
    "theme-sunset": { ... }
  },
  {
    "theme-forest": { ... }
  }
]
```

### 1.3 Save the Export

Save the exported JSON as:

```
figma-variables/export.json
```

### 1.4 Required Token Names

For Material-UI integration, include these tokens in each mode:

**Colors:**

- `primary` - Main brand color
- `primary-contrast` - Text color on primary background
- `secondary` - Secondary brand color
- `secondary-contrast` - Text color on secondary background
- `background-default` - Page background
- `background-paper` - Card/surface background
- `text-primary` - Main text color
- `text-secondary` - Muted text color
- `error` - Error state color
- `warning` - Warning state color
- `info` - Info state color
- `success` - Success state color

**Spacing/Layout:**

- `spacing-unit` - Base spacing multiplier (e.g., 8)
- `border-radius` - Default border radius (e.g., 4, 8, 12)

---

## Step 2: Prebuild - Flatten the Structure

The prebuild script transforms the nested Figma export into a flattened structure that Style Dictionary can process.

### 2.1 Run Prebuild

```bash
pnpm run prebuild
```

Or directly:

```bash
node ./lib/prebuild.js
```

### 2.2 What Happens

The script reads `figma-variables/export.json` and creates:

```
figma-variables/figma-flattened.json
```

**Input** (nested with collections and modes):

```json
[
  {
    "theme-ocean": {
      "modes": {
        "light": { "primary": { "$value": "#0077be" } }
      }
    }
  }
]
```

**Output** (flattened by theme and mode):

```json
{
  "theme-ocean": {
    "light": {
      "primary": {
        "$scopes": ["ALL_SCOPES"],
        "$type": "color",
        "$value": "#0077be",
        "$collectionName": "theme-ocean"
      }
    },
    "dark": { ... }
  },
  "theme-sunset": { ... },
  "theme-forest": { ... }
}
```

### 2.3 Verify Output

Check that `figma-variables/figma-flattened.json` exists and contains all your themes and modes.

---

## Step 3: Build Design Tokens

The build script uses Style Dictionary to generate token files in multiple formats.

### 3.1 Run Build

```bash
pnpm run build:figma:variables
```

Or directly:

```bash
node ./lib/build-multi-themes.js
```

### 3.2 What Gets Generated

For each theme and mode, the following files are created:

```
dist/figma-variables/
├── theme-ocean/
│   ├── light/
│   │   ├── css/tokens.css       # CSS variables
│   │   ├── scss/tokens.scss     # SCSS variables
│   │   ├── js/tokens.js         # ES6 exports
│   │   └── ts/tokens.d.ts       # TypeScript definitions
│   └── dark/
│       ├── css/tokens.css
│       ├── scss/tokens.scss
│       ├── js/tokens.js
│       └── ts/tokens.d.ts
├── theme-sunset/
│   ├── light/
│   └── dark/
├── theme-forest/
│   ├── light/
│   └── dark/
└── index.js                     # Aggregated exports
```

### 3.3 Example Output Files

**CSS** (`theme-ocean/light/css/tokens.css`):

```css
:root {
  --primary: #0077be;
  --secondary: #00a896;
  --background-default: #f0f8ff;
  --text-primary: #1a1a1a;
  --spacing-unit: 0.5rem;
  --border-radius: 0.5rem;
}
```

**JavaScript** (`theme-ocean/light/js/tokens.js`):

```javascript
export const primary = '#0077be';
export const secondary = '#00a896';
export const backgroundDefault = '#f0f8ff';
export const textPrimary = '#1a1a1a';
export const spacingUnit = '8px';
export const borderRadius = '8px';
```

**TypeScript** (`theme-ocean/light/ts/tokens.d.ts`):

```typescript
export const primary: string;
export const secondary: string;
export const backgroundDefault: string;
// ...
```

### 3.4 Build Script Workflow

```
figma-flattened.json
        ↓
    Read themes
        ↓
For each theme & mode:
  - Create Style Dictionary config
  - Transform tokens (camelCase, px, rem)
  - Generate CSS/SCSS/JS/TS files
        ↓
  Create index.js with all exports
```

---

## Step 4: Create Material-UI Themes

Material-UI themes are created by importing the generated tokens and mapping them to MUI's theme structure.

### 4.1 Theme Configuration File

The `themes.js` file imports all generated tokens and creates MUI themes:

```javascript
// themes.js
import { createTheme } from '@mui/material/styles';
import * as oceanLight from './dist/figma-variables/theme-ocean/light/js/tokens.js';
import * as oceanDark from './dist/figma-variables/theme-ocean/dark/js/tokens.js';
// ... import other themes

const createThemeFromTokens = (tokens) => {
  return createTheme({
    palette: {
      primary: {
        main: tokens.primary,
        contrastText: tokens.primaryContrast,
      },
      secondary: {
        main: tokens.secondary,
        contrastText: tokens.secondaryContrast,
      },
      background: {
        default: tokens.backgroundDefault,
        paper: tokens.backgroundPaper,
      },
      text: {
        primary: tokens.textPrimary,
        secondary: tokens.textSecondary,
      },
      error: { main: tokens.error },
      warning: { main: tokens.warning },
      info: { main: tokens.info },
      success: { main: tokens.success },
    },
    spacing: parseInt(tokens.spacingUnit),
    shape: {
      borderRadius: parseInt(tokens.borderRadius),
    },
    // Component customizations...
  });
};

export const themes = {
  ocean: {
    light: createThemeFromTokens(oceanLight),
    dark: createThemeFromTokens(oceanDark),
  },
  sunset: {
    light: createThemeFromTokens(sunsetLight),
    dark: createThemeFromTokens(sunsetDark),
  },
  forest: {
    light: createThemeFromTokens(forestLight),
    dark: createThemeFromTokens(forestDark),
  },
};
```

### 4.2 Token to MUI Mapping

| Design Token         | Material-UI Theme Path       | Usage                  |
| -------------------- | ---------------------------- | ---------------------- |
| `primary`            | `palette.primary.main`       | Primary buttons, links |
| `secondary`          | `palette.secondary.main`     | Secondary actions      |
| `background-default` | `palette.background.default` | Page background        |
| `background-paper`   | `palette.background.paper`   | Cards, surfaces        |
| `text-primary`       | `palette.text.primary`       | Body text              |
| `text-secondary`     | `palette.text.secondary`     | Supporting text        |
| `spacing-unit`       | `spacing`                    | All spacing values     |
| `border-radius`      | `shape.borderRadius`         | Default border radius  |

---

## Step 5: Using Tailwind CSS Themes

The build process also generates Tailwind CSS v4 compatible theme files using the `@theme` directive.

### 5.1 Generated Tailwind Files

When you run `pnpm run build:tailwind`, the following files are created:

```
dist/figma-variables/tailwind/
├── theme-ocean-light.css      # Ocean theme - light mode
├── theme-ocean-dark.css       # Ocean theme - dark mode
├── theme-sunset-light.css     # Sunset theme - light mode
├── theme-sunset-dark.css      # Sunset theme - dark mode
├── theme-forest-light.css     # Forest theme - light mode
├── theme-forest-dark.css      # Forest theme - dark mode
└── app.css                    # Main file importing all themes
```

### 5.2 Individual Theme File Structure

Each theme file uses Tailwind CSS v4's `@theme` directive:

**Example** (`theme-ocean-light.css`):

```css
/**
 * Tailwind CSS v4 Theme: theme-ocean - light
 * Auto-generated from design tokens
 */

@theme {
  --primary: #0077be;
  --primary-contrast: #ffffff;
  --secondary: #00a896;
  --background-default: #f0f8ff;
  --background-paper: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --spacing-unit: 8px;
  --border-radius: 8px;
}
```

### 5.3 Main app.css File

The `app.css` file provides three ways to use themes:

#### Method 1: Data Attributes (Recommended)

```html
<!-- Switch theme and mode using data attributes -->
<html data-theme="ocean" data-mode="light">
  <body>
    <div class="bg-[var(--background-default)] text-[var(--text-primary)]">
      Content styled with theme variables
    </div>
  </body>
</html>
```

**JavaScript theme switching:**

```javascript
// Switch theme
document.documentElement.dataset.theme = 'sunset';

// Toggle dark mode
document.documentElement.dataset.mode = 'dark';
```

#### Method 2: CSS Classes

```html
<html class="theme-ocean-light">
  <body>
    <!-- Your content -->
  </body>
</html>
```

#### Method 3: System Preference (Automatic)

The app.css includes media queries for automatic dark mode:

```css
@media (prefers-color-scheme: dark) {
  [data-theme='ocean']:not([data-mode='light']) {
    /* Dark mode variables applied automatically */
  }
}
```

### 5.4 Using Theme Variables in Tailwind

The generated `app.css` includes custom utility classes:

```html
<!-- Use predefined utilities -->
<div class="bg-primary text-primary rounded-theme">Primary colored box</div>

<!-- Or use CSS variables directly -->
<div class="bg-[var(--secondary)] text-[var(--secondary-contrast)]">
  Secondary colored box
</div>

<!-- Combine with Tailwind utilities -->
<button
  class="bg-primary text-primary rounded-theme px-4 py-2 hover:opacity-90"
>
  Themed Button
</button>
```

**Available custom utilities:**

- `bg-primary` - Background using primary color
- `bg-secondary` - Background using secondary color
- `bg-surface` - Background using paper color
- `text-primary` - Text using primary text color
- `text-secondary` - Text using secondary text color
- `border-primary` - Border using primary color
- `rounded-theme` - Border radius from theme

### 5.5 Import in Your Project

**In your main CSS file:**

```css
@import './dist/figma-variables/tailwind/app.css';
```

**Or in your main JavaScript/TypeScript file:**

```javascript
import './dist/figma-variables/tailwind/app.css';
```

### 5.6 Complete Tailwind Example

```html
<!DOCTYPE html>
<html data-theme="ocean" data-mode="light">
  <head>
    <link rel="stylesheet" href="./dist/figma-variables/tailwind/app.css" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-[var(--background-default)] text-[var(--text-primary)]">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold text-[var(--primary)] mb-4">
        Themed with Tailwind CSS v4
      </h1>

      <div class="flex gap-4 mb-8">
        <button
          onclick="switchTheme('ocean')"
          class="bg-primary text-primary rounded-theme px-4 py-2"
        >
          Ocean
        </button>
        <button
          onclick="switchTheme('sunset')"
          class="bg-primary text-primary rounded-theme px-4 py-2"
        >
          Sunset
        </button>
        <button
          onclick="switchTheme('forest')"
          class="bg-primary text-primary rounded-theme px-4 py-2"
        >
          Forest
        </button>
        <button
          onclick="toggleDarkMode()"
          class="bg-secondary text-secondary rounded-theme px-4 py-2"
        >
          Toggle Dark Mode
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-[var(--background-paper)] rounded-theme p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-[var(--primary)] mb-2">
            Card Title
          </h2>
          <p class="text-[var(--text-secondary)]">
            This card uses theme variables for all styling.
          </p>
        </div>
      </div>
    </div>

    <script>
      function switchTheme(theme) {
        document.documentElement.dataset.theme = theme;
      }

      function toggleDarkMode() {
        const currentMode = document.documentElement.dataset.mode;
        document.documentElement.dataset.mode =
          currentMode === 'dark' ? 'light' : 'dark';
      }
    </script>
  </body>
</html>
```

### 5.7 Tailwind Build Process

The Tailwind theme generation happens automatically when you run:

```bash
# Full build (includes Tailwind)
pnpm run build

# Or just Tailwind themes
pnpm run build:tailwind
```

**What the script does:**

1. Reads `figma-variables/figma-flattened.json`
2. For each theme and mode, creates a separate CSS file with `@theme` directive
3. Generates `app.css` with:
   - Imports for all theme files
   - Root-level default variables
   - Class-based theme selectors
   - Data attribute selectors
   - Custom utility classes
   - Media query for system dark mode preference

---

## Step 6: Run the Application

### 5.1 Install Dependencies

```bash
pnpm install
```

This installs:

- React & ReactDOM
- Material-UI (@mui/material)
- Emotion (MUI's styling engine)
- Vite (dev server)
- Style Dictionary (token transformer)

### 5.2 Start Development Server

```bash
pnpm run dev
```

The app will open at `http://localhost:3000`

### 5.3 Using Themes in Your App

```jsx
import { ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';
import themes from './themes';

function App() {
  const [selectedTheme, setSelectedTheme] = useState('ocean');
  const [mode, setMode] = useState('light');

  const currentTheme = useMemo(() => {
    return themes[selectedTheme][mode];
  }, [selectedTheme, mode]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {/* Your components */}
    </ThemeProvider>
  );
}
```

### 5.4 Switching Themes

**Manual Switch:**

```jsx
<Button onClick={() => setSelectedTheme('sunset')}>Sunset Theme</Button>
```

**Toggle Dark Mode:**

```jsx
<Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
  Toggle Dark Mode
</Button>
```

**Toggle Button Group (recommended):**

```jsx
<ToggleButtonGroup
  value={selectedTheme}
  exclusive
  onChange={(e, newTheme) => setSelectedTheme(newTheme)}
>
  <ToggleButton value="ocean">Ocean</ToggleButton>
  <ToggleButton value="sunset">Sunset</ToggleButton>
  <ToggleButton value="forest">Forest</ToggleButton>
</ToggleButtonGroup>
```

---

## Project Structure

```
craftzing-design-tokens-example-main/
├── figma-variables/
│   ├── export.json              # Raw Figma export (manual)
│   └── figma-flattened.json     # Flattened structure (generated)
│
├── lib/
│   ├── prebuild.js              # Flattens export.json
│   ├── build-multi-themes.js    # Builds tokens with Style Dictionary
│   ├── build-tailwind-themes.js # Builds Tailwind CSS v4 theme files
│   └── misc/
│       └── logo.js
│
├── dist/
│   └── figma-variables/
│       ├── theme-ocean/
│       │   ├── light/
│       │   │   ├── css/tokens.css
│       │   │   ├── scss/tokens.scss
│       │   │   ├── js/tokens.js
│       │   │   └── ts/tokens.d.ts
│       │   └── dark/
│       │       ├── css/tokens.css
│       │       ├── scss/tokens.scss
│       │       ├── js/tokens.js
│       │       └── ts/tokens.d.ts
│       ├── theme-sunset/
│       │   ├── light/
│       │   └── dark/
│       ├── theme-forest/
│       │   ├── light/
│       │   └── dark/
│       ├── tailwind/
│       │   ├── theme-ocean-light.css    # Tailwind CSS v4 themes
│       │   ├── theme-ocean-dark.css
│       │   ├── theme-sunset-light.css
│       │   ├── theme-sunset-dark.css
│       │   ├── theme-forest-light.css
│       │   ├── theme-forest-dark.css
│       │   └── app.css                   # Main Tailwind theme file
│       └── index.js                      # Aggregated JS exports
│       │   │   ├── js/tokens.js
│       │   │   └── ...
│       │   └── dark/
│       ├── theme-sunset/
│       ├── theme-forest/
│       └── index.js             # Aggregated exports
│
├── themes.js                    # Material-UI theme configs
├── App.jsx                      # Main app with theme switcher
├── main.jsx                     # React entry point
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies & scripts
```

---

## Customization

### Adding a New Theme

1. **Update Figma Export** (`figma-variables/export.json`):

   ```json
   {
     "theme-cosmic": {
       "modes": {
         "light": { "primary": { "$value": "#6b46c1" } },
         "dark": { "primary": { "$value": "#9f7aea" } }
       }
     }
   }
   ```

2. **Rebuild Tokens**:

   ```bash
   pnpm run build
   ```

3. **Update themes.js**:

   ```javascript
   import * as cosmicLight from './dist/figma-variables/theme-cosmic/light/js/tokens.js';
   import * as cosmicDark from './dist/figma-variables/theme-cosmic/dark/js/tokens.js';

   export const themes = {
     // ... existing themes
     cosmic: {
       light: createThemeFromTokens(cosmicLight),
       dark: createThemeFromTokens(cosmicDark),
     },
   };
   ```

4. **Add to UI**:
   ```jsx
   <ToggleButton value="cosmic">Cosmic</ToggleButton>
   ```

### Modifying Token Values

1. Edit `figma-variables/export.json`
2. Run `pnpm run build`
3. Restart dev server: `pnpm run dev`

### Customizing MUI Components

In `themes.js`, extend the theme configuration:

```javascript
const createThemeFromTokens = (tokens) => {
  return createTheme({
    // ... palette, spacing, shape
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: '1px solid',
            borderColor: 'divider',
          },
        },
      },
    },
  });
};
```

### Adding More Token Types

**Typography Tokens:**

```json
{
  "font-family-base": {
    "$type": "string",
    "$value": "Inter, sans-serif"
  },
  "font-size-body": {
    "$type": "float",
    "$value": 16
  }
}
```

**Shadow Tokens:**

```json
{
  "elevation-1": {
    "$type": "string",
    "$value": "0 2px 4px rgba(0,0,0,0.1)"
  }
}
```

Map to MUI theme:

```javascript
typography: {
  fontFamily: tokens.fontFamilyBase,
  body1: {
    fontSize: tokens.fontSizeBody,
  },
},
shadows: [
  'none',
  tokens.elevation1,
  // ...
],
```

---

## Troubleshooting

### Issue: Tokens not updating after changing Figma export

**Solution:**

```bash
# Complete rebuild
pnpm run prebuild
pnpm run build:figma:variables
# Restart dev server
```

### Issue: `Cannot find module './dist/figma-variables/...'`

**Solution:**
Ensure you've run the build:

```bash
pnpm run build:figma:variables
```

### Issue: Theme looks wrong in dark mode

**Check:**

1. Dark mode tokens are properly defined in export.json
2. Contrast colors are appropriate (light text on dark backgrounds)
3. Both modes were built (check `dist/figma-variables/theme-name/dark/`)

### Issue: Spacing is too large/small

**Solution:**
Adjust `spacing-unit` token in Figma export. The value is used as MUI's base spacing unit (typically 8):

```json
{
  "spacing-unit": { "$value": 8 } // 1 spacing unit = 8px
}
```

Then `<Box sx={{ p: 2 }} />` = padding: 16px (2 × 8px)

### Issue: Build fails with "Cannot read property 'modes'"

**Solution:**
Check your export.json structure matches the expected format with nested `modes` objects.

---

## NPM Scripts Reference

| Script                  | Command                                                                          | Description                               |
| ----------------------- | -------------------------------------------------------------------------------- | ----------------------------------------- |
| `dev`                   | `vite`                                                                           | Start development server                  |
| `prebuild`              | `node ./lib/prebuild.js`                                                         | Flatten Figma export structure            |
| `build`                 | `pnpm run prebuild && pnpm run build:figma:variables && pnpm run build:tailwind` | Full build pipeline (includes Tailwind)   |
| `build:figma:variables` | `node ./lib/build-multi-themes.js`                                               | Generate all token files (CSS/SCSS/JS/TS) |
| `build:tailwind`        | `node ./lib/build-tailwind-themes.js`                                            | Generate Tailwind CSS v4 theme files      |
| `build:app`             | `vite build`                                                                     | Build production app bundle               |
| `preview`               | `vite preview`                                                                   | Preview production build                  |

---

## Complete Workflow Example

Starting from scratch:

```bash
# 1. Export from Figma and save to figma-variables/export.json

# 2. Install dependencies
pnpm install

# 3. Flatten the export structure
pnpm run prebuild

# 4. Build all token files (includes Material-UI tokens)
pnpm run build:figma:variables

# 5. Build Tailwind CSS theme files
pnpm run build:tailwind

# Or run complete build (steps 3-5)
pnpm run build

# 6. Start development server
pnpm run dev

# 7. Make changes to export.json and rebuild
# Edit figma-variables/export.json
pnpm run build

# 8. Build for production
pnpm run build:app
pnpm run preview
```

---

## Best Practices

1. **Version Control**: Commit `export.json` but consider adding `figma-flattened.json` to `.gitignore` since it's generated

2. **Token Naming**: Use consistent, semantic names:

   - ✅ `primary`, `secondary`, `background-default`
   - ❌ `blue`, `color1`, `bg`

3. **Mode Consistency**: Ensure all themes have the same token names in both light/dark modes

4. **Automated Builds**: Set up a CI/CD pipeline to rebuild tokens on export.json changes

5. **Documentation**: Keep token documentation in Figma descriptions for team reference

6. **Testing**: Test all theme/mode combinations before deploying

---

## Resources

- [Material-UI Theming Guide](https://mui.com/material-ui/customization/theming/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)

---

## Next Steps

- Add more themes or modify existing ones in Figma
- Customize Material-UI component styles using your tokens
- Integrate with your existing application
- Set up automated token generation from Figma API
- Add animation/transition tokens
- Create theme preview documentation

---

**Need help?** Check the troubleshooting section or review the example App.jsx for implementation details.
