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
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
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
        humidity: number
    }
    visibility: number
    windSpeed: number
    dt: number
    sys: {
        sunrise: number
        sunset: number
    }
}