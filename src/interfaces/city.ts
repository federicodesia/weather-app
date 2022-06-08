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
}

export interface CityState {
    searchSuggestions?: CityData[]
    cities: City[]
    selectedCityId?: number
}