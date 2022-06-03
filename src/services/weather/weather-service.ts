import { CityData } from '../../interfaces/interfaces';
import request from '../../utils/request';

const baseUrl = 'https://api.openweathermap.org';
const apiKey = '25f470fb61e57d9ef1dd1bcaa95c3b55';

const getCities = async (
    search: string,
    limit: number = 5,
) : Promise<CityData[]> => {

    return await request(baseUrl, 'geo/1.0/direct', new URLSearchParams({
        q: search,
        limit: limit.toString(),
        appid: apiKey
    }));
}

export { getCities };