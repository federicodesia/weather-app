const groupBy = <T, K>(
    array: T[],
    key: (item: T) => K
) => {
    return array.reduce((result, item) => {
        const itemKey = key(item)
        return result.set(itemKey, [...result.get(itemKey) || [], item])
    }, new Map<K, T[]>());
}

export default groupBy