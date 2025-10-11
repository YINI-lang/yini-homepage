import React, { useEffect, useState } from 'react'

type NavLinksProps = { variant?: 'mobile' | 'desktop' }

export default function Header() {
    const [open, setOpen] = useState(false)
    const [dark, setDark] = useState(false)

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
            if (window.innerWidth >= 768) setOpen(false)
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const NavLinks = ({ variant = 'desktop' }: NavLinksProps) => {
        const cssClasses =
            variant === 'desktop' ? '' : 'no-underline hover:underline'

        return (
            <>
                <a href="/" className={cssClasses}>
                    Home
                </a>
                <a href="/get-started" className={cssClasses}>
                    Get Started
                </a>
                {/* Playground is currently temp-disabled in your layout */}
                {/* <a href="/playground" className={cssClasses}>Playground</a> */}
                <a href="/yini-tutorial" className={cssClasses}>
                    Quick Tutorial
                </a>
                <a href="/yini-faq" className={cssClasses}>
                    FAQ
                </a>
                <a
                    href="/specs/YINI-Specification-1.0.0-RC.3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cssClasses}>
                    Spec ↗
                </a>
            </>
        )
    }

    return (
        <header className="border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
                <a
                    href="/"
                    aria-label="YINI home"
                    className="inline-flex items-center gap-2 no-underline">
                    <img
                        src="/gfx/YINI-logo-cyan-on-white.png"
                        alt="YINI logo"
                        className="h-8 w-auto"
                        loading="eager"
                        decoding="async"
                    />
                    <span className="sr-only">YINI</span>
                </a>

                {/* Normal (desktop) menu */}
                <nav className="ms-auto hidden items-center gap-5 text-sm md:flex">
                    <NavLinks variant="desktop" />
                </nav>

                {/* Controls */}
                <div className="ms-3 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setDark((v) => !v)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Toggle dark mode">
                        {dark ? 'Light' : 'Dark'}
                    </button>

                    {/* Mobile menu toggle (hidden on md+) */}
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
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
