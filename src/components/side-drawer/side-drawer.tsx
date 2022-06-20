import { useContext, useRef } from 'react';
import { IoChevronBack, IoSearchOutline } from 'react-icons/io5';
import { CityContext } from '../../context/city-context/city-context';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import display from '../../utils/display';
import HorizontalCityCard from '../horizontal-city-card/horizontal-city-card';
import SearchBar from '../search-bar/search-bar';
import styles from './side-drawer.module.css';

type SideDrawerProps = {
    isExpanded: boolean
    onClose: () => void
}

function SideDrawer({ isExpanded, onClose }: SideDrawerProps) {
    const menuRef = useRef(null);
    useOnClickOutside(menuRef, onClose)

    const { cityState, searchCity, addCity, selectCity } = useContext(CityContext)
    const suggestions = cityState.searchSuggestions?.map(city => {
        return {
            item: city,
            value: display([city.name, city.state, city.country])
        }
    })

    return (
        <div className={`${styles.drawer} ${isExpanded && styles.expanded}`}>

            <div className={styles.menu} ref={menuRef}>

                <div className={styles.header}>
                    <IoChevronBack
                        className={styles.backIcon}
                        onClick={onClose} />
                    <h4>Cities</h4>
                </div>

                <SearchBar
                    placeholder='Search new place'
                    prefix={<IoSearchOutline />}
                    suggestions={suggestions}
                    onSearch={searchCity}
                    onSelected={(city) => {
                        addCity(city)
                        onClose()
                    }} />

                <ul className={styles.cities}>
                    {
                        cityState.cities.map(city => <HorizontalCityCard
                            key={city.id}
                            city={city}
                            onSelect={() => {
                                selectCity(city)
                                onClose()
                            }} />
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default SideDrawer;