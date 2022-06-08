import styles from './city-card.module.css';

type CityCardProps = {
    name: string
    isSelected: boolean
    onSelected: () => void
};

function CityCard({ name, isSelected, onSelected }: CityCardProps) {

    return (
        <div className={styles.container}>
            <div
                className={`${styles.card} ${isSelected && styles.selected}`}
                onClick={onSelected}/>
            
            <h5 onClick={onSelected}>{name}</h5>
        </div>

    );
}

export default CityCard;