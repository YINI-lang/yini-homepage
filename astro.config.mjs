// astro.config.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import llmsTxt from './plugins/llms-txt.js'
import linkNormalizeYini from './plugins/remark-link-normalize-yini.js'

export default defineConfig({
    integrations: [
        mdx(),
        react(),
        sitemap({
            filter: (page) => !page.endsWith('/playground-use-yini/'),
        }),
        {
            name: 'format-sitemap',
            hooks: {
                'astro:build:done': async ({ dir }) => {
                    const sitemapFiles = (await readdir(dir)).filter((name) =>
                        /^sitemap-\d+\.xml$/.test(name),
                    )

                    for (const name of sitemapFiles) {
                        const file = new URL(name, dir)
                        const xml = await readFile(file, 'utf8')
                        const formattedXml = xml
                            .replace(
                                /(<\?xml[^>]*\?>|<urlset\b[^>]*>|<\/url>)\s*/g,
                                '$1\n',
                            )
                            .replace(/\s*$/, '\n')

                        await writeFile(file, formattedXml)
                    }
                },
            },
        },
        llmsTxt(),
    ],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-dom/client'],
        },
        resolve: {
            dedupe: ['react', 'react-dom'],
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
        build: {
            minify: false,
        },
    },
    markdown: {
        remarkPlugins: [remarkGfm, linkNormalizeYini],
        rehypePlugins: [rehypeSlug],
    },
    site: 'https://yini-lang.org',
    // IMPORTANT: Do NOT set "base" when using a custom domain.
})
