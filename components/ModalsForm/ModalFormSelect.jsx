import { useState } from 'react'
import styles from "./ModalsForm.module.scss"
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';

export const ModalFormSelect = ({create, optionsData, defaultName}) => {
    const [path, setPath] = useState('');

    const addInputSelect = (e) => {
		e.preventDefault()

		const newSelect = {
            path, id: Date.now()
        }
        create(newSelect)
		setPath('')
	}

    return (
        <form className={styles.form__input}>
            <Select
                defaultName={defaultName}
                options={optionsData}
                value={path} 
                onChange={folder => setPath(folder)}
            />
            <Button mode='fill' onClick={addInputSelect}>Сохранить</Button>
        </form>
	);
}
