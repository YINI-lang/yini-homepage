import React, { useEffect, useState } from 'react'
import packageJson from '../../package.json'
import CONFIG from '../config/conf.ts'
import YINI from '../YiniWrapper.ts'

const URL_ON_VALID_PARSE = '/playground-use-yini' // The destination page.

type OutputMode = 'json' | 'pojo'
type FailLevel = 'auto' | 'ignore-errors'
type IndentSize = 2 | 3 | 4 | 6 | 8
type ValidationStatus = 'pending' | 'valid' | 'invalid'

type DiagnosticIssue = {
    line?: number
    column?: number
    typeKey?: string
    message?: string
    advice?: string
    hint?: string
}

type ExamplePreset = {
    id: string
    label: string
    code: string
    strict?: boolean
}

const EXAMPLE_PRESETS: ExamplePreset[] = [
    {
        id: 'app',
        label: 'App config',
        code: `^ App
name = "Demo"
version = "1.0.0"
port = 8080
features = ["search", "dark-mode"]
`,
    },
    {
        id: 'service',
        label: 'Service config',
        code: `^ Service
name = "api"
environment = "production"

^^ Server
host = "0.0.0.0"
port = 8080

^^ Database
host = "localhost"
port = 5432
auth = { user: "admin", pass: "secret" }
`,
    },
    {
        id: 'lists',
        label: 'Lists and sections',
        code: `^ App
name = "Demo App"
tags = ["web", "api", "v1"]
ports = [80, 443, 8080]

^^ Logging
level = "info"
outputs = ["console", "file"]
`,
    },
    {
        id: 'strict',
        label: 'Strict config',
        strict: true,
        code: `@yini strict

^ Title
name = "Production API"
version = "1.0.0"
features = ["auth", "metrics", "backups"]
limits = { requests_per_minute: 1200, burst: 200 }

^^ Server
host = "0.0.0.0"
port = 8080
tls = true

/END
`,
    },
    {
        id: 'invalid',
        label: 'Invalid example',
        code: `^ App
name = "Demo"
port = error
`,
    },
]

const DEFAULT_SNIPPET = EXAMPLE_PRESETS[0].code

const LEGACY_LS_CODE_KEY = 'yini:playground:code'
const LS_INDENT_KEY = 'yini:playground:indent-size'
const YINI_PARSER_VERSION = packageJson.dependencies['yini-parser']

function isIndentSize(value: unknown): value is IndentSize {
    return (
        value === 2 || value === 3 || value === 4 || value === 6 || value === 8
    )
}

function getExampleIdForCode(code: string): string {
    return (
        EXAMPLE_PRESETS.find((example) => example.code === code)?.id ?? 'custom'
    )
}

function toPrettyPojo(value: unknown, indentStep: IndentSize = 2): string {
    const seen = new WeakSet<object>()

    const render = (val: unknown, indent = 0): string => {
        const pad = ' '.repeat(indent)
        const padInner = ' '.repeat(indent + indentStep)

        if (val === null) return 'null'
        if (val === undefined) return 'undefined'

        const t = typeof val

        if (t === 'string') {
            return JSON.stringify(val)
        }

        if (t === 'number' || t === 'boolean') {
            return String(val)
        }

        if (Array.isArray(val)) {
            if (val.length === 0) return '[]'

            const items = val.map(
                (item) => `${padInner}${render(item, indent + indentStep)}`,
            )
            return `[\n${items.join(',\n')}\n${pad}]`
        }

        if (t === 'object') {
            const obj = val as Record<string, unknown>

            if (seen.has(obj)) return '[Circular]'
            seen.add(obj)

            const keys = Object.keys(obj)
            if (keys.length === 0) return '{}'

            const props = keys.map((key) => {
                const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
                    ? key
                    : JSON.stringify(key)

                return `${padInner}${safeKey}: ${render(obj[key], indent + indentStep)}`
            })

            return `{\n${props.join(',\n')}\n${pad}}`
        }

        return String(val)
    }

    return render(value)
}

function buildOutput(
    mode: OutputMode,
    parsedData: unknown,
    meta: unknown,
    includeMeta: boolean,
    indentSize: IndentSize,
): string {
    const main =
        mode === 'pojo'
            ? toPrettyPojo(parsedData, indentSize)
            : JSON.stringify(parsedData, null, indentSize)

    if (!includeMeta) {
        return main
    }

    const metaBlock =
        mode === 'pojo'
            ? toPrettyPojo(meta, indentSize)
            : JSON.stringify(meta, null, indentSize)

    return `${main}\n\n/* Metadata */\n${metaBlock}`
}

function formatDiagnosticLocation(issue: DiagnosticIssue): string {
    if (!issue.line) {
        return ''
    }

    if (!issue.column) {
        return `line ${issue.line}`
    }

    return `line ${issue.line}, column ${issue.column}`
}

function formatSourceExcerpt(
    source: string,
    lineNumber?: number,
    columnNumber?: number,
): string {
    if (!lineNumber || lineNumber < 1) {
        return ''
    }

    const sourceLine = source.split(/\r?\n/)[lineNumber - 1]
    if (sourceLine === undefined) {
        return ''
    }

    const linePrefix = `${lineNumber} | `
    const caretColumn = Math.max((columnNumber ?? 1) - 1, 0)
    const caretPrefix = `${' '.repeat(String(lineNumber).length)} | `

    return `${linePrefix}${sourceLine}\n${caretPrefix}${' '.repeat(caretColumn)}^`
}

function formatDiagnostics(
    source: string,
    issues: DiagnosticIssue[],
    fallbackMessage: string,
): string {
    if (issues.length === 0) {
        return fallbackMessage
    }

    const header =
        issues.length === 1
            ? 'YINI parse failed with 1 error.'
            : `YINI parse failed with ${issues.length} errors.`

    const details = issues.map((issue, index) => {
        const location = formatDiagnosticLocation(issue)
        const title = issue.message ?? fallbackMessage
        const excerpt = formatSourceExcerpt(source, issue.line, issue.column)
        const lines = [
            `${index + 1}. ${title}${location ? ` (${location})` : ''}`,
        ]

        if (issue.advice) {
            lines.push(issue.advice)
        }

        if (issue.hint) {
            lines.push(`Hint: ${issue.hint}`)
        }

        if (excerpt) {
            lines.push('', excerpt)
        }

        return lines.join('\n')
    })

    return `${header}\n\n${details.join('\n\n')}`
}

export default function YiniPlayground() {
    const [code, setCode] = useState<string>(DEFAULT_SNIPPET)
    const [mode, setMode] = useState<OutputMode>('json')
    const [strict, setStrict] = useState(false)
    const [includeMeta, setIncludeMeta] = useState(false)
    const [failLevel, setFailLevel] = useState<FailLevel>('auto')
    const [indentSize, setIndentSize] = useState<IndentSize>(2)
    const [selectedExampleId, setSelectedExampleId] = useState<string>(
        EXAMPLE_PRESETS[0].id,
    )

    const [output, setOutput] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [status, setStatus] = useState<ValidationStatus>('pending')

    function parseNow(
        src = code,
        outputIndent = indentSize,
        strictMode = strict,
    ) {
        setError('')

        try {
            const opts = {
                strictMode,
                failLevel,
                includeMetadata: true,
                includeDiagnostics: true,
                requireDocTerminator: 'optional' as const,
                throwOnError: false,
            }

            const parsed = YINI.parse(src, opts) as any
            const parsedData = parsed?.result ?? parsed
            const meta = parsed?.meta ?? {}
            const errorCount = meta?.diagnostics?.errors?.errorCount ?? 0

            setOutput(
                buildOutput(mode, parsedData, meta, includeMeta, outputIndent),
            )

            if (errorCount > 0) {
                setStatus('invalid')
                const errors = meta?.diagnostics?.errors?.payload ?? []
                if (failLevel !== 'ignore-errors') {
                    setError(
                        formatDiagnostics(
                            src,
                            errors,
                            'YINI contains validation errors.',
                        ),
                    )
                }
            } else {
                setStatus('valid')
            }
        } catch (e: any) {
            setOutput('')
            setError(formatDiagnostics(src, [e], e?.message ?? String(e)))
            setStatus('invalid')
        }
    }

    useEffect(() => {
        try {
            localStorage.removeItem(LEGACY_LS_CODE_KEY)

            const params = new URLSearchParams(location.search)
            const fromUrl = params.get('code')
            const savedIndentRaw = localStorage.getItem(LS_INDENT_KEY)
            let nextCode = DEFAULT_SNIPPET
            let nextIndent = indentSize

            if (fromUrl) {
                nextCode = fromUrl
            }

            if (savedIndentRaw) {
                const parsedIndent = Number(savedIndentRaw)
                if (isIndentSize(parsedIndent)) {
                    nextIndent = parsedIndent
                }
            }

            setCode(nextCode)
            setIndentSize(nextIndent)
            setSelectedExampleId(getExampleIdForCode(nextCode))
            parseNow(nextCode, nextIndent)
        } catch {
            //
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        try {
            localStorage.setItem(LS_INDENT_KEY, String(indentSize))
        } catch {
            //
        }
    }, [indentSize])

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                parseNow()
            }
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [code, strict, includeMeta, failLevel, indentSize, mode])

    function markPending() {
        setStatus('pending')
    }

    function handleCodeChange(nextCode: string) {
        setCode(nextCode)
        setSelectedExampleId(getExampleIdForCode(nextCode))
        markPending()
    }

    function handleExampleChange(exampleId: string) {
        const example = EXAMPLE_PRESETS.find((item) => item.id === exampleId)
        if (!example) return

        const nextStrict = example.strict ?? false

        setCode(example.code)
        setStrict(nextStrict)
        setSelectedExampleId(example.id)
        parseNow(example.code, indentSize, nextStrict)
    }

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
        } catch {}
    }

    const yiniParserVersion = YINI_PARSER_VERSION.replace(/^\^/, '') // Remove "^" if it appears at the beginning.

    return (
        <div className="container-wide section-pad">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold md:text-4xl">
                    YINI Playground
                </h1>

                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    Paste YINI on the left, see parsed output on the right.
                    Toggle strict mode, and choose <strong>JSON</strong> or{' '}
                    <strong>POJO</strong> (plain JavaScript object).
                </p>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                    <label className="inline-flex items-center gap-2">
                        <span className="font-medium">Example:</span>
                        <select
                            className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                            value={selectedExampleId}
                            onChange={(e) =>
                                handleExampleChange(e.target.value)
                            }>
                            {selectedExampleId === 'custom' && (
                                <option value="custom">Custom</option>
                            )}
                            {EXAMPLE_PRESETS.map((example) => (
                                <option key={example.id} value={example.id}>
                                    {example.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="flex items-center gap-3 text-sm">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={strict}
                                onChange={(e) => {
                                    setStrict(e.target.checked)
                                    markPending()
                                }}
                            />
                            <span>Strict mode</span>
                        </label>

                        <span className="font-medium">Output:</span>

                        <label className="inline-flex items-center gap-1">
                            <input
                                type="radio"
                                name="out"
                                value="json"
                                checked={mode === 'json'}
                                onChange={() => {
                                    setMode('json')
                                    markPending()
                                }}
                            />
                            <span>JSON</span>
                        </label>

                        <label className="inline-flex items-center gap-1">
                            <input
                                type="radio"
                                name="out"
                                value="pojo"
                                checked={mode === 'pojo'}
                                onChange={() => {
                                    setMode('pojo')
                                    markPending()
                                }}
                            />
                            <span>POJO</span>
                        </label>
                    </div>
                </div>

                <div className="mt-3 flex justify-end text-sm">
                    <label className="inline-flex items-center gap-2">
                        <span className="font-medium">Indent:</span>
                        <select
                            className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                            value={indentSize}
                            onChange={(e) => {
                                setIndentSize(
                                    Number(e.target.value) as IndentSize,
                                )
                                markPending()
                            }}>
                            <option value={2}>2 spaces</option>
                            <option value={3}>3 spaces</option>
                            <option value={4}>4 spaces</option>
                            <option value={6}>6 spaces</option>
                            <option value={8}>8 spaces</option>
                        </select>
                    </label>
                </div>

                <div className="my-4 flex flex-wrap items-center gap-4 py-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => parseNow()}
                        title="Parse (Ctrl/Cmd+Enter)">
                        Parse
                    </button>

                    <div
                        className={
                            status === 'valid'
                                ? 'font-medium text-green-700'
                                : status === 'invalid'
                                  ? 'font-medium text-red-700'
                                  : 'font-medium text-slate-600 dark:text-slate-300'
                        }>
                        {status === 'valid'
                            ? '✓ Valid YINI'
                            : status === 'invalid'
                              ? '✕ Invalid YINI'
                              : 'Ready to parse'}
                    </div>

                    <a
                        href={URL_ON_VALID_PARSE}
                        className="btn btn-primary px-2 py-1 text-xs">
                        Use YINI in your project -&gt;
                    </a>
                </div>

                <details className="ms-auto mt-3 w-fit text-sm text-slate-600 dark:text-slate-300">
                    <summary className="cursor-pointer font-medium">
                        Advanced
                    </summary>

                    <div className="mt-3 flex flex-wrap justify-end gap-4">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={includeMeta}
                                onChange={(e) => {
                                    setIncludeMeta(e.target.checked)
                                    markPending()
                                }}
                            />
                            <span>Include metadata</span>
                        </label>

                        <label className="inline-flex items-center gap-2">
                            <span className="font-medium">Fail level:</span>
                            <select
                                className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                                value={failLevel}
                                onChange={(e) => {
                                    setFailLevel(e.target.value as FailLevel)
                                    markPending()
                                }}>
                                <option value="auto">auto</option>
                                <option value="ignore-errors">
                                    ignore-errors
                                </option>
                            </select>
                        </label>
                    </div>
                </details>

                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Input (.yini):
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline px-2 py-1 text-xs"
                                    onClick={() => copy(code)}>
                                    Copy
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            spellCheck={false}
                            className="min-h-[320px] rounded-lg border border-slate-300 bg-white p-3 font-mono text-[13px] leading-6 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            aria-label="YINI input"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Output ({mode.toUpperCase()}):
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline px-2 py-1 text-xs"
                                    onClick={() => copy(output)}
                                    disabled={!output}>
                                    Copy
                                </button>
                            </div>
                        </div>

                        {error ? (
                            <pre className="min-h-[320px] overflow-auto rounded-lg bg-red-50 p-3 text-red-700">
                                {error}
                            </pre>
                        ) : (
                            <pre className="min-h-[320px] overflow-auto rounded-lg bg-slate-950 p-3 text-slate-100">
                                {output || '// Parsed output will appear here'}
                            </pre>
                        )}

                        <div className="mt-0 text-right text-xs text-slate-500 dark:text-slate-400">
                            <span
                                title={`yini-parser-typescript: ${YINI_PARSER_VERSION}`}>
                                yini-parser (TS): v{yiniParserVersion} (
                                <a
                                    href={
                                        CONFIG.urls.external.gitHub.yiniParserTs
                                    }
                                    target="_blank"
                                    rel="noreferrer noopener nofollow">
                                    link ↗
                                </a>
                                )
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
