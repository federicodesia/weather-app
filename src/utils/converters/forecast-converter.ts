import { Forecast, ForecastResponse, RainForecast } from "../../interfaces/forecast"
import average from "../average";
import groupBy from "../group-by";
import getMostFrequent from "../most-frecuent";

function forecastFromResponse(response: ForecastResponse): Forecast[] {
    return response.list.map(item => {
        const { main, weather } = item

        return {
            icon: weather[0].icon,
            cnt: 0,
            dt: item.dt.dateWithTimezone(response.city.timezone),
            tempMin: main.temp_min,
            tempMax: main.temp_max,
            pop: item.pop
        }
    })
}

function rainForecast(forecasts: Forecast[]): RainForecast[] {
    return forecasts.slice(0, 10).map(item => {
        return {
            dt: item.dt,
            pop: item.pop
        }
    })
}

function daysForecast(forecasts: Forecast[]) {
    const groupedForecasts = groupBy(forecasts, item => new Date(item.dt).toDateString());

    let daysForecast: Forecast[] = Array.from(
        groupedForecasts, ([key, value]) => {
            return {
                icon: getMostFrequent(value, item => item.icon)?.icon ?? '',
                cnt: value.length,
                dt: new Date(key).getTime(),
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