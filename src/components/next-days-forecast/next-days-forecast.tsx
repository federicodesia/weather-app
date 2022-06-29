import styles from './next-days-forecast.module.css';

import { IoWater } from 'react-icons/io5';
import { useMemo } from 'react';
import clamp from '../../utils/clamp';
import { Forecast } from '../../interfaces/forecast';
import WeatherIcon from '../weather-icon/weather-icon';
import useMediaQuery from '../../hooks/use-media-query';
import useSelectedCity from '../../hooks/use-selected-city';

function NextDaysForecast() {
    const selectedCity = useSelectedCity()
    const days = selectedCity?.daysForecast ?? []

    const minWidth = useMediaQuery('(min-width: 1201px)')
    const minHeight = useMediaQuery('(min-height: 801px)')
    const isLarge = minWidth && minHeight

    const isMedium = useMediaQuery('(max-width: 640px)')
    const isSmall = useMediaQuery('(max-width: 480px)')

    const displayDay = (dt: number) => {
        const date = new Date(dt)
        return isSmall
            ? date.toLocaleDateString('en-US', { weekday: 'short' }) + '.'
            : date.toLocaleDateString('en-US', { weekday: 'long' })
    }

    const separator = 20;
    const longestBar = useMemo(
        () => Math.max(
            ...days.map(day => clamp(separator - day.tempMin, 0)),
            ...days.map(day => clamp(day.tempMax - separator, 0)),
        ),
        [days]
    )

    const getWidth = (num: number) => {
        return (num * 50) / longestBar;
    };

    const getTempBarStyle = (
        day: Forecast,
        position: "left" | "right"
    ) => {
        let start = separator - day.tempMin;
        let end = separator - day.tempMax;

        if (position === "left") end = clamp(end, 0);
        else if (position === "right") start = clamp(start, undefined, 0);

        return {
            marginLeft: `${getWidth(longestBar - start)}%`,
            marginRight: `${getWidth(longestBar + end)}%`
        }
    }

    return (
        <table className={styles.table}>
            <tbody>
                {days.map((day) => {
                    return <tr key={`${selectedCity?.id} ${day.dt}`}>
                        <th>
                            {displayDay(day.dt)}
                        </th>

                        <td id={styles.pop}>
                            <IoWater id={styles.waterIcon} size={15} />
                            {`${day.pop}%`}
                        </td>

                        <td id={styles.weatherIcon}>
                            <WeatherIcon icon={day.icon} pod={'d'} />
                        </td>

                        <td id={styles.minTemp}>
                            {`${day.tempMin}°C`}
                        </td>

                        {
                            !isMedium && <td className={styles.tempBar}>
                                <div className={`vertical-dashed-line ${!isLarge && 'light'} absolute-center`}></div>
                                <div className={`horizontal-dashed-line ${!isLarge && 'light'} absolute-center`}></div>

                                <div className={styles.left} style={getTempBarStyle(day, "left")}></div>
                                <div className={styles.right} style={getTempBarStyle(day, "right")}></div>
                            </td>
                        }

                        <td id={styles.maxTemp}>{`${day.tempMax}°C`}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default NextDaysForecast;