export const awaitAtLeast = async <T>(
    fn: () => Promise<T>,
    ms: number
) => {
    await Promise.all([
        new Promise(r => setTimeout(r, ms)),
        await fn()
    ]);
}