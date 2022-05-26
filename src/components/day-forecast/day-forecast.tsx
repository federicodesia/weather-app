import styles from './day-forecast.module.css';

import { IoWater } from 'react-icons/io5';
import { FaCloudRain } from "react-icons/fa";

function DayForecast() {

    return (

        <table className={styles.table}>

            <tbody>
            {[...Array(5)].map((x, i) =>
                <tr>
                    <th>
                        Sunday
                    </th>
                    <td>
                        <IoWater id={styles.waterIcon} size={15}></IoWater>
                        54%
                    </td>
                    <td>
                        <FaCloudRain color='#4394EC' size={22}></FaCloudRain>
                    </td>

                    <td>
                        17°C
                    </td>
                    <td className={styles.left}>
                        <div className={styles.verticalDashedLine}></div>
                        <div className={styles.horizontalDashedLine}></div>
                        <div className={styles.bar}></div>
                    </td>
                    <td className={styles.right}>
                        <div className={styles.horizontalDashedLine}></div>
                        <div className={styles.bar}></div>
                    </td>
                    <td id={styles.maxTemp}>
                        28°C
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default DayForecast;