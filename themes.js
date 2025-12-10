import { createTheme } from '@mui/material/styles';
import * as forestDark from './dist/figma-variables/theme-forest/dark/ts/tokens.ts';
import * as forestLight from './dist/figma-variables/theme-forest/light/ts/tokens.ts';
import * as oceanDark from './dist/figma-variables/theme-ocean/dark/ts/tokens.ts';
import * as oceanLight from './dist/figma-variables/theme-ocean/light/ts/tokens.ts';
import * as sunsetDark from './dist/figma-variables/theme-sunset/dark/ts/tokens.ts';
import * as sunsetLight from './dist/figma-variables/theme-sunset/light/ts/tokens.ts';

/**
 * Create a Material-UI theme from design tokens
 * @param {Object} tokens - Design tokens object
 * @returns {import('@mui/material/styles').Theme}
 */
const createThemeFromTokens = (tokens) => {
  const spacingUnit = parseInt(tokens.spacingUnit);
  
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
      error: {
        main: tokens.error,
      },
      warning: {
        main: tokens.warning,
      },
      info: {
        main: tokens.info,
      },
      success: {
        main: tokens.success,
      },
      background: {
        default: tokens.backgroundDefault,
        paper: tokens.backgroundPaper,
      },
      text: {
        primary: tokens.textPrimary,
        secondary: tokens.textSecondary,
      },
    },
    spacing: spacingUnit,
    shape: {
      borderRadius: parseInt(tokens.borderRadius),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });
};

// Ocean Theme
export const oceanTheme = {
  light: createThemeFromTokens(oceanLight),
  dark: createThemeFromTokens(oceanDark),
};

// Sunset Theme
export const sunsetTheme = {
  light: createThemeFromTokens(sunsetLight),
  dark: createThemeFromTokens(sunsetDark),
};

// Forest Theme
export const forestTheme = {
  light: createThemeFromTokens(forestLight),
  dark: createThemeFromTokens(forestDark),
};

// All themes collection
export const themes = {
  ocean: oceanTheme,
  sunset: sunsetTheme,
  forest: forestTheme,
};

// Default export
export default themes;
