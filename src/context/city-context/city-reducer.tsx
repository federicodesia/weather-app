import { City, CityData, CityState } from "../../interfaces/city";

type CityAction =
    | { type: 'setOngoingRequests', payload: number }
    | { type: 'setSuggestions', payload: CityData[] | undefined }
    | { type: 'addCity', payload: City }
    | { type: 'selectCity', payload: City }
    | { type: 'updateCity', payload: City }
    | { type: 'deleteCity', payload: City }

export const cityReducer = (
    state: CityState,
    action: CityAction
): CityState => {

    switch (action.type) {
        case 'setOngoingRequests':
            return {
                ...state,
                ongoingRequests: action.payload
            }

        case 'setSuggestions':
            return {
                ...state,
                searchSuggestions: action.payload
            }

        case 'addCity':
            return {
                ...state,
                searchSuggestions: undefined,
                selectedCityId: action.payload.id,
                cities: [action.payload, ...state.cities]
            }

        case 'selectCity':
            return {
                ...state,
                selectedCityId: action.payload.id
            }

        case 'updateCity':
            return {
                ...state,
                cities: state.cities.map(city => {
                    return city.id === action.payload.id
                        ? action.payload
                        : city
                })
            }

        case 'deleteCity':
            return {
                ...state,
                cities: state.cities.filter(city => {
                    return city.id !== action.payload.id
                })
            }

        default:
            return state;
    }
}