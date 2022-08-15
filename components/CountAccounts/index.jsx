import styles from "./CountAccounts.module.scss";
import { FaUserAlt, FaInfoCircle } from "react-icons/fa"
import { BsCheckLg } from "react-icons/bs"


export const CountAccounts = ({countAccounts}) => {
    return (
        <div className={styles.count__accounts}>
            <p className={styles.count__item}>
                <FaUserAlt className={styles.count__icon} /> -
                <span className={styles.counter}>{countAccounts.all}</span>
            </p>
            <p className={styles.count__item}>
                <BsCheckLg className={styles.count__icon} /> -
                <span className={styles.counter}>{countAccounts.clean}</span>
            </p>
            <p className={styles.count__item}>
                <FaInfoCircle className={styles.count__icon} /> -
                <span className={styles.counter}>{countAccounts.block}</span>
            </p>
        </div>
    );
}