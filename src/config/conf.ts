const LATEST_YINI_SPEC_PDF_URL = '/specs/YINI-Specification-1.0.0-RC.3.pdf'

const CONFIG = {
    meta: {
        homepageURL: 'https://yini-lang.org/',
        author: 'Marko K. Seppänen',
    },
    text: {
        headline: [
            'YINI — A Human-Friendly Configuration Format',
            'YINI — Readable Like INI, Structured Like JSON',
            "YINI — Configuration Without YAML's Surprises",
            'YINI — A Predictable Format for Real-World Configs',
            'YINI — Structured Configuration That Stays Readable',
            'YINI — Clean, Calm Configuration for Complex Systems',
            'YINI — Simple to Read, Structured by Design',
            'YINI — Configuration with Clear Rules',
            'YINI — A Better Way to Write Configuration Files',
            'YINI — Configuration That Grows Without the Pain',
        ],
        tagLine:
            //'INI-familiar syntax with nesting, comments, and clear, simple rules.',
            'Human-readable configuration files with clear structure.',
        elevatorPitch:
            //'YINI is a human-friendly configuration format — like INI, but with nested structures, clear rules, and zero ambiguity.',
            //'YINI is a human-friendly config format—familiar like INI, with clear nesting, predictable rules, and a formal spec.',
            //'The YINI config format is a modern, structured, and human-friendly configuration language designed to bridge the gap between the simplicity of INI and the expressiveness of YAML, and even more.',
            //'YINI is an INI-inspired configuration format designed for clarity and predictability. It supports nesting, comments, and a formally defined syntax—so configuration files stay easy to read and reason about as they grow.',
            //"YINI is a human-friendly data format for complex systems: readable like INI, structured like JSON, without YAML's surprises. It offers clear nesting, comments, and predictable parsing, so your configuration stays easy to read and reason about as it grows.",
            "YINI is a human-friendly, text-based data format for software projects: readable like INI, structured like JSON, without YAML's surprises. It offers clear nesting, comments, and predictable parsing, so your configuration stays easy to read and reason about as it grows. Suitable for configuration files, application settings, and general data storage.",
    },
    siteLinks: {
        // The "hero" (heroic attention-grabber) links.
        hero: {
            home: {
                url: '/',
                title: 'Home – YINI homepage',
            },
            getStarted: {
                url: '/get-started',
                title: 'Start exploring the YINI format.',
            },
            playground: {
                url: '/playground',
                title: 'Experiment with YINI directly in your browser.',
            },
            tutorial: {
                url: '/yini-tutorial',
                title: 'Get a quick overview of YINI syntax and structure.',
            },
            examples: {
                url: '/yini-code-examples',
                title: 'Practical YINI configuration examples.',
            },
            spec: {
                url: '/specification',
                title: 'Read the full YINI specification and syntax reference.',
            },
            faq: {
                url: '/yini-faq',
                title: 'Read frequently asked questions about YINI.',
            },
        },
        secondary: {
            introToYiniFormat: {
                url: '/intro-yini-config-format',
                title: 'Learn what YINI is and how the format works.',
            },
            advancedExamples: {
                url: '/yini-advanced-examples',
                title: 'These examples show optional syntax, edge cases, and power feature.',
            },
            about: { url: '/about-yini', title: "Who's behind YINI" },
        },
        specPdf: { url: LATEST_YINI_SPEC_PDF_URL, title: '' },
    },
    urls: {
        external: {
            specOnGitHubAtProd:
                'https://github.com/YINI-lang/YINI-spec/blob/production/YINI-Specification.md',
            useIt: {
                npmYiniCli: 'https://www.npmjs.com/package/yini-cli',
                npmYiniParser: 'https://www.npmjs.com/package/yini-parser',
            },
            gitHub: {
                // GitHub Organization.
                yiniOrg: 'https://github.com/YINI-lang',
                // GitHub Repos.
                yiniCli: 'https://github.com/YINI-lang/yini-cli',
                yiniParserTs:
                    'https://github.com/YINI-lang/yini-parser-typescript',
                yiniDemoApps: 'https://github.com/YINI-lang/yini-demo-apps',
                yiniSyntax: 'https://github.com/YINI-lang/syntax-highlighting',
                yiniHomepage: 'https://github.com/YINI-lang/yini-homepage',
                yiniSpec: 'https://github.com/YINI-lang/YINI-spec',
            },
            discussions: {
                yiniLang: 'https://github.com/orgs/YINI-lang/discussions',
                yiniCli: 'https://github.com/YINI-lang/yini-cli/discussions',
                yiniParserTs:
                    'https://github.com/YINI-lang/yini-parser-typescript/discussions',
                yiniHomepage:
                    'https://github.com/YINI-lang/yini-homepage/discussions',
            },
        },
    },
} as const

export default CONFIG
