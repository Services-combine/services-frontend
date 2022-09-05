import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react'
import styles from "../styles/Channels.module.scss";
import { Api } from '../utils/api';
import { ChannelsList } from '../components/ChannelsList';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormCreateChannel } from '../components/ModalsForm/ModalFormCreateChannel';
import { ModalMarks } from '../components/ModalsForm/ModalMarks';
import { NavigationBar } from '../components/NavigationBar';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsFillBookmarksFill } from 'react-icons/bs';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


const Channels = ({channels, marks, error}) => {
	const snackbarRef = useRef(null);
	const router = useRouter();
	const [modalAddChannel, setModalAddChannel] = useState(false);
	const [modalMarks, setModalMarks] = useState(false);

	const showSnackbar = (message, type) => {
		if (snackbarRef.current)
	        snackbarRef.current.show(message, type);
    }

	if (error) {
        showSnackbar(error, 'error')
    }

	const closeAfterAdd = () => {
        setModalAddChannel(false)
		refreshData()
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

				<Button mode='fill' onClick={() => setModalMarks(true)}>
					<p className={styles.action__item}>
						<BsFillBookmarksFill className={styles.action__icon}/> 
						Метки
					</p>
				</Button>
			</ButtonToolbar>

			{channels && channels.length !== 0
				? <ChannelsList channels={channels} marks={marks} />
				: <h4 className={styles.notification}>У вас пока нет каналов</h4>
			}

			<Modal title='Добавление канала' visible={modalAddChannel} setVisible={setModalAddChannel}>
                <ModalFormCreateChannel closeAfterAdd={closeAfterAdd}/>
            </Modal>

			<Modal title='Настройка меток' visible={modalMarks} setVisible={setModalMarks}>
                <ModalMarks list_marks={marks} />
            </Modal>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
    try {
        const responseChannels = await Api(ctx).channels.getChannels();
		const responseMarks = await Api(ctx).channels.getMarks();

        return {
            props: {
                channels: responseChannels.data,
				marks: responseMarks.data,
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