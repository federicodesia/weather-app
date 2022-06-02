import { request } from '../../utils/request';
import { SearchCity } from './weather-models';

const baseUrl = 'https://api.openweathermap.org';
const apiKey = '25f470fb61e57d9ef1dd1bcaa95c3b55';

const searchCities = async (
    cityName: string,
    limit: number = 5,
) : Promise<SearchCity[]> => {

    return await request(baseUrl, 'geo/1.0/direct', new URLSearchParams({
        q: cityName,
        limit: limit.toString(),
        appid: apiKey
    }));
}

export { searchCities };