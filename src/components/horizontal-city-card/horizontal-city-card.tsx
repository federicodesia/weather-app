import styles from './horizontal-city-card.module.css';

import { City } from '../../interfaces/city';
import display from '../../utils/display';
import WeatherIcon from '../weather-icon/weather-icon';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useLongPress } from '../../hooks/use-long-press';

type HorizontalCityCardProps = {
    city: City
    isChecked: boolean,
    onSelect: () => void
    onLongPress: () => void
};

function HorizontalCityCard({ city, isChecked, onSelect, onLongPress }: HorizontalCityCardProps) {
    const handleLongPress = useLongPress({
        onClick: onSelect,
        onLongPress: onLongPress
    });

    return <div
        className={`${styles.container} unselectable`}
        {...handleLongPress}>

        {
            <IoIosCheckmarkCircle className={`${styles.check} ${isChecked && styles.visible}`} />
        }

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