export interface ForecastResponse {
    list: {
        dt: number
        main: {
            temp_min: number
            temp_max: number
        }
        weather: [
            {
                icon: string
            }
        ]
        pop: number
    }[],
    city: {
        timezone: number
    }
}

export interface Forecast {
    icon: string
    cnt: number
    dt: number
    tempMin: number
    tempMax: number
    pop: number
}

export interface RainForecast {
    dt: number,
    pop: number
}