const getMostFrequent = <T, K>(
    array: Array<T>,
    key: (item: T) => K
) => {
    const counts = array.reduce((result, item) => {
        const itemKey = key(item)
        return result.set(itemKey, (result.get(itemKey) ?? 0) + 1)
    }, new Map<K, number>());

    const mostFrecuent = Math.max(...Array.from(counts.values()));

    return array.find(item => {
        const itemKey = key(item)
        return counts.get(itemKey) === mostFrecuent
    })
};

export default getMostFrequent