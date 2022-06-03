const joinArray = (array: Array<any>, separator: string = ', ') => {
    return array
        .filter(value => value !== undefined)
        .join(separator)
}

export default joinArray