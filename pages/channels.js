import Head from 'next/head';
import styles from "../styles/Channels.module.scss";
import { NavigationBar } from '../components/NavigationBar';

export default function Channels() {
	return (
		<div className={styles.channels}>
			<Head>
                <title>Работа с каналами</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

			<NavigationBar pathHash={[]} service='channels' />
		</div>
	);
}