import { useState } from 'react'
import styles from "./ModalsForm.module.scss"
import variables from '../../styles/colors.module.scss'
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { FiMoreHorizontal } from 'react-icons/fi';

export const ModalMarks = ({list_marks}) => {
    const [isError, setIsError] = useState(null);
    const [marks, setMarks] = useState(list_marks);
    const [title, setTitle] = useState('');

    let markColors = new Map();
    markColors.set('light-gray', variables.lightgraycolor)
    markColors.set('gray', variables.graycolor)
    markColors.set('brown', variables.browncolor)
    markColors.set('orange', variables.orangecolor)
    markColors.set('yellow', variables.yellowcolor)
    markColors.set('green', variables.greencolor)
    markColors.set('blue', variables.bluecolor)
    markColors.set('purple', variables.purplecolor)
    markColors.set('pink', variables.pinkcolor)
    markColors.set('red', variables.redcolor)

    const options = [
        { value: 'light-gray', label: 'Light gray' },
        { value: 'gray', label: 'Gray' },
        { value: 'brown', label: 'Brown' },
        { value: 'orange', label: 'Orange' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
        { value: 'pink', label: 'Pink' },
        { value: 'red', label: 'Red' }
    ]

    async function save(e) {
        try {
            e.preventDefault()
			//await Api().channels.addChannel(formData);

			closeAfterSave() 
        } catch (e) {
            setIsError('Ошибка при сохранении')
        }
    }
    
    const addMark = () => {
        const colors = Array.from(markColors.keys())
        const newMark = {
            'title': title,
            'color': colors[Math.floor(Math.random() * colors.length)]
        }
        setMarks([...marks, newMark])
        setTitle('')
    }

    const removeMark = (mark) => {

    }

    return (
        <div className={styles.form__marks}>
            <ul className={styles.marks__list}>
                {marks &&
                    marks.map((mark, index) =>
                        <div key={index} className={styles.mark__item}>
                            <li 
                                className={styles.title}
                                style={{backgroundColor: markColors.get(mark.color)}}
                            >
                                {mark.title}
                            </li>
                            <FiMoreHorizontal className={styles.remove} onClick={() => removeMark(mark)} />
                        </div>
                    )
                }
            </ul>

            <div className={styles.add__mark}>
                <Input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text' 
                    placeholder='Название метки' 
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            addMark()
                        }
                    }}
                />
            </div>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }
        </div>
	);
}
