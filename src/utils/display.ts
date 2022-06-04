const display = (
    array: Array<any>,
    maxElements: number | undefined = undefined,
    separator: string = ', '
) => {
    return array
        .filter(value => value !== undefined)
        .slice(0, maxElements)
        .join(separator)
}

export default display