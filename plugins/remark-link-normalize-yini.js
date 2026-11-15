import { visit } from 'unist-util-visit'

export default function linkNormalizeYini() {
    return (tree) => {
        // Resolve links from complete copies of the upstream Markdown files.
        visit(tree, ['link', 'definition'], (node) => {
            if (!node?.url) return
            const url = node.url

            const spec = url.match(/^[./]*YINI-Specification\.md(#.*)?$/i)
            if (spec) {
                node.url = '/refs/specification' + (spec[1] ?? '')
                return
            }

            const rationale = url.match(/^[./]*RATIONALE\.md(#.*)?$/i)
            if (rationale) {
                node.url = '/refs/rationale' + (rationale[1] ?? '')
                return
            }

            const resource = url.match(/^\.\/(Grammar-ANTLR4|Examples)(\/.*)?$/)
            if (resource) {
                const kind = /\.[a-z0-9]+(?:#.*)?$/i.test(url) ? 'blob' : 'tree'
                node.url =
                    'https://github.com/YINI-lang/YINI-spec/' +
                    kind +
                    '/production/' +
                    url.slice(2)
                if (node.type === 'link') {
                    node.children.push({ type: 'text', value: ' \u2197' })
                }
            }
        })
    }
}
