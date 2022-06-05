import { Weather, WeatherResponse } from "../../interfaces/weather"

export default function weatherFromResponse(response: WeatherResponse): Weather {
    const { main, sys, timezone } = response

    return {
        ...response,
        main: {
            ...main,
            temp: main.temp.round(),
            feelsLike: main.feels_like.round(),
            tempMin: main.temp_min.round(),
            tempMax: main.temp_max.round()
        },
        dt: response.dt.toDate(timezone),
        sys: {
            sunrise: sys.sunrise.toDate(timezone),
            sunset: sys.sunset.toDate(timezone),
        }
    }
}