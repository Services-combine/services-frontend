import Head from "next/head";
import Link from "next/link"
import styles from '../styles/404.module.scss';


export default function NotFound() {
    return (
        <>
            <Head>
                <title>Страница не найдена</title>
            </Head>

            <div className={styles.not__found__page}>
                <div className={styles.error} data-text="404">404</div>
                <p className={styles.lead}>Станица не найдена</p>
                <p className={styles.description}>
                    Вернуться на <Link href="/"><a className={styles.again__link}>главную</a></Link> страницу
                </p>
            </div>
        </>
    );
};
