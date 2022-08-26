import { useState } from 'react';
import styles from './ModalsForm.module.scss';
import { Api } from '../../utils/api';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';


export const ModalFormSettingsProxy = ({channel, closeAfterSave}) => {
    const [isError, setIsError] = useState(null);
    const [ip, setIp] = useState(channel.ip_proxy);
    const [port, setPort] = useState(channel.port_proxy);
    const [login, setLogin] = useState(channel.login_proxy);
    const [password, setPassword] = useState(channel.password_proxy);

    async function saveSettings(e) {
        try {
            e.preventDefault();

            await Api().channels.editProxy(channel.id, ip, port, login, password);
            closeAfterSave("settings_proxy")
            setIsError(null)
		} catch (error) {
            setIsError("Ошибка при сохранении настроек")
		}
    }

    return (
        <form className={styles.form__channel}>
            <h6 className={styles.title}>IP адрес</h6>
            <Input 
                value={ip}
                onChange={e => setIp(e.target.value)}
                type='text'
            />
            
            <h6 className={styles.title}>Порт</h6>
            <Input 
                value={port}
                onChange={e => setPort(e.target.value)}
                type='number'
            />

            <h6 className={styles.title}>Логин</h6>
            <Input 
                value={login}
                onChange={e => setLogin(e.target.value)}
                type='text'
            />

            <h6 className={styles.title}>Пароль</h6>
            <Input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='text'
            />

            {isError &&
                <p className={styles.error}>{isError}</p>
            }

            <Button 
                mode='fill' 
                onClick={saveSettings}
                disabled={ip == "" || port == "" || login == "" || password == ""}
            >
                Сохранить
            </Button>
        </form>
	);
}
