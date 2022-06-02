import { request } from '../../utils/request';

const baseUrl = 'https://api.openweathermap.org';
const apiKey = '25f470fb61e57d9ef1dd1bcaa95c3b55';

const searchCities = async (
    cityName: string,
    limit: number = 5,
) => {

    const response = await request(baseUrl, 'geo/1.0/direct', new URLSearchParams({
        q: cityName,
        limit: limit.toString(),
        appid: apiKey
    }));
    return await response.json();
}

export { searchCities };