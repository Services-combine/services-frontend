import { useEffect, useState } from 'react'
import styles from './ModalsForm.module.scss';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

export const ModalSettings = ({save, settings}) => {
    const [countInviting, setCountInviting] = useState('');
    const [countMailing, setCountMailing] = useState('');

    useEffect(() => {
        if (settings !== undefined) {
            setCountInviting(settings.countInviting);
            setCountMailing(settings.countMailing);
        }
    }, [settings])

    const saveSettings = (e) => {
		e.preventDefault()

		const newSettings = {
            countInviting, countMailing, id: Date.now()
        }
        save(newSettings);
	}

    return (
        <form className={styles.form__settings}>
            <h6 className={styles.title}>Пользователей на инвайтинг</h6>
            <Input 
                value={countInviting} 
                onChange={e => setCountInviting(e.target.value)}
                type='number' 
                placeholder='Введите значение' 
            />
            <br/>
            <h6 className={styles.title}>Пользователей на рассылку</h6>
            <Input 
                value={countMailing} 
                onChange={e => setCountMailing(e.target.value)}
                type='number' 
                placeholder='Введите значение' 
            />
            <br/>

            <Button mode='fill' onClick={saveSettings}>Сохранить</Button>
        </form>
	);
}
