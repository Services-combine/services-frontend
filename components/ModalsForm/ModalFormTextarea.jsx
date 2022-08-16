import { useEffect, useState } from 'react'
import styles from './ModalsForm.module.scss'
import { Button } from '../UI/Button';
import { Textarea } from '../UI/Textarea';

export const ModalFormTextarea = ({create, mode, buttonText, placeholderText, defaultData}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if (defaultData !== undefined) {
            if (mode !== "changeMessage") {
                if (defaultData !== "") {
                    const stringData = defaultData.reduce((result, item) => {
                        if (`${result}${item}` !== "")
                            return `${result}${item}\n`
                    }, "")
                    setText(stringData);
                }
            }
            else {
                setText(defaultData);
            }
        }
    }, [defaultData, mode])

    const addTextareaText = (e) => {
		e.preventDefault();

        if (mode === 'changeUsernames') {
            text = text.replaceAll("@", "")
        }

		const newTextarea = {
            text, id: Date.now(), mode
        }
        create(newTextarea)
		setText('')
	}

    const cleanData = (e) => {
        e.preventDefault();
        setText('');
    }

    return (
        <form className={styles.form__input}>
            <Textarea 
                value={text} 
                onChange={e => setText(e.target.value)}
                placeholder={placeholderText}
            />
            <br/>
            <Button mode='fill' onClick={addTextareaText}>{buttonText}</Button>
            <Button mode='outline' className={styles.button__clean} onClick={cleanData}>Очистить</Button>
        </form>
	);
}