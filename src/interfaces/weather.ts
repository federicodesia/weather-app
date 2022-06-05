export interface WeatherResponse extends Object {
    id: number
    main: {
        temp: number,
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number,
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        sunrise: number
        sunset: number
    }
    timezone: number
}

export interface Weather {
    main: {
        temp: number,
        feelsLike: number
        tempMin: number
        tempMax: number
        pressure: number
        humidity: number
    }
    visibility: number,
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: Date
    sys: {
        sunrise: Date
        sunset: Date
    }
}