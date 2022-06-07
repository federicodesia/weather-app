import styles from './weather-icon.module.css';

import { useMemo } from 'react';
import { IoCloudyNight, IoPartlySunny, IoThunderstorm } from 'react-icons/io5';
import { BsCloudHaze2Fill, BsCloudsFill, BsFillCloudDrizzleFill, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaCloudRain } from 'react-icons/fa';
import { IoMdMoon, IoMdSnow } from 'react-icons/io';

type WeatherIconProps = {
    icon?: string
    pod?: 'd' | 'n' | 'auto'
    size?: number
}

function WeatherIcon({ icon, pod = 'auto', size = 22 }: WeatherIconProps) {

    const weatherIcon = useMemo(
        () => {
            if(!icon) return undefined;

            const id = icon.slice(0, -1);
            const p = pod === 'auto'
                ? icon.slice(-1)
                : pod;

            if (id === '01' && p === 'd') return <BsSunFill id={styles.sun} />
            if (id === '01' && p === 'n') return <IoMdMoon />

            if (id === '02' && p === 'd') return <IoPartlySunny />
            if (id === '02' && p === 'n') return <IoCloudyNight />

            if (id === '03' || id === '04') return <BsCloudsFill />

            if (id === '09') return <BsFillCloudDrizzleFill />
            if (id === '10') return <FaCloudRain />
            if (id === '11'){
                if(p === 'd') return <IoThunderstorm id={styles.thunderstorm} />
                return <IoThunderstorm />
            }
            if (id === '13') return <IoMdSnow />
            if (id === '50') return <BsCloudHaze2Fill />
        },
        [icon, pod]
    )

    const weatherIconStyle = useMemo(
        () => {
            return {
                height: size,
                width: size
            }
        },
        [size]
    )

    return <div className={styles.weatherIcon} style={weatherIconStyle}>
        {weatherIcon}
    </div>
}

export default WeatherIcon;