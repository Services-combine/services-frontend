import { useState } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';
import { FaRandom } from "react-icons/fa"


export const ModalFormChannel = ({id, comment, count_commented_videos, closeAfterSave}) => {
    const [commentText, setCommentText] = useState(comment);
    const [countVideos, setCountVideos] = useState(count_commented_videos);

    async function saveSettings(e) {
        try {
            e.preventDefault();
			await Api().channels.editChannel(id, commentText, countVideos);
            closeAfterSave()
		} catch (error) {
			console.log(error)
		}
    }

    return (
        <form className={styles.form__channel}>
            <div className={styles.comment__channel}>
                <h6 className={styles.title}>Комментарий</h6>
                <Input 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    type='text' 
                    placeholder='Введите комментарий' 
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

            <Button mode='fill' onClick={saveSettings}>Сохранить</Button>
        </form>
	);
}
