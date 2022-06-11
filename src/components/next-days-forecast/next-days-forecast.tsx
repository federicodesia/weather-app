import styles from './next-days-forecast.module.css';

import { IoWater } from 'react-icons/io5';
import { useMemo } from 'react';
import clamp from '../../utils/clamp';
import { Forecast } from '../../interfaces/forecast';
import WeatherIcon from '../weather-icon/weather-icon';

type NextDaysForecastProps = {
    selectedCityId?: number
    days?: Forecast[]
}

function NextDaysForecast({ selectedCityId, days = [] }: NextDaysForecastProps) {

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
                    return <tr key={`${selectedCityId} ${day.dt}`}>
                        <th>
                            {new Date(day.dt).toLocaleDateString('en-US', { weekday: 'long' })}
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

                        <td className={styles.tempBar}>
                            <div className='vertical-dashed-line absolute-center'></div>
                            <div className='horizontal-dashed-line absolute-center'></div>

                            <div className={styles.left} style={getTempBarStyle(day, "left")}></div>
                            <div className={styles.right} style={getTempBarStyle(day, "right")}></div>
                        </td>

                        <td id={styles.maxTemp}>{`${day.tempMax}°C`}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default NextDaysForecast;