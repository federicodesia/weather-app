import { useEffect, useReducer, useRef } from 'react';
import { City, CityData, CityState, initialCities } from '../../interfaces/city';
import { getCities, getForecast, getWeather } from '../../services/weather/weather-service';
import { awaitAtLeast } from '../../utils/await-at-least';
import { daysForecast, forecastFromResponse, rainForecast } from '../../utils/converters/forecast-converter';
import weatherFromResponse from '../../utils/converters/weather-converter';
import { readLocalStorage, writeLocalStorage } from '../../utils/local-storage';
import { CityContext } from './city-context';
import { cityReducer } from './city-reducer';

export const initialState: CityState = {
    isLoading: true,
    ongoingRequests: 0,
    searchSuggestions: undefined,
    cities: readLocalStorage('cities', []),
    selectedCityId: readLocalStorage('selectedCityId', undefined)
}

interface CityProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const CityProvider = ({ children }: CityProviderProps) => {

    const ignoreEffect = useRef(false)
    const [cityState, dispatch] = useReducer(cityReducer, initialState);

    useEffect(() => {
        writeLocalStorage('cities', cityState.cities)
    }, [cityState.cities])

    useEffect(() => {
        writeLocalStorage('selectedCityId', cityState.selectedCityId)
    }, [cityState.selectedCityId])

    useEffect(() => {

        const initialFetch = async () => {
            if (cityState.cities.length > 0) {
                await selectCity(cityState.cities.find(city =>
                    city.id === cityState.selectedCityId
                ) ?? cityState.cities[0])
            }
            else {
                await Promise.all(initialCities.map(async (city) => {
                    await addCity(city)
                }));
            }
        }

        if (!ignoreEffect.current) {
            awaitAtLeast(initialFetch, 1500).then(() => {
                dispatch({ type: 'setIsLoading', payload: false })
            })
        }

        return () => { ignoreEffect.current = true }
    }, [])

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

            if (cityState.cities.length > 5) {
                deleteCity(cityState.cities.last())
            }
        }
    }

    const selectCity = async (city: City) => {
        dispatch({ type: 'selectCity', payload: city })
        await refreshCity(city)
    }

    const refreshCity = async (city: City) => {
        if (new Date().getTime() - city.updatedAt > 5 * 60 * 1000) {
            dispatch({
                type: 'updateCity',
                payload: await fetchCity(city.data)
            })
        }
    }

    const deleteCity = (city: City) => {
        const { cities, selectedCityId } = cityState

        if (cities.length > 1) {
            if (selectedCityId === city.id) {
                const index = cities.indexOf(city)
                const newSelectedCity = cities.at(index + 1) ?? cities.at(index - 1)
                if (newSelectedCity) selectCity(newSelectedCity)
            }
            dispatch({ type: 'deleteCity', payload: city })
        }
    }

    const fetchCity = async (data: CityData): Promise<City> => {

        dispatch({ type: 'setOngoingRequest', payload: true })
        const weatherResponse = await getWeather(data.lat, data.lon);
        const forecast = forecastFromResponse(await getForecast(data.lat, data.lon))
        dispatch({ type: 'setOngoingRequest', payload: false })

        return {
            id: weatherResponse.id,
            data: data,
            updatedAt: new Date().getTime(),
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
            selectCity,
            deleteCity,
            refreshCity
        }}>
            {children}
        </CityContext.Provider>
    )
}
