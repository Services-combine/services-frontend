import { useState } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Textarea } from '../UI/Textarea';


export const ModalFormSettingsChannel = ({channel, closeAfterSave}) => {
    const [isError, setIsError] = useState(null);
    const [commentText, setCommentText] = useState(channel.comment);
    const [countVideos, setCountVideos] = useState(channel.count_commented_videos);

    async function saveSettings(e) {
        try {
            e.preventDefault();

            if (Number(countVideos) > channel.video_count) {
                setIsError("Количество комментируемых видео не может быть больше количества всех видео на канале")
            }
            else {
                await Api().channels.editChannel(channel.id, commentText, countVideos, {'title': mark.anchorKey, 'color': getColor()});
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
                <Textarea 
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

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button mode='fill' onClick={saveSettings}>Сохранить</Button>
        </form>
	);
}
