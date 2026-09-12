import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import astro from 'eslint-plugin-astro'
import * as mdx from 'eslint-mdx'
import react from 'eslint-plugin-react'
import globals from 'globals'

const tsFiles = ['**/*.{ts,tsx}']
const reactFiles = ['**/*.{jsx,tsx}']

export default [
    {
        ignores: ['dist/', '.astro/', 'node_modules/'],
    },
    {
        files: ['**/*.{js,mjs}'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
    },
    {
        files: ['**/*.cjs'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: globals.node,
        },
    },
    {
        files: tsFiles,
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs['flat/recommended'][1].rules,
            ...tsPlugin.configs['flat/recommended'][2].rules,
        },
    },
    {
        files: reactFiles,
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'],
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    ...astro.configs['flat/recommended'],
    {
        files: ['**/*.astro/*.{js,ts}'],
        rules: {
            'prefer-rest-params': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    {
        files: ['**/*.mdx'],
        languageOptions: {
            parser: mdx.parser,
            globals: globals.browser,
        },
    },
]
