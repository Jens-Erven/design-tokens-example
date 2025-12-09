# Material-UI Theme with Design Tokens

This setup integrates your Figma design tokens with Material-UI to create a consistent, token-driven theme.

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Build design tokens:**

   ```bash
   pnpm run build
   ```

   This generates token files from your Figma variables.

3. **Start the development server:**
   ```bash
   pnpm run dev
   ```
   Your app will open at http://localhost:3000

## Project Structure

```
├── theme.js              # Material-UI theme configuration using design tokens
├── App.jsx               # Example application with MUI components
├── main.jsx              # App entry point
├── index.html            # HTML template
├── dist/
│   └── figma-variables/
│       └── js/
│           └── tokens.js # Generated design tokens (imported by theme.js)
```

## How It Works

### 1. Design Tokens Generation

Your Figma variables are converted to JavaScript tokens:

```javascript
// dist/figma-variables/js/tokens.js
export const blue = "#1a297c";
export const pink = "#ef268b";
export const buttonBackground = "#1a297c";
// ... more tokens
```

### 2. Theme Configuration

The `theme.js` file maps these tokens to Material-UI's theme structure:

```javascript
import * as tokens from './dist/figma-variables/js/tokens.js';

const theme = createTheme({
  palette: {
    primary: { main: tokens.blue },
    secondary: { main: tokens.pink },
    // ...
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: tokens.buttonPaddingHorizontal,
          paddingRight: tokens.buttonPaddingHorizontal,
          // ...
        }
      }
    }
  }
});
```

### 3. Usage in Your App

Wrap your app with `ThemeProvider`:

```javascript
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Themed Button</Button>
    </ThemeProvider>
  );
}
```

## Customizing the Theme

### Adding More Token Mappings

Edit `theme.js` to map additional tokens to MUI components:

```javascript
components: {
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: tokens.white,
        padding: tokens.large,
      }
    }
  }
}
```

### Updating Design Tokens

1. Update your Figma variables or Token Studio tokens
2. Export and update the JSON files in `figma-variables/` or `token-studio/`
3. Run `pnpm run build` to regenerate token files
4. Your theme will automatically use the new values

## Material-UI Components with Tokens

All MUI components will automatically use your theme:

```javascript
// Buttons
<Button variant="contained">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>

// Using theme values in sx prop
<Box sx={{
  backgroundColor: 'primary.main',  // Uses tokens.blue
  color: 'background.default',      // Uses tokens.white
  p: 2                               // Uses your custom spacing
}}>
  Content
</Box>
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build design tokens
- `pnpm run build:app` - Build production app
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier

## Learn More

- [Material-UI Theming](https://mui.com/material-ui/customization/theming/)
- [Material-UI Component Customization](https://mui.com/material-ui/customization/how-to-customize/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
