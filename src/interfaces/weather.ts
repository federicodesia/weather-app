export interface WeatherResponse {
    id: number
    weather: [
        {
            icon: string
        }
    ]
    main: {
        temp: number,
        feels_like: number
        temp_min: number
        temp_max: number
    }
    dt: number
    sys: {
        sunrise: number
        sunset: number
    }
    timezone: number
}

export interface Weather {
    icon: string
    main: {
        temp: number,
        feelsLike: number
        tempMin: number
        tempMax: number
    }
    dt: number
    sys: {
        sunrise: number
        sunset: number
    }
}