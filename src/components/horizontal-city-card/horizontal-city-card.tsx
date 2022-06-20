import styles from './horizontal-city-card.module.css';

import { useContext } from 'react';
import { ContextMenuContext } from '../../context/context-menu-context/context-menu-context';
import { City } from '../../interfaces/city';
import display from '../../utils/display';
import WeatherIcon from '../weather-icon/weather-icon';

type HorizontalCityCardProps = {
    city: City
    onSelect: () => void
};

function HorizontalCityCard({ city, onSelect }: HorizontalCityCardProps) {

    return <div
        className={styles.container}
        onClick={onSelect}>

        <div className={styles.left}>
            <h4>{city.data.name} </h4>
            <span className={styles.lightText}>
                {
                    display([
                        city.data.state,
                        city.data.country
                    ])
                }
            </span>
        </div>

        <div className={styles.right}>
            <WeatherIcon icon={city.weather.icon} />
            <h4>{city.weather.main.temp}°C</h4>
        </div>
    </div>
}

export default HorizontalCityCard;