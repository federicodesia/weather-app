import styles from './next-days-forecast.module.css';

import { IoWater } from 'react-icons/io5';
import { FaCloudRain } from "react-icons/fa";
import { useMemo } from 'react';
import { clamp } from '../../utils/utils';

type DayForecast = {
    dayName: string;
    probabilityRain: number;
    minTemp: number;
    maxTemp: number
};

type NextDaysForecastProps = {
    days: Array<DayForecast>;
}

function NextDaysForecast({ days }: NextDaysForecastProps) {

    const separator = 20;
    const longestBar = useMemo(
        () => Math.max(
            ...days.map(day => clamp(separator - day.minTemp, 0)),
            ...days.map(day => clamp(day.maxTemp - separator, 0)),
        ),
        [days]
    )

    const getWidth = (num: number) => {
        return (num * 50) / longestBar;
    };

    const getTempBarStyle = (
        day: DayForecast,
        position: "left" | "right"
    ) => {
        let start = separator - day.minTemp;
        let end = separator - day.maxTemp;

        if(position === "left") end = clamp(end, 0);
        else if(position === "right") start = clamp(start, undefined, 0);

        return {
            marginLeft: `${getWidth(longestBar - start)}%`,
            marginRight: `${getWidth(longestBar + end)}%`
        }
    }

    return (
        <table className={styles.table}>
            <tbody>
                {days.map((day) => (

                    <tr key={day.dayName}>
                        <th>{day.dayName}</th>
                        <td>
                            <IoWater id={styles.waterIcon} size={15}></IoWater>
                            {day.probabilityRain}%
                        </td>
                        <td>
                            <FaCloudRain color='#4394EC' size={22}></FaCloudRain>
                        </td>

                        <td>{day.minTemp}°C</td>

                        <td className={styles.tempBar}>
                            <div className={`${styles.verticalDashedLine} absolute-center`}></div>
                            <div className={`${styles.horizontalDashedLine} absolute-center`}></div>

                            <div className={styles.left} style={getTempBarStyle(day, "left")}></div>
                            <div className={styles.right} style={getTempBarStyle(day, "right")}></div>
                        </td>

                        <td id={styles.maxTemp}>{day.maxTemp}°C</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default NextDaysForecast;