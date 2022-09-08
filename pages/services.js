import Head from 'next/head';
import Link from "next/link"
import clsx from 'clsx';
import styles from "../styles/Services.module.scss";


const Services = () => {
    return (
        <div className={styles.services}>
            <Head>
                <title>Сервисы</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.services__list}>
                <Link href="/inviting">
                    <div className={clsx(styles.service__item, styles.telegram)}>
                        <div className={styles.service__block}>
                            <h6 className={styles.service__title}>
                                Инвайтинг & Рассылка
                            </h6>    
                        </div>
                        <h6 className={styles.service__platform}>
                            TELEGRAM
                        </h6>
                    </div>
                </Link>

                <Link href="/channels">
                    <div className={clsx(styles.service__item, styles.youtube)}>
                        <div className={styles.service__block}>
                            <h6 className={styles.service__title}>
                                Работа с каналами
                            </h6>    
                        </div>
                        <h6 className={styles.service__platform}>
                            YOUTUBE
                        </h6>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Services;