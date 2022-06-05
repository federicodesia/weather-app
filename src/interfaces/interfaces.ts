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