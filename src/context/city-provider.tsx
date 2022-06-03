import { useReducer } from 'react';
import { CityState } from '../interfaces/interfaces';
import { getCities } from '../services/weather/weather-service';
import { CityContext } from './city-context';
import { cityReducer } from './city-reducer';

export const initialState: CityState = {
    searchSuggestions: []
}

interface CityProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const CityProvider = ({ children }: CityProviderProps) => {

    const [cityState, dispatch] = useReducer(cityReducer, initialState);

    const searchCity = async (value: string) => {
        if(value){
            const suggestions = (await getCities(value)).map(data => {
                const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                const regionName = regionNames.of(data.country) ?? data.country;
                return { ...data, country: regionName };
            });
            dispatch({ type: 'setSuggestions', payload: suggestions })
        }
        else dispatch({ type: 'setSuggestions', payload: [] })
    }

    return (
        <CityContext.Provider value={{
            cityState,
            searchCity
        }}>
            {children}
        </CityContext.Provider>
    )
}