import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react'
import styles from "../styles/Channels.module.scss";
import { Api } from '../utils/api';
import { ChannelsList } from '../components/ChannelsList';
import { Button } from '../components/UI/Button';
import { Mark } from '../components/UI/Mark';
import { Modal } from '../components/UI/Modal';
import { ModalFormCreateChannel } from '../components/ModalsForm/ModalFormCreateChannel';
import { ModalMarks } from '../components/ModalsForm/ModalMarks';
import { NavigationBar } from '../components/NavigationBar';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Dropdown } from "@nextui-org/react";


const Channels = ({channels, list_marks, error}) => {
	const snackbarRef = useRef(null);
	const router = useRouter();
	const [modalAddChannel, setModalAddChannel] = useState(false);
	const [modalMarks, setModalMarks] = useState(false);
	const [marks, setMarks] = useState(list_marks)
	const [filterID, setFilterID] = useState(new Set(['all']))
	const [filterTitle, setFilterTitle] = useState('Все')
	const [filterColor, setFilterColor] = useState('blue')

	useEffect(() => {
		const defaultMark = {
			'id': 'all',
            'title': 'Все',
            'color': 'blue'
        }
        setMarks([...list_marks, defaultMark])
	}, [list_marks])
	

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

	const changeFilter = (mark) => {
		setFilterID(mark)
		let chooseMark = marks.find(m => m.id === mark.anchorKey)
        setFilterTitle(chooseMark.title)
        setFilterColor(chooseMark.color)
	}

	const reloadMarks = () => {
		refreshData()
		setModalMarks(true)
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
				<div className={styles.actions__button}>
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
				</div>

				<Dropdown placement="bottom-right">
					<Dropdown.Trigger>
						<div className={styles.filter}>
							<Mark title={filterTitle} color={filterColor} />
							<IoIosArrowDown className={styles.filter__arrow} />
						</div>
					</Dropdown.Trigger>
					<Dropdown.Menu
						aria-label="Single selection actions"
						color="default"
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={filterID}
						onSelectionChange={mark => changeFilter(mark)}
					>
						{marks &&
							marks.map(mark =>
								<Dropdown.Item key={mark.id}>{mark.title}</Dropdown.Item>
							)
						}
					</Dropdown.Menu>
				</Dropdown>
			</ButtonToolbar>

			{channels && channels.length && marks.length !== 0
				? <ChannelsList channels={channels} marks={marks} filter={filterID.values().next().value} />
				: <h4 className={styles.notification}>У вас пока нет каналов</h4>
			}

			<Modal title='Добавление канала' visible={modalAddChannel} setVisible={setModalAddChannel}>
                <ModalFormCreateChannel marks={marks} closeAfterAdd={closeAfterAdd}/>
            </Modal>

			<Modal title='Настройка меток' visible={modalMarks} setVisible={setModalMarks}>
                <ModalMarks list_marks={marks} reloadMarks={reloadMarks} />
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
				list_marks: responseMarks.data,
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