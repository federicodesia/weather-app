export { }

declare global {
    export interface Array<T> {
        first(): T
        last(): T
    }
}

Array.prototype.first = function<T> (this: Array<T>) {
    return this.at(0)
};

Array.prototype.last = function<T> (this: Array<T>) {
    return this.at(this.length - 1)
};