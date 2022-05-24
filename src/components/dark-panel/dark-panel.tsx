import styles from './dark-panel.module.css';

import { IoMdCloudy } from "react-icons/io";
import { FaCloudRain } from "react-icons/fa";

function DarkPanel() {

  return (
    <div className={styles.container}>
      <div className={styles.clouds}>
        <IoMdCloudy size={220} id={styles.cloud1} />
        <IoMdCloudy size={220} id={styles.cloud2} />
        <IoMdCloudy size={100} id={styles.cloud3} />
      </div>

      <div className={styles.content}>
        <div className='column center-items'>

          <div className='row center-items'>
            <FaCloudRain size={28} id={styles.todayIcon} />
            <div className='column'>
              <h3>Today</h3>
              <span id={styles.date}>Sat, 3 Aug</span>
            </div>
          </div>

          <div className={styles.tempContainer}>
            <div className='row'>
              <h1>28</h1>
              <h2>°C</h2>
            </div>
          </div>

          <span id={styles.city}>Berlin, Germany</span>

          <div className='row'>
            <span>Feels like 32</span>
            <span id={styles.dot}>•</span>
            <span>Sunset 20:15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarkPanel;