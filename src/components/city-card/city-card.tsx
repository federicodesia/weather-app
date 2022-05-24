import styles from './city-card.module.css';

type CityCardProps = {
    name: string
};

function CityCard({ name }: CityCardProps) {

    return (
        <div className={styles.container}>
            <div className={styles.card}></div>
            <h4>{name}</h4>
        </div>

    );
}

export default CityCard;