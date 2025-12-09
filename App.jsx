import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import themes from './themes';

/**
 * App component with theme switcher
 * Demonstrates all 3 themes (Ocean, Sunset, Forest) with light/dark modes
 */
function App() {
  const [selectedTheme, setSelectedTheme] = useState('ocean');
  const [mode, setMode] = useState('light');

  // Get current theme based on selection
  const currentTheme = useMemo(() => {
    return themes[selectedTheme][mode];
  }, [selectedTheme, mode]);

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      setSelectedTheme(newTheme);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          py: 4,
          backgroundColor: 'background.default',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            {/* Header with Theme Controls */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  Multi-Theme Material-UI Demo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Design tokens powered by Figma variables
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <ToggleButtonGroup
                  value={selectedTheme}
                  exclusive
                  onChange={handleThemeChange}
                  size="small"
                  color="primary"
                >
                  <ToggleButton value="ocean">Ocean</ToggleButton>
                  <ToggleButton value="sunset">Sunset</ToggleButton>
                  <ToggleButton value="forest">Forest</ToggleButton>
                </ToggleButtonGroup>

                <Button 
                  onClick={toggleMode} 
                  variant="outlined" 
                  size="small"
                  sx={{ minWidth: '100px' }}
                >
                  {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
                </Button>
              </Stack>
            </Paper>

            {/* Current Theme Info */}
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Typography variant="h6">Current Theme:</Typography>
                  <Chip
                    label={`${selectedTheme.toUpperCase()} - ${mode.toUpperCase()}`}
                    color="primary"
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Switch between themes and modes to see the design tokens in action.
                  Each theme has been generated from Figma variables.
                </Typography>
              </CardContent>
            </Card>

            {/* Button Variants */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Button Variants
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="contained">Contained</Button>
                  <Button variant="contained" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="outlined" color="secondary">
                    Outlined Secondary
                  </Button>
                  <Button variant="text">Text</Button>
                  <Button variant="text" color="secondary">
                    Text Secondary
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Color States */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Semantic Colors
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="contained" color="error">
                    Error
                  </Button>
                  <Button variant="contained" color="warning">
                    Warning
                  </Button>
                  <Button variant="contained" color="info">
                    Info
                  </Button>
                  <Button variant="contained" color="success">
                    Success
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Typography & Colors */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Typography
                </Typography>
                <Stack spacing={2}>
                  <Typography variant="h3" color="primary">
                    Heading 3 - Primary Color
                  </Typography>
                  <Typography variant="h5" color="secondary">
                    Heading 5 - Secondary Color
                  </Typography>
                  <Typography variant="body1">
                    Body text using primary text color from design tokens.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Secondary body text with reduced emphasis.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            {/* Spacing & Shape Demo */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Ocean Card
                  </Typography>
                  <Typography variant="body2">
                    Card with themed spacing and border radius from design tokens.
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    Sunset Card
                  </Typography>
                  <Typography variant="body2">
                    All spacing values are driven by the spacingUnit token.
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" color="success.main" gutterBottom>
                    Forest Card
                  </Typography>
                  <Typography variant="body2">
                    Border radius adapts to each theme's design language.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Custom Styled Box */}
            <Box
              sx={{
                p: 4,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Custom Component
              </Typography>
              <Typography variant="body1">
                This box uses the primary color and its contrast text from the current
                theme's design tokens.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
