/*
 * Random on each page load (client-side).
 */
export function RandomHeadlineH1({ headlines }: { headlines: string[] }) {
    const random = headlines[Math.floor(Math.random() * headlines.length)]
    return (
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {random}
        </h1>
    )
}
