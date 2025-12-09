import { createTheme } from '@mui/material/styles';
import * as tokens from './dist/figma-variables/js/tokens.js';

/**
 * Material-UI theme configured with design tokens
 * Auto-generated tokens are imported and mapped to MUI theme structure
 */
const theme = createTheme({
  palette: {
    primary: {
      main: tokens.blue,
    },
    secondary: {
      main: tokens.pink,
    },
    background: {
      default: tokens.white,
      paper: tokens.white,
    },
    text: {
      primary: tokens.black,
      secondary: tokens.blue,
    },
  },
  spacing: (factor) => {
    // Base spacing unit using your small token (5px)
    // MUI default spacing is 8px, but we'll use your token as base
    const baseUnit = parseInt(tokens.small);
    return `${baseUnit * factor}px`;
  },
  shape: {
    borderRadius: parseInt(tokens.small),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Remove uppercase transformation
          paddingLeft: tokens.buttonPaddingHorizontal,
          paddingRight: tokens.buttonPaddingHorizontal,
          paddingTop: tokens.buttonPaddingVertical,
          paddingBottom: tokens.buttonPaddingVertical,
        },
        contained: {
          backgroundColor: tokens.buttonBackground,
          color: tokens.buttonForeground,
          '&:hover': {
            backgroundColor: tokens.blue,
            opacity: 0.9,
          },
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

export default theme;
