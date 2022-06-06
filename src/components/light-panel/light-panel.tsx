import styles from './light-panel.module.css';

import SearchBar from '../search-bar/search-bar';
import CityCard from '../city-card/city-card';
import NextDaysForecast from '../next-days-forecast/next-days-forecast';

import { IoSearchOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { CityContext } from '../../context/city-context';
import display from '../../utils/display';
import useSelectedCity from '../../hooks/use-selected-city';

function LightPanel() {

  const { cityState, searchCity, addCity, selectCity } = useContext(CityContext)
  const selectedCity = useSelectedCity()

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
        <NextDaysForecast
          selectedCityId={selectedCity?.id}
          days={selectedCity?.forecast}
        />
      </div>
    </div>
  );
}

export default LightPanel;