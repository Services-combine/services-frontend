import Head from 'next/head';
import { useState, useRef } from 'react'
import styles from "../styles/Channels.module.scss";
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormInput } from '../components/ModalsForm/ModalFormInput';
import { NavigationBar } from '../components/NavigationBar';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


export default function Channels() {
	const snackbarRef = useRef(null);
	const [modalAddChannel, setModalAddChannel] = useState(false);

	const getModalAdd = (getData) => {
		if (getData.mode === "addChannel") {
			setModalAddChannel(false);
		}
	}

	const showSnackbar = (message, type) => {
        snackbarRef.current.show(message, type);
    }

	const refreshData = () => {
		router.replace(router.asPath);
	}

	return (
		<div className={styles.channels}>
			<Head>
                <title>Работа с каналами</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

			<NavigationBar pathHash={[]} service='channels' />
			
			<ButtonToolbar className={styles.actions}>
				<Button mode='fill' onClick={() => setModalAddChannel(true)}>
					<p className={styles.action_item}>
						<AiOutlineUserAdd className={styles.action__icon}/> 
						Добавить канал
					</p>
				</Button>
			</ButtonToolbar>

			<Modal title='Добавление канала' visible={modalAddChannel} setVisible={setModalAddChannel}>
                <ModalFormInput create={getModalAdd} buttonText="Добавить" mode="addChannel"/>
            </Modal>
		</div>
	);
}