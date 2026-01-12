import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['src/client/**/*.{js,ts,vue}'],
    },
    {
        ignores: ['node_modules/', 'dist/', 'public/', 'tests/'],
    },
    {
        languageOptions: { globals: globals.browser, sourceType: 'module' },
    },
    ...pluginVue.configs['flat/recommended'],
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
];
