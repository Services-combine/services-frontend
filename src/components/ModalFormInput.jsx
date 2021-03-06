import React, {useState, useEffect} from 'react'
import '../styles/Inviting.css';
import Input from './UI/input/Input';
import Button from './UI/button/Button';

const ModalFormInput = ({create, mode, title, buttonText, defaultData}) => {
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
        <form>
            <h5>{title}</h5>
            <Input 
                value={text} 
                onChange={e => setText(e.target.value)}
                type='text' 
                placeholder='Введите название' 
            />
            <br/>
            <Button onClick={addInputText}>{buttonText}</Button>
        </form>
	);
}

export default ModalFormInput;
