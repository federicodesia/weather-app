import { CityData, CityState } from "../interfaces/interfaces";

type CityAction =
    | { type: 'setSuggestions', payload: CityData[] }

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

        default:
            return state;
    }
}