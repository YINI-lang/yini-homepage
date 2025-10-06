// Minimal browser shim for Node's "crypto" createHash API.
// This is **not cryptographically secure**. It's only to satisfy
// metadata hashing in the browser (diagnostics, IDs).
// If you need real SHA-256, swap the core with a pure JS lib.

type Enc = 'hex' | 'base64' | 'buffer'

function toUint8(data: string | ArrayBuffer | Uint8Array): Uint8Array {
    if (typeof data === 'string') return new TextEncoder().encode(data)
    if (data instanceof Uint8Array) return data
    return new Uint8Array(data)
}

// Simple FNV-1a 32-bit (fast, deterministic). Not crypto-secure.
function fnv1a32(bytes: Uint8Array): number {
    let h = 0x811c9dc5
    for (let i = 0; i < bytes.length; i++) {
        h ^= bytes[i]
        h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0
    }
    return h >>> 0
}

function toHex(bytes: Uint8Array): string {
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function hexStringFrom32(h: number, length = 64): string {
    // Repeat 32-bit chunk to reach desired hex length (64 nibbles ~ SHA-256 length).
    const chunk = h.toString(16).padStart(8, '0')
    return chunk.repeat(Math.ceil(length / 8)).slice(0, length)
}

export function createHash(_algo: string) {
    const chunks: Uint8Array[] = []
    return {
        update(data: string | ArrayBuffer | Uint8Array) {
            chunks.push(toUint8(data))
            return this
        },
        digest(enc: Enc = 'hex') {
            // concat all chunks
            let total = 0
            for (const c of chunks) total += c.length
            const all = new Uint8Array(total)
            let off = 0
            for (const c of chunks) {
                all.set(c, off)
                off += c.length
            }

            // produce a deterministic 64-hex "hash" (FNV-1a based)
            const h32 = fnv1a32(all)
            const hex64 = hexStringFrom32(h32, 64)
            const bytes = new Uint8Array(
                hex64.match(/.{2}/g)!.map((x) => parseInt(x, 16)),
            )

            if (enc === 'hex') return hex64
            if (enc === 'buffer') return bytes
            // base64
            let bin = ''
            for (let i = 0; i < bytes.length; i++)
                bin += String.fromCharCode(bytes[i])
            return btoa(bin)
        },
    }
}

// Default export shape some code expects (CommonJS-like interop)
export default { createHash }
