import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['./**/*.{js,ts}'],
    },
    {
        ignores: ['node_modules/', 'dist/'],
    },
    {
        languageOptions: { globals: globals.node },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
];
