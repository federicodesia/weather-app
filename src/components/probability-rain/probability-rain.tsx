import { RainForecast } from '../../interfaces/forecast';
import styles from './probability-rain.module.css';

type ProbabilityRainProps = {
    items?: RainForecast[]
}

function ProbabilityRain({ items = [] }: ProbabilityRainProps) {

    const getBarStyle = (item: RainForecast) => {
        return { height: `${item.pop * 100}%` }
    }

    return (
        <div className={`column ${styles.container}`}>
            <h4>Chance of rain</h4>

            <div className={`row ${styles.chartContainer}`}>
                <div className={`column space-between ${styles.weatherColumn}`}>
                    <span>heavy rain</span>
                    <span>rainy</span>
                    <span>sunny</span>
                </div>

                <div className={`${styles.barsContainer}`}>
                    {
                        items.map((item, index) => {
                            return <div
                                className='column'
                                key={`${item.dt} ${index}`}>

                                <div className={styles.barContainer}>
                                    <div className='vertical-dashed-line light absolute-center'></div>
                                    <div className={styles.bar} style={getBarStyle(item)} />
                                </div>

                                <span>
                                    {new Date(item.dt).toLocaleTimeString('en-US', { hour: 'numeric' }).replace(' ', '')}
                                </span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProbabilityRain