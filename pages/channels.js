import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react'
import styles from "../styles/Channels.module.scss";
import { Api } from '../utils/api';
import { ChannelsList } from '../components/ChannelsList';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormCreateChannel } from '../components/ModalsForm/ModalFormCreateChannel';
import { NavigationBar } from '../components/NavigationBar';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


const Channels = ({channels, error}) => {
	const snackbarRef = useRef(null);
	const router = useRouter();
	const [modalAddChannel, setModalAddChannel] = useState(false);

	const showSnackbar = (message, type) => {
		if (snackbarRef.current)
	        snackbarRef.current.show(message, type);
    }

	if (error) {
        showSnackbar(error, 'error')
    }

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
					<p className={styles.action__item}>
						<AiOutlineUserAdd className={styles.action__icon}/> 
						Добавить канал
					</p>
				</Button>
			</ButtonToolbar>

			{channels && channels.length !== 0
				? <ChannelsList channels={channels} />
				: <h4 className={styles.notification}>У вас пока нет каналов</h4>
			}

			<Modal title='Добавление канала' visible={modalAddChannel} setVisible={setModalAddChannel}>
                <ModalFormCreateChannel create={getModalAdd}/>
            </Modal>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
    try {
        const response = await Api(ctx).channels.getChannels();

        return {
            props: {
                channels: response.data,
            },
        }
    } catch (e) {
        return {
            props: {
                error: 'Ошибка при получении папок'
            },
        }
    }
}

export default Channels;