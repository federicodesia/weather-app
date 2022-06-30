import { useMemo } from 'react';
import { IoMdSunny } from 'react-icons/io';
import useSelectedCity from '../../hooks/use-selected-city';
import clamp from '../../utils/clamp';
import styles from './sun-details.module.css';

function SunDetails() {
    const selectedCity = useSelectedCity()
    const { weather } = selectedCity
    const { sys, dt } = weather

    const sunPosition = useMemo(
        () => {
            const sysDif = sys.sunset - sys.sunrise
            const dtDif = dt - sys.sunrise

            const degrees = clamp((dtDif * 160) / sysDif, 20, 160)
            const radians = degrees * (Math.PI / 180);

            const x = (-Math.cos(radians) + 1) * 50
            const y = Math.sin(radians) * 50

            return {
                x: x,
                y: y
            }
        },
        [weather]
    )

    const getSunStyle = () => {
        return {
            top: `${50 - sunPosition.y}%`,
            left: `${sunPosition.x}%`
        }
    }

    const getSunLightStyle = () => {
        return {
            width: `${sunPosition.x}%`,
        }
    }

    return <div className={styles.container}>
        <div className={styles.column} >
            <h5>
                {
                    new Date(sys.sunrise).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                }
            </h5>
            <span>sunrise</span>
        </div>

        <div className={styles.graph} >
            <div className={styles.content}>
                <IoMdSunny className={styles.sun} style={getSunStyle()} />
                <div className={styles.curvedLine}>
                    <div className={styles.sunLight} style={getSunLightStyle()} />
                </div>
            </div>
        </div>

        <div className={styles.column} >
            <h5>
                {
                    new Date(sys.sunset).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                }
            </h5>
            <span>sunset</span>
        </div>
    </div>
}

export default SunDetails