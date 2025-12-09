import { readFile } from 'fs/promises';
import path from 'path';
import { expect, describe, it } from 'vitest';

const BUILD_PATH = './dist';
const tokenTypes = ['figma-variables', 'token-studio'];
const formats = ['css', 'scss', 'js', 'ts'];

describe('Token Build Snapshot Tests', () => {
  it.each(
    tokenTypes.flatMap((tokenType) =>
      formats.map((format) => ({
        tokenType,
        format,
        fileExtension: format === 'ts' ? 'd.ts' : format,
      }))
    )
  )(
    'should match the snapshot for $tokenType $format tokens',
    async ({ tokenType, format, fileExtension }) => {
      const tokenFilePath = path.join(
        BUILD_PATH,
        tokenType,
        format,
        `tokens.${fileExtension}`
      );
      const tokenFileContent = await readFile(tokenFilePath, 'utf-8');
      expect(tokenFileContent).toMatchSnapshot();
    }
  );
});
