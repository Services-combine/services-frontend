import { useEffect, useState } from 'react'
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
                else
                    setText(defaultData);
            }
            else 
                setText(defaultData);
        }
    }, [defaultData])

    const addTextareaText = (e) => {
		e.preventDefault();

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
        <form>
            <Textarea 
                value={text} 
                onChange={e => setText(e.target.value)}
                placeholder={placeholderText}
            />
            <Button onClick={addTextareaText}>{buttonText}</Button>
            <Button style={{background: "rgb(233, 62, 62)", color: "#dedede", marginLeft: 5}} onClick={cleanData}>Очистить</Button>
        </form>
	);
}