import useMediaQuery from '../../hooks/use-media-query';
import useSelectedCity from '../../hooks/use-selected-city';
import { Forecast } from '../../interfaces/forecast';
import styles from './probability-rain.module.css';

function ProbabilityRain() {
    const selectedCity = useSelectedCity()
    const items = selectedCity?.hourlyForecast ?? []

    const minWidth = useMediaQuery('(min-width: 1201px)')
    const minHeight = useMediaQuery('(min-height: 801px)')
    const isLarge = minWidth && minHeight

    const isMedium = useMediaQuery('(max-width: 640px)')
    const isSmall = useMediaQuery('(max-width: 480px)')

    const getBarStyle = (item: Forecast) => {
        return { height: `${item.pop * 100}%` }
    }

    return (
        <div className={styles.container}>
            <h4>Chance of rain</h4>

            <div className='row'>
                <div className={`column ${styles.weatherColumn}`}>
                    <span>heavy rain</span>
                    <span>rainy</span>
                    <span>sunny</span>
                </div>

                <div className={`${styles.barsContainer}`}>
                    {
                        items.slice(0, isLarge || isSmall
                            ? 6 : isMedium
                                ? 8 : 10
                        ).map((item, index) => {
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