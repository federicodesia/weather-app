import { Weather, WeatherResponse } from "../../interfaces/weather"

export default function weatherFromResponse(response: WeatherResponse): Weather {
    const { weather, main, sys, timezone } = response

    return {
        icon: weather[0].icon,
        main: {
            temp: main.temp.round(),
            feelsLike: main.feels_like.round(),
            tempMin: main.temp_min.round(),
            tempMax: main.temp_max.round()
        },
        dt: response.dt.dateWithTimezone(timezone),
        sys: {
            sunrise: sys.sunrise.dateWithTimezone(timezone),
            sunset: sys.sunset.dateWithTimezone(timezone),
        }
    }
}