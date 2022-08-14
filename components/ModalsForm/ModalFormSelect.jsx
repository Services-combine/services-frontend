import { useState } from 'react'
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
        <form>
            <Select
                defaultName={defaultName}
                options={optionsData}
                value={path} 
                onChange={folder => setPath(folder)}
            />
            <Button onClick={addInputSelect}>Сохранить</Button>
        </form>
	);
}
