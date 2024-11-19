import styles from './card.module.scss'
export default function Card({inverted = false}: {inverted?: boolean}) {
    return(
        <div className={styles.card}>
            <div className={styles.scoreBoard}>
                <div className={inverted ? styles.s2 : styles.s1}></div>
                <div className={styles.score}>1</div>
                <div className={inverted ? styles.s1 : styles.s2}></div>
            </div>
            <div className={styles.player}>Player Name</div>
        </div>
    );
}