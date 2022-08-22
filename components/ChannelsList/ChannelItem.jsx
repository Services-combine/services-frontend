import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import styles from './ChannelsList.module.scss';
import { Api } from '../../utils/api';
import { Modal } from '../UI/Modal';
import { ModalConfirmAction } from '../ModalsForm/ModalConfirmAction';
import { VscDebugStart } from 'react-icons/vsc'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export const ChannelItem = (props) => {
    const snackbarRef = useRef(null);
    const router = useRouter();
    const [modalDelete, setModalDelete] = useState(false);
    const [modalChannel, setModalChannel] = useState(false);

    async function launch() {
        try {
            await Api().channels.launchChannel(props.channel.id);
            refreshData()
        } catch (e) {
			showSnackbar('Ошибка при запуске канала', 'error')
        }
    }

    async function update() {
        try {
            await Api().channels.updateChannel(props.channel.id, props.channel.channel_id, props.channel.api_key);
            refreshData()
        } catch (e) {
			showSnackbar('Ошибка при обновлении канала', 'error')
        }
    }

    async function remove() {
        try {
            await Api().channels.deleteChannel(props.channel.id, props.channel.channel_id);
            refreshData()
        } catch (e) {
			showSnackbar('Ошибка при удалении канала', 'error')
        }
    }

    const getModalAction = (getAction) => {
        setModalDelete(false);
        if (getAction.action) {
            remove();
        }
    }

    const closeAfterSave = () => {
        setModalAccount(false)
        refreshData()
    }

    const showSnackbar = (message, type) => {
		if (snackbarRef.current)
	        snackbarRef.current.show(message, type);
    }

    const refreshData = () => {
		router.replace(router.asPath);
	}

    return (
        <div className={styles.channel}>
            <div className={styles.channel__data}>
                <div className={styles.channel__main__data}>
                    <img className={styles.channel__photo} src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" width="50" height="50" border="0" />

                    <div className={styles.channel__info}>
                        <p className={styles.channel__title}>{props.channel.title}</p>
                        <p className={styles.channel__description}>{props.channel.description}</p>
                    </div>
                </div>

                <div className={styles.channel__statistic}>
                    <p>Просмотров - {props.channel.view_count}</p>
                    <p>Видео - {props.channel.video_count}</p>
                    <p>Подписчиков - {props.channel.subscriber_count}</p>
                </div>
            </div>

            <ButtonToolbar className={styles.channel__actions}>
                <div 
                    className={styles.action__item} 
                    data-title="Запустить"
                    onClick={launch}
                >
                    <VscDebugStart className={styles.action__icon} />
                </div>

                <div 
                    className={styles.action__item} 
                    data-title="Редактировать"
                    onClick={() => setModalChannel(true)}
                >
                    <AiOutlineEdit className={styles.action__icon} />
                </div>

                <div 
                    className={styles.action__item} 
                    data-title="Обновить"
                    onClick={update}
                >
                    <BiRefresh className={styles.action__icon} />
                </div>

                <div 
                    className={styles.action__item} 
                    data-title="Удалить"
                    onClick={() => setModalDelete(true)}
                >
                    <AiOutlineDelete className={styles.action__icon} />
                </div>
            </ButtonToolbar>

            <Modal title="Удаление канала" visible={modalDelete} setVisible={setModalDelete}>
                <ModalConfirmAction result={getModalAction}/>
            </Modal>

            <Modal title="Настройка канала" visible={modalChannel} setVisible={setModalChannel}>
                
            </Modal>
        </div>
    );
};
