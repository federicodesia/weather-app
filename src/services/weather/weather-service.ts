import { ForecastResponse } from '../../interfaces/forecast';
import { CityData } from '../../interfaces/city';
import { WeatherResponse } from '../../interfaces/weather';
import request from '../../utils/request';

const baseUrl = 'https://api.openweathermap.org';
const apiKey = '25f470fb61e57d9ef1dd1bcaa95c3b55';

type tempUnits = 'standard' | 'metric' | 'imperial';

const getCities = async (
    search: string,
    limit: number = 5,
): Promise<CityData[]> => {

    return await request(baseUrl, 'geo/1.0/direct', new URLSearchParams({
        q: search,
        limit: limit.toString(),
        appid: apiKey
    }));
}

const getWeather = async (
    lat: number,
    lon: number,
    tempUnits: tempUnits = 'metric'
): Promise<WeatherResponse> => {

    return await request(baseUrl, 'data/2.5/weather', new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        units: tempUnits,
        appid: apiKey
    }));
}

const getForecast = async (
    lat: number,
    lon: number,
    tempUnits: tempUnits = 'metric'
): Promise<ForecastResponse> => {

    return await request(baseUrl, 'data/2.5/forecast', new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        units: tempUnits,
        appid: apiKey
    }));
}

export { getCities, getWeather, getForecast };