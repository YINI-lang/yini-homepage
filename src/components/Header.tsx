import React, { useEffect, useState } from 'react'
import CONFIG from '../config/conf'

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

export default function Header() {
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
            variant === 'desktop' ? 'px-3' : 'no-underline hover:underline'

        // *** HERO below ***
        return (
            <>
                <a href={CONFIG.urls.hero.home} className={cssClasses}>
                    Home
                </a>
                <a href={CONFIG.urls.hero.getStarted} className={cssClasses}>
                    Get Started
                </a>
                {/* Playground is currently temp-disabled in your layout */}
                {/* <a href="/playground" className={cssClasses}>Playground</a> */}
                <a href={CONFIG.urls.hero.tutorial} className={cssClasses}>
                    Quick Tutorial
                </a>
                <a href={CONFIG.urls.hero.faq} className={cssClasses}>
                    FAQ
                </a>
                <a href={CONFIG.urls.hero.spec} className={cssClasses}>
                    Specification
                </a>
            </>
        )
    }

    if (!isMobile) {
        // "Desktop" View.
        return (
            <header className="site-header text-center">
                {/* <nav class="hidden items-center gap-6 text-sm md:flex">
                    <a href="/docs/get-started" class="hover:underline">
                        Docs
                    </a>
                    <a href="/docs/spec" class="hover:underline">
                        Spec
                    </a>
                    <a
                        href="https://github.com/YINI-lang"
                        target="_blank"
                        rel="noreferrer"
                        class="hover:underline">
                        GitHub
                    </a>
                </nav> */}
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
                </nav>
            </header>
        )
    } else {
        // "Mobile" View.
        return (
            <header className="border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
                    <a
                        href="/"
                        aria-label="YINI home"
                        className="inline-flex items-center gap-2 no-underline">
                        <img
                            className="h-8 w-auto"
                            src="/gfx/YINI-logo-cyan-on-white.png"
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
                            /* <button
                            type="button"
                            onClick={() => setDark((v) => !v)}
                            className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Toggle dark mode">
                            {dark ? 'Light' : 'Dark'}
                        </button> */
                        }

                        {/* Mobile menu toggle (hidden on md+) */}
                        <button
                            type="button"
                            className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
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
                        className="border-t border-slate-200/60 md:hidden dark:border-slate-800/60">
                        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
                            <NavLinks variant="mobile" />
                        </nav>
                    </div>
                )}
            </header>
        )
    }
}
