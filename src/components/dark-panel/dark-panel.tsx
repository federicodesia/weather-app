import styles from './dark-panel.module.css';

import useSelectedCity from '../../hooks/use-selected-city';

import { IoMdCloudy } from "react-icons/io";
import display from '../../utils/display';
import WeatherIcon from '../weather-icon/weather-icon';
import ProbabilityRain from '../probability-rain/probability-rain';

function DarkPanel() {
  const selectedCity = useSelectedCity()
  const { data, weather } = selectedCity ?? {}
  const { icon, main, sys } = weather ?? {}

  return (
    <div className={styles.container}>
      <div className={styles.clouds}>
        <IoMdCloudy size={220} id={styles.cloud1} />
        <IoMdCloudy size={220} id={styles.cloud2} />
        <IoMdCloudy size={100} id={styles.cloud3} />
      </div>

      <div className={styles.absoluteContent}>
        <div className={styles.content}>
          <div className={styles.currentWeather}>

            <div className='row center-items'>
              <div id={styles.todayIcon}>
                <WeatherIcon icon={icon} size={28} />
              </div>

              <div className='column'>
                <h3>Today</h3>
                <span id={styles.date}>
                  {
                    weather?.dt.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                </span>
              </div>
            </div>

            <div className={styles.tempContainer}>
              <div className='row'>
                <h1>{main?.temp}</h1>
                <h2>°C</h2>
              </div>
            </div>

            <span>
              {display([
                data?.name,
                data?.state,
                data?.country
              ], 2)}
            </span>

            <div className='row center-items'>
              <span>
                {`Feels like ${main?.feelsLike}`}
              </span>
              <span id={styles.dot}>•</span>
              <span>
                {`Sunset ${sys?.sunset.getHours()}:${sys?.sunset.getMinutes()}`}
              </span>
            </div>
          </div>

          <ProbabilityRain items={selectedCity?.rainForecast} />
        </div>
      </div>
    </div>
  );
}

export default DarkPanel;