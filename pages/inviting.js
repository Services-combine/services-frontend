import Head from 'next/head';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from "../styles/Inviting.module.scss";
import { Api } from '../utils/api';
import { Snackbar } from "../components/UI/Snackbar";
import { FoldersList } from '../components/FoldersList';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ModalFormInput } from '../components/ModalsForm/ModalFormInput';
import { ModalParams } from '../components/ModalsForm/ModalParams';
import { IoIosStats } from "react-icons/io"
import { AiOutlineFolderAdd } from "react-icons/ai"
import { BiHome } from "react-icons/bi"
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


const Inviting = ({folders, countAccounts, error}) => {
	const snackbarRef = useRef(null);
	const router = useRouter();
	const [modalCreateFolder, setModalCreateFolder] = useState(false);
	const [modalParams, setModalParams] = useState(false);

    if (error) {
        showSnackbar(error, 'error')
    }

	async function createFolder(folderName) {
        try {
			await Api().inviting.createFolder(folderName);
			refreshData()
        } catch (e) {
			showSnackbar('Ошибка при создании папки', 'error')
        }
    }

	const getModalData = (getData) => {
		if (getData.mode === "createFolder") {
			setModalCreateFolder(false);
			createFolder(getData.text);
		}
	}

	const showSnackbar = (message, type) => {
        snackbarRef.current.show(message, type);
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

			<ButtonToolbar className={styles.actions}>
				<Button mode='fill' onClick={() => router.push("/")}>
					<p className={styles.action_item}>
						<BiHome className={styles.action__icon}/> 
						На главную
					</p>
				</Button>

				<Button mode='fill' onClick={() => setModalParams(true)}>
					<p className={styles.action_item}>
						<IoIosStats className={styles.action__icon}/> 
						Показатели
					</p>
				</Button>

				<Button mode='fill' onClick={() => setModalCreateFolder(true)}>
					<p className={styles.action_item}>
						<AiOutlineFolderAdd className={styles.action__icon}/> 
						Создать папку
					</p>
				</Button>
			</ButtonToolbar>

			{folders.length !== 0
				? <FoldersList folders={folders} />
				: <h4 className={styles.notification}>У вас пока нет папок</h4>
			}

			<Modal title='Создание папки' visible={modalCreateFolder} setVisible={setModalCreateFolder}>
                <ModalFormInput create={getModalData} buttonText="Создать" mode="createFolder"/>
            </Modal>

			<Modal title='Показатели' visible={modalParams} setVisible={setModalParams}>
                <ModalParams props={countAccounts}/>
            </Modal>

			<Snackbar ref={snackbarRef} />
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
    try {
        const response = await Api().inviting.getFolders();

        return {
            props: {
                folders: response.data.folders,
				countAccounts: response.data.countAccounts
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