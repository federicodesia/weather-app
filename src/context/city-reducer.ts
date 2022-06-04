import { City, CityData, CityState } from "../interfaces/interfaces";

type CityAction =
    | { type: 'setSuggestions', payload: CityData[] | undefined }
    | { type: 'addCity', payload: City }
    | { type: 'selectCity', payload: City }

export const cityReducer = (
    state: CityState,
    action: CityAction
): CityState => {

    switch (action.type) {
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
                cities: [...state.cities, action.payload]
            }
        
        case 'selectCity':
            return {
                ...state,
                selectedCityId: action.payload.id
            }

        default:
            return state;
    }
}