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
            'Human-readable configuration files with clear structure and predictable parsing.',
        elevatorPitch:
            //'YINI is a human-friendly configuration format — like INI, but with nested structures, clear rules, and zero ambiguity.',
            //'YINI is a human-friendly config format—familiar like INI, with clear nesting, predictable rules, and a formal spec.',
            //'The YINI config format is a modern, structured, and human-friendly configuration language designed to bridge the gap between the simplicity of INI and the expressiveness of YAML, and even more.',
            //'YINI is an INI-inspired configuration format designed for clarity and predictability. It supports nesting, comments, and a formally defined syntax—so configuration files stay easy to read and reason about as they grow.',
            //"YINI is a human-friendly data format for complex systems: readable like INI, structured like JSON, without YAML's surprises. It offers clear nesting, comments, and predictable parsing, so your configuration stays easy to read and reason about as it grows.",
            "YINI is a human-friendly, INI-inspired text-based configuration format for software projects: readable like INI, structured like JSON, without YAML's surprises. It offers clear nesting, comments, and predictable parsing, so your configuration stays easy to read and reason about as it grows. Suitable for configuration files, application settings, and general data storage.",
    },
    siteLinks: {
        // The "hero" (heroic attention-grabber) Top-Menu links.
        hero: {
            home: {
                url: '/',
                title: 'Home – YINI homepage',
            },
            getStarted: {
                url: '/use-yini/get-started',
                title: 'Start exploring the YINI format.',
            },
            playground: {
                url: '/playground',
                title: 'Experiment with YINI directly in your browser.',
            },
            tutorial: {
                url: '/learn-yini/quick-tutorial',
                title: 'A 5-minute guided walkthrough of YINI.',
            },
            examples: {
                url: '/learn-yini/examples/',
                title: 'Practical YINI configuration examples.',
            },
            spec: {
                url: '/refs/specification',
                title: 'Read the full YINI specification and syntax reference.',
            },
            faq: {
                url: '/refs/yini-faq',
                title: 'Read frequently asked questions about YINI.',
            },
        },
        // The "navigation" (Left-Menu) links.
        navMenu: {
            intro: {
                whatIsYINIAndWhy: {
                    url: '/intro/what-is-yini-and-why',
                    title: 'Learn what YINI is and why it exists.',
                },
            },
            learnYini: {
                learnYiniFormat: {
                    url: '/learn-yini/learn-yini-config-format',
                    title: 'Learn what YINI is and how the format works.',
                },
                quickTutorial: {
                    url: '/learn-yini/quick-tutorial',
                    title: 'A 5-minute guided walkthrough of YINI.',
                },
                examples: {
                    index: {
                        url: '/learn-yini/examples/',
                        title: 'Practical YINI configuration examples.',
                    },
                    basic: {
                        url: '/learn-yini/examples/basic',
                        title: 'Core and practical YINI config examples.',
                    },
                    common: {
                        url: '/learn-yini/examples/common',
                        title: 'Common real-world examples.',
                    },
                    advanced: {
                        url: '/learn-yini/examples/advanced',
                        title: 'Optional syntax, edge cases, and power features.',
                    },
                    large: {
                        url: '/learn-yini/examples/large',
                        title: 'Large YINI configuration examples.',
                    },
                },
            },
            useYini: {
                getStarted: {
                    url: '/use-yini/get-started',
                    title: 'Start exploring the YINI format.',
                },
                getYINITools: {
                    url: '/use-yini/get-yini-tools',
                    title: 'Get YINI parsers, tools, and related implementations across different languages and platforms.',
                },
            },
            refs: {
                faq: {
                    url: '/refs/yini-faq',
                    title: 'Read frequently asked questions about YINI.',
                },
                spec: {
                    url: '/refs/specification',
                    title: 'Formal YINI specification and syntax reference.',
                },
                cheatSheet: {
                    url: '/learn-yini/yini-cheat-sheet',
                    title: 'A quick reference for writing clean, readable YINI configuration files.',
                },
            },
            metaInfo: {
                about: {
                    url: '/info/about-yini',
                    title: "Who's behind YINI",
                },
            },
        },
        // deprecated, use the one above in navMenu
        legacySecondary: {
            introToYiniFormat: {
                url: '/intro-yini-config-format',
                title: 'Learn what YINI is and how the format works.',
            },
            cheatSheet: {
                url: '/learn-yini/yini-cheat-sheet',
                title: 'A quick reference for writing clean, readable YINI configuration files.',
            },
            getYINITools: {
                url: '/yini-getYINITools',
                title: 'Get YINI parsers, tools, and related implementations across different languages and platforms.',
            },
            advancedExamples: {
                url: '/learn-yini/examples/advanced',
                title: 'These examples show optional syntax, edge cases, and power features.',
            },
            about: { url: '/info/about-yini', title: "Who's behind YINI" },
        },
        specPdf: {
            url: LATEST_YINI_SPEC_PDF_URL,
            title: 'Download the latest YINI specification (PDF)',
        },
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
            yiniWiki: {
                getYINITools:
                    'https://github.com/YINI-lang/YINI-spec/wiki/Get-YINI-Tools',
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
