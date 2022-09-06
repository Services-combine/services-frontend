import { useState, useMemo } from 'react'
import styles from './ModalsForm.module.scss'
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Dropdown } from "@nextui-org/react";


export const ModalFormCreateChannel = ({marks, closeAfterAdd}) => {
    const [isError, setIsError] = useState(null);
    const [channelId, setChannelId] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [proxy, setProxy] = useState('');
    const [appTokenFile, setAppTokenFile] = useState(null);
    const [userTokenFile, setUserTokenFile] = useState(null);
    const [mark, setMark] = useState(new Set([marks[0] ? marks[0].title : '']));
    const selectedValue = useMemo(
        () => Array.from(mark),
        [mark]
    );

    const getColor = () => {
        for (var i = 0; i < marks.length; i++) {
            if (marks[i].title === mark.anchorKey) {
                return marks[i].color
            }
        }
    }
    
    async function addChannel(e) {
        try {
            e.preventDefault()
			const formData = new FormData()
            
			formData.append('channel_id', channelId)
			formData.append('api_key', apiKey)
            formData.append('proxy', proxy)
            formData.append('mark_title', mark.anchorKey)
            formData.append('mark_color', getColor())
			formData.append('app_token_file', appTokenFile)
            formData.append('user_token_file', userTokenFile)
			await Api().channels.addChannel(formData);

            setChannelId('')
            setApiKey('')
            setProxy('')
            setAppTokenFile(null)
            setUserTokenFile(null)
            setIsError(null)
			closeAfterAdd()
        } catch (e) {
            if (e.response.data) {
                if (
                    e.response.data.message === "Не верный api key" ||
                    e.response.data.message === "Ошибка при скачивании токена приложения" ||
                    e.response.data.message === "Ошибка при скачивании токена клиента" || 
                    e.response.data.message === "Не верный channel id" ||
                    e.response.data.message === "Такой channel id уже используется" ||
                    e.response.data.message === "Неудалось создать токен пользователя"
                )
                    setIsError(e.response.data.message)
                else
                    setIsError('Ошибка при добавлении канала')
            }
            else if (e.code === "ERR_NETWORK") {
                setChannelId('')
                setApiKey('')
                setProxy('')
                setAppTokenFile(null)
                setUserTokenFile(null)
                setIsError(null)
                closeAfterAdd()
            }
            else
                setIsError('Ошибка при добавлении канала')
        }
    }

    const chooseAppToken = (e) => {
        const file = e.target.files[0]
        if (file)
            setAppTokenFile(file)
    }

    const chooseUserToken = (e) => {
        const file = e.target.files[0]
        if (file)
            setUserTokenFile(file)
    }

    return (
        <form className={styles.form__add__channel} >
            <h6 className={styles.title}>Данные канала</h6>
            <Input 
                value={channelId} 
                onChange={e => setChannelId(e.target.value)}
                type='text' 
                placeholder='Введите channel id' 
            />
            <br/>

            <Input 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)}
                type='text' 
                placeholder='Введите api key' 
            />
            <br/>

            <h6 className={styles.title}>Данные прокси</h6>
            <Input 
                value={proxy}
                onChange={e => setProxy(e.target.value)}
                type='text' 
                placeholder='ip:port:login:password' 
            />
            <br/>

            <h6 className={styles.title}>Токены</h6>
            <label className={styles.choose__file}>
                <span className={styles.choose__file__name} type="text">
                    {appTokenFile == null
                        ? "Токен приложения"
                        : appTokenFile.name
                    }
                </span>
                <input type="file" name="file" accept="application/json" onChange={chooseAppToken} />        
                <span className={styles.choose__file__title}>Выбрать</span>
            </label>
            <br/>

            <label className={styles.choose__file}>
                <span className={styles.choose__file__name} type="text">
                    {userTokenFile == null
                        ? "Токен клиента"
                        : userTokenFile.name
                    }
                </span>
                <input type="file" name="file" accept="application/json" onChange={chooseUserToken} />        
                <span className={styles.choose__file__title}>Выбрать</span>
            </label>
            <br/>

            <h6 className={styles.title}>Метка</h6>
            <Dropdown>
                <Dropdown.Button flat color="default" css={{ tt: "capitalize" }}>
                    {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="default"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={mark}
                    onSelectionChange={setMark}
                >
                    {marks.map(mark =>
                        <Dropdown.Item key={mark.title}>{mark.title}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                disabled={channelId == "" || apiKey == "" || appTokenFile == null || userTokenFile == null}
                onClick={addChannel}
            >
                Добавить
            </Button>
        </form>
	);
}
