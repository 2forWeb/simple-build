import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['node_modules/', 'dist/', 'public/'],
    },
    {
        languageOptions: { globals: globals.node, sourceType: 'module' },
    },

    // JS/TS
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['src/client/**/*.{ts,vue}'],
        languageOptions: {
            globals: globals.browser,
            sourceType: 'module',
            parser: vueEslintParser,
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },

    ...pluginVue.configs['flat/recommended'],

    // Prettier
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
];
