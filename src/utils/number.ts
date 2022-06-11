export { }

declare global {
    export interface Number {
        round(): number
        dateWithTimezone(timezone?: number): number;
    }
}

Number.prototype.round = function (this: number) {
    return Math.round(this)
};

Number.prototype.dateWithTimezone = function (this: number, timezone?: number) {
    if (timezone) {
        const localTzOffsetMs = new Date().getTimezoneOffset() * 60000
        return (this + timezone) * 1000 + localTzOffsetMs
    }
    return this * 1000
};