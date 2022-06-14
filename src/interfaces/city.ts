import { Forecast, RainForecast } from "./forecast"
import { Weather } from "./weather"

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
    forecast: Forecast[]
    rainForecast: RainForecast[]
    updatedAt: number
}

export interface CityState {
    isLoading: boolean
    ongoingRequests: number
    searchSuggestions?: CityData[]
    cities: City[]
    selectedCityId?: number
}

export const initialCities: CityData[] = [
    {
        lat: 52.5170365,
        lon: 13.3888599,
        name: 'Berlin',
        state: 'Berlin',
        country: 'Germany'
    },
    {
        lat: 48.8588897,
        lon: 2.3200410217200766,
        name: "Paris",
        state: "Ile-de-France",
        country: "France"
    },
    {
        lat: 40.7127281,
        lon: -74.0060152,
        name: "New York",
        state: "New York",
        country: "United States"
    }
]