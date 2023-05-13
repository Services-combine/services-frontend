import Head from 'next/head';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from "../styles/Inviting.module.scss";
import { Api } from '../utils/api';
import Snackbar from "../components/UI/Snackbar";
import { FoldersList } from '../components/FoldersList';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormInput } from '../components/ModalsForm/ModalFormInput';
import { ModalSettings } from '../components/ModalsForm/ModalSettings';
import { NavigationBar } from '../components/NavigationBar';
import { CountAccounts } from '../components/CountAccounts';
import { AiOutlineFolderAdd } from "react-icons/ai"
import { FiSettings } from "react-icons/fi"
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


const Inviting = ({folders, countAccounts, settings, error}) => {
	const snackbarRef = useRef(null);
	const router = useRouter();
	const [modalCreateFolder, setModalCreateFolder] = useState(false);
	const [modalSettings, setModalSettings] = useState(false);

	const showSnackbar = (message, type) => {
        // snackbarRef.current.show(message, type);
		console.log(message)
		alert(message)
    }

    if (error) {
        showSnackbar(error, 'error')
    }

	async function saveSettings(settings) {
        try {
            await Api().inviting.saveSettings(settings.countInviting, settings.countMailing);
        } catch (e) {
			showSnackbar('Ошибка при сохранении настроек', 'error')
        }
    }

	async function createFolder(folderName) {
        try {
			await Api().inviting.createFolder(folderName);
			refreshData()
        } catch (e) {
			showSnackbar('Ошибка при создании папки', 'error')
        }
    }

	const getModalCreate = (getData) => {
		if (getData.mode === "createFolder") {
			setModalCreateFolder(false);
			createFolder(getData.text);
		}
	}

	const getModalSettings = (settings) => {
        setModalSettings(false);
        saveSettings(settings);
    }

	const refreshData = () => {
		router.replace(router.asPath);
	}

	return (
		<div className={styles.inviting}>
			<Head>
                <title>Инвайтинг</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

			<div className={styles.inviting__header}>
				<NavigationBar pathHash={[]} service='inviting' />
				<CountAccounts countAccounts={countAccounts} />
			</div>

			<ButtonToolbar className={styles.actions}>
				<Button mode='fill' onClick={() => setModalCreateFolder(true)}>
					<p className={styles.action_item}>
						<AiOutlineFolderAdd className={styles.action__icon}/> 
						Создать папку
					</p>
				</Button>

				<Button mode='fill' onClick={() => setModalSettings(true)}>
					<p className={styles.action_item}>
						<FiSettings className={styles.action__icon}/> 
						Настройки
					</p>
				</Button>
			</ButtonToolbar>

			{folders !== null && folders.length != 0
				? <FoldersList folders={folders} />
				: <h4 className={styles.notification}>У вас пока нет папок</h4>
			}

			<Modal title='Создание папки' visible={modalCreateFolder} setVisible={setModalCreateFolder}>
                <ModalFormInput create={getModalCreate} buttonText="Создать" mode="createFolder"/>
            </Modal>

			<Modal title='Настройки' visible={modalSettings} setVisible={setModalSettings}>
                <ModalSettings save={getModalSettings} settings={settings}/>
            </Modal>

			<Snackbar ref={snackbarRef} />
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
    try {
        const responseFolders = await Api(ctx).inviting.getFolders();
		const responseSettings = await Api(ctx).inviting.getSettings();

		console.log(responseFolders.data)
		console.log(responseSettings.data)

        return {
            props: {
                folders: responseFolders.data.folders,
				countAccounts: responseFolders.data.countAccounts,
				settings: responseSettings.data
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

export default Inviting;