import { useState } from 'react'
import styles from './ModalsForm.module.scss'
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

export const ModalFormCreateAccount = ({create, mode}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const addInputText = (e) => {
		e.preventDefault()

		const newInput = {
            name, phone, id: Date.now(), mode
        }
        create(newInput)
		setName('')
        setPhone('')
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
            <Button 
                mode='fill' 
                disabled={name == "" || phone == ""}
                onClick={addInputText}
            >
                Создать
            </Button>
        </form>
	);
}
