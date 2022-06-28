import styles from './dark-panel.module.css';

import useSelectedCity from '../../hooks/use-selected-city';

import { IoMdCloudy } from "react-icons/io";
import display from '../../utils/display';
import WeatherIcon from '../weather-icon/weather-icon';
import ProbabilityRain from '../probability-rain/probability-rain';
import useMediaQuery from '../../hooks/use-media-query';
import { MdShortText } from 'react-icons/md';
import NextDaysForecast from '../next-days-forecast/next-days-forecast';
import SideDrawer from '../side-drawer/side-drawer';
import { useContext, useState } from 'react';
import { CityContext } from '../../context/city-context/city-context';

function DarkPanel() {

  const minWidth = useMediaQuery('(min-width: 1201px)')
  const minHeight = useMediaQuery('(min-height: 801px)')
  const isLarge = minWidth && minHeight

  const { cityState } = useContext(CityContext)
  const selectedCity = useSelectedCity()
  const { data, weather } = selectedCity ?? {}
  const { icon, main, sys } = weather ?? {}

  const sunset = sys ? new Date(sys.sunset) : undefined

  const [isDrawerExpanded, setDrawerExpanded] = useState(false)

  return <>
    <div className={styles.container}>
      <div className={styles.clouds}>
        <IoMdCloudy size={220} id={styles.cloud1} />
        <IoMdCloudy size={220} id={styles.cloud2} />
        <IoMdCloudy size={100} id={styles.cloud3} />
      </div>

      <div className={styles.absoluteContent}>

        {
          !isLarge && <div className={styles.navBarContainer}>
            {
              cityState.ongoingRequests > 0 && <div className={styles.floating} >
                <div className='loading-bar' />
              </div>
            }

            {
              <div className={styles.navBar}>
                <MdShortText className={styles.drawerIcon} onClick={() => setDrawerExpanded(true)} />
                <h4 className={styles.header}>Weather Forecast</h4>
              </div>
            }
          </div>
        }

        <div className={styles.content}>
          <div className={styles.currentWeather}>

            <div className='row center'>
              <div id={styles.todayIcon}>
                <WeatherIcon icon={icon} size={28} />
              </div>

              <div className='column'>
                <h3>Today</h3>
                <span id={styles.date}>
                  {
                    weather && new Date(weather.dt).toLocaleDateString('en-US', {
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

            <div className='row center'>
              <span>
                {`Feels like ${main?.feelsLike}`}
              </span>
              <span id={styles.dot}>•</span>
              <span>
                {`Sunset ${sunset?.getHours()}:${sunset?.getMinutes()}`}
              </span>
            </div>
          </div>

          {
            !isLarge && <div className={styles.roundedContainer}>
              <NextDaysForecast
                selectedCityId={selectedCity?.id}
                days={selectedCity?.forecast}
              />
            </div>
          }

          <div className={styles.roundedContainer} >
            <ProbabilityRain items={selectedCity?.rainForecast} />
          </div>
        </div>
      </div>
    </div>

    {
      !isLarge && <SideDrawer
        isExpanded={isDrawerExpanded}
        onClose={() => setDrawerExpanded(false)} />
    }
  </>;
}

export default DarkPanel;