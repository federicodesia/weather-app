import { useReducer } from 'react';
import { City, CityData, CityState } from '../interfaces/city';
import { getCities, getForecast, getWeather } from '../services/weather/weather-service';
import { daysForecast, forecastFromResponse, rainForecast } from '../utils/converters/forecast-converter';
import weatherFromResponse from '../utils/converters/weather-converter';
import { CityContext } from './city-context';
import { cityReducer } from './city-reducer';

export const initialState: CityState = {
    isLoading: false,
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
        const city = cityState.cities.find(city =>
            city.data.lat === data.lat
            && city.data.lon === data.lon)

        if (city) {
            dispatch({ type: 'setSuggestions', payload: undefined })
            selectCity(city)
        }
        else {
            dispatch({
                type: 'addCity',
                payload: await fetchCity(data)
            })
        }
    }

    const selectCity = async (city: City) => {
        dispatch({ type: 'selectCity', payload: city })

        if (new Date().getTime() - city.updatedAt.getTime() > 5 * 60 * 1000) {
            dispatch({
                type: 'updateCity',
                payload: await fetchCity(city.data)
            })
        }
    }

    const setLoading = (value: boolean) => {
        dispatch({type: 'setLoading', payload: value})
    }

    const fetchCity = async (data: CityData): Promise<City> => {

        setLoading(true)
        const weatherResponse = await getWeather(data.lat, data.lon);
        const forecast = forecastFromResponse(await getForecast(data.lat, data.lon))
        setLoading(false)

        return {
            id: weatherResponse.id,
            data: data,
            updatedAt: new Date(),
            weather: weatherFromResponse(weatherResponse),
            forecast: daysForecast(forecast),
            rainForecast: rainForecast(forecast)
        }
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
