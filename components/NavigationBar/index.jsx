import Link from "next/link";
import styles from "./NavigationBar.module.scss";


export const NavigationBar = ({pathHash, service}) => {
    return (
        <div className={styles.navigation}>
            <div className={styles.navigation__item}>
                <Link href='/'>
                    <span className={styles.navigation__link}>Главная</span>
                </Link>
            </div>

            {service === 'inviting'
                ?
                <div className={styles.navigation__item}>
                    <b className={styles.separation}>/</b>
                    <Link href='/inviting'>
                        <span className={styles.navigation__link}>Инвайтинг</span>
                    </Link>
                </div>
                :
                <div className={styles.navigation__item}>
                    <b className={styles.separation}>/</b>
                    <Link href='/channels'>
                        <span className={styles.navigation__link}>Работа с каналами</span>
                    </Link>
                </div>
            }

            {Object.keys(pathHash).length !== 0 &&
                Object.entries(pathHash).map(([key, item]) => (
                    <div className={styles.navigation__item} key={item.value}>
                        <b className={styles.separation}>/</b>
                        <Link href={`/folder/${item.value}`}>
                            <span className={styles.navigation__link}>{item.name}</span>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}