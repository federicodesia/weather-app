import styles from './light-panel.module.css';

import SearchBar from '../search-bar/search-bar';
import CityCard from '../city-card/city-card';
import NextDaysForecast from '../next-days-forecast/next-days-forecast';

import { IoSearchOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { CityContext } from '../../context/city-context';
import joinArray from '../../utils/join-array';
import { CityData } from '../../interfaces/interfaces';

function LightPanel() {

  const { cityState, searchCity } = useContext(CityContext)

  const suggestions = cityState.searchSuggestions.map(city => {
    return {
      item: city,
      value: joinArray([city.name, city.state, city.country])
    }
  })

  const onSearchCitySelected = (city: CityData) => {
    console.log(`Lat: ${city.lat}, Lon: ${city.lon}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentPadding}>

        <SearchBar
          placeholder='Search new place'
          prefix={<IoSearchOutline />}
          suggestions={suggestions}
          onSearch={searchCity}
          onSelected={onSearchCitySelected} />

        <div className={styles.header}>
          <h2>Weather </h2>
          <h2 className='bold-h2'>Forecast</h2>
        </div>
      </div>

      <div className='horizontal-scroll start'>
        <CityCard name='Berlin, Germany'></CityCard>
        <CityCard name='Paris, France'></CityCard>
        <CityCard name='New York, USA'></CityCard>
      </div>

      <div className='horizontal-scroll column'>
        <NextDaysForecast days={[
          {
            dayName: "Sunday",
            probabilityRain: 54,
            minTemp: 17,
            maxTemp: 28
          },
          {
            dayName: "Tuesday",
            probabilityRain: 54,
            minTemp: 19,
            maxTemp: 25
          },
          {
            dayName: "Wednesday",
            probabilityRain: 54,
            minTemp: 14,
            maxTemp: 21
          },
          {
            dayName: "Thursday",
            probabilityRain: 54,
            minTemp: 14,
            maxTemp: 18
          },
          {
            dayName: "Friday",
            probabilityRain: 54,
            minTemp: 22,
            maxTemp: 28
          }
        ]}></NextDaysForecast>
      </div>
    </div>
  );
}

export default LightPanel;