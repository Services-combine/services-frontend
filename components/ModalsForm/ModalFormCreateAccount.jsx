import { useState } from 'react'
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
        <form>
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
            <Button onClick={addInputText}>Создать</Button>
        </form>
	);
}
