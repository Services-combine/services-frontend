import React, {useEffect, useState} from 'react'
import '../styles/Account.css';
import {Link, useParams, useNavigate} from "react-router-dom"
import InvitingService from '../API/InvitingService';
import Error from '../components/UI/error/Error';
import Button from '../components/UI/button/Button';
import Loader from '../components/UI/loader/Loader';
import Input from '../components/UI/input/Input';
import Select from '../components/UI/select/Select';

const Folder = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [account, setAccount] = useState({});
    const [name, setName] = useState('');
    const [interval, setInterval] = useState(0);
    const [listOptions, setListOptions] = useState([]);
    const [folder, setFolder] = useState('');
    const [isError, setIsError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
    const timeout = 3000;

    useEffect(() => {
        fetchDataAccount();
    }, [])

	async function fetchDataAccount() {
		try {
			setIsLoading(true);
			const response = await InvitingService.fetchDataAccount(params.folderID, params.accountID);

            setAccount(response.data);
            setName(response.data.name);
            setInterval(response.data.interval);
            setFolder(response.data.folder_id);
            setListOptions(response.data.folders_move);

			setIsLoading(false);
		} catch (e) {
			setIsError('Ошибка при получении данных аккаунта');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
		}
	}

    const randomInterval = (e) => {
        e.preventDefault()
        const min = 15;
        const max = 40;
        const rand = Math.floor(min + Math.random() * (max - min));
        setInterval(rand);
    }

    async function saveSettings(e) {
        try {
            e.preventDefault();
			await InvitingService.saveSettingsAccount(params.folderID, params.accountID, name, interval, folder);
            navigate(`/inviting/${params.folderID}`);
		} catch (e) {
			setIsError('Ошибка при сохранении настроек');
			setTimeout(() => {
				setIsError(null)
			}, timeout)
		}
    }

    return (
        <div>
            <div className='header__account'>
                <div className="header__account__body container">
                    <Link to={`/inviting/${params.folderID}`} className='again'>
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h3 className='title'>Настройки аккаунта</h3>
                </div>
            </div>

            {isLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                :
                <>
                    <form className='settings-accounts'>
                        <h6 className="title">Название аккаунта</h6>
                        <Input 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text' 
                            placeholder='Введите название' 
                        />
                        
                        <h6 className="title">Номер телефона - +{account.phone}</h6>
                        <h6 className="title">Чат - {account.chat}</h6>

                        <h6 className="title">Интервал</h6>
                        <div className="interval">
                            <Input 
                                value={interval}
                                onChange={e => setInterval(e.target.value)}
                                type='text' 
                                placeholder='Введите интервал' 
                            />
                            <Button className='generate' onClick={randomInterval}>
                                <i className="fas fa-random"></i>
                            </Button>
                        </div>

                        <h6 className="title">Папка</h6>

                        <Select
                            defaultName={account.folder_name}
                            options={listOptions}
                            value={folder} 
                            onChange={folder => setFolder(folder)}
                        />

                        <Button onClick={saveSettings}>
                            Сохранить
                        </Button>
                    </form>
                </>
            }

            {isError &&
                <Error>{isError}</Error>
            }
        </div>
	);
}

export default Folder;
