import { promises as fs } from 'node:fs';
import path from 'node:path';

const { log, error } = console;

/**
 * Generate Tailwind CSS v4 theme files from design tokens
 */
const generateTailwindThemes = async () => {
  try {
    log('🎨 Generating Tailwind CSS v4 theme files...\n');

    const inputPath = './figma-variables/figma-flattened.json';
    const outputDir = './dist/figma-variables/tailwind';

    // Read the flattened themes file
    const rawData = await fs.readFile(inputPath, 'utf-8');
    const themes = JSON.parse(rawData);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Generate individual theme files (one file per theme with both light and dark)
    const themeFiles = [];
    
    for (const [themeName, modes] of Object.entries(themes)) {
      log(`📦 Processing theme: ${themeName}`);
      
      const cssContent = generateTailwindThemeCSS(themeName, modes);
      const fileName = `${themeName}.css`;
      const filePath = path.join(outputDir, fileName);
      
      await fs.writeFile(filePath, cssContent, 'utf-8');
      themeFiles.push({ themeName, fileName });
      
      log(`  ✅ ${fileName} created (light + dark modes)`);
    }

    // Generate the main app.css file that imports all themes
    log('\n📝 Generating app.css with all theme imports...');
    const appCssContent = generateAppCSS(themeFiles, themes);
    await fs.writeFile(path.join(outputDir, 'app.css'), appCssContent, 'utf-8');
    
    log('✅ app.css created');
    log('\n✨ Tailwind theme files generated successfully!');
    log(`📁 Output directory: ${outputDir}\n`);
    
    // Log usage instructions
    logUsageInstructions();
    
  } catch (err) {
    error('❌ An error occurred while generating Tailwind themes:');
    error(err);
    process.exit(1);
  }
};

/**
 * Generate Tailwind CSS v4 theme file content with both light and dark modes
 */
function generateTailwindThemeCSS(themeName, modes) {
  // Generate light mode variables
  const lightVars = Object.entries(modes.light)
    .map(([key, token]) => {
      const cssVarName = `--${kebabCase(key)}`;
      const value = token.$value;
      
      // Convert dimension values to appropriate units
      let cssValue = value;
      if (token.$type === 'dimension' && typeof value === 'number') {
        cssValue = `${value}px`;
      }
      
      return `   ${cssVarName}: ${cssValue};`;
    })
    .join('\n');

  // Generate dark mode variables
  const darkVars = Object.entries(modes.dark)
    .map(([key, token]) => {
      const cssVarName = `--${kebabCase(key)}`;
      const value = token.$value;
      
      // Convert dimension values to appropriate units
      let cssValue = value;
      if (token.$type === 'dimension' && typeof value === 'number') {
        cssValue = `${value}px`;
      }
      
      return `   ${cssVarName}: ${cssValue};`;
    })
    .join('\n');

  return `/**
 * Tailwind CSS v4 Theme: ${themeName}
 * Auto-generated from design tokens
 */

.theme-${themeName} {
${lightVars}
}

.theme-${themeName}.dark {
${darkVars}
}
`;
}

/**
 * Generate the main app.css file that imports tailwind and all themes
 */
function generateAppCSS(themeFiles, themes) {
  const themeNames = Object.keys(themes);
  
  // Generate imports for all theme files
  const themeImports = themeFiles
    .map(({ fileName }) => `@import "./${fileName}";`)
    .join('\n');

  // Generate default theme inline variables that reference the imported theme
  const defaultTheme = themeNames[0];
  const defaultTokens = themes[defaultTheme].light;
  const inlineVars = Object.entries(defaultTokens)
    .map(([key]) => {
      const cssVarName = `--${kebabCase(key)}`;
      return `    ${cssVarName}: var(${cssVarName});`;
    })
    .join('\n');

  return `@import "tailwindcss";

/* Import all theme definitions */
${themeImports}

@custom-variant dark (&:is(.dark *));

@theme {
  --color-*: initial;
}

@theme inline {
${inlineVars}
}
`;
}

/**
 * Convert camelCase or snake_case to kebab-case
 */
function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Log usage instructions
 */
function logUsageInstructions() {
  log('📚 Usage Instructions:\n');
  log('1. Import the generated app.css in your main entry point:');
  log('   import "./dist/figma-variables/tailwind/app.css"\n');
  log('2. Apply theme classes to your root or any element:');
  log('   <html class="theme-ocean">\n');
  log('3. Toggle dark mode by adding the "dark" class:');
  log('   <html class="theme-ocean dark">\n');
  log('4. JavaScript theme switching:');
  log('   document.documentElement.className = "theme-sunset"');
  log('   document.documentElement.classList.toggle("dark")\n');
}

generateTailwindThemes();
