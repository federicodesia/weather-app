import { Forecast, ForecastResponse, RainForecast } from "../../interfaces/forecast"
import average from "../average";
import groupBy from "../group-by";
import getMostFrequent from "../most-frecuent";

function forecastFromResponse(response: ForecastResponse): Forecast[] {
    return response.list.map(item => {
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
}

function rainForecast(forecasts: Forecast[]) : RainForecast[] {
    return forecasts.slice(0, 6).map(item => {
        return { ...item }
    })
}

function daysForecast(forecasts: Forecast[]) {
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

    if (daysForecast.length > 5) {
        daysForecast.first().cnt >= daysForecast.last().cnt
            ? daysForecast.pop()
            : daysForecast.shift()
    }
    return daysForecast
}

export { forecastFromResponse, daysForecast, rainForecast }