/**
 * Date-only utilities.
 */

export function getDayOfYear(date = new Date()): number {
    const startOfYear = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - startOfYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    return Math.floor(diff / oneDay)
}
