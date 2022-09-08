import { useState } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';


export const ModalFormSettingsProxy = ({channel, closeAfterSave}) => {
    const [isError, setIsError] = useState(null);
    const [proxy, setProxy] = useState(channel.proxy);

    async function saveSettings(e) {
        try {
            e.preventDefault();

            await Api().channels.editProxy(channel.id, proxy);
            closeAfterSave("settings_proxy")
            setIsError(null)
		} catch (error) {
            setIsError("Ошибка при сохранении настроек")
		}
    }

    return (
        <form className={styles.form__proxy}>
            <Input 
                value={proxy}
                onChange={e => setProxy(e.target.value)}
                type='text'
                placeholder='ip:port:login:password' 
            />
            <br/>

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                onClick={saveSettings}
            >
                Сохранить
            </Button>
        </form>
	);
}
