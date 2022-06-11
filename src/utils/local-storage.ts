const readLocalStorage = <T>(key: string, initialValue: T): T => {
    if (typeof window === 'undefined') return initialValue

    try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
        console.error(error);
        return initialValue;
    }
}

const writeLocalStorage = <T>(key: string, value: T): void => {
    try {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
}

export { readLocalStorage, writeLocalStorage }