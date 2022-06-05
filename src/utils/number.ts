export { }

declare global {
    export interface Number {
        round(): number
        toDate(timezone?: number): Date;
    }
}

Number.prototype.round = function (this: number) {
    return Math.round(this)
};

Number.prototype.toDate = function (this: number, timezone?: number) {
    if (timezone) {
        const localTzOffsetMs = new Date().getTimezoneOffset() * 60000
        return new Date((this + timezone) * 1000 + localTzOffsetMs)
    }
    return new Date(this * 1000)
};