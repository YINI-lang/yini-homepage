import React, { useEffect, useMemo, useState } from 'react'

/** Output view */
type OutputMode = 'json' | 'pojo' | 'meta'

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
    const [code, setCode] = useState(DEFAULT_SNIPPET)
    const [mode, setMode] = useState<OutputMode>('json')
    const [strict, setStrict] = useState(false)
    const [failLevel, setFailLevel] = useState<
        'ignore-errors' | 'errors' | 'warnings-and-errors'
    >('errors')
    const [includeMeta, setIncludeMeta] = useState(false)
    const [auto, setAuto] = useState(true)
    const [output, setOutput] = useState<string>('')
    const [error, setError] = useState<string>('')

    // Lazy-load default export YINI from the package (or from a local shim if needed)
    const yiniPromise = useMemo(
        () =>
            import('yini-parser')
                .then((m: any) => m.default ?? m) // expect default export named YINI
                .catch(async () => {
                    // Fallback if your project exposes a local '../YINI'
                    const yiniPromise = useMemo(
                        () =>
                            import('yini-parser').then(
                                (m: any) => m.default ?? m,
                            ),
                        [],
                    )
                    return (m as any).default ?? m
                }),
        [],
    )

    async function runParse(src: string) {
        setError('')
        try {
            const YINI: any = await yiniPromise

            // Build options exactly as your API expects
            const options = {
                strictMode: strict,
                failLevel, // 'ignore-errors' | 'errors' | 'warnings-and-errors'
                includeMetadata: includeMeta,
                includeDiagnostics: includeMeta, // only respected if includeMetadata=true
                requireDocTerminator: 'optional' as const,
                throwOnError: false, // explicit to keep UI-friendly behavior
                quiet: true, // suppress console spam from the parser
            }

            const result = YINI.parse(src, options)

            // Shape depends on includeMetadata
            if (includeMeta) {
                // { result, meta }
                if (mode === 'meta') {
                    setOutput(
                        JSON.stringify((result as any).meta ?? {}, null, 2),
                    )
                } else {
                    const data =
                        mode === 'json'
                            ? (result as any).result
                            : (result as any).result
                    setOutput(JSON.stringify(data, null, 2))
                }
            } else {
                // Plain parsed object
                setOutput(JSON.stringify(result, null, 2))
            }
        } catch (e: any) {
            setOutput('')
            setError(e?.message ?? String(e))
        }
    }

    useEffect(() => {
        if (auto) runParse(code)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, mode, strict, failLevel, includeMeta, auto])

    const copyOut = async () => {
        try {
            await navigator.clipboard.writeText(output)
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
                    <strong>meta</strong>, and toggle strict mode.
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
                                        ? 'Enable metadata to view meta'
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
                                setFailLevel(e.target.value as typeof failLevel)
                            }>
                            <option value="ignore-errors">ignore-errors</option>
                            <option value="errors">errors</option>
                            <option value="warnings-and-errors">
                                warnings-and-errors
                            </option>
                        </select>
                    </label>

                    {/* Auto-validate & manual parse */}
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
                        onClick={() => runParse(code)}
                        className="btn btn-primary ms-auto"
                        disabled={auto}
                        title={
                            auto
                                ? 'Disable Auto-validate to use'
                                : 'Parse (Ctrl+Enter)'
                        }>
                        Parse
                    </button>
                </div>

                {/* Panels */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-slate-600">
                            Input (.yini)
                        </label>
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
                                    onClick={copyOut}
                                    className="btn btn-outline"
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
