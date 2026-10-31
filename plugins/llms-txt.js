import { writeFile } from 'node:fs/promises'

// Descriptions help agents decide whether to open each link.
// Use one to three information-dense sentences about the page's contents and use case.
const sections = [
    {
        title: 'Start here',
        links: [
            {
                title: 'What is YINI?',
                path: '/start/what-is-yini-and-why/',
                description:
                    'Explains what YINI is, why it uses explicit section markers, and how it relates to other configuration formats. Start here for project context.',
            },
            {
                title: 'Get started',
                path: '/use-yini/get-started/',
                description:
                    'Step-by-step terminal setup for creating a .yini file and parsing it with the YINI CLI. Use for first-run commands.',
            },
            {
                title: 'Quick tutorial',
                path: '/learn-yini/quick-tutorial/',
                description:
                    'A short hands-on lesson covering sections, keys, nested sections, lists, and validation. Use for a first syntax walkthrough.',
            },
            {
                title: 'Learn the YINI format',
                path: '/learn-yini/learn-yini-config-format/',
                description:
                    'A longer walkthrough of sections, values, nesting, comments, and strict versus lenient parsing. Use for explanations beyond the quick tutorial.',
            },
            {
                title: 'Examples',
                path: '/learn-yini/examples/',
                description:
                    'An index of YINI samples, from minimal snippets to larger configurations, grouped by topic. Use to find concrete syntax patterns.',
            },
        ],
    },
    {
        title: 'Reference',
        links: [
            {
                title: 'Specification',
                path: '/refs/specification/',
                description:
                    'The authoritative reference for YINI syntax and parsing behavior, including section markers, values, and parser modes. Use for exact semantics.',
            },
            {
                title: 'Cheat sheet',
                path: '/refs/yini-cheat-sheet/',
                description:
                    'A compact syntax reference with examples for section markers, strings, lists, objects, comments, and key rules. Use for quick lookups.',
            },
            {
                title: 'FAQ',
                path: '/refs/yini-faq/',
                description:
                    'Topic-grouped answers about YINI structure, syntax, formatting, values, and practical use. Use for common questions before opening the full specification.',
            },
        ],
    },
    {
        title: 'Tools',
        links: [
            {
                title: 'YINI CLI',
                path: '/tools/yini-cli/',
                description:
                    'Installation and everyday commands for validating, parsing, and converting YINI files. Use when working with the command-line tool.',
            },
            {
                title: 'YINI CLI manual',
                path: '/tools/yini-cli/manual/',
                description:
                    'CLI help output with command options and examples. Use for exact flag names and invocation details.',
            },
            {
                title: 'Parsers',
                path: '/tools/yini-parsers/',
                description:
                    'Overview of TypeScript, Python, and Go parsers for loading YINI into application data. Use when choosing a language implementation.',
            },
            {
                title: 'Parser test suite',
                path: '/tools/yini-test-suite/',
                description:
                    'Explains the shared test cases and CLI used to check parser behavior. Use when implementing or reviewing a YINI parser.',
            },
            {
                title: 'Playground',
                path: '/playground/',
                description:
                    'Browser editor for trying YINI snippets and inspecting parsed JSON or JavaScript objects. Use for interactive experiments without local installation.',
            },
        ],
    },
    {
        title: 'Optional',
        links: [
            {
                title: 'Design rationale',
                path: '/refs/rationale/',
                description:
                    'Background on YINI design goals and trade-offs, including its approach to readability and structure. Use to understand why rules were chosen.',
            },
            {
                title: 'Tools and downloads',
                path: '/use-yini/get-yini-tools/',
                description:
                    'Directory of YINI tools, parsers, syntax highlighting, and related resources with installation or source links. Use when selecting software to work with YINI.',
            },
        ],
    },
]

export default function llmsTxt() {
    let site

    return {
        name: 'llms-txt',
        hooks: {
            'astro:config:done': ({ config }) => {
                site = config.site
            },
            'astro:build:done': async ({ dir, pages }) => {
                if (!site) {
                    throw new Error(
                        'The llms.txt integration requires a site URL',
                    )
                }

                const builtPaths = new Set(
                    pages.map(({ pathname }) => {
                        const path = pathname.replace(/^\/+|\/+$/g, '')
                        return path ? `/${path}/` : '/'
                    }),
                )
                const lines = [
                    '# YINI',
                    '',
                    '> YINI is a human-friendly, INI-inspired configuration format with explicit structure, nested sections, and predictable parsing.',
                    '',
                    'The specification is the authoritative reference for syntax and parsing behavior. Start with the guides for a shorter introduction.',
                    '',
                ]

                for (const section of sections) {
                    lines.push(`## ${section.title}`, '')

                    for (const link of section.links) {
                        if (!builtPaths.has(link.path)) {
                            throw new Error(
                                `llms.txt links to a missing page: ${link.path}`,
                            )
                        }

                        const url = new URL(link.path, site)
                        lines.push(
                            `- [${link.title}](${url}): ${link.description}`,
                        )
                    }

                    lines.push('')
                }

                await writeFile(new URL('llms.txt', dir), lines.join('\n'))
            },
        },
    }
}
