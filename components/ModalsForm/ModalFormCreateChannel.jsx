import { useState } from 'react'
import styles from './ModalsForm.module.scss'
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

export const ModalFormCreateChannel = ({closeAfterAdd}) => {
    const [isError, setIsError] = useState(null);
    const [channelId, setChannelId] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [tokenFile, setTokenFile] = useState(null);

    async function addChannel(e) {
        try {
            e.preventDefault()
			const formData = new FormData()

			formData.append('channel_id', channelId)
			formData.append('api_key', apiKey)
			formData.append('token_file', tokenFile)
			await Api().channels.addChannel(formData);

            setChannelId('')
            setApiKey('')
            setTokenFile(null)
            setIsError(null)
			closeAfterAdd()
        } catch (e) {
            console.log(e)
            if (e.response.data) {
                if (
                    e.response.data.message === "Не верный api key" ||
                    e.response.data.message === "Ошибка при скачивании токен файла" || 
                    e.response.data.message === "Не верный channel id" ||
                    e.response.data.message === "Такое channel id уже используется"
                )
                    setIsError(e.response.data.message)
                else
                    setIsError('Ошибка при добавлении канала')
            }
            else
                setIsError('Ошибка при добавлении канала')
        }
    }

    const chooseFile = (e) => {
        const file = e.target.files[0]
        if (file)
            setTokenFile(file)
    }

    return (
        <form className={styles.form__input} >
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

            <label className={styles.choose__file}>
                <span className={styles.choose__file__name} type="text">
                    {tokenFile == null
                        ? "Выберите .json токен"
                        : tokenFile.name
                    }
                </span>
                <input type="file" name="file" accept="application/json" onChange={chooseFile} />        
                <span className={styles.choose__file__title}>Выбрать</span>
            </label>
            <br/>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                disabled={channelId == "" || apiKey == "" || tokenFile == null}
                onClick={addChannel}
            >
                Добавить
            </Button>
        </form>
	);
}
