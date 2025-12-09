import StyleDictionary from 'style-dictionary';
import logo from './misc/logo.js';

const { log, error } = console;

/**
 * Extract CLI arguments for source and output.
 * @returns {{ source: string, output: string }}
 */
const getCliArgs = () => {
  const args = process.argv.slice(2);
  const sourceArg = args.find((arg) => arg.startsWith('--source='));
  const outputArg = args.find((arg) => arg.startsWith('--output='));

  if (!sourceArg || !outputArg) {
    throw new Error('Missing required arguments: --source and --output');
  }

  const source = sourceArg.split('=')[1];
  const output = outputArg.split('=')[1];

  return { source, output };
};

/**
 * Function to create Style Dictionary configuration dynamically.
 * @param {string} source - The source file path.
 * @param {string} outputDir - The output directory path.
 * @returns {import('style-dictionary').Config}
 */
const createConfig = (source, outputDir) => ({
  source: [source],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['size/pxToRem'],
      basePxFontSize: 16,
      buildPath: `${outputDir}/css/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['size/pxToRem', 'name/kebab'],
      basePxFontSize: 16,
      buildPath: `${outputDir}/scss/`,
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      transforms: ['name/camel', 'size/px'],
      buildPath: `${outputDir}/js/`,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      transforms: ['name/camel', 'size/px'],
      buildPath: `${outputDir}/ts/`,
      files: [
        {
          format: 'typescript/es6-declarations',
          destination: 'tokens.d.ts',
          options: {
            outputStringLiterals: false,
          },
        },
      ],
    },
  },
});

/**
 * @async
 * @returns {Promise<void>}
 */
const init = async () => {
  try {
    log(logo);
    log('Initializing Style Dictionary...');

    const { source, output } = getCliArgs();

    log(`Source: ${source}`);
    log(`Output Directory: ${output}`);

    const styleDictionaryConfig = createConfig(source, output);
    const sd = new StyleDictionary(styleDictionaryConfig);

    await sd.hasInitialized;

    log('Cleaning all platforms...');
    await sd.cleanAllPlatforms();

    log('Building all platforms...');
    await sd.buildAllPlatforms();

    log('All platforms built successfully!');
  } catch (err) {
    error('An error occurred while running Style Dictionary:');
    error(err);
    process.exit(1);
  }
};

init();
