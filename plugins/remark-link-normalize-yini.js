// plugins/remark-link-normalize-yini.js (ESM)
import { visit } from 'unist-util-visit'

export default function linkNormalizeYini() {
    return (tree) => {
        // Handle inline links like [text](YINI-Specification.md#table-of-contents)
        visit(tree, 'link', (node) => {
            if (!node?.url) return
            const url = node.url

            // Accept ./ or / prefixes and case-insensitive filename
            // A) YINI-Specification.md#... -> /refs/specification#...
            const spec = url.match(/^[./]*YINI-Specification\.md(?:#(.+))?$/i)
            if (spec) {
                node.url = `/refs/specification${spec[1] ? `#${spec[1]}` : ''}`
                return
            }

            // B) RATIONALE.md#... -> /refs/rationale#...
            const rat = url.match(/^[./]*RATIONALE\.md(?:#.*)?$/i)
            if (rat) {
                node.url = `/refs/rationale${url.includes('#') ? url.slice(url.indexOf('#')) : ''}`
            }
        })

        // Also handle reference-style links: [text][spec] with a definition [spec]: YINI-Specification.md#...
        visit(tree, 'definition', (def) => {
            if (!def?.url) return
            const url = def.url

            const spec = url.match(/^[./]*YINI-Specification\.md(?:#(.+))?$/i)
            if (spec) {
                def.url = `/refs/specification${spec[1] ? `#${spec[1]}` : ''}`
                return
            }

            const rat = url.match(/^[./]*RATIONALE\.md(?:#.*)?$/i)
            if (rat) {
                def.url = `/refs/rationale${url.includes('#') ? url.slice(url.indexOf('#')) : ''}`
            }
        })
    }
}
