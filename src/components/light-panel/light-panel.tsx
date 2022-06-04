import styles from './light-panel.module.css';

import SearchBar from '../search-bar/search-bar';
import CityCard from '../city-card/city-card';
import NextDaysForecast from '../next-days-forecast/next-days-forecast';

import { IoSearchOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { CityContext } from '../../context/city-context';
import display from '../../utils/display';

function LightPanel() {

  const { cityState, searchCity, addCity, selectCity } = useContext(CityContext)

  const suggestions = cityState.searchSuggestions?.map(city => {
    return {
      item: city,
      value: display([city.name, city.state, city.country])
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.contentPadding}>

        <SearchBar
          placeholder='Search new place'
          prefix={<IoSearchOutline />}
          suggestions={suggestions}
          onSearch={searchCity}
          onSelected={addCity} />

        <div className={styles.header}>
          <h2>Weather </h2>
          <h2 className='bold-h2'>Forecast</h2>
        </div>
      </div>

      <div className='horizontal-scroll start'>
        {
          cityState.cities.map(city => <CityCard
            key={city.id}
            name={display([city.data.name, city.data.state, city.data.country], 2)}
            isSelected={cityState.selectedCityId === city.id}
            onSelected={() => selectCity(city)} />
          )
        }
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