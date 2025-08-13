module.exports = {
    root: true,
    env: { es2022: true, node: true, browser: true },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: false,
    },
    settings: {
        react: { version: 'detect' },
    },
    overrides: [
        // TypeScript & React
        {
            files: ['**/*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'react'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
            ],
            rules: {
                'react/react-in-jsx-scope': 'off', // not needed with modern React
            },
        },
        // Astro files
        {
            files: ['**/*.astro'],
            // Parse the frontmatter & template
            parser: 'astro-eslint-parser',
            parserOptions: {
                // Let ESLint use TS rules inside <script> blocks
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            extends: ['plugin:astro/recommended'],
            rules: {},
        },
        // (Optional) MDX files
        {
            files: ['**/*.mdx'],
            extends: ['plugin:mdx/recommended'],
        },
    ],
    ignorePatterns: ['dist/', '.astro/', 'node_modules/'],
}
