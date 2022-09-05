import { useState, useMemo } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Dropdown } from "@nextui-org/react";


export const ModalFormSettingsChannel = ({channel, marks, closeAfterSave}) => {
    const [isError, setIsError] = useState(null);
    const [commentText, setCommentText] = useState(channel.comment);
    const [countVideos, setCountVideos] = useState(channel.count_commented_videos);
    const [selected, setSelected] = useState(new Set([marks[0] ? marks[0].title : '']));
    const selectedValue = useMemo(
        () => Array.from(selected),
        [selected]
    );

    async function saveSettings(e) {
        try {
            e.preventDefault();

            if (Number(countVideos) > channel.video_count) {
                setIsError("Количество комментируемых видео не может быть больше количества всех видео на канале")
            }
            else {
                await Api().channels.editChannel(channel.id, commentText, countVideos);
                closeAfterSave("settings_channel")
                setIsError(null)
            }
		} catch (error) {
            setIsError("Ошибка при сохранении настроек")
		}
    }

    return (
        <form className={styles.form__channel}>
            <div className={styles.comment__channel}>
                <h6 className={styles.title}>Комментарий</h6>
                <textarea 
                    className={styles.comment}
                    value={commentText} 
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Введите комментарий"
                />
            </div>

            <div className={styles.count__videos__channel}>
                <h6 className={styles.title}>Количество комментируемых видео</h6>
                <Input 
                    value={countVideos}
                    onChange={e => setCountVideos(e.target.value)}
                    type='number'
                />
            </div>

            <div className={styles.mark}>
                <h6 className={styles.title}>Метка</h6>
                
                <Dropdown>
                    <Dropdown.Button flat color="default" css={{ tt: "capitalize" }}>
                        {selectedValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="default"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                    >
                        {marks.map(mark =>
                            <Dropdown.Item key={mark.title}>{mark.title}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button mode='fill' onClick={saveSettings}>Сохранить</Button>
        </form>
	);
}
