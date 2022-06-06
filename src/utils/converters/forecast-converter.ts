import { Forecast, ForecastResponse } from "../../interfaces/forecast"
import average from "../average";
import groupBy from "../group-by";

export default function forecastFromResponse(response: ForecastResponse): Forecast[] {
    const forecasts = response.list.map(item => {
        const { main } = item

        return {
            ...item,
            dt: item.dt.toDate(response.city.timezone),
            tempMin: main.temp_min,
            tempMax: main.temp_max
        }
    })

    const groupedForecasts = groupBy(forecasts, item => item.dt.toDateString());

    return Array.from(
        groupedForecasts, ([key, value]) => {
            return {
                dt: new Date(key),
                tempMin: Math.min(...value.map(item => item.tempMin)).round(),
                tempMax: Math.max(...value.map(item => item.tempMax)).round(),
                pop: (average(value, item => item.pop) * 100).round()
            }
        }
    );
}