import { useRouter } from 'next/router';
import Link from "next/link";
import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import styles from './ChannelsList.module.scss';
import { Api } from '../../utils/api';
import { Modal } from '../UI/Modal';
import { ModalConfirmAction } from '../ModalsForm/ModalConfirmAction';
import { ModalFormSettingsChannel } from '../ModalsForm/ModalFormSettingsChannel';
import { ModalFormSettingsProxy } from '../ModalsForm/ModalFormSettingsProxy';
import { Mark } from '../UI/Mark';
import { VscDebugStart } from 'react-icons/vsc'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { TbPlugConnected } from 'react-icons/tb'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Tooltip, Dropdown } from "@nextui-org/react";

export const ChannelItem = (props) => {
    const snackbarRef = useRef(null);
    const router = useRouter();
    const [modalDelete, setModalDelete] = useState(false);
    const [modalSettingsChannel, setModalSettingsChannel] = useState(false);
    const [modalConfigureProxy, setModalConfigureProxy] = useState(false);
    const defaultPhoto = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
    const [markID, setMarkID] = useState(new Set([props.channel.mark]))
    let mark = props.marks.find(m => m.id === props.channel.mark)
    const [markTitle, setMarkTitle] = useState(mark.title)
    const [markColor, setMarkColor] = useState(mark.color)
    
    async function launch() {
        try {
            if (!props.channel.launch) {
                if (props.channel.comment !== "" && props.channel.count_commented_videos > 0) {
                    await Api().channels.launchChannel(props.channel.id);
                    refreshData()
                }
                else {
                    alert("Для начала заполните данных для проставления комментариев")
                    //showSnackbar('Для начала заполните данных для проставления комментариев', 'error')
                }
            }
            else {
                showSnackbar('Канал запущен, все действия запрещены', 'success')
            }
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                refreshData()
            }
            else
	    		showSnackbar('Ошибка при запуске канала', 'error')
        }
    }

    async function update() {
        try {
            if (!props.channel.launch) {
                await Api().channels.updateChannel(props.channel.id, props.channel.channel_id, props.channel.api_key);
                refreshData()
            }
            else {
                showSnackbar('Канал запущен, все действия запрещены', 'success')
            }
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

    async function changeMark(mark) {
        try {
            setMarkID(mark)

            const chooseMark = props.marks.find(m => m.id === mark.anchorKey)
            setMarkTitle(chooseMark.title)
            setMarkColor(chooseMark.color)

            await Api().channels.editMark(props.channel.id, mark.anchorKey);
        } catch (e) {
			showSnackbar('Ошибка при изменении метки', 'error')
        }
    }

    const showModalSettingsChannel = () => {
        if (!props.channel.launch)
            setModalSettingsChannel(true)
        else
            showSnackbar('Канал запущен, все действия запрещены', 'success')
    }

    const showModalSettingsProxy = () => {
        if (!props.channel.launch)
            setModalConfigureProxy(true)
        else
            showSnackbar('Канал запущен, все действия запрещены', 'success')
    }
    
    const showModalAction = () => {
        if (!props.channel.launch) {
            setModalDelete(true)
        }
        else {
            showSnackbar('Канал запущен, все действия запрещены', 'success')
        }
    }

    const getModalAction = (getAction) => {
        setModalDelete(false);
        if (getAction.action) {
            remove();
        }
    }

    const closeAfterSave = (mode) => {
        if (mode === "settings_channel")
            setModalSettingsChannel(false)
        else if (mode === "settings_proxy")
            setModalConfigureProxy(false)

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
                    <img className={styles.channel__photo} src={defaultPhoto} width="50" height="50" border="0" />

                    <div className={styles.channel__info}>
                        <Link href={`https://youtube.com/channel/${props.channel.channel_id}`}>
                            <a className={styles.channel__title} target="_blank" rel="noopener noreferrer">
                                {props.channel.title}
                            </a>
                        </Link>
                        <p className={styles.channel__description}>{props.channel.description}</p>
                    </div>
                </div>

                <div className={styles.channel__statistic}>
                    <p>Просмотров - {props.channel.view_count}</p>
                    <p>Видео - {props.channel.video_count}</p>
                    <p>Подписчиков - {props.channel.subscriber_count}</p>
                </div>
            </div>

            {props.channel.mark &&
                <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                        <div className={styles.channel__mark}>
                            <Mark title={markTitle} color={markColor} />
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                        aria-label={props.channel.mark}
                        color="default"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={markID}
                        onSelectionChange={mark => changeMark(mark)}
                    >
                        {props.marks.map(mark =>
                            <Dropdown.Item key={mark.id}>{mark.title}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            }

            <ButtonToolbar className={styles.channel__actions}>
                
                <Tooltip content={"Запустить"} rounded color="primary">
                    <div 
                        className={clsx(styles.action__item, props.channel.launch && styles.disable)}
                        onClick={launch}
                    >
                        <VscDebugStart className={styles.action__icon} />
                    </div>
                </Tooltip>

                <Tooltip content={"Редактировать канал"} rounded color="primary">
                     <div 
                        className={clsx(styles.action__item, props.channel.launch && styles.disable)}
                        onClick={showModalSettingsChannel}
                    >
                        <AiOutlineEdit className={styles.action__icon} />
                    </div>
                </Tooltip>

                <Tooltip content={"Настроить прокси"} rounded color="primary">
                    <div 
                        className={clsx(styles.action__item, props.channel.launch && styles.disable)}
                        onClick={showModalSettingsProxy}
                    >
                        <TbPlugConnected className={styles.action__icon} />
                    </div>
                </Tooltip>

                <Tooltip content={"Обновить данные"} rounded color="primary">
                    <div 
                        className={clsx(styles.action__item, props.channel.launch && styles.disable)}
                        onClick={update}
                    >
                        <BiRefresh className={styles.action__icon} />
                    </div>
                </Tooltip>

                <Tooltip content={"Удалить"} rounded color="primary">
                    <div 
                        className={clsx(styles.action__item, styles.delete, props.channel.launch && styles.disable)}
                        onClick={showModalAction}
                    >
                        <AiOutlineDelete className={styles.action__icon} />
                    </div>
                </Tooltip>

                {props.channel.launch &&
                    <div className={styles.status}>
                        <h6 className={styles.status__launch}>&bull;</h6>
                        <p className={styles.status__text}>Запущен</p>
                    </div>
                }
            </ButtonToolbar>

            <Modal title="Удаление канала" visible={modalDelete} setVisible={setModalDelete}>
                <ModalConfirmAction result={getModalAction}/>
            </Modal>

            <Modal title="Редактирование канала" visible={modalSettingsChannel} setVisible={setModalSettingsChannel}>
                <ModalFormSettingsChannel 
                    channel={props.channel}
                    closeAfterSave={closeAfterSave}
                />
            </Modal>

            <Modal title="Настройка прокси" visible={modalConfigureProxy} setVisible={setModalConfigureProxy}>
                <ModalFormSettingsProxy 
                    channel={props.channel}
                    closeAfterSave={closeAfterSave}
                />
            </Modal>
        </div>
    );
};
