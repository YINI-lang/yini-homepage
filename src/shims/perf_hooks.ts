// Minimal browser-friendly shim for Node's "perf_hooks".
export const performance = (globalThis as any).performance ??
    // Fallback if performance is missing (very old browsers / non-DOM envs)
    { now: () => Date.now() }
