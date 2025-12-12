# Tailwind CSS + Material-UI Integration

This document explains how Tailwind CSS is configured to work seamlessly with Material-UI components using only your custom theme tokens.

## Overview

The setup disables all default Tailwind utilities (like `bg-red-500`, `text-blue-600`, etc.) and provides **theme-aware custom classes** that automatically adapt when you switch themes.

## Key Features

✅ **Default Tailwind utilities disabled** - No `bg-red-500`, `text-blue-600`, etc.  
✅ **Custom theme-based classes only** - All classes use your design tokens  
✅ **Automatic theme switching** - Classes adapt to Ocean, Sunset, or Forest themes  
✅ **Dark mode support** - Classes automatically adjust in dark mode  
✅ **Material-UI compatible** - Works with all MUI components via `className` prop

## How It Works

### 1. Tailwind Configuration

The `lib/build-tailwind-themes.js` script generates a Tailwind v4 configuration that:

```css
/* Disables all default Tailwind presets */
@theme {
  --color-*: initial;
  --spacing-*: initial;
  --radius-*: initial;
}

/* Maps your design tokens to CSS variables */
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-bg-default: var(--background-default);
  /* ... and more */
}
```

### 2. Custom Utilities

The `global.css` file defines custom utility classes that use your theme variables:

```css
@layer utilities {
  /* Background colors from theme */
  .bg-primary {
    background-color: var(--color-primary) !important;
  }
  .bg-secondary {
    background-color: var(--color-secondary) !important;
  }

  /* Text colors from theme */
  .text-primary {
    color: var(--color-text-primary) !important;
  }
  .text-secondary {
    color: var(--color-text-secondary) !important;
  }

  /* Spacing utilities */
  .p-unit {
    padding: var(--spacing-unit) !important;
  }
  .px-unit {
    padding-left: var(--spacing-unit) !important;
    padding-right: var(--spacing-unit) !important;
  }

  /* Border radius */
  .rounded {
    border-radius: var(--radius-default) !important;
  }
}
```

### 3. Theme Switching

The App component applies theme classes to the document root:

```jsx
useMemo(() => {
  const themeClass = `theme-theme-${selectedTheme}`;
  const darkClass = mode === 'dark' ? 'dark' : '';
  document.documentElement.className = `${themeClass} ${darkClass}`.trim();
}, [selectedTheme, mode]);
```

## Available Classes

### Background Colors

- `.bg-primary` - Primary theme color
- `.bg-secondary` - Secondary theme color
- `.bg-error` - Error color
- `.bg-warning` - Warning color
- `.bg-info` - Info color
- `.bg-success` - Success color
- `.bg-default` - Default background
- `.bg-paper` - Paper background

### Text Colors

- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-primary-contrast` - Contrast text for primary background
- `.text-secondary-contrast` - Contrast text for secondary background
- `.text-error` - Error text color
- `.text-warning` - Warning text color
- `.text-info` - Info text color
- `.text-success` - Success text color

### Border Colors

- `.border-primary` - Primary border color
- `.border-secondary` - Secondary border color
- `.border-error` - Error border color
- `.border-warning` - Warning border color
- `.border-info` - Info border color
- `.border-success` - Success border color

### Spacing (Padding)

- `.p-unit` - Padding on all sides
- `.px-unit` - Horizontal padding
- `.py-unit` - Vertical padding
- `.pt-unit` - Top padding
- `.pr-unit` - Right padding
- `.pb-unit` - Bottom padding
- `.pl-unit` - Left padding

### Spacing (Margin)

- `.m-unit` - Margin on all sides
- `.mx-unit` - Horizontal margin
- `.my-unit` - Vertical margin
- `.mt-unit` - Top margin
- `.mr-unit` - Right margin
- `.mb-unit` - Bottom margin
- `.ml-unit` - Left margin
- `.gap-unit` - Gap for flex/grid

### Border Radius

- `.rounded` - Default border radius
- `.rounded-t` - Top border radius
- `.rounded-r` - Right border radius
- `.rounded-b` - Bottom border radius
- `.rounded-l` - Left border radius

## Usage Examples

### Basic Material-UI Components

```jsx
// Button with theme-aware Tailwind classes
<Button className="bg-primary text-primary-contrast px-unit py-unit rounded">
  Custom Button
</Button>

// Paper with border and background
<Paper className="bg-paper border-primary p-unit rounded" elevation={0}>
  <Typography className="text-primary">Themed content</Typography>
</Paper>

// Chip with theme colors
<Chip label="Primary" className="bg-primary text-primary-contrast" />
```

### Input Components

```jsx
<Input
  placeholder="Enter text"
  className="bg-paper text-primary border-primary rounded px-unit"
  slotProps={{
    input: {
      className: 'placeholder:text-secondary',
    },
  }}
/>
```

### Stack and Box

```jsx
<Stack className="gap-unit">
  <Box className="bg-info text-primary-contrast p-unit rounded">Info box</Box>
  <Box className="bg-success text-primary-contrast p-unit rounded">
    Success box
  </Box>
</Stack>
```

## Adding Custom Classes

To add more utility classes:

1. **Edit `global.css`**:

   ```css
   @layer utilities {
     .your-custom-class {
       /* Your styles using var(--your-token) */
     }
   }
   ```

2. **Rebuild if needed**:

   ```bash
   pnpm run build:tailwind
   ```

3. **Use in components**:
   ```jsx
   <Component className="your-custom-class" />
   ```

## Why This Approach?

### ✅ Advantages

1. **Theme Consistency** - All styles use your design tokens
2. **No Arbitrary Values** - Prevents `bg-red-500` or `text-blue-600`
3. **Automatic Updates** - Theme changes update all classes
4. **Type Safety** - Only defined classes work (no typos)
5. **CSS Layers** - Proper specificity with MUI components
6. **Performance** - Smaller CSS bundle (only what you define)

### 🚫 What's Disabled

- Default color utilities: `bg-red-500`, `text-blue-600`, etc.
- Default spacing scale: `p-4`, `m-8`, etc.
- Arbitrary values: `bg-[#123456]`, `p-[13px]`, etc.

### ✅ What's Enabled

- Your custom theme-based classes only
- Theme switching (Ocean, Sunset, Forest)
- Dark mode support
- Design token consistency

## Troubleshooting

### Classes Not Working?

1. Make sure you've run `pnpm run build:tailwind`
2. Check that the theme class is applied to `<html>`: `theme-theme-ocean`
3. Verify the class exists in `global.css`
4. Use browser DevTools to inspect CSS variable values

### MUI Styles Taking Precedence?

The `!important` flag in utility classes ensures they override MUI defaults. If needed, adjust CSS layer order in `global.css`:

```css
@layer theme, base, mui, components, utilities;
```

### Need More Utilities?

Add them to `global.css` using your theme variables:

```css
@layer utilities {
  .shadow-theme {
    box-shadow: 0 4px 6px var(--color-primary);
  }
}
```

## Best Practices

1. **Use theme classes** - Always use `.bg-primary` instead of inline colors
2. **Combine with MUI** - Mix Tailwind classes with MUI's `sx` prop when needed
3. **Keep it semantic** - Use `.text-error` for errors, `.bg-success` for success
4. **Test all themes** - Verify your styles work in Ocean, Sunset, and Forest
5. **Test dark mode** - Ensure proper contrast in both modes

## Build Commands

```bash
# Rebuild Tailwind theme files
pnpm run build:tailwind

# Full rebuild (Figma + Tailwind)
pnpm run build

# Development server
pnpm dev
```

## Learn More

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Material-UI Styling](https://mui.com/material-ui/customization/how-to-customize/)
- `MULTI_THEME_SETUP.md` - Theme switching setup
- `MUI_THEME_SETUP.md` - Material-UI configuration
