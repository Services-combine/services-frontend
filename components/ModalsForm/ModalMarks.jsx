import { useEffect, useState } from 'react'
import styles from "./ModalsForm.module.scss"
import variables from '../../styles/colors.module.scss'
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Mark } from '../UI/Mark';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Dropdown } from "@nextui-org/react";


export const ModalMarks = ({list_marks, reloadMarks}) => {
    const [isError, setIsError] = useState(null);
    const [marks, setMarks] = useState(list_marks);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setMarks(list_marks)
    }, [list_marks])

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

    async function add(mark) {
        try {
			await Api().channels.addMark(mark);
            reloadMarks()
        } catch (e) {
            setIsError('Ошибка при добавлении метки')
        }
    }

    async function update(id, mark) {
        try {
			await Api().channels.updateMark(id, mark);
        } catch (e) {
            setIsError('Ошибка при обновлении метки')
        }
    }

    async function remove(id) {
        try {
			await Api().channels.deleteMark(id);
        } catch (e) {
            setIsError('Ошибка при удалении метки')
        }
    }
    
    const addMark = () => {
        const colors = Array.from(markColors.keys())
        const newMark = {
            'title': title,
            'color': colors[Math.floor(Math.random() * colors.length)]
        }
        setMarks([...marks, newMark])
        add(newMark)
        setTitle('')
    }

    const deleteMark = (mark) => {
        setMarks(marks.filter(item => item !== mark))
        remove(mark.id)
    }

    const changeColorMark = (color, index) => {
        let newMarks = [...marks]
        newMarks[index]['color'] = color.anchorKey
        setMarks(newMarks)

        const updateMark = {'title': marks[index]['title'], 'color': marks[index]['color']}
        update(marks[index]['id'], updateMark)
    }

    return (
        <div className={styles.form__marks}>
            <ul className={styles.marks__list}>
                {marks &&
                    marks.map((mark, index) =>
                        <div key={index} className={styles.mark__item}>
                            <Mark title={mark.title} color={mark.color} />
                            <div className={styles.actions}>
                                <AiOutlineDelete className={styles.remove} onClick={() => deleteMark(mark)} />

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className={styles.dropdown__more}>
                                            <FiMoreHorizontal className={styles.more} />
                                        </div>
                                    </Dropdown.Trigger>
                                    
                                    <Dropdown.Menu
                                        aria-label={index}
                                        color="primary"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={new Set([mark.color])}
                                        onSelectionChange={color => changeColorMark(color, index)}
                                    >
                                        <Dropdown.Item key="light-gray">Light gray</Dropdown.Item>
                                        <Dropdown.Item key="gray">Gray</Dropdown.Item>
                                        <Dropdown.Item key="brown">Brown</Dropdown.Item>
                                        <Dropdown.Item key="orange">Orange</Dropdown.Item>
                                        <Dropdown.Item key="yellow">Yellow</Dropdown.Item>
                                        <Dropdown.Item key="green">Green</Dropdown.Item>
                                        <Dropdown.Item key="blue">Blue</Dropdown.Item>
                                        <Dropdown.Item key="purple">Purple</Dropdown.Item>
                                        <Dropdown.Item key="pink">Pink</Dropdown.Item>
                                        <Dropdown.Item key="red">Red</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
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
