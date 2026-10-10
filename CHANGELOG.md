# CHANGELOG

**Changelog** for `yini-homepage`.

This file tracks meaningful public-facing changes, such as major content updates, new documentation pages, navigation changes, examples, SEO updates, and important build or deployment changes.

Minor typo fixes, styling tweaks, and small rewordings are not listed here. See the git commit history for those details.

## 2026 Oct
- **Clarified:** Renamed navigation links and the page title to "YINI Format Rationale" (from just "Rationale") so visitors can immediately see that it explains the format's background, goals, and design trade-offs.
- **Changed:** Disabled Plausible analytics collection and GoatCounter tracking to improve privacy. Their script is no longer loaded.
- **Added:** Two YINI examples more:
  * Added practical YINI string example to the main examples page; covering raw, classic escaped, and triple-quoted strings.
  * Added "Strings at a glance" to the values examples page, including classic triple-quoted strings.

## 2026 Sep

- **Added:** Added Dependabot configuration for monthly npm and GitHub Actions dependency updates.
- **Added:** Added the Rationale page for YINI Specification RC 6, covering the format's background, design goals, and design trade-offs.
- **Changed:** Updated Rationale links to use the new page instead of the former external GitHub document.

## 2026 Aug

- **Added:** Added new page Playground.
- **Added:** Added new page Assets, collecting YINI brand assets, logos, favicons, and media kit materials.
- **Update:** Updated manual of `yini-cli` to 1.6.2.
- **Changed:** Renamed `examples/basic` to `examples/core` to better reflect that the page covers fundamental YINI concepts.
- **Improved:** Corrected and simplified the YINI FAQ, improved its examples, and added practical entries about strict mode, strings, tooling, and other common questions.

## 2026 July

- **Added:** A new page about the YINI Test Suite CLI, [link](http://yini-lang.org/tools/yini-test-suite).
- **Added:** Added a new page with the YINI CLI Command Reference at [link](http://yini-lang.org/tools/yini-cli/manual).
- **Changed:** Replaced the footer community links with links to the main YINI tool pages.
- **Added:** FAQ entry "Does YINI stand for YAML + INI?"
- **Improved:** Tightened about six existing FAQ entries for correctness and clarity.
- **Updated:** Updated FAQ entry "Why not just use INI/JSON/YAML/TOML?" to a more detailed answer.
