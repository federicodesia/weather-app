export interface ForecastResponse {
    list: {
        dt: number
        main: {
            temp_min: number
            temp_max: number
        }
        pop: number
    }[],
    city: {
        timezone: number
    }
}

export interface Forecast {
    dt: Date
    tempMin: number
    tempMax: number
    pop: number
}