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

    const NavLinks = ({ variant = 'desktop' }: NavLinksProps) => {
        const cssClasses =
            variant === 'desktop'
                ? 'px-3'
                : 'no-underline hover:underline text-base'

        // *** HERO below ***
        return (
            <>
                <a
                    href={CONFIG.siteLinks.hero.home.url}
                    title={CONFIG.siteLinks.hero.home.title}
                    className={cssClasses}>
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
                    href={CONFIG.siteLinks.hero.faq.url}
                    title={CONFIG.siteLinks.hero.faq.title}
                    className={cssClasses}>
                    FAQ
                </a>
                <a
                    href={CONFIG.siteLinks.hero.spec.url}
                    title={CONFIG.siteLinks.hero.spec.title}
                    className={cssClasses}>
                    Specification
                </a>
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
                    <NavLinks variant="desktop" />
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
                            <NavLinks variant="mobile" />
                        </nav>
                    </div>
                )}
            </header>
        )
    }
}
