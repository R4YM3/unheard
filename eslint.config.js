import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['.astro/', 'dist/', 'node_modules/', 'references/'] },
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        URL: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Astro inline scripts are rendered as expression children by its processor.
    // Their immediately-invoked browser enhancements are intentional.
    rules: { '@typescript-eslint/no-unused-expressions': 'off' },
  },
  {
    files: ['scripts/**/*.mjs', 'test/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },
];
