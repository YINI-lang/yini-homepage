import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import linkNormalizeYini from './plugins/remark-link-normalize-yini.js'

export default defineConfig({
    integrations: [mdx(), react()],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                // Route Node perf APIs to our browser shim
                'node:perf_hooks': fileURLToPath(
                    new URL('./src/shims/perf_hooks.ts', import.meta.url),
                ),
                perf_hooks: fileURLToPath(
                    new URL('./src/shims/perf_hooks.ts', import.meta.url),
                ),
                // route Node crypto imports to our browser shim
                'node:crypto': fileURLToPath(
                    new URL('./src/shims/crypto.ts', import.meta.url),
                ),
                crypto: fileURLToPath(
                    new URL('./src/shims/crypto.ts', import.meta.url),
                ),
            },
        },
        define: {
            global: 'globalThis',
            process: JSON.stringify({
                env: {},
                argv: [],
                browser: true,
                versions: {},
            }),
            'process.env': JSON.stringify({}),
            'process.argv': JSON.stringify([]),
        },
    },
    markdown: {
        remarkPlugins: [remarkGfm, linkNormalizeYini],
        rehypePlugins: [rehypeSlug],
    },
})
