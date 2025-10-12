// plugins/remark-link-normalize-yini.js (ESM)
import { visit } from 'unist-util-visit'

export default function linkNormalizeYini() {
    return (tree) => {
        // Handle inline links like [text](YINI-Specification.md#table-of-contents)
        visit(tree, 'link', (node, index, parent) => {
            if (!node?.url) return
            const url = node.url

            // Accept ./ or / prefixes and case-insensitive filename
            // A) YINI-Specification.md#... -> specification#...
            const spec = url.match(/^[./]*YINI-Specification\.md(?:#(.+))?$/i)
            if (spec) {
                node.url = `specification${spec[1] ? `#${spec[1]}` : ''}`
                return
            }

            // B) /RATIONALE.md (or ./RATIONALE.md / RATIONALE.md) -> plain text (remove link)
            const rat = url.match(/^[./]*RATIONALE\.md(?:#.*)?$/i)
            if (rat && parent && typeof index === 'number') {
                const text = node.children?.length
                    ? node.children
                          .map((c) => ('value' in c ? c.value : ''))
                          .join('')
                    : 'RATIONALE.md'
                parent.children.splice(index, 1, { type: 'text', value: text })
            }
        })

        // Also handle reference-style links: [text][spec] with a definition [spec]: YINI-Specification.md#...
        visit(tree, 'definition', (def) => {
            if (!def?.url) return
            const url = def.url

            const spec = url.match(/^[./]*YINI-Specification\.md(?:#(.+))?$/i)
            if (spec) {
                def.url = `specification${spec[1] ? `#${spec[1]}` : ''}`
                return
            }

            const rat = url.match(/^[./]*RATIONALE\.md(?:#.*)?$/i)
            if (rat) {
                // Neutralize the definition so reference links render as text
                // (reference link nodes will fall back to their label text)
                def.url = ''
            }
        })
    }
}
