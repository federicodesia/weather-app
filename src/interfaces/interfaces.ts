export interface CityData {
    lat: number
    lon: number
    name: string
    state: string
    country: string
};

export interface City {
    data: CityData
}

export interface CityState {
    searchSuggestions: CityData[]
}

export interface Suggestion {
    item: any
    value: string
}