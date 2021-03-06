import React, {useEffect, useState, useRef} from 'react'
import '../styles/Folder.css';
import {Link, useParams, useNavigate} from "react-router-dom"
import InvitingService from '../API/InvitingService';
import Error from '../components/UI/error/Error';
import Button from '../components/UI/button/Button';
import Loader from '../components/UI/loader/Loader';
import Modal from '../components/UI/modal/Modal';
import FolderList from '../components/FolderList';
import AccountList from '../components/AccountList';
import ModalFormInput from '../components/ModalFormInput';
import ModalFormSelect from '../components/ModalFormSelect';
import ModalFormTextarea from '../components/ModalFormTextarea';
import ModalFormCreateAccount from '../components/ModalFormCreateAccount';
import ModalLaunch from '../components/ModalLaunch';

const Folder = () => {
    const params = useParams();
	const navigate = useNavigate()
    const [accounts, setAccounts] = useState([]);
    const [folders, setFolders] = useState([]);
    const [countAccounts, setCountAccounts] = useState({});
    const [dataFolder, setDataFolder] = useState({});
    const [foldersMove, setFoldersMove] = useState({});
    const [foldersHash, setFoldersHash] = useState({});
	const [totalCount, setTotalCount] = useState(0);
	const [limit, setLimit] = useState(20);
	const [skip, setSkip] = useState(0);
    const [isError, setIsError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
    const [modalCreateFolder, setModalCreateFolder] = useState(false);
    const [modalRename, setModalRename] = useState(false);
	const [modalChat, setModalChat] = useState(false);
	const [modalMessage, setModalMessage] = useState(false);
	const [modalUsernames, setModalUsernames] = useState(false);
	const [modalGroups, setModalGroups] = useState(false);
	const [modalMove, setModalMove] = useState(false);
	const [modalCreateAccount, setModaleCreateAccount] = useState(false);
	const [modalLaunch, setModalLaunch] = useState(false);
	const [isReload, setIsReload] = useState(false);
    const timeout = 3000;
	const lastElement = useRef();
	const observer = useRef();


	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		var cb = function(entries, observer) {
			if (entries[0].isIntersecting && skip + limit < totalCount) {
				setSkip(skip + limit);
			}
		};
		observer.current = new IntersectionObserver(cb);
		observer.current.observe(lastElement.current)
	}, [isLoading])

    useEffect(() => {
	    fetchDataFolder('reload_all');
		fetchFoldersMove();
    }, [params.folderID])

	useEffect(() => {
		if (!isReload)
		    fetchDataFolder('scroll');
    }, [skip])


	async function fetchDataFolder(mode='reload_accounts') {
		try {
			if (mode === 'reload_all' || mode === 'reload_accounts') {
				setSkip(0);
				setIsReload(true);
				setAccounts([]);
			}

			setIsLoading(true);
			var response;
			if (mode === 'reload_all' || mode === 'reload_accounts') {
				response = await InvitingService.fetchDataFolder(params.folderID, limit, 0);
			} else {
				response = await InvitingService.fetchDataFolder(params.folderID, limit, skip);
			}
			
			if (mode === 'scroll') {
				if (response.data.accounts != null)
					setAccounts([...accounts, ...response.data.accounts]);
			} else {
				if (mode !== 'reload_datas') {
					if (response.data.accounts != null)
						setAccounts(response.data.accounts);
					else
						setAccounts([]);
				}
			}

			if (mode !== 'scroll') {
				if (response.data.folders != null)
					setFolders(response.data.folders);
				else
					setFolders([]);
			}
			
			if (mode !== 'reload_accounts' && mode !== 'scroll') {
				if (mode !== 'reload_datas') {
					setTotalCount(response.data.countAccounts.all);
					setDataFolder(response.data.folder);
					setCountAccounts(response.data.countAccounts);
				}
				setFoldersHash(response.data.pathHash);
			}

			setIsLoading(false);
			if (mode === 'reload_all' || mode === 'reload_accounts')
				setIsReload(false);
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????? ???????????? ??????????');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
		}
	}

	async function fetchFoldersMove() {
		try {
			const response = await InvitingService.fetchFoldersMove(params.folderID);
			setFoldersMove(response.data);
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????? ???????????? ?? ?????????????????????? ??????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

    async function createFolder(folderName) {
        try {
            await InvitingService.createFolderInFolder(params.folderID, folderName);
            fetchDataFolder('reload_accounts');
        } catch (e) {
            setIsError('???????????? ?????? ???????????????? ??????????');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function renameFolder(folderName) {
        try {
            await InvitingService.renameFolder(params.folderID, folderName);
            fetchDataFolder('reload_datas');
        } catch (e) {
            setIsError('???????????? ?????? ???????????????????????????????? ??????????');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

	async function changeChat(chatName) {
		try {
			await InvitingService.changeChat(params.folderID, chatName);
			dataFolder.chat = chatName;
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????? ????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function changeMessage(message) {
		try {
			await InvitingService.addMessage(params.folderID, message);
			dataFolder.message = message;
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????? ??????????????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function changeUsernames(usernames) {
		try {
			const noDupUsernames = new Set(usernames.split("\n"));
			await InvitingService.changeUsernames(params.folderID, [...noDupUsernames]);
			dataFolder.usernames = [...noDupUsernames];
		} catch (e) {
			setIsError('???????????? ?????? ???????????????????? usernames');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function changeGroups(groups) {
		try {
			const noDupGroups = new Set(groups.split("\n"));
			await InvitingService.changeGroups(params.folderID, [...noDupGroups]);
			dataFolder.groups = [...noDupGroups];
		} catch (e) {
			setIsError('???????????? ?????? ???????????????????? ??????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function moveFolder(path) {
		try {
			await InvitingService.moveFolder(params.folderID, path);
			fetchDataFolder('reload_datas');
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????????? ??????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function deleteFolder() {
		try {
			const response = await InvitingService.deleteFolder(params.folderID);

			if (response.data === "/")
				navigate('/inviting')
			else 
				navigate(`/inviting/${response.data}`)
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? ??????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function createAccount(name, phone) {
		try {
			await InvitingService.createAccount(params.folderID, name, phone);
			fetchDataFolder('reload_accounts');
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? ????????????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function deleteAccount(account) {
        try {
			await InvitingService.deleteAccount(params.folderID, account.id);
			fetchDataFolder('reload_accounts');
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? ????????????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

	async function geterateInterval() {
		try {
			await InvitingService.geterateInterval(params.folderID);
			fetchDataFolder('reload_accounts');
		} catch (e) {
			setIsError('???????????? ?????? ?????????????????? ????????????????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function sendCodeParsing(accountID) {
		try {
			await InvitingService.sendCodeParsing(params.folderID, accountID);
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? ????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function parsingApi(accountID, code) {
		try {
			if (code === '') {
				setIsError('???? ???? ?????????? ??????');
				setTimeout(() => {
					setIsError(null)
				}, timeout)
			}
			else {
				await InvitingService.parsingApi(params.folderID, accountID, code);
				fetchDataFolder('reload_accounts');
			}
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? API');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function sendCodeSession(accountID) {
		try {
			await InvitingService.sendCodeSession(params.folderID, accountID);
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? ????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	async function createSession(accountID, code) {
		try {
			if (code === '') {
				setIsError('???? ???? ?????????? ??????');
				setTimeout(() => {
					setIsError(null)
				}, timeout)
			}
			else {
				await InvitingService.createSession(params.folderID, accountID, code);
				fetchDataFolder('reload_accounts');
			}
		} catch (e) {
			setIsError('???????????? ?????? ???????????????? .session ??????????');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
	}

	const getModalInput = (getInput) => {
		if (getInput.mode === "createFolder") {
			setModalCreateFolder(false);
			createFolder(getInput.text);
		} 
		else if (getInput.mode === "renameFolder") {
			setModalRename(false);
			renameFolder(getInput.text);
		}
        else if (getInput.mode === "changeChat") {
			setModalChat(false);
			changeChat(getInput.text);
		}
		else if (getInput.mode === "changeMessage") {
			setModalMessage(false);
			changeMessage(getInput.text);
		}
		else if (getInput.mode === "changeUsernames") {
			setModalUsernames(false);
			changeUsernames(getInput.text);
		}
		else if (getInput.mode === "changeGroups") {
			setModalGroups(false);
			changeGroups(getInput.text);
		}
		else if (getInput.mode === "createAccount") {
			setModaleCreateAccount(false);
			createAccount(getInput.name, getInput.phone);
		}
	}

	const getModalSelect = (getSelect) => {
		setModalMove(false);
		if (getSelect.path !== "")
			moveFolder(getSelect.path);
	}

	const getModalLaunch = (mode=null) => {
		setModalLaunch(false);
		fetchDataFolder('reload_accounts');
		
		if (mode === 'inviting')
			dataFolder.inviting = true
		else if (mode === 'mailing_usernames')
			dataFolder.mailing_usernames = true
		else if (mode === 'mailing_groups')
			dataFolder.mailing_groups = true
	}

    return (
        <div>
			<div className="header__folder">
				<div className="header__folder__body container">
					<div className='path'>
						<Link to='/inviting' className='path__item-link'>??????????????</Link>

						{Object.keys(foldersHash).length !== 0 &&
							Object.entries(foldersHash).map(([key, item]) => (
								<div className='path__item' key={item.value}>
									<b>/</b>
									<Link to={`/inviting/${item.value}`} className='path__item-link'>
										{item.name}
									</Link>
								</div>
							))
						}
					</div>
					<div className="count__accounts">
						<h6><i className="fas fa-user-alt"></i> - {countAccounts.all}</h6>
						<h6><i className="fas fa-check"></i> - {countAccounts.clean}</h6>
						<h6><i className="fas fa-info-circle"></i> - {countAccounts.block}</h6>
					</div>
				</div>
			</div>

            <div className='menu btn-toolbar container' role="toolbar">
				{accounts.length === 0 &&
					folders.length === 0 && 
						<Button style={{background: "rgb(233, 62, 62)", color: "#dedede"}} className="delete" onClick={deleteFolder}>
							<i className="fas fa-trash-alt"></i>
						</Button>
				}

				{accounts.length !== 0 &&
					<Button className="btn-action" onClick={() => setModalLaunch(true)}>
						<i className="fas fa-play"></i> ??????????????????
					</Button>
				}

                <Button className='btn-action' onClick={() => setModalMessage(true)}>
					<i className="fas fa-comment-dots"></i> ??????????????????
				</Button>
                <Button className='btn-action' onClick={() => setModalGroups(true)}>
					<i className="fas fa-users"></i> ????????????
				</Button>
                <Button className='btn-action' onClick={() => setModalUsernames(true)}>
					<i className="fas fa-file-signature"></i> Username
				</Button>
                <Button className='btn-action' onClick={() => setModalChat(true)}>
					<i className="fas fa-user-friends"></i> ??????
				</Button>

                <Button className='btn-action' onClick={() => setModalCreateFolder(true)}>
					<i className="fas fa-folder-plus"></i> ??????????
				</Button>
                <Button className='btn-action' onClick={() => setModaleCreateAccount(true)}>
					<i className="fas fa-user-plus"></i> ??????????????
				</Button>

                <Button className='btn-action' onClick={() => setModalMove(true)}>
					<i className="fas fa-angle-double-right"></i> ??????????????????????
				</Button>
                <Button className='btn-action' onClick={() => setModalRename(true)}>
					<i className="fas fa-signature"></i> ??????????????????????????
				</Button>
                <Button className='btn-action' onClick={geterateInterval}>
					<i className="fas fa-random"></i> ??????????????????????????
				</Button>
				<Button className='btn-action' onClick={() => fetchDataFolder('reload_all')}>
					<i className="fas fa-redo-alt"></i>
				</Button>
            </div>

            {isError &&
                <Error>{isError}</Error>
            }

			<FolderList folders={folders} />
			{accounts.length
				? <AccountList remove={deleteAccount} accounts={accounts} sendCodeParsing={sendCodeParsing} parsingApi={parsingApi} sendCodeSession={sendCodeSession} createSession={createSession} />
				: <h4 className='notification'>?? ?????? ???????? ?????? ??????????????????</h4>
			}

            {isLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
				: <div ref={lastElement} style={{height: 20}}></div>
            }

			<Modal visible={modalCreateFolder} setVisible={setModalCreateFolder}>
                <ModalFormInput create={getModalInput} title="???????????????? ??????????" buttonText="??????????????" mode="createFolder"/>
            </Modal>

			{dataFolder.name
				?
				<Modal visible={modalRename} setVisible={setModalRename}>
					<ModalFormInput create={getModalInput} title="???????????????????????????? ??????????" buttonText="??????????????????" mode="renameFolder" defaultData={dataFolder.name}/>
				</Modal>
				:
				<Modal visible={modalRename} setVisible={setModalRename}>
					<ModalFormInput create={getModalInput} title="???????????????????????????? ??????????" buttonText="??????????????????" mode="renameFolder" defaultData=""/>
				</Modal>
			}

			{dataFolder.chat
				?
				<Modal visible={modalChat} setVisible={setModalChat}>
					<ModalFormInput create={getModalInput} title="?????????????????? ????????" buttonText="??????????????????" mode="changeChat" defaultData={dataFolder.chat}/>
				</Modal>
				:
				<Modal visible={modalChat} setVisible={setModalChat}>
					<ModalFormInput create={getModalInput} title="?????????????????? ????????" buttonText="??????????????????" mode="changeChat" defaultData=""/>
				</Modal>
			}

			{dataFolder.message
				?
				<Modal visible={modalMessage} setVisible={setModalMessage}>
					<ModalFormTextarea create={getModalInput} title="?????????????????? ??????????????????" buttonText="??????????????????" mode="changeMessage" placeholderText="?????????????? ??????????????????" defaultData={dataFolder.message}/>
				</Modal>
				:
				<Modal visible={modalMessage} setVisible={setModalMessage}>
					<ModalFormTextarea create={getModalInput} title="?????????????????? ??????????????????" buttonText="??????????????????" mode="changeMessage" placeholderText="?????????????? ??????????????????" defaultData=""/>
				</Modal>
			}

			{dataFolder.usernames
				?
				<Modal visible={modalUsernames} setVisible={setModalUsernames}>
                	<ModalFormTextarea create={getModalInput} title="???????????????????? usernames" buttonText="??????????????????" mode="changeUsernames" placeholderText="?????????????? ??????????????????????????" defaultData={dataFolder.usernames}/>
            	</Modal>
				:
				<Modal visible={modalUsernames} setVisible={setModalUsernames}>
                	<ModalFormTextarea create={getModalInput} title="???????????????????? usernames" buttonText="??????????????????" mode="changeUsernames" placeholderText="?????????????? ??????????????????????????" defaultData=""/>
            	</Modal>
			}

			{dataFolder.groups
				? 
				<Modal visible={modalGroups} setVisible={setModalGroups}>
					<ModalFormTextarea create={getModalInput} title="???????????????????? ??????????" buttonText="??????????????????" mode="changeGroups" placeholderText="?????????????? ????????????" defaultData={dataFolder.groups}/>
				</Modal>
				:
				<Modal visible={modalGroups} setVisible={setModalGroups}>
					<ModalFormTextarea create={getModalInput} title="???????????????????? ??????????" buttonText="??????????????????" mode="changeGroups" placeholderText="?????????????? ????????????" defaultData=""/>
				</Modal>
			}

			{dataFolder.name_path &&
				Object.keys(foldersMove).length !== 0
					?
					<Modal visible={modalMove} setVisible={setModalMove}>
						<ModalFormSelect create={getModalSelect} optionsData={foldersMove} defaultName={dataFolder.name_path}/>
					</Modal>
					:
					<Modal visible={modalMove} setVisible={setModalMove}>
						<ModalFormSelect create={getModalSelect} optionsData={[]} defaultName={dataFolder.name_path}/>
					</Modal>
			}

			<Modal visible={modalCreateAccount} setVisible={setModaleCreateAccount}>
                <ModalFormCreateAccount create={getModalInput} mode="createAccount"/>
            </Modal>

			<Modal visible={modalLaunch} setVisible={setModalLaunch}>
                <ModalLaunch launch={getModalLaunch} folder={dataFolder} />
            </Modal>
        </div>
	);
}

export default Folder;
