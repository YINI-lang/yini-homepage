export const formatNumber = (num: number): string => {
    const format = new Intl.NumberFormat()

    return format.format(num)
}
