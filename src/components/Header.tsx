import React, { useEffect, useState } from 'react'
import CONFIG from '../config/conf'

type HeaderProps = {
    isProd: boolean
}

type NavLinksProps = { variant?: 'mobile' | 'desktop' }
const maxWidthMobile: number = 767

// ---- Hook: media query -------------------------------------------------------
/**
 * React hook that tells you whether a given CSS media query currently matches.
 *   Useful for rendering different components/markup at specific breakpoints
 *   (e.g., mobile vs desktop) or honoring user preferences.
 * Example:
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 *   return isMobile ? <MobileHeader /> : <DesktopHeader />;
 */
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia(query)
        const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
            setMatches(
                'matches' in e ? e.matches : (e as MediaQueryList).matches,
            )

        // Set initial on mount (in case initialValue differs).
        setMatches(mql.matches)

        // Support old Safari.
        if (mql.addEventListener)
            mql.addEventListener('change', onChange as any)
        else mql.addListener(onChange as any)

        return () => {
            if (mql.removeEventListener)
                mql.removeEventListener('change', onChange as any)
            else mql.removeListener(onChange as any)
        }
    }, [query])

    return matches
}

export default function Header({ isProd }: HeaderProps) {
    const isDev = !isProd
    useEffect(() => {
        console.log('isDev: ' + isDev)
    }, [])

    const [open, setOpen] = useState(false)
    const [dark, setDark] = useState(false)

    const isMobile = useMediaQuery(`(max-width: ${maxWidthMobile}px)`)

    // Load initial theme (persisted or system preference)
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        const prefersDark = window.matchMedia?.(
            '(prefers-color-scheme: dark)',
        ).matches
        setDark(saved ? saved === 'dark' : !!prefersDark)
    }, [])

    // Apply theme class to <html> and persist
    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    // Close mobile menu when resizing up to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > maxWidthMobile) setOpen(false)
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    /* 
        For desktop-mode/view ->     Top nav-menu.
     */
    // const NavLinks = ({ variant = 'desktop' }: NavLinksProps) => {
    const NavDesktopTopMenu = () => {
        const cssClasses = 'px-3'

        // *** HERO (nav links / top-menu) for desktop mode ***
        return (
            <>
                🏠
                <a
                    href={CONFIG.siteLinks.hero.home.url}
                    title={CONFIG.siteLinks.hero.home.title}
                    className={cssClasses}
                    style={{ paddingLeft: '.10em' }}>
                    Home
                </a>
                <a
                    href={CONFIG.siteLinks.hero.getStarted.url}
                    title={CONFIG.siteLinks.hero.getStarted.title}
                    className={cssClasses}>
                    Get Started
                </a>
                {/* Playground is currently temp-disabled in your layout */}
                {/* <a href={CONFIG.siteLinks.hero.playground.url}
                    title={CONFIG.siteLinks.hero.playground.title}
                className={cssClasses}>Playground</a> */}
                <a
                    href={CONFIG.siteLinks.hero.tutorial.url}
                    title={CONFIG.siteLinks.hero.tutorial.title}
                    className={cssClasses}>
                    Quick Tutorial
                </a>
                <a
                    href={CONFIG.siteLinks.hero.examples.url}
                    title={CONFIG.siteLinks.hero.examples.title}
                    className={cssClasses}>
                    Examples
                </a>
                <a
                    href={CONFIG.siteLinks.hero.spec.url}
                    title={CONFIG.siteLinks.hero.spec.title}
                    className={cssClasses}>
                    Specification
                </a>
                <a
                    href={CONFIG.siteLinks.hero.faq.url}
                    title={CONFIG.siteLinks.hero.faq.title}
                    className={cssClasses}>
                    FAQ
                </a>
            </>
        )
    }

    /* 
        For mobile-mode/view ->      Pop-up nav-menu.

        This menu is adapted for mobile view:
        - More users are new, curious, or returning for a quick thing.
        - Fewer items visible at once.
        
        (!) Not to overload the user and view with links and info.
     */
    // const NavLinks = ({ variant = 'desktop' }: NavLinksProps) => {
    const NavMobilePopupMenu = () => {
        const cssClasses = 'no-underline hover:underline text-base'

        // *** Menu for mobile (opened as via pop-up) ***
        return (
            <>
                <div>
                    <h3 class="my-2 font-semibold text-slate-500 dark:text-slate-500">
                        🧭 Start here
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.intro
                                        .whatIsYINIAndWhy.url
                                }
                                class={cssClasses}>
                                What is YINI & Why?
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="my-2 font-semibold text-slate-500 dark:text-slate-500">
                        🚀 Get started
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.useYini.getStarted
                                        .url
                                }
                                class={cssClasses}>
                                <strong>Get Started</strong>
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini
                                        .quickTutorial.url
                                }
                                class={cssClasses}>
                                Quick Tutorial
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="my-2 font-semibold text-slate-500 dark:text-slate-500">
                        📘 Learn YINI
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini
                                        .learnYiniFormat.url
                                }
                                class={cssClasses}>
                                Learn the Format
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini
                                        .cheatSheet.url
                                }
                                class={cssClasses}>
                                Cheat Sheet
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .url
                                }
                                class={cssClasses}>
                                Code Examples
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="my-2 font-semibold text-slate-500 dark:text-slate-500">
                        📚 References
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={CONFIG.siteLinks.navMenu.refs.spec.url}
                                class={cssClasses}>
                                Specification
                            </a>
                        </li>
                    </ul>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={CONFIG.siteLinks.navMenu.refs.faq.url}
                                class={cssClasses}>
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="my-2 font-semibold text-slate-500 dark:text-slate-500">
                        ℹ️ About
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.metaInfo.about.url
                                }
                                class={cssClasses}>
                                About YINI
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    if (!isMobile) {
        // "Desktop" View.
        return (
            // <header className="site-header text-center">
            <header className="site-header text-center">
                {/* Logo. */}
                <a href="/" aria-label="YINI home" className="logo m-1">
                    <img
                        className="mx-auto block h-1/4 w-1/4"
                        // className="mx-auto block h-1/3 w-1/3 pr-14.5"
                        src="/gfx/YINI-logo-cyan-on-tr.png"
                        alt="YINI logo"
                        loading="eager"
                        decoding="async"
                    />
                </a>

                <nav>
                    {/* <NavLinks variant="desktop" /> */}
                    <NavDesktopTopMenu />
                    {false && isDev && (
                        <button
                            type="button"
                            onClick={() => setDark((v) => !v)}
                            className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
                            aria-label="Toggle dark mode">
                            {dark ? 'Light' : 'Dark'}
                        </button>
                    )}
                </nav>
            </header>
        )
    } else {
        // "Mobile" View.
        return (
            <header className="border-b border-slate-200/60">
                <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
                    <a
                        href="/"
                        aria-label="YINI home"
                        className="inline-flex items-center gap-2 no-underline">
                        <img
                            className="h-8 w-auto"
                            src="/gfx/YINI-logo-cyan-on-tr.png"
                            alt="YINI logo"
                            loading="eager"
                            decoding="async"
                        />
                        <span className="sr-only">YINI</span>
                    </a>

                    {/* Normal (desktop) menu */}
                    {/* <nav className="ms-auto hidden items-center gap-5 text-sm md:flex">
                        <NavLinks variant="desktop" />
                    </nav> */}

                    {/* Controls */}
                    <div className="ms-3 ml-auto flex items-center gap-2">
                        {
                            // Disabled Dark/Light-button theme not implemented (yet).
                        }
                        {false && isDev && (
                            <button
                                type="button"
                                onClick={() => setDark((v) => !v)}
                                className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
                                aria-label="Toggle dark mode">
                                {dark ? 'Light' : 'Dark'}
                            </button>
                        )}

                        {/* Mobile menu toggle (hidden on md+) */}
                        <button
                            type="button"
                            className="rounded-lg border border-slate-300 px-2 py-1 text-xl hover:bg-slate-100 md:hidden"
                            onClick={() => setOpen((o) => !o)}
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            aria-label="Toggle menu">
                            ☰
                        </button>
                    </div>
                </div>

                {/* Mobile menu (collapsible) */}
                {open && (
                    <div
                        id="mobile-nav"
                        className="border-t border-slate-200/60 md:hidden">
                        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
                            {/* <NavLinks variant="mobile" /> */}
                            {<NavMobilePopupMenu />}
                        </nav>
                    </div>
                )}
            </header>
        )
    }
}
