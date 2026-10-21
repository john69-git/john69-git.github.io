/**
 * Resolves a file from /public against Vite's `base` (see vite.config.ts),
 * so image paths keep working whether the site lives at "/" or "/some-repo/".
 *   asset('images/me.jpg') → '/images/me.jpg'
 */
export function asset(path: string): string {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

/** Small deterministic random generator — keeps procedural artwork identical on every render. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
