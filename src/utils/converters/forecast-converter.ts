import { Forecast, ForecastResponse } from "../../interfaces/forecast"
import average from "../average";
import groupBy from "../group-by";
import getMostFrequent from "../most-frecuent";

export default function forecastFromResponse(response: ForecastResponse): Forecast[] {
    const forecasts: Forecast[] = response.list.map(item => {
        const { main, weather } = item

        return {
            ...item,
            icon: weather[0].icon,
            cnt: 0,
            dt: item.dt.toDate(response.city.timezone),
            tempMin: main.temp_min,
            tempMax: main.temp_max
        }
    })

    const groupedForecasts = groupBy(forecasts, item => item.dt.toDateString());
    
    let daysForecast = Array.from(
        groupedForecasts, ([key, value]) => {
            return {
                icon: getMostFrequent(value, item => item.icon)?.icon ?? '',
                cnt: value.length,
                dt: new Date(key),
                tempMin: Math.min(...value.map(item => item.tempMin)).round(),
                tempMax: Math.max(...value.map(item => item.tempMax)).round(),
                pop: (average(value, item => item.pop) * 100).round()
            }
        }
    );

    if(daysForecast.length > 5){
        daysForecast.first().cnt >= daysForecast.last().cnt
            ? daysForecast.pop()
            : daysForecast.shift()
    }
    console.log(daysForecast)

    return daysForecast
}