import { BsCloudyFill } from 'react-icons/bs';
import styles from './weather-loader.module.css';

function WeatherLoader() {
    return <div className={styles.container}>
        <BsCloudyFill className={styles.cloud} />
        <BsCloudyFill className={styles.cloud} />
    </div>
}

export default WeatherLoader;