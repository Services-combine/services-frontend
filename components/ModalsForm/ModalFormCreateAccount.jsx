import { useRouter } from 'next/router';
import { useState } from 'react'
import styles from './ModalsForm.module.scss'
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

export const ModalFormCreateAccount = ({closeAfterCreate}) => {
    const router = useRouter();
    const [isError, setIsError] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [apiId, setApiId] = useState('');
    const [apiHash, setApiHash] = useState('');
    const [sessionFile, setSessionFile] = useState(null);

    async function createAccount(e) {
        try {
            e.preventDefault()
            const formData = new FormData()

            formData.append('name', name)
			formData.append('phone', phone)
            formData.append('api_id', apiId)
            formData.append('api_hash', apiHash)
			formData.append('session_file', sessionFile)
            await Api().inviting.createAccount(router.query.id, formData);

            setName('')
            setPhone('')
            setApiId('')
            setApiHash('')
            setSessionFile(null)
            setIsError(null)
			closeAfterCreate()
        } catch (e) {
            if (e.response.data) {
                if (
                    e.response.data.message === "Такой номер уже используется"
                )
                    setIsError(e.response.data.message)
                else
                    setIsError('Ошибка при добавлении канала')
            }
            else
    			setIsError('Ошибка при создании аккаунта')
        }
    }

    const chooseSessionFile = (e) => {
        const file = e.target.files[0]
        if (file)
        setSessionFile(file)
    }

    return (
        <form className={styles.form__input}>
            <Input 
                value={name} 
                onChange={e => setName(e.target.value)}
                type='text' 
                placeholder='Введите название' 
            />
            <br/>

            <Input 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                type='text' 
                placeholder='Введите номер телефона' 
            />
            <br/>

            <Input 
                value={apiId} 
                onChange={e => setApiId(e.target.value)}
                type='text' 
                placeholder='Введите api_id' 
            />
            <br/>

            <Input 
                value={apiHash} 
                onChange={e => setApiHash(e.target.value)}
                type='text' 
                placeholder='Введите api_hash' 
            />
            <br/>

            <label className={styles.choose__file}>
                <span className={styles.choose__file__name} type="text">
                    {sessionFile == null
                        ? "Файл .session"
                        : sessionFile.name
                    }
                </span>
                <input type="file" name="file" onChange={chooseSessionFile} />        
                <span className={styles.choose__file__title}>Выбрать</span>
            </label>
            <br/>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                disabled={name == "" || phone == "" || apiId == "" || apiHash == ""}
                onClick={createAccount}
            >
                Создать
            </Button>
        </form>
	);
}
