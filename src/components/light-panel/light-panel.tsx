import styles from './light-panel.module.css';

import SearchBar from '../search-bar/search-bar';
import CityCard from '../city-card/city-card';
import NextDaysForecast from '../next-days-forecast/next-days-forecast';

import { IoSearchOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { CityContext } from '../../context/city-context/city-context';
import display from '../../utils/display';

function LightPanel() {

  const { cityState, searchCity, addCity } = useContext(CityContext)

  const suggestions = cityState.searchSuggestions?.map(city => {
    return {
      item: city,
      value: display([city.name, city.state, city.country])
    }
  })

  return (
    <div className={styles.container}>
      {
        cityState.ongoingRequests > 0 && <div className={styles.absoluteContent}>
          <div className='loading-bar' />
        </div>
      }

      <div className={styles.contentContainer}>
        <div className={styles.contentPadding}>

          <div className={styles.searchBarContainer}>
            <SearchBar
              placeholder='Search new place'
              prefix={<IoSearchOutline />}
              suggestions={suggestions}
              onSearch={searchCity}
              onSelected={addCity} />
          </div>

          <div className={styles.header}>
            <h2>Weather </h2>
            <h2 className='bold'>Forecast</h2>
          </div>
        </div>

        <div className={styles.horizontalScroll}>
          {
            cityState.cities.map(city => <CityCard
              key={city.id}
              city={city} />
            )
          }
        </div>

        <div className={styles.horizontalScroll}>
          <NextDaysForecast />
        </div>
      </div>
    </div>
  );
}

export default LightPanel;