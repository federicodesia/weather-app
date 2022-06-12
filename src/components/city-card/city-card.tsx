import styles from './city-card.module.css';

import { useContext } from 'react';
import { CityContext } from '../../context/city-context/city-context';
import { ContextMenuContext } from '../../context/context-menu-context/context-menu-context';
import { City } from '../../interfaces/city';
import display from '../../utils/display';
import ContextMenu from '../context-menu/context-menu';

import { MdCheck, MdDelete } from "react-icons/md";

type CityCardProps = {
    city: City
    isSelected: boolean
    onSelected: () => void
};

function CityCard({ city, isSelected, onSelected }: CityCardProps) {

    const { selectCity, deleteCity } = useContext(CityContext)
    const { showContextMenu } = useContext(ContextMenuContext)

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()

        showContextMenu(<ContextMenu
            event={e}
            items={[
                {
                    icon: <MdCheck />,
                    text: 'Select',
                    onClick: () => selectCity(city)
                },
                {
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
                onClick={onSelected}
                onContextMenu={handleContextMenu} />

            <h5 onClick={onSelected}>
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