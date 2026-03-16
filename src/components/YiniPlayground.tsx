// src/components/YiniPlayground.tsx
import React, { useEffect, useRef, useState } from 'react'
import YINI from '../YiniWrapper.ts'

type OutputMode = 'json' | 'pojo'
type FailLevel = 'auto' | 'ignore-errors'
type IndentSize = 2 | 3 | 4 | 6 | 8

const DEFAULT_SNIPPET = `^ App
name = "Demo"
version = "1.0.0"
features = ["search", "dark-mode"] // comments allowed

^ Database
host = "localhost"
port = 5432
auth = { user: "admin", pass: "secret" }
`

const LS_CODE_KEY = 'yini:playground:code'
const LS_INDENT_KEY = 'yini:playground:indent-size'

function isIndentSize(value: unknown): value is IndentSize {
    return (
        value === 2 || value === 3 || value === 4 || value === 6 || value === 8
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

export default function YiniPlayground() {
    const [code, setCode] = useState<string>(DEFAULT_SNIPPET)
    const [mode, setMode] = useState<OutputMode>('json')
    const [strict, setStrict] = useState(false)
    const [includeMeta, setIncludeMeta] = useState(false)
    const [failLevel, setFailLevel] = useState<FailLevel>('auto')
    const [indentSize, setIndentSize] = useState<IndentSize>(2)
    const [auto, setAuto] = useState(true)

    const [output, setOutput] = useState<string>('')
    const [error, setError] = useState<string>('')

    const debounce = useRef<number | null>(null)

    function parseNow(src = code) {
        setError('')

        try {
            const opts = {
                strictMode: strict,
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
                buildOutput(mode, parsedData, meta, includeMeta, indentSize),
            )

            if (errorCount > 0 && failLevel !== 'ignore-errors') {
                const firstErr = meta?.diagnostics?.errors?.payload?.[0]
                if (firstErr?.message) {
                    setError(firstErr.message)
                }
            }

            try {
                localStorage.setItem(LS_CODE_KEY, src)
            } catch {}
        } catch (e: any) {
            setOutput('')
            setError(e?.message ?? String(e))
        }
    }

    useEffect(() => {
        if (!auto) return
        if (debounce.current) window.clearTimeout(debounce.current)
        debounce.current = window.setTimeout(() => parseNow(), 250)

        return () => {
            if (debounce.current) window.clearTimeout(debounce.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, mode, strict, includeMeta, failLevel, indentSize, auto])

    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search)
            const fromUrl = params.get('code')
            const savedCode = localStorage.getItem(LS_CODE_KEY)
            const savedIndentRaw = localStorage.getItem(LS_INDENT_KEY)

            if (fromUrl) {
                setCode(decodeURIComponent(fromUrl))
            } else if (savedCode) {
                setCode(savedCode)
            }

            if (savedIndentRaw) {
                const parsedIndent = Number(savedIndentRaw)
                if (isIndentSize(parsedIndent)) {
                    setIndentSize(parsedIndent)
                }
            }
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
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !auto) {
                e.preventDefault()
                parseNow()
            }
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [auto, code, strict, includeMeta, failLevel, indentSize, mode])

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
        } catch {}
    }

    return (
        <div className="container-wide section-pad">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Playground
                </h1>

                <p className="mt-2 text-slate-600">
                    Paste YINI on the left, see parsed output on the right.
                    Choose <strong>JSON</strong> or <strong>POJO</strong>, and
                    toggle strict mode.
                </p>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Output:</span>

                        <label className="inline-flex items-center gap-1">
                            <input
                                type="radio"
                                name="out"
                                value="json"
                                checked={mode === 'json'}
                                onChange={() => setMode('json')}
                            />
                            <span>JSON</span>
                        </label>

                        <label className="inline-flex items-center gap-1">
                            <input
                                type="radio"
                                name="out"
                                value="pojo"
                                checked={mode === 'pojo'}
                                onChange={() => setMode('pojo')}
                            />
                            <span>POJO</span>
                        </label>
                    </div>

                    <label className="inline-flex items-center gap-2">
                        <span className="font-medium">Indent:</span>
                        <select
                            className="rounded border border-slate-300 px-2 py-1"
                            value={indentSize}
                            onChange={(e) =>
                                setIndentSize(
                                    Number(e.target.value) as IndentSize,
                                )
                            }>
                            <option value={2}>2 spaces</option>
                            <option value={3}>3 spaces</option>
                            <option value={4}>4 spaces</option>
                            <option value={6}>6 spaces</option>
                            <option value={8}>8 spaces</option>
                        </select>
                    </label>

                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={strict}
                            onChange={(e) => setStrict(e.target.checked)}
                        />
                        <span>Strict mode</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeMeta}
                            onChange={(e) => setIncludeMeta(e.target.checked)}
                        />
                        <span>Include metadata</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                        <span className="font-medium">Fail level:</span>
                        <select
                            className="rounded border border-slate-300 px-2 py-1"
                            value={failLevel}
                            onChange={(e) =>
                                setFailLevel(e.target.value as FailLevel)
                            }>
                            <option value="auto">auto</option>
                            <option value="ignore-errors">ignore-errors</option>
                        </select>
                    </label>

                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={auto}
                            onChange={(e) => setAuto(e.target.checked)}
                        />
                        <span>Auto-validate</span>
                    </label>

                    <button
                        type="button"
                        className="btn btn-primary ms-auto"
                        onClick={() => parseNow()}
                        title={
                            auto
                                ? 'Disable Auto-validate to use manually'
                                : 'Parse (Ctrl/Cmd+Enter)'
                        }>
                        Parse
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600">
                                Input (.yini)
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => copy(code)}>
                                    Copy
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="min-h-[320px] rounded-lg border border-slate-300 bg-white p-3 font-mono text-[13px] leading-6"
                            aria-label="YINI input"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600">
                                Output ({mode.toUpperCase()})
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline"
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
                    </div>
                </div>
            </div>
        </div>
    )
}
