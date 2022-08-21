import Head from 'next/head';
import { useState, useRef } from 'react'
import styles from "../styles/Channels.module.scss";
import { Api } from '../utils/api';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormCreateChannel } from '../components/ModalsForm/ModalFormCreateChannel';
import { NavigationBar } from '../components/NavigationBar';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


export default function Channels() {
	const snackbarRef = useRef(null);
	const [modalAddChannel, setModalAddChannel] = useState(false);

	async function addChannel(data) {
        try {
			const formData = new FormData()
			formData.append('channel_id', data.channelId)
			formData.append('api_key', data.apiKey)
			formData.append('token_file', data.tokenFile)
			await Api().channels.addChannel(formData);
			refreshData()
        } catch (e) {
			showSnackbar('Ошибка при добавлении канала', 'error')
        }
    }

	const getModalAdd = (data) => {
		setModalAddChannel(false);
		addChannel(data);
	}

	const showSnackbar = (message, type) => {
		if (snackbarRef.current)
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
                <ModalFormCreateChannel create={getModalAdd}/>
            </Modal>
		</div>
	);
}