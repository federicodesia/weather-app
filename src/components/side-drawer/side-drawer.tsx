import { useContext, useEffect, useRef, useState } from 'react';
import { IoChevronBack, IoSearchOutline } from 'react-icons/io5';
import { MdOutlineCheck, MdOutlineDelete, MdOutlineRefresh } from 'react-icons/md';
import { CityContext } from '../../context/city-context/city-context';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { City } from '../../interfaces/city';
import display from '../../utils/display';
import HorizontalCityCard from '../horizontal-city-card/horizontal-city-card';
import SearchBar from '../search-bar/search-bar';
import styles from './side-drawer.module.css';

type SideDrawerProps = {
    isExpanded: boolean
    onClose: () => void
}

function SideDrawer({ isExpanded, onClose }: SideDrawerProps) {
    const { cityState, searchCity, addCity, selectCity, refreshCity, deleteCity } = useContext(CityContext)

    const menuRef = useRef(null);
    useOnClickOutside(menuRef, onClose)

    const [cityAction, setCityAction] = useState<City | undefined>()
    const clearCityAction = () => setCityAction(undefined)

    const onAction = (action: () => void, close?: boolean) => {
        action()
        clearCityAction()
        if (close !== false) onClose()
    }

    const onSelectAction = () => cityAction && onAction(() => selectCity(cityAction))
    const onRefreshAction = () => cityAction && onAction(() => refreshCity(cityAction))
    const onDeleteAction = () => cityAction && onAction(() => deleteCity(cityAction), false)

    useEffect(() => {
        clearCityAction()
    }, [isExpanded])
 
    const suggestions = cityState.searchSuggestions?.map(city => {
        return {
            item: city,
            value: display([city.name, city.state, city.country])
        }
    })

    return (
        <div className={`${styles.drawer} ${isExpanded && styles.expanded}`}>

            <div className={styles.menu} />
            <div className={styles.fixedMenu} ref={menuRef}>

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

                <div className={styles.scrolleableArea}>
                    <ul className={styles.cities}>
                        {
                            cityState.cities.map(city => <HorizontalCityCard
                                key={city.id}
                                city={city}
                                isChecked={city.id === cityAction?.id}
                                onSelect={() => {
                                    selectCity(city)
                                    onClose()
                                }}
                                onLongPress={() => {
                                    if (city.id !== cityAction?.id) setCityAction(city)
                                    else setCityAction(undefined)
                                }} />
                            )
                        }
                    </ul>
                </div>

                <div className={`${styles.cityActionsContainer} ${cityAction && styles.visible}`}>
                    <ul className={styles.cityActions}>
                        {
                            cityState.selectedCityId === cityAction?.id
                                ? <li onClick={onSelectAction}>
                                    <MdOutlineRefresh className={styles.icon} />
                                    <span>Refresh</span>
                                </li>

                                : <li onClick={onRefreshAction}>
                                    <MdOutlineCheck className={styles.icon} />
                                    <span>Select</span>
                                </li>
                        }

                        {
                            cityState.cities.length > 1 && <li
                                onClick={onDeleteAction}>
                                <MdOutlineDelete className={styles.icon} />
                                <span>Delete</span>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideDrawer;