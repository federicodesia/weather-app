import { BsWind } from 'react-icons/bs';
import { MdOutlineVisibility, MdOutlineWaterDrop } from 'react-icons/md';
import useSelectedCity from '../../hooks/use-selected-city';
import styles from './day-details.module.css';

function DayDetails() {
    const selectedCity = useSelectedCity()
    if(!selectedCity) return <div/>

    return <div className={styles.container}>
        <div className={styles.detail} >
            <MdOutlineVisibility className={styles.icon} />
            <h5>{`${selectedCity.weather.visibility} km`} </h5>
            <span>Visibility</span>
        </div>

        <div className={styles.detail} >
            <BsWind className={styles.icon} />
            <h5>{`${selectedCity.weather.windSpeed} km/h`} </h5>
            <span>Wind</span>
        </div>

        <div className={styles.detail} >
            <MdOutlineWaterDrop className={styles.icon} />
            <h5>{`${selectedCity.weather.main.humidity}%`} </h5>
            <span>Humidity</span>
        </div>
    </div>
}

export default DayDetails