import styles from './weather-loader.module.css';

function WeatherLoader() {
    return (
        <div className={styles.container}>
            <div className={styles.cloud}></div>
            <div className={styles.cloud}></div>
        </div>
    )
}

export default WeatherLoader;