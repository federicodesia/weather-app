import useSelectedCity from '../../hooks/use-selected-city';
import WeatherIcon from '../weather-icon/weather-icon';
import styles from './next-hours-forecast.module.css';

function NextHoursForecast() {
    const selectedCity = useSelectedCity()

    return <ul className={styles.hours}>
        {
            selectedCity?.hourlyForecast.map(hour => {

                const date = new Date(hour.dt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })

                return <li key={`${selectedCity?.id} ${hour.dt}`}>
                    <span>{date}</span>
                    <WeatherIcon icon={hour.icon} />
                    <span>{`${Math.round(hour.temp)}°`}</span>
                </li>
            })
        }
    </ul>
}

export default NextHoursForecast