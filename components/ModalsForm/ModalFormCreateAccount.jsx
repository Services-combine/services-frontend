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

    async function createAccount(e) {
        try {
            e.preventDefault()
            await Api().inviting.createAccount(router.query.id, name, phone);

            setName('')
            setPhone('')
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

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                disabled={name == "" || phone == ""}
                onClick={createAccount}
            >
                Создать
            </Button>
        </form>
	);
}
