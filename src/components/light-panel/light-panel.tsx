import styles from './light-panel.module.css';

import Input from '../input/input';
import CityCard from '../city-card/city-card';
import { IoSearchOutline } from 'react-icons/io5';

function LightPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.contentPadding}>
        <Input placeholder='Search new place' prefix={<IoSearchOutline />}></Input>

        <div className={styles.header}>
          <h2>Weather </h2>
          <h2 className='bold-h2'>Forecast</h2>
        </div>
      </div>

      <div className='horizontal-scroll'>
        <CityCard name='Berlin, Germany'></CityCard>
        <CityCard name='Paris, France'></CityCard>
        <CityCard name='New York, USA'></CityCard>
      </div>
    </div>
  );
}

export default LightPanel;