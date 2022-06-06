const average = <T>(
    array: T[],
    key: (item: T) => number
) => {
    return array.reduce(
        (result, item) => result + key(item), 0
    ) / array.length;
}

export default average