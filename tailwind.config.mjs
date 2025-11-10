// tailwind.config.mjs
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    plugins: [require('@tailwindcss/typography')],
    content: [
        './src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}',
        './*.{astro,html,md,mdx}',
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                    },
                },
            },
        },
    },
}
