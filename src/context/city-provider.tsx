import { useReducer } from 'react';
import { City, CityData, CityState } from '../interfaces/interfaces';
import { getCities, getWeather } from '../services/weather/weather-service';
import { CityContext } from './city-context';
import { cityReducer } from './city-reducer';

export const initialState: CityState = {
    searchSuggestions: undefined,
    cities: []
}

interface CityProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const CityProvider = ({ children }: CityProviderProps) => {

    const [cityState, dispatch] = useReducer(cityReducer, initialState);

    const searchCity = async (value: string) => {
        dispatch({
            type: 'setSuggestions',
            payload: value ? (await getCities(value)).map(data => {
                const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                const regionName = regionNames.of(data.country) ?? data.country;
                return { ...data, country: regionName };
            }) : undefined
        })
    }

    const addCity = async (data: CityData) => {
        const current = cityState.cities.find(city =>
            city.data.lat === data.lat || city.data.lon === data.lon)
        
        if(current){
            dispatch({ type: 'setSuggestions', payload: undefined })
            selectCity(current)
        }
        else{
            const weather = await getWeather(data.lat, data.lon);
            dispatch({
                type: 'addCity', payload: {
                    id: weather.id,
                    data: data,
                    weather: weather
                }
            })
        }
    }

    const selectCity = (city: City) => {
        dispatch({ type: 'selectCity', payload: city })
    }

    return (
        <CityContext.Provider value={{
            cityState,
            searchCity,
            addCity,
            selectCity
        }}>
            {children}
        </CityContext.Provider>
    )
}