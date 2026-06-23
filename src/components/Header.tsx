// src/components/Header.tsx
import React, { useEffect, useState } from 'react'
import CONFIG from '../config/conf'

/*
    NOTE:
    This mobile menu should be **task-driven**, not category-driven.

    This menu ordering follows developer onboarding psychology:
    1. What is this?
    2. Try it
    3. Show examples
    4. Learn deeper
    5. Reference docs
*/

type HeaderProps = {
    isProd: boolean
}

/*
    Small, quiet branding text under / beside the logo.

    Intention:
    - Clarify what YINI is at a glance.
    - Add a slightly more professional / project-like feel.
    - Stay secondary to the logo and the main page hero.

    Styling choice:
    - First line: normal text for clarity.
    - Second line: italic and lighter, to feel more like attribution.
*/
function HeaderTagline({ mobile = false }: { mobile?: boolean }) {
    return (
        <div className={mobile ? 'leading-tight' : 'mt-0.5 leading-tight'}>
            <div
                className={
                    mobile
                        ? 'text-[11px] text-slate-600 dark:text-slate-300'
                        : 'text-sm text-slate-600 dark:text-slate-300'
                }>
                {CONFIG.text.logoTagLine}
            </div>

            <div
                className={
                    mobile
                        ? 'mt-0.5 text-[10px] text-slate-400 italic dark:text-slate-500'
                        : 'mt-1 text-xs text-slate-400 italic dark:text-slate-500'
                }>
                By the YINI-lang project
            </div>
        </div>
    )
}

export default function Header({ isProd }: HeaderProps) {
    const isDev = !isProd

    useEffect(() => {
        console.log('isDev: ' + isDev)
    }, [isDev])

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

    /*
        For desktop-mode/view -> Top nav-menu.
     */
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
                    href={CONFIG.siteLinks.navMenu.refs.cheatSheet.url}
                    title={CONFIG.siteLinks.navMenu.refs.cheatSheet.title}
                    className={cssClasses}>
                    ⭐ Cheat Sheet
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

    /*
        For mobile-mode/view -> Pop-up nav-menu.

        This menu is adapted for mobile view:
        - More users are new, curious, or returning for a quick thing.
        - Fewer items visible at once.

        Typically, on mobile:
        Users are trying to do ONE of three things:
          1. Understand what this is
          2. Try it quickly
          3. See examples

        (!) Not to overload the user and view with links and info.
     */
    const NavMobilePopupMenu = () => {
        const cssClasses = 'no-underline hover:underline text-sm'

        // *** Menu for mobile (opened as via pop-up) ***
        return (
            <>
                <div>
                    <div className="mb-2">
                        <a
                            href={CONFIG.siteLinks.hero.home.url}
                            className={cssClasses}>
                            Home
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">Start</h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.start
                                        .whatIsYINIAndWhy.url
                                }
                                className={cssClasses}>
                                What is YINI & Why?
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.useYini.getStarted
                                        .url
                                }
                                className={cssClasses}>
                                Get Started 🚀
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini
                                        .quickTutorial.url
                                }
                                className={cssClasses}>
                                Quick Tutorial
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">
                        Examples
                    </h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href="/learn-yini/examples/"
                                className={cssClasses}>
                                Overview
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .basic.url
                                }
                                className={cssClasses}>
                                Core & Basic
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .common.url
                                }
                                className={cssClasses}>
                                Real-world
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .indentation.url
                                }
                                className={cssClasses}>
                                Indentation & Structure
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .large.url
                                }
                                className={cssClasses}>
                                Large
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini.examples
                                        .advanced.url
                                }
                                className={cssClasses}>
                                Advanced (optional)
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">Learn</h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.learnYini
                                        .learnYiniFormat.url
                                }
                                className={cssClasses}>
                                Learn the Format 🎓
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.refs.cheatSheet.url
                                }
                                className={cssClasses}>
                                Cheat Sheet ⭐
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">
                        Use YINI
                    </h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.useYini.yiniParsers
                                        .url
                                }
                                className={cssClasses}>
                                YINI Parsers
                            </a>
                        </li>
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.useYini
                                        .getYINITools.url
                                }
                                className={cssClasses}>
                                Get YINI Tools
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">
                        Reference
                    </h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={CONFIG.siteLinks.navMenu.refs.spec.url}
                                className={cssClasses}>
                                Specification
                            </a>
                        </li>
                        <li>
                            <a
                                href={CONFIG.siteLinks.navMenu.refs.faq.url}
                                className={cssClasses}>
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="my-2 font-semibold text-slate-500">
                        Project
                    </h3>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={CONFIG.urls.external.gitHub.yiniOrg}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cssClasses}>
                                YINI project on GitHub ↗
                            </a>
                        </li>
                    </ul>
                    <ul className="space-y-2 pl-4">
                        <li>
                            <a
                                href={
                                    CONFIG.siteLinks.navMenu.metaInfo.about.url
                                }
                                className={cssClasses}>
                                About YINI
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    return (
        <>
            <header className="site-header hidden text-center md:block">
                {/* Logo. */}
                <a href="/" aria-label="YINI home" className="logo m-1">
                    <img
                        className="mx-auto block h-1/4 w-1/4"
                        src="/gfx/YINI-logo-cyan-on-tr.png"
                        alt="YINI logo"
                        loading="eager"
                        decoding="async"
                    />
                </a>

                {/* Quiet supporting descriptor under the logo. */}
                <HeaderTagline />

                <nav className="mt-5">
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

            <header className="border-b border-slate-200/60 md:hidden">
                <input
                    id="mobile-nav-toggle"
                    type="checkbox"
                    className="peer sr-only"
                    aria-hidden="true"
                />

                <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
                    <a
                        href="/"
                        aria-label="YINI home"
                        className="inline-flex items-center gap-3 no-underline">
                        <img
                            className="h-8 w-auto"
                            src="/gfx/YINI-logo-cyan-on-tr.png"
                            alt="YINI logo"
                            loading="eager"
                            decoding="async"
                        />

                        {/* Small supporting text next to the logo in mobile view. */}
                        <div className="min-w-0">
                            <span className="sr-only">YINI</span>
                            <HeaderTagline mobile />
                        </div>
                    </a>

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

                        {/* Mobile menu toggle. Native label/input behavior works before hydration. */}
                        <label
                            htmlFor="mobile-nav-toggle"
                            className="cursor-pointer rounded-lg border border-slate-300 px-2 py-1 text-xl select-none hover:bg-slate-100"
                            aria-controls="mobile-nav"
                            aria-label="Toggle menu"
                            title="Toggle menu">
                            ☰
                        </label>
                    </div>
                </div>

                {/* Mobile menu (collapsible) */}
                <div
                    id="mobile-nav"
                    className="hidden border-t border-slate-200/60 peer-checked:block">
                    <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
                        {<NavMobilePopupMenu />}
                    </nav>
                </div>
            </header>
        </>
    )
}
