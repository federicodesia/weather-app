import styles from './city-card.module.css';

import { useContext } from 'react';
import { CityContext } from '../../context/city-context/city-context';
import { ContextMenuContext } from '../../context/context-menu-context/context-menu-context';
import { City } from '../../interfaces/city';
import display from '../../utils/display';
import ContextMenu from '../context-menu/context-menu';

import { MdCheck, MdDelete, MdRefresh } from "react-icons/md";

type CityCardProps = {
    city: City
};

function CityCard({ city }: CityCardProps) {

    const { cityState, selectCity, deleteCity, refreshCity } = useContext(CityContext)
    const { showContextMenu } = useContext(ContextMenuContext)

    const isSelected = cityState.selectedCityId === city.id;
    const onRefresh = () => refreshCity(city)
    const onSelect = () => selectCity(city)

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()

        showContextMenu(<ContextMenu
            event={e}
            items={[
                ...isSelected
                    ? [{
                        icon: <MdRefresh />,
                        text: 'Refresh',
                        onClick: () => onRefresh()
                    }]
                    : [{
                        icon: <MdCheck />,
                        text: 'Select',
                        onClick: () => onSelect()
                    }],
                {
                    isDisabled: cityState.cities.length === 1,
                    icon: <MdDelete />,
                    text: 'Delete',
                    onClick: () => deleteCity(city)
                }
            ]}
        />)
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.card} ${isSelected && styles.selected}`}
                onClick={onSelect}
                onContextMenu={handleContextMenu} />

            <h5 onClick={onSelect}>
                {
                    display([
                        city.data.name,
                        city.data.state,
                        city.data.country
                    ], 2)
                }
            </h5>
        </div>
    )
}

export default CityCard;