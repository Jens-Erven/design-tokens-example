# Craftzing Design Tokens Example

This repository demonstrates how to transform Figma design variables into multi-theme design tokens for both **Material-UI** and **Tailwind CSS v4** using [Style Dictionary](https://amzn.github.io/style-dictionary/#/).

## ✨ Features

- 🎨 **3 Complete Themes**: Ocean, Sunset, and Forest
- 🌓 **Light & Dark Modes**: Full support for both modes per theme
- ⚛️ **Material-UI Integration**: Ready-to-use React themes
- 🎯 **Tailwind CSS v4**: Modern `@theme` directive support
- 📦 **Multiple Formats**: CSS, SCSS, JavaScript, TypeScript
- 🔄 **Automatic Generation**: Build tokens from Figma exports

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone git@github.com:craftzing/craftzing-design-tokens-example.git
cd craftzing-design-tokens-example

# Install dependencies
pnpm install

# Build all tokens
pnpm run build

# Start development server
pnpm run dev
```

## 📚 Documentation

For complete setup instructions, see **[MULTI_THEME_SETUP.md](./MULTI_THEME_SETUP.md)** which includes:

- Exporting from Figma
- Building design tokens
- Material-UI theme configuration
- Tailwind CSS v4 integration
- Theme switching examples
- Troubleshooting guide

## 🏗️ Project Structure

```
├── figma-variables/
│   ├── export.json              # Raw Figma export
│   └── figma-flattened.json     # Flattened structure (generated)
├── lib/
│   ├── prebuild.js              # Flatten Figma exports
│   ├── build-multi-themes.js    # Generate token files
│   └── build-tailwind-themes.js # Generate Tailwind themes
├── dist/figma-variables/
│   ├── theme-ocean/             # Ocean theme tokens
│   ├── theme-sunset/            # Sunset theme tokens
│   ├── theme-forest/            # Forest theme tokens
│   └── tailwind/                # Tailwind CSS v4 themes
├── themes.js                    # Material-UI theme configs
└── App.jsx                      # Demo app with theme switcher
```

## 🛠️ Available Scripts

| Command                          | Description                             |
| -------------------------------- | --------------------------------------- |
| `pnpm run build`                 | Build all tokens (flattens + generates) |
| `pnpm run build:figma:variables` | Generate Material-UI token files        |
| `pnpm run build:tailwind`        | Generate Tailwind CSS v4 theme files    |
| `pnpm run dev`                   | Start development server                |
| `pnpm run build:app`             | Build production app                    |

## 💡 Usage Examples

### Material-UI

```jsx
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes';

function App() {
  return (
    <ThemeProvider theme={themes.ocean.light}>
      <Button variant="contained">Themed Button</Button>
    </ThemeProvider>
  );
}
```

### Tailwind CSS v4

```html
<!-- Import the theme -->
<link rel="stylesheet" href="./dist/figma-variables/tailwind/app.css" />

<!-- Switch theme with data attributes -->
<html data-theme="ocean" data-mode="light">
  <body class="bg-[var(--background-default)]">
    <div class="bg-primary text-primary rounded-theme p-4">Themed Content</div>
  </body>
</html>
```

## 🎨 Available Themes

1. **Ocean** - Professional blue tones
2. **Sunset** - Warm orange and yellow palette
3. **Forest** - Natural green colors

Each theme includes complete light and dark mode variations.

#### Run tests

To execute the tests and validate your tokens:

```bash
pnpm run test
```

#### Update tests

If your tokens have intentionally changed and you need to update the test snapshots:

```bash
pnpm run test --u
```

> **Tip:** Regularly run tests to track changes and ensure updates are intentional. Verify the changes before updating snapshots to avoid introducing unintended modifications.

## File Outputs

- CSS: `dist/css/tokens.css`
- SCSS: `dist/scss/tokens.scss`
- JavaScript: `dist/js/tokens.js`

## Figma Link

https://www.figma.com/design/daVJlWWwwrulalbC4LGMnf/Design-Tokens-Example?m=auto&t=pPQmTn84ub1togTX-6

I use this figma file, i'm terrible at figma so if you can improve it, feel free.
