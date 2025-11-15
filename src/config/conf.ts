const LATEST_YINI_SPEC_PDF = '/specs/YINI-Specification-1.0.0-RC.3.pdf'

const CONFIG = {
    meta: {
        author: 'Marko K. Seppänen',
    },
    text: {
        headline: 'YINI — Simple, Structured Config',
        tagLine:
            'INI-familiar syntax with nesting, comments, and clear, simple rules.',
        elevatorPitch:
            //'YINI is a human-friendly configuration format — like INI, but with nested structures, clear rules, and zero ambiguity.',
            //'YINI is a human-friendly config format—familiar like INI, with clear nesting, predictable rules, and a formal spec.',
            'The YINI config format is a modern, structured, and human-friendly configuration language designed to bridge the gap between the simplicity of INI and the expressiveness of YAML, and even more.',
    },
    urls: {
        // The "hero" (heroic attention-grabber) links.
        hero: {
            home: '/',
            getStarted: '/get-started',
            playground: '/playground',
            tutorial: '/yini-tutorial',
            faq: '/yini-faq',
            spec: '/specification',
        },
        links: {
            introToYiniFormat: '/intro-yini-config-format',
            about: '/about-yini',
        },
        specPdf: LATEST_YINI_SPEC_PDF,
        specOnGitHubAtProd:
            'https://github.com/YINI-lang/YINI-spec/blob/production/YINI-Specification.md',
        external: {
            useIt: {
                npmYiniCli: 'https://www.npmjs.com/package/yini-cli',
                npmYiniParser: 'https://www.npmjs.com/package/yini-parser',
            },
            gitHub: {
                // GitHub Organization.
                yiniOrg: 'https://github.com/YINI-lang',
                // GitHub Repos.
                yiniCli: 'https://github.com/YINI-lang/yini-cli',
                yiniParser:
                    'https://github.com/YINI-lang/yini-parser-typescript',
                yiniDemoApps: 'https://github.com/YINI-lang/yini-demo-apps',
                yiniSyntax: 'https://github.com/YINI-lang/syntax-highlighting',
                yiniHomepage: 'https://github.com/YINI-lang/yini-homepage',
                yiniSpec: 'https://github.com/YINI-lang/YINI-spec',
            },
        },
    },
} as const

export default CONFIG
