import React, { useEffect, useRef, useState } from 'react'
// import YINI, { ParseOptions, PreferredFailLevel } from 'yini-parser'
// import YINI from 'yini-parser'
import YINI from '../YiniWrapper.ts'

type OutputMode = 'json' | 'pojo' | 'meta'
type FailLevel = 'ignore-errors' | 'errors' | 'warnings-and-errors'

const DEFAULT_SNIPPET = `^ App
name = "Demo"
version = "1.0.0"
features = ["search", "dark-mode"] # comments allowed

^ Database
host = "localhost"
port = 5432
auth = { user: "admin", pass: "secret" }
`

export default function YiniPlayground() {
    const [code, setCode] = useState<string>(DEFAULT_SNIPPET)
    const [mode, setMode] = useState<OutputMode>('json')
    const [strict, setStrict] = useState(false)
    const [includeMeta, setIncludeMeta] = useState(false)
    const [failLevel, setFailLevel] = useState<FailLevel>('errors')
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
                includeMetadata: includeMeta,
                includeDiagnostics: includeMeta,
                requireDocTerminator: 'optional' as const,
                throwOnError: false,
                quiet: true,
            }

            const result = YINI.parse(src, opts)

            if (includeMeta) {
                if (mode === 'meta') {
                    setOutput(
                        JSON.stringify((result as any).meta ?? {}, null, 2),
                    )
                } else {
                    setOutput(JSON.stringify((result as any).result, null, 2))
                }
            } else {
                setOutput(JSON.stringify(result, null, 2)) // POJO/JSON printed the same
            }

            // persist last snippet (optional)
            try {
                localStorage.setItem('yini:playground:code', src)
            } catch {}
        } catch (e: any) {
            setOutput('')
            setError(e?.message ?? String(e))
        }
    }

    // auto-validate with small debounce
    useEffect(() => {
        if (!auto) return
        if (debounce.current) window.clearTimeout(debounce.current)
        debounce.current = window.setTimeout(() => parseNow(), 250)
        return () => {
            if (debounce.current) window.clearTimeout(debounce.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, mode, strict, includeMeta, failLevel, auto])

    // load from URL/localStorage on first mount
    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search)
            const fromUrl = params.get('code')
            const saved = localStorage.getItem('yini:playground:code')
            if (fromUrl) {
                setCode(decodeURIComponent(fromUrl))
            } else if (saved) {
                setCode(saved)
            }
        } catch {
            /* ignore */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // keyboard: Ctrl/Cmd+Enter to parse (when auto is off)
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !auto) {
                e.preventDefault()
                parseNow()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [auto, code, strict, includeMeta, failLevel, mode])

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
                    Choose <strong>JSON</strong> or <strong>POJO</strong>, view{' '}
                    <strong>Meta</strong>, and toggle strict mode.
                </p>

                {/* Controls */}
                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                    {/* Output mode */}
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
                        <label className="inline-flex items-center gap-1">
                            <input
                                type="radio"
                                name="out"
                                value="meta"
                                checked={mode === 'meta'}
                                onChange={() => setMode('meta')}
                                disabled={!includeMeta}
                                title={
                                    !includeMeta
                                        ? 'Enable metadata to view'
                                        : ''
                                }
                            />
                            <span>Meta</span>
                        </label>
                    </div>

                    {/* Parser options */}
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
                            <option value="errors">errors</option>
                            <option value="ignore-errors">ignore-errors</option>
                            <option value="warnings-and-errors">
                                warnings-and-errors
                            </option>
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
                        onClick={() => {
                            console.log('here')
                            parseNow()
                        }}
                        // disabled={auto}
                        title={
                            auto
                                ? 'Disable Auto-validate to use'
                                : 'Parse (Ctrl/Cmd+Enter)'
                        }>
                        Parse
                    </button>
                </div>

                {/* Panels */}
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
                                Output (
                                {includeMeta && mode === 'meta'
                                    ? 'Meta'
                                    : mode.toUpperCase()}
                                )
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
