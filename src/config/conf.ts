const LATEST_YINI_SPEC_PDF = '/specs/YINI-Specification-1.0.0-RC.3.pdf'

const CONFIG = {
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
            // GitHub repos.
            gitHub: {
                yiniCli: 'https://github.com/YINI-lang/yini-cli',
                yiniParser:
                    'https://github.com/YINI-lang/yini-parser-typescript',
                yiniDemoApps: 'https://github.com/YINI-lang/yini-demo-apps',
                yiniSyntax: 'https://github.com/YINI-lang/yini-syntax',
                yiniSpec: 'https://github.com/YINI-lang/YINI-spec',
            },
        },
    },
} as const

export default CONFIG
