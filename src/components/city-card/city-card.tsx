import styles from './city-card.module.css';

type CityCardProps = {
    name: string
    isSelected: boolean
    onSelected: () => void
};

function CityCard({ name, isSelected, onSelected }: CityCardProps) {

    return (
        <div className={styles.container} onClick={onSelected}>
            <div className={`${styles.card} ${isSelected && styles.selected}`}></div>
            <h5>{name}</h5>
        </div>

    );
}

export default CityCard;