import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

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
            },
        },
        define: {
            global: 'globalThis',
            // Keep the minimal process literals you added earlier:
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
})
