import CONFIG from './conf'

export interface PageEndingLink {
    label: string
    href: string
    description?: string
}

type PageEndingLinkMap = Record<string, readonly PageEndingLink[]>

export function normalizePagePath(path: string): string {
    const cleanPath = path.split(/[?#]/)[0] ?? '/'

    if (cleanPath === '/') return '/'

    return `/${cleanPath.replace(/^\/|\/$/g, '')}/`
}

const siteLinks = CONFIG.siteLinks
const heroLinks = siteLinks.hero
const navLinks = siteLinks.navMenu
const learnYiniLinks = navLinks.learnYini
const exampleLinks = learnYiniLinks.examples
const useYiniLinks = navLinks.useYini
const refLinks = navLinks.refs
const toolLinks = navLinks.tools
const infoLinks = navLinks.metaInfo

const routes = {
    playground: heroLinks.playground.url,
    playgroundUseYini: '/playground-use-yini',
    getStarted: useYiniLinks.getStarted.url,
    getYiniTools: useYiniLinks.getYINITools.url,
    ciWithYiniCli: '/use-yini/ci-with-yini-cli',
    quickTutorial: learnYiniLinks.quickTutorial.url,
    learnYiniFormat: learnYiniLinks.learnYiniFormat.url,
    examples: exampleLinks.index.url,
    examplesCore: exampleLinks.core.url,
    examplesCommon: exampleLinks.common.url,
    examplesIndentation: exampleLinks.indentation.url,
    examplesValues: exampleLinks.values.url,
    examplesLarge: exampleLinks.large.url,
    examplesAdvanced: exampleLinks.advanced.url,
    yiniCli: toolLinks.yiniCli.url,
    yiniCliManual: '/tools/yini-cli/manual',
    yiniParsers: useYiniLinks.yiniParsers.url,
    parserTS: toolLinks.parserTS.url,
    parserPython: toolLinks.parserPython.url,
    yiniTestSuite: toolLinks.yiniTestSuite.url,
    cheatSheet: refLinks.cheatSheet.url,
    faq: refLinks.faq.url,
    specification: refLinks.spec.url,
    about: infoLinks.about.url,
    assets: infoLinks.assets.url,
}

const pathKey = (path: string): string => normalizePagePath(path)

export const pageEndingLinks: PageEndingLinkMap = {
    default: [
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create your first YINI file and parse it locally.',
        },
        {
            label: 'Try the Playground',
            href: routes.playground,
            description: 'Experiment with YINI in the browser.',
        },
    ],
    [pathKey(routes.playground)]: [
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'How to install/use YINI in a project.',
        },
        {
            label: 'Quick Tutorial',
            href: routes.quickTutorial,
            description: 'Learn the YINI syntax in a few minutes.',
        },
        {
            label: 'YINI Examples',
            href: routes.examples,
            description: 'Browse small and real-world YINI configurations.',
        },
    ],
    [pathKey(routes.playgroundUseYini)]: [
        {
            label: 'YINI Playground',
            href: routes.playground,
            description: 'Use the current browser playground.',
        },
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create and parse a local YINI file.',
        },
    ],
    [pathKey(routes.getStarted)]: [
        {
            label: 'Quick Tutorial',
            href: routes.quickTutorial,
            description: 'Walk through the core YINI ideas in a few minutes.',
        },
        {
            label: 'YINI Examples',
            href: routes.examples,
            description:
                'Study practical YINI files from small to larger configs.',
        },
        {
            label: 'YINI CLI',
            href: routes.yiniCli,
            description:
                'Learn the command-line options after the first parse.',
        },
    ],
    [pathKey(routes.getYiniTools)]: [
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create your first YINI file and parse it locally.',
        },
        {
            label: 'Try the Playground',
            href: routes.playground,
            description: 'Experiment with YINI before installing a tool.',
        },
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Read the formal syntax and behavior rules.',
        },
    ],
    [pathKey(routes.ciWithYiniCli)]: [
        {
            label: 'YINI CLI',
            href: routes.yiniCli,
            description: 'Review the CLI commands used in CI workflows.',
        },
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Check the formal parsing rules behind validation.',
        },
    ],
    [pathKey(routes.quickTutorial)]: [
        {
            label: 'YINI Examples',
            href: routes.examples,
            description:
                'See the syntax used in practical configuration files.',
        },
        {
            label: 'YINI Playground',
            href: routes.playground,
            description: 'Try the tutorial examples directly in the browser.',
        },
        {
            label: 'Learn the YINI Format',
            href: routes.learnYiniFormat,
            description: 'Read the deeper guide to syntax and structure.',
        },
    ],
    [pathKey(routes.learnYiniFormat)]: [
        {
            label: 'YINI Examples',
            href: routes.examples,
            description:
                'See the syntax used in practical configuration files.',
        },
        {
            label: 'YINI Cheat Sheet',
            href: routes.cheatSheet,
            description: 'Use a compact reference for day-to-day syntax.',
        },
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Read the formal language rules.',
        },
    ],
    [pathKey(routes.examples)]: [
        {
            label: 'Core YINI Examples',
            href: routes.examplesCore,
            description:
                'Start with small examples of sections, keys, and values.',
        },
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description:
                'Move from basic syntax to everyday configuration patterns.',
        },
    ],
    [pathKey(routes.examplesCore)]: [
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description: 'Move from small examples to everyday configurations.',
        },
        {
            label: 'Value Literal Examples',
            href: routes.examplesValues,
            description:
                'Compare strings, booleans, numbers, and related values.',
        },
        {
            label: 'Indentation Examples',
            href: routes.examplesIndentation,
            description: 'See how section markers define structure.',
        },
    ],
    [pathKey(routes.examplesCommon)]: [
        {
            label: 'Large Examples',
            href: routes.examplesLarge,
            description: 'See how YINI reads in bigger configuration files.',
        },
        {
            label: 'Advanced Examples',
            href: routes.examplesAdvanced,
            description:
                'Explore optional syntax and more demanding configuration cases.',
        },
    ],
    [pathKey(routes.examplesIndentation)]: [
        {
            label: 'Core YINI Examples',
            href: routes.examplesCore,
            description: 'Review the core syntax and smaller examples.',
        },
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description: 'See everyday configuration patterns.',
        },
    ],
    [pathKey(routes.examplesValues)]: [
        {
            label: 'Core YINI Examples',
            href: routes.examplesCore,
            description: 'Return to the basic syntax in complete examples.',
        },
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description: 'See these value forms in practical configurations.',
        },
    ],
    [pathKey(routes.examplesLarge)]: [
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description:
                'Compare large configs with everyday project settings.',
        },
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Check the formal rules behind larger files.',
        },
    ],
    [pathKey(routes.examplesAdvanced)]: [
        {
            label: 'Common Real-world Examples',
            href: routes.examplesCommon,
            description: 'Return to everyday configuration examples.',
        },
        {
            label: 'Core YINI Examples',
            href: routes.examplesCore,
            description: 'Review the smaller examples and core syntax.',
        },
    ],
    [pathKey(routes.yiniCli)]: [
        {
            label: 'YINI CLI Command Reference',
            href: routes.yiniCliManual,
            description:
                'Read the generated command help and option reference.',
        },
        {
            label: 'Use YINI CLI in CI',
            href: routes.ciWithYiniCli,
            description: 'Run validation automatically in project workflows.',
        },
        {
            label: 'YINI Parsers',
            href: routes.yiniParsers,
            description: 'Load YINI directly from application code.',
        },
    ],
    [pathKey(routes.yiniCliManual)]: [
        {
            label: 'YINI CLI',
            href: routes.yiniCli,
            description: 'Return to the friendlier CLI overview.',
        },
        {
            label: 'Use YINI CLI in CI',
            href: routes.ciWithYiniCli,
            description: 'Use the CLI commands in automated checks.',
        },
    ],
    [pathKey(routes.yiniParsers)]: [
        {
            label: 'TypeScript / JavaScript Parser',
            href: routes.parserTS,
            description: 'Use the primary YINI parser in Node.js projects.',
        },
        {
            label: 'Python Parser',
            href: routes.parserPython,
            description: 'Load YINI configuration files in Python.',
        },
    ],
    [pathKey(routes.parserTS)]: [
        {
            label: 'YINI CLI',
            href: routes.yiniCli,
            description: 'Validate and convert YINI files from the terminal.',
        },
        {
            label: 'YINI Parsers',
            href: routes.yiniParsers,
            description: 'Compare the official parser options.',
        },
    ],
    [pathKey(routes.parserPython)]: [
        {
            label: 'YINI CLI',
            href: routes.yiniCli,
            description: 'Validate and convert YINI files from the terminal.',
        },
        {
            label: 'YINI Parsers',
            href: routes.yiniParsers,
            description: 'Compare the official parser options.',
        },
    ],
    [pathKey(routes.yiniTestSuite)]: [
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Check the language rules parser tests are based on.',
        },
        {
            label: 'YINI Parsers',
            href: routes.yiniParsers,
            description: 'Review the official parser implementations.',
        },
    ],
    [pathKey(routes.cheatSheet)]: [
        {
            label: 'YINI Examples',
            href: routes.examples,
            description: 'Explore practical configurations using the syntax.',
        },
        {
            label: 'Get YINI Tools',
            href: routes.getYiniTools,
            description: 'Find the CLI, parsers, and editor tooling.',
        },
    ],
    [pathKey(routes.faq)]: [
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create your first YINI file and parse it locally.',
        },
        {
            label: 'YINI Specification',
            href: routes.specification,
            description: 'Read the formal syntax and behavior rules.',
        },
    ],
    [pathKey(routes.specification)]: [
        {
            label: 'Try the Playground',
            href: routes.playground,
            description: 'Experiment with YINI syntax in the browser.',
        },
        {
            label: 'YINI Cheat Sheet',
            href: routes.cheatSheet,
            description: 'Use a compact reference for day-to-day syntax.',
        },
    ],
    [pathKey(routes.about)]: [
        {
            label: 'FAQ',
            href: routes.faq,
            description: 'Read common questions, rules, and project context.',
        },
        {
            label: 'YINI Logos & Assets',
            href: routes.assets,
            description: 'Find logos, favicons, and media kit materials.',
        },
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create your first YINI file and parse it locally.',
        },
    ],
    [pathKey(routes.assets)]: [
        {
            label: 'About YINI',
            href: routes.about,
            description: 'Read project background and status.',
        },
        {
            label: 'Get Started',
            href: routes.getStarted,
            description: 'Create your first YINI file and parse it locally.',
        },
    ],
}

export function getPageEndingLinks(
    currentPath: string,
    maxLinks: 2 | 3 = 3,
): PageEndingLink[] {
    const path = normalizePagePath(currentPath)
    const links = pageEndingLinks[path] ?? pageEndingLinks.default

    return links
        .filter((link) => normalizePagePath(link.href) !== path)
        .slice(0, maxLinks)
}
