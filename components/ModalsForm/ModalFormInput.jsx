import {useState, useEffect} from 'react'
import styles from "./ModalsForm.module.scss"
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

export const ModalFormInput = ({create, mode, buttonText, defaultData}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if (defaultData !== undefined) {
            setText(defaultData);
        }
    }, [defaultData])

    const addInputText = (e) => {
		e.preventDefault()

		const newInput = {
            text, id: Date.now(), mode
        }
        create(newInput)
		setText('')
	}

    return (
        <form className={styles.form__input}>
            <Input 
                value={text} 
                onChange={e => setText(e.target.value)}
                type='text' 
                placeholder='Введите название' 
            />
            <br/>
            <Button mode='fill' onClick={addInputText}>{buttonText}</Button>
        </form>
	);
}
