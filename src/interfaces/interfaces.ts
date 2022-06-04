export interface CityData {
    lat: number
    lon: number
    name: string
    state?: string
    country: string
}

export interface City {
    id: number
    data: CityData
    weather: Weather
}

export interface CityState {
    searchSuggestions?: CityData[]
    cities: City[]
    selectedCityId?: number
}

export interface Suggestion {
    item: any
    value: string
}

export interface Weather {
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